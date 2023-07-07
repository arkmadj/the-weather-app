import { axiosLocationInstance } from "../helpers/axiosConfig";

const fetchCurrentLocation = async (lat, lon ) => {
  console.log("Env", import.meta.env.VITE_GOOGLE_APP_KEY)
	const response = await axiosLocationInstance.get(
		`/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAjwQBlPCN2pcy7dvH1MU5orEMx2s067N8`
	);
	return response;
};

export default {
  fetchCurrentLocation
};
