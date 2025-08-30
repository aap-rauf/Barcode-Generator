const dataInput = document.getElementById("dataInput");
const barcodeContainer = document.getElementById("barcode");

// Generate CODE128 Barcode
document.getElementById("genBarcode").addEventListener("click", function () {
  const data = dataInput.value;
  barcodeContainer.innerHTML = "";

  const svg = document.createElement("svg");
  barcodeContainer.appendChild(svg);

  JsBarcode(svg, data, {
    format: "CODE128",
    width: 2,
    height: 90,
    displayValue: false
  });
});

// Generate QR Code
document.getElementById("genQR").addEventListener("click", function () {
  const data = dataInput.value;
  barcodeContainer.innerHTML = "";

  new QRCode(barcodeContainer, {
    text: data,
    width: 150,
    height: 150
  });
});

// Clear
document.getElementById("clear").addEventListener("click", function () {
  barcodeContainer.innerHTML = "";
  dataInput.value = "";
});
