// https://leetcode.com/problems/implement-queue-using-stacks/description/


// Operation in push


var MyQueue = function() {
    this.s1 = []
    this.s2 = []
};


MyQueue.prototype.push = function(x) { // s1 -> s2 & x -> s1 & s2 -> s1
    while (this.s1.length) { // s1 = [1], x = 2, s2 = [] -> 
    // s1 = [], s2 = [1] ->
    // s1 = [2, 1], s2 = []
        this.s2.push(this.s1.pop())
    }
    this.s1.push(x)
    while (this.s2.length) {
        this.s1.push(this.s2.pop())
    }
};


MyQueue.prototype.pop = function() {
    return this.s1.pop()
};


MyQueue.prototype.peek = function() {
    return this.s1[this.s1.length - 1]
};


MyQueue.prototype.empty = function() {
    return this.s1.length === 0
};


// Operation in pop/peek



var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};


MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};


MyQueue.prototype.pop = function() {
    this.moveIfNeeded();
    return this.stackOut.pop();
};


MyQueue.prototype.peek = function() {
    this.moveIfNeeded();
    return this.stackOut[this.stackOut.length - 1];
};


MyQueue.prototype.empty = function() {
   return this.stackOut.length === 0 && this.stackIn.length === 0 // need to check for both stacks
};

MyQueue.prototype.moveIfNeeded = function(){
    if(this.stackOut.length == 0){
        while(this.stackIn.length > 0){
            this.stackOut.push(this.stackIn.pop());
        }
    }
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */