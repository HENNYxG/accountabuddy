import { EventEmitter } from 'events';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface HabitCompletionPayload {
  kind: 'habit_completion';
  habitId?: string;
  habitName: string;
  photoUrl: string;
  completedByName: string;
  requiresApproval: boolean;
  approved: boolean;
  likes: number;
  comments: number;
  location?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system';
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
  reactions?: Reaction[];
  replyTo?: ReplyTo;
  mentions?: string[];
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  system?: HabitCompletionPayload; // For system messages like habit completion
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'audio';
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  thumbnailUrl?: string;
}

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

export interface ReplyTo {
  messageId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system';
}

export interface Conversation {
  id: string;
  name: string;
  type: 'buddy' | 'squad' | 'community' | 'direct';
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isMuted: boolean;
  isOnline?: boolean;
  members?: ConversationMember[];
  participants: string[];
  linkedEntityId?: string; // ID of linked squad/community/buddy
  linkedEntityType?: 'squad' | 'community' | 'buddy';
  isGroupChat: boolean;
}

export interface ConversationMember {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  role?: 'owner' | 'moderator' | 'member';
  joinedAt: Date;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface NotificationSettings {
  userId: string;
  type: 'always' | 'never' | 'mentions_only';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

class MessagingService extends EventEmitter {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private users: Map<string, User> = new Map();
  private currentUserId: string = 'current-user';
  private notificationSettings: NotificationSettings = {
    userId: 'current-user',
    type: 'always',
    soundEnabled: true,
    vibrationEnabled: true
  };

  constructor() {
    super();
    this.initializeSupabase();
    this.initializeMockData();
  }

  private async initializeSupabase() {
    // Set up real-time subscriptions
    supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          this.handleMessageChange(payload);
        }
      )
      .subscribe();

    supabase
      .channel('conversations')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        (payload) => {
          this.handleConversationChange(payload);
        }
      )
      .subscribe();

