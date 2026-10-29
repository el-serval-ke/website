import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

export const POCKETBASE_URL = env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';

// Shared client-side instance
let clientInstance: PocketBase | null = null;

export function getPb(): PocketBase {
	if (typeof window !== 'undefined') {
		if (!clientInstance) {
			clientInstance = new PocketBase(POCKETBASE_URL);
			clientInstance.authStore.loadFromCookie(document.cookie);
		}
		return clientInstance;
	}
	return new PocketBase(POCKETBASE_URL);
}

export function getFileUrl(
	record: { id?: string; collectionId?: string; collectionName?: string } | null | undefined,
	filename: string | null | undefined,
	thumb?: string
): string {
	if (!record || !filename) return '';
	if (
		filename.startsWith('http://') ||
		filename.startsWith('https://') ||
		filename.startsWith('/')
	) {
		return filename;
	}
	const coll = record.collectionId || record.collectionName;
	if (!coll || !record.id) return '';
	const url = `${POCKETBASE_URL}/api/files/${coll}/${record.id}/${filename}`;
	return thumb ? `${url}?thumb=${thumb}` : url;
}

// Data models
export interface BlogCategory {
	id: string;
	title: string;
	slug: string;
	description?: string;
	featured_image?: string;
	created: string;
	updated: string;
}

export interface Blog {
	id: string;
	title: string;
	slug: string;
	description?: string;
	featured_image?: string;
	tags?: string[];
	category?: string;
	expand?: {
		category?: BlogCategory;
	};
	created: string;
	updated: string;
}

export interface PortfolioClient {
	name: string;
	company: string;
	logo?: string;
	contact_details?: string;
}

export type PortfolioStatus = 'just_started' | 'ongoing' | 'concluding' | 'concluded';

export interface PortfolioItem {
	id: string;
	title: string;
	slug: string;
	client?: PortfolioClient;
	description?: string;
	category?: string;
	tags?: string[];
	featured_image?: string;
	link?: string;
	screenshots?: string[];
	video?: string;
	start_date?: string;
	end_date?: string;
	status?: PortfolioStatus;
	client_testimonial?: string;
	created: string;
	updated: string;
}

export interface Service {
	id: string;
	title: string;
	slug: string;
	description?: string;
	price_range?: string;
	price_period?: string;
	featured_image?: string;
	created: string;
	updated: string;
}
