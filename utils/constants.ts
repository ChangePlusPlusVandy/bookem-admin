import { SidebarIconParams } from '@/utils/types';

/**
 * Default width of icons
 */
export const SIDEBAR_ICON_WIDTH = 41.25;

/**
 * Default height of icons
 */
export const SIDEBAR_ICON_HEIGHT = 42.47;

/**
 * List of IconParams
 */
export const SIDEBAR_ICON_PARAMS: SidebarIconParams[] = [
  {
    defaultSrc: '/sidebar/home-white.png',
    hoveredsrc: '/sidebar/home-black.png',
    linkTo: '/',
  },
  {
    defaultSrc: '/sidebar/volunteer-management-white.png',
    hoveredsrc: '/sidebar/volunteer-management-black.png',
    linkTo: '/volunteer',
  },
  {
    defaultSrc: '/sidebar/program-management-white.png',
    hoveredsrc: '/sidebar/program-management-black.png',
    linkTo: '/program',
  },
  {
    defaultSrc: '/sidebar/setting-white.png',
    hoveredsrc: '/sidebar/setting-black.png',
    linkTo: '/settings',
  },
];

/**
 * Default width of event contact icons
 */
export const EVENT_CONTACT_ICON_WIDTH = 23;

/**
 * Default height of event contact icons
 */
export const EVENT_CONTACT_ICON_HEIGHT = 23;
