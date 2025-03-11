async function fetchProjects() {
    const repoUrl = "data/projects.json"; // ✅ Load from static JSON
    const validTags = ["python", "machine-learning", "industrial-engineering", "web-development"];

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to fetch project list");

        const data = await response.json();
        console.log("✅ Fetched Main Projects JSON:", data);

        let projects = await Promise.all(data
            .filter(item => item.type === "dir") // ✅ Only fetch folders
            .map(async folder => {
                const metadataUrl = `https://raw.githubusercontent.com/evocation01/projects/main/${folder.name}/metadata.json`;

                try {
                    const metaResponse = await fetch(metadataUrl);
                    if (!metaResponse.ok) return null;

                    const metadata = await metaResponse.json();
                    
                    return {
                        name: metadata.name || folder.name,
                        tags: metadata.tags || [], // ✅ Assign tags from metadata.json
                        url: `https://github.com/evocation01/projects/tree/main/${folder.name}`,
                        isHighlighted: metadata.tags?.includes("5star") || false
                    };
                } catch (error) {
                    console.warn(`Skipping ${folder.name}, metadata.json missing or invalid.`);
                    return null;
                }
            })
        );

        projects = projects.filter(proj => proj !== null); // ✅ Remove nulls
        console.log("✅ Processed Main Projects:", projects);
        displayProjects(projects, validTags);
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

function displayProjects(projects, validTags) {
    const container = document.querySelector(".projects");
    container.innerHTML = ""; // Clear previous results

    projects.forEach(project => {
        const projectTags = project.tags.filter(tag => validTags.includes(tag));

        if (projectTags.length > 0 || validTags.includes("all")) {
            const projectElement = document.createElement("div");
            projectElement.className = `project ${projectTags.join(" ")}`;
            projectElement.innerHTML = `<a href="${project.url}" target="_blank">${project.name}</a>`;

            if (project.isHighlighted) {
                projectElement.style.border = "2px solid gold"; // Highlight 5-star projects
                projectElement.style.fontWeight = "bold";
            }

            container.appendChild(projectElement);
        }
    });

    console.log("✅ Final Displayed Projects:", projects);
}

function filterProjects(category) {
    let projects = document.querySelectorAll('.project');

    // Save current scroll position
    const currentScroll = window.scrollY;

    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });

    // Restore scroll position to prevent jumping
    window.scrollTo(0, currentScroll);
}

// ✅ Make functions globally available
window.displayProjects = displayProjects;
window.filterProjects = filterProjects;

// Fetch projects after functions are available
fetchProjects();
