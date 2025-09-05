import { FilterCriterion } from "./filter-criterion";
import { PagerData } from "./pager-data";
import { SortCriterion } from "./sort-criterion";

export interface PaginationRequest {
    pagerData: PagerData;
    sortCriteria: SortCriterion[];
    filterCriteria: FilterCriterion[];
}
