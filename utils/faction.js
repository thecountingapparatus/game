import { ce, TextChannel } from "./text.js";
import { escapeHtml } from "./utils.js";

const factions = {};

class FactionBase {
  constructor(name, msReq) {
    this.name = name;
    this.msReq = msReq;
    this.milestones = 0;
    this.count = 0;
    this.textBox = new TextChannel(
      name,
      100,
      2000,
      (msg) => {
        return {
          isCorrect: this.isCorrectCount(msg),
        };
      },
      (i) => {
        const ele = ce("div");
        const txt = ce("span");
        txt.innerHTML = escapeHtml(i.msg).replaceAll(
          /gwa|:gwa:/g,
          `<img src="https://cdn.glitch.global/c4b4c3c5-22da-4237-8d6f-f6335452d8b5/gwa.png?v=1665428837632" />`
        );

        ele.append(txt);
        ele.style.color = i.isCorrect ? "green" : "red";
        return ele;
      }
    );
    this.textBox.onMessage((i) => this.doCount(i));
    factions[name] = this;
  }
  // abstracts
  isValidCount(count); //XX, Ones, Factorial
  
  parseCount(count); //XX, Ones, Factorial
  
  get nextCount(){} //???
  
  onMilestone(); //All Factions
  
  
  goalCheck(); //All Factions
  
  spireBoost(); //All Factions
  
//defined
  updateMilestones() {
    const oldMilestone = this.milestones;
    while (this.count >= this.milestoneNextAt) {
      this.milestones++;
    }
    if (this.milestones > oldMilestone) {
      this.onMilestone();
    }
  }

  isCorrectCount(count) {
    return (
      this.isValidCount(count) && this.nextCount === this.parseCount(count)
    );
  }
  doCount(count) {
    if (this.isCorrectCount(count)) {
      this.count = this.nextCount;
      console.log(count);
      this.updateMilestones();
    }
  }

  get milestoneNextAt() {
    return this.msReq(this.milestones);
  }
  
  spireCheck(){
      isSpire = goals.every(element => element === true);
  }
}
class FakeFaction extends FactionBase {
  constructor() {
    super("Fake Faction", (x) => Math.pow(x + 1, 2));
  }
  isValidCount(count) {
    return count === this.nextCount.toString();
  }
  parseCount(count) {
    return Number(count);
  }
  get nextCount() {
    return this.count + 1;
  }
}
const facInstance = new FakeFaction();
class FactionDisplay extends HTMLElement {
  updateHTML(count) {
    this.info.innerHTML = `Count: ${this.faction.count}`;
  }
  connectedCallback() {
    if (!this.isConnected) return;

    this.attachShadow({ mode: "open" });
    const name = this.getAttribute("name");

    this.info = ce("div");
    this.faction = factions[name];

    const root = ce("div");
    const chatInstance = ce("text-box");

    // RE: why do we need setAttribute?
    chatInstance.setAttribute("name", name);

    root.append(chatInstance, this.info);
    this.shadowRoot.append(root);
    this.faction.textBox.onMessage((i) => this.updateHTML(i));
    this.updateHTML("");
  }
  constructor() {
    super();
  }
}

customElements.define("faction-disp", FactionDisplay);
