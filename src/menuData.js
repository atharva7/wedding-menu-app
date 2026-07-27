// Wedding Menu Data Model
// Tiers: 1 = Starter (200-300 guests), 2 = Celebration (300-500), 3 = Grand (500+)

export const TIERS = [
  {
    id: 1,
    name: "Starter",
    subtitle: "200 - 300 Guests",
    tagline: "An intimate, thoughtfully curated spread",
  },
  {
    id: 2,
    name: "Celebration",
    subtitle: "300 - 500 Guests",
    tagline: "Our most-loved package, fully rounded",
    recommended: true,
  },
  {
    id: 3,
    name: "Grand",
    subtitle: "500+ Guests",
    tagline: "The complete experience, no limits",
  },
];

// helper to build tier-indexed limit objects quickly: limitsFor(a,b,c)
const t = (a, b, c) => ({ 1: a, 2: b, 3: c });

export const CATEGORIES = [
  {
    id: "welcomeDrinks",
    title: "Welcome Drinks & Mocktails",
    emoji: "🍹",
    max: t(3, 5, 8),
    items: [
      { id: "aamPannaMojito", name: "Aam Panna Mojito (Virgin/Spiked)", veg: true },
      { id: "kokumCooler", name: "Kokum Cooler with Mint", veg: true },
      { id: "jaljeeraSpritz", name: "Jaljeera Spritz with Fresh Lime", veg: true },
      { id: "lycheeBellini", name: "Lychee Rose Bellini", veg: true },
      { id: "chaiMartini", name: "Masala Chai Espresso Martini", veg: true },
      { id: "blueLemonade", name: "Blue Pea Flower Lemonade", veg: true },
      { id: "coconutWater", name: "Fresh Coconut Water Station", veg: true },
      { id: "juiceBar", name: "Cold-Pressed Juice Bar", veg: true },
    ],
  },
  {
    id: "liveCounters",
    title: "Live Interactive Counters",
    emoji: "🔥",
    max: t(2, 4, 6),
    items: [
      { id: "chaatCorner", name: "Chaat Corner - Build Your Own", veg: true },
      { id: "bombayStreetTruck", name: "Bombay Street Food Truck", veg: true },
      { id: "delhiChaatHub", name: "Delhi Chaat Hub", veg: true },
      { id: "indoMexican", name: "Indo-Mexican Station", veg: true },
      { id: "asianFusion", name: "Asian-Indian Fusion", veg: true },
      { id: "mediterranean", name: "Mediterranean Meets India", veg: true },
    ],
  },
  {
    id: "cocktailFingerFood",
    title: "Cocktail Hour Finger Food",
    emoji: "📸",
    max: t(15, 25, 35),
    vegMax: t(10, 15, 20),
    nonVegMax: t(5, 10, 15),
    items: [
      { id: "paniPuriShots", name: "Pani Puri Shots", veg: true },
      { id: "samosaChaatCups", name: "Samosa Chaat Cups", veg: true },
      { id: "papdiChaatCones", name: "Papdi Chaat Cones", veg: true },
      { id: "dahiBhallaShooters", name: "Dahi Bhalla Shooters", veg: true },
      { id: "sevPuriTowers", name: "Sev Puri Towers", veg: true },
      { id: "rajKachoriBites", name: "Raj Kachori Bites", veg: true },
      { id: "alooTikkiSliders", name: "Aloo Tikki Sliders", veg: true },
      { id: "vadaPavSliders", name: "Vada Pav Sliders", veg: true },
      { id: "dabeliBites", name: "Dabeli Bites", veg: true },
      { id: "pavBhajiFondue", name: "Pav Bhaji Fondue", veg: true },
      { id: "misalPavCups", name: "Misal Pav Cups", veg: true },
      { id: "golgappaStation", name: "Golgappa Station", veg: true },
      { id: "bhelPuriCups", name: "Bhel Puri in Edible Cups", veg: true },
      { id: "paneerTikkaTacos", name: "Paneer Tikka Tacos", veg: true },
      { id: "tandooriCauliflowerTacos", name: "Tandoori Cauliflower Tacos", veg: true },
      { id: "paneerSushiRolls", name: "Paneer Tikka Sushi Rolls", veg: true },
      { id: "samosaSpringRolls", name: "Samosa Spring Rolls", veg: true },
      { id: "gobiManchurianLollipops", name: "Gobi Manchurian Lollipops", veg: true },
      { id: "falafelAlooTikki", name: "Falafel-Aloo Tikki Fusion Bites", veg: true },
      { id: "hummusTrio", name: "Hummus Trio with Naan Chips", veg: true },
      { id: "paneerShawarma", name: "Paneer Shawarma Wraps", veg: true },
      { id: "chicken65Quesadillas", name: "Chicken 65 Quesadillas", veg: false },
      { id: "butterChickenNachos", name: "Butter Chicken Nachos", veg: false },
      { id: "tandooriChickenBao", name: "Tandoori Chicken Bao Buns", veg: false },
      { id: "chickenMomos", name: "Chicken Momos", veg: false },
      { id: "kathiRollWraps", name: "Chicken Kathi Roll Wraps", veg: false },
      { id: "keemaLoadedFries", name: "Keema Loaded Fries", veg: false },
    ],
  },
  {
    id: "tandoorSkewers",
    title: "Tandoor & Grill Skewers",
    emoji: "🍢",
    vegMax: t(2, 3, 4),
    nonVegMax: t(1, 2, 4),
    items: [
      { id: "paneerTikkaSkewer", name: "Paneer Tikka (Malai/Achari/Peri-Peri)", veg: true },
      { id: "tandooriMushroom", name: "Tandoori Mushroom Skewers", veg: true },
      { id: "cornCheeseSeekh", name: "Corn & Cheese Seekh", veg: true },
      { id: "haraBharaPops", name: "Hara Bhara Kebab Pops", veg: true },
      { id: "tandooriBroccoli", name: "Tandoori Broccoli with Sesame", veg: true },
      { id: "afghaniPaneer", name: "Afghani Paneer Tikka", veg: true },
      { id: "chickenTikkaSkewer", name: "Chicken Tikka (Classic/Malai/Hariyali)", veg: false },
      { id: "chickenSeekhKebab", name: "Chicken Seekh Kebab", veg: false },
      { id: "fishTikkaAjwaini", name: "Fish Tikka (Ajwaini)", veg: false },
      { id: "lambChopsMini", name: "Lamb Chops (mini)", veg: false },
      { id: "prawnsKoliwadaSticks", name: "Prawns Koliwada on Sticks", veg: false },
      { id: "chickenLollipops", name: "Chicken Lollipops", veg: false },
    ],
  },
  {
    id: "friedCrispy",
    title: "Fried & Crispy Bites",
    emoji: "🥟",
    max: t(2, 4, 6),
    items: [
      { id: "miniSamosas", name: "Mini Samosas (Cocktail Size)", veg: true },
      { id: "cheeseCornBalls", name: "Cheese Corn Balls", veg: true },
      { id: "paneerPakoraBites", name: "Paneer Pakora Bites", veg: true },
      { id: "vegSpringRolls", name: "Vegetable Spring Rolls", veg: true },
      { id: "onionRings", name: "Onion Rings with Mint Mayo", veg: true },
      { id: "bananaPepperPoppers", name: "Banana Pepper Poppers with Cheese", veg: true },
      { id: "crispyChickenWings", name: "Crispy Chicken Wings (Tandoori/Peri-Peri/Honey Chili)", veg: false },
    ],
  },
  {
    id: "soupShooters",
    title: "Soup Shooters & Sips",
    emoji: "🍜",
    max: t(1, 2, 3),
    items: [
      { id: "tomatoShorbaShots", name: "Tomato Shorba Shots", veg: true },
      { id: "tomYumSoup", name: "Thai Tom Yum Soup", veg: true },
      { id: "manchowSoupCups", name: "Manchow Soup Cups", veg: true },
      { id: "mulligatawnyShooters", name: "Mulligatawny Shooters", veg: false },
      { id: "sweetCornChickenSoup", name: "Sweet Corn Chicken Soup", veg: false },
    ],
  },
  {
    id: "grazingStations",
    title: "Main Course Grazing Stations",
    emoji: "🎪",
    max: t(3, 5, 8),
    items: [
      { id: "biryaniBar", name: "Biryani Bar", sub: "biryaniBar" },
      { id: "pastaNoodles", name: "Live Pasta & Noodles Station", sub: "pastaNoodles" },
      { id: "sliderBurger", name: "Slider & Burger Station", sub: "sliderBurger" },
      { id: "tacoWrap", name: "Taco & Wrap Station", sub: "tacoWrap" },
      { id: "pizzaStation", name: "Pizza Station", sub: "pizzaStation" },
      { id: "indianComfort", name: "Indian Comfort Mini Bowls (+ Breads)", sub: "indianComfort" },
      { id: "dosaCounter", name: "Live Dosa & Uttapam Counter", sub: "dosaCounter", availableFrom: 2 },
      { id: "saladBar", name: "Salad & Poke Bowl Bar", sub: "saladBar", availableFrom: 2 },
    ],
  },
  {
    id: "dessertShots",
    title: "Dessert Shots & Mini Jars",
    emoji: "🥃",
    max: t(4, 8, 12),
    items: [
      { id: "gulabJamunCheesecakeShots", name: "Gulab Jamun Cheesecake Shots", veg: true },
      { id: "rasmalaiMartini", name: "Rasmalai in Martini Glasses", veg: true },
      { id: "phirniJars", name: "Phirni Jars with Edible Flowers", veg: true },
      { id: "shrikhandCups", name: "Shrikhand Cups with Saffron", veg: true },
      { id: "rabriShots", name: "Rabri Shots with Nuts", veg: true },
      { id: "gajarHalwaTiramisu", name: "Gajar Halwa Tiramisu Cups", veg: true },
    ],
  },
  {
    id: "liveDessertStations",
    title: "Live Dessert Stations",
    emoji: "🍨",
    max: t(1, 2, 3),
    items: [
      { id: "kulfiBar", name: "Kulfi Bar (Paan, Mango, Kesar-Pista, Rose, Chocolate)", veg: true },
      { id: "iceCreamRoll", name: "Ice Cream Roll Station (Nitrogen)", veg: true },
      { id: "waffleCrepe", name: "Waffle & Crepe Station", veg: true },
    ],
  },
  {
    id: "fusionSweets",
    title: "Fusion Sweet Bites",
    emoji: "🧁",
    max: t(3, 5, 7),
    items: [
      { id: "gulabJamunDonuts", name: "Gulab Jamun Donuts", veg: true },
      { id: "jalebiCheesecake", name: "Jalebi Cheesecake", veg: true },
      { id: "rasmalaiCakePops", name: "Rasmalai Cake Pops", veg: true },
      { id: "chocolateSamosas", name: "Chocolate Samosas", veg: true },
      { id: "motichoorBrownies", name: "Motichoor Ladoo Brownies", veg: true },
      { id: "paanIceCreamSandwiches", name: "Paan Ice Cream Sandwiches", veg: true },
      { id: "churrosRabri", name: "Churros with Rabri Dip", veg: true },
    ],
  },
  {
    id: "candyMithai",
    title: "Candy & Mithai Bar",
    emoji: "🍬",
    max: t(0, 2, 4),
    availableFrom: 2,
    items: [
      { id: "mithaiTower", name: "Assorted Mithai Tower", veg: true },
      { id: "chocolateFountain", name: "Chocolate Fountain with Fruits", veg: true },
      { id: "cottonCandy", name: "Cotton Candy Station", veg: true },
      { id: "popcornBar", name: "Popcorn Bar (Caramel/Cheese/Peri-Peri)", veg: true },
    ],
  },
  {
    id: "midnightSnacks",
    title: "Midnight Snacks (Chai & Coffee Bar Always Included)",
    emoji: "🌙",
    max: t(2, 4, 4),
    items: [
      { id: "maggiBar", name: "Maggi / Instant Noodles Bar", veg: true },
      { id: "sandwichGriller", name: "Sandwich Griller (Bombay Sandwich, Cheese Chili Toast)", veg: true },
      { id: "pakoraCounter", name: "Pakora Counter (Fresh Fried)", veg: true },
      { id: "friesStation", name: "French Fries Station (Peri-Peri/Masala/Cheese)", veg: true },
    ],
  },
];

