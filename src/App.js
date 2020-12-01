import './css/reset.css';
import './css/App.css';

import React, {useEffect, useState} from 'react';

import AddItem from './components/AddItem';
import PI from './components/PI';
import Export from './components/Export';

function App() {
  const [uID, setUID] = useState(0);
  const [canvasData, setCanvasData] = useState([]);
  const [items, setItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  const canvasRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    
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
  
  useEffect(() => {
    updateInputDisplay();
  }, [
    hiddenItems
  ]);

  function updateInputDisplay() {
    setItems((current) => [...current].filter(item => hiddenItems.indexOf(item.key) === -1));
  }

  return (
    <div className="App">
      <main>
        <section className="mainbar">
          <figure>
            <PI
              canvasData={canvasData}
              canvasRef={canvasRef}
            />
          </figure>
        </section>
        <section className="sidebar">
          <form onSubmit={handleSubmit}>
            <h1>
              <span>π</span>
            </h1>
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
              <Export
                canvasRef={canvasRef}
              />
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
