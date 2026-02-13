'use client';

import { useEffect, useState } from 'react';
import TopBar from './TopBar';
import BookmarkForm from './BookmarkForm';
import BookmarkTable from './BookmarkTable';
import api from '@/lib/axios';

export default function BookmarkDashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const { data } = await api.get('/api/bookmark/get-bookmarks-of-user');

      if (data?.status == true) {
        setBookmarks(data?.bookmarks || []);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setBookmarksLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();

    const eventSource = new EventSource('/api/bookmark/stream');

    eventSource.addEventListener('bookmark_added', (e) => {
      const newBookmark = JSON.parse(e.data);

      setBookmarks(prev => {
        // prevent duplicates
        if (prev.some(b => b._id === newBookmark._id)) return prev;
        return [newBookmark, ...prev];
      });
    });

    eventSource.addEventListener('bookmark_deleted', (e) => {
      setBookmarks(prev => prev.filter(b => b._id !== e.data));
    });

    return () => eventSource.close();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Bookmark
          </h2>
          <BookmarkForm />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Bookmarks
          </h2>
          <BookmarkTable
            bookmarks={bookmarks}
            bookmarksLoading={bookmarksLoading}
          />
        </div>
      </div>
    </div>
  );
}