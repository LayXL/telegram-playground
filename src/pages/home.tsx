import { useEffect, useRef, useState } from "react"
import { generateUrl } from "../shared/utils/generateUrl"

type EventData<T1, T2> = {
    eventType: T1
    eventData: T2
}

type MainButton = {
    is_visible: boolean
    is_active: boolean
    is_progress_visible: boolean
    text: string
    color: string
    text_color: string
}

export const Home = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const [botToken, setBotToken] = useState("")
    const [origin, setOrigin] = useState("http://localhost:5173")

    const [mainButton, setMainButton] = useState<MainButton | null>()
    const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)
    const [headerColor, setHeaderColor] = useState<string | null>()
    const [backgroundColor, setBackgroundColor] = useState<string | null>()

    const url = generateUrl({
        botToken,
        origin,
        tgWebAppParams: {
            tgWebAppData: {
                query_id: "QUERY",
                user: {
                    id: 5000856692,
                    first_name: "Виталий",
                    last_name: "DEV TEST",
                    username: "vvlay",
                    language_code: "en",
                    allows_write_to_pm: true,
                    is_premium: true,
                },
                auth_date: 1718317078,
            },
            tgWebAppVersion: "7.2",
            tgWebAppPlatform: "macos",
            tgWebAppBotInline: 1,
            tgWebAppThemeParams: {
                button_text_color: "#ffffff",
                accent_text_color: "#007aff",
                header_bg_color: "#1c1c1c",
                section_bg_color: "#282828",
                text_color: "#ffffff",
                button_color: "#007aff",
                hint_color: "#ffffff",
                section_header_text_color: "#e5e5e5",
                link_color: "#007aff",
                bg_color: "#282828",
                secondary_bg_color: "#1c1c1c",
                subtitle_text_color: "#ffffff",
                destructive_text_color: "#ff453a",
            },
        },
    })

    useEffect(() => {
        const listener = (event: { data: string; origin: string }) => {
            if (event.origin !== origin) return

            const { eventType, eventData } = JSON.parse(event.data) as
                | EventData<"web_app_setup_main_button", MainButton>
                | EventData<
                      "web_app_setup_back_button",
                      { is_visible: boolean }
                  >
                | EventData<"web_app_set_header_color", { color: string }>
                | EventData<"web_app_set_background_color", { color: string }>

            switch (eventType) {
                case "web_app_setup_main_button":
                    setMainButton(eventData)
                    break
                case "web_app_set_header_color":
                    setHeaderColor(eventData.color)
                    break
                case "web_app_set_background_color":
                    setBackgroundColor(eventData.color)
                    break
                case "web_app_setup_back_button":
                    setIsBackButtonVisible(eventData.is_visible)
                    break
                default:
                    console.log(eventType, eventData)
                    break
            }
        }

        window.addEventListener("message", listener)

        return () => {
            window.removeEventListener("message", listener)
        }
    })

    const sendToIframe = (eventType: string, eventData?: unknown) => {
        iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ eventType, eventData: eventData ?? null }),
            origin
        )
    }

    return (
        <div className="flex gap-4 h-screen items-stretch p-4">
            <div className="rounded-2xl border border-solid border-white/10 p-4">
                <input type="text" />
            </div>
            <div
                className="flex-1 flex justify-center items-center rounded-2xl border border-solid border-white/10"
                style={{
                    backgroundImage:
                        "linear-gradient(#ffffff18 1px, transparent 1px), linear-gradient(to right, #ffffff18 1px, #ffffff00 1px)",
                    backgroundSize: "32px 32px",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="flex flex-col rounded-2xl border border-solid border-white/10 overflow-hidden"
                    style={{
                        width: 380,
                        height: 740,
                        backgroundColor: backgroundColor
                            ? backgroundColor
                            : undefined,
                    }}
                >
                    <div
                        className="min-h-12 grid place-items-center relative text-white"
                        style={
                            headerColor
                                ? {
                                      backgroundColor: headerColor,
                                  }
                                : undefined
                        }
                    >
                        {isBackButtonVisible && (
                            <button
                                className="absolute left-2 h-12 w-12"
                                children="&#x2190;"
                                onClick={() => {
                                    sendToIframe("back_button_pressed")
                                }}
                            />
                        )}
                        <h2 className="font-medium select-none">
                            Your Mini App
                        </h2>
                    </div>
                    <iframe
                        ref={iframeRef}
                        width={"100%"}
                        height={"100%"}
                        src={url}
                    />
                    {mainButton?.is_active && (
                        <div className="p-2">
                            <button
                                className="h-12 w-full rounded-xl"
                                style={{
                                    backgroundColor: mainButton.color,
                                    color: mainButton.text_color,
                                }}
                                children={mainButton.text}
                                onClick={() => {
                                    sendToIframe("main_button_pressed")
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
