dp[i][1] = maximum profit we can achieve starting from day i, if we are allowed to buy.
dp[i][0] = maximum profit we can achieve starting from day i, if we are currently holding a stock.


Example: Suppose prices = [1, 2, 3]

We know at the end (i = 3),
there are no days left ⇒ profit = 0 for both states.

So:

dp[3][0] = 0
dp[3][1] = 0


Now move backwards:

i = 2, price = 3
Case 1: canBuy = 1

If we buy today: profit = -3 + dp[3][0] = -3 + 0 = -3

If we skip: profit = dp[3][1] = 0

→ dp[2][1] = max(-3, 0) = 0

Case 2: canBuy = 0

If we sell today: profit = 3 + dp[3][1] = 3 + 0 = 3

If we hold: profit = dp[3][0] = 0

→ dp[2][0] = max(3, 0) = 3

i = 1, price = 2
canBuy = 1:

Buy today: -2 + dp[2][0] = -2 + 3 = 1

Skip: dp[2][1] = 0

→ dp[1][1] = 1

canBuy = 0:

Sell today: 2 + dp[2][1] = 2 + 0 = 2

Hold: dp[2][0] = 3

→ dp[1][0] = 3

i = 0, price = 1
canBuy = 1:

Buy today: -1 + dp[1][0] = -1 + 3 = 2

Skip: dp[1][1] = 1

→ dp[0][1] = 2

canBuy = 0:

Sell today: 1 + dp[1][1] = 1 + 1 = 2

Hold: dp[1][0] = 3

→ dp[0][0] = 3




1️⃣ dp[1][0] = 3

👉 Interpretation:

Starting from day 1 (price = 2),
you already hold a stock,
and your goal is to maximize profit from day 1 → end.

So, since you’re holding a stock, your only meaningful options are:

Sell now, or

Keep holding and maybe sell later.

At i = 1:

If you sell now → gain price[1] = 2, then you can do whatever is optimal from day 2 onward when you can buy again (dp[2][1] = 0).
→ Profit = 2 + dp[2][1] = 2 + 0 = 2.

If you keep holding → you go to day 2 still holding. Profit = dp[2][0] = 3.

Now take the best option:

dp[1][0] = max(2, 3) = 3


✅ Meaning in words:
“If I already own a stock on day 1, my best possible total profit from here is 3 — by waiting and selling later at 3.”

So the algorithm correctly captures that holding today and selling tomorrow at a higher price is better than selling now.

2️⃣ dp[1][1] = 1

👉 Interpretation:

Starting from day 1 (price = 2),
you do not currently hold a stock (you can buy if you want).

Now you can:

Buy today → spend money now (-2), and after buying, the next state is holding (dp[2][0] = 3).
→ Profit = -2 + 3 = 1.

Skip today → don’t buy, just move to next day still able to buy (dp[2][1] = 0).
→ Profit = 0.

Take the better one:

dp[1][1] = max(1, 0) = 1


✅ Meaning in words:
“If I start day 1 free to buy, the best total profit I can make is 1 — by buying at 2 today and selling later at 3.”