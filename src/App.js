import './css/reset.css';

import './css/typography.css';
import './css/buttons.css';

import './css/App.css';
import './css/mainbar.css';
import './css/sidebar.css';

import './css/add-item.css';
import './css/form-input.css';
import './css/remove-item.css';
import './css/pi-orities.css';
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
          <h1>π-orities</h1>
          <form onSubmit={handleSubmit}>
            <div className='title'>
              <label>
                <strong>Topic</strong>
                <select className='form-input'>
                  <option>Monthly Budget</option>
                  <option>Other</option>
                  {/* {colorInputs()} */}
                </select>
                <input
                 className='form-input'
                  name="topic"
                  type="text" />
              </label>
            </div>
            <div className="color-picker">
              <label>
                <strong>Flavor</strong>
                <select className='form-input'>
                  <option>Pumpkin</option>
                  <option>Lemon</option>
                  <option>Raspberry</option>
                  {/* {colorInputs()} */}
                </select>
              </label>
            </div>
            <div className='pi-orities'>
              {items.length > 0 ? 
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>π-ority</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => item)}
                    </tbody>
                  </table>
                </>
              : null
              }
              <div className="actions">
                <AddItem 
                  handleSubmit={handleSubmit}
                  processInputData={processInputData}
                  setInputRefs={setInputRefs}
                  setHiddenItems={setHiddenItems}
                  updateInputDisplay={updateInputDisplay}
                  setItems={setItems}
                  setUID={setUID}
                  uID={uID}
                />
                {/* <button
                  className="button make-chart"
                  type="submit"
                >
                  Draw
                </button> */}
              </div>
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
