import setupCanvas from '../js/setupCanvas';
import drawPi from '../js/drawPi';

import React, {useEffect, useLayoutEffect} from 'react';

export default function Pi(props) {
  const canvasRef = props.canvasRef;
  
  useLayoutEffect(function() {
    const canvas = canvasRef.current;

    if (canvas) {
      setupCanvas(canvas, canvas.parentElement);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pRect = canvas.parentElement.getBoundingClientRect();

    drawPi(canvas, pRect, props.canvasData, props.imgRef.current);
  }, [
    [props]
  ]);

  return (
    <div className="canvas-wrapper">
      <canvas
        id="pi"
        ref={props.canvasRef}
      >
      </canvas>
    </div>
  );
}
