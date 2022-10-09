"use strict";

class FactionMain {
  constructor(name, milestoneFunction, globalInfo) {
    this.name = name;
    this.count = 0;
    this.milestone = 0;
    this.nextCount = 1;
    this.globalInfo = globalInfo;
    this.milestoneFunction = milestoneFunction;
    this.textLog = [];
    this.globalInfo.factions[this.name] = this;
    console.log("Made new faction " + this.name);
  }

  parseCount(countText) {
    /* console.log("checking count is parseable") */
    ;
    return countText;
  }

  checkMilestoneReq() {
    //checks if milestones have been reached
    const oldMilestones = this.milestone;
    while (this.count >= this.milestoneFunction(this.milestone)) {
      this.milestone++;
      console.log("milestone " + this.milestone + " achieved");
    }
    if (this.milestone > oldMilestones) {
      updateMilestoneReduction();
    }
  }
  
  getMilestoneReq() {
		return this.milestoneFunction(this.milestone);
	}

  incrementCount(amount, countText) {
    if (this.parseCount(countText) !== undefined) {
      this.count += amount;
      console.log(this.count);
      this.checkMilestoneReq();
    }
  }
  incrementCount() {
    this.count = this.nextCount;
    console.log(this.count);
    this.checkMilestoneReq();
    this.getNextCount();
  }

  getNextCount() {
    this.nextCount = this.count + 1;
  }

  checkNewCount(newCount) {
    //checks if a count is correct
    if (newCount !== undefined && newCount === this.nextCount) {
      this.count = this.nextCount;
      console.log(this.count);
      this.checkMilestoneReq();
      this.getNextCount();
      return true;
    } else {
      return false;
    }
  }
}

class GlobalInfo {
  constructor() {
    this.factions = {};
  }
}

class MetaFaction extends FactionMain {
  constructor(name, milestoneFunction, globalInfo) {
    super(name, milestoneFunction, globalInfo);
  }
  
	getNextCount() {
  	this.nextCount = this.count + this.globalInfo.factions[FactionNames.Classic].milestone;
  }
}

const FactionNames = {
  Classic: "Classic",
  Meta: "MetaCount",
}

function pressButtonOnEnter(button) {
  if (event.key === 'Enter') {
    button.onclick();
  }
}

function parseCount(text, factionPass, textField) {
  // parses inputs to check if count is correct
  if (text.value !== "") {
    const correct = globalInfo.factions[factionPass].checkNewCount(text.value);
    globalInfo.factions[factionPass].textLog.push('<span class="' + (correct ? "greenText" : "redText") + '">' + text.value + "</span>");
    text.value = "";
    updateCountLog(textField, factionPass);
    updateNextCounts();
  }
}

function updateCountLog(text, factionPass) {
    //logs counts, marking them as correct or incorrect
	let textString = "";
  const textLog = globalInfo.factions[factionPass].textLog;
  if (textLog.length > 9) {
  	textLog.shift();
  }
	for (let i = 0; i < textLog.length; i++) {
  	if (i !== 0) textString += "<br>"
		textString += textLog[i];
  }
  text.innerHTML = textString;
}

function updateNextCounts() {
	for (const value of Object.values(globalInfo.factions)) {
		value.getNextCount();
    document.getElementById(value.name + "Next").innerHTML = "Next: " + value.nextCount + "<br>Milestone: " + Math.ceil(value.getMilestoneReq()) + "<br>Current: " + value.count + "<br>CurrentM: " + value.milestone;
  }
}

function updateMilestoneReduction() {
    //updates milestone scaling reduction on each milestone
	let totalMilestones = 0;
  for (const value of Object.values(globalInfo.factions)) {
  	totalMilestones += value.milestone;
  }
  milestoneReduction = Math.pow(1/(Math.log(totalMilestones+2)), 0.5);
  document.getElementById("milestoneReductionText").innerHTML = "Milestone reduction: " + milestoneReduction.toString(2);
  for (const value of Object.values(globalInfo.factions)) {
  	value.checkMilestoneReq();
  }
}

let milestoneReduction = 1;
const globalInfo = new GlobalInfo();
const basicCount = new FactionMain("Classic", ((x) => Math.pow(2, Math.pow(x, milestoneReduction))), globalInfo);
const countCount = new MetaFaction("MetaCount", ((x) => Math.pow(2, Math.pow(2, Math.pow(x, milestoneReduction)))), globalInfo);
updateNextCounts();
