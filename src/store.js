import { writable } from 'svelte/store';

// Check the initial width to set the initial screen size
let initialScreenSize = window.innerWidth < 800 ? 'mobile' : 'desktop';

export const screenStore = writable(initialScreenSize);
export const selectedSquareStore = writable(null); // Define your selectedSquare store here
