export interface ILayoutProps {
	children: React.ReactNode;
}

export type BreedsType = {
	weight: {imperial: string; metric: string};
	adaptability: number;
	affection_level: number;
	alt_names: string;
	cfa_url: string;
	child_friendly: number;
	country_code: string;
	country_codes: string;
	description: string;
	dog_friendly: number;
	energy_level: number;
	experimental: number;
	grooming: number;
	hairless: number;
	health_issues: number;
	hypoallergenic: number;
	id: string;
	indoor: number;
	intelligence: number;
	life_span: string;
	name: string;
	natural: number;
	origin: string;
	rare: number;
	reference_image_id: string;
	rex: number;
	shedding_level: number;
	short_legs: number;
	social_needs: number;
	stranger_friendly: number;
	suppressed_tail: number;
	temperament: string;
	vcahospitals_url: string;
	vetstreet_url: string;
	vocalisation: number;
};
export interface ICatCart {
	breeds: BreedsType[];
	height: number;
	id: string;
	url: string;
	width: number;
}
export interface IUserAction {
	action: string;
	time: number;
	catId: string;
	category: 'Likes' | 'Favourites' | 'Dislikes';
}

export type Order = 'Random' | 'Desc' | 'Asc';
export type MimeContent = 'jpeg,png' | 'gif' | '';

export interface IPastedImg {
	url: string;
	name: string;
	file: File | null;
}

export interface iServerUploadResp {
	approved: 0 | 1;
	height: number;
	id: string;
	original_filename: string;
	pending: number;
	url: string;
	width: number;
}

export type Path = '/dislike-cats' | '/favorite-cats' | '/like-cats';