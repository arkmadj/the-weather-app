import { createStore, createLogger } from "vuex";
import weather from "./weather";
import location from "./location";
import app from "./app";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	modules: {
		weather,
		location,
		app
	},
	strict: debug,
  plugins: debug ? [createLogger()] : []
});