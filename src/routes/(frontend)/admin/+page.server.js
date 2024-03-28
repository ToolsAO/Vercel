import { items } from '$db/items.js';
import { info } from '$db/info.js';
import { presets } from '$db/presets.js';
import { password } from '$db/password.js';
import { error, fail } from '@sveltejs/kit';

async function verifyPassword(data) {
	let passwordobj = await password.findOne({"password":data.get('password')});
	if (passwordobj == null || passwordobj["active"] != true) {
		return fail(403, { "error":"Password incorrect" });
	}
	return true;
}

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
		let validPass = await verifyPassword(data);
		if (validPass != true) {
			return validPass;
		}
        await items.insertOne({"name":data.get('name'), "id":parseInt(data.get('id')), "legend":data.get('legend')});

		/*await items.insertOne({
			"id":
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
		})*/
	},
	update: async ({ request }) => {
		const [data, rarity] = [await request.formData(), await info.findOne({"id":"rarity"}, {projection: {_id: 0}})];
		let validPass = await verifyPassword(data);
		if (validPass != true) {
			return validPass;
		}
		await items.updateOne({"$and":[{"id":parseInt(data.get('id'))}, {"mainType":data.get('previoustype')}]}, { $set: {
			"name" : data.get('name'),
			"legend" : data.get('legend'),
			//"mainType" : data.get('mainType'),
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
		let validPass = await verifyPassword(data);
		if (validPass != true) {
			return validPass;
		}
		await items.deleteOne({"name":data.get("name")});
	},
	createPreset: async ({ request }) => {
		const data = await request.formData();
		let validPass = await verifyPassword(data);
		if (validPass != true) {
			return validPass;
		}

		let highest = await presets.find({}).sort({"id" : -1}).limit(1).toArray();
		let id = highest[0]["id"] + 1;

        await presets.insertOne({
			"name":data.get('name'), 
			"id":id, 
			"code":data.get('code'),
			"author":data.get('author'),
			"description":data.get('description'),
			"type":data.get('type'),
			"tags":[],
		});
	},
};