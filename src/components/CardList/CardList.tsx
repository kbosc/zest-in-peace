import useSetList from "../../hooks/useSetList/useSetList.ts";
import CardItem from "../common/CardItem/CardItem";
import Loader from "../common/Loader/Loader";
import styles from "./CardList.module.css";

const CardList = () => {
    const {sets, isLoading, error} = useSetList();

    if (isLoading) return <Loader/>;

    if (error) return (
        <p className={styles.error}>
            Oh mince... Il y a eu une erreur lors du chargement des sets. Veuillez réessayer plus tard.
        </p>
    );

    return (
        <div className={styles.container}>
            <p className={`textSmall ${styles.count}`}>{sets.length} sets disponibles, what... WHAT ?!</p>
            <ul className={styles.list}>
                {sets.map((set) => (
                    <CardItem key={set.code} set={set}/>
                ))}
            </ul>
        </div>
    );
};

export default CardList;
