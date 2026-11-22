const root = document.documentElement;
const theme = document.querySelector('#theme');
const preference = matchMedia('(prefers-color-scheme: dark)');
let override;
try { override = localStorage.getItem('portfolio-theme'); } catch {}
function syncTheme() {
  const dark = override ? override === 'dark' : preference.matches;
  root.dataset.theme = dark ? 'dark' : 'light';
  theme.textContent = dark ? 'Light mode' : 'Dark mode';
}
syncTheme();
theme.hidden = false;
theme.addEventListener('click', () => {
  override = root.dataset.theme === 'dark' ? 'light' : 'dark';
  syncTheme();
  try { localStorage.setItem('portfolio-theme', override); } catch {}
});
preference.addEventListener('change', syncTheme);

const select = document.querySelector('#scenario');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const examples = [
  [input.textContent, output.textContent],
  ['Request to move Friday’s shift from morning to afternoon.', 'Schedule change requested for Friday; original and proposed shifts are visible.'],
  ['Running 20 minutes late for the morning shift.', 'Late arrival reported for today’s shift, with an updated arrival time.']
];
select.hidden = document.querySelector('#scenario-label').hidden = false;
select.addEventListener('change', () => {
  [input.textContent, output.textContent] = examples[select.selectedIndex];
});

function revealLinkedProject() {
  const detail = document.getElementById(location.hash.slice(1))?.querySelector(':scope > details');
  if (detail) detail.open = true;
}
window.addEventListener('hashchange', revealLinkedProject);
document.querySelectorAll('.permalink').forEach(link => link.addEventListener('click', () => {
  link.parentElement.querySelector('details').open = true;
}));
revealLinkedProject();
