import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Navbar from "./components/Navbar";
import ProductForm from "./pages/ProductForm";
import EditForm from "./pages/EditForm";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add" element={<ProductForm />} />
            <Route path="/edit/:productId" element={<EditForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
