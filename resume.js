async function findResumeFile() {
    try {
        const response = await fetch("https://api.github.com/repos/evocation01/evocation01.github.io/contents");
        if (!response.ok) throw new Error("Failed to fetch file list");

        const data = await response.json();
        console.log("✅ Fetched JSON for Resume Search:", data);

        // ✅ Find a file with "resume" in the name (case-insensitive)
        const resumeFile = data.find(file => file.name.toLowerCase().includes("resume") && file.name.endsWith(".pdf"));

        if (resumeFile) {
            const resumeUrl = resumeFile.name;
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
