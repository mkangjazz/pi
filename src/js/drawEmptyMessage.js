export default function drawEmptyMessage(canvas, rect) {
  const context = canvas.getContext('2d');

  context.save();
  context.clearRect(0, 0, rect.width, rect.height);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = '30px sans-serif';
  context.fillText('Add a Slice to make a Pie', rect.width / 2, rect.height / 2);
  context.restore();
}
