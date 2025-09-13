import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faUsers, 
  faVolumeMute, 
  faVolumeUp,
  faSignOutAlt,
  faCrown,
  faShieldAlt,
  faUser,
  faEllipsisV,
  faBan,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { Conversation, ConversationMember } from '../../services/messaging.service';

interface ConversationOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation | null;
  onToggleMute: (conversationId: string, duration?: string) => void;
  onLeaveConversation: (conversationId: string) => void;
  onViewLinkedEntity?: (entityId: string, entityType: string) => void;
}

const ConversationOptionsModal: React.FC<ConversationOptionsModalProps> = ({
  isOpen,
  onClose,
  conversation,
  onToggleMute,
  onLeaveConversation,
  onViewLinkedEntity
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'participants'>('info');
  const [showMuteOptions, setShowMuteOptions] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [addingParticipants, setAddingParticipants] = useState(false);
  const [eligible, setEligible] = useState<any[]>([]);
  const isAdmin = !!conversation?.members?.some(m => m.role === 'owner' || m.role === 'moderator');

  if (!conversation) return null;

  const muteOptions = [
    { label: '1 Hour', value: '1h' },
    { label: '1 Day', value: '1d' },
    { label: '1 Week', value: '1w' },
    { label: 'Until Unmuted', value: 'until' }
  ];

  const handleMute = (duration?: string) => {
    onToggleMute(conversation.id, duration);
    setShowMuteOptions(false);
  };

  const handleLeave = () => {
    onLeaveConversation(conversation.id);
    onClose();
  };

  const handleViewLinkedEntity = () => {
    if (conversation.linkedEntityId && conversation.linkedEntityType && onViewLinkedEntity) {
      onViewLinkedEntity(conversation.linkedEntityId, conversation.linkedEntityType);
      onClose();
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'owner':
        return <FontAwesomeIcon icon={faCrown} className="text-yellow-500 text-xs" />;
      case 'moderator':
        return <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 text-xs" />;
      default:
        return <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xs" />;
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'owner':
        return 'Owner';
      case 'moderator':
        return 'Moderator';
      default:
        return 'Member';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                  {conversation.avatar}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {conversation.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversation.type === 'direct' ? 'Direct Message' : 
                     conversation.type === 'squad' ? 'Squad Chat' : 'Community Chat'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'info'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                <span>Info</span>
              </button>
              <button
                onClick={() => setActiveTab('participants')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'participants'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faUsers} className="text-xs" />
                <span>Participants</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {activeTab === 'info' && (
                <div className="space-y-4">
                  {/* Chat Info */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Chat Information
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                        <span className="text-sm font-medium">
                          {conversation.type === 'direct' ? 'Direct Message' : 
                           conversation.type === 'squad' ? 'Squad Chat' : 'Community Chat'}
                        </span>
                      </div>
                      
                      {conversation.members && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Members</span>
                          <span className="text-sm font-medium">{conversation.members.length}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                        <span className="text-sm font-medium">
                          {conversation.isMuted ? 'Muted' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </h3>
                    
                    {/* Mute/Unmute */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          if (conversation.isMuted) {
                            handleMute();
                          } else {
                            setShowMuteOptions(!showMuteOptions);
                          }
                        }}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon 
                            icon={conversation.isMuted ? faVolumeMute : faVolumeUp} 
                            className={conversation.isMuted ? 'text-red-500' : 'text-green-500'} 
                          />
                          <span className="text-sm">
                            {conversation.isMuted ? 'Unmute' : 'Mute'}
                          </span>
                        </div>
                        {!conversation.isMuted && (
                          <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 text-xs" />
                        )}
                      </button>

                      <AnimatePresence>
                        {showMuteOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10"
                          >
                            {muteOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleMute(option.value)}
                                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                              >
                                <span className="text-sm">{option.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* View Linked Entity */}
                    {conversation.linkedEntityId && conversation.linkedEntityType && (
                      <button
                        onClick={handleViewLinkedEntity}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faUsers} className="text-blue-500" />
                          <span className="text-sm">
                            View {conversation.linkedEntityType}
                          </span>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisV} className="text-gray-400 text-xs" />
                      </button>
                    )}

                    {/* Leave Chat */}
                    {conversation.isGroupChat && (
                      <button
                        onClick={() => setShowLeaveConfirm(true)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600"
                      >
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          <span className="text-sm">Leave Chat</span>
                        </div>
                      </button>
                    )}

                    {/* Add Participant (admins) */}
                    {conversation.isGroupChat && isAdmin && (
                      <button
                        onClick={async () => {
                          setAddingParticipants(true);
                          const list = await (await import('../../services/messaging.service')).default.getEligibleParticipants(conversation.id);
                          setEligible(list);
                        }}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FontAwesomeIcon icon={faUsers} className="text-purple-500" />
                          <span className="text-sm">Add Participant</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'participants' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Participants ({conversation.members?.length || conversation.participants.length})
                  </h3>
                  
                  <div className="space-y-2">
                    {conversation.members ? (
                      // Group chat with member details
                      conversation.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                                {member.avatar || member.name.charAt(0)}
                              </div>
                              {member.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {member.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                {getRoleIcon(member.role)}
                                <span className="text-xs text-gray-500">
                                  {getRoleLabel(member.role)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  Joined {member.joinedAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Member actions (for moderators/owners) */}
                          {member.role !== 'owner' && (
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                              <FontAwesomeIcon icon={faEllipsisV} className="text-xs" />
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      // Direct chat or simple participant list
                      conversation.participants.map((participantId) => (
                        <div
                          key={participantId}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {participantId.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {participantId === 'current-user' ? 'You' : participantId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {participantId === 'current-user' ? 'Current User' : 'Participant'}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Leave confirmation */}
            <AnimatePresence>
              {showLeaveConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-5 max-w-sm w-full">
                    <h3 className="text-lg font-semibold mb-2">Leave this chat?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      You won't be able to rejoin unless you're reinvited by a member.
                    </p>
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => setShowLeaveConfirm(false)} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">Cancel</button>
                      <button onClick={() => { setShowLeaveConfirm(false); onLeaveConversation(conversation.id); }} className="px-3 py-2 rounded-lg bg-red-600 text-white">Leave</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add participant drawer */}
            <AnimatePresence>
              {addingParticipants && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-end"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-t-2xl w-full p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Add participant</h4>
                      <button onClick={() => setAddingParticipants(false)} className="p-2 text-gray-500">Close</button>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {eligible.map((u: any) => (
                        <button key={u.id} onClick={async () => { const svc = (await import('../../services/messaging.service')).default; await svc.addParticipants(conversation.id, [u.id]); }} className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs font-semibold">{u.avatar || u.displayName?.[0] || 'U'}</div>
                            <div>
                              <p className="text-sm font-medium">{u.displayName}</p>
                              <p className="text-xs text-gray-500">@{u.username}</p>
                            </div>
                          </div>
                          <span className="text-xs text-purple-600">Add</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConversationOptionsModal;
