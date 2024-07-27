'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PasskeyModal = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");

    const encryptedKey = typeof window !== "undefined"
        ? window.localStorage.getItem("accessKey")
        : null;


    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey!);
        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {

                setOpen(false);
                router.push('/admin');
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]);

    const validatePasskey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem("accessKey", encryptedKey);
            setOpen(false);
        } else {
            setError("Invalid Passkey, please try again");
        }
    }

    const closeModal = () => {
        router.push('/')
    };


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">Admin Access Verification
                        <Image
                            src={"/assets/icons/close.svg"}
                            height={20}
                            width={20}
                            alt="close"
                            className="cursor-pointer"
                            onClick={() => closeModal()}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin panel, please enter your passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <InputOTP
                        maxLength={6}
                        value={passkey}
                        onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot index={0} className="shad-otp-slot" />
                            <InputOTPSlot index={1} className="shad-otp-slot" />
                            <InputOTPSlot index={2} className="shad-otp-slot" />
                            <InputOTPSlot index={3} className="shad-otp-slot" />
                            <InputOTPSlot index={4} className="shad-otp-slot" />
                            <InputOTPSlot index={5} className="shad-otp-slot" />
                        </InputOTPGroup>

                    </InputOTP>

                    {error && (
                        <p className="shad-error text-14-regular mt-4 flex justify-center">
                            {error}
                        </p>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={(e) => validatePasskey(e)}
                        className="shad-primary-btn hover:opacity-90 w-full">
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PasskeyModal
