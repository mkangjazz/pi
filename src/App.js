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

import topics from './data/topics';
import flavors from './data/flavors';

import React, { useEffect, useState } from 'react';

import Select from './components/Select';
import AddItem from './components/AddItem';
import PI from './components/PI';

export default function App() {
  const [topic, setTopic] = useState('');
  const [otherTopic, setOtherTopic] = useState('');

  const [uID, setUID] = useState(0);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [inputRefs, setInputRefs] = useState([]);
  const [canvasData, setCanvasData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(topics[0].value);
  const [items, setItems] = useState([]);

  let topicRef = null;

  const setTopicRef = (elem) => {
    topicRef = elem;
  }

  let otherTopicRef = null;

  const setOtherTopicRef = (elem) => {
    otherTopicRef = elem;
  }

  let selectColorRef = null;

  const setSelectColorRef = (elem) => {
    selectColorRef = elem;
  }

  let formRef = null;

  const setFormRef = (elem) => {
    formRef = elem;
  }

  // refactor these to callback, too?
  const canvasRef = React.createRef();
  const imgRef = React.createRef();

  function processInputData() {
    if (selectColorRef) {
      setSelectedColor(selectColorRef.value);
    }

    if (topicRef) {
      setTopic(topicRef.value);

      if (
        topicRef.value === 'Custom' &&
        otherTopicRef
      ) {
        setOtherTopic(otherTopicRef.value);
      } else {
        setOtherTopic('');
      }  
    }

    function getInputValueByName(name) {
      let v;

      for (let j = 0; j < inputRefs.length; j++) {
        if (inputRefs[j].getAttribute('name') === name) {
          v = inputRefs[j].value;
        }
      }

      return v;
    }

    const data = (function () {
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

  function handleTopicChange(e) {
    processInputData();
  }

  function handleColorChange(e) {
    processInputData();
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
          otherTopic={otherTopic}
          topic={topic}
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
          <form
            ref={setFormRef}
            onSubmit={handleSubmit}
          >
            <ol>
              <li>
                <Select 
                  label='Choose a Topic'
                  options={topics}
                  onchange={handleTopicChange}
                  reference={setTopicRef}
                />
                {topic === 'Custom'
                  ? <input
                      autoFocus
                      className='form-input'
                      name="topic"
                      onChange={processInputData}
                      ref={setOtherTopicRef}
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
                  reference={setSelectColorRef}
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
                        {items.map((item, index) => item)}
                      </tbody>
                    </table>
                    : null
                  }
                </div>
              </li>
            </ol>
            <div className="actions">
              <AddItem
                selectedColor={selectedColor}
                processInputData={processInputData}
                setInputRefs={setInputRefs}
                setHiddenItems={setHiddenItems}
                updateInputDisplay={updateInputDisplay}
                setItems={setItems}
                setUID={setUID}
                uID={uID}
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
