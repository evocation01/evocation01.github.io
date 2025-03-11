async function fetchProjects() {
    const repoUrl = "data/projects.json"; // ✅ Load from static JSON
    const validTags = ["python", "machine-learning", "industrial-engineering", "web-development"];

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load projects data");

        const data = await response.json();

        let projects = await Promise.all(data
            .filter(item => item.type === "dir") // Only fetch folders (projects)
            .map(async folder => {
                const metadataUrl = `https://raw.githubusercontent.com/evocation01/projects/main/${folder.name}/metadata.json`; // ✅ Fixed URL

                try {
                    const metaResponse = await fetch(metadataUrl);
                    if (!metaResponse.ok) return null;
                    
                    const metadata = await metaResponse.json();
                    
                    return {
                        name: metadata.name,
                        tags: metadata.tags,
                        url: `https://github.com/evocation01/projects/tree/main/${folder.name}`,
                        isHighlighted: metadata.tags.includes("5star")
                    };
                } catch (error) {
                    console.warn(`Skipping ${folder.name}, metadata.json missing or invalid.`);
                    return null;
                }
            })
        );

        projects = projects.filter(proj => proj !== null); // Remove nulls
        displayProjects(projects, validTags);
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

fetchProjects();
