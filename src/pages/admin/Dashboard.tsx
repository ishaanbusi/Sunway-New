import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash, Search } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  status: 'published' | 'draft';
}

const Dashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Benefits of Regular Massage Therapy',
      excerpt: 'Discover how regular massage sessions can improve your physical and mental well-being...',
      date: '2024-03-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Understanding Different Types of Massage',
      excerpt: 'A comprehensive guide to various massage techniques and their unique benefits...',
      date: '2024-03-12',
      status: 'draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gold">Blog Dashboard</h1>
          <button className="flex items-center bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg transition-colors">
            <PlusCircle className="h-5 w-5 mr-2" />
            New Post
          </button>
        </div>

        <div className="bg-black-light rounded-lg border border-gold/20 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-light" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light"
              />
            </div>
            <select className="px-4 py-2 bg-black-lighter border border-gold/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 text-gold-light">
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-4 text-gold-light">Title</th>
                  <th className="text-left py-3 px-4 text-gold-light">Date</th>
                  <th className="text-left py-3 px-4 text-gold-light">Status</th>
                  <th className="text-right py-3 px-4 text-gold-light">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-gold/10 hover:bg-black-lighter">
                    <td className="py-4 px-4">
                      <div>
                        <h3 className="text-gold font-medium">{post.title}</h3>
                        <p className="text-sm text-gold-light">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gold-light">{post.date}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end space-x-2">
                        <button className="p-2 text-gold hover:text-gold-light transition-colors">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-red-500 hover:text-red-600 transition-colors">
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;