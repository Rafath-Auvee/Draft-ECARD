export let data = [
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Single Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
  {
    imageUrl: "/Home/card_preview.png",
    title: "Marble Textured Welcome Board",
    price: "৳2,500",
    buttonText: "View Design",
    cardType: "Multiple Page",
  },
];


// Function to randomize the price and title
const randomizeData = (dataArray) => {
  return dataArray.map((item) => {
    // Randomize the price
    const randomPrice = Math.floor(Math.random() * 9000) + 1000;
    item.price = `৳${randomPrice}`;

    // Randomize the title
    // const randomTitle = "Random Title"; // Replace with your randomization logic
    // item.title = randomTitle;

    return item;
  });
};

// Randomize the data array
data = randomizeData(data);

// Add popularity rating
data = data.map((item) => {
  // Generate a random popularity rating between 1 and 5
  const randomPopularity = Math.floor(Math.random() * 5) + 1;
  item.popularity = randomPopularity;

  return item;
});