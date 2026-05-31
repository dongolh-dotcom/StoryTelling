'use client';

import { Edit2, Trash2, Heart, MessageCircle, Crown } from 'lucide-react';
import { Story, User } from '../lib/types';

interface StoryCardProps {
  story: Story;
  currentUser: User | null;
  onContinue: (id: string) => void;
  onLike: (id: string) => void;
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

export default function StoryCard({
  story,
  currentUser,
  onContinue,
  onLike,
  onEdit,
  onDelete,
}: StoryCardProps) {
  const isOwner = currentUser?.id === story.userId;

  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all group relative">
      {/* Owner Badge */}
      {isOwner && (
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10">
          <Crown size={14} />
          My Story
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-semibold line-clamp-2 pr-8">{story.title}</h4>
            <p className="text-sm text-zinc-500 mt-1">
              by {story.author}
            </p>
          </div>
        </div>

        <p className="text-zinc-300 line-clamp-4 mb-6 leading-relaxed">{story.opening}</p>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <button
            onClick={() => onContinue(story.id)}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
          >
            <MessageCircle size={20} />
            <span>Continue ({story.continues})</span>
          </button>

          <button
            onClick={() => onLike(story.id)}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-500 transition active:scale-125"
          >
            <Heart size={20} className="fill-current" />
            <span>{story.likes}</span>
          </button>
        </div>

        {/* Edit & Delete Buttons - Only visible to owner */}
        {isOwner && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
            <button
              onClick={() => onEdit(story)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition text-yellow-400"
            >
              <Edit2 size={18} />
              Edit Story
            </button>
            <button
              onClick={() => onDelete(story.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-red-950/50 rounded-2xl transition text-red-400 hover:text-red-500"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}