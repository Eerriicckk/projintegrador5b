import { Link } from "react-router-dom"

const PageNotFound = ()=>{
    return (
        <div>
            <h1>Ops, algum erro aconteceu</h1>
            <Link to={"/home"}>Voltar a home</Link>
        </div>
    )
}

export default PageNotFound