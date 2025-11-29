export function getExecutableScriptPayload() {
  return `
  window.addEventListener("beforeprint", () => {
    const element = document.createElement("h3")
    element.textContent = "Den hemmelige ingrediensen er 1 klype marcssipan!";
    element.id = "printElement";
    
    const oppskrift = document.getElementById("oppskrift")
    oppskrift.appendChild(element);
  })
    
  window.addEventListener("afterprint", () => {
    document.getElementById("printElement").outerHTML = "";
  })
  `;
}
