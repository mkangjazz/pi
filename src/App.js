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
  const [items, setItems] = useState([
    <Item key={`idx-${uID}`} idx={uID} removeItem={removeItem} />
  ]);
//  const [canvasData, setCanvasData] = useState('');

  const canvasRef = React.createRef();

  function removeItem(idx) {
    setItems((current) => [...current].filter(item => item.props.idx !== idx));
  }

  return (
    <div className="App">
      <main>
        <section className="sidebar">
          <form>
            <header>
              <h1>Pi</h1>
              <AddItem 
                removeItem={removeItem}
                setItems={setItems}
                setUID={setUID}
                uID={uID}
              />
              <Export 
                canvasRef={canvasRef}
              />
            </header>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? items.map((item, index) => item) : <NoItems />}
              </tbody>
            </table>
          </form>
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
