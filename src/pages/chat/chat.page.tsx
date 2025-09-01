import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from '../../components/ui-elements/hamburger-menu.component';
import ConversationsList from '../../components/chat/conversations-list.component';
import MessageComponent from '../../components/chat/message.component';
import MessageInput from '../../components/chat/message-input.component';
import NewChatModal from '../../components/chat/new-chat-modal.component';
import ConversationOptionsModal from '../../components/chat/conversation-options-modal.component';
import { UIContext } from '../../contexts/ui.context';
import useMediaQuery from '../../utils/mediaquery';
import messagingService, { Message, Conversation, Attachment, User } from '../../services/messaging.service';

const ChatPage: React.FC = () => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showConversations, setShowConversations] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showConversationOptions, setShowConversationOptions] = useState(false);
  const [conversationMembers, setConversationMembers] = useState<User[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedConversationId) {
      // Load messages for selected conversation
      const loadMessages = async () => {
        try {
          const conversationMessages = await messagingService.getMessages(selectedConversationId);
          setMessages(conversationMessages);
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      };
      
      loadMessages();
      
      // Get conversation details
      const loadConversation = async () => {
        try {
          const conversations = await messagingService.getConversations();
          const conversation = conversations.find(c => c.id === selectedConversationId);
          setSelectedConversation(conversation || null);

          // Load conversation members
          if (conversation?.members) {
            const members: User[] = conversation.members.map(member => ({
              id: member.id,
              username: member.name.toLowerCase().replace(/\s+/g, ''),
              displayName: member.name,
              avatar: member.avatar,
              isOnline: member.isOnline,
              lastSeen: member.joinedAt
            }));
            setConversationMembers(members);
          } else {
            setConversationMembers([]);
          }
        } catch (error) {
          console.error('Error loading conversation:', error);
        }
      };
      
      loadConversation();

      // Mark conversation as read
      messagingService.markAsRead(selectedConversationId);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    // Subscribe to real-time message updates
    const handleMessageSent = (message: Message) => {
      if (message.conversationId === selectedConversationId) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleMessageReceived = (message: Message) => {
      if (message.conversationId === selectedConversationId) {
        setMessages(prev => [...prev, message]);
        // Mark as read if conversation is currently open
        messagingService.markAsRead(selectedConversationId!);
      }
    };

    const handleMessageStatusChanged = (message: Message) => {
      if (message.conversationId === selectedConversationId) {
        setMessages(prev => 
          prev.map(m => m.id === message.id ? message : m)
        );
      }
    };

    const handleReactionAdded = (data: { message: Message; reaction: any }) => {
      if (data.message.conversationId === selectedConversationId) {
        setMessages(prev => 
          prev.map(m => m.id === data.message.id ? data.message : m)
        );
      }
    };

    const handleReactionRemoved = (data: { message: Message; reactionId: string }) => {
      if (data.message.conversationId === selectedConversationId) {
        setMessages(prev => 
          prev.map(m => m.id === data.message.id ? data.message : m)
        );
      }
    };

    messagingService.onMessageSent(handleMessageSent);
    messagingService.onMessageReceived(handleMessageReceived);
    messagingService.onMessageStatusChanged(handleMessageStatusChanged);
    messagingService.onReactionAdded(handleReactionAdded);
    messagingService.onReactionRemoved(handleReactionRemoved);

    return () => {
      messagingService.offMessageSent(handleMessageSent);
      messagingService.offMessageReceived(handleMessageReceived);
      messagingService.offMessageStatusChanged(handleMessageStatusChanged);
      messagingService.offReactionAdded(handleReactionAdded);
      messagingService.offReactionRemoved(handleReactionRemoved);
    };
  }, [selectedConversationId]);

  const handleSendMessage = async (content: string, options?: {
    attachments?: Attachment[];
    replyTo?: any;
    mentions?: string[];
  }) => {
    if (selectedConversationId) {
      try {
        await messagingService.sendMessage(selectedConversationId, content, options);
        setReplyToMessage(null);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleAttachmentUpload = async (file: File): Promise<Attachment> => {
    if (selectedConversationId) {
      return await messagingService.uploadAttachment(file, selectedConversationId);
    }
    throw new Error('No conversation selected');
  };

  const handleReply = (message: Message) => {
    setReplyToMessage(message);
  };

  const handleCancelReply = () => {
    setReplyToMessage(null);
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    try {
      await messagingService.addReaction(messageId, emoji);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleRemoveReaction = async (messageId: string, emoji: string) => {
    try {
      await messagingService.removeReaction(messageId, emoji);
    } catch (error) {
      console.error('Error removing reaction:', error);
    }
  };

  const handleAttachmentClick = (attachment: Attachment) => {
    // Handle attachment click - could open in modal, download, etc.
    console.log('Attachment clicked:', attachment);
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
    setSelectedConversationId(null);
    setSelectedConversation(null);
    setMessages([]);
    setReplyToMessage(null);
  };

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleStartChat = async (conversation: Conversation) => {
    try {
      await messagingService.createConversation({
        name: conversation.name,
        type: conversation.type === 'buddy' ? 'direct' : conversation.type,
        participants: conversation.participants,
        linkedEntityId: conversation.linkedEntityId,
        linkedEntityType: conversation.linkedEntityType
      });
      setSelectedConversationId(conversation.id);
      setSelectedConversation(conversation);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleSearchUsers = async (query: string): Promise<User[]> => {
    try {
      return await messagingService.searchUsers(query);
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  };

  const handleGetBuddies = async (): Promise<User[]> => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: 'john-doe',
        username: 'johndoe',
        displayName: 'John Doe',
        avatar: 'JD',
        isOnline: true,
        lastSeen: new Date()
      },
      {
        id: 'sarah-kim',
        username: 'sarahkim',
        displayName: 'Sarah Kim',
        avatar: 'SK',
        isOnline: false,
        lastSeen: new Date(Date.now() - 1000 * 60 * 30)
      }
    ];
  };

  const handleGetSquads = async (): Promise<any[]> => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: 'squad-1',
        name: 'Fitness Warriors',
        avatar: 'FW',
        memberCount: 12,
        description: 'A group for fitness enthusiasts',
        isOwner: false,
        isModerator: true
      }
    ];
  };

  const handleGetCommunities = async (): Promise<any[]> => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: 'community-1',
        name: 'Study Group',
        avatar: 'SG',
        memberCount: 25,
        description: 'A community for students',
        isOwner: false,
        isModerator: false
      }
    ];
  };

  const handleToggleMute = async (conversationId: string, duration?: string) => {
    try {
      await messagingService.toggleMute(conversationId, duration);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const handleLeaveConversation = async (conversationId: string) => {
    try {
      await messagingService.leaveConversation(conversationId);
      handleBackToConversations();
    } catch (error) {
      console.error('Error leaving conversation:', error);
    }
  };

  const handleViewLinkedEntity = (entityId: string, entityType: string) => {
    // Navigate to the linked entity (squad/community page)
    console.log('View linked entity:', entityId, entityType);
  };

  // Mobile view: Show conversations list or chat
  if (isMobile) {
    return (
      <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
        <div className="flex-grow">
          {/* Header */}
          <div className="bg-white p-5 rounded-md flex justify-between mb-4">
            <div className="flex flex-col relative">
              <h1 className="text-5xl font-extrabold">Chat</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with your buddies and stay motivated together
              </p>
            </div>
            
            {/* Mobile Hamburger Menu */}
            <div className="flex flex-col">
              <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
                <div className="w-[50%] h-[50px] flex">
                  <HamburgerMenu />
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showConversations ? (
              <motion.div
                key="conversations"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConversationsList
                  selectedConversationId={selectedConversationId}
                  onSelectConversation={handleSelectConversation}
                  onNewChat={handleNewChat}
                  isMobile={true}
                />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-md flex flex-col flex-1 overflow-hidden"
              >
                {/* Chat Header */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleBackToConversations}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedConversation?.avatar}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                          {selectedConversation?.name}
                        </h2>
                        <p className="text-sm text-green-600">
                          {selectedConversation?.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowConversationOptions(true)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <MessageComponent
                      key={message.id}
                      message={message}
                      isGroupChat={selectedConversation?.isGroupChat || false}
                      onReply={handleReply}
                      onReaction={handleReaction}
                      onRemoveReaction={handleRemoveReaction}
                      onAttachmentClick={handleAttachmentClick}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onAttachmentUpload={handleAttachmentUpload}
                  replyToMessage={replyToMessage}
                  onCancelReply={handleCancelReply}
                  conversationMembers={conversationMembers}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modals */}
        <NewChatModal
          isOpen={showNewChatModal}
          onClose={() => setShowNewChatModal(false)}
          onStartChat={handleStartChat}
          onSearchUsers={handleSearchUsers}
          onGetBuddies={handleGetBuddies}
          onGetSquads={handleGetSquads}
          onGetCommunities={handleGetCommunities}
        />

        <ConversationOptionsModal
          isOpen={showConversationOptions}
          onClose={() => setShowConversationOptions(false)}
          conversation={selectedConversation}
          onToggleMute={handleToggleMute}
          onLeaveConversation={handleLeaveConversation}
          onViewLinkedEntity={handleViewLinkedEntity}
        />
      </div>
    );
  }

  // Desktop view: Show conversations list and chat side by side
  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white p-5 rounded-md flex justify-between mb-4">
          <div className="flex flex-col relative">
            <h1 className="text-5xl font-extrabold">Chat</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with your buddies and stay motivated together
            </p>
          </div>
        </div>

        {/* Desktop Chat Interface */}
        <div className="bg-white rounded-md flex flex-1 overflow-hidden h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <ConversationsList
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onNewChat={handleNewChat}
            isMobile={false}
          />

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {selectedConversation.avatar}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900 dark:text-white">
                          {selectedConversation.name}
                        </h2>
                        <p className="text-sm text-green-600">
                          {selectedConversation.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowConversationOptions(true)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <MessageComponent
                      key={message.id}
                      message={message}
                      isGroupChat={selectedConversation.isGroupChat}
                      onReply={handleReply}
                      onReaction={handleReaction}
                      onRemoveReaction={handleRemoveReaction}
                      onAttachmentClick={handleAttachmentClick}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onAttachmentUpload={handleAttachmentUpload}
                  replyToMessage={replyToMessage}
                  onCancelReply={handleCancelReply}
                  conversationMembers={conversationMembers}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 text-xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a chat from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onStartChat={handleStartChat}
        onSearchUsers={handleSearchUsers}
        onGetBuddies={handleGetBuddies}
        onGetSquads={handleGetSquads}
        onGetCommunities={handleGetCommunities}
      />

      <ConversationOptionsModal
        isOpen={showConversationOptions}
        onClose={() => setShowConversationOptions(false)}
        conversation={selectedConversation}
        onToggleMute={handleToggleMute}
        onLeaveConversation={handleLeaveConversation}
        onViewLinkedEntity={handleViewLinkedEntity}
      />
    </div>
  );
};

export default ChatPage;
