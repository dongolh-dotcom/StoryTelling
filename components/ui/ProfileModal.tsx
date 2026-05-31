'use client';

import { X, Edit2, Trash2, LogOut, Check } from 'lucide-react';
import { User, Story } from '../../lib/types';
import { useState } from 'react';

const AVATARS = [
  "/goku.png",   // Anime style
  "/cute.png",
  "pic1.png",
  "/atttackontitansfight.png",
  "https://picsum.photos/id/133/300/300",
  "https://picsum.photos/id/201/300/300",
  "https://picsum.photos/id/251/300/300",
  "https://picsum.photos/id/274/300/300",
  "https://picsum.photos/id/669/300/300",
  "https://picsum.photos/id/870/300/300",
];

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userStories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
  onAvatarChange: (newAvatar: string) => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  userStories,
  onEdit,
  onDelete,
  onLogout,
  onAvatarChange,
}: ProfileModalProps) {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const currentAvatar = user?.avatar || AVATARS[0];

  if (!isOpen || !user) return null;

  const totalLikes = userStories.reduce((sum, s) => sum + s.likes, 0);
  const totalContinues = userStories.reduce((sum, s) => sum + s.continues, 0);

  const handleAvatarSelect = (avatar: string) => {
    onAvatarChange(avatar);
    setShowAvatarSelector(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[170] p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white z-20 bg-zinc-800 rounded-full p-2"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-8 border-b border-zinc-800 flex flex-col items-center pt-12">
          <div className="relative group cursor-pointer" onClick={() => setShowAvatarSelector(true)}>
            <img
              src={currentAvatar}
              alt="Avatar"
              className="w-28 h-28 rounded-3xl object-cover border-4 border-purple-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
              Change
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-4">{user.name}</h2>
          <p className="text-purple-400">@{user.username}</p>
        </div>

        {/* Avatar Selector */}
        {showAvatarSelector && (
          <div className="p-6 bg-zinc-950 border-b border-zinc-800">
            <h4 className="font-semibold mb-4 text-center">Choose Your Character</h4>
            <div className="grid grid-cols-5 gap-4">
              {AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className="relative cursor-pointer hover:scale-110 transition-transform rounded-2xl overflow-hidden"
                >
                  <img
                    src={avatar}
                    alt={`Avatar ${index}`}
                    className="w-full aspect-square object-cover"
                  />
                  {avatar === currentAvatar && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Check className="text-green-400" size={28} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-zinc-950 border-b border-zinc-800">
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{userStories.length}</p>
            <p className="text-sm text-zinc-500">Stories</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{totalLikes}</p>
            <p className="text-sm text-zinc-500">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{totalContinues}</p>
            <p className="text-sm text-zinc-500">Continues</p>
          </div>
        </div>

        {/* My Stories */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-semibold mb-4">My Published Stories ({userStories.length})</h3>
          {userStories.length > 0 ? (
            <div className="space-y-4">
              {userStories.map((story) => (
                <div key={story.id} className="bg-zinc-800 rounded-2xl p-5 flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{story.title}</h4>
                    <p className="text-sm text-zinc-400 line-clamp-2 mt-1">{story.opening}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(story)} className="p-3 hover:bg-zinc-700 rounded-xl text-yellow-400">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => onDelete(story.id)} className="p-3 hover:bg-red-950 rounded-xl text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-zinc-500">You haven't published any stories yet.</p>
          )}
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-zinc-800">
          <button
            onClick={onLogout}
            className="w-full py-4 flex items-center justify-center gap-2 text-red-400 hover:bg-red-950/50 rounded-2xl transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}