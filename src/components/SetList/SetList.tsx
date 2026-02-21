import SetItem from "../common/SetItem/SetItem";
import Loader from "../Loader/Loader";
import styles from "./SetList.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setPanel} from "../../features/filters/filtersSlice";
import {useEffect, useRef} from "react";
import Button from "../common/Button/Button";

const SetList = () => {
    const {allSets: sets, isLoading, error} = useAppSelector((state) => state.sets);
    const dispatch = useAppDispatch();
    const isPanelOpen = useAppSelector(state => state.filters.isPanelOpen);
    const burgerBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isPanelOpen && burgerBtnRef.current) {
            burgerBtnRef.current?.focus()
        }
    }, [isPanelOpen]);

    if (isLoading) return <Loader/>;

    if (error) return (
        <p className={styles.error}>
            Oh mince... Il y a eu une erreur lors du chargement des sets. Veuillez réessayer plus tard.
        </p>
    );

    return (
        <div className={styles.container}>
            <div>
                <p className={`textSmall ${styles.count}`}>{sets.length} sets available, what... WHAT ?!</p>
                {/* FilterPanel Button - Mobile only - should moove to header i thinking */}
                <Button
                    ref={burgerBtnRef}
                    onClick={() => dispatch(setPanel(!isPanelOpen))}
                    className="textBig"
                    aria-label="Open filters panel"
                    aria-expanded={isPanelOpen}
                >
                    Filtres
                </Button>
            </div>
            <ul className={styles.list}>
                {sets.map((set) => (
                    <SetItem key={set.code} set={set}/>
                ))}
            </ul>
        </div>
    );
};

export default SetList;
