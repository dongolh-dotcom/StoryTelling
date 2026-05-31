'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ContinuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyTitle: string;
  onSubmit: (text: string) => void;
}

export default function ContinuationModal({
  isOpen,
  onClose,
  storyTitle,
  onSubmit,
}: ContinuationModalProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    
    // Simulate small delay for better UX
    setTimeout(() => {
      onSubmit(text.trim());
      setText('');
      setIsSubmitting(false);
      onClose();
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[160] p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold">Continue the Story</h3>
            <p className="text-zinc-400 text-sm mt-1 line-clamp-1">{storyTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Textarea */}
        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={7}
            placeholder="Write your continuation here... (What happens next?)"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-3xl p-5 focus:border-purple-500 outline-none resize-none text-base"
          />
          <p className="text-xs text-zinc-500 mt-3">
            Tip: Write 2-5 sentences to continue the story naturally.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="bg-zinc-950 p-6 flex gap-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isSubmitting}
            className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Continuation'}
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}