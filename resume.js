async function findResumeFile() {
    const repoUrl = "data/data-sci.json"; // ✅ Using existing JSON

    try {
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to fetch resume directory");

        const data = await response.json();
        console.log("✅ Fetched Data JSON:", data); // Debugging log

        // Ensure data is an array, otherwise extract files
        const files = Array.isArray(data) ? data : data.files || [];

        // ✅ Find a file with "resume" in the name (case-insensitive)
        const resumeFile = files.find(file => file.name.toLowerCase().includes("resume"));

        if (resumeFile) {
            const resumeUrl = `data/${resumeFile.name}`;
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
