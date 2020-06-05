import React, { useState, useRef } from 'react';

interface CollectionsItemProps {
  img: string,
  alt: string,
  title: string,
  width?: string
}

const CollectionsItem = (props: CollectionsItemProps): JSX.Element => {
  
  const collectionContainer = useRef(null);
  const [width, setWidth] = useState(0);
  
  return (
    <div className="collections-item" ref={collectionContainer}
    onLoad={() => setWidth(collectionContainer.current.clientWidth)}>
      <img className="image"
      src={props.img} 
      alt={props.alt} 
      width={props.width} 
        />
      <h4 className="title" style={{'width': `${(width/2)}px`}}>{props.title}</h4>
    </div>
  )
}

export default CollectionsItem;