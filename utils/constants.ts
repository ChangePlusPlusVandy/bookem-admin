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
