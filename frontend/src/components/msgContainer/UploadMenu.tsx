import React from "react";
import { useContext, useEffect, useRef, useState } from "react"
import { DesignContext } from "../../context/DesignContext"

import useMessages from '../../hooks/chat/useMessages';
import { UploadMenuType } from "../../types/main";
import useMessagesStore from "../../stores/useMessagesStore";

  function UploadMenu ({setOpenFileMenu }:  UploadMenuType ) {


    const design = useContext(DesignContext);
    const uploadedRef = useRef<HTMLDivElement | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // const { updateFiles, updateImages } = useMessages();
    const updateFiles = useMessagesStore(state => state.updateFiles);
    const updateImages = useMessagesStore(state => state.updateImages);


    const handleImage = (e:  React.ChangeEvent<HTMLInputElement>) => {
      const selectedImage = e.target.files?.[0];
      if(!selectedImage) return;
      if (selectedImage.type === "image/png" ||
          selectedImage.type === "image/jpg"  || 
          selectedImage.type === "image/jpeg" ||
          selectedImage.type === "image/webp") {
            updateImages(selectedImage);
            setOpenFileMenu(false);
            return;
          }
      setErrorMessage('png, jpg, jpeg, webp');
      setOpenFileMenu(true);
      return;

    }

    const handleFile = (e:  React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if(!selectedFile) return;
      if (selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          selectedFile.type === "application/pdf" ) {
            updateFiles(selectedFile);
            setOpenFileMenu(false);
            return;
          }
      setErrorMessage('doc, pdf');
      setOpenFileMenu(true);
    }

    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('label')) {
              setOpenFileMenu(true);
              return;
            }
        
            if (uploadedRef.current && !uploadedRef.current.contains(target)) {
              setOpenFileMenu(false);
            }  
        } 

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

  return (
    <div 
        ref={uploadedRef}
        className="flex absolut left-86 bottom-16 flex-col w-fit border-x-3  border-t-3  font-bold rounded-t-lg"
        style={{
            borderColor: design?.colors.buttonColor,
            backgroundColor: design?.colors.inputColor,
            color: design?.colors.bgColor,
            boxShadow: `0px 0px 20px 6px  ${design?.colors.buttonColor}`}}
            >        
        <label className="label w-[200px] cursor-pointer p-2 mb-1 " htmlFor="file">
           Upload File
          <input type="file" name="file" id="file" className="hidden"  onChange={(e) => handleFile(e)}/>
        </label>
        <label className="label w-[200px] cursor-pointer p-2 " htmlFor="foto">
           Upload Foto
          <input type="file" name="foto" id="foto" className="hidden" onChange={(e) => handleImage(e)}/>
        </label>

        {errorMessage && <p className="font-[8px] text-red-600 font-medium px-2 ">Supported types: <br />{errorMessage}</p>} 

    </div>
  )
};

export default React.memo(UploadMenu);
