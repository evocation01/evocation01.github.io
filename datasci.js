async function fetchDataScienceProjects() {
    try {
        let response = await fetch("data/data-sci.json"); // ✅ Load local JSON
        let data = await response.json();

        console.log("✅ Data Science projects:", data);
        displayProjects(data, ["data-science"]);
    } catch (error) {
        console.error("❌ Error fetching Data Science projects:", error);
    }
}

fetchDataScienceProjects();
