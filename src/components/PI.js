import setupCanvas from '../js/setupCanvas';

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
    const context = canvas.getContext('2d');
    const parentRect = canvas.parentElement.getBoundingClientRect();

    context.fillStyle = '#333333';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = '50px sans-serif';
    context.fillText('PI Life', parentRect.width / 2, parentRect.height / 2);
  }, []);

  return (
    <canvas
      className="pi"
      id="pi"
      ref={props.canvasRef}
    >
    </canvas>
  );
}
