import React from 'react';
import Item from './Item';

export default function AddItem(props) {
  function handleAddItem(e) {
    props.setItems((current) => [
      ...current,
      <Item
        key={`idx-${props.uID}`}
        idx={`${props.uID}`}
        updateInputDisplay={props.updateInputDisplay}
        setInputRefs={props.setInputRefs}
        setHiddenItems={props.setHiddenItems}
        processInputData={props.processInputData}
      />
    ]);

    props.processInputData();

    props.setUID(props.uID + 1);
  }

  return (
    <button
      className={`button add-item rgb-${props.selectedColor.replace(/\s/g, '').replace(/,/g, '-')}`}
      id="add-item"
      onClick={handleAddItem}
      type="button"
    >
      ++
    </button>
  );
}
