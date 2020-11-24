import type { SellingPoints, AreaType } from '../types/Types';
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
