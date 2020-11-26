import type { SellingPoints, AreaType, D3Data } from '../types/Types';
export function startDateData(arr: SellingPoints[]) {
	const filterOpDatum = arr
		.map((data) =>
			data.areas.filter((data) => {
				return data.startdatesellingpoint.includes('2019');
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
