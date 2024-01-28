/**
 * All shared interfaces live here
 */

/**
 * Sidebar Icon Param container.
 * Used to create icons through iteration
 * @defaultSrc src of the icon when not selected or hovered
 * @hoveredsrc src of the icon when selected or hovered
 * @linkTo where the link of icon directs to
 */
export interface SidebarIconParams {
  defaultSrc: string;
  hoveredsrc: string;
  linkTo: string;
}

export interface PopupWindowProps {
  hidePopup: () => void;
  children: JSX.Element;
}

export interface Stats {
  userCount: number;
  volunteerHours: number;
  eventCount: number;
}

export interface RatioProp {
  ratio: number;
}
