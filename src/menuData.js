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
      { id: "aamPannaMojito", name: "Aam Panna Mojito (Virgin/Spiked)", veg: true, note: "Tangy raw mango and mint muddled with soda, rimmed with rock salt.", pairsWith: "Pani Puri Shots" },
      { id: "kokumCooler", name: "Kokum Cooler with Mint", veg: true, note: "Cooling kokum and fresh mint over crushed ice — a great palate reset.", pairsWith: "Chicken 65 Quesadillas" },
      { id: "jaljeeraSpritz", name: "Jaljeera Spritz with Fresh Lime", veg: true, note: "Classic jaljeera reimagined as a fizzy spritz with fresh lime.", pairsWith: "Samosa Chaat Cups" },
      { id: "lycheeBellini", name: "Lychee Rose Bellini", veg: true, note: "Lychee and rose petals topped with a light, bubbly fizz.", pairsWith: "Paneer Tikka Tacos" },
      { id: "chaiMartini", name: "Masala Chai Espresso Martini", veg: true, note: "Espresso and masala chai shaken over ice, garnished with cinnamon.", pairsWith: "Chocolate Samosas" },
      { id: "blueLemonade", name: "Blue Pea Flower Lemonade", veg: true, note: "Butterfly pea lemonade that shifts color with a squeeze of lime — a real crowd-pleaser for photos.", pairsWith: "Bhel Puri in Edible Cups" },
      { id: "coconutWater", name: "Fresh Coconut Water Station", veg: true, note: "Served straight from the shell, chilled and lightly sweet.", pairsWith: "Falafel-Aloo Tikki Fusion Bites" },
      { id: "juiceBar", name: "Cold-Pressed Juice Bar", veg: true, note: "Cold-pressed seasonal juices, made fresh at the counter.", pairsWith: "Hummus Trio with Naan Chips" },
    ],
  },
  {
    id: "liveCounters",
    title: "Live Interactive Counters",
    emoji: "🔥",
    featured: true,
    max: t(2, 4, 6),
    items: [
      { id: "chaatCorner", name: "Chaat Corner - Build Your Own", veg: true, note: "Guests build their own chaat from a spread of chutneys, sev, and papdi." },
      { id: "bombayStreetTruck", name: "Bombay Street Food Truck", veg: true, note: "A mobile-style counter serving Mumbai's iconic street snacks hot off the tawa." },
      { id: "delhiChaatHub", name: "Delhi Chaat Hub", veg: true, note: "Delhi-style chaat classics, plated fresh right at the counter." },
      { id: "indoMexican", name: "Indo-Mexican Station", veg: true, note: "Tacos and quesadillas reimagined with tandoori and tikka fillings." },
      { id: "asianFusion", name: "Asian-Indian Fusion", veg: true, note: "Indian spices meet wok-tossed Asian classics, cooked live." },
      { id: "mediterranean", name: "Mediterranean Meets India", veg: true, note: "Hummus, falafel, and shawarma given a desi spin at the counter." },
    ],
  },
  {
    id: "cocktailFingerFood",
    title: "Cocktail Hour Finger Food",
    emoji: "📸",
    featured: true,
    max: t(15, 25, 35),
    vegMax: t(10, 15, 20),
    nonVegMax: t(5, 10, 15),
    items: [
      { id: "paniPuriShots", name: "Pani Puri Shots", veg: true, spice: 2, note: "Crisp puris filled with spiced water, tamarind chutney, and potato.", pairsWith: "Aam Panna Mojito (Virgin/Spiked)" },
      { id: "samosaChaatCups", name: "Samosa Chaat Cups", veg: true, spice: 2, note: "Crushed samosas layered with chutneys, yogurt, and sev in a cup.", pairsWith: "Jaljeera Spritz with Fresh Lime" },
      { id: "papdiChaatCones", name: "Papdi Chaat Cones", veg: true, spice: 1, note: "Crispy papdi, potato, and chutneys served in a handheld cone.", pairsWith: "Kokum Cooler with Mint" },
      { id: "dahiBhallaShooters", name: "Dahi Bhalla Shooters", veg: true, spice: 1, note: "Soft lentil dumplings in whipped yogurt with a tangy tamarind drizzle.", pairsWith: "Samosa Chaat Cups" },
      { id: "sevPuriTowers", name: "Sev Puri Towers", veg: true, spice: 1, note: "Layered puris stacked with onion, chutney, and crunchy sev.", pairsWith: "Bhel Puri in Edible Cups" },
      { id: "rajKachoriBites", name: "Raj Kachori Bites", veg: true, spice: 2, note: "A miniature take on the giant Rajasthani kachori, packed with chaat toppings.", pairsWith: "Dahi Bhalla Shooters" },
      { id: "alooTikkiSliders", name: "Aloo Tikki Sliders", veg: true, spice: 2, note: "Spiced potato patties in a mini bun with mint and tamarind chutney.", pairsWith: "Blue Pea Flower Lemonade" },
      { id: "vadaPavSliders", name: "Vada Pav Sliders", veg: true, spice: 2, note: "Mumbai's favorite vada pav, scaled down for easy cocktail-hour bites.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "dabeliBites", name: "Dabeli Bites", veg: true, spice: 2, note: "Sweet-spicy potato filling with pomegranate and peanuts in a soft bun.", pairsWith: "Kokum Cooler with Mint" },
      { id: "pavBhajiFondue", name: "Pav Bhaji Fondue", veg: true, spice: 2, note: "Buttery mashed vegetable bhaji served fondue-style with mini pav.", pairsWith: "Cold-Pressed Juice Bar" },
      { id: "misalPavCups", name: "Misal Pav Cups", veg: true, spice: 3, note: "Spicy sprouted lentil curry topped with farsan, served with pav.", pairsWith: "Kokum Cooler with Mint" },
      { id: "golgappaStation", name: "Golgappa Station", veg: true, spice: 2, note: "A live version of pani puri, filled to order for maximum crunch.", pairsWith: "Fresh Coconut Water Station" },
      { id: "bhelPuriCups", name: "Bhel Puri in Edible Cups", veg: true, spice: 1, note: "Puffed rice tossed with chutneys, onion, and sev in edible cups.", pairsWith: "Lychee Rose Bellini" },
      { id: "paneerTikkaTacos", name: "Paneer Tikka Tacos", veg: true, spice: 2, note: "Charred paneer tikka folded into a crisp taco shell with mint slaw.", pairsWith: "Lychee Rose Bellini" },
      { id: "tandooriCauliflowerTacos", name: "Tandoori Cauliflower Tacos", veg: true, spice: 2, note: "Tandoori-spiced cauliflower with a cooling yogurt drizzle in a soft taco.", pairsWith: "Aam Panna Mojito (Virgin/Spiked)" },
      { id: "paneerSushiRolls", name: "Paneer Tikka Sushi Rolls", veg: true, spice: 1, note: "Tandoori paneer rolled sushi-style with a chutney glaze.", pairsWith: "Blue Pea Flower Lemonade" },
      { id: "samosaSpringRolls", name: "Samosa Spring Rolls", veg: true, spice: 1, note: "A crisp hybrid of samosa filling wrapped spring-roll style.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "gobiManchurianLollipops", name: "Gobi Manchurian Lollipops", veg: true, spice: 2, note: "Crispy cauliflower tossed in a sweet-spicy Indo-Chinese glaze.", pairsWith: "Jaljeera Spritz with Fresh Lime" },
      { id: "falafelAlooTikki", name: "Falafel-Aloo Tikki Fusion Bites", veg: true, spice: 1, note: "A playful mash-up of Middle Eastern falafel and Indian aloo tikki.", pairsWith: "Cold-Pressed Juice Bar" },
      { id: "hummusTrio", name: "Hummus Trio with Naan Chips", veg: true, spice: 0, note: "Three hummus varieties served with warm naan chips.", pairsWith: "Fresh Coconut Water Station" },
      { id: "paneerShawarma", name: "Paneer Shawarma Wraps", veg: true, spice: 1, note: "Tandoori paneer wrapped shawarma-style with garlic sauce.", pairsWith: "Lychee Rose Bellini" },
      { id: "chicken65Quesadillas", name: "Chicken 65 Quesadillas", veg: false, spice: 3, note: "Fiery Chicken 65 folded into a melty quesadilla.", pairsWith: "Kokum Cooler with Mint" },
      { id: "butterChickenNachos", name: "Butter Chicken Nachos", veg: false, spice: 2, note: "Crisp nachos layered with slow-simmered butter chicken and makhani sauce.", pairsWith: "Tandoori Chicken Bao Buns" },
      { id: "tandooriChickenBao", name: "Tandoori Chicken Bao Buns", veg: false, spice: 2, note: "Steamed bao buns filled with smoky tandoori chicken.", pairsWith: "Butter Chicken Nachos" },
      { id: "chickenMomos", name: "Chicken Momos", veg: false, spice: 2, note: "Steamed or fried momos served with a fiery schezwan dip.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "kathiRollWraps", name: "Chicken Kathi Roll Wraps", veg: false, spice: 2, note: "Spiced chicken kathi rolls wrapped in a flaky paratha.", pairsWith: "Blue Pea Flower Lemonade" },
      { id: "keemaLoadedFries", name: "Keema Loaded Fries", veg: false, spice: 2, note: "Crispy fries loaded with spiced keema and melted cheese.", pairsWith: "Masala Chai Espresso Martini" },
    ],
  },
  {
    id: "tandoorSkewers",
    title: "Tandoor & Grill Skewers",
    emoji: "🍢",
    vegMax: t(2, 3, 4),
    nonVegMax: t(1, 2, 4),
    items: [
      { id: "paneerTikkaSkewer", name: "Paneer Tikka (Malai/Achari/Peri-Peri)", veg: true, spice: 1, note: "Char-grilled paneer marinated three ways — malai, achari, or peri-peri.", pairsWith: "Aam Panna Mojito (Virgin/Spiked)" },
      { id: "tandooriMushroom", name: "Tandoori Mushroom Skewers", veg: true, spice: 1, note: "Smoky tandoori mushrooms with a light char from the grill.", pairsWith: "Kokum Cooler with Mint" },
      { id: "cornCheeseSeekh", name: "Corn & Cheese Seekh", veg: true, spice: 0, note: "Sweet corn and cheese seekh, grilled until golden.", pairsWith: "Lychee Rose Bellini" },
      { id: "haraBharaPops", name: "Hara Bhara Kebab Pops", veg: true, spice: 1, note: "Spinach and pea kebabs, pan-seared and served as bite-sized pops.", pairsWith: "Cold-Pressed Juice Bar" },
      { id: "tandooriBroccoli", name: "Tandoori Broccoli with Sesame", veg: true, spice: 1, note: "Char-grilled broccoli finished with toasted sesame.", pairsWith: "Jaljeera Spritz with Fresh Lime" },
      { id: "afghaniPaneer", name: "Afghani Paneer Tikka", veg: true, spice: 1, note: "Creamy, mildly spiced paneer tikka in the Afghani style.", pairsWith: "Blue Pea Flower Lemonade" },
      { id: "chickenTikkaSkewer", name: "Chicken Tikka (Classic/Malai/Hariyali)", veg: false, spice: 2, note: "Classic, malai, or hariyali — grilled chicken tikka your way.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "chickenSeekhKebab", name: "Chicken Seekh Kebab", veg: false, spice: 2, note: "Minced chicken kebabs, spiced and grilled on skewers.", pairsWith: "Kokum Cooler with Mint" },
      { id: "fishTikkaAjwaini", name: "Fish Tikka (Ajwaini)", veg: false, spice: 1, note: "Delicate fish tikka with an ajwain-forward marinade.", pairsWith: "Lychee Rose Bellini" },
      { id: "lambChopsMini", name: "Lamb Chops (mini)", veg: false, spice: 2, note: "Mini lamb chops, char-grilled and finished with a smoky glaze.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "prawnsKoliwadaSticks", name: "Prawns Koliwada on Sticks", veg: false, spice: 2, note: "Koliwada-spiced prawns, crisp-fried and served on sticks.", pairsWith: "Kokum Cooler with Mint" },
      { id: "chickenLollipops", name: "Chicken Lollipops", veg: false, spice: 3, note: "Frenched chicken wings tossed in a spicy Indo-Chinese glaze.", pairsWith: "Blue Pea Flower Lemonade" },
    ],
  },
  {
    id: "friedCrispy",
    title: "Fried & Crispy Bites",
    emoji: "🥟",
    max: t(2, 4, 6),
    items: [
      { id: "miniSamosas", name: "Mini Samosas (Cocktail Size)", veg: true, spice: 1, note: "Bite-sized classic samosas, fried to order.", pairsWith: "Jaljeera Spritz with Fresh Lime" },
      { id: "cheeseCornBalls", name: "Cheese Corn Balls", veg: true, spice: 0, note: "Molten cheese and corn, breaded and fried golden.", pairsWith: "Lychee Rose Bellini" },
      { id: "paneerPakoraBites", name: "Paneer Pakora Bites", veg: true, spice: 1, note: "Crisp-fried paneer pakoras with a light gram-flour batter.", pairsWith: "Aam Panna Mojito (Virgin/Spiked)" },
      { id: "vegSpringRolls", name: "Vegetable Spring Rolls", veg: true, spice: 1, note: "Classic vegetable spring rolls with a crackling shell.", pairsWith: "Blue Pea Flower Lemonade" },
      { id: "onionRings", name: "Onion Rings with Mint Mayo", veg: true, spice: 0, note: "Crispy onion rings served with a cooling mint mayo.", pairsWith: "Kokum Cooler with Mint" },
      { id: "bananaPepperPoppers", name: "Banana Pepper Poppers with Cheese", veg: true, spice: 2, note: "Cheese-stuffed banana peppers, fried until golden.", pairsWith: "Cold-Pressed Juice Bar" },
      { id: "crispyChickenWings", name: "Crispy Chicken Wings (Tandoori/Peri-Peri/Honey Chili)", veg: false, spice: 2, note: "Tandoori, peri-peri, or honey chili — your pick of glaze.", pairsWith: "Masala Chai Espresso Martini" },
    ],
  },
  {
    id: "soupShooters",
    title: "Soup Shooters & Sips",
    emoji: "🍜",
    max: t(1, 2, 3),
    items: [
      { id: "tomatoShorbaShots", name: "Tomato Shorba Shots", veg: true, spice: 1, note: "Warm spiced tomato shorba, served shooter-style." },
      { id: "tomYumSoup", name: "Thai Tom Yum Soup", veg: true, spice: 2, note: "Thai tom yum with a bright, sour-spicy broth." },
      { id: "manchowSoupCups", name: "Manchow Soup Cups", veg: true, spice: 2, note: "Indo-Chinese manchow soup topped with crispy noodles." },
      { id: "mulligatawnyShooters", name: "Mulligatawny Shooters", veg: false, spice: 1, note: "A gently spiced curried chicken soup, served warm." },
      { id: "sweetCornChickenSoup", name: "Sweet Corn Chicken Soup", veg: false, spice: 0, note: "Comforting sweet corn and chicken soup." },
    ],
  },
  {
    id: "grazingStations",
    title: "Main Course Grazing Stations",
    emoji: "🎪",
    max: t(3, 5, 8),
    items: [
      { id: "biryaniBar", name: "Biryani Bar", sub: "biryaniBar", note: "A live biryani counter with regional variations, finished tableside." },
      { id: "pastaNoodles", name: "Live Pasta & Noodles Station", sub: "pastaNoodles", note: "Pasta and noodles tossed to order, Indian and classic styles." },
      { id: "sliderBurger", name: "Slider & Burger Station", sub: "sliderBurger", note: "Gourmet sliders and burgers with a desi twist, grilled live." },
      { id: "tacoWrap", name: "Taco & Wrap Station", sub: "tacoWrap", note: "Tacos and wraps assembled fresh with Indian-inspired fillings." },
      { id: "pizzaStation", name: "Pizza Station", sub: "pizzaStation", note: "Wood-fired-style pizzas with both classic and desi toppings." },
      { id: "indianComfort", name: "Indian Comfort Mini Bowls (+ Breads)", sub: "indianComfort", note: "Comforting curries and dals served with fresh breads." },
      { id: "dosaCounter", name: "Live Dosa & Uttapam Counter", sub: "dosaCounter", availableFrom: 2, note: "Crisp dosas and uttapams made to order on a live tawa." },
      { id: "saladBar", name: "Salad & Poke Bowl Bar", sub: "saladBar", availableFrom: 2, note: "Fresh salads and poke bowls for a lighter course option." },
    ],
  },
  {
    id: "dessertShots",
    title: "Dessert Shots & Mini Jars",
    emoji: "🥃",
    max: t(4, 8, 12),
    items: [
      { id: "gulabJamunCheesecakeShots", name: "Gulab Jamun Cheesecake Shots", veg: true, note: "Gulab jamun folded into a creamy cheesecake, layered in a shot glass.", pairsWith: "Rasmalai in Martini Glasses" },
      { id: "rasmalaiMartini", name: "Rasmalai in Martini Glasses", veg: true, note: "Classic rasmalai served in a martini glass for a playful presentation.", pairsWith: "Gulab Jamun Cheesecake Shots" },
      { id: "phirniJars", name: "Phirni Jars with Edible Flowers", veg: true, note: "Silky rice phirni topped with edible flowers.", pairsWith: "Rabri Shots with Nuts" },
      { id: "shrikhandCups", name: "Shrikhand Cups with Saffron", veg: true, note: "Saffron-infused shrikhand, light and lightly sweet.", pairsWith: "Phirni Jars with Edible Flowers" },
      { id: "rabriShots", name: "Rabri Shots with Nuts", veg: true, note: "Rich, nutty rabri served chilled in a shot glass.", pairsWith: "Kulfi Bar (Paan, Mango, Kesar-Pista, Rose, Chocolate)" },
      { id: "gajarHalwaTiramisu", name: "Gajar Halwa Tiramisu Cups", veg: true, note: "Gajar halwa layered tiramisu-style with mascarpone.", pairsWith: "Chocolate Samosas" },
    ],
  },
  {
    id: "liveDessertStations",
    title: "Live Dessert Stations",
    emoji: "🍨",
    max: t(1, 2, 3),
    items: [
      { id: "kulfiBar", name: "Kulfi Bar (Paan, Mango, Kesar-Pista, Rose, Chocolate)", veg: true, note: "Five kulfi flavors served fresh — paan, mango, kesar-pista, rose, and chocolate." },
      { id: "iceCreamRoll", name: "Ice Cream Roll Station (Nitrogen)", veg: true, note: "Ice cream rolled tableside using liquid nitrogen for a dramatic finish." },
      { id: "waffleCrepe", name: "Waffle & Crepe Station", veg: true, note: "Warm waffles and crepes made to order with a toppings bar." },
    ],
  },
  {
    id: "fusionSweets",
    title: "Fusion Sweet Bites",
    emoji: "🧁",
    max: t(3, 5, 7),
    items: [
      { id: "gulabJamunDonuts", name: "Gulab Jamun Donuts", veg: true, note: "Gulab jamun reimagined as a glazed donut.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "jalebiCheesecake", name: "Jalebi Cheesecake", veg: true, note: "Crisp jalebi swirled into a creamy cheesecake base.", pairsWith: "Rabri Shots with Nuts" },
      { id: "rasmalaiCakePops", name: "Rasmalai Cake Pops", veg: true, note: "Rasmalai flavors in a bite-sized cake pop.", pairsWith: "Lychee Rose Bellini" },
      { id: "chocolateSamosas", name: "Chocolate Samosas", veg: true, note: "Chocolate and nuts folded into a crisp samosa shell.", pairsWith: "Masala Chai Espresso Martini" },
      { id: "motichoorBrownies", name: "Motichoor Ladoo Brownies", veg: true, note: "Fudgy brownies studded with motichoor ladoo crumble.", pairsWith: "Rabri Shots with Nuts" },
      { id: "paanIceCreamSandwiches", name: "Paan Ice Cream Sandwiches", veg: true, note: "Paan-flavored ice cream between two soft cookies.", pairsWith: "Kulfi Bar (Paan, Mango, Kesar-Pista, Rose, Chocolate)" },
      { id: "churrosRabri", name: "Churros with Rabri Dip", veg: true, note: "Cinnamon-sugar churros served with a rabri dipping sauce.", pairsWith: "Masala Chai Espresso Martini" },
    ],
  },
  {
    id: "candyMithai",
    title: "Candy & Mithai Bar",
    emoji: "🍬",
    max: t(0, 2, 4),
    availableFrom: 2,
    items: [
      { id: "mithaiTower", name: "Assorted Mithai Tower", veg: true, note: "An assorted tower of classic Indian mithai." },
      { id: "chocolateFountain", name: "Chocolate Fountain with Fruits", veg: true, note: "A flowing chocolate fountain with fresh fruit for dipping." },
      { id: "cottonCandy", name: "Cotton Candy Station", veg: true, note: "Spun-sugar cotton candy, made fresh at the counter." },
      { id: "popcornBar", name: "Popcorn Bar (Caramel/Cheese/Peri-Peri)", veg: true, note: "Caramel, cheese, or peri-peri — popcorn tossed your way." },
    ],
  },
  {
    id: "midnightSnacks",
    title: "Midnight Snacks",
    note: "Chai & coffee bar always included",
    emoji: "🌙",
    max: t(2, 4, 4),
    items: [
      { id: "maggiBar", name: "Maggi / Instant Noodles Bar", veg: true, spice: 1, note: "Late-night Maggi noodles, customized with your favorite toppings." },
      { id: "sandwichGriller", name: "Sandwich Griller (Bombay Sandwich, Cheese Chili Toast)", veg: true, spice: 1, note: "Grilled Bombay sandwiches and cheese chili toast, straight off the press." },
      { id: "pakoraCounter", name: "Pakora Counter (Fresh Fried)", veg: true, spice: 1, note: "Freshly fried pakoras, perfect for a midnight bite." },
      { id: "friesStation", name: "French Fries Station (Peri-Peri/Masala/Cheese)", veg: true, spice: 1, note: "Peri-peri, masala, or cheese fries — hot and fresh." },
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
