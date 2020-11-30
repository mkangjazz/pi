import setupCanvas from '../js/setupCanvas';
import drawPi from '../js/drawPi';

import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

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

    drawPi(canvas, pRect, props.canvasData);
  }, [
    [props]
  ]);

  return (
    <canvas
      className="pi"
      id="pi"
      ref={props.canvasRef}
    >
    </canvas>
  );
}
