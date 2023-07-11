import api from "../../api";
import { Store } from "vuex";

const state = {
	current: {},
	forecast: [],
	history: [],
};

const getters = {};

const actions = {
	async fetchCurrentWeather({ commit }, coords) {
		try {
			const response = await api.weather.fetchCurrentWeather(coords);
			const data = response.data;
			commit("setCurrentWeather", data);
			return {
				isSuccess: true,
				message: "Current weather has been retrieved successfully",
				data,
			};
		} catch (error) {
			return {
				isSuccess: false,
				message: "Something went wrong, please try again",
				data: {},
			};
		}
	},

	async fetchWeatherForecast({ commit }, coords) {
		try {
			const response = await api.weather.fetchWeatherForecast(coords);
			const { daily } = response.data;
			daily.shift();
			commit("setWeatherForecast", daily);
			return {
				isSuccess: true,
				message: "Weather forecast has been retrieved successfully",
				data,
			};
		} catch (error) {
			return {
				isSuccess: false,
				message: "Something went wrong, please try again",
				data: {},
			};
		}
	},

	async fetchWeatherHistory({ commit }, coords) {
		try {
			const response = await api.weather.fetchWeatherHistory(coords);
			const { current } = response.data;
			commit("setWeatherHistory", current);
			return {
				isSuccess: true,
				message: "Weather history has been retrieved successfully",
				current,
			};
		} catch (error) {
			return {
				isSuccess: false,
				message: "Something went wrong, please try again",
				data: {},
			};
		}
	},
};

const mutations = {
	setCurrentWeather(state, data) {
		state.current = data;
	},
	setWeatherForecast(state, data) {
		state.forecast = data;
	},
	setWeatherHistory(state, data) {
		state.history = [...state.history, data];
		if (state.history.length > 5) state.history.shift();
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
