import React, { useEffect, useState } from 'react'
import TimestampToDate from '@/components/TimestampToDate';
import { BiSolidLockAlt } from 'react-icons/bi';
import Link from 'next/link';
import { BsThreeDots } from "react-icons/bs";
// btn interaction 
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { RiChat3Line } from "react-icons/ri";
import { MdBookmarkBorder } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import OptionsButton from '@/components/OptionsButton';

// tipos del post
interface Post {
  _id: string;
  userID: string;
  description: string;
  files: Object[];
  created: number;
}

// tipos del usuario
interface UserData {
  _id: string;
  dateJoined: number;
  profileImage: string;
  fullname: string;
  username: string;
  followers: string[];
  following: string[];
  blocked: string[];
  privateAccount: boolean;
}

const Post: React.FC<Post> = ({ _id, userID, description, files, created }) => {
  // estado para almacenar los datos del usuario (será un objeto)
  const [user, setUser] = useState<UserData | null>(null);

  // obtener los datos del usuario
  useEffect(() => {
    fetch(`/api/users/${userID}`)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setUser(data))
      .catch(err => console.log(err))
  }, [])


  return (
    <>
      {user && <div className='border bg-white mb-2 w-full'>
        {/*  */}
        <div className='w-full p-2 flex justify-between items-start gap-2'>
          <div className='flex justify-start items-center gap-2'>
            <Link href={`/${user.username}`}>
              <img className='w-11 h-11 rounded-full hover:brightness-90 duration-100 object-cover' src="https://th.bing.com/th/id/R.e26f3f0bb2dbe74cc7e61cba9fa9b64f?rik=g2D4kN%2f9Oi4yBA&pid=ImgRaw&r=0" alt={`${user.username} profile image`} />
            </Link>
            <div className='flex justify-center items-start flex-col'>
              <div className='flex justify-center items-center gap-1'>
                <span className='flex justify-center items-center gap-0.5'>
                  <Link href={`/${user.username}`} className='font-medium hover:underline'>{user.fullname}</Link>
                  <span>{user.privateAccount && <BiSolidLockAlt />}</span>
                </span>
                <span>&#8226;</span>
                <span className='text-slate-600 text-sm'><Time timestamp={created} /></span>
              </div>
              <span className='text-slate-600 text-sm'>@{user.username}</span>
            </div>
          </div>
          {/* options button */}
          <OptionsButton>
            <ul className='bg-white'>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
              <li className='whitespace-nowrap duration-100 p-2 hover:bg-gray-200 active:bg-gray-300'>Lorem, ipsum dolor. Lorem, ipsum.</li>
            </ul>
          </OptionsButton>
        </div>
        {/*  */}
        <div className='w-full'>
          {/* description */}
          <div className='p-2 w-full'>
            <TextWithLinks text={description} />
          </div>
          {/* files */}
          <PostFiles files={files} />
        </div>
        {/*  */}
        <div className='flex justify-between items-center gap-2 p-2 w-full'>
          <InteractionButton icon={<BiLike />} activeIcon={<BiSolidLike />} count={["656aac3d6955c6229fc41a7c", "656aac316955c6229fc41a7a"]} />
          <Link href={`/post/${_id}`}>
            <InteractionButton icon={<RiChat3Line />} />
          </Link>
          <InteractionButton icon={<MdBookmarkBorder />} activeIcon={<MdOutlineBookmark />} count={["656aac3d6955c6229fc41a7c", "656aac316955c6229fc41a7a"]} />
        </div>
      </div>}
    </>
  )
}

export default Post


// post files
const PostFiles = ({ files }: { files: Object[] }) => {
  return (
    <div className="w-full">
      {files.map((el, i) => (
        <div>

        </div>
      ))}
    </div>
  )
}


// post buttons
interface InteractionButtonProps {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  count?: string[]; // list of users id 
}

const InteractionButton: React.FC<InteractionButtonProps> = ({ icon, activeIcon, count }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center gap-1">
      <button className="w-10 h-10 hover:bg-gray-200 active:bg-gray-300 text-xl rounded-full duration-200 flex justify-center items-center">
        {activeIcon ? (isActive ? activeIcon : icon) : icon}
      </button>
      {!!count && <span className='text-xs text-slate-800 font-medium'>{count?.length}</span>}
    </div>
  );
};



// time
interface TimeProps {
  timestamp: number;
}

const Time: React.FC<TimeProps> = ({ timestamp }) => {
  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 1) {
      return 'just now';
    }

    const timeUnits: Record<string, number> = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const unit in timeUnits) {
      const interval = Math.floor(seconds / timeUnits[unit]);
      if (interval >= 1) {
        return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return `${Math.floor(seconds)} seconds ago`;
  };

  return (
    <span className='tooltip' data-tooltip={`${new Date(timestamp).toLocaleDateString()} • ${new Date(timestamp).toLocaleTimeString()}`}>
      {getTimeAgo(timestamp)}
    </span>
  );
};


// truncate text description
interface TextWithLinksProps {
  text: string;
}

const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
  const words = text.split(/(\s+)/); // Split on whitespace and preserve whitespaces

  const createLink = (word: string) => {
    if (word.startsWith('#')) {
      return (
        <a
          href={`hashtags/?q=${word.split("#")[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {word}
        </a>
      );
    } else if (word.startsWith('@')) {
      const username = word.slice(1).replace(/[^a-zA-Z0-9_]/g, ''); // Remove non-alphanumeric characters

      const punctuation = word.match(/[\W_]*$/)?.[0] || '';
      return (
        <>
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {`@${username}`}
          </a>
          {punctuation}
        </>
      );
    } else {
      return word;
    }
  };

  return (
    <span className='w-full break-all overflow-hidden'>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          {createLink(word)}
        </React.Fragment>
      ))}
    </span>
  );
};