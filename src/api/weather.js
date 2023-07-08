import { axiosInstance } from "../helpers/axiosConfig";

const fetchCurrentWeather = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=7b26c92417fd3678d52eac12dc870222`
	);
	return response;
};

const fetchWeatherForecast = async ({ lat, lon }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=7b26c92417fd3678d52eac12dc870222`
	);
	return response;
};

const fetchWeatherHistory = async ({ lat, lon, date }) => {
	const response = await axiosInstance.get(
		`/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=7b26c92417fd3678d52eac12dc870222&only_current={true}`
	);
	return response;
};

export default {
	fetchCurrentWeather,
	fetchWeatherForecast,
	fetchWeatherHistory,
};
