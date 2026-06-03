import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "food_images");
const dataPath = path.join(root, "food-data.js");
const sourcesPath = path.join(root, "food-image-sources.json");

globalThis.window = globalThis;
await import(pathToFileUrl(dataPath));

const dishes = globalThis.foodDishes;

const queries = [
  "pickled cucumber tomato plate",
  "vegetable platter tomato cucumber herbs",
  "sulguni Georgian cheese platter",
  "Georgian pkhali badrijani appetizers",
  "eggplant caviar spread appetizer",
  "badrijani nigvzit Georgian eggplant walnut rolls",
  "pkhali Georgian appetizer assorted",
  "satsivi chicken walnut sauce Georgian",
  "Georgian cucumber tomato salad",
  "Georgian tomato cucumber walnut salad",
  "warm chicken liver salad",
  "beef vegetable salad",
  "spicy shredded beef salad",
  "Georgian beef salad",
  "tomato cheese salad sulguni",
  "Tbilisi salad beef beans",
  "ojakhuri chicken potatoes Georgian",
  "ojakhuri pork potatoes Georgian",
  "lamb potatoes skillet",
  "Georgian solyanka stew",
  "chashushuli Georgian beef stew",
  "lamb pilaf rice",
  "meat cutlets pork beef",
  "fried potatoes mushrooms",
  "chicken in cheese sauce",
  "sulguni tomatoes ketsi",
  "chicken tabaka Georgian",
  "chicken shashlik skewers",
  "chicken vegetable skewers",
  "turkey skewers grill",
  "pork shashlik skewers",
  "lamb shashlik skewers",
  "grilled lamb chops",
  "chicken lula kebab",
  "beef lula kebab",
  "mixed grill skewers platter",
  "khinkali Georgian dumplings",
  "khinkali Georgian dumplings lamb",
  "chicken soup bowl",
  "borscht soup",
  "kharcho Georgian soup",
  "grilled vegetables",
  "mashed potatoes",
  "steamed rice bowl",
  "lavash flatbread",
  "Georgian puri bread",
  "bread basket",
  "red adjika sauce",
  "green adjika sauce",
  "satsebeli tomato sauce",
  "chkmeruli garlic cream sauce",
  "sour cream bowl",
  "tkemali plum sauce",
  "achma Georgian cheese pie",
  "potato cheese pie",
  "khachapuri on skewer grilled",
  "adjarian khachapuri",
  "imeretian khachapuri",
  "megruli khachapuri",
  "homemade khachapuri",
  "ice cream dessert",
  "Georgian walnut jam",
  "matsoni honey walnuts",
  "baklava dessert",
  "carrot cake slice",
  "chocolate fondant dessert"
];

const preferredFiles = [
  "Pickled cucumbers.jpg",
  "Vegetable platter.jpg",
  "Georgian cheese, khachapuri, eggplant and pkhali.jpg",
  "Pkhali, Badrijani and Ajika.jpg",
  "",
  "Pkhali, Badrijani and Ajika.jpg",
  "Пхали (Миндаль) 2020.jpg",
  "Satsivi (2).jpg",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "Rice pilaf.jpg",
  "",
  "Fried potatoes.jpg",
  "",
  "",
  "Chicken tabaka Georgian cuisine.jpg",
  "Shashlik.jpg",
  "Chicken shashlik.jpg",
  "",
  "Shashlik.jpg",
  "Shashlik.jpg",
  "",
  "",
  "",
  "Mixed grill platter.jpg",
  "Khinkali 551.jpg",
  "Khinkali 551.jpg",
  "Chicken soup.jpg",
  "Borscht.jpg",
  "Kharcho meat soup.jpg",
  "Grilled vegetables.jpg",
  "Mashed potatoes.jpg",
  "Rice pilaf.jpg",
  "Lavash.jpg",
  "",
  "Bread basket.jpg",
  "Adjika in a can.jpg",
  "Green ajika.jpg",
  "",
  "",
  "Sour cream.jpg",
  "Tkemali 2.jpg",
  "Khachapuri.jpg",
  "",
  "",
  "Adjarian khachapuri on a wooden tray.jpg",
  "Khachapuri.jpg",
  "Hachapori.jpg",
  "Khachapuri.jpg",
  "Strawberry Ice Cream with Strawberries.jpg",
  "",
  "Matsoni.jpg",
  "Baklavas.jpg",
  "Carrot Cake.jpg",
  "Chocolate Fondant.jpg"
];

if (!Array.isArray(dishes) || dishes.length !== queries.length) {
  throw new Error(`Expected ${queries.length} dishes, got ${dishes && dishes.length}`);
}

const categoryFallback = {
  "Закуски": "Georgian appetizer food",
  "Салаты": "salad food",
  "Горячее": "Georgian meat dish food",
  "Шашлыки": "shashlik skewers grill food",
  "Хинкали": "khinkali Georgian dumplings",
  "Супы и гарниры": "soup side dish food",
  "Соусы и хлеб": "Georgian sauce bread food",
  "Выпечка": "Georgian cheese bread khachapuri",
  "Десерты": "dessert food"
};

await fs.mkdir(outDir, { recursive: true });

const sources = [];
const nextDishes = [];
const usedTitles = new Set();

