<!-- Contact.svelte -->
<script>
	let name = '';
	let email = '';
	let message = '';
	function handleSubmit() {
		// Here you would handle the form submission
		console.log({name, email, message});
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		Name
		<input type="text" bind:value={name} required />
	</label>
	<label>
		Email
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Message
		<textarea bind:value={message} required></textarea>
	</label>
	<button type="submit">Send</button>
</form>
