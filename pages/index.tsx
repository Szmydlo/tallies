import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div className="m-auto mt-4 flex h-96 w-96 flex-col justify-between">
			<div className="h-8  w-full text-center text-2xl">Welcome to</div>
			<div className="h-32 w-full text-center text-9xl italic">
				tallies
			</div>
			<div className="h-8 w-full text-center">
				Your challenge creator tool
			</div>
		</div>
	);
};

export default Home;
