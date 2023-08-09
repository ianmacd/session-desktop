import React from 'react';

import { shell } from 'electron';

import { useDispatch, useSelector } from 'react-redux';

import { AsnResponse, CityResponse, Reader } from 'maxmind';
import { Snode } from '../../data/data';
import { onionPathModal } from '../../state/ducks/modalDialog';
import {
  getFirstOnionPath,
  getFirstOnionPathLength,
  getIsOnline,
  getOnionPathsCount,
} from '../../state/selectors/onions';
import { Flex } from '../basic/Flex';
// tslint:disable-next-line: no-submodule-imports
import useHover from 'react-use/lib/useHover';
import { SessionSpinner } from '../basic/SessionSpinner';
import { SessionIcon, SessionIconButton } from '../icon';
import { SessionWrapperModal } from '../SessionWrapperModal';
import styled from 'styled-components';

export type StatusLightType = {
  glowStartDelay: number;
  glowDuration: number;
  color?: string;
};

const StyledCountry = styled.div`
  margin: var(--margins-sm);
  min-width: 400px;
  white-space: pre-line;
`;

const StyledOnionNodeList = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--margins-sm);
  align-items: center;
  min-width: 10vw;
  position: relative;
`;

const StyledOnionDescription = styled.p`
  min-width: 500px;
  width: 0;
  line-height: 1.3333;
`;

const StyledVerticalLine = styled.div`
  background: var(--border-color);
  position: absolute;
  height: calc(100% - 2 * 15px);
  margin: 15px calc(100% / 2 - 1px);

  width: 1px;
`;

const StyledLightsContainer = styled.div`
  position: relative;
