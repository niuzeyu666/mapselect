const maps = [
  {
    name: "Summit",
    slug: "summit",
    localImage: "assets/maps/summit.png",
    fallbackImage: "https://media.valorant-api.com/maps/756da597-416b-c0f2-f47b-afbdf28670bc/splash.png",
    themeColor: "#c9d6e9"
  },
  {
    name: "Corrode",
    slug: "corrode",
    localImage: "assets/maps/corrode.png",
    fallbackImage: "https://media.valorant-api.com/maps/1c18ab1f-420d-0d8b-71d0-77ad3c439115/splash.png",
    themeColor: "#f0b66a"
  },
  {
    name: "Abyss",
    slug: "abyss",
    localImage: "assets/maps/abyss.png",
    fallbackImage: "https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/splash.png",
    themeColor: "#6477d4"
  },
  {
    name: "Sunset",
    slug: "sunset",
    localImage: "assets/maps/sunset.png",
    fallbackImage: "https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/splash.png",
    themeColor: "#ff8a4d"
  },
  {
    name: "Lotus",
    slug: "lotus",
    localImage: "assets/maps/lotus.png",
    fallbackImage: "https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/splash.png",
    themeColor: "#d8a15f"
  },
  {
    name: "Pearl",
    slug: "pearl",
    localImage: "assets/maps/pearl.png",
    fallbackImage: "https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/splash.png",
    themeColor: "#66b7c7"
  },
  {
    name: "Fracture",
    slug: "fracture",
    localImage: "assets/maps/fracture.png",
    fallbackImage: "https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/splash.png",
    themeColor: "#c7c15a"
  },
  {
    name: "Breeze",
    slug: "breeze",
    localImage: "assets/maps/breeze.png",
    fallbackImage: "https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/splash.png",
    themeColor: "#4fc7b7"
  },
  {
    name: "Icebox",
    slug: "icebox",
    localImage: "assets/maps/icebox.png",
    fallbackImage: "https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/splash.png",
    themeColor: "#87c7ff"
  },
  {
    name: "Ascent",
    slug: "ascent",
    localImage: "assets/maps/ascent.png",
    fallbackImage: "https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png",
    themeColor: "#e29b68"
  },
  {
    name: "Split",
    slug: "split",
    localImage: "assets/maps/split.png",
    fallbackImage: "https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/splash.png",
    themeColor: "#b887ea"
  },
  {
    name: "Haven",
    slug: "haven",
    localImage: "assets/maps/haven.png",
    fallbackImage: "https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/splash.png",
    themeColor: "#c9a85c"
  },
  {
    name: "Bind",
    slug: "bind",
    localImage: "assets/maps/bind.png",
    fallbackImage: "https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png",
    themeColor: "#dd7f55"
  }
];

const vctPoolSlugs = ["summit", "sunset", "breeze", "haven", "lotus", "split", "ascent"];
const vctPool = vctPoolSlugs.map((slug) => maps.find((map) => map.slug === slug));
const sides = ["进攻方", "防守方"];

const mapImage = document.querySelector("#map-image");
const mapName = document.querySelector("#map-name");
const pickButton = document.querySelector("#pick-button");
const historyList = document.querySelector("#history-list");
const poolCount = document.querySelector("#pool-count");
const announcer = document.querySelector("#result-announcer");
const mapStage = document.querySelector(".map-stage");
const vctForm = document.querySelector("#vct-form");
const teamLeftInput = document.querySelector("#team-left");
const teamRightInput = document.querySelector("#team-right");
const matchFormatSelect = document.querySelector("#match-format");
const teamAOwnerSelect = document.querySelector("#team-a-owner");
const teamAssignment = document.querySelector("#team-assignment");
const vctMapPool = document.querySelector("#vct-map-pool");
const seriesList = document.querySelector("#series-list");
const vetoList = document.querySelector("#veto-list");
const vctButton = document.querySelector(".vct-button");

let currentMap = null;
let history = [];

function pickRandomMap() {
  if (maps.length === 1) {
    return maps[0];
  }

  const availableMaps = maps.filter((map) => map.slug !== currentMap?.slug);
  const index = Math.floor(Math.random() * availableMaps.length);
  return availableMaps[index];
}

