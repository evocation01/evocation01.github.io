document.addEventListener("DOMContentLoaded", function () {
    setResumeLink();
});

async function setResumeLink() {
    try {
        const siteUrl = "https://evocation01.github.io/";
        const response = await fetch(siteUrl);
        if (!response.ok) throw new Error("Failed to fetch site files");

        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // Extract all file names from the site's directory listing
        const links = [...doc.querySelectorAll("a")].map(link => link.getAttribute("href"));

        // Find the most recent resume file (contains "resume" and ends with .pdf)
        const resumeFile = links.find(file => file.toLowerCase().includes("resume") && file.toLowerCase().endsWith(".pdf"));

        if (resumeFile) {
            const resumeUrl = siteUrl + resumeFile;
            const downloadLink = document.getElementById("resume-download");

            // Set the correct resume link
            downloadLink.setAttribute("href", resumeUrl);
            downloadLink.setAttribute("download", resumeFile);
        } else {
            console.warn("No resume file found.");
        }
    } catch (error) {
        console.error("Error fetching resume file:", error);
    }
}
