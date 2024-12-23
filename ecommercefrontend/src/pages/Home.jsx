import React, { useContext } from "react";
import Slider from "../components/Slider";
import Category from "../components/Category";
import Footer from "../components/Footer";
import ProductList from "./ProductList";
import { AuthContext } from "./context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  // Debugging the currentUser value
  console.log("Current User:", currentUser);

  return (
    <div>
      <Category />
      <Slider />
      <ProductList />
      <Footer />
    </div>
  );
};

export default Home;
