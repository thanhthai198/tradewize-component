"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUpdateLayoutEffect = useUpdateLayoutEffect;
var _react = require("react");
/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * Idea stolen from: https://stackoverflow.com/a/55075818/1526448
 * @param {()=>void} effect the function to call
 * @param {DependencyList} dependencies the state(s) that fires the update
 */
function useUpdateLayoutEffect(effect, dependencies = []) {
  const isInitialMount = (0, _react.useRef)(true);
  (0, _react.useLayoutEffect)(() => {
    if (isInitialMount.current) isInitialMount.current = false;else effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);
}
//# sourceMappingURL=useUpdateLayoutEffect.js.map