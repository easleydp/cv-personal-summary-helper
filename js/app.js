// Global variables
const selectedQualities = new Set();

// DOM References
const qualitiesContainer = document.getElementById("qualities-container");
const selectedQualitiesCt = document.getElementById("selected-qualities");
const emptyState = document.getElementById("empty-state");
const copyButton = document.getElementById("copy-button");
const toast = document.getElementById("toast");
const errorMessage = document.getElementById("error-message");

const instrPanel = document.getElementById("instructions-panel");
const instrHeader = instrPanel.getElementsByClassName("instructions-header")[0];
const instrToggleBtn = instrHeader.getElementsByTagName("button")[0];
const instrToggleIcon = instrToggleBtn.getElementsByTagName("svg")[0];
const instrContent = instrPanel.getElementsByClassName(
  "instructions-content"
)[0];

// Event Listeners
qualitiesContainer.addEventListener("click", handleQualityClick);
selectedQualitiesCt.addEventListener("click", handleRemoveClick);
copyButton.addEventListener("click", copyToClipboard);
instrToggleBtn.addEventListener("click", handleInstructionsToggle);

// Initialize the application
initApp();

// Functions
async function initApp() {
  await fetchQualities();
}

async function fetchQualities() {
  try {
    // In a real application, this would fetch from a server
    // For this implementation, we'll use the provided data

    // Sort qualities alphabetically
    const sortedQualities = sortQualities(qualities.qualities);

    // Render qualities to the DOM
    renderQualities(sortedQualities);
  } catch (error) {
    console.error("Error loading qualities:", error);
    errorMessage.classList.remove("hidden");
  }
}

function sortQualities(qualities) {
  return [...qualities].sort((a, b) => a.localeCompare(b));
}

function renderQualities(qualities) {
  // Create a document fragment for better performance
  const fragment = document.createDocumentFragment();

  qualities.forEach((quality) => {
    const qualityElement = document.createElement("div");
    qualityElement.className = "quality-item";
    qualityElement.textContent = quality;
    qualityElement.setAttribute("role", "button");
    qualityElement.setAttribute("tabindex", "0");
    qualityElement.setAttribute("aria-pressed", "false");
    qualityElement.dataset.quality = quality;

    fragment.appendChild(qualityElement);
  });

  // Clear any existing content and append the fragment
  qualitiesContainer.innerHTML = "";
  qualitiesContainer.appendChild(fragment);
}

function handleQualityClick(event) {
  const qualityItem = event.target.closest(".quality-item");
  if (!qualityItem) return;

  const quality = qualityItem.dataset.quality;

  if (selectedQualities.has(quality)) {
    // Deselect quality
    selectedQualities.delete(quality);
    qualityItem.classList.remove("selected");
    qualityItem.setAttribute("aria-pressed", "false");
  } else {
    // Select quality
    selectedQualities.add(quality);
    qualityItem.classList.add("selected");
    qualityItem.setAttribute("aria-pressed", "true");
  }

  renderSelectedQualities();
}

function renderSelectedQualities() {
  // Show/hide empty state message
  if (selectedQualities.size === 0) {
    emptyState.style.display = "block";
    copyButton.classList.add("hidden");
  } else {
    emptyState.style.display = "none";
    copyButton.classList.remove("hidden");
  }

  // Create a document fragment for better performance
  const fragment = document.createDocumentFragment();

  selectedQualities.forEach((quality) => {
    const selectedQuality = document.createElement("div");
    selectedQuality.className = "selected-quality";
    selectedQuality.dataset.quality = quality;

    const qualityText = document.createElement("span");
    qualityText.textContent = quality;
    selectedQuality.appendChild(qualityText);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-quality";
    removeButton.innerHTML = "&times;";
    removeButton.setAttribute("aria-label", `Remove ${quality}`);
    selectedQuality.appendChild(removeButton);

    fragment.appendChild(selectedQuality);
  });

  // Clear existing selected qualities (but not the empty state message)
  const selectedQualityEls =
    selectedQualitiesCt.getElementsByClassName("selected-quality");
  Array.from(selectedQualityEls).forEach((el) =>
    selectedQualitiesCt.removeChild(el)
  );

  // Append the new selected qualities
  selectedQualitiesCt.appendChild(fragment);
}

function handleRemoveClick(event) {
  const removeButton = event.target.closest(".remove-quality");
  if (!removeButton) return;

  const selectedQuality = removeButton.closest(".selected-quality");
  const quality = selectedQuality.dataset.quality;

  // Remove from selected qualities
  selectedQualities.delete(quality);

  // Update the UI
  renderSelectedQualities();

  // Update the original quality item in the left panel
  const qualityItem = document.querySelector(
    `.quality-item[data-quality="${quality}"]`
  );
  if (qualityItem) {
    qualityItem.classList.remove("selected");
    qualityItem.setAttribute("aria-pressed", "false");
  }
}

function handleInstructionsToggle(event) {
  var inner = function (event) {
    let expand = instrContent.style.display === "none";
    instrContent.style.display = expand ? "" : "none";
    instrToggleBtn.setAttribute("aria-expanded", expand);
    instrToggleIcon.style.transform = expand
      ? "rotate(0deg)"
      : "rotate(-90deg)";
  };

  if (!document.startViewTransition) {
    inner(event);
  } else {
    document.startViewTransition(() => inner(event));
  }
}

function copyToClipboard() {
  if (selectedQualities.size === 0) return;

  const qualitiesText = Array.from(selectedQualities).join(", ");

  navigator.clipboard
    .writeText(qualitiesText)
    .then(() => {
      showToastNotification("Qualities copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
      showToastNotification("Failed to copy. Please try again.");
    });
}

function showToastNotification(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Add keyboard support for qualities selection
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.key === " ") {
    const activeElement = document.activeElement;

    if (activeElement.classList.contains("quality-item")) {
      event.preventDefault();
      activeElement.click();
    } else if (activeElement.classList.contains("remove-quality")) {
      event.preventDefault();
      activeElement.click();
    }
  }
});
