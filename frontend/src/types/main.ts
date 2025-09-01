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


//data types

export type ConversationsType = {
  id: string,
  participants: UserType[],
  lastMessage: MessageType | null,
  messages?: MessageType[] | null
}


export type ConversationsDatail = {
  id: string, 
  fullName: string,
  profilePic: string,
  lastMsg: string,
}

export type MessageType = {
  id: string,
  body: string,
  senderId: string,
  conversationId: string,
  files?: string[] | File[],
  images?: string[] | File[],

  createdAt: string,
}

export type UserType = {
      id:         string,   
      username:   string,  
      fullName:   string,
      password:   string,
      email:      string,
      gender:     string,
      profilePic: string,
      converationsIds?: string[],
      createdAt?:  string,
      updatedAt?: string,
}

// export type MessageType = {
//     id: number,
// 		fromMe: boolean,
// 		body: string,
//     files?: File[] | null,
//     images?: File[] | null
// }

//context
export type ChatContextType = {
    conversation: MessageType[] | null,
    setConversation: (conversation: MessageType[]) => void
}

//states
export type ConversationState = {
  conversation: MessageType[] | null,
  updateConversation: (newMessage: MessageType) => void,
  setConversation: (newConversation: MessageType[] | null) => void,
};

export type MessagesTypeStore = {
  messages: MessageType[] | null,
  files: File[],
  images: File[],
  updateMessages: (newMessage: MessageType) => void,
  setMessages: (newConversation: MessageType[] | null) => void,
  updateFiles: (newFile: File) => void,
  filteredFile: (fileName: string) => void,
  deleteFiles: () => void,
  updateImages: (newImage: File) => void,
  filteredImages: (imageName: string) => void,
  deleteImages: () => void,
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
  activeConversationId: string,
  currentUserConvList: string[],
  updateConversations: (conversation: ConversationsType) => void,
  setConversations: (newConversation: ConversationsType[]) => void,
  setActiveConversation: (newActiveConversation: string) => void,
  setCurrentUserConvList: (convList: string[]) => void,
  updateCurrentUserConvList: (newConversation: string) => void
};

export type UsersState = {
  users: UserType[],
  openUserList: boolean,
  setUsers: (users: UserType[]) => void,
  updateUsers: (newUser: UserType) => void,
  toggleOpenList: () => void,
 
}

export type AuthState = {
  currentUser: UserType | null,
  expireAt: Date | null,
  setCurrentUser: (currentUser: UserType | null) => void
  setExpireAt: (time: Date | null) => void
}

//props
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

//auth
export type LoginFormType = {
  username:string,
  password: string
}

export type SignupFormType = {
  username: string,
  fullname: string,
  password: string,
  confirm: string,
  email: string,
  profilePic: File | string,
  gender: string
}