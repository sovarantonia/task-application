export class Pagination {
    constructor(elementList) {
        this.list = elementList;
    }

    getPaginatedElements({currentPage, itemsPerPage}) {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return this.list.slice(start, end);
    }

    getTotalPages(itemsPerPage) {
        return Math.ceil(this.list.length / itemsPerPage);
    }
}