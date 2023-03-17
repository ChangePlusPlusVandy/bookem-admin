import React, { useRef, useEffect } from 'react';
import {
  Background,
  Container,
  CloseButton,
} from '@/styles/popupWindow.styles';
import { PopupWindowProps } from '@/utils/types';

export const PopupWindow = ({ hidePopup, children }: PopupWindowProps) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    //function to detect click outside of element
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          hidePopup();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <Background>
      <Container ref={wrapperRef}>
        <CloseButton onClick={hidePopup}>&#215;</CloseButton>
        {children}
      </Container>
    </Background>
  );
};

export default PopupWindow;
