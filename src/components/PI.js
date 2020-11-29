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

    const centerX = parentRect.width / 2;
    const centerY = parentRect.height / 2;

    context.clearRect(0, 0, parentRect.width, parentRect.height);

    context.fillStyle = '#333333';
//    context.textAlign = "center";
//    context.textBaseline = "middle";
//    context.font = '50px sans-serif';
//    context.fillText('PI Life', centerX, centerY);

    // need to define colors, too, maybe analogous shades?
    // based on number of shapes?

    const radius = 100;

    function drawSegment() {
      context.save();
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(centerX, centerY - radius);
      context.arc(centerX, centerY, radius, -Math.PI / 2, 1/4 * Math.PI, false);
      context.closePath();
      context.fill();
      context.stroke();
      context.restore();      
    }
    
    drawSegment();
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
