'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./ui/button"
import clsx from "clsx"
const AppointmentModal = ({ type }: { type: "schedule" | "cancel" }) => {

    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    variant={"ghost"}
                    className={clsx('capitalize ', {
                        'text-green-500': type === "schedule",
                        'text-red-500': type === "cancel"
                    })}
                >
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default AppointmentModal
