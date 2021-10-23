import { Value } from "./interfaces";

export const castValueToString = (value: Value): string => {
    if (value === null) {
        return '';
    }

    return value.toString();
}
