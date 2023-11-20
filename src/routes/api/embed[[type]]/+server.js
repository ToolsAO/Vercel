import GIFEncoder from 'gif-encoder-2/src/GIFEncoder'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'


export async function GET({ setHeaders, params, url }) {
    let data = decodeURI(url.searchParams.get('data'));

    console.log(data);
    for (let font of GlobalFonts.families) {
        console.log(font["family"]);
    }
    
    function getImage(imageurl) {
        return loadImage(imageurl).catch((e) => {console.error(e.message+" "+imageurl);});
    }

    data = {
        accessory1: {
			base: {
                id: 1,
                name: 'Aereus Hat',
                legend: 'A dark purple hat lined with bronze, obtained from a Dark Sealed Chest.',
                defense: 0,
                power: 0,
                agility: 0,
                attackSize: 39,
                attackSpeed: 0,
                intensity: 26,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 120,
                gemNo: 2,
                mainType: 'Accessory',
                subType: 'Hat',
                rarity: 'Uncommon',
                rarityColor: '#817346',
                imageId: 'https://i.imgur.com/NeqZTZV.jpg'
            },
			gem1: {
                id: 2,
                name: 'Power',
                legend: 'Max Power Gem Innit',
                defense: 0,
                power: 3,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                imageId: 'https://i.imgur.com/uKo7HIn.jpg',
                rarityColor: '#7D7D7F'
            },
			gem2: {
                id: 2,
                name: 'Power',
                legend: 'Max Power Gem Innit',
                defense: 0,
                power: 3,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                imageId: 'https://i.imgur.com/uKo7HIn.jpg',
                rarityColor: '#7D7D7F'
            },
			gem3: {
                id: 0,
                name: 'None',
                legend: 'Nothing Lol',
                defense: 0,
                power: 0,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                rarityColor: '#FFFFFF',
                imageId: 'https://i.imgur.com/5pGLWmQ.jpg'
            },
			enchant: {
                id: 3,
                name: 'Armored',
                legend: 'An enchant that gives +9 points of Defense for every 10 levels of an item.',
                defense: 9,
                power: 0,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                mainType: 'Enchant',
                subType: 'None',
                rarity: 'Exotic',
                rarityColor: '#ED120E',
                imageId: 'https://i.imgur.com/XAMemmw.jpg'
            },
			modifier: {
                id: 1,
                name: 'Atlantean Essence',
                legend:
                    'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power',
                defense: 8.83, // Defense Changed?
                power: 1,
                agility: 3,
                attackSize: 3,
                attackSpeed: 3,
                intensity: 3,
                insanity: 1,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                mainType: 'Modifier',
                subType: 'None',
                rarity: 'Exotic',
                rarityColor: '#ED120E',
                imageId: 'https://i.imgur.com/JvqDmI1.jpg'
            }
		},
		accessory2: {
			base: {
                id: 6,
                name: 'Arcanium Bracelet',
                legend:
                    "A bracelet made out of arcanium metal, capable of conducting magic. It can be worn on the wrist to increase the wearer's power",
                defense: 0,
                power: 21,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 6,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 120,
                gemNo: 2,
                mainType: 'Accessory',
                subType: 'Arms',
                rarity: 'Uncommon',
                rarityColor: '#817346',
                imageId: 'https://i.imgur.com/w5gO6Mm.jpg'
            },
			gem1: {
                id: 2,
                name: 'Power',
                legend: 'Max Power Gem Innit',
                defense: 0,
                power: 3,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                imageId: 'https://i.imgur.com/uKo7HIn.jpg',
                rarityColor: '#7D7D7F'
            },
			gem2: {
                id: 2,
                name: 'Power',
                legend: 'Max Power Gem Innit',
                defense: 0,
                power: 3,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                imageId: 'https://i.imgur.com/uKo7HIn.jpg',
                rarityColor: '#7D7D7F'
            },
			gem3: {
                id: 0,
                name: 'None',
                legend: 'Nothing Lol',
                defense: 0,
                power: 0,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                rarity: 'None',
                mainType: 'Gem',
                subType: 'None',
                rarityColor: '#FFFFFF',
                imageId: 'https://i.imgur.com/5pGLWmQ.jpg'
            },
			enchant: {
                id: 3,
                name: 'Armored',
                legend: 'An enchant that gives +9 points of Defense for every 10 levels of an item.',
                defense: 9,
                power: 0,
                agility: 0,
                attackSize: 0,
                attackSpeed: 0,
                intensity: 0,
                insanity: 0,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                mainType: 'Enchant',
                subType: 'None',
                rarity: 'Exotic',
                rarityColor: '#ED120E',
                imageId: 'https://i.imgur.com/XAMemmw.jpg'
            },
			modifier: {
                id: 1,
                name: 'Atlantean Essence',
                legend:
                    'Gives stats per 10 levels rounded down in the following order depending on if your item has the stat or not: Power -> Defense -> Attack Size -> Attack Speed -> Agility -> Intensity -> Power',
                defense: 8.83, // Defense Changed?
                power: 1,
                agility: 3,
                attackSize: 3,
                attackSpeed: 3,
                intensity: 3,
                insanity: 1,
                drawback: 0,
                warding: 0,
                maxLevel: 0,
                gemNo: 0,
                mainType: 'Modifier',
                subType: 'None',
                rarity: 'Exotic',
                rarityColor: '#ED120E',
                imageId: 'https://i.imgur.com/JvqDmI1.jpg'
            }
		},
		/*accessory3: {
			base: accessory3,
			gem1: accessory3Gem1,
			gem2: accessory3Gem2,
			gem3: accessory3Gem3,
			enchant: accessory3Enchant,
			modifier: accessory3Modifier
		},
		chestplate1: {
			base: chestplate1,
			gem1: chestplate1Gem1,
			gem2: chestplate1Gem2,
			gem3: chestplate1Gem3,
			enchant: chestplate1Enchant,
			modifier: chestplate1Modifier
		},
		pants1: {
			base: pants1,
			gem1: pants1Gem1,
			gem2: pants1Gem2,
			gem3: pants1Gem3,
			enchant: pants1Enchant,
			modifier: pants1Modifier
		}*/
    }

    const width = 800
    const height = 600

    let stats = {
        "power":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/power.png"},
        "defense":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/defense.png"},
        "agility":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/agility.png"},
        "attackspeed":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/attackspeed.png"},
        "attacksize":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/attacksize.png"},
        "intensity":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/intensity.png"},
        "insanity":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/insanity.png"},
        "drawback":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/drawback.png"},
        "warding":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/warding.png"}
    }


    let images = {
        "accessory":{},
        "chestplate":{},
        "pants":{},
        "gem":{},
        "enchant":{},
        "modifier":{},
        "stat":{}
    }

    // loop though and download images
    for (const [categoryKey, category] of Object.entries(data)) {
        for (const [itemKey, item] of Object.entries(category)) {
            images[item["mainType"].toLowerCase()][item["id"]] = getImage(item["imageId"]).catch((e) => {console.error(e.message);});
        }
    }

    for (const [statKey, stat] of Object.entries(stats)) {
        images["stat"][statKey] = getImage(stat["imageId"]).catch((e) => {console.error(e.message);});
    }
    
    console.log(images);

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')


    const bgCanvas = createCanvas(width, height);
    const bgctx = bgCanvas.getContext('2d');
    bgctx.fillStyle = '#27272a';
    bgctx.fillRect(0, 0, width, height);
    bgctx.lineWidth = "5";
    bgctx.strokeStyle = "white";
    bgctx.rect(400, 10, 390, 580);
    bgctx.stroke();

    // draw stats title
    bgctx.fillStyle = '#FFFFFF';
    bgctx.font = '50px Calibri';
    bgctx.fillText("Stats", 550, 60);

    for (const [index, [statKey, stat]] of Object.entries(Object.entries(stats))) {
        // draw stats text
        bgctx.font = '35px Calibri';
        bgctx.fillText("+ "+(100).toString()+" "+statKey.toUpperCase(), 460, 100+((index)*50));
        let statimage = await images["stat"][statKey];
        bgctx.drawImage(statimage, 400, 100+(index*50), (statimage.width/statimage.height)*50, 50);
    }


    const encoder = new GIFEncoder(width, height, 'octree', true, 5)
    encoder.setDelay(1000)
    encoder.start()


    for (const [categoryKey, category] of Object.entries(data)) {
        ctx.drawImage(bgCanvas, 0, 0);

        // draw name

        ctx.drawImage(await images[category["base"]["mainType"].toLowerCase()][category["base"]["id"]], 150, 150);
        for (let i = 0; i < category["base"]["gemNo"]; i++) {
            ctx.drawImage(await images[category["gem"+(i+1).toString()]["mainType"].toLowerCase()][category["gem"+(i+1).toString()]["id"]], (parseInt((100*i)+((((4-category["base"]["gemNo"]))*100)/(category["base"]["gemNo"]+1))*(i+1))), 300);
        }
        ctx.drawImage(await images[category["enchant"]["mainType"].toLowerCase()][category["enchant"]["id"]], parseInt(200/3), 450);
        ctx.drawImage(await images[category["modifier"]["mainType"].toLowerCase()][category["modifier"]["id"]], (100+parseInt((200/3)*2)), 450);
        
        encoder.addFrame(ctx)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#ff0000'
    //ctx.drawImage(await images["item"], 0, 0)
    encoder.addFrame(ctx)
    
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(100, 0, 100, 100)
    encoder.addFrame(ctx)
    
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#0000ff'
    ctx.fillRect(100, 100, 100, 100)
    encoder.addFrame(ctx)
    
    /*
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#ffff00'
    ctx.fillRect(0, 100, 100, 100)
    encoder.addFrame(ctx)
    */
    
    encoder.finish()
    
    const buffer = encoder.out.getData()

    /*setHeaders({
        'Content-Type': "image/gif"
    });*/
    return new Response(buffer);
}



