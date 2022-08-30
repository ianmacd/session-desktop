import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// tslint:disable-next-line: no-submodule-imports
import useUpdate from 'react-use/lib/useUpdate';
import { SettingsKey } from '../../../data/settings-key';
import { ToastUtils } from '../../../session/utils';
import { toggleAudioAutoplay } from '../../../state/ducks/userConfig';
import { getAudioAutoplay } from '../../../state/selectors/userConfig';

import { BlockedContactsList } from '../BlockedList';
// tslint:disable: use-simple-attributes

import { SessionToggleWithDescription } from '../SessionSettingListItem';

async function toggleCommunitiesPruning() {
  try {
    const newValue = !(await window.getOpengroupPruning());

    // make sure to write it here too, as this is the value used on the UI to mark the toggle as true/false
    await window.setSettingValue(SettingsKey.settingsOpengroupPruning, newValue);
    await window.setOpengroupPruning(newValue);
    ToastUtils.pushRestartNeeded();
  } catch (e) {
    window.log.warn('toggleCommunitiesPruning change error:', e);
  }
}

const CommunitiesPruningSetting = () => {
  const forceUpdate = useUpdate();
  const isOpengroupPruningEnabled = Boolean(
    window.getSettingValue(SettingsKey.settingsOpengroupPruning)
  );
  return (
    <SessionToggleWithDescription
      onClickToggle={async () => {
        await toggleCommunitiesPruning();
        forceUpdate();
      }}
      title={window.i18n('pruneSettingTitle')}
      description={window.i18n('pruneSettingDescription')}
      active={isOpengroupPruningEnabled}
    />
  );
};

const ScrollOnSendSetting = () => {
  const forceUpdate = useUpdate();

  const isScrollOnSendActive =
    window.getSettingValue(SettingsKey.settingsScrollOnSend) === undefined
      ? true
      : window.getSettingValue(SettingsKey.settingsScrollOnSend);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleScrollOnSend();
        forceUpdate();
      }}
      title={window.i18n('scrollOnSendTitle')}
      description={window.i18n('scrollOnSendDescription')}
      active={isScrollOnSendActive}
    />
  );
};

const SendOnShiftEnterSetting = () => {
  const forceUpdate = useUpdate();

  const isSendOnShiftEnterActive =
    window.getSettingValue(SettingsKey.settingsSendOnShiftEnter) === undefined
      ? false
      : window.getSettingValue(SettingsKey.settingsSendOnShiftEnter);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleSendOnShiftEnter();
        forceUpdate();
      }}
      title={window.i18n('sendOnShiftEnterTitle')}
      description={window.i18n('sendOnShiftEnterDescription')}
      active={isSendOnShiftEnterActive}
    />
  );
};

const ConfirmDeletionsSetting = () => {
  const forceUpdate = useUpdate();

  const isConfirmDeletionsActive =
    window.getSettingValue(SettingsKey.settingsConfirmDeletions) === undefined
      ? true
      : window.getSettingValue(SettingsKey.settingsConfirmDeletions);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleConfirmDeletions();
        forceUpdate();
      }}
      title={window.i18n('confirmDeletionsTitle')}
      description={window.i18n('confirmDeletionsDescription')}
      active={isConfirmDeletionsActive}
    />
  );
};

const FetchMessagesSinceEpochSetting = () => {
  const forceUpdate = useUpdate();

  const isFetchMessagesSinceEpochActive =
    window.getSettingValue(SettingsKey.settingsFetchMessagesSinceEpoch) === undefined
      ? false
      : window.getSettingValue(SettingsKey.settingsFetchMessagesSinceEpoch);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleFetchMessagesSinceEpoch();
        forceUpdate();
      }}
      title={window.i18n('fetchMessagesSinceEpochTitle')}
      description={window.i18n('fetchMessagesSinceEpochDescription')}
      active={isFetchMessagesSinceEpochActive}
    />
  );
};

const SpellCheckSetting = () => {
  const forceUpdate = useUpdate();

  const isSpellCheckActive =
    window.getSettingValue(SettingsKey.settingsSpellCheck) === undefined
      ? true
      : window.getSettingValue(SettingsKey.settingsSpellCheck);
  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        window.toggleSpellCheck();
        forceUpdate();
      }}
      title={window.i18n('spellCheckTitle')}
      description={window.i18n('spellCheckDescription')}
      active={isSpellCheckActive}
    />
  );
};

const AudioMessageAutoPlaySetting = () => {
  const audioAutoPlay = useSelector(getAudioAutoplay);
  const dispatch = useDispatch();
  const forceUpdate = useUpdate();

  return (
    <SessionToggleWithDescription
      onClickToggle={() => {
        dispatch(toggleAudioAutoplay());
        forceUpdate();
      }}
      title={window.i18n('audioMessageAutoplayTitle')}
      description={window.i18n('audioMessageAutoplayDescription')}
      active={audioAutoPlay}
    />
  );
};

export const CategoryConversations = () => {
  return (
    <>
      <CommunitiesPruningSetting />
      <ScrollOnSendSetting/>
      <SendOnShiftEnterSetting/>
      <ConfirmDeletionsSetting/>
      <FetchMessagesSinceEpochSetting/>
      <SpellCheckSetting />
      <AudioMessageAutoPlaySetting />

      <BlockedContactsList />
    </>
  );
};
