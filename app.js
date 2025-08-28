// Barcode generator using JsBarcode
const el = id => document.getElementById(id);
const dataInput = el('dataInput');
const formatSel = el('format');
const widthInput = el('width');
const heightInput = el('height');
const displayValue = el('displayValue');
const barcodeSvg = el('barcode');
const generateBtn = el('generate');
const downloadPngBtn = el('downloadPng');
const downloadSvgBtn = el('downloadSvg');
const clearBtn = el('clear');

function validateInput(data, format) {
  const onlyDigits = /^\d+$/;
  if (format === 'EAN13') {
    if (!onlyDigits.test(data) || data.length !== 13) return 'EAN13 requires exactly 13 digits.';
  }
  if (format === 'UPC') {
    if (!onlyDigits.test(data) || data.length !== 12) return 'UPC requires exactly 12 digits.';
  }
  if (format === 'CODE39') {
    const allowed = /^[A-Z0-9 \-\.\$\/\+%]+$/;
    if (!allowed.test(data.toUpperCase())) return 'CODE39 supports only A–Z, 0–9 and - . $ / + % and space.';
  }
  if (!data) return 'Please enter data to encode.';
  return null;
}

function render() {
  const data = dataInput.value.trim();
  const format = formatSel.value;
  const error = validateInput(data, format);
  if (error) {
    alert(error);
    return;
  }
  const options = {
    format,
    width: Math.max(1, parseInt(widthInput.value) || 2),
    height: Math.max(10, parseInt(heightInput.value) || 60),
    displayValue: displayValue.checked,
    margin: 10,
    fontSize: 18
  };
  // Clear previous svg content
  while (barcodeSvg.firstChild) barcodeSvg.removeChild(barcodeSvg.firstChild);
  try {
    JsBarcode(barcodeSvg, data, options);
  } catch (e) {
    alert('Failed to generate barcode: ' + (e.message || e));
  }
}

generateBtn.addEventListener('click', render);
clearBtn.addEventListener('click', () => {
  dataInput.value = '';
  while (barcodeSvg.firstChild) barcodeSvg.removeChild(barcodeSvg.firstChild);
});

downloadSvgBtn.addEventListener('click', () => {
  if (!barcodeSvg.innerHTML.trim()) { alert('Generate a barcode first.'); return; }
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(barcodeSvg);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'barcode.svg';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

downloadPngBtn.addEventListener('click', () => {
  if (!barcodeSvg.innerHTML.trim()) { alert('Generate a barcode first.'); return; }
  // Serialize SVG
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(barcodeSvg);
  // Add XML prolog for consistent rendering
  const svgWithNS = '<?xml version="1.0" standalone="no"?>\n' + svgStr;
  const img = new Image();
  const svgBlob = new Blob([svgWithNS], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    // Increase resolution for clearer PNG: multiply dimensions by devicePixelRatio
    const ratio = window.devicePixelRatio || 1;
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    canvas.style.width = img.width + 'px';
    canvas.style.height = img.height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio,0,0,ratio,0,0);
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'barcode.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    }, 'image/png');
  };
  img.onerror = (e) => {
    URL.revokeObjectURL(url);
    alert('Error rendering PNG: ' + e);
  };
  img.src = url;
});