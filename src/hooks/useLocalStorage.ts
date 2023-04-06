import React, { useEffect, useState } from "react";

/**
 * Gets and Sets a key value pair from/to the Local Storage
 * @param key key to be used in the localstorage
 * @param initialValue a <Generic> value to set in local storage
 * @returns the value and a dispatch metod to set the value
 */
export default function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T)
) {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue) return JSON.parse(jsonValue);
		if (typeof initialValue === "function") {
			return (initialValue as () => T)();
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as [T, typeof setValue];
}
