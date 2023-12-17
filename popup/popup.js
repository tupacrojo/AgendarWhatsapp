const tabs = await chrome.tabs.query({
  url: ["https://web.whatsapp.com/*", "https://agentes.casino365online.net/*"],
});

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[0].trim();
  const pathname = new URL(tab.url).pathname.slice("/docs".length);

  element.querySelector(".title").textContent = title;
  element.querySelector(".pathname").textContent = pathname;
  element.querySelector("a").addEventListener("click", async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements);

const button = document.querySelector("#agrupBtn");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: "Cargas" });
});

const copyBtn = document.querySelector("#copyBtn");
copyBtn.addEventListener("click", async () => {
  if (tab.title === "WhatsApp") {
    let nombre = tab.querySelector("div._3W2ap").textContent;
    const clipBoard = navigator.clipboard;
    const stringNombre = quitarSlash(darFormato(nombre.valueOf()), "/");
    clipBoard.writeText(stringNombre).then(() => {
      console.log("copiado");
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // tab will either be a tabs.Tab instance or undefined.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

let activeTabId, lastUrl, lastTitle;

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function (tab) {
    if (lastUrl != tab.url || lastTitle != tab.title)
      console.log((lastUrl = tab.url), (lastTitle = tab.title));
  });
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
  getTabInfo((activeTabId = activeInfo.tabId));
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (activeTabId == tabId) {
    getTabInfo(tabId);
  }
});

chrome.scripting
  .executeScript({
    target: { tabId: cuTab.tabId },
    files: ["/scripts/script.js"],
  })
  .then(() => console.log("script injected"));

const openBtn = document.querySelector("#openBtn");
copyBtn.addEventListener("click", async () => {
  const whap = window.open("https://web.whatsapp.com/");
  const agentes = window.open(
    "https://agentes.casino365online.net/account/login"
  );
});
