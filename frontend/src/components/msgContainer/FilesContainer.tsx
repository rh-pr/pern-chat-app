import { useContext } from "react";
import React from "react";
import { DesignContext } from "../../context/DesignContext";
import useConversation from "../../hooks/useConversation";
import { X } from "lucide-react";


function FilesContainer({ files, type }: { files: File[]; type: string }) {

    const { removeFile } = useConversation();

    const design = useContext(DesignContext);

  return (
    <div className={`${files.length > 0 ? 'flex' : 'hidden'} flex-wrap gap-2 pb-2 bg-white/30`}  >
      {files.map((file: File) => (
        <div key={file.name} className="flex items-center gap-2 p-2 underline" >
          {type === "files" ? (
            <p className="text-sm font-medium p-2 rounded-lg"
            style={{backgroundColor: design?.colors.buttonColor, 
                    color: design?.colors.msgHeader
            }}>{file.name}</p>
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          )}
          <X className="cursor-pointer text-red-500 hover:text-red-700 self-start"  onClick={() => removeFile(file.name, type)}/>
        </div>
      ))}
    </div>
  );
}

export default React.memo(FilesContainer);
