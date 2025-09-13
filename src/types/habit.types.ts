export type HabitType = 'binary' | 'numeric';
export type CadenceType = 'daily' | 'weekly' | 'custom';
export type ProofType = 'none' | 'geo' | 'photo' | 'video' | 'approval';
export type CompletionEmotion = 'happy' | 'neutral' | 'sad';

export interface HabitCadence {
  type: CadenceType;
  customDays?: number[]; // 0-6 for Sunday-Saturday
  cutoffTime?: string; // HH:mm format
  gracePeriod?: number; // minutes
}

export interface HabitReminder {
  id: string;
  time: string; // HH:mm format
  days: number[]; // 0-6 for Sunday-Saturday
  enabled: boolean;
  message?: string;
}

export interface HabitConsequence {
  id: string;
  description: string;
  amount?: number; // for monetary consequences
  type: 'monetary' | 'time' | 'custom';
  enabled: boolean;
}

export interface HabitProof {
  type: ProofType;
  required: boolean;
  geoLocation?: {
    latitude: number;
    longitude: number;
    radius: number; // meters
  };
  mediaSettings?: {
    maxSize: number; // MB
    allowedTypes: string[];
  };
}

export interface HabitShare {
  id: string;
  type: 'buddy' | 'squad' | 'community';
  targetId: string;
  enabled: boolean;
  requireApproval: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO string
  emotion: CompletionEmotion;
  value?: number; // for numeric habits
  proof?: {
    type: ProofType;
    data?: any;
    approved?: boolean;
    approvedBy?: string;
    approvedAt?: string;
  };
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: HabitType;
  icon: string;
  color: string;
  isNegative: boolean;
  order: number;
  cadence: HabitCadence;
  reminders: HabitReminder[];
  consequences: HabitConsequence[];
  proof: HabitProof;
  shares: HabitShare[];
  targetValue?: number; // for numeric habits
  unit?: string; // for numeric habits
  streak: number;
  totalCompletions: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface HabitGroup {
  id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
  order: number;
  habits: Habit[];
  createdAt: string;
  updatedAt: string;
}

export interface HabitStats {
  habitId: string;
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // percentage
  averageEmotion: number; // 1-3 scale
  lastCompleted?: string;
  nextDue?: string;
}

export interface HabitCompetition {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  participants: string[];
  leaderboard: {
    userId: string;
    score: number;
    rank: number;
  }[];
  rules: {
    scoringMethod: 'completions' | 'streak' | 'emotion';
    tieBreaker: 'time' | 'random';
  };
  isActive: boolean;
}

export interface HabitTrend {
  habitId: string;
  period: 'week' | 'month' | 'year';
  data: {
    date: string;
    completions: number;
    emotion: number;
    streak: number;
  }[];
}

// API Response types
export interface CreateHabitRequest {
  name: string;
  description?: string;
  type: HabitType;
  icon: string;
  color: string;
  isNegative: boolean;
  cadence: HabitCadence;
  reminders?: HabitReminder[];
  consequences?: HabitConsequence[];
  proof: HabitProof;
  shares?: HabitShare[];
  targetValue?: number;
  unit?: string;
  groupId?: string;
}

export interface UpdateHabitRequest extends Partial<CreateHabitRequest> {
  id: string;
}

export interface CompleteHabitRequest {
  habitId: string;
  emotion: CompletionEmotion;
  value?: number;
  proof?: {
    type: ProofType;
    data?: any;
  };
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ApproveHabitRequest {
  completionId: string;
  approved: boolean;
  notes?: string;
}

// Real-time event types
export interface HabitEvent {
  type: 'completion' | 'approval' | 'reminder' | 'streak';
  habitId: string;
  userId: string;
  data: any;
  timestamp: string;
}

// Utility types
export type HabitFilter = {
  groupId?: string;
  type?: HabitType;
  isActive?: boolean;
  search?: string;
};

export type HabitSort = {
  field: 'name' | 'streak' | 'lastCompleted' | 'order';
  direction: 'asc' | 'desc';
};

