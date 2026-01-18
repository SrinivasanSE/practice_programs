// https://leetcode.com/problems/accounts-merge/description/

/*

Problem idea

Each account is a node

Each email can appear in multiple accounts

If two accounts share at least one email → they belong to the same person

👉 So:

Union accounts that share emails

After union, group emails by the root account

Step 1: Union accounts using emails

Maintain a map:
email → account index

When the same email appears again → union current account with the previous one

Step 2: Collect emails by DSU root

Find the ultimate parent for each email

Push that email into its root’s bucket

Step 3: Build final answer

For each root:

Sort emails

Prepend account name


/*

DSU

N is the number of accounts and K is the maximum length of an account

O(NK⋅logNK+NK⋅α(N))

*/

var accountsMerge = function (accounts) {
  const n = accounts.length;

  // email -> account index
  // Example:
  // "john@mail.com" -> 0
  const mailNodeMap = new Map();

  // DSU where each account is a node
  const ds = new DisJointSet(n);

  /*
    --------------------------------------------------
    STEP 1: UNION ACCOUNTS THAT SHARE EMAILS
    --------------------------------------------------
    accounts = [
      ["John", "a@mail", "b@mail"],
      ["John", "b@mail", "c@mail"],
      ["Mary", "x@mail"]
    ]

    - a@mail → account 0
    - b@mail → account 0
    - b@mail appears again in account 1 → union(1, 0)
    - c@mail → account 1
    */
  for (let i = 0; i < n; i++) {
    // start from index 1 because index 0 is the name
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];

      if (mailNodeMap.has(email)) {
        // Email already seen → union current account
        // with the account where this email appeared before
        ds.unionBySize(i, mailNodeMap.get(email));
      } else {
        // First time seeing this email
        mailNodeMap.set(email, i);
      }
    }
  }

  /*
    --------------------------------------------------
    STEP 2: GROUP EMAILS BY ROOT ACCOUNT
    --------------------------------------------------
    mergedMail[root] = all emails belonging to that root
    */
  const mergedMail = Array.from({ length: n }, () => []);

  /*
    mailNodeMap entries look like:
    "b@mail" -> 1

    But account 1 might have parent 0 after union.
    So we always push emails to the ULTIMATE parent.
    */
  for (let [email, accIndex] of mailNodeMap) {
    const root = ds.findPar(accIndex);
    mergedMail[root].push(email);
  }

  /*
    --------------------------------------------------
    STEP 3: BUILD FINAL MERGED ACCOUNTS
    --------------------------------------------------
    */
  const mergedAccounts = [];

  for (let i = 0; i < n; i++) {
    // Skip empty buckets (not a root or no emails)
    if (mergedMail[i].length === 0) continue;

    // Sort emails lexicographically as required
    mergedMail[i].sort();

    // Account name comes from original account
    const mergedAccount = [];
    mergedAccount.push(accounts[i][0]); // name
    mergedAccount.push(...mergedMail[i]);

    mergedAccounts.push(mergedAccount);
  }

  return mergedAccounts;
};
