## react-router-addons-routes bug report

https://github.com/ReactTraining/react-router-addons-routes/issues/15

```bash
yarn
npm run start
```

---

An example application is contained withing `src/index.js` which demonstrates a minimum routing configuration to recreate this issue.

Clicking on "Foo" or "Bar" should both resolve in routes, however, as we are using `react-router-addons-routes/matchRoutesToLocation` to match against a custom set of routes before any of our `Match` components get rendered something strange occurs and our "/foo/bar" `Match` component never gets rendered.

Look at the `CustomRouteMatcher` component in the src folder for the custom routing implementation. If you clear the `customRoutes` array and then try browse to "/foo/bar" - you will notice all the expected `Match` components get rendered.

Interestingly, if you append a "/" to the end of "/foo" in the `customRoutes` array you will notice that matching now works correctly and the `Bar` component is rendered.

I suspect there may be an issue with the way the internals of `react-router` caches routes/matches perhaps?

---

[LIVE EXAMPLE](https://react-router-match-debugging-wygetnppwf.now.sh)
