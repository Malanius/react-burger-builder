export const checkValidity = (value, rules) => {
    if (!rules) {
        return true;
    }

    let isValid = true;

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLenght) {
        isValid = value.length >= rules.minLenght && isValid;
    }

    if (rules.maxLenght) {
        isValid = value.length <= rules.maxLenght && isValid;
    }

    return isValid;
}
