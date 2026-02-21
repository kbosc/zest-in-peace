import {useEffect} from "react";
import "./styles/global.css";
import useSetList from "./hooks/useSetList/useSetList";
import useFilterList from "./hooks/useFilterList/useFilterList";
import CardList from "./components/CardList/CardList";

const App = () => {
    const {sets, isLoading, error} = useSetList();
    const {filters} = useFilterList();

    useEffect(() => {
        if (filters.length > 0) {
            console.log("[App] Available filters :", filters);
        }
    }, [filters]);

    useEffect(() => {
        if (!isLoading && !error) {
            console.log("[App] Sets loaded :", sets);
        }
    }, [sets, isLoading, error]);

    return (
        <div className="layout">
            <main className="main-content">
                <CardList/>
            </main>
        </div>
    );
};

export default App;
