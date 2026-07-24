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
const activeStep = document.querySelector("#active-step");
const sidePicker = document.querySelector("#side-picker");
const vctMapPool = document.querySelector("#vct-map-pool");
const seriesList = document.querySelector("#series-list");
const vetoList = document.querySelector("#veto-list");
const vctButton = document.querySelector(".vct-button");
const resetVctButton = document.querySelector("#reset-vct-button");

let currentMap = null;
let history = [];
let vctState = null;

function pickRandomMap() {
  if (maps.length === 1) {
    return maps[0];
  }

  const availableMaps = maps.filter((map) => map.slug !== currentMap?.slug);
  const index = Math.floor(Math.random() * availableMaps.length);
  return availableMaps[index];
}

function getMapBySlug(slug) {
  return maps.find((map) => map.slug === slug);
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

function setVctControlsLocked(isLocked) {
  teamLeftInput.disabled = isLocked;
  teamRightInput.disabled = isLocked;
  matchFormatSelect.disabled = isLocked;
  teamAOwnerSelect.disabled = isLocked;
}

function getCurrentStep() {
  if (!vctState || vctState.complete) {
    return null;
  }
  return vctState.steps[vctState.stepIndex] || null;
}

function startVctDraft() {
  const format = matchFormatSelect.value;
  vctState = {
    teams: getTeamSetup(),
    format,
    steps: getVctSteps(format),
    stepIndex: 0,
    remainingSlugs: [...vctPoolSlugs],
    timeline: [],
    seriesMaps: [],
    pendingSide: null,
    complete: false
  };

  setVctControlsLocked(true);
  vctButton.querySelector("span:last-child").textContent = "流程进行中";
  vctButton.disabled = true;
  prepareCurrentStep();
  renderVctDraft();
  announcer.textContent = `${format.toUpperCase()} Ban/Pick 已开始，轮到 ${vctState.teams.A.name} 禁用地图`;
}

function resetVctDraft() {
  vctState = null;
  setVctControlsLocked(false);
  vctButton.disabled = false;
  vctButton.querySelector("span:last-child").textContent = "开始 Ban/Pick";
  renderVctDraft();
  announcer.textContent = "Ban/Pick 流程已重置";
}

function prepareCurrentStep() {
  const step = getCurrentStep();
  if (!step || vctState.pendingSide || step.kind !== "decider") {
    return;
  }

  const slug = vctState.remainingSlugs[0];
  const map = getMapBySlug(slug);
  vctState.pendingSide = {
    kind: "decider",
    step,
    map,
    sideTeam: vctState.teams[step.sideActor]
  };
}

function removeRemainingMap(slug) {
  vctState.remainingSlugs = vctState.remainingSlugs.filter((item) => item !== slug);
}

function chooseVctMap(slug) {
  const step = getCurrentStep();
  if (!step || vctState.pendingSide || !vctState.remainingSlugs.includes(slug)) {
    return;
  }

  const map = getMapBySlug(slug);

  if (step.kind === "ban") {
    removeRemainingMap(slug);
    vctState.timeline.push({
      type: "BAN",
      actor: vctState.teams[step.actor],
      map,
      detail: `${vctState.teams[step.actor].name} 禁用 ${map.name}`
    });
    vctState.stepIndex += 1;
    prepareCurrentStep();
    renderVctDraft();
    return;
  }

  if (step.kind === "pick") {
    removeRemainingMap(slug);
    vctState.pendingSide = {
      kind: "pick",
      step,
      map,
      pickedBy: vctState.teams[step.actor],
      sideTeam: vctState.teams[step.sideActor]
    };
    renderVctDraft();
  }
}

function chooseVctSide(side) {
  if (!vctState?.pendingSide) {
    return;
  }

  const pending = vctState.pendingSide;

  if (pending.kind === "pick") {
    const result = {
      mapNumber: pending.step.mapNumber,
      map: pending.map,
      pickedBy: pending.pickedBy,
      sideTeam: pending.sideTeam,
      side
    };
    vctState.seriesMaps.push(result);
    vctState.timeline.push({
      type: "PICK",
      actor: pending.pickedBy,
      map: pending.map,
      detail: `${pending.pickedBy.name} 选择地图 ${pending.step.mapNumber}，${pending.sideTeam.name} 选择${side}`
    });
  }

  if (pending.kind === "decider") {
    removeRemainingMap(pending.map.slug);
    const result = {
      mapNumber: pending.step.mapNumber,
      map: pending.map,
      pickedBy: null,
      sideTeam: pending.sideTeam,
      side
    };
    vctState.seriesMaps.push(result);
    vctState.timeline.push({
      type: "DECIDER",
      actor: pending.sideTeam,
      map: pending.map,
      detail: `剩余地图成为地图 ${pending.step.mapNumber}，${pending.sideTeam.name} 选择${side}`
    });
  }

  vctState.pendingSide = null;
  vctState.stepIndex += 1;

  if (vctState.stepIndex >= vctState.steps.length) {
    vctState.complete = true;
    vctButton.querySelector("span:last-child").textContent = "流程已完成";
  } else {
    prepareCurrentStep();
  }

  renderVctDraft();
}

function getMapStatus(map) {
  if (vctState?.pendingSide?.map.slug === map.slug) {
    return {
      state: "pending",
      text: vctState.pendingSide.kind === "decider" ? "决胜图待选边" : "已选择待选边"
    };
  }

  const entry = vctState?.timeline.find((step) => step.map.slug === map.slug);
  if (!entry) {
    return { state: "available", text: "可选" };
  }

  return {
    state: entry.type.toLowerCase(),
    text: entry.type === "BAN" ? "已禁用" : entry.type === "PICK" ? "已选择" : "决胜图"
  };
}

function renderVctPool() {
  vctMapPool.innerHTML = "";

  const step = getCurrentStep();
  const canPickMap = Boolean(vctState && step && !vctState.pendingSide && ["ban", "pick"].includes(step.kind));

  vctPool.forEach((map) => {
    const status = getMapStatus(map);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map-choice is-${status.state}`;
    button.dataset.slug = map.slug;
    button.style.setProperty("--chip-color", map.themeColor);
    button.style.setProperty("--map-thumb", `url("${map.localImage}")`);
    button.disabled = !canPickMap || !vctState.remainingSlugs.includes(map.slug);

    const name = document.createElement("strong");
    name.textContent = map.name;

    const meta = document.createElement("span");
    meta.textContent = status.text;

    button.append(name, meta);
    vctMapPool.append(button);
  });
}

function renderTeamAssignment(teams = vctState?.teams) {
  teamAssignment.innerHTML = "";

  if (!teams) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "设置战队与赛制后，点击开始进入真实 Ban/Pick 流程。";
    teamAssignment.append(empty);
    return;
  }

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

function renderActiveStep() {
  activeStep.innerHTML = "";

  const box = document.createElement("div");
  box.className = "active-card";

  const label = document.createElement("span");
  const title = document.createElement("strong");
  const detail = document.createElement("p");

  if (!vctState) {
    label.textContent = "等待开始";
    title.textContent = "真实流程会从 Team A 禁图开始";
    detail.textContent = "开始后，当前队伍需要手动点击地图；选边步骤会显示进攻方/防守方按钮。";
  } else if (vctState.complete) {
    label.textContent = `${vctState.format.toUpperCase()} 完成`;
    title.textContent = "Ban/Pick 流程已结束";
    detail.textContent = "地图顺序和每张图选边已生成，可以点击重开流程重新进行。";
    box.classList.add("is-complete");
  } else if (vctState.pendingSide) {
    label.textContent = `步骤 ${vctState.stepIndex + 1} / ${vctState.steps.length}`;
    title.textContent = `${vctState.pendingSide.sideTeam.name} 选边`;
    detail.textContent = `${vctState.pendingSide.map.name} 已确定，请选择开局进攻方或防守方。`;
    box.classList.add("is-side");
  } else {
    const step = getCurrentStep();
    const team = vctState.teams[step.actor];
    label.textContent = `步骤 ${vctState.stepIndex + 1} / ${vctState.steps.length}`;
    title.textContent = step.kind === "ban"
      ? `${team.name} 禁用 1 张地图`
      : `${team.name} 选择地图 ${step.mapNumber}`;
    detail.textContent = "请在下方剩余地图池中点击一张地图，流程会自动进入下一步。";
  }

  box.append(label, title, detail);
  activeStep.append(box);
}

function renderSidePicker() {
  sidePicker.innerHTML = "";

  if (!vctState?.pendingSide) {
    return;
  }

  sides.forEach((side) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "side-choice";
    button.dataset.side = side;
    button.textContent = side;
    sidePicker.append(button);
  });
}

function renderSeries(seriesMaps = vctState?.seriesMaps || []) {
  seriesList.innerHTML = "";

  const sortedMaps = [...seriesMaps].sort((a, b) => a.mapNumber - b.mapNumber);

  if (sortedMaps.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "已选择的比赛地图会显示在这里。";
    seriesList.append(empty);
    return;
  }

  sortedMaps.forEach((result) => {
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

function renderTimeline(timeline = vctState?.timeline || []) {
  vetoList.innerHTML = "";

  if (timeline.length === 0) {
    const item = document.createElement("li");
    item.className = "empty-state";
    item.textContent = "Ban/Pick 记录会按真实执行顺序显示在这里。";
    vetoList.append(item);
    return;
  }

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

function renderVctDraft() {
  renderTeamAssignment();
  renderActiveStep();
  renderSidePicker();
  renderVctPool();
  renderSeries();
  renderTimeline();
}

poolCount.textContent = maps.length.toString();
pickButton.addEventListener("click", rollMap);
vctForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startVctDraft();
});
resetVctButton.addEventListener("click", resetVctDraft);
vctMapPool.addEventListener("click", (event) => {
  const button = event.target.closest(".map-choice");
  if (!button) {
    return;
  }
  chooseVctMap(button.dataset.slug);
});
sidePicker.addEventListener("click", (event) => {
  const button = event.target.closest(".side-choice");
  if (!button) {
    return;
  }
  chooseVctSide(button.dataset.side);
});

showMap(pickRandomMap());
renderVctDraft();

window.mapSelector = {
  maps,
  vctPool,
  getVctSteps,
  startVctDraft,
  resetVctDraft,
  chooseVctMap,
  chooseVctSide,
  pickRandomMap,
  get currentMap() {
    return currentMap;
  },
  get vctState() {
    return vctState;
  }
};
