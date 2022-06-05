import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
	required?: {
		value: boolean;
		message: string;
	};
	pattern?: {
		value: RegExp;
		message: string;
	};
	custom?: {
		isValid: (value: string) => boolean;
		message: string;
	};
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T> = Partial<Record<keyof T, Validation>>;

export const useForm = <
	T extends Record<keyof T, unknown> = Record<string, unknown>
>(options?: {
	validations?: Validations<T>;
	initialValues?: Partial<T>;
	onSubmit?: () => Promise<void>;
}) => {
	const [data, setData] = useState<T>((options?.initialValues || {}) as T);
	const [errors, setErrors] = useState<ErrorRecord<T>>({});

	const handleChange =
		<S,>(key: keyof T, sanitizeFn?: (value: string) => S) =>
		(e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
			const value = sanitizeFn
				? sanitizeFn(e.target.value)
				: e.target.value;
			setData({ ...data, [key]: value });
		};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validations = options?.validations;
		if (validations) {
			let valid = true;
			const newErrors: ErrorRecord<T> = {};
			for (const key in validations) {
				const value = data[key];
				const validation = validations[key];

				// is required?
				if (validation?.required?.value && !value) {
					valid = false;
					newErrors[key] = validation?.required?.message;
					continue; // for most important error to preserve
				}

				// match pattern
				const pattern = validation?.pattern;
				if (
					pattern?.value &&
					!RegExp(pattern?.value).test(value as string)
				) {
					valid = false;
					newErrors[key] = pattern?.message;
					continue; // for most important error to preserve
				}

				// custom valid function
				const custom = validation?.custom;
				if (custom?.isValid && !custom.isValid(value as string)) {
					valid = false;
					newErrors[key] = custom.message;
				}
			}

			if (!valid) {
				setErrors(newErrors);
				return;
			}
		}
		setErrors({});

		if (options?.onSubmit) {
			await options.onSubmit();
		}
	};

	return {
		data,
		handleChange,
		handleSubmit,
		errors,
	};
};
