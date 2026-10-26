import React, { useState } from "react";
import "./index.css";

function App() {
  const images = [
    "https://www.wallsnapy.com/img_gallery/gojo-satoru-smiling-sensei-anime-style-wallpaper-448611.jpg",
    "https://images.unsplash.com/photo-1667419674923-9eef9f86c628?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    "https://wallpapercave.com/wp/wp11129660.jpg",
    "https://naruto-official.com/special/anime_gallery/anime-gallery1.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnoqICFfcHlYdI7ETFFRNcC8l6HhH8J0Kv9EcC8McBDA&s=10",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const previousImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return images.length - 1;
      }

      return prevIndex - 1;
    });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === images.length - 1) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>Image Slider</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button onClick={previousImage}>←</button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: "300px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <button onClick={nextImage}>→</button>
      </div>

      <p>
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}

export default App;