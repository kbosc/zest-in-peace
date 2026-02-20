import styles from "./Loader.module.css";

const Loader = () => (
    <div role="status" aria-live="polite" className={styles.loader}>
        <span className={styles.spinner}/>
        <span className="visuallyHidden">Chargement...</span>
    </div>
);

export default Loader;