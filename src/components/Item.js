export default function Item() {
  // when i click Remove item
  // it should remove this item (from the state)

  return (
    <fieldset className="item">
      <label>
        <p>
          Item Name
        </p>
        <input
          type="text"
        />
      </label>
      <label>
        <p>
          Number
        </p>
        <input
          type="number"
        />
      </label>
      <button
        className="remove-item"
        type="button"
      >
        <span>Remove Item</span>
      </button>
    </fieldset>

  );
}
