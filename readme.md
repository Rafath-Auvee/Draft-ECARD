  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Card created successfully
        console.log("Card created!");
      } else {
        console.error("Error creating card:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };