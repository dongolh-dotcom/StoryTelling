'use client';

import { Edit2, Trash2, Heart, MessageCircle, Crown } from 'lucide-react';
import { Story, User } from '../../lib/types';

interface StoryCardProps {
  story: Story;
  currentUser: User | null;
  onContinue: (story: Story) => void;     // Changed to pass full story
  onLike: (id: string) => void;
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
  onComment: (story: Story) => void;
}

export default function StoryCard({
  story,
  currentUser,
  onContinue,
  onLike,
  onEdit,
  onDelete,
  onComment,
}: StoryCardProps) {
  const isOwner = currentUser?.id === story.userId;
  const commentCount = story.comments?.length || 0;

  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all group relative">
      {isOwner && (
        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10">
          <Crown size={14} /> My Story
        </div>
      )}

      <div className="p-6">
        <h4 className="text-xl font-semibold line-clamp-2 mb-1">{story.title}</h4>
        <p className="text-sm text-zinc-500 mb-4">by {story.author}</p>

        <p className="text-zinc-300 line-clamp-4 mb-6 leading-relaxed">{story.opening}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
          <button
            onClick={() => onContinue(story)}           // Now passes full story
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
          >
            <MessageCircle size={20} />
            Continue ({story.continues})
          </button>

          <button
            onClick={() => onComment(story)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
          >
            💬 {commentCount}
          </button>

          <button
            onClick={() => onLike(story.id)}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-500 transition active:scale-125"
          >
            <Heart size={20} className="fill-current" />
            {story.likes}
          </button>
        </div>

        {isOwner && (
          <div className="flex gap-3 mt-6 pt-4 border-t border-zinc-800">
            <button
              onClick={() => onEdit(story)}
              className="flex-1 py-3.5 bg-zinc-800 hover:bg-zinc-700 rounded-2xl flex items-center justify-center gap-2 text-yellow-400 transition"
            >
              <Edit2 size={18} /> Edit
            </button>
            <button
              onClick={() => onDelete(story.id)}
              className="flex-1 py-3.5 bg-zinc-800 hover:bg-red-950 rounded-2xl flex items-center justify-center gap-2 text-red-400 transition"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}