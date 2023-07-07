import { axiosLocationInstance } from "../helpers/axiosConfig";

const fetchCurrentLocation = async (lat, lon ) => {
	const response = await axiosLocationInstance.get(
		`/maps/api/geocode/json?latlng=${lat},${lon}&key=${import.meta.env.VITE_GOOGLE_APP_KEY}`
	);
	return response;
};

export default {
  fetchCurrentLocation
};
