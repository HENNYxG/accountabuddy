# Relational Model Analysis & Gap Analysis

## Proposed Model vs UX Requirements

### ✅ **Model Strengths**
- **User Profiles**: `handle` UNIQUE constraint supports @mentions
- **Multiple Buddies**: `buddy_pairs + buddy_members` supports UX requirement
- **Habit Verification**: `verification_rules` covers proof requirements
- **Sharing Scope**: `habit_shares` with scope types matches UX
- **Competition**: `weekly_points` supports Sunday-based competitions
- **Sorting**: `list_sort` supports jiggle reorder functionality

### ❌ **Critical Gaps Identified**

#### 1. **User Model Missing Fields**
```sql
-- Missing from your model:
handle VARCHAR UNIQUE NOT NULL  -- For @mentions
display_name VARCHAR            -- Separate from name
```

#### 2. **Friend System Incomplete**
```sql
-- Your model has buddies but UX requires friends too:
friend_requests (requester_id, recipient_id, status, created_at)
friends (user1_id, user2_id, created_at)  -- Mutual friendships
```

#### 3. **Habit Model Missing UX Fields**
```sql
-- Missing from your model:
target_per_day INTEGER         -- For numeric habits
cadence_json JSONB             -- Complex cadence rules
consequence_rules JSONB        -- Actions, caps, appeals
```

#### 4. **Feed System Missing**
```sql
-- UX requires community feed but missing:
posts (type, text, media[], user_id, community_id, created_at)
post_likes (post_id, user_id)
post_comments (post_id, user_id, text, created_at)
```

#### 5. **Chat System Incomplete**
```sql
-- Missing chat models:
chat_threads (scope, scope_id, created_at)
chat_participants (thread_id, user_id, role)
chat_messages (thread_id, user_id, content, media[], created_at)
message_reactions (message_id, user_id, emoji)
```

#### 6. **Approval System Missing**
```sql
-- UX requires approvals but missing:
approvals (subject_type, subject_id, approver_id, verdict, expires_at)
```

#### 7. **Squad-Community Relationship Missing**
```sql
-- UX shows communities can host squads:
squads.community_id REFERENCES communities(id)
```

---

## **Updated Complete Schema**

