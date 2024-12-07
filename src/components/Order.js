import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Order(props) {
  const { item } = props;

  return (
    <div className="item">
      <img 
        src={item.image || 'default-image.jpg'} 
        alt={item.title} 
      />
      <h2 style={{ color: "#D1D1D6" }}>{item.title}</h2>
      <p style={{ color: "#A3BE00" }}>₴{item.price}</p>
      <FaTrash
        className="delete-icon"
        onClick={() => props.onDelete(item.id)}
      />
    </div>
  );
}
