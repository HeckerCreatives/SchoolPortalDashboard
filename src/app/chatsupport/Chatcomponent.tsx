'use client';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Filter } from 'bad-words';
import { ArrowBigRight, ChevronRight, MessageCircle, RefreshCcw, Send, X } from 'lucide-react';
import { badwords } from '@/lib/badwords';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import toast from 'react-hot-toast';


interface Sender {
  anonymousName: string;
  userType: string;
}

interface Message {
  _id: string;
  conversation: string;
  sender: Sender;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChatData {
  unread: number
  participants: Sender[];
  messages: Message[];
}

interface User {
  userType: string;
  anonymousName: string;
  _id: string;
}

interface Messages {
  _id: string;
  participants: User[];
  latestMessage: Message
  isOwnerless: boolean
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

export default function ChatComponent() {
  const [list, setList] = useState<Messages[]>([]);
  const [conversationId, setConversationId] = useState('');
  const [inputText, setInputText] = useState('');
  const filter = new Filter();
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const date = new Date()
  const [name, setName] = useState('')
  const [tab, setTab] = useState('id')
  const [loading, setLoading] = useState(false)
  const [screen, setScreen] = useState('screen1')
  

  filter.addWords(...badwords)
  

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up socket connection
    };
  }, []);

  // Fetch chat list 
  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/Staffgetconversation?filter=${tab}`,
          { withCredentials: true }
        );
        setList(response.data.data);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    getChat();
  }, [tab]);

  const getChat = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/Staffgetconversation?filter=${tab}`,
        { withCredentials: true }
      );
      setLoading(false)
      setList(response.data.data);
    } catch (error) {
      setLoading(false)
      console.error('Error fetching chat list:', error);
    }
  };

  // Fetch messages when conversationId changes
  useEffect(() => {
    const getChat = async () => {
      if (conversationId !== '') {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/getmessages?conversationid=${conversationId}`,
            { withCredentials: true }
          );
          setChatData(response.data.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    getChat();
  }, [conversationId]);

  // Listen for new messages in real-time
  useEffect(() => {
    if (!socket || !conversationId) return;

    // Join the conversation room
    socket.emit('Join_room', conversationId, 'Chat support');

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
      socket.emit('Leave_room', conversationId);
    };
  }, [socket, conversationId]);

  // Send message
  const sendMessage = async () => {
    if (!inputText.trim() || !conversationId || !socket) return;

    // Create a temporary message object
    const tempMessage = {
      _id: `temp-${Date.now()}`, // Temporary ID (will be replaced by the server)
      conversation: conversationId,
      sender: {
        userType: 'Staffusers',
        anonymousName: '', // Or any placeholder name
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
        `${process.env.NEXT_PUBLIC_API_URL}/supportmessage/staffsendmessage`,
        {
          conversationid: conversationId,
          message: filter.clean(inputText),
        },
        { withCredentials: true }
      );

      // Emit the message to the server
      socket.emit('Send_message', {
        conversationId: conversationId,
        message: filter.clean(inputText),
        sender: {
          userType: 'Staffusers'
        },
        createdAt: date.toISOString()
        
      });

      

      setInputText(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

   // get convo
   const getConvo = async (id: string, owner: boolean) => {
    if(owner === true){
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/supportconversation/matchstaffuserwithconversation`,
          {
            conversationid: id,
          
          },
          { withCredentials: true }
        );
  
        console.log(response.data)

        if(response.data.message === 'success'){
          toast.success('Added to your chats');
          getChat()
        }
  
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }

  
  };

    // Scroll to bottom whenever messages change
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [chatData]);


  const formatdate = (date: string) => {
    const datetime = new Date(date)
    return datetime.toLocaleTimeString()

  }



  return (

    <>
    <div className=" md:hidden flex h-[90%] w-full text-xs">
      {/* Left Side: Chat List */}
      {screen === 'screen1' ? (
        <div className=" w-full md:max-w-[280px] border-r border-gray-200 px-4 bg-gray-50 overflow-y-auto scrollbar h-[90%]">

         <div className=' z-40 flex items-center justify-between py-2 text-black mb-4 sticky top-0 bg-gray-50'>
           <h2 className="text-xl font-medium flex items-center gap-1"><MessageCircle size={20}/>Chats</h2>
           <RefreshCcw size={15} onClick={getChat} className=' cursor-pointer '/>
         </div>
 
 
         <div className=' w-fit flex items-center bg-gray-100 p-1 mb-4 text-xs rounded-sm '>
             <button onClick={() => setTab('tab1')} className={` px-4 py-2  rounded-sm ${tab === 'tab1' && 'bg-pink-200'}`}>Your Chats</button>
             <button onClick={() => setTab('tab2')} className={` px-4 py-2  rounded-sm ${tab === 'tab2' && 'bg-pink-200'}`}>Other Chats</button>
 
           </div>
 
           {loading === true && (
             <div className=' w-full flex items-center justify-center'>
               <div className=' loaderchat'></div>
             </div>
           )}
   
 
   <ul className="space-y-2">
     {list.map((chat) => (
       <li
         key={chat._id}
         className={` relative p-3 rounded-lg cursor-pointer flex flex-col bg-gray-100 ${
           conversationId === chat._id ? 'bg-pink-50' : 'hover:bg-gray-100'
         }`}
         onClick={() => {setConversationId(chat._id), setName(chat.participants[0]?.anonymousName), getConvo(chat._id, chat.isOwnerless), setScreen('screen2')}}
       >
 
         {/* <div className=' absolute right-0 top-0 -translate-y-1 h-4 w-4 bg-red-600 rounded-full'>
           <p>{chat.}</p>
         </div> */}
         <span className="font-medium">{chat.participants[0].anonymousName}</span>
         {chat.latestMessage !== null && (
 
           <div className=' flex items-center justify-between'>
             <p className=' text-[.6rem] text-zinc-500'>{chat.latestMessage.message.length > 20
 ? `${chat.latestMessage.message.slice(0, 20)}...`
 : chat.latestMessage.message}</p>
             <p className=' text-[.6rem] text-zinc-500'>{formatdate(chat.latestMessage.createdAt)}</p>
           </div>
           
 
         )}
         
       </li>
     ))}
   </ul>
        </div>
      ) : (
        <>
        
        <div className=" w-full relative flex-1 h-full md:flex flex-col  bg-white">

        <div className=' sticky top-0 bg-gray-100 w-full text-black h-[50px] p-4 flex items-center justify-between'>
          <p className=' font-medium text-sm'>{name}</p>

          <p onClick={() => setScreen('screen1')} className=' flex items-center gap-1 cursor-pointer'><ChevronRight size={20}/></p>
          

        </div>
        <div className="flex-1 overflow-y-auto space-y-4 h-[500px] p-4 scrollbar">
          {chatData?.messages.map((message, index) => (
          <div key={index}>
          {message.type === 'System' ? (
              <div key={index} className=' w-full flex items-center justify-center'>
              <p className=' text-center text-zinc-400'>{message.message}</p>
            </div>
            ):(
              <div
              key={index}
              className={`flex flex-col ${
                message.sender.userType === 'Staffusers' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender.userType === 'Staffusers'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >

                {/* <div className=' h-6 rounded-full aspect-square bg-white'>

                </div> */}
                <p className="text-xs">{message.message}</p>
                <small className="text-[.5rem] opacity-75">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </small>
              </div>
            </div>
            )}

          </div>
            
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className=" absolute bottom-0 mt-4 flex space-x-2 p-4 w-full">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 h-fit bg-pink-600 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <Send size={20}/>
          </button>
        </div>
        </div>
        </>
      )}
     

      
    </div>
    

    <div className=" hidden md:flex h-[90%] w-full text-xs">
      {/* Left Side: Chat List */}
      <div className=" w-full md:max-w-[280px] border-r border-gray-200 px-4 bg-gray-50 overflow-y-auto scrollbar h-[90%]">

        <div className=' z-40 flex items-center justify-between py-2 text-black mb-4 sticky top-0 bg-gray-50'>
          <h2 className="text-xl font-medium flex items-center gap-1"><MessageCircle size={20}/>Chats</h2>
          <RefreshCcw size={15} onClick={getChat} className=' cursor-pointer '/>
        </div>


        <div className=' w-fit flex items-center bg-gray-100 p-1 mb-4 text-xs rounded-sm '>
            <button onClick={() => setTab('id')} className={` px-4 py-2  rounded-sm ${tab === 'id' && 'bg-pink-200'}`}>Your Chats</button>
            <button onClick={() => setTab('ownerless')} className={` px-4 py-2  rounded-sm ${tab === 'ownerless' && 'bg-pink-200'}`}>Other Chats</button>

          </div>

          {loading === true && (
            <div className=' w-full flex items-center justify-center'>
              <div className=' loaderchat'></div>
            </div>
          )}

          {list.length === 0 ? (
            <div className=' w-full flex flex-col gap-1 justify-center items-center py-8'>
              <p className=' flex items-center gap-1 text-[.6rem] text-zinc-500'><MessageCircle size={12}/>No chats</p>
              {/* <p>Please select a chat on other chats to start a conversation. </p> */}
            </div>
          ) : (

            <>
            {tab === 'id' ? (
              <ul className="space-y-2">
              {list.map((chat) => (
                <li
                  key={chat._id}
                  className={` relative p-3 rounded-lg cursor-pointer flex flex-col bg-gray-100 ${
                    conversationId === chat._id ? 'bg-pink-50' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {setConversationId(chat._id), setName(chat.participants[0]?.anonymousName), getConvo(chat._id, chat.isOwnerless)}}
                >
      
                  {/* <div className=' absolute right-0 top-0 -translate-y-1 h-4 w-4 bg-red-600 rounded-full'>
                    <p>{chat.}</p>
                  </div> */}
                  <span className="font-medium">{chat.participants[0].anonymousName}</span>
                  {chat.latestMessage !== null && (
      
                    <div className=' flex items-center justify-between'>
                      <p className=' text-[.6rem] text-zinc-500'>{chat.latestMessage.message.length > 20
          ? `${chat.latestMessage.message.slice(0, 20)}...`
          : chat.latestMessage.message}</p>
                      <p className=' text-[.6rem] text-zinc-500'>{formatdate(chat.latestMessage.createdAt)}</p>
                    </div>
                    
      
                  )}
                  
                </li>
              ))}
              </ul>
            ):(
              <ul className="space-y-2">
              {list.map((chat) => (
                <li
                  key={chat._id}
                  className={` relative p-3 rounded-lg cursor-pointer flex flex-col bg-gray-100 ${
                    conversationId === chat._id ? 'bg-pink-50' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {getConvo(chat._id, chat.isOwnerless)}}
                >
      
                  {/* <div className=' absolute right-0 top-0 -translate-y-1 h-4 w-4 bg-red-600 rounded-full'>
                    <p>{chat.}</p>
                  </div> */}
                  <span className="font-medium">{chat.participants[0].anonymousName}</span>
                  {chat.latestMessage !== null && (
      
                    <div className=' flex items-center justify-between'>
                      <p className=' text-[.6rem] text-zinc-500'>{chat.latestMessage.message.length > 20
          ? `${chat.latestMessage.message.slice(0, 20)}...`
          : chat.latestMessage.message}</p>
                      <p className=' text-[.6rem] text-zinc-500'>{formatdate(chat.latestMessage.createdAt)}</p>
                    </div>
                    
      
                  )}
                  
                </li>
              ))}
              </ul>
              )}
            </>
            
          )}
  

     
      </div>

      {/* Right Side: Chat Messages */}
      <div className=" w-full relative hidden flex-1 h-[90%] md:flex flex-col  bg-white">

        <div className=' sticky top-0 bg-gray-100 w-full text-black h-[50px] p-4 flex items-center'>
          <p className=' font-medium text-sm'>{name}</p>

        </div>
        <div className="flex-1 overflow-y-auto space-y-4 h-[500px] p-4 scrollbar">
          {chatData?.messages.map((message, index) => (
           <div key={index}>
           {message.type === 'System' ? (
              <div key={index} className=' w-full flex items-center justify-center'>
              <p className=' text-center text-zinc-400'>{message.message}</p>
            </div>
            ):(
              <div
              key={index}
              className={`flex flex-col ${
                message.sender.userType === 'Staffusers' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender.userType === 'Staffusers'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >

                {/* <div className=' h-6 rounded-full aspect-square bg-white'>

                </div> */}
                <p className="text-xs">{message.message}</p>
                <small className="text-[.5rem] opacity-75">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </small>
              </div>
            </div>
            )}

           </div>
            
          ))}
           <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex space-x-2 p-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 h-fit bg-pink-600 text-white rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <Send size={20}/>
          </button>
        </div>
      </div>
    </div>
    </>
   
  );
}