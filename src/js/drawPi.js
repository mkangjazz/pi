import imgSrc from '../img/cover-art-final.gif';

import degreesToRadians from './degreesToRadians';

export default function drawPi(canvas, rect, data, img, selectedColor, topic) {
  function drawTitleSplash() {
    context.save();

    context.clearRect(0,0, rect.width, rect.height);

    img.setAttribute('src', imgSrc);

    context.restore();
  }

  function drawTopic() {
    context.save();

    const fontFamily = window.getComputedStyle(document.body, null).getPropertyValue('font-family');
    const fontSize = 20;

    context.textAlign = "center";
    context.font = `bold ${fontSize}px ${fontFamily}`; // base off of window?

    context.fillStyle = '#333333';
    context.fillText(topic, rect.width / 2, fontSize * 2);

    context.restore();
  }

  function drawLegend() {
    function drawMessage(text, y, color) {
      context.save();
      context.fillStyle = '#333333';
      context.fillText(text, textWidth, y);
      context.fillStyle = color;
      context.fillText(text, textWidth, y);

      context.restore();
    }
    
    const fontSize = radius / 15;

    context.save();

    context.textAlign = "left";
    context.textBaseline = "top";
    context.font = `${fontSize}px sans-serif`; // base off of window?

    const textWidth = context.measureText('M').width;
    const closeEnoughFontHeight = 1.125 * textWidth;
    
    for (let i = 0; i < sortedData.length; i++) {
      let k;
      
      for (var key in sortedData[i]) {
        if (sortedData[i].hasOwnProperty(key)) {
          k = key;
        }
      }

      drawMessage(k, 40 + i * closeEnoughFontHeight + closeEnoughFontHeight, sortedColorArray[i]);
    }
    
    context.restore();
  }

  function calculateRadius() {
    let radius;
    
    if (rect.width > rect.height) {
      radius = (3/4) * rect.height;
    } else {
      radius = (3/4) * rect.width;
    }
    
    radius = radius / 2;

    return radius;
  }
    
  function endAngleRadians(r) {
    const radians360 = degreesToRadians(360);
    const angle = r * radians360;
    
    return angle;
  }
  
  function drawSegment(name, ratio, color) {
    const endAngle = startAngle - endAngleRadians(ratio);
    
    context.save();
    
    context.beginPath();
    context.moveTo(rect.width / 2, rect.height / 2);
    context.arc(rect.width / 2, rect.height / 2, radius, startAngle, endAngle, true);

    context.fillStyle = color;
    context.fill();
    context.restore();

    // side effects and additional mutations
    startAngle = endAngle;
  }
  
  const context = canvas.getContext('2d');
  const radius = calculateRadius();
  
  let sortedData;
  let startAngle = -Math.PI / 2;

  const sortedColorArray = (function() {
    const arr = [];

    for (let i = 0; i < data.length; i++) {
      const a = (i / data.length);
      const str = `rgba(255, 255, 255, ${a})`;

      arr.push(str);
    }
    
    return arr;
  }());

  context.clearRect(0, 0, rect.width, rect.height);

  if (data.length < 1) {
    drawTitleSplash();
  } else {
    const total = data.reduce((accum, curr) => Number(accum) + Number(curr.amount), 0);

    drawSegment('', total / total, `rgb(${selectedColor}`);

    for (let i = 0; i < data.length; i += 1) {
      const ratio = data[i].amount / total;
 
      drawSegment(data[i].name, ratio, sortedColorArray[i]);
    }

    drawTopic();
    // drawLegend();

    const dataURL = canvas.toDataURL("image/png");

    img.setAttribute('src', dataURL);
  }
}
