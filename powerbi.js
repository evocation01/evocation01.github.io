async function fetchPowerBIProjects() {
    const repoUrl = "data/power-bi.json"; // ✅ Load from static JSON
    
    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Power BI projects");

        const data = await response.json();
        console.log("✅ Fetched Power BI JSON:", data);

        let files = Array.isArray(data) ? data : data.files || [];

        let projects = files
            .filter(item => item.type === "file") // ✅ Only process files
            .map(file => ({
                name: file.name,
                url: `https://github.com/evocation01/power-bi/blob/main/${file.name}`,
                tags: [] // ✅ Empty tags array to prevent displayProjects() errors
            }));

        console.log("✅ Processed Power BI Projects:", projects);
        displayProjects(projects, ["power-bi"]);
    } catch (error) {
        console.error("Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
