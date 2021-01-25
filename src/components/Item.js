import prepArray from '../js/prepArray';

export default function Item(props) {
  function handleNameChange(e) {
    const idx = e.target.getAttribute('data-idx');
    const newItems = [...props.items];

    newItems.map(obj => {
      const o = obj;

      if (o.idx === idx) {
        o.name = e.target.value;
      }

      return o;
    });

    // props.setItems(prepArray(newItems));
  }

  function handleAmountChange(e) {
    const idx = e.target.getAttribute('data-idx');
    const newItems = [...props.items];

    newItems.map(obj => {
      const o = obj;

      if (o.idx === idx) {
        o.amount = Number(e.target.value);
      }

      return o;
    });

    // props.setItems(prepArray(newItems));
  }

  function handleRemoveClick(e) {
    const idx = e.target.getAttribute('data-idx');
    const newItems = [...props.items].filter(obj => {
      return obj.idx !== idx;
    });

    props.setItems(prepArray(newItems));
  }

  return (
    <tr 
      className="item"
    >
      <td>
        <button
          className="remove-item"
          onClick={handleRemoveClick}
          data-idx={props.idx}
          type="button"
        >
          <span>Remove Item</span>
        </button>
      </td>
      <td>
        <input
          autoFocus
          className='form-input'
          data-idx={props.idx}
          defaultValue={props.name}
          onChange={handleNameChange}
          type="text"
        />
      </td>
      <td>
        <input
          className='form-input'
          data-idx={props.idx}
          defaultValue={props.amount}
          onChange={handleAmountChange}
          type="number"
        />
      </td>
    </tr>
  );
}
