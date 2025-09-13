// Social Layer Types
// Comprehensive types for buddies, squads, communities, and social interactions

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';
export type SquadVisibility = 'public' | 'invite';
export type CommunityVisibility = 'public' | 'private_discoverable';
export type UserRole = 'owner' | 'admin' | 'mod' | 'member';
export type PostType = 'proof' | 'update' | 'milestone';
export type NotificationType = 'friend_request' | 'habit_share' | 'squad_invite' | 'community_join' | 'mention' | 'like' | 'comment';

// Friend Request
export interface FriendRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: FriendRequestStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// Friend Relationship
export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friend: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl?: string;
    isOnline: boolean;
    lastSeen: string;
  };
  createdAt: string;
}

// Buddy Pair (for habit sharing)
export interface BuddyPair {
  id: string;
  userId1: string;
  userId2: string;
  createdAt: string;
  isActive: boolean;
}

// Buddy Member (extends buddy pair with additional data)
export interface BuddyMember {
  id: string;
  buddyPairId: string;
  userId: string;
  member: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl?: string;
    isOnline: boolean;
    lastSeen: string;
  };
  sharedHabits: SharedHabit[];
  createdAt: string;
}

// Shared Habit between buddies
export interface SharedHabit {
  id: string;
  buddyPairId: string;
  habitId: string;
  inviterId: string;
  rules: {
    requireApproval: boolean;
    visibleHistory: boolean;
    allowComments: boolean;
    shareCompletions: boolean;
    shareEmotions: boolean;
  };
  startDate: string; // Always tomorrow
  isActive: boolean;
  createdAt: string;
}

// Squad
export interface Squad {
  id: string;
  name: string;
  description?: string;
  visibility: SquadVisibility;
  ownerId: string;
  communityId?: string; // If part of a community
  maxMembers?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Squad Member
export interface SquadMember {
  id: string;
  squadId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
  member: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl?: string;
  };
}

// Squad Habit
export interface SquadHabit {
  id: string;
  squadId: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  targetPerDay?: number;
  unit?: string;
  isActive: boolean;
  createdAt: string;
}

// Squad Habit Link (maps personal habit to squad habit)
export interface SquadHabitLink {
  id: string;
  squadHabitId: string;
  userId: string;
  personalHabitId: string;
  mappingType: 'looser' | 'stricter' | 'exact';
  customRules?: {
    targetMultiplier?: number;
    additionalRequirements?: string[];
  };
  createdAt: string;
}

// Community
export interface Community {
  id: string;
  name: string;
  description?: string;
  visibility: CommunityVisibility;
  ownerId: string;
  memberCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Community Member
export interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
  member: {
    id: string;
    handle: string;
    displayName: string;
    avatarUrl?: string;
  };
}

// Community Join Request
export interface CommunityJoinRequest {
  id: string;
  communityId: string;
  userId: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

// Post (for communities and squads)
export interface Post {
  id: string;
  authorId: string;
  type: PostType;
  text?: string;
  mediaUrls?: string[];
  habitId?: string;
  completionId?: string;
  scope: 'squad' | 'community';
  scopeId: string;
  likes: number;
  comments: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Post Like
export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

// Post Comment
export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

// Social Stats
export interface SocialStats {
  totalBuddies: number;
  activeBuddies: number;
  totalSquads: number;
  ownedSquads: number;
  totalCommunities: number;
  ownedCommunities: number;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
}

// Buddy Comparison Data
export interface BuddyComparison {
  habitId: string;
  habitName: string;
  yourStats: {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    lastCompleted?: string;
  };
  buddyStats: {
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    lastCompleted?: string;
  };
  sharedSince: string;
}

// Squad Leaderboard Entry
export interface SquadLeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  points: number;
  rank: number;
  habitsCompleted: number;
  streak: number;
}

// Community Feed Filter
export interface CommunityFeedFilter {
  type?: PostType;
  habitId?: string;
  timeRange?: 'today' | 'week' | 'month' | 'all';
  sortBy?: 'recent' | 'popular' | 'trending';
}

// Social Search Result
export interface SocialSearchResult {
  type: 'user' | 'squad' | 'community';
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  matchScore: number;
  isMember?: boolean;
  isFriend?: boolean;
}

// Invite Link
export interface InviteLink {
  id: string;
  type: 'friend' | 'squad' | 'community';
  targetId: string;
  code: string;
  expiresAt?: string;
  maxUses?: number;
  currentUses: number;
  createdBy: string;
  createdAt: string;
}

// QR Code Data
export interface QRCodeData {
  type: 'friend' | 'squad' | 'community';
  targetId: string;
  code: string;
  expiresAt?: string;
}

// Social State Management
export interface SocialState {
  activeTab: 'buddies' | 'squads' | 'communities';
  selectedBuddy?: BuddyMember;
  selectedSquad?: Squad;
  selectedCommunity?: Community;
  showFriendsPopover: boolean;
  showInviteModal: boolean;
  showJoinRequestModal: boolean;
  searchQuery: string;
  searchResults: SocialSearchResult[];
  isLoading: boolean;
}

// Social Actions
export interface SocialActions {
  sendFriendRequest: (recipientId: string, message?: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  declineFriendRequest: (requestId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  shareHabit: (buddyId: string, habitId: string, rules: any) => Promise<void>;
  createSquad: (data: Partial<Squad>) => Promise<void>;
  joinSquad: (squadId: string) => Promise<void>;
  leaveSquad: (squadId: string) => Promise<void>;
  createCommunity: (data: Partial<Community>) => Promise<void>;
  joinCommunity: (communityId: string, message?: string) => Promise<void>;
  leaveCommunity: (communityId: string) => Promise<void>;
  createPost: (data: Partial<Post>) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
  commentOnPost: (postId: string, text: string) => Promise<void>;
  searchSocial: (query: string) => Promise<SocialSearchResult[]>;
  generateInviteLink: (type: string, targetId: string) => Promise<InviteLink>;
  generateQRCode: (type: string, targetId: string) => Promise<QRCodeData>;
}

