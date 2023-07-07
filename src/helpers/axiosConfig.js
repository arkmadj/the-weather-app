import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org",
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

const axiosLocationInstance = axios.create({
  baseURL: "https://maps.googleapis.com",
});

axiosLocationInstance.defaults.headers.post["Content-Type"] = "application/json";

export { axiosInstance, axiosLocationInstance };
