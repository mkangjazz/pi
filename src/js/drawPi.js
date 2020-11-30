export default function drawPi(canvas, rect, data) {
  function drawLegend() {
    function drawMessage(text, y, color) {
      context.save();
      context.fillStyle = color;
      context.fillText(text, textWidth, y);
      context.restore();
    }

    context.save();

    context.textAlign = "left";
    context.textBaseline = "top";
    context.font = '16px sans-serif'; // base off of window?

    const textWidth = context.measureText('M').width;
    const closeEnoughFontHeight = 1.125 * textWidth;
    const height = sortedData.length * closeEnoughFontHeight;
    
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

  function getLineWidth() {
    const base = 10;
    
    return base * data.length;
  }

  function calculateRadius() {
    let radius;
    
    if (rect.width > rect.height) {
      radius = rect.height;
    } else {
      radius = rect.width;
    }
    
    radius = radius / 2 - lineWidth;

    return radius;
  }
  
  function sortData(data) {
    return data.sort(function(objB, objA) {
      let valueA;
      let valueB;

      for (var key in objA) {
        if (objA.hasOwnProperty(key)) {
          valueA = objA[key];
        }
      }
      
      for (var key in objB) {
        if (objB.hasOwnProperty(key)) {
          valueB = objB[key];
        }
      }
      
      return valueA - valueB;
    }); 
  }
  
  function radiansToDegrees(rad) {
    return rad * 180 / Math.PI;
  }
  
  function degreesToRadians(deg) {
    return deg * Math.PI / 180;
  }
  
  function endAngleRadians(r) {
    const radians360 = degreesToRadians(360);
    const angle = r * radians360;
    
    return angle;
  }
  
  function drawSegment(name, amount, int) {
    const context = canvas.getContext('2d');
    const ratio = amount / total;
    const color = sortedColorArray[int];
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
  
  const lineWidth = getLineWidth();
  const context = canvas.getContext('2d');
  const radius = calculateRadius();
  
  let sortedData;
  let startAngle = -Math.PI / 2;
  let total;
  
  const sortedColorArray = (function(){
    const arr = [];

    for (let i = 1; i < data.length + 1; i++) {
      const rgba = [
        50,
        50,
        50,
      ];
      
      rgba.push(i / data.length);

      const str = `rgba(${rgba.join(',')})`;
      
      arr.push(str);
    }
    
    arr.reverse();
    
    return arr;
  }());
  
  context.clearRect(0, 0, rect.width, rect.height);

  if (data.length < 1) {
    console.log('nada');
//    data = [
//      {
//        "No Slices Found": 1
//      }
//    ];
  } else {
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

      drawSegment(k, v, i);
    }

    drawLegend();
  }
}
