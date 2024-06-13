import { sign } from "./sign"

interface tgWebAppParams {
    tgWebAppData: TgWebAppData
    tgWebAppVersion: string
    tgWebAppBotInline: number
    tgWebAppPlatform: string
    tgWebAppThemeParams: TgWebAppThemeParams
}
interface TgWebAppData {
    query_id: string
    user: User
    auth_date: number
    hash?: string
}
interface User {
    id: number
    first_name: string
    last_name: string
    username: string
    language_code: string
    allows_write_to_pm: boolean
    is_premium: boolean
}
interface TgWebAppThemeParams {
    button_text_color: string
    accent_text_color: string
    header_bg_color: string
    section_bg_color: string
    text_color: string
    button_color: string
    hint_color: string
    section_header_text_color: string
    link_color: string
    bg_color: string
    secondary_bg_color: string
    subtitle_text_color: string
    destructive_text_color: string
}

export const generateUrl = (opts: {
    botToken: string
    origin: string
    tgWebAppParams: tgWebAppParams
}) => {
    if (opts.tgWebAppParams.tgWebAppData)
        opts.tgWebAppParams.tgWebAppData.hash = sign(
            opts.botToken,
            opts.tgWebAppParams.tgWebAppData
        )

    const { tgWebAppData, tgWebAppThemeParams, ...otherParams } =
        opts.tgWebAppParams

    return `${opts.origin}/#tgWebAppData=${encodeURIComponent(
        Object.entries(tgWebAppData)
            .map(
                ([key, value]) =>
                    `${key}=${typeof value === "object" ? encodeURIComponent(JSON.stringify(value)) : value}`
            )
            .join("&")
    )}&${Object.entries(otherParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}&tgWebAppThemeParams=${encodeURIComponent(
        JSON.stringify(tgWebAppThemeParams)
    )}`
}
