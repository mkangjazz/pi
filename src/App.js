import './css/reset.css';
import './css/App.css';

import React, {useState} from 'react';

import AddItem from './components/AddItem';
import Item from './components/Item';
import PI from './components/PI';

function App() {
  const [uID, setUID] = useState(0);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  function addItem() {
    setItems((current) => [
      ...current,
      <Item key={`idx-${uID}`} idx={uID} removeItem={removeItem} />
    ]);

    setUID(uID + 1);
  }

  function removeItem(idx) {
    setItems((current) => [...current].filter(item => item.props.idx !== idx));

//    const currentItems = [...items];
//    const remainingItems = [...current].filter(item => console.log(item.props.idx !== idx));
//console.log(remainingItems);
////    setItems(remainingItems);
  }

  return (
    <div className="App">
      <main>
        <section className="sidebar">
          <form>
            <header>
              <h1>Pi</h1>
              <AddItem
                addItem={addItem}
                count={count}
              />
            </header>
            <ul>
              {items.map((item, index) => item)}
            </ul>
          </form>
        </section>
        <section className="mainbar">
          <figure>
            <PI />
          </figure>
        </section>
      </main>
    </div>
  );
}

export default App;
