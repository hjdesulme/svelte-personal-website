<!-- Projects.svelte -->
<script>
	export let projects = [{id: 1, title: "Not A Real Project"}];
</script>

<div class="project-grid">
	{#each projects as project (project.id)}
		<div class="project">
			<h2>{project.title}</h2>
		</div>
	{/each}
</div>

<style>
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 10px;
	}
	.project {
		border: 1px solid #ccc;
		padding: 20px;
	}
</style>
