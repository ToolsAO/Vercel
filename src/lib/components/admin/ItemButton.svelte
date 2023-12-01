<script>
    import { enhance } from '$app/forms';

    export let item;

    let open = false;


    const handleToggle = () => {
        open = !open
    }

    // tutorials for the modal form https://flowbite.com/docs/forms/input-field/ https://samvcodes.medium.com/how-to-make-a-modal-component-in-svelte-and-tailwind-css-b3f20f9d1624
    // add a dark mode https://flowbite.com/docs/customize/dark-mode/
</script>


<button on:click={() => handleToggle()}
    ><img
        src={item["imageId"]}
        alt="{item["name"]} Button"
    /></button
>

{#if open}
<form method="POST" action="?/update" use:enhance={() => {
    return async ({ result, update }) => {
        update({ reset: false });

        if (result.type === 'success') {
            handleToggle();
        }
    };
}}>
<div
	class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 overflow-x-hidden overflow-y-auto"
>
	<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    
	    <div class="bg-white flex flex-col w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto dark:bg-black max-h-full">
            <div class="flex flex-shrink-0 justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold overflow-hidden">
                {item["name"]}
                <button
                    class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
                    on:click={() => handleToggle()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                        ><path d="M0 0h24v24H0V0z" fill="none" /><path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        /></svg
                    >
                </button>
            </div>
            
            <div class="content p-8 pt-2 overflow-y-auto">
                <!-- these are for finding the item to edit -->
                <input type="hidden" id="id" name="id" value={item["id"]} required>
                <input type="hidden" id="previoustype" name="previoustype" value={item["mainType"]} required>

                <h6 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Info</h6>
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" value={item["name"]} required>
                    </div>
                    <div>
                        <label for="mainType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <input type="text" id="mainType" name="mainType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Accessory" value={item["mainType"]} required>
                    </div>
                    <div>
                        <label for="subType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Type</label>
                        <input type="text" id="subType" name="subType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hat" value={item["subType"]} required>
                    </div>
                    <div>
                        <label for="rarity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rarity</label>
                        <input type="text" id="rarity" name="rarity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Common" value={item["rarity"]} required>
                    </div>
                    <div>
                        <label for="rarityColor" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rarity Color</label>
                        <input type="text" id="rarityColor" name="rarityColor" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#7D7D7F" value={item["rarityColor"]} required>
                    </div>
                    <div>
                        <label for="imageId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image ID</label>
                        <input type="text" id="imageId" name="imageId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="assets/images/accessory/0.jpg" value={item["imageId"]} required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="legend" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Legend</label>
                    <input type="text" id="legend" name="legend" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" value={item["legend"]} required>
                </div>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="maxLevel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Level</label>
                        <input type="number" id="maxLevel" name="maxLevel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["maxLevel"]} required>
                    </div>
                    <div>
                        <label for="gemNo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gem No</label>
                        <input type="number" id="gemNo" name="gemNo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["gemNo"]} required>
                    </div>
                </div>

                <h6 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Stats</h6>
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="defense" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Defense</label>
                        <input type="number" id="defense" name="defense" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["defense"]} required>
                    </div>
                    <div>
                        <label for="power" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Power</label>
                        <input type="number" id="power" name="power" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["power"]} required>
                    </div>
                    <div>
                        <label for="agility" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agility</label>
                        <input type="number" id="agility" name="agility" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["agility"]} required>
                    </div>
                    <div>
                        <label for="attackSize" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attack Size</label>
                        <input type="number" id="attackSize" name="attackSize" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["attackSize"]} required>
                    </div>
                    <div>
                        <label for="attackSpeed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attack Speed</label>
                        <input type="number" id="attackSpeed" name="attackSpeed" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["attackSpeed"]} required>
                    </div>
                    <div>
                        <label for="intensity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Intensity</label>
                        <input type="number" id="intensity" name="intensity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["intensity"]} required>
                    </div>
                    <div>
                        <label for="insanity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insanity</label>
                        <input type="number" id="insanity" name="insanity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["insanity"]} required>
                    </div>
                    <div>
                        <label for="drawback" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Drawback</label>
                        <input type="number" id="drawback" name="drawback" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["drawback"]} required>
                    </div>
                    <div>
                        <label for="warding" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warding</label>
                        <input type="number" id="warding" name="warding" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=0 value={item["warding"]} required>
                    </div>
                </div>
            </div>

            <div class="flex flex-shrink-0 justify-center items-center bg-gray-100 p-5 px-8 overflow-hidden">
                <button type="submit" class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </div>
	    </div>
    
</div>
</form>
{/if}