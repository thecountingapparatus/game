const channels = {};

export class TextChannel {
  constructor(name, maxMessages, maxLength, extraData, toHTML, inType) {
    this.name = name; //string
    this.max = maxMessages; //int
    this.length = maxLength; //int
    this.messages = []; //array,string
    this.inputType = inType ?? "text"; //string
    this.msgCounter = 0; //int
    this.handlers = [];
    this.isFrozen = false; //bool
    // force update
    this.updateText = () => {}; //function
    this.extraData = extraData ?? (() => ({})); //function
    this.toHTML = //function
      toHTML ??
      ((i) => {
        const ele = ce("div");
        const txt = ce("span");
        txt.innerText = i.msg;
        ele.append(txt);
        return ele;
      });
    channels[name] = this;
  }
  deleteMessage(ind) {
    this.messages.splice(ind, 1);
  }
  onMessage(func) {
    this.handlers.push(func);
  }
  unListen() {
    this.handlers = [];
  }
  freeze() {
    this.isFrozen = true;
  }
  unFreeze() {
    this.isFrozen = false;
  }
  sendMessage(msg, bot = true) {
    if (this.isFrozen) return;
    if (!bot) this.msgCounter++;
    this.messages.push({
      msg,
      num: this.msgCounter,
      bot,
      ...this.extraData(msg),
    });
    for (const i of this.handlers) {
      i(msg);
    }
    if (this.messages.length > this.max) {
      this.messages.shift();
    }
    this.updateText();
  }
}

export function ce(n) {
  return document.createElement(n);
}

class TextChannelDisp extends HTMLElement {
  updateText() {
    // oh shoot js injection
    this.texts.innerHTML = "";
    this.textInstance.messages.forEach((i) => {
      const ele = this.textInstance.toHTML(i);
      ele.onmouseover = () => (ele.style.backgroundColor = "grey");
      ele.onmouseout = () => (ele.style.backgroundColor = "inherit");
      if (!i.bot) ele.innerHTML += `<sub>#${i.num}</sub>`;
      this.texts.append(ele);
    });
  }
  sendText() {
    if (this.input.value === "" || this.tooBig || this.textInstance.isFrozen)
      return;
    //if (this.input.value.length
    this.textInstance.sendMessage(this.input.value, false);
    this.input.value = "";
  }

  get tooBig() {
    return this.input.value.length > this.textInstance.length;
  }

  connectedCallback() {
    if (!this.isConnected) return;
    this.attachShadow({ mode: "open" });
    this.textInstance = channels[this.getAttribute("name")];
    // console.log(this.getAttribute("name"), channels.Chat, this.textInstance);

    const wrapper = ce("div");
    wrapper.innerHTML += `
      <div style="text-align:center;">${this.textInstance.name}</div>
    `;
    this.texts = ce("div");
    this.input = ce("input");
    const btn = ce("button");
    const txtLength = ce("div");

    this.input.type = this.textInstance.inputType;
    this.input.onkeydown = (e) => {
      if (e.key === "Enter") this.sendText();
    };
    this.input.style.width = "calc(100% -  85px)";
    this.textInstance.updateText = () => this.updateText();
    this.input.style.display = "inline";

    btn.onclick = () => this.sendText();
    btn.innerHTML = "Submit";
    btn.style.width = "75px";

    this.texts.style.overflow = "auto";
    this.texts.style.overflowWrap = "break-word";
    this.texts.style.height = "100px";

    txtLength.style.textAlign = "right";

    //wrapper.style.textAlign = "right"
    wrapper.append(this.texts, this.input, btn, txtLength);
    this.shadowRoot.append(wrapper);
    this.int = setInterval(() => {
      this.input.disabled = this.textInstance.isFrozen;
      btn.disabled = this.tooBig || this.textInstance.isFrozen;
      txtLength.innerHTML = `${
        this.textInstance.length - this.input.value.length
      } chars left`;
      txtLength.style.color = this.tooBig ? "red" : "green";
    }, 10);
  }

  disconnectedCallback() {
    clearInterval(this.int);
  }
  constructor() {
    super();
  }
}

//console.log("ping", channels);
/*const txt = new TextChannel("Chat", 10)
txt.onMessage(i=> {
  if (i === "gwa") {
    txt.sendMessage("This channel is locked!")
    txt.freeze()
    setTimeout(() => {
      txt.sendMessage("You got trolled, it is unfrozen :trol:")
      txt.unFreeze()
    }, 10000*Math.random())
  }
})*/
customElements.define("text-box", TextChannelDisp);
