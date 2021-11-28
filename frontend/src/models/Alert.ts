export interface Alert {
    title:string
    summary?: string,
    variant: "success" | "warning" | "danger" | "info",
    timeout?: number
}