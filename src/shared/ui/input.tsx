import { cn } from "@/shared/utils"
import { ClassValue } from "clsx"
import { ComponentPropsWithRef } from "react"

type InputProps = {
    className?: ClassValue
} & ComponentPropsWithRef<"input">

export const Input = (props: InputProps) => {
    return (
        <input
            {...props}
            className={cn(
                "p-2 rounded-xl bg-primary-foreground",
                props.className
            )}
        />
    )
}
