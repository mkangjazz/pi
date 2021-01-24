export default function Select(props) {
  return (
    <label>
      <strong>{props.label}</strong>
      <select
        className='form-input'
        onChange={props.onchange}
        ref={props.reference}
      >
        {props.options.map((obj, index) => {
          return (
            <option 
              key={`${obj.value}-${index}`}
              value={obj.value}
            >
              {obj.name}
            </option>
          );
        })}
      </select>
    </label>
  );
}
