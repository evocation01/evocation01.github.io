document.addEventListener("DOMContentLoaded", function () {
    setResumeLink();
});

function setResumeLink() {
    const siteUrl = "https://evocation01.github.io/";

    // Your exact resume filename
    const resumeFileName = "07032025_Resume - Hakan ispir.pdf";  // Update this if needed
    const resumeUrl = siteUrl + resumeFileName;

    const downloadLink = document.getElementById("resume-download");
    if (downloadLink) {
        downloadLink.setAttribute("href", resumeUrl);
        downloadLink.setAttribute("download", resumeFileName);
        console.log(`✅ Resume linked: ${resumeUrl}`);
    } else {
        console.error("❌ Resume download link not found in HTML.");
    }
}
