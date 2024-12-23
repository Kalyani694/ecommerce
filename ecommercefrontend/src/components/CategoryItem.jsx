import React from 'react';

const CategoryItem = ({ item }) => {
  return (
    <div className="flex flex-col items-center m-2">
      {/* Image Section */}
      <img
        src={item.img}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-full border border-gray-200"
      />
      {/* Title Section */}
      <h1 className="text-sm text-gray-800 mt-2">{item.title}</h1>
    </div>
  );
};

export default CategoryItem;
