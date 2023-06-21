    const randomizedData = data.map((item) => {
      // Generate a random price value between minValue and maxValue
      const randomPrice =
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      item.price = randomPrice.toString();

      return item;
    });