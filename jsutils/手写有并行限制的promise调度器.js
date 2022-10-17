class Scheduler {
  constructor(limit) {
    this.queue = []
    this.maxCount = limit
    this.runCounts = 0
  }
  add(time, order) {
    const promiseCreater = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(order);
          resolve()
        }, time)
      })
    }
    this.queue.push(promiseCreater)
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return
    }
    this.runCounts++
    this.queue.shift()().then(() => {
      this.runCounts--;
      this.request()
    })
  }
}

class myScheduler {
  constructor(limit) {
    this.queue = []
    this.max = limit
    this.run = 0
  }
  add(time, order) {
    const promiseSchedule = () => {
      return new Promise((res) => {
        setTimeout(() => {
          console.log(order);
          res()
        }, time)
      })
    }
    this.queue.push(promiseSchedule)
  }
  taskStart() {
    for (let i = 0; i < this.max; i++) {
      this.request()
    }
  }
  request() {
   if(!this.queue||!this.queue.length||this.run>=this.max)return
   this.run++
   this.queue.shift().then(()=>{
    this.run--
    this.request()
   })
  }
}
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
  scheduler.add(time, order);
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();