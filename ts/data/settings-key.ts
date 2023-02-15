const settingsReadReceipt = 'read-receipt-setting';
const settingsTypingIndicator = 'typing-indicators-setting';
const settingsAutoUpdate = 'auto-update';

const settingsMenuBar = 'hide-menu-bar';
const settingsSpellCheck = 'spell-check';
const settingsLinkPreview = 'link-preview-setting';
const settingsStartInTray = 'start-in-tray-setting';
const settingsOpengroupPruning = 'prune-setting';
const settingsNotification = 'notification-setting';
const settingsAudioNotification = 'audio-notification-setting';
const someDeviceOutdatedSyncing = 'someDeviceOutdatedSyncing';
const hasSyncedInitialConfigurationItem = 'hasSyncedInitialConfigurationItem';
const lastAvatarUploadTimestamp = 'lastAvatarUploadTimestamp';
const hasLinkPreviewPopupBeenDisplayed = 'hasLinkPreviewPopupBeenDisplayed';

// user config tracking timestamps (to discard incoming messages which would make a change we reverted in the last config message we merged)
const latestUserProfileEnvelopeTimestamp = 'latestUserProfileEnvelopeTimestamp';
const latestUserGroupEnvelopeTimestamp = 'latestUserGroupEnvelopeTimestamp';
const latestUserContactsEnvelopeTimestamp = 'latestUserContactsEnvelopeTimestamp';

const settingsShowFullId = 'show-full-id';
const settingsMessageFormatting = 'message-formatting';
const settingsMessageTypography = 'message-typography';
const settingsPerMessageTimestamps = 'per-message-timestamps';
const settingsScrollOnSend = 'scroll-on-send';
const settingsSendOnShiftEnter = 'send-on-shift-enter';
const settingsConfirmDeletions = 'confirm-deletions';
const settingsFetchMessagesSinceEpoch = 'fetch-msgs-since-epoch';

export const SettingsKey = {
  settingsReadReceipt,
  settingsTypingIndicator,
  settingsAutoUpdate,
  settingsMenuBar,
  settingsSpellCheck,
  settingsLinkPreview,
  settingsStartInTray,
  settingsOpengroupPruning,
  settingsNotification,
  settingsAudioNotification,
  someDeviceOutdatedSyncing,
  hasSyncedInitialConfigurationItem,
  lastAvatarUploadTimestamp,
  hasLinkPreviewPopupBeenDisplayed,
  latestUserProfileEnvelopeTimestamp,
  latestUserGroupEnvelopeTimestamp,
  latestUserContactsEnvelopeTimestamp,
  settingsShowFullId,
  settingsMessageFormatting,
  settingsMessageTypography,
  settingsPerMessageTimestamps,
  settingsScrollOnSend,
  settingsSendOnShiftEnter,
  settingsConfirmDeletions,
  settingsFetchMessagesSinceEpoch,
} as const;

export const KNOWN_BLINDED_KEYS_ITEM = 'KNOWN_BLINDED_KEYS_ITEM';
export const SNODE_POOL_ITEM_ID = 'SNODE_POOL_ITEM_ID';
