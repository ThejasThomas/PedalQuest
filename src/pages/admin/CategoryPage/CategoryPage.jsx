import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, MoreVertical, Package2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { axiosMultipartInstance } from '../../../api/axiosInstance';
import AddCategory from '../../../components/admin/AddCategory/AddCategory';
import EditCategory from '../../../components/admin/AddCategory/EditCategory';

function EmptyState({ onAddCategory }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
        <Package2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-white mb-2">No Categories Yet</h3>
        <p className="text-gray-400 mb-6">Get started by creating your first category</p>
        <button
          onClick={onAddCategory}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
        >
          <Plus className="h-4 w-4" />
          Create Category
        </button>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredCategories = filterCategories(allCategories, searchQuery, activeFilter, selectedDate);
    setCategories(filteredCategories);
  }, [allCategories, searchQuery, activeFilter, selectedDate]);

  const fetchCategories = async () => {
    try {
      const response = await axiosMultipartInstance.get('/admin/category');
      if (response.data?.categories && Array.isArray(response.data.categories)) {
        setAllCategories(response.data.categories);
      } else {
        toast.error('Invalid data format received');
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error fetching categories:', error);
    }
  };

  const filterCategories = (categoryList, searchTerm, filter, date) => {
    return categoryList.filter((category) => {
      const matchesSearch = !searchTerm || 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !date || 
        new Date(category.createdAt).toDateString() === new Date(date).toDateString();
      return matchesSearch && matchesDate;
    });
  };

  const handleCategoryAdded = (newCategory) => {
    if (newCategory) {
      setAllCategories((prev) => [...prev, newCategory]);
      toast.success('Category added successfully');
    }
    setIsAddingCategory(false);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    if (updatedCategory) {
      setAllCategories((prev) => 
        prev.map(cat => cat._id === updatedCategory._id ? updatedCategory : cat)
      );
      toast.success('Category updated successfully');
    }
    setIsEditingCategory(false);
    setSelectedCategory(null);
  };

  const toggleActionMenu = (categoryId) => {
    setOpenActionMenuId(openActionMenuId === categoryId ? null : categoryId);
  };

  const renderContent = () => {
    if (isAddingCategory) {
      return <AddCategory
        onCancel={() => setIsAddingCategory(false)}
        onCategoryAdded={handleCategoryAdded}
      />;
    }

    if (isEditingCategory && selectedCategory) {
      return <EditCategory
        category={selectedCategory}
        onCancel={() => {
          setIsEditingCategory(false);
          setSelectedCategory(null);
        }}
        onCategoryUpdated={handleCategoryUpdated}
      />;
    }

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Categories</h1>
              <div className="text-sm text-gray-400 flex items-center gap-2">
                <span>Dashboard</span>
                <span>•</span>
                <span>Category List</span>
              </div>
            </div>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 transition rounded-lg flex items-center gap-2"
            >
              <Plus size={16} />
              Add Category
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border rounded-lg px-3 py-2 bg-white/10">
              <Search size={16} className="mr-2" />
              <input
                type="text"
                placeholder="Search categories..."
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

          {categories.length === 0 ? (
            <EmptyState onAddCategory={() => setIsAddingCategory(true)} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left bg-white/5 rounded-lg">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Description</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border-b border-gray-700 hover:bg-white/10">
                      <td className="py-2 px-4">
                        <img 
                          src={category.images[0]} 
                          alt={category.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      </td>
                      <td className="py-2 px-4">{category.name}</td>
                      <td className="py-2 px-4">{category.description}</td>
                      <td className="py-2 px-4">
                        <div className="relative">
                          <button
                            onClick={() => toggleActionMenu(category._id)}
                            className="p-2 rounded-full hover:bg-white/10"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {openActionMenuId === category._id && (
                            <div className="absolute top-full right-0 mt-2 bg-black text-white shadow-lg rounded-lg z-10">
                              <button
                                onClick={() => {
                                  setSelectedCategory(category);
                                  setIsEditingCategory(true);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-white/10"
                              >
                                <Edit size={16} className="mr-2 inline" /> Edit
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
          )}
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
