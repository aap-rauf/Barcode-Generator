const barcode = document.getElementById("barcode");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear");

generateBtn.addEventListener("click", () => {
  const value = document.getElementById("value").value;
  const format = document.getElementById("format").value;
  const displayValue = document.getElementById("displayValue").checked;

  if (!value) {
    alert("Please enter a value!");
    return;
  }

  try {
    JsBarcode(barcode, value, {
      format: format,
      width: 2,
      height: 90,
      displayValue: false
    });
  } catch (err) {
    alert("Error generating barcode: " + err.message);
  }
});

clearBtn.addEventListener("click", () => {
  barcode.innerHTML = "";
});
