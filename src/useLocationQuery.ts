import { computed, shallowRef } from "vue";

export function useLocationQuery(name: string, defaultValue?: string) {
    const temp = shallowRef<string | undefined>(getValue(name, defaultValue))
    return computed({
        get() {
            return temp.value;
        },
        set(v: string) {
            temp.value = v;
            setValue(name, v)
        }
    })
}

function getValue(name: string, defaultValue: string | undefined): string | undefined {
    return new URLSearchParams(location.search).get(name) || defaultValue;
}



function setValue(name: string, value: string | undefined): string | undefined {
    const searchParams = new URLSearchParams(location.search);
    if (value === undefined) {
        searchParams.delete(name);
    } else {
        searchParams.set(name, value || '');
    }
    location.replace(`${location.pathname}?${searchParams.toString()}`);
    return new URLSearchParams(location.search).get(name) || value;
}
