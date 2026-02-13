'use client';

import api from '@/lib/axios';
import { clearUser } from '@/redux/slices/userSlices';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function TopBar() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const [imgError, setImgError] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await api.get('/api/logout');
            const result = res?.data;
            if (result?.status === true) {
                dispatch(clearUser());
                toast.success("Logged out successfully");
                router.push("login");
            }
        } catch (error) {
            toast.error("Logout failed");
            console.error("Logout failed:", error);
        }
    };
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo or App Name */}
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/login')}>
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <span className="text-sm md:text-xl font-semibold text-gray-800">Smart Bookmark</span>
                    </div>

                    {/* User Info and Logout */}
                    <div className="flex items-center space-x-0 md:space-x-4">
                        <div className="flex items-center space-x-3">
                            {
                                imgError ?
                                    <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-purple-800" />
                                    </div>
                                    :
                                    <img
                                        alt="User"
                                        src={user?.image}
                                        className="w-10 h-10 text-purple-600 rounded-full"
                                        onError={() => setImgError(true)}
                                    />}
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="cursor-pointer flex items-center ml-0 md:ml-4 space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            {<span className="hidden md:block">Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}