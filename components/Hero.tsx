'use client';

import { Sparkles, Plus, LogOut, User, UserCircle } from 'lucide-react';
import { User as UserType } from '../lib/types';

interface HeroProps {
  onNewStory: () => void;
  currentUser: UserType | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;        // ← New
}

export default function Hero({
  onNewStory,
  currentUser,
  onLoginClick,
  onLogout,
  onProfileClick,
}: HeroProps) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e520_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-20">
        
        {/* User Area */}
        <div className="absolute top-8 right-8 flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-2">
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 hover:text-purple-400 transition"
              >
                <UserCircle size={20} />
                <span className="font-medium">@{currentUser.username}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-red-400 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-zinc-900 border border-zinc-700 hover:border-purple-500 px-6 py-2.5 rounded-2xl text-sm font-medium transition"
            >
              Login / Sign Up
            </button>
          )}
        </div>

        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 mb-6">
          <Sparkles className="text-purple-400" size={20} />
          <span className="text-sm font-medium text-purple-300">Story Circle Nepal</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Where stories come alive.<br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
            Together.
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          Start a story. Continue someone else's. Build beautiful tales with writers from Nepal and beyond.
        </p>

        <button
          onClick={onNewStory}
          disabled={!currentUser}
          className={`group inline-flex items-center gap-3 font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-200 ${
            currentUser
              ? 'bg-white text-black hover:scale-105 active:scale-95'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <Plus size={28} className="group-hover:rotate-90 transition" />
          {currentUser ? 'Start a New Story' : 'Login to Start Writing'}
        </button>
      </div>
    </div>
  );
}