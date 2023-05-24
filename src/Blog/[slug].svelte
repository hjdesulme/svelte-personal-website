<script>
  import { onMount } from 'svelte';
  import { contentfulClient } from './contentful.js';
  import { params } from "@roxi/routify";

  let post;
  let slug;
  let loading = true;

  $: slug = $params.slug;

  onMount(async () => {
    const response = await contentfulClient.getEntries({
      'content_type': 'blogPost',
      'fields.slug': slug
    });

    if (response.items.length > 0) {
      post = response.items[0].fields;
      loading = false;
    }
  });
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
