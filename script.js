// ==========================
// ThermaLØGIC Diagnostics JS
// ==========================

const runBtn = document.getElementById("runDiagnostics");
const resultsContainer = document.getElementById("results");

runBtn.addEventListener("click", () => {
    // Read input values
    const cpuUsage = parseFloat(document.getElementById("cpuUsage").value) || 0;
    const gpuUsage = parseFloat(document.getElementById("gpuUsage").value) || 0;
    const ramUsed = parseFloat(document.getElementById("ramUsed").value) || 0;
    const vramUsed = parseFloat(document.getElementById("vramUsed").value) || 0;
    const resolution = document.getElementById("resolution").value;

    // Clear previous results
    resultsContainer.innerHTML = "";

    // ==========================
    // Primary Bottleneck
    let primary = "", primaryClass = "low";
    if (gpuUsage > 80 || cpuUsage > 85) {
        primary = "High - Performance may be limited!";
        primaryClass = "high";
    } else if (gpuUsage > 60 || cpuUsage > 70) {
        primary = "Medium - Some impact possible";
        primaryClass = "medium";
    } else {
        primary = "Low - System running smoothly";
        primaryClass = "low";
    }

    // ==========================
    // RAM Risk
    let secondary = "", secondaryClass = "low";
    if (ramUsed < 8) {
        secondary = "High - Insufficient RAM";
        secondaryClass = "high";
    } else if (ramUsed < 16) {
        secondary = "Medium - Could affect multitasking";
        secondaryClass = "medium";
    } else {
        secondary = "Low - RAM capacity adequate";
        secondaryClass = "low";
    }

    // ==========================
    // VRAM / Resolution Risk
    let memoryRisk = "", memoryClass = "low";
    let vramThreshold = 2;
    if (resolution === "1080p") vramThreshold = 2;
    else if (resolution === "1440p") vramThreshold = 4;
    else if (resolution === "4k") vramThreshold = 6;

    if (vramUsed < vramThreshold) {
        memoryRisk = `High - VRAM may limit ${resolution} graphics`;
        memoryClass = "high";
    } else if (vramUsed < vramThreshold + 2) {
        memoryRisk = `Medium - ${resolution} graphics could be affected`;
        memoryClass = "medium";
    } else {
        memoryRisk = `Low - VRAM sufficient for ${resolution}`;
        memoryClass = "low";
    }

    // ==========================
    // Generate Result Cards
    resultsContainer.innerHTML = `
    <div class="result-card ${primaryClass}">
        <span class="badge">GPU/CPU</span>
        <h3><span class="icon">🖥️</span> Primary Bottleneck</h3>
        <p class="result-label">${primary}</p>
    </div>

    <div class="result-card ${secondaryClass}">
        <span class="badge">RAM</span>
        <h3><span class="icon">💾</span> Secondary Risk</h3>
        <p class="result-label">${secondary}</p>
    </div>

    <div class="result-card ${memoryClass}">
        <span class="badge">VRAM</span>
        <h3><span class="icon">🎛️</span> Memory Risk</h3>
        <p class="result-label">${memoryRisk}</p>
    </div>
    `;
});
