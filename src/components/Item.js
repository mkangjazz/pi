import React, {useEffect} from 'react';

export default function Item(props) {
  let nameRef = null;
  let amountRef = null;
  
  const setNameRef = (elem) => {
    nameRef = elem;
    
    if (nameRef) {
      nameRef.focus();
    }
  }

  const setAmountRef = (elem) => {
    amountRef = elem;
  }

  function handleRemoveClick(e) {
    props.setHiddenItems((curr) => [...curr, `idx-${props.idx}`]);
  }

  useEffect(() => {
    props.setInputRefs((prevState) => [
      ...prevState,
      nameRef,
      amountRef,
    ]);
  }, [
    // props,
    handleRemoveClick,
  ]);

  return (
    <tr 
      className="item"
      data-idx={`idx-${props.idx}`}
    >
      <td>
        <button
          className="remove-item"
          onClick={handleRemoveClick}
          type="button"
        >
          <span>Remove Item</span>
        </button>
      </td>
      <td>
        <input
          name={`name_${props.idx}`}
          ref={setNameRef}
          type="text"
        />
      </td>
      <td>
        <input
          name={`amount_${props.idx}`}
          ref={setAmountRef}
          type="number"
        />
      </td>
    </tr>
  );
}
