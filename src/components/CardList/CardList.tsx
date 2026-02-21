import useSetList from "../../hooks/useSetList/useSetList.ts";
import CardItem from "../common/CardItem/CardItem";
import Loader from "../Loader/Loader";
import styles from "./CardList.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {setPanel} from "../../features/filters/filtersSlice.ts";
import {useEffect, useRef} from "react";
import Button from "../common/Button/Button.tsx";

const CardList = () => {
    const {sets, isLoading, error} = useSetList();
    const dispatch = useAppDispatch();
    const isPanelOpen = useAppSelector(state => state.filters.isPanelOpen);
    const burgerBtnRef = useRef<HTMLButtonElement>(null);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
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
                <p className={`textSmall ${styles.count}`}>{sets.length} sets disponibles, what... WHAT ?!</p>
                {/* Bouton burger — mobile uniquement */}
                <Button
                    ref={burgerBtnRef}
                    onClick={() => dispatch(setPanel(!isPanelOpen))}
                    className="textBig"
                    aria-label="Open filters panel"
                >
                    Filtres
                </Button>
            </div>
            <ul className={styles.list}>
                {sets.map((set) => (
                    <CardItem key={set.code} set={set}/>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
