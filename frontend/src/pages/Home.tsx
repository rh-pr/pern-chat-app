import Starfield from 'react-starfield';


import MessageContainer from '../components/msgContainer/MessagesContainer';
import Sidebar from '../components/sideBar/SideBar';
import { useContext } from 'react';
import { DesignContext } from '../context/DesignContext';
import useListenMessages from '../hooks/chat/useListenMessaages';

const Home = () => {
  const design = useContext(DesignContext);
  useListenMessages();
	return (
		<div className='landscape:mt-8 flex h-[88vh] md:h-[80vh] w-full md:max-w-11/12 md md:h-10/12 rounded-lg overflow-hidden bg-transparent backdrop-filter backdrop-blur-lg'
         style={{boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'}}
         >
      <Starfield 
            starCount={1000}
            starColor={design?.thema ? [4, 63, 3] : [2, 129, 0]} 
            speedFactor={0}
            backgroundColor="rgba(112, 108, 108, 0)"/>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;