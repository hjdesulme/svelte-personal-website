<!-- Resume.svelte -->
<script>
	export let doc = null;
</script>

<div>
	{#if doc}
		<iframe src={doc} type="application/pdf" width="100%" height="100%"></iframe>
	{:else}
		<p>No document provided.</p>
	{/if}
</div>
