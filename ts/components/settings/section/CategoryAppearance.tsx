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

    return (
      <>
        <SettingsThemeSwitcher />
	<SessionToggleWithDescription
	  onClickToggle={() => {
	    window.toggleFullId();
	    forceUpdate();
	  }}
	  title={window.i18n('showFullIdTitle')}
	  description={window.i18n('showFullIdDescription')}
	  active={isShowFullIdActive}
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
