'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface NewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (title: string, opening: string) => void;
}

export default function NewStoryModal({ isOpen, onClose, onPublish }: NewStoryModalProps) {
  const [title, setTitle] = useState('');
  const [opening, setOpening] = useState('');

  if (!isOpen) return null;

  const handlePublish = () => {
    if (!title.trim() || !opening.trim()) {
      alert("Please add both a title and an opening paragraph ✨");
      return;
    }
    onPublish(title, opening);
    setTitle('');
    setOpening('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
      <div className="bg-zinc-900 rounded-3xl max-w-lg w-full overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Start a New Story</h3>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-purple-500 mb-4"
          />

          <textarea
            rows={6}
            placeholder="Write the opening paragraph..."
            value={opening}
            onChange={(e) => setOpening(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        <div className="bg-zinc-950 px-8 py-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-semibold transition"
          >
            Publish Story
          </button>
        </div>
      </div>
    </div>
  );
}