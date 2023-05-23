<script>
	import { screenStore } from "./store.js";
	import Switch from "svelte-switch";
	import { fly } from "svelte/transition";

	let showInfo = false;
	let showSwitch = true;
	let selectedSquare = null;
	let selectedSquareDetails = {};

	function selectSquare(square, event) {
		selectedSquare = square;

		const squareBounds = event.target.getBoundingClientRect();

		selectedSquareDetails = {
			top: squareBounds.top + window.scrollY,
			left: squareBounds.left + window.scrollX,
			width: squareBounds.width,
			height: squareBounds.height,
		};

		showSwitch = false;
	}

	function deselectSquare(event) {
    event.stopPropagation();
    selectedSquare = null;
    showSwitch = true;
}

	function toggleShowInfo() {
		showInfo = !showInfo;
	}
</script>

{#if $screenStore === "desktop"}
	{#if showSwitch}
		<div class="switcher">
			<Switch {showInfo} on:change={toggleShowInfo} />
		</div>
	{/if}
	<div class="container">
		<div class="square" on:click={(event) => selectSquare("resume", event)}>
			Resume
		</div>
		<div class="square" on:click={(event) => selectSquare("blog", event)}>
			Blog
		</div>
		<div class="square" on:click={(event) => selectSquare("projects", event)}>
			Projects
		</div>
		<div class="square" on:click={(event) => selectSquare("contact", event)}>
			Contact
		</div>
		{#if showInfo}
			<div class="center-text">
				First M. Last <br />
				[Github icon] [Twitter icon] [LinkedIn icon] [@ symbol] <br />
				Full Stack Engineer <br />
				I'm adept at implementing reliable, intuitive, and performant frontend and
				backend web and non-native mobile applications. When I'm not coding, I enjoy
				playing on my Nintendo Switch, going for walks, and exploring new interests.
			</div>
		{/if}
	</div>
	{#if selectedSquare != null}
    <div
        class="fullScreenSquare"
        in:fly={{
            x: selectedSquareDetails.left - (window.innerWidth - selectedSquareDetails.width) / 2,
            y: selectedSquareDetails.top - (window.innerHeight - selectedSquareDetails.height) / 2,
            duration: 500,
        }}
        out:fly={{
            x: selectedSquareDetails.left - (window.innerWidth - selectedSquareDetails.width) / 2,
            y: selectedSquareDetails.top - (window.innerHeight - selectedSquareDetails.height) / 2,
            duration: 500,
        }}
    >
        {selectedSquare}
        <button class="close-button" on:click|stopPropagation={deselectSquare}>X</button>
    </div>
{/if}
{:else}
	<!-- Mobile layout code goes here -->
	<div class="mobile-container">
		<div class="mobile-center-text">
			First M. Last <br />
			[Github icon] [Twitter icon] [LinkedIn icon] [@ symbol] <br />
			Full Stack Engineer <br />
			I'm adept at implementing reliable, intuitive, and performant frontend and
			backend web and non-native mobile applications. When I'm not coding, I enjoy
			playing on my Nintendo Switch, going for walks, and exploring new interests.
		</div>
		<div
			class="mobile-square"
			on:click={(event) => selectSquare("resume", event)}
		>
			Resume
		</div>
		<div
			class="mobile-square"
			on:click={(event) => selectSquare("blog", event)}
		>
			Blog
		</div>
		<div
			class="mobile-square"
			on:click={(event) => selectSquare("projects", event)}
		>
			Projects
		</div>
		<div
			class="mobile-square"
			on:click={(event) => selectSquare("contact", event)}
		>
			Contact
		</div>
	</div>
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
		overflow: hidden;
	}

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

	.fullScreenSquare {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 1.5em;
		cursor: pointer;
	}

	.switcher {
		position: fixed;
		right: 20px;
		top: 20px;
		z-index: 10000;
	}

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

	.mobile-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		gap: 1px;
		background: black;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		height: 100%;
	}

	.mobile-square {
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		border: 1px solid black;
		height: 30vh;
		width: 100%;
		z-index: 1;
	}

	.mobile-center-text {
		background: white;
		border: 1px solid black;
		text-align: center;
		padding: 10px;
		height: 15vh;
		width: 100%;
		overflow: auto;
		font-size: 0.8em;
		z-index: 2;
		visibility: visible;
	}
</style>
