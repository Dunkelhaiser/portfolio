import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/Tabs";
import type { ReactNode } from "react";

interface Props {
    defaultView: string;
    flatContent: ReactNode;
    groupsContent: ReactNode;
}

const ViewTabs = ({ defaultView, flatContent, groupsContent }: Props) => {
    return (
        <Tabs
            defaultValue={defaultView}
            onValueChange={(val) => {
                const url = new URL(window.location.href);
                url.searchParams.set("view", val);
                url.searchParams.set("page", "1");
                window.history.pushState({}, "", url.toString());
            }}
        >
            <TabsList>
                <TabsTrigger value="flat">All Photos</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            <TabsContent value="flat">{flatContent}</TabsContent>
            <TabsContent value="groups">{groupsContent}</TabsContent>
        </Tabs>
    );
};

export { ViewTabs };
