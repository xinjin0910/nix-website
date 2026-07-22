const revealItems = document.querySelectorAll(".card, .product-card, .how-step, .spec-item");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.classList.add("reveal");
  observer.observe(item);
});

const projectDialog = document.querySelector("#project-dialog");
const projectForm = document.querySelector("#project-form");

if (projectDialog && projectForm) {
  document.querySelectorAll(".js-project-dialog").forEach(button => {
    button.addEventListener("click", () => projectDialog.showModal());
  });

  projectDialog.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
  projectDialog.addEventListener("click", event => {
    if (event.target === projectDialog) projectDialog.close();
  });

  projectForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = projectForm.querySelector(".form-submit");
    const status = projectForm.querySelector(".form-status");
    submitButton.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";

    try {
      const response = await fetch(projectForm.action, {
        method: "POST",
        body: new FormData(projectForm),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Submission failed");
      projectForm.reset();
      status.className = "form-status success";
      status.textContent = "Thank you. Our engineering team will reach out shortly.";
    } catch (error) {
      status.className = "form-status error";
      status.textContent = "We could not send your request. Please email sales@nixtechnical.com.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
