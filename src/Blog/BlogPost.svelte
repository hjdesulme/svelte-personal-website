<script>
  import { onMount } from 'svelte';
  import { contentfulClient } from 'contentful';
  import { Router, Link, Route } from 'svelte-routing';

  let loading = true;
  let post;

  let loadPost = async ({ slug }) => {
    const response = await contentfulClient.getEntries({
      'content_type': 'blogPost',
      'fields.slug': slug
    });

    if (response.items.length > 0) {
      post = response.items[0].fields;
      loading = false;
    }
  };
</script>

<Route path="/blog/:slug" let:params>
  <script>
    onMount(() => loadPost(params));
  </script>
  {#if loading}
    <p>Loading...</p>
  {:else}
    <div class="post">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <div>
        {post.content}
      </div>
    </div>
  {/if}
</Route>
