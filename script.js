// Listen to form submission
document.getElementById("diagnosticForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Grab input values
    const gpuUsage = parseInt(document.getElementById("gpuUsage").value);
    const cpuUsage = parseInt(document.getElementById("cpuUsage").value);
    const vram = parseInt(document.getElementById("vram").value);
    const ram = parseInt(document.getElementById("ram").value);
    const resolution = document.getElementById("resolution").value;
    const fps = parseInt(document.getElementById("fps").value);

    // Determine diagnostics
    let primary = "Balanced Load";
    let secondary = "None";
    let memoryRisk = "Low";

    if (gpuUsage > 95 && cpuUsage < 85) {
        primary = "GPU Bottleneck";
    } else if (cpuUsage > 90 && gpuUsage < 80) {
        primary = "CPU Bottleneck";
    }

    if (vram <= 6 && (resolution === "1440" || resolution === "4k")) {
        memoryRisk = "VRAM Limitation Risk";
    }

    if (ram <= 8) {
        secondary = "System RAM may be limiting performance";
    }

    // Helper function for result card severity
    function getSeverityClass(value, type) {
        value = value.toLowerCase();
        if (type === "primary") {
            if (value.includes("gpu") || value.includes("cpu")) return "high";
            else return "low";
        }
        if (type === "secondary") {
            if (value.includes("ram")) return "medium";
            else return "low";
        }
        if (type === "memory") {
            if (value.includes("vram") || value.includes("limitation")) return "high";
            else return "low";
        }
        return "low";
    }

    // Assign classes in one cohesive line
    const primaryClass = getSeverityClass(primary, "primary"), secondaryClass = getSeverityClass(secondary, "secondary"), memoryClass = getSeverityClass(memoryRisk, "memory");

    // Display results with dynamic colors
    document.getElementById("results").innerHTML = `
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
</div>`;

});
