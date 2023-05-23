<!-- Blog.svelte -->
<script>
	export let posts = [{id: 1, title: "Not A Real Blog Post", date: Date.now().toLocaleString()}];
</script>

<div>
	{#each posts as post (post.id)}
		<div>
			<h2>{post.title}</h2>
			<p>Published on {post.date}</p>
		</div>
	{/each}
</div>
