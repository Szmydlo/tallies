import { ReactNode, useEffect, useState } from "react";

import ReactDOM from "react-dom";
import SecondaryButton from "../Buttons/SecondaryButton";

const Backdrop = (props: { onClose: () => void }) => {
	return (
		<div
			className="fixed top-0 left-0 z-20 h-[100vh] w-full bg-black bg-opacity-75"
			onClick={props.onClose}
		/>
	);
};

const ModalOverlay = (props: { onClose: () => void; children: ReactNode }) => {
	return (
		<div className="fixed top-[20vh] left-[25%] z-30 w-[50%] rounded-xl bg-white p-4 shadow-3xl">
			<div>{props.children}</div>
			<div className="flex w-full justify-end">
				<SecondaryButton onClick={props.onClose} text="Close" />
			</div>
		</div>
	);
};

const Modal = (props: { onClose: () => void; children: ReactNode }) => {
	const [mounted, setMounted] = useState(false);

	const createPortals = (): JSX.Element => {
		return (
			<>
				{ReactDOM.createPortal(
					<Backdrop onClose={props.onClose} />,
					document.querySelector("#overlays") as HTMLElement
				)}
				{ReactDOM.createPortal(
					<ModalOverlay onClose={props.onClose}>
						{props.children}
					</ModalOverlay>,
					document.querySelector("#overlays") as HTMLElement
				)}
			</>
		);
	};

	// for proper document element access
	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return mounted ? createPortals() : null;
};

export default Modal;
