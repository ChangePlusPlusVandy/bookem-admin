import { SidebarIconParams } from '@/utils/types';

/**
 * Default width of icons
 */
export const SIDEBAR_ICON_WIDTH = 41.25;

/**
 * Default height of icons
 */
export const SIDEBAR_ICON_HEIGHT = 42.47;

export const BOOKEM_THEME = {
  colors: {
    WHITE: '#FFFFFF',
    BOOKEM_BLACK: '#2C2C2C',
    BOOKEM_LIGHT_GRAY: '#F4F4F4',
    BOOKEM_RED: '#DA4347',
    BOOKEM_BLUE: '#83BCDA',
    BOOKEM_YELLOW: '#F1E09A',
  },
  fonts: {
    PRIMARY: 'Inter',
    SECONDARY: 'sans-serif',
  },
  fontSizes: {
    EXTRA_SMALL: '1rem',
    SMALL: '1.2rem',
    MEDIUM: '1.6rem',
    LARGE: '2.4rem',
  },
};

/**
 * List of IconParams
 */
export const SIDEBAR_ICON_PARAMS: SidebarIconParams[] = [
  {
    defaultSrc: '/sidebar/home-white.svg',
    hoveredsrc: '/sidebar/home-black.svg',
    linkTo: '/',
    text: 'Home',
  },
  {
    defaultSrc: '/sidebar/logs-white.svg',
    hoveredsrc: '/sidebar/logs-black.svg',
    linkTo: '/logs',
    text: 'Logs',
  },
  {
    defaultSrc: '/sidebar/volunteer-management-white.svg',
    hoveredsrc: '/sidebar/volunteer-management-black.svg',
    linkTo: '/volunteer',
    text: 'Volunteers',
  },
  {
    defaultSrc: '/sidebar/event-management-white.svg',
    hoveredsrc: '/sidebar/event-management-black.svg',
    linkTo: '/event',
    text: 'Events',
  },
  {
    defaultSrc: '/sidebar/program-management-white.svg',
    hoveredsrc: '/sidebar/program-management-black.svg',
    linkTo: '/program',
    text: 'Programs',
  },
  {
    defaultSrc: '/sidebar/setting-white.svg',
    hoveredsrc: '/sidebar/setting-black.svg',
    linkTo: '/settings',
    text: 'Settings',
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

export const LOCALE_DATE_FORMAT: any = {
  // weekday: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
};
