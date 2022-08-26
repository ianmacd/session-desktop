import { ipcRenderer, shell } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// tslint:disable-next-line: no-submodule-imports
import useUpdate from 'react-use/lib/useUpdate';
import { Data, hasLinkPreviewPopupBeenDisplayed } from '../../../data/data';
import { SettingsKey } from '../../../data/settings-key';
import { ToastUtils } from '../../../session/utils';
import { updateConfirmModal } from '../../../state/ducks/modalDialog';
import { toggleAudioAutoplay } from '../../../state/ducks/userConfig';
import { getAudioAutoplay } from '../../../state/selectors/userConfig';
import { isHideMenuBarSupported } from '../../../types/Settings';
import { SessionButtonColor } from '../../basic/SessionButton';

import { SessionSettingButtonItem, SessionToggleWithDescription } from '../SessionSettingListItem';
import { ZoomingSessionSlider } from '../ZoomingSessionSlider';

async function toggleLinkPreviews() {
  const newValue = !window.getSettingValue(SettingsKey.settingsLinkPreview);
  window.setSettingValue(SettingsKey.settingsLinkPreview, newValue);
  if (!newValue) {
    await Data.createOrUpdateItem({ id: hasLinkPreviewPopupBeenDisplayed, value: false });
  } else {
    window.inboxStore?.dispatch(
      updateConfirmModal({
        title: window.i18n('linkPreviewsTitle'),
        message: window.i18n('linkPreviewsConfirmMessage'),
        okTheme: SessionButtonColor.Danger,
      })
    );
  }
}

async function toggleStartInTray() {
  try {
    const newValue = !(await window.getStartInTray());

    // make sure to write it here too, as this is the value used on the UI to mark the toggle as true/false
    window.setSettingValue(SettingsKey.settingsStartInTray, newValue);
    await window.setStartInTray(newValue);
    if (!newValue) {
      ToastUtils.pushRestartNeeded();
    }
  } catch (e) {
    window.log.warn('start in tray change error:', e);
  }
}

