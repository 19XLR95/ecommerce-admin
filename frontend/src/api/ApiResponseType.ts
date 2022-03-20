export interface ApiResponseType {
    code: number,
    data?: Record<string, unknown> | Array<Record<string, unknown>>,
}
