// start time
const numCPUCores = require('os').cpus().length;
const timeInterval = 1000;
let startUsage;
let endUsage;
function startcpustat() {
    startUsage = process.cpuUsage();
}
// end time
function stopcpustat() {
    endUsage = process.cpuUsage();
    // Calculate CPU time used
    const userTime = endUsage.user - startUsage.user;
    const systemTime = endUsage.system - startUsage.system;

    // Calculate the total CPU time available
    const totalCPUTimeAvailable = numCPUCores * timeInterval * 1000; // Convert to microseconds

    // Calculate CPU usage percentage
    const totalCPUTimeUsed = userTime + systemTime;
    const cpuUsagePercentage = (totalCPUTimeUsed / totalCPUTimeAvailable) * 100;

    console.log(`CPU Usage Percentage of this TEST is : ${cpuUsagePercentage.toFixed(2)}%`);
}

// Capture the CPU usage after your code


module.exports = {
    startcpustat,
    stopcpustat
}

