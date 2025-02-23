import {conversationa} from '../../dummy/dummyData';
import Conversation from './Conversation';
function Conversations() {
  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-4 pt-4">
        {conversationa.map(( conversation:any) => <Conversation data={conversation} />)}
    </div>
  )
}

export default Conversations
