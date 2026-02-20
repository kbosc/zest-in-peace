import type {MtgSet} from "../../../types/Card";
import styles from "./CardItem.module.css";

interface CardItemProps {
    set: MtgSet;
}

const CardItem = ({set}: CardItemProps) => (
    <li className={styles.card}>
        <h3 className="titleSmall">{set.name}</h3>
        <div className={styles.meta}>
            <span className={`textMedium ${styles.code}`}>{set.code}</span>
            <span className={`textMedium ${styles.type}`}>{set.type.replace("_", " ")}</span>
            <span className="textMedium">{set.releaseDate}</span>
            <span className="textMedium">{set.totalSetSize} cartes</span>
        </div>
    </li>
);

export default CardItem;