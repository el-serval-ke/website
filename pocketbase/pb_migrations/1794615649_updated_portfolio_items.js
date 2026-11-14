/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3523882650');

		// update field
		collection.fields.addAt(
			5,
			new Field({
				cascadeDelete: false,
				collectionId: 'pbc_863811952',
				help: '',
				hidden: false,
				id: 'relation105650625',
				maxSelect: 99,
				minSelect: 0,
				name: 'category',
				presentable: false,
				required: false,
				system: false,
				type: 'relation'
			})
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3523882650');

		// update field
		collection.fields.addAt(
			5,
			new Field({
				cascadeDelete: false,
				collectionId: 'pbc_863811952',
				help: '',
				hidden: false,
				id: 'relation105650625',
				maxSelect: 0,
				minSelect: 0,
				name: 'category',
				presentable: false,
				required: false,
				system: false,
				type: 'relation'
			})
		);

		return app.save(collection);
	}
);
