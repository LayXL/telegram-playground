import { ReactNode } from "react"

type FormFieldProps = {
    label?: string
    children?: ReactNode
}

export const FormField = (props: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            <span
                className="text-sm opacity-60 select-none px-2"
                children={props.label}
            />
            {props.children}
        </div>
    )
}
