<script>
    import { enhance } from '$app/forms';

    export let data;

    console.log(data);
</script>

<div style="padding-top: 100px;">
    {#each data.items as { name, id, legend }}
		<div class="p-1">
			<p style="display: inline;">Item:</p>
			<form style="display: inline;" method="POST" action="?/update" use:enhance={() => {
				return async ({ update }) => {
				update({ reset: false });
				};
			}}>
				<input name="name" value={name} /> <input name="id" value={id} /> <input name="legend" value={legend} />
				<input type="submit" value="Update">
			</form>
			<form style="display: inline;" method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="name" value={name} />
				<button aria-label="Mark as complete" >Delete</button>
			</form>
		</div>
	{/each}
	<div class="pt-5 p-1">
		<form method="POST" action="?/create" use:enhance>
			<label>
				Item:
				<input
					name="name"
					autocomplete="off"
				/>
				<input name="id" /> 
				<input name="legend" />
				<input type="submit" value="Add Item">
			</label>
		</form>
	</div>
</div>