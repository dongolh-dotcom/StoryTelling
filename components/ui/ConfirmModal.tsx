'use client';

import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  variant?: 'danger' | 'default';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  variant = 'danger',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-4">
      <div className="bg-zinc-900 rounded-3xl max-w-md w-full overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          {variant === 'danger' && (
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
          )}

          <h3 className="text-2xl font-semibold mb-3">{title}</h3>
          <p className="text-zinc-400 leading-relaxed">{message}</p>
        </div>

        <div className="bg-zinc-950 px-8 py-6 flex gap-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl border border-zinc-700 hover:bg-zinc-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-4 rounded-2xl font-semibold ${
              variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}