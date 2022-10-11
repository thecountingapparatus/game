import {FactionBase} from './faction.js';
import {globalInfo} from './helperFunctions.js';

function getEffectiveMilestones(){
  let effectiveMilestones = 0;
  for (const value of Object.values(globalInfo.factions)) {
    if(["Letter", "Factorial", "Matrix", "Function"].includes(value.name))
      effectiveMilestones -= value.milestone;
  	else effectiveMilestones += value.milestone;
  }
  return effectiveMilestones
}
function getTotalMilestones(){
  let totalMilestones = 0;
  for (const value of Object.values(globalInfo.factions)) {
  	totalMilestones += value.milestone;
  }
  return totalMilestones
}
function updateMilestoneReduction() {
    //updates milestone scaling reduction on each milestone
	let effectiveMilestones = getEffectiveMilestones()
  milestoneReduction = Math.pow(1/xxCount.logProd, Math.max(1/(effectiveMilestones+1),1));
  document.getElementById("milestoneReductionText").innerHTML = "Milestone reduction: " + milestoneReduction.toFixed(2);
  for (const value of Object.values(globalInfo.factions)) {
  	value.checkMilestoneReq();
  }
}

let milestoneReduction = 1;

class XxFaction extends FactionBase {
  constructor() {
    super("X X", ((x) => Math.pow(4, Math.pow(x+1, milestoneReduction))));
    this.challenges = [0,0,0,0,0,0,0,0,0,0]
  }
  
  getNextCount(){
    this.nextCount = this.count+1;
  }
  
  getChallengeReward(){
    let logProd = 1;
    for (var i = 0; i <= this.challenges.length; i++){
      logProd = logProd*(Math.log10(this.challenges[i]+1)+1);
    }
    return logProd;
  }
}
export const xxCount = new XxFaction();
