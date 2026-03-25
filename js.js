class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    // Add a task
    addTask(name, startTime, endTime, priority) {
        if (startTime >= endTime) {
            throw new Error("End time must be greater than start time");
        }
        this.tasks.push({ name, startTime, endTime, priority });
    }

    // 1. Sort tasks by start time (efficiently)
    // Time Complexity: O(n log n) - using built-in Timsort
    // Space Complexity: O(1) - sorting in place (or O(n) depending on JS engine)
    sortByStartTime() {
        return [...this.tasks].sort((a, b) => a.startTime - b.startTime);
    }

    // 2. Group tasks by priority using hash map
    // Time Complexity: O(n)
    // Space Complexity: O(n)
    groupByPriority() {
        const groups = {
            High: [],
            Medium: [],
            Low: []
        };
        
        for (const task of this.tasks) {
            groups[task.priority].push(task);
        }
        
        return groups;
    }

    // 3. Detect overlapping tasks (interval scheduling pattern)
    // Approach: Sort by start time, then compare each with next
    // Time Complexity: O(n log n) due to sorting
    // Space Complexity: O(k) where k is number of overlapping pairs
    detectOverlaps() {
        if (this.tasks.length < 2) return [];
        
        const sorted = this.sortByStartTime();
        const overlaps = [];
        
        for (let i = 0; i < sorted.length - 1; i++) {
            const current = sorted[i];
            const next = sorted[i + 1];
            
            // Overlap if current end time > next start time
            if (current.endTime > next.startTime) {
                overlaps.push({
                    task1: current.name,
                    task2: next.name,
                    overlap: `Task "${current.name}" (${current.startTime}-${current.endTime}) overlaps with "${next.name}" (${next.startTime}-${next.endTime})`
                });
            }
        }
        
        return overlaps;
    }

    // Alternative: Find all overlapping intervals (more comprehensive)
    // Time Complexity: O(n log n + n²) in worst case
    findAllOverlaps() {
        if (this.tasks.length < 2) return [];
        
        const sorted = this.sortByStartTime();
        const allOverlaps = [];
        
        for (let i = 0; i < sorted.length; i++) {
            for (let j = i + 1; j < sorted.length; j++) {
                if (sorted[i].endTime > sorted[j].startTime) {
                    allOverlaps.push({
                        task1: sorted[i].name,
                        task2: sorted[j].name,
                        overlap: `"${sorted[i].name}" (${sorted[i].startTime}-${sorted[i].endTime}) overlaps with "${sorted[j].name}" (${sorted[j].startTime}-${sorted[j].endTime})`
                    });
                } else {
                    break; // Since sorted by start time, no further overlaps with current i
                }
            }
        }
        
        return allOverlaps;
    }

    // 4. Estimate memory usage based on number of tasks
    // Space Complexity Analysis: O(n) for storing tasks
    estimateMemoryUsage() {
        const taskCount = this.tasks.length;
        let totalBytes = 0;
        
        // Rough estimation per task (in bytes)
        const perTaskBase = 80; // Object overhead
        const nameAvgBytes = 20; // Average name length
        const startEndBytes = 16; // Two numbers (8 bytes each)
        const priorityBytes = 10; // Priority string average
        
        totalBytes = taskCount * (perTaskBase + nameAvgBytes + startEndBytes + priorityBytes);
        
        return {
            taskCount,
            estimatedBytes: totalBytes,
            estimatedKB: (totalBytes / 1024).toFixed(2),
            estimatedMB: (totalBytes / (1024 * 1024)).toFixed(4),
            analysis: `Space complexity: O(n) - stores ${taskCount} tasks linearly`
        };
    }

    // Display all tasks
    displayTasks(title = "All Tasks") {
        console.log(`\n--- ${title} ---`);
        this.tasks.forEach(task => {
            console.log(`[${task.startTime}-${task.endTime}] ${task.name} (${task.priority})`);
        });
    }
}

// ---------- TESTING ----------
const scheduler = new TaskScheduler();

// Add sample tasks
scheduler.addTask("Morning Meeting", 9, 10, "High");
scheduler.addTask("Code Review", 9.5, 10.5, "Medium");
scheduler.addTask("Lunch", 12, 13, "Low");
scheduler.addTask("Project Work", 10, 12, "High");
scheduler.addTask("Documentation", 14, 15, "Medium");
scheduler.addTask("Team Sync", 10.5, 11.5, "High");

scheduler.displayTasks();

// 1. Sort by start time
console.log("\n--- Sorted by Start Time ---");
const sorted = scheduler.sortByStartTime();
sorted.forEach(task => {
    console.log(`[${task.startTime}-${task.endTime}] ${task.name} (${task.priority})`);
});

// 2. Group by priority
console.log("\n--- Grouped by Priority ---");
const grouped = scheduler.groupByPriority();
for (const [priority, tasks] of Object.entries(grouped)) {
    console.log(`\n${priority}:`);
    tasks.forEach(task => console.log(`  - ${task.name} (${task.startTime}-${task.endTime})`));
}

// 3. Detect overlapping tasks
console.log("\n--- Overlapping Tasks (adjacent) ---");
const overlaps = scheduler.detectOverlaps();
overlaps.forEach(overlap => console.log(overlap.overlap));

console.log("\n--- All Overlaps ---");
const allOverlaps = scheduler.findAllOverlaps();
allOverlaps.forEach(overlap => console.log(overlap.overlap));

// 4. Memory estimation
console.log("\n--- Memory Estimation ---");
const memory = scheduler.estimateMemoryUsage();
console.log(`Task count: ${memory.taskCount}`);
console.log(`Estimated memory: ${memory.estimatedKB} KB (${memory.estimatedMB} MB)`);
console.log(memory.analysis);
