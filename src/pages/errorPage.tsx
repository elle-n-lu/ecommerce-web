import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error:any = useRouteError();
//   console.error(error);

  return (
    <div className=" h-full w-full text-center mt-56">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}