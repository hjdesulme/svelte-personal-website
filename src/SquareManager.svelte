<script>
  import { screenStore, selectedSquareStore, selectedSquareDetailsStore, navigate, showSwitchStore } from "./store.js";
  import Square from "./Square.svelte";
  import FullScreenSquare from "./FullScreenSquare.svelte";
  import { fly } from "svelte/transition";

  showSwitchStore.set(true);

  let selectedSquare = null;
  let selectedSquareDetails = {};
  let renderFullScreenSquare = false;
  export let showPdf = false; // initially set to false
  export let pdfURL = "/My_Resume.pdf";

  // Subscribe to the selected square and its details
  selectedSquareStore.subscribe(value => selectedSquare = value);
  selectedSquareDetailsStore.subscribe(value => selectedSquareDetails = value);

  // Toggle function
  export function togglePdfImage() {
    showPdf = !showPdf;
  }
  
  function toggleFullScreenSquare() {
    renderFullScreenSquare = false;
    setTimeout(() => {
      renderFullScreenSquare = true;
    }, 0);
  }

  export function selectSquare(square, event, direction = null) {
    if (selectedSquare) {
      let newTop = window.scrollY,
        newLeft = window.scrollX;

      switch (direction) {
        case "up":
          newTop -= window.innerHeight;
          break;
        case "down":
          newTop += window.innerHeight;
          break;
        case "left":
          newLeft -= window.innerWidth;
          break;
        case "right":
          newLeft += window.innerWidth;
          break;
        case "downRight":
          newTop += window.innerHeight;
          newLeft += window.innerWidth;
          break;
        case "downLeft":
          newTop += window.innerHeight;
          newLeft -= window.innerWidth;
          break;
        case "upRight":
          newTop -= window.innerHeight;
          newLeft += window.innerWidth;
          break;
        case "upLeft":
          newTop -= window.innerHeight;
          newLeft -= window.innerWidth;
          break;
      }

      selectedSquareDetails = {
        ...selectedSquareDetails,
        top: newTop,
        left: newLeft,
        width: window.innerWidth,
        height: window.innerHeight,
      };
      
    } else if (event) {
      const squareBounds = event.target.getBoundingClientRect();
      selectedSquareDetails = {
        top: squareBounds.top + window.scrollY,
        left: squareBounds.left + window.scrollX,
        width: squareBounds.width,
        height: squareBounds.height,
      };
    }

    selectedSquareStore.set(square); // Update the store
    selectedSquareDetailsStore.set(selectedSquareDetails); // Update the store
    showSwitchStore.set(false);
    if (selectedSquare) {
      toggleFullScreenSquare();
    }
  }

  function deselectSquare(event) {
    event.stopPropagation();
    selectedSquareStore.set(null);
    showSwitchStore.set(true);
  }
</script>

{#if $screenStore === "desktop"}
  <div class="container">
    <Square squareName="resume" {selectSquare} />
    <Square squareName="blog" {selectSquare} />
    <Square squareName="projects" {selectSquare} />
    <Square squareName="contact" {selectSquare} />
  </div>
  {#if selectedSquare != null && renderFullScreenSquare}
    <FullScreenSquare
      {selectedSquare}
      {selectedSquareDetails}
      {deselectSquare}
      {showPdf}
      {pdfURL}
      {togglePdfImage}
    />
  {/if}
<!-- {:else} -->
  <!-- Mobile layout code -->
  <!-- <div class="mobile-container">
    <Square squareName="resume" {selectSquare} />
    <Square squareName="blog" {selectSquare} />
    <Square squareName="projects" {selectSquare} />
    <Square squareName="contact" {selectSquare} />
  </div> -->
{/if}

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 100vh;
		width: 100vw;
		gap: 1px;
		background: black;
	}
 </style>
