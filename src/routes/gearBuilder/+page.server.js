import { main } from '$db/main.js';

export async function load({ fetch, setHeaders }) {

    const data = await main.findOne({test:"test"}, {projection: {
		_id: 0
	}});

    console.log(data);

	return {
		data: data
	}
}
