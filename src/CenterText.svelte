<!-- CenterText.svelte -->

<script>
  export let showInfo = false;
</script>

{#if showInfo}
  <div class="center-text">
    First M. Last <br />
    [Github icon] [Twitter icon] [LinkedIn icon] [@ symbol] <br />
    Full Stack Engineer <br />
    I'm adept at implementing reliable, intuitive, and performant frontend and backend
    web and non-native mobile applications. When I'm not coding, I enjoy playing
    on my Nintendo Switch, going for walks, and exploring new interests.
  </div>
{/if}

<style>
  .center-text {
    background: white;
    border: 1px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 20px;
    max-height: 50vh;
    overflow: auto;
    z-index: 1;
  }
</style>
