/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export const FOOD_DATABASE = [

  {
    id: "comforting-khichdi",
    name: "Comforting Khichdi",
    category: "main_course",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 80, max: 180 },
    spiceLevel: "mild",
    moodProfile: {
      stress: 0.95,
      sadness: 0.90,
      fear: 0.85,
      calm: 0.85,
      anger: 0.30,
      joy: 0.40,
      loneliness: 0.80,
      boredom: 0.40,
      neutral: 0.70
    },
    nutrition: { calories: 320, comfortScore: 0.95, warmTherapeutic: true },
    tags: ["comfort", "warm", "easy-to-digest", "home-food", "soothing"],
    ingredients: ["rice", "moong dal", "turmeric", "ghee", "cumin", "water", "salt"],
    minRequired: ["rice", "dal"],
    prepTimeMinutes: 20,
    comfortDescription: "Gentle warm lentils and rice with cumin, scientifically proven to ease digestive stress and soothe the nervous system."
  },
  {
    id: "dal-chawal",
    name: "Dal Chawal with Ghee",
    category: "main_course",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 90, max: 200 },
    spiceLevel: "mild",
    moodProfile: {
      stress: 0.88,
      sadness: 0.92,
      fear: 0.75,
      calm: 0.85,
      anger: 0.25,
      joy: 0.50,
      loneliness: 0.90,
      boredom: 0.45,
      neutral: 0.75
    },
    nutrition: { calories: 380, comfortScore: 0.95, warmTherapeutic: true },
    tags: ["comfort", "staple", "nostalgic", "home-food", "serotonin"],
    ingredients: ["toor dal", "rice", "ghee", "turmeric", "salt", "water", "cumin"],
    minRequired: ["rice", "dal"],
    prepTimeMinutes: 25,
    comfortDescription: "The quintessential Indian soul food offering balanced amino acids that trigger natural serotonin release."
  },
  {
    id: "curd-rice",
    name: "Tempered Curd Rice (Thayir Sadam)",
    category: "light_meal",
    cuisine: "indian",
    region: "south_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 70, max: 150 },
    spiceLevel: "mild",
    moodProfile: {
      stress: 0.85,
      anger: 0.88,
      sadness: 0.70,
      calm: 0.90,
      fear: 0.65,
      joy: 0.50,
      loneliness: 0.60,
      boredom: 0.40,
      neutral: 0.80
    },
    nutrition: { calories: 290, comfortScore: 0.90, warmTherapeutic: false },
    tags: ["cooling", "probiotic", "south-indian", "gut-brain", "light"],
    ingredients: ["rice", "curd", "mustard seeds", "curry leaves", "ginger", "green chilli", "salt"],
    minRequired: ["rice", "curd"],
    prepTimeMinutes: 10,
    comfortDescription: "Cooling probiotic yogurt rice with mustard seeds and curry leaves that actively calms gut inflammation and emotional turbulence."
  },
  {
    id: "masala-chai",
    name: "Fresh Ginger Masala Chai",
    category: "beverage",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 20, max: 80 },
    spiceLevel: "mild",
    moodProfile: {
      stress: 0.92,
      sadness: 0.80,
      fear: 0.70,
      calm: 0.85,
      anger: 0.35,
      joy: 0.60,
      loneliness: 0.85,
      boredom: 0.70,
      neutral: 0.65
    },
    nutrition: { calories: 95, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["warm", "beverage", "aromatic", "stress-buster", "ginger"],
    ingredients: ["milk", "water", "tea leaves", "ginger", "cardamom", "sugar"],
    minRequired: ["tea", "water"],
    prepTimeMinutes: 8,
    comfortDescription: "A steaming cup of ginger and cardamom chai that delivers grounding warmth and gentle sensory focus."
  },
  {
    id: "poha",
    name: "Kanda Poha",
    category: "breakfast",
    cuisine: "indian",
    region: "west_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 40, max: 120 },
    spiceLevel: "medium",
    moodProfile: {
      stress: 0.75,
      sadness: 0.65,
      calm: 0.80,
      joy: 0.70,
      boredom: 0.60,
      anger: 0.30,
      neutral: 0.85
    },
    nutrition: { calories: 250, comfortScore: 0.80, warmTherapeutic: false },
    tags: ["quick", "light", "flattened-rice", "maharashtrian", "energy"],
    ingredients: ["flattened rice", "onion", "mustard seeds", "peanuts", "turmeric", "lemon", "curry leaves"],
    minRequired: ["poha", "onion"],
    prepTimeMinutes: 12,
    comfortDescription: "Light, fluffy flattened rice tossed with crunchy peanuts and citrusy lemon for clean, sustained morning energy."
  },
  {
    id: "upma",
    name: "Rava Vegetable Upma",
    category: "breakfast",
    cuisine: "indian",
    region: "south_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 40, max: 110 },
    spiceLevel: "mild",
    moodProfile: {
      stress: 0.70,
      calm: 0.80,
      sadness: 0.60,
      neutral: 0.80,
      boredom: 0.50
    },
    nutrition: { calories: 260, comfortScore: 0.75, warmTherapeutic: true },
    tags: ["semolina", "light", "south-indian", "vegetables", "quick"],
    ingredients: ["semolina", "water", "vegetables", "mustard seeds", "curry leaves", "ghee", "ginger"],
    minRequired: ["rava", "water"],
    prepTimeMinutes: 15,
    comfortDescription: "Warm roasted semolina porridge studded with fresh vegetables and tempered with aromatic curry leaves."
  },

  {
    id: "spicy-chaat",
    name: "Crispy Sev Puri / Papdi Chaat",
    category: "snack",
    cuisine: "indian",
    region: "street_food",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: false,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 50, max: 140 },
    spiceLevel: "high",
    moodProfile: {
      anger: 0.95,
      boredom: 0.90,
      stress: 0.60,
      joy: 0.75,
      calm: 0.20,
      sadness: 0.40
    },
    nutrition: { calories: 340, comfortScore: 0.70, warmTherapeutic: false },
    tags: ["street-food", "tangy", "spicy", "crunchy", "dopamine"],
    ingredients: ["papdi", "potato", "chickpeas", "tamarind chutney", "mint chutney", "sev", "chaat masala"],
    minRequired: ["papdi", "chutney"],
    prepTimeMinutes: 10,
    comfortDescription: "A firework of sour tamarind, spicy mint, and crisp textures designed to break mental loops and vent pent-up irritation."
  },
  {
    id: "crispy-samosa",
    name: "Hot Punjabi Samosa with Mint Chutney",
    category: "snack",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 25, max: 80 },
    spiceLevel: "medium",
    moodProfile: {
      anger: 0.85,
      sadness: 0.70,
      boredom: 0.85,
      joy: 0.70,
      stress: 0.60
    },
    nutrition: { calories: 310, comfortScore: 0.80, warmTherapeutic: true },
    tags: ["crispy", "fried", "street-food", "spicy", "potato"],
    ingredients: ["flour", "potato", "peas", "spices", "oil", "mint", "coriander"],
    minRequired: ["potato", "flour", "oil"],
    prepTimeMinutes: 30,
    comfortDescription: "Crispy golden crust filled with spiced potatoes that provides crunchy sensory satisfaction against high tension."
  },
  {
    id: "masala-maggi",
    name: "Street Style Veg Masala Maggi",
    category: "snack",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: false,
      delivery: false
    },
    priceRange: { min: 30, max: 70 },
    spiceLevel: "medium",
    moodProfile: {
      stress: 0.85,
      sadness: 0.80,
      boredom: 0.85,
      anger: 0.70,
      loneliness: 0.80
    },
    nutrition: { calories: 390, comfortScore: 0.85, warmTherapeutic: true },
    tags: ["quick", "nostalgic", "noodles", "late-night", "comfort"],
    ingredients: ["maggi noodles", "water", "maggi masala", "onion", "tomato", "chilli"],
    minRequired: ["maggi", "water"],
    prepTimeMinutes: 7,
    comfortDescription: "Steamy spiced noodles cooked with onions and chillies — the ultimate instant late-night emotional comfort."
  },
  {
    id: "chilli-paneer",
    name: "Crispy Indo-Chinese Chilli Paneer",
    category: "main_course",
    cuisine: "indian",
    region: "street_food",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 160, max: 280 },
    spiceLevel: "high",
    moodProfile: {
      anger: 0.90,
      excitement: 0.75,
      boredom: 0.80,
      stress: 0.65,
      joy: 0.70
    },
    nutrition: { calories: 420, comfortScore: 0.75, warmTherapeutic: true },
    tags: ["indo-chinese", "spicy", "paneer", "fiery", "restaurant-style"],
    ingredients: ["paneer", "capsicum", "onion", "soy sauce", "chilli sauce", "garlic", "oil"],
    minRequired: ["paneer", "chilli"],
    prepTimeMinutes: 20,
    comfortDescription: "Tender paneer cubes tossed in spicy garlic soy reduction that stimulates endorphin release to disperse frustration."
  },

  {
    id: "vegetable-biryani",
    name: "Fragrant Hyderabadi Veg Dum Biryani",
    category: "main_course",
    cuisine: "indian",
    region: "south_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 180, max: 350 },
    spiceLevel: "medium",
    moodProfile: {
      joy: 0.95,
      excitement: 0.92,
      calm: 0.50,
      sadness: 0.50,
      stress: 0.40,
      neutral: 0.60
    },
    nutrition: { calories: 510, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["royal", "aromatic", "dum-biryani", "festive", "filling"],
    ingredients: ["basmati rice", "vegetables", "biryani masala", "saffron", "fried onions", "ghee", "mint"],
    minRequired: ["rice", "vegetables", "spices"],
    prepTimeMinutes: 45,
    comfortDescription: "Slow-cooked saffron basmati rice layered with aromatic spices and caramelized onions for celebratory occasions."
  },
  {
    id: "chicken-biryani",
    name: "Classic Chicken Dum Biryani",
    category: "main_course",
    cuisine: "indian",
    region: "south_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: false,
      containsMeat: true,
      jainFriendly: false
    },
    availability: {
      home: false,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 220, max: 420 },
    spiceLevel: "medium",
    moodProfile: {
      joy: 0.95,
      excitement: 0.95,
      sadness: 0.55,
      anger: 0.50,
      stress: 0.45
    },
    nutrition: { calories: 620, comfortScore: 0.92, warmTherapeutic: true },
    tags: ["non-veg", "chicken", "dum-biryani", "celebration", "feast"],
    ingredients: ["chicken", "basmati rice", "yogurt", "biryani spices", "saffron", "onions", "ghee"],
    minRequired: ["chicken", "rice", "spices"],
    prepTimeMinutes: 60,
    comfortDescription: "Tender spiced chicken pieces cooked in sealed pot with aromatic long grain rice to celebrate good news."
  },
  {
    id: "pav-bhaji",
    name: "Mumbai Butter Pav Bhaji",
    category: "main_course",
    cuisine: "indian",
    region: "west_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 100, max: 220 },
    spiceLevel: "medium",
    moodProfile: {
      joy: 0.88,
      excitement: 0.85,
      boredom: 0.80,
      sadness: 0.65,
      stress: 0.55
    },
    nutrition: { calories: 480, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["street-food", "buttery", "mumbai", "comfort", "flavorful"],
    ingredients: ["potatoes", "peas", "tomatoes", "capsicum", "pav bhaji masala", "butter", "pav"],
    minRequired: ["potato", "pav", "butter"],
    prepTimeMinutes: 30,
    comfortDescription: "Mashed spiced vegetables enriched with melting butter and served with toasted pillowy pav."
  },
  {
    id: "chole-bhature",
    name: "Amritsari Chole Bhature",
    category: "main_course",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: false,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 120, max: 240 },
    spiceLevel: "high",
    moodProfile: {
      joy: 0.90,
      excitement: 0.88,
      sadness: 0.60,
      boredom: 0.85
    },
    nutrition: { calories: 650, comfortScore: 0.88, warmTherapeutic: true },
    tags: ["punjabi", "chickpeas", "indulgent", "rich", "weekend"],
    ingredients: ["chickpeas", "flour", "onions", "tea decoction", "amritsari masala", "oil"],
    minRequired: ["chickpeas", "flour"],
    prepTimeMinutes: 40,
    comfortDescription: "Deep spiced chickpea curry paired with golden puffed bhature for an indulgent sensory celebration."
  },

  {
    id: "gajar-halwa",
    name: "Warm Gajar Ka Halwa",
    category: "dessert",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 90, max: 220 },
    spiceLevel: "mild",
    moodProfile: {
      sadness: 0.95,
      loneliness: 0.90,
      stress: 0.75,
      calm: 0.70,
      joy: 0.80
    },
    nutrition: { calories: 340, comfortScore: 0.98, warmTherapeutic: true },
    tags: ["sweet", "warm", "carrots", "ghee", "winter-comfort", "serotonin"],
    ingredients: ["carrots", "milk", "sugar", "ghee", "cardamom", "nuts"],
    minRequired: ["carrot", "milk", "sugar"],
    prepTimeMinutes: 35,
    comfortDescription: "Simmered grated red carrots in milk and ghee infused with cardamom to gently elevate depleted serotonin levels."
  },
  {
    id: "sweet-kheer",
    name: "Classic Rice Kheer with Saffron",
    category: "dessert",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 80, max: 180 },
    spiceLevel: "mild",
    moodProfile: {
      sadness: 0.90,
      calm: 0.85,
      loneliness: 0.85,
      stress: 0.70,
      joy: 0.75
    },
    nutrition: { calories: 310, comfortScore: 0.95, warmTherapeutic: true },
    tags: ["pudding", "sweet", "comfort", "festive", "soothing"],
    ingredients: ["milk", "rice", "sugar", "saffron", "cardamom", "almonds"],
    minRequired: ["milk", "rice", "sugar"],
    prepTimeMinutes: 30,
    comfortDescription: "Slow-cooked creamy rice pudding with saffron and cardamom providing profound nostalgic solace."
  },

  {
    id: "fresh-lime-soda",
    name: "Fresh Nimbu Soda (Sweet & Salt)",
    category: "beverage",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 30, max: 90 },
    spiceLevel: "mild",
    moodProfile: {
      boredom: 0.90,
      anger: 0.80,
      neutral: 0.85,
      calm: 0.75,
      stress: 0.60
    },
    nutrition: { calories: 60, comfortScore: 0.75, warmTherapeutic: false },
    tags: ["refreshing", "citrus", "electrolytes", "reset", "sparkling"],
    ingredients: ["lemon", "soda", "water", "black salt", "sugar", "ice"],
    minRequired: ["lemon", "water"],
    prepTimeMinutes: 3,
    comfortDescription: "Fizzy citrus elixir with black salt that cleanses the palate and resets tired mental energy instantly."
  },
  {
    id: "sweet-lassi",
    name: "Thick Punjabi Malai Lassi",
    category: "beverage",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: true,
      vegan: false,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 50, max: 130 },
    spiceLevel: "mild",
    moodProfile: {
      anger: 0.85,
      sadness: 0.75,
      calm: 0.80,
      stress: 0.70,
      joy: 0.80
    },
    nutrition: { calories: 280, comfortScore: 0.90, warmTherapeutic: false },
    tags: ["cooling", "yogurt", "probiotic", "sweet", "punjabi"],
    ingredients: ["yogurt", "milk", "sugar", "cardamom", "malai", "pistachios"],
    minRequired: ["curd", "sugar"],
    prepTimeMinutes: 5,
    comfortDescription: "Rich churned yogurt drink topped with clotted cream to calm internal heat and emotional agitation."
  },
  {
    id: "idli-sambar",
    name: "Steamed Idli with Drumstick Sambar",
    category: "light_meal",
    cuisine: "indian",
    region: "south_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 50, max: 140 },
    spiceLevel: "mild",
    moodProfile: {
      calm: 0.90,
      stress: 0.80,
      sadness: 0.70,
      neutral: 0.85
    },
    nutrition: { calories: 240, comfortScore: 0.85, warmTherapeutic: true },
    tags: ["steamed", "fermented", "healthy", "south-indian", "gentle"],
    ingredients: ["idli batter", "toor dal", "vegetables", "sambar powder", "curry leaves", "mustard seeds"],
    minRequired: ["batter", "dal"],
    prepTimeMinutes: 20,
    comfortDescription: "Pillow-soft fermented steamed rice cakes with nutrient-dense lentil vegetable stew."
  },
  {
    id: "tomato-soup",
    name: "Warm Roasted Tomato Herb Soup",
    category: "soup",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: true,
      vegan: true,
      containsEgg: false,
      containsMeat: false,
      jainFriendly: true
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 80, max: 160 },
    spiceLevel: "mild",
    moodProfile: {
      sadness: 0.88,
      stress: 0.85,
      calm: 0.85,
      loneliness: 0.80
    },
    nutrition: { calories: 180, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["warm", "soup", "lycopene", "light", "soothing"],
    ingredients: ["tomatoes", "garlic", "butter", "black pepper", "croutons", "cream"],
    minRequired: ["tomato", "water"],
    prepTimeMinutes: 20,
    comfortDescription: "Velvety warm tomato broth seasoned with cracked black pepper that delivers tactile emotional relief."
  },
  {
    id: "butter-chicken",
    name: "Rich Delhi Butter Chicken with Naan",
    category: "main_course",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: false,
      containsMeat: true,
      jainFriendly: false
    },
    availability: {
      home: false,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 280, max: 480 },
    spiceLevel: "mild",
    moodProfile: {
      joy: 0.95,
      excitement: 0.92,
      sadness: 0.75,
      stress: 0.70,
      loneliness: 0.80,
      calm: 0.60
    },
    nutrition: { calories: 580, comfortScore: 0.92, warmTherapeutic: true },
    tags: ["non-veg", "rich", "butter-chicken", "indulgent", "celebration", "delivery"],
    ingredients: ["chicken", "butter", "tomato puree", "cream", "kasuri methi", "garlic", "naan"],
    minRequired: ["chicken", "butter", "tomato"],
    prepTimeMinutes: 40,
    comfortDescription: "Velvety butter gravy with tender grilled chicken, offering rich warmth and endorphin release for indulgence."
  },
  {
    id: "chicken-tikka",
    name: "Smoky Tandoori Chicken Tikka",
    category: "snack",
    cuisine: "indian",
    region: "north_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: false,
      containsMeat: true,
      jainFriendly: false
    },
    availability: {
      home: false,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 200, max: 360 },
    spiceLevel: "spicy",
    moodProfile: {
      anger: 0.95,
      boredom: 0.88,
      excitement: 0.90,
      joy: 0.80,
      stress: 0.60
    },
    nutrition: { calories: 340, comfortScore: 0.70, warmTherapeutic: false },
    tags: ["non-veg", "tandoori", "smoky", "spicy", "sensory-release", "protein"],
    ingredients: ["chicken breast", "hung curd", "kashmiri chilli", "garam masala", "lemon juice", "chaat masala"],
    minRequired: ["chicken", "curd", "chilli"],
    prepTimeMinutes: 30,
    comfortDescription: "Char-grilled spicy chicken delivering sensory capsicum release to rapidly vent high-arousal tension and anger."
  },
  {
    id: "tariwala-chicken-curry",
    name: "Homestyle Tariwala Chicken Curry",
    category: "main_course",
    cuisine: "indian",
    region: "pan_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: false,
      containsMeat: true,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 180, max: 320 },
    spiceLevel: "medium",
    moodProfile: {
      stress: 0.92,
      sadness: 0.88,
      calm: 0.82,
      loneliness: 0.85,
      fear: 0.75
    },
    nutrition: { calories: 420, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["non-veg", "home-food", "curry", "warm", "protein", "comfort"],
    ingredients: ["chicken", "onions", "tomatoes", "ginger", "garlic", "coriander", "spices", "rice"],
    minRequired: ["chicken", "onion", "tomato"],
    prepTimeMinutes: 35,
    comfortDescription: "Aromatic homestyle spiced chicken broth that replenishes essential amino acids to alleviate deep fatigue and stress."
  },
  {
    id: "egg-bhurji",
    name: "Spicy Mumbai Egg Bhurji with Pav",
    category: "light_meal",
    cuisine: "indian",
    region: "west_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: true,
      containsMeat: false,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 90, max: 180 },
    spiceLevel: "medium",
    moodProfile: {
      stress: 0.85,
      boredom: 0.82,
      anger: 0.75,
      neutral: 0.78,
      sadness: 0.70
    },
    nutrition: { calories: 310, comfortScore: 0.82, warmTherapeutic: true },
    tags: ["non-veg", "egg", "quick", "protein", "comfort", "mumbai-street"],
    ingredients: ["eggs", "onions", "green chillies", "butter", "tomatoes", "pav", "coriander"],
    minRequired: ["eggs", "onion", "chilli"],
    prepTimeMinutes: 15,
    comfortDescription: "Rapidly scrambled eggs with butter, onions, and green chillies providing quick bioavailable protein and brain fuel."
  },
  {
    id: "chicken-manchow-soup",
    name: "Hot & Spicy Chicken Manchow Soup",
    category: "soup",
    cuisine: "indo_chinese",
    region: "pan_indian",
    dietary: {
      vegetarian: false,
      vegan: false,
      containsEgg: true,
      containsMeat: true,
      jainFriendly: false
    },
    availability: {
      home: true,
      localMarket: true,
      restaurant: true,
      delivery: true
    },
    priceRange: { min: 110, max: 200 },
    spiceLevel: "medium",
    moodProfile: {
      sadness: 0.90,
      stress: 0.88,
      fear: 0.80,
      calm: 0.82,
      loneliness: 0.85
    },
    nutrition: { calories: 220, comfortScore: 0.90, warmTherapeutic: true },
    tags: ["non-veg", "soup", "warm", "crispy-noodles", "throat-soothing", "comfort"],
    ingredients: ["shredded chicken", "chicken broth", "garlic", "ginger", "soy sauce", "crispy noodles", "egg drop"],
    minRequired: ["chicken", "garlic", "water"],
    prepTimeMinutes: 20,
    comfortDescription: "Steaming hot Indo-Chinese broth infused with ginger and garlic, crowned with crispy noodles for soothing comfort."
  }
];

export function findFoodById(id) {
  return FOOD_DATABASE.find(f => f.id === id) || null;
}

export function getAllFoods() {
  return FOOD_DATABASE;
}

