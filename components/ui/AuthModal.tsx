'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../../lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const users: User[] = JSON.parse(localStorage.getItem('storycircle-users') || '[]');

    if (mode === 'signup') {
      if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        setError('Username already taken');
        setLoading(false);
        return;
      }

      const newUser: User = {
        id: Date.now().toString(36),
        username: username.toLowerCase(),
        name: name.trim() || username,
        password,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('storycircle-users', JSON.stringify([...users, newUser]));
      onAuthSuccess(newUser);
      onClose();
    } else {
      const user = users.find(u => 
        u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      if (user) {
        onAuthSuccess(user);
        onClose();
      } else {
        setError('Invalid username or password');
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[150] p-4">
      <div className="bg-zinc-900 rounded-3xl w-full max-w-md overflow-hidden">
        <div className="p-8 border-b border-zinc-800">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none"
                placeholder="Your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 focus:border-purple-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-semibold disabled:opacity-70"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="px-8 py-6 border-t border-zinc-800 text-center text-sm">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => { setMode('signup'); setError(''); }} className="text-purple-400 hover:underline">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => { setMode('login'); setError(''); }} className="text-purple-400 hover:underline">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}