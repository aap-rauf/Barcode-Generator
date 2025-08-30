document.getElementById("generate").addEventListener("click", function () {
  const data = document.getElementById("dataInput").value;
  const format = document.getElementById("format").value;
  const barcodeContainer = document.getElementById("barcode");

  // Clear previous code
  barcodeContainer.innerHTML = "";

  if (format === "QRCODE") {
    // Generate QR Code
    new QRCode(barcodeContainer, {
      text: data,
      width: 150,
      height: 150
    });
  } else {
    // Generate Barcode
    const svg = document.createElement("svg");
    barcodeContainer.appendChild(svg);

    JsBarcode(svg, data, {
      format: format,
      width: 2,
      height: 90,
      displayValue: false
    });
  }
});

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("barcode").innerHTML = "";
  document.getElementById("dataInput").value = "";
});
