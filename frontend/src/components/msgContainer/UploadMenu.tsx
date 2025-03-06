import { useContext, useEffect, useRef } from "react"
import { DesignContext } from "../../context/DesignContext"


function UploadMenu ({setUploadFile}: {setUploadFile: (uploadFile: boolean) => void}) {

    const design = useContext(DesignContext);
    const uploadedRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('label')) {
              setUploadFile(true);
              return;
            }
        
            if (uploadedRef.current && !uploadedRef.current.contains(target)) {
                setUploadFile(false);
            }  
        } 

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.addEventListener('mousedown', handleClickOutside);
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
          <input type="file" name="file" id="file" className="hidden" />
        </label>
        <label className="label w-[200px] cursor-pointer p-2 " htmlFor="foto">
           Upload Foto
          <input type="file" name="foto" id="foto" className="hidden" />
        </label>

    </div>
  )
};

export default UploadMenu
