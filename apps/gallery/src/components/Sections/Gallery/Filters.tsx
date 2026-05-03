import { navigate } from "astro:transitions/client";
import { Button } from "@repo/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/Dialog";
import { Filter } from "@repo/ui/icons";
import MultipleSelector, { type Option } from "@repo/ui/MultiSelect";
import { useEffect, useState } from "react";

interface TagFilterProps {
    availableTags: Option[];
    selectedTags: Option[];
}

const Filters = ({ availableTags, selectedTags }: TagFilterProps) => {
    const [value, setValue] = useState<Option[]>(selectedTags);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setValue(selectedTags);
    }, [selectedTags]);

    const handleApply = () => {
        const url = new URL(window.location.href);
        if (value.length > 0) {
            url.searchParams.set("tags", value.map((o) => o.value).join(","));
        } else {
            url.searchParams.delete("tags");
        }
        url.searchParams.set("page", "1");

        setOpen(false);
        navigate(url.toString());
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button variant="outline" size="sm">
                        <Filter className="size-4" />
                        Filters
                        {selectedTags.length > 0 && (
                            <span className="ml-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                                {selectedTags.length}
                            </span>
                        )}
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <MultipleSelector
                        value={value}
                        defaultOptions={availableTags}
                        placeholder="Select tags..."
                        onChange={setValue}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleApply}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { Filters };
