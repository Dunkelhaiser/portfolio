interface Options {
    targetPerPage?: number;
    minPerPage?: number;
    maxPerPage?: number;
}

export const calculateMasonryPages = <T extends { width?: number; height?: number }>(
    allImages: T[],
    options: Options = {}
) => {
    const { targetPerPage = 12, minPerPage = 9, maxPerPage = 15 } = options;

    const getMasonryScore = (images: T[], start: number, end: number, cols: number) => {
        if (end <= start) {
            return 0;
        }
        const columnHeights = new Array(cols).fill(0);
        let colIndex = 0;
        for (let i = start; i < end; i++) {
            const img = images[i];
            const aspectHeight = img.height && img.width ? img.height / img.width : 1;
            columnHeights[colIndex] += aspectHeight;
            colIndex = (colIndex + 1) % cols;
        }
        return Math.max(...columnHeights) - Math.min(...columnHeights);
    };

    const numItems = allImages.length;
    const dp = new Array(numItems + 1).fill(Number.POSITIVE_INFINITY);
    const parent = new Array(numItems + 1).fill(0);
    dp[0] = 0;

    const maxLookback = 30;
    const severePenalty = 1000;
    const targetDeviationWeight = 0.1;
    const desktopCols = 3;
    const desktopWeight = 1.5;
    const tabletCols = 2;

    for (let i = 1; i <= numItems; i++) {
        const startJ = Math.max(0, i - maxLookback);
        for (let j = startJ; j < i; j++) {
            const pageLen = i - j;
            let lengthPenalty = 0;

            if (pageLen < minPerPage) {
                lengthPenalty = (minPerPage - pageLen) * severePenalty;
            } else if (pageLen > maxPerPage) {
                lengthPenalty = (pageLen - maxPerPage) * severePenalty;
            } else {
                lengthPenalty = Math.abs(pageLen - targetPerPage) * targetDeviationWeight;
            }

            if (j === 0 && i === numItems && pageLen < minPerPage) {
                lengthPenalty = 0;
            }

            const score =
                getMasonryScore(allImages, j, i, desktopCols) * desktopWeight +
                getMasonryScore(allImages, j, i, tabletCols);

            const cost = dp[j] + score + lengthPenalty;
            if (cost < dp[i]) {
                dp[i] = cost;
                parent[i] = j;
            }
        }
    }

    const pages: T[][] = [];
    let curr = numItems;
    while (curr > 0) {
        const prev = parent[curr];
        pages.unshift(allImages.slice(prev, curr));
        curr = prev;
    }

    return pages;
};
