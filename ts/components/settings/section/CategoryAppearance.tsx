import React from 'react';
// tslint:disable-next-line: no-submodule-imports
import useUpdate from 'react-use/lib/useUpdate';
import { SettingsKey } from '../../../data/settings-key';
import { isHideMenuBarSupported } from '../../../types/Settings';

import { SessionToggleWithDescription } from '../SessionSettingListItem';
import { SettingsThemeSwitcher } from '../SettingsThemeSwitcher';
import { ZoomingSessionSlider } from '../ZoomingSessionSlider';

export const SettingsCategoryAppearance = (props: { hasPassword: boolean | null }) => {
  const forceUpdate = useUpdate();

  if (props.hasPassword !== null) {
    const isHideMenuBarActive =
      window.getSettingValue(SettingsKey.settingsMenuBar) === undefined
        ? true
        : window.getSettingValue(SettingsKey.settingsMenuBar);

    const isShowFullIdActive =
      window.getSettingValue(SettingsKey.settingsShowFullId) === undefined
        ? false
        : window.getSettingValue(SettingsKey.settingsShowFullId);

    const isMessageFormattingActive =
      window.getSettingValue(SettingsKey.settingsMessageFormatting) === undefined
        ? false
        : window.getSettingValue(SettingsKey.settingsMessageFormatting);

    const isPerMessageTimestampsActive =
      window.getSettingValue(SettingsKey.settingsPerMessageTimestamps) === undefined
        ? true
        : window.getSettingValue(SettingsKey.settingsPerMessageTimestamps);

    return (
      <>
        {window.sessionFeatureFlags.useSettingsThemeSwitcher && <SettingsThemeSwitcher />}
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
            window.toggleMessageFormatting();
            forceUpdate();
          }}
          title={window.i18n('messageFormattingTitle')}
          description={window.i18n('messageFormattingDescription')}
          active={isMessageFormattingActive}
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
        <ZoomingSessionSlider />
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
      </>
    );
  }
  return null;
};
