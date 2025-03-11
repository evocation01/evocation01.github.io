async function fetchDataScienceProjects() {
    const repoUrl = "data/data-sci.json"; // ✅ Load from static JSON

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Data Science projects");

        const data = await response.json();
        console.log("✅ Fetched Data Science JSON:", data);

        let files = Array.isArray(data) ? data : data.files || [];

        let projects = await Promise.all(files
            .map(async item => {
                if (item.type === "file") {
                    // ✅ If it's a file, show it directly with default tags
                    return { name: item.name, url: `https://github.com/evocation01/data-sci/blob/main/${item.name}`, tags: ["data-science"] };
                } else if (item.type === "dir") {
                    // ✅ If it's a folder, try fetching metadata.json
                    const metadataUrl = `https://raw.githubusercontent.com/evocation01/data-sci/main/${item.name}/metadata.json`;
                    try {
                        const metaResponse = await fetch(metadataUrl);
                        if (!metaResponse.ok) return { name: item.name, url: `https://github.com/evocation01/data-sci/tree/main/${item.name}`, tags: ["data-science"] };

                        const metadata = await metaResponse.json();
                        return {
                            name: metadata.name || item.name,
                            url: `https://github.com/evocation01/data-sci/tree/main/${item.name}`,
                            tags: metadata.tags || ["data-science"]
                        };
                    } catch (error) {
                        console.warn(`Skipping ${item.name}, metadata.json missing.`);
                        return { name: item.name, url: `https://github.com/evocation01/data-sci/tree/main/${item.name}`, tags: ["data-science"] };
                    }
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
