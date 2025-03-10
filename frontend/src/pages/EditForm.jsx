import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditForm() {
  const { productId } = useParams(); // Get product ID from URL
  const location = useLocation(); // Get product data from navigation state
  const navigate = useNavigate(); // For navigation after submission

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
      setPreviewImage(
        `http://localhost:8080/uploads/${location.state.product.image}`
      );
    } else if (productId) {
      fetch(`http://localhost:8080/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setPreviewImage(`http://localhost:8080/uploads/${data.image}`); // Ensure correct path
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [location.state, productId]);

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Show preview of the new image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);

    if (product.image instanceof File) {
      formData.append("image", product.image);
    }

    // Debugging: Log the FormData to check if image is being sent
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      console.log("Product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {productId ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Product Image</label>

          {/* Show existing image preview */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Product Preview"
              className="mt-2 h-32 w-full object-cover rounded border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {productId ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default EditForm;
