import { axiosInstance } from "../helpers/axiosConfig";

const fetchCurrentWeather = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6`
	);
	return response;
};

const fetchWeatherForecast = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=e7704bc895b4a8d2dfd4a29d404285b6`
	);
	return response;
};

const fetchWeatherHistory = async ({ lat, lon, date }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=e7704bc895b4a8d2dfd4a29d404285b6&only_current={true}`
	);
	return response;
};

export default {
	fetchCurrentWeather,
	fetchWeatherForecast,
	fetchWeatherHistory,
};
