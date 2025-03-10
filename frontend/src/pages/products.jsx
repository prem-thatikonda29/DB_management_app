import React, { useEffect, useState } from "react";
import { AlignJustify, Trash, LayoutGrid, X, PenIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Reusable Modal Component
const ProductModal = ({ product, onClose, onDelete, onEdit }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <div className="flex space-x-4">
            <Link to={`/edit/${product._id}`} state={{ product }}>
              <PenIcon className="text-blue-500" />
            </Link>
            <button onClick={() => onDelete(product._id)}>
              <Trash className="text-red-500" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Price:</span> $ {product.price}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Description:</span>{" "}
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Toggle between grid and list views
  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  // Open product modal
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // Close product modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Function to redirect to editing of product's page
  const handleEdit = (product) => {
    navigate(`/edit/${product._id}`, { state: { product } });
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      console.log("Product deleted successfully");

      // Remove the deleted product from state
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod._id !== productId)
      );

      // Close the modal after deletion
      closeModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section className="w-full min-h-screen bg-white px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Products Page</h1>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          {isGridView ? <AlignJustify /> : <LayoutGrid />}
        </button>
      </div>

      {/* Products Container */}
      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "space-y-6"
        }`}
      >
        {products.length === 0 ? (
          <h4 className="text-gray-600">No products available</h4>
        ) : (
          products.map((prod) => (
            <div
              key={prod._id}
              className={`${
                isGridView
                  ? "bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                  : "bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300 flex items-center space-x-6"
              }`}
            >
              {/* Product Image */}
              {!isGridView && (
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={
                      prod.image
                        ? `http://localhost:8080/uploads/${prod.image}`
                        : "http://localhost:8080/uploads/no_picture.png"
                    }
                    alt={prod.name || "Default product image"}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}

              {/* Product Details */}
              <div className={`${isGridView ? "" : "flex-1"}`}>
                {isGridView && (
                  <div>
                    <img
                      src={
                        prod.image
                          ? `http://localhost:8080/uploads/${prod.image}`
                          : "http://localhost:8080/uploads/no_picture.png"
                      }
                      alt={prod.name || "Default product image"}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {prod.name}
                </h3>
                <h4 className="text-lg text-blue-600 font-medium mb-2">
                  $ {prod.price}
                </h4>
                <p className="text-gray-600 mb-4">
                  {prod.description.length > 40
                    ? prod.description.slice(0, 40) + "..."
                    : prod.description}
                </p>
                <button
                  onClick={() => openModal(prod)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          onDelete={deleteProduct}
          onEdit={handleEdit}
        />
      )}
    </section>
  );
};

export default Products;
