import {forwardRef} from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
         className,
         children,
         onClick
     }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className={`${styles.button} ${className ?? ""}`}
            >
                {children}
            </button>
        );
    });

export default Button;