"use client";

import {Heading} from "@/components/heading";
import {Settings} from "lucide-react";

const SettingsPage = () => {
    return(
        <div>
            <Heading 
                title="Settings"
                description="There is nothing in there."
                icon={Settings}
                iconcolor="text-violet-500"
                bgcolor="bg-violet-500/10"
            />
        </div>
    );
}
export default SettingsPage; 
