<script>
	import { screenStore, selectedSquareStore } from "./store.js";
	import Switch from "svelte-switch";
	import { fly } from "svelte/transition";
	import CenterText from "./CenterText.svelte";
	// import { Router, Route } from "svelte-routing";
	import BlogList from "./Blog/BlogList.svelte";
	// import BlogPost from "./Blog/BlogPost.svelte";
	import { get, writable } from "svelte/store";


	let showInfo = false;
	let showSwitch = true;
	let selectedSquareDetails = {};
	let renderFullScreenSquare = false;
	let pdfURL = "/My_Resume.pdf";

	function toggleFullScreenSquare() {
		renderFullScreenSquare = false;
		setTimeout(() => {
			renderFullScreenSquare = true;
		}, 0);
	}

	// Store square directions
	let directions = {
		resume: {
			up: null,
			down: "projects",
			left: null,
			right: "blog",
			downRight: "contact",
		},
		blog: {
			up: null,
			down: "contact",
			left: "resume",
			right: null,
			downLeft: "projects",
		},
		projects: {
			up: "resume",
			down: null,
			left: null,
			right: "contact",
			upRight: "blog",
		},
		contact: {
			up: "blog",
			down: null,
			left: "projects",
			right: null,
			upLeft: "resume",
		},
	};

	function selectSquare(square, event, direction = null) {
		if ($selectedSquareStore) {
			if ($selectedSquareStore === "blog") {
				selectedSquareStore.set(null);
			}

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

		selectedSquareStore.set(square); // Update selectedSquareStore value
		showSwitch = false;
		if ($selectedSquareStore) {
			// Access selectedSquareStore value
			toggleFullScreenSquare();
		}
	}

	function deselectSquare(event) {
		event.stopPropagation();
		selectedSquareStore.set(null); // Update selectedSquareStore value
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
		<CenterText {showInfo} />
	</div>
	{#if $selectedSquareStore != null && renderFullScreenSquare}
		<div
			class="fullScreenSquare"
			key={selectedSquareDetails.top + "," + selectedSquareDetails.left}
			in:fly={{
				x:
					selectedSquareDetails.left -
					(window.innerWidth - selectedSquareDetails.width) / 2,
				y:
					selectedSquareDetails.top -
					(window.innerHeight - selectedSquareDetails.height) / 2,
				duration: 500,
			}}
			out:fly={{
				x:
					selectedSquareDetails.left -
					(window.innerWidth - selectedSquareDetails.width) / 2,
				y:
					selectedSquareDetails.top -
					(window.innerHeight - selectedSquareDetails.height) / 2,
				duration: 500,
			}}
		>
			{#if $selectedSquareStore === "resume"}
				<button
					class="close-button top-left"
					data-tooltip-resume="Back to Home"
					on:click|stopPropagation={deselectSquare}
				>
					X
				</button>

				<h1 class="resume-header">Resume</h1>

				<button
					class="arrow down"
					data-tooltip="Down to 'Projects'"
					on:click|stopPropagation={() =>
						selectSquare(directions.resume.down, null, "down")}
				>
					↓
				</button>

				<button
					class="arrow right"
					data-tooltip="Take a right to 'Blog'"
					on:click|stopPropagation={() =>
						selectSquare(directions.resume.right, null, "right")}
				>
					→
				</button>

				<button
					class="arrow down-right"
					data-tooltip="Dive over to 'Contact'"
					on:click|stopPropagation={() =>
						selectSquare(directions.resume.downRight, null, "downRight")}
				>
					↘
				</button>

				<!-- svelte-ignore a11y-missing-attribute -->
				<a href={pdfURL} target="_blank">
					<img class="resume-png" src="/My_Resume.png" alt="Resume thumbnail" />
				</a>
			{/if}

			<!-- SNIP -->
			{#if $selectedSquareStore === "blog"}
				<button
					class="close-button top-right"
					data-tooltip-blog="Back to Home"
					on:click|stopPropagation={deselectSquare}
				>
					X
				</button>

				<h1 class="blog-header">Blog</h1>

				<button
					class="arrow down"
					data-tooltip="Down to 'Contact'"
					on:click|stopPropagation={() =>
						selectSquare(directions.blog.down, null, "down")}
				>
					↓
				</button>

				<button
					class="arrow left"
					data-tooltip="Take a left to 'Resume'"
					on:click|stopPropagation={() =>
						selectSquare(directions.blog.left, null, "left")}
				>
					←
				</button>

				<button
					class="arrow down-left"
					data-tooltip="Slide over to 'Projects'"
					on:click|stopPropagation={() =>
						selectSquare(directions.blog.downLeft, null, "downLeft")}
				>
					↙
				</button>

				{#if $selectedSquareStore === "blog" && renderFullScreenSquare}
					<BlogList />
				{/if}
			{/if}
			<!-- SNIP -->

			{#if $selectedSquareStore === "projects"}
				<button
					class="close-button bottom-left"
					data-tooltip-projects="Back to Home"
					on:click|stopPropagation={deselectSquare}>X</button
				>

				<h1 class="projects-header">Projects</h1>

				<button
					class="arrow up"
					data-tooltip="Jump up to 'Resume'"
					on:click|stopPropagation={() =>
						selectSquare(directions.projects.up, null, "up")}>↑</button
				>

				<button
					class="arrow right"
					data-tooltip="Take a right to 'Contact'"
					on:click|stopPropagation={() =>
						selectSquare(directions.projects.right, null, "right")}>→</button
				>

				<button
					class="arrow up-right"
					data-tooltip="Hop over to 'Blog'"
					on:click|stopPropagation={() =>
						selectSquare(directions.projects.upRight, null, "upRight")}
					>↗</button
				>
			{/if}

			{#if $selectedSquareStore === "contact"}
				<button
					class="close-button bottom-right"
					data-tooltip-contact="Back to Home"
					on:click|stopPropagation={deselectSquare}>X</button
				>

				<h1 class="contact-header">Contact</h1>

				<button
					class="arrow up"
					data-tooltip="Jump up to 'Blog'"
					on:click|stopPropagation={() =>
						selectSquare(directions.contact.up, null, "up")}>↑</button
				>

				<button
					class="arrow left"
					data-tooltip="Take a left to 'Projects'"
					on:click|stopPropagation={() =>
						selectSquare(directions.contact.left, null, "left")}>←</button
				>

				<button
					class="arrow up-left"
					data-tooltip="Leap over to 'Resume'"
					on:click|stopPropagation={() =>
						selectSquare(directions.contact.upLeft, null, "upLeft")}>↖</button
				>
			{/if}
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
		/* Allow tooltips to overflow */
		overflow: visible;
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
		background-color: #444;
		color: white;
		border: none;
		padding: 10px 20px;
		text-align: center;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		transition-duration: 0.4s;
		z-index: 10;
		/* Allow tooltips to overflow */
		overflow: visible;
	}

	.close-button:hover {
		background-color: #555;
		color: white;
	}

	.close-button.top-left {
		top: 10px !important;
		left: 10px !important;
		right: auto !important;
		bottom: auto !important;
	}

	.close-button.top-right {
		top: 10px !important;
		right: 10px !important;
		left: auto !important;
		bottom: auto !important;
	}

	.close-button.bottom-left {
		bottom: 10px !important;
		left: 10px !important;
		top: auto !important;
		right: auto !important;
	}

	.close-button.bottom-right {
		bottom: 10px !important;
		right: 10px !important;
		top: auto !important;
		left: auto !important;
	}

	.switcher {
		position: fixed;
		right: 20px;
		top: 20px;
		z-index: 10000;
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

	.arrow {
		position: relative;
		background-color: #444;
		color: white;
		border: none;
		cursor: pointer;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 4px 2px;
		transition-duration: 0.4s;
		/* Allow tooltips to overflow */
		overflow: visible;
	}

	.arrow:hover {
		background-color: #555;
		color: white;
	}

	.arrow:hover:before {
		opacity: 1;
	}

	[data-tooltip] {
		position: relative;
		cursor: pointer;
	}

	[data-tooltip]:before {
		content: attr(data-tooltip);
		position: absolute;
		top: -5px;
		right: 110%;
		background: #333;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 14px;
		z-index: 10;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 0.3s;
		/* Set the width to auto and max-width to 200px so the tooltip size is dynamic */
		width: min-content; /* dynamic width */
		/* width: 15vw;  <- These two lines sort of solved the truncation problem. But I didn't really want to have to take this approach. */
		/* height: 2.5vh;  <- These two lines sort of solved the truncation problem. But I didn't really want to have to take this approach. */
		max-width: 200px;
	}

	/* Down arrow - tooltip above */
	.arrow.down[data-tooltip]:before {
		top: auto;
		bottom: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Down-right arrow - tooltip above and to the left */
	.arrow.down-right[data-tooltip]:before {
		top: auto;
		right: 100%;
		bottom: 100%;
	}

	/* Down-left arrow - tooltip above and to the right */
	.arrow.down-left[data-tooltip]:before {
		top: auto;
		left: 100%;
		bottom: 100%;
	}

	/* Up arrow - tooltip below */
	.arrow.up[data-tooltip]:before {
		bottom: auto;
		top: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Up-right arrow - tooltip below and to the left */
	.arrow.up-right[data-tooltip]:before {
		bottom: auto;
		right: 100%;
		top: 100%;
	}

	/* Up-left arrow - tooltip below and to the right */
	.arrow.up-left[data-tooltip]:before {
		bottom: auto;
		left: 100%;
		top: 100%;
	}

	/* Right arrow - tooltip to the left */
	.arrow.right[data-tooltip]:before {
		top: 50%;
		right: 110%;
		transform: translateY(-50%);
	}

	/* Left arrow - tooltip to the right */
	.arrow.left[data-tooltip]:before {
		top: 50%;
		left: 110%;
		transform: translateY(-50%);
	}

	.arrow.down:hover:before {
		opacity: 1;
	}

	.arrow.down-right:hover:before {
		opacity: 1;
	}

	.arrow.down-left:hover:before {
		opacity: 1;
	}

	.arrow.up:hover:before {
		opacity: 1;
	}

	.arrow.up-right:hover:before {
		opacity: 1;
	}

	.arrow.up-left:hover:before {
		opacity: 1;
	}

	.arrow.right:hover:before {
		opacity: 1;
	}

	.arrow.left:hover:before {
		opacity: 1;
	}

	.arrow.right {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.arrow.left {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.arrow.down {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
	}

	.arrow.up {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
	}

	.arrow.down-right {
		position: absolute;
		bottom: 10px;
		right: 10px;
	}

	.arrow.up-right {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	.arrow.down-left {
		position: absolute;
		bottom: 10px;
		left: 10px;
	}

	.arrow.up-left {
		position: absolute;
		top: 10px;
		left: 10px;
	}

	/* Tooltip CSS for each button position */
	/* Basic styling for the tooltips */
	.close-button[data-tooltip-resume]:before,
	.close-button[data-tooltip-blog]:before,
	.close-button[data-tooltip-projects]:before,
	.close-button[data-tooltip-contact]:before {
		content: attr(data-tooltip-resume) attr(data-tooltip-blog)
			attr(data-tooltip-projects) attr(data-tooltip-contact);
		position: absolute;
		color: #fff;
		background-color: #333;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 12px;
		line-height: 1.4;
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.3s;
	}

	/* Show the tooltip when hovering */
	.close-button[data-tooltip-resume]:hover:before,
	.close-button[data-tooltip-blog]:hover:before,
	.close-button[data-tooltip-projects]:hover:before,
	.close-button[data-tooltip-contact]:hover:before {
		visibility: visible;
		opacity: 1;
	}

	/* Top-left close button - tooltip below and to the right */
	.close-button.top-left[data-tooltip-resume]:before {
		top: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Top-right close button - tooltip below and to the left */
	.close-button.top-right[data-tooltip-blog]:before {
		top: 110%;
		right: 50%;
		transform: translateX(50%);
	}

	/* Bottom-left close button - tooltip above and to the right */
	.close-button.bottom-left[data-tooltip-projects]:before {
		top: auto;
		bottom: 110%;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Bottom-right close button - tooltip above and to the left */
	.close-button.bottom-right[data-tooltip-contact]:before {
		top: auto;
		bottom: 110%;
		right: 50%;
		transform: translateX(50%);
	}

	.close-button.top-left:hover:before {
		opacity: 1;
	}

	.close-button.top-right:hover:before {
		opacity: 1;
	}

	.close-button.bottom-left:hover:before {
		opacity: 1;
	}

	.close-button.bottom-right:hover:before {
		opacity: 1;
	}

	.resume-header {
		position: absolute;
		top: 60px; /* Adjust as needed */
		left: 120px; /* Adjust as needed */
		/*font-size: 1.5em; /* Adjust as class*/
	}

	.resume-png {
		position: absolute; /* Absolute positioning allows centering and scale */
		top: 50%; /* Center vertically */
		left: 50%; /* Center horizontally */
		transform: translate(
			-50%,
			-50%
		); /* Shift back by half its width and height */
		max-width: 80vw; /* Limit width to 80% of viewport width */
		max-height: 80vh; /* Limit height to 80% of viewport height */
		width: auto; /* Maintain aspect ratio */
		height: auto; /* Maintain aspect ratio */
	}

	.blog-header {
		position: absolute;
		top: 60px; /* Adjust as needed */
		right: 120px; /* Adjust as needed */
		/*font-size: 1.5em; /* Adjust as class*/
	}

	.projects-header {
		position: absolute;
		bottom: 60px; /* Adjust as needed */
		left: 120px; /* Adjust as needed */
		/*font-size: 1.5em; /* Adjust as class*/
	}

	.contact-header {
		position: absolute;
		bottom: 60px; /* Adjust as needed */
		right: 120px; /* Adjust as needed */
		/*font-size: 1.5em; /* Adjust as class*/
	}
</style>
