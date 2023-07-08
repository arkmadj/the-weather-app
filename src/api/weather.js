import { axiosInstance } from "../helpers/axiosConfig";

const fetchCurrentWeather = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${
			import.meta.env.VITE_OPEN_WEATHER_API_KEY
		}`
	);
	return response;
};

const fetchWeatherForecast = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=${
			import.meta.env.VITE_OPEN_WEATHER_API_KEY
		}`
	);
	return response;
};

const fetchWeatherHistory = async ({ lat, lon, date }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=${
			import.meta.env.VITE_OPEN_WEATHER_API_KEY
		}&only_current={true}`
	);
	return response;
};

export default {
	fetchCurrentWeather,
	fetchWeatherForecast,
	fetchWeatherHistory,
};
