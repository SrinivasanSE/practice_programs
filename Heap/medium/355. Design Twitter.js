// https://leetcode.com/problems/design-twitter/description/

// Using LinkedList & Heap

class Twitter {
    constructor() {
        this.tweets = {}
        this.users = {}
        this.time = 0
    }

    postTweet(userId, tweetId) {
        this.time++
        const ll = this.tweets[userId] || new LinkedListC()
        ll.insert(userId, tweetId, this.time)
        this.tweets[userId] = ll // store each user's tweets as linkedlist

    }

    getNewsFeed(userId) {
        const heap = new MaxHeapC()
        if (this.tweets[userId]) {
        heap.insert(this.tweets[userId].head)
        }
        const followers = this.users[userId] || []
        for (let userId of followers) {
            if (this.tweets[userId])
            heap.insert(this.tweets[userId].head) // insert recent tweet of each user
        }

        let count = 0
        let res = []
        while (!heap.isEmpty() && count < 10) {
            const node = heap.extractMax()
            res.push(node.tweetId)
            if (node.next) { // insert next tweet of each user
                heap.insert(node.next)
            }
            count++
        }
        return res
    }

    follow(followerId, followeeId) {
        if (followerId === followeeId) return
        if (this.users[followerId] && this.users[followerId].includes(followeeId)) return
        this.users[followerId] = (this.users[followerId] || [])
        this.users[followerId].push(followeeId)
    }

    unfollow(followerId, followeeId) {
        if (this.users[followerId]) {
            this.users[followerId] = this.users[followerId].filter(id => id != followeeId)
        }
    }

}


// Using Array & Heap

class Twitter {
    constructor() {
        this.time = 0; // global timestamp (monotonic counter)
        this.users = {}; // userId -> { posts: [[time, tweetId]], followees: Set }
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
        this.users[userId].posts.push([this.time++, tweetId]);
    }

    /** Retrieve the 10 most recent tweet IDs in the user's news feed */
    getNewsFeed(userId) {
        this._initUser(userId);

        const heap = new MaxHeap(); // store [time, tweetId, userId, idx]
        const feed = [];

        // helper to push latest tweet of a user
        const pushLatest = (uid) => {
            const posts = this.users[uid].posts;
            if (posts.length > 0) {
                const idx = posts.length - 1; // newest tweet index
                const [time, tweetId] = posts[idx];
                heap.enqueue([time, tweetId, uid, idx]);
            }
        };

        // add self’s latest tweet
        pushLatest(userId);

        // add followees’ latest tweets
        for (const followee of this.users[userId].followees) {
            pushLatest(followee);
        }

        // pop up to 10 most recent
        while (!heap.isEmpty() && feed.length < 10) {
            const [time, tweetId, uid, idx] = heap.dequeue();
            feed.push(tweetId);

            // push the next older tweet of this user
            if (idx - 1 >= 0) {
                const [nextTime, nextTweetId] = this.users[uid].posts[idx - 1];
                heap.enqueue([nextTime, nextTweetId, uid, idx - 1]);
            }
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