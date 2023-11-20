<script>
    import { enhance } from '$app/forms';

    export let data;

    console.log(data);
</script>

<div>
    {#each data.items as { name, id, legend }}
		<p>Item: {name} {id} {legend}</p>
	{/each}

    <form method="POST" action="?/create" use:enhance>
		<label>
			add a item:
			<input
				name="name"
				autocomplete="off"
			/>
		</label>
	</form>
</div>