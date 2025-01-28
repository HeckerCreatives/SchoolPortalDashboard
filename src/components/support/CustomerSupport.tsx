'use client';

import { Headset, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Filter } from 'bad-words';
import { badwords } from '@/lib/badwords';
import io from 'socket.io-client';
import axios from 'axios';

interface Sender {
  anonymousName: string;
  userType: string;
}

interface Message {
  _id: string;
  conversation: string;
  sender: Sender;
  message: string;
  type: string
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatData {
  participants: Sender[];
  messages: Message[];
}

interface ChatMessage {
  _id: string;
  conversation: string;
  sender: {
    userType: string;
    anonymousName: string;
  };
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const filter = new Filter();
  const [id, setID] = useState('');
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const date = new Date()

  filter.addWords(...badwords)



  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up socket connection
      console.log('disconnected')
    };
  }, []);

  // Create a new conversation when the chat is opened
  const createConversation = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/createstudentuserconversation`,{
          
        },{
          withCredentials: true
        });
      setID(response.data.data._id);
      localStorage.setItem('conversationid', response.data.data._id)

      if (socket) {
        socket.emit('Join_room', response.data.data._id);
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!inputText.trim() || !id || !socket) return;

  // Create a temporary message object
  const tempMessage = {
    _id: `temp-${Date.now()}`, // Temporary ID (will be replaced by the server)
    conversation: id,
    sender: {
      userType: 'Studentusers',
      anonymousName: 'You', // Or any placeholder name
    },
    message: filter.clean(inputText),
    type: 'Message', // Indicates this is a user message
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  };

  // Optimistically update the UI
  setChatData((prevData) => {
    if (!prevData) return prevData;

    return {
      ...prevData,
      messages: [...prevData.messages, tempMessage],
    };
  });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/supportmessage/studentsendmessage`,
        {
          conversationid: id,
          message: filter.clean(inputText),
       
        },
        { withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
         }
      );

      // Emit the message to the server
      socket.emit('Send_message', {
        conversationId: id,
        message: filter.clean(inputText),
        sender: {
          userType: 'Studentusers'
        },
        createdAt: date.toISOString()
        
      });

      setInputText(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Listen for new messages in real-time
  useEffect(() => {
    if (!socket || !id) return;

    // Join the conversation room
    socket.emit('Join_room', id, 'Chat support');

    // Listen for new messages
    socket.on('Receive_message', (newMessage: Message) => {
      setChatData((prevData) => {
        if (!prevData) return prevData;

        // Add the new message to the existing messages
        return {
          ...prevData,
          messages: [...prevData.messages, newMessage],
        };
      });
    });

    // Clean up listeners when the component unmounts or conversationId changes
    return () => {
      socket.off('Receive_message');
      socket.emit('Leave_room', id);
    };
  }, [socket, id]);

  useEffect(() => {
    const getChat = async () => {
      // Fetch conversationId from localStorage if it exists
      const storedConversationId = localStorage.getItem('conversationid');
  
      // Use the storedConversationId if it exists and id is empty/undefined
      const conversationIdToUse = id || storedConversationId;
  
      if (conversationIdToUse) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/getmessages?conversationid=${conversationIdToUse}`,
            { withCredentials: true }
          );
          setChatData(response.data.data);
  
          // Update the id state if it was fetched from localStorage
          if (!id && storedConversationId) {
            setID(storedConversationId);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
  
    getChat();
  }, [id]);


  // Toggle chat visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
    const storedConversationId = localStorage.getItem('conversationid');
    const conversationIdToUse = id || storedConversationId;
  
    if (!conversationIdToUse) {
      createConversation();
    }
  };

  // Add bad words to the filter
  filter.addWords(...badwords);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
  }, [chatData, isOpen]);



  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col text-xs">
          <div className="bg-pink-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Headset size={20} />
              Customer Support
            </h2>
            <button onClick={toggleChat} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 flex-1 h-full overflow-y-auto scrollbar">
            {chatData?.messages.map((message, index) => (
              <div key={index} className=' mb-2'>
            
              {message.type === 'System' ? (
                <div className=' w-full flex items-center justify-center'>
                  <p className=' text-center text-zinc-400'>{message.message}</p>
                </div>
              ): (
                <div
                key={index}
                className={`mb-4 ${
                  message.sender.userType === 'Studentusers' ? 'text-right' : 'text-left'
                }`}
              >
                <p
                  className={`inline-flex flex-col p-2 rounded-lg ${
                    message.sender.userType === 'Studentusers'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {message.message}

                  <small className="text-[.5rem] opacity-75">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </small>
                </p>
               
              </div>
              )}
            
              </div>
             
            ))}
            {/* Empty div to act as a scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
              <button
                onClick={sendMessage}
                className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-600 transition duration-200 flex items-center gap-1"
              >
                <Send size={12} />
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};