import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faFire, 
  faThumbsUp, 
  faLaugh, 
  faSurprise,
  faSadTear,
  faAngry,
  faReply,
  faEllipsisV,
  faPaperclip,
  faImage,
  faVideo,
  faFile,
  faMusic,
  faPlay,
  faDownload,
  faTimes,
  faCheck,
  faXmark,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import { Message, Reaction, Attachment } from '../../services/messaging.service';

interface MessageProps {
  message: Message;
  isGroupChat: boolean;
  onReply: (message: Message) => void;
  onReaction: (messageId: string, emoji: string) => void;
  onRemoveReaction: (messageId: string, emoji: string) => void;
  onAttachmentClick: (attachment: Attachment) => void;
}

const REACTION_EMOJIS = [
  { emoji: '❤️', icon: faHeart, label: 'Heart' },
  { emoji: '🔥', icon: faFire, label: 'Fire' },
  { emoji: '👍', icon: faThumbsUp, label: 'Thumbs Up' },
  { emoji: '😂', icon: faLaugh, label: 'Laugh' },
  { emoji: '😮', icon: faSurprise, label: 'Surprised' },
  { emoji: '😢', icon: faSadTear, label: 'Sad' },
  { emoji: '😠', icon: faAngry, label: 'Angry' }
];

const MessageComponent: React.FC<MessageProps> = ({
  message,
  isGroupChat,
  onReply,
  onReaction,
  onRemoveReaction,
  onAttachmentClick
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <div className="w-3 h-3 text-gray-400">✓</div>;
      case 'delivered':
        return <div className="w-3 h-3 text-blue-400">✓✓</div>;
      case 'read':
        return <div className="w-3 h-3 text-blue-600">✓✓</div>;
      default:
        return null;
    }
  };

  const renderAttachment = (attachment: Attachment) => {
    const isImage = attachment.type === 'image';
    const isVideo = attachment.type === 'video';
    const isAudio = attachment.type === 'audio';

    return (
      <div 
        key={attachment.id}
        className="mt-2 cursor-pointer"
        onClick={() => onAttachmentClick(attachment)}
      >
        {isImage && (
          <div className="relative">
            <img 
              src={attachment.url} 
              alt={attachment.fileName}
              className="max-w-xs rounded-lg shadow-sm"
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {attachment.fileName}
            </div>
          </div>
        )}
        
        {isVideo && (
          <div className="relative">
            <video 
              src={attachment.url}
              className="max-w-xs rounded-lg shadow-sm"
              controls
            />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {attachment.fileName}
            </div>
          </div>
        )}
        
        {isAudio && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faMusic} className="text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{attachment.fileName}</p>
                <p className="text-xs text-gray-500">
                  {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button className="p-2 bg-purple-500 text-white rounded-full">
                <FontAwesomeIcon icon={faPlay} className="text-xs" />
              </button>
            </div>
          </div>
        )}
        
        {attachment.type === 'file' && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faFile} className="text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{attachment.fileName}</p>
                <p className="text-xs text-gray-500">
                  {(attachment.fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button className="p-2 bg-gray-500 text-white rounded-full">
                <FontAwesomeIcon icon={faDownload} className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderReactions = () => {
    if (!message.reactions || message.reactions.length === 0) return null;

    const reactionGroups = message.reactions.reduce((acc, reaction) => {
      if (!acc[reaction.emoji]) {
        acc[reaction.emoji] = [];
      }
      acc[reaction.emoji].push(reaction);
      return acc;
    }, {} as Record<string, Reaction[]>);

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {Object.entries(reactionGroups).map(([emoji, reactions]) => (
          <button
            key={emoji}
            onClick={() => {
              const hasReacted = reactions.some(r => r.userId === 'current-user');
              if (hasReacted) {
                onRemoveReaction(message.id, emoji);
              } else {
                onReaction(message.id, emoji);
              }
            }}
            className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
              reactions.some(r => r.userId === 'current-user')
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {emoji} {reactions.length}
          </button>
        ))}
      </div>
    );
  };

  const renderReplyTo = () => {
    if (!message.replyTo) return null;

    return (
      <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-purple-500">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Replying to {message.replyTo.senderName}
        </p>
        <p className="text-sm truncate">
          {message.replyTo.type === 'text' ? message.replyTo.content : `[${message.replyTo.type}]`}
        </p>
      </div>
    );
  };

  const renderMentions = (content: string) => {
    if (!message.mentions || message.mentions.length === 0) {
      return content;
    }

    let processedContent = content;
    message.mentions.forEach(mention => {
      const regex = new RegExp(`@${mention}`, 'g');
      processedContent = processedContent.replace(
        regex, 
        `<span class="text-purple-600 dark:text-purple-400 font-medium">@${mention}</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: processedContent }} />;
  };

  const renderSystemHabitCompletion = () => {
    if (message.type !== 'system' || !message.system || message.system.kind !== 'habit_completion') return null;
    const sys = message.system;
    return (
      <div className="w-full">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            {/* Placeholder circle avatar */}
          </div>
          <div className="text-sm">
            <span className="font-semibold">{message.senderName}</span>
            <span className="ml-1 text-gray-600 dark:text-gray-400">finished</span>
            <span className="ml-1 text-blue-600 dark:text-blue-400">{sys.habitName}</span>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img src={sys.photoUrl} alt={sys.habitName} className="w-full max-w-xs rounded-none" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          {sys.requiresApproval && !sys.approved ? (
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded-full text-xs flex items-center space-x-1">
                <FontAwesomeIcon icon={faCheck} />
                <span>Approve</span>
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded-full text-xs flex items-center space-x-1">
                <FontAwesomeIcon icon={faXmark} />
                <span>Reject</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faHeart} className="text-pink-600" />
                <span className="text-sm font-medium">{sys.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon icon={faComment} />
                <span className="text-sm font-medium">{sys.comments}</span>
              </div>
            </div>
          )}
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-xs lg:max-w-md">
        {/* Sender Info for Group Chats */}
        {isGroupChat && !message.isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
              {message.senderAvatar || message.senderName.charAt(0)}
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {message.senderName}
            </span>
          </div>
        )}

        {/* Message Content */}
        <div className="relative group">
          <div
            className={`px-4 py-2 rounded-lg ${
              message.isOwn
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            {/* Reply To */}
            {renderReplyTo()}

            {/* Message Text or System */}
            {message.type === 'system' ? (
              renderSystemHabitCompletion()
            ) : (
              <p className="text-sm">
                {renderMentions(message.content)}
              </p>
            )}

            {/* Attachments */}
            {message.attachments?.map(renderAttachment)}

            {/* Message Footer */}
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${
                message.isOwn ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </span>
              
              <div className="flex items-center space-x-2">
                {message.isOwn && getMessageStatusIcon(message.status)}
                
                {/* Message Options */}
                <div className="relative">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      message.isOwn ? 'hover:bg-purple-500' : 'hover:bg-gray-600'
                    }`}
                  >
                    <FontAwesomeIcon icon={faEllipsisV} className="text-xs" />
                  </button>

                  <AnimatePresence>
                    {showOptions && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10"
                      >
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => {
                              onReply(message);
                              setShowOptions(false);
                            }}
                            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faReply} className="text-xs" />
                            <span>Reply</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowReactions(!showReactions);
                              setShowOptions(false);
                            }}
                            className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <FontAwesomeIcon icon={faHeart} className="text-xs" />
                            <span>React</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Reactions Popup */}
          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10"
              >
                <div className="flex space-x-2">
                  {REACTION_EMOJIS.map(({ emoji, icon, label }) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onReaction(message.id, emoji);
                        setShowReactions(false);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title={label}
                    >
                      <span className="text-lg">{emoji}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reactions Display */}
        {renderReactions()}
      </div>
    </div>
  );
};

export default MessageComponent;
