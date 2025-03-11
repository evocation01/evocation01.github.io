async function fetchPowerBIProjects() {
    const repoUrl = "data/power-bi.json"; // ✅ Load from static JSON
    
    try {
        const response = await fetch(repoUrl);
        const data = await response.json();

        let projects = await Promise.all(data
            .filter(item => item.type === "dir")
            .map(async folder => {
                const metadataUrl = `https://raw.githubusercontent.com/evocation01/power-bi/main/${folder.name}/metadata.json`;
                try {
                    const metaResponse = await fetch(metadataUrl);
                    if (!metaResponse.ok) return null;
                    const metadata = await metaResponse.json();

                    return {
                        name: metadata.name,
                        tags: metadata.tags,
                        url: `https://github.com/evocation01/power-bi/tree/main/${folder.name}`
                    };
                } catch (error) {
                    console.warn(`Skipping ${folder.name}, metadata.json missing or invalid.`);
                    return null;
                }
            })
        );

        projects = projects.filter(proj => proj !== null);
        displayProjects(projects, ["power-bi"]);
    } catch (error) {
        console.error("Error fetching Power BI projects:", error);
    }
}

fetchPowerBIProjects();
