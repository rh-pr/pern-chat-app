import {generateFileName} from '../../utils/generateFileName';

function FilesList({files}: {files: File[] | string[]} ) {
  
  return (
    <div>
        <ul >
            {files && files.map((file, ind) => typeof file === 'string' ? 
            <li className="pb-2 underline " key={`file-${ind}`} onClick={() => window.open(`${file}?fl_attachment`, "_blank", "noopener,noreferrer")}>{generateFileName(file).name}</li> :
            <li className="pb-2 underline " key={file.name} onClick={() => window.open(URL.createObjectURL(file), "_blank", "noopener,noreferrer")}>{file.name}</li>)}
        </ul>
    </div>
  )
}

export default FilesList
