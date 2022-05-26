import { loadEnvConfig } from "@next/env";

function globalSetup() {
	const projectDir = process.cwd();
	loadEnvConfig(projectDir);
}

export default globalSetup;
