import { useEffect, useMemo, useRef, useState } from "react"
import {
    generateUrl,
    type TgWebAppDataUser,
    type TgWebAppThemeParams,
} from "../utils/generateUrl"
import { MainButton, getTelegramEventData } from "../utils/getTelegramEventData"

const defaultTheme: TgWebAppThemeParams = {
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
}
type MiniAppPreviewProps = {
    origin?: string
    botToken?: string
    userData?: Partial<TgWebAppDataUser>
}

export const MiniAppPreview = (props: MiniAppPreviewProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const [mainButton, setMainButton] = useState<MainButton | null>()
    const [isBackButtonVisible, setIsBackButtonVisible] = useState(false)
    const [headerColor, setHeaderColor] = useState<string | null>()
    const [backgroundColor, setBackgroundColor] = useState<string | null>()

    const url = useMemo(() => {
        if (!props.botToken) return undefined
        if (!props.origin || props.origin.length === 0) return undefined

        return generateUrl({
            botToken: props.botToken,
            origin: props.origin,
            tgWebAppParams: {
                tgWebAppData: {
                    query_id: "QUERY",
                    user: {
                        id: props.userData?.id ?? 0,
                        first_name: props.userData?.first_name ?? "",
                        language_code: "en",
                        ...props.userData,
                    },
                    auth_date: new Date(1000).getTime(),
                },
                tgWebAppVersion: "7.2",
                tgWebAppPlatform: "macos",
                tgWebAppBotInline: 1,
                tgWebAppThemeParams: defaultTheme,
            },
        })
    }, [props.botToken, props.origin, props.userData])

    useEffect(() => {
        const listener = (event: { data: string; origin: string }) => {
            if (event.origin !== props.origin) return

            const { eventType, eventData } = getTelegramEventData(event)

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
                case "web_app_trigger_haptic_feedback":
                case "web_app_request_viewport":
                case "web_app_request_theme":
                case "iframe_ready":
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
            "*"
        )
    }

    return (
        <div
            className={
                "flex flex-col rounded-2xl border border-solid border-white/10 overflow-hidden"
            }
            style={{
                width: 380,
                height: 740,
                backgroundColor: backgroundColor ? backgroundColor : undefined,
            }}
        >
            <div
                className={
                    "min-h-12 grid place-items-center relative text-white"
                }
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
                        className={"absolute left-2 h-12 w-12"}
                        children={"&#x2190;"}
                        onClick={() => {
                            sendToIframe("back_button_pressed")
                        }}
                    />
                )}
                <h2 className={"font-medium select-none"}>Your Mini App</h2>
            </div>
            {url && (
                <iframe
                    ref={iframeRef}
                    width={"100%"}
                    height={"100%"}
                    src={url}
                />
            )}
            {mainButton?.is_active && (
                <div className={"p-2"}>
                    <button
                        className={"h-12 w-full rounded-xl"}
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
    )
}
