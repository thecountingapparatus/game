import { FactionBase } from "./faction.js";
import { basicCount } from "./count.js";
import { xxCount } from "./xx.js";
import { onesCount } from "./ones.js";

class TreeFaction extends FactionBase {
  constructor() {
    super("Tree", (x) => Math.pow(x, Math.pow(2, xxCount.milestoneReduction)));
    this.milestoneReward = basicCount.unbanMult * this.milestones;
    this.rewardUsed = 0;
    this.slowmode = 86400;
    this.grid = 0;
  }

  //Counts & Milestones
  get nextCount() {
    this.nextCount = this.count + 1;
    return this.nextCount;
  }

  get milestoneReward() {
    return this.milestoneReward - this.rewardUsed;
  }

  useReward() {
    if (this.rewardUsed <= this.milestoneReward) {
      this.rewardUsed++;
      return true;
    } else {
      return false;
    }
  }

  get slowmodeCheck() {
    this.slowmode = 86400 * Math.pow(0.75, onesCount.milestones);
    return this.slowmode;
  }

  //Goals & Spire
  goalCheck() {
    if (this.milestones >= 25) {
      this.goals[0] = true;
    }
    if (this.milestones >= 50) {
      this.goals[1] = true;
    }
    if (this.rewardUsed >= 25) {
      this.goals[2] = true;
    }
    if (this.rewardUsed >= 50) {
      this.goals[3] = true;
    }
    if (this.grid >= 10) {
      this.goals[4] = true;
    }
  }
}

export const treeCount = new TreeFaction();
