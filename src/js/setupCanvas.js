export default function setupCanvas(canvas, parent) {
  var dpr = window.devicePixelRatio || 1;
  var ctx = canvas.getContext('2d');

  var parentRect = parent.getBoundingClientRect();
  
  canvas.width = dpr * parentRect.width;
  canvas.height = dpr * parentRect.height;
  
  return ctx.scale(dpr, dpr);
}