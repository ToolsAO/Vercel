<script>
    import { enhance } from '$app/forms';

    export let item;

    let open = false;


    const handleToggle = () => {
        open = !open
    }

    // tutorials for the modal form https://flowbite.com/docs/forms/input-field/ https://samvcodes.medium.com/how-to-make-a-modal-component-in-svelte-and-tailwind-css-b3f20f9d1624
  </script>


<button on:click={() => handleToggle()}
    ><img
        src={item["imageId"]}
        alt="{item["name"]} Button"
    /></button
>

{#if open}
<div
	class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
>
	<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
	<div class="bg-white w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
		<div
			class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold"
		>
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
		<div class="content p-8">
            <form style="display: inline;" method="POST" action="?/update" use:enhance={() => {
				return async ({ result, update }) => {
				    update({ reset: false });

                    if (result.type === 'success') {
                        handleToggle();
                    }
				};
			}}>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" value={item["name"]} required>
                    </div>
                    <div>
                        <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                        <input type="number" id="id" name="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={item["id"]} required>
                    </div>
                </div>
                <div class="mb-6">
                    <label for="legend" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Legend</label>
                    <input type="text" id="legend" name="legend" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="None" value={item["legend"]} required>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
			</form>
		</div>
	</div>
</div>
{/if}