// Default activity list with assigned background colors and icons
let activities = [
  { id: 1,  name: "Online Gaming",  color: "#7c3aed", emoji: "🎮" },
  { id: 2,  name: "Reels",          color: "#fbbf24", emoji: "📱" },
  { id: 3,  name: "Coke",           color: "#dc2626", emoji: "🥤" },
  { id: 4,  name: "Physical Games", color: "#0ea5e9", emoji: "🏀" },
  { id: 5,  name: "Reading",        color: "#16a34a", emoji: "📖" },
  { id: 6,  name: "Walking",        color: "#10b981", emoji: "🚶" },
  { id: 7,  name: "Party",          color: "#ec4899", emoji: "🎉" },
  { id: 8,  name: "Movies",         color: "#6366f1", emoji: "🎬" },
  { id: 9,  name: "Swimming",       color: "#06b6d4", emoji: "🏊" },
  { id: 10, name: "Chatting",       color: "#f97316", emoji: "💬" },
  { id: 11, name: "Scrolling",      color: "#64748b", emoji: "📜" }
];
let nextId = activities.length + 1;

// Determine readable text color (black or white) based on background luminance
function getContrastColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#000000" : "#ffffff";
}

const pool = document.getElementById('activity-pool');
const quadrants = document.querySelectorAll('.quadrant');

function createChip(activity) {
  const chip = document.createElement('div');
  chip.className = 'activity-chip';
  chip.textContent = `${activity.emoji} ${activity.name}`;
  chip.draggable = true;
  chip.dataset.id = activity.id;
  chip.style.backgroundColor = activity.color;
  chip.style.color = getContrastColor(activity.color);

  chip.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', activity.id);
    chip.classList.add('dragging');
  });
  chip.addEventListener('dragend', () => {
    chip.classList.remove('dragging');
  });

  return chip;
}

function buildPool() {
  pool.innerHTML = '';
  activities.forEach(a => pool.appendChild(createChip(a)));
}

document.getElementById('add-btn').addEventListener('click', () => {
  const emojiInput = document.getElementById('new-activity-emoji');
  const nameInput = document.getElementById('new-activity-name');
  const colorInput = document.getElementById('new-activity-color');
  const name = nameInput.value.trim();
  if (!name) return;
  const emoji = emojiInput.value.trim() || '⭐';
  const activity = { id: nextId++, name, color: colorInput.value, emoji };
  activities.push(activity);
  pool.appendChild(createChip(activity));
  nameInput.value = '';
  emojiInput.value = '';
});

['new-activity-emoji', 'new-activity-name'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('add-btn').click();
    }
  });
});

function findChipById(id) {
  return document.querySelector(`.activity-chip[data-id="${id}"]`);
}

quadrants.forEach(q => {
  q.addEventListener('dragover', (e) => {
    e.preventDefault();
    q.classList.add('drag-over');
  });
  q.addEventListener('dragleave', () => {
    q.classList.remove('drag-over');
  });
  q.addEventListener('drop', (e) => {
    e.preventDefault();
    q.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const chip = findChipById(id);
    if (chip) {
      chip.classList.add('chip-in-quadrant');
      q.appendChild(chip);
    }
  });
});

pool.addEventListener('dragover', (e) => e.preventDefault());
pool.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const chip = findChipById(id);
  if (chip) {
    chip.classList.remove('chip-in-quadrant');
    pool.appendChild(chip);
  }
});

document.getElementById('reset-btn').addEventListener('click', buildPool);

buildPool();
