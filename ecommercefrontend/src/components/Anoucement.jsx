import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Announcement = () => {
  const items = [
    '| USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 |',
    ' FREE SHIPPING |',
    '| COD AVAILABLE |',
    
  ];

  const [style, api] = useSpring(() => ({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    loop: true,
    config: { duration: 30000}, // Adjust duration for scroll speed
  }));

  return (
    <div className="h-[30px] bg-yellow-500 text-black overflow-hidden flex items-center">
      <animated.div style={style} className="whitespace-nowrap flex">
        {items.map((text, index) => (
          <span key={index} className="mx-4">
            {text}
          </span>
        ))}
        {/* Repeating items for continuous scrolling */}
        {items.map((text, index) => (
          <span key={`repeat-${index}`} className="mx-4">
            {text}
          </span>
        ))}
      </animated.div>
    </div>
  );
};

export default Announcement;
