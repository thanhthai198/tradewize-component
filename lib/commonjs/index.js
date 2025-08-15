"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ScrollTabView: true,
  ButtonBase: true,
  RadioButton: true,
  ButtonSwitchToggle: true,
  TabView: true,
  InputBase: true,
  OutlinedInput: true,
  FlatInput: true,
  Collapse: true,
  CameraComponent: true,
  CameraModal: true,
  getScreenWidth: true,
  getScreenHeight: true,
  VideoPlayer: true,
  VideoModal: true
};
Object.defineProperty(exports, "ButtonBase", {
  enumerable: true,
  get: function () {
    return _ButtonBase.ButtonBase;
  }
});
Object.defineProperty(exports, "ButtonSwitchToggle", {
  enumerable: true,
  get: function () {
    return _ButtonSwitchToggle.ButtonSwitchToggle;
  }
});
Object.defineProperty(exports, "CameraComponent", {
  enumerable: true,
  get: function () {
    return _Camera.CameraComponent;
  }
});
Object.defineProperty(exports, "CameraModal", {
  enumerable: true,
  get: function () {
    return _Camera.CameraModal;
  }
});
Object.defineProperty(exports, "Collapse", {
  enumerable: true,
  get: function () {
    return _Collaspe.Collapse;
  }
});
Object.defineProperty(exports, "FlatInput", {
  enumerable: true,
  get: function () {
    return _Input.FlatInput;
  }
});
Object.defineProperty(exports, "InputBase", {
  enumerable: true,
  get: function () {
    return _InputBase.InputBase;
  }
});
Object.defineProperty(exports, "OutlinedInput", {
  enumerable: true,
  get: function () {
    return _Input.OutlinedInput;
  }
});
Object.defineProperty(exports, "RadioButton", {
  enumerable: true,
  get: function () {
    return _RadioButton.RadioButton;
  }
});
Object.defineProperty(exports, "ScrollTabView", {
  enumerable: true,
  get: function () {
    return _ScrollTabView.ScrollTabView;
  }
});
Object.defineProperty(exports, "TabView", {
  enumerable: true,
  get: function () {
    return _TabView.TabView;
  }
});
Object.defineProperty(exports, "VideoModal", {
  enumerable: true,
  get: function () {
    return _VideoPlayer.VideoModal;
  }
});
Object.defineProperty(exports, "VideoPlayer", {
  enumerable: true,
  get: function () {
    return _VideoPlayer.VideoPlayer;
  }
});
Object.defineProperty(exports, "getScreenHeight", {
  enumerable: true,
  get: function () {
    return _utils.getScreenHeight;
  }
});
Object.defineProperty(exports, "getScreenWidth", {
  enumerable: true,
  get: function () {
    return _utils.getScreenWidth;
  }
});
var _ScrollTabView = require("./ScrollTabView");
var _ButtonBase = require("./ButtonBase");
var _RadioButton = require("./RadioButton");
var _ButtonSwitchToggle = require("./ButtonSwitchToggle");
var _TabView = require("./TabView");
var _InputBase = require("./InputBase");
var _Input = require("./Input");
var _Collaspe = require("./Collaspe");
var _Camera = require("./Camera");
var _utils = require("./utils");
var _VideoPlayer = require("./VideoPlayer");
var _GiftedChat = require("./GiftedChat");
Object.keys(_GiftedChat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _GiftedChat[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _GiftedChat[key];
    }
  });
});
var _IndicatorsMaster = require("./IndicatorsMaster");
Object.keys(_IndicatorsMaster).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _IndicatorsMaster[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _IndicatorsMaster[key];
    }
  });
});
var _FloatButton = require("./FloatButton");
Object.keys(_FloatButton).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FloatButton[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FloatButton[key];
    }
  });
});
//# sourceMappingURL=index.js.map