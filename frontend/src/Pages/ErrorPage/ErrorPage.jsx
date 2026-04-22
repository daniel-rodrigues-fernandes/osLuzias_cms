import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div>
            <h1>Erro</h1>
            <p>{error.status} - {error.statusText || error.data}</p>
        </div>
    );
}