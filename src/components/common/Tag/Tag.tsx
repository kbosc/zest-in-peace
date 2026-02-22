import styles from "./Tag.module.css";

interface TagProps {
    label: string;
    className?: string;
}

const Tag = ({label, className}: TagProps) => (
    <li className={`${styles.tag}${className ? ` ${className}` : ""}`}>
        {label}
    </li>
);

export default Tag;