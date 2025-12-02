const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Fallback data when server is not available
const handleOfflineMode = (endpoint, options) => {
  const method = options.method || 'GET';
  
  if (endpoint.includes('/users/profile/handle/') && method === 'GET') {
    return {
      name: 'User',
      bio: '',
      location: '',
      website: '',
      image: '',
      postCount: 0,
      followerCount: 0,
      followingCount: 0
    };
  }
  
  if (endpoint === '/users/profile' && method === 'PUT') {
    // Mock successful update
    const data = JSON.parse(options.body || '{}');
    return { ...data, _id: 'mock-id', updatedAt: new Date().toISOString() };
  }
  
  return {};
};

const fetchAPI = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get Clerk session token if available
  if (typeof window !== 'undefined' && window.Clerk) {
    try {
      const token = await window.Clerk.session?.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get Clerk token:', error);
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.warn('Server not available, using fallback data');
      return handleOfflineMode(endpoint, options);
    }
    throw error;
  }
};

export const api = {
  // Feed
  getHomeFeed: () => fetchAPI('/feed/home'),
  getExploreFeed: () => fetchAPI('/feed/explore'),
  
  // Posts
  getPosts: async () => {
    const data = await fetchAPI('/posts');
    return data.posts || data;
  },
  getPost: (id) => fetchAPI(`/posts/${id}`),
  createPost: (data) => fetchAPI('/posts/create', { method: 'POST', body: JSON.stringify(data) }),
  likePost: (id) => fetchAPI(`/posts/${id}/like`, { method: 'POST' }),
  
  // Comments
  getComments: (postId) => fetchAPI(`/posts/${postId}/comments`),
  createComment: (postId, text) => fetchAPI(`/posts/${postId}/comments`, { 
    method: 'POST', 
    body: JSON.stringify({ text }) 
  }),
  
  // User Profile
  getUserProfile: (handle) => fetchAPI(`/users/profile/handle/${handle}`),
  getUserPosts: (handle) => fetchAPI(`/users/profile/handle/${handle}/posts`),
  updateProfile: (data) => fetchAPI('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
  
  // Follow
  toggleFollow: (userId) => fetchAPI(`/follow/${userId}`, { method: 'POST' }),
  getFollowers: (userId) => fetchAPI(`/follow/${userId}/followers`),
  getFollowing: (userId) => fetchAPI(`/follow/${userId}/following`),
  checkFollow: (userId) => fetchAPI(`/follow/${userId}/check`),
  
  // Bookmarks
  toggleBookmark: (postId) => fetchAPI(`/bookmarks/${postId}`, { method: 'POST' }),
  getBookmarks: () => fetchAPI('/bookmarks'),
  
  // Spaces
  getSpaces: () => fetchAPI('/spaces'),
  getUserSpaces: (userId) => fetchAPI(`/spaces/user/${userId}`),
  joinSpace: (id) => fetchAPI(`/spaces/${id}/join`, { method: 'POST' }),
  
  // Notifications
  getNotifications: (unreadOnly = false) => fetchAPI(`/notifications${unreadOnly ? '?unreadOnly=true' : ''}`),
  getUnreadCount: () => fetchAPI('/notifications/unread-count'),
  markAsRead: (id) => fetchAPI(`/notifications/${id}/read`, { method: 'PUT' }),
};
