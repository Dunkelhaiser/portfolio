import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/Tabs";
import type { ReactNode } from "react";

interface Props {
    defaultView: string;
    flatContent: ReactNode;
    groupsContent: ReactNode;
    filtersContent?: ReactNode;
}

const ViewTabs = ({ defaultView, flatContent, groupsContent, filtersContent }: Props) => {
    return (
        <Tabs
            defaultValue={defaultView}
            onValueChange={(val) => {
                const url = new URL(window.location.href);
                url.searchParams.set("view", val);
                url.searchParams.set("page", "1");
                window.history.pushState({}, "", url.toString());
                setTimeout(() => window.dispatchEvent(new Event("resize")), 10);
            }}
        >
            <div className="flex items-center justify-between w-full gap-4">
                <TabsList>
                    <TabsTrigger value="flat">All Photos</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
                {filtersContent}
            </div>
            <TabsContent value="flat" keepMounted>
                {flatContent}
            </TabsContent>
            <TabsContent value="groups" keepMounted>
                {groupsContent}
            </TabsContent>
        </Tabs>
    );
};

export { ViewTabs };
