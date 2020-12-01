import React from 'react';

export default function Export(props) {
  function exportImage(e) {
    e.preventDefault();

    if (props.canvasRef) {
      const dataURL = props.canvasRef.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
      
      if (dataURL) {
        const alt = "Pie chart from canvas";
        const width = props.canvasRef.current.width / 2;
        const height = props.canvasRef.current.height / 2;
        const popup = window.open('about:blank', 'image from canvas');
        const str = `<img src='${dataURL}' alt=${alt} width=${width} height=${height} />`;

        popup.document.write(str);
      }
    }
  }

  return (
    <button
      className="button export-as-image"
      onClick={exportImage}
//      disabled={canvasData ? false : true}
      type="button"
    >
      Export
    </button>
  );
}
