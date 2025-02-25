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

export interface TextareaProps {
  msgText: string;
  setMsgText: (text: string) => void;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}