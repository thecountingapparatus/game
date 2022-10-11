import { FactionBase } from "./faction.js";
import { xxCount } from "./xx.js";

//test
class CountFaction extends FactionBase {
  //Constructor
  constructor() {
    super("Classic", (x) =>
      Math.pow(10, Math.pow(x + 1, xxCount.milestoneReduction))
    );
    this.milestoneRewardOne = 0;
    this.milestoneRewardTwo = 0; //Letter Stock
    this.rewardUsed = 0;
  }

  //Count & Milestones
  get nextCount() {
    this.nextCount = this.count + Math.max(xxCount.milestones, 1); //To be changed to Effective X
  }

  get rewardOne() {
    this.milestoneRewardOne =
      (Math.pow(this.milestones, 2) + this.milestones) / 2;
    return this.milestoneRewardOne - this.rewardUsed;
  }

  useRewardOne() {
    if (this.rewardUsed <= this.milestoneReward) {
      this.rewardUsed++;
      return true;
    } else {
      return false;
    }
  }

  get rewardTwo() {
    this.milestoneRewardTwo = this.milestones;
  }

  onMilestone() {
    this.rewardOne();
    this.rewardTwo();
  }

  //Goals & Spire
  goalCheck() {
    if (this.milestones >= 5) {
      this.goals[0] = true;
    }
    if (this.milestones >= 10) {
      this.goals[1] = true;
    }
    if (this.rewardUsed >= 10) {
      this.goals[2] = true;
    }
    if (this.rewardUsed >= 50) {
      this.goals[3] = true;
    }
    if (this.count >= 1e6) {
      this.goals[4] = true;
    }
  }
  //test push
  spireBoost() {
    if (this.isSpire) {
      //treeCount.milestoneReward *= 2;
      this.milestoneRewardOne *= 2;
    } /*else{
      treeCount.milestoneReward /= 2;
      this.milestoneRewardOne /= 2;
    }*/
  }
}
export const basicCount = new CountFaction();
