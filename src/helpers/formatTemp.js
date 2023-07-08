export const formatTemp = (val, unit, showUnit = false) => {
	const suffixUnit = showUnit ? (unit === "celsius" ? "ºC" : "ºF") : "";
	if (unit === "celsius") {
		return parseInt(val) + suffixUnit;
	}

	return parseInt(val * (9 / 5) + 32) + suffixUnit;
};
