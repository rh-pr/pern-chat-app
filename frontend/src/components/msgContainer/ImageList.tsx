import { useEffect, useState } from "react";


function ImageList({images}: {images: File[]}) {
  const [imagesList, setImagesList] = useState<string[]>([]);

  /*change this */
  useEffect(() => {
    const imgUrls = images.map(image => URL.createObjectURL(image));
    setImagesList(imgUrls);
  },[images])

  return (
    <div className="w-full">
      <ul className="w-ful">
        {imagesList.map(image => <li key={image}> 
            <img src={image} alt={image} className=""/>
        </li>)}
      </ul>
    </div>
  )
}

export default ImageList;
