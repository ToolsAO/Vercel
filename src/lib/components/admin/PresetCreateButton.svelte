<script>
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';

    export let password;

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let open = false;

    let dropdowns = {"type":["gear","ship"]}
    
    let name;
    let title = "None";

    $: title = name || "None";
    const handleToggle = () => {
        open = !open
    }

    // tutorials for the modal form https://flowbite.com/docs/forms/input-field/ https://samvcodes.medium.com/how-to-make-a-modal-component-in-svelte-and-tailwind-css-b3f20f9d1624
    // add a dark mode https://flowbite.com/docs/customize/dark-mode/
</script>

<Toaster />

<button class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" on:click={() => handleToggle()}>Create Preset</button>

{#if open}
<form method="POST" action="?/createPreset" use:enhance={() => {
    return async ({ result, update }) => {
        update({ reset: false });

        if (result.type === 'success') {
            handleToggle();
            toast.success('Successfully created '+document.getElementById("name").value+'!');
        }
    };
}}>
<div
	class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 overflow-x-hidden overflow-y-auto"
>
	<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    
	    <div class="bg-white flex flex-col w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto dark:bg-black max-h-full">
            <div class="flex flex-shrink-0 justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold overflow-hidden">
                {title}
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
                <input type="hidden" id="password" name="password" value={password} required>

                <h6 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Info</h6>
                <div class="grid gap-6 mb-6 md:grid-cols-3">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input bind:value={name} type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" required>
                    </div>
                    <div>
                        <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                        <select id="type" name="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option hidden disabled selected value>Please select a type</option>
                            {#each dropdowns["type"] as type}
                                <option value={type}>{capitalize(type)}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input type="text" id="author" name="author" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" id="description" name="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" required>
                </div>
                <div class="mb-6">
                    <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                    <input type="text" id="code" name="code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" required>
                </div>


            <div class="flex flex-shrink-0 justify-center items-center bg-gray-100 p-5 px-8 overflow-hidden">
                <button type="submit" class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
            </div>
	    </div>
    
</div>
</form>
{/if}