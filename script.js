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

if (document.querySelector(".js-project-dialog") && !document.querySelector("#project-dialog")) {
  document.body.insertAdjacentHTML("beforeend", `
    <dialog class="project-dialog" id="project-dialog" aria-labelledby="project-dialog-title">
      <button class="dialog-close" type="button" aria-label="Close form">×</button>
      <p class="eyebrow">Start a Conversation</p>
      <h2 id="project-dialog-title">Discuss Your Project</h2>
      <p class="dialog-intro">Tell us how to reach you. Our engineering team will follow up shortly.</p>
      <form class="project-form" id="project-form" action="https://formsubmit.co/ajax/sales@nixtechnical.com" method="POST">
        <input type="hidden" name="_subject" value="New project inquiry from NIX website">
        <input type="hidden" name="_template" value="table">
        <input class="form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off">
        <div class="form-row">
          <label>First Name<input type="text" name="First Name" autocomplete="given-name" required></label>
          <label>Last Name<input type="text" name="Last Name" autocomplete="family-name" required></label>
        </div>
        <label>Company Name<input type="text" name="Company Name" autocomplete="organization" required></label>
        <label>Email<input type="email" name="email" autocomplete="email" required></label>
        <label>Briefly tell us about your project<textarea name="Project Description" rows="5" placeholder="What are you looking to design, manufacture, or improve?" required></textarea></label>
        <button class="button primary form-submit" type="submit">Submit</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </dialog>
  `);
}

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
