<script>
  import { createClient } from "contentful";
  import { onMount } from "svelte";
  import { goto } from "@roxi/routify"; // If you're using Routify for routing

  let posts = [];

  onMount(async () => {
    let client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });

    let response = await client.getEntries({
      content_type: "blogPost", // Replace 'blogPost' with your Contentful content model id
    });

    posts = response.items.map((item) => item.fields);
  });
</script>

<ul>
  {#each posts as post (post.title)}
    <li>
      <a href="blog/{post.slug}" use:goto>
        <div>{post.date}</div>
        <h2>{post.title}</h2>
      </a>
    </li>
  {/each}
</ul>
