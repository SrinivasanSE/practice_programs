Concept | 0-Indexed Formula | 1-Indexed Formula
Parent | Math.floor((i - 1) / 2) | Math.floor(i / 2)
Left Child | 2 * i + 1 | 2 * i
Right Child | 2 * i + 2 | 2 * i + 1
Internal Node Range | 0 to Math.floor(n / 2) - 1 | 1 to Math.floor(n / 2)
Leaf Node Range | Math.floor(n / 2) to n - 1 | Math.floor(n / 2) + 1 to n
Last Internal Node | Math.floor((n - 2) / 2) | Math.floor(n / 2)

Height - Math.ceil(Math.log(n + 1)/Math.log(2)) - 1