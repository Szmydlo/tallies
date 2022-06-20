import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";

// import configureStore from "redux-mock-store";

// const mockStore = configureStore([]);

// APPARENTLY CAN'T HIT 100% ON BRANCHES
describe("Buttons", () => {
	test("Primary Button renders and clicks", () => {
		const onClickMock = jest.fn();
		render(<PrimaryButton onClick={onClickMock} text="test" />);

		const button = screen.getByText(/test/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(onClickMock).toHaveBeenCalled();
	});

	test("Primary Button has type set", () => {
		const onClickMock = jest.fn();
		render(
			<PrimaryButton onClick={onClickMock} text="test" type="submit" />
		);

		const button: HTMLButtonElement = screen.getByText(/test/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(button.type).toEqual("submit");
		expect(onClickMock).toHaveBeenCalled();
	});

	test("Secondary Button renders and clicks", () => {
		const onClickMock = jest.fn();
		render(<SecondaryButton onClick={onClickMock} text="test" />);

		const button = screen.getByText(/test/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(onClickMock).toHaveBeenCalled();
	});

	test("Secondary Button has type set", () => {
		const onClickMock = jest.fn();
		render(
			<SecondaryButton onClick={onClickMock} text="test" type="submit" />
		);

		const button: HTMLButtonElement = screen.getByText(/test/i);
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
		expect(button.type).toEqual("submit");
		expect(onClickMock).toHaveBeenCalled();
	});
});
