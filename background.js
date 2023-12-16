chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

//quita emojis
const darFormato = (str) => {
  return str
    .replace(
      /[\u2700-\u27BF\u2B50\u274C\u1F36\u2620\u1F48\uFE0F\u00A0\uE000-\uF8FF\uD83C\uDC00-\uDFFF\uD83D\uDC00-\uDFFF\u2011-\u26FF\uD83E\uDD10-\uDDFF]/g,
      ""
    )
    .trim()
    .toLowerCase();
};
//borra todo a partir de '/' cararcter enviado por parametro
const quitarSlash = (str, caracter) => {
  const partes = str.split(caracter);
  const resultado = partes[0].trim().toLowerCase();
  return resultado;
};

function obtenerNombre() {
  return quitarSlash(
    darFormato(document.querySelector("div._3W2ap").textContent),
    "/"
  );
}

const whatsapp = "https://web.whatsapp.com";
const agentes = "https://agentes.casino365online.net";

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(whatsapp) || tab.url.startsWith(agentes)) {
    // Obtengo estado del on o off
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // el proximo estado es el contrario papurri
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // actualiza eso
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      /*
      console.log("si ta prendido lo apagamo");
*/
    } else if (nextState === "OFF") {
      /*
      console.log("si ta apagado se activa");
*/
    }
  }
});


