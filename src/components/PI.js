import setupCanvas from '../js/setupCanvas';
import drawPi from '../js/drawPi';

import React, {useLayoutEffect} from 'react';

export default function Pi(props) {
  const canvasRef = React.createRef();
  
  useLayoutEffect(function() {
    const canvas = canvasRef.current;

    if (canvas) {
      setupCanvas(canvas, canvas.parentElement);
      
      const pRect = canvas.parentElement.getBoundingClientRect();
    
      if (props.imgRef.current) {
        drawPi(
          canvas,
          pRect,
          props.items.filter(obj => obj.amount > 0),
          props.imgRef.current,
          props.color,
          props.otherTopic !== '' ? props.otherTopic : props.topic
        );        
      }
    }
  });

  return (
    <div className="canvas-wrapper">
      <canvas
        id="pi"
        ref={canvasRef}
      >
      </canvas>
    </div>
  );
}
