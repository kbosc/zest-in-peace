import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
    message: string;
    className?: string;
}

const ErrorMessage = ({message, className}: ErrorMessageProps) => (
    <p role="alert" className={`${styles.error}${className ? ` ${className}` : ""}`}>
        {message}
    </p>
);

export default ErrorMessage;