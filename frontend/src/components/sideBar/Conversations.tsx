import useConversations from '../../hooks/useConversations';
import { ConversationsType } from '../../types/main';
import Conversation from './Conversation';

function Conversations({query}: {query: string}) {
  const { filteredConversations } = useConversations();
  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-4 pt-4">
        {filteredConversations(query).map(( conversation: ConversationsType) => <Conversation  key={conversation.id} data={conversation} />)}
    </div>
  )
}

export default Conversations
