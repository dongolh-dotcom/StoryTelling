'use client';

import { useState } from 'react';
import { X, Send, User } from 'lucide-react';
import { Story, User as UserType } from '../../lib/types';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story | null;
  currentUser: UserType | null;
  onAddComment: (storyId: string, text: string) => void;
  onLoginClick: () => void;
}

export default function CommentsModal({
  isOpen,
  onClose,
  story,
  currentUser,
  onAddComment,
  onLoginClick,
}: CommentsModalProps) {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !story) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!currentUser) {
      onLoginClick();
      return;
    }

    onAddComment(story.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[150] p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Comments</h3>
            <p className="text-zinc-500 line-clamp-1">{story.title}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {story.comments && story.comments.length > 0 ? (
            story.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-purple-400">@{comment.username}</p>
                    <p className="text-xs text-zinc-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-zinc-300 leading-relaxed mt-1">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-zinc-500">
              No comments yet.<br />Be the first to share your thoughts!
            </div>
          )}
        </div>

        {/* Comment Input Area */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950">
          {currentUser ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none text-base"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-8 bg-purple-600 hover:bg-purple-700 rounded-2xl disabled:opacity-50 transition flex items-center justify-center"
              >
                <Send size={24} />
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-zinc-400 mb-4">Sign in to join the conversation</p>
              <button
                onClick={onLoginClick}
                className="px-10 py-3.5 bg-purple-600 hover:bg-purple-700 rounded-2xl font-medium transition"
              >
                Login to Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}