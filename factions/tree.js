import {FactionBase} from './faction.js';
import {xxCount} from './xx.js';
import {globalInfo} from './helperFunctions.js';

class TreeFaction extends FactionBase {
  constructor() {
    super("Tree", ((x) => Math.pow(x, Math.pow(2, xxCount.milestoneReduction))));
    this.milestoneReward = this.milestones;
    this.rewardUsed = 0;
    this.slowmode = 21600;
  }
  getNextCount(){
    this.nextCount = this.count+1;
  }
  getReward(){
    return (this.milestoneReward-this.rewardUsed);
  }
  useReward(){
    if (this.rewardUsed <= this.milestoneReward){
      this.rewardUsed++;
      return true;
    }else{
      return false;
    }
  }
  getSlowmode(){
    return this.slowmode;
  }
}

export const treeCount = new TreeFaction();