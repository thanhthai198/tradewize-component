"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Day: true
};
exports.Day = Day;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime"));
var _calendar = _interopRequireDefault(require("dayjs/plugin/calendar"));
var _Constant = require("../Constant");
var _GiftedChatContext = require("../GiftedChatContext");
var _styles = _interopRequireDefault(require("../styles"));
var _styles2 = _interopRequireDefault(require("./styles"));
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
_dayjs.default.extend(_relativeTime.default);
_dayjs.default.extend(_calendar.default);
function Day({
  dateFormat = _Constant.DATE_FORMAT,
  dateFormatCalendar,
  createdAt,
  containerStyle,
  wrapperStyle,
  textStyle
}) {
  const {
    getLocale
  } = (0, _GiftedChatContext.useChatContext)();
  const dateStr = (0, _react.useMemo)(() => {
    if (createdAt == null) return null;
    const now = (0, _dayjs.default)().startOf('day');
    const date = (0, _dayjs.default)(createdAt).locale(getLocale()).startOf('day');
    if (!now.isSame(date, 'year')) return date.format('D MMMM YYYY');
    if (now.diff(date, 'days') < 1) return date.calendar(now, {
      sameDay: '[Today]',
      ...dateFormatCalendar
    });
    return date.format(dateFormat);
  }, [createdAt, dateFormat, getLocale, dateFormatCalendar]);
  if (!dateStr) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.default.centerItems, _styles2.default.container, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles2.default.wrapper, wrapperStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [_styles2.default.text, textStyle]
  }, dateStr)));
}
//# sourceMappingURL=index.js.map