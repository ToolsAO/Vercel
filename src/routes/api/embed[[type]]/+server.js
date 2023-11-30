import GIFEncoder from 'gif-encoder-2/src/GIFEncoder'
import { ImageData, createCanvas, loadImage } from '@napi-rs/canvas'
import { getCurrentGearSet, patchBuildCode } from '$lib/utils/statsStore.js';
import { getAccessoryById, getChestplateById, getEnchantById, getGemById, getModifierById, getPantsById } from '$lib/utils/getItemById.js';
import {
    accessory1,
    accessory1Gem1,
    accessory1Gem2,
    accessory1Gem3,
    accessory1Enchant,
    accessory1Modifier,
    accessory2,
    accessory2Gem1,
    accessory2Gem2,
    accessory2Gem3,
    accessory2Enchant,
    accessory2Modifier,
    accessory3,
    accessory3Gem1,
    accessory3Gem2,
    accessory3Gem3,
    accessory3Enchant,
    accessory3Modifier,
    chestplate1,
    chestplate1Gem1,
    chestplate1Gem2,
    chestplate1Gem3,
    chestplate1Enchant,
    chestplate1Modifier,
    pants1,
    pants1Gem1,
    pants1Gem2,
    pants1Gem3,
    pants1Enchant,
    pants1Modifier,
    finalPower,
    finalDefense,
    finalAttackSpeed,
    finalIntensity,
    finalAttackSize,
    finalAgility,
    finalInsanity,
    finalDrawback,
    finalWarding
} from '$lib/utils/statsStore';
import { get } from 'svelte/store';