// tslint:disable: max-func-body-length
export const SettingsCategoryAppearance = (props: { hasPassword: boolean | null }) => {
  const dispatch = useDispatch();
  const forceUpdate = useUpdate();
  const audioAutoPlay = useSelector(getAudioAutoplay);

  if (props.hasPassword !== null) {
    const isHideMenuBarActive =
      window.getSettingValue(SettingsKey.settingsMenuBar) === undefined
        ? true
        : window.getSettingValue(SettingsKey.settingsMenuBar);

    const isShowFullIdActive =
      window.getSettingValue(SettingsKey.settingsShowFullId) === undefined
        ? false
        : window.getSettingValue(SettingsKey.settingsShowFullId);

    const isFrequentTimestampsActive =
      window.getSettingValue(SettingsKey.settingsFrequentTimestamps) === undefined
        ? false
        : window.getSettingValue(SettingsKey.settingsFrequentTimestamps);

    const isPerMessageTimestampsActive =
      window.getSettingValue(SettingsKey.settingsPerMessageTimestamps) === undefined
        ? true
        : window.getSettingValue(SettingsKey.settingsPerMessageTimestamps);

    const isMessageFormattingActive =
      window.getSettingValue(SettingsKey.settingsMessageFormatting) === undefined
        ? false
        : window.getSettingValue(SettingsKey.settingsMessageFormatting);

    const isSpellCheckActive =
      window.getSettingValue(SettingsKey.settingsSpellCheck) === undefined
        ? true
        : window.getSettingValue(SettingsKey.settingsSpellCheck);

    const isLinkPreviewsOn = Boolean(window.getSettingValue(SettingsKey.settingsLinkPreview));
    const isStartInTrayActive = Boolean(window.getSettingValue(SettingsKey.settingsStartInTray));

    return (
      <>
        {isHideMenuBarSupported() && (
          <SessionToggleWithDescription
            onClickToggle={() => {
              window.toggleMenuBar();
              forceUpdate();
            }}
            title={window.i18n('hideMenuBarTitle')}
            description={window.i18n('hideMenuBarDescription')}
            active={isHideMenuBarActive}
          />
        )}
        <SessionToggleWithDescription
          onClickToggle={() => {
            window.toggleFullId();
            forceUpdate();
          }}
          title={window.i18n('showFullIdTitle')}
          description={window.i18n('showFullIdDescription')}
          active={isShowFullIdActive}
        />
        <SessionToggleWithDescription
          onClickToggle={() => {
            window.toggleFrequentTimestamps();
            forceUpdate();
          }}
          title={window.i18n('frequentTimestampsTitle')}
          description={window.i18n('frequentTimestampsDescription')}
          active={isFrequentTimestampsActive}
        />
        <SessionToggleWithDescription
          onClickToggle={() => {
            window.togglePerMessageTimestamps();
            forceUpdate();
          }}
          title={window.i18n('perMessageTimestampsTitle')}
          description={window.i18n('perMessageTimestampsDescription')}
          active={isPerMessageTimestampsActive}
        />
        <SessionToggleWithDescription
          onClickToggle={() => {
            window.toggleMessageFormatting();
            forceUpdate();
          }}
          title={window.i18n('messageFormattingTitle')}
          description={window.i18n('messageFormattingDescription')}
          active={isMessageFormattingActive}
        />
        <SessionToggleWithDescription
          onClickToggle={() => {
            window.toggleSpellCheck();
            forceUpdate();
          }}
          title={window.i18n('spellCheckTitle')}
          description={window.i18n('spellCheckDescription')}
          active={isSpellCheckActive}
        />

        <SessionToggleWithDescription
          onClickToggle={async () => {
            await toggleLinkPreviews();
            forceUpdate();
          }}
          title={window.i18n('linkPreviewsTitle')}
          description={window.i18n('linkPreviewDescription')}
          active={isLinkPreviewsOn}
        />
        <SessionToggleWithDescription
          onClickToggle={async () => {
            await toggleStartInTray();
            forceUpdate();
          }}
          title={window.i18n('startInTrayTitle')}
          description={window.i18n('startInTrayDescription')}
          active={isStartInTrayActive}
        />
        <SessionToggleWithDescription
          onClickToggle={() => {
            dispatch(toggleAudioAutoplay());
            forceUpdate();
          }}
          title={window.i18n('audioMessageAutoplayTitle')}
          description={window.i18n('audioMessageAutoplayDescription')}
          active={audioAutoPlay}
        />

        <ZoomingSessionSlider />
        <SessionSettingButtonItem
          title={window.i18n('moreOpenGroupsTitle')}
	  // tslint:disable no-http-string
          onClick={() => void shell.openExternal('http://lokilocker.com/Mods/Session-Groups/wiki/Session-Open-Groups')}
	  // tslint:enable no-http-string
          buttonColor={SessionButtonColor.Primary}
          buttonText={window.i18n('listOpenGroups')}
        />
        <SessionSettingButtonItem
          title={window.i18n('surveyTitle')}
          onClick={() => void shell.openExternal('https://getsession.org/survey')}
          buttonColor={SessionButtonColor.Primary}
          buttonText={window.i18n('goToOurSurvey')}
        />
        <SessionSettingButtonItem
          title={window.i18n('helpUsTranslateSession')}
          onClick={() => void shell.openExternal('https://crowdin.com/project/session-desktop/')}
          buttonColor={SessionButtonColor.Primary}
          buttonText={window.i18n('translation')}
        />
        <SessionSettingButtonItem
          onClick={() => {
            ipcRenderer.send('show-debug-log');
          }}
          buttonColor={SessionButtonColor.Primary}
          buttonText={window.i18n('showDebugLog')}
        />
        {/* <SessionSettingButtonItem
          onClick={async () => {
            await fillWithTestData(100, 1000);
          }}
          buttonColor={SessionButtonColor.Primary}
          buttonText={'Spam fill DB using cached'}
        /> */}
      </>
    );
  }
  return null;
};
