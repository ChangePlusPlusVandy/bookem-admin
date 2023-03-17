import { IconParams } from '@/utils/types';

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
export const SIDEBAR_ICON_PARAMS: IconParams[] = [
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
