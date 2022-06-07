export function FormValidation(value: any, min_length: Number | null, max_length: Number | null, regex: RegExp | null, field_name: String | null): { error: boolean, message: string } {

    if (!nullCheck(value)) {

        return { error: true, message: "The field needs to be filled" };

    } else if (regex != null && !regexCheck(value, regex)) {

        return { error: true, message: "The " + field_name + " is invalid" };

    } else if (min_length != null && !minLengthCheck(value, min_length)) {

        return { error: true, message: "The " + field_name + " must be at least " + min_length + "characters" };

    } else if (max_length != null && !maxLengthCheck(value, max_length)) {

        return { error: true, message: "The " + field_name + " must have a maximum of " + min_length + "characters" };

    } else {

        return { error: false, message: "" };
        
    }

}

const nullCheck = (value: any): Boolean => {
    return value == null ? false : true;
}

const regexCheck = (value: any, regex: RegExp): Boolean => {
    return value.match(regex) ? true : false;
}

const minLengthCheck = (value: any, min_length: Number): Boolean => {
    return value >= min_length ? true : false;
}

const maxLengthCheck = (value: any, max_length: Number): Boolean => {
    return value <= max_length ? true : false;
}