function takeRandomMap(pool) {
  const index = Math.floor(Math.random() * pool.length);
  const [map] = pool.splice(index, 1);
  return map;
}

function pickRandomSide() {
  return sides[Math.floor(Math.random() * sides.length)];
}

function renderHistory() {
  historyList.innerHTML = "";

  history.slice(0, 6).forEach((map, index) => {
    const item = document.createElement("li");
    item.style.setProperty("--history-color", map.themeColor);

    const name = document.createElement("span");
    name.textContent = map.name;

    const count = document.createElement("small");
    count.textContent = `#${index + 1}`;

    item.append(name, count);
    historyList.append(item);
  });
}

function setMapImage(map) {
  mapImage.onerror = () => {
    if (mapImage.src !== map.fallbackImage) {
      mapImage.onerror = null;
      mapImage.src = map.fallbackImage;
    }
  };
  mapImage.src = map.localImage;
  mapImage.alt = `${map.name} 地图图片`;
}

function showMap(map) {
  currentMap = map;
  document.documentElement.style.setProperty("--accent-2", map.themeColor);
  mapName.textContent = map.name;
  setMapImage(map);

  history = [map, ...history.filter((item) => item.slug !== map.slug)].slice(0, 6);
  renderHistory();
  announcer.textContent = `随机结果是 ${map.name}`;
}

function rollMap() {
  const nextMap = pickRandomMap();

  pickButton.disabled = true;
  pickButton.classList.add("is-rolling");
  mapStage.classList.remove("is-rolling");
  void mapStage.offsetWidth;
  mapStage.classList.add("is-rolling");

  window.setTimeout(() => {
    showMap(nextMap);
    pickButton.disabled = false;
    pickButton.classList.remove("is-rolling");
    pickButton.focus({ preventScroll: true });
  }, 360);
}

function getTeamSetup() {
  const leftName = teamLeftInput.value.trim() || "Team Alpha";
  const rightName = teamRightInput.value.trim() || "Team Bravo";
  const owner = teamAOwnerSelect.value === "random"
    ? (Math.random() < 0.5 ? "left" : "right")
    : teamAOwnerSelect.value;

  const leftTeam = { id: "left", name: leftName, color: "#ff4655" };
  const rightTeam = { id: "right", name: rightName, color: "#22d3b6" };
  const teamA = owner === "left" ? leftTeam : rightTeam;
  const teamB = owner === "left" ? rightTeam : leftTeam;

  return {
    A: teamA,
    B: teamB,
    left: leftTeam,
    right: rightTeam
  };
}

function getVctSteps(format) {
  const flows = {
    bo1: [
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "decider", mapNumber: 1, sideActor: "A" }
    ],
    bo3: [
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "pick", actor: "A", mapNumber: 1, sideActor: "B" },
      { kind: "pick", actor: "B", mapNumber: 2, sideActor: "A" },
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "decider", mapNumber: 3, sideActor: "A" }
    ],
    bo5: [
      { kind: "ban", actor: "A" },
      { kind: "ban", actor: "B" },
      { kind: "pick", actor: "A", mapNumber: 1, sideActor: "B" },
      { kind: "pick", actor: "B", mapNumber: 2, sideActor: "A" },
      { kind: "pick", actor: "A", mapNumber: 3, sideActor: "B" },
      { kind: "pick", actor: "B", mapNumber: 4, sideActor: "A" },
      { kind: "decider", mapNumber: 5, sideActor: "B" }
    ]
  };

  return flows[format] || flows.bo3;
}

