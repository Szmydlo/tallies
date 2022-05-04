import React from "react";

const LoginButton = (props: { onShowModal: () => void }) => {
	return (
		<button onClick={props.onShowModal} className="py-5 px-3">
			Login
		</button>
	);
};

export default LoginButton;
