import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeMute, 
  faVolumeUp, 
  faArchive, 
  faSignOutAlt,
  faEllipsisV,
  faUsers,
  faUser,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import messagingService, { Conversation, Message } from '../../services/messaging.service';

interface ConversationsListProps {
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onBack?: () => void;
  isMobile?: boolean;
  onNewChat?: () => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  selectedConversationId,
  onSelectConversation,
  onBack,
  isMobile = false,
  onNewChat
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [longPressedId, setLongPressedId] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null);

  useEffect(() => {
    // Load initial conversations
    const loadConversations = async () => {
      try {
        const conversationsData = await messagingService.getConversations();
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    };

    loadConversations();

    // Subscribe to real-time updates
    const handleConversationUpdated = (conversation: Conversation) => {
      setConversations(prev => {
        const exists = prev.some(c => c.id === conversation.id);
        const updated = exists ? prev.map(c => c.id === conversation.id ? conversation : c) : [conversation, ...prev];
        return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
    };

    const handleMessageReceived = (message: Message) => {
      // Update conversation list when new message is received
      setConversations(prev => {
        const conversation = prev.find(c => c.id === message.conversationId);
        if (conversation) {
          const updated = prev.map(c => 
            c.id === message.conversationId 
              ? { ...c, lastMessage: message.content, timestamp: message.timestamp, unreadCount: c.unreadCount + 1 }
              : c
          );
          return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        }
        return prev;
      });
    };

    messagingService.onConversationUpdated(handleConversationUpdated);
    messagingService.onMessageReceived(handleMessageReceived);

    return () => {
      messagingService.offConversationUpdated(handleConversationUpdated);
      messagingService.offMessageReceived(handleMessageReceived);
    };
  }, []);

  const handleLongPress = (conversationId: string) => {
    setLongPressedId(conversationId);
    setShowOptions(conversationId);
  };

  const handleShortPress = (conversationId: string) => {
    if (longPressedId === conversationId) {
      setLongPressedId(null);
      return;
    }
    onSelectConversation(conversationId);
    // Mark conversation as read when selected
    messagingService.markAsRead(conversationId);
  };

  const handleMute = async (conversationId: string, duration?: string) => {
    await messagingService.toggleMute(conversationId, duration);
    setShowOptions(null);
  };

  const handleUnmute = async (conversationId: string) => {
    await messagingService.toggleMute(conversationId);
    setShowOptions(null);
  };

  const handleArchive = (conversationId: string) => {
    messagingService.archiveConversation(conversationId);
    setShowOptions(null);
  };

  const handleLeave = (conversationId: string) => {
    messagingService.leaveSquad(conversationId);
    setShowOptions(null);
  };

  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const muteOptions = [
    { label: '1 Hour', value: '1h' },
    { label: '1 Day', value: '1d' },
    { label: '1 Week', value: '1w' },
    { label: 'Until Unmuted', value: 'until' }
  ];

  return (
    <div className={`${isMobile ? 'w-full' : 'w-80'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faEllipsisV} className="rotate-90" />
            </button>
          )}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isMobile ? 'Conversations' : 'Chats'}
          </h2>
          <div className="relative">
            <button 
              onClick={() => setShowOptions('header')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            {/* Header Options Menu */}
            <AnimatePresence>
              {showOptions === 'header' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 min-w-48"
                >
                  <button
                    onClick={() => {
                      onNewChat?.();
                      setShowOptions(null);
                    }}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-purple-500" />
                    <span>New Chat</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="relative">
            <motion.div
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              whileTap={{ scale: 0.98 }}
              onMouseDown={() => {
                const timer = setTimeout(() => {
                  handleLongPress(conversation.id);
                }, 500);
                const cleanup = () => clearTimeout(timer);
                document.addEventListener('mouseup', cleanup, { once: true });
                document.addEventListener('mouseleave', cleanup, { once: true });
              }}
              onClick={() => handleShortPress(conversation.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors ${
                selectedConversationId === conversation.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  {conversation.type === 'squad' && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-white text-xs" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {conversation.isMuted && (
                        <FontAwesomeIcon 
                          icon={faVolumeMute} 
                          className="text-gray-400 text-sm" 
                        />
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(conversation.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.type === 'squad' && conversation.members && (
                    <p className="text-xs text-gray-500">
                      {conversation.members.length} members
                    </p>
                  )}
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Long Press Options */}
            <AnimatePresence>
              {showOptions === conversation.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {conversation.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {conversation.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {conversation.type === 'squad' ? 'Squad Chat' : 'Buddy Chat'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {conversation.isMuted ? (
                        <button
                          onClick={() => handleUnmute(conversation.id)}
                          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faVolumeUp} className="text-green-500" />
                          <span>Unmute</span>
                        </button>
                      ) : (
                        <div className="space-y-1">
                          <button
                            onClick={() => handleMute(conversation.id)}
                            className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <FontAwesomeIcon icon={faVolumeMute} className="text-orange-500" />
                            <span>Mute</span>
                          </button>
                          <div className="ml-8 space-y-1">
                            {muteOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleMute(conversation.id, option.value)}
                                className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
                              >
                                <span className="text-gray-500">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleArchive(conversation.id)}
                        className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faArchive} className="text-gray-500" />
                        <span>Archive</span>
                      </button>

                      {conversation.type === 'squad' && (
                        <button
                          onClick={() => handleLeave(conversation.id)}
                          className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          <span>Leave Squad</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowOptions(null)}
                      className="w-full mt-4 p-3 text-center bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
