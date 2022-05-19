import style from './css/CenterContainer.module.css';

const CenterContainer = ({ children }) => {
    return <div className={style.container}>{children}</div>;
};

export default CenterContainer;