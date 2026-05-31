'use client';

import { Plus } from 'lucide-react';

interface NavbarProps {
  onNewStory: () => void;
}

export default function Navbar({ onNewStory }: NavbarProps) {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            📖
          </div>
          <h1 className="text-2xl font-bold tracking-tight">StoryCircle</h1>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">Discover</a>
          <a href="#" className="hover:text-white transition-colors">My Stories</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <a href="#" className="hover:text-white transition-colors">Challenges</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onNewStory}
            className="bg-white text-black px-5 py-2.5 rounded-2xl font-medium flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            <Plus size={18} />
            <span>New Story</span>
          </button>
          <div className="w-9 h-9 bg-zinc-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition">
            👤
          </div>
        </div>
      </div>
    </nav>
  );
}