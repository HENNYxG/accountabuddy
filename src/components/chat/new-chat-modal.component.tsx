import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faSearch, 
  faUser, 
  faUsers, 
  faPlus,
  faUserFriends,
  faCrown,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { User, Conversation } from '../../services/messaging.service';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (conversation: Conversation) => void;
  onSearchUsers: (query: string) => Promise<User[]>;
  onGetBuddies: () => Promise<User[]>;
  onGetSquads: () => Promise<any[]>;
  onGetCommunities: () => Promise<any[]>;
}

interface Squad {
  id: string;
  name: string;
  avatar: string;
  memberCount: number;
  description: string;
  isOwner: boolean;
  isModerator: boolean;
}

interface Community {
  id: string;
  name: string;
  avatar: string;
  memberCount: number;
  description: string;
  isOwner: boolean;
  isModerator: boolean;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onStartChat,
  onSearchUsers,
  onGetBuddies,
  onGetSquads,
  onGetCommunities
}) => {
  const [activeTab, setActiveTab] = useState<'buddies' | 'squads' | 'communities' | 'search'>('buddies');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [buddies, setBuddies] = useState<User[]>([]);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'buddies':
          const buddiesData = await onGetBuddies();
          setBuddies(buddiesData);
          break;
        case 'squads':
          const squadsData = await onGetSquads();
          setSquads(squadsData);
          break;
        case 'communities':
          const communitiesData = await onGetCommunities();
          setCommunities(communitiesData);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      setIsLoading(true);
      try {
        const results = await onSearchUsers(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleStartDirectChat = async (user: User) => {
    try {
      const conversation: Conversation = {
        id: `direct-${Date.now()}`,
        name: user.displayName,
        type: 'direct',
        avatar: user.avatar,
        lastMessage: '',
        timestamp: new Date(),
        unreadCount: 0,
        isMuted: false,
        participants: ['current-user', user.id],
        isGroupChat: false
      };
      
      onStartChat(conversation);
      onClose();
    } catch (error) {
      console.error('Error starting direct chat:', error);
    }
  };

  const handleStartGroupChat = async (entity: Squad | Community, type: 'squad' | 'community') => {
    try {
      const conversation: Conversation = {
        id: `${type}-${entity.id}`,
        name: entity.name,
        type: type,
        avatar: entity.avatar,
        lastMessage: '',
        timestamp: new Date(),
        unreadCount: 0,
        isMuted: false,
        participants: ['current-user'],
        linkedEntityId: entity.id,
        linkedEntityType: type,
        isGroupChat: true
      };
      
      onStartChat(conversation);
      onClose();
    } catch (error) {
      console.error('Error starting group chat:', error);
    }
  };

  const handleCreateDirectChat = async () => {
    if (!selectedUsername.trim()) return;
    
    try {
      const conversation: Conversation = {
        id: `direct-${Date.now()}`,
        name: selectedUsername,
        type: 'direct',
        avatar: selectedUsername.charAt(0).toUpperCase(),
        lastMessage: '',
        timestamp: new Date(),
        unreadCount: 0,
        isMuted: false,
        participants: ['current-user', selectedUsername],
        isGroupChat: false
      };
      
      onStartChat(conversation);
      onClose();
    } catch (error) {
      console.error('Error creating direct chat:', error);
    }
  };

  const tabs = [
    { id: 'buddies', label: 'Buddies', icon: faUserFriends },
    { id: 'squads', label: 'Squads', icon: faUsers },
    { id: 'communities', label: 'Communities', icon: faUsers },
    { id: 'search', label: 'Search', icon: faSearch }
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                New Chat
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-xs" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {/* Buddies Tab */}
                  {activeTab === 'buddies' && (
                    <div className="space-y-2">
                      {buddies.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">
                          No buddies found. Add some friends to start chatting!
                        </p>
                      ) : (
                        buddies.map((buddy) => (
                          <button
                            key={buddy.id}
                            onClick={() => handleStartDirectChat(buddy)}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                              {buddy.avatar || buddy.displayName.charAt(0)}
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {buddy.displayName}
                              </p>
                              <p className="text-sm text-gray-500">
                                @{buddy.username}
                              </p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              buddy.isOnline ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {/* Squads Tab */}
                  {activeTab === 'squads' && (
                    <div className="space-y-2">
                      {squads.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">
                          No squads found. Join some squads to start group chats!
                        </p>
                      ) : (
                        squads.map((squad) => (
                          <button
                            key={squad.id}
                            onClick={() => handleStartGroupChat(squad, 'squad')}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold">
                              {squad.avatar || squad.name.charAt(0)}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {squad.name}
                                </p>
                                {squad.isOwner && (
                                  <FontAwesomeIcon icon={faCrown} className="text-yellow-500 text-xs" />
                                )}
                                {squad.isModerator && !squad.isOwner && (
                                  <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 text-xs" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {squad.memberCount} members
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {/* Communities Tab */}
                  {activeTab === 'communities' && (
                    <div className="space-y-2">
                      {communities.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">
                          No communities found. Join some communities to start group chats!
                        </p>
                      ) : (
                        communities.map((community) => (
                          <button
                            key={community.id}
                            onClick={() => handleStartGroupChat(community, 'community')}
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                              {community.avatar || community.name.charAt(0)}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {community.name}
                                </p>
                                {community.isOwner && (
                                  <FontAwesomeIcon icon={faCrown} className="text-yellow-500 text-xs" />
                                )}
                                {community.isModerator && !community.isOwner && (
                                  <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 text-xs" />
                                )}
                              </div>
                              <p className="text-sm text-gray-500">
                                {community.memberCount} members
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}

                  {/* Search Tab */}
                  {activeTab === 'search' && (
                    <div className="space-y-4">
                      {/* Search Input */}
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                          placeholder="Search users by username..."
                          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <FontAwesomeIcon 
                          icon={faSearch} 
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                        />
                      </div>

                      {/* Search Results */}
                      {searchQuery && (
                        <div className="space-y-2">
                          {searchResults.length === 0 ? (
                            <p className="text-center text-gray-500 py-4">
                              No users found. Try a different search term.
                            </p>
                          ) : (
                            searchResults.map((user) => (
                              <button
                                key={user.id}
                                onClick={() => handleStartDirectChat(user)}
                                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                  {user.avatar || user.displayName.charAt(0)}
                                </div>
                                <div className="flex-1 text-left">
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {user.displayName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    @{user.username}
                                  </p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${
                                  user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                              </button>
                            ))
                          )}
                        </div>
                      )}

                      {/* Create Direct Chat */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Create Direct Chat
                        </h3>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={selectedUsername}
                            onChange={(e) => setSelectedUsername(e.target.value)}
                            placeholder="Enter username"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                          />
                          <button
                            onClick={handleCreateDirectChat}
                            disabled={!selectedUsername.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewChatModal;

