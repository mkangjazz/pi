export default function drawSegment(canvas, rect) {
  const context = canvas.getContext('2d');
  const radius = 100;

// stuff to draw?
// for each {} in props.canvasData
// draw a slice of pie

// part : total determines what?
// angle? size of slice?

// color/shade of slice? depend on amount?

  context.save();
  
  context.clearRect(0, 0, rect.width, rect.height);
  
  context.beginPath();
  context.moveTo(rect.width / 2, rect.height / 2);
  context.lineTo(rect.width / 2, rect.height / 2 - radius);
  context.arc(rect.width / 2, rect.height / 2, radius, -Math.PI / 2, 1/4 * Math.PI, false);
  context.closePath();
  
  context.fillStyle = '#333333';
  context.fill();
  context.stroke();

  context.restore();
}
