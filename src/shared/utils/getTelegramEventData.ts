type EventData<T1, T2> = {
    eventType: T1
    eventData: T2
}

type TriggerHapticFeedback = {
    type: "impact"
    impact_style: "soft"
}

export type MainButton = {
    is_visible: boolean
    is_active: boolean
    is_progress_visible: boolean
    text: string
    color: string
    text_color: string
}

export const getTelegramEventData = (event: unknown) => {
    return JSON.parse(event.data) as
        | EventData<"web_app_setup_main_button", MainButton>
        | EventData<"web_app_setup_back_button", { is_visible: boolean }>
        | EventData<"web_app_set_header_color", { color: string }>
        | EventData<"web_app_set_background_color", { color: string }>
        | EventData<"web_app_trigger_haptic_feedback", TriggerHapticFeedback>
}