// Sub-station item pools, keyed by sub id referenced in grazingStations items
export const SUB_CATEGORIES = {
  biryaniBar: {
    title: "Biryani Bar",
    max: t(2, 4, 6),
    items: [
      { id: "hyderabadiChickenBiryani", name: "Hyderabadi Chicken Biryani", veg: false },
      { id: "lucknowiMuttonBiryani", name: "Lucknowi Mutton Biryani", veg: false },
      { id: "paneerBiryani", name: "Paneer Biryani (Kolkata Style)", veg: true },
      { id: "prawnBiryani", name: "Prawn Biryani", veg: false },
      { id: "vegDumBiryani", name: "Vegetable Dum Biryani", veg: true },
      { id: "keemaPulao", name: "Keema Pulao", veg: false },
    ],
  },
  pastaNoodles: {
    title: "Live Pasta & Noodles Station",
    max: null, // unlimited, all offered when station selected
    items: [
      { id: "desiMasalaPasta", name: "Desi Masala Pasta", veg: true },
      { id: "creamyPasta", name: "Creamy Pasta", veg: true },
      { id: "hakkaNoodles", name: "Hakka Noodles (Veg/Chicken/Schezwan)", veg: true },
      { id: "singaporeNoodles", name: "Singapore Noodles", veg: true },
      { id: "thaiRedCurryNoodles", name: "Thai Red Curry Noodles", veg: true },
    ],
  },
  sliderBurger: {
    title: "Slider & Burger Station",
    max: null,
    items: [
      { id: "vadaPavGourmetSliders", name: "Vada Pav Gourmet Sliders", veg: true },
      { id: "butterChickenBurgers", name: "Butter Chicken Burgers", veg: false },
      { id: "paneerTikkaSliders", name: "Paneer Tikka Sliders", veg: true },
      { id: "keemaPav", name: "Keema Pav", veg: false },
      { id: "pulledJackfruitSliders", name: "Pulled Jackfruit Sliders (Vegan)", veg: true },
    ],
  },
  tacoWrap: {
    title: "Taco & Wrap Station",
    max: null,
    items: [
      { id: "butterChickenTacos", name: "Butter Chicken Tacos", veg: false },
      { id: "paneerTikkaWraps", name: "Paneer Tikka Wraps", veg: true },
      { id: "chickenSeekhWraps", name: "Chicken Seekh Kebab Wraps", veg: false },
      { id: "falafelKathiRolls", name: "Falafel Kathi Rolls", veg: true },
      { id: "lambKeemaTacos", name: "Lamb Keema Tacos", veg: false },
    ],
  },
  pizzaStation: {
    title: "Pizza Station",
    max: null,
    items: [
      { id: "tandooriChickenPizza", name: "Tandoori Chicken Pizza", veg: false },
      { id: "paneerTikkaPizza", name: "Paneer Tikka Pizza", veg: true },
      { id: "butterChickenPizza", name: "Butter Chicken Pizza", veg: false },
      { id: "keemaPizza", name: "Keema Pizza", veg: false },
      { id: "margherita", name: "Margherita", veg: true },
    ],
  },
  indianComfort: {
    title: "Indian Comfort Mini Bowls",
    max: t(4, 6, 10),
    breadsMax: t(2, 3, 5),
    items: [
      { id: "butterChickenBowl", name: "Butter Chicken", veg: false },
      { id: "dalMakhani", name: "Dal Makhani", veg: true },
      { id: "paneerLababdar", name: "Paneer Lababdar", veg: true },
      { id: "malaiKofta", name: "Malai Kofta", veg: true },
      { id: "palakPaneer", name: "Palak Paneer", veg: true },
      { id: "chole", name: "Chole", veg: true },
      { id: "kadhaiPaneer", name: "Kadhai Paneer", veg: true },
      { id: "chickenCurryHomeStyle", name: "Chicken Curry (Home-style)", veg: false },
      { id: "roganJosh", name: "Rogan Josh", veg: false },
      { id: "eggCurryParsi", name: "Egg Curry (Parsi Style)", veg: false },
    ],
    breads: [
      { id: "garlicNaan", name: "Garlic Naan" },
      { id: "butterNaan", name: "Butter Naan" },
      { id: "lacchaParatha", name: "Lachha Paratha" },
      { id: "tandooriRoti", name: "Tandoori Roti" },
      { id: "cheeseKulcha", name: "Cheese Kulcha" },
    ],
  },
  dosaCounter: {
    title: "Live Dosa & Uttapam Counter",
    max: null,
    items: [
      { id: "plainDosa", name: "Plain Dosa", veg: true },
      { id: "masalaDosa", name: "Masala Dosa", veg: true },
      { id: "cheeseDosa", name: "Cheese Dosa", veg: true },
      { id: "schezwanDosa", name: "Schezwan Dosa", veg: true },
      { id: "paneerUttapam", name: "Paneer Tikka Uttapam", veg: true },
      { id: "onionUttapam", name: "Onion Uttapam", veg: true },
    ],
  },
  saladBar: {
    title: "Salad & Poke Bowl Bar",
    max: t(0, 3, 6),
    items: [
      { id: "mediterraneanSalad", name: "Mediterranean Salad", veg: true },
      { id: "caesarTandooriChicken", name: "Caesar Salad with Tandoori Chicken", veg: false },
      { id: "quinoaPokeBowl", name: "Quinoa Poke Bowl", veg: true },
      { id: "falafelBowl", name: "Falafel Bowl", veg: true },
      { id: "paneerTikkaBowl", name: "Paneer Tikka Bowl", veg: true },
      { id: "buildYourOwnSalad", name: "Build Your Own Salad Station", veg: true },
    ],
  },
};

export const FOOD_TRUCK_ADDON = {
  id: "foodTruck",
  title: "Food Truck Add-on",
  emoji: "🚚",
  availableFrom: 3,
};

export function getTierHighlights(tier) {
  const total = CATEGORIES.length;
  let unlocked = 0;
  let totalSlots = 0;

  CATEGORIES.forEach((cat) => {
    const locked = (cat.availableFrom && tier < cat.availableFrom) || cat.max?.[tier] === 0;
    if (locked) return;
    unlocked += 1;
    if (cat.max) totalSlots += cat.max[tier];
    else if (cat.vegMax || cat.nonVegMax) {
      totalSlots += (cat.vegMax?.[tier] || 0) + (cat.nonVegMax?.[tier] || 0);
    }
  });

  return { unlocked, total, totalSlots };
}
