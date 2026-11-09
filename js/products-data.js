const PRODUCTS = [
 
    /* Men's */
    {
        id: "wild-elixer-40",
        name: "Wild Elixir",
        size: "40ml",
        price: 100,
        category: "Men's",
        stock: 12,
        image: "WildElixer_40ml.webp",
        description: "Spicy, aromatic and woody. Cinnamon, nutmeg and cardamom with lavender, sandalwood and vetiver. Warm, mature and masculine."
    },
    {
        id: "wild-intense-40",
        name: "Wild Intense",
        size: "40ml",
        price: 100,
        category: "Men's",
        stock: 20,
        image: "WildIntense_40ml.webp",
        description: "Sweet and creamy with candied lemon, rum, orange blossom, vanilla and panacotta. Fresh opening with a warm, sweet dry-down."
    },
    {
        id: "b-man",
        name: "B Man",
        size: "40ml",
        price: 100,
        category: "Men's",
        stock: 8,
        image: "BMan_40ml.webp",
        description: "Clean, masculine and sophisticated. Fresh, woody and easy to wear daily."
    },
    {
        id: "silver-sense",
        name: "Silver Sense",
        size: "80ml",
        price: 200,
        category: "Men's",
        stock: 20,
        image: "SilverSense_80ml.webp",
        description: "Fresh, clean and slightly woody. A versatile everyday masculine scent."
    },
    {
        id: "desire-blue",
        name: "Desire Blue",
        size: "80ml",
        price: 200,
        category: "Men's",
        stock: 20,
        image: "DesireBlue_80ml.jpg",
        description: "Fresh, aquatic and citrusy. Cool, clean and ideal for hot weather."
    },
    {
        id: "black-oud-mens-80",
        name: "Black Oud",
        size: "80ml",
        price: 200,
        category: "Men's",
        stock: 15,
        image: "BlackOud_80ml.jpg",
        description: "Dark, rich and woody with an oud character. Deep, powerful and suited to evenings."
    },
    {
        id: "stallion",
        name: "Stallion",
        size: "80ml",
        price: 200,
        category: "Men's",
        stock: 20,
        image: "Stallion_80ml.webp",
        description: "Warm, masculine and woody. Confident, slightly sweet and mature."
    },
    {
        id: "kashmir-oud",
        name: "Kashmir Oud",
        size: "80ml",
        price: 200,
        category: "Men's",
        stock: 20,
        image: "KashmirOud_80ml.webp",
        description: "Rich oud with warm spices and woods. Smooth, deep and luxurious."
    },
    {
        id: "code-black",
        name: "Code Black",
        size: "75ml",
        price: 250,
        category: "Men's",
        stock: 20,
        image: "CodeBlack_75ml.webp",
        description: "Dark, fresh and masculine. Crisp opening with a deeper woody character."
    },
    {
        id: "king",
        name: "King",
        size: "",
        price: 250,
        category: "Men's",
        stock: 10,
        image: "King.webp",
        description: "Rich and commanding with a warm masculine character. Elegant and confident."
    },
    {
        id: "nomads-land",
        name: "Nomad's Land",
        size: "",
        price: 250,
        category: "Men's",
        stock: 20,
        image: "Nomad'sLand.webp",
        description: "Woody, earthy and adventurous. Dry, masculine and outdoorsy."
    },
    {
        id: "eight8",
        name: "Eight8",
        size: "",
        price: 250,
        category: "Men's",
        stock: 20,
        image: "Eight8.jpg",
        description: "Fresh, modern and slightly sweet. Versatile and youthful."
    },
    {
        id: "oceanic-dark",
        name: "Oceanic Dark",
        size: "",
        price: 250,
        category: "Men's",
        stock: 20,
        image: "OceanicDark.webp",
        description: "Fresh aquatic notes mixed with darker woods. Clean but mysterious."
    },
    {
        id: "z",
        name: "Z",
        size: "",
        price: 250,
        category: "Men's",
        stock: 20,
        image: "Z.webp",
        description: "Fresh, aromatic and woody. Modern, clean and easy to wear."
    },
    {
        id: "club-2-club-homme",
        name: "Club 2 Club Homme",
        size: "",
        price: 280,
        category: "Men's",
        stock: 20,
        image: "Club2ClubHomme.webp",
        description: "Citrusy and fruity with smoky leather and deep woods. Bold, masculine and attention-grabbing."
    },
    {
        id: "cocktail-intense",
        name: "Cocktail Intense",
        size: "",
        price: 550,
        category: "Men's",
        stock: 20,
        image: "CoctailIntense.webp",
        description: "Sweet, boozy and spicy with cognac, cinnamon, plum, vanilla and sandalwood. Warm, luxurious and excellent for evenings/cold weather."
    },
 
    /* Women's */
    {
        id: "wicked",
        name: "Wicked",
        size: "40ml",
        price: 100,
        category: "Women's",
        stock: 20,
        image: "Wicked_40ml.webp",
        description: "Dark, sweet and vanilla-heavy with freesia and brown sugar. Sweet, seductive and feminine-leaning."
    },
    {
        id: "arya",
        name: "Arya",
        size: "40ml",
        price: 100,
        category: "Women's",
        stock: 20,
        image: "Oud&Vanilla_40ml.webp",
        description: "Floral and fruity with orchid, tangerine and tropical fruits over vanilla, musk and sandalwood. Sweet, playful and feminine."
    },
    {
        id: "sweet-candle",
        name: "Sweet Candle",
        size: "80ml",
        price: 200,
        category: "Women's",
        stock: 20,
        image: "SweetCandle_80ml.webp",
        description: "Sweet, warm and soft. Comforting, feminine and slightly gourmand."
    },
    {
        id: "dark-secret",
        name: "Dark Secret",
        size: "80ml",
        price: 200,
        category: "Women's",
        stock: 20,
        image: "DarkSecret_80ml.webp",
        description: "Darker, sweet and sensual. Mysterious and more suited to evenings."
    },
    {
        id: "yaqeen",
        name: "Yaqeen",
        size: "",
        price: 250,
        category: "Women's",
        stock: 20,
        image: "Yaqeen.webp",
        description: "Sweet, floral and warm. Elegant and feminine with a noticeable richness."
    },
    {
        id: "nour",
        name: "Nour",
        size: "",
        price: 250,
        category: "Women's",
        stock: 20,
        image: "Nour.webp",
        description: "Soft, sweet and floral. Light, feminine and easy to wear."
    },
    {
        id: "kitty-cat",
        name: "Kitty Cat",
        size: "",
        price: 250,
        category: "Women's",
        stock: 6,
        image: "KittyCat.webp",
        description: "Playful, sweet and youthful. Fruity/floral and fun."
    },
    {
        id: "kamira-delish-pistachio-kiss",
        name: "Kamira Delish Pistachio Kiss",
        size: "",
        price: 250,
        category: "Women's",
        stock: 20,
        image: "KamirDelishPistachioKiss.webp",
        description: "Creamy pistachio sweetness with a gourmand character. Nutty, dessert-like and very feminine."
    },
    {
        id: "kamira-sweet-lemon-drop",
        name: "Kamira Sweet Lemon Drop",
        size: "",
        price: 250,
        category: "Women's",
        stock: 20,
        image: "KamiraSweetLemonDrop.jpg",
        description: "Bright lemon sweetness with a sugary gourmand feel. Fresh, citrusy and playful."
    },
 
    /* Unisex */
    {
        id: "classic-white-oud",
        name: "Classic White Oud",
        size: "40ml",
        price: 100,
        category: "Unisex",
        stock: 20,
        image: "ClassicWhiteOud_40ml.webp",
        description: "Clean, smooth oud with a soft woody character. Elegant and easy to wear."
    },
    {
        id: "black-oud-40",
        name: "Black Oud",
        size: "40ml",
        price: 100,
        category: "Unisex",
        stock: 20,
        image: "BlackOud_40ml.jpg",
        description: "Darker and heavier than White Oud. Rich, woody and mysterious."
    },
    {
        id: "oud-d-great-40",
        name: "Oud D Great",
        size: "40ml",
        price: 100,
        category: "Unisex",
        stock: 20,
        image: "OudDGreat.webp",
        description: "Saffron, nutmeg and lavender over rich oud, patchouli and musk. Warm, powerful and luxurious."
    },
    {
        id: "oud-vanilla-40",
        name: "Oud & Vanilla",
        size: "40ml",
        price: 100,
        category: "Unisex",
        stock: 20,
        image: "Oud&Vanilla_40ml.webp",
        description: "Oud softened by creamy vanilla. Warm, sweet, smooth and luxurious."
    },
    {
        id: "gold-oud-intense",
        name: "Gold Oud Intense",
        size: "80ml",
        price: 200,
        category: "Unisex",
        stock: 20,
        image: "GoldOudIntense_80ml.webp",
        description: "Rich oriental oud with a warm, spicy character. Bold, luxurious and long-lasting."
    },
    {
        id: "oud-vanilla-80",
        name: "Oud & Vanilla",
        size: "80ml",
        price: 200,
        category: "Unisex",
        stock: 20,
        image: "Oud&Vanilla_40ml.webp",
        description: "Sweet vanilla balanced with deep oud. Creamy, warm and sophisticated."
    },
    {
        id: "oud-d-great-80",
        name: "Oud D Great",
        size: "80ml",
        price: 200,
        category: "Unisex",
        stock: 20,
        image: "OudDgreat_80ml.webp",
        description: "Spicy saffron and nutmeg, rich oud and a musky/patchouli base. Strong and sophisticated."
    },
    {
        id: "gold-python",
        name: "Gold Python",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "GoldPython_100ml.webp",
        description: "Warm, rich and slightly sweet. Smooth, luxurious and attention-grabbing."
    },
    {
        id: "white-oud",
        name: "White Oud",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "WhiteOud_100ml.webp",
        description: "Cleaner and softer than darker oud fragrances. Fresh, woody and elegant."
    },
    {
        id: "black-oud-100",
        name: "Black Oud",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "BlackOud_100ml.jpg",
        description: "Deep oud with a dark woody character. Strong, mature and mysterious."
    },
    {
        id: "cape-studio",
        name: "Cape Studio",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "CapeStudio_100ml.webp",
        description: "Fresh, modern and sophisticated. Clean enough for daytime but polished enough for evenings."
    },
    {
        id: "wild-elixer-100",
        name: "Wild Elixir",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "WildElixer_100ml.webp",
        description: "Spicy aromatic opening with cinnamon, nutmeg and cardamom, followed by lavender, sandalwood and vetiver. Warm and masculine-leaning."
    },
    {
        id: "wild-intense-100",
        name: "Wild Intense",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "WildIntense_100ml.webp",
        description: "Candied lemon, creamy panacotta, orange blossom, rum and vanilla. Sweet, rich and masculine-leaning."
    },
    {
        id: "oud-vanilla-100",
        name: "Oud & Vanilla",
        size: "100ml",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "Oud&Vanilla_100ml.webp",
        description: "Smooth vanilla combined with rich oud. Sweet, warm and sophisticated."
    },
    {
        id: "kamira-java-oud-affair",
        name: "Kamira Java Oud Affair",
        size: "",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "KamiraJavaOudAffair.webp",
        description: "Rich oud with warm, sweet and woody tones. Dark, luxurious and sensual."
    },
    {
        id: "oud-d-africa",
        name: "Oud D Africa",
        size: "",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "OudDAfrica.webp",
        description: "Woody oud with an oriental character. Rich, elegant and distinctive."
    },
    {
        id: "on-the-rocks",
        name: "On the Rocks",
        size: "",
        price: 250,
        category: "Unisex",
        stock: 20,
        image: "OnTheRocks.webp",
        description: "Fresh, crisp and slightly woody. Cool, clean and versatile."
    },
    {
        id: "barakkat-540",
        name: "Barakkat 540",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 3,
        image: "Barakkat540.jpg",
        description: "Airy, sweet and luxurious with saffron, jasmine, amber and woods. Elegant, sweet and highly noticeable."
    },
    {
        id: "amber-eve",
        name: "Ambre Eve",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 20,
        image: "AmbreEve.jpg",
        description: "Warm amber, vanilla, tonka and benzoin with a slightly resinous character. Sweet, warm and sophisticated."
    },
    {
        id: "satin-oud",
        name: "Satin Oud",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 2,
        image: "Satin Oud.jpg",
        description: "Rose, violet and oud with vanilla, amber and benzoin underneath. Rich, rosy, smooth and luxurious."
    },
    {
        id: "kashmiri-oud-exclusive",
        name: "Kashmiri Oud Exclusive",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 20,
        image: "KashmirOudExclusive.webp",
        description: "Deep oud with warm spices and woods. Rich, mature and luxurious."
    },
    {
        id: "white-oud-exclusive",
        name: "White Oud Exclusive",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 20,
        image: "WhiteOudExclusive.webp",
        description: "Smooth, clean oud with a softer woody character. Elegant and refined."
    },
    {
        id: "silver-python",
        name: "Silver Python",
        size: "",
        price: 300,
        category: "Unisex",
        stock: 20,
        image: "SilverPython.webp",
        description: "Fresh, woody and slightly sweet. Modern, clean and versatile."
    },
    {
        id: "montera-instant-love",
        name: "Montera Instant Love",
        size: "",
        price: 350,
        category: "Unisex",
        stock: 20,
        image: "MonteraInstantLove.jpg",
        description: "Sweet, warm and romantic with a smooth gourmand/floral character. Soft, attractive and date-night friendly."
    },
    {
        id: "qaaed",
        name: "Qaa'ed",
        size: "",
        price: 550,
        category: "Unisex",
        stock: 4,
        image: "Qaaéd.jpg",
        description: "Cinnamon, cardamom and saffron lead into sandalwood and oud, finishing with vanilla, amber and leather. Warm, spicy, rich and powerful."
    }
];