import './css/reset.css';
import './css/typography.css';
import './css/buttons.css';
import './css/App.css';
import './css/mainbar.css';
import './css/sidebar.css';
import './css/footer.css';
import './css/form.css';
import './css/add-item.css';
import './css/form-input.css';
import './css/remove-item.css';
import './css/pi-orities.css';
import './css/pi.css';
import './css/refresh.css';

import topics from './data/topics';
import flavors from './data/flavors';
// import monthlyBudget from './data/templates/monthlyBudget';

import refresh from './img/refresh.png';

import prepArray from './js/prepArray';

import React, {useState } from 'react';

import Select from './components/Select';
import Item from './components/Item';
import AddItem from './components/AddItem';
import PI from './components/PI';

export default function App() { 
  const defaultItems = prepArray(
    [
      {
        amount: 20,
        name: 'x',
      },
      {
        amount: 15,
        name: 'y',
      },
      {
        amount: 30,
        name: 'z',
      },
    ]
  );

  const [topic, setTopic] = useState(topics[0].value);
  const [otherTopic, setOtherTopic] = useState('');
  const [items, setItems] = useState(defaultItems);
  const [color, setColor] = useState(flavors[0].value);  

  const imgRef = React.createRef();

  function handleOtherTopicChange(e) {
    setOtherTopic(e.target.value);
  }

  function handleTopicChange(e) {
    setTopic(e.target.value);

    if (e.target.value !== 'Custom') {
      setOtherTopic('');
    }
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setItems(curr => prepArray([...curr]));
  }

  return (
    <div className="App">
      <main>
        <section className="sidebar">
          <form
            onSubmit={handleSubmit}
          >
            <h1>π-orities</h1>
            <ol>
              <li>
                <Select 
                  label='Choose a Topic'
                  options={topics}
                  onchange={handleTopicChange}
                />
                {topic === 'Custom'
                  ? <input
                      autoFocus
                      className='form-input'
                      name="topic"
                      onChange={handleOtherTopicChange}
                      type="text"
                    />
                  : null
                }
              </li>
              <li>
                <Select 
                  label='Pick a Flavor'
                  options={flavors}
                  onchange={handleColorChange}
                />
              </li>
              <li>
                <div className='pi-orities'>
                  <label>
                    <strong>Add π-orities</strong>
                  </label>
                  {items.length > 0 ?
                    <table>
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th>π-ority</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => {
                          return (
                            <Item
                              amount={item.amount}
                              idx={item.idx}
                              items={items}
                              key={`${item.idx}`}
                              name={item.name}
                              setItems={setItems}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                    : null
                  }
                </div>
                <div className="actions">
                  <AddItem
                    items={items}
                    color={color}
                    setItems={setItems}
                  />
                  <button
                    className='button refresh'
                    style={{
                      backgroundImage: `url(${refresh})`
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </li>
            </ol>
          </form>
          <footer>
            <p><small>&copy;{new Date().getFullYear()} Mike Kang</small></p>
          </footer>
        </section>
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
        <PI
          color={color}
          items={items}
          imgRef={imgRef}
          otherTopic={otherTopic}
          topic={topic}
        />
      </main>
    </div>
  );
}
