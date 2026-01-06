"use client";

import { useEffect } from "react";
import { markAsRead } from "@/actions/messages";

export function MarkAsRead({ id }: { id: string }) {
    useEffect(() => {
        markAsRead(id);
    }, [id]);

    return null;
}
