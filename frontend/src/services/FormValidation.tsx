export interface Return {
    error: boolean,
    message: string
}

export function FormValidation(value: any, min_length: Number | null, max_length: Number | null, regex: RegExp | null, field_name: String | null): Return {

    if (nullCheck(value)) {

        if (regex != null) {

            if (!regexCheck(value, regex)) {

                return { error: true, message: "The " + field_name + " is invalid" };

            }

        } 
        
        if (min_length != null) {

            if (!minLengthCheck(value, min_length)) {

                return { error: true, message: "The " + field_name + " must be at least " + min_length + " characters" };

            }

        } 
        
        if (max_length != null) {

            if (!maxLengthCheck(value, max_length)) {

                return { error: true, message: "The " + field_name + " must have a maximum of " + min_length + " characters" };

            }

        }

    } else {

        return { error: true, message: "The field needs to be filled" };

    }

    return { error: false, message: "" };

}

const nullCheck = (value: any): Boolean => {
    return value != null ? true : false;
}

const regexCheck = (value: any, regex: RegExp): Boolean => {
    return value.match(regex) ? true : false;
}

const minLengthCheck = (value: any, min_length: Number): Boolean => {
    return value.length >= min_length ? true : false;
}

const maxLengthCheck = (value: any, max_length: Number): Boolean => {
    return value.length <= max_length ? true : false;
}