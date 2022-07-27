export interface Return {
    error: boolean,
    message: string
}

export function FormValidation(value: any, min_length: number | null, max_length: number | null, regex: RegExp | null, field_name: string | null): Return {

    if (nullCheck(value)) {

        if (regex != null) {

            if (regexCheck(value, regex)) {

                return { error: true, message: "The " + field_name + " is invalid" };

            }

        }

        if (min_length != null) {

            if (minLengthCheck(value, min_length)) {

                return { error: true, message: "The " + field_name + " must be at least " + min_length + " characters" };

            }

        }

        if (max_length != null) {

            if (maxLengthCheck(value, max_length)) {

                return { error: true, message: "The " + field_name + " must have a maximum of " + min_length + " characters" };

            }

        }

    } else {

        return { error: true, message: "The field needs to be filled" };

    }

    return { error: false, message: "" };

}

const nullCheck = (value: any): boolean => {
    return value != null;
}

const regexCheck = (value: any, regex: RegExp): boolean => {
    return !value.match(regex);
}

const minLengthCheck = (value: any, min_length: number): boolean => {
    return value.length < min_length;
}

const maxLengthCheck = (value: any, max_length: number): boolean => {
    return value.length > max_length;
}