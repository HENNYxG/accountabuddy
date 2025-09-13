# AccountaBuddy UX Specification

## Design System Foundation

### Color Palette (Preserved)
- **Primary**: `#A07CFE` (Purple)
- **Secondary**: `#FE8FB5` (Pink) 
- **Accent**: `#FFBE7B` (Orange)
- **Background**: `#e0dad1` (Ivory)
- **Text**: `#27272A` (Charcoal)
- **Stone**: `#565453` (Secondary text)

### Typography (Preserved)
- **Font Family**: Clash Display (Variable weights)
- **Card Design**: `rounded-3xl` with `ShineBorder` gradient
- **Grid Layout**: Responsive with `clamp()` sizing

### Component Patterns (Preserved)
- **Habit Cards**: `150px × 200px` with 3-row grid layout
- **Progress Rings**: Recharts PieChart with custom colors
- **Icons**: FontAwesome + custom SVG icons
- **Navigation**: Bottom tab bar with purple accent

---

## Tab Navigation & Behavior

### Bottom Tab Structure
```
[🏠 Home] [📋 Habits] [👥 Social] [💬 Chat] [📊 Trends]
```

**Active State**: Purple background (`bg-purple-600`) with white text
**Inactive State**: Gray text (`text-gray-600`) with hover states
**Settings**: Gear icon (⚙️) in top-right of tab bar

---

## Home Tab: "What needs my attention now?"

### Layout Structure
```
┌─────────────────────────────────────┐
│ Header: "What needs my attention?"  │
├─────────────────────────────────────┤
│ Outstanding Section                 │
│ ├ Due Now (red accent)              │
│ └ Due Next (orange accent)          │
├─────────────────────────────────────┤
│ Nudges Section                      │
│ ├ Buddy completions                 │
│ └ Streak milestones                 │
├─────────────────────────────────────┤
│ Quick Stats Cards (3-column)        │
│ ├ Today %                           │
│ ├ Current Streak                    │
│ └ Perfect Days                      │
├─────────────────────────────────────┤
│ Coach Tip (if enabled)              │
├─────────────────────────────────────┤
│ Approval Items                      │
│ ├ Pending approvals                 │
│ └ Decision buttons                  │
└─────────────────────────────────────┘
```

### Desktop Right Rail (lg+ breakpoint)
```
┌─────────────────┬─────────────────┐
│ Main Content    │ Right Rail      │
│                 │ ┌─────────────┐ │
│                 │ │ Progress    │ │
│                 │ │ Donut       │ │
│                 │ └─────────────┘ │
│                 │ ┌─────────────┐ │
│                 │ │ Mini        │ │
│                 │ │ Calendar    │ │
│                 │ └─────────────┘ │
└─────────────────┴─────────────────┘
```

### New Components Required
- `OutstandingCard` - Red/orange accent cards
- `NudgeCard` - Buddy activity notifications  
- `QuickStatsCard` - 3-column stat display
- `CoachTipCard` - AI coach insights
- `ApprovalCard` - Pending decisions
- `ProgressDonut` - Desktop right rail
- `MiniCalendar` - Desktop right rail

---

## Habits Tab: Enhanced Grid Layout

### Mobile Layout (2-column)
```
┌─────────┬─────────┐
│ Card 1  │ Card 2  │
├─────────┼─────────┤
│ Card 3  │ Card 4  │
├─────────┼─────────┤
│ Card 5  │ Card 6  │
└─────────┴─────────┘
```

### Desktop Layout (3-4 column)
```
┌─────────┬─────────┬─────────┬─────────┐
│ Card 1  │ Card 2  │ Card 3  │ Card 4  │
├─────────┼─────────┼─────────┼─────────┤
│ Card 5  │ Card 6  │ Card 7  │ Card 8  │
└─────────┴─────────┴─────────┴─────────┘
```

### Enhanced Habit Card Behavior

#### Tap Interaction (3-face cycle)
1. **First tap**: Happy face 😊 (green)
2. **Second tap**: Neutral face 😐 (yellow) 
3. **Third tap**: Sad face 😞 (red)
4. **Fourth tap**: Back to happy

#### Long-press Behavior
- **Binary habits**: Immediate completion
- **Numeric habits**: Counter opens, ring animates to target %

