async function fetchPowerBIProjects() {
    const repoUrl = "data/power-bi.json"; // ✅ Load from static JSON
    
    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Power BI projects");

        const data = await response.json();
        console.log("✅ Fetched Power BI JSON:", data); // Debugging log

        // Ensure data is an array, otherwise extract files if needed
        let files = data;
        if (!Array.isArray(files)) {
            console.warn("❌ Data format incorrect. Attempting to extract 'files'...");
            files = data.files || []; // ✅ Extract `files` if it's inside an object
        }

        let projects = files
            .filter(item => item.type === "file") // ✅ Only process files as projects
            .map(file => ({
                name: file.name,
                url: `https://github.com/evocation01/power-bi/blob/main/${file.name}`
            }));

        console.log("✅ Processed Power BI Projects:", projects); // Debugging log
        displayProjects(projects, ["power-bi"]);
    } catch (error) {
        console.error("Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
