import React from 'react';
import Item from './Item';

export default function AddItem(props) {
  function addItem(e) {
    props.setItems((current) => [
      ...current,
      <Item
        key={`idx-${props.uID}`}
        idx={`${props.uID}`}
        updateInputDisplay={props.updateInputDisplay}
        setInputRefs={props.setInputRefs}
        setHiddenItems={props.setHiddenItems}
      />
    ]);

    props.handleSubmit(e);

    props.setUID(props.uID + 1);
  }

  return (
    <button
      className="button add-item"
      id="add-item"
      onClick={addItem}
      type="button"
    >
      Add π-ority
    </button>
  );
}
