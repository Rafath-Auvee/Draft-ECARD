export let data = [
  {
    imageUrl: "/Home/card_preview.png",
    title: "First Card - Marble Textured Welcome Board",
    price: 3768,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 4032,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 9266,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 7326,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 7611,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 3168,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 9290,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 2731,
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 4216,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 8114,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 478,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 971,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 4824,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: 6018,
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
];



// Add popularity rating
data = data.map((item) => {
  // Generate a random popularity rating between 1 and 5
  const randomPopularity = Math.floor(Math.random() * 5) + 1;
  item.popularity = randomPopularity;

  return item;
});


