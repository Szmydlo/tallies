import React from "react";
import { useRouter } from "next/router";

const GoBackButton = () => {
	const router = useRouter();

	const goBack = async (): Promise<void> => {
		try {
			await router.push("/");
		} catch (e) {
			throw new Error(e as string);
		}
	};
	return (
		<button onClick={goBack} className="py-5 px-3">
			Go back
		</button>
	);
};

export default GoBackButton;
