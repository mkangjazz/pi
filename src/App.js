import './css/reset.css';
import './css/App.css';
import './css/buttons.css';
import './css/items.css';
import './css/pi.css';

import React, {useEffect, useState} from 'react';

import AddItem from './components/AddItem';
import Item from './components/Item';
import PI from './components/PI';

function App() {
  const defaultColor = '255, 117, 24';

  const [uID, setUID] = useState(1);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  const [canvasData, setCanvasData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [items, setItems] = useState([
    <Item
      autofocus={true}
      key={`idx-0`}
      idx={`0`}
      updateInputDisplay={updateInputDisplay}
      setInputRefs={setInputRefs}
      setHiddenItems={setHiddenItems}
    />
  ]);
  const canvasRef = React.createRef();
  const imgRef = React.createRef();

  const colorInputs = () => {
    const colors = [
      {
        name: 'pumpkin',
        rgb: defaultColor,
      },
      {
        name: 'raspberry',
        rgb: '227, 11, 93',
      },
    ];

    const arr = colors.map((el, i) => (
      <label key={el.name}>
        <input
          checked={el.rgb === selectedColor ? true : false}
          name='[]'
          onChange={handleRadioChange}
          type='radio'
          value={el.rgb}
      />
        {el.name}
      </label>
    ));

    return arr;
  };

  function handleRadioChange(e) {
   setSelectedColor(e.target.value);
  }

  function processInputData() {
    function getInputValueByName(name) {
      let v;

      for (let j = 0; j < inputRefs.length; j++) {
        if (inputRefs[j].getAttribute('name') === name) {
          v = inputRefs[j].value;
        }
      }

      return v;
    }

    const data = (function() {
      const arr = [];

      for (let i = 0; i < uID; i++) {
        if (hiddenItems.indexOf(`idx-${i}`) !== -1) {
          continue;
        }

        const obj = {};
        const targetName = `name_${i}`;
        const targetAmount = `amount_${i}`;
        const key = getInputValueByName(targetName);
        const value = getInputValueByName(targetAmount);

        if (key && value) {
          obj[key] = value;

          arr.push(obj);
        }
      }

      return arr;
    }());

    setCanvasData(data);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    processInputData();
  }

  function updateInputDisplay() {
    setItems((current) => [...current].filter(item => hiddenItems.indexOf(item.key) === -1));
    processInputData();
  }

  useEffect(() => {
    updateInputDisplay();
  }, [
    hiddenItems,
  ]);

  return (
    <div className="App">
      <main>
        <PI
          selectedColor={selectedColor}
          canvasData={canvasData}
          canvasRef={canvasRef}
          imgRef={imgRef}
        />
        <section className="mainbar">
          <h1>Slices</h1>
          <div className="figure-wrapper">
            <figure>
              <img 
                alt="Canvas data renders here"
                id="imgPi"
                src=""
                ref={imgRef}
              />
            </figure>
          </div>
        </section>
        <section className="sidebar">
          <form onSubmit={handleSubmit}>
            <div className="color-picker">
              {colorInputs()}
            </div>
            {items.length > 0 ? 
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => item)}
                </tbody>
              </table>
            : null
            }
            <div className="actions">
              <AddItem 
                processInputData={processInputData}
                setInputRefs={setInputRefs}
                setHiddenItems={setHiddenItems}
                updateInputDisplay={updateInputDisplay}
                setItems={setItems}
                setUID={setUID}
                uID={uID}
              />
              <button
                className="button make-chart"
                type="submit"
              >
                Draw
              </button>
            </div>
          </form>
          <footer>
            <p><small>&copy;{new Date().getFullYear()} Mike Kang</small></p>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
