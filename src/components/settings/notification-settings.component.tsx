import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faBellSlash, 
  faAt, 
  faVolumeUp, 
  faVolumeMute,
  faMobile,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import messagingService, { NotificationSettings } from '../../services/messaging.service';

interface NotificationSettingsComponentProps {
  onSave?: (settings: NotificationSettings) => void;
}

const NotificationSettingsComponent: React.FC<NotificationSettingsComponentProps> = ({
  onSave
}) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    userId: 'current-user',
    type: 'always',
    soundEnabled: true,
    vibrationEnabled: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load current notification settings
    const currentSettings = messagingService.getNotificationSettings();
    setSettings(currentSettings);
  }, []);

  const handleTypeChange = (type: 'always' | 'never' | 'mentions_only') => {
    setSettings(prev => ({ ...prev, type }));
  };

  const handleSoundToggle = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleVibrationToggle = () => {
    setSettings(prev => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await messagingService.updateNotificationSettings(settings);
      onSave?.(settings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Error saving notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'always':
        return faBell;
      case 'never':
        return faBellSlash;
      case 'mentions_only':
        return faAt;
      default:
        return faBell;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'always':
        return 'Always';
      case 'never':
        return 'Never';
      case 'mentions_only':
        return 'Only when mentioned';
      default:
        return 'Always';
    }
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'always':
        return 'Receive notifications for all messages';
      case 'never':
        return 'No message notifications';
      case 'mentions_only':
        return 'Only receive notifications when someone mentions you';
      default:
        return 'Receive notifications for all messages';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
          <FontAwesomeIcon icon={faBell} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Message Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure how you receive message notifications
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Notification Type */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Type
          </h3>
          <div className="space-y-3">
            {(['always', 'mentions_only', 'never'] as const).map((type) => (
              <label
                key={type}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  settings.type === type
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="notificationType"
                  value={type}
                  checked={settings.type === type}
                  onChange={() => handleTypeChange(type)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  settings.type === type
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {settings.type === type && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon 
                    icon={getTypeIcon(type)} 
                    className={`text-lg ${
                      settings.type === type 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-400'
                    }`} 
                  />
                  <div>
                    <p className={`font-medium ${
                      settings.type === type 
                        ? 'text-purple-900 dark:text-purple-100' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {getTypeLabel(type)}
                    </p>
                    <p className={`text-sm ${
                      settings.type === type 
                        ? 'text-purple-700 dark:text-purple-300' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {getTypeDescription(type)}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Sound Settings */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Sound & Vibration
          </h3>
          <div className="space-y-4">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon 
                  icon={settings.soundEnabled ? faVolumeUp : faVolumeMute} 
                  className={`text-lg ${
                    settings.soundEnabled 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-400'
                  }`} 
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Sound Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Play sound when receiving messages
                  </p>
                </div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.soundEnabled 
                    ? 'bg-green-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Vibration Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon 
                  icon={faMobile} 
                  className={`text-lg ${
                    settings.vibrationEnabled 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-400'
                  }`} 
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Vibration
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Vibrate device when receiving messages
                  </p>
                </div>
              </div>
              <button
                onClick={handleVibrationToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.vibrationEnabled 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              isSaved
                ? 'bg-green-500 text-white'
                : 'bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isSaved ? (
              <>
                <FontAwesomeIcon icon={faSave} />
                <span>Settings Saved!</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Preview
          </h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Current settings:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={getTypeIcon(settings.type)} className="text-purple-500" />
                <span className="text-sm font-medium">
                  {getTypeLabel(settings.type)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon 
                  icon={settings.soundEnabled ? faVolumeUp : faVolumeMute} 
                  className={settings.soundEnabled ? 'text-green-500' : 'text-gray-400'} 
                />
                <span className="text-sm">
                  Sound: {settings.soundEnabled ? 'On' : 'Off'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon 
                  icon={faMobile} 
                  className={settings.vibrationEnabled ? 'text-blue-500' : 'text-gray-400'} 
                />
                <span className="text-sm">
                  Vibration: {settings.vibrationEnabled ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsComponent;
