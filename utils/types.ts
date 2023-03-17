/**
 * All shared interfaces live here
 */

/**
 * Icon Param container.
 * Used to create icons through iteration
 * @defaultSrc src of the icon when not selected or hovered
 * @hoveredsrc src of the icon when selected or hovered
 * @linkTo where the link of icon directs to
 */
export interface IconParams {
  defaultSrc: string;
  hoveredsrc: string;
  linkTo: string;
}