for (let i = 0; i < dishes.length; i += 1) {
  const dish = dishes[i];
  const searchTerms = [queries[i], dish.title, categoryFallback[dish.category]].filter(Boolean);
  const result = await findImage(searchTerms, preferredFiles[i]);
  const number = String(i + 1).padStart(2, "0");
  const ext = extensionFor(result.mime, result.url);
  const filename = `${number}-${slug(dish.title)}${ext}`;
  const localPath = path.join(outDir, filename);

  const bytes = await fetchBytes(result.url);
  await fs.writeFile(localPath, bytes);

  nextDishes.push({ ...dish, image: `food_images/${filename}` });
  sources.push({
    dish: dish.title,
    category: dish.category,
    query: result.query,
    file: result.title,
    page: result.page,
    image: result.url,
    local: `food_images/${filename}`,
    license: result.license || "",
    artist: result.artist || ""
  });

  console.log(`${number}. ${dish.title} -> ${result.title}`);
}

await fs.writeFile(sourcesPath, JSON.stringify(sources, null, 2), "utf8");
await fs.writeFile(dataPath, renderFoodData(nextDishes), "utf8");

function pathToFileUrl(filePath) {
  return new URL(`file:///${filePath.replace(/\\/g, "/")}`).href;
}

async function findImage(searchTerms, preferredFile) {
  if (preferredFile) {
    const preferred = await imageInfoForFile(preferredFile).catch(() => null);
    if (preferred && isUsableImage(preferred) && !usedTitles.has(preferred.title)) {
      usedTitles.add(preferred.title);
      return { ...preferred, query: `preferred:${preferredFile}` };
    }
  }

  for (const query of searchTerms) {
    await delay(900);
    const candidates = await searchCommons(query);
    const candidate = candidates
      .filter((item) => isUsableImage(item) && !usedTitles.has(item.title))
      .sort((a, b) => scoreImage(b, query) - scoreImage(a, query))[0];
    if (candidate) {
      usedTitles.add(candidate.title);
      return { ...candidate, query };
    }
  }
  throw new Error(`No image found for ${searchTerms.join(" | ")}`);
}

async function imageInfoForFile(file) {
  const title = file.startsWith("File:") ? file : `File:${file}`;
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1400",
    origin: "*"
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const page = Object.values(data.query?.pages || {})[0];
  if (!page || page.missing) return null;
  return normalizePage(page);
}

async function searchCommons(query) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "12",
    gsrsearch: query,
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1400",
    origin: "*"
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const pages = Object.values(data.query?.pages || {});
  return pages.map(normalizePage);
}

function normalizePage(page) {
  const info = page.imageinfo?.[0] || {};
  const meta = info.extmetadata || {};
  return {
    title: page.title,
    url: info.thumburl || info.url,
    mime: info.mime || "",
    page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
    license: strip(meta.LicenseShortName?.value || meta.License?.value || ""),
    artist: strip(meta.Artist?.value || meta.Credit?.value || "")
  };
}

function isUsableImage(item) {
  const title = item.title.toLowerCase();
  const blocked = ["map", "logo", "icon", "diagram", "flag", "svg", "pdf", "audio", "video", "staplehouse"];
  return item.url && item.mime.startsWith("image/") && !blocked.some((word) => title.includes(word));
}

function scoreImage(item, query) {
  const title = item.title.toLowerCase();
  const words = query.toLowerCase().split(/\W+/).filter((word) => word.length > 2);
  let score = 0;
  for (const word of words) {
    if (title.includes(word)) score += 4;
  }
  if (item.mime === "image/jpeg") score += 3;
  if (title.includes("food") || title.includes("dish")) score += 1;
  if (title.includes("plate") || title.includes("platter")) score += 1;
  if (title.includes("restaurant")) score -= 2;
  if (title.includes("appetizer") && !query.toLowerCase().includes("appetizer")) score -= 4;
  return score;
}

async function fetchJson(url) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, {
      headers: { "User-Agent": "orveliani-menu-image-picker/1.0 (local project)" }
    });
    if (response.ok) return response.json();
    if (response.status !== 429) throw new Error(`${response.status} ${response.statusText}: ${url}`);
    await delay(2500 + attempt * 1500);
  }
  throw new Error(`429 Too Many Requests: ${url}`);
}

async function fetchBytes(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "orveliani-menu-image-picker/1.0 (local project)" }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

function extensionFor(mime, url) {
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  if (mime === "image/gif") return ".gif";
  const clean = new URL(url).pathname.toLowerCase();
  if (clean.endsWith(".png")) return ".png";
  if (clean.endsWith(".webp")) return ".webp";
  return ".jpg";
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ё/g, "e")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 58);
}

function strip(value) {
  return String(value).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function renderFoodData(items) {
  const lines = items.map((dish) => {
    return `    ${JSON.stringify({
      category: dish.category,
      title: dish.title,
      kj: dish.kj,
      image: dish.image
    })}`;
  });

  return `(function () {
  const dishes = [
${lines.join(",\n")}
  ];

  function normalizeTitle(title) {
    return String(title || "")
      .toLowerCase()
      .replace(/^хит\\s+/u, "")
      .replace(/\\s+/g, " ")
      .trim();
  }

  window.foodDishes = dishes;
  window.foodDishMap = dishes.reduce(function (map, dish) {
    map[normalizeTitle(dish.title)] = dish;
    return map;
  }, {});
  window.normalizeFoodTitle = normalizeTitle;
})();
`;
}
