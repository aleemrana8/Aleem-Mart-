'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const conversations = [
  { id: '1', customer: 'Ali Hassan', lastMessage: 'Is the earbuds available in white color?', time: '5 min ago', unread: 2, avatar: 'A' },
  { id: '2', customer: 'Sara Khan', lastMessage: 'When will my order be shipped?', time: '30 min ago', unread: 0, avatar: 'S' },
  { id: '3', customer: 'Usman Ahmed', lastMessage: 'Thank you for the quick delivery!', time: '2 hours ago', unread: 0, avatar: 'U' },
  { id: '4', customer: 'Fatima Noor', lastMessage: 'Can I return this product?', time: '1 day ago', unread: 1, avatar: 'F' },
];

const messages = [
  { id: '1', sender: 'customer', text: 'Hi, I ordered the Wireless Earbuds yesterday.', time: '10:30 AM' },
  { id: '2', sender: 'customer', text: 'Is the earbuds available in white color?', time: '10:31 AM' },
  { id: '3', sender: 'seller', text: 'Hello Ali! Yes, we have white color available.', time: '10:35 AM' },
  { id: '4', sender: 'seller', text: 'Would you like me to change your order to white?', time: '10:35 AM' },
  { id: '5', sender: 'customer', text: 'Yes please! That would be great.', time: '10:40 AM' },
];

export default function SellerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('1');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500">Chat with customers about orders and products</p>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden h-[600px] flex">
        {/* Conversation List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 text-left border-b ${
                  selectedConversation === conv.id ? 'bg-primary/5' : ''
                }`}
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-gray-900">{conv.customer}</p>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">A</div>
            <div>
              <p className="font-medium text-sm">Ali Hassan</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                  msg.sender === 'seller'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'seller' ? 'text-white/70' : 'text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="p-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
