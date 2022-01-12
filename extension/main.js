/* TODO -> REMOVE SECRETS FROM CODE */
const APP_URL = "https://gnipet.vercel.app"; //"http://localhost:4001";
const INBOX_SDK_KEY = "sdk_joaob-appid_4fc4609202";
const ICON_URL =
  "https://user-images.githubusercontent.com/29175815/149169353-cb7e620b-3ae6-4896-aafb-16f33d57fb3d.jpg";
/* TODO -> REMOVE SECRETS FROM CODE */

function createIframe() {
  var iframe = document.createElement("iframe");
  iframe.src = APP_URL;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.minHeight = "375px";

  return iframe;
}

function addIframeListener(compose) {
  function onReceiveMessage(event) {
    if (event.origin !== APP_URL) return;

    compose.setBodyHTML(event.data.template.body);
    compose.setSubject(event.data.template.subject);
  }

  window.addEventListener("message", onReceiveMessage);
}

function render(compose) {
  compose.addButton({
    title: "Gnipet Easy Templates",
    iconUrl: ICON_URL,
    hasDropdown: true,
    onClick: function (event) {
      const iframe = createIframe();
      event.dropdown.el.appendChild(iframe);
    },
  });

  addIframeListener(compose);
}

async function startup() {
  const sdk = await InboxSDK.load(2, INBOX_SDK_KEY);

  sdk.Compose.registerComposeViewHandler(render);
}

startup();
