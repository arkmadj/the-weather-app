import api from "../../api";

const state = {
	current: {
		lat: "",
		lon: "",
    city: "",
	},
};

const getters = {};

const actions = {
	async fetchCurrentLocation({ commit }, coords) {
		const { lat, lon } = coords;
		try {
			const response = await api.location.fetchCurrentLocation(lat, lon);
			const city = response.data.results[0].formatted_address;
			commit("setCurrentLocation", { lat, lon, city });
			return {
				isSuccess: true,
				message: "Current location has been retrieved successfully",
				data,
			};
		} catch (error) {
			return {
				isSuccess: false,
				message: "Something went wrong, please try again",
				data: "",
			};
		}
	},
};

const mutations = {
	setCurrentLocation(state, data) {
		state.current = data;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
