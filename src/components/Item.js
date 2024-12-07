import React from 'react';

const Item = ({item, onAdd }) => {
  if (!item || !item.image || !item.title || !item.description || !item.price) {
    console.warn("Некоректний товар:", item); 
    return <div>Товар недоступний</div>;
  }

  return (
    <div className="item"> 
      <img 
        src={item.image || 'default-image.jpg'} 
        alt={item.title} 
      />
      <h2 style={{ color: "#D1D1D6" }}>{item.title}</h2>
      <p style={{ color: "#D1D1D6" }}>{item.description}</p>
      <p style={{ color: "#A3BE00" }}>₴{item.price}</p>
      <div className="add-to-cart" onClick={() => onAdd(item)}>
        +
      </div>
    </div>
  );
};

export default Item;
