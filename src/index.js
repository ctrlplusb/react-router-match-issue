import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Match, Link } from 'react-router'
import matchRoutesToLocation from 'react-router-addons-routes/matchRoutesToLocation';

// This is the code that seems to break the route matching of Bar.
const CustomRouteMatcher = ({ location, children }) => {
  const customRoutes = [{ pattern: '/foo/' }];
  const matches = matchRoutesToLocation(customRoutes, location);
  return <div>{children}</div>;
}

const Bar = () => <h2>bar</h2>

const Foo = ({ pathname }) => (
  <div>
    <h2>Foo</h2>
    <Match pattern={`${pathname}/bar`} component={Bar} />
  </div>
)

const App = () => (
  <BrowserRouter>
    {
      routerProps => (
        <CustomRouteMatcher {...routerProps}>
          <h1>Route Matcher Debugging</h1>
          <ul>
            <li><Link to="/foo">Foo</Link></li>
            <li><Link to="/foo/bar">Bar</Link></li>
          </ul>

          <p>
            Clicking on "Foo" or "Bar" should both resolve in routes, however,
            as we are using the
            &nbsp;<code>react-router-addons-routes/matchRoutesToLocation</code>&nbsp;
            to match against a custom set of routes which includes a "/foo"
            route our "/foo/bar" Match never gets hit.
          </p>

          <p>
            Look at the &nbsp;<code>CustomRouteMatcher</code>&nbsp;
            component in the src folder. Clear the customRoutes array and then try
            browse to "/foo/bar" - you will notice it now gets matched.
          </p>

          <p>
            Interestingly, if you append a "/" to the end of "/foo" in the
            customRoutes array you will notice that matching now works correctly
            and the Bar component is rendered.
          </p>

          <p>
            I suspect there is an issue with the way the internals of react-router
            caches routes/matches perhaps?
          </p>

          <Match pattern="/foo" component={Foo} />
        </CustomRouteMatcher>
      )
    }
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
