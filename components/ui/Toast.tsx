'use client';

import { useEffect } from 'react';
import { CheckCircle, Heart, MessageCircle } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'like' | 'continue';
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 2800);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle size={20} className="text-green-400" />,
    like: <Heart size={20} className="text-red-500" />,
    continue: <MessageCircle size={20} className="text-purple-400" />,
  };

  const bgColors = {
    success: 'bg-green-600',
    like: 'bg-red-600',
    continue: 'bg-purple-600',
  };

  return (
    <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-white shadow-2xl ${bgColors[type]} animate-slide-up`}>
      {icons[type]}
      <p className="font-medium">{message}</p>
    </div>
  );
}