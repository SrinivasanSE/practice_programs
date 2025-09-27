// https://leetcode.com/problems/online-stock-span/description/

/*
O(n) & O(n)
*/

var StockSpanner = function() {
    this.stack = []
};

StockSpanner.prototype.next = function(price) { // also can be solved using Previous greater element approach
    let span = 1
    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) { // if the current price is greater, we pop the elements and add the span to the curr
        span += this.stack[this.stack.length - 1][1]
        this.stack.pop()
    }

    this.stack.push([price, span])
    return span
};