#### Card Elements (Preserved + Enhanced)
```
┌─────────────────────────────────┐
│ 👥 Group Icon    ⋯    🔥 5     │ ← Top row
├─────────────────────────────────┤
│                                 │
│        [Progress Ring]          │ ← Center (preserved)
│                                 │
├─────────────────────────────────┤
│      Habit Name                 │ ← Bottom (preserved)
└─────────────────────────────────┘
```

#### New Card Features
- **Three dots (⋯)**: Face indicator + drag handle
- **Group icon (👥)**: Shows overlay of all shares
- **Streak chip (🔥)**: Top-right with count
- **Jiggle mode**: Reorder with drag handles

### New Components Required
- `EmotionCycle` - 3-face tap interaction
- `NumericCounter` - Long-press counter modal
- `GroupOverlay` - Share visualization
- `DragHandle` - Reorder functionality
- `JiggleMode` - Reorder state

---

## Social Tab: Three-pill Structure

### Header Pills
```
[👥 Buddies] [🏢 Squads] [🌍 Communities]
```

### Buddies Section
```
┌─────────────────────────────────────┐
│ Buddy List                          │
│ ┌─────────────────────────────────┐ │
│ │ 👤 John Doe                     │ │
│ │ 5 habits shared • Active        │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 👤 Jane Smith                   │ │
│ │ 3 habits shared • Pending       │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Add New Buddy: [Email] [Add]       │
└─────────────────────────────────────┘
```

#### Buddy Detail View
```
┌─────────────────────────────────────┐
│ Shared Habit Cards                  │
│ ┌─────────┬─────────┐               │
│ │ Them    │ You     │               │
│ │ [Card]  │ [Card]  │               │
│ └─────────┴─────────┘               │
├─────────────────────────────────────┤
│ Leaderboard Snippet                 │
├─────────────────────────────────────┤
│ 💬 Chat FAB                         │
└─────────────────────────────────────┘
```

### Squads Section
```
┌─────────────────────────────────────┐
│ Squad List                          │
│ ┌─────────────────────────────────┐ │
│ │ 🏢 Morning Runners              │ │
│ │ Public • 8 members              │ │
│ │ [View Squad]                    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Create New Squad: [Create]          │
└─────────────────────────────────────┘
```

#### Squad Detail View
```
┌─────────────────────────────────────┐
│ [Activity] [Chat] Pills             │
├─────────────────────────────────────┤
│ Habit Rows                          │
│ ┌─────────────────────────────────┐ │
│ │ Morning Run                     │ │
│ │ 👤👤👤 • 5/8 done              │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Communities Section
```
┌─────────────────────────────────────┐
│ [Top] [Following] [Community] Pills │
│ [🔍 Search]                        │
├─────────────────────────────────────┤
│ Community Feed                      │
│ ┌─────────────────────────────────┐ │
│ │ Fitness Enthusiasts             │ │
│ │ Public • 1.2k members           │ │
│ │ [Like] [Comment]                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### New Components Required
- `BuddyCard` - Buddy list items
- `SquadCard` - Squad list items  
- `CommunityCard` - Community feed items
- `SharedHabitComparison` - Them vs You
- `LeaderboardSnippet` - Mini leaderboard
- `HabitRow` - Squad habit tracking
- `FeedCard` - Community posts

---

## Chat Tab: Unified Inbox

### Layout Structure
```
┌─────────────────────────────────────┐
│ Chat Header                         │
│ 👤 John Doe • Online               │
│ [⋮ Menu]                           │
├─────────────────────────────────────┤
│ Message Thread                      │
│ ┌─────────────────────────────────┐ │
│ │ You: Great! Just finished 5km   │ │
│ │ 10:32 AM                        │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ John: Awesome! Heading out now  │ │
│ │ 10:33 AM                        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Message Input] [Send]              │
└─────────────────────────────────────┘
```

### Features
- **Text messages**: Standard chat bubbles
- **Images/Video**: Media preview in chat
- **Emoji reactions**: Tap to react
- **@mentions**: Auto-complete suggestions
- **Typing indicators**: "John is typing..."
- **Read receipts**: "Seen 10:35 AM"

### New Components Required
- `ChatBubble` - Message display
- `MediaPreview` - Image/video in chat
- `EmojiReactions` - Reaction system
- `MentionAutocomplete` - @mention suggestions
- `TypingIndicator` - "X is typing..."
- `ReadReceipt` - "Seen at..."

---

## Trends Tab: Analytics Dashboard

### Header Pills
```
[⭐ Highlights] [📊 Charts] [🏆 Leaderboards]
```

### Highlights Section
```
┌─────────────────────────────────────┐
│ Adherence: 85% (7d) • 78% (30d)     │
│ Best Streak: 12 days                │
│ On-time Rate: 92%                   │
│ Prime Time: 7-9 AM                  │
│ Co-occurrence: Run + Read = +15%    │
└─────────────────────────────────────┘
```

### Charts Section
```
┌─────────────────────────────────────┐
│ Year Heatmap                        │
│ [Calendar grid with completion dots]│
├─────────────────────────────────────┤
│ Completion Over Time                │
│ [Line chart]                        │
├─────────────────────────────────────┤
│ Time of Day Histogram               │
│ [Bar chart]                         │
├─────────────────────────────────────┤
│ Per-Habit Adherence                 │
│ [Horizontal bar chart]              │
└─────────────────────────────────────┘
```

### Leaderboards Section
```
┌─────────────────────────────────────┐
│ Buddy Leaderboard                   │
│ 1. John Doe - 85%                   │
│ 2. Jane Smith - 78%                 │
│ 3. You - 72%                        │
├─────────────────────────────────────┤
│ Squad Leaderboard                   │
│ 1. Morning Runners - 82%            │
│ 2. Fitness Squad - 75%              │
└─────────────────────────────────────┘
```

### New Components Required
- `AdherenceCard` - 7d/30d stats
- `YearHeatmap` - Calendar completion view
- `TimeHistogram` - Time-of-day chart
- `HabitAdherenceChart` - Per-habit bars
- `LeaderboardCard` - Buddy/Squad rankings

---

## Navigation Map

### Primary Flow
```
Home → Habits → Social → Chat → Trends
  ↓      ↓       ↓       ↓       ↓
[Tab]  [Tab]   [Tab]   [Tab]   [Tab]
```

### Secondary Flows
```
Habits → [Long-press] → Counter Modal
Habits → [Three dots] → Edit/Share Menu
Social → [Buddy] → Detail View → Chat
Social → [Squad] → Detail View → Activity/Chat
Social → [Community] → Feed → Post
Chat → [Message] → Reactions/Mentions
Trends → [Chart] → Detailed Analytics
```

### Modal Flows
```
[Add Habit] → Form → Success
[Edit Habit] → Form → Save
[Share Habit] → Select → Send
[Proof Required] → Camera/Location → Submit
[Counter] → Increment → Complete
[Group Overlay] → Select → Jump
```

---

## Component Inventory

### Existing Components (Preserved)
- `HabitCard` - Base card design
- `ShineBorder` - Gradient border
- `CircularProgressBar` - Progress ring
- `TabNavigation` - Bottom navigation
- `UIContext` - Dark mode support

### New Components (Minimal Addition)
- `OutstandingCard` - Due items
- `NudgeCard` - Buddy notifications
- `QuickStatsCard` - Stats display
- `EmotionCycle` - 3-face interaction
- `NumericCounter` - Long-press counter
- `GroupOverlay` - Share visualization
- `BuddyCard` - Social items
- `SquadCard` - Squad items
- `CommunityCard` - Community items
- `ChatBubble` - Message display
- `AdherenceCard` - Analytics cards
- `YearHeatmap` - Calendar view

### Total New Components: 12
**Preserved Components: 5**
**Design System: 100% Maintained**

---

## Implementation Priority

### Phase 1: Core Flows (Week 1-2)
1. Enhanced Habit Cards (3-face cycle, long-press)
2. Home tab layout (Outstanding, Quick Stats)
3. Social tab structure (Buddies, Squads, Communities)

### Phase 2: Interactions (Week 3-4)
1. Chat functionality (messages, reactions)
2. Trends analytics (charts, leaderboards)
3. Modal flows (proof, counter, group overlay)

### Phase 3: Polish (Week 5-6)
1. Animations and transitions
2. Error states and loading
3. Accessibility and performance

**Total Implementation: 6 weeks**
**Design Preservation: 100%**
**New Components: 12 (minimal)**

