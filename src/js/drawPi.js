export default function drawPi(canvas, rect, data, img, selectedColor) {
  function drawTitleSplash() {
    const fontSize = radius / 4;
    
    context.save();
    
    context.fillStyle = 'rgb(136, 0, 21)';
    context.fillRect(0, 0, rect.width, rect.height);

    context.fillStyle = '#ffffff';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `${fontSize}px sans-serif`; // base off of window?
    context.fillText("Slices", rect.width / 2, rect.height / 2);
    context.restore();    
  }
  
  function drawLegend() {
    function drawMessage(text, y, color) {
      context.save();
      context.fillStyle = '#ffffff';
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

      drawMessage(k, i * closeEnoughFontHeight + closeEnoughFontHeight, sortedColorArray[i]);
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
  
  function sortData(data) {
    return data.sort(function(objB, objA) {
      let valueA;
      let valueB;

      for (let key in objA) {
        if (objA.hasOwnProperty(key)) {
          valueA = objA[key];
        }
      }
      
      for (let key in objB) {
        if (objB.hasOwnProperty(key)) {
          valueB = objB[key];
        }
      }
      
      return valueA - valueB;
    }); 
  }
    
  function degreesToRadians(deg) {
    return deg * Math.PI / 180;
  }
  
  function endAngleRadians(r) {
    const radians360 = degreesToRadians(360);
    const angle = r * radians360;
    
    return angle;
  }
  
  function drawSegment(name, amount, color) {
    const ratio = amount / total;
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
  let total = 1;
  
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
    drawSegment('', 1, `rgb(${selectedColor}`);

    total = (function() {
      var arr = [];

      for (let i = 0; i < data.length; i++) {
        for (var key in data[i]) {
          if (data[i].hasOwnProperty(key)) {
            arr.push(data[i][key]);
          }
        }
      }

      if (arr.length > 0) {
        return arr.reduce((accum, curr) => Number(accum) + Number(curr));        
      }
    }());

    sortedData = sortData(data);

    for (let i = 0; i < sortedData.length; i++) {
      let k;
      let v;

      for (var key in sortedData[i]) {
        if (sortedData[i].hasOwnProperty(key)) {
          k = key;
          v = sortedData[i][key];
        }
      }

      const color = sortedColorArray[i];

      drawSegment(k, v, color);
    }

    drawLegend();
  }

  const dataURL = canvas.toDataURL("image/png");

  img.src = dataURL;
}
