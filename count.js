class CountFaction extends FactionMain {
  constructor(name, milestoneFunction, globalInfo) {
    super(name, milestoneFunction, globalInfo);
    this.milestoneReward = (Math.pow(this.milestone,2)+this.milestone)/2;
    this.rewardUsed = 0
  }
  getNextCount(){
    this.nextCount = nextCount+1; //To be changed to Effective X
  }
  getReward(){
    return (milestoneReward-rewardUsed);
  }
  useReward(){
    if (this.rewardUsed <= this.milestoneReward){
      this.rewardUsed++;
      return true;
    }else{
      return false;
    }
  }
}
const basicCount = new CountFaction("Classic", ((x) => Math.pow(10, Math.pow(x, milestoneReduction))), globalInfo);
