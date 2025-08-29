import React from "react";
import { useContext, useEffect, useRef, useState } from "react"
import { DesignContext } from "../../context/DesignContext"

import { UploadMenuType } from "../../types/main";
import useMessages from '../../hooks/chat/useMessages';

  function UploadMenu ({setOpenFileMenu }:  UploadMenuType ) {

    const design = useContext(DesignContext);
    const uploadedRef = useRef<HTMLDivElement | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {handleFile, handleImage} = useMessages();
  
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
          <input type="file" name="file" id="file" className="hidden"  onChange={(e) => handleFile(e, setErrorMessage)}/>
        </label>
        <label className="label w-[200px] cursor-pointer p-2 " htmlFor="foto">
           Upload Foto
          <input type="file" name="foto" id="foto" className="hidden" onChange={(e) => handleImage(e, setErrorMessage)}/>
        </label>

        {errorMessage && <p className="font-[8px] text-red-600 font-medium px-2 ">Supported types: <br />{errorMessage}</p>} 

    </div>
  )
};

export default React.memo(UploadMenu);
