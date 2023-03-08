import React from 'react';
import { UserIcon } from '@/components/UserIcon';
import { useActiveRoute } from '@/lib/useActiveRoute';
import { Icon, IconBox, IconLink, SideBarBox } from '@/styles/sidebar.styles';

/**
 * Icon Param container.
 * Used to create icons through iteration
 * @defaultSrc src of the icon when not selected or hovered
 * @hoveredsrc src of the icon when selected or hovered
 * @linkTo where the link of icon directs to
 */
interface IconParams {
  defaultSrc: string;
  hoveredsrc: string;
  linkTo: string;
}

/**
 * Default width of icons
 */
const iconWidth = 41.25;

/**
 * Default height of icons
 */
const iconHeight = 42.47;

/**
 * List of IconParams
 */
const iconParamList = [
  {
    defaultSrc: '/sidebar/home-white.png',
    hoveredsrc: '/sidebar/home-black.png',
    linkTo: '/',
  },
  {
    defaultSrc: '/sidebar/hand-shake-white.png',
    hoveredsrc: '/sidebar/hand-shake-black.png',
    linkTo: '/volunteer',
  },
  {
    defaultSrc: '/sidebar/currency-dollar-white.png',
    hoveredsrc: '/sidebar/currency-dollar-black.png',
    linkTo: '/donate',
  },
  {
    defaultSrc: '/sidebar/book-open-white.png',
    hoveredsrc: '/sidebar/book-open-black.png',
    linkTo: '/request',
  },
  {
    defaultSrc: '/sidebar/setting-white.png',
    hoveredsrc: '/sidebar/setting-black.png',
    linkTo: '/settings',
  },
];

export const SideBar = () => {
  const activeRoute = useActiveRoute();

  return (
    <SideBarBox>
      <IconBox>
        <UserIcon />
      </IconBox>

      {/* Iterate through iconParamList to display icons */}
      {iconParamList.map(iconParam => {
        return (
          <IconBox key={iconParam.defaultSrc}>
            {/* Link that wraps around the icon */}
            <IconLink
              href={iconParam.linkTo}
              hoveredsrc={iconParam.hoveredsrc}
              // Dynamically assign the background color according to the current route
              backgroundcolor={
                activeRoute === iconParam.linkTo ? '#d9d9d9' : '#6d6d6d'
              }
              // Dynamically assign the src of the icon according to the current route
              imgsrc={
                activeRoute === iconParam.linkTo
                  ? iconParam.hoveredsrc
                  : iconParam.defaultSrc
              }>
              {/* Icon image with default src */}
              <Icon
                src={iconParam.defaultSrc}
                alt=""
                width={iconWidth}
                height={iconHeight}
              />
            </IconLink>
          </IconBox>
        );
      })}
    </SideBarBox>
  );
};
