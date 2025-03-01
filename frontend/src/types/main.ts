export type Colors = {
  textColor: string,
  bgColor: string,
  headerColor: string,
  buttonColor: string,
  inputColor: string,
  msgHeader?: string
}

export type DesignContextType = {
  thema: boolean,
  setThema: (thema: boolean) => void,
  colors: Colors
  setColors: (colors: Colors) => void
}

export type ConversationsType = {
    id: number,
		fullName: string,
		profilePic: string,
		emoji?: string,
}

export type MessageType = {
    id: number,
		fromMe: boolean,
		body: string,
}

export type ChatContextType = {
    conversation: MessageType[] | null,
    setConversation: (conversation: MessageType[]) => void
}

export interface TextareaProps {
  msgText: string;
  setMsgText: (text: string) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}
