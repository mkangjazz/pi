import prepArray from '../js/prepArray';

export default function AddItem(props) {
  function handleAddItem() {
    const newItems = [...props.items];

    newItems.push({
      amount: 0,
      name: '',
    });

    props.setItems(
      prepArray(newItems)
    );
  }

  const rgb = props.color ? props.color : '0, 0, 0';

  return (
    <button
      className={`button add-item `}
      style={{
        backgroundColor: `rgb(${rgb})`
      }}
      id="add-item"
      onClick={handleAddItem}
      type="button"
    >
      +
    </button>
  );
}
