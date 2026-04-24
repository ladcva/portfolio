const blogPosts = [
  {
    slug: "designing-cloud-data-products",
    type: "wiki",
    sourceFormat: "markdown",
    title: "Designing Cloud Data Products That Survive Production",
    excerpt:
      "A practical checklist for building data products with ownership, observability, cost control, and stakeholder feedback loops.",
    publishedAt: "2026-01-15",
    readingTime: "6 min read",
    tags: ["Data Engineering", "AWS", "Architecture"],
    body:
      "## Production contract\n\nProduction data products need more than a working transformation. They need clear ownership, traceable lineage, alerting that maps to user impact, and deployment paths that make rollback realistic.\n\nMy default design loop starts with the business decision the data product enables, then works backward into freshness, grain, quality rules, cost envelope, access model, and operational runbooks.\n\n> Observability is part of the product contract, not an optional dashboard.\n\nFreshness, row-count drift, schema drift, and spend anomalies should be visible before a stakeholder opens a ticket.",
  },
  {
    slug: "ml-research-to-maintainable-systems",
    type: "wiki",
    sourceFormat: "markdown",
    title: "Turning ML Research Into Maintainable Systems",
    excerpt:
      "Notes on making notebooks, experiments, and research prototypes easier to reproduce and safer to operationalize.",
    publishedAt: "2025-11-02",
    readingTime: "5 min read",
    tags: ["Machine Learning", "Research", "MLOps"],
    body:
      "Research code often optimizes for discovery speed, while product systems optimize for reproducibility and change control. The handoff becomes smoother when experiments already record data versions, metrics, parameters, and preprocessing choices.\n\n### Useful boundaries\n\n- Feature generation\n- Training\n- Evaluation\n- Reporting\n\nOnce those boundaries exist, you can test assumptions without turning the prototype into a full platform too early.\n\nInline math works too: $y = f(x) + \\epsilon$.",
  },
  {
    slug: "intro-to-stream-processing",
    type: "wiki",
    sourceFormat: "markdown",
    title: "Introduction to Stream Processing: From Batch Jobs to Stateful Streaming Systems",
    excerpt: "Most data engineers start with batch processing, but modern systems require continuous computation. This comprehensive guide covers the mental model shift, core concepts, and architectural patterns like Kafka, Flink, and Iceberg.",
    publishedAt: "2026-04-24T17:57:00+07:00",
    readingTime: "25 min read",
    tags: ["Stream Processing", "Apache Flink", "Kafka", "Iceberg", "Data Engineering", "Real-time Data"],
    body: `Most data engineers start their journey with batch processing. We collect data, store it somewhere, run a scheduled job, produce a table, and let analysts or downstream systems consume the result. This model is simple, powerful, and still very important.

But many modern systems no longer generate data in clean daily or hourly chunks. Applications emit clicks continuously. Payment systems produce transactions every second. Databases publish change events as soon as rows are inserted, updated, or deleted. Logs, sensors, mobile apps, fraud signals, and user activity all arrive as continuous flows.

This is where stream processing becomes important.

Stream processing is the practice of computing over data as it arrives, instead of waiting for all data to be collected first. It allows teams to build systems that react faster, update metrics continuously, detect patterns in near real time, and serve more timely data products.

This post explains stream processing from the ground up. It is written for data engineers, analysts, platform engineers, and technical stakeholders who may already understand batch ETL, SQL pipelines, Spark, Hive, Airflow, or data lake architectures, but want a clear mental model for streaming systems.

By the end, batch should feel like one specific form of data processing, and streaming should feel less mysterious.

---

## 1. Why Streaming Matters

Data is now generated continuously.

Examples include:

- A student opening a course page
- A customer making a payment
- A user clicking a button in an application
- A professor publishing course content
- A database row changing in an operational system
- A system log being emitted by a service
- A sensor sending a reading
- A fraud detection signal arriving from a payment network

In a pure batch model, these events are usually stored first and processed later. For example, a daily ETL job might run at midnight and calculate yesterday's active users, revenue, or course engagement.

That works well when latency is not critical. However, many business use cases require faster action.

Streaming becomes valuable when the business wants to respond before the batch window closes.

Common examples include:

- Fraud detection
- Operational alerting
- Near-real-time dashboards
- Dynamic pricing
- Personalization
- Real-time recommendation
- Customer activity monitoring
- Continuous data quality checks
- Change data capture pipelines
- Continuously updated analytical tables

The core shift is simple:

> Instead of storing all data first and computing later, we compute continuously as data arrives.

This does not mean batch is obsolete. Batch processing remains essential for historical recomputation, model training, large-scale backfills, and offline analytics. Streaming adds another capability: low-latency continuous computation.

---

## 2. Batch Processing Recap

Before understanding streaming, it helps to revisit the batch mental model.

In batch processing:

- The input is finite.
- The job runs on a schedule.
- The system computes over a bounded slice of data.
- The output is usually a complete result for that slice.
- Failure handling is often done by rerunning the batch.

A typical batch pipeline looks like this:

\`\`\`text
Raw Data → Batch Job → Output Table
\`\`\`

For example:

\`\`\`text
Yesterday's transactions → Daily ETL Job → Daily Revenue Table
\`\`\`

Batch is excellent when:

- The dataset is complete for the period being processed.
- Latency of minutes or hours is acceptable.
- Recomputing the full result is practical.
- Correctness is easier to reason about because the input is bounded.
- Historical backfills or reprocessing are required.

Typical batch use cases include:

- Daily revenue reports
- Nightly dimensional loads
- End-of-day account balances
- Historical customer segmentation
- Model training datasets
- Large-scale reconciliation jobs

Batch processing is still one of the most important tools in data engineering. The goal of streaming is not to replace batch everywhere. The goal is to handle use cases where waiting for a batch window is too slow or where continuous updates are more natural.

---

## 3. Streaming Processing Mental Model

Streaming has a different mental model.

In stream processing:

- The input is unbounded.
- The job is usually always running.
- Results are updated incrementally.
- The system often keeps state to remember history.
- Failure recovery requires restoring both computation state and source positions.
- Time must be modeled explicitly.

A simple streaming flow looks like this:

\`\`\`text
Event 1
Event 2
Event 3
Event 4
   ↓
Streaming Job
   ↓
Updated Result 1
Updated Result 2
Updated Result 3
\`\`\`

A streaming job does not wait for "all the data" because, in an active system, there may never be a final end to the stream.

A useful intuition is:

> Batch is a query over a bounded table. Streaming is a continuous query over an ever-growing table.

For example, imagine calculating the number of active students.

In batch:

\`\`\`sql
SELECT COUNT(DISTINCT student_id)
FROM activity
WHERE activity_date = '2026-04-23';
\`\`\`

The query runs after the day has ended.

In streaming, the logic is closer to:

\`\`\`text
For every new activity event:
  update the active student count
  emit the latest result
\`\`\`

The result can be updated every few seconds, every minute, or whenever a relevant event arrives.

---

## 4. Batch vs Streaming: Key Differences

| Aspect | Batch Processing | Stream Processing |
|---|---|---|
| Dataset shape | Finite / bounded | Infinite / unbounded |
| Execution | Scheduled jobs | Long-running applications |
| Output | Complete snapshot | Incremental updates |
| Latency | Minutes to hours | Seconds to milliseconds |
| Memory of past | Usually stored in input tables | Maintained as processing state |
| Failure handling | Re-run the batch | Recover state and resume |
| Time model | Often implicit | Must be explicit |
| Common tools | Spark, Hive, dbt, Airflow | Flink, Kafka Streams, Spark Structured Streaming |
| Best for | Historical analytics, backfills | Real-time logic, continuous updates |

The most important conceptual difference is that streaming systems often need to remember what happened before. That memory is called **state**.

---

## 5. Core Streaming Concepts

To understand streaming systems, you need a few foundational concepts.

### Event

An event is a single record describing something that happened.

Examples:

\`\`\`json
{
  "event_id": "evt_001",
  "student_id": "s123",
  "course_id": "c456",
  "event_type": "lesson_started",
  "event_time": "2026-04-24T10:15:00Z"
}
\`\`\`

Other examples include:

- A payment event
- A click event
- A login event
- A CDC update event
- A device measurement
- A log message

### Stream

A stream is a continuous flow of events.

Examples:

- A Kafka topic containing user activity events
- A CDC stream from a database
- A stream of payment transactions
- A stream of application logs

### Operator

An operator is a processing step that transforms events.

Common operators include:

- \`map\`: transform each event
- \`filter\`: remove events that do not match a condition
- \`join\`: combine events with another stream or table
- \`aggregate\`: calculate counts, sums, averages, or other metrics
- \`window\`: group events into time-based slices
- \`sink\`: write results somewhere

### Key

A key is the field used to group events.

Examples:

- \`student_id\`
- \`account_id\`
- \`customer_id\`
- \`course_id\`
- \`organization_id\`

Keying is important because many streaming calculations happen per entity.

For example:

\`\`\`text
Count lesson views per student
\`\`\`

requires grouping events by \`student_id\`.

### State

State is data remembered between events.

For example, if we want to count events per student, the system must remember the current count for each student.

\`\`\`text
student_id = s123
current_count = 27
\`\`\`

When a new event for \`s123\` arrives, the count becomes 28.

State is what makes streaming powerful, but it is also what makes streaming operationally complex.

### Window

A window is a finite slice of an unbounded stream.

Because streams do not naturally end, we often create windows such as:

- every 5 minutes
- every 1 hour
- last 10 minutes, updated every 1 minute
- a user session that ends after 30 minutes of inactivity

Windows allow us to produce meaningful results over bounded time ranges.

### Watermark

A watermark is an estimate of event-time progress.

It helps the engine decide when it is safe to close an event-time window, even when events may arrive out of order.

A simple way to understand a watermark is:

> "I do not expect future events with event time earlier than this watermark."

Watermarks are essential for handling real-world streams where data can arrive late.

---

## 6. Stateless vs Stateful Processing

Not all streaming jobs need state.

### Stateless Streaming

In stateless processing, the output depends only on the current event.

Examples:

- Parse JSON
- Validate schema
- Remove invalid records
- Rename fields
- Mask sensitive values
- Route events to different topics
- Enrich using a static lookup

Example:

\`\`\`text
Input event:
  {"amount": "100.50"}

Transformation:
  convert amount from string to decimal

Output event:
  {"amount": 100.50}
\`\`\`

The job does not need to remember previous events.

Stateless processing is easier to scale, easier to recover, and easier to reason about.

### Stateful Streaming

In stateful processing, the output depends on the current event plus previous events.

Examples:

- Count events per user
- Deduplicate repeated messages
- Track user sessions
- Detect fraud patterns
- Join streams over time
- Calculate rolling averages
- Maintain latest status per entity

Example:

\`\`\`text
New transaction arrives for account A.
System checks the last 10 transactions for account A.
If the new transaction looks suspicious, emit an alert.
\`\`\`

This requires remembering previous transactions. That memory is state.

Stateful streaming is powerful because it can answer questions such as:

> What happened before this event?

But it also introduces new responsibilities:

- State must be stored somewhere.
- State must be recovered after failure.
- State size must be controlled.
- State access must be efficient.
- State cleanup or TTL must be designed carefully.

---

## 7. Keyed State vs Operator State

In systems like Apache Flink, state can be understood in two common forms: keyed state and operator state.

### Keyed State

Keyed state is state maintained per key.

For example:

\`\`\`text
student A → state A
student B → state B
student C → state C
\`\`\`

If we calculate course activity per student, each student has separate state.

Keyed state is common for business logic because business entities are usually key-based.

Examples:

- Count payments per account
- Track latest course progress per student
- Deduplicate events by user
- Maintain session state per visitor
- Calculate rolling risk score per customer

### Operator State

Operator state belongs to a parallel operator instance rather than a business key.

For example:

\`\`\`text
subtask 1 → state 1
subtask 2 → state 2
subtask 3 → state 3
\`\`\`

Operator state is often used by sources and sinks, such as remembering which partitions or files an operator instance is responsible for.

Most application-level business logic uses keyed state, while lower-level connector logic often uses operator state.

---

## 8. Time in Streaming

Time is one of the most important topics in stream processing.

There are three common time concepts.

### Event Time

Event time is when the event actually happened in the real world.

Example:

\`\`\`json
{
  "event_type": "payment_completed",
  "event_time": "2026-04-24T10:15:00Z"
}
\`\`\`

Event time is usually the best choice when you care about business truth.

For example, if a payment happened at 10:15, it belongs to the 10:00–11:00 business hour, even if it was processed at 10:20.

### Processing Time

Processing time is when the streaming engine processes the event.

This can differ from event time because of:

- Network delay
- Queue buffering
- Retries
- Source lag
- Consumer lag
- System downtime
- Backpressure

Processing time is simpler, but it may not match business reality.

### Ingestion Time

Ingestion time is when the event first enters the streaming system.

For example, an event may occur at 10:15, arrive in Kafka at 10:16, and be processed by Flink at 10:17.

\`\`\`text
Event time      = 10:15
Ingestion time  = 10:16
Processing time = 10:17
\`\`\`

### Why Time Matters

Events do not always arrive in the same order in which they happened.

Imagine two events:

\`\`\`text
Event B happened at 10:02
Event C happened at 10:05
\`\`\`

But due to network delay, Event C may arrive before Event B.

\`\`\`text
Arrival order:
C
B
\`\`\`

If the system uses processing time, it may produce incorrect business results. If it uses event time, it can place each event into the correct business time window.

The practical lesson is:

> If you care about business truth, event time usually matters more than processing time.

---

## 9. Why Windows Exist

Many streaming aggregations never naturally finish.

For example:

\`\`\`text
Count all events forever
\`\`\`

This result can keep changing forever because new events keep arriving.

To make results meaningful, we introduce windows.

A window creates a finite view over an unbounded stream.

Common window types are:

1. Tumbling windows
2. Sliding windows
3. Session windows

---

## 10. Tumbling Windows

A tumbling window is fixed-size and non-overlapping.

Example:

\`\`\`text
[10:00, 10:05)
\`\`\`

Each event belongs to exactly one window.

Use tumbling windows for periodic summaries.

Examples:

- Transactions per minute
- Revenue every 5 minutes
- Active users per hour
- Course views per day
- Error count every 10 minutes

Example logic:

\`\`\`text
For each 5-minute window:
  count events by course_id
\`\`\`

Tumbling windows are simple and easy to explain to business users.

---

## 11. Sliding Windows

A sliding window has two parameters:

- Window size
- Slide interval

For example:

\`\`\`text
Window size: 10 minutes
Slide interval: 1 minute
\`\`\`

This means:

\`\`\`text
[10:00, 10:10)
[10:01, 10:11)
[10:02, 10:12)
[10:03, 10:13)
\`\`\`

Windows overlap, so one event can belong to multiple windows.

Sliding windows are useful for rolling metrics.

Examples:

- Last 10 minutes of transactions, updated every minute
- Rolling 1-hour active users
- Moving average of API latency
- Fraud pattern over the last 15 minutes
- Course engagement over the last 7 days, updated hourly

Sliding windows give smoother, more frequently updated results than tumbling windows, but they require more computation and state because events may be included in multiple windows.

---

## 12. Session Windows

A session window is based on activity separated by inactivity gaps.

Unlike tumbling and sliding windows, session windows are not fixed-size.

Example:

\`\`\`text
User activity:
10:00 click
10:01 click
10:03 click

No activity for 30 minutes

10:40 click
10:42 click
\`\`\`

With a 30-minute inactivity gap, the first three clicks belong to one session, and the later clicks belong to another session.

Session windows are useful for behavior analysis.

Examples:

- Website sessions
- App usage sessions
- Student learning sessions
- Shopping sessions
- Bursts of transactions
- Device activity periods

Session windows are especially helpful when user behavior is irregular and cannot be represented well by fixed time windows.

---

## 13. Watermarks and Out-of-Order Data

Real-world streams often arrive out of order.

Example:

\`\`\`text
Event A happened at 10:01 and arrived at 10:01
Event B happened at 10:02 and arrived at 10:05
Event C happened at 10:03 and arrived at 10:03
\`\`\`

Event B happened before Event C but arrived after it.

This creates a problem for event-time windows.

Suppose we have a window:

\`\`\`text
[10:00, 10:05)
\`\`\`

When should the system close this window and emit the final result?

If it closes too early, late events may be missed.

If it waits too long, latency becomes high and state must be kept longer.

A watermark helps solve this trade-off.

A watermark says:

> I believe that events earlier than this timestamp are unlikely to arrive.

For example:

\`\`\`text
Watermark = 10:05
\`\`\`

This means the system assumes it has probably seen all events up to 10:05.

When the watermark passes the end of a window, the system can close the window and emit results.

Watermarks are not guarantees from physics. They are practical estimates. Choosing a watermark strategy is a business and engineering decision.

---

## 14. Late Data

Late data is data that arrives after the system has already considered its event-time window complete.

Example:

\`\`\`text
Window: [10:00, 10:05)
Watermark has passed 10:05
Event arrives with event_time = 10:02
\`\`\`

This event is late.

There are several ways to handle late data.

### Option 1: Drop Late Data

This is the simplest option.

Advantages:

- Low latency
- Less state
- Simple logic

Disadvantages:

- Results may be incomplete
- Late but valid business events are ignored

This can be acceptable for monitoring dashboards where approximate freshness matters more than perfect completeness.

### Option 2: Allow Lateness

The system keeps the window open for a grace period.

Example:

\`\`\`text
Window size: 5 minutes
Allowed lateness: 2 minutes
\`\`\`

A window ending at 10:05 may accept late events until 10:07.

Advantages:

- More complete results
- Handles common delays

Disadvantages:

- Higher latency
- More state retained
- More operational complexity

### Option 3: Emit Updates

The system emits an initial result and later emits corrections if late events arrive.

Example:

\`\`\`text
Initial result:
10:00–10:05 revenue = $10,000

Late event arrives:
Corrected result:
10:00–10:05 revenue = $10,200
\`\`\`

Advantages:

- Better correctness
- Works well with upsert-capable sinks

Disadvantages:

- Downstream systems must handle updates
- BI tools and tables must support correction semantics

### Option 4: Side Output

Late data can be routed to a separate stream or table for inspection or reprocessing.

Advantages:

- No data is silently lost
- Useful for debugging and data quality analysis
- Allows manual or batch correction

Disadvantages:

- Requires additional operational process

### The Latency vs Completeness Trade-Off

Watermark and lateness configuration always involve a trade-off.

\`\`\`text
Tighter watermark → lower latency, more incomplete results
Looser watermark  → higher completeness, higher latency and state cost
\`\`\`

There is no universal correct answer. The right choice depends on the business requirement.

---

## 15. Fault Tolerance in Streaming

Streaming jobs are long-running applications. They may run for days, weeks, or months.

They must survive failures such as:

- Worker crash
- Network issue
- Deployment restart
- Source outage
- Sink outage
- Cluster rescaling
- Infrastructure failure

In batch processing, failure recovery often means rerunning a job.

In streaming, failure recovery means restoring the job to a consistent point and continuing from there.

This requires saving:

- Operator state
- Source offsets or positions
- In-flight progress
- Consistent checkpoint metadata

In Apache Flink, this is done through checkpoints.

---

## 16. Checkpointing

A checkpoint is a consistent snapshot of a streaming job's state.

A checkpoint usually includes:

- Current operator state
- Current source positions or offsets
- A consistent point across the distributed dataflow

A simplified view:

\`\`\`text
Source → Operator 1 → Operator 2 → Sink
             ↓             ↓
          snapshot      snapshot
\`\`\`

If the job fails, Flink can restart from the latest successful checkpoint.

This allows the system to continue processing without losing track of what it has already processed.

Checkpointing is one of the core reasons stateful streaming can be reliable.

---

## 17. Processing Guarantees

Streaming systems often describe reliability using processing guarantees.

### At-Most-Once

At-most-once means each event is processed zero or one time.

If a failure happens, some records may be lost.

Advantages:

- Fast
- Low overhead

Disadvantages:

- Data loss is possible

Use this only when occasional loss is acceptable.

### At-Least-Once

At-least-once means each event is processed one or more times.

No records should be lost, but duplicates may happen after failure.

Advantages:

- No data loss
- Easier than exactly-once

Disadvantages:

- Duplicates are possible
- Sinks must handle deduplication or idempotency

This is common in many real-world systems.

### Exactly-Once

Exactly-once means each event affects the final result once, even if failures happen.

This is the strongest and most desirable guarantee, but it is also the hardest to achieve end to end.

Important nuance:

> Exactly-once is only end-to-end if the sink also participates correctly.

The processing engine alone cannot guarantee correctness if the downstream sink writes records in a non-atomic or non-idempotent way.

For example, if Flink processes a payment event exactly once internally but the sink writes the output twice to an external database after a retry, the end-to-end result is not exactly-once.

Exactly-once requires cooperation between:

- Source
- Processing engine
- State backend
- Checkpointing mechanism
- Sink
- Commit protocol

---

## 18. Flink Checkpoint Barriers

Apache Flink uses checkpoint barriers to create consistent distributed snapshots.

A checkpoint barrier is a special marker that flows through the stream along with normal data records.

Imagine an operator with two input channels:

\`\`\`text
Channel 1: a1, a2, Barrier 42, a3
Channel 2: b1, b2, b3, Barrier 42
\`\`\`

The operator can only take checkpoint 42 after it has received Barrier 42 from all input channels.

This is important because the checkpoint must represent a consistent boundary across all inputs.

If one input has passed the checkpoint boundary and another has not, the operator must align them.

In simple terms:

1. Barrier 42 arrives on channel 1.
2. Channel 2 has not received Barrier 42 yet.
3. Flink temporarily aligns or buffers records as needed.
4. Barrier 42 arrives on channel 2.
5. The operator snapshots its state.
6. The checkpoint can continue downstream.

This mechanism allows Flink to create consistent snapshots even when jobs are distributed and parallel.

---

## 19. Why Barrier Alignment Matters

Barrier alignment matters because records must not cross checkpoint boundaries incorrectly.

Without consistent checkpointing, recovery could produce incorrect results.

For example:

- Some records may be included in state but their source offsets may not be checkpointed.
- Some records may be checkpointed as consumed but not reflected in state.
- A join or aggregate may restore to an inconsistent intermediate condition.

Barrier alignment helps ensure that:

- Source offsets and operator state match.
- Multi-input operators are consistent.
- Exactly-once semantics are possible.
- Recovery resumes from a well-defined point.

This is one of the reasons stream processing engines are more complex than simple message consumers.

---

## 20. Backpressure

Backpressure happens when a downstream part of the pipeline cannot keep up, causing upstream stages to slow down.

Example:

\`\`\`text
Source → Fast Operator → Slow Sink / Database → Storage
\`\`\`

If the sink is slow, records accumulate before the sink. Eventually, the fast operator slows down. Then the source slows down.

Backpressure is not always bad. It is a healthy signal that prevents unlimited queue growth. However, it has operational consequences.

### Common Causes of Backpressure

Backpressure can be caused by:

- Slow external sink
- Database write bottleneck
- Skewed key distribution
- Expensive serialization
- Slow state access
- Insufficient parallelism
- Network bottleneck
- Large checkpoints
- Inefficient user code
- Hot partitions in Kafka
- Small files or commit bottlenecks in lakehouse sinks

### Symptoms of Backpressure

Common symptoms include:

- Growing end-to-end lag
- Rising checkpoint duration
- Busy or blocked tasks
- Queue buildup
- Sink lag
- Increased processing latency
- Slower watermark progress
- Larger state retention
- Delayed output

The practical lesson is:

> Throughput is limited by the slowest stage.

### How to Investigate Backpressure

When backpressure appears, useful questions include:

1. Is the sink slow?
2. Is one key or partition much hotter than others?
3. Are checkpoints taking longer than expected?
4. Is state too large?
5. Is serialization or deserialization expensive?
6. Is the job under-parallelized?
7. Is the source producing more data than the system can handle?
8. Are there external service limits?

Backpressure should be monitored continuously in production streaming systems.

---

## 21. End-to-End Architecture: Kafka → Flink → Iceberg

A common modern streaming architecture is:

\`\`\`text
Applications / CDC / Logs
        ↓
      Kafka
        ↓
      Flink
        ↓
     Iceberg
        ↓
BI / SQL / ML / Downstream Applications
\`\`\`

Each layer has a specific responsibility.

---

## 22. Kafka's Role

Kafka acts as the durable event log.

Its responsibilities include:

- Accepting events from producers
- Storing events durably
- Partitioning events for scalability
- Allowing consumers to replay data
- Decoupling producers and consumers
- Supporting multiple independent consumers

Kafka is not just a queue. It is an append-only distributed log.

This makes it useful for streaming systems because consumers can process data at their own pace, and failed jobs can replay from previous offsets.

Example Kafka topics:

\`\`\`text
student_activity_events
payment_transactions
course_content_changes
database_cdc_users
application_logs
\`\`\`

Good topic design is important. Partitioning strategy affects ordering, scalability, and downstream state distribution.

For example, if events are keyed by \`student_id\`, all events for the same student can go to the same partition, helping preserve per-student order.

---

## 23. Flink's Role

Flink is the continuous compute engine.

Its responsibilities include:

- Reading from streams such as Kafka
- Parsing and validating events
- Filtering bad records
- Enriching events
- Applying event-time logic
- Managing windows and watermarks
- Maintaining state
- Performing joins and aggregations
- Creating checkpoints
- Recovering from failures
- Writing results to sinks

Flink is especially strong for stateful event-time processing.

Example Flink logic:

\`\`\`text
Read payment events from Kafka
Validate schema
Key by account_id
Maintain recent transaction history
Detect suspicious patterns
Write alerts to Kafka
Write aggregates to Iceberg
\`\`\`

---

## 24. Iceberg's Role

Apache Iceberg provides a table abstraction on top of data lake storage.

Its responsibilities include:

- Managing table metadata
- Supporting snapshots
- Supporting schema evolution
- Supporting partition evolution
- Allowing reliable analytical reads
- Serving batch and interactive query engines
- Supporting time travel and rollback patterns
- Making lake data easier to consume like tables

In a Kafka → Flink → Iceberg architecture, Iceberg often becomes the analytical serving layer.

Flink writes continuously updated data into Iceberg tables. Then engines such as Spark, Trino, Athena, or other SQL tools can query those tables.

This allows streaming outputs to become part of the broader lakehouse.

---

## 25. Example Data Flow

Consider a payment processing example.

1. A user makes a payment.
2. The application emits a payment event.
3. The event is written to a Kafka topic.
4. Flink consumes the event from Kafka.
5. Flink validates the schema.
6. Invalid events are routed to a bad-record topic or quarantine table.
7. Valid events are keyed by \`account_id\`.
8. Stateful logic updates recent account activity.
9. The job detects whether the transaction is suspicious.
10. Alerts are written to an alert topic.
11. Aggregated metrics are written to Iceberg.
12. BI dashboards query the Iceberg table.
13. Batch jobs later use Iceberg data for model training and audit.

This pattern gives both immediacy and durability.

Kafka provides replay. Flink provides low-latency logic. Iceberg provides reliable analytical consumption.

---

## 26. Batch and Streaming Together

Streaming and batch are not enemies.

Most mature systems use both.

Streaming is good for:

- Low-latency updates
- Real-time alerting
- Continuous metrics
- Event-driven applications
- Online feature updates
- CDC propagation

Batch is good for:

- Historical backfills
- Full recomputation
- Large-scale reconciliation
- Offline analytics
- Model training
- Reprocessing with improved logic
- Cost-efficient processing of large historical ranges

A useful conceptual model is:

\`\`\`text
Kafka  = operational event log
Flink  = continuous compute engine
Iceberg = durable analytical serving layer
Batch  = backfill, audit, training, and recomputation layer
\`\`\`

Streaming gives immediacy. Batch gives completeness.

A strong data platform usually needs both.

---

## 27. When to Use Stateful Streaming

Use stateful streaming when your logic depends on history.

Good use cases include:

### Aggregation Over Time

Examples:

- Running totals
- Rolling averages
- Events per user per hour
- Revenue per merchant per minute
- Active students per course

### Entity-Level Tracking

Examples:

- Latest account status
- Current user session
- Last known device state
- Course progress per student
- Subscription status per organization

### Event Correlation

Examples:

- Join login events with payment events
- Detect sequence of suspicious actions
- Match order events with shipment events
- Track user journey across pages

### Deduplication

Examples:

- Remember processed event IDs
- Remove duplicate CDC messages
- Prevent repeated alerts
- Ensure idempotent processing

### Fraud Detection

Examples:

- Too many transactions in a short time
- Impossible travel pattern
- Repeated failed attempts
- Sudden behavior change
- High-risk sequence of events

The key signal is whether you need to answer:

> What happened before this event?

If yes, stateful streaming may be appropriate.

---

## 28. When Not to Use Stateful Streaming

Do not use stateful streaming if your problem does not require memory.

Stateful streaming adds operational complexity. It should be justified.

Better alternatives may include:

### Stateless Streaming

Use stateless streaming for:

- Parsing
- Filtering
- Routing
- Simple enrichment
- Format conversion
- Data masking
- Basic validation

### Batch Processing

Use batch processing for:

- Large historical recomputation
- Offline analytics
- Model training
- Monthly reporting
- Full data reconciliation
- Backfills
- Non-urgent transformations

### Warning Signs

Be careful with stateful streaming when you hear:

> "We can recompute everything later anyway."

> "Latency does not really matter."

> "State would grow forever and we do not have a cleanup rule."

> "The downstream system only consumes daily reports."

> "The logic changes frequently and requires full historical correction."

A good rule of thumb:

> If you do not need history in real time, do not introduce state.

---

## 29. What Each Processing Paradigm Can and Cannot Solve

| Capability | Stateless Streaming | Stateful Streaming | Batch |
|---|---|---|---|
| Low latency | Yes | Yes | No |
| History awareness | No | Yes | Yes |
| Continuous results | Yes | Yes | No |
| Full recomputation | No | Hard | Yes |
| Complex joins | Limited | Yes | Yes |
| Backfills | No | Difficult | Yes |
| Operational simplicity | Medium | Hard | Medium |
| Best for | Filtering, routing | Real-time logic | Historical analytics |

No single paradigm solves everything.

The best architecture depends on the business problem.

---

## 30. Example Story: Fraud Detection

Imagine a banking system that needs to detect suspicious transactions.

### Stateless Streaming Is Not Enough

A stateless job can inspect each transaction independently.

It can answer:

\`\`\`text
Is this transaction amount greater than $10,000?
\`\`\`

But it cannot easily answer:

\`\`\`text
Has this account made 10 transactions in the last 2 minutes?
\`\`\`

That requires memory.

### Batch Processing Is Too Late

A batch job can detect fraud patterns after collecting all transactions for the day.

But if detection happens hours later, the fraud may already be completed.

### Stateful Streaming Works Better

A stateful streaming job can:

- Track recent transactions per account
- Detect unusual frequency
- Compare behavior against recent history
- Emit alerts immediately
- Update risk scores continuously

However, batch is still useful later for:

- Model training
- Audit
- Reconciliation
- Historical investigation
- Recomputing labels with improved rules

The takeaway:

> Streaming gives immediacy. Batch gives completeness.

---

## 31. Practical Advice for Data Engineers

### Start With the Business Latency Requirement

Do not start with the tool.

Ask:

- How fresh does the result need to be?
- Seconds?
- Minutes?
- Hours?
- Daily?
- What decision depends on this result?
- What happens if the result is late?
- What happens if the result is incomplete?

If daily is enough, batch may be better. If action is needed immediately, streaming may be justified.

### Be Explicit About Event Time

Decide which timestamp represents business truth.

For example:

- \`created_at\`
- \`updated_at\`
- \`transaction_time\`
- \`event_time\`
- \`source_commit_time\`

Do not assume processing time is good enough.

### Define Watermark and Late Data Policy

Every event-time streaming system needs a clear policy for late data.

Decide:

- How late can events reasonably arrive?
- Should late events be dropped?
- Should windows allow lateness?
- Should corrections be emitted?
- Should late events go to a side output?
- How will downstream consumers handle updates?

### Choose Keys Carefully

Keys determine state distribution.

Bad keys can create skew.

Example:

\`\`\`text
country = "US"
\`\`\`

may send too much data to one key.

Better keys are usually higher-cardinality business entities:

\`\`\`text
student_id
account_id
device_id
course_id
organization_id
\`\`\`

But even high-cardinality keys can have hot spots, so monitor distribution.

### Think About Sink Semantics Early

The sink is part of the correctness story.

Ask:

- Is the sink append-only?
- Does it support upserts?
- Does it support transactions?
- Is writing idempotent?
- Can it participate in checkpointing?
- Can it handle duplicate writes?
- Can it handle corrections?

Exactly-once inside Flink does not automatically mean exactly-once in the final table or database.

### Monitor the Right Signals

For streaming jobs, monitor:

- Source lag
- End-to-end latency
- Watermark delay
- Checkpoint duration
- Checkpoint failures
- State size
- Backpressure
- Throughput
- Sink error rate
- Restart count
- Late event volume
- Dead-letter queue volume

Streaming systems are always running, so observability is not optional.

### Keep a Replay Story

Streaming logic changes.

Business rules evolve.

Schemas change.

Bugs happen.

You need to know how to rebuild results.

Ask:

- Can we replay from Kafka?
- How long is Kafka retention?
- Are raw events stored in the data lake?
- Can we run a batch backfill?
- Are outputs reproducible?
- Do we version business logic?
- Can downstream tables be corrected?

A streaming architecture without a replay story is fragile.

---

## 32. Common Misunderstandings

### Misunderstanding 1: Streaming Means Every Record Must Be Processed Instantly

Not exactly.

Streaming means data is processed continuously. The latency target may be milliseconds, seconds, minutes, or even longer.

The right latency depends on the business need.

### Misunderstanding 2: State Is Just Engine Metadata

No.

State often contains real business data remembered by the computation.

Examples:

- Recent transactions per account
- Current session per user
- Deduplication IDs
- Running aggregates
- Latest entity status

State must be treated carefully because it affects correctness.

### Misunderstanding 3: Kafka Ordering Solves Event-Time Ordering

Kafka preserves ordering only within a partition.

Even within a partition, event time and arrival time may differ.

If business correctness depends on when events actually happened, you still need event time and watermark logic.

### Misunderstanding 4: Exactly-Once Is Automatic Everywhere

No.

Exactly-once is end-to-end only if the entire pipeline supports it.

That includes:

- Source
- Processing engine
- Checkpointing
- State backend
- Sink
- Commit protocol
- Downstream consumption model

### Misunderstanding 5: Streaming Replaces Batch

No.

Streaming and batch solve different problems.

Streaming is for low-latency continuous updates. Batch is for historical recomputation, backfills, and large-scale offline processing.

---

## 33. Design Checklist for a Streaming Use Case

Before building a streaming pipeline, answer these questions.

### Business Questions

- What business problem are we solving?
- What decision depends on this data?
- What is the required latency?
- What is the acceptable error or incompleteness?
- Who consumes the output?
- Is the output operational, analytical, or both?

### Data Questions

- What is the source of events?
- Are events immutable?
- Do events have stable IDs?
- What timestamp represents event time?
- Can events arrive late?
- Can events arrive out of order?
- Can duplicates occur?
- Can schema change?

### Processing Questions

- Is the processing stateless or stateful?
- What key should be used?
- What state is required?
- How large can state grow?
- What is the state TTL?
- Are windows needed?
- What type of window is appropriate?
- What watermark strategy is appropriate?

### Reliability Questions

- What processing guarantee is required?
- Is at-least-once enough?
- Is exactly-once required?
- Can the sink handle duplicate or corrected records?
- What happens on failure?
- How are checkpoints configured?
- How long should checkpoint retention be?

### Operational Questions

- What metrics will be monitored?
- How will backpressure be detected?
- What is the alerting strategy?
- What is the replay strategy?
- Who owns the job?
- What is the SLA?
- How are deployments handled?

### Consumption Questions

- Where will outputs be written?
- Are outputs append-only or upserted?
- Can BI tools consume the results correctly?
- Do downstream systems expect corrections?
- Are table schemas stable?
- Is metadata documented?

---

## 34. Streaming Architecture Patterns

### Pattern 1: Kafka to Flink to Kafka

\`\`\`text
Kafka input topic → Flink → Kafka output topic
\`\`\`

Use this when the output is another event stream.

Examples:

- Real-time alerts
- Enriched events
- Routed events
- Cleaned event stream

### Pattern 2: Kafka to Flink to Iceberg

\`\`\`text
Kafka input topic → Flink → Iceberg table
\`\`\`

Use this when the output should be queryable by analytical engines.

Examples:

- Near-real-time facts
- Aggregated metrics
- Cleaned CDC tables
- Analytics-ready event tables

### Pattern 3: CDC to Kafka to Flink to Lakehouse

\`\`\`text
Operational DB → CDC → Kafka → Flink → Iceberg
\`\`\`

Use this when operational database changes need to become analytical tables.

Examples:

- Customer dimension updates
- Order status changes
- Account balance updates
- Product catalog changes

### Pattern 4: Flink for Real-Time, Batch for Backfill

\`\`\`text
Streaming path:
Kafka → Flink → Serving table

Batch path:
Raw historical data → Spark/dbt → Serving table
\`\`\`

Use this when you need both low-latency updates and historical correction.

This pattern is common in mature data platforms.

---

## 35. Operational Maturity Levels

Streaming systems usually mature in stages.

### Level 1: Basic Streaming

- Read from Kafka
- Transform events
- Write to sink
- Minimal state
- Basic monitoring

### Level 2: Stateful Streaming

- Keyed state
- Windows
- Watermarks
- Checkpoints
- Late data policy
- Basic replay

### Level 3: Production Streaming

- Clear ownership
- SLA and alerting
- Backpressure monitoring
- Dead-letter handling
- Schema governance
- Data quality checks
- Reliable deployment process

### Level 4: Platform-Grade Streaming

- Standard templates
- Self-service patterns
- Reusable connectors
- Metadata integration
- Automated lineage
- Cost monitoring
- Disaster recovery
- Cross-team governance
- Unified batch and streaming model

The goal should not be to build the most complex system on day one. Start with a clear use case and mature gradually.

---

## 36. Key Takeaways

Stream processing is continuous computation over unbounded data.

The most important ideas are:

- Events represent things that happened.
- Streams are continuous flows of events.
- Operators transform, filter, join, and aggregate events.
- State lets streaming applications remember history.
- Windows create finite slices over infinite streams.
- Event time is usually better for business correctness than processing time.
- Watermarks help decide when event-time windows are complete enough.
- Late data must be handled explicitly.
- Checkpoints allow stateful jobs to recover from failure.
- Exactly-once requires cooperation between source, engine, and sink.
- Backpressure is a normal but important operational signal.
- Kafka, Flink, and Iceberg form a practical modern data lake streaming architecture.
- Streaming and batch should usually work together, not compete.

The final mental model is:

\`\`\`text
Batch:
  Process a bounded dataset and produce a result.

Streaming:
  Continuously process an unbounded dataset and keep results updated.
\`\`\`

Or even shorter:

> Batch gives completeness. Streaming gives immediacy. A strong data platform usually needs both.

---

## Appendix: Quick Reference

### Core Terms

| Term | Meaning |
|---|---|
| Event | One record describing something that happened |
| Stream | Continuous flow of events |
| Operator | Processing step such as map, filter, join, aggregate |
| Key | Field used to group events |
| State | Data remembered between events |
| Window | Finite slice of an unbounded stream |
| Watermark | Estimate of event-time progress |
| Late data | Event that arrives after its window is considered complete |
| Checkpoint | Consistent snapshot of streaming job state |
| Backpressure | Downstream slowdown propagating upstream |

### Window Types

| Window Type | Description | Example Use Case |
|---|---|---|
| Tumbling | Fixed-size, non-overlapping | Revenue every 5 minutes |
| Sliding | Fixed-size, overlapping | Last 10 minutes, updated every minute |
| Session | Activity-based, separated by inactivity | User browsing sessions |

### Processing Guarantees

| Guarantee | Meaning |
|---|---|
| At-most-once | Records may be lost, but not duplicated |
| At-least-once | Records are not lost, but may be duplicated |
| Exactly-once | Each record affects the result once, if source and sink support it |

### Architecture Roles

| Layer | Responsibility |
|---|---|
| Kafka | Durable event log, replay, partitioning, decoupling |
| Flink | Stateful/stateless stream processing, event-time logic, checkpoints |
| Iceberg | Analytical table abstraction, snapshots, schema/partition evolution |

### Practical Rule of Thumb

Use streaming when:

- Latency matters
- Events arrive continuously
- The business needs continuous updates
- Real-time state or correlation is required

Use batch when:

- Latency does not matter
- Full recomputation is needed
- Historical correction is required
- Large offline processing is more cost-effective

Use both when:

- You need real-time outputs and historical correctness
- You need low-latency dashboards plus backfills
- You need immediate alerts plus later audit/reconciliation

**By Anh Duc Le**  
*Senior Data Engineer & AI Researcher*`,
  },
];

export default blogPosts;
