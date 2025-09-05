import { SelectOptionValueText } from "./select-option-value-text";

export interface SelectOptionList {
    columnName: string;
    foreignKey: string;
    options: SelectOptionValueText[];
}
