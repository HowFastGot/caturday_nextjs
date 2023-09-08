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

export type ActionCategory = 'Likes' | 'Favourites' | 'Dislikes';

export interface IUserAction {
	action: string;
	time: number;
	catId: string;
	category: ActionCategory;
	voteId?: number;
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
export type UrlPattern =
	| 'https://api.thecatapi.com/v1/votes'
	| 'https://api.thecatapi.com/v1/favourites';

export interface IVotePost {
	image_id: string;
	value?: number | null; // null - if we send favorite post request!
	sub_id: string;
}

export interface IServerFeedback {
	message: string;
	id: number;
	image_id: string;
	sub_id: string;
	value: number;
	country_code: string;
}
export interface IServerCatsResp {
	id: number;
	image_id: string;
	sub_id: string;
	created_at: string;
	value: number;
	country_code: string;
	image: {
		id: string;
		url: string;
	};
}

type CatCartType = Pick<ICatCart, 'id' | 'url'>;
type ServerCatsRespType = Pick<IServerCatsResp, 'value'>;

type RenamedServerCatsRespType = CatCartType &
	ServerCatsRespType & {serverId: IServerCatsResp['id']};

export interface ICombinedServerResp extends RenamedServerCatsRespType {}
