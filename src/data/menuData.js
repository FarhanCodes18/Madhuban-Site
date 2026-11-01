export const menuData = [
  // --- INDIAN & MAIN COURSE ---
  {
    id: 'mb-01',
    name: 'Madhuban Royal Paneer Makhani',
    category: 'indian',
    secondaryCategory: 'main-course',
    price: 460,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.9,
    reviewsCount: 142,
    prepTime: '20 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop',
    description: 'Slow-simmered cottage cheese in rich Kashmiri tomato silk gravy infused with organic churned butter and royal mace.',
    ingredients: ['Fresh Malai Paneer', 'Vine-Ripened Tomatoes', 'Cashew Cream', 'Churned White Butter', 'Green Cardamom', 'Kasturi Methi'],
    allergens: ['Dairy', 'Tree Nuts (Cashew)'],
    calories: '420 kcal',
    customizations: [
      { name: 'Spice Level', options: ['Mild (Kid Friendly)', 'Traditional Medium', 'Extra Spicy'] },
      { name: 'Preparation Style', options: ['Regular Makhani', 'Jain (No Onion No Garlic)'] },
      { name: 'Portion Size', options: ['Single (300g)', 'Full Royal Platter (550g, +₹180)'] }
    ]
  },
  {
    id: 'mb-02',
    name: 'Dal Madhuban Bukhara (24hr Simmered)',
    category: 'indian',
    secondaryCategory: 'main-course',
    price: 390,
    isVeg: true,
    isJain: false,
    spicyLevel: 1,
    rating: 4.95,
    reviewsCount: 210,
    prepTime: '15 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
    description: 'Black urad lentils cooked overnight over slow charcoal embers, enriched with fresh tomatoes, cream, and ginger juliennes.',
    ingredients: ['Black Urad Lentils', 'Smoked Charcoal Ghee', 'Fresh Cream', 'Tomato Reduction', 'Dry Fenugreek'],
    allergens: ['Dairy'],
    calories: '380 kcal',
    customizations: [
      { name: 'Creaminess', options: ['Classic Velvety', 'Extra Butter & Cream (+₹40)'] }
    ]
  },
  {
    id: 'mb-03',
    name: 'Subz Dum Handi Biryani',
    category: 'indian',
    secondaryCategory: 'main-course',
    price: 440,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
    rating: 4.8,
    reviewsCount: 98,
    prepTime: '25 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
    description: 'Fragrant aged Basmati rice layered with garden veggies, saffron strands, and hand-ground mint paste, sealed with clay dough seal.',
    ingredients: ['Aged Dehraduni Basmati', 'Farm Baby Carrots', 'Green Peas', 'French Beans', 'Pure Kashmiri Saffron', 'Mint'],
    allergens: ['Dairy'],
    calories: '460 kcal',
    customizations: [
      { name: 'Accompaniment', options: ['Burani Garlic Raita', 'Pineapple Raita', 'Pomegranate Raita'] },
      { name: 'Preparation Style', options: ['Regular Handi', 'Jain Style (No Onion)'] }
    ]
  },
  {
    id: 'mb-04',
    name: 'Tandoori Smoked Malai Broccoli',
    category: 'starters',
    secondaryCategory: 'indian',
    price: 380,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.7,
    reviewsCount: 84,
    prepTime: '18 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    description: 'Florets of tender broccoli marinated in cream cheese, yellow mustard, and cardamom, char-grilled to perfection.',
    ingredients: ['Organic Broccoli', 'Cream Cheese', 'Hung Curd', 'Green Cardamom', 'Rock Salt'],
    allergens: ['Dairy', 'Mustard'],
    calories: '280 kcal',
    customizations: [
      { name: 'Char Level', options: ['Light Golden Char', 'Deep Smoky Charcoal'] }
    ]
  },
  {
    id: 'mb-05',
    name: 'Murgh Awadhi Dum Biryani',
    category: 'indian',
    secondaryCategory: 'main-course',
    price: 520,
    isVeg: false,
    isJain: false,
    spicyLevel: 2,
    rating: 4.9,
    reviewsCount: 175,
    prepTime: '25 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    description: 'Succulent chicken morsels cooked on dum with aged basmati, infused with kewra essence, brown onions, and royal whole spices.',
    ingredients: ['Tender Chicken Thighs', 'Aged Basmati Rice', 'Kewra Water', 'Caramelized Onion', 'Saffron Ghee'],
    allergens: ['Dairy'],
    calories: '560 kcal',
    customizations: [
      { name: 'Spice Level', options: ['Medium Awadhi', 'Teekha Special'] }
    ]
  },
  {
    id: 'mb-06',
    name: 'Bhatti Da Murg Tikka',
    category: 'starters',
    secondaryCategory: 'indian',
    price: 480,
    isVeg: false,
    isJain: false,
    spicyLevel: 3,
    rating: 4.85,
    reviewsCount: 130,
    prepTime: '20 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop',
    description: 'Boneless chicken cubes soaked in Mathania chili paste, crushed black pepper, and mustard oil, roasted in traditional tandoor.',
    ingredients: ['Boneless Chicken', 'Mathania Red Chili', 'Kachri Powder', 'Cold-pressed Mustard Oil', 'Chaat Masala'],
    allergens: ['Mustard', 'Dairy'],
    calories: '410 kcal',
    customizations: [
      { name: 'Dip Choice', options: ['Mint Coriander Chutney', 'Smoked Garlic Aioli'] }
    ]
  },

  // --- PIZZA & ITALIAN ---
  {
    id: 'mb-07',
    name: 'Truffle & Wild Mushroom Wood-Fired Pizza',
    category: 'pizza',
    secondaryCategory: 'italian',
    price: 560,
    isVeg: true,
    isJain: false,
    spicyLevel: 0,
    rating: 4.9,
    reviewsCount: 112,
    prepTime: '18 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    description: 'Sourdough crust topped with porchini mushroom reduction, fresh mozzarella fior di latte, white truffle oil, and baby arugula.',
    ingredients: ['48hr Fermented Sourdough', 'Fresh Fior di Latte Mozzarella', 'Wild Porcini & Cremini', 'White Truffle Oil', 'Shaved Grana Padano'],
    allergens: ['Gluten', 'Dairy'],
    calories: '680 kcal',
    customizations: [
      { name: 'Crust', options: ['Classic Neapolitan Thin', 'Cheese-Stuffed Crust (+₹90)'] },
      { name: 'Extra Cheese', options: ['Standard Mozzarella', 'Double Mozzarella (+₹70)'] }
    ]
  },
  {
    id: 'mb-08',
    name: 'Burrata Margherita D.O.P.',
    category: 'pizza',
    secondaryCategory: 'italian',
    price: 510,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.8,
    reviewsCount: 95,
    prepTime: '16 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=800&auto=format&fit=crop',
    description: 'San Marzano tomato base, creamy whole burrata orb in the center, torn sweet basil, and first cold-pressed Tuscan olive oil.',
    ingredients: ['San Marzano Tomatoes', 'Artisanal Burrata', 'Sweet Genovese Basil', 'Extra Virgin Olive Oil', 'Sea Salt Flakes'],
    allergens: ['Gluten', 'Dairy'],
    calories: '620 kcal',
    customizations: [
      { name: 'Size', options: ['11 Inch Personal', '14 Inch Sharing (+₹160)'] }
    ]
  },

  // --- PASTA ---
  {
    id: 'mb-09',
    name: 'Artisanal Fettuccine Al Tartufo & Alfredo',
    category: 'pasta',
    secondaryCategory: 'italian',
    price: 490,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.85,
    reviewsCount: 88,
    prepTime: '18 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted bronze-die fettuccine rolled in 24-month aged parmesan cheese wheel with sweet garlic butter and cracked pepper.',
    ingredients: ['Semolina Fettuccine', 'Aged Parmigiano Reggiano', 'English Dairy Cream', 'Nutmeg', 'Fresh Herb Oil'],
    allergens: ['Gluten', 'Dairy'],
    calories: '590 kcal',
    customizations: [
      { name: 'Add Protein', options: ['As is (Vegetarian)', 'Grilled Herb Chicken (+₹120)', 'Garlic Butter Prawns (+₹180)'] }
    ]
  },
  {
    id: 'mb-10',
    name: 'Penne All\'Arrabbiata Di Napoli',
    category: 'pasta',
    secondaryCategory: 'italian',
    price: 440,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
    rating: 4.7,
    reviewsCount: 64,
    prepTime: '15 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    description: 'Ridged penne coated in spicy fiery plum tomato sauce, Kalamata olives, crushed chili peppers, and torn garden oregano.',
    ingredients: ['Durum Wheat Penne', 'Plum Tomatoes', 'Calabrian Chili', 'Black Kalamata Olives', 'Extra Virgin Olive Oil'],
    allergens: ['Gluten'],
    calories: '480 kcal',
    customizations: [
      { name: 'Spiciness', options: ['Classic Spicy', 'Extra Fiery Calabria', 'Mild Tomato'] }
    ]
  },

  // --- CHINESE ---
  {
    id: 'mb-11',
    name: 'Crispy Lotus Stem Honey Chili',
    category: 'chinese',
    secondaryCategory: 'starters',
    price: 390,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
    rating: 4.88,
    reviewsCount: 140,
    prepTime: '15 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop',
    description: 'Paper-thin slices of crunchy lotus root glazed in golden organic honey, toasted sesame, scallions, and bird\'s eye chili.',
    ingredients: ['Fresh Lotus Stem', 'Forest Blossom Honey', 'Toasted White Sesame', 'Scallions', 'Light Soy Sauce'],
    allergens: ['Sesame', 'Soy'],
    calories: '320 kcal',
    customizations: [
      { name: 'Sweetness vs Heat', options: ['Balanced Sweet & Spicy', 'Extra Crisp Spicy', 'Less Honey'] }
    ]
  },
  {
    id: 'mb-12',
    name: 'Truffled Wild Mushroom Dim Sum (6 Pcs)',
    category: 'chinese',
    secondaryCategory: 'starters',
    price: 430,
    isVeg: true,
    isJain: false,
    spicyLevel: 1,
    rating: 4.92,
    reviewsCount: 156,
    prepTime: '15 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop',
    description: 'Translucent steamed crystal dumplings filled with shiitake, chestnut, and edamame, perfumed with fragrant truffle broth.',
    ingredients: ['Crystal Wheat Starch', 'Shiitake Mushrooms', 'Edamame Beans', 'Water Chestnuts', 'Truffle Oil'],
    allergens: ['Soy', 'Gluten'],
    calories: '260 kcal',
    customizations: [
      { name: 'Dip Trio', options: ['Chili Crisp, Black Vinegar & Ginger Soy', 'Extra Chili Oil'] }
    ]
  },
  {
    id: 'mb-13',
    name: 'Wok-Tossed Hakka Noodles & Szechuan Greens',
    category: 'chinese',
    secondaryCategory: 'main-course',
    price: 360,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
    rating: 4.65,
    reviewsCount: 78,
    prepTime: '16 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
    description: 'Hand-pulled noodles tossed with bell peppers, shredded cabbage, bok choy, and house special five-spice Szechuan sauce.',
    ingredients: ['Eggless Wheat Noodles', 'Shredded Bok Choy', 'Bell Peppers', 'Five Spice', 'Spring Onion'],
    allergens: ['Gluten', 'Soy'],
    calories: '440 kcal',
    customizations: [
      { name: 'Additions', options: ['Only Veggies', 'Crisp Cottage Cheese (+₹60)', 'Diced Chicken (+₹90)'] }
    ]
  },

  // --- SOUTH INDIAN ---
  {
    id: 'mb-14',
    name: 'Ghee Roast Paper Masala Dosa',
    category: 'south-indian',
    secondaryCategory: 'snacks',
    price: 280,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.9,
    reviewsCount: 180,
    prepTime: '14 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop',
    description: 'Golden super-crisp crepe roasted in pure A2 cow ghee, stuffed with tempered potato-mustard podi, served with three fresh chutneys and piping hot drumstick sambar.',
    ingredients: ['Fermented Rice & Lentil Batter', 'Pure A2 Cow Ghee', 'Tempered Yukon Potatoes', 'Gunpowder Podi', 'Curry Leaves'],
    allergens: ['Dairy', 'Mustard'],
    calories: '390 kcal',
    customizations: [
      { name: 'Filling', options: ['Classic Spiced Potato', 'Paneer Bhurji (+₹50)', 'Jain Raw Banana Mash'] },
      { name: 'Roasting Ghee', options: ['Signature A2 Cow Ghee', 'Light Coconut Oil Option'] }
    ]
  },
  {
    id: 'mb-15',
    name: 'Steamed Mallipoo Idli with Gunpowder Butter',
    category: 'south-indian',
    secondaryCategory: 'snacks',
    price: 220,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.75,
    reviewsCount: 92,
    prepTime: '10 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop',
    description: 'Melt-in-mouth soft jasmine-textured steamed rice cakes dipped in spiced Malabar gunpowder podi and warm clarified butter.',
    ingredients: ['Parboiled Rice', 'Urad Gota', 'Roasted Lentil Podi', 'A2 Desi Ghee'],
    allergens: ['Dairy'],
    calories: '240 kcal',
    customizations: [
      { name: 'Spice Level', options: ['Spicy Gunpowder Podi', 'Mild Podi'] }
    ]
  },

  // --- SNACKS & STARTERS ---
  {
    id: 'mb-16',
    name: 'Madhuban Signature Dahi Puri Spheres',
    category: 'snacks',
    secondaryCategory: 'starters',
    price: 260,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.95,
    reviewsCount: 230,
    prepTime: '10 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    description: 'Six artisanal crispy semolina shells filled with spiced sprouts, chilled whipped saffron yogurt foam, tamarind pearls, and edible gold leaf.',
    ingredients: ['Semolina Crisps', 'Whipped Thick Curd', 'Date & Tamarind Glaze', 'Pomegranate Pearls', 'Mint Infusion'],
    allergens: ['Gluten', 'Dairy'],
    calories: '290 kcal',
    customizations: [
      { name: 'Spiciness', options: ['Sweet & Tangy', 'Spicy Mint Infused'] }
    ]
  },
  {
    id: 'mb-17',
    name: 'Avocado Papdi Chaat Medley',
    category: 'snacks',
    secondaryCategory: 'starters',
    price: 340,
    isVeg: true,
    isJain: true,
    spicyLevel: 1,
    rating: 4.8,
    reviewsCount: 74,
    prepTime: '12 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
    description: 'Modern botanical twist on classic street chaat with diced Hass avocado, heirloom tomatoes, yogurt gel, and beetroot chips.',
    ingredients: ['Hass Avocado', 'Crispy Papdi Crackers', 'Beetroot Crisps', 'Tamarind Reduction', 'Coriander Microgreens'],
    allergens: ['Gluten', 'Dairy'],
    calories: '310 kcal',
    customizations: [
      { name: 'Style', options: ['Regular Modern Chaat', 'Jain Option (No Onion/Garlic)'] }
    ]
  },

  // --- BEVERAGES & SHAKES ---
  {
    id: 'mb-18',
    name: 'Kashmiri Saffron & Pistachio Milkshake',
    category: 'shakes',
    secondaryCategory: 'beverages',
    price: 290,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.92,
    reviewsCount: 165,
    prepTime: '8 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
    description: 'Creamy cold-steeped organic whole milk churned with pure Mongra saffron, crushed Iranian pistachios, and silver vark.',
    ingredients: ['Organic Cow Milk', 'Mongra Saffron', 'Roasted Green Pistachio', 'Wild Raw Honey', 'Green Cardamom'],
    allergens: ['Dairy', 'Tree Nuts (Pistachio)'],
    calories: '340 kcal',
    customizations: [
      { name: 'Sweetness', options: ['Standard Honey Sweetened', 'Less Sweet', 'Sugar-Free Stevia'] },
      { name: 'Milk Type', options: ['Whole Dairy Milk', 'Almond Milk (+₹50)', 'Oat Milk (+₹50)'] }
    ]
  },
  {
    id: 'mb-19',
    name: 'Botanical Hibiscus & Lemongrass Cooler',
    category: 'beverages',
    price: 240,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.8,
    reviewsCount: 110,
    prepTime: '6 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
    description: 'Cold-brewed ruby red Egyptian hibiscus petals, bruised mountain lemongrass, chia seeds, and sparkling Himalayan spring water.',
    ingredients: ['Brewed Hibiscus Flowers', 'Fresh Lemongrass Stalks', 'Chia Seeds', 'Lime Juice', 'Sparkling Water'],
    allergens: [],
    calories: '110 kcal',
    customizations: [
      { name: 'Sparkling Option', options: ['Fizzy Sparkling Soda', 'Still Spring Water'] }
    ]
  },
  {
    id: 'mb-20',
    name: 'Belgian Dark Chocolate Hazelnut Shake',
    category: 'shakes',
    price: 310,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.85,
    reviewsCount: 94,
    prepTime: '8 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=800&auto=format&fit=crop',
    description: '70% single-origin Callebaut dark cocoa whipped with Madagascar vanilla ice cream and roasted Piedmont hazelnut praline.',
    ingredients: ['Callebaut Dark Chocolate 70%', 'Hazelnut Butter', 'Artisanal Vanilla Ice Cream', 'Cocoa Nibs'],
    allergens: ['Dairy', 'Tree Nuts (Hazelnut)'],
    calories: '450 kcal',
    customizations: [
      { name: 'Toppings', options: ['Whipped Cream & Chocolate Flakes', 'No Whipped Cream'] }
    ]
  },

  // --- DESSERTS ---
  {
    id: 'mb-21',
    name: 'Golden Saffron Rasmalai Tres Leches',
    category: 'desserts',
    price: 340,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.96,
    reviewsCount: 220,
    prepTime: '10 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
    description: 'Feather-light sponge cake drenched in three fragrant milks infused with saffron, cardamom, and topped with delicate rasmalai medallions and crushed almonds.',
    ingredients: ['Cardamom Sponge', 'Saffron Condensed Milk', 'Evaporated Milk', 'Chenna Dumplings', 'Silver Leaf'],
    allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
    calories: '390 kcal',
    customizations: [
      { name: 'Serving Temperature', options: ['Chilled (Recommended)', 'Room Temperature'] }
    ]
  },
  {
    id: 'mb-22',
    name: 'Warm Pistachio Gulab Jamun Fondant',
    category: 'desserts',
    price: 320,
    isVeg: true,
    isJain: true,
    spicyLevel: 0,
    rating: 4.88,
    reviewsCount: 145,
    prepTime: '12 mins',
    isBestseller: false,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop',
    description: 'Molten warm khoya dumpling filled with molten pistachio butter, served alongside Madagascar vanilla bean gelato and rose petals.',
    ingredients: ['Reduced Milk Mawa', 'Iranian Pistachio Core', 'Rose Sugar Syrup', 'Vanilla Bean Gelato'],
    allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
    calories: '430 kcal',
    customizations: [
      { name: 'Ice Cream Pairing', options: ['Vanilla Bean Gelato', 'Kesar Pista Kulfi (+₹40)'] }
    ]
  },

  // --- COMBOS ---
  {
    id: 'mb-23',
    name: 'Royal Madhuban Thali Feast',
    category: 'combos',
    secondaryCategory: 'indian',
    price: 699,
    isVeg: true,
    isJain: true,
    spicyLevel: 2,
    rating: 4.95,
    reviewsCount: 280,
    prepTime: '20 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    description: 'Grand dining journey: Paneer Makhani, 24hr Dal Bukhara, Subz Dum Biryani, 2 Garlic Butter Naans, Malai Broccoli starter, Saffron Rasmalai, and Raita.',
    ingredients: ['Assorted Signature Dishes', 'Bread Basket', 'Dessert', 'Pickles and Chutneys'],
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    calories: '980 kcal',
    customizations: [
      { name: 'Diet Style', options: ['Pure Vegetarian', 'Jain Special (No Onion Garlic)'] },
      { name: 'Breads Choice', options: ['Garlic Naan & Laccha Paratha', 'Whole Wheat Butter Roti'] }
    ]
  },
  {
    id: 'mb-24',
    name: 'Artisanal Italian Duo Combo',
    category: 'combos',
    secondaryCategory: 'italian',
    price: 850,
    isVeg: true,
    isJain: false,
    spicyLevel: 1,
    rating: 4.82,
    reviewsCount: 118,
    prepTime: '22 mins',
    isBestseller: true,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop',
    description: 'Includes 1 Truffle Wild Mushroom Pizza (11") + 1 Penne Arrabbiata + 2 Botanical Coolers of your choice.',
    ingredients: ['Neapolitan Pizza', 'Handcrafted Pasta', 'Botanical Drinks'],
    allergens: ['Gluten', 'Dairy'],
    calories: '1100 kcal',
    customizations: [
      { name: 'Cooler Flavors', options: ['Hibiscus Lemongrass & Mint Cooler', 'Two Hibiscus Coolers'] }
    ]
  }
];
