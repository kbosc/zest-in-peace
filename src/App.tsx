import {useEffect} from "react";
import "./styles/global.css";
import useSetList from "./hooks/useSetList";
import CardList from "./components/CardList/CardList.tsx";

const App = () => {
    const {sets, isLoading, error} = useSetList();

    useEffect(() => {
        if (!isLoading && !error) {
            console.log("[App] Données complètes :", sets);
        }
    }, [sets, isLoading, error]);

    return (
        <main>
            <CardList/>
        </main>
    );
};

export default App;
