import CryptoJS from "crypto-js"

export function sign(botToken: string, tgWebAppData: unknown) {
    const data = Object.entries(tgWebAppData as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(
            ([key, value]) =>
                `${key}=${typeof value === "object" ? decodeURIComponent(JSON.stringify(value)) : value}`
        )
        .join("\n")

    const secretKey = CryptoJS.HmacSHA256(botToken, "WebAppData")

    return CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex)
}
