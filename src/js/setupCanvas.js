export default function setupCanvas(canvas, parent) {
  var dpr = window.devicePixelRatio || 1;
  var context = canvas.getContext('2d');

  var parentRect = parent.getBoundingClientRect();
  
  canvas.width = dpr * parentRect.width;
  canvas.height = dpr * parentRect.height;
  
  return context.scale(dpr, dpr);
}