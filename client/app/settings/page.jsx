import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import MainLayout from "@/components/layout/MainLayout";
import SettingsContent from "@/components/settings/SettingsContent";

export default async function Settings() {
    const user = await currentUser();

    if (!user) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-slate-500">Please sign in to access settings.</p>
                </div>
            </MainLayout>
        );
    }

    const userData = {
        fullName: user.fullName,
        username: user.username,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        email: user.emailAddresses?.[0]?.emailAddress || "",
    };

    return <SettingsContent user={userData} />;
}