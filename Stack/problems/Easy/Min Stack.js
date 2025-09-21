// https://www.geeksforgeeks.org/design-and-implement-special-stack-data-structure/
// https://leetcode.com/problems/min-stack/

var MinStack = function () {
    this.stack = []
    this.minEle = -1
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    if (this.stack.length === 0) {
        this.stack.push(val)
        this.minEle = val
    } else {
        if (val < this.minEle) {
            this.stack.push(2 * val - this.minEle) // we push the encoded value when the new val is lesser than the existing min
            this.minEle = val
        } else {
            this.stack.push(val)
        }
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    if (this.stack.length === 0) return
    const top = this.stack.pop()

    if (top < this.minEle) { // if top is lesser than the minEle, that means top element is a encoded value and it's the min element, so we need to find the previous min from the encoded value
        this.minEle = 2*this.minEle - top
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    if (this.stack.length === 0) return
    const top = this.stack[this.stack.length - 1]
    return top < this.minEle ? this.minEle : top // if top is lesser than the minEle, that means it's an encoded value and minEle holds the actual value
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minEle
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */