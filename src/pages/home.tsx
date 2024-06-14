import { useStorage } from "@/shared/hooks/useStorage"
import { FormField } from "@/shared/ui/form/form-field"
import { Input } from "@/shared/ui/input"
import { MiniAppPreview } from "@/shared/ui/mini-app-preview"
import { TgWebAppDataUser } from "@/shared/utils/generateUrl"

export const Home = () => {
    const [botToken, setBotToken] = useStorage("botToken", "")
    const [origin, setOrigin] = useStorage("origin", "http://localhost:5173")
    const [userData, setUserData] = useStorage<Partial<TgWebAppDataUser>>(
        "userId",
        {}
    )

    return (
        <div className={"flex gap-4 h-screen items-stretch p-4"}>
            <div
                className={
                    "rounded-2xl border border-solid border-white/10 overflow-hidden p-4 flex flex-col gap-2"
                }
            >
                <FormField label={"Bot token"}>
                    <Input
                        type={"password"}
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                    />
                </FormField>
                <FormField label={"Origin"}>
                    <Input
                        type={"text"}
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </FormField>
            </div>
            <div
                className={
                    "flex-1 flex justify-center items-center rounded-2xl border border-solid border-white/10"
                }
                style={{
                    backgroundImage:
                        "linear-gradient(#ffffff18 1px, transparent 1px), linear-gradient(to right, #ffffff18 1px, #ffffff00 1px)",
                    backgroundSize: "32px 32px",
                    backgroundPosition: "center",
                }}
            >
                <MiniAppPreview
                    botToken={botToken}
                    origin={origin}
                    userData={userData}
                />
            </div>
        </div>
    )
}
