// https://www.geeksforgeeks.org/design-and-implement-special-stack-data-structure/

class SpecialStack {
    constructor(){
        this.top = -1
        this.arr = []
        this.min = -1
        this.demoVal = 9999
        this.max = 10000
  
    }
  /** 
   * @param {number} x
   * @return {void}
   */
    push(x){
      if (this.top === -1 || x < this.min) {
          this.min = x
      }
      this.top++
      this.arr.push(x*this.demoVal + this.min)
    }
  /**
   * @return {number}
   */
    pop(){
     if(!this.isEmpty()) {
         const val = this.arr[top]
         
         this.arr.pop()
         this.top--
         
         if(this.top < 0) {
             this.min = -1
         } else {
             this.min = val%this.demoVal
         }
         
         
         return Math.floor(val/this.demoVal)
     }
     return -1
    }
  
  /**
   * @return {boolean}
   */
  
    isFull(){
      return this.top === this.max - 1
    }
  /**
   * @return {boolean}
   */
    isEmpty(){
      return this.top === -1
    }
  /**
   * @return {number}
   */
    getMin(){
        return this.min
    }
  }