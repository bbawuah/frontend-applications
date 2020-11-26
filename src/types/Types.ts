export enum PaymentMethods {
	VPAY = 'VPAY',
	CREDITCARD = 'CREDITCARD',
	CASH = 'CASH',
	MAESTRO = 'MAESTRO',
	PIN = 'PIN',
	CHIPKNIP = 'CHIPKNIP',
	COINS = 'COINS',
	BETAALAUTOMAAT = 'BETAALAUTOMAAT',
	POS = 'POS',
	CHIP = 'CHIP',
	BELPARKEREN = 'BELPARKEREN',
	BANKNOTES = 'BANKNOTES',
	MASTERCARD = 'MASTERCARD',
	VISA = 'VISA',
	MOBIEL = 'MOBIEL',
	AMEX = 'AMEX',
	DIP_TAP_GO = 'DIP-TAP&GO',
	DIP_GO = 'DIP-GO',
	XXIMIO = 'XXIMIO',
	DINERS_CLUB = 'DINERS-CLUB',
}

export enum CreditCards {
	CREDITCARD = 'CREDITCARD',
	MAESTRO = 'MAESTRO',
	MASTERCARD = 'MASTERCARD',
	VISA = 'VISA',
	AMEX = 'AMEX',
}

export enum AreaManagerID {
	AM1 = '299',
	AM2 = '518',
	AM3 = '677',
	AM4 = '243',
	AM5 = '243',
	AM6 = '402',
	AM7 = '642',
	AM8 = '202',
	AM9 = '439',
	AM10 = '546',
	AM11 = '715',
	AM12 = '867',
	AM13 = '363',
	AM14 = '384',
	AM15 = '307',
	AM16 = '361',
	AM17 = '935',
	AM18 = '1900',
	AM19 = '855',
	AM20 = '203',
	AM21 = '106',
	AM22 = '777',
	AM23 = '118',
	AM24 = '281',
	AM25 = '150',
	AM26 = '344',
	AM27 = '599',
	AM28 = '858',
	AM29 = '153',
	AM30 = '606',
	AM31 = '1942',
	AM32 = '1949',
	AM33 = '664',
	AM34 = '826',
}

export interface AreaType {
	areaid: string;
	areamanagerid: string;
	paymentatexit: string;
	paymentatpaystation: string;
	paymentmethod: string;
	startdate: string;
}

export interface D3Data {
	paymentMethodTitle: string;
	areas: AreaType[];
}

export interface Provincie {
	arcs: number[];
	id: string;
	properties: {
		FID: string;
		jrstatcode: string;
		rubriek: string;
		statcode: string;
		statnaam: string;
	};
	type: string;
}

export interface GEOType {
	provincie_2020: {
		geometries: Provincie[];
		type: string;
	};
}

export interface GEOData {
	arcs: number[][];
	bbox: number[];
	objects: {
		provincie_2020: {
			geometries: Provincie[];
			type: string;
		};
	};
	transform: {
		scale: number[];
		translate: number[];
	};
}

export interface Area {
	areamanagerid: string;
	enddatesellingpoint: string;
	sellingpointdesc: string;
	location: {
		human_address: string;
		latitude: string;
		longitude: string;
	};
	sellingpointid: string;
	startdatesellingpoint: string;
}
export interface SellingPoints {
	area: string;
	areas: Area[];
}

export interface ObjectForDataType {
	paymentData: Promise<D3Data[]>;
	sellingPointsData: Promise<SellingPoints[]>;
}
