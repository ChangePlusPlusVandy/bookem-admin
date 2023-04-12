import React from 'react';
import Image from 'next/image';
import {
  ContactBox,
  ContactHeader,
  BigIconBox,
  IconBox,
  IconText,
} from '@/styles/components/Event/contact.styles';
import {
  EVENT_CONTACT_ICON_WIDTH,
  EVENT_CONTACT_ICON_HEIGHT,
} from '@/utils/constants';

/**
 * Contain Contact info
 */
const Contact = ({ phone, email }: { phone: string; email: string }) => (
  <ContactBox>
    <ContactHeader>Contact</ContactHeader>
    <BigIconBox>
      {/* Phone */}
      <IconBox>
        <Image
          src={'/event/phone.png'}
          alt=""
          width={EVENT_CONTACT_ICON_WIDTH}
          height={EVENT_CONTACT_ICON_HEIGHT}
        />
        <IconText>{phone}</IconText>
      </IconBox>

      {/* Email */}
      <IconBox>
        <Image
          src={'/event/mail.png'}
          alt=""
          width={EVENT_CONTACT_ICON_WIDTH}
          height={EVENT_CONTACT_ICON_HEIGHT}
        />
        <IconText>
          <a href="mailto: '+email+'">{email}</a>
        </IconText>
      </IconBox>
    </BigIconBox>
  </ContactBox>
);

export default Contact;
