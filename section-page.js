const pageRoot = document.querySelector("[data-section-page]");

if (pageRoot) {
  const sectionId = pageRoot.dataset.sectionPage;
  const pageFile = pageRoot.dataset.pageFile;
  const pageTitle = pageRoot.dataset.pageTitle;

  const loadSectionPage = async () => {
    try {
      const response = await fetch("index.html");
      if (!response.ok) throw new Error(`Unable to load the Home source (${response.status})`);

      const sourceMarkup = await response.text();
      const sourceDocument = new DOMParser().parseFromString(sourceMarkup, "text/html");
      const sourceHeader = sourceDocument.querySelector("[data-site-header]");
      const sourceFooter = sourceDocument.querySelector(".site-footer");
      const sourceSection = sourceDocument.getElementById(sectionId);

      if (!sourceHeader || !sourceFooter) throw new Error("Shared page chrome is missing");

      const skipLink = sourceDocument.querySelector(".skip-link")?.cloneNode(true);
      const header = sourceHeader.cloneNode(true);
      const footer = sourceFooter.cloneNode(true);

      header.querySelectorAll(".nav-link").forEach((link) => {
        const isActive = link.getAttribute("href") === pageFile;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });

      if (skipLink) document.body.prepend(skipLink);
      pageRoot.before(header);
      pageRoot.after(footer);

      if (sourceSection) {
        pageRoot.replaceChildren(sourceSection.cloneNode(true));
      } else {
        pageRoot.querySelector("[data-page-loading]")?.remove();
        pageRoot.querySelector("[data-page-pending]")?.removeAttribute("hidden");
      }

      document.title = `${pageTitle} | V&B Nails Prescott`;

      const behaviorScript = document.createElement("script");
      behaviorScript.src = "script.js";
      document.body.append(behaviorScript);
    } catch (error) {
      pageRoot.querySelector("[data-page-loading]")?.remove();
      const errorMessage = pageRoot.querySelector("[data-page-error]");
      if (errorMessage) {
        errorMessage.hidden = false;
        errorMessage.querySelector("small").textContent = error.message;
      }
    }
  };

  loadSectionPage();
}
