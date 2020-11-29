import './css/reset.css';
import './css/App.css';

import React, {useEffect, useState} from 'react';

import AddItem from './components/AddItem';
import NoItems from './components/NoItems';
import Item from './components/Item';
import PI from './components/PI';
import Export from './components/Export';

function App() {
  const [uID, setUID] = useState(0);
  const [count, setCount] = useState(1);
  const [canvasData, setCanvasData] = useState([]);
  const [items, setItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  const canvasRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    
    // how can we remove the items from inputRefs
    // if the x has been clicked?
    // set a state on the component?

//    const arr = inputRefs.filter((input) => (console.log(input)));
//    console.log(arr);
    updateInputDisplay();
////    const obj = inputRefs.map((input) => ({
////      [input.name]: input.value,
////    }));
//
//    setCanvasData(obj);
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
        <section className="sidebar">
          <form onSubmit={handleSubmit}>
            <h1>
              <span>Pi</span>
            </h1>
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? items.map((item, index) => item) : <NoItems />}
              </tbody>
            </table>
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
        <section className="mainbar">
          <figure>
            <PI
              canvasRef={canvasRef}
            />
          </figure>
        </section>
      </main>
    </div>
  );
}

export default App;
