async function fetchPowerBIProjects() {
    try {
        let response = await fetch("data/power-bi.json"); // ✅ Load local JSON
        let data = await response.json();

        console.log("✅ Power BI projects:", data);
        displayProjects(data, ["power-bi"]);
    } catch (error) {
        console.error("❌ Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
