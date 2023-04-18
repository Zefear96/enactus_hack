import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { API_GEO } from "@/utils/constants";

// type FetchGeoResponse = {

// }

export const fetchGeo = async () => {
	try {
		const { coords } = await new Promise<GeolocationPosition>(
			(resolve, reject) =>
				navigator.geolocation.getCurrentPosition(resolve, reject),
		);
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`,
		);
		const data = response.data;
		// console.log(data);

		const cityName =
			data.address.city || data.address.town || data.address.village;
		// console.log(cityName);

		return data.address;
	} catch (error) {
		console.error(error);
		throw new Error("Не можем получить ваши геоданные");
	}
};

export const useFetchGeo = () => {
	const query = useQuery({
		queryFn: fetchGeo,
		queryKey: ["geo"],
		initialData: null,
	});

	return [query.data, query] as const;
};
