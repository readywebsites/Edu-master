import React, { useState, useEffect } from 'react';
import { Search, Send, User, MessageCircle } from 'lucide-react';
import apiClient from "../../../services/api";

const Discussions = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCurrentUser = async () => {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          userId = parsed.id;
        } catch (e) { console.error("Error parsing user_data", e); }
      }
    }
    setCurrentUser({ id: parseInt(userId) || 0 });
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await apiClient.get('/messages/');
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const getConversationWithUser = (userId) => {
    return messages.filter(m => m.sender === userId || m.receiver === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getLastMessage = (userId) => {
    const convo = getConversationWithUser(userId);
    return convo.length > 0 ? convo[convo.length - 1] : null;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedChatUser) return;
    try {
      await apiClient.post('/messages/', {
        receiver: selectedChatUser.id,
        content: inputText
      });
      setInputText('');
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sortedUsers = [...users]
    .filter(u => u.id !== currentUser?.id)
    .sort((a, b) => {
      const lastA = getLastMessage(a.id);
      const lastB = getLastMessage(b.id);
      const timeA = lastA ? new Date(lastA.timestamp) : new Date(0);
      const timeB = lastB ? new Date(lastB.timestamp) : new Date(0);
      return timeB - timeA;
    });

  return (
    <div className="fade-in" style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Messenger</h1>

      <div style={{ display: 'flex', flex: 1, background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

        {/* SIDEBAR - CHAT LIST */}
        <div style={{ width: '300px', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ background: '#f5f5f9', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={18} color="#888" />
              <input type="text" placeholder="Search users..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem' }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {sortedUsers.map(user => {
              const lastMsg = getLastMessage(user.id);
              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedChatUser(user)}
                  style={{
                    padding: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    background: selectedChatUser?.id === user.id ? '#f0f7ff' : 'transparent',
                    borderLeft: selectedChatUser?.id === user.id ? '4px solid #4f46e5' : '4px solid transparent'
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                    <User size={20} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>{user.username} <span style={{ fontSize: '0.7em', color: '#888', fontWeight: 'normal' }}>({user.user_type})</span></span>
                      {lastMsg && <span style={{ fontSize: '0.75rem', color: '#888' }}>{new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                    </div>
                    {lastMsg ? (
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lastMsg.sender === user.id ? '' : 'You: '} {lastMsg.content}
                      </p>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa', fontStyle: 'italic' }}>start a conversation</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHAT AREA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedChatUser ? (
            <>
              <div style={{ padding: '15px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                  <User size={18} />
                </div>
                <span style={{ fontWeight: '600', color: '#333' }}>{selectedChatUser.username}</span>
              </div>

              <div style={{ flex: 1, padding: '20px', background: '#fafafa', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {getConversationWithUser(selectedChatUser.id).map(msg => {
                  const isMe = msg.sender !== selectedChatUser.id;
                  return (
                    <div key={msg.id} style={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '70%',
                      background: isMe ? '#4f46e5' : 'white',
                      color: isMe ? 'white' : '#333',
                      padding: '10px 15px',
                      borderRadius: isMe ? '12px 12px 0 12px' : '0 12px 12px 12px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      fontSize: '0.9rem'
                    }}>
                      <div>{msg.content}</div>
                      <div style={{ fontSize: '0.7rem', marginTop: '5px', opacity: 0.8, textAlign: 'right' }}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid #e0e0e0', outline: 'none' }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4f46e5', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#888' }}>
              <MessageCircle size={60} style={{ marginBottom: '20px', color: '#e0e7ff' }} />
              <h3>Select a user to start chatting</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Discussions;
