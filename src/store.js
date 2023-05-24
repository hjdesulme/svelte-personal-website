import { writable } from 'svelte/store';

let initialScreenSize = window.innerWidth < 800 ? 'mobile' : 'desktop';

export const screenStore = writable(initialScreenSize);

export const showSwitchStore = writable(true);

export const selectedSquareStore = writable(null);
export const selectedSquareDetailsStore = writable({});

// Store square directions
const directions = {
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

export function navigate(direction) {
  selectedSquareStore.update(square => {
    if (square && directions[square]) {
      const nextSquare = directions[square][direction];
      if (nextSquare) {
        return nextSquare;
      }
    }
    return square; // stay on current square if no square in the given direction or if square is null
  });
}

