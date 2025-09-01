import { supabase } from '../utils/supabase/supabase.utils';

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface UserSummary {
	id: string;
	username?: string;
	displayName?: string;
	handle?: string;
	avatarUrl?: string;
}

export interface FriendRecord {
	id: string;
	user1_id: string;
	user2_id: string;
	created_at: string;
}

export interface FriendRequestRecord {
	id: string;
	requester_id: string;
	recipient_id: string;
	status: FriendRequestStatus;
	message?: string;
	created_at: string;
	updated_at: string;
}

async function getCurrentUserId(): Promise<string | null> {
	try {
		const { data } = await supabase.auth.getUser();
		return data?.user?.id ?? null;
	} catch {
		return null;
	}
}

export async function searchUsers(query: string): Promise<UserSummary[]> {
	if (!query.trim()) return [];
	// Try DB search; fallback to empty if not available
	const ilike = `%${query}%`;
	const { data, error } = await supabase
		.from('users')
		.select('id, username, display_name, avatar')
		.or(`username.ilike.${ilike},display_name.ilike.${ilike}`)
		.limit(10);
	if (error) return [];
	return (data || []).map((u: any) => ({
		id: u.id,
		username: u.username,
		displayName: u.display_name,
		avatarUrl: u.avatar || undefined,
	}));
}

export async function listFriendRequests(): Promise<FriendRequestRecord[]> {
	const userId = await getCurrentUserId();
	if (!userId) return [];
	const { data, error } = await supabase
		.from('friend_requests')
		.select('*')
		.or(`requester_id.eq.${userId},recipient_id.eq.${userId}`)
		.order('created_at', { ascending: false });
	if (error) return [];
	return data as FriendRequestRecord[];
}

export async function listFriends(): Promise<FriendRecord[]> {
	const userId = await getCurrentUserId();
	if (!userId) return [];
	const { data, error } = await supabase
		.from('friends')
		.select('*')
		.or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
		.order('created_at', { ascending: false });
	if (error) return [];
	return data as FriendRecord[];
}

export async function sendFriendRequest(recipientId: string, message?: string): Promise<FriendRequestRecord | null> {
	const userId = await getCurrentUserId();
	if (!userId) throw new Error('Not authenticated');
	const { data, error } = await supabase
		.from('friend_requests')
		.insert([{ requester_id: userId, recipient_id: recipientId, message }])
		.select()
		.single();
	if (error) throw error;
	return data as FriendRequestRecord;
}

export async function cancelFriendRequest(requestId: string): Promise<void> {
	await supabase.from('friend_requests').delete().eq('id', requestId);
}

export async function acceptFriendRequest(requestId: string): Promise<void> {
	// Transactionally: set status accepted and create friends row via RPC or sequentially
	const { data: req, error } = await supabase
		.from('friend_requests')
		.update({ status: 'accepted' })
		.eq('id', requestId)
		.select('requester_id, recipient_id')
		.single();
	if (error) throw error;
	const { requester_id, recipient_id } = req as any;
	await supabase.from('friends').insert([{ user1_id: requester_id, user2_id: recipient_id }]);
}

export async function declineFriendRequest(requestId: string): Promise<void> {
	await supabase
		.from('friend_requests')
		.update({ status: 'declined' })
		.eq('id', requestId);
}

export async function removeFriend(friendId: string): Promise<void> {
	await supabase.from('friends').delete().eq('id', friendId);
}

export async function blockUser(targetUserId: string, reason?: string): Promise<void> {
	const userId = await getCurrentUserId();
	if (!userId) throw new Error('Not authenticated');
	await supabase.from('user_blocks').insert([{ blocker_id: userId, blocked_id: targetUserId, reason }]);
}

export async function reportUser(targetUserId: string, reason: string): Promise<void> {
	const userId = await getCurrentUserId();
	if (!userId) throw new Error('Not authenticated');
	await supabase.from('user_reports').insert([{ reporter_id: userId, target_user_id: targetUserId, reason }]);
}

