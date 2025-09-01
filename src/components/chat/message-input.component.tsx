import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faPaperclip, 
  faImage, 
  faVideo, 
  faFile,
  faMusic,
  faTimes,
  faReply,
  faAt
} from '@fortawesome/free-solid-svg-icons';
import { Message, Attachment, User } from '../../services/messaging.service';

interface MessageInputProps {
  onSendMessage: (content: string, options?: {
    attachments?: Attachment[];
    replyTo?: any;
    mentions?: string[];
  }) => void;
  onAttachmentUpload: (file: File) => Promise<Attachment>;
  replyToMessage?: Message | null;
  onCancelReply: () => void;
  conversationMembers?: User[];
  isDisabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onAttachmentUpload,
  replyToMessage,
  onCancelReply,
  conversationMembers = [],
  isDisabled = false
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mentionQuery) {
      const filtered = conversationMembers.filter(member =>
        member.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        member.displayName.toLowerCase().includes(mentionQuery.toLowerCase())
      );
      setFilteredMembers(filtered);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  }, [mentionQuery, conversationMembers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Handle mentions
    const cursorPos = e.target.selectionStart || 0;
    setCursorPosition(cursorPos);
    
    const beforeCursor = value.substring(0, cursorPos);
    const mentionMatch = beforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
    } else {
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      // Extract mentions from message
      const mentionMatches = message.match(/@(\w+)/g);
      const mentions = mentionMatches ? mentionMatches.map(m => m.substring(1)) : [];

      onSendMessage(message.trim(), {
        attachments,
        replyTo: replyToMessage ? {
          messageId: replyToMessage.id,
          senderName: replyToMessage.senderName,
          content: replyToMessage.content,
          type: replyToMessage.type
        } : undefined,
        mentions
      });

      setMessage('');
      setAttachments([]);
      setShowAttachments(false);
      setShowMentions(false);
      setMentionQuery('');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const attachment = await onAttachmentUpload(file);
        setAttachments(prev => [...prev, attachment]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(a => a.id !== attachmentId));
  };

  const insertMention = (username: string) => {
    const beforeMention = message.substring(0, cursorPosition - mentionQuery.length - 1);
    const afterMention = message.substring(cursorPosition);
    const newMessage = beforeMention + `@${username} ` + afterMention;
    
    setMessage(newMessage);
    setShowMentions(false);
    setMentionQuery('');
    
    // Focus back to textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newCursorPos = beforeMention.length + username.length + 2;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return faImage;
    if (type.startsWith('video/')) return faVideo;
    if (type.startsWith('audio/')) return faMusic;
    return faFile;
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      {/* Reply Preview */}
      <AnimatePresence>
        {replyToMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 border-purple-500"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faReply} className="text-purple-500 text-sm" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Replying to {replyToMessage.senderName}
                </span>
              </div>
              <button
                onClick={onCancelReply}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} className="text-sm" />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
              {replyToMessage.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 space-y-2"
          >
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <FontAwesomeIcon 
                  icon={getFileIcon(attachment.mimeType)} 
                  className="text-purple-500" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.fileName}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(attachment.fileSize)}</p>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="p-1 text-gray-500 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-sm" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isDisabled || isUploading}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />

          {/* Mentions Dropdown */}
          <AnimatePresence>
            {showMentions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 min-w-48"
              >
                <div className="text-xs text-gray-500 mb-2 px-2">Mention someone:</div>
                {filteredMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => insertMention(member.username)}
                    className="w-full flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                      {member.avatar || member.displayName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.displayName}</p>
                      <p className="text-xs text-gray-500">@{member.username}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Attachment Button */}
        <div className="relative">
          <button
            onClick={() => setShowAttachments(!showAttachments)}
            disabled={isDisabled || isUploading}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faPaperclip} />
          </button>

          <AnimatePresence>
            {showAttachments && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 6 }}
                className="absolute bottom-full right-0 mb-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 z-30 w-56 space-y-2"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faImage} className="text-blue-500 text-xl mb-1" />
                    <p className="text-xs">Photo</p>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faVideo} className="text-red-500 text-xl mb-1" />
                    <p className="text-xs">Video</p>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faMusic} className="text-green-500 text-xl mb-1" />
                    <p className="text-xs">Audio</p>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faFile} className="text-gray-500 text-xl mb-1" />
                    <p className="text-xs">File</p>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendMessage}
          disabled={(!message.trim() && attachments.length === 0) || isDisabled || isUploading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;
