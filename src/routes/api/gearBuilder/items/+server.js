import { json } from '@sveltejs/kit';
import { items } from '$db/items.js';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function GET({ setHeaders, params, url, fetch }) {
    let types = url.searchParams.get('types') || "all";
    let list = url.searchParams.get('list') || false;

    let typesList = ["accessory", "chestplate", "enchant", "gem", "modifier", "pants"]

    let searchTypes = [];

    console.log(types);

    if (types.toLowerCase() == "all") {
        searchTypes = typesList;
    }

    if (types != "all") {
        for (let type of types.split(",")) {
            if (typesList.includes(type.toLowerCase())) {
                searchTypes.push(type);
            }
        }
    }
    


    let query = { $or: []};

    for (let type of searchTypes) {
        query["$or"].push({"mainType":capitalize(type)});
    }

    console.log(query)

    let data = await items.find(query, {projection: {
		_id: 0
	}}).toArray();


    if (list == false) {
        let tempdata = {};
        for (let type of searchTypes) {
            tempdata[type] = [];
        }
        for (let item of data) {
            tempdata[item["mainType"].toLowerCase()].push(item);
        }
        data = tempdata;
    }

  return json(data);
}