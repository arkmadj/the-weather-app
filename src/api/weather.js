import { axiosInstance } from "../helpers/axiosConfig";

const fetchCurrentWeather = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=bd5e378503939ddaee76f12ad7a97608`
	);
	return response;
};

const fetchWeatherForecast = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=bd5e378503939ddaee76f12ad7a97608`
	);
	return response;
};

const fetchWeatherHistory = async ({ lat, lon, date }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=bd5e378503939ddaee76f12ad7a97608&only_current={true}`
	);
	return response;
};

const fetchCurrentWeatherByCoords = async (lat, lon) => {
	const response = await axiosInstance.get(
		`/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f082ca3698101afdf815e0340cb1cd35&cnt=1`
	);
	return response;
};

export default {
	fetchCurrentWeather,
	fetchWeatherForecast,
	fetchWeatherHistory,
	fetchCurrentWeatherByCoords,
};
