import React, {useState} from 'react';
import Item from './Item';

export default function AddItem(props) {
  return (
    <button
      className="add-item"
      id="add-item"
      onClick={props.addItem}
      type="button"
    >
      Add Item ({props.uID})
    </button>
  );
}
