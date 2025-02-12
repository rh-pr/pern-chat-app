import { Colors } from "../types/main";

export const getThemaColors = (thema: boolean):Colors => {
    return thema
    ? {
        textColor: '#747575',
        bgColor: '#051206',
        headerColor: '#614318',
        buttonColor: '#0b2b09',
        inputColor: '#4e5c4f',
      }
    : {
        textColor: '#f1f1f1',
        bgColor: '#1A2902',
        headerColor: '#EED3B1',
        buttonColor: '#47663B',
        inputColor: '#E8ECD7',
      };
}