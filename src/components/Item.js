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

  function handleInputChange(e) {
    console.log('handleInputChange', props);
    // props.processInputData();
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
          autoFocus
          className='form-input'
          name={`name_${props.idx}`}
          onChange={handleInputChange}
          ref={setNameRef}
          type="text"
        />
      </td>
      <td>
        <input
          className='form-input'
          name={`amount_${props.idx}`}
          onChange={handleInputChange}
          ref={setAmountRef}
          type="number"
        />
      </td>
    </tr>
  );
}
