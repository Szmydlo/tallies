import React from "react";

type Props = {
	onClick?: () => void;
	text?: string;
	type?: "button" | "submit" | "reset" | undefined;
};

const PrimaryButton = (props: Props) => {
	return (
		<button
			onClick={props.onClick}
			className=" my-2 rounded bg-yellow-400 py-2 px-3 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:text-yellow-800"
			type={props.type ? props.type : "button"}
		>
			{props.text}
		</button>
	);
};

export default PrimaryButton;
