import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Questions from "./pages/Questions";
import NewQuestion from "./pages/NewQuestion";

function App() {
  return (
    <>
      <Router>
        <div className="w-1/2 mt-10 mx-auto">
          <nav className="w-full h-20 bg-neutral-400 flex items-center px-5 rounded-md">
            <ul className="flex justify-start items-center gap-5 font-semibold text-xl">
              <li>
                <Link to="/">Questions</Link>
              </li>
              <li>
                <Link to="/new">New Question</Link>
              </li>
            </ul>
          </nav>

          <div className="mt-5 bg-neutral-400 px-5 py-5 rounded-md">
            <Switch>
              <Route path="/" exact>
                <Questions />
              </Route>
              <Route path="/new" exact>
                <NewQuestion />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