export async function GET({ setHeaders, params, url, fetch }) {
    let data = decodeURI(url.searchParams.get('data'));

    console.log(data);
    

    const width = 800
    const height = 600

    let stats = {
        "power":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/power.png", "colors":{"fill":"#FF8400"}, "value":0},
        "defense":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/defense.png", "colors":{"fill":"#737373"}, "value":0},
        "agility":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/agility.png", "colors":{"fill":"#FFFFFF","stroke":"#00ffff"}, "value":0},
        "attackspeed":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/attackspeed.png", "colors":{"fill":"#FFFFFF","stroke":"#0077ff"}, "value":0},
        "attacksize":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/attacksize.png", "colors":{"fill":"#00FF00","stroke":"#471559"}, "value":0},
        "intensity":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/intensity.png", "colors":{"fill":"#FFF200","stroke":"#712402"}, "value":0},
        "insanity":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/insanity.png", "colors":{"fill":"#8B27DB","stroke":"#DB0C45"}, "value":0},
        "drawback":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/drawback.png", "colors":{"fill":"#DC4040"}, "value":0},
        "warding":{imageId:"https://tools.arcaneodyssey.net/assets/images/itemstat/warding.png", "colors":{"fill":"#FFFFFF","stroke":"#CBCB55"}, "value":0}
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


    async function getImage(imageurl) {
        let temp = await loadImage(imageurl).catch((e) => {console.error(e.message+" "+imageurl);})
        return temp;
    }

    function getTextSize(ctx, text, fontface, box) {

        const getHeight = (measure) => measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;

        var fontsize = 100;
        ctx.font = fontsize + "px " + fontface

        while ((ctx.measureText(text).width > box[2] - box[0] || getHeight(bgctx.measureText(text)) > box[3] - box[1]) && fontsize > 1){
            fontsize--;
            ctx.font = fontsize + "px " + fontface;
        }

        return fontsize;
    }

    function drawTextFit(ctx, text, fontface, box, widthcenter=null, heightcenter=null, overrideFontSize=null) {

        const getHeight = (measure) => measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;

        var fontsize = 100;
        ctx.font = fontsize + "px " + fontface

        while ((ctx.measureText(text).width > box[2] - box[0] || getHeight(bgctx.measureText(text)) > box[3] - box[1]) && fontsize > 1 && overrideFontSize == null){
            fontsize--;
            ctx.font = fontsize + "px " + fontface;
        }

        if (overrideFontSize != null) {
            fontsize = overrideFontSize;
            ctx.font = fontsize + "px " + fontface;
        }

        if (widthcenter) {
            box[0] = box[0]+(((box[2] - box[0])-ctx.measureText(text).width)/2);
            box[1] = box[3]-getHeight(bgctx.measureText(text));
        }
        if (heightcenter) {
            box[1] = box[1]+(((box[3] - box[1])-getHeight(bgctx.measureText(text)))/2);
        }
        
        ctx.fillText(text, box[0], box[1]+getHeight(bgctx.measureText(text)));
        ctx.strokeText(text, box[0], box[1]+getHeight(bgctx.measureText(text)));
    }


    const rows = patchBuildCode(data);
    let gears = getCurrentGearSet();

    let index = 0;
    for (const category in gears) {
        const currentRow = rows[index].split('.');

        switch (true) {
            case category.startsWith('accessory') == true:
                gears[category].base.set(getAccessoryById(parseInt(currentRow[0])));
                break;
            case category.startsWith('chestplate') == true:
                gears[category].base.set(getChestplateById(parseInt(currentRow[0])));
                break;
            case category.startsWith('pants') == true:
                gears[category].base.set(getPantsById(parseInt(currentRow[0])));
                break;
            default:
                break;
        }
        gears[category].gem1.set(getGemById(parseInt(currentRow[1])));
        gears[category].gem2.set(getGemById(parseInt(currentRow[2])));
        gears[category].gem3.set(getGemById(parseInt(currentRow[3])));
        gears[category].enchant.set(getEnchantById(parseInt(currentRow[4])));
        gears[category].modifier.set(getModifierById(parseInt(currentRow[5])));
        index += 1;
    }

    data = {
        accessory1: {
            base: get(accessory1),
            gem1: get(accessory1Gem1),
            gem2: get(accessory1Gem2),
            gem3: get(accessory1Gem3),
            enchant: get(accessory1Enchant),
            modifier: get(accessory1Modifier)
        },
        accessory2: {
            base: get(accessory2),
            gem1: get(accessory2Gem1),
            gem2: get(accessory2Gem2),
            gem3: get(accessory2Gem3),
            enchant: get(accessory2Enchant),
            modifier: get(accessory2Modifier)
        },
        accessory3: {
            base: get(accessory3),
            gem1: get(accessory3Gem1),
            gem2: get(accessory3Gem2),
            gem3: get(accessory3Gem3),
            enchant: get(accessory3Enchant),
            modifier: get(accessory3Modifier)
        },
        chestplate1: {
            base: get(chestplate1),
            gem1: get(chestplate1Gem1),
            gem2: get(chestplate1Gem2),
            gem3: get(chestplate1Gem3),
            enchant: get(chestplate1Enchant),
            modifier: get(chestplate1Modifier)
        },
        pants1: {
            base: get(pants1),
            gem1: get(pants1Gem1),
            gem2: get(pants1Gem2),
            gem3: get(pants1Gem3),
            enchant: get(pants1Enchant),
            modifier: get(pants1Modifier)
        }
    };



    // loop though and download images
    for (const [categoryKey, category] of Object.entries(data)) {
        for (const [itemKey, item] of Object.entries(category)) {
            if (item["mainType"].toLowerCase() == "none") {
                item["mainType"] = item["imageId"].split("/")[2];
                console.log(item["mainType"])
            }
            console.log(item["mainType"])
            console.log(item["imageId"])
            images[item["mainType"].toLowerCase()][item["id"]] = await getImage("https://woodyloody.github.io/AOGearBuilder/"+item["imageId"]).catch((e) => {console.error(e.message);});
        }
    }

    for (const [statKey, stat] of Object.entries(stats)) {
        images["stat"][statKey] = await getImage(stat["imageId"]).catch((e) => {console.error(e.message);});
    }
    
    console.log(images);



    gears = data;

    //Initialize temp variables

    let finalPowerTemp = 0;
    let finalDefenseTemp = 0;
    let finalAgilityTemp = 0;
    let finalAttackSpeedTemp = 0;
    let finalAttackSizeTemp = 0;
    let finalIntensityTemp = 0;
    let finalInsanityTemp = 0;
    let finalDrawbackTemp = 0;
    let finalWardingTemp = 0;

    // Loop adding each item to a final count
    for (const item in gears) {
        const attributes = [
            'power',
            'defense',
            'agility',
            'attackSpeed',
            'attackSize',
            'intensity',
            'insanity',
            'drawback',
            'warding'
        ];

        const tempItem = {
            power: 0,
            defense: 0,
            agility: 0,
            attackSize: 0,
            attackSpeed: 0,
            intensity: 0,
            insanity: 0,
            drawback: 0,
            warding: 0
        };
        //Pre modifiers calculation.
        for (const attribute of attributes) {
            // Run through each stat and calculate their value
            tempItem[attribute] =
                gears[item].base[attribute] +
                gears[item].gem1[attribute] +
                gears[item].gem2[attribute] +
                gears[item].gem3[attribute] +
                (attribute === 'warding' || attribute === 'insanity' || attribute === 'drawback' // Test if the attribute is any of these 3
                    ? gears[item].enchant[attribute] // Add value directly if it is
                    : Math.floor(gears[item].enchant[attribute] * (gears[item].base.maxLevel / 10))); // Else multiply by maxLevel / 10
        }

        //Modifier Calculations
        const atlantenOrder = [
            'power',
            'defense',
            'attackSize',
            'attackSpeed',
            'agility',
            'intensity'
        ];

        if (gears[item].modifier.name == 'Atlantean Essence') {
            //Calculations for Atlantean
            if (
                //If all is more than zero add power
                tempItem.power > 0 &&
                tempItem.defense > 0 &&
                tempItem.agility > 0 &&
                tempItem.attackSize > 0 &&
                tempItem.attackSpeed > 0 &&
                tempItem.intensity > 0
            ) {
                tempItem.power += Math.floor(
                    gears[item].modifier.power * (gears[item].base.maxLevel / 10)
                );
                tempItem.insanity += gears[item].modifier.insanity;
            } else {
                // Else do normal atlantean calc
                for (let index = 0; index < atlantenOrder.length; index++) {
                    let currentStat = atlantenOrder[index];
                    let prevStat = atlantenOrder[index - 1];

                    if (tempItem[currentStat] == 0 && (prevStat === undefined || tempItem[prevStat] > 0)) {
                        tempItem[currentStat] += Math.floor(
                            gears[item].modifier[currentStat] * (gears[item].base.maxLevel / 10)
                        );
                        tempItem.insanity += gears[item].modifier.insanity;
                        break;
                    }
                }
            }
        } else {
            // Treat the rest of the modifiers as enchants.
            for (const attribute of attributes) {
                tempItem[attribute] += Math.floor(
                    gears[item].modifier[attribute] * (gears[item].base.maxLevel / 10)
                );
            }
        }

        for (const [statKey, stat] of Object.entries(tempItem)) {
            stats[statKey.toLowerCase()]["value"] += tempItem[statKey];
        }
    }

    console.log(data);

    console.log(stats);


    /*data = {
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
		accessory3: {
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
		}
    }*/



    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = "high";


    const bgCanvas = createCanvas(width, height);
    const bgctx = bgCanvas.getContext('2d');
    bgctx.imageSmoothingQuality = "high";
    bgctx.fillStyle = '#27272a';
    bgctx.fillRect(0, 0, width, height);
    bgctx.lineWidth = "5";
    bgctx.strokeStyle = "white";
    bgctx.rect(400, 10, 390, 580);
    bgctx.stroke();

    bgctx.fillStyle = '#FFFFFF';
    drawTextFit(bgctx, "Stats", "Calibri", [400, 20, 790, 70], true, true);

    let statFontSize = 100;
    for (const [index, [statKey, stat]] of Object.entries(Object.entries(stats))) {

        let tempsize = getTextSize(bgctx, "+ "+(100).toString()+" "+statKey.toUpperCase(), "Calibri", [460, 100+((index)*50), 780, 100+((index)*50)+50]);
        if (tempsize < statFontSize) {
            statFontSize = tempsize;
        }
    }

    for (const [index, [statKey, stat]] of Object.entries(Object.entries(stats))) {
        if ("fill" in stats[statKey]["colors"]) {
            bgctx.fillStyle = stats[statKey]["colors"]["fill"];
        }
        if ("stroke" in stats[statKey]["colors"]) {
            bgctx.strokeStyle = stats[statKey]["colors"]["stroke"];
        } else if ("fill" in stats[statKey]["colors"]) {
            bgctx.strokeStyle = stats[statKey]["colors"]["fill"];
        }
        drawTextFit(bgctx, "+ "+(stats[statKey]["value"]).toString()+" "+statKey.toUpperCase(), "Calibri", [460, 100+((index)*50), 780, 100+((index)*50)+50], false, true, statFontSize);
        let statimage = await images["stat"][statKey];
        bgctx.drawImage(statimage, 400, 100+(index*50), (statimage.width/statimage.height)*50, 50);
    }


    const encoder = new GIFEncoder(width, height, 'neuquant', true, 5)
    encoder.setDelay(1000)
    encoder.start()


    ctx.fillStyle = '#FFFFFF';
    for (const [categoryKey, category] of Object.entries(data)) {
        ctx.drawImage(bgCanvas, 0, 0, 800, 600);

        //ctx.fillStyle = category["base"]["rarityColor"];
        drawTextFit(ctx, category["base"]["name"], "Calibri", [10, 10, 390, 100], true, false);

        ctx.drawImage(await images[category["base"]["mainType"].toLowerCase()][category["base"]["id"]], 150, 150, 100, 100);
        // make none have max gems
        if (category["base"]["name"].toLowerCase() == "none") {
            category["base"]["gemNo"] = 3;
        }
        for (let i = 0; i < category["base"]["gemNo"]; i++) {
            ctx.drawImage(await images[category["gem"+(i+1).toString()]["mainType"].toLowerCase()][category["gem"+(i+1).toString()]["id"]], (parseInt((100*i)+((((4-category["base"]["gemNo"]))*100)/(category["base"]["gemNo"]+1))*(i+1))), 300);
        }
        ctx.drawImage(await images[category["enchant"]["mainType"].toLowerCase()][category["enchant"]["id"]], parseInt(200/3), 450);
        ctx.drawImage(await images[category["modifier"]["mainType"].toLowerCase()][category["modifier"]["id"]], (100+parseInt((200/3)*2)), 450);

        encoder.addFrame(ctx);
    }

    
    /*ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#FFFFFF'
    //drawTextFit(ctx, data, "Calibri", [10, 10, 390, 100], true, true);
    encoder.addFrame(ctx)
    
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#00ff00'
    ctx.fillRect(100, 0, 100, 100)
    encoder.addFrame(ctx)
    
    ctx.drawImage(bgCanvas, 0, 0);
    ctx.fillStyle = '#0000ff'
    ctx.fillRect(100, 100, 100, 100)
    encoder.addFrame(ctx)*/
    
    
    encoder.finish()
    
    const buffer = encoder.out.getData()

    // not needed but probably a good idea to have
    /*setHeaders({
        'Content-Type': "image/gif"
    });*/
    return new Response(buffer);
}



