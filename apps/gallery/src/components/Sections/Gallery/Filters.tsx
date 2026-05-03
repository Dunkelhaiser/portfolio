import { navigate } from "astro:transitions/client";
import { Button } from "@repo/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/Dialog";
import { Filter } from "@repo/ui/icons";
import MultipleSelector, { type Option } from "@repo/ui/MultiSelect";
import { useEffect, useState } from "react";

interface TagFilterProps {
    availableTags: Option[];
    selectedTags: Option[];
    availableCameras: Option[];
    selectedCameras: Option[];
    availableLocations: Option[];
    selectedLocations: Option[];
    availableDayparts: Option[];
    selectedDayparts: Option[];
    availableSeasons: Option[];
    selectedSeasons: Option[];
}

const Filters = ({
    availableTags,
    selectedTags,
    availableCameras,
    selectedCameras,
    availableLocations,
    selectedLocations,
    availableDayparts,
    selectedDayparts,
    availableSeasons,
    selectedSeasons,
}: TagFilterProps) => {
    const [tagsValue, setTagsValue] = useState<Option[]>(selectedTags);
    const [cameraValue, setCameraValue] = useState<Option[]>(selectedCameras);
    const [locationValue, setLocationValue] = useState<Option[]>(selectedLocations);
    const [daypartValue, setDaypartValue] = useState<Option[]>(selectedDayparts);
    const [seasonValue, setSeasonValue] = useState<Option[]>(selectedSeasons);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setTagsValue(selectedTags);
    }, [selectedTags]);

    useEffect(() => {
        setCameraValue(selectedCameras);
    }, [selectedCameras]);

    useEffect(() => {
        setLocationValue(selectedLocations);
    }, [selectedLocations]);

    useEffect(() => {
        setDaypartValue(selectedDayparts);
    }, [selectedDayparts]);

    useEffect(() => {
        setSeasonValue(selectedSeasons);
    }, [selectedSeasons]);

    const handleClear = () => {
        setTagsValue([]);
        setCameraValue([]);
        setLocationValue([]);
        setDaypartValue([]);
        setSeasonValue([]);
    };

    const handleApply = () => {
        const url = new URL(window.location.href);

        if (tagsValue.length > 0) {
            url.searchParams.set("tags", tagsValue.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("tags");
        }

        if (cameraValue.length > 0) {
            url.searchParams.set("cameras", cameraValue.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("cameras");
        }

        if (locationValue.length > 0) {
            url.searchParams.set("locations", locationValue.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("locations");
        }

        if (daypartValue.length > 0) {
            url.searchParams.set("dayparts", daypartValue.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("dayparts");
        }

        if (seasonValue.length > 0) {
            url.searchParams.set("seasons", seasonValue.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("seasons");
        }

        url.searchParams.set("page", "1");

        setOpen(false);
        navigate(url.toString());
    };

    const appliedFiltersCount = [
        tagsValue.length > 0,
        cameraValue.length > 0,
        locationValue.length > 0,
        daypartValue.length > 0,
        seasonValue.length > 0,
    ].filter(Boolean).length;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant="outline" size="sm">
                        <Filter className="size-4" />
                        Filters
                        {appliedFiltersCount > 0 && (
                            <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                {appliedFiltersCount}
                            </span>
                        )}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Tags</span>
                        <MultipleSelector
                            value={tagsValue}
                            defaultOptions={availableTags}
                            placeholder="Select tags..."
                            onChange={setTagsValue}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Cameras</span>
                        <MultipleSelector
                            value={cameraValue}
                            defaultOptions={availableCameras}
                            placeholder="Select cameras..."
                            onChange={setCameraValue}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Locations</span>
                        <MultipleSelector
                            value={locationValue}
                            defaultOptions={availableLocations}
                            placeholder="Select locations..."
                            onChange={setLocationValue}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Season</span>
                        <MultipleSelector
                            value={seasonValue}
                            defaultOptions={availableSeasons}
                            placeholder="Select season..."
                            onChange={setSeasonValue}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="text-sm font-medium">Time of Day</span>
                        <MultipleSelector
                            value={daypartValue}
                            defaultOptions={availableDayparts}
                            placeholder="Select time of day..."
                            onChange={setDaypartValue}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={handleClear}>
                        Clear Filters
                    </Button>
                    <Button onClick={handleApply}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { Filters };
