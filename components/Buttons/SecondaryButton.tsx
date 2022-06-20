import React from "react";

type Props = {
	onClick: () => void;
	text: string;
	type?: "button" | "submit" | "reset" | undefined;
};

const SecondaryButton = (props: Props) => {
	return (
		<button
			onClick={props.onClick}
			className="w-18 my-2 rounded bg-gray-100 px-3 py-2 text-gray-900 transition duration-300 hover:bg-gray-300 hover:text-gray-800"
			type={props.type ? props.type : "button"}
		>
			{props.text}
		</button>
	);
};

export default SecondaryButton;
