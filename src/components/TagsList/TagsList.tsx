import {useAppSelector} from "../../app/hooks";
import {filterTags} from "../../utils/filterTags/filterTags";
import Tag from "../common/Tag/Tag";
import styles from "./TagsList.module.css";

const TagsList = () => {
    const activeFilters = useAppSelector((state) => state.filters.active);
    const tags = filterTags(activeFilters);

    return (
        <section aria-label="Active filters">
            <h2 className="visuallyHidden">Active filters</h2>
            <ul
                aria-label={`${tags.length} active filter${tags.length > 1 ? "s" : ""}`}
                className={styles.listContainer}
            >
                {tags.map((tag) => (
                    <Tag key={tag} label={tag} className="textSmall"/>
                ))}
            </ul>
        </section>
    );
};

export default TagsList;