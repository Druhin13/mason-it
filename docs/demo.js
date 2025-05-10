document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality for installation code
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      // Deactivate all tabs and content
      document.querySelectorAll(".tab-button").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelectorAll(".code-block").forEach((block) => {
        block.classList.remove("active");
      });

      // Activate selected tab and content
      button.classList.add("active");
      document.getElementById(tabName).classList.add("active");
    });
  });

  // Code tabs for demo code
  const codeTabs = document.querySelectorAll(".code-tab");
  codeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");

      // Deactivate all tabs and content
      document.querySelectorAll(".code-tab").forEach((t) => {
        t.classList.remove("active");
      });
      document.querySelectorAll(".code-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Activate selected tab and content
      tab.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Show/hide demo code
  const showCodeButton = document.getElementById("show-code");
  const demoCode = document.querySelector(".demo-code");

  showCodeButton.addEventListener("click", () => {
    demoCode.classList.toggle("hidden");
    showCodeButton.textContent = demoCode.classList.contains("hidden")
      ? "Show Me The Code"
      : "Hide The Code";
  });

  // Example grid setup
  const normalGrid = document.getElementById("normal-grid");
  const masonGrid = document.getElementById("mason-grid");

  // Generate sample items with varying heights
  const itemContents = [
    { content: "Short content box", height: 100 },
    {
      content:
        "This box has a bit more content so it takes up more space vertically. Amazing how that works.",
      height: 200,
    },
    {
      content: "Just your average box, not too tall, not too short.",
      height: 150,
    },
    { content: "Another short box, nothing to see here.", height: 120 },
    {
      content:
        "This one is pretty tall because it has lots of content. When you have a lot to say, you need more vertical space. That's just how it works in the world of boxes.",
      height: 250,
    },
    { content: "Medium height box with just enough content.", height: 170 },
    { content: "Short and sweet.", height: 100 },
    { content: "Just a little taller than the shortest one.", height: 130 },
    {
      content:
        "This box has a decent amount of content. Not too much, not too little, just right.",
      height: 180,
    },
  ];

  // Populate the grids with identical items
  function populateGrids() {
    // Clear existing items
    normalGrid.innerHTML = "";
    masonGrid.innerHTML = "";

    // Add items to both grids
    itemContents.forEach((item, index) => {
      const normalItem = document.createElement("div");
      normalItem.className = "item";
      normalItem.textContent = item.content;
      normalItem.style.minHeight = `${item.height}px`;

      const masonItem = normalItem.cloneNode(true);

      normalGrid.appendChild(normalItem);
      masonGrid.appendChild(masonItem);
    });
  }

  // Initialize the grids
  populateGrids();

  // Column count buttons
  const columnButtons = document.querySelectorAll(".column-button");
  columnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const columns = button.getAttribute("data-columns");

      // Update active button
      columnButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update grid columns
      normalGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      masonGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    });
  });

  // Gap size buttons
  const gapButtons = document.querySelectorAll(".gap-button");
  gapButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const gap = button.getAttribute("data-gap");

      // Update active button
      gapButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update grid gap
      normalGrid.style.gap = `${gap}px`;
      masonGrid.style.gap = `${gap}px`;
    });
  });

  // Add item button
  const addItemButton = document.getElementById("add-item");
  addItemButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * itemContents.length);
    const item = itemContents[randomIndex];

    const normalItem = document.createElement("div");
    normalItem.className = "item";
    normalItem.textContent = `New: ${item.content}`;
    normalItem.style.minHeight = `${item.height}px`;

    const masonItem = normalItem.cloneNode(true);

    normalGrid.appendChild(normalItem);
    masonGrid.appendChild(masonItem);

    // Refresh mason-it on the mason grid
    if (window.MasonIt) {
      window.MasonIt.refresh("#mason-grid");
    }
  });

  // Toggle mason-it button
  const toggleMasonButton = document.getElementById("toggle-mason");
  let masonEnabled = true;

  toggleMasonButton.addEventListener("click", () => {
    if (masonEnabled) {
      // Disable mason-it
      if (window.MasonIt) {
        window.MasonIt.destroy("#mason-grid");
      }
      masonGrid.removeAttribute("data-mason-it");
      toggleMasonButton.textContent = "Enable Mason-it";
      masonEnabled = false;
    } else {
      // Enable mason-it
      masonGrid.setAttribute("data-mason-it", "");
      if (window.MasonIt) {
        window.MasonIt.init("#mason-grid");
      }
      toggleMasonButton.textContent = "Disable Mason-it";
      masonEnabled = true;
    }
  });

  // Responsive window resizing demo
  window.addEventListener("resize", () => {
    // The mason-it library automatically handles resizing,
    // but this ensures our demo showcases it properly
    if (window.MasonIt && masonEnabled) {
      window.MasonIt.refresh("#mason-grid");
    }
  });
});
