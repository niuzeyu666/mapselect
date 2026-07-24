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

const mapImage = document.querySelector("#map-image");
const mapName = document.querySelector("#map-name");
const pickButton = document.querySelector("#pick-button");
const historyList = document.querySelector("#history-list");
const poolCount = document.querySelector("#pool-count");
const announcer = document.querySelector("#result-announcer");
const mapStage = document.querySelector(".map-stage");

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

poolCount.textContent = maps.length.toString();
pickButton.addEventListener("click", rollMap);
showMap(pickRandomMap());

window.mapSelector = {
  maps,
  pickRandomMap,
  get currentMap() {
    return currentMap;
  }
};
