import { useState, useEffect } from "react";
import { sliderItems } from "../dummyData";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-full h-screen flex relative overflow-hidden"> {/* Adjusted to 50vh */}
      {/* Slider Content */}
      <div
        className="h-full flex transition-transform duration-500"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
      >
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className={`w-screen h-screen flex items-center justify-center bg-cover bg-center`} 
            style={{ backgroundColor: `#${item.bg}`, backgroundImage: `url(${item.img})` }}
           
          >
            {/* Text Overlay */}
            <div className="absolute text-center">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-6">
                {item.title}
              </h1>
              <button className="px-8 py-3 text-lg bg-yellow-500 text-black font-semibold rounded-full hover:bg-pink-700 transition-all">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={() =>
          setSlideIndex((prevIndex) =>
            prevIndex === 0 ? sliderItems.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all"
      >
        ❮
      </button>
      <button
        onClick={() =>
          setSlideIndex((prevIndex) =>
            prevIndex === sliderItems.length - 1 ? 0 : prevIndex + 1
          )
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-200 transition-all"
      >
        ❯
      </button>
    </div>
  );
};

export default Slider;
