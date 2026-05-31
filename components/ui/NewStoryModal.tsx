'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (title: string, opening: string, storyId?: string) => void;
  initialData?: { id?: string; title: string; opening: string };
  isEdit?: boolean;
}

export default function NewStoryModal({
  isOpen,
  onClose,
  onPublish,
  initialData,
  isEdit = false,
}: NewStoryModalProps) {
  const [title, setTitle] = useState('');
  const [opening, setOpening] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setOpening(initialData.opening);
      } else {
        setTitle('');
        setOpening('');
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim() || !opening.trim()) {
      alert("Please fill both title and opening paragraph ✨");
      return;
    }
    onPublish(title.trim(), opening.trim(), initialData?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-lg overflow-hidden">
        <div className="p-8 border-b border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold">
              {isEdit ? 'Edit Story' : 'Start a New Story'}
            </h3>
            <button onClick={onClose}><X size={28} /></button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4"
              placeholder="Story Title"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Opening Paragraph</label>
            <textarea
              rows={8}
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl px-5 py-4 resize-none"
              placeholder="Once upon a time..."
            />
          </div>
        </div>

        <div className="bg-zinc-950 p-8 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 border border-zinc-700 rounded-2xl hover:bg-zinc-800">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 py-4 bg-purple-600 rounded-2xl font-semibold">
            {isEdit ? 'Save Changes' : 'Publish Story'}
          </button>
        </div>
      </div>
    </div>
  );
}