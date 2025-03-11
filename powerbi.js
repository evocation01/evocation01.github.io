async function fetchPowerBIProjects() {
    const repoUrl = "data/power-bi.json"; // ✅ Load from static JSON
    
    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Power BI projects");

        const data = await response.json();
        console.log("✅ Fetched Power BI JSON:", data);

        let files = Array.isArray(data) ? data : data.files || [];

        let projects = await Promise.all(files
            .filter(item => item.type === "dir") // ✅ Only process folders (projects)
            .map(async folder => {
                const metadataUrl = `https://raw.githubusercontent.com/evocation01/power-bi/main/${folder.name}/metadata.json`;
                try {
                    const metaResponse = await fetch(metadataUrl);
                    if (!metaResponse.ok) return { name: folder.name, url: `https://github.com/evocation01/power-bi/tree/main/${folder.name}`, tags: [] };

                    const metadata = await metaResponse.json();
                    return {
                        name: metadata.name || folder.name,
                        url: `https://github.com/evocation01/power-bi/tree/main/${folder.name}`,
                        tags: metadata.tags || [] // ✅ Read tags from metadata.json
                    };
                } catch (error) {
                    console.warn(`Skipping ${folder.name}, metadata.json missing or invalid.`);
                    return { name: folder.name, url: `https://github.com/evocation01/power-bi/tree/main/${folder.name}`, tags: [] };
                }
            })
        );

        console.log("✅ Processed Power BI Projects:", projects);
        displayProjects(projects, ["power-bi"]);
    } catch (error) {
        console.error("Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
