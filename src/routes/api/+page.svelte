<script>
	import { onMount } from 'svelte';
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';

	onMount(async () => {
		SwaggerUI({
			url: "/api/openapi.json",
			dom_id: '#swagger-ui-container'
		});
	});
</script>

<svelte:head>
	<title>SwaggerUI</title>
</svelte:head>

<div id="swagger-ui-container" class="h-full overflow-auto" />