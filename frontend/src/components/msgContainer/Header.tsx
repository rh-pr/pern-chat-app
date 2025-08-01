import { useContext } from 'react';
import { Video, Phone } from 'lucide-react';
import { DesignContext } from '../../context/DesignContext';
import useConversations from '../../hooks/chat/useConversations';
function Header() {
  const design = useContext(DesignContext);
  
  const { getRecipent } = useConversations();
  const activeConv = getRecipent();

  if (!activeConv) return ;
  // const [onlineStatus, setOnlineStatus] = useState(true);

  return (
    <div className="w-full h-16 flex items-center justify-between p-2 " style={{backgroundColor: design?.colors.buttonColor}}>
      <div className='flex gap-4'>
        < p className=' rounded-full shadow-lg p-1 shadow-white/20'>
            <img src={activeConv.profilePic} alt="user" className='w-12 rounded-full'/>
          </p>
        <div className='flex flex-col justify-center'>
          <h1 className='font-bold' style={{color: design?.colors.msgHeader}}>{activeConv.fullName}</h1>
          {/* <p className='font-medium' style={{color: design?.colors.textColor}}>{onlineStatus ? 'online' : 'offline'}</p> */}
        </div>
      </div>
      <div className='flex gap-4 pr-4 font-bold' style={{color: design?.colors.msgHeader}}>
        <Video />
        <Phone />
      </div>
    </div>
  )
}

export default Header
