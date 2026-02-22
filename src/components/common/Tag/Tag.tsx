import styles from "./Tag.module.css";

interface TagProps {
    label: string;
    removable?: boolean;
    onRemove?: () => void;
    className?: string;
}

const Tag = ({label, removable = false, onRemove, className}: TagProps) =>  {
    const liClassName = [styles.tagList, className].filter(Boolean).join(" ");

    return (
        <li className={liClassName}>
            <span>{label}</span>
            {removable && onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className={styles.removeBtn}
                    aria-label={`Remove filter: ${label}`}
                >
                    <span aria-hidden="true" className="textSmall">✕</span>
                </button>
            )}
        </li>
    );
}

export default Tag;