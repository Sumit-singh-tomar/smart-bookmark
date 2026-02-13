'use client';

import { Trash2, ExternalLink, NotepadTextDashed } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import api from '@/lib/axios';

export default function BookmarkTable({ bookmarks, bookmarksLoading }) {
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null);

  if (bookmarksLoading) {
    return (
      <div className="text-center py-12 flex flex-col items-center space-y-4">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div> */}
        <p className="text-gray-500 text-lg">Fetching bookmarks...</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No bookmarks yet. Add your first bookmark above!</p>
      </div>
    );
  }

  const handleSelect = async (id) => {
    setConfirmModal(true);
    setSelectedBookmarkId(id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      const { data } = await api.delete(`/api/bookmark/delete-bookmark?id=${selectedBookmarkId}`);

      setConfirmModal(false);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <ConfirmationModal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={handleDelete}
        title={'Delete Bookmark'}
        message='Are you sure you want to delete this bookmark? This action cannot be undone.'
        loading={loading}
      />

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              URL
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookmarks.map((bookmark) => (
            <tr key={bookmark?._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <span className="text-sm font-medium text-gray-900">
                  {bookmark?.title}
                </span>
              </td>
              <td className="px-6 py-4">
                <a
                  href={bookmark?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1"
                >
                  <span className="truncate max-w-xs">{bookmark?.url}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleSelect(bookmark?._id)}
                  className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="Delete bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}