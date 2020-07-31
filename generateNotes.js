import randomColor from './randomColor.js';

const TEN_SECONDS_IN_MS = 10000;

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const neutrals = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const omitBy = (arr, ignores) => arr.filter(a => ignores.every(b => a !== b));
const sharps = omitBy(neutrals, ['B', 'E']).map(note => note + '♯');
const flats = omitBy(neutrals, ['C', 'F']).map(note => note + '♭');

const sharpSet = [...neutrals, ...sharps];
const flatSet = [...neutrals, ...flats];

console.log(document, sharpSet, flatSet);

const setNotes = (noteSet = []) => {
  const el = document.getElementById('notes');
  el.innerHTML = noteSet.map(formatNote).join('');
};

const formatNote = ([letter, mod] = '' /* 'D♭' */) => {
  const color = randomColor({ luminosity: 'light' });
  const adjustMinMaxToScreen = `calc(1.5rem + 16 * (100vw - 320px) / (960 - 320))`;
  const style = `display: grid; grid-template-columns: repeat(4, 1fr); font-size: ${adjustMinMaxToScreen}; align-items: bottom; color: ${color};`

  return `<div style="${style}">` +
    `<span>${letter}</span>` +
    (mod ? `<sup style="font-size: 0.5em;">${mod}</sup>` : '') +
    `</div>`;
}

const getRandomNoteSet = () => {
  const noteSet = Math.random() > 0.5 ? sharpSet : flatSet;
  return shuffle(noteSet).slice(0, 5);
}

setNotes(getRandomNoteSet());
setInterval(() => setNotes(getRandomNoteSet()), TEN_SECONDS_IN_MS);
