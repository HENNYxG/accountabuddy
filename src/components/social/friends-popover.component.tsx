import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faUserPlus, 
  faQrcode, 
  faLink, 
  faCheck, 
  faTimes,
  faUserFriends,
  faPaperPlane,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import { Friend, FriendRequest, SocialSearchResult } from '../../types/social.types';
import toast from 'react-hot-toast';

interface FriendsPopoverProps {
  isVisible: boolean;
  onClose: () => void;
  friends: Friend[];
  friendRequests: FriendRequest[];
  onSendFriendRequest: (handle: string, message?: string) => Promise<void>;
  onAcceptFriendRequest: (requestId: string) => Promise<void>;
  onDeclineFriendRequest: (requestId: string) => Promise<void>;
  onCancelFriendRequest?: (requestId: string) => Promise<void>;
  onRemoveFriend: (friendId: string) => Promise<void>;
  onGenerateInviteLink: () => Promise<string>;
  onGenerateQRCode: () => Promise<string>;
}

type PopoverTab = 'friends' | 'sent' | 'received' | 'add';

const FriendsPopover: React.FC<FriendsPopoverProps> = ({
  isVisible,
  onClose,
  friends,
  friendRequests,
  onSendFriendRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onCancelFriendRequest,
  onRemoveFriend,
  onGenerateInviteLink,
  onGenerateQRCode
}) => {
  const [activeTab, setActiveTab] = useState<PopoverTab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SocialSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  // Focus search input when tab changes
  useEffect(() => {
    if (activeTab === 'add' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [activeTab]);

  // Mock search function
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock search results
    const mockResults: SocialSearchResult[] = [
      {
        type: 'user' as const,
        id: '1',
        name: 'John Doe',
        description: 'Fitness enthusiast',
        avatarUrl: undefined,
        matchScore: 0.95,
        isMember: false,
        isFriend: false
      },
      {
        type: 'user' as const,
        id: '2',
        name: 'Jane Smith',
        description: 'Productivity master',
        avatarUrl: undefined,
        matchScore: 0.87,
        isMember: false,
        isFriend: true
      }
    ].filter(result => 
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.description?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  const handleSendFriendRequest = async (handle: string) => {
    try {
      await onSendFriendRequest(handle, inviteMessage);
      setInviteMessage('');
      setSearchQuery('');
      setSearchResults([]);
      toast.success('Friend request sent');
    } catch (error) {
      console.error('Failed to send friend request:', error);
      toast.error('Could not send friend request');
    }
  };

  const handleGenerateInviteLink = async () => {
    try {
      const link = await onGenerateInviteLink();
      setInviteLink(link);
      setShowInviteModal(true);
      toast.success('Invite link generated');
    } catch (error) {
      console.error('Failed to generate invite link:', error);
      toast.error('Could not generate invite link');
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      const qrData = await onGenerateQRCode();
      setQrCodeData(qrData);
      setShowQRModal(true);
      toast.success('QR code ready');
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast.error('Could not generate QR code');
    }
  };

  const getSentRequests = () => {
    return friendRequests.filter(req => req.status === 'pending');
  };

  const getReceivedRequests = () => {
    return friendRequests.filter(req => req.status === 'pending');
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={popoverRef}
        className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Friends
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'friends', label: 'Friends', count: friends.length },
            { id: 'sent', label: 'Sent', count: getSentRequests().length },
            { id: 'received', label: 'Received', count: getReceivedRequests().length },
            { id: 'add', label: 'Add', count: 0 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PopoverTab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div className="p-4 space-y-3">
              {friends.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No friends yet. Start adding some!
                </p>
              ) : (
                friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {friend.friend.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {friend.friend.displayName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          @{friend.friend.handle}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFriend(friend.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sent Requests Tab */}
          {activeTab === 'sent' && (
            <div className="p-4 space-y-3">
              {getSentRequests().length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No pending friend requests
                </p>
              ) : (
                getSentRequests().map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Request sent
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {request.message || 'No message'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 text-sm">Pending</span>
                      {onCancelFriendRequest && (
                        <button
                          onClick={() => onCancelFriendRequest(request.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Received Requests Tab */}
          {activeTab === 'received' && (
            <div className="p-4 space-y-3">
              {getReceivedRequests().length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No friend requests received
                </p>
              ) : (
                getReceivedRequests().map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Friend request
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {request.message || 'No message'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onAcceptFriendRequest(request.id)}
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        onClick={() => onDeclineFriendRequest(request.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Add Friends Tab */}
          {activeTab === 'add' && (
            <div className="p-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by handle..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="space-y-2">
                  {isSearching ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                    </div>
                  ) : (
                    searchResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {result.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              @{result.id}
                            </p>
                          </div>
                        </div>
                        {result.isFriend ? (
                          <span className="text-green-600 text-sm">Already friends</span>
                        ) : (
                          <button
                            onClick={() => handleSendFriendRequest(result.id)}
                            className="text-purple-600 hover:text-purple-700 text-sm"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleGenerateInviteLink}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <FontAwesomeIcon icon={faLink} />
                  <span>Copy Invite Link</span>
                </button>
                
                <button
                  onClick={handleGenerateQRCode}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <FontAwesomeIcon icon={faQrcode} />
                  <span>QR Code Add</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite Link Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Invite Link
            </h3>
            <div className="mb-4">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteLink);
                  // Show success message
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              QR Code
            </h3>
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="w-32 h-32 bg-white mx-auto rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faQrcode} className="text-6xl text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Scan this QR code to add friends
            </p>
            <button
              onClick={() => setShowQRModal(false)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FriendsPopover;
