import { PagerData } from "./pager-data";

export interface RawPaginationDetails {
    pagerData: PagerData;
    sortCriteria: Map<string, number>;
    filterCriteria: Map<string, string>;
}
