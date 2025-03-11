async function findResumeFile() {
    const repoUrl = "data/"; // ✅ Change this if the folder is different

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to fetch resume directory");

        const data = await response.json();

        // ✅ Find a file with "resume" in the name (case-insensitive)
        const resumeFile = data.find(file => file.name.toLowerCase().includes("resume"));

        if (resumeFile) {
            const resumeUrl = `${repoUrl}${resumeFile.name}`;
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
