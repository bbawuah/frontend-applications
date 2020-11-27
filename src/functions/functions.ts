import type { SellingPoints, AreaType, D3Data } from '../types/Types';
export function startDateData(arr: SellingPoints[], year: string) {
	const filterOpDatum = arr
		.map((data) =>
			data.areas.filter((data) => {
				return data.startdatesellingpoint.includes(year);
			}),
		)
		.filter((d) => d.length !== 0);

	const typedFilterDatum = filterOpDatum.map((arr) => {
		return {
			area: arr[0].areamanagerid,
			areas: arr,
		};
	});

	return typedFilterDatum;
}

export function getDateFormat(str: string): string {
	const raw = str.split('').slice(0, 4);
	const clean = raw.join('');

	return clean;
}

export function getPaymentMethods(json: AreaType[]): string[] {
	const array = json.map((item: AreaType) => {
		return item.paymentmethod.toUpperCase();
	});

	return [...new Set(array)];
}

export function getPaymentData(filter, data) {
	const arr: D3Data[] = filter.map((payment) => {
		const paymentMethodAreas = data.filter(
			(item: AreaType) => item.paymentmethod.toUpperCase() === payment,
		);
		return {
			paymentMethodTitle: payment,
			areas: paymentMethodAreas,
		};
	});
	return arr;
}

export function parseCreditCardData(arr: D3Data[]): number {
	let data: AreaType[] = [];
	arr.forEach((item) => {
		data = [...data, ...item.areas];
	});

	return data.length;
}

export async function geoCodeReverse(longitude, latitude) {
	const res = await fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYmF3dWFoYjAwMSIsImEiOiJjanhjNnNydXkwMGJ1M3Bsb295N3JyandhIn0.FevIyeyQX3bhTpWGr0KJfw&limit=1`,
	);

	const json: any = await res.json();

	return json.features[0].context[3].text;
}
