// https://leetcode.com/problems/design-twitter/description/

// Using LinkedList & Heap

class Twitter {
  constructor() {
    this.tweets = {};
    this.users = {};
    this.time = 0;
  }

  postTweet(userId, tweetId) {
    this.time++;
    const ll = this.tweets[userId] || new LinkedListC();
    ll.insert(userId, tweetId, this.time);
    this.tweets[userId] = ll; // store each user's tweets as linkedlist
  }

  getNewsFeed(userId) {
    const heap = new MaxHeapC();
    if (this.tweets[userId]) {
      heap.insert(this.tweets[userId].head);
    }
    const followers = this.users[userId] || [];
    for (let userId of followers) {
      if (this.tweets[userId]) heap.insert(this.tweets[userId].head); // insert recent tweet of each user
    }

    let count = 0;
    let res = [];
    while (!heap.isEmpty() && count < 10) {
      const node = heap.extractMax();
      res.push(node.tweetId);
      if (node.next) {
        // insert next tweet of each user
        heap.insert(node.next);
      }
      count++;
    }
    return res;
  }

  follow(followerId, followeeId) {
    if (followerId === followeeId) return;
    if (this.users[followerId] && this.users[followerId].includes(followeeId))
      return;
    this.users[followerId] = this.users[followerId] || [];
    this.users[followerId].push(followeeId);
  }

  unfollow(followerId, followeeId) {
    if (this.users[followerId]) {
      this.users[followerId] = this.users[followerId].filter(
        (id) => id != followeeId
      );
    }
  }
}

// Using Array & Heap

class Twitter {
  constructor() {
    this.time = 0; // global timestamp (monotonic counter)
    this.users = {}; // userId -> { posts: [{time, tweetId}], followees: Set }
  }

  /** Initialize user if not present */
  _initUser(userId) {
    if (!this.users[userId]) {
      this.users[userId] = { posts: [], followees: new Set() };
    }
  }

  /** Post a new tweet */
  postTweet(userId, tweetId) {
    this._initUser(userId);
    this.users[userId].posts.push({ time: this.time++, tweetId });
  }

  /** Retrieve the 10 most recent tweet IDs in the user's news feed */
  getNewsFeed(userId) {
    this._initUser(userId);

    const heap = new MaxHeapC();
    const feed = [];

    const pushLatest = (uId) => {
      const posts = this.users[uId].posts;
      if (posts.length > 0) {
        const idx = posts.length - 1;
        const { time, tweetId } = posts[idx];
        heap.insert({ time, tweetId, userId: uId, idx });
      }
    };

    pushLatest(userId);

    for (let user of this.users[userId].followees) {
      pushLatest(user);
    }

    let count = 0;
    while (!heap.isEmpty() && count < 10) {
      const { userId: uId, idx, tweetId } = heap.extractMax();
      feed.push(tweetId);
      if (idx - 1 >= 0) {
        const { time: newTime, tweetId: newTweetId } =
          this.users[uId].posts[idx - 1];
        heap.insert({
          time: newTime,
          tweetId: newTweetId,
          userId: uId,
          idx: idx - 1,
        });
      }
      count++;
    }

    return feed;
  }

  /** Follow another user */
  follow(followerId, followeeId) {
    this._initUser(followerId);
    this._initUser(followeeId);
    if (followerId !== followeeId) {
      this.users[followerId].followees.add(followeeId);
    }
  }

  /** Unfollow another user */
  unfollow(followerId, followeeId) {
    if (this.users[followerId]) {
      this.users[followerId].followees.delete(followeeId);
    }
  }
}

class MaxHeapC {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = this.getParentIndex(index);
      if (this.heap[parent].time < this.heap[index].time) {
        this.swap(parent, index);
        index = parent;
      } else {
        break;
      }
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }

  heapifyDown(index) {
    let largest = index;
    let left = this.getLeftChildIndex(index);
    let right = this.getRightChildIndex(index);

    if (
      left < this.heap.length &&
      this.heap[left].time > this.heap[largest].time
    )
      largest = left;

    if (
      right < this.heap.length &&
      this.heap[right].time > this.heap[largest].time
    )
      largest = right;

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  getMax() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  print() {
    console.log(this.heap);
  }
}
