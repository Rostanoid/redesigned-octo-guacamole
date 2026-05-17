(function () {
  function commons(file) {
    return "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file);
  }

  function image(query) {
    const q = String(query || "").toLowerCase();
    if (q.includes("adjarian")) return commons("Adjarian khachapuri on a wooden tray.jpg");
    if (q.includes("megruli")) return commons("Hachapori.jpg");
    if (q.includes("khachapuri") || q.includes("achma") || q.includes("cheese pie")) return commons("Khachapuri.jpg");
    if (q.includes("khinkali")) return commons("Khinkali 551.jpg");
    if (q.includes("shashlik") || q.includes("skewer") || q.includes("lula") || q.includes("mixed grill") || q.includes("lamb chop")) return commons("Shashlik.jpg");
    if (q.includes("satsivi")) return commons("Satsivi (2).jpg");
    if (q.includes("pkhali") || q.includes("eggplant") || q.includes("georgian appetizers")) return commons("Pkhali, Badrijani and Ajika.jpg");
    if (q.includes("kharcho")) return commons("Kharcho meat soup.jpg");
    if (q.includes("borscht")) return commons("Borscht.jpg");
    if (q.includes("pilaf")) return commons("Rice pilaf.jpg");
    if (q.includes("lavash") || q.includes("bread")) return commons("Lavash.jpg");
    if (q.includes("adjika") && q.includes("green")) return commons("Green ajika.jpg");
    if (q.includes("adjika")) return commons("Adjika in a can.jpg");
    if (q.includes("tkemali")) return commons("Tkemali 2.jpg");
    if (q.includes("yogurt") || q.includes("matsoni")) return commons("Matsoni.jpg");
    if (q.includes("baklava")) return commons("Baklavas.jpg");
    if (q.includes("carrot")) return commons("Carrot Cake.jpg");
    if (q.includes("fondant")) return commons("Chocolate Fondant.jpg");
    if (q.includes("ice cream")) return commons("Strawberry Ice Cream with Strawberries.jpg");
    if (q.includes("chicken soup")) return commons("Chicken soup.jpg");
    if (q.includes("rice")) return commons("Rice pilaf.jpg");
    if (q.includes("potato")) return commons("Fried potatoes.jpg");
    if (q.includes("vegetable")) return commons("Vegetable platter.jpg");
    if (q.includes("cheese")) return commons("Georgian cheese, khachapuri, eggplant and pkhali.jpg");
    return commons("Georgian Sampler Plate 1 2024-05-14.jpg");
  }

  const dishes = [
    { category: "Закуски", title: "Тарелка домашних солений", kj: 520, image: image("pickled vegetables platter") },
    { category: "Закуски", title: "Тарелка свежих овощей", kj: 410, image: image("fresh vegetable platter herbs") },
    { category: "Закуски", title: "Тарелка грузинских сыров", kj: 1850, image: image("cheese platter sulguni") },
    { category: "Закуски", title: "Тарелка грузинских закусок", kj: 1450, image: image("georgian appetizers pkhali eggplant") },
    { category: "Закуски", title: "Икра из баклажанов", kj: 760, image: image("eggplant spread appetizer") },
    { category: "Закуски", title: "Рулетики из баклажанов", kj: 1180, image: image("eggplant rolls walnut georgian") },
    { category: "Закуски", title: "Ассорти пхали", kj: 980, image: image("pkhali georgian appetizer") },
    { category: "Закуски", title: "Сациви из курицы", kj: 1680, image: image("chicken walnut sauce satsivi") },

    { category: "Салаты", title: "Салат из свежих овощей", kj: 520, image: image("cucumber tomato herb salad") },
    { category: "Салаты", title: "Салат из свежих овощей с грецким орехом", kj: 980, image: image("georgian tomato cucumber walnut salad") },
    { category: "Салаты", title: "Тёплый салат с куриной печенью", kj: 1420, image: image("warm chicken liver salad") },
    { category: "Салаты", title: "Салат Бахор с говядиной и свежими овощами", kj: 1380, image: image("beef vegetable salad") },
    { category: "Салаты", title: "Пряный салат из рваной говядины", kj: 1540, image: image("spicy shredded beef salad") },
    { category: "Салаты", title: "Ацецили", kj: 1260, image: image("georgian beef salad herbs") },
    { category: "Салаты", title: "Салат с имеретинским сыром", kj: 1180, image: image("salad imereti cheese tomatoes") },
    { category: "Салаты", title: "Тбилисский с говядиной", kj: 1520, image: image("tbilisi beef bean salad") },

    { category: "Горячее", title: "Оджахури из курицы", kj: 2240, image: image("ojakhuri chicken potatoes georgian") },
    { category: "Горячее", title: "Оджахури из свинины", kj: 2860, image: image("ojakhuri pork potatoes") },
    { category: "Горячее", title: "Оджахури из баранины", kj: 3020, image: image("lamb potatoes skillet") },
    { category: "Горячее", title: "Солянка по-грузински", kj: 1760, image: image("georgian solyanka stew") },
    { category: "Горячее", title: "Чашушули", kj: 2380, image: image("chashushuli georgian beef stew") },
    { category: "Горячее", title: "Плов с бараниной", kj: 3180, image: image("lamb pilaf rice") },
    { category: "Горячее", title: "Котлеты из говядины и свинины", kj: 2360, image: image("meat cutlets mashed potatoes") },
    { category: "Горячее", title: "Картофель жареный с грибами", kj: 1980, image: image("fried potatoes mushrooms") },
    { category: "Горячее", title: "Курица по-мергельски", kj: 2240, image: image("chicken cheese sauce georgian") },
    { category: "Горячее", title: "Запечённый сулугуни с томатами на кеци", kj: 1860, image: image("baked sulguni tomatoes") },
    { category: "Горячее", title: "Цыплёнок тапака", kj: 2940, image: image("chicken tabaka georgian") },

    { category: "Шашлыки", title: "Шашлык из курицы", kj: 1880, image: image("chicken shashlik skewers") },
    { category: "Шашлыки", title: "Шашлык из курицы с овощами", kj: 2040, image: image("chicken vegetable skewers") },
    { category: "Шашлыки", title: "Шашлык из индейки", kj: 1720, image: image("turkey skewers grill") },
    { category: "Шашлыки", title: "Шашлык из свинины", kj: 2860, image: image("pork shashlik skewers") },
    { category: "Шашлыки", title: "Шашлык из мякоти ягнёнка", kj: 2720, image: image("lamb shashlik skewers") },
    { category: "Шашлыки", title: "Шашлык из каре ягнёнка", kj: 3120, image: image("lamb chops grill") },
    { category: "Шашлыки", title: "Люля-кебаб курица", kj: 1760, image: image("chicken lula kebab") },
    { category: "Шашлыки", title: "Люля-кебаб говядина", kj: 2240, image: image("beef lula kebab") },
    { category: "Шашлыки", title: "Ассорти шашлыков", kj: 9600, image: image("mixed grill skewers platter") },

    { category: "Хинкали", title: "Хинкали свинина и говядина", kj: 1680, image: image("khinkali dumplings") },
    { category: "Хинкали", title: "Хинкали баранина", kj: 1740, image: image("khinkali lamb dumplings") },

    { category: "Супы и гарниры", title: "Суп куриный", kj: 880, image: image("chicken soup bowl") },
    { category: "Супы и гарниры", title: "Борщ", kj: 1160, image: image("borscht soup") },
    { category: "Супы и гарниры", title: "Харчо", kj: 1540, image: image("kharcho soup georgian") },
    { category: "Супы и гарниры", title: "Овощи на гриле", kj: 720, image: image("grilled vegetables") },
    { category: "Супы и гарниры", title: "Пюре картофельное", kj: 860, image: image("mashed potatoes") },
    { category: "Супы и гарниры", title: "Рис", kj: 760, image: image("steamed rice bowl") },

    { category: "Соусы и хлеб", title: "Армянский лаваш", kj: 820, image: image("lavash flatbread") },
    { category: "Соусы и хлеб", title: "Пури с соусом сацебели", kj: 1050, image: image("georgian bread tomato sauce") },
    { category: "Соусы и хлеб", title: "Хлебная корзина", kj: 1680, image: image("bread basket") },
    { category: "Соусы и хлеб", title: "Аджика красная", kj: 180, image: image("red adjika sauce") },
    { category: "Соусы и хлеб", title: "Аджика зелёная", kj: 160, image: image("green adjika sauce herbs") },
    { category: "Соусы и хлеб", title: "Сацебели", kj: 210, image: image("satsebeli tomato sauce") },
    { category: "Соусы и хлеб", title: "Чкмерули", kj: 640, image: image("garlic cream sauce") },
    { category: "Соусы и хлеб", title: "Сметана", kj: 520, image: image("sour cream bowl") },
    { category: "Соусы и хлеб", title: "Ткемали", kj: 230, image: image("tkemali plum sauce") },

    { category: "Выпечка", title: "Ачма", kj: 2860, image: image("achma georgian cheese pie") },
    { category: "Выпечка", title: "Пирог с картофелем и сыром сулугуни", kj: 2560, image: image("potato cheese pie") },
    { category: "Выпечка", title: "Хачапури на мангале", kj: 2480, image: image("khachapuri grilled cheese bread") },
    { category: "Выпечка", title: "Хачапури по-аджарски", kj: 3140, image: image("adjarian khachapuri") },
    { category: "Выпечка", title: "Хачапури по-имеретински", kj: 2860, image: image("imeretian khachapuri") },
    { category: "Выпечка", title: "Хачапури по-мегрельски", kj: 3260, image: image("megruli khachapuri") },
    { category: "Выпечка", title: "Хачапури по-домашнему", kj: 3060, image: image("homemade khachapuri") },

    { category: "Десерты", title: "Мороженое", kj: 840, image: image("ice cream dessert") },
    { category: "Десерты", title: "Грузинское варенье", kj: 980, image: image("walnut jam georgian") },
    { category: "Десерты", title: "Мацони с мёдом и орехами", kj: 1180, image: image("yogurt honey walnuts") },
    { category: "Десерты", title: "Пахлава", kj: 2060, image: image("baklava dessert") },
    { category: "Десерты", title: "Морковный торт", kj: 1760, image: image("carrot cake slice") },
    { category: "Десерты", title: "Шоколадный фондан", kj: 1880, image: image("chocolate fondant dessert") }
  ];

  function normalizeTitle(title) {
    return String(title || "")
      .toLowerCase()
      .replace(/^хит\s+/u, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  window.foodDishes = dishes;
  window.foodDishMap = dishes.reduce(function (map, dish) {
    map[normalizeTitle(dish.title)] = dish;
    return map;
  }, {});
  window.normalizeFoodTitle = normalizeTitle;
})();
