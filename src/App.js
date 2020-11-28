import './css/reset.css';
import './css/App.css';

import React, {useState} from 'react';

import AddItem from './components/AddItem';
import Item from './components/Item';
import PI from './components/PI';

function App() {
  const [items, setItem] = useState([
    <Item />
  ]);

  return (
    <div className="App">
      <header>
        <h1>Pi</h1>
      </header>
      <main>
        <section className="sidebar">
          <form>
            <AddItem />
            {items.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
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
