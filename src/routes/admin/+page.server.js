import { items } from '$db/items.js';

export async function load({ fetch, setHeaders }) {

    const data = await items.find({}, {projection: {
		_id: 0
	}}).toArray();

    console.log(data);

	return {
		items: data
	}
}


export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
        await items.insertOne({"name":data.get('name'), "id":parseInt(data.get('id')), "legend":data.get('legend')});
	},
	update: async ({ request }) => {
		const data = await request.formData();
		await items.updateOne({"$and":[{"id":parseInt(data.get('id'))}, {"mainType":data.get('previoustype')}]}, { $set: { "id" : parseInt(data.get('id')), "legend" : data.get('legend') } })
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		await items.deleteOne({"name":data.get("name")});
	}
};