"use client";

import { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        const res = await fetch(`/api/tickets/${id}`, {
            method: "DELETE",
        });

        const result = await res.json();
        if (result.error) {
            console.log(error);
            setIsLoading(false);
        }
        if (!result.error) {
            router.refresh();
            router.push("/tickets");
        }
    };
    return (
        <button className="btn-primary" onClick={handleDelete} disabled={isLoading}>
            {isLoading && (
                <>
                    <TiDelete />
                    Deleting...
                </>
            )}
            {!isLoading && (
                <>
                    <TiDelete />
                    Delete Ticket
                </>
            )}
        </button>
    );
}