`;

const StyledGrowingIcon = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const OnionCountryDisplay = ({ latLong, labelText }: { latLong?: string, labelText: string }) => {
  const element = (hovered: boolean) => (
    <StyledCountry>{hovered && latLong ? labelText : labelText}</StyledCountry>
  );
  const [hoverable] = useHover(element);

  return hoverable;
};

const cityReader = new Reader<CityResponse>(window.mmdbCityBuffer);
const asnReader = new Reader<AsnResponse>(window.mmdbASNBuffer);
const lang = 'en';

const OnionPathModalInner = () => {
  const onionPath = useSelector(getFirstOnionPath);
  const isOnline = useSelector(getIsOnline);
  // including the device and destination in calculation
  const glowDuration = onionPath.length + 2;
  if (!isOnline || !onionPath || onionPath.length === 0) {
    return <SessionSpinner loading={true} />;
  }

  const nodes = [
    {
      label: window.i18n('device'),
    },
    ...onionPath,
    {
      label: window.i18n('destination'),
    },
  ];

  return (
    <>
      <StyledOnionDescription>
        {window.i18n('onionPathIndicatorDescription')}
      </StyledOnionDescription>
      <StyledOnionNodeList>
        <Flex container={true}>
          <StyledLightsContainer>
            <StyledVerticalLine />

            <Flex container={true} flexDirection="column" alignItems="center" height="100%">
              {nodes.map((_snode: Snode | any, index: number) => {
                return (
                  <OnionNodeStatusLight
                    glowDuration={glowDuration}
                    glowStartDelay={index}
                    key={`light-${index}`}
                  />
                );
              })}
            </Flex>
          </StyledLightsContainer>
          <Flex container={true} flexDirection="column" alignItems="flex-start">
            {nodes.map((snode: Snode | any) => {
	      const cityLookup = cityReader.get(snode.ip || '0.0.0.0');
	      const cityName = cityLookup?.city?.names[lang];
	      const countryName = cityLookup?.country?.names[lang];
	      const subDivisions = cityLookup?.subdivisions;
	      const subDivisionName = subDivisions
		? subDivisions[0].names[lang]
		: undefined
	      const isoCode = cityLookup?.country?.iso_code;
	      const latitude = cityLookup?.location?.latitude;
	      const longitude = cityLookup?.location?.longitude;
	      const latLong = latitude
		? `${latitude}°, ${longitude}°`
		: ''
	      const asnLookup = asnReader.get(snode.ip || '0.0.0.0');
	      const asnOrganisation = asnLookup?.autonomous_system_organization;

	      const letterA = 'a'.codePointAt(0) || 0;
	      const regionalIndicatorA = '🇦'.codePointAt(0) || 0;
	      const toRegionalIndicator = (char: any) => String.fromCodePoint(
	          (char.codePointAt(0) - letterA) + regionalIndicatorA
	      );
	      const flag = isoCode?.toLowerCase()
	        .split('')
	        .map(toRegionalIndicator)
	        .join('');

	      // Show the city, subdivision and country if possible. If the
	      // city or subdivision is unknown, or they match each other
	      // (e.g. Luxembourg or Singapore) or the country, they are
	      // omitted.
	      const cityCountry = cityName
		? cityName === countryName
		  ? `${countryName}  ${flag}`
		  : subDivisionName && subDivisionName !== cityName
		    ? `${cityName}, ${subDivisionName}, ${countryName}  ${flag}`
		    : `${cityName}, ${countryName}  ${flag}`
		: `${countryName}  ${flag}`

	      const networkData = asnOrganisation
		? `${snode.ip}: ${asnOrganisation}`
		: `${snode.ip}`

              let labelText = snode.label
                ? snode.label
                : `${cityCountry}\n${networkData}`
              if (!labelText) {
                labelText = window.i18n('unknownCountry');
              }
              return labelText ? (
                <OnionCountryDisplay
                  labelText={labelText}
		  latLong={latLong}
                  key={`country-${snode.ip}`}
                />
              ) : null;
            })}
          </Flex>
        </Flex>
      </StyledOnionNodeList>
    </>
  );
};

export type OnionNodeStatusLightType = {
  glowStartDelay: number;
  glowDuration: number;
};

/**
 * Component containing a coloured status light.
 */
export const OnionNodeStatusLight = (props: OnionNodeStatusLightType): JSX.Element => {
  const { glowStartDelay, glowDuration } = props;

  return (
    <ModalStatusLight
      glowDuration={glowDuration}
      glowStartDelay={glowStartDelay}
      color={'var(--button-path-default-color)'}
    />
  );
};

/**
 * An icon with a pulsating glow emission.
 */
export const ModalStatusLight = (props: StatusLightType) => {
  const { glowStartDelay, glowDuration, color } = props;

  return (
    <StyledGrowingIcon>
      <SessionIcon
        borderRadius={'50px'}
        iconColor={color}
        glowDuration={glowDuration}
        glowStartDelay={glowStartDelay}
        iconType="circle"
        iconSize={'tiny'}
      />
    </StyledGrowingIcon>
  );
};

/**
 * A status light specifically for the action panel. Color is based on aggregate node states instead of individual onion node state
 */
export const ActionPanelOnionStatusLight = (props: {
  isSelected: boolean;
  handleClick: () => void;
  dataTestId?: string;
  id: string;
}) => {
  const { isSelected, handleClick, dataTestId, id } = props;

  const onionPathsCount = useSelector(getOnionPathsCount);
  const firstPathLength = useSelector(getFirstOnionPathLength);
  const isOnline = useSelector(getIsOnline);

  // Set icon color based on result
  const errorColor = 'var(--button-path-error-color)';
  const defaultColor = 'var(--button-path-default-color)';
  const connectingColor = 'var(--button-path-connecting-color)';

  // start with red
  let iconColor = errorColor;
  //if we are not online or the first path is not valid, we keep red as color
  if (isOnline && firstPathLength > 1) {
    iconColor =
      onionPathsCount >= 2 ? defaultColor : onionPathsCount >= 1 ? connectingColor : errorColor;
  }

  return (
    <SessionIconButton
      iconSize={'small'}
      iconType="circle"
      iconColor={iconColor}
      onClick={handleClick}
      glowDuration={10}
      glowStartDelay={0}
      noScale={true}
      isSelected={isSelected}
      dataTestId={dataTestId}
      id={id}
    />
  );
};

export const OnionPathModal = () => {
  const onConfirm = () => {
    void shell.openExternal('https://getsession.org/faq/#onion-routing');
  };
  const dispatch = useDispatch();
  return (
    // tslint:disable-next-line: use-simple-attributes
    <SessionWrapperModal
      title={window.i18n('onionPathIndicatorTitle')}
      confirmText={window.i18n('learnMore')}
      cancelText={window.i18n('cancel')}
      onConfirm={onConfirm}
      onClose={() => dispatch(onionPathModal(null))}
      showExitIcon={true}
    >
      <OnionPathModalInner />
    </SessionWrapperModal>
  );
};
