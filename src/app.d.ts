import type PocketBase from 'pocketbase';
import type { AuthModel } from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
			user: AuthModel | null;
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		tinymce?: {
			init: (config: Record<string, unknown>) => void;
			[key: string]: unknown;
		};
	}
}

export {};
