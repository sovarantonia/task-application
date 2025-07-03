import { LoadData } from "./LoadData.js";
import { TaskService } from "./TaskService.js";

document.addEventListener("DOMContentLoaded", () => {
  const loader = new LoadData();

  loader.loadData()
    .then(data => {
      const taskService = new TaskService(data);
      const container = document.getElementById("taskContainer");
      const select = document.getElementById("itemsPerPageSelect");

      const previousBtn = document.getElementById("previousBtn");
      const nextBtn = document.getElementById("nextBtn");
      const currentPageSpan = document.getElementById("currentPageSpan");
      const firstPageBtn = document.getElementById("firstPageBtn");
      const lastPageBtn = document.getElementById("lastPageBtn");
        
      let currentPage = 1;
      let itemsPerPage = parseInt(select.value);
      let totalPages = taskService.getTotalPages(itemsPerPage);

      lastPageBtn.innerText = totalPages.toString();

      select.addEventListener("change", (e) => {
        itemsPerPage = parseInt(e.target.value);
        currentPage = 1;
        currentPageSpan.innerText = currentPage.toString();
        totalPages = taskService.getTotalPages(itemsPerPage);
        lastPageBtn.innerText = totalPages.toString();

        renderPage(currentPage);
        renderPaginationControls();
      });

      previousBtn.addEventListener("click", () => {
        if(currentPage > 1) {
          currentPage --;
        }
        currentPageSpan.innerText = currentPage.toString();
        renderPage(currentPage);
        renderPaginationControls();
      });

        
      nextBtn.addEventListener("click", () => {
        if(currentPage < totalPages) {
          currentPage ++;
        }
          
        currentPageSpan.innerText = currentPage.toString();
        renderPage(currentPage);
        renderPaginationControls();
      });

      firstPageBtn.addEventListener("click", () => {
        currentPage = 1;
        renderPage(currentPage);
        renderPaginationControls();
      });

      lastPageBtn.addEventListener("click", () => {
        currentPage = totalPages;
        renderPage(currentPage);
        renderPaginationControls();
      })

      function renderPage(page) {
        container.innerHTML = "";
        const paginatedTasks = taskService.getPaginatedTasks({currentPage: page, itemsPerPage: itemsPerPage});

        paginatedTasks.forEach(element => {
          const card = document.createElement("div");
          card.className = "task-card";
          card.innerHTML = `${element.title}</h2>
            <p>Status: ${element.status}</p>
            <p>${element.description}</p>
            <p>Assigned to: ${element.assignedUser}</p>`;
          container.appendChild(card);
        });
      }

      function renderPaginationControls() {
        previousBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        currentPageSpan.hidden = currentPage === 1 || currentPage === totalPages;
      }
      currentPageSpan.innerText = currentPage.toString();

      renderPage(currentPage);
      renderPaginationControls();

    })
    
    .catch(err => console.error(err));
});
