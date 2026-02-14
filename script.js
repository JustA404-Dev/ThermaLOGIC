// ==========================
// TheraLØGIC Diagnostics JS
// ==========================

// Grab elements
const runBtn = document.getElementById("runDiagnostics");
const resultsContainer = document.getElementById("results");

runBtn.addEventListener("click", () => {
    // Read input values
    const cpuUsage = parseFloat(document.getElementById("cpuUsage").value) || 0;
    const gpuUsage = parseFloat(document.getElementById("gpuUsage").value) || 0;
    const ramUsed = parseFloat(document.getElementById("ramUsed").value) || 0;
    const vramUsed = parseFloat(document.getElementById("vramUsed").value) || 0;

    // Clear previous results
    resultsContainer.innerHTML = "";

    // ==========================
    // 1) Determine primary bottleneck
    // ==========================
    let primary = "";
    let primaryClass = "low";

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
    // 2) Determine secondary risk
    // ==========================
    let secondary = "";
    let secondaryClass = "low";

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
    // 3) VRAM / Memory risk
    // ==========================
    let memoryRisk = "";
    let memoryClass = "low";

    if (vramUsed < 2) {
        memoryRisk = "High - VRAM may limit graphics";
        memoryClass = "high";
    } else if (vramUsed < 4) {
        memoryRisk = "Medium - Monitor resolution may be affected";
        memoryClass = "medium";
    } else {
        memoryRisk = "Low - VRAM sufficient";
        memoryClass = "low";
    }

    // ==========================
    // 4) Generate Result Cards
    // ==========================
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
