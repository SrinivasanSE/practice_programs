# System design


##SQL vs No-SQL

      SQL (relational databases) can scale, but they scale vertically more easily and horizontally with difficulty.
      NoSQL databases are designed from day one for horizontal scaling, so they scale more easily across many machines.

      Now let’s break it down clearly.

      1️⃣ What “scaling” means

      There are two kinds of scaling:

      🔹 Vertical scaling (scale up)

      Add more CPU, RAM, disk to one machine

      Example: Move from 16GB RAM → 128GB RAM

      🔹 Horizontal scaling (scale out)

      Add more machines

      Example: 1 DB server → 100 DB servers

      2️⃣ Why SQL databases don’t scale easily horizontally
      🔴 1. Strong consistency & ACID guarantees

      SQL databases follow ACID:

      Atomicity

      Consistency

      Isolation

      Durability

      This causes problems when distributing data:

      Transactions may span multiple tables

      Tables may be on different machines

      Requires distributed transactions (2-phase commit)

      Heavy coordination → slow and complex

      📌 Example

      BEGIN;
      UPDATE accounts SET balance = balance - 100 WHERE id = 1;
      UPDATE accounts SET balance = balance + 100 WHERE id = 2;
      COMMIT;


      If accounts is split across machines:

      Both machines must agree

      Network failure = rollback

      Latency increases

      🔴 2. Joins are expensive in distributed systems

      SQL relies heavily on:

      JOIN

      FOREIGN KEY

      GROUP BY

      In a distributed setup:

      Tables live on different machines

      Joining means network calls

      Network is slow compared to memory

      📌 Example:

      SELECT *
      FROM orders
      JOIN users ON orders.user_id = users.id;


      Across shards → very slow

      🔴 3. Schema rigidity

      Fixed schemas

      Altering schema on huge distributed datasets is painful

      Requires locking or migration downtime

      🔴 4. Sharding is hard

      SQL databases were not originally built for sharding:

      Manual sharding logic

      Uneven data distribution

      Cross-shard queries are complex

      3️⃣ Why NoSQL scales well horizontally

      NoSQL databases sacrifice some guarantees to gain scalability.

      🟢 1. Designed for horizontal scaling

      NoSQL systems assume:

      Data will be spread across many machines

      Failures will happen

      They use:

      Automatic sharding

      Replication

      Partition tolerance

      🟢 2. Weaker consistency (BASE model)

      NoSQL often follows BASE:

      Basically Available

      Soft state

      Eventual consistency

      This means:

      No global locks

      No distributed transactions

      Writes are fast

      📌 Example:

      User updates profile

      Some servers show old data briefly

      Eventually all converge

      🟢 3. No joins → faster distribution

      NoSQL encourages:

      Denormalization

      Store related data together

      📌 Example (MongoDB):

      {
        "orderId": 101,
        "user": {
          "id": 1,
          "name": "Srinivasan"
        },
        "items": [...]
      }


      No need to fetch from another machine.

      🟢 4. Simple data models

      Key-Value

      Document

      Column-Family

      Simple access patterns:

      GET(key)
      PUT(key, value)


      Easy to distribute by hash(key).

      4️⃣ CAP theorem perspective

      In distributed systems, you can only fully guarantee two of:

      Consistency

      Availability

      Partition tolerance

      SQL databases usually prioritize:

      Consistency + Availability

      Less tolerant to partitions

      NoSQL databases usually prioritize:

      Availability + Partition tolerance

      Weaker consistency

      5️⃣ Important truth (interview gold 🏆)

      ❌ “SQL doesn’t scale” → WRONG
      ✅ “SQL is harder to scale horizontally” → CORRECT

      Examples:

      MySQL + sharding

      PostgreSQL + Citus

      Google Spanner (SQL + massive scale)

      But:

      More engineering effort

      More coordination

      Higher latency

      6️⃣ When to use what
      Use SQL when:

      Strong consistency is required (banking, payments)

      Complex queries & joins

      Data integrity matters

      Use NoSQL when:

      Massive scale (millions of writes/sec)

      Flexible schema

      Eventual consistency is acceptable

      Simple access patterns


LRU and LFU eviction policy real time examples
SNS vs SQS
Virtualization vs container
Kafka vs Rabbit MQ
Rate limiting
CDN
Cache policies
Mono vs micro service
Concurrent vs Parellel
SSD vs HDD
Inverted Index
Presigned url in aws
l4/L7 load balancer
Zookeeper
How to prevent deadlock
2pc & SAGA pattern
QUIC and HTTP/3
Circuit breakers
under fetching vs over
How to scale relational db
Types of indexes

B-Tree Indexes

The Structure of B-trees

Real-World Examples

Why B-trees are the default choice

LSM Trees (Log-Structured Merge Trees)

Hash Indexes

Geospatial Indexes

Inverted Indexes

Index Optimization Patterns

Composite Indexes

Covering Indexes