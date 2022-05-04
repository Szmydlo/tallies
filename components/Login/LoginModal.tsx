import React from "react";
import Modal from "../Layout/Modal";
import LoginInputs from "./LoginInputs";

const LoginModal = (props: { onClose: () => void }) => {
	return (
		<Modal onClose={props.onClose}>
			<LoginInputs onSuccess={props.onClose} />
		</Modal>
	);
};

export default LoginModal;
