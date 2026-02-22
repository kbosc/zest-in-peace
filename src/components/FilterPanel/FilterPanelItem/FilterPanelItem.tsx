import type {ActiveFilters, AvailableFilter} from "../../../types/Filters";
import FilterInputText from "../../common/FilterInputText/FilterInputText";
import FilterInputBoolean from "../../common/FilterInputBoolean/FilterInputBoolean";
import FilterInputRange from "../../common/FilterInputRange/FilterInputRange";
import styles from "./FilterPanelItem.module.css";

interface FilterPanelItemProps {
    filter: AvailableFilter;
    active: ActiveFilters;
    onChange: (id: keyof ActiveFilters, value: ActiveFilters[keyof ActiveFilters]) => void;
}

const FilterPanelItem = ({filter, active, onChange}: FilterPanelItemProps) => {
    switch (filter.type) {
        case "text":
            return (
                <FilterInputText
                    id={filter.id}
                    label={filter.label}
                    value={active[filter.id as keyof ActiveFilters] as string}
                    placeholder={filter.placeholder}
                    onChange={(value) => onChange(filter.id as keyof ActiveFilters, value)}
                    classNames={{group: styles.filterGroup, label: "titleSmall", input: styles.input}}
                />
            );
        case "boolean":
            return (
                <FilterInputBoolean
                    id={filter.id}
                    label={filter.label}
                    checked={active[filter.id as keyof ActiveFilters] as boolean}
                    onChange={(value) => onChange(filter.id as keyof ActiveFilters, value)}
                    classNames={{label: styles.checkboxLabel, input: styles.checkbox}}
                />
            );
        case "range":
            return (
                <FilterInputRange
                    id={filter.id}
                    label={filter.label}
                    value={active.cardCountMax}
                    min={filter.min}
                    max={filter.max}
                    onChange={(value) => onChange("cardCountMax", value)}
                    classNames={{
                        group: styles.filterGroup,
                        wrapper: styles.rangeWrapper,
                        values: `textSmall ${styles.rangeValues}`,
                        input: styles.range,
                    }}
                />
            );
        default:
            return null;
    }
};

export default FilterPanelItem;