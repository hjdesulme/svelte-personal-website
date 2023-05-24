<script>
  import { onMount, onDestroy } from "svelte";
  import { contentfulClient } from "contentful";
  import { Link } from "svelte-routing";
  import { selectedSquareStore } from "../store.js"; 

  let posts = [];
  let loading = true;
  let cancellablePromise = null;

  const makeCancellablePromise = (promise) => {
    let isCancelled = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        val => isCancelled ? reject({isCancelled, val}) : resolve(val),
        error => isCancelled ? reject({isCancelled, error}) : reject(error)
      );
    });
  
    return {
      promise: wrappedPromise,
      cancel() {
        isCancelled = true;
      },
    };
  }

  onMount(async () => {
    const value = selectedSquareStore.get();
    if (value === "blog") {
      cancellablePromise = makeCancellablePromise(contentfulClient.getEntries({
        content_type: "blogPost",
      }));

      try {
        const response = await cancellablePromise.promise;

        if (response.items.length > 0) {
          posts = response.items.map((item) => item.fields);
          loading = false;
        }
      } catch (error) {
        if (error.isCancelled) {
          console.log('Request was cancelled');
        } else {
          console.error('An error occurred:', error);
        }
      }
    }
  });

  const unsubscribe = selectedSquareStore.subscribe(value => {
    if (value !== "blog") {
      loading = true;
      posts = [];
    }
  });

  onDestroy(() => {
    unsubscribe();
    if (cancellablePromise) {
      cancellablePromise.cancel();
    }
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <div class="post-list">
    {#each posts as post (post.slug)}
      <Link to={`/blog/${post.slug}`}>
        <h2>{post.title}</h2>
        <p>{post.date}</p>
      </Link>
    {/each}
  </div>
{/if}
