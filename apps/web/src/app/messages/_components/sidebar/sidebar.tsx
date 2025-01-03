'use client'
import { Contrast, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ContactItem from './item/contactItem';
import GroupItem from './item/groupItem';
import ChannelItem from './item/channelItem';
import WorkItem from './item/workItem';
import ReelStory from './option/ReelStory';
import ProfileSidebar from './profileSidebar';
import axiosInstance from '@/helper/axiosIntance';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// const contacts = [
//   { name: 'Lauri Edmon', status: 'Writing...', time: '12.52', unread: 2, imgSrc: '/icons/android-chrome-192x192.png', category: 'Private' },
//   { name: 'Julian Gruber', status: 'Send audio...', time: '20.25', unread: 2, imgSrc: '/icons/android-chrome-192x192.png', category: 'Private' },
//   { name: 'Karlien Nihen', status: 'Writing...', time: '2.28', unread: 0, imgSrc: '/icons/android-chrome-192x192.png', category: 'Private' },
//   { name: 'Meg Rigden', status: 'Washington D.C.', time: '12.52', unread: 2, imgSrc: '/icons/android-chrome-192x192.png', category: 'Private' },
//   { name: 'Mark Green', status: 'I do not remember anything', time: '05.41', unread: 0, imgSrc: '/icons/android-chrome-192x192.png', category: 'Private' },
// ];

// const groups = [
//   { name: 'Project Team', members: 5, lastMessage: 'New design updates...', time: '14.22', imgSrcs: ['/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png'], category: 'Groups' ,unread: 3},
//   { name: 'Project Team 2', members: 5, lastMessage: 'New design updates...', time: '14.22', imgSrcs: ['/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png', '/icons/android-chrome-192x192.png'], category: 'Groups' ,unread: 3},
// ];

// const channels = [
//   { name: 'General Updates', status: 'Latest company news...', time: '09:30', unread: 5, imgSrc: '/icons/android-chrome-192x192.png', category: 'Channels' },
//   { name: 'Product Launch', status: 'Meeting at 4 PM...', time: '15:00', unread: 0, imgSrc: '/icons/android-chrome-192x192.png', category: 'Channels' },
// ];

// const work = [
//   { name: 'Client Meeting', status: 'Discuss project requirements...', time: '11:00', unread: 1, imgSrc: '/icons/android-chrome-192x192.png', category: 'Work' },
//   { name: 'Code Review', status: 'Review pull requests...', time: '17:00', unread: 3, imgSrc: '/icons/android-chrome-192x192.png', category: 'Work' },
// ];
// const reels = [
//   { name: 'Lauri Edmon', videoSrc: '/videos/reel1.mp4', imgSrc: '/icons/android-chrome-192x192.png' },
//   { name: 'Julian Gruber', videoSrc: '/videos/reel1.mp4', imgSrc: '/icons/android-chrome-192x192.png' },
//   { name: 'Karlien Nihen', videoSrc: '/videos/reel1.mp4', imgSrc: '/icons/android-chrome-192x192.png' },
// ];
const Sidebar = ({className} : {className: any}) => {
  const [activeItem, setActiveItem] = useState('All');
  const [showProfile, setShowProfile] = useState(false);
  const [roomIdList, setRoomIdList] = useState([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<
  { id: number; name: string; email: string; picture: string; createdAt: Date }[]
  >([]);
  const router = useRouter();
  const {profile} = useAuth()
  const handleClick = (item: string) => {
    setActiveItem(item);
  };
  const handleCreateRoomChat = async (anotherId: number) => {
    const response = await axiosInstance.post(`room/create-one-to-one/${anotherId}`)
    // router.push(`/messages/${response.data.id}`);
    router.refresh();
  }
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    if (searchValue.trim() === '') {
      setResults([]);
      return;
    }
    try {
      const response = await axiosInstance.get('/users/search', {
        params: { name: searchValue },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  useEffect(() => {
    const getRoomUser = async () => {
      const responseRoomData = await axiosInstance.get(`room-user/users/rooms`);
      const roomDataList = responseRoomData.data;
      setRoomIdList(roomDataList);
    }
    getRoomUser();
  }, [profile?.id])
  return (
    <>
    <aside className={`min-w-1/4 w-full md:w-1/4 h-screen bg-white shadow-md overflow-y-auto sidebar ${className}`}>
      <div className="flex items-center px-4 py-2 relative">
        <button
          aria-haspopup="true"
          className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200"
          onClick={() => setShowProfile(true)}
        >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="nonzero"
                d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"
              ></path>
            </svg>
        </button>
        
        <div className="flex items-center flex-grow bg-gray-300 rounded-full ml-2 p-1">
          <Search className='w-[20px] h-[20px] ml-2 text-gray-600 me-2'/>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            className="flex-grow bg-transparent outline-none px-2"
          />
        </div>
        {results.length > 0 && (
          <div className="absolute top-[100%] left-0 w-full bg-white rounded-lg shadow-lg mt-1 max-h-[300px] overflow-y-auto z-50">
            {results.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => handleCreateRoomChat(user.id)}
              >
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-700 text-sm font-semibold">
                    <Image 
                      src={user.picture}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </span>
                </div>
                <div className="flex flex-col truncate">
                  <p className="font-medium text-gray-800 truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading Spinner */}
        {/* {isLoading && (
          <div className="absolute top-[100%] left-0 w-full bg-white rounded-lg shadow-lg mt-1 p-4 flex justify-center">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )} */}
      </div>
      {/* <div className="w-full overflow-x-auto flex space-x-4 px-4 py-2">
          {reels.map((reel, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <Image
                src={reel.imgSrc}
                alt={reel.name}
                width={200}
                // height={200}
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                onClick={() => handleClickReel(index)}
              />
              <p className="text-black text-xs">{reel.name}</p>
            </div>
          ))}
        </div> */}
      <div className='flex items-center justify-between px-6 border-b-2 w-auto gap-x-6'>
        {['All', 'Work', 'Private', 'Groups', 'Channels'].map(item => (
          <span 
            key={item}
            onClick={() => handleClick(item)} 
            className={`cursor-pointer flex flex-col ${activeItem === item ? 'border-b-2 border-blue-500' : 'hover:bg-gray-300'}`}
          >
            {item}
            <span className='mt-2'>{" "}</span>
          </span>
        ))}
      </div>
      <ul className="space-y-4 p-2">
        {roomIdList && roomIdList.map((contact, index) => (
             <ContactItem contact={contact} key={index}/>
        ))}
        {/* {JSON.stringify(roomIdList)} */}
        {/* {filteredGroups.map((group, index) => (
            <GroupItem group={group} index={index} key={index}/>
        ))}
        {filteredChannels.map((channel, index) => (
            <ChannelItem channel={channel} index={index} key={index}/>
        ))}
        {filteredWork.map((w, index) => (
            <WorkItem work={w} index={index} key={index}/>
        ))} */}
      </ul>
    </aside>
    {/* {showReel && (
        <ReelStory
          reels={reels}
          currentReelIndex={currentReelIndex}
          setShowReel={setShowReel}
          nextReel={nextReel}
          prevReel={prevReel}
        />
      )} */}
     <div
        className={`transform ease-in-out duration-300 fixed top-0 left-0 h-full ${
          showProfile ? 'translate-x-0 w-full md:w-1/4' : '-translate-x-full'
        }`}
      >
        <ProfileSidebar showProfile={showProfile} setShowProfile={setShowProfile} />
      </div>

    </>
  );
};

export default Sidebar;
