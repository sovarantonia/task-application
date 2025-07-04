export class TaskPage {
  constructor(taskService) {
    this.taskService = taskService;

    this.container = document.getElementById("taskContainer");
    this.select = document.getElementById("itemsPerPageSelect");

    this.previousBtn = document.getElementById("previousBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentPageSpan = document.getElementById("currentPageSpan");
    this.firstPageBtn = document.getElementById("firstPageBtn");
    this.lastPageBtn = document.getElementById("lastPageBtn");
        
    this.currentPage = 1;
    this.itemsPerPage = parseInt(this.select.value);
    this.totalPages = this.taskService.getTotalPages(this.itemsPerPage);

    this.lastPageBtn.innerText = this.totalPages.toString();
  }

  attachEvents() {
    this.select.addEventListener("change", (e) => {
        this.itemsPerPage = parseInt(e.target.value);
        this.currentPage = 1;
        this.currentPageSpan.innerText = this.currentPage.toString();
        this.totalPages = this.taskService.getTotalPages(this.itemsPerPage);
        this.lastPageBtn.innerText = this.totalPages.toString();

        renderPage(this.currentPage);
        renderPaginationControls();
    });

    this.previousBtn.addEventListener("click", () => {
        if(this.currentPage > 1) {
          this.currentPage --;
        }
        this.currentPageSpan.innerText = this.currentPage.toString();
        renderPage(this.currentPage);
        renderPaginationControls();
    });

        
    this.nextBtn.addEventListener("click", () => {
      if(this.currentPage < this.totalPages) {
        this.currentPage ++;
      }
          
      this.currentPageSpan.innerText = this.currentPage.toString();
      renderPage(this.currentPage);
      renderPaginationControls();
    });

    this.firstPageBtn.addEventListener("click", () => {
      this.currentPage = 1;
      renderPage(this.currentPage);
      renderPaginationControls();
    });

    this.lastPageBtn.addEventListener("click", () => {
      this.currentPage = this.totalPages;
      renderPage(this.currentPage);
      renderPaginationControls();
    })
  }

  renderPage(page) {
        this.container.innerHTML = "";
        const paginatedTasks = this.taskService.getPaginatedTasks({currentPage: page, itemsPerPage: this.itemsPerPage});

        paginatedTasks.forEach(element => {
          const card = document.createElement("div");
          card.className = "task-card";
          card.innerHTML = `${element.title}</h2>
            <p>Status: ${element.status}</p>
            <p>${element.description}</p>
            <p>Assigned to: ${element.assignedUser}</p>`;
          this.container.appendChild(card);
        });

        this.currentPageSpan.innerText = this.currentPage.toString();
      }

  renderPaginationControls() {
        this.previousBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPages;
        this.currentPageSpan.hidden = this.currentPage === 1 || this.currentPage === this.totalPages;
      }
      
}
