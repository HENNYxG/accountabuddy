import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUserFriends, 
  faBuilding, 
  faGlobe,
  faPlus,
  faSearch,
  faEllipsisH,
  faFire,
  faTrophy,
  faChartBar,
  faCalendarAlt,
  faCog,
  faTrash,
  faUserPlus,
  faUserMinus,
  faCrown,
  faShieldAlt,
  faArrowLeft,
  faRunning,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  Friend, 
  FriendRequest, 
  Squad, 
  SquadMember, 
  Community, 
  CommunityMember,
  SocialSearchResult,
  SocialStats
} from '../../types/social.types';
import FriendsPopover from '../../components/social/friends-popover.component';
import BuddyDetail from '../../components/social/buddy-detail.component';
import HamburgerMenu from '../../components/ui-elements/hamburger-menu.component';
import { UIContext } from '../../contexts/ui.context';
import useMediaQuery from '../../utils/mediaquery';

type SocialTab = 'buddies' | 'squads' | 'communities';
type BuddySubTab = 'buddy' | 'challenges';

const SocialPage: React.FC = () => {
  const { mobileWebsiteView } = useContext(UIContext);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [activeTab, setActiveTab] = useState<SocialTab>('buddies');
  const [buddySubTab, setBuddySubTab] = useState<BuddySubTab>('buddy');
  const [showFriendsPopover, setShowFriendsPopover] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState<Friend | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      userId: 'current-user',
      friendId: 'friend-1',
      friend: {
        id: 'friend-1',
        handle: 'markmeaden',
        displayName: 'Mark Meaden',
        avatarUrl: undefined,
        isOnline: true,
        lastSeen: '2024-01-15T10:30:00Z'
      },
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      userId: 'current-user',
      friendId: 'friend-2',
      friend: {
        id: 'friend-2',
        handle: 'georgesoliman',
        displayName: 'George Soliman',
        avatarUrl: undefined,
        isOnline: false,
        lastSeen: '2024-01-15T08:15:00Z'
      },
      createdAt: '2024-01-05T00:00:00Z'
    }
  ]);

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [socialStats, setSocialStats] = useState<SocialStats>({
    totalBuddies: 2,
    activeBuddies: 1,
    totalSquads: 1,
    ownedSquads: 0,
    totalCommunities: 2,
    ownedCommunities: 0,
    totalPosts: 15,
    totalLikes: 45,
    totalComments: 12
  });

  // Mock squads data
  useEffect(() => {
    setSquads([
      {
        id: 'squad-1',
        name: 'Morning Runners',
        description: 'A group for early morning runners to stay motivated',
        visibility: 'public',
        ownerId: 'friend-1',
        maxMembers: 50,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    ]);
  }, []);

  // Mock communities data
  useEffect(() => {
    setCommunities([
      {
        id: 'community-1',
        name: 'Fitness Enthusiasts',
        description: 'A community for fitness lovers to share tips and motivate each other',
        visibility: 'public',
        ownerId: 'friend-2',
        memberCount: 1200,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'community-2',
        name: 'Healthy Living',
        description: 'Tips for maintaining a healthy lifestyle',
        visibility: 'public',
        ownerId: 'current-user',
        memberCount: 856,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    ]);
  }, []);

  // Social actions
  const handleSendFriendRequest = async (handle: string, message?: string) => {
    // Mock implementation
    console.log('Sending friend request to:', handle, message);
    // In real app, this would call the API
  };

  const handleAcceptFriendRequest = async (requestId: string) => {
    // Mock implementation
    console.log('Accepting friend request:', requestId);
    // In real app, this would call the API
  };

  const handleDeclineFriendRequest = async (requestId: string) => {
    // Mock implementation
    console.log('Declining friend request:', requestId);
    // In real app, this would call the API
  };

  const handleRemoveFriend = async (friendId: string) => {
    // Mock implementation
    setFriends(prev => prev.filter(f => f.id !== friendId));
    // In real app, this would call the API
  };

  const handleGenerateInviteLink = async (): Promise<string> => {
    // Mock implementation
    return 'https://accountabuddy.com/invite/abc123';
  };

  const handleGenerateQRCode = async (): Promise<string> => {
    // Mock implementation
    return 'qr-code-data-here';
  };

  const handleBuddyClick = (buddy: Friend) => {
    setSelectedBuddy(buddy);
  };

  const handleBackFromBuddy = () => {
    setSelectedBuddy(null);
  };

  const handleShareHabit = (habitId: string) => {
    console.log('Sharing habit:', habitId);
    // In real app, this would open a habit sharing modal
  };

  const handleViewLeaderboard = () => {
    console.log('Viewing leaderboard');
    // In real app, this would navigate to leaderboard page
  };

  const handleChat = () => {
    console.log('Opening chat');
    // In real app, this would navigate to chat page
  };

  // Render buddy detail view
  if (selectedBuddy) {
    // Convert Friend to BuddyMember for the detail component
    const buddyMember = {
      id: selectedBuddy.id,
      buddyPairId: `pair-${selectedBuddy.id}`,
      userId: selectedBuddy.userId,
      member: selectedBuddy.friend,
      sharedHabits: [],
      createdAt: selectedBuddy.createdAt
    };

    return (
      <BuddyDetail
        buddy={buddyMember}
        onBack={handleBackFromBuddy}
        onShareHabit={handleShareHabit}
        onViewLeaderboard={handleViewLeaderboard}
        onChat={handleChat}
      />
    );
  }

  // Render main social page
  return (
    <div className="max-xl:flex-col gap-4 w-full flex flex-row p-3 relative">
      <div className="flex-grow">
        {/* Header */}
        <div className="bg-white p-5 rounded-md flex justify-between mb-4">
          <div className="flex flex-col relative">
            <h1 className="text-5xl font-extrabold">Social</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with buddies, join squads, and discover communities
            </p>
          </div>
          
          {/* Mobile Hamburger Menu / Desktop Friends Button */}
          <div className="flex flex-col">
            <div className="w-[50%] flex flex-col gap-3 align-middle center justify-between">
              <div className="w-[50%] h-[50px] flex">
                {!isMobile ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowFriendsPopover(!showFriendsPopover)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <FontAwesomeIcon icon={faUserFriends} />
                      <span>Friends</span>
                    </button>
                    
                    {showFriendsPopover && (
                      <FriendsPopover
                        isVisible={showFriendsPopover}
                        onClose={() => setShowFriendsPopover(false)}
                        friends={friends}
                        friendRequests={friendRequests}
                        onSendFriendRequest={handleSendFriendRequest}
                        onAcceptFriendRequest={handleAcceptFriendRequest}
                        onDeclineFriendRequest={handleDeclineFriendRequest}
                        onRemoveFriend={handleRemoveFriend}
                        onGenerateInviteLink={handleGenerateInviteLink}
                        onGenerateQRCode={handleGenerateQRCode}
                      />
                    )}
                  </div>
                ) : (
                  <HamburgerMenu />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Tab Navigation */}
        <div className="bg-white rounded-md p-1 mb-4">
          <div className="flex">
            {[
              { id: 'buddies', label: 'Buddies', icon: faUserFriends },
              { id: 'squads', label: 'Squads', icon: faUsers },
              { id: 'communities', label: 'Community', icon: faGlobe },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SocialTab)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'buddies' && (
            <div className="space-y-4">
              {/* Buddy Sub-navigation */}
              <div className="bg-white rounded-md p-1">
                <div className="flex">
                  {[
                    { id: 'buddy', label: 'Buddy' },
                    { id: 'challenges', label: 'Challenges' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setBuddySubTab(tab.id as BuddySubTab)}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        buddySubTab === tab.id
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buddies List */}
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div 
                    key={friend.id} 
                    className="bg-white rounded-md p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleBuddyClick(friend)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {friend.friend.displayName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {friend.friend.displayName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            @{friend.friend.handle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {friend.friend.isOnline ? 'Online' : 'Offline'}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${
                            friend.friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <p className="text-xs text-gray-500">
                          Last seen {new Date(friend.friend.lastSeen).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Shared Habits Section */}
                    <div className="space-y-3">
                      {/* Habit A - Dark grey rounded square */}
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faRunning} className="text-white text-sm" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Habit A</h4>
                              <p className="text-xs text-gray-300">Morning Run</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <FontAwesomeIcon icon={faUsers} className="text-white text-xs" />
                            </div>
                            <span className="text-sm text-white">4</span>
                            <FontAwesomeIcon icon={faFire} className="text-orange-500 text-sm" />
                          </div>
                        </div>
                      </div>

                      {/* Data Summary Row */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Data Summary</span>
                        <span>Data Stats</span>
                        <span>More Data</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* George Soliman - Large yellow block */}
                <div className="bg-yellow-400 rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        G
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          George Soliman
                        </h3>
                        <p className="text-sm text-gray-700">
                          @georgesoliman
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 mb-2">Data Table 3</h4>
                    <p className="text-sm text-gray-600">
                      Shared habit data and statistics
                    </p>
                  </div>
                </div>

                {/* Add New Buddy */}
                <div className="bg-white rounded-md p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="text-center">
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      + Add New Buddy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'squads' && (
            <div className="space-y-4">
              {/* My Squads */}
              <div className="bg-white rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  My Squads
                </h3>
                <div className="space-y-4">
                  {squads.map((squad) => (
                    <div key={squad.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {squad.name}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          squad.visibility === 'public' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {squad.visibility === 'public' ? 'Public' : 'Invite'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {squad.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                          <div className="w-6 h-6 bg-pink-500 rounded-full"></div>
                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-500">+5 more</span>
                        </div>
                        <button className="text-sm text-purple-600 hover:text-purple-700">
                          View Squad
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create New Squad */}
              <div className="bg-white rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Create New Squad
                </h3>
                <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Create Squad
                </button>
              </div>
            </div>
          )}

          {activeTab === 'communities' && (
            <div className="space-y-4">
              {/* My Communities */}
              <div className="bg-white rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  My Communities
                </h3>
                <div className="space-y-4">
                  {communities.map((community) => (
                    <div key={community.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {community.name}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          community.visibility === 'public' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {community.visibility === 'public' ? 'Public' : 'Private'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {community.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {community.memberCount.toLocaleString()} members
                        </span>
                        <button className="text-sm text-purple-600 hover:text-purple-700">
                          View Community
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discover Communities */}
              <div className="bg-white rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Discover Communities
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white">Healthy Living</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tips for maintaining a healthy lifestyle</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">856 members</span>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">
                        Join
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white">Productivity Masters</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Share productivity tips and techniques</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">1.5k members</span>
                      <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
