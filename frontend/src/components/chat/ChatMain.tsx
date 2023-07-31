import { useState, useEffect } from 'react';
import Avatar from '../../assets/avatar.svg';
import ContactList from './ContactList/ContactList';
import axios from 'axios';
import io from 'socket.io-client';

interface IContact {
  name: string;
  message: string;
  time: string;
}

const ChatMain: React.FC = () => {
  const [click, setClick] = useState<boolean>(false);
  interface usermapData {
    fullName: string;
    email: string;
  }
  // Define the type for the data stored in localStorage
  interface UserData {
    // Add the properties of your user data here
    name: string;
    email: string;
    username: string;
    _id: string;
    // ... other properties
  }

  const initialUserData: UserData = {
    // Default values if the data is not present in localStorage
    name: '',
    email: '',
    username: '',
    _id: '',
    // ... other properties
  };

  interface storedatatype {
    conversationid: string;
    reciverid: string;
  }

  const [userdetail, setuserdetail] = useState<UserData>(
    // Parse the data from localStorage or use the initialUserData
    JSON.parse(localStorage.getItem('data') || JSON.stringify(initialUserData))
  );

  const [conversationuser, setconversationuser] = useState([]);
  const [allmsg, setmsg] = useState([]);
  //store send msg
  const [message, setmessage] = useState('');
  const [storedata, setstoredata] = useState<any>([]);
  const [peopledata, setpeopledata] = useState([]);
  const [socket, setSocket] = useState<any>(null);
  // Dummy data for contact list

  // socket io connect

  useEffect(() => {
    console.log('hello world');

    // Connect to the Socket.IO server
    setSocket(io('http://localhost:8080'));
    // Replace this URL with your Socket.IO server URL
  }, []);

  useEffect(() => {
    socket?.emit('addUser', userdetail?._id);
    socket?.on('getUsers', (user: any) => {
      console.log('---', user);
    });
  }, [socket]);

  const clickHandler = async (id: String, contact: any) => {
    try {
      const data = await axios.get(`http://localhost:5000/c/api/message/${id}`);
      console.log('message user', data?.data);
      setmsg(data?.data);
    } catch (error) {
      console.log(error);
    }
    // console.log('converstion id', id, 'reciver id', contact?.reciverId);
    setstoredata({ conversationid: id, reciverid: contact?.receiverId });

    setClick(!click);
  };

  const conversationCreatemsgSend = async (id: String, contact: any) => {
    console.log('store data', storedata);
    try {
      const data = await axios.get(
        `http://localhost:5000/c/api/message/${id}?senderId=${userdetail?._id}&&receiverId=${contact?.receiverId}`
      );
      console.log('conversationCreatemsgSend', data?.data, 'contact', contact);
      setmsg(data?.data);
    } catch (error) {
      console.log(error);
    }
    console.log('converstion id', id, 'reciver id', contact?.reciverId);
    setstoredata({ conversationid: id, reciverid: contact?.receiverId });
  };

  console.log('store data', storedata);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/c/api/conversation/${userdetail?._id}`
        );
        console.log('conversation data', data?.data?.conversationId);
        setconversationuser(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const peopleLoaddata = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/c/api/users/${userdetail?._id}`
        );
        console.log('people', data?.data);
        setpeopledata(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
    peopleLoaddata();
  }, []);

  const sendMessage = async () => {
    console.log('store data', storedata);
    const url = 'http://localhost:5000/c/api/message';
    const data = {
      conversationId: storedata?.conversationid,
      senderId: userdetail?._id,
      message: message,
      receiverId: storedata?.reciverid,
    };

    try {
      const response = await axios.post(url, data);
      console.log('Response:', response.data);
      // Handle the response data here as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or failed requests here
    }
  };

  return (
    <div>
      <div className="w-screen flex">
        {/* left part */}
        <div className="w-[25%] h-screen bg-secondary ">
          <div className="flex items-center my-8 mx-14">
            <div>
              <img
                src={Avatar}
                alt="image"
                width={75}
                height={75}
                className="border border-primary p-[2px] rounded-full"
              />
            </div>
            <div className="ml-8">
              <h3 className="text-2xl">{userdetail.username}</h3>
              <p className="text-lg font-light">My Account</p>
            </div>
          </div>
          <hr />
          <div className="mx-14 mt-10">
            <div className="text-primary text-lg">Messages</div>
            <div>
              {conversationuser.length > 0 ? (
                conversationuser.map(({ conversationId, user }) => {
                  return (
                    <ContactList
                      key={conversationId}
                      contact={user}
                      conversationId={conversationId}
                      clickHandler={clickHandler}
                    ></ContactList>
                  );
                })
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Conversations
                </div>
              )}
            </div>
          </div>
        </div>
        {/* middle part */}
        <div className="w-[50%] h-screen bg-white">
          <div className="flex items-center p-2 shadow-lg shadow-black border rounded-md">
            <div>
              <img
                src={Avatar}
                alt="image"
                width={50}
                height={50}
                className="border border-primary p-[2px] rounded-full"
              />
            </div>
            {conversationuser.length > 0 &&
              conversationuser.map(({ user }: { user: usermapData }) => {
                return (
                  <div className="ml-2">
                    <h1 className="text-[14px]">{user?.fullName}</h1>
                    <h1 className="text-[12px] text-green-600">{user?.email}</h1>
                  </div>
                );
              })}
          </div>

          {/* communication message */}
          <div className="mt-8 px-4 max-h-[80%] overflow-y-auto">
            {allmsg.length > 0 &&
              allmsg?.map(({ message, user: { id, email, fullName } }) => {
                return (
                  <>
                    <div className="flex items-center mb-2">
                      {/* <img
                        src={Avatar}
                        alt="image"
                        width={50}
                        height={50}
                        className="mb-6 mr-2"
                      /> */}
                      <div
                        className={`max-w-[40%]  rounded-b-xl p-4 mb-6  ${
                          id === userdetail?._id
                            ? 'bg-primary text-black rounded-tl-xl ml-auto'
                            : 'bg-secondary rounded-tr-xl'
                        }`}
                      >
                        {message}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>

          {/* message writting bar build a message send bar using tailwind*/}

          {
            <div className="flex items-center border-t border-gray-300 p-2">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                className="w-[90%] border border-gray-300 rounded-md p-2"
              />
              <button
                onClick={() => sendMessage()}
                className="ml-2 p-2 bg-primary rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.707 3.293a1 1 0 010 1.414L6.414 9H13a1 1 0 110 2H6.414l4.293 4.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          }
        </div>
        {/* Right part */}
        <div className="w-[25%] h-screen bg-gray-300 px-8 py-16  shadow-gray-700 border-x rounded-md">
          <div className="text-primary text-lg">People</div>

          <div>
            {peopledata.length > 0 ? (
              peopledata.map(({ userId, user }: any) => {
                return (
                  <div
                    onClick={() => conversationCreatemsgSend('new', user)}
                    className="flex justify-between items-center border-b p-2"
                  >
                    <div className="flex justify-center items-center">
                      <img src={Avatar} alt="image" width={50} height={50} />
                      <div className="ml-4">
                        <h1 className="text-[10px] font-bold">{user?.fullName}</h1>
                        <h1>{user?.role}</h1>
                      </div>
                    </div>
                    {/* <div className="text-[10px] font-bold">{contact.time}</div> */}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMain;
