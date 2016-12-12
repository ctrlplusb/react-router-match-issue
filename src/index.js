import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Match, Link } from 'react-router'
import matchRoutesToLocation from 'react-router-addons-routes/matchRoutesToLocation';

// This is the code that seems to break the route matching of Bar.
const CustomRouteMatcher = ({ location, children }) => {
  const customRoutes = [{ pattern: '/foo' }];
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

          <Match pattern="/foo" component={Foo} />
        </CustomRouteMatcher>
      )
    }
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('app'))