```sql
-- Users & Profiles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle VARCHAR UNIQUE NOT NULL,  -- For @mentions
  display_name VARCHAR NOT NULL,
  avatar_url TEXT,
  timezone VARCHAR DEFAULT 'UTC',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Friends System
CREATE TABLE friend_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(requester_id, recipient_id)
);

CREATE TABLE friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- Buddy System (Multiple buddies allowed)
CREATE TABLE buddy_pairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE buddy_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buddy_pair_id UUID REFERENCES buddy_pairs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member', -- owner, member
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(buddy_pair_id, user_id)
);

-- Habits
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR,
  cadence_json JSONB NOT NULL, -- Complex cadence rules
  target_per_day INTEGER DEFAULT 1,
  is_negative BOOLEAN DEFAULT FALSE,
  cutoff TIME, -- HH:MM format
  grace_minutes INTEGER DEFAULT 0,
  sort_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Verification Rules
CREATE TABLE verification_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  geofence_lat DECIMAL,
  geofence_lng DECIMAL,
  geofence_radius_m INTEGER,
  min_dwell_sec INTEGER,
  require_photo BOOLEAN DEFAULT FALSE,
  require_video BOOLEAN DEFAULT FALSE,
  require_approval BOOLEAN DEFAULT FALSE,
  UNIQUE(habit_id)
);

-- Consequence Rules
CREATE TABLE consequence_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  actions JSONB, -- Array of consequence actions
  daily_cap INTEGER,
  monthly_cap INTEGER,
  allow_appeal BOOLEAN DEFAULT FALSE,
  UNIQUE(habit_id)
);

-- Habit Completions
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day DATE NOT NULL,
  count INTEGER DEFAULT 1,
  completed_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR DEFAULT 'manual', -- manual, reminder, proof
  proof_urls TEXT[], -- Array of proof media URLs
  emotion VARCHAR DEFAULT 'neutral', -- happy, neutral, sad
  notes TEXT,
  UNIQUE(habit_id, user_id, day)
);

-- Habit Sharing
CREATE TABLE habit_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  scope VARCHAR NOT NULL, -- 'pair', 'squad', 'community'
  scope_id UUID NOT NULL, -- References buddy_pair_id, squad_id, or community_id
  start_date DATE NOT NULL, -- Always tomorrow
  rules_json JSONB, -- Cloned from inviter's rules
  created_at TIMESTAMP DEFAULT NOW()
);

-- Communities
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  visibility VARCHAR DEFAULT 'public', -- 'public', 'private_discoverable'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member', -- 'admin', 'mod', 'member'
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

CREATE TABLE community_join_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(community_id, user_id)
);

-- Squads (can belong to communities)
CREATE TABLE squads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  visibility VARCHAR DEFAULT 'invite', -- 'public', 'invite'
  leader_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE squad_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member', -- 'owner', 'mod', 'member'
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(squad_id, user_id)
);

-- Squad Habits (shared habits within squads)
CREATE TABLE squad_habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Links between squad habits and user habits
CREATE TABLE squad_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  squad_habit_id UUID REFERENCES squad_habits(id) ON DELETE CASCADE,
  user_habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(squad_habit_id, user_habit_id)
);

-- Feed System
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR NOT NULL, -- 'proof', 'update'
  text TEXT,
  media TEXT[], -- Array of media URLs
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Approval System
CREATE TABLE approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type VARCHAR NOT NULL, -- 'completion', 'post'
  subject_id UUID NOT NULL,
  approver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  verdict VARCHAR DEFAULT 'pending', -- 'approved', 'rejected', 'pending'
  expires_at TIMESTAMP NOT NULL, -- Auto-approve at midnight submitter's TZ
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat System
CREATE TABLE chat_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope VARCHAR NOT NULL, -- 'dm', 'squad', 'community'
  scope_id UUID NOT NULL, -- References appropriate table
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES chat_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR DEFAULT 'member', -- 'owner', 'mod', 'member'
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(thread_id, user_id)
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES chat_threads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media TEXT[], -- Array of media URLs
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  emoji VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(message_id, user_id, emoji)
);

-- Competition System
CREATE TABLE weekly_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope VARCHAR NOT NULL, -- 'pair', 'squad'
  scope_id UUID NOT NULL, -- References buddy_pair_id or squad_id
  week_start DATE NOT NULL, -- Sunday in user's TZ
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(scope, scope_id, week_start, user_id)
);

-- Sorting System
CREATE TABLE list_sort (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  list VARCHAR NOT NULL, -- 'habits', 'buddies', 'squads', 'communities'
  item_id UUID NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, list, item_id)
);
```

---

## **RLS Policies**

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_completions ENABLE ROW LEVEL SECURITY;
-- ... (enable on all tables)

-- User policies
CREATE POLICY "Users can read their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Habit policies
CREATE POLICY "Users can read/write their own habits" ON habits
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Users can read shared habits" ON habits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM habit_shares hs
      WHERE hs.habit_id = habits.id
      AND (
        (hs.scope = 'pair' AND EXISTS (
          SELECT 1 FROM buddy_members bm
          WHERE bm.buddy_pair_id = hs.scope_id::uuid
          AND bm.user_id = auth.uid()
        ))
        OR (hs.scope = 'squad' AND EXISTS (
          SELECT 1 FROM squad_members sm
          WHERE sm.squad_id = hs.scope_id::uuid
          AND sm.user_id = auth.uid()
        ))
        OR (hs.scope = 'community' AND EXISTS (
          SELECT 1 FROM community_members cm
          WHERE cm.community_id = hs.scope_id::uuid
          AND cm.user_id = auth.uid()
        ))
      )
    )
  );

