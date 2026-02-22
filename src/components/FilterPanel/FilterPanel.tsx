import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetFilters, setActiveFilter, setPanel} from "../../features/filters/filtersSlice";
import type {ActiveFilters} from "../../types/Filters";
import styles from "./FilterPanel.module.css";
import {useEffect, useRef} from "react";
import Button from "../common/Button/Button.tsx";

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

    const renderFilter = (filter: (typeof filters)[number]) => {
        switch (filter.type) {
            case "text":
                return (
                    <div key={filter.id} className={styles.filterGroup}>
                        <label className="titleSmall" htmlFor={filter.id}>
                            {filter.label}
                        </label>
                        <input
                            id={filter.id}
                            type="text"
                            className={styles.input}
                            placeholder={filter.placeholder}
                            value={active.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>
                );
            case "boolean":
                return (
                    <div key={filter.id}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={active[filter.id as keyof ActiveFilters] as boolean}
                                onChange={(e) => handleChange(filter.id as keyof ActiveFilters, e.target.checked)}
                            />
                            {filter.label}
                        </label>
                    </div>
                );
            case "range":
                return (
                    <div key={filter.id} className={styles.filterGroup}>
                        <span>{filter.label}</span>
                        <div className={styles.rangeWrapper}>
                            <div className={`textSmall ${styles.rangeValues}`}>
                                <span>0</span>
                                <span>{active.cardCountMax}</span>
                            </div>
                            <input
                                type="range"
                                className={styles.range}
                                min={filter.min}
                                max={filter.max}
                                value={active.cardCountMax}
                                onChange={(e) => handleChange("cardCountMax", Number(e.target.value))}
                            />
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <div
                aria-label="panel overlay"
                className={`${styles.overlay} ${isPanelOpen ? styles.open : ""}`}
                onClick={handleClose}
                onKeyDown={(e) => e.key === "Escape" && handleClose()}
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

                {filters.map(renderFilter)}

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
