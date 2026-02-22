import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {filterTags} from "../../utils/filterTags/filterTags";
import {clearFilter} from "../../features/filters/filtersSlice";
import Tag from "../common/Tag/Tag";
import styles from "./TagsList.module.css";

const TagsList = () => {
    const dispatch = useAppDispatch();
    const activeFilters = useAppSelector((state) => state.filters.active);
    const tags = filterTags(activeFilters);
    console.log({tags})

    return (
        <section aria-label="Active filters">
            <h2 className="visuallyHidden">Active filters</h2>
            <ul
                aria-label={`${tags.length} active filter${tags.length > 1 ? "s" : ""}`}
                className={styles.listContainer}
            >
                {tags.map((tag) => (
                    <Tag
                        key={tag.key}
                        label={tag.label}
                        removable={tag.removable}
                        onRemove={tag.onRemove
                            ? () => dispatch(clearFilter(tag.onRemove!(activeFilters)))
                            : undefined
                        }
                        className="textSmall"
                    />
                ))}
            </ul>
        </section>
    );
};

export default TagsList;