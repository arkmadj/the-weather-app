export const getTime = (val) => {
	const date = new Date(val * 1000);
	let hours = date.getHours();
	const minutes = "0" + date.getMinutes();

	const timeSuffix = hours > 12 ? "PM" : "AM";

	hours = hours % 12;

	return `${hours}:${minutes.slice(-2)} ${timeSuffix}`;
};

export const getDay = (val, isShort = false) => {
	const date = new Date(val * 1000);

	const dayIndex = date.getDay();

	const dayNames = isShort
		? [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat",
		  ]
		: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
		  ];
	return dayNames[dayIndex];
};
