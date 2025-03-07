document.addEventListener("DOMContentLoaded", function () {
    fetchLatestResume();
});

async function fetchLatestResume() {
    try {
        const repoUrl = "https://api.github.com/repos/evocation01/evocation01.github.io/contents/";
        const response = await fetch(repoUrl);
        if (!response.ok) throw new Error("Failed to fetch repo contents");

        const files = await response.json();
        
        // Find the resume file dynamically
        const resumeFile = files.find(file => file.name.toLowerCase().includes('resume') && file.name.endsWith('.pdf'));

        if (resumeFile) {
            const resumeUrl = `https://evocation01.github.io/${resumeFile.name}`;
            const downloadLink = document.getElementById('resume-download');

            // Set the correct resume link
            downloadLink.setAttribute("href", resumeUrl);
            downloadLink.setAttribute("download", resumeFile.name);
        } else {
            console.warn("No resume file found in the repository.");
        }
    } catch (error) {
        console.error("Error fetching resume file:", error);
    }
}
