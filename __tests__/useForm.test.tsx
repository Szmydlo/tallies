import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import { ReactElement } from "react";
import { useForm } from "../hooks/useForm";

type Elements = {
	form: HTMLFormElement;
	inputName: HTMLInputElement;
	inputEmail: HTMLInputElement;
	inputPassword: HTMLInputElement;
	submitButton: HTMLButtonElement;
};

let mockForm: ReactElement;
let UFReturn: any;
let elements: Elements;
const handleSubmitFn = jest.fn();

// mock inputs
const correctName = "Karol";
const wrongName = "karol";
const correctEmail = "test@test.com";
const wrongEmail1 = "test-test1.com";
const wrongEmail2 = "test@test";
const correctPassword = "qA1!test-test";
const wrongPassword1 = "test-test1";
const wrongPassword2 = "NoNumber";
const wrongPassword3 = "L3ng!h";

const TestForm = () => {
	const options = {
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		onSubmit: handleSubmitFn,
		validations: {
			name: {
				required: {
					value: true,
					message: "Name is required",
				},
				pattern: {
					value: /^[A-Z][a-zA-Z]*$/,
					message:
						"Name has to be one word and start with capital letter",
				},
			},
			password: {
				required: {
					value: true,
					message: "Password is required",
				},
				pattern: {
					value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
					message:
						"Password must contain: minimum 8 characters, one uppercase letter," +
						"one lowercase, one number and one special character (@$!%*#?&)",
				},
			},
			email: {
				required: {
					value: true,
					message: "Email is required",
				},
				pattern: {
					value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					message: "Email must match RFC 5322 Official Standard",
				},
			},
		},
	};

	UFReturn = useForm(options);
	const handleChangeName = UFReturn.handleChange("name");
	const handleChangeEmail = UFReturn.handleChange("email");
	const handleChangePassword = UFReturn.handleChange("password");

	mockForm = (
		<form
			data-testid="form"
			className="w-72"
			onSubmit={UFReturn.handleSubmit}
		>
			<input
				data-testid="input-name"
				type="text"
				placeholder="Jan"
				onChange={handleChangeName}
			/>
			<input
				data-testid="input-email"
				// type="email"
				placeholder="example@example.com"
				onChange={handleChangeEmail}
			/>
			<input
				data-testid="input-password"
				type="password"
				autoComplete="off"
				onChange={handleChangePassword}
			/>
			<button data-testid="submit-button" type="submit">
				Sign up
			</button>
		</form>
	);

	return mockForm;
};

beforeEach(() => {
	const dom = render(<TestForm />);
	const form: HTMLFormElement = dom.queryByTestId("form") as HTMLFormElement;
	const inputName: HTMLInputElement = dom.queryByTestId(
		"input-name"
	) as HTMLInputElement;
	const inputEmail: HTMLInputElement = dom.queryByTestId(
		"input-email"
	) as HTMLInputElement;
	const inputPassword: HTMLInputElement = dom.queryByTestId(
		"input-password"
	) as HTMLInputElement;
	const submitButton: HTMLButtonElement = dom.queryByTestId(
		"submit-button"
	) as HTMLButtonElement;
	elements = { form, inputName, inputEmail, inputPassword, submitButton };
});

// APPARENTLY CAN'T HIT 100% ON BRANCHES
describe("useForm", () => {
	test("Form renders", () => {
		expect(elements.form).toBeInTheDocument();
	});

	test("Invalid input: name: null", () => {
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual("");
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(correctPassword);
		expect(UFReturn.errors.name).toContain("Name is required");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: name: wrong", () => {
		fireEvent.change(elements.inputName, {
			target: { value: wrongName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(wrongName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(correctPassword);
		expect(UFReturn.errors.name).toContain("Name has to be one word");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: email: null", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual("");
		expect(UFReturn.data.password).toEqual(correctPassword);
		expect(UFReturn.errors.email).toContain("Email is required");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: email: wrong 1", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: wrongEmail1 },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(wrongEmail1);
		expect(UFReturn.data.password).toEqual(correctPassword);
		expect(UFReturn.errors.email).toContain("Email must match RFC 5322");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: email: wrong 2", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: wrongEmail2 },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(wrongEmail2);
		expect(UFReturn.data.password).toEqual(correctPassword);
		expect(UFReturn.errors.email).toContain("Email must match RFC 5322");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: password: null", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual("");
		expect(UFReturn.errors.password).toContain("Password is required");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: password: wrong 1", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: wrongPassword1 },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(wrongPassword1);
		expect(UFReturn.errors.password).toContain("Password must contain:");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: password: wrong 2", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: wrongPassword2 },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(wrongPassword2);
		expect(UFReturn.errors.password).toContain("Password must contain:");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: password: wrong 3", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: wrongPassword3 },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(wrongPassword3);
		expect(UFReturn.errors.password).toContain("Password must contain:");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Invalid input: mix", () => {
		fireEvent.change(elements.inputName, {
			target: { value: wrongName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: wrongEmail1 },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: wrongPassword1 },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(wrongName);
		expect(UFReturn.data.email).toEqual(wrongEmail1);
		expect(UFReturn.data.password).toEqual(wrongPassword1);
		expect(UFReturn.errors.name).toContain("Name has to be one word and");
		expect(UFReturn.errors.email).toContain("Email must match RFC 5322");
		expect(UFReturn.errors.password).toContain("Password must contain:");
		// valid = false => not called
		expect(handleSubmitFn).not.toHaveBeenCalled();
	});

	test("Valid input", () => {
		fireEvent.change(elements.inputName, {
			target: { value: correctName },
		});
		fireEvent.change(elements.inputEmail, {
			target: { value: correctEmail },
		});
		fireEvent.change(elements.inputPassword, {
			target: { value: correctPassword },
		});
		fireEvent.click(elements.submitButton);

		expect(UFReturn.data.name).toEqual(correctName);
		expect(UFReturn.data.email).toEqual(correctEmail);
		expect(UFReturn.data.password).toEqual(correctPassword);
		// valid = true => called
		expect(handleSubmitFn).toHaveBeenCalled();
	});
});
