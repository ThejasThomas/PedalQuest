import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../../../components/UI/card";
import { Button } from "../../../components/UI/button";
import { Heart, ImageOff } from "lucide-react";
import { axiosInstance } from '../../../api/axiosInstance';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get('/user/products');
      console.log('Products data:', data); // For debugging
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the first image from the images array
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Discover Top Quality Riding Gear
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="relative aspect-square">
                {getProductImage(product) ? (
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gray-100">
                          <span class="text-gray-400">
                            <svg class="w-12 h-12" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z"/>
                              <path fill="currentColor" d="M14.14,11.86l-3,3.87L9,13.14L6,17h12L14.14,11.86z"/>
                            </svg>
                          </span>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ImageOff className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-1">
                  ${product.basePrice ? product.basePrice.toFixed(2) : "N/A"}
                </p>
                {product.discount > 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    {product.discount}% OFF
                  </p>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="default" className="bg-black hover:bg-gray-800">
                    Add to Cart
                  </Button>
                  <Button variant="ghost" className="text-gray-500 hover:text-red-500">
                    <Heart className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <nav className="flex gap-1" aria-label="Pagination">
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className={page === 1 ? "bg-black" : ""}
            >
              {page}
            </Button>
          ))}
        </nav>
      </div>
    </main>
  );
};

export default ProductGrid;