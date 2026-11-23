const PLAYERS = [
  { name: "Lionel Messi", number: 10, pos: "RW / CAM", nation: "Argentina", club: "Inter Miami / Barcelona", era: "modern", stat: "8x Ballon d'Or winner & 2022 World Cup champion" },
  { name: "Cristiano Ronaldo", number: 7, pos: "ST / LW", nation: "Portugal", club: "Al-Nassr / Real Madrid", era: "modern", stat: "900+ career goals across club and international football" },
  { name: "Kylian Mbappé", number: 9, pos: "ST / LW", nation: "France", club: "Real Madrid / PSG", era: "modern", stat: "World Cup winner and Golden Boot scorer" },
  { name: "Erling Haaland", number: 9, pos: "ST", nation: "Norway", club: "Manchester City", era: "modern", stat: "Premier League single-season scoring record holder" },
  { name: "Kevin De Bruyne", number: 17, pos: "CM / CAM", nation: "Belgium", club: "Manchester City", era: "modern", stat: "Prolific playmaker with hundreds of career assists" },
  { name: "Luka Modrić", number: 10, pos: "CM", nation: "Croatia", club: "Real Madrid", era: "modern", stat: "2018 Ballon d'Or winner and 6x Champions League winner" },
  { name: "Vinícius Júnior", number: 7, pos: "LW", nation: "Brazil", club: "Real Madrid", era: "modern", stat: "Champions League final goalscorer and explosive winger" },
  { name: "Rodri", number: 16, pos: "CDM", nation: "Spain", club: "Manchester City", era: "modern", stat: "2024 Ballon d'Or winner and Euro 2024 Player of the Tournament" },
  { name: "Mohamed Salah", number: 11, pos: "RW", nation: "Egypt", club: "Liverpool", era: "modern", stat: "Multi-time Premier League Golden Boot winner" },
  { name: "Jude Bellingham", number: 5, pos: "CAM / CM", nation: "England", club: "Real Madrid", era: "modern", stat: "High-scoring box-to-box midfielder" },
  { name: "Pelé", number: 10, pos: "FW", nation: "Brazil", club: "Santos", era: "legends", stat: "3x FIFA World Cup winner with over 1,000 career goals" },
  { name: "Diego Maradona", number: 10, pos: "CAM / SS", nation: "Argentina", club: "Napoli / Boca Juniors", era: "legends", stat: "1986 World Cup icon famous for dribbling and vision" },
  { name: "Zinedine Zidane", number: 5, pos: "CAM", nation: "France", club: "Real Madrid / Juventus", era: "legends", stat: "Scored in two World Cup finals and a Champions League final" },
  { name: "Ronaldinho", number: 10, pos: "LW / CAM", nation: "Brazil", club: "Barcelona", era: "legends", stat: "2005 Ballon d'Or winner known for flair and creativity" },
  { name: "Johan Cruyff", number: 14, pos: "FW / CAM", nation: "Netherlands", club: "Ajax / Barcelona", era: "legends", stat: "3x Ballon d'Or winner and Total Football pioneer" },
  { name: "Ronaldo Nazário", number: 9, pos: "ST", nation: "Brazil", club: "Inter / Real Madrid / Barça", era: "legends", stat: "2x World Cup champion and youngest Ballon d'Or winner at 21" },
  { name: "Paolo Maldini", number: 3, pos: "LB / CB", nation: "Italy", club: "AC Milan", era: "legends", stat: "5x European Cup/Champions League winner across 25 seasons" },
  { name: "Andrés Iniesta", number: 8, pos: "CM", nation: "Spain", club: "Barcelona", era: "legends", stat: "Scored the 2010 World Cup winning goal in extra time" },
  { name: "Thierry Henry", number: 14, pos: "ST / LW", nation: "France", club: "Arsenal", era: "legends", stat: "4x Premier League Golden Boot winner and Invincible" },
  { name: "Franz Beckenbauer", number: 5, pos: "CB / SW", nation: "West Germany", club: "Bayern Munich", era: "legends", stat: "Won the World Cup as both player and manager" }
];

const POOL_LABELS = {
  all: "All Players",
  legends: "Legends",
  modern: "Modern"
};

let currentPool = "all";
let roundPlayers = [];
let currentIndex = 0;
let slots = Array(5).fill(null);

const roundCounterEl = document.getElementById("round-counter");
const poolLabelEl = document.getElementById("pool-label");
const playerNumberEl = document.getElementById("player-number");
const playerPosEl = document.getElementById("player-pos");
const playerNameEl = document.getElementById("player-name");
const playerMetaEl = document.getElementById("player-meta");
const playerEraEl = document.getElementById("player-era");
const playerStatEl = document.getElementById("player-stat");
const slotsListEl = document.getElementById("slots-list");
const summaryBoxEl = document.getElementById("summary-box");
const summaryNoteEl = document.getElementById("summary-note");
const summaryListEl = document.getElementById("summary-list");
const newRoundBtn = document.getElementById("new-round-btn");
const copyBtn = document.getElementById("copy-btn");
const poolBtns = document.querySelectorAll(".pool-btn");

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startRound() {
  const filtered = currentPool === "all"
    ? PLAYERS
    : PLAYERS.filter((p) => p.era === currentPool);

  roundPlayers = shuffle(filtered).slice(0, 5);
  currentIndex = 0;
  slots = Array(5).fill(null);
  summaryBoxEl.classList.add("hidden");
  copyBtn.textContent = "Copy Ranking";
  render();
}

function placePlayer(slotIndex) {
  if (slots[slotIndex] !== null || currentIndex >= roundPlayers.length) return;
  slots[slotIndex] = roundPlayers[currentIndex];
  currentIndex += 1;
  render();
}

function renderCard() {
  poolLabelEl.textContent = POOL_LABELS[currentPool];

  if (currentIndex >= roundPlayers.length) {
    roundCounterEl.textContent = "Round Complete";
    playerNumberEl.textContent = "DONE";
    playerPosEl.textContent = "5 / 5";
    playerNameEl.textContent = "All 5 Players Ranked";
    playerMetaEl.textContent = "Check your final 1–5 ranking below.";
    playerEraEl.textContent = "";
    playerStatEl.textContent = "Click 'New Round' in the top-right corner to play again with new players.";
    return;
  }

  const player = roundPlayers[currentIndex];
  roundCounterEl.textContent = `Player ${currentIndex + 1} of 5`;
  playerNumberEl.textContent = `#${player.number}`;
  playerPosEl.textContent = player.pos;
  playerNameEl.textContent = player.name;
  playerMetaEl.textContent = `${player.nation} • ${player.club}`;
  playerEraEl.textContent = `Pool: ${player.era === "legends" ? "All-Time Legend" : "Modern Era"}`;
  playerStatEl.textContent = player.stat;
}

function renderSlots() {
  slotsListEl.innerHTML = "";
  const isFinished = currentIndex >= roundPlayers.length;

  slots.forEach((player, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "slot-btn";
    btn.disabled = player !== null || isFinished;

    const rankSpan = document.createElement("span");
    rankSpan.className = "slot-rank";
    rankSpan.textContent = `#${idx + 1}`;

    const nameSpan = document.createElement("span");
    nameSpan.className = player ? "slot-player" : "slot-player slot-empty";
    nameSpan.textContent = player ? `${player.name} (#${player.number})` : "Empty spot";

    const tagSpan = document.createElement("span");
    tagSpan.className = "slot-tag";
    if (player) {
      tagSpan.textContent = player.pos;
    } else if (!isFinished) {
      tagSpan.textContent = "Place here";
    }

    btn.append(rankSpan, nameSpan, tagSpan);
    btn.addEventListener("click", () => placePlayer(idx));
    slotsListEl.appendChild(btn);
  });
}

function renderSummary() {
  if (currentIndex < roundPlayers.length) {
    summaryBoxEl.classList.add("hidden");
    return;
  }

  summaryBoxEl.classList.remove("hidden");
  summaryNoteEl.textContent = `#1 Pick: ${slots[0].name}  |  #5 Pick: ${slots[4].name}`;
  summaryListEl.innerHTML = "";

  slots.forEach((player, idx) => {
    const li = document.createElement("li");
    li.textContent = `#${idx + 1} — ${player.name} (${player.pos}, ${player.nation})`;
    summaryListEl.appendChild(li);
  });
}

function render() {
  renderCard();
  renderSlots();
  renderSummary();
}

newRoundBtn.addEventListener("click", startRound);

poolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPool = btn.dataset.pool;
    poolBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    startRound();
  });
});

copyBtn.addEventListener("click", async () => {
  const text = slots
    .map((player, idx) => `#${idx + 1}: ${player.name} (${player.pos})`)
    .join("\n");

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
  } catch {
    copyBtn.textContent = "Copy failed";
  }
});

startRound();
