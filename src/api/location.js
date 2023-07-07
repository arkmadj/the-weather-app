import { axiosLocationInstance } from "../helpers/axiosConfig";

const fetchCurrentLocation = async (lat, lon ) => {
	const response = await axiosLocationInstance.get(
		`/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAjwQBlPCN2pcy7dvH1MU5orEMx2s067N8`
	);
	return response;
};

export default {
  fetchCurrentLocation
};
