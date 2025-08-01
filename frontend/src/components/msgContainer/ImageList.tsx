import { useEffect, useState } from "react";


function ImageList({images}: {images: File[] | string[]}) {
  const [imagesList, setImagesList] = useState<string[]>([]);

  //todo:*change this */
  useEffect(() => {
     if (typeof images[0] === 'string') {
      setImagesList(images as string[]);
    } else {
      const imgUrls = (images as File[]).map(image => URL.createObjectURL(image));
      setImagesList(imgUrls);
    }
    
  },[images])

  return (
    <div className="w-full">
      <ul className="w-ful">
        {imagesList.map((image, ind) => <li key={`imges-${ind}`}> 
            <img src={image} alt={image} className=""/>
        </li>)}
      </ul>
    </div>
  )
}

export default ImageList;
