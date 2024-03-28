<script>
    import { enhance } from '$app/forms';
	import ItemButton from '$lib/components/admin/ItemButton.svelte';
	import ItemCreateButton from '$lib/components/admin/ItemCreateButton.svelte';
	import PresetCreateButton from '$lib/components/admin/PresetCreateButton.svelte';

    export let data;

	let pass = "";

    //console.log(data);
	console.log(data.dropdowns)

	let itemdefault = {
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
		mainType: 'None',
		subType: 'None',
		rarity: 'None',
		rarityColor: '#7D7D7F',
		imageId: 'assets/images/accessory/0.jpg'
	}
</script>

<div style="padding-top: 100px;">
	
    <!--
	{#each data.items as { name, id, legend }}
		<div class="p-1">
			<p style="display: inline;">Item:</p>
			<form style="display: inline;" method="POST" action="?/update" use:enhance={() => {
				return async ({ update }) => {
				update({ reset: false });
				};
			}}>
				<input name="name" value={name} /> <input name="id" type="number" value={id} /> <input name="legend" value={legend} />
				<input type="submit" value="Update">
			</form>
			<form style="display: inline;" method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="name" value={name} />
				<button aria-label="Mark as complete" >Delete</button>
			</form>
		</div>
	{/each}
	-->
	<div class="grid gap-6 mb-6 grid-cols-1">
		<div>
			<label for="pass" class="block mb-2 text-sm font-medium text-white dark:text-gray-900">Password</label>
			<input type="password" id="pass" name="pass" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" bind:value={pass}>
		</div>
		<!--<div>
			{#each data.items as item}
				<ItemButton {item} dropdowns={data.dropdowns} bind:password={pass} />
			{/each}
		</div>-->
	</div>

	<!--<div class="pt-5 p-1">
		<ItemCreateButton item={itemdefault} dropdowns={data.dropdowns} bind:password={pass} id=0 imageIdDefault={itemdefault["imageId"]} />
	</div>-->
	<div class="pt-5 p-1">
		<PresetCreateButton bind:password={pass} />
	</div>
</div>