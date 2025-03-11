async function fetchDataScienceProjects() {
    const repoUrl = "data/data-sci.json"; // ✅ Load from static JSON

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to load Data Science projects");

        const data = await response.json();
        console.log("✅ Fetched Data Science JSON:", data); // Debugging log

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array.");
        }

        let projects = data
            .filter(item => item.type === "file") // ✅ Only process files as  projects
            .map(file => ({
                name: file.name,
                url: `https://github.com/evocation01/data-sci/blob/main/${file.name}`
            }));

        displayProjects(projects, ["data-science"]);
    } catch (error) {
        console.error("Error fetching Data Science projects:", error);
    }
}

fetchDataScienceProjects();
