import React from 'react';
import Avatar from '../../../assets/avatar.svg';

interface ContactListProps {
  contact: {
    fullName: string;
    role: string;
    time: string;
  };
  clickHandler: (id: string, contact: any) => void;
  conversationId: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contact,
  conversationId,
  clickHandler,
}) => {
  console.log('contact', contact);

  return (
    <div
      //   onClick={clickHandler}
      className="flex justify-between items-center border-b p-2"
    >
      <div
        className="flex justify-center items-center"
        onClick={() => clickHandler(conversationId, contact)}
      >
        <img src={Avatar} alt="image" width={50} height={50} />
        <div className="ml-4">
          <h1 className="text-[10px] font-bold">{contact.fullName}</h1>
          <h1>{contact.role}</h1>
        </div>
      </div>
      <div className="text-[10px] font-bold">{contact.time}</div>
    </div>
  );
};

export default ContactList;
