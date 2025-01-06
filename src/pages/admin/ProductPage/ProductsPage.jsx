import React from 'react';
import { useState, useEffect } from 'react';
import { Plus, Search, Edit, MoreVertical } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../api/axiosInstance';
import AddProduct from '../../../components/admin/Products/AddProducts';
import EditProduct from '../../../components/admin/Products/EditProducts';

export function ProductPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Products');
  const [selectedDate, setSelectedDate] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addTab, setAddTab] = useState(false);
  const [editTab, setEditTab] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = filterProducts(allProducts, searchQuery, activeFilter, selectedDate);
    setProducts(filteredProducts);
  }, [allProducts, searchQuery, activeFilter, selectedDate]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/admin/product', { withCredentials: true });
      if (response.data?.products && Array.isArray(response.data.products)) {
        setAllProducts(response.data.products);
      } else {
        toast.error('Invalid data format received');
      }
    } catch (error) {
      toast.error('Failed to fetch products');
      console.error('Fetch Products Error:', error);
    }
  };

  const filterProducts = (productList, searchTerm, filter, date) => {
    return productList.filter((product) => {
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'All Products' || 
        (filter === 'Published' && product.status === 'Published') || 
        (filter === 'Unpublished' && product.status === 'Unpublished');
      const matchesDate = !date || 
        new Date(product.createdAt).toDateString() === new Date(date).toDateString();
      return matchesSearch && matchesFilter && matchesDate;
    });
  };

  const handleAddProduct = (newProduct) => {
    if (newProduct) {
      setAllProducts((prev) => [...prev, newProduct]);
      toast.success('Product added successfully');
    }
    setAddTab(false);
  };

  const handleEditProduct = (product) => {
    if (product) {
      setAllProducts((prev) => prev.map(p => p._id === product._id ? product : p));
      toast.success('Product updated successfully');
    }
    setEditTab(false);
  };

  const handleListingToggle = async (productId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Published' ? 'Unpublished' : 'Published';
      const response = await axiosInstance.patch(`/admin/toggle-listing/${productId}`, {
        status: newStatus
      }, { withCredentials: true });
      
      if (response.data.success) {
        setAllProducts(prev => prev.map(product => 
          product._id === productId 
            ? { ...product, status: newStatus }
            : product
        ));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to update product status');
      console.error('Toggle listing status error:', error);
    }
    setOpenActionMenuId(null);
  };

  const getStatusColor = (status) => {
    return status === 'Published' 
      ? 'bg-green-500/20 text-green-500'
      : 'bg-yellow-500/20 text-yellow-500';
  };

  const toggleActionMenu = (productId) => {
    setOpenActionMenuId(openActionMenuId === productId ? null : productId);
  };

  const renderContent = () => {
    if (addTab) {
      return <AddProduct onSave={handleAddProduct} onCancel={() => setAddTab(false)} />;
    }

    if (editTab && selectedProduct) {
      return <EditProduct 
        product={selectedProduct} 
        onSave={handleEditProduct} 
        onCancel={() => setEditTab(false)} 
      />;
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Products</h1>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span>Dashboard</span>
                <span>•</span>
                <span>Product List</span>
              </div>
            </div>
            <button
              onClick={() => setAddTab(true)}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 transition rounded-lg"
            >
              <Plus size={16} className="mr-2 inline" /> Add Product
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/10">
              <Search size={16} className="mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-white placeholder-gray-400"
              />
            </div>
            <input
              type="date"
              className="px-4 py-2 rounded-lg bg-white/10 text-white"
              value={selectedDate || ''}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {['All Products', 'Published', 'Unpublished'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  activeFilter === filter ? 'bg-blue-500' : 'bg-white/10'
                } hover:bg-white/20`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white/5 rounded-lg">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Stock</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-700 hover:bg-white/10">
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.category}</td>
                    <td className="py-2 px-4">{product.quantity}</td>
                    <td className="py-2 px-4">${product.basePrice}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="relative">
                        <button
                          onClick={() => toggleActionMenu(product._id)}
                          className="p-2 rounded-full hover:bg-white/10"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openActionMenuId === product._id && (
                          <div className="absolute top-full right-0 mt-2 bg-black text-white shadow-lg rounded-lg z-10">
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setEditTab(true);
                                navigate(`/admin/editproducts/${product._id}`);
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-white/10"
                            >
                              <Edit size={16} className="mr-2 inline" /> Edit
                            </button>
                            <button
                              onClick={() => handleListingToggle(product._id, product.status)}
                              className="block w-full text-left px-4 py-2 hover:bg-white/10"
                            >
                              {product.status === 'Published' ? 'Unpublish' : 'Publish'}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default ProductPage;