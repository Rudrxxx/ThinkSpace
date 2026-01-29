const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const fetchConversations = async (userId) => {
    return {
        conversations: [
            {
                _id: '1',
                participants: [
                    { _id: userId, name: 'You' },
                    { _id: '2', name: 'Alex Chen' }
                ],
                lastMessage: {
                    content: 'Hey! How are you doing?',
                    createdAt: new Date().toISOString(),
                    sender: { name: 'Alex Chen' }
                },
                unreadCount: 2
            }
        ]
    };
};

// Fetch messages for a conversation
export const fetchMessages = async (conversationId, userId, limit = 50) => {
    return {
        messages: [
            {
                _id: '1',
                content: 'Hey! How are you doing?',
                sender: { _id: '2', name: 'Alex Chen' },
                createdAt: new Date().toISOString()
            },
            {
                _id: '2',
                content: 'I\'m doing great! Just working on some new projects.',
                sender: { _id: userId, name: 'You' },
                createdAt: new Date(Date.now() + 60000).toISOString()
            }
        ]
    };
};

// Send a message
export const sendMessage = async (conversationId, senderId, content, type = 'text') => {
    return {
        message: {
            _id: Date.now().toString(),
            content,
            sender: { _id: senderId, name: 'You' },
            createdAt: new Date().toISOString()
        }
    };
};

// Create a new conversation
export const createConversation = async (participants) => {
    try {
        const response = await fetch(`${API_URL}/conversations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ participants }),
        });
        if (!response.ok) throw new Error('Failed to create conversation');
        return await response.json();
    } catch (error) {
        console.error('Error creating conversation:', error);
        throw error;
    }
};

// Mark all messages in a conversation as read
export const markConversationAsRead = async (conversationId, userId) => {
    try {
        const response = await fetch(
            `${API_URL}/messages/conversation/${conversationId}/read`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            }
        );
        if (!response.ok) throw new Error('Failed to mark conversation as read');
        return await response.json();
    } catch (error) {
        console.error('Error marking conversation as read:', error);
        throw error;
    }
};

// Delete a conversation
export const deleteConversation = async (conversationId, userId) => {
    try {
        const response = await fetch(
            `${API_URL}/conversations/${conversationId}?userId=${userId}`,
            {
                method: 'DELETE',
            }
        );
        if (!response.ok) throw new Error('Failed to delete conversation');
        return await response.json();
    } catch (error) {
        console.error('Error deleting conversation:', error);
        throw error;
    }
};
