import SetItem from "../common/SetItem/SetItem";
import Loader from "../Loader/Loader";
import ErrorMessage from "../common/ErrorMessage/ErrorMessage";
import styles from "./SetList.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setPanel} from "../../features/filters/filtersSlice";
import {useEffect, useRef} from "react";
import Button from "../common/Button/Button";
import {filterSets} from "../../utils/filterSets/filterSets.ts";
import {mergeClassNames} from "../../utils/mergeClassNames/mergeClassNames.ts";
import {SET_LOAD_ERROR} from "./SetList.constants.ts";


const SetList = () => {
    const {allSets, isLoading, error} = useAppSelector((state) => state.sets);
    const activeFilters = useAppSelector((state) => state.filters.active);
    const isPanelOpen = useAppSelector((state) => state.filters.isPanelOpen);
    const dispatch = useAppDispatch();
    const burgerBtnRef = useRef<HTMLButtonElement>(null);

    const filteredSets = filterSets(allSets, activeFilters);

    useEffect(() => {
        if (!isPanelOpen && burgerBtnRef.current) {
            burgerBtnRef.current?.focus()
        }
    }, [isPanelOpen]);

    if (isLoading) return <Loader/>;
    if (error) return <ErrorMessage message={SET_LOAD_ERROR}/>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={`textSmall ${styles.count}`}>
                    {filteredSets.length} / {allSets.length} sets available
                </p>
                <Button
                    ref={burgerBtnRef}
                    onClick={() => dispatch(setPanel(!isPanelOpen))}
                    className={mergeClassNames(styles.buttonPanel, "textBig")}
                    aria-label="Open filters panel"
                    aria-expanded={isPanelOpen}
                >
                    Filters
                </Button>
            </div>
            <ul className={styles.list}>
                {filteredSets.map((set) => (
                    <SetItem key={set.code} set={set}/>
                ))}
            </ul>
        </div>
    );
};

export default SetList;
