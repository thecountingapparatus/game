import {globalInfo} from './helperFunctions.js';
import {FactionBase} from './faction.js';
import {xxCount} from './xx.js';

class CountFaction extends FactionBase {
  constructor() {
    super("Classic", ((x) => Math.pow(10, Math.pow(x+1, xxCount.milestoneReduction))));
    this.milestoneRewardOne = (Math.pow(this.milestones,2)+this.milestones)/2;
    this.milestoneRewardTwo = this.milestones; //Letter Stock
    this.rewardUsed = 0;
  }
  getNextCount(){
    this.nextCount = this.count+Math.max(xxCount.milestones,1); //To be changed to Effective X
  }
  
  getRewardOne(){
    return (this.milestoneRewardOne-this.rewardUsed);
  }
  
  useRewardOne(){
    if (this.rewardUsed <= this.milestoneReward){
      this.rewardUsed++;
      return true;
    }else{
      return false;
    }
  }
  
  getRewardTwo(){
    return this.milestoneRewardTwo;
  }
}
export const basicCount = new CountFaction();
