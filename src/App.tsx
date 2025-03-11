import "./App.css";
import { Suspense } from "react";
import CategoriesComponent from "./components/Categories";
import { fetchCategories } from "./services/categories";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const categoriesPromise = fetchCategories();

  const centerClassNameTemp =
    "flex items-center justify-center mx-auto text-center my-5";
  return (
    <>
      <ToastContainer />
      <h1 className="my-5 mx-2 text-center pt-12 main-heading">
        Welcome to the iGaming project app
      </h1>
      <p className="text-center primary-body">
        Testing fetch data and error handling
      </p>
      <img
        src="/monkey-link.svg"
        alt="Monkey logo"
        className="w-4/12 mx-auto mt-5"
      />
      <ErrorBoundary
        fallback={
          <div className={centerClassNameTemp}>
            Something went wrong with loading categories
          </div>
        }
      >
        <Suspense
          fallback={
            <div className={centerClassNameTemp}>Loading categories...</div>
          }
        >
          <CategoriesComponent categoriesPromise={categoriesPromise} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
