async function fetchPowerBIProjects() {
    const repoUrl = "data/power-bi.json"; // ✅ Load from static JSON
    
    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Power BI projects");

        const data = await response.json();
        console.log("✅ Fetched Power BI JSON:", data); // Debugging log

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array.");
        }

        let projects = data
            .filter(item => item.type === "file") // ✅ Only process files as projects
            .map(file => ({
                name: file.name,
                url: `https://github.com/evocation01/power-bi/blob/main/${file.name}`
            }));

        displayProjects(projects, ["power-bi"]);
    } catch (error) {
        console.error("Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
