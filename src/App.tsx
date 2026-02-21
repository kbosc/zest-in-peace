import {useEffect} from "react";
import "./styles/global.css";
import useSetList from "./hooks/useSetList/useSetList.ts";
import {fetchAvailableFilters} from "./api/filterService";
import CardList from "./components/CardList/CardList.tsx";

const App = () => {
    const {sets, isLoading, error} = useSetList();

    useEffect(() => {
        fetchAvailableFilters().then((filters) => {
            console.log("[App] Filtres disponibles :", filters);
        });
    }, []);

    useEffect(() => {
        if (!isLoading && !error) {
            console.log("[App] Sets chargés :", sets);
        }
    }, [sets, isLoading, error]);

    return (
        <main>
            <CardList/>
        </main>
    );
};

export default App;
