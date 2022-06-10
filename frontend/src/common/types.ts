export interface FieldError {
    [key: string]: boolean
}

export interface FieldErrorMessage {
    [key: string]: string
}

export interface FormData {
    [key: string]: string | null
}

export interface Validation {
    error: boolean,
    message: string
}

export interface Response {
    status: boolean,
    error: boolean,
    message: string
}

export interface ResponseErrors {
    error: boolean,
    message: string 
}

export interface ServerValidationErrors {
    [key: string]: ResponseErrors
}
