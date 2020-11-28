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
    <li 
      className="item"
      data-idx={`idx-${props.idx}`}
    >
      <fieldset>
        <label>
          <p>
            Item Name
          </p>
          <input
            onChange= {handleItemNameChange}
            type="text"
            value={itemName}
          />
        </label>
        <label>
          <p>
            Number
          </p>
          <input
            onChange= {handleItemNumberChange}
            type="number"
            value={itemNumber}
          />
        </label>
        <button
          className="remove-item"
          onClick={ () => props.removeItem(props.idx) }
          type="button"
        >
          <span>Remove Item</span>
        </button>
      </fieldset>
    </li>
  );
}
