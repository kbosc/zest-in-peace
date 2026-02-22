import "./styles/global.css";
import useSetList from "./hooks/useSetList/useSetList";
import useFilterList from "./hooks/useFilterList/useFilterList";
import SetList from "./components/SetList/SetList";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import styles from "./App.module.css";
import TagsList from "./components/TagsList/TagsList.tsx";

/**
 * single entry point for data fetching.
 * useSetList and useFilterList are called ONLY here.
 * Child components read data directly from the Redux store.
 */
const App = () => {
    useSetList();
    useFilterList();

    return (
        <div className={styles.layout}>
            <FilterPanel/>
            <main className={styles.mainContent}>
                <TagsList/>
                <SetList/>
            </main>
        </div>
    );
};

export default App;
