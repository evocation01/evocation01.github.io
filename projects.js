async function fetchProjects() {
    try {
        let response = await fetch("data/projects.json"); // ✅ Load local JSON
        let data = await response.json();

        console.log("✅ Projects fetched:", data);
        displayProjects(data, ["python", "machine-learning", "industrial-engineering", "web-development"]);
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
    }
}

fetchProjects();
