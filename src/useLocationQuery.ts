import { computed, shallowRef } from 'vue';

export function useLocationQuery<T extends string>(name: string, defaultValue?: T) {
  const temp = shallowRef<T | undefined>(getValue<T>(name, defaultValue));
  return computed({
    get() {
      return temp.value;
    },
    set(v: string) {
      temp.value = v;
      setValue(name, v);
    },
  });
}

function getValue<T extends string>(name: string, defaultValue: string | undefined): T | undefined {
  return (new URLSearchParams(location.search).get(name) || defaultValue) as T;
}

function setValue<T extends string>(name: string, value: T | undefined) {
  const searchParams = new URLSearchParams(location.search);
  if (value === undefined) {
    searchParams.delete(name);
  }
  else {
    searchParams.set(name, value || '');
  }
  location.replace(`${location.pathname}?${searchParams.toString()}`);
}
