import setupCanvas from '../js/setupCanvas';
import drawSegment from '../js/drawSegment';
import drawEmptyMessage from '../js/drawEmptyMessage';

import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

export default function Pi(props) {
  const canvasRef = props.canvasRef;

  console.log('canvas props', props.canvasData);
  
  useLayoutEffect(function() {
    const canvas = canvasRef.current;

    if (canvas) {
      setupCanvas(canvas, canvas.parentElement);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pRect = canvas.parentElement.getBoundingClientRect();

    props.canvasData.length > 0 ? drawSegment(canvas, pRect) : drawEmptyMessage(canvas, pRect);
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
