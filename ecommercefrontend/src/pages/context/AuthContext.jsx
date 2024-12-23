import { createContext, useEffect, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  // Function to update user data
  const updateUser = (data) => {
    setCurrentUser(data);
  };

  // Sync the current user with localStorage
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem("user", JSON.stringify(currentUser));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
