async function fetchDataScienceProjects() {
    const repoUrl = "data/data-sci.json"; // ✅ Load from static JSON

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Data Science projects");

        const data = await response.json();
        console.log("✅ Fetched Data Science JSON:", data);

        let files = Array.isArray(data) ? data : data.files || [];

        let projects = await Promise.all(files
            .filter(item => item.type === "dir") // ✅ Only process folders (projects)
            .map(async folder => {
                const metadataUrl = `https://raw.githubusercontent.com/evocation01/data-sci/main/${folder.name}/metadata.json`;
                try {
                    const metaResponse = await fetch(metadataUrl);
                    if (!metaResponse.ok) return { name: folder.name, url: `https://github.com/evocation01/data-sci/tree/main/${folder.name}`, tags: [] };

                    const metadata = await metaResponse.json();
                    return {
                        name: metadata.name || folder.name,
                        url: `https://github.com/evocation01/data-sci/tree/main/${folder.name}`,
                        tags: metadata.tags || [] // ✅ Read tags from metadata.json
                    };
                } catch (error) {
                    console.warn(`Skipping ${folder.name}, metadata.json missing or invalid.`);
                    return { name: folder.name, url: `https://github.com/evocation01/data-sci/tree/main/${folder.name}`, tags: [] };
                }
            })
        );

        console.log("✅ Processed Data Science Projects:", projects);
        displayProjects(projects, ["data-science"]);
    } catch (error) {
        console.error("Error fetching Data Science projects:", error);
    }
}

fetchDataScienceProjects();
