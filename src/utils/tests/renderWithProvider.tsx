import {type ReactElement} from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../../app/store.ts";

/**
 * Rendering helper for wraps with redux provider
 */
const renderWithProvider = (children: ReactElement) => {
    return render(
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default renderWithProvider;