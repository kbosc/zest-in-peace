import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetFilters, setActiveFilter, setPanel} from "../../features/filters/filtersSlice";
import type {ActiveFilters} from "../../types/Filters";
import styles from "./FilterPanel.module.css";
import {useEffect, useRef} from "react";
import Button from "../common/Button/Button.tsx";
import FilterPanelItem from "./FilterPanelItem/FilterPanelItem";

const FilterPanel = () => {
    const filters = useAppSelector((state) => state.filters.available);
    const dispatch = useAppDispatch();
    const active = useAppSelector((state) => state.filters.active);
    const isPanelOpen = useAppSelector(state => state.filters.isPanelOpen);
    const handleClose = () => dispatch(setPanel(false));
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isPanelOpen && closeBtnRef.current) {
            closeBtnRef.current?.focus();
        }
    }, [isPanelOpen]);

    const handleChange = (id: keyof ActiveFilters, value: ActiveFilters[keyof ActiveFilters]) => {
        dispatch(setActiveFilter({id, value}));
    };

    return (
        <>
            <button
                aria-label="Close Filters Panel"
                className={`${styles.overlay} ${isPanelOpen ? styles.open : ""}`}
                onClick={handleClose}
            />
            <aside className={`${styles.panel} ${isPanelOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Filters</h2>
                    <button
                        ref={closeBtnRef}
                        className={`textBig ${styles.closeBtn}`}
                        onClick={handleClose}
                        aria-label="Close filters panel"
                    >
                        ✕
                    </button>
                </div>
                {filters.map((filter) => (
                    <FilterPanelItem
                        key={filter.id}
                        filter={filter}
                        active={active}
                        onChange={handleChange}
                    />
                ))}
                <Button
                    className={styles.resetBtn}
                    onClick={() => dispatch(resetFilters())}
                >
                    Reset filters
                </Button>
            </aside>
        </>
    );
};

export default FilterPanel;
