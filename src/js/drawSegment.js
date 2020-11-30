export default function drawSegment(canvas, rect, color, radius) {
  const context = canvas.getContext('2d');

  context.save();
  
  context.clearRect(0, 0, rect.width, rect.height);
  
  context.beginPath();
  context.moveTo(rect.width / 2, rect.height / 2);
  context.lineTo(rect.width / 2, rect.height / 2 - radius);
  context.arc(rect.width / 2, rect.height / 2, radius, -Math.PI / 2, 1/4 * Math.PI, false);
  context.closePath();
  
  context.fillStyle = color;
  context.fill();
  context.stroke();

  context.restore();
}
