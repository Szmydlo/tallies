import "../styles/globals.css";

import type { AppProps } from "next/app";
import { NavBar } from "../components/Layout/NavBar";
import { Provider } from "react-redux";
import RouteGuard from "../components/Auth/RouteGuard";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<RouteGuard>
				<div id="overlays" />
				<NavBar />
				<Component {...pageProps} />
			</RouteGuard>
		</Provider>
	);
}

export default MyApp;
