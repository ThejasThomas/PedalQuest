import React, { useState } from 'react';
import { Bell, Mail, Plus, X, Upload } from 'lucide-react';
import axios from 'axios';
import { axiosInstance } from '../../../api/axiosInstance';

export default function AddCategory({ onCancel, onCategoryAdded }) {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleImageChange = async (file) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        setIsUploading(true);
        setError('');
        
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'pedalQuest'); 
          console.log(categoryData);
          

        
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/pedalquest/image/upload', 
            formData,
           
          );

          const imageUrl = response.data.secure_url;
          
          setCategoryData(prev => ({ ...prev, image: imageUrl }));
          setImagePreview(imageUrl);
          setError('');
        } catch (error) {
          setError('Error uploading image to Cloudinary');
          console.error('Cloudinary upload error:', error);
        } finally {
          setIsUploading(false);
        }
      } else {
        setError('Please upload an image file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryData.name || !categoryData.image) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/addcategory', {
        name: categoryData.name,
        image: categoryData.image ,
        description:categoryData.description,
        
      });

      if (response.data.success) {
        onCategoryAdded(response.data.category);
        onCancel();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error adding category");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 p-4">
        {/* Header content remains the same */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/api/placeholder/40/40" alt="Logo" className="h-10 w-10" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-800 rounded-md">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
            </button>
            <button className="relative p-2 hover:bg-gray-800 rounded-md">
              <Mail className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <img src="/api/placeholder/32/32" alt="Profile" className="h-8 w-8 rounded-full" />
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Add Category</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Dashboard</span>
              <span>›</span>
              <span>Categories</span>
              <span>›</span>
              <span>Add Category</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="px-4 py-2 border border-gray-800 rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Add Category'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Thumbnail</h2>
            <div 
              className="border-2 border-dashed border-gray-700 rounded-lg p-8"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageDrop}
            >
              {imagePreview ? (
                <div className="relative aspect-square">
                  <img 
                    src={imagePreview} 
                    alt="Category thumbnail" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button 
                    onClick={() => {
                      setImagePreview(null);
                      setCategoryData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/75"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-10 w-10 mx-auto mb-4 text-gray-500" />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag and drop image here, or click add image
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                    <span className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer inline-block">
                      Add Image
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 bg-gray-900 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryData.name}
                  onChange={(e) => setCategoryData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Type category name here..."
                  className="w-full bg-black border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={categoryData.description}
                  onChange={(e) => setCategoryData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Type category description here..."
                  rows={6}
                  className="w-full bg-black border border-gray-800 rounded-md px-4 py-2 focus:outline-none focus:border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}