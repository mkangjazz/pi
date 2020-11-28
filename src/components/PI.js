import setupCanvas from '../js/setupCanvas';

import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

export default function Pi(props) {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(function() {
    const canvas = canvasRef.current;

    if (canvas) {
      setupCanvas(canvas, canvas.parentElement);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (
    <canvas
      className="pi"
      id="pi"
      ref={canvasRef}
      {...props}
    >
    </canvas>
  );
}
