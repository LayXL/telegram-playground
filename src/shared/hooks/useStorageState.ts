import { useLocalStorage } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import superjson from "superjson"

export const useStorageState = <T>(key: string, initialValue?: T) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [localStorage, setLocalStorage] = useLocalStorage<string>(key)

    const [value, setValue] = useState(
        searchParams.get(key) || localStorage
            ? superjson.parse<T>(searchParams.get(key) || localStorage)
            : initialValue
    )

    useEffect(() => {
        if (!searchParams.has(key) && value) {
            searchParams.set(key, superjson.stringify(value))
            setSearchParams(searchParams)
        }

        if (!localStorage && value) {
            setLocalStorage(superjson.stringify(value))
        }
    }, [
        key,
        localStorage,
        searchParams,
        setLocalStorage,
        setSearchParams,
        value,
    ])

    return [
        value as T,
        (value: T) => {
            setValue(value)

            searchParams.set(key, superjson.stringify(value))
            setSearchParams(searchParams)

            setLocalStorage(superjson.stringify(value))
        },
    ]
}
