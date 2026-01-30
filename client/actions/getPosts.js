"use server";
const API = process.env.NEXT_PUBLIC_API_URL;
export async function getPosts() {
    try {
        const res = await fetch(`${API}/feed/home`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            console.log('Home feed failed, falling back to all posts');
            const fallback = await fetch(`${API}/posts`, {
                cache: 'no-store',
                next: { revalidate: 0 }
            });
            const data = await fallback.json();
            return data.posts || getMockPosts();
        }

        const data = await res.json();
        return data.posts || getMockPosts();
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        return getMockPosts();
    }
}

function getMockPosts() {
    return [
        {
            _id: '1',
            content: 'Welcome to ThinkSpace! This is where every thought deserves a stage. Share your ideas and connect with fellow thinkers.',
            author: 'ThinkSpace Team',
            user: { name: 'ThinkSpace Team', username: 'thinkspace' },
            createdAt: new Date().toISOString(),
            sparks: 42,
            dims: 3,
            thoughts: 12
        },
        {
            _id: '2',
            content: 'The future belongs to those who believe in the beauty of their dreams. What dreams are you pursuing today?',
            author: 'Eleanor Roosevelt',
            user: { name: 'Eleanor Roosevelt', username: 'eleanor' },
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            sparks: 128,
            dims: 5,
            thoughts: 34
        },
        {
            _id: '3',
            content: 'Innovation distinguishes between a leader and a follower. What innovative ideas are you working on?',
            author: 'Steve Jobs',
            user: { name: 'Steve Jobs', username: 'stevejobs' },
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            sparks: 256,
            dims: 8,
            thoughts: 67
        }
    ];
}
