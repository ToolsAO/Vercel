import { items } from '$db/items.js';
import { info } from '$db/info.js';

export async function load({ fetch, setHeaders }) {

    const data = await items.find({}, {projection: {
		_id: 0
	}}).toArray();

	// get only the rarities names
	const dropdownsdata = await info.find({"id": {"$in": ["mainType","subType","rarity","imageFormat"]}}, {projection: {
		_id: 0
	}}).toArray();

	let dropdowns = {};

	for (let dropdown of dropdownsdata) {
		if (dropdown["id"] == "rarity") {
			dropdowns[dropdown["id"]] = [];
			for (const [key, value] of Object.entries(dropdown["data"])) {
				dropdowns[dropdown["id"]].push(key);
			}
		} else {
			dropdowns[dropdown["id"]] = dropdown["data"];
		}
	}


	return {
		items: data,
		dropdowns: dropdowns,
	}
}


export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
        await items.insertOne({"name":data.get('name'), "id":parseInt(data.get('id')), "legend":data.get('legend')});
	},
	update: async ({ request }) => {
		const [data, rarity] = [await request.formData(), await info.findOne({"id":"rarity"}, {projection: {_id: 0}})];
		await items.updateOne({"$and":[{"id":parseInt(data.get('id'))}, {"mainType":data.get('previoustype')}]}, { $set: {
			"name" : data.get('name'),
			"legend" : data.get('legend'),
			"mainType" : data.get('mainType'),
			"subType" : data.get('subType'),
			"rarity" : data.get('rarity'),
			"rarityColor" : rarity["data"][data.get('rarity')]["color"],
			"imageId" : data.get('imageId'),
			"defense" : parseInt(data.get('defense')),
			"power" : parseInt(data.get('power')),
			"agility" : parseInt(data.get('agility')),
			"attackSize" : parseInt(data.get('attackSize')),
			"attackSpeed" : parseInt(data.get('attackSpeed')),
			"intensity" : parseInt(data.get('intensity')),
			"insanity" : parseInt(data.get('insanity')),
			"drawback" : parseInt(data.get('drawback')),
			"warding" : parseInt(data.get('warding')),
			"maxLevel" : parseInt(data.get('maxLevel')),
			"gemNo" : parseInt(data.get('gemNo')),
		} })
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		await items.deleteOne({"name":data.get("name")});
	}
};