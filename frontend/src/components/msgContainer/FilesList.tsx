
function FilesList({files}: {files: File[] | string[]} ) {
  return (
    <div>
        <ul >
            {files && files.map((file, ind) => typeof file === 'string' ? 
            <li className="pb-2 underline " key={`file-${ind}`}>{file}</li> :
            <li className="pb-2 underline " key={file.name}>{file.name}</li>)}
        </ul>
    </div>
  )
}

export default FilesList
