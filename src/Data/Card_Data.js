export let data = [
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "6,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "6,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Single Page",
    cardCategory: "singlePageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
    cardCategory: "multiPageCard",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "2,500",
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
