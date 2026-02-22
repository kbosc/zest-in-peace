import {type ReactElement} from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store as globalStore} from "../../app/store";
import {type TestStore} from "./createTestWrapper";

/**
 * Renders a component wrapped in a Redux Provider.
 *
 * - Without argument: uses the global store (simple component tests)
 * - With a store: uses a fresh store (tests that need controlled state)
 *
 * @example
 * // Simple render
 * renderWithProvider(<MyComponent/>);
 *
 * // With controlled state
 * const store = createTestStore();
 * store.dispatch(fetchSetsSuccess([mockSet]));
 * renderWithProvider(<MyComponent/>, store);
 */
const renderWithProvider = (children: ReactElement, store: TestStore = globalStore as unknown as TestStore) =>
    render(
        <Provider store={store}>
            {children}
        </Provider>
    );

export default renderWithProvider;