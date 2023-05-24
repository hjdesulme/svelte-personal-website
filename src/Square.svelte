<!-- SquareComponent.svelte -->
<script>
  export let squareName;
  export let selectSquare;
</script>

<div class="square" on:click={(event) => selectSquare(squareName, event)}>
  {squareName}
</div>

<style>
  .square {
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		border: 1px solid black;
		transition: box-shadow 0.3s ease;
		z-index: 1;
	}

	.square:hover {
		box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
		z-index: 2;
		cursor: pointer;
	}
</style>