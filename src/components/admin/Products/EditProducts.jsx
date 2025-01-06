import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  BellIcon,
  UserCircleIcon,
  SaveIcon,
  XIcon,
  PlusIcon
} from "@heroicons/react/solid";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditProductPage() {
  const { productId } = useParams();
  console.log('id',productId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    description: "",
    basePrice: "",
    discount: "",
    quantity: "",
    category: "",
    tags: "",
    status: "Draft",
    images: "",
  });

  const fetchProducts = async () => {
    if (!productId) {
      console.error("Product ID is not defined");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/admin/product');
      const allProducts = response.data.products;
  
      const matchedProduct = allProducts.find(product => product._id === productId);
  
      if (matchedProduct) {
        setProductData({
          name: matchedProduct.name || "",
          brand: matchedProduct.brand || "",
          description: matchedProduct.description || "",
          basePrice: matchedProduct.basePrice?.toString() || "",
          discount: matchedProduct.discount?.toString() || "",
          quantity: matchedProduct.quantity?.toString() || "",
          category: matchedProduct.category || "",
          tags: matchedProduct.tags || "",
          status: matchedProduct.status || "Draft",
          images: matchedProduct.images || "",
        });
        setImagePreview(matchedProduct.images || "");
      } else {
        console.error("Product not found with ID:", productId);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value || "",
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pedalQuest");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/pedalquest/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        const imageUrl = response.data.secure_url;
        setProductData((prevState) => ({
          ...prevState,
          images: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }
  
    if (!productData.name || !productData.basePrice || !productData.category) {
      console.error("Missing required fields");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/editproduct/${productId}`, // Add productId to URL
        {
          name: productData.name,
          brand: productData.brand,
          description: productData.description,
          basePrice: Number(productData.basePrice),
          discount: Number(productData.discount) || 0,
          quantity: Number(productData.quantity) || 0,
          category: productData.category,
          tags: productData.tags,
          status: productData.status,
          images: productData.images,
        }
      );
      
      console.log("Product updated successfully:", response.data);
      console.error("Error updating product:", 
        error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Logo"
            className="w-10 h-10"
          />
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-96 px-4 py-2 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="h-6 w-6 text-gray-400" />
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
          <span>Thajas Thomas</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-gray-400">
              Dashboard / Product List / Edit Product
            </p>
          </div>
          <div className="space-x-4">
            <button
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-800"
              onClick={() => window.history.back()}
            >
              <XIcon className="h-5 w-5 inline-block mr-2" />
              Cancel
            </button>
            <button
              className={`px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <SaveIcon className="h-5 w-5 inline-block mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">General Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Product Brand"
                  value={productData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  placeholder="Product description"
                  value={productData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            {/* Media */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Media</h2>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="max-h-48 mx-auto"
                    />
                    <button
                      onClick={() => {
                        setImagePreview("");
                        setProductData(prev => ({ ...prev, images: "" }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 p-1 rounded-full"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="upload-image"
                    />
                    <label htmlFor="upload-image" className="cursor-pointer">
                      <PlusIcon className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-400">
                        Drag and drop image here, or click to add image
                      </p>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Pricing and Offer Setting */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Pricing and Offer Setting
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="basePrice"
                  placeholder="Base price"
                  value={productData.basePrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <span className="mr-2">Discount Percentage (%)</span>
                  <input
                    type="text"
                    name="discount"
                    placeholder="0%"
                    value={productData.discount}
                    onChange={handleInputChange}
                    className="w-20 px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Inventory</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="quantity"
                  placeholder="Product quantity"
                  value={productData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Category</h2>
              <div className="space-y-4">
                <select
                  name="category"
                  value={productData.category || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Product Category</option>
                  <option value="Helmets">Helmets</option>
                  <option value="Jackets">Jackets</option>
                </select>
                <select
                  name="tags"
                  value={productData.tags || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select tags</option>
                  <option value="New Arrival">New Arrival</option>
                  <option value="Best Seller">Best Seller</option>
                </select>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Status</h2>
              <select
                name="status"
                value={productData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}