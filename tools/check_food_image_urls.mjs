globalThis.window = globalThis;
await import(new URL("../food-data.js", import.meta.url));

let failed = 0;

for (const dish of globalThis.foodDishes) {
  const response = await fetch(dish.image, {
    method: "GET",
    redirect: "follow",
    headers: { "User-Agent": "orveliani-menu-image-checker/1.0 (local project)" }
  });
  const type = response.headers.get("content-type") || "";
  const ok = response.ok && type.startsWith("image/");
  if (!ok) failed += 1;
  console.log(`${ok ? "OK" : "BAD"} ${response.status} ${type} :: ${dish.title} :: ${dish.image}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}

if (failed) {
  throw new Error(`${failed} image URLs failed`);
}
