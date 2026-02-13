'use client';

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

export default function BookmarkForm({ onAddBookmark }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData?.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData?.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (!formData?.url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        const url = new URL(formData?.url);
        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.url = 'URL must start with http:// or https://';
        }
      } catch {
        newErrors.url = 'Please enter a valid URL (e.g., https://example.com)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBookmark = async () => {
    try {
      setLoading(true);

      const { data } = await api.post('/api/bookmark/add-bookmark', formData);

      console.log('API Response:', data);

      if (data?.status === true) {
        toast.success('Bookmark added successfully!');
        setFormData({ title: '', url: '' });
        setErrors({});
      } else {
        toast.error(data?.message || 'Failed to add bookmark. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to add bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleAddBookmark();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData?.title}
            onChange={handleChange}
            placeholder="Enter bookmark title"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors ${errors?.title ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors?.title && (
            <p className="mt-1 text-sm text-red-500">{errors?.title}</p>
          )}
        </div>

        {/* URL Field */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData?.url}
            onChange={handleChange}
            placeholder="https://example.com"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors ${errors?.url ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors?.url && (
            <p className="mt-1 text-sm text-red-500">{errors?.url}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ?
            <>
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              <span>Adding...</span>
            </>
            :
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Add Bookmark</span>
            </>
          }
        </button>
      </div>
    </form>
  );
}