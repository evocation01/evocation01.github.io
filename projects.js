async function fetchProjects() {
    const repoUrl = "https://api.github.com/repos/evocation01/projects/contents/";
    const validTags = ["python", "machine-learning", "industrial-engineering", "web-development"];

    try {
        const response = await fetch(repoUrl);
        const data = await response.json();

        let projects = await Promise.all(data
            .filter(item => item.type === "dir")
            .map(async folder => {
                const metadataUrl = `${repoUrl}${folder.name}/metadata.json`;
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

        projects = projects.filter(proj => proj !== null);
        displayProjects(projects, validTags);
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

fetchProjects();
