# Task Scheduler - Efficient Task Management

A lightweight task scheduler for a to-do application that demonstrates efficient solutions for sorting, grouping by priority, and detecting overlapping tasks, with comprehensive time and space complexity analysis.

## Features

1. **Sort tasks by start time** - Efficient O(n log n) sorting
2. **Group tasks by priority** - O(n) using hash maps
3. **Detect overlapping tasks** - O(n log n) using interval scheduling pattern
4. **Memory estimation** - Analyze space complexity

## Data Structures Used

| Feature              | Data Structure | Time Complexity | Space Complexity |
|----------------------|----------------|-----------------|------------------|
| Sort by start time   | Array + sort   | O(n log n)      | O(1) or O(n)*    |
| Group by priority    | Object/Map     | O(n)            | O(n)             |
| Detect overlaps      | Array + sort   | O(n log n)      | O(k) where k = overlaps |
| Memory estimation    | -              | O(1)            | O(1)             |

*JavaScript's `sort()` may use O(n) space depending on implementation

## Optimization Analysis

### Original vs Optimized

| Operation | Naive Approach | Optimized Approach |
|-----------|----------------|-------------------|
| Sort tasks | O(n²) bubble sort | O(n log n) built-in sort |
| Group by priority | O(n) with if-else | O(n) with hash map |
| Overlap detection | O(n²) nested loops | O(n log n) with sorting |
| Memory | O(n) | O(n) - optimal for storage |

### Key Optimizations

- **Sorting**: Uses JavaScript's native Timsort (O(n log n))
- **Grouping**: Hash map (object) for O(1) lookups
- **Overlap detection**: Sorted intervals to reduce comparisons
- **Space**: Only stores necessary data, no duplication

