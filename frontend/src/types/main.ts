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
    id:        string,
    createdAt: Date,
    updatedAt: Date,

    participantIds: string[],
    messageIds: string[],
}

export type ConversationsDatail = {
  id: string, 
  fullName: string,
  profilePic: string,
  lastMsg: string,
}

export type User = {
      id:         string,   
      username:   string,  
      fullName:   string,
      password:   string,
      gender:     string,
      profilePic: string,
      createdAt:  Date,
      updatedAt: Date,
}

//change later
export type UserType = {
  id: number,
  fullName: string,
  profilePic: string,
  emoji?: string,
}

export type MessageType = {
    id: number,
		fromMe: boolean,
		body: string,
    files?: File[] | null,
    images?: File[] | null
}

export type ChatContextType = {
    conversation: MessageType[] | null,
    setConversation: (conversation: MessageType[]) => void
}


export type ConversationState = {
  conversation: MessageType[],
  updateConversation: (newMessage: MessageType) => void,
  setConversation: (newConversation: MessageType[]) => void,
};

export type FilesState = {
  files:  File[],
  images: File[],

  updateFiles: (newFile: File ) => void,
  filteredFile: (fileName: string) => void,
  deleteFiles: () => void,

  updateImages: (newImages: File) => void,
  filteredImages: (imageName: string) => void,
  deleteImages: () => void
};

export type ConversationsState = {
  conversations: ConversationsType[],
  updateConversations: (conversation: ConversationsType) => void,
  setConversations: (newConversation: ConversationsType[]) => void
};

export type UsersState = {
  currentUser: UserType | null,
  users: UserType[],
  openUserList: boolean,
  setUsers: (users: UserType[]) => void,
  updateUsers: (newUser: UserType) => void,
  toggleOpenList: () => void,
  getCurrentUser: () => UserType | null,
  setCurrentUser: (currentUser: UserType | null) => void
}

export interface TextareaProps {
  msgText: string;
  setMsgText: (text: string) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}


export type UploadMenuType = {
  setOpenFileMenu: (uploadFile: boolean) => void,
  // setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
  // setImages: React.Dispatch<React.SetStateAction<File[] | null>>;
}

export type MessagesComponentType = {
  conversation: MessageType[] | null
}