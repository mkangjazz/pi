import downArrow from '../img/down-arrow.png';

export default function Select(props) {
  return (
    <label>
      <strong>{props.label}</strong>
      <select
        style={{ 
          backgroundImage:`url(${downArrow})`
        }}
        className='form-input'
        onChange={props.onchange}
        ref={props.reference}
      >
        {props.options.map((obj, index) => {
          if (Array.isArray(obj.value)) {
            return (
              <optgroup 
                key={`optgroup-${obj.name}`}
                label={obj.name}
              >
                {obj.value.map((option, i) => {
                  return(
                    <option
                      key={`option-${option.value}`}
                      value={option.value}
                    >
                      {option.name}
                    </option>
                  );
                })}
              </optgroup>
            );
          } else {
            return (
              <option
              key={`option-${obj.value}`}
                value={obj.value}
              >
                {obj.name}
              </option>
            );
          }
        })}
      </select>
    </label>
  );
}
