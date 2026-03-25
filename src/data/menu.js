export const menuCategories = [
  // ── SOUPS ──────────────────────────────────────────────────────────────────
  {
    id: 'soups',
    name: 'Soups',
    nameZH: '湯品',
    description: 'Traditional Indian soups to warm your soul',
    descriptionZH: '傳統印度湯品，暖心暖胃',
    dishes: [
      { id: 'tomato-soup',   name: 'Tomato Soup',             nameZH: '番茄湯',     description: 'Classic spiced Indian tomato soup.',                                        descriptionZH: '經典印度香料番茄湯。',              price: 90,  isVeg: true,  spiceLevel: 1 },
      { id: 'chicken-corn', name: 'Chicken Corn Soup',        nameZH: '雞肉玉米湯', description: 'Hearty chicken and sweet corn soup with Indian spices.',                    descriptionZH: '豐盛雞肉甜玉米湯配印度香料。',      price: 90,  isVeg: false, spiceLevel: 1 },
      { id: 'dal-soup',      name: 'Dal Soup',                nameZH: '扁豆湯',     description: 'Smooth lentil soup tempered with aromatic spices.',                         descriptionZH: '順滑扁豆湯配芳香香料。',            price: 90,  isVeg: true,  spiceLevel: 1 },
      { id: 'palak-soup',    name: 'Palak Soup',              nameZH: '菠菜湯',     description: 'Creamy spinach soup with a touch of Indian spices.',                        descriptionZH: '奶油菠菜湯，帶有印度香料風味。',    price: 90,  isVeg: true,  spiceLevel: 1 },
    ],
  },

  // ── INDIAN BARBEQUE ────────────────────────────────────────────────────────
  {
    id: 'barbeque',
    name: 'Indian Barbeque',
    nameZH: '印度烤爐料理',
    description: 'Smoky, char-grilled specialties from our traditional tandoor clay oven',
    descriptionZH: '來自傳統陶製坦都爐的煙燻炭烤特色菜',
    dishes: [
      { id: 'paneer-tikka',        name: 'Paneer Tikka',           nameZH: '印度芝士烤串',     description: 'Cottage cheese marinated in spiced yogurt, char-grilled with peppers and onions.',               descriptionZH: '印度芝士在香料優格中醃製，與甜椒和洋蔥一起炭烤。',         price: 350, isVeg: true,  spiceLevel: 1 },
      { id: 'alo-veg-tikka',       name: 'Alo Veg Tikka',          nameZH: '蔬菜馬鈴薯烤串',   description: 'Potato and assorted vegetables marinated in spices and grilled in the tandoor.',                 descriptionZH: '馬鈴薯和雜蔬菜在香料中醃製，在坦都爐中烤製。',             price: 350, isVeg: true,  spiceLevel: 1 },
      { id: 'chicken-tikka',       name: 'Chicken Tikka',          nameZH: '雞肉烤串',         description: 'Boneless chicken cubes marinated in spiced yogurt, grilled over charcoal. Served with mint chutney.', descriptionZH: '無骨雞肉塊在香料優格中醃製，炭火烤製。搭配薄荷酸辣醬。',  price: 350, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'malai-tikka',         name: 'Malai Tikka',            nameZH: '奶油雞肉烤串',     description: 'Chicken cubes marinated in cream and mild spices, grilled to a golden finish.',                   descriptionZH: '雞肉塊在奶油和溫和香料中醃製，烤至金黃。',                 price: 350, isVeg: false, spiceLevel: 1 },
      { id: 'tandoori-chicken',    name: 'Tandoori Chicken',       nameZH: '坦都爐烤雞',       description: 'Chicken marinated overnight in yogurt, lemon, and a royal blend of spices, char-grilled in our clay oven.', descriptionZH: '雞肉在優格、檸檬和皇家香料混合物中醃製一夜，在陶製爐中炭烤。', price: 380, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'fish-tikka',          name: 'Fish Tikka',             nameZH: '魚肉烤串',         description: 'Fresh fish marinated in aromatic spices and grilled in the tandoor.',                            descriptionZH: '新鮮魚肉在芳香香料中醃製，在坦都爐中烤製。',               price: 360, isVeg: false, spiceLevel: 2 },
      { id: 'tandoor-raan',        name: 'Tandoor Raan',           nameZH: '坦都爐烤羊腿',     description: 'Whole leg of lamb marinated in spices and slow-roasted in the tandoor until tender.',            descriptionZH: '整條羊腿在香料中醃製，在坦都爐中慢烤至嫩滑。',             price: 450, isVeg: false, spiceLevel: 2 },
      { id: 'chicken-seekh-kebab', name: 'Chicken Seekh Kebab',    nameZH: '雞肉串燒',         description: 'Minced chicken mixed with aromatic spices and fresh herbs, grilled on skewers.',                 descriptionZH: '雞肉末與芳香香料和新鮮香草混合，串在竹籤上燒烤。',         price: 360, isVeg: false, spiceLevel: 2 },
    ],
  },

  // ── APPETIZERS ─────────────────────────────────────────────────────────────
  {
    id: 'appetizers',
    name: 'Appetizers',
    nameZH: '配菜',
    description: 'Traditional Indian starters and light bites',
    descriptionZH: '傳統印度開胃小菜',
    dishes: [
      { id: 'roasted-papad',   name: 'Roasted Papad',        nameZH: '烤豆餅',             description: 'Crispy roasted lentil wafers.',                                                               descriptionZH: '酥脆烤扁豆薄餅。',                       price: 50,  isVeg: true,  spiceLevel: 0 },
      { id: 'samosa',          name: 'Samosa (2 pcs)',        nameZH: '薩摩沙角炸餃（2個）', description: 'Crispy pastry triangles filled with spiced potatoes and peas. Served with mint chutney.',   descriptionZH: '脆皮三角炸餃，填入香料馬鈴薯和豌豆。',   price: 120, isVeg: true,  spiceLevel: 1 },
      { id: 'mix-veg-pakoda',  name: 'Mix Veg Pakoda',       nameZH: '綜合蔬菜天婦羅',     description: 'Assorted vegetables coated in spiced chickpea batter and deep-fried until crispy.',           descriptionZH: '雜蔬菜裹上香料鷹嘴豆麵糊炸至酥脆。',     price: 180, isVeg: true,  spiceLevel: 1 },
      { id: 'paneer-pakoda',   name: 'Paneer Pakoda',        nameZH: '印度芝士天婦羅',     description: 'Cottage cheese fritters coated in spiced batter and deep-fried.',                            descriptionZH: '印度芝士裹上香料麵糊炸製。',               price: 280, isVeg: true,  spiceLevel: 1 },
      { id: 'green-salad',     name: 'Green Salad',          nameZH: '綠色沙拉',           description: 'Fresh garden salad with Indian dressing.',                                                    descriptionZH: '新鮮花園沙拉配印度醬料。',                 price: 380, isVeg: true,  spiceLevel: 0 },
      { id: 'plum-tomato',     name: 'Plum Tomato',          nameZH: '李子番茄',           description: 'Fresh plum tomatoes served with a light seasoning.',                                          descriptionZH: '新鮮李子番茄配清淡調味。',                 price: 75,  isVeg: true,  spiceLevel: 0 },
    ],
  },

  // ── INDIAN BREAD ───────────────────────────────────────────────────────────
  {
    id: 'breads',
    name: 'Indian Bread',
    nameZH: '印度烤餅',
    description: 'Freshly baked Indian breads from the tandoor, perfect with any curry',
    descriptionZH: '從坦都爐新鮮出爐的印度烤餅，與任何咖哩搭配都完美',
    dishes: [
      { id: 'plain-naan',         name: 'Plain Naan',          nameZH: '原味烤餅',     description: 'Classic soft leavened bread baked in tandoor.',                                         descriptionZH: '經典柔軟發酵麵包在坦都爐中烘烤。',       price: 55,  isVeg: true, spiceLevel: 0 },
      { id: 'butter-naan',        name: 'Butter Naan',         nameZH: '奶油烤餅',     description: 'Classic leavened bread brushed with generous butter, straight from the tandoor.',     descriptionZH: '塗上大量奶油的經典發酵麵包，直接從坦都爐出爐。', price: 65,  isVeg: true, spiceLevel: 0 },
      { id: 'spicy-naan',         name: 'Spicy Naan',          nameZH: '香辣烤餅',     description: 'Naan with a spicy kick of chili and herbs.',                                             descriptionZH: '添加辣椒和香草的香辣烤餅。',              price: 75,  isVeg: true, spiceLevel: 2 },
      { id: 'garlic-naan',        name: 'Garlic Naan',         nameZH: '蒜香烤餅',     description: 'Soft leavened bread with fresh garlic and butter, baked in tandoor.',                   descriptionZH: '加入新鮮大蒜和奶油的柔軟發酵麵包，在坦都爐中烘烤。', price: 80,  isVeg: true, spiceLevel: 0 },
      { id: 'sesame-naan',        name: 'Sesame Naan',         nameZH: '芝麻烤餅',     description: 'Naan topped with sesame seeds and butter.',                                              descriptionZH: '頂部有芝麻和奶油的烤餅。',                price: 85,  isVeg: true, spiceLevel: 0 },
      { id: 'jeera-naan',         name: 'Jeera Naan',          nameZH: '孜然烤餅',     description: 'Naan with cumin seeds baked into the dough.',                                            descriptionZH: '麵團中加入孜然籽烘烤的烤餅。',            price: 90,  isVeg: true, spiceLevel: 0 },
      { id: 'aloo-naan',          name: 'Aloo Naan',           nameZH: '馬鈴薯烤餅',   description: 'Naan stuffed with spiced mashed potato filling.',                                        descriptionZH: '填入香料馬鈴薯泥的烤餅。',                price: 95,  isVeg: true, spiceLevel: 1 },
      { id: 'cheese-onion-naan',  name: 'Cheese Onion Naan',   nameZH: '起司洋蔥烤餅', description: 'Naan stuffed with cheese and caramelised onion.',                                        descriptionZH: '填入起司和焦糖洋蔥的烤餅。',              price: 110, isVeg: true, spiceLevel: 0 },
      { id: 'cheese-naan',        name: 'Cheese Naan',         nameZH: '起司烤餅',     description: 'Naan generously stuffed with melted cheese.',                                            descriptionZH: '大量填入融化起司的烤餅。',                 price: 120, isVeg: true, spiceLevel: 0 },
      { id: 'laccha-paratha',     name: 'Laccha Paratha',      nameZH: '層疊印度薄餅', description: 'Flaky, layered whole-wheat flatbread cooked to perfection.',                            descriptionZH: '酥脆多層全麥薄餅，烹製至完美。',          price: 70,  isVeg: true, spiceLevel: 0 },
    ],
  },

  // ── VEGETABLE CURRIES ──────────────────────────────────────────────────────
  {
    id: 'veg-mains',
    name: 'Veg Curries',
    nameZH: '素食咖哩',
    description: 'Rich, aromatic vegetable curries from the royal kitchens of Hyderabad',
    descriptionZH: '來自海德拉巴皇室廚房的濃郁芳香蔬菜咖哩',
    dishes: [
      { id: 'chana-masala',         name: 'Chana Masala',         nameZH: '鷹嘴豆咖哩',       description: 'Tendered chick peas cooked with Indian masala sauce.',                                         descriptionZH: '嫩煮鷹嘴豆配印度瑪沙拉醬汁。',               price: 270, isVeg: true, spiceLevel: 2 },
      { id: 'alo-gobi',             name: 'Alo Gobi',             nameZH: '北印度香料馬鈴薯花椰菜', description: 'Potato and cauliflower cooked with Indian spices in traditional north Indian style.',      descriptionZH: '馬鈴薯和花椰菜以傳統北印度風格烹製。',       price: 290, isVeg: true, spiceLevel: 1 },
      { id: 'mix-veg-curry',        name: 'Mix Veg Curry',        nameZH: '綜合蔬菜咖哩',     description: 'Assorted vegetables cooked with Indian curry sauce and herbs.',                              descriptionZH: '雜蔬菜配印度咖哩醬汁和香草烹製。',           price: 290, isVeg: true, spiceLevel: 1 },
      { id: 'alo-jeera',            name: 'Alo Jeera',            nameZH: '孜然馬鈴薯咖哩',   description: 'Dry potato curry with Cumin flavor.',                                                        descriptionZH: '乾式馬鈴薯咖哩配孜然風味。',                 price: 260, isVeg: true, spiceLevel: 1 },
      { id: 'dal-tadaka',           name: 'Dal Tadaka',           nameZH: '印度家常扁豆咖哩', description: 'Yellow lentil tempered with cumin, garlic and other Indian herbs.',                         descriptionZH: '黃扁豆配孜然、大蒜和其他印度香草爆香。',     price: 280, isVeg: true, spiceLevel: 1, chefRecommended: true },
      { id: 'bengan-bharta',        name: 'Bengan Bharta',        nameZH: '茄子番茄咖哩',     description: 'Baked egg plant cooked with Indian spices and onion.',                                      descriptionZH: '烤茄子配印度香料和洋蔥烹製。',               price: 290, isVeg: true, spiceLevel: 2 },
      { id: 'bendo-do-pyaza',       name: 'Bendo Do Pyaza',       nameZH: '印度美味秋葵',     description: 'Fresh lady fingers lightly fried up cooked with Indian spices and onion.',                  descriptionZH: '新鮮秋葵輕炒配印度香料和洋蔥。',             price: 300, isVeg: true, spiceLevel: 1 },
      { id: 'mashroom-masala',      name: 'Mashroom Masala',      nameZH: '鮮菇咖哩',         description: 'Mushrooms cooked in curry sauce with Indian spices.',                                       descriptionZH: '蘑菇配咖哩醬汁和印度香料烹製。',             price: 270, isVeg: true, spiceLevel: 1 },
      { id: 'navratha-korma',       name: 'Navratha Korma',       nameZH: '印度香料什錦蔬菜', description: 'Assorted fresh vegetables cooked in coconut milk sauce with Indian herbs.',                descriptionZH: '什錦新鮮蔬菜配椰奶醬汁和印度香草烹製。',     price: 300, isVeg: true, spiceLevel: 1 },
      { id: 'palak-paneer',         name: 'Palak Paneer',         nameZH: '印度菠菜燉起司',   description: 'Indian cottage cheese cooked in spinach puree with Indian spices.',                        descriptionZH: '印度芝士配菠菜泥和印度香料烹製。',           price: 330, isVeg: true, spiceLevel: 1 },
      { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', nameZH: '印度奶油奶酪咖哩', description: 'Indian cottage cheese cooked in tomato curry sauce with Indian herbs.',                    descriptionZH: '印度芝士配番茄咖哩醬汁和印度香草烹製。',     price: 320, isVeg: true, spiceLevel: 1 },
    ],
  },

  // ── CHICKEN CURRIES ────────────────────────────────────────────────────────
  {
    id: 'chicken',
    name: 'Chicken',
    nameZH: '雞肉料理',
    description: 'Tender chicken dishes cooked in rich, aromatic Indian sauces',
    descriptionZH: '嫩雞肉菜餚，以濃郁芳香的印度醬汁烹製',
    dishes: [
      { id: 'yellow-chicken-curry',    name: 'Yellow Chicken Curry',    nameZH: '黃咖哩雞',         description: 'Chicken cooked in a golden yellow curry sauce with turmeric, garlic, and Indian spices.', descriptionZH: '雞肉在薑黃、大蒜和印度香料金黃色咖哩醬中烹製。', price: 350, isVeg: false, spiceLevel: 1 },
      { id: 'hyderabad-chicken-curry', name: 'Hyderabad Chicken Curry', nameZH: '海德拉巴雞肉咖哩', description: 'Chicken cooked in a rich dark masala sauce in the authentic Hyderabadi style.',           descriptionZH: '雞肉以正宗海德拉巴風格在濃郁深色瑪沙拉醬中烹製。', price: 350, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'butter-chicken',           name: 'Butter Chicken',           nameZH: '印度奶油雞',        description: 'Tender chicken in a rich, velvety tomato-cream sauce with butter and aromatic spices.',  descriptionZH: '嫩雞肉在濃郁絲滑的番茄奶油醬汁中，配奶油和芳香香料。', price: 350, isVeg: false, spiceLevel: 1 },
      { id: 'chicken-saag-murg',       name: 'Chicken Saag Murg',       nameZH: '菠菜雞肉咖哩',     description: 'Chicken cooked with fresh spinach and aromatic Indian spices.',                         descriptionZH: '雞肉配新鮮菠菜和芳香印度香料烹製。',         price: 360, isVeg: false, spiceLevel: 2 },
      { id: 'egg-curry',               name: 'Egg Curry',               nameZH: '印度咖哩蛋',       description: 'Boiled eggs cooked in a rich Indian masala gravy.',                                    descriptionZH: '水煮蛋在濃郁印度瑪沙拉醬汁中烹製。',         price: 320, isVeg: false, spiceLevel: 2 },
    ],
  },

  // ── LAMB CURRIES ───────────────────────────────────────────────────────────
  {
    id: 'lamb',
    name: 'Lamb',
    nameZH: '羊肉料理',
    description: 'Slow-braised lamb dishes with rich Hyderabadi spices',
    descriptionZH: '以濃郁海德拉巴香料慢燉的羊肉菜餚',
    dishes: [
      { id: 'lamb-curry',      name: 'Lamb Curry',      nameZH: '羊肉咖哩',       description: 'Tender lamb cooked with Indian herbs and spices in a rich gravy.',                    descriptionZH: '嫩羊肉配印度香草和香料在濃郁醬汁中烹製。', price: 340, isVeg: false, spiceLevel: 2 },
      { id: 'lamb-korma',      name: 'Lamb Korma',      nameZH: '奶油羊肉咖哩',   description: 'Tender lamb pieces cooked in a mild, creamy korma sauce.',                          descriptionZH: '嫩羊肉塊在溫和奶油科爾馬醬汁中烹製。',     price: 360, isVeg: false, spiceLevel: 1 },
      { id: 'keema-ghosht',    name: 'Keema Ghosht',    nameZH: '印度肉末咖哩',   description: 'Minced lamb cooked with Indian spices in a rich masala sauce.',                     descriptionZH: '羊肉末配印度香料在濃郁瑪沙拉醬汁中烹製。', price: 360, isVeg: false, spiceLevel: 2 },
      { id: 'roghan-gosht',    name: 'Roghan Gosht',    nameZH: '克什米爾羊肉咖哩', description: 'Aromatic Kashmiri lamb curry with whole spices and a deep, rich gravy.',          descriptionZH: '芳香克什米爾羊肉咖哩配整粒香料和濃郁醬汁。', price: 360, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'gosht-saag-wali', name: 'Gosht Saag Wali', nameZH: '菠菜羊肉咖哩',   description: 'Lamb cooked with fresh spinach, dry spices and butter oil.',                       descriptionZH: '羊肉配新鮮菠菜、乾香料和奶油烹製。',       price: 380, isVeg: false, spiceLevel: 2 },
    ],
  },

  // ── SEA FOOD CURRIES ───────────────────────────────────────────────────────
  {
    id: 'seafood',
    name: 'Seafood',
    nameZH: '海鮮料理',
    description: 'Fresh seafood curries with coastal Indian spices',
    descriptionZH: '新鮮海鮮咖哩配海岸印度香料',
    dishes: [
      { id: 'fish-curry',        name: 'Fish Curry',           nameZH: '印度魚肉咖哩',   description: 'Fresh fish cooked in a tangy Indian curry sauce with coastal spices.',                  descriptionZH: '新鮮魚肉在酸辣印度咖哩醬汁中配海岸香料烹製。', price: 370, isVeg: false, spiceLevel: 2 },
      { id: 'kadrahi-jhinga',    name: 'Kadrahi Jhinga',       nameZH: '鐵鍋蝦仁咖哩',   description: 'Shrimp cooked in a kadhai (iron wok) with Indian spices and herbs.',                  descriptionZH: '蝦仁在印度鐵鍋中配印度香料和香草烹製。',     price: 370, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'palak-jhinga',      name: 'Palak Jhinga',         nameZH: '菠菜蝦仁咖哩',   description: 'Shrimp cooked in a creamy spinach sauce with Indian spices.',                        descriptionZH: '蝦仁在奶油菠菜醬汁中配印度香料烹製。',       price: 390, isVeg: false, spiceLevel: 1 },
      { id: 'mix-seafood-curry', name: 'Mix Sea Food Curry',   nameZH: '印度美味海鮮特味咖哩', description: 'Assortment of fresh seafood cooked with Indian curry spices.',              descriptionZH: '什錦新鮮海鮮配印度咖哩香料烹製。',           price: 360, isVeg: false, spiceLevel: 2 },
    ],
  },

  // ── BIRYANI & RICE ─────────────────────────────────────────────────────────
  {
    id: 'biryani',
    name: "Biryani's & Rice",
    nameZH: '印度特味飯',
    description: 'Royal dum-cooked biryanis and fragrant Indian rice',
    descriptionZH: '皇室慢燉印度香飯和芳香印度米飯',
    dishes: [
      { id: 'indian-rice',       name: 'Indian Rice',              nameZH: '印度白米飯',       description: 'Cooked Indian steam rice.',                                                                    descriptionZH: '熟印度蒸白米飯。',                             price: 60,  isVeg: true,  spiceLevel: 0 },
      { id: 'jeera-rice',        name: 'Jeera Rice',               nameZH: '印度炒茴香米飯',   description: 'Indian rice cooked with cumin and Indian spices.',                                           descriptionZH: '印度米飯配孜然和印度香料烹製。',               price: 90,  isVeg: true,  spiceLevel: 0 },
      { id: 'veg-biryani',       name: 'Veg Biryani',              nameZH: '印度蔬菜特味飯',   description: 'Assorted vegetables cooked in Indian rice with dry sauce and Indian spices.',                descriptionZH: '什錦蔬菜配印度米飯、乾醬汁和印度香料烹製。', price: 320, isVeg: true,  spiceLevel: 1 },
      { id: 'chicken-biryani',   name: 'Chicken Biryani',          nameZH: '印度雞肉特味飯',   description: 'Chicken leg piece cooked in Indian rice with dry sauce and Indian spices.',                  descriptionZH: '雞腿肉配印度米飯、乾醬汁和印度香料烹製。',   price: 350, isVeg: false, spiceLevel: 2 },
      { id: 'ghost-biryani',     name: 'Ghost Biryani',            nameZH: '印度羊肉特味飯',   description: 'Tendered lamb cooked in Indian rice with dry sauce and Indian spices.',                      descriptionZH: '嫩羊肉配印度米飯、乾醬汁和印度香料烹製。',   price: 380, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'jinga-biryani',     name: 'Jinga Biryani',            nameZH: '印度美味蝦仁特味飯', description: 'Shrimp cooked in Indian rice with dry sauce and Indian spices.',                         descriptionZH: '蝦仁配印度米飯、乾醬汁和印度香料烹製。',     price: 370, isVeg: false, spiceLevel: 2 },
      { id: 'hyd-dhum-biryani',  name: 'Hyderabad Dhum Biryani',   nameZH: '海德巴拉印度香飯', description: 'Extra long grain Indian basmati rice cooked with special aroma spices (available in chicken/lamb/shrimp). One of the most famous Indian dishes.', descriptionZH: '超長粒印度香米配特製芳香香料（可選雞肉/羊肉/蝦）。印度最著名的菜餚之一。', price: 395, isVeg: false, spiceLevel: 2, chefRecommended: true },
    ],
  },

  // ── SREE'S SPECIAL ─────────────────────────────────────────────────────────
  {
    id: 'specials',
    name: "Sree's Special",
    nameZH: '主廚精選',
    description: "Chef's exclusive creations inspired by Hyderabadi royal cuisine",
    descriptionZH: '主廚以海德拉巴皇家料理為靈感的獨家創作',
    dishes: [
      { id: 'aloo-chana-chaat',    name: 'Aloo Chana Chaat',         nameZH: '印度涼拌鷹嘴豆馬鈴薯', description: 'Cold dish of potato and chickpea tossed with tangy chutneys and spices.',         descriptionZH: '馬鈴薯和鷹嘴豆配酸辣醬和香料的涼拌菜。',   price: 260, isVeg: true,  spiceLevel: 1 },
      { id: 'dal-fry-special',     name: 'Dal Fry Special',           nameZH: '特製扁豆咖哩',         description: 'Special house dal prepared with a unique blend of spices and aromatics.',         descriptionZH: '特製家常扁豆配獨特香料和芳香物混合烹製。',   price: 390, isVeg: true,  spiceLevel: 2 },
      { id: 'gobhi-paneer',        name: 'Gobhi Paneer',              nameZH: '花椰菜印度芝士',       description: 'Cauliflower and cottage cheese in a rich, spiced gravy.',                        descriptionZH: '花椰菜和印度芝士在濃郁香料醬汁中烹製。',     price: 430, isVeg: true,  spiceLevel: 2 },
      { id: 'ven-mushroom',        name: 'Ven Mushroom',              nameZH: '香菇特製料理',         description: 'Fresh mushrooms cooked in a special house masala.',                              descriptionZH: '新鮮蘑菇在特製家常瑪沙拉中烹製。',           price: 420, isVeg: true,  spiceLevel: 2 },
      { id: 'chick-bhurji',        name: 'Chick Bhurji',              nameZH: '印度炒雞蛋',           description: 'Scrambled eggs cooked with onions, tomatoes, and a blend of spices.',             descriptionZH: '炒蛋配洋蔥、番茄和香料混合物烹製。',         price: 350, isVeg: false, spiceLevel: 2 },
      { id: 'tandoori-cut-set',    name: 'Tandoori Cut Set in Pcs',   nameZH: '坦都爐烤肉拼盤',       description: 'An assortment of tandoor-grilled meats — a feast for the table.',                  descriptionZH: '坦都爐烤肉什錦拼盤——桌上的盛宴。',           price: 700, isVeg: false, spiceLevel: 2, chefRecommended: true },
      { id: 'aloo-thai-salad',     name: 'Aloo Thai Salad',           nameZH: '泰式馬鈴薯沙拉',       description: 'Potato salad with a Thai-inspired dressing and Indian spices.',                   descriptionZH: '馬鈴薯沙拉配泰式醬料和印度香料。',           price: 370, isVeg: true,  spiceLevel: 1 },
      { id: 'cabbage-fry',         name: 'Cabbage Fry',               nameZH: '香炒高麗菜',           description: 'Fresh cabbage stir-fried with Indian spices and aromatics.',                     descriptionZH: '新鮮高麗菜配印度香料和芳香物翻炒。',         price: 420, isVeg: true,  spiceLevel: 1 },
      { id: 'chicken-lucknow',     name: 'Chicken Lucknow (6 pcs)',   nameZH: '勒克瑙香料雞（6塊）',  description: 'Chicken pieces cooked in the Lucknawi dum style with aromatic spices.',           descriptionZH: '雞肉塊以勒克瑙慢燉風格配芳香香料烹製。',     price: 300, isVeg: false, spiceLevel: 2 },
      { id: 'chicken-manchurian',  name: 'Chicken Manchurian',        nameZH: '印度滿州雞',           description: 'Crispy chicken in a spicy Indo-Chinese Manchurian sauce.',                       descriptionZH: '酥脆雞肉配辛辣印中滿州醬汁。',               price: 420, isVeg: false, spiceLevel: 3 },
      { id: 'fire-hakka',          name: 'Fire Hakka',                nameZH: '火辣客家炒麵',         description: 'Stir-fried hakka noodles with a fiery spice blend.',                             descriptionZH: '火辣香料混合物翻炒的客家麵條。',             price: 370, isVeg: false, spiceLevel: 3 },
    ],
  },

  // ── SOUTH INDIAN SPECIALS ──────────────────────────────────────────────────
  {
    id: 'south-indian',
    name: 'South Indian',
    nameZH: '南印度特色料理',
    description: 'Authentic South Indian specialties — crispy dosas, soft idlis and more',
    descriptionZH: '正宗南印度特色菜——酥脆薄餅、柔軟米糕等',
    dishes: [
      { id: 'masala-dosa',       name: 'Masala Dosa',         nameZH: '印度薄餅',           description: 'Crispy fermented rice crepe filled with spiced potato masala.',                         descriptionZH: '酥脆發酵米薄餅填入香料馬鈴薯瑪沙拉。',     price: 350, isVeg: true,  spiceLevel: 1, chefRecommended: true },
      { id: 'egg-masala-dosa',   name: 'Egg Masala Dosa',     nameZH: '雞蛋馬薩拉印度薄餅', description: 'Crispy dosa with spiced egg and potato filling.',                                       descriptionZH: '酥脆薄餅填入香料蛋和馬鈴薯。',               price: 400, isVeg: false, spiceLevel: 1 },
      { id: 'chenna-masala-dosa',name: 'Chenna Masala Dosa',  nameZH: '鷹嘴豆馬薩拉印度薄餅', description: 'Crispy dosa with a spiced chickpea filling.',                                       descriptionZH: '酥脆薄餅填入香料鷹嘴豆。',                   price: 400, isVeg: true,  spiceLevel: 2 },
      { id: 'idli',              name: 'Idli',                nameZH: '印度蒸米糕',         description: 'Steamed fermented rice cakes, soft and fluffy — served with sambar and chutney.',     descriptionZH: '蒸發酵米糕，鬆軟綿密——搭配三巴汁和酸辣醬。', price: 350, isVeg: true,  spiceLevel: 0 },
      { id: 'sambar-dosa',       name: 'Sambar Dosa',         nameZH: '三巴薄餅',           description: 'Crispy dosa served with sambar and coconut chutney.',                                 descriptionZH: '酥脆薄餅搭配三巴汁和椰子酸辣醬。',           price: 550, isVeg: true,  spiceLevel: 1 },
      { id: 'idli-grill',        name: 'Idli Grill',          nameZH: '印度烤米糕',         description: 'Pan-fried idli with spices for a crispy exterior and soft interior.',                  descriptionZH: '配香料煎烤的伊德利，外酥內軟。',               price: 350, isVeg: true,  spiceLevel: 1 },
      { id: 'chicken-dosa',      name: 'Chicken Dosa',        nameZH: '雞肉印度薄餅',       description: 'Crispy dosa with a spiced chicken filling.',                                           descriptionZH: '酥脆薄餅填入香料雞肉。',                     price: 370, isVeg: false, spiceLevel: 2 },
    ],
  },

  // ── DESSERTS ───────────────────────────────────────────────────────────────
  {
    id: 'desserts',
    name: 'Desserts',
    nameZH: '香甜小品',
    description: 'Traditional Indian sweets to end your meal on a royal note',
    descriptionZH: '傳統印度甜點，以皇室風格結束您的用餐',
    dishes: [
      { id: 'gulab-jamun',        name: 'Gulab Jamun',        nameZH: '蜜汁黃金球',   description: 'Soft milk solid dumplings soaked in rose-scented sugar syrup. India\'s most beloved dessert.', descriptionZH: '柔軟牛奶丸子浸泡在玫瑰香糖漿中。印度最受喜愛的甜點。', price: 90,  isVeg: true, spiceLevel: 0, chefRecommended: true },
      { id: 'kashmiri-kheer',     name: 'Kasmeeri Kheer',     nameZH: '牛奶米布丁',   description: 'Slow-cooked rice pudding with saffron, cardamom, garnished with pistachios and almonds.',      descriptionZH: '慢燉米布丁，加番紅花、豆蔻，並用開心果和杏仁裝飾。',     price: 90,  isVeg: true, spiceLevel: 0 },
      { id: 'carrot-halwa',       name: 'Carrot Halwa',       nameZH: '印度紅蘿蔔丁', description: 'Classic Indian carrot pudding slow-cooked with milk, ghee, and cardamom.',                       descriptionZH: '經典印度胡蘿蔔布丁配牛奶、印度酥油和豆蔻慢燉。',         price: 90,  isVeg: true, spiceLevel: 0 },
      { id: 'custard-fruit-salad',name: 'Custard Fruit Salad',nameZH: '卡士達水果沙拉', description: 'Fresh seasonal fruits in a creamy vanilla custard sauce.',                                    descriptionZH: '新鮮時令水果配奶油香草卡士達醬。',                       price: 120, isVeg: true, spiceLevel: 0 },
    ],
  },

  // ── DRINKS ─────────────────────────────────────────────────────────────────
  {
    id: 'drinks',
    name: 'Drinks',
    nameZH: '飲料',
    description: 'Indian drinks, refreshing lassis, soft drinks and bar selection',
    descriptionZH: '印度飲品、清爽拉西、碳酸飲料及酒吧精選',
    dishes: [
      { id: 'hot-masala-tea',    name: 'Indian Hot Masala Milk Tea',     nameZH: '印度熱奶茶',     description: 'Aromatic spiced tea brewed with ginger, cardamom, cinnamon and milk.',       descriptionZH: '用薑、豆蔻、肉桂和牛奶沖泡的芳香香料熱奶茶。',   price: 90,   isVeg: true, spiceLevel: 0 },
      { id: 'cold-masala-tea',   name: 'Indian Cold Masala Milk Tea',    nameZH: '印度冰奶茶',     description: 'Chilled masala milk tea — spiced and refreshing.',                          descriptionZH: '冰鎮香料奶茶——香料味，清爽宜人。',                 price: 120,  isVeg: true, spiceLevel: 0 },
      { id: 'plain-lassi',       name: 'Plain Lassi',                    nameZH: '印度優格奶昔',   description: 'Classic chilled yogurt drink — cooling and refreshing.',                    descriptionZH: '經典冰鎮優格飲料——清涼爽口。',                     price: 90,   isVeg: true, spiceLevel: 0 },
      { id: 'sweet-lassi',       name: 'Sweet Lassi',                    nameZH: '甜優格奶昔',     description: 'Sweetened yogurt drink with a hint of rose water.',                         descriptionZH: '加入少許玫瑰水的甜優格飲料。',                     price: 95,   isVeg: true, spiceLevel: 0 },
      { id: 'butter-milk',       name: 'Butter Milk Jach',               nameZH: '印度煉乳奶茶',   description: 'Chilled spiced buttermilk — a classic Indian digestive drink.',              descriptionZH: '冰鎮香料白脫牛奶——經典印度助消化飲料。',           price: 100,  isVeg: true, spiceLevel: 0 },
      { id: 'rose-lassi',        name: 'Rose Lassi',                     nameZH: '玫瑰優格奶昔',   description: 'Creamy yogurt drink with rose syrup and a delicate floral aroma.',          descriptionZH: '奶油優格飲料配玫瑰糖漿和精緻花香。',               price: 120,  isVeg: true, spiceLevel: 0 },
      { id: 'mango-lassi',       name: 'Mango Lassi',                    nameZH: '芒果優格奶昔',   description: 'Thick, creamy yogurt drink blended with fresh mango pulp.',                 descriptionZH: '濃厚奶油優格飲料，與新鮮芒果果肉混合。',           price: 120,  isVeg: true, spiceLevel: 0, chefRecommended: true },
      { id: 'lemon-masala-juice',name: 'Lemon Masala Flavored Juice',    nameZH: '印度香料檸檬果汁', description: 'Fresh lemon juice with Indian masala spices — tangy and refreshing.',    descriptionZH: '新鮮檸檬汁配印度瑪沙拉香料——酸爽清新。',           price: 100,  isVeg: true, spiceLevel: 1 },
      { id: 'coke',              name: 'Coke',                           nameZH: '可樂',           description: 'Classic Coca-Cola.',                                                        descriptionZH: '經典可口可樂。',                                   price: 50,   isVeg: true, spiceLevel: 0 },
      { id: 'sprite',            name: 'Sprite',                         nameZH: '雪碧',           description: 'Refreshing lemon-lime carbonated drink.',                                    descriptionZH: '清爽檸檬青檸碳酸飲料。',                           price: 50,   isVeg: true, spiceLevel: 0 },
      { id: 'fanta',             name: 'Fanta',                          nameZH: '芬達',           description: 'Sweet and fruity orange soda.',                                             descriptionZH: '甜蜜果味橙味汽水。',                               price: 50,   isVeg: true, spiceLevel: 0 },
      { id: 'orange-juice',      name: 'Orange Juice',                   nameZH: '柳橙汁',         description: 'Fresh orange juice.',                                                       descriptionZH: '新鮮柳橙汁。',                                     price: 50,   isVeg: true, spiceLevel: 0 },
      { id: 'taiwan-beer',       name: 'Taiwan Beer',                    nameZH: '台灣啤酒',       description: 'Classic Taiwan Beer — light and refreshing.',                               descriptionZH: '經典台灣啤酒——清淡爽口。',                         price: 100,  isVeg: true, spiceLevel: 0 },
      { id: 'kingfisher',        name: 'KingFisher Beer',                nameZH: '印度啤酒',       description: 'India\'s most popular beer — crisp and refreshing.',                       descriptionZH: '印度最受歡迎的啤酒——清脆爽口。',                   price: 120,  isVeg: true, spiceLevel: 0 },
      { id: 'corona',            name: 'Corona Beer',                    nameZH: '可樂娜',         description: 'Premium Mexican lager, best served with a lime wedge.',                    descriptionZH: '優質墨西哥拉格啤酒，最好搭配青檸片飲用。',         price: 120,  isVeg: true, spiceLevel: 0 },
      { id: 'vodka-lime',        name: 'Vodka Lime',                     nameZH: '伏特加萊姆',     description: 'Classic vodka with fresh lime juice.',                                      descriptionZH: '經典伏特加配新鮮青檸汁。',                         price: 170,  isVeg: true, spiceLevel: 0 },
      { id: 'whisky-smash',      name: 'Whisky Smash',                   nameZH: '威士忌斯瑪旭',   description: 'Whisky cocktail with mint, lemon and soda.',                                descriptionZH: '威士忌雞尾酒配薄荷、檸檬和蘇打水。',               price: 170,  isVeg: true, spiceLevel: 0 },
      { id: 'red-wine',          name: 'Red Wine',                       nameZH: '紅酒',           description: 'Selection of premium red wines.',                                           descriptionZH: '精選優質紅酒。',                                   price: 700,  isVeg: true, spiceLevel: 0 },
      { id: 'johnnie-walker',    name: 'Johnnie Walker Black Label',     nameZH: '約翰走路黑牌',   description: 'Premium Scotch whisky, aged 12 years — smooth and complex.',               descriptionZH: '優質蘇格蘭威士忌，陳釀12年——順滑複雜。',           price: 1400, isVeg: true, spiceLevel: 0 },
    ],
  },
]

export const featuredDishes = [
  {
    id: 'featured-hyd-biryani',
    name: 'Hyderabad Dhum Biryani',
    nameZH: '海德巴拉印度香飯',
    description: 'Our legendary crown jewel — extra long grain basmati cooked with special aroma spices. Available in chicken, lamb or shrimp.',
    descriptionZH: '我們傳奇的皇冠明珠 — 超長粒印度香米配特製芳香香料烹製。可選雞肉、羊肉或蝦。',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
    price: 'NT$395',
    tag: "Chef's Special",
  },
  {
    id: 'featured-tandoori',
    name: 'Tandoori Chicken',
    nameZH: '坦都爐烤雞',
    description: 'Chicken marinated overnight in yogurt and a royal blend of spices, char-grilled to perfection in our clay oven.',
    descriptionZH: '雞肉在優格和皇家香料混合物中醃製一夜，在陶製爐中完美炭烤。',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
    price: 'NT$380',
    tag: 'Tandoor Favourite',
  },
  {
    id: 'featured-palak-paneer',
    name: 'Palak Paneer',
    nameZH: '印度菠菜燉起司',
    description: 'Indian cottage cheese in vibrant spinach puree with aromatic spices. A vegetarian masterpiece.',
    descriptionZH: '印度芝士在充滿活力的菠菜泥中，配芳香香料。素食傑作。',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
    price: 'NT$330',
    tag: 'Vegetarian Favourite',
  },
  {
    id: 'featured-masala-dosa',
    name: 'Masala Dosa',
    nameZH: '印度薄餅',
    description: 'Authentic South Indian crispy fermented rice crepe filled with spiced potato masala — a timeless classic.',
    descriptionZH: '正宗南印度酥脆發酵米薄餅填入香料馬鈴薯瑪沙拉——永恆的經典。',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80',
    price: 'NT$350',
    tag: 'South Indian',
  },
]
