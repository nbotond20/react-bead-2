import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContainer from "../utils/CardContainer";
import CenterContainer from "../utils/CenterContainer";
import style from "./css/My404Page.module.css";

const My404Page = () => {
    const naigate = useNavigate();

    return (
        <CardContainer>
            <CenterContainer>
                <div className={style.container}>
                    <h1 className={style.title}>404</h1>
                    <p className={style.description}>Page not found!</p>
                    <Button variant="contained" onClick={() => naigate('/')}>Go back</Button>
                </div>
            </CenterContainer>
        </CardContainer>
    );
}

export default My404Page;