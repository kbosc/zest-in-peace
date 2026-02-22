import styles from "./ErrorMessage.module.css";
import {mergeClassNames} from "../../../utils/mergeClassNames/mergeClassNames";

interface ErrorMessageProps {
    message: string;
    className?: string;
}

const ErrorMessage = ({message, className}: ErrorMessageProps) => (
    <p role="alert" className={mergeClassNames(styles.error, className)}>
        {message}
    </p>
);

export default ErrorMessage;