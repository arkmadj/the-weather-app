const state = {
	loading: false,
  loadingForecast: false,
	unit: {
		name: "celsius",
		unit: "ºC",
	},
  showHighlights: false,
	showForecast: true,
};

const getters = {};

const actions = {};

const mutations = {
	setLoading(state, data) {
		state.loading = data;
	},
  setLoadingForecast(state, data){
    state.loading = data
  },
	setCurrentUnit(state, data) {
		state.unit = data;
	},
	toggleShowHighlights(state) {
		state.showHighlights = !state.showHighlights;
	},
	toggleShowForecast(state, data) {
		state.showForecast = data;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