    supabase
      .channel('reactions')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'message_reactions' },
        (payload) => {
          this.handleReactionChange(payload);
        }
      )
      .subscribe();
  }

  private handleMessageChange(payload: any) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    switch (eventType) {
      case 'INSERT':
        this.handleNewMessage(newRecord);
        break;
      case 'UPDATE':
        this.handleMessageUpdate(newRecord);
        break;
      case 'DELETE':
        this.handleMessageDelete(oldRecord);
        break;
    }
  }

  private handleConversationChange(payload: any) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    switch (eventType) {
      case 'INSERT':
        this.handleNewConversation(newRecord);
        break;
      case 'UPDATE':
        this.handleConversationUpdate(newRecord);
        break;
      case 'DELETE':
        this.handleConversationDelete(oldRecord);
        break;
    }
  }

  private handleReactionChange(payload: any) {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    switch (eventType) {
      case 'INSERT':
        this.handleNewReaction(newRecord);
        break;
      case 'DELETE':
        this.handleReactionDelete(oldRecord);
        break;
    }
  }

  private handleNewMessage(messageData: any) {
    const isSystem = messageData.type === 'system';
    const message: Message = {
      id: messageData.id,
      conversationId: messageData.conversation_id,
      senderId: messageData.sender_id,
      senderName: messageData.sender_name,
      senderAvatar: messageData.sender_avatar,
      content: messageData.content || '',
      timestamp: new Date(messageData.created_at),
      isOwn: messageData.sender_id === this.currentUserId,
      type: isSystem ? 'system' : messageData.type,
      status: messageData.status || 'sent',
      attachments: messageData.attachments || [],
      reactions: messageData.reactions || [],
      replyTo: messageData.reply_to,
      mentions: messageData.mentions || [],
      mediaUrl: messageData.media_url,
      fileName: messageData.file_name,
      fileSize: messageData.file_size,
      mimeType: messageData.mime_type,
      system: messageData.system || undefined
    };

    const conversationMessages = this.messages.get(message.conversationId) || [];
    conversationMessages.push(message);
    this.messages.set(message.conversationId, conversationMessages);

    const conversation = this.conversations.get(message.conversationId);
    if (conversation) {
      conversation.lastMessage = isSystem && message.system?.kind === 'habit_completion' ? `${message.senderName} finished ${message.system.habitName}` : message.content;
      conversation.timestamp = message.timestamp;
      if (!message.isOwn) {
        conversation.unreadCount++;
      }
      this.emit('conversationUpdated', conversation);
    }

    this.emit('messageReceived', message);
  }

  private handleMessageUpdate(messageData: any) {
    const conversationMessages = this.messages.get(messageData.conversation_id);
    if (conversationMessages) {
      const messageIndex = conversationMessages.findIndex(m => m.id === messageData.id);
      if (messageIndex !== -1) {
        conversationMessages[messageIndex] = {
          ...conversationMessages[messageIndex],
          status: messageData.status || conversationMessages[messageIndex].status,
          reactions: messageData.reactions || conversationMessages[messageIndex].reactions,
          system: messageData.system || conversationMessages[messageIndex].system
        };
        this.emit('messageStatusChanged', conversationMessages[messageIndex]);
      }
    }
  }

  private handleMessageDelete(messageData: any) {
    const conversationMessages = this.messages.get(messageData.conversation_id);
    if (conversationMessages) {
      const filteredMessages = conversationMessages.filter(m => m.id !== messageData.id);
      this.messages.set(messageData.conversation_id, filteredMessages);
      this.emit('messageDeleted', messageData);
    }
  }

  private handleNewConversation(conversationData: any) {
    const conversation: Conversation = {
      id: conversationData.id,
      name: conversationData.name,
      type: conversationData.type,
      avatar: conversationData.avatar,
      lastMessage: conversationData.last_message || '',
      timestamp: new Date(conversationData.updated_at),
      unreadCount: conversationData.unread_count || 0,
      isMuted: conversationData.is_muted || false,
      members: conversationData.members || [],
      participants: conversationData.participants || [],
      linkedEntityId: conversationData.linked_entity_id,
      linkedEntityType: conversationData.linked_entity_type,
      isGroupChat: conversationData.is_group_chat || false
    };

    this.conversations.set(conversation.id, conversation);
    this.emit('conversationCreated', conversation);
  }

  private handleConversationUpdate(conversationData: any) {
    const conversation = this.conversations.get(conversationData.id);
    if (conversation) {
      Object.assign(conversation, {
        name: conversationData.name,
        lastMessage: conversationData.last_message,
        timestamp: new Date(conversationData.updated_at),
        unreadCount: conversationData.unread_count,
        isMuted: conversationData.is_muted,
        members: conversationData.members
      });
      this.emit('conversationUpdated', conversation);
    }
  }

  private handleConversationDelete(conversationData: any) {
    this.conversations.delete(conversationData.id);
    this.messages.delete(conversationData.id);
    this.emit('conversationDeleted', conversationData);
  }

  private handleNewReaction(reactionData: any) {
    const conversationMessages = this.messages.get(reactionData.conversation_id);
    if (conversationMessages) {
      const message = conversationMessages.find(m => m.id === reactionData.message_id);
      if (message) {
        const reaction: Reaction = {
          id: reactionData.id,
          emoji: reactionData.emoji,
          userId: reactionData.user_id,
          userName: reactionData.user_name,
          timestamp: new Date(reactionData.created_at)
        };
        
        if (!message.reactions) message.reactions = [];
        message.reactions.push(reaction);
        
        this.emit('reactionAdded', { message, reaction });
      }
    }
  }

  private handleReactionDelete(reactionData: any) {
    const conversationMessages = this.messages.get(reactionData.conversation_id);
    if (conversationMessages) {
      const message = conversationMessages.find(m => m.id === reactionData.message_id);
      if (message && message.reactions) {
        message.reactions = message.reactions.filter(r => r.id !== reactionData.id);
        this.emit('reactionRemoved', { message, reactionId: reactionData.id });
      }
    }
  }

  private initializeMockData() {
    const mockUsers: User[] = [
      { id: 'john-doe', username: 'johndoe', displayName: 'John Doe', avatar: 'JD', isOnline: true, lastSeen: new Date() },
      { id: 'sarah-kim', username: 'sarahkim', displayName: 'Sarah Kim', avatar: 'SK', isOnline: false, lastSeen: new Date(Date.now() - 1000 * 60 * 30) },
      { id: 'mike-johnson', username: 'mikejohnson', displayName: 'Mike Johnson', avatar: 'MJ', isOnline: true, lastSeen: new Date() },
      { id: 'alex-smith', username: 'alexsmith', displayName: 'Alex Smith', avatar: 'AS', isOnline: false, lastSeen: new Date() }
    ];
    mockUsers.forEach(user => this.users.set(user.id, user));

    const mockConversations: Conversation[] = [
      { id: '1', name: 'John Doe', type: 'direct', avatar: 'JD', lastMessage: 'Awesome! I\'m heading out for mine now. Wish me luck!', timestamp: new Date(Date.now() - 1000 * 60 * 30), unreadCount: 2, isMuted: false, isOnline: true, participants: ['current-user', 'john-doe'], isGroupChat: false },
      { id: '2', name: 'Sarah Kim', type: 'direct', avatar: 'SK', lastMessage: 'Just completed my reading goal for today! 📚', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), unreadCount: 0, isMuted: true, isOnline: false, participants: ['current-user', 'sarah-kim'], isGroupChat: false },
      { id: '3', name: 'Fitness Warriors', type: 'squad', avatar: 'FW', lastMessage: 'Mike: Great workout everyone! 💪', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), unreadCount: 5, isMuted: false, members: [
        { id: 'current-user', name: 'You', avatar: 'CU', isOnline: true, role: 'member', joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
        { id: 'mike-johnson', name: 'Mike Johnson', avatar: 'MJ', isOnline: true, role: 'owner', joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) },
        { id: 'alex-smith', name: 'Alex Smith', avatar: 'AS', isOnline: false, role: 'member', joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) }
      ], participants: ['current-user', 'mike-johnson', 'alex-smith'], linkedEntityId: 'squad-1', linkedEntityType: 'squad', isGroupChat: true }
    ];

    mockConversations.forEach(conversation => {
      this.conversations.set(conversation.id, conversation);
    });

    // Seed mock messages per conversation so lists populate
    const seededMessages: Record<string, Message[]> = {
      '1': [
        { id: '1-1', conversationId: '1', senderId: 'john-doe', senderName: 'John Doe', content: 'Hey! How\'s your morning run going?', timestamp: new Date(Date.now() - 1000 * 60 * 35), isOwn: false, type: 'text', status: 'read' },
        { id: '1-2', conversationId: '1', senderId: 'current-user', senderName: 'You', content: 'Great! Just finished 5km. Feeling energized!', timestamp: new Date(Date.now() - 1000 * 60 * 32), isOwn: true, type: 'text', status: 'read' },
        { id: '1-3', conversationId: '1', senderId: 'john-doe', senderName: 'John Doe', content: 'Awesome! I\'m heading out for mine now. Wish me luck!', timestamp: new Date(Date.now() - 1000 * 60 * 30), isOwn: false, type: 'text', status: 'delivered' }
      ],
      '2': [
        { id: '2-1', conversationId: '2', senderId: 'sarah-kim', senderName: 'Sarah Kim', content: 'Just completed my reading goal for today! 📚', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), isOwn: false, type: 'text', status: 'read' }
      ],
      '3': [
        { id: '3-1', conversationId: '3', senderId: 'mike-johnson', senderName: 'Mike', content: 'Great workout everyone! 💪', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), isOwn: false, type: 'text', status: 'delivered' },
        { id: '3-2', conversationId: '3', senderId: 'alex-smith', senderName: 'Alex', content: 'That was intense! 🔥', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), isOwn: false, type: 'text', status: 'delivered' }
      ]
    };

    Object.entries(seededMessages).forEach(([cid, msgs]) => this.messages.set(cid, msgs));
  }

  async getConversations(): Promise<Conversation[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map(this.mapConversationFromDB);
    } catch (error) {
      return Array.from(this.conversations.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      return data.map(this.mapMessageFromDB);
    } catch (error) {
      return this.messages.get(conversationId) || [];
    }
  }

  async sendMessage(conversationId: string, content: string, options?: {
    attachments?: Attachment[];
    replyTo?: ReplyTo;
    mentions?: string[];
  }): Promise<Message> {
    try {
      const messageData = {
        conversation_id: conversationId,
        sender_id: this.currentUserId,
        sender_name: 'You',
        content,
        type: 'text',
        status: 'sent',
        attachments: options?.attachments || [],
        reply_to: options?.replyTo,
        mentions: options?.mentions || [],
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;

      const message = this.mapMessageFromDB(data);
      await this.updateConversationLastMessage(conversationId, content);
      this.emit('messageSent', message);
      return message;
    } catch (error) {
      // Fallback local add
      const message: Message = {
        id: `${conversationId}-${Date.now()}`,
        conversationId,
        senderId: this.currentUserId,
        senderName: 'You',
        content,
        timestamp: new Date(),
        isOwn: true,
        type: 'text',
        status: 'sent'
      };
      const existing = this.messages.get(conversationId) || [];
      existing.push(message);
      this.messages.set(conversationId, existing);
      const conversation = this.conversations.get(conversationId);
      if (conversation) {
        conversation.lastMessage = content;
        conversation.timestamp = message.timestamp;
        this.emit('conversationUpdated', conversation);
      }
      this.emit('messageSent', message);
      return message;
    }
  }

  async uploadAttachment(file: File, conversationId: string): Promise<Attachment> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `attachments/${conversationId}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('message-attachments')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('message-attachments')
        .getPublicUrl(filePath);

      const attachment: Attachment = {
        id: data.path,
        type: this.getFileType(file.type),
        url: publicUrl,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        thumbnailUrl: this.getFileType(file.type) === 'image' ? publicUrl : undefined
      };

      return attachment;
    } catch (error) {
      // Fallback: create a fake public URL
      return {
        id: `${conversationId}-${Date.now()}`,
        type: this.getFileType(file.type),
        url: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      };
    }
  }

  // System: habit completion notification
  async sendHabitCompletionNotification(input: {
    conversationId: string;
    habitName: string;
    photoUrl: string;
    completedByName: string;
    requiresApproval: boolean;
  }): Promise<Message> {
    const system: HabitCompletionPayload = {
      kind: 'habit_completion',
      habitName: input.habitName,
      photoUrl: input.photoUrl,
      completedByName: input.completedByName,
      requiresApproval: input.requiresApproval,
      approved: !input.requiresApproval,
      likes: 0,
      comments: 0
    };

    const message: Message = {
      id: `${input.conversationId}-sys-${Date.now()}`,
      conversationId: input.conversationId,
      senderId: 'system',
      senderName: input.completedByName,
      content: '',
      timestamp: new Date(),
      isOwn: false,
      type: 'system',
      status: 'sent',
      system
    };

    const msgs = this.messages.get(input.conversationId) || [];
    msgs.push(message);
    this.messages.set(input.conversationId, msgs);

    const conversation = this.conversations.get(input.conversationId);
    if (conversation) {
      conversation.lastMessage = `${input.completedByName} finished ${input.habitName}`;
      conversation.timestamp = message.timestamp;
      this.emit('conversationUpdated', conversation);
    }

    this.emit('messageReceived', message);
    return message;
  }

  async approveHabitCompletion(conversationId: string, messageId: string, approved: boolean): Promise<void> {
    const msgs = this.messages.get(conversationId) || [];
    const msg = msgs.find(m => m.id === messageId);
    if (msg && msg.type === 'system' && msg.system?.kind === 'habit_completion') {
      msg.system.approved = approved;
      this.emit('messageStatusChanged', msg);
    }
  }

  async likeHabitCompletion(conversationId: string, messageId: string): Promise<void> {
    const msgs = this.messages.get(conversationId) || [];
    const msg = msgs.find(m => m.id === messageId);
    if (msg && msg.type === 'system' && msg.system?.kind === 'habit_completion' && msg.system.approved) {
      msg.system.likes += 1;
      this.emit('messageStatusChanged', msg);
    }
  }

  async addReaction(messageId: string, emoji: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('message_reactions')
        .insert([{ message_id: messageId, user_id: this.currentUserId, user_name: 'You', emoji, created_at: new Date().toISOString() }]);
      if (error) throw error;
    } catch (error) {
      // Fallback local
      this.messages.forEach((msgs: Message[]) => {
        const found = msgs.find((m: Message) => m.id === messageId);
        if (found) {
          const reaction: Reaction = { id: `${messageId}-${Date.now()}`, emoji, userId: this.currentUserId, userName: 'You', timestamp: new Date() };
          if (!found.reactions) found.reactions = [];
          found.reactions.push(reaction);
          this.emit('reactionAdded', { message: found, reaction });
        }
      });
    }
  }

  async removeReaction(messageId: string, emoji: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('message_reactions')
        .delete()
        .eq('message_id', messageId)
        .eq('user_id', this.currentUserId)
        .eq('emoji', emoji);
      if (error) throw error;
    } catch (error) {
      // Fallback local
      this.messages.forEach((msgs: Message[]) => {
        const found = msgs.find((m: Message) => m.id === messageId);
        if (found && found.reactions) {
          const before = found.reactions.length;
          found.reactions = found.reactions.filter((r: Reaction) => !(r.userId === this.currentUserId && r.emoji === emoji));
          if (found.reactions.length !== before) this.emit('reactionRemoved', { message: found, reactionId: `${messageId}-local` });
        }
      });
    }
  }

  async createConversation(options: { name: string; type: 'direct' | 'squad' | 'community'; participants: string[]; linkedEntityId?: string; linkedEntityType?: 'squad' | 'community' | 'buddy'; }): Promise<Conversation> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ name: options.name, type: options.type, avatar: this.generateAvatar(options.name), participants: options.participants, linked_entity_id: options.linkedEntityId, linked_entity_type: options.linkedEntityType, is_group_chat: options.participants.length > 2, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
        .select()
        .single();
      if (error) throw error;
      const conversation = this.mapConversationFromDB(data);
      this.conversations.set(conversation.id, conversation);
      this.emit('conversationCreated', conversation);
      return conversation;
    } catch {
      const conversation: Conversation = { id: `${Date.now()}`, name: options.name, type: options.type, avatar: this.generateAvatar(options.name), lastMessage: '', timestamp: new Date(), unreadCount: 0, isMuted: false, participants: options.participants, linkedEntityId: options.linkedEntityId, linkedEntityType: options.linkedEntityType, isGroupChat: options.participants.length > 2 };
      this.conversations.set(conversation.id, conversation);
      this.messages.set(conversation.id, []);
      this.emit('conversationCreated', conversation);
      return conversation;
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const { data, error } = await supabase.from('users').select('*').or(`username.ilike.%${query}%,display_name.ilike.%${query}%`).limit(10);
      if (error) throw error;
      return data.map(this.mapUserFromDB);
    } catch {
      return Array.from(this.users.values()).filter(user => user.username.toLowerCase().includes(query.toLowerCase()) || user.displayName.toLowerCase().includes(query.toLowerCase()));
    }
  }

  async markAsRead(conversationId: string): Promise<void> {
    try {
      await supabase.from('conversations').update({ unread_count: 0 }).eq('id', conversationId);
    } catch {}
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.unreadCount = 0;
      this.emit('conversationUpdated', conversation);
    }
  }

  async toggleMute(conversationId: string, duration?: string): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    const nextMuted = !conversation?.isMuted;
    const muteUntil = nextMuted && duration ? this.calculateMuteUntil(duration) : null;
    try {
      await supabase.from('conversations').update({ is_muted: nextMuted, mute_until: muteUntil }).eq('id', conversationId);
    } catch {}
    if (conversation) {
      conversation.isMuted = nextMuted;
      this.emit('conversationUpdated', conversation);
    }
  }

  async leaveConversation(conversationId: string): Promise<void> {
    try {
      await supabase.from('conversation_participants').delete().eq('conversation_id', conversationId).eq('user_id', this.currentUserId);
    } catch {}
    this.conversations.delete(conversationId);
    this.messages.delete(conversationId);
    this.emit('conversationLeft', conversationId);
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<void> {
    try {
      await supabase.from('user_notification_settings').upsert([{ user_id: this.currentUserId, ...settings }]);
    } catch {}
    this.notificationSettings = { ...this.notificationSettings, ...settings } as NotificationSettings;
    this.emit('notificationSettingsUpdated', this.notificationSettings);
  }

  getNotificationSettings(): NotificationSettings { return this.notificationSettings; }

  archiveConversation(conversationId: string): void { console.log(`Archiving conversation ${conversationId}`); }
  leaveSquad(conversationId: string): void { console.log(`Leaving squad ${conversationId}`); }

  // Participants management (mock)
  async getEligibleParticipants(conversationId: string): Promise<User[]> {
    const conv = this.conversations.get(conversationId);
    const currentIds = new Set(conv?.participants || []);
    return Array.from(this.users.values()).filter(u => !currentIds.has(u.id));
  }

  async addParticipants(conversationId: string, userIds: string[]): Promise<void> {
    const conv = this.conversations.get(conversationId);
    if (!conv) return;
    conv.participants = Array.from(new Set([...conv.participants, ...userIds]));
    if (conv.members) {
      userIds.forEach(uid => {
        const user = this.users.get(uid);
        if (user) conv.members!.push({ id: uid, name: user.displayName, avatar: user.avatar, isOnline: user.isOnline, role: 'member', joinedAt: new Date() });
      });
    }
    this.emit('conversationUpdated', conv);
  }

  private mapMessageFromDB(data: any): Message {
    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      senderName: data.sender_name,
      senderAvatar: data.sender_avatar,
      content: data.content || '',
      timestamp: new Date(data.created_at),
      isOwn: data.sender_id === this.currentUserId,
      type: data.type,
      status: data.status,
      attachments: data.attachments || [],
      reactions: data.reactions || [],
      replyTo: data.reply_to,
      mentions: data.mentions || [],
      mediaUrl: data.media_url,
      fileName: data.file_name,
      fileSize: data.file_size,
      mimeType: data.mime_type,
      system: data.system
    };
  }

  private mapConversationFromDB(data: any): Conversation {
    return { id: data.id, name: data.name, type: data.type, avatar: data.avatar, lastMessage: data.last_message || '', timestamp: new Date(data.updated_at), unreadCount: data.unread_count || 0, isMuted: data.is_muted || false, members: data.members || [], participants: data.participants || [], linkedEntityId: data.linked_entity_id, linkedEntityType: data.linked_entity_type, isGroupChat: data.is_group_chat || false };
  }

  private mapUserFromDB(data: any): User { return { id: data.id, username: data.username, displayName: data.display_name, avatar: data.avatar, isOnline: data.is_online, lastSeen: new Date(data.last_seen) }; }

  private async updateConversationLastMessage(conversationId: string, content: string): Promise<void> {
    try { await supabase.from('conversations').update({ last_message: content, updated_at: new Date().toISOString() }).eq('id', conversationId); } catch {}
  }

  private getFileType(mimeType: string): 'image' | 'video' | 'file' | 'audio' {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'file';
  }

  private generateAvatar(name: string): string { return name.split(' ').map(n => n[0]).join('').toUpperCase(); }

  private calculateMuteUntil(duration: string): Date { const now = new Date(); switch (duration) { case '1h': return new Date(now.getTime() + 60 * 60 * 1000); case '1d': return new Date(now.getTime() + 24 * 60 * 60 * 1000); case '1w': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); default: return now; } }

  onMessageSent(callback: (message: Message) => void): void { this.on('messageSent', callback); }
  onMessageReceived(callback: (message: Message) => void): void { this.on('messageReceived', callback); }
  onConversationUpdated(callback: (conversation: Conversation) => void): void { this.on('conversationUpdated', callback); }
  onMessageStatusChanged(callback: (message: Message) => void): void { this.on('messageStatusChanged', callback); }
  onReactionAdded(callback: (data: { message: Message; reaction: Reaction }) => void): void { this.on('reactionAdded', callback); }
  onReactionRemoved(callback: (data: { message: Message; reactionId: string }) => void): void { this.on('reactionRemoved', callback); }
  onConversationCreated(callback: (conversation: Conversation) => void): void { this.on('conversationCreated', callback); }
  onConversationLeft(callback: (conversationId: string) => void): void { this.on('conversationLeft', callback); }
  onNotificationSettingsUpdated(callback: (settings: NotificationSettings) => void): void { this.on('notificationSettingsUpdated', callback); }

  offMessageSent(callback: (message: Message) => void): void { this.off('messageSent', callback); }
  offMessageReceived(callback: (message: Message) => void): void { this.off('messageReceived', callback); }
  offConversationUpdated(callback: (conversation: Conversation) => void): void { this.off('conversationUpdated', callback); }
  offMessageStatusChanged(callback: (message: Message) => void): void { this.off('messageStatusChanged', callback); }
  offReactionAdded(callback: (data: { message: Message; reaction: Reaction }) => void): void { this.off('reactionAdded', callback); }
  offReactionRemoved(callback: (data: { message: Message; reactionId: string }) => void): void { this.off('reactionRemoved', callback); }
  offConversationCreated(callback: (conversation: Conversation) => void): void { this.off('conversationCreated', callback); }
  offConversationLeft(callback: (conversationId: string) => void): void { this.off('conversationLeft', callback); }
  offNotificationSettingsUpdated(callback: (settings: NotificationSettings) => void): void { this.off('notificationSettingsUpdated', callback); }
}

const messagingService = new MessagingService();
export default messagingService;
