import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(""); // To manage the search input
  const [results, setResults] = useState([]); // To store the search results
  const [error, setError] = useState(""); // To store error messages, if any

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch("/product/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: searchTerm }),
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.products); // Update the results state
        setError(""); // Clear any previous error
      } else {
        setError(data.message || "No products found.");
        setResults([]);
      }
    } catch (err) {
      setError("An error occurred while searching.");
      setResults([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Category"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <SearchIcon />
        </button>
      </form>

      <div className="mt-4 w-full max-w-lg">
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
            <ul className="grid grid-cols-1 gap-4">
              {results.map((product) => (
                <li
                  key={product._id}
                  className="border rounded p-4 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{product.name}</h4>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
