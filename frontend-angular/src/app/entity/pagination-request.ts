import { PagerData } from "./pager-data";

export interface PaginationRequest {
    pagerData: PagerData;
    sortCriteria: any[];
    filterCriteria: any[];
}
