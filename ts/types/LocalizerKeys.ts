export type LocalizerKeys =
  | 'removePassword'
  | 'classicDarkThemeTitle'
  | 'userUnbanFailed'
  | 'changePassword'
  | 'saved'
  | 'startedACall'
  | 'mainMenuWindow'
  | 'unblocked'
  | 'keepDisabled'
  | 'userAddedToModerators'
  | 'otherSingular'
  | 'to'
  | 'sent'
  | 'requestsPlaceholder'
  | 'closedGroupInviteFailMessage'
  | 'noContactsForGroup'
  | 'faq'
  | 'linkVisitWarningMessage'
  | 'messageRequestAcceptedOurs'
  | 'anonymous'
  | 'permissionsSettingsTitle'
  | 'viewMenuZoomOut'
  | 'dialogClearAllDataDeletionFailedDesc'
  | 'timerOption_10_seconds_abbreviated'
  | 'enterDisplayName'
  | 'connectToServerFail'
  | 'moreInformation'
  | 'publicChatExists'
  | 'noMediaUntilApproved'
  | 'passwordViewTitle'
  | 'joinOpenGroupAfterInvitationConfirmationTitle'
  | 'notificationMostRecentFrom'
  | 'messageRequestAccepted'
  | 'timerOption_5_minutes'
  | 'linkPreviewsConfirmMessage'
  | 'notificationMostRecent'
  | 'video'
  | 'readReceiptSettingDescription'
  | 'userBanFailed'
  | 'autoUpdateLaterButtonLabel'
  | 'maximumAttachments'
  | 'deviceOnly'
  | 'reactionPopupTwo'
  | 'beginYourSession'
  | 'typingIndicatorsSettingDescription'
  | 'changePasswordToastDescription'
  | 'addingContacts'
  | 'passwordLengthError'
  | 'typingIndicatorsSettingTitle'
  | 'maxPasswordAttempts'
  | 'viewMenuToggleDevTools'
  | 'fileSizeWarning'
  | 'openGroupURL'
  | 'hideMenuBarDescription'
  | 'showFullIdDescription'
  | 'perMessageTimestampsDescription'
  | 'pickClosedGroupMember'
  | 'ByUsingThisService...'
  | 'startConversation'
  | 'unableToCallTitle'
  | 'yourUniqueSessionID'
  | 'typingAlt'
  | 'orJoinOneOfThese'
  | 'members'
  | 'noMessageRequestsPending'
  | 'sendRecoveryPhraseMessage'
  | 'shareBugDetails'
  | 'timerOption_1_hour'
  | 'youGotKickedFromGroup'
  | 'cannotRemoveCreatorFromGroupDesc'
  | 'contactAvatarAlt'
  | 'incomingError'
  | 'notificationsSettingsTitle'
  | 'conversationsSettingsTitle'
  | 'tookAScreenshot'
  | 'reactionListCountPlural'
  | 'from'
  | 'requestsSubtitle'
  | 'thisMonth'
  | 'chooseAnAction'
  | 'next'
  | 'addModerators'
  | 'sessionMessenger'
  | 'today'
  | 'mustBeApproved'
  | 'appMenuHideOthers'
  | 'sendFailed'
  | 'enterNewPassword'
  | 'expandedReactionsText'
  | 'openMessageRequestInbox'
  | 'rateLimitReactMessage'
  | 'enterPassword'
  | 'enterSessionIDOfRecipient'
  | 'join'
  | 'dialogClearAllDataDeletionFailedMultiple'
  | 'clearAllReactions'
  | 'appMenuQuit'
  | 'windowMenuZoom'
  | 'allUsersAreRandomly...'
  | 'cameraPermissionNeeded'
  | 'notificationsSettingsContent'
  | 'ringing'
  | 'closedGroupInviteSuccessTitle'
  | 'accept'
  | 'hideBanner'
  | 'setPasswordTitle'
  | 'editMenuUndo'
  | 'pinConversation'
  | 'lightboxImageAlt'
  | 'linkDevice'
  | 'callMissedNotApproved'
  | 'invalidPubkeyFormat'
  | 'primaryColorYellow'
  | 'disappearingMessagesDisabled'
  | 'spellCheckDescription'
  | 'clearDataSettingsTitle'
  | 'autoUpdateNewVersionInstructions'
  | 'appMenuUnhide'
  | 'timerOption_30_minutes_abbreviated'
  | 'pruneSettingDescription'
  | 'voiceMessage'
  | 'primaryColorPink'
  | 'changePasswordTitle'
  | 'copyMessage'
  | 'messageDeletionForbidden'
  | 'deleteJustForMe'
  | 'changeAccountPasswordTitle'
  | 'onionPathIndicatorDescription'
  | 'mediaPermissionsTitle'
  | 'replyingToMessage'
  | 'welcomeToYourSession'
  | 'createPassword'
  | 'editMenuCopy'
  | 'leftTheGroup'
  | 'timerOption_30_minutes'
  | 'nameOnly'
  | 'typeInOldPassword'
  | 'imageAttachmentAlt'
  | 'displayNameEmpty'
  | 'inviteContacts'
  | 'callMediaPermissionsTitle'
  | 'couldntFindServerMatching'
  | 'blocked'
  | 'hideRequestBannerDescription'
  | 'noBlockedContacts'
  | 'reactionNotification'
  | 'leaveGroupConfirmation'
  | 'banUserAndDeleteAll'
  | 'joinOpenGroupAfterInvitationConfirmationDesc'
  | 'invalidNumberError'
  | 'contextMenuNoSuggestions'
  | 'callMediaPermissionsDialogTitle'
  | 'recoveryPhraseRevealButtonText'
  | 'banUser'
  | 'primaryColorBlue'
  | 'sendMessage'
  | 'recoveryPhraseRevealMessage'
  | 'showRecoveryPhrase'
  | 'autoUpdateSettingDescription'
  | 'remove'
  | 'restoreUsingRecoveryPhrase'
  | 'cannotUpdateDetail'
  | 'showRecoveryPhrasePasswordRequest'
  | 'spellCheckDirty'
  | 'debugLogExplanation'
  | 'closedGroupInviteFailTitle'
  | 'areYouSureClearDevice'
  | 'setAccountPasswordDescription'
  | 'removeAccountPasswordDescription'
  | 'establishingConnection'
  | 'noModeratorsToRemove'
  | 'youHaveANewFriendRequest'
  | 'offline'
  | 'appearanceSettingsTitle'
  | 'mainMenuView'
  | 'mainMenuEdit'
  | 'notificationForConvo_disabled'
  | 'leaveGroupConfirmationAdmin'
  | 'notificationForConvo_all'
  | 'emptyGroupNameError'
  | 'copyOpenGroupURL'
  | 'setPasswordInvalid'
  | 'timerOption_30_seconds_abbreviated'
  | 'createConversationNewContact'
  | 'removeResidueMembers'
  | 'timerOption_1_hour_abbreviated'
  | 'areYouSureDeleteEntireAccount'
  | 'noGivenPassword'
  | 'closedGroupInviteOkText'
  | 'readReceiptSettingTitle'
  | 'copySessionID'
  | 'timerOption_0_seconds'
  | 'zoomFactorSettingTitle'
  | 'unableToCall'
  | 'callMissedTitle'
  | 'done'
  | 'videoAttachmentAlt'
  | 'message'
  | 'mainMenuHelp'
  | 'open'
  | 'nameAndMessage'
  | 'autoUpdateDownloadedMessage'
  | 'onionPathIndicatorTitle'
  | 'unknown'
  | 'mediaMessage'
  | 'addAsModerator'
  | 'closedGroupInviteFailTitlePlural'
  | 'enterSessionID'
  | 'editGroup'
  | 'incomingCallFrom'
  | 'timerSetOnSync'
  | 'deleteMessages'
  | 'searchForContactsOnly'
  | 'spellCheckTitle'
  | 'editMenuSelectAll'
  | 'messageBodyMissing'
  | 'timerOption_12_hours_abbreviated'
  | 'onlyAdminCanRemoveMembersDesc'
  | 'kickedFromTheGroup'
  | 'windowMenuMinimize'
  | 'debugLog'
  | 'timerOption_0_seconds_abbreviated'
  | 'timerOption_5_minutes_abbreviated'
  | 'goToReleaseNotes'
  | 'unpinConversation'
  | 'viewMenuResetZoom'
  | 'startInTrayDescription'
  | 'groupNamePlaceholder'
  | 'messageRequestPending'
  | 'stagedPreviewThumbnail'
  | 'helpUsTranslateSession'
  | 'editMenuDeleteGroup'
  | 'unreadMessages'
  | 'documents'
  | 'audioPermissionNeededTitle'
  | 'deleteMessagesQuestion'
  | 'clickToTrustContact'
  | 'closedGroupInviteFailMessagePlural'
  | 'noAudioInputFound'
  | 'timerOption_10_seconds'
  | 'helpSettingsTitle'
  | 'openMessageRequestInboxDescription'
  | 'notificationPreview'
  | 'noteToSelf'
  | 'failedToAddAsModerator'
  | 'disabledDisappearingMessages'
  | 'cannotUpdate'
  | 'primaryColor'
  | 'device'
  | 'replyToMessage'
  | 'messageDeletedPlaceholder'
  | 'notificationFrom'
  | 'displayName'
  | 'clear'
  | 'invalidSessionId'
  | 'audioPermissionNeeded'
  | 'createGroup'
  | 'add'
  | 'messageRequests'
  | 'show'
  | 'cannotMixImageAndNonImageAttachments'
  | 'viewMenuToggleFullScreen'
  | 'goToSupportPage'
  | 'passwordsDoNotMatch'
  | 'createClosedGroupNamePrompt'
  | 'audioMessageAutoplayDescription'
  | 'leaveAndRemoveForEveryone'
  | 'previewThumbnail'
  | 'primaryColorPurple'
  | 'photo'
  | 'setPassword'
  | 'editMenuDeleteContact'
  | 'hideMenuBarTitle'
  | 'reactionPopupOne'
  | 'showFullIdTitle'
  | 'perMessageTimestampsTitle'
  | 'imageCaptionIconAlt'
  | 'sendRecoveryPhraseTitle'
  | 'joinACommunity'
  | 'multipleJoinedTheGroup'
  | 'messageRequestAcceptedOursNoName'
  | 'databaseError'
  | 'resend'
  | 'copiedToClipboard'
  | 'closedGroupInviteSuccessTitlePlural'
  | 'autoUpdateDownloadButtonLabel'
  | 'groupMembers'
  | 'primaryColorOrange'
  | 'dialogClearAllDataDeletionQuestion'
  | 'oceanDarkThemeTitle'
  | 'unableToLoadAttachment'
  | 'cameraPermissionNeededTitle'
  | 'editMenuRedo'
  | 'hideRequestBanner'
  | 'changeNicknameMessage'
  | 'reactionPopupThree'
  | 'close'
  | 'deleteMessageQuestion'
  | 'newMessage'
  | 'windowMenuClose'
  | 'mainMenuFile'
  | 'confirmNewPassword'
  | 'callMissed'
  | 'getStarted'
  | 'reactionListCountSingular'
  | 'unblockUser'
  | 'blockUser'
  | 'clearAllConfirmationTitle'
  | 'trustThisContactDialogTitle'
  | 'received'
  | 'trimDatabaseConfirmationBody'
  | 'setPasswordFail'
  | 'clearNickname'
  | 'connectToServerSuccess'
  | 'viewMenuZoomIn'
  | 'invalidOpenGroupUrl'
  | 'entireAccount'
  | 'noContactsToAdd'
  | 'cancel'
  | 'decline'
  | 'originalMessageNotFound'
  | 'create'
  | 'autoUpdateRestartButtonLabel'
  | 'deleteConversationConfirmation'
  | 'timerOption_6_hours_abbreviated'
  | 'timerOption_1_week_abbreviated'
  | 'removePasswordTitle'
  | 'unblockGroupToSend'
  | 'otherPlural'
  | 'enable'
  | 'notificationSubtitle'
  | 'youChangedTheTimer'
  | 'updatedTheGroup'
  | 'leaveGroup'
  | 'continueYourSession'
  | 'invalidGroupNameTooShort'
  | 'notificationForConvo'
  | 'noNameOrMessage'
  | 'classicLightThemeTitle'
  | 'noSearchResults'
  | 'reactionPopup'
  | 'changeNickname'
  | 'userUnbanned'
  | 'respondingToRequestWarning'
  | 'error'
  | 'clearAllData'
  | 'createConversationNewGroup'
  | 'disappearingMessages'
  | 'autoUpdateNewVersionTitle'
  | 'linkPreviewDescription'
  | 'timerOption_1_day'
  | 'contactsHeader'
  | 'openGroupInvitation'
  | 'callMissedCausePermission'
  | 'mediaPermissionsDescription'
  | 'tryAgain'
  | 'clearDevice'
  | 'media'
  | 'noMembersInThisGroup'
  | 'saveLogToDesktop'
  | 'copyErrorAndQuit'
  | 'onlyAdminCanRemoveMembers'
  | 'passwordTypeError'
  | 'createClosedGroupPlaceholder'
  | 'editProfileModalTitle'
  | 'noCameraFound'
  | 'setAccountPasswordTitle'
  | 'callMediaPermissionsDescription'
  | 'recoveryPhraseSecureTitle'
  | 'yesterday'
  | 'closedGroupInviteSuccessMessage'
  | 'youDisabledDisappearingMessages'
  | 'updateGroupDialogTitle'
  | 'surveyTitle'
  | 'userRemovedFromModerators'
  | 'timerOption_5_seconds'
  | 'failedToRemoveFromModerator'
  | 'conversationsHeader'
  | 'setPasswordToastDescription'
  | 'audio'
  | 'startInTrayTitle'
  | 'cannotRemoveCreatorFromGroup'
  | 'editMenuCut'
  | 'markAllAsRead'
  | 'failedResolveOns'
  | 'showDebugLog'
  | 'declineRequestMessage'
  | 'primaryColorGreen'
  | 'dialogClearAllDataDeletionFailedTitleQuestion'
  | 'autoUpdateDownloadInstructions'
  | 'dialogClearAllDataDeletionFailedTitle'
  | 'loading'
  | 'blockedSettingsTitle'
  | 'appMenuHide'
  | 'removeAccountPasswordTitle'
  | 'recoveryPhraseEmpty'
  | 'noAudioOutputFound'
  | 'save'
  | 'privacySettingsTitle'
  | 'changeAccountPasswordDescription'
  | 'notificationSettingsDialog'
  | 'invalidOldPassword'
  | 'messageBody'
  | 'audioMessageAutoplayTitle'
  | 'removePasswordInvalid'
  | 'password'
  | 'nicknamePlaceholder'
  | 'linkPreviewsTitle'
  | 'continue'
  | 'learnMore'
  | 'passwordCharacterError'
  | 'autoUpdateSettingTitle'
  | 'documentsEmptyState'
  | 'deleteForEveryone'
  | 'createSessionID'
  | 'multipleLeftTheGroup'
  | 'answeredACall'
  | 'oceanLightThemeTitle'
  | 'enterSessionIDOrONSName'
  | 'quoteThumbnailAlt'
  | 'timerOption_1_week'
  | 'deleteContactConfirmation'
  | 'timerOption_30_seconds'
  | 'createAccount'
  | 'timerOption_1_minute_abbreviated'
  | 'startNewConversationBy...'
  | 'timerOption_12_hours'
  | 'unblockToSend'
  | 'timerOption_1_minute'
  | 'yourSessionID'
  | 'deleteAccountWarning'
  | 'deleted'
  | 'closedGroupMaxSize'
  | 'messagesHeader'
  | 'joinOpenGroup'
  | 'callMediaPermissionsDialogContent'
  | 'timerOption_1_day_abbreviated'
  | 'about'
  | 'clearAllConfirmationBody'
  | 'ok'
  | 'multipleKickedFromTheGroup'
  | 'trimDatabase'
  | 'clearAll'
  | 'recoveryPhraseSavePromptMain'
  | 'editMenuPaste'
  | 'areYouSureDeleteDeviceOnly'
  | 'or'
  | 'removeModerators'
  | 'destination'
  | 'invalidGroupNameTooLong'
  | 'youLeftTheGroup'
  | 'theyChangedTheTimer'
  | 'userBanned'
  | 'addACaption'
  | 'timerOption_5_seconds_abbreviated'
  | 'removeFromModerators'
  | 'enterRecoveryPhrase'
  | 'support'
  | 'stagedImageAttachment'
  | 'thisWeek'
  | 'savedTheFile'
  | 'mediaEmptyState'
  | 'linkVisitWarningTitle'
  | 'invalidPassword'
  | 'endCall'
  | 'connectingToServer'
  | 'pleaseWaitOpenAndOptimizeDb'
  | 'settingsHeader'
  | 'autoUpdateNewVersionMessage'
  | 'oneNonImageAtATimeToast'
  | 'reactionPopupMany'
  | 'timerSetTo'
  | 'iAmSure'
  | 'primaryColorRed'
  | 'selectMessage'
  | 'enterAnOpenGroupURL'
  | 'delete'
  | 'changePasswordInvalid'
  | 'themesSettingTitle'
  | 'timerOption_6_hours'
  | 'confirmPassword'
  | 'downloadAttachment'
  | 'trimDatabaseDescription'
  | 'showUserDetails'
  | 'titleIsNow'
  | 'removePasswordToastDescription'
  | 'recoveryPhrase'
  | 'deleteAccountFromLogin'
  | 'newMessages'
  | 'you'
  | 'pruneSettingTitle'
  | 'unbanUser'
  | 'notificationForConvo_mentions_only'
  | 'trustThisContactDialogDescription'
  | 'unknownCountry'
  | 'searchFor...'
  | 'joinedTheGroup'
  | 'editGroupName'
  | 'reportIssue';
