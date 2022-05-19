import style from './css/CardContainer.module.css';

const CardContainer = ({ children }) => {
    return <div className={style.container}>{children}</div>;
};

export default CardContainer;