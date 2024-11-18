import { useState } from 'react';
import style from "../ButtonRegistro/buttonregistro.module.css";

const ButtonRegistro = ({
    label = "vacio",
    onClick,
}: {
    label?: string;
    onClick?: () => Promise<void> | void;
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (onClick) {
            setIsLoading(true);
            try {
                await onClick();
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`${style["container-button-registro"]} ${isLoading ? style["button-loading"] : ""}`}
            disabled={isLoading}
        >
            {isLoading ? <span className={style["loader"]}></span> : label}
        </button>
    );
};

export default ButtonRegistro;
