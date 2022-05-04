import React from "react";

const CloseButton = (props: { onClose: () => void }) => {
	return (
		<button
			className="rounded bg-yellow-400 px-3 py-2 text-yellow-900 transition duration-300 hover:bg-yellow-300 hover:text-yellow-800"
			onClick={props.onClose}
		>
			Close
		</button>
	);
};

export default CloseButton;
