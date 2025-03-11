document.addEventListener("DOMContentLoaded", function () {
    const resumeUrl = "07032025_Resume - Hakan ispir.pdf";  // ✅ Directly specify file name
    const downloadLink = document.getElementById("resume-download");

    if (downloadLink) {
        downloadLink.setAttribute("href", resumeUrl);
        downloadLink.setAttribute("download", resumeUrl);
        console.log(`✅ Resume linked: ${resumeUrl}`);
    } else {
        console.warn("❌ Resume link element not found.");
    }
});

