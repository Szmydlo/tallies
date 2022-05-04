import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NavBar } from "../components/Layout/NavBar";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<div id="overlays" />
			<NavBar />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
