import React from 'react';
import { UserIcon } from '@/components/Sidebar/UserIcon';
import { useActiveRoute } from '@/lib/useActiveRoute';
import {
  IconContainer,
  IconLink,
  Container,
} from '@/styles/components/Sidebar/sidebar.styles';
import {
  BOOKEM_THEME,
  SIDEBAR_ICON_HEIGHT,
  SIDEBAR_ICON_PARAMS,
  SIDEBAR_ICON_WIDTH,
} from '@/utils/constants';
import Image from 'next/image';
import {
  IconText,
  IconFlexBox,
} from '@/styles/components/Sidebar/sidebar.styles';

export const Sidebar = () => {
  const activeRoute = useActiveRoute();

  return (
    <Container>
      <IconContainer>
        <UserIcon />
      </IconContainer>

      {/* Iterate through iconParamList to display icons */}
      {SIDEBAR_ICON_PARAMS.map(iconParam => {
        return (
          <IconContainer
            hoveredcolor={BOOKEM_THEME.colors.BOOKEM_LIGHT_GRAY}
            color={
              activeRoute === iconParam.linkTo
                ? BOOKEM_THEME.colors.BOOKEM_LIGHT_GRAY
                : BOOKEM_THEME.colors.BOOKEM_BLACK
            }
            key={iconParam.linkTo}>
            {/* Link that wraps around the icon */}
            <IconLink
              href={iconParam.linkTo}
              hoveredsrc={iconParam.hoveredsrc}
              // Dynamically assign the background color according to the current route
              backgroundcolor={
                activeRoute === iconParam.linkTo
                  ? BOOKEM_THEME.colors.BOOKEM_BLACK
                  : BOOKEM_THEME.colors.BOOKEM_LIGHT_GRAY
              }
              // Dynamically assign the src of the icon according to the current route
              imgsrc={
                activeRoute === iconParam.linkTo
                  ? iconParam.hoveredsrc
                  : iconParam.defaultSrc
              }>
              {/* Desktop version only displays image */}
              {/* Icon image with default src */}
              <IconFlexBox>
                <Image
                  src={iconParam.defaultSrc}
                  alt=""
                  width={SIDEBAR_ICON_HEIGHT}
                  height={SIDEBAR_ICON_WIDTH}
                />
                <IconText>{iconParam.text}</IconText>
              </IconFlexBox>
            </IconLink>
          </IconContainer>
        );
      })}
    </Container>
  );
};
