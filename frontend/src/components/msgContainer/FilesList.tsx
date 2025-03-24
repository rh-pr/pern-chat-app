
function FilesList({files}: {files: File[]} ) {
  return (
    <div>
        <ul >
            {files && files.map(file => <li className="pb-2 underline " key={file.name}>{file.name}</li>)}
        </ul>
    </div>
  )
}

export default FilesList
