async function findResumeFile() {
    const repoUrl = "data/projects.json"; // ✅ Load from projects.json to check filenames

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to fetch file list");

        const data = await response.json();
        console.log("✅ Fetched JSON for Resume Search:", data); // Debugging log

        // Ensure data is an array, otherwise extract files if needed
        let files = data;
        if (!Array.isArray(files)) {
            console.warn("❌ Data format incorrect. Attempting to extract 'files'...");
            files = data.files || []; // ✅ Extract `files` if it's inside an object
        }

        // ✅ Find a file with "resume" in the name (case-insensitive)
        const resumeFile = files.find(file => file.name.toLowerCase().includes("resume"));

        if (resumeFile) {
            const resumeUrl = `${resumeFile.name}`;
            const downloadLink = document.getElementById("resume-download");

            downloadLink.setAttribute("href", resumeUrl);
            downloadLink.setAttribute("download", resumeFile.name);
            console.log(`✅ Resume linked: ${resumeUrl}`);
        } else {
            console.warn("❌ No resume file found.");
        }
    } catch (error) {
        console.error("❌ Error fetching resume file:", error);
    }
}

// ✅ Run on page load
document.addEventListener("DOMContentLoaded", findResumeFile);
