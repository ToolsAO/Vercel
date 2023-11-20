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
        await items.insertOne({"name":data.get('name')});
	}
};