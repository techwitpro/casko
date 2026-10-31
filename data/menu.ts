export interface MenuItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: "Sweet" | "Savoury" | "Bakery" | "Coffee";
  description: string;
  dietary?: string[];
  calories?: string;
  isPopular?: boolean;
}

export const FEATURED_MENU_ITEMS: MenuItem[] = [
  {
    id: "peach-stack",
    name: "The Peach Stack",
    price: "85k",
    priceNum: 85,
    category: "Sweet",
    description: "Ricotta pancakes, grilled peach, blueberries, palm-sugar syrup.",
    dietary: ["Vegetarian"],
    isPopular: true,
  },
  {
    id: "green-toast",
    name: "Green Toast",
    price: "75k",
    priceNum: 75,
    category: "Savoury",
    description: "Sourdough, smashed avocado, whipped feta, toasted sesame, lime.",
    dietary: ["Vegetarian", "Vegan option"],
    isPopular: true,
  },
  {
    id: "eggs-any-hour",
    name: "Eggs Any Hour",
    price: "70k",
    priceNum: 70,
    category: "Savoury",
    description: "Two eggs your way, chilli butter, garden greens, thick toast.",
    dietary: ["Vegetarian", "Gluten-Free option"],
  },
  {
    id: "dragon-bowl",
    name: "Dragon Bowl",
    price: "80k",
    priceNum: 80,
    category: "Sweet",
    description: "Pitaya, banana, coconut granola, fresh mango, bee pollen.",
    dietary: ["Vegetarian", "Dairy-Free"],
  },
  {
    id: "nasi-sunrise",
    name: "Nasi Sunrise",
    price: "78k",
    priceNum: 78,
    category: "Savoury",
    description: "Fried rice, soft egg, sambal matah, prawn crackers.",
    dietary: ["House Specialty"],
    isPopular: true,
  },
  {
    id: "swirl-bun",
    name: "Swirl Bun",
    price: "38k",
    priceNum: 38,
    category: "Bakery",
    description: "Matcha or cinnamon. Baked every morning, gone by three.",
    dietary: ["Vegetarian", "Freshly Baked"],
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: "35k",
    priceNum: 35,
    category: "Coffee",
    description: "House blend, roasted two kilometres from the counter.",
    dietary: ["Oat milk available"],
    isPopular: true,
  },
  {
    id: "iced-coconut-latte",
    name: "Iced Coconut Latte",
    price: "45k",
    priceNum: 45,
    category: "Coffee",
    description: "Double shot, coconut milk, a little palm sugar.",
    dietary: ["Vegan", "Dairy-Free"],
    isPopular: true,
  },
];

export const EXTENDED_MENU_ITEMS: MenuItem[] = [
  ...FEATURED_MENU_ITEMS,
  {
    id: "french-toast-brioche",
    name: "Brûlée Brioche French Toast",
    price: "82k",
    priceNum: 82,
    category: "Sweet",
    description: "Caramelized banana, whipped vanilla mascarpone, toasted pecans.",
    dietary: ["Vegetarian"],
  },
  {
    id: "shakshuka-canggu",
    name: "Canggu Baked Shakshuka",
    price: "80k",
    priceNum: 80,
    category: "Savoury",
    description: "Braised tomatoes, cumin, poached eggs, herb labneh, grilled focaccia.",
    dietary: ["Vegetarian"],
  },
  {
    id: "cardamom-croissant",
    name: "Twice-Baked Almond Croissant",
    price: "42k",
    priceNum: 42,
    category: "Bakery",
    description: "Frangipane filling, toasted flaked almonds, dusted icing sugar.",
    dietary: ["Vegetarian"],
  },
  {
    id: "batch-brew-filter",
    name: "Single Origin Batch Brew",
    price: "38k",
    priceNum: 38,
    category: "Coffee",
    description: "Rotating Kintamani Bali natural process. Notes of citrus and honey.",
    dietary: ["Filter"],
  },
  {
    id: "moka-pot-service",
    name: "Table Stovetop Moka Pot",
    price: "60k",
    priceNum: 60,
    category: "Coffee",
    description: "Serves two. Dark roast blend, served bubbling hot with brown sugar cubes.",
    dietary: ["For Sharing"],
  },
];
