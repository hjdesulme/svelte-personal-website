<script>
  import Twitter from "../public/social/Twitter.svg";
  import Github from "../public/social/Github.svg";
  import LinkedIn from "../public/social/LinkedIn.svg";
  import Email from "../public/social/Email.svg";

  export let showInfo = false;
</script>

{#if showInfo}
  <div class="center-text">
    <h1>First M. Last</h1>
    <div class="icon-container">
      <a href="https://github.com/fmlast" target="_blank" rel="noopener noreferrer" title="Github Profile">
        {@html Github}
      </a>

      <a href="https://twitter.com/FirstLast" target="_blank" rel="noopener noreferrer" title="Twitter Profile">
        {@html Twitter}
      </a>

      <a href="https://www.linkedin.com/in/fmlast/" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile">
        {@html LinkedIn}
      </a>

      <a href="mailto:first.last@gmail.com" target="_blank" rel="noopener noreferrer" title="Email Address">
        {@html Email}
      </a>
    </div>

    <h2>Full Stack Engineer</h2>

    <p>
      I'm adept at implementing reliable, intuitive, and performant frontend and
      backend web and non-native mobile applications.
    </p>

    <p>
      When I'm not coding, I enjoy playing board games, going for
      walks, and exploring new interests.
    </p>
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
    text-align: left;
    padding: 20px;
    max-height: 50vh;
    overflow: auto;
    z-index: 1;
  }

  h1 {
    font-size: 1.5em;
  }

  h2 {
    font-size: 1.2em;
    margin-top: 0.5em;
  }

  p {
    font-size: 1em;
    line-height: 1.4em;
    margin-top: 1em;
  }

  .icon-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .icon-container a {
    margin-right: 10px;
  }

  .icon-container a:last-child {
    margin-right: 0;
  }
</style>
