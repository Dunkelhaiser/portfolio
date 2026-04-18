const secondInMs = 1000;

export const unixToDate = (unixTime: number) => {
    const date = new Date(Number(unixTime) * secondInMs);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const unixToISODate = (unixTime: number) => {
    const date = new Date(unixTime * secondInMs);
    return date.toISOString();
};
