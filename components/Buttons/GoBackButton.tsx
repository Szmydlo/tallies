import { useRouter } from "next/router";
import React from "react";

const GoBackButton = () => {
	const router = useRouter();

	const goBack = async (): Promise<void> => {
		await router.push("/");
	};
	return (
		<button onClick={goBack} className="py-5 px-3">
			Go back
		</button>
	);
};

export default GoBackButton;
