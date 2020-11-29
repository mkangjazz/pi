import React, {useState} from 'react';

export default function Item(props) {
  const [itemName, setItemName] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  
  function handleItemNameChange(e){
    e.preventDefault();
    
    setItemName(e.target.value);
  }

  function handleItemNumberChange(e){
    e.preventDefault();

    setItemNumber(e.target.value);
  }

  return (
    <tr 
      className="item"
      data-idx={`idx-${props.idx}`}
    >
      <td>
          <input
            onChange= {handleItemNameChange}
            type="text"
            value={itemName}
          />
      </td>
      <td>
        <input
          onChange= {handleItemNumberChange}
          type="number"
          value={itemNumber}
        />
      </td>
      <td>
        <button
          className="remove-item"
          onClick={ () => props.removeItem(props.idx) }
          type="button"
        >
          <span>Remove Item</span>
        </button>
      </td>
    </tr>
  );
}
