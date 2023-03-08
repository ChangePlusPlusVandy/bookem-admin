import React, { useRef, useEffect } from 'react';
import {
  Background,
  Container,
  CloseButton,
} from '@/styles/popupWindow.styles';

type Props = {
  hidePopup: () => void;
  children: JSX.Element;
};

export const PopupWindow = ({ hidePopup, children }: Props) => {
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
