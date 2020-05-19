import React from 'react';

interface CollectionsItemProps {
  img: string,
  alt: string,
  title: string,
  width?: string
}

// const getImage = getImage

const CollectionsItem = (props: CollectionsItemProps): JSX.Element => {
  
  let imageEl = React.useRef(null);

  document.addEventListener('DOMContentLoaded', (event) => {
    let text = document.querySelectorAll<HTMLElement>('.collections-item .title');
    text.forEach(el => el.style.width = (imageEl.current.width/2) + 'px')
  })

  
  return (
  <div className="collections-item">
    <img className="image" ref={imageEl}
     src={props.img} 
     alt={props.alt} 
     width={props.width} 
      />
    <h4 className="title">{props.title}</h4>
  </div>
)}

export default CollectionsItem;