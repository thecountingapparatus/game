import { FactionBase, factions } from "./factions.js";
import { basicCount } from "./count.js";
import { xxCount } from "./xx.js";
import { onesCount } from "./ones.js";

class TreeFaction extends FactionBase {
  constructor() {
    super("Tree", (x) => Math.ceil(Math.pow(x+1, Math.pow(2, xxCount.milestoneReduction))));
    this.hasChal = false;
    this.rewardUsed = 0;
    this.goals = [
      () => this.milestones >= 25,
      () => this.milestones >= 50,
      () => this.rewardUsed >= 25,
      () => this.rewardUsed >= 50,
      () => this.grid >= 10
    ];
    this.textBox.max = 1;
  }

  //Counts & Milestones

  doCount(count) {
    if (this.isCorrectCount(count)) {
      this.count = this.nextCount;
      this.updateGrid();
      this.updateMilestones();
      this.updateGoals();
    }
  }

  parseCount(count) {
    return Number(count);
  }
  
  get milestoneRewards() {
    return {
      one: basicCount.spireEffect * this.milestones
    };
  }

  useReward() {
    if (this.rewardUsed <= this.milestoneRewards.one) {
      this.rewardUsed++;
      return true;
    } else {
      return false;
    }
  }

  get slowmode() {
    return 86400 * Math.pow(0.75, onesCount.milestones);
  }
  
  get grid() {
    return Math.ceil(Math.sqrt(this.count))
  }
  updateGrid() {
    for (const value of Object.values(factions)) {
      value.textBox.length = (this.grid + 1) * (onesCount.milestones + 1);
    }
  }
}

export const treeCount = new TreeFaction();
