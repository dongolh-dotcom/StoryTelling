'use client';

import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import StoryCard from  '../components/ui/StoryCard';
import NewStoryModal from '../components/ui/NewStoryModal';
import ConfirmModal from '../components/ui/ConfirmModal';
import AuthModal from  '../components/ui/AuthModal';
import CommentsModal from  '../components/ui/CommentsModal';
import ContinuationModal from  '../components/ui/ContinuationModal';
import ProfileModal from  '../components/ui/ProfileModal';
import Toast from  '../components/ui/Toast';
import { Story, User } from '../lib/types';


const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Last Lantern Keeper',
    opening: 'In a world where electricity vanished overnight, only one person still knows how to keep the old lanterns alive...',
    author: '@dongolheart',
    username: 'dongolheart',
    userId: 'demo1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    continues: 142,
    likes: 284,
    continuations: [],
    comments: [],
  },
  {
    id: '2',
    title: 'Echoes from Kathmandu',
    opening: 'Every night the old temples whisper secrets to those who listen closely...',
    author: '@nepalwriter',
    username: 'nepalwriter',
    userId: 'demo2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    continues: 89,
    likes: 156,
    continuations: [],
    comments: [],
  },
];

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);

  // Modals
  const [showNewModal, setShowNewModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showContinuationModal, setShowContinuationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [selectedStoryForComments, setSelectedStoryForComments] = useState<Story | null>(null);
  const [selectedStoryForContinuation, setSelectedStoryForContinuation] = useState<Story | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'like' | 'continue' }>>([]);

  const showToast = (message: string, type: 'success' | 'like' | 'continue' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const userStories = stories.filter(s => s.userId === currentUser?.id);

  // Load Data
  useEffect(() => {
    const savedUser = localStorage.getItem('storycircle-current-user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedStories = localStorage.getItem('storycircle-stories');
    if (savedStories) {
      setStories(JSON.parse(savedStories));
    } else {
      setStories(INITIAL_STORIES);
      localStorage.setItem('storycircle-stories', JSON.stringify(INITIAL_STORIES));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storycircle-stories', JSON.stringify(stories));
  }, [stories]);

  // ==================== AUTH ====================
  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('storycircle-current-user', JSON.stringify(user));
    showToast(`Welcome back, ${user.name}! ✨`);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('storycircle-current-user');
    setShowNewModal(false);
    setShowAuthModal(false);
    setShowCommentsModal(false);
    setShowContinuationModal(false);
    setShowProfileModal(false);
    setEditingStory(null);
    setStoryToDelete(null);
    showToast('Logged out successfully');
  };

  const handleAvatarChange = (newAvatar: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, avatar: newAvatar };
    setCurrentUser(updatedUser);
    localStorage.setItem('storycircle-current-user', JSON.stringify(updatedUser));
    showToast("🎨 Avatar updated!");
  };

  const openProfile = () => currentUser && setShowProfileModal(true);

  // ==================== STORY HANDLERS ====================
  const handleNewStory = (title: string, opening: string) => {
    if (!currentUser) return;
    const newStory: Story = {
      id: Date.now().toString(36),
      title,
      opening,
      author: `@${currentUser.username}`,
      username: currentUser.username,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      continues: 0,
      likes: 0,
      continuations: [],
      comments: [],
    };
    setStories(prev => [newStory, ...prev]);
    setShowNewModal(false);
    showToast("🎉 Story published successfully!");
  };

  const handleEditStory = (title: string, opening: string, id?: string) => {
    if (!id) return;
    setStories(prev => prev.map(s => s.id === id ? { ...s, title, opening } : s));
    setEditingStory(null);
    setShowNewModal(false);
    showToast("✅ Story updated successfully!");
  };

  const openEditModal = (story: Story) => {
    setEditingStory(story);
    setShowNewModal(true);
  };

  const closeModal = () => {
    setShowNewModal(false);
    setEditingStory(null);
  };

  const handleDelete = (id: string) => {
    const story = stories.find(s => s.id === id);
    if (!story || story.userId !== currentUser?.id) {
      alert("You can only delete your own stories.");
      return;
    }
    setStoryToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (storyToDelete) {
      setStories(prev => prev.filter(s => s.id !== storyToDelete));
      showToast("🗑️ Story deleted successfully");
      setStoryToDelete(null);
    }
  };

  const handleLike = (id: string) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
    showToast("❤️ Liked!", 'like');
  };

  const openContinuation = (story: Story) => {
    setSelectedStoryForContinuation(story);
    setShowContinuationModal(true);
  };

  const handleAddContinuation = (text: string) => {
    if (!selectedStoryForContinuation) return;
    setStories(prev =>
      prev.map(story =>
        story.id === selectedStoryForContinuation.id
          ? { ...story, continues: story.continues + 1, continuations: [...(story.continuations || []), text] }
          : story
      )
    );
    showToast("🌱 Continuation added!", 'continue');
  };

  const openComments = (story: Story) => {
    setSelectedStoryForComments(story);
    setShowCommentsModal(true);
  };

  const handleAddComment = (storyId: string, text: string) => {
    if (!currentUser) return;
    const newComment = {
      id: Date.now().toString(36),
      storyId,
      userId: currentUser.id,
      username: currentUser.username,
      text,
      createdAt: new Date().toISOString(),
    };
    setStories(prev =>
      prev.map(story =>
        story.id === storyId ? { ...story, comments: [...(story.comments || []), newComment] } : story
      )
    );
    showToast("💬 Comment posted!");
  };

  return (
    <>
      <Hero
        onNewStory={() => currentUser ? setShowNewModal(true) : setShowAuthModal(true)}
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={logout}                    // ← Fixed
        onProfileClick={openProfile}
      />

      <div id="stories" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-semibold">Trending Stories</h3>
          <select className="bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-2 text-sm focus:outline-none">
            <option>Hot right now</option>
            <option>Newest</option>
            <option>Most continued</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              currentUser={currentUser}
              onContinue={openContinuation}
              onLike={handleLike}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onComment={openComments}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <NewStoryModal
        isOpen={showNewModal}
        onClose={closeModal}
        onPublish={editingStory ? handleEditStory : handleNewStory}
        initialData={editingStory || undefined}
        isEdit={!!editingStory}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={login}
      />

      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        story={selectedStoryForComments}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onLoginClick={() => setShowAuthModal(true)}
      />

      <ContinuationModal
        isOpen={showContinuationModal}
        onClose={() => setShowContinuationModal(false)}
        storyTitle={selectedStoryForContinuation?.title || ''}
        onSubmit={handleAddContinuation}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={currentUser}
        userStories={userStories}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onLogout={logout}
        onAvatarChange={handleAvatarChange}
      />

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => { setShowConfirm(false); setStoryToDelete(null); }}
        onConfirm={confirmDelete}
        title="Delete Story"
        message="This action cannot be undone."
        confirmText="Yes, Delete"
        variant="danger"
      />

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </>
  );
}