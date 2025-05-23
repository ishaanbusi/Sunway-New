import React, { useState } from 'react';
import { Save, X, Image } from 'lucide-react';

const Editor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add save logic
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gold">New Post</h1>
          <div className="flex space-x-4">
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
              <X className="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="bg-black-light rounded-lg border border-gold/20 p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gold-light mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gold-light mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                rows={3}
                placeholder="Enter post excerpt"
              />
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gold-light mb-2">
                Cover Image URL
              </label>
              <div className="flex space-x-4">
                <input
                  id="coverImage"
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                  placeholder="Enter image URL"
                />
                <button className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors">
                  <Image className="h-5 w-5 mr-2" />
                  Browse
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gold-light mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
                rows={12}
                placeholder="Write your post content here..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editor;