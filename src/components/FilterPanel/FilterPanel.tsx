import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    resetFilters,
    setCardCountMax,
    setFoilOnly,
    setIsNonFoilOnly,
    setNameFilter,
    setOnlineOnly,
    setPanel,
} from "../../features/filters/filtersSlice";
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
            closeBtnRef.current?.focus()
        }
    }, [isPanelOpen]);

    const renderFilter = (filter: (typeof filters)[number]) => {
        switch (filter.type) {
            case "text": {
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
                            onChange={(e) => dispatch(setNameFilter(e.target.value))}
                        />
                    </div>
                );
            }
            case "boolean": {
                const value = active[filter.id as keyof typeof active] as boolean;
                const handleChange = (checked: boolean) => {
                    if (filter.id === "foilOnly") dispatch(setFoilOnly(checked));
                    if (filter.id === "isNonFoilOnly") dispatch(setIsNonFoilOnly(checked));
                    if (filter.id === "onlineOnly") dispatch(setOnlineOnly(checked));
                };
                return (
                    <div key={filter.id}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={value}
                                onChange={(e) => handleChange(e.target.checked)}
                            />
                            {filter.label}
                        </label>
                    </div>
                );
            }
            case "range": {
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
                                onChange={(e) => dispatch(setCardCountMax(Number(e.target.value)))}
                            />
                        </div>
                    </div>
                );
            }
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

            {/* Pannel */}
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