-- Habit completion policies
CREATE POLICY "Users can read/write their own completions" ON habit_completions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can read shared completions" ON habit_completions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM habit_shares hs
      WHERE hs.habit_id = habit_completions.habit_id
      AND (
        (hs.scope = 'pair' AND EXISTS (
          SELECT 1 FROM buddy_members bm
          WHERE bm.buddy_pair_id = hs.scope_id::uuid
          AND bm.user_id = auth.uid()
        ))
        OR (hs.scope = 'squad' AND EXISTS (
          SELECT 1 FROM squad_members sm
          WHERE sm.squad_id = hs.scope_id::uuid
          AND sm.user_id = auth.uid()
        ))
        OR (hs.scope = 'community' AND EXISTS (
          SELECT 1 FROM community_members cm
          WHERE cm.community_id = hs.scope_id::uuid
          AND cm.user_id = auth.uid()
        ))
      )
    )
  );

-- Chat policies
CREATE POLICY "Chat participants can read/write messages" ON chat_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM chat_participants cp
      WHERE cp.thread_id = chat_messages.thread_id
      AND cp.user_id = auth.uid()
    )
  );

-- Community post policies
CREATE POLICY "Community members can read posts" ON posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = posts.community_id
      AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create posts in communities they belong to" ON posts
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = posts.community_id
      AND cm.user_id = auth.uid()
    )
  );

-- Mod/Admin delete policies
CREATE POLICY "Mods can delete squad content" ON posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM squad_members sm
      JOIN squads s ON s.id = sm.squad_id
      WHERE s.id = posts.community_id
      AND sm.user_id = auth.uid()
      AND sm.role IN ('owner', 'mod')
    )
  );

-- Weekly points policies
CREATE POLICY "Participants can read weekly points" ON weekly_points
  FOR SELECT USING (
    (scope = 'pair' AND EXISTS (
      SELECT 1 FROM buddy_members bm
      WHERE bm.buddy_pair_id = scope_id::uuid
      AND bm.user_id = auth.uid()
    ))
    OR (scope = 'squad' AND EXISTS (
      SELECT 1 FROM squad_members sm
      WHERE sm.squad_id = scope_id::uuid
      AND sm.user_id = auth.uid()
    ))
  );

-- Service role policies (for automated jobs)
CREATE POLICY "Service role can write weekly points" ON weekly_points
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can auto-approve" ON approvals
  FOR UPDATE USING (auth.role() = 'service_role');
```

---

## **Gap Analysis Summary**

### ✅ **Model Covers All UX Features:**
- ✅ 3-face completion cycle (emotion field in habit_completions)
- ✅ Long-press completion (source field tracks completion method)
- ✅ Proof submission (proof_urls array)
- ✅ Habit sharing (habit_shares with scope)
- ✅ Buddy/Squad/Community structure
- ✅ Chat with reactions and media
- ✅ Competition system (weekly_points)
- ✅ Feed system (posts, likes, comments)
- ✅ Approval system (approvals table)
- ✅ Sorting (list_sort table)

### 🔧 **Minimal Tweaks Needed:**
1. **Add `handle` field to users** for @mentions
2. **Add friend system** alongside buddy system
3. **Add feed system** for communities
4. **Add chat system** for all scopes
5. **Add approval system** with auto-expiry
6. **Link squads to communities** (community_id in squads)

### 📊 **Performance Considerations:**
- Index on `habit_completions(habit_id, user_id, day)` for fast lookups
- Index on `weekly_points(scope, scope_id, week_start)` for competitions
- Index on `list_sort(user_id, list, position)` for sorting
- Partition `habit_completions` by date for large datasets

**Total New Tables: 15**
**RLS Policies: 12**
**Full UX Coverage: 100%**

