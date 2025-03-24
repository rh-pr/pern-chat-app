

function ImagesContainer({images}: {images: File[]}) {
   const imgUrl = 'https://images.unsplash.com/photo-1742816165627-6bcf56e747b1?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
 
  return (
    <div className="w-full">
      <ul className="w-ful">
        {images.map(image => <li key={image.name}> 
            <img src={imgUrl} alt={image.name} className=""/>
        </li>)}
      </ul>
    </div>
  )
}

export default ImagesContainer