function simulateVctVeto(format, teams) {
  const remaining = [...vctPool];
  const timeline = [];
  const seriesMaps = [];

  getVctSteps(format).forEach((step) => {
    if (step.kind === "ban") {
      const map = takeRandomMap(remaining);
      timeline.push({
        type: "BAN",
        actor: teams[step.actor],
        map,
        detail: `${teams[step.actor].name} 禁用 ${map.name}`
      });
      return;
    }

    if (step.kind === "pick") {
      const map = takeRandomMap(remaining);
      const side = pickRandomSide();
      const sideTeam = teams[step.sideActor];
      const result = {
        mapNumber: step.mapNumber,
        map,
        pickedBy: teams[step.actor],
        sideTeam,
        side
      };
      seriesMaps.push(result);
      timeline.push({
        type: "PICK",
        actor: teams[step.actor],
        map,
        detail: `${teams[step.actor].name} 选择地图 ${step.mapNumber}，${sideTeam.name} 选择${side}`
      });
      return;
    }

    const map = remaining[0];
    const side = pickRandomSide();
    const sideTeam = teams[step.sideActor];
    const result = {
      mapNumber: step.mapNumber,
      map,
      pickedBy: null,
      sideTeam,
      side
    };
    seriesMaps.push(result);
    timeline.push({
      type: "DECIDER",
      actor: sideTeam,
      map,
      detail: `剩余地图成为地图 ${step.mapNumber}，${sideTeam.name} 选择${side}`
    });
  });

  seriesMaps.sort((a, b) => a.mapNumber - b.mapNumber);
  return { timeline, seriesMaps };
}

function renderVctPool() {
  vctMapPool.innerHTML = "";

  vctPool.forEach((map) => {
    const chip = document.createElement("span");
    chip.className = "pool-chip";
    chip.style.setProperty("--chip-color", map.themeColor);
    chip.textContent = map.name;
    vctMapPool.append(chip);
  });
}

function renderTeamAssignment(teams) {
  teamAssignment.innerHTML = "";

  ["A", "B"].forEach((role) => {
    const team = teams[role];
    const pill = document.createElement("div");
    pill.className = "team-pill";
    pill.style.setProperty("--pill-color", team.color);

    const label = document.createElement("span");
    label.textContent = `Team ${role}`;

    const name = document.createElement("strong");
    name.textContent = team.name;

    pill.append(label, name);
    teamAssignment.append(pill);
  });
}

function renderSeries(seriesMaps) {
  seriesList.innerHTML = "";

  seriesMaps.forEach((result) => {
    const card = document.createElement("article");
    card.className = "series-card";
    card.style.setProperty("--card-image", `url("${result.map.localImage}")`);

    const label = document.createElement("span");
    label.textContent = `地图 ${result.mapNumber}`;

    const name = document.createElement("strong");
    name.textContent = result.map.name;

    const meta = document.createElement("em");
    meta.textContent = `${result.sideTeam.name} 选${result.side}`;

    card.append(label, name, meta);
    seriesList.append(card);
  });
}

function renderTimeline(timeline) {
  vetoList.innerHTML = "";

  timeline.forEach((step, index) => {
    const item = document.createElement("li");
    item.style.setProperty("--step-color", step.map.themeColor);

    const label = document.createElement("span");
    label.textContent = `${String(index + 1).padStart(2, "0")} · ${step.type}`;

    const title = document.createElement("strong");
    title.textContent = `${step.map.name}`;

    const meta = document.createElement("div");
    meta.className = "step-meta";
    meta.textContent = step.detail;

    item.append(label, title, meta);
    vetoList.append(item);
  });
}

function runVctSimulation() {
  const teams = getTeamSetup();
  const format = matchFormatSelect.value;
  const result = simulateVctVeto(format, teams);

  renderTeamAssignment(teams);
  renderSeries(result.seriesMaps);
  renderTimeline(result.timeline);
  announcer.textContent = `已生成 ${format.toUpperCase()} Ban/Pick，第一张地图是 ${result.seriesMaps[0].map.name}`;
}

poolCount.textContent = maps.length.toString();
pickButton.addEventListener("click", rollMap);
vctForm.addEventListener("submit", (event) => {
  event.preventDefault();
  vctButton.classList.add("is-rolling");
  window.setTimeout(() => {
    runVctSimulation();
    vctButton.classList.remove("is-rolling");
  }, 220);
});

renderVctPool();
showMap(pickRandomMap());
runVctSimulation();

window.mapSelector = {
  maps,
  vctPool,
  pickRandomMap,
  simulateVctVeto,
  get currentMap() {
    return currentMap;
  }
};
