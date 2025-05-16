(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __pow = Math.pow;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    const noExtend = ["__proto__", "constructor", "prototype"];
    Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
      if (typeof target[key] === "undefined") target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent2() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  // node_modules/swiper/shared/utils.mjs
  function classesToTokens(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return classes2.trim().split(" ").filter((c) => !!c.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
      }
      try {
        delete object[key];
      } catch (e) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m41;
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
      else curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m42;
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
      else curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o) {
    return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function elementChildren(element, selector) {
    if (selector === void 0) {
      selector = "";
    }
    const window2 = getWindow();
    const children = [...element.children];
    if (window2.HTMLSlotElement && element instanceof HTMLSlotElement) {
      children.push(...element.assignedElements());
    }
    if (!selector) {
      return children;
    }
    return children.filter((el) => el.matches(selector));
  }
  function elementIsChildOfSlot(el, slot) {
    const elementsQueue = [slot];
    while (elementsQueue.length > 0) {
      const elementToCheck = elementsQueue.shift();
      if (el === elementToCheck) {
        return true;
      }
      elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
    }
  }
  function elementIsChildOf(el, parent) {
    const window2 = getWindow();
    let isChild = parent.contains(el);
    if (!isChild && window2.HTMLSlotElement && parent instanceof HTMLSlotElement) {
      const children = [...parent.assignedElements()];
      isChild = children.includes(el);
      if (!isChild) {
        isChild = elementIsChildOfSlot(el, parent);
      }
    }
    return isChild;
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector)) prevEls.push(prev);
      } else prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector)) nextEls.push(next);
      } else nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }
      return i;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector)) parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }
  function makeElementsArray(el) {
    return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
  }

  // node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad) ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    const device = getDevice();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
    const isSafariBrowser = isSafari();
    const need3dFix = isSafariBrowser || isWebView && device.ios;
    return {
      isSafari: needPerspectiveFix || isSafariBrowser,
      needPerspectiveFix,
      need3dFix,
      isWebView
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper.el) return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized) return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const observers = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__) return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer) return;
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.hostEl);
        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      }
      attach(swiper.hostEl, {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2]) self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      function onceHandler() {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (typeof handler !== "function") return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsAnyListeners) return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit() {
      const self = this;
      if (!self.eventsListeners || self.destroyed) return self;
      if (!self.eventsListeners) return self;
      let events2;
      let data;
      let context;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width)) width = 0;
    if (Number.isNaN(height)) height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slides);
    } else if (swiper.grid) {
      swiper.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i]) slide2 = slides[i];
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide2, slides);
      }
      if (slides[i] && elementStyle(slide2, "display") === "none") continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[swiper.getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths) slideSize = Math.floor(slideSize);
        if (slides[i]) {
          slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (params.setWrapperSize) {
      wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups2 = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i = 0; i < groups2; i += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0) snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params.cssMode || params.loop) return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0) return -offsetBefore;
        if (snap > maxSnap) return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
      if (allSlidesSize + offsetSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    swiper.emit("slidesUpdated");
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }
      return swiper.slides[index];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          const index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual) break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }
  var toggleSlideClasses$1 = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0) return;
    if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl) offsetCenter = translate2;
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide2 = slides[i];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide2);
        swiper.visibleSlidesIndexes.push(i);
      }
      toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
      toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded) progress = 0;
      if (isEndRounded) progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1) progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }
  var toggleSlideClasses = (slideEl, condition, className) => {
    if (condition && !slideEl.classList.contains(className)) {
      slideEl.classList.add(className);
    } else if (!condition && slideEl.classList.contains(className)) {
      slideEl.classList.remove(className);
    }
  };
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
    };
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.find((slideEl) => slideEl.column === activeIndex);
        nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1);
        prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1);
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      if (!gridEnabled) {
        nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
      }
    }
    slides.forEach((slideEl) => {
      toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
      toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
      toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
    });
    swiper.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper, imageEl) => {
    if (!swiper || swiper.destroyed || !swiper.params) return;
    const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      if (!lazyEl && swiper.isElement) {
        if (slideEl.shadowRoot) {
          lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
        } else {
          requestAnimationFrame(() => {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
              if (lazyEl) lazyEl.remove();
            }
          });
        }
      }
      if (lazyEl) lazyEl.remove();
    }
  };
  var unlazy = (swiper, index) => {
    if (!swiper.slides[index]) return;
    const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
    if (imageEl) imageEl.removeAttribute("loading");
  };
  var preload = (swiper) => {
    if (!swiper || swiper.destroyed || !swiper.params) return;
    let amount = swiper.params.lazyPreloadPrevNext;
    const len = swiper.slides.length;
    if (!len || !amount || amount < 0) return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
    const activeIndex = swiper.activeIndex;
    if (swiper.params.grid && swiper.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_, i) => {
        return activeColumn + slidesPerView + i;
      }));
      swiper.slides.forEach((slideEl, i) => {
        if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper.params.rewind || swiper.params.loop) {
      for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
        const realIndex = (i % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
      }
    } else {
      for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
        if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
          unlazy(swiper, i);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper) {
    const {
      slidesGrid,
      params
    } = swiper;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper.virtual.slides.length) {
        realIndex2 -= swiper.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    let realIndex;
    if (swiper.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params.grid.rows);
    } else if (swiper.slides[activeIndex]) {
      const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper.initialized) {
      preload(swiper);
    }
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper.emit("realIndexChange");
      }
      swiper.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper = this;
    const params = swiper.params;
    let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
    if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide2) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper.clickedSlide = slide2;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl) currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper.isHorizontal()) {
      x = rtl ? -translate2 : translate2;
    } else {
      y = translate2;
    }
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;
    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x -= swiper.cssOverflowAdjustment();
      } else {
        y -= swiper.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate2);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper = this;
    const {
      params,
      wrapperEl
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2) newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2) newTranslate = maxTranslate2;
    else newTranslate = translate2;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper || swiper.destroyed) return;
            if (e.target !== this) return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            swiper.animating = false;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
    }
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) dir = "next";
      else if (activeIndex < previousIndex) dir = "prev";
      else dir = "reset";
    }
    swiper.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    if (params.cssMode) return;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.animating = false;
    if (params.cssMode) return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0) slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex) direction = "next";
    else if (slideIndex < activeIndex) direction = "prev";
    else direction = "reset";
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    const isInitialVirtual = isVirtual && initial;
    if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t = rtl ? translate2 : -translate2;
      if (speed === 0) {
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth"
        });
      }
      return true;
    }
    const browser2 = getBrowser();
    const isSafari = browser2.isSafari;
    if (isVirtual && !initial && isSafari && swiper.isElement) {
      swiper.virtual.update(false, false, slideIndex);
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    if (swiper.destroyed) return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    let newIndex = index;
    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          targetSlideIndex = swiper.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
        const {
          centeredSlides
        } = swiper.params;
        let slidesPerView = swiper.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
          if (centeredSlides && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (centeredSlides) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
          needLoopFix = false;
        }
        if (needLoopFix) {
          const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
          swiper.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
        } else {
          newIndex = swiper.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper;
  }
  function slideNext(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      enabled,
      params,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed) return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: "next"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
      if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
        requestAnimationFrame(() => {
          swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed) return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding) return false;
      swiper.loopFix({
        direction: "prev"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    const isFreeMode = params.freeMode && params.freeMode.enabled;
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    if (swiper.destroyed) return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper = this;
    if (swiper.destroyed) return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate2 >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    if (swiper.destroyed) return;
    const {
      params,
      slidesEl
    } = swiper;
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;
    const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper.animating) return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex, initial) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
    const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i = 0; i < amountOfSlides; i += 1) {
        const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
        swiper.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    swiper.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next",
      initial
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      initial,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper = this;
    if (!swiper.params.loop) return;
    swiper.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper;
    const {
      centeredSlides,
      initialSlide
    } = params;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!params.centeredSlides && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    let slidesPerView = params.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
      if (centeredSlides && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
    let loopedSlides = slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params.loopAdditionalSlides;
    swiper.loopedSlides = loopedSlides;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
    const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !centeredSlides;
    let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params.slideActiveClass)));
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
            if (slides[i2].column === colIndexToPrepend) prependSlidesIndexes.push(i2);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      if (isInitialOverflow) {
        slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
      }
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index) appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
    if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
      if (appendSlidesIndexes.includes(activeSlideIndex)) {
        appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
      if (prependSlidesIndexes.includes(activeSlideIndex)) {
        prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
      }
    }
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper.slides.forEach((slide2, slideIndex) => {
        swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
      });
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff2 = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff2);
          } else {
            swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff2;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff2;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
          const diff2 = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff2);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff2;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff2;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop) c.loopFix(__spreadProps(__spreadValues({}, loopParams), {
            slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
          }));
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix(__spreadProps(__spreadValues({}, loopParams), {
          slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        }));
      }
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow()) return null;
      if (el.assignedSlot) el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper, event2, startX) {
    const window2 = getWindow();
    const {
      params
    } = swiper;
    const edgeSwipeDetection = params.edgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    let e = event2;
    if (e.originalEvent) e = e.originalEvent;
    const data = swiper.touchEventsData;
    if (e.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
        return;
      }
      data.pointerId = e.pointerId;
    } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
      data.touchId = e.targetTouches[0].identifier;
    }
    if (e.type === "touchstart") {
      preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
      return;
    }
    const {
      params,
      touches,
      enabled
    } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && e.pointerType === "mouse") return;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }
    let targetEl = e.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
    }
    if ("which" in e && e.which === 3) return;
    if ("button" in e && e.button > 0) return;
    if (data.isTouched && data.isMoved) return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = e.composedPath ? e.composedPath() : e.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler)) return;
    }
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper, e, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0) data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && event2.pointerType === "mouse") return;
    let e = event2;
    if (e.originalEvent) e = e.originalEvent;
    if (e.type === "pointermove") {
      if (data.touchId !== null) return;
      const id = e.pointerId;
      if (id !== data.pointerId) return;
    }
    let targetTouch;
    if (e.type === "touchmove") {
      targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId) return;
    } else {
      targetTouch = e;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
        return;
      } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
        return;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
      document2.activeElement.blur();
    }
    if (document2.activeElement) {
      if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(__pow(diffX, 2) + __pow(diffY, 2)) < swiper.params.threshold) return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }
    let diff2 = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff2 = Math.abs(diff2) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff2;
    diff2 *= params.touchRatio;
    if (rtl) {
      diff2 = -diff2;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff2 > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params.cssMode;
    const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true,
          detail: {
            bySwiperTouchMove: true
          }
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e);
    }
    let loopFixed;
    (/* @__PURE__ */ new Date()).getTime();
    if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff2) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff2 + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff2 > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + __pow(-swiper.minTranslate() + data.startTranslate + diff2, resistanceRatio);
        }
      }
    } else if (diff2 < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - __pow(swiper.maxTranslate() - data.startTranslate - diff2, resistanceRatio);
        }
      }
    }
    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff2) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode) return;
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    let e = event2;
    if (e.originalEvent) e = e.originalEvent;
    let targetTouch;
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null) return;
      if (e.pointerId !== data.pointerId) return;
      targetTouch = e;
    } else {
      targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
      if (!targetTouch || targetTouch.identifier !== data.touchId) return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled) return;
    if (!params.simulateTouch && e.pointerType === "mouse") return;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e.path || e.composedPath && e.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
      swiper.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed) swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i + increment2] !== "undefined") {
        if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment2] - slidesGrid[i];
        }
      } else if (swipeToLast || currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0) return;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }
  function onClick(e) {
    const swiper = this;
    if (!swiper.enabled) return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) e.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled) return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0) swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e) {
    const swiper = this;
    processLazyPreloader(swiper, e.target);
    if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
      return;
    }
    swiper.update();
  }
  function onDocumentTouchStart() {
    const swiper = this;
    if (swiper.documentTouchHandlerProceeded) return;
    swiper.documentTouchHandlerProceeded = true;
    if (swiper.params.touchReleaseOnEdges) {
      swiper.el.style.touchAction = "auto";
    }
  }
  var events = (swiper, method) => {
    const document2 = getDocument();
    const {
      params,
      el,
      wrapperEl,
      device
    } = swiper;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    if (!el || typeof el === "string") return;
    document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
      passive: false,
      capture
    });
    el[domMethod]("touchstart", swiper.onTouchStart, {
      passive: false
    });
    el[domMethod]("pointerdown", swiper.onTouchStart, {
      passive: false
    });
    document2[domMethod]("touchmove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointermove", swiper.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("touchend", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerup", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("touchcancel", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("contextmenu", swiper.onTouchEnd, {
      passive: true
    });
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper, params) => {
    return swiper.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0) return;
    const document2 = getDocument();
    const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
    const breakpointContainer = ["window", "container"].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document2.querySelector(params.breakpointsBase);
    const breakpoint = swiper.getBreakpoint(breakpoints2, breakpointsBase, breakpointContainer);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasGrabCursor = swiper.params.grabCursor;
    const isGrabCursor = breakpointParams.grabCursor;
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    if (wasGrabCursor && !isGrabCursor) {
      swiper.unsetGrabCursor();
    } else if (!wasGrabCursor && isGrabCursor) {
      swiper.setGrabCursor();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined") return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    const wasLoop = params.loop;
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend2(swiper.params, breakpointParams);
    const isEnabled = swiper.params.enabled;
    const hasLoop = swiper.params.loop;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper.loopDestroy();
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper.loopDestroy();
      }
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl) return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const {
        point,
        value
      } = points[i];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses() {
    const swiper = this;
    const {
      el,
      classNames
    } = swiper;
    if (!el || typeof el === "string") return;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    eventsPrefix: "swiper",
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: void 0,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // loop
    loop: false,
    loopAddBlankSlides: true,
    loopAdditionalSlides: 0,
    loopPreventsSliding: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
        params[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
        params[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName]) params[moduleParamName] = {
        enabled: false
      };
      extend2(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class _Swiper {
    constructor() {
      let el;
      let params;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params) params = {};
      params = extend2({}, params);
      if (el && !params.el) params.el = el;
      const document2 = getDocument();
      if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = extend2({}, params, {
            el: containerEl
          });
          swipers.push(new _Swiper(newParams));
        });
        return swipers;
      }
      const swiper = this;
      swiper.__swiper__ = true;
      swiper.support = getSupport();
      swiper.device = getDevice({
        userAgent: params.userAgent
      });
      swiper.browser = getBrowser();
      swiper.eventsListeners = {};
      swiper.eventsAnyListeners = [];
      swiper.modules = [...swiper.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        swiper.modules.push(...params.modules);
      }
      const allModulesParams = {};
      swiper.modules.forEach((mod) => {
        mod({
          params,
          swiper,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper.on.bind(swiper),
          once: swiper.once.bind(swiper),
          off: swiper.off.bind(swiper),
          emit: swiper.emit.bind(swiper)
        });
      });
      const swiperParams = extend2({}, defaults, allModulesParams);
      swiper.params = extend2({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = extend2({}, swiper.params);
      swiper.passedParams = extend2({}, params);
      if (swiper.params && swiper.params.on) {
        Object.keys(swiper.params.on).forEach((eventName) => {
          swiper.on(eventName, swiper.params.on[eventName]);
        });
      }
      if (swiper.params && swiper.params.onAny) {
        swiper.onAny(swiper.params.onAny);
      }
      Object.assign(swiper, {
        enabled: swiper.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal() {
          return swiper.params.direction === "horizontal";
        },
        isVertical() {
          return swiper.params.direction === "vertical";
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / __pow(2, 23)) * __pow(2, 23);
        },
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          // Form elements to match
          focusableElements: swiper.params.focusableElements,
          // Last click time
          lastClickTime: 0,
          clickTimeout: void 0,
          // Velocities
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper.emit("_swiper");
      if (swiper.params.init) {
        swiper.init();
      }
      return swiper;
    }
    getDirectionLabel(property) {
      if (this.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params
      } = this;
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
    }
    recalcSlides() {
      const swiper = this;
      const {
        slidesEl,
        params
      } = swiper;
      swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    }
    enable() {
      const swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit("enable");
    }
    disable() {
      const swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper.minTranslate();
      const max = swiper.maxTranslate();
      const current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const cls = swiper.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper = this;
      if (swiper.destroyed) return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      const updates = [];
      swiper.slides.forEach((slideEl) => {
        const classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper.emit("_slideClass", slideEl, classNames);
      });
      swiper.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }
      if (exact === void 0) {
        exact = false;
      }
      const swiper = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper;
      let spv = 1;
      if (typeof params.slidesPerView === "number") return params.slidesPerView;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
        let breakLoop;
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += Math.ceil(slides[i].swiperSlideSize);
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper = this;
      if (!swiper || swiper.destroyed) return;
      const {
        snapGrid,
        params
      } = swiper;
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      let translated;
      if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
        setTranslate2();
        if (params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
          const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit("update");
    }
    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      const swiper = this;
      const currentDirection = swiper.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper;
      }
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
      swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper.emit("changeDirection");
      if (needUpdate) swiper.update();
      return swiper;
    }
    changeLanguageDirection(direction) {
      const swiper = this;
      if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
      swiper.rtl = direction === "rtl";
      swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "rtl";
      } else {
        swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
        swiper.el.dir = "ltr";
      }
      swiper.update();
    }
    mount(element) {
      const swiper = this;
      if (swiper.mounted) return true;
      let el = element || swiper.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
        swiper.isElement = true;
      }
      const getWrapperSelector = () => {
        return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = createElement("div", swiper.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el,
        wrapperEl,
        slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
        hostEl: swiper.isElement ? el.parentNode.host : el,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper = this;
      if (swiper.initialized) return swiper;
      const mounted = swiper.mount(el);
      if (mounted === false) return swiper;
      swiper.emit("beforeInit");
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.addClasses();
      swiper.updateSize();
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }
      if (swiper.params.loop) {
        swiper.loopCreate(void 0, true);
      }
      swiper.attachEvents();
      const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
      if (swiper.isElement) {
        lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
      }
      lazyElements.forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper, imageEl);
        } else {
          imageEl.addEventListener("load", (e) => {
            processLazyPreloader(swiper, e.target);
          });
        }
      });
      preload(swiper);
      swiper.initialized = true;
      preload(swiper);
      swiper.emit("init");
      swiper.emit("afterInit");
      return swiper;
    }
    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }
      if (cleanStyles === void 0) {
        cleanStyles = true;
      }
      const swiper = this;
      const {
        params,
        el,
        wrapperEl,
        slides
      } = swiper;
      if (typeof swiper.params === "undefined" || swiper.destroyed) {
        return null;
      }
      swiper.emit("beforeDestroy");
      swiper.initialized = false;
      swiper.detachEvents();
      if (params.loop) {
        swiper.loopDestroy();
      }
      if (cleanStyles) {
        swiper.removeClasses();
        if (el && typeof el !== "string") {
          el.removeAttribute("style");
        }
        if (wrapperEl) {
          wrapperEl.removeAttribute("style");
        }
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper.emit("destroy");
      Object.keys(swiper.eventsListeners).forEach((eventName) => {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        if (swiper.el && typeof swiper.el !== "string") {
          swiper.el.swiper = null;
        }
        deleteProps(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend2(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!_Swiper.prototype.__modules__) _Swiper.prototype.__modules__ = [];
      const modules = _Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => _Swiper.installModule(m));
        return _Swiper;
      }
      _Swiper.installModule(module);
      return _Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  // node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }

  // node_modules/swiper/modules/navigation.mjs
  function Navigation(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
        if (res) return res;
      }
      if (el) {
        if (typeof el === "string") res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        } else if (res && res.length === 1) {
          res = res[0];
        }
      }
      if (el && !res) return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl)) return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
    });
    on("click", (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
      if (swiper.isElement && !targetIsButton) {
        const path = e.path || e.composedPath && e.composedPath();
        if (path) {
          targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
        }
      }
      if (swiper.params.navigation.hideOnClick && !targetIsButton) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/choices.js/public/assets/scripts/choices.mjs
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  var ActionType = {
    ADD_CHOICE: "ADD_CHOICE",
    REMOVE_CHOICE: "REMOVE_CHOICE",
    FILTER_CHOICES: "FILTER_CHOICES",
    ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
    CLEAR_CHOICES: "CLEAR_CHOICES",
    ADD_GROUP: "ADD_GROUP",
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM"
  };
  var EventType = {
    showDropdown: "showDropdown",
    hideDropdown: "hideDropdown",
    change: "change",
    choice: "choice",
    search: "search",
    addItem: "addItem",
    removeItem: "removeItem",
    highlightItem: "highlightItem",
    highlightChoice: "highlightChoice",
    unhighlightItem: "unhighlightItem"
  };
  var KeyCodeMap = {
    TAB_KEY: 9,
    SHIFT_KEY: 16,
    BACK_KEY: 46,
    DELETE_KEY: 8,
    ENTER_KEY: 13,
    A_KEY: 65,
    ESC_KEY: 27,
    UP_KEY: 38,
    DOWN_KEY: 40,
    PAGE_UP_KEY: 33,
    PAGE_DOWN_KEY: 34
  };
  var ObjectsInConfig = ["fuseOptions", "classNames"];
  var PassedElementTypes = {
    Text: "text",
    SelectOne: "select-one",
    SelectMultiple: "select-multiple"
  };
  var addChoice = function(choice) {
    return {
      type: ActionType.ADD_CHOICE,
      choice
    };
  };
  var removeChoice = function(choice) {
    return {
      type: ActionType.REMOVE_CHOICE,
      choice
    };
  };
  var filterChoices = function(results) {
    return {
      type: ActionType.FILTER_CHOICES,
      results
    };
  };
  var activateChoices = function(active) {
    return {
      type: ActionType.ACTIVATE_CHOICES,
      active
    };
  };
  var addGroup = function(group) {
    return {
      type: ActionType.ADD_GROUP,
      group
    };
  };
  var addItem = function(item) {
    return {
      type: ActionType.ADD_ITEM,
      item
    };
  };
  var removeItem$1 = function(item) {
    return {
      type: ActionType.REMOVE_ITEM,
      item
    };
  };
  var highlightItem = function(item, highlighted) {
    return {
      type: ActionType.HIGHLIGHT_ITEM,
      item,
      highlighted
    };
  };
  var getRandomNumber = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  var generateChars = function(length) {
    return Array.from({ length }, function() {
      return getRandomNumber(0, 36).toString(36);
    }).join("");
  };
  var generateId = function(element, prefix) {
    var id = element.id || element.name && "".concat(element.name, "-").concat(generateChars(2)) || generateChars(4);
    id = id.replace(/(:|\.|\[|\]|,)/g, "");
    id = "".concat(prefix, "-").concat(id);
    return id;
  };
  var getAdjacentEl = function(startEl, selector, direction) {
    if (direction === void 0) {
      direction = 1;
    }
    var prop = "".concat(direction > 0 ? "next" : "previous", "ElementSibling");
    var sibling = startEl[prop];
    while (sibling) {
      if (sibling.matches(selector)) {
        return sibling;
      }
      sibling = sibling[prop];
    }
    return null;
  };
  var isScrolledIntoView = function(element, parent, direction) {
    if (direction === void 0) {
      direction = 1;
    }
    var isVisible;
    if (direction > 0) {
      isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
    } else {
      isVisible = element.offsetTop >= parent.scrollTop;
    }
    return isVisible;
  };
  var sanitise = function(value) {
    if (typeof value !== "string") {
      if (value === null || value === void 0) {
        return "";
      }
      if (typeof value === "object") {
        if ("raw" in value) {
          return sanitise(value.raw);
        }
        if ("trusted" in value) {
          return value.trusted;
        }
      }
      return value;
    }
    return value.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;");
  };
  var strToEl = function() {
    var tmpEl = document.createElement("div");
    return function(str) {
      tmpEl.innerHTML = str.trim();
      var firstChild = tmpEl.children[0];
      while (tmpEl.firstChild) {
        tmpEl.removeChild(tmpEl.firstChild);
      }
      return firstChild;
    };
  }();
  var resolveNoticeFunction = function(fn, value) {
    return typeof fn === "function" ? fn(sanitise(value), value) : fn;
  };
  var resolveStringFunction = function(fn) {
    return typeof fn === "function" ? fn() : fn;
  };
  var unwrapStringForRaw = function(s) {
    if (typeof s === "string") {
      return s;
    }
    if (typeof s === "object") {
      if ("trusted" in s) {
        return s.trusted;
      }
      if ("raw" in s) {
        return s.raw;
      }
    }
    return "";
  };
  var unwrapStringForEscaped = function(s) {
    if (typeof s === "string") {
      return s;
    }
    if (typeof s === "object") {
      if ("escaped" in s) {
        return s.escaped;
      }
      if ("trusted" in s) {
        return s.trusted;
      }
    }
    return "";
  };
  var escapeForTemplate = function(allowHTML, s) {
    return allowHTML ? unwrapStringForEscaped(s) : sanitise(s);
  };
  var setElementHtml = function(el, allowHtml, html) {
    el.innerHTML = escapeForTemplate(allowHtml, html);
  };
  var sortByAlpha = function(_a, _b) {
    var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
    var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
    return unwrapStringForRaw(label).localeCompare(unwrapStringForRaw(label2), [], {
      sensitivity: "base",
      ignorePunctuation: true,
      numeric: true
    });
  };
  var sortByRank = function(a, b) {
    return a.rank - b.rank;
  };
  var dispatchEvent = function(element, type, customArgs) {
    if (customArgs === void 0) {
      customArgs = null;
    }
    var event2 = new CustomEvent(type, {
      detail: customArgs,
      bubbles: true,
      cancelable: true
    });
    return element.dispatchEvent(event2);
  };
  var diff = function(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return aKeys.filter(function(i) {
      return bKeys.indexOf(i) < 0;
    });
  };
  var getClassNames = function(ClassNames) {
    return Array.isArray(ClassNames) ? ClassNames : [ClassNames];
  };
  var getClassNamesSelector = function(option) {
    if (option && Array.isArray(option)) {
      return option.map(function(item) {
        return ".".concat(item);
      }).join("");
    }
    return ".".concat(option);
  };
  var addClassesToElement = function(element, className) {
    var _a;
    (_a = element.classList).add.apply(_a, getClassNames(className));
  };
  var removeClassesFromElement = function(element, className) {
    var _a;
    (_a = element.classList).remove.apply(_a, getClassNames(className));
  };
  var parseCustomProperties = function(customProperties) {
    if (typeof customProperties !== "undefined") {
      try {
        return JSON.parse(customProperties);
      } catch (e) {
        return customProperties;
      }
    }
    return {};
  };
  var updateClassList = function(item, add, remove) {
    var itemEl = item.itemEl;
    if (itemEl) {
      removeClassesFromElement(itemEl, remove);
      addClassesToElement(itemEl, add);
    }
  };
  var Dropdown = (
    /** @class */
    function() {
      function Dropdown2(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames;
        this.element = element;
        this.classNames = classNames;
        this.type = type;
        this.isActive = false;
      }
      Dropdown2.prototype.show = function() {
        addClassesToElement(this.element, this.classNames.activeState);
        this.element.setAttribute("aria-expanded", "true");
        this.isActive = true;
        return this;
      };
      Dropdown2.prototype.hide = function() {
        removeClassesFromElement(this.element, this.classNames.activeState);
        this.element.setAttribute("aria-expanded", "false");
        this.isActive = false;
        return this;
      };
      return Dropdown2;
    }()
  );
  var Container = (
    /** @class */
    function() {
      function Container2(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
        this.element = element;
        this.classNames = classNames;
        this.type = type;
        this.position = position;
        this.isOpen = false;
        this.isFlipped = false;
        this.isDisabled = false;
        this.isLoading = false;
      }
      Container2.prototype.shouldFlip = function(dropdownPos, dropdownHeight) {
        var shouldFlip = false;
        if (this.position === "auto") {
          shouldFlip = this.element.getBoundingClientRect().top - dropdownHeight >= 0 && !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
        } else if (this.position === "top") {
          shouldFlip = true;
        }
        return shouldFlip;
      };
      Container2.prototype.setActiveDescendant = function(activeDescendantID) {
        this.element.setAttribute("aria-activedescendant", activeDescendantID);
      };
      Container2.prototype.removeActiveDescendant = function() {
        this.element.removeAttribute("aria-activedescendant");
      };
      Container2.prototype.open = function(dropdownPos, dropdownHeight) {
        addClassesToElement(this.element, this.classNames.openState);
        this.element.setAttribute("aria-expanded", "true");
        this.isOpen = true;
        if (this.shouldFlip(dropdownPos, dropdownHeight)) {
          addClassesToElement(this.element, this.classNames.flippedState);
          this.isFlipped = true;
        }
      };
      Container2.prototype.close = function() {
        removeClassesFromElement(this.element, this.classNames.openState);
        this.element.setAttribute("aria-expanded", "false");
        this.removeActiveDescendant();
        this.isOpen = false;
        if (this.isFlipped) {
          removeClassesFromElement(this.element, this.classNames.flippedState);
          this.isFlipped = false;
        }
      };
      Container2.prototype.addFocusState = function() {
        addClassesToElement(this.element, this.classNames.focusState);
      };
      Container2.prototype.removeFocusState = function() {
        removeClassesFromElement(this.element, this.classNames.focusState);
      };
      Container2.prototype.enable = function() {
        removeClassesFromElement(this.element, this.classNames.disabledState);
        this.element.removeAttribute("aria-disabled");
        if (this.type === PassedElementTypes.SelectOne) {
          this.element.setAttribute("tabindex", "0");
        }
        this.isDisabled = false;
      };
      Container2.prototype.disable = function() {
        addClassesToElement(this.element, this.classNames.disabledState);
        this.element.setAttribute("aria-disabled", "true");
        if (this.type === PassedElementTypes.SelectOne) {
          this.element.setAttribute("tabindex", "-1");
        }
        this.isDisabled = true;
      };
      Container2.prototype.wrap = function(element) {
        var el = this.element;
        var parentNode = element.parentNode;
        if (parentNode) {
          if (element.nextSibling) {
            parentNode.insertBefore(el, element.nextSibling);
          } else {
            parentNode.appendChild(el);
          }
        }
        el.appendChild(element);
      };
      Container2.prototype.unwrap = function(element) {
        var el = this.element;
        var parentNode = el.parentNode;
        if (parentNode) {
          parentNode.insertBefore(element, el);
          parentNode.removeChild(el);
        }
      };
      Container2.prototype.addLoadingState = function() {
        addClassesToElement(this.element, this.classNames.loadingState);
        this.element.setAttribute("aria-busy", "true");
        this.isLoading = true;
      };
      Container2.prototype.removeLoadingState = function() {
        removeClassesFromElement(this.element, this.classNames.loadingState);
        this.element.removeAttribute("aria-busy");
        this.isLoading = false;
      };
      return Container2;
    }()
  );
  var Input = (
    /** @class */
    function() {
      function Input2(_a) {
        var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
        this.element = element;
        this.type = type;
        this.classNames = classNames;
        this.preventPaste = preventPaste;
        this.isFocussed = this.element.isEqualNode(document.activeElement);
        this.isDisabled = element.disabled;
        this._onPaste = this._onPaste.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
      }
      Object.defineProperty(Input2.prototype, "placeholder", {
        set: function(placeholder) {
          this.element.placeholder = placeholder;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Input2.prototype, "value", {
        get: function() {
          return this.element.value;
        },
        set: function(value) {
          this.element.value = value;
        },
        enumerable: false,
        configurable: true
      });
      Input2.prototype.addEventListeners = function() {
        var el = this.element;
        el.addEventListener("paste", this._onPaste);
        el.addEventListener("input", this._onInput, {
          passive: true
        });
        el.addEventListener("focus", this._onFocus, {
          passive: true
        });
        el.addEventListener("blur", this._onBlur, {
          passive: true
        });
      };
      Input2.prototype.removeEventListeners = function() {
        var el = this.element;
        el.removeEventListener("input", this._onInput);
        el.removeEventListener("paste", this._onPaste);
        el.removeEventListener("focus", this._onFocus);
        el.removeEventListener("blur", this._onBlur);
      };
      Input2.prototype.enable = function() {
        var el = this.element;
        el.removeAttribute("disabled");
        this.isDisabled = false;
      };
      Input2.prototype.disable = function() {
        var el = this.element;
        el.setAttribute("disabled", "");
        this.isDisabled = true;
      };
      Input2.prototype.focus = function() {
        if (!this.isFocussed) {
          this.element.focus();
        }
      };
      Input2.prototype.blur = function() {
        if (this.isFocussed) {
          this.element.blur();
        }
      };
      Input2.prototype.clear = function(setWidth) {
        if (setWidth === void 0) {
          setWidth = true;
        }
        this.element.value = "";
        if (setWidth) {
          this.setWidth();
        }
        return this;
      };
      Input2.prototype.setWidth = function() {
        var element = this.element;
        element.style.minWidth = "".concat(element.placeholder.length + 1, "ch");
        element.style.width = "".concat(element.value.length + 1, "ch");
      };
      Input2.prototype.setActiveDescendant = function(activeDescendantID) {
        this.element.setAttribute("aria-activedescendant", activeDescendantID);
      };
      Input2.prototype.removeActiveDescendant = function() {
        this.element.removeAttribute("aria-activedescendant");
      };
      Input2.prototype._onInput = function() {
        if (this.type !== PassedElementTypes.SelectOne) {
          this.setWidth();
        }
      };
      Input2.prototype._onPaste = function(event2) {
        if (this.preventPaste) {
          event2.preventDefault();
        }
      };
      Input2.prototype._onFocus = function() {
        this.isFocussed = true;
      };
      Input2.prototype._onBlur = function() {
        this.isFocussed = false;
      };
      return Input2;
    }()
  );
  var SCROLLING_SPEED = 4;
  var List = (
    /** @class */
    function() {
      function List2(_a) {
        var element = _a.element;
        this.element = element;
        this.scrollPos = this.element.scrollTop;
        this.height = this.element.offsetHeight;
      }
      List2.prototype.prepend = function(node) {
        var child = this.element.firstElementChild;
        if (child) {
          this.element.insertBefore(node, child);
        } else {
          this.element.append(node);
        }
      };
      List2.prototype.scrollToTop = function() {
        this.element.scrollTop = 0;
      };
      List2.prototype.scrollToChildElement = function(element, direction) {
        var _this = this;
        if (!element) {
          return;
        }
        var listHeight = this.element.offsetHeight;
        var listScrollPosition = this.element.scrollTop + listHeight;
        var elementHeight = element.offsetHeight;
        var elementPos = element.offsetTop + elementHeight;
        var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
        requestAnimationFrame(function() {
          _this._animateScroll(destination, direction);
        });
      };
      List2.prototype._scrollDown = function(scrollPos, strength, destination) {
        var easing = (destination - scrollPos) / strength;
        var distance = easing > 1 ? easing : 1;
        this.element.scrollTop = scrollPos + distance;
      };
      List2.prototype._scrollUp = function(scrollPos, strength, destination) {
        var easing = (scrollPos - destination) / strength;
        var distance = easing > 1 ? easing : 1;
        this.element.scrollTop = scrollPos - distance;
      };
      List2.prototype._animateScroll = function(destination, direction) {
        var _this = this;
        var strength = SCROLLING_SPEED;
        var choiceListScrollTop = this.element.scrollTop;
        var continueAnimation = false;
        if (direction > 0) {
          this._scrollDown(choiceListScrollTop, strength, destination);
          if (choiceListScrollTop < destination) {
            continueAnimation = true;
          }
        } else {
          this._scrollUp(choiceListScrollTop, strength, destination);
          if (choiceListScrollTop > destination) {
            continueAnimation = true;
          }
        }
        if (continueAnimation) {
          requestAnimationFrame(function() {
            _this._animateScroll(destination, direction);
          });
        }
      };
      return List2;
    }()
  );
  var WrappedElement = (
    /** @class */
    function() {
      function WrappedElement2(_a) {
        var element = _a.element, classNames = _a.classNames;
        this.element = element;
        this.classNames = classNames;
        this.isDisabled = false;
      }
      Object.defineProperty(WrappedElement2.prototype, "isActive", {
        get: function() {
          return this.element.dataset.choice === "active";
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WrappedElement2.prototype, "dir", {
        get: function() {
          return this.element.dir;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(WrappedElement2.prototype, "value", {
        get: function() {
          return this.element.value;
        },
        set: function(value) {
          this.element.setAttribute("value", value);
          this.element.value = value;
        },
        enumerable: false,
        configurable: true
      });
      WrappedElement2.prototype.conceal = function() {
        var el = this.element;
        addClassesToElement(el, this.classNames.input);
        el.hidden = true;
        el.tabIndex = -1;
        var origStyle = el.getAttribute("style");
        if (origStyle) {
          el.setAttribute("data-choice-orig-style", origStyle);
        }
        el.setAttribute("data-choice", "active");
      };
      WrappedElement2.prototype.reveal = function() {
        var el = this.element;
        removeClassesFromElement(el, this.classNames.input);
        el.hidden = false;
        el.removeAttribute("tabindex");
        var origStyle = el.getAttribute("data-choice-orig-style");
        if (origStyle) {
          el.removeAttribute("data-choice-orig-style");
          el.setAttribute("style", origStyle);
        } else {
          el.removeAttribute("style");
        }
        el.removeAttribute("data-choice");
      };
      WrappedElement2.prototype.enable = function() {
        this.element.removeAttribute("disabled");
        this.element.disabled = false;
        this.isDisabled = false;
      };
      WrappedElement2.prototype.disable = function() {
        this.element.setAttribute("disabled", "");
        this.element.disabled = true;
        this.isDisabled = true;
      };
      WrappedElement2.prototype.triggerEvent = function(eventType, data) {
        dispatchEvent(this.element, eventType, data || {});
      };
      return WrappedElement2;
    }()
  );
  var WrappedInput = (
    /** @class */
    function(_super) {
      __extends(WrappedInput2, _super);
      function WrappedInput2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return WrappedInput2;
    }(WrappedElement)
  );
  var coerceBool = function(arg, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = true;
    }
    return typeof arg === "undefined" ? defaultValue : !!arg;
  };
  var stringToHtmlClass = function(input) {
    if (typeof input === "string") {
      input = input.split(" ").filter(function(s) {
        return s.length;
      });
    }
    if (Array.isArray(input) && input.length) {
      return input;
    }
    return void 0;
  };
  var mapInputToChoice = function(value, allowGroup, allowRawString) {
    if (allowRawString === void 0) {
      allowRawString = true;
    }
    if (typeof value === "string") {
      var sanitisedValue = sanitise(value);
      var userValue = allowRawString || sanitisedValue === value ? value : { escaped: sanitisedValue, raw: value };
      var result_1 = mapInputToChoice({
        value,
        label: userValue,
        selected: true
      }, false);
      return result_1;
    }
    var groupOrChoice = value;
    if ("choices" in groupOrChoice) {
      if (!allowGroup) {
        throw new TypeError("optGroup is not allowed");
      }
      var group = groupOrChoice;
      var choices2 = group.choices.map(function(e) {
        return mapInputToChoice(e, false);
      });
      var result_2 = {
        id: 0,
        // actual ID will be assigned during _addGroup
        label: unwrapStringForRaw(group.label) || group.value,
        active: !!choices2.length,
        disabled: !!group.disabled,
        choices: choices2
      };
      return result_2;
    }
    var choice = groupOrChoice;
    var result = {
      id: 0,
      // actual ID will be assigned during _addChoice
      group: null,
      // actual group will be assigned during _addGroup but before _addChoice
      score: 0,
      // used in search
      rank: 0,
      // used in search, stable sort order
      value: choice.value,
      label: choice.label || choice.value,
      active: coerceBool(choice.active),
      selected: coerceBool(choice.selected, false),
      disabled: coerceBool(choice.disabled, false),
      placeholder: coerceBool(choice.placeholder, false),
      highlighted: false,
      labelClass: stringToHtmlClass(choice.labelClass),
      labelDescription: choice.labelDescription,
      customProperties: choice.customProperties
    };
    return result;
  };
  var isHtmlInputElement = function(e) {
    return e.tagName === "INPUT";
  };
  var isHtmlSelectElement = function(e) {
    return e.tagName === "SELECT";
  };
  var isHtmlOption = function(e) {
    return e.tagName === "OPTION";
  };
  var isHtmlOptgroup = function(e) {
    return e.tagName === "OPTGROUP";
  };
  var WrappedSelect = (
    /** @class */
    function(_super) {
      __extends(WrappedSelect2, _super);
      function WrappedSelect2(_a) {
        var element = _a.element, classNames = _a.classNames, template = _a.template, extractPlaceholder = _a.extractPlaceholder;
        var _this = _super.call(this, { element, classNames }) || this;
        _this.template = template;
        _this.extractPlaceholder = extractPlaceholder;
        return _this;
      }
      Object.defineProperty(WrappedSelect2.prototype, "placeholderOption", {
        get: function() {
          return this.element.querySelector('option[value=""]') || // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
          this.element.querySelector("option[placeholder]");
        },
        enumerable: false,
        configurable: true
      });
      WrappedSelect2.prototype.addOptions = function(choices2) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        choices2.forEach(function(obj) {
          var choice = obj;
          if (choice.element) {
            return;
          }
          var option = _this.template(choice);
          fragment.appendChild(option);
          choice.element = option;
        });
        this.element.appendChild(fragment);
      };
      WrappedSelect2.prototype.optionsAsChoices = function() {
        var _this = this;
        var choices2 = [];
        this.element.querySelectorAll(":scope > option, :scope > optgroup").forEach(function(e) {
          if (isHtmlOption(e)) {
            choices2.push(_this._optionToChoice(e));
          } else if (isHtmlOptgroup(e)) {
            choices2.push(_this._optgroupToChoice(e));
          }
        });
        return choices2;
      };
      WrappedSelect2.prototype._optionToChoice = function(option) {
        if (!option.hasAttribute("value") && option.hasAttribute("placeholder")) {
          option.setAttribute("value", "");
          option.value = "";
        }
        return {
          id: 0,
          group: null,
          score: 0,
          rank: 0,
          value: option.value,
          // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
          // This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content (ie `innerText`).
          label: option.label,
          element: option,
          active: true,
          // this returns true if nothing is selected on initial load, which will break placeholder support
          selected: this.extractPlaceholder ? option.selected : option.hasAttribute("selected"),
          disabled: option.disabled,
          highlighted: false,
          placeholder: this.extractPlaceholder && (!option.value || option.hasAttribute("placeholder")),
          labelClass: typeof option.dataset.labelClass !== "undefined" ? stringToHtmlClass(option.dataset.labelClass) : void 0,
          labelDescription: typeof option.dataset.labelDescription !== "undefined" ? option.dataset.labelDescription : void 0,
          customProperties: parseCustomProperties(option.dataset.customProperties)
        };
      };
      WrappedSelect2.prototype._optgroupToChoice = function(optgroup) {
        var _this = this;
        var options = optgroup.querySelectorAll("option");
        var choices2 = Array.from(options).map(function(option) {
          return _this._optionToChoice(option);
        });
        return {
          id: 0,
          label: optgroup.label || "",
          element: optgroup,
          active: !!choices2.length,
          disabled: optgroup.disabled,
          choices: choices2
        };
      };
      return WrappedSelect2;
    }(WrappedElement)
  );
  var DEFAULT_CLASSNAMES = {
    containerOuter: ["choices"],
    containerInner: ["choices__inner"],
    input: ["choices__input"],
    inputCloned: ["choices__input--cloned"],
    list: ["choices__list"],
    listItems: ["choices__list--multiple"],
    listSingle: ["choices__list--single"],
    listDropdown: ["choices__list--dropdown"],
    item: ["choices__item"],
    itemSelectable: ["choices__item--selectable"],
    itemDisabled: ["choices__item--disabled"],
    itemChoice: ["choices__item--choice"],
    description: ["choices__description"],
    placeholder: ["choices__placeholder"],
    group: ["choices__group"],
    groupHeading: ["choices__heading"],
    button: ["choices__button"],
    activeState: ["is-active"],
    focusState: ["is-focused"],
    openState: ["is-open"],
    disabledState: ["is-disabled"],
    highlightedState: ["is-highlighted"],
    selectedState: ["is-selected"],
    flippedState: ["is-flipped"],
    loadingState: ["is-loading"],
    notice: ["choices__notice"],
    addChoice: ["choices__item--selectable", "add-choice"],
    noResults: ["has-no-results"],
    noChoices: ["has-no-choices"]
  };
  var DEFAULT_CONFIG = {
    items: [],
    choices: [],
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    closeDropdownOnSelect: "auto",
    singleModeForMultiSelect: false,
    addChoices: false,
    addItems: true,
    addItemFilter: function(value) {
      return !!value && value !== "";
    },
    removeItems: true,
    removeItemButton: false,
    removeItemButtonAlignLeft: false,
    editItems: false,
    allowHTML: false,
    allowHtmlUserInput: false,
    duplicateItemsAllowed: true,
    delimiter: ",",
    paste: true,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ["label", "value"],
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: sortByAlpha,
    shadowRoot: null,
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: "auto",
    loadingText: "Loading...",
    noResultsText: "No results found",
    noChoicesText: "No choices to choose from",
    itemSelectText: "Press to select",
    uniqueItemText: "Only unique values can be added",
    customAddItemText: "Only values matching specific conditions can be added",
    addItemText: function(value) {
      return 'Press Enter to add <b>"'.concat(value, '"</b>');
    },
    removeItemIconText: function() {
      return "Remove item";
    },
    removeItemLabelText: function(value) {
      return "Remove item: ".concat(value);
    },
    maxItemText: function(maxItemCount) {
      return "Only ".concat(maxItemCount, " values can be added");
    },
    valueComparer: function(value1, value2) {
      return value1 === value2;
    },
    fuseOptions: {
      includeScore: true
    },
    labelId: "",
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
    classNames: DEFAULT_CLASSNAMES,
    appendGroupInSearch: false
  };
  var removeItem = function(item) {
    var itemEl = item.itemEl;
    if (itemEl) {
      itemEl.remove();
      item.itemEl = void 0;
    }
  };
  function items(s, action, context) {
    var state = s;
    var update2 = true;
    switch (action.type) {
      case ActionType.ADD_ITEM: {
        action.item.selected = true;
        var el = action.item.element;
        if (el) {
          el.selected = true;
          el.setAttribute("selected", "");
        }
        state.push(action.item);
        break;
      }
      case ActionType.REMOVE_ITEM: {
        action.item.selected = false;
        var el = action.item.element;
        if (el) {
          el.selected = false;
          el.removeAttribute("selected");
          var select = el.parentElement;
          if (select && isHtmlSelectElement(select) && select.type === PassedElementTypes.SelectOne) {
            select.value = "";
          }
        }
        removeItem(action.item);
        state = state.filter(function(choice) {
          return choice.id !== action.item.id;
        });
        break;
      }
      case ActionType.REMOVE_CHOICE: {
        removeItem(action.choice);
        state = state.filter(function(item2) {
          return item2.id !== action.choice.id;
        });
        break;
      }
      case ActionType.HIGHLIGHT_ITEM: {
        var highlighted = action.highlighted;
        var item = state.find(function(obj) {
          return obj.id === action.item.id;
        });
        if (item && item.highlighted !== highlighted) {
          item.highlighted = highlighted;
          if (context) {
            updateClassList(item, highlighted ? context.classNames.highlightedState : context.classNames.selectedState, highlighted ? context.classNames.selectedState : context.classNames.highlightedState);
          }
        }
        break;
      }
      default: {
        update2 = false;
        break;
      }
    }
    return { state, update: update2 };
  }
  function groups(s, action) {
    var state = s;
    var update2 = true;
    switch (action.type) {
      case ActionType.ADD_GROUP: {
        state.push(action.group);
        break;
      }
      case ActionType.CLEAR_CHOICES: {
        state = [];
        break;
      }
      default: {
        update2 = false;
        break;
      }
    }
    return { state, update: update2 };
  }
  function choices(s, action, context) {
    var state = s;
    var update2 = true;
    switch (action.type) {
      case ActionType.ADD_CHOICE: {
        state.push(action.choice);
        break;
      }
      case ActionType.REMOVE_CHOICE: {
        action.choice.choiceEl = void 0;
        if (action.choice.group) {
          action.choice.group.choices = action.choice.group.choices.filter(function(obj) {
            return obj.id !== action.choice.id;
          });
        }
        state = state.filter(function(obj) {
          return obj.id !== action.choice.id;
        });
        break;
      }
      case ActionType.ADD_ITEM:
      case ActionType.REMOVE_ITEM: {
        action.item.choiceEl = void 0;
        break;
      }
      case ActionType.FILTER_CHOICES: {
        var scoreLookup_1 = [];
        action.results.forEach(function(result) {
          scoreLookup_1[result.item.id] = result;
        });
        state.forEach(function(choice) {
          var result = scoreLookup_1[choice.id];
          if (result !== void 0) {
            choice.score = result.score;
            choice.rank = result.rank;
            choice.active = true;
          } else {
            choice.score = 0;
            choice.rank = 0;
            choice.active = false;
          }
          if (context && context.appendGroupInSearch) {
            choice.choiceEl = void 0;
          }
        });
        break;
      }
      case ActionType.ACTIVATE_CHOICES: {
        state.forEach(function(choice) {
          choice.active = action.active;
          if (context && context.appendGroupInSearch) {
            choice.choiceEl = void 0;
          }
        });
        break;
      }
      case ActionType.CLEAR_CHOICES: {
        state = [];
        break;
      }
      default: {
        update2 = false;
        break;
      }
    }
    return { state, update: update2 };
  }
  var reducers = {
    groups,
    items,
    choices
  };
  var Store = (
    /** @class */
    function() {
      function Store2(context) {
        this._state = this.defaultState;
        this._listeners = [];
        this._txn = 0;
        this._context = context;
      }
      Object.defineProperty(Store2.prototype, "defaultState", {
        // eslint-disable-next-line class-methods-use-this
        get: function() {
          return {
            groups: [],
            items: [],
            choices: []
          };
        },
        enumerable: false,
        configurable: true
      });
      Store2.prototype.changeSet = function(init) {
        return {
          groups: init,
          items: init,
          choices: init
        };
      };
      Store2.prototype.reset = function() {
        this._state = this.defaultState;
        var changes = this.changeSet(true);
        if (this._txn) {
          this._changeSet = changes;
        } else {
          this._listeners.forEach(function(l) {
            return l(changes);
          });
        }
      };
      Store2.prototype.subscribe = function(onChange) {
        this._listeners.push(onChange);
        return this;
      };
      Store2.prototype.dispatch = function(action) {
        var _this = this;
        var state = this._state;
        var hasChanges = false;
        var changes = this._changeSet || this.changeSet(false);
        Object.keys(reducers).forEach(function(key) {
          var stateUpdate = reducers[key](state[key], action, _this._context);
          if (stateUpdate.update) {
            hasChanges = true;
            changes[key] = true;
            state[key] = stateUpdate.state;
          }
        });
        if (hasChanges) {
          if (this._txn) {
            this._changeSet = changes;
          } else {
            this._listeners.forEach(function(l) {
              return l(changes);
            });
          }
        }
      };
      Store2.prototype.withTxn = function(func) {
        this._txn++;
        try {
          func();
        } finally {
          this._txn = Math.max(0, this._txn - 1);
          if (!this._txn) {
            var changeSet_1 = this._changeSet;
            if (changeSet_1) {
              this._changeSet = void 0;
              this._listeners.forEach(function(l) {
                return l(changeSet_1);
              });
            }
          }
        }
      };
      Object.defineProperty(Store2.prototype, "state", {
        /**
         * Get store object
         */
        get: function() {
          return this._state;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "items", {
        /**
         * Get items from store
         */
        get: function() {
          return this.state.items;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "highlightedActiveItems", {
        /**
         * Get highlighted items from store
         */
        get: function() {
          return this.items.filter(function(item) {
            return item.active && item.highlighted;
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "choices", {
        /**
         * Get choices from store
         */
        get: function() {
          return this.state.choices;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "activeChoices", {
        /**
         * Get active choices from store
         */
        get: function() {
          return this.choices.filter(function(choice) {
            return choice.active;
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "searchableChoices", {
        /**
         * Get choices that can be searched (excluding placeholders or disabled choices)
         */
        get: function() {
          return this.choices.filter(function(choice) {
            return !choice.disabled && !choice.placeholder;
          });
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "groups", {
        /**
         * Get groups from store
         */
        get: function() {
          return this.state.groups;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Store2.prototype, "activeGroups", {
        /**
         * Get active groups from store
         */
        get: function() {
          var _this = this;
          return this.state.groups.filter(function(group) {
            var isActive = group.active && !group.disabled;
            var hasActiveOptions = _this.state.choices.some(function(choice) {
              return choice.active && !choice.disabled;
            });
            return isActive && hasActiveOptions;
          }, []);
        },
        enumerable: false,
        configurable: true
      });
      Store2.prototype.inTxn = function() {
        return this._txn > 0;
      };
      Store2.prototype.getChoiceById = function(id) {
        return this.activeChoices.find(function(choice) {
          return choice.id === id;
        });
      };
      Store2.prototype.getGroupById = function(id) {
        return this.groups.find(function(group) {
          return group.id === id;
        });
      };
      return Store2;
    }()
  );
  var NoticeTypes = {
    noChoices: "no-choices",
    noResults: "no-results",
    addChoice: "add-choice",
    generic: ""
  };
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function isArray(value) {
    return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
  }
  var INFINITY = 1 / 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    let result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
  }
  function isObject3(value) {
    return typeof value === "object";
  }
  function isObjectLike(value) {
    return isObject3(value) && value !== null;
  }
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function isBlank(value) {
    return !value.trim().length;
  }
  function getTag(value) {
    return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
  }
  var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
  var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
  var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
  var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
  var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
  var hasOwn = Object.prototype.hasOwnProperty;
  var KeyStore = class {
    constructor(keys) {
      this._keys = [];
      this._keyMap = {};
      let totalWeight = 0;
      keys.forEach((key) => {
        let obj = createKey(key);
        this._keys.push(obj);
        this._keyMap[obj.id] = obj;
        totalWeight += obj.weight;
      });
      this._keys.forEach((key) => {
        key.weight /= totalWeight;
      });
    }
    get(keyId) {
      return this._keyMap[keyId];
    }
    keys() {
      return this._keys;
    }
    toJSON() {
      return JSON.stringify(this._keys);
    }
  };
  function createKey(key) {
    let path = null;
    let id = null;
    let src = null;
    let weight = 1;
    let getFn = null;
    if (isString(key) || isArray(key)) {
      src = key;
      path = createKeyPath(key);
      id = createKeyId(key);
    } else {
      if (!hasOwn.call(key, "name")) {
        throw new Error(MISSING_KEY_PROPERTY("name"));
      }
      const name = key.name;
      src = name;
      if (hasOwn.call(key, "weight")) {
        weight = key.weight;
        if (weight <= 0) {
          throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
        }
      }
      path = createKeyPath(name);
      id = createKeyId(name);
      getFn = key.getFn;
    }
    return {
      path,
      id,
      weight,
      src,
      getFn
    };
  }
  function createKeyPath(key) {
    return isArray(key) ? key : key.split(".");
  }
  function createKeyId(key) {
    return isArray(key) ? key.join(".") : key;
  }
  function get(obj, path) {
    let list = [];
    let arr = false;
    const deepGet = (obj2, path2, index) => {
      if (!isDefined(obj2)) {
        return;
      }
      if (!path2[index]) {
        list.push(obj2);
      } else {
        let key = path2[index];
        const value = obj2[key];
        if (!isDefined(value)) {
          return;
        }
        if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
          list.push(toString(value));
        } else if (isArray(value)) {
          arr = true;
          for (let i = 0, len = value.length; i < len; i += 1) {
            deepGet(value[i], path2, index + 1);
          }
        } else if (path2.length) {
          deepGet(value, path2, index + 1);
        }
      }
    };
    deepGet(obj, isString(path) ? path.split(".") : path, 0);
    return arr ? list : list[0];
  }
  var MatchOptions = {
    // Whether the matches should be included in the result set. When `true`, each record in the result
    // set will include the indices of the matched characters.
    // These can consequently be used for highlighting purposes.
    includeMatches: false,
    // When `true`, the matching function will continue to the end of a search pattern even if
    // a perfect match has already been located in the string.
    findAllMatches: false,
    // Minimum number of characters that must be matched before a result is considered a match
    minMatchCharLength: 1
  };
  var BasicOptions = {
    // When `true`, the algorithm continues searching to the end of the input even if a perfect
    // match is found before the end of the same input.
    isCaseSensitive: false,
    // When true, the matching function will continue to the end of a search pattern even if
    includeScore: false,
    // List of properties that will be searched. This also supports nested properties.
    keys: [],
    // Whether to sort the result list, by score
    shouldSort: true,
    // Default sort function: sort by ascending score, ascending index
    sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
  };
  var FuzzyOptions = {
    // Approximately where in the text is the pattern expected to be found?
    location: 0,
    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
    // (of both letters and location), a threshold of '1.0' would match anything.
    threshold: 0.6,
    // Determines how close the match must be to the fuzzy location (specified above).
    // An exact letter match which is 'distance' characters away from the fuzzy location
    // would score as a complete mismatch. A distance of '0' requires the match be at
    // the exact location specified, a threshold of '1000' would require a perfect match
    // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    distance: 100
  };
  var AdvancedOptions = {
    // When `true`, it enables the use of unix-like search commands
    useExtendedSearch: false,
    // The get function to use when fetching an object's properties.
    // The default will search nested paths *ie foo.bar.baz*
    getFn: get,
    // When `true`, search will ignore `location` and `distance`, so it won't matter
    // where in the string the pattern appears.
    // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
    ignoreLocation: false,
    // When `true`, the calculation for the relevance score (used for sorting) will
    // ignore the field-length norm.
    // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
    ignoreFieldNorm: false,
    // The weight to determine how much field length norm effects scoring.
    fieldNormWeight: 1
  };
  var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);
  var SPACE = /[^ ]+/g;
  function norm(weight = 1, mantissa = 3) {
    const cache = /* @__PURE__ */ new Map();
    const m = Math.pow(10, mantissa);
    return {
      get(value) {
        const numTokens = value.match(SPACE).length;
        if (cache.has(numTokens)) {
          return cache.get(numTokens);
        }
        const norm2 = 1 / Math.pow(numTokens, 0.5 * weight);
        const n = parseFloat(Math.round(norm2 * m) / m);
        cache.set(numTokens, n);
        return n;
      },
      clear() {
        cache.clear();
      }
    };
  }
  var FuseIndex = class {
    constructor({
      getFn = Config.getFn,
      fieldNormWeight = Config.fieldNormWeight
    } = {}) {
      this.norm = norm(fieldNormWeight, 3);
      this.getFn = getFn;
      this.isCreated = false;
      this.setIndexRecords();
    }
    setSources(docs = []) {
      this.docs = docs;
    }
    setIndexRecords(records = []) {
      this.records = records;
    }
    setKeys(keys = []) {
      this.keys = keys;
      this._keysMap = {};
      keys.forEach((key, idx) => {
        this._keysMap[key.id] = idx;
      });
    }
    create() {
      if (this.isCreated || !this.docs.length) {
        return;
      }
      this.isCreated = true;
      if (isString(this.docs[0])) {
        this.docs.forEach((doc, docIndex) => {
          this._addString(doc, docIndex);
        });
      } else {
        this.docs.forEach((doc, docIndex) => {
          this._addObject(doc, docIndex);
        });
      }
      this.norm.clear();
    }
    // Adds a doc to the end of the index
    add(doc) {
      const idx = this.size();
      if (isString(doc)) {
        this._addString(doc, idx);
      } else {
        this._addObject(doc, idx);
      }
    }
    // Removes the doc at the specified index of the index
    removeAt(idx) {
      this.records.splice(idx, 1);
      for (let i = idx, len = this.size(); i < len; i += 1) {
        this.records[i].i -= 1;
      }
    }
    getValueForItemAtKeyId(item, keyId) {
      return item[this._keysMap[keyId]];
    }
    size() {
      return this.records.length;
    }
    _addString(doc, docIndex) {
      if (!isDefined(doc) || isBlank(doc)) {
        return;
      }
      let record = {
        v: doc,
        i: docIndex,
        n: this.norm.get(doc)
      };
      this.records.push(record);
    }
    _addObject(doc, docIndex) {
      let record = {
        i: docIndex,
        $: {}
      };
      this.keys.forEach((key, keyIndex) => {
        let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
        if (!isDefined(value)) {
          return;
        }
        if (isArray(value)) {
          let subRecords = [];
          const stack = [{
            nestedArrIndex: -1,
            value
          }];
          while (stack.length) {
            const {
              nestedArrIndex,
              value: value2
            } = stack.pop();
            if (!isDefined(value2)) {
              continue;
            }
            if (isString(value2) && !isBlank(value2)) {
              let subRecord = {
                v: value2,
                i: nestedArrIndex,
                n: this.norm.get(value2)
              };
              subRecords.push(subRecord);
            } else if (isArray(value2)) {
              value2.forEach((item, k) => {
                stack.push({
                  nestedArrIndex: k,
                  value: item
                });
              });
            } else ;
          }
          record.$[keyIndex] = subRecords;
        } else if (isString(value) && !isBlank(value)) {
          let subRecord = {
            v: value,
            n: this.norm.get(value)
          };
          record.$[keyIndex] = subRecord;
        }
      });
      this.records.push(record);
    }
    toJSON() {
      return {
        keys: this.keys,
        records: this.records
      };
    }
  };
  function createIndex(keys, docs, {
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys.map(createKey));
    myIndex.setSources(docs);
    myIndex.create();
    return myIndex;
  }
  function parseIndex(data, {
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    const {
      keys,
      records
    } = data;
    const myIndex = new FuseIndex({
      getFn,
      fieldNormWeight
    });
    myIndex.setKeys(keys);
    myIndex.setIndexRecords(records);
    return myIndex;
  }
  function computeScore$1(pattern, {
    errors = 0,
    currentLocation = 0,
    expectedLocation = 0,
    distance = Config.distance,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    const accuracy = errors / pattern.length;
    if (ignoreLocation) {
      return accuracy;
    }
    const proximity = Math.abs(expectedLocation - currentLocation);
    if (!distance) {
      return proximity ? 1 : accuracy;
    }
    return accuracy + proximity / distance;
  }
  function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
    let indices = [];
    let start = -1;
    let end = -1;
    let i = 0;
    for (let len = matchmask.length; i < len; i += 1) {
      let match = matchmask[i];
      if (match && start === -1) {
        start = i;
      } else if (!match && start !== -1) {
        end = i - 1;
        if (end - start + 1 >= minMatchCharLength) {
          indices.push([start, end]);
        }
        start = -1;
      }
    }
    if (matchmask[i - 1] && i - start >= minMatchCharLength) {
      indices.push([start, i - 1]);
    }
    return indices;
  }
  var MAX_BITS = 32;
  function search(text, pattern, patternAlphabet, {
    location = Config.location,
    distance = Config.distance,
    threshold = Config.threshold,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    includeMatches = Config.includeMatches,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    if (pattern.length > MAX_BITS) {
      throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
    }
    const patternLen = pattern.length;
    const textLen = text.length;
    const expectedLocation = Math.max(0, Math.min(location, textLen));
    let currentThreshold = threshold;
    let bestLocation = expectedLocation;
    const computeMatches = minMatchCharLength > 1 || includeMatches;
    const matchMask = computeMatches ? Array(textLen) : [];
    let index;
    while ((index = text.indexOf(pattern, bestLocation)) > -1) {
      let score = computeScore$1(pattern, {
        currentLocation: index,
        expectedLocation,
        distance,
        ignoreLocation
      });
      currentThreshold = Math.min(score, currentThreshold);
      bestLocation = index + patternLen;
      if (computeMatches) {
        let i = 0;
        while (i < patternLen) {
          matchMask[index + i] = 1;
          i += 1;
        }
      }
    }
    bestLocation = -1;
    let lastBitArr = [];
    let finalScore = 1;
    let binMax = patternLen + textLen;
    const mask = 1 << patternLen - 1;
    for (let i = 0; i < patternLen; i += 1) {
      let binMin = 0;
      let binMid = binMax;
      while (binMin < binMid) {
        const score2 = computeScore$1(pattern, {
          errors: i,
          currentLocation: expectedLocation + binMid,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (score2 <= currentThreshold) {
          binMin = binMid;
        } else {
          binMax = binMid;
        }
        binMid = Math.floor((binMax - binMin) / 2 + binMin);
      }
      binMax = binMid;
      let start = Math.max(1, expectedLocation - binMid + 1);
      let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
      let bitArr = Array(finish + 2);
      bitArr[finish + 1] = (1 << i) - 1;
      for (let j = finish; j >= start; j -= 1) {
        let currentLocation = j - 1;
        let charMatch = patternAlphabet[text.charAt(currentLocation)];
        if (computeMatches) {
          matchMask[currentLocation] = +!!charMatch;
        }
        bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
        if (i) {
          bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
        }
        if (bitArr[j] & mask) {
          finalScore = computeScore$1(pattern, {
            errors: i,
            currentLocation,
            expectedLocation,
            distance,
            ignoreLocation
          });
          if (finalScore <= currentThreshold) {
            currentThreshold = finalScore;
            bestLocation = currentLocation;
            if (bestLocation <= expectedLocation) {
              break;
            }
            start = Math.max(1, 2 * expectedLocation - bestLocation);
          }
        }
      }
      const score = computeScore$1(pattern, {
        errors: i + 1,
        currentLocation: expectedLocation,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score > currentThreshold) {
        break;
      }
      lastBitArr = bitArr;
    }
    const result = {
      isMatch: bestLocation >= 0,
      // Count exact matches (those with a score of 0) to be "almost" exact
      score: Math.max(1e-3, finalScore)
    };
    if (computeMatches) {
      const indices = convertMaskToIndices(matchMask, minMatchCharLength);
      if (!indices.length) {
        result.isMatch = false;
      } else if (includeMatches) {
        result.indices = indices;
      }
    }
    return result;
  }
  function createPatternAlphabet(pattern) {
    let mask = {};
    for (let i = 0, len = pattern.length; i < len; i += 1) {
      const char = pattern.charAt(i);
      mask[char] = (mask[char] || 0) | 1 << len - i - 1;
    }
    return mask;
  }
  var BitapSearch = class {
    constructor(pattern, {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}) {
      this.options = {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreLocation
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.chunks = [];
      if (!this.pattern.length) {
        return;
      }
      const addChunk = (pattern2, startIndex) => {
        this.chunks.push({
          pattern: pattern2,
          alphabet: createPatternAlphabet(pattern2),
          startIndex
        });
      };
      const len = this.pattern.length;
      if (len > MAX_BITS) {
        let i = 0;
        const remainder = len % MAX_BITS;
        const end = len - remainder;
        while (i < end) {
          addChunk(this.pattern.substr(i, MAX_BITS), i);
          i += MAX_BITS;
        }
        if (remainder) {
          const startIndex = len - MAX_BITS;
          addChunk(this.pattern.substr(startIndex), startIndex);
        }
      } else {
        addChunk(this.pattern, 0);
      }
    }
    searchIn(text) {
      const {
        isCaseSensitive,
        includeMatches
      } = this.options;
      if (!isCaseSensitive) {
        text = text.toLowerCase();
      }
      if (this.pattern === text) {
        let result2 = {
          isMatch: true,
          score: 0
        };
        if (includeMatches) {
          result2.indices = [[0, text.length - 1]];
        }
        return result2;
      }
      const {
        location,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        ignoreLocation
      } = this.options;
      let allIndices = [];
      let totalScore = 0;
      let hasMatches = false;
      this.chunks.forEach(({
        pattern,
        alphabet,
        startIndex
      }) => {
        const {
          isMatch,
          score,
          indices
        } = search(text, pattern, alphabet, {
          location: location + startIndex,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength,
          includeMatches,
          ignoreLocation
        });
        if (isMatch) {
          hasMatches = true;
        }
        totalScore += score;
        if (isMatch && indices) {
          allIndices = [...allIndices, ...indices];
        }
      });
      let result = {
        isMatch: hasMatches,
        score: hasMatches ? totalScore / this.chunks.length : 1
      };
      if (hasMatches && includeMatches) {
        result.indices = allIndices;
      }
      return result;
    }
  };
  var BaseMatch = class {
    constructor(pattern) {
      this.pattern = pattern;
    }
    static isMultiMatch(pattern) {
      return getMatch(pattern, this.multiRegex);
    }
    static isSingleMatch(pattern) {
      return getMatch(pattern, this.singleRegex);
    }
    search() {
    }
  };
  function getMatch(pattern, exp) {
    const matches = pattern.match(exp);
    return matches ? matches[1] : null;
  }
  var ExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "exact";
    }
    static get multiRegex() {
      return /^="(.*)"$/;
    }
    static get singleRegex() {
      return /^=(.*)$/;
    }
    search(text) {
      const isMatch = text === this.pattern;
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      };
    }
  };
  var InverseExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "inverse-exact";
    }
    static get multiRegex() {
      return /^!"(.*)"$/;
    }
    static get singleRegex() {
      return /^!(.*)$/;
    }
    search(text) {
      const index = text.indexOf(this.pattern);
      const isMatch = index === -1;
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      };
    }
  };
  var PrefixExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "prefix-exact";
    }
    static get multiRegex() {
      return /^\^"(.*)"$/;
    }
    static get singleRegex() {
      return /^\^(.*)$/;
    }
    search(text) {
      const isMatch = text.startsWith(this.pattern);
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      };
    }
  };
  var InversePrefixExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "inverse-prefix-exact";
    }
    static get multiRegex() {
      return /^!\^"(.*)"$/;
    }
    static get singleRegex() {
      return /^!\^(.*)$/;
    }
    search(text) {
      const isMatch = !text.startsWith(this.pattern);
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      };
    }
  };
  var SuffixExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "suffix-exact";
    }
    static get multiRegex() {
      return /^"(.*)"\$$/;
    }
    static get singleRegex() {
      return /^(.*)\$$/;
    }
    search(text) {
      const isMatch = text.endsWith(this.pattern);
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [text.length - this.pattern.length, text.length - 1]
      };
    }
  };
  var InverseSuffixExactMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "inverse-suffix-exact";
    }
    static get multiRegex() {
      return /^!"(.*)"\$$/;
    }
    static get singleRegex() {
      return /^!(.*)\$$/;
    }
    search(text) {
      const isMatch = !text.endsWith(this.pattern);
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices: [0, text.length - 1]
      };
    }
  };
  var FuzzyMatch = class extends BaseMatch {
    constructor(pattern, {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreLocation = Config.ignoreLocation
    } = {}) {
      super(pattern);
      this._bitapSearch = new BitapSearch(pattern, {
        location,
        threshold,
        distance,
        includeMatches,
        findAllMatches,
        minMatchCharLength,
        isCaseSensitive,
        ignoreLocation
      });
    }
    static get type() {
      return "fuzzy";
    }
    static get multiRegex() {
      return /^"(.*)"$/;
    }
    static get singleRegex() {
      return /^(.*)$/;
    }
    search(text) {
      return this._bitapSearch.searchIn(text);
    }
  };
  var IncludeMatch = class extends BaseMatch {
    constructor(pattern) {
      super(pattern);
    }
    static get type() {
      return "include";
    }
    static get multiRegex() {
      return /^'"(.*)"$/;
    }
    static get singleRegex() {
      return /^'(.*)$/;
    }
    search(text) {
      let location = 0;
      let index;
      const indices = [];
      const patternLen = this.pattern.length;
      while ((index = text.indexOf(this.pattern, location)) > -1) {
        location = index + patternLen;
        indices.push([index, location - 1]);
      }
      const isMatch = !!indices.length;
      return {
        isMatch,
        score: isMatch ? 0 : 1,
        indices
      };
    }
  };
  var searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
  var searchersLen = searchers.length;
  var SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
  var OR_TOKEN = "|";
  function parseQuery(pattern, options = {}) {
    return pattern.split(OR_TOKEN).map((item) => {
      let query = item.trim().split(SPACE_RE).filter((item2) => item2 && !!item2.trim());
      let results = [];
      for (let i = 0, len = query.length; i < len; i += 1) {
        const queryItem = query[i];
        let found = false;
        let idx = -1;
        while (!found && ++idx < searchersLen) {
          const searcher = searchers[idx];
          let token = searcher.isMultiMatch(queryItem);
          if (token) {
            results.push(new searcher(token, options));
            found = true;
          }
        }
        if (found) {
          continue;
        }
        idx = -1;
        while (++idx < searchersLen) {
          const searcher = searchers[idx];
          let token = searcher.isSingleMatch(queryItem);
          if (token) {
            results.push(new searcher(token, options));
            break;
          }
        }
      }
      return results;
    });
  }
  var MultiMatchSet = /* @__PURE__ */ new Set([FuzzyMatch.type, IncludeMatch.type]);
  var ExtendedSearch = class {
    constructor(pattern, {
      isCaseSensitive = Config.isCaseSensitive,
      includeMatches = Config.includeMatches,
      minMatchCharLength = Config.minMatchCharLength,
      ignoreLocation = Config.ignoreLocation,
      findAllMatches = Config.findAllMatches,
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance
    } = {}) {
      this.query = null;
      this.options = {
        isCaseSensitive,
        includeMatches,
        minMatchCharLength,
        findAllMatches,
        ignoreLocation,
        location,
        threshold,
        distance
      };
      this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
      this.query = parseQuery(this.pattern, this.options);
    }
    static condition(_, options) {
      return options.useExtendedSearch;
    }
    searchIn(text) {
      const query = this.query;
      if (!query) {
        return {
          isMatch: false,
          score: 1
        };
      }
      const {
        includeMatches,
        isCaseSensitive
      } = this.options;
      text = isCaseSensitive ? text : text.toLowerCase();
      let numMatches = 0;
      let allIndices = [];
      let totalScore = 0;
      for (let i = 0, qLen = query.length; i < qLen; i += 1) {
        const searchers2 = query[i];
        allIndices.length = 0;
        numMatches = 0;
        for (let j = 0, pLen = searchers2.length; j < pLen; j += 1) {
          const searcher = searchers2[j];
          const {
            isMatch,
            indices,
            score
          } = searcher.search(text);
          if (isMatch) {
            numMatches += 1;
            totalScore += score;
            if (includeMatches) {
              const type = searcher.constructor.type;
              if (MultiMatchSet.has(type)) {
                allIndices = [...allIndices, ...indices];
              } else {
                allIndices.push(indices);
              }
            }
          } else {
            totalScore = 0;
            numMatches = 0;
            allIndices.length = 0;
            break;
          }
        }
        if (numMatches) {
          let result = {
            isMatch: true,
            score: totalScore / numMatches
          };
          if (includeMatches) {
            result.indices = allIndices;
          }
          return result;
        }
      }
      return {
        isMatch: false,
        score: 1
      };
    }
  };
  var registeredSearchers = [];
  function register(...args) {
    registeredSearchers.push(...args);
  }
  function createSearcher(pattern, options) {
    for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
      let searcherClass = registeredSearchers[i];
      if (searcherClass.condition(pattern, options)) {
        return new searcherClass(pattern, options);
      }
    }
    return new BitapSearch(pattern, options);
  }
  var LogicalOperator = {
    AND: "$and",
    OR: "$or"
  };
  var KeyType = {
    PATH: "$path",
    PATTERN: "$val"
  };
  var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
  var isPath = (query) => !!query[KeyType.PATH];
  var isLeaf = (query) => !isArray(query) && isObject3(query) && !isExpression(query);
  var convertToExplicit = (query) => ({
    [LogicalOperator.AND]: Object.keys(query).map((key) => ({
      [key]: query[key]
    }))
  });
  function parse(query, options, {
    auto = true
  } = {}) {
    const next = (query2) => {
      let keys = Object.keys(query2);
      const isQueryPath = isPath(query2);
      if (!isQueryPath && keys.length > 1 && !isExpression(query2)) {
        return next(convertToExplicit(query2));
      }
      if (isLeaf(query2)) {
        const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
        const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
        if (!isString(pattern)) {
          throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
        }
        const obj = {
          keyId: createKeyId(key),
          pattern
        };
        if (auto) {
          obj.searcher = createSearcher(pattern, options);
        }
        return obj;
      }
      let node = {
        children: [],
        operator: keys[0]
      };
      keys.forEach((key) => {
        const value = query2[key];
        if (isArray(value)) {
          value.forEach((item) => {
            node.children.push(next(item));
          });
        }
      });
      return node;
    };
    if (!isExpression(query)) {
      query = convertToExplicit(query);
    }
    return next(query);
  }
  function computeScore(results, {
    ignoreFieldNorm = Config.ignoreFieldNorm
  }) {
    results.forEach((result) => {
      let totalScore = 1;
      result.matches.forEach(({
        key,
        norm: norm2,
        score
      }) => {
        const weight = key ? key.weight : null;
        totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
      });
      result.score = totalScore;
    });
  }
  function transformMatches(result, data) {
    const matches = result.matches;
    data.matches = [];
    if (!isDefined(matches)) {
      return;
    }
    matches.forEach((match) => {
      if (!isDefined(match.indices) || !match.indices.length) {
        return;
      }
      const {
        indices,
        value
      } = match;
      let obj = {
        indices,
        value
      };
      if (match.key) {
        obj.key = match.key.src;
      }
      if (match.idx > -1) {
        obj.refIndex = match.idx;
      }
      data.matches.push(obj);
    });
  }
  function transformScore(result, data) {
    data.score = result.score;
  }
  function format(results, docs, {
    includeMatches = Config.includeMatches,
    includeScore = Config.includeScore
  } = {}) {
    const transformers = [];
    if (includeMatches) transformers.push(transformMatches);
    if (includeScore) transformers.push(transformScore);
    return results.map((result) => {
      const {
        idx
      } = result;
      const data = {
        item: docs[idx],
        refIndex: idx
      };
      if (transformers.length) {
        transformers.forEach((transformer) => {
          transformer(result, data);
        });
      }
      return data;
    });
  }
  var Fuse = class {
    constructor(docs, options = {}, index) {
      this.options = _objectSpread2(_objectSpread2({}, Config), options);
      if (this.options.useExtendedSearch && false) {
        throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
      }
      this._keyStore = new KeyStore(this.options.keys);
      this.setCollection(docs, index);
    }
    setCollection(docs, index) {
      this._docs = docs;
      if (index && !(index instanceof FuseIndex)) {
        throw new Error(INCORRECT_INDEX_TYPE);
      }
      this._myIndex = index || createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
    }
    add(doc) {
      if (!isDefined(doc)) {
        return;
      }
      this._docs.push(doc);
      this._myIndex.add(doc);
    }
    remove(predicate = () => false) {
      const results = [];
      for (let i = 0, len = this._docs.length; i < len; i += 1) {
        const doc = this._docs[i];
        if (predicate(doc, i)) {
          this.removeAt(i);
          i -= 1;
          len -= 1;
          results.push(doc);
        }
      }
      return results;
    }
    removeAt(idx) {
      this._docs.splice(idx, 1);
      this._myIndex.removeAt(idx);
    }
    getIndex() {
      return this._myIndex;
    }
    search(query, {
      limit = -1
    } = {}) {
      const {
        includeMatches,
        includeScore,
        shouldSort,
        sortFn,
        ignoreFieldNorm
      } = this.options;
      let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
      computeScore(results, {
        ignoreFieldNorm
      });
      if (shouldSort) {
        results.sort(sortFn);
      }
      if (isNumber(limit) && limit > -1) {
        results = results.slice(0, limit);
      }
      return format(results, this._docs, {
        includeMatches,
        includeScore
      });
    }
    _searchStringList(query) {
      const searcher = createSearcher(query, this.options);
      const {
        records
      } = this._myIndex;
      const results = [];
      records.forEach(({
        v: text,
        i: idx,
        n: norm2
      }) => {
        if (!isDefined(text)) {
          return;
        }
        const {
          isMatch,
          score,
          indices
        } = searcher.searchIn(text);
        if (isMatch) {
          results.push({
            item: text,
            idx,
            matches: [{
              score,
              value: text,
              norm: norm2,
              indices
            }]
          });
        }
      });
      return results;
    }
    _searchLogical(query) {
      const expression = parse(query, this.options);
      const evaluate = (node, item, idx) => {
        if (!node.children) {
          const {
            keyId,
            searcher
          } = node;
          const matches = this._findMatches({
            key: this._keyStore.get(keyId),
            value: this._myIndex.getValueForItemAtKeyId(item, keyId),
            searcher
          });
          if (matches && matches.length) {
            return [{
              idx,
              item,
              matches
            }];
          }
          return [];
        }
        const res = [];
        for (let i = 0, len = node.children.length; i < len; i += 1) {
          const child = node.children[i];
          const result = evaluate(child, item, idx);
          if (result.length) {
            res.push(...result);
          } else if (node.operator === LogicalOperator.AND) {
            return [];
          }
        }
        return res;
      };
      const records = this._myIndex.records;
      const resultMap = {};
      const results = [];
      records.forEach(({
        $: item,
        i: idx
      }) => {
        if (isDefined(item)) {
          let expResults = evaluate(expression, item, idx);
          if (expResults.length) {
            if (!resultMap[idx]) {
              resultMap[idx] = {
                idx,
                item,
                matches: []
              };
              results.push(resultMap[idx]);
            }
            expResults.forEach(({
              matches
            }) => {
              resultMap[idx].matches.push(...matches);
            });
          }
        }
      });
      return results;
    }
    _searchObjectList(query) {
      const searcher = createSearcher(query, this.options);
      const {
        keys,
        records
      } = this._myIndex;
      const results = [];
      records.forEach(({
        $: item,
        i: idx
      }) => {
        if (!isDefined(item)) {
          return;
        }
        let matches = [];
        keys.forEach((key, keyIndex) => {
          matches.push(...this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          }));
        });
        if (matches.length) {
          results.push({
            idx,
            item,
            matches
          });
        }
      });
      return results;
    }
    _findMatches({
      key,
      value,
      searcher
    }) {
      if (!isDefined(value)) {
        return [];
      }
      let matches = [];
      if (isArray(value)) {
        value.forEach(({
          v: text,
          i: idx,
          n: norm2
        }) => {
          if (!isDefined(text)) {
            return;
          }
          const {
            isMatch,
            score,
            indices
          } = searcher.searchIn(text);
          if (isMatch) {
            matches.push({
              score,
              key,
              value: text,
              idx,
              norm: norm2,
              indices
            });
          }
        });
      } else {
        const {
          v: text,
          n: norm2
        } = value;
        const {
          isMatch,
          score,
          indices
        } = searcher.searchIn(text);
        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            norm: norm2,
            indices
          });
        }
      }
      return matches;
    }
  };
  Fuse.version = "7.0.0";
  Fuse.createIndex = createIndex;
  Fuse.parseIndex = parseIndex;
  Fuse.config = Config;
  {
    Fuse.parseQuery = parse;
  }
  {
    register(ExtendedSearch);
  }
  var SearchByFuse = (
    /** @class */
    function() {
      function SearchByFuse2(config) {
        this._haystack = [];
        this._fuseOptions = __assign(__assign({}, config.fuseOptions), { keys: __spreadArray([], config.searchFields, true), includeMatches: true });
      }
      SearchByFuse2.prototype.index = function(data) {
        this._haystack = data;
        if (this._fuse) {
          this._fuse.setCollection(data);
        }
      };
      SearchByFuse2.prototype.reset = function() {
        this._haystack = [];
        this._fuse = void 0;
      };
      SearchByFuse2.prototype.isEmptyIndex = function() {
        return !this._haystack.length;
      };
      SearchByFuse2.prototype.search = function(needle) {
        if (!this._fuse) {
          {
            this._fuse = new Fuse(this._haystack, this._fuseOptions);
          }
        }
        var results = this._fuse.search(needle);
        return results.map(function(value, i) {
          return {
            item: value.item,
            score: value.score || 0,
            rank: i + 1
            // If value.score is used for sorting, this can create non-stable sorts!
          };
        });
      };
      return SearchByFuse2;
    }()
  );
  function getSearcher(config) {
    {
      return new SearchByFuse(config);
    }
  }
  var isEmptyObject = function(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  };
  var assignCustomProperties = function(el, choice, withCustomProperties) {
    var dataset = el.dataset;
    var customProperties = choice.customProperties, labelClass = choice.labelClass, labelDescription = choice.labelDescription;
    if (labelClass) {
      dataset.labelClass = getClassNames(labelClass).join(" ");
    }
    if (labelDescription) {
      dataset.labelDescription = labelDescription;
    }
    if (withCustomProperties && customProperties) {
      if (typeof customProperties === "string") {
        dataset.customProperties = customProperties;
      } else if (typeof customProperties === "object" && !isEmptyObject(customProperties)) {
        dataset.customProperties = JSON.stringify(customProperties);
      }
    }
  };
  var addAriaLabel = function(docRoot, id, element) {
    var label = id && docRoot.querySelector("label[for='".concat(id, "']"));
    var text = label && label.innerText;
    if (text) {
      element.setAttribute("aria-label", text);
    }
  };
  var templates = {
    containerOuter: function(_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
      var containerOuter = _a.classNames.containerOuter;
      var div = document.createElement("div");
      addClassesToElement(div, containerOuter);
      div.dataset.type = passedElementType;
      if (dir) {
        div.dir = dir;
      }
      if (isSelectOneElement) {
        div.tabIndex = 0;
      }
      if (isSelectElement) {
        div.setAttribute("role", searchEnabled ? "combobox" : "listbox");
        if (searchEnabled) {
          div.setAttribute("aria-autocomplete", "list");
        } else if (!labelId) {
          addAriaLabel(this._docRoot, this.passedElement.element.id, div);
        }
        div.setAttribute("aria-haspopup", "true");
        div.setAttribute("aria-expanded", "false");
      }
      if (labelId) {
        div.setAttribute("aria-labelledby", labelId);
      }
      return div;
    },
    containerInner: function(_a) {
      var containerInner = _a.classNames.containerInner;
      var div = document.createElement("div");
      addClassesToElement(div, containerInner);
      return div;
    },
    itemList: function(_a, isSelectOneElement) {
      var searchEnabled = _a.searchEnabled, _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
      var div = document.createElement("div");
      addClassesToElement(div, list);
      addClassesToElement(div, isSelectOneElement ? listSingle : listItems);
      if (this._isSelectElement && searchEnabled) {
        div.setAttribute("role", "listbox");
      }
      return div;
    },
    placeholder: function(_a, value) {
      var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
      var div = document.createElement("div");
      addClassesToElement(div, placeholder);
      setElementHtml(div, allowHTML, value);
      return div;
    },
    item: function(_a, choice, removeItemButton) {
      var allowHTML = _a.allowHTML, removeItemButtonAlignLeft = _a.removeItemButtonAlignLeft, removeItemIconText = _a.removeItemIconText, removeItemLabelText = _a.removeItemLabelText, _b = _a.classNames, item = _b.item, button = _b.button, highlightedState = _b.highlightedState, itemSelectable = _b.itemSelectable, placeholder = _b.placeholder;
      var rawValue = unwrapStringForRaw(choice.value);
      var div = document.createElement("div");
      addClassesToElement(div, item);
      if (choice.labelClass) {
        var spanLabel = document.createElement("span");
        setElementHtml(spanLabel, allowHTML, choice.label);
        addClassesToElement(spanLabel, choice.labelClass);
        div.appendChild(spanLabel);
      } else {
        setElementHtml(div, allowHTML, choice.label);
      }
      div.dataset.item = "";
      div.dataset.id = choice.id;
      div.dataset.value = rawValue;
      assignCustomProperties(div, choice, true);
      if (choice.disabled || this.containerOuter.isDisabled) {
        div.setAttribute("aria-disabled", "true");
      }
      if (this._isSelectElement) {
        div.setAttribute("aria-selected", "true");
        div.setAttribute("role", "option");
      }
      if (choice.placeholder) {
        addClassesToElement(div, placeholder);
        div.dataset.placeholder = "";
      }
      addClassesToElement(div, choice.highlighted ? highlightedState : itemSelectable);
      if (removeItemButton) {
        if (choice.disabled) {
          removeClassesFromElement(div, itemSelectable);
        }
        div.dataset.deletable = "";
        var removeButton = document.createElement("button");
        removeButton.type = "button";
        addClassesToElement(removeButton, button);
        setElementHtml(removeButton, true, resolveNoticeFunction(removeItemIconText, choice.value));
        var REMOVE_ITEM_LABEL = resolveNoticeFunction(removeItemLabelText, choice.value);
        if (REMOVE_ITEM_LABEL) {
          removeButton.setAttribute("aria-label", REMOVE_ITEM_LABEL);
        }
        removeButton.dataset.button = "";
        if (removeItemButtonAlignLeft) {
          div.insertAdjacentElement("afterbegin", removeButton);
        } else {
          div.appendChild(removeButton);
        }
      }
      return div;
    },
    choiceList: function(_a, isSelectOneElement) {
      var list = _a.classNames.list;
      var div = document.createElement("div");
      addClassesToElement(div, list);
      if (!isSelectOneElement) {
        div.setAttribute("aria-multiselectable", "true");
      }
      div.setAttribute("role", "listbox");
      return div;
    },
    choiceGroup: function(_a, _b) {
      var allowHTML = _a.allowHTML, _c = _a.classNames, group = _c.group, groupHeading = _c.groupHeading, itemDisabled = _c.itemDisabled;
      var id = _b.id, label = _b.label, disabled = _b.disabled;
      var rawLabel = unwrapStringForRaw(label);
      var div = document.createElement("div");
      addClassesToElement(div, group);
      if (disabled) {
        addClassesToElement(div, itemDisabled);
      }
      div.setAttribute("role", "group");
      div.dataset.group = "";
      div.dataset.id = id;
      div.dataset.value = rawLabel;
      if (disabled) {
        div.setAttribute("aria-disabled", "true");
      }
      var heading = document.createElement("div");
      addClassesToElement(heading, groupHeading);
      setElementHtml(heading, allowHTML, label || "");
      div.appendChild(heading);
      return div;
    },
    choice: function(_a, choice, selectText, groupName) {
      var allowHTML = _a.allowHTML, _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, itemSelectable = _b.itemSelectable, selectedState = _b.selectedState, itemDisabled = _b.itemDisabled, description = _b.description, placeholder = _b.placeholder;
      var label = choice.label;
      var rawValue = unwrapStringForRaw(choice.value);
      var div = document.createElement("div");
      div.id = choice.elementId;
      addClassesToElement(div, item);
      addClassesToElement(div, itemChoice);
      if (groupName && typeof label === "string") {
        label = escapeForTemplate(allowHTML, label);
        label += " (".concat(groupName, ")");
        label = { trusted: label };
      }
      var describedBy = div;
      if (choice.labelClass) {
        var spanLabel = document.createElement("span");
        setElementHtml(spanLabel, allowHTML, label);
        addClassesToElement(spanLabel, choice.labelClass);
        describedBy = spanLabel;
        div.appendChild(spanLabel);
      } else {
        setElementHtml(div, allowHTML, label);
      }
      if (choice.labelDescription) {
        var descId = "".concat(choice.elementId, "-description");
        describedBy.setAttribute("aria-describedby", descId);
        var spanDesc = document.createElement("span");
        setElementHtml(spanDesc, allowHTML, choice.labelDescription);
        spanDesc.id = descId;
        addClassesToElement(spanDesc, description);
        div.appendChild(spanDesc);
      }
      if (choice.selected) {
        addClassesToElement(div, selectedState);
      }
      if (choice.placeholder) {
        addClassesToElement(div, placeholder);
      }
      div.setAttribute("role", choice.group ? "treeitem" : "option");
      div.dataset.choice = "";
      div.dataset.id = choice.id;
      div.dataset.value = rawValue;
      if (selectText) {
        div.dataset.selectText = selectText;
      }
      if (choice.group) {
        div.dataset.groupId = "".concat(choice.group.id);
      }
      assignCustomProperties(div, choice, false);
      if (choice.disabled) {
        addClassesToElement(div, itemDisabled);
        div.dataset.choiceDisabled = "";
        div.setAttribute("aria-disabled", "true");
      } else {
        addClassesToElement(div, itemSelectable);
        div.dataset.choiceSelectable = "";
      }
      return div;
    },
    input: function(_a, placeholderValue) {
      var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned, labelId = _a.labelId;
      var inp = document.createElement("input");
      inp.type = "search";
      addClassesToElement(inp, input);
      addClassesToElement(inp, inputCloned);
      inp.autocomplete = "off";
      inp.autocapitalize = "off";
      inp.spellcheck = false;
      inp.setAttribute("aria-autocomplete", "list");
      if (placeholderValue) {
        inp.setAttribute("aria-label", placeholderValue);
      } else if (!labelId) {
        addAriaLabel(this._docRoot, this.passedElement.element.id, inp);
      }
      return inp;
    },
    dropdown: function(_a) {
      var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
      var div = document.createElement("div");
      addClassesToElement(div, list);
      addClassesToElement(div, listDropdown);
      div.setAttribute("aria-expanded", "false");
      return div;
    },
    notice: function(_a, innerHTML, type) {
      var _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, addChoice2 = _b.addChoice, noResults = _b.noResults, noChoices = _b.noChoices, noticeItem = _b.notice;
      if (type === void 0) {
        type = NoticeTypes.generic;
      }
      var notice = document.createElement("div");
      setElementHtml(notice, true, innerHTML);
      addClassesToElement(notice, item);
      addClassesToElement(notice, itemChoice);
      addClassesToElement(notice, noticeItem);
      switch (type) {
        case NoticeTypes.addChoice:
          addClassesToElement(notice, addChoice2);
          break;
        case NoticeTypes.noResults:
          addClassesToElement(notice, noResults);
          break;
        case NoticeTypes.noChoices:
          addClassesToElement(notice, noChoices);
          break;
      }
      if (type === NoticeTypes.addChoice) {
        notice.dataset.choiceSelectable = "";
        notice.dataset.choice = "";
      }
      return notice;
    },
    option: function(choice) {
      var labelValue = unwrapStringForRaw(choice.label);
      var opt = new Option(labelValue, choice.value, false, choice.selected);
      assignCustomProperties(opt, choice, true);
      opt.disabled = choice.disabled;
      if (choice.selected) {
        opt.setAttribute("selected", "");
      }
      return opt;
    }
  };
  var IS_IE11 = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style;
  var USER_DEFAULTS = {};
  var parseDataSetId = function(element) {
    if (!element) {
      return void 0;
    }
    return element.dataset.id ? parseInt(element.dataset.id, 10) : void 0;
  };
  var selectableChoiceIdentifier = "[data-choice-selectable]";
  var Choices = (
    /** @class */
    function() {
      function Choices2(element, userConfig) {
        if (element === void 0) {
          element = "[data-choice]";
        }
        if (userConfig === void 0) {
          userConfig = {};
        }
        var _this = this;
        this.initialisedOK = void 0;
        this._hasNonChoicePlaceholder = false;
        this._lastAddedChoiceId = 0;
        this._lastAddedGroupId = 0;
        var defaults2 = Choices2.defaults;
        this.config = __assign(__assign(__assign({}, defaults2.allOptions), defaults2.options), userConfig);
        ObjectsInConfig.forEach(function(key) {
          _this.config[key] = __assign(__assign(__assign({}, defaults2.allOptions[key]), defaults2.options[key]), userConfig[key]);
        });
        var config = this.config;
        if (!config.silent) {
          this._validateConfig();
        }
        var docRoot = config.shadowRoot || document.documentElement;
        this._docRoot = docRoot;
        var passedElement = typeof element === "string" ? docRoot.querySelector(element) : element;
        if (!passedElement || typeof passedElement !== "object" || !(isHtmlInputElement(passedElement) || isHtmlSelectElement(passedElement))) {
          if (!passedElement && typeof element === "string") {
            throw TypeError("Selector ".concat(element, " failed to find an element"));
          }
          throw TypeError("Expected one of the following types text|select-one|select-multiple");
        }
        var elementType = passedElement.type;
        var isText = elementType === PassedElementTypes.Text;
        if (isText || config.maxItemCount !== 1) {
          config.singleModeForMultiSelect = false;
        }
        if (config.singleModeForMultiSelect) {
          elementType = PassedElementTypes.SelectMultiple;
        }
        var isSelectOne = elementType === PassedElementTypes.SelectOne;
        var isSelectMultiple = elementType === PassedElementTypes.SelectMultiple;
        var isSelect = isSelectOne || isSelectMultiple;
        this._elementType = elementType;
        this._isTextElement = isText;
        this._isSelectOneElement = isSelectOne;
        this._isSelectMultipleElement = isSelectMultiple;
        this._isSelectElement = isSelectOne || isSelectMultiple;
        this._canAddUserChoices = isText && config.addItems || isSelect && config.addChoices;
        if (typeof config.renderSelectedChoices !== "boolean") {
          config.renderSelectedChoices = config.renderSelectedChoices === "always" || isSelectOne;
        }
        if (config.closeDropdownOnSelect === "auto") {
          config.closeDropdownOnSelect = isText || isSelectOne || config.singleModeForMultiSelect;
        } else {
          config.closeDropdownOnSelect = coerceBool(config.closeDropdownOnSelect);
        }
        if (config.placeholder) {
          if (config.placeholderValue) {
            this._hasNonChoicePlaceholder = true;
          } else if (passedElement.dataset.placeholder) {
            this._hasNonChoicePlaceholder = true;
            config.placeholderValue = passedElement.dataset.placeholder;
          }
        }
        if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== "function") {
          var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
          config.addItemFilter = re.test.bind(re);
        }
        if (this._isTextElement) {
          this.passedElement = new WrappedInput({
            element: passedElement,
            classNames: config.classNames
          });
        } else {
          var selectEl = passedElement;
          this.passedElement = new WrappedSelect({
            element: selectEl,
            classNames: config.classNames,
            template: function(data) {
              return _this._templates.option(data);
            },
            extractPlaceholder: config.placeholder && !this._hasNonChoicePlaceholder
          });
        }
        this.initialised = false;
        this._store = new Store(config);
        this._currentValue = "";
        config.searchEnabled = !isText && config.searchEnabled || isSelectMultiple;
        this._canSearch = config.searchEnabled;
        this._isScrollingOnIe = false;
        this._highlightPosition = 0;
        this._wasTap = true;
        this._placeholderValue = this._generatePlaceholderValue();
        this._baseId = generateId(passedElement, "choices-");
        this._direction = passedElement.dir;
        if (!this._direction) {
          var elementDirection = window.getComputedStyle(passedElement).direction;
          var documentDirection = window.getComputedStyle(document.documentElement).direction;
          if (elementDirection !== documentDirection) {
            this._direction = elementDirection;
          }
        }
        this._idNames = {
          itemChoice: "item-choice"
        };
        this._templates = defaults2.templates;
        this._render = this._render.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onFormReset = this._onFormReset.bind(this);
        this._onSelectKey = this._onSelectKey.bind(this);
        this._onEnterKey = this._onEnterKey.bind(this);
        this._onEscapeKey = this._onEscapeKey.bind(this);
        this._onDirectionKey = this._onDirectionKey.bind(this);
        this._onDeleteKey = this._onDeleteKey.bind(this);
        if (this.passedElement.isActive) {
          if (!config.silent) {
            console.warn("Trying to initialise Choices on element already initialised", { element });
          }
          this.initialised = true;
          this.initialisedOK = false;
          return;
        }
        this.init();
        this._initialItems = this._store.items.map(function(choice) {
          return choice.value;
        });
      }
      Object.defineProperty(Choices2, "defaults", {
        get: function() {
          return Object.preventExtensions({
            get options() {
              return USER_DEFAULTS;
            },
            get allOptions() {
              return DEFAULT_CONFIG;
            },
            get templates() {
              return templates;
            }
          });
        },
        enumerable: false,
        configurable: true
      });
      Choices2.prototype.init = function() {
        if (this.initialised || this.initialisedOK !== void 0) {
          return;
        }
        this._searcher = getSearcher(this.config);
        this._loadChoices();
        this._createTemplates();
        this._createElements();
        this._createStructure();
        if (this._isTextElement && !this.config.addItems || this.passedElement.element.hasAttribute("disabled") || !!this.passedElement.element.closest("fieldset:disabled")) {
          this.disable();
        } else {
          this.enable();
          this._addEventListeners();
        }
        this._initStore();
        this.initialised = true;
        this.initialisedOK = true;
        var callbackOnInit = this.config.callbackOnInit;
        if (typeof callbackOnInit === "function") {
          callbackOnInit.call(this);
        }
      };
      Choices2.prototype.destroy = function() {
        if (!this.initialised) {
          return;
        }
        this._removeEventListeners();
        this.passedElement.reveal();
        this.containerOuter.unwrap(this.passedElement.element);
        this._store._listeners = [];
        this.clearStore(false);
        this._stopSearch();
        this._templates = Choices2.defaults.templates;
        this.initialised = false;
        this.initialisedOK = void 0;
      };
      Choices2.prototype.enable = function() {
        if (this.passedElement.isDisabled) {
          this.passedElement.enable();
        }
        if (this.containerOuter.isDisabled) {
          this._addEventListeners();
          this.input.enable();
          this.containerOuter.enable();
        }
        return this;
      };
      Choices2.prototype.disable = function() {
        if (!this.passedElement.isDisabled) {
          this.passedElement.disable();
        }
        if (!this.containerOuter.isDisabled) {
          this._removeEventListeners();
          this.input.disable();
          this.containerOuter.disable();
        }
        return this;
      };
      Choices2.prototype.highlightItem = function(item, runEvent) {
        if (runEvent === void 0) {
          runEvent = true;
        }
        if (!item || !item.id) {
          return this;
        }
        var choice = this._store.items.find(function(c) {
          return c.id === item.id;
        });
        if (!choice || choice.highlighted) {
          return this;
        }
        this._store.dispatch(highlightItem(choice, true));
        if (runEvent) {
          this.passedElement.triggerEvent(EventType.highlightItem, this._getChoiceForOutput(choice));
        }
        return this;
      };
      Choices2.prototype.unhighlightItem = function(item, runEvent) {
        if (runEvent === void 0) {
          runEvent = true;
        }
        if (!item || !item.id) {
          return this;
        }
        var choice = this._store.items.find(function(c) {
          return c.id === item.id;
        });
        if (!choice || !choice.highlighted) {
          return this;
        }
        this._store.dispatch(highlightItem(choice, false));
        if (runEvent) {
          this.passedElement.triggerEvent(EventType.unhighlightItem, this._getChoiceForOutput(choice));
        }
        return this;
      };
      Choices2.prototype.highlightAll = function() {
        var _this = this;
        this._store.withTxn(function() {
          _this._store.items.forEach(function(item) {
            if (!item.highlighted) {
              _this._store.dispatch(highlightItem(item, true));
              _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
            }
          });
        });
        return this;
      };
      Choices2.prototype.unhighlightAll = function() {
        var _this = this;
        this._store.withTxn(function() {
          _this._store.items.forEach(function(item) {
            if (item.highlighted) {
              _this._store.dispatch(highlightItem(item, false));
              _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
            }
          });
        });
        return this;
      };
      Choices2.prototype.removeActiveItemsByValue = function(value) {
        var _this = this;
        this._store.withTxn(function() {
          _this._store.items.filter(function(item) {
            return item.value === value;
          }).forEach(function(item) {
            return _this._removeItem(item);
          });
        });
        return this;
      };
      Choices2.prototype.removeActiveItems = function(excludedId) {
        var _this = this;
        this._store.withTxn(function() {
          _this._store.items.filter(function(_a) {
            var id = _a.id;
            return id !== excludedId;
          }).forEach(function(item) {
            return _this._removeItem(item);
          });
        });
        return this;
      };
      Choices2.prototype.removeHighlightedItems = function(runEvent) {
        var _this = this;
        if (runEvent === void 0) {
          runEvent = false;
        }
        this._store.withTxn(function() {
          _this._store.highlightedActiveItems.forEach(function(item) {
            _this._removeItem(item);
            if (runEvent) {
              _this._triggerChange(item.value);
            }
          });
        });
        return this;
      };
      Choices2.prototype.showDropdown = function(preventInputFocus) {
        var _this = this;
        if (this.dropdown.isActive) {
          return this;
        }
        if (preventInputFocus === void 0) {
          preventInputFocus = !this._canSearch;
        }
        requestAnimationFrame(function() {
          _this.dropdown.show();
          var rect = _this.dropdown.element.getBoundingClientRect();
          _this.containerOuter.open(rect.bottom, rect.height);
          if (!preventInputFocus) {
            _this.input.focus();
          }
          _this.passedElement.triggerEvent(EventType.showDropdown);
        });
        return this;
      };
      Choices2.prototype.hideDropdown = function(preventInputBlur) {
        var _this = this;
        if (!this.dropdown.isActive) {
          return this;
        }
        requestAnimationFrame(function() {
          _this.dropdown.hide();
          _this.containerOuter.close();
          if (!preventInputBlur && _this._canSearch) {
            _this.input.removeActiveDescendant();
            _this.input.blur();
          }
          _this.passedElement.triggerEvent(EventType.hideDropdown);
        });
        return this;
      };
      Choices2.prototype.getValue = function(valueOnly) {
        var _this = this;
        var values = this._store.items.map(function(item) {
          return valueOnly ? item.value : _this._getChoiceForOutput(item);
        });
        return this._isSelectOneElement || this.config.singleModeForMultiSelect ? values[0] : values;
      };
      Choices2.prototype.setValue = function(items2) {
        var _this = this;
        if (!this.initialisedOK) {
          this._warnChoicesInitFailed("setValue");
          return this;
        }
        this._store.withTxn(function() {
          items2.forEach(function(value) {
            if (value) {
              _this._addChoice(mapInputToChoice(value, false));
            }
          });
        });
        this._searcher.reset();
        return this;
      };
      Choices2.prototype.setChoiceByValue = function(value) {
        var _this = this;
        if (!this.initialisedOK) {
          this._warnChoicesInitFailed("setChoiceByValue");
          return this;
        }
        if (this._isTextElement) {
          return this;
        }
        this._store.withTxn(function() {
          var choiceValue = Array.isArray(value) ? value : [value];
          choiceValue.forEach(function(val) {
            return _this._findAndSelectChoiceByValue(val);
          });
          _this.unhighlightAll();
        });
        this._searcher.reset();
        return this;
      };
      Choices2.prototype.setChoices = function(choicesArrayOrFetcher, value, label, replaceChoices, clearSearchFlag, replaceItems) {
        var _this = this;
        if (choicesArrayOrFetcher === void 0) {
          choicesArrayOrFetcher = [];
        }
        if (value === void 0) {
          value = "value";
        }
        if (label === void 0) {
          label = "label";
        }
        if (replaceChoices === void 0) {
          replaceChoices = false;
        }
        if (clearSearchFlag === void 0) {
          clearSearchFlag = true;
        }
        if (replaceItems === void 0) {
          replaceItems = false;
        }
        if (!this.initialisedOK) {
          this._warnChoicesInitFailed("setChoices");
          return this;
        }
        if (!this._isSelectElement) {
          throw new TypeError("setChoices can't be used with INPUT based Choices");
        }
        if (typeof value !== "string" || !value) {
          throw new TypeError("value parameter must be a name of 'value' field in passed objects");
        }
        if (typeof choicesArrayOrFetcher === "function") {
          var fetcher_1 = choicesArrayOrFetcher(this);
          if (typeof Promise === "function" && fetcher_1 instanceof Promise) {
            return new Promise(function(resolve) {
              return requestAnimationFrame(resolve);
            }).then(function() {
              return _this._handleLoadingState(true);
            }).then(function() {
              return fetcher_1;
            }).then(function(data) {
              return _this.setChoices(data, value, label, replaceChoices, clearSearchFlag, replaceItems);
            }).catch(function(err) {
              if (!_this.config.silent) {
                console.error(err);
              }
            }).then(function() {
              return _this._handleLoadingState(false);
            }).then(function() {
              return _this;
            });
          }
          if (!Array.isArray(fetcher_1)) {
            throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
          }
          return this.setChoices(fetcher_1, value, label, false);
        }
        if (!Array.isArray(choicesArrayOrFetcher)) {
          throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
        }
        this.containerOuter.removeLoadingState();
        this._store.withTxn(function() {
          if (clearSearchFlag) {
            _this._isSearching = false;
          }
          if (replaceChoices) {
            _this.clearChoices(true, replaceItems);
          }
          var isDefaultValue = value === "value";
          var isDefaultLabel = label === "label";
          choicesArrayOrFetcher.forEach(function(groupOrChoice) {
            if ("choices" in groupOrChoice) {
              var group = groupOrChoice;
              if (!isDefaultLabel) {
                group = __assign(__assign({}, group), { label: group[label] });
              }
              _this._addGroup(mapInputToChoice(group, true));
            } else {
              var choice = groupOrChoice;
              if (!isDefaultLabel || !isDefaultValue) {
                choice = __assign(__assign({}, choice), { value: choice[value], label: choice[label] });
              }
              var choiceFull = mapInputToChoice(choice, false);
              _this._addChoice(choiceFull);
              if (choiceFull.placeholder && !_this._hasNonChoicePlaceholder) {
                _this._placeholderValue = unwrapStringForEscaped(choiceFull.label);
              }
            }
          });
          _this.unhighlightAll();
        });
        this._searcher.reset();
        return this;
      };
      Choices2.prototype.refresh = function(withEvents, selectFirstOption, deselectAll) {
        var _this = this;
        if (withEvents === void 0) {
          withEvents = false;
        }
        if (selectFirstOption === void 0) {
          selectFirstOption = false;
        }
        if (deselectAll === void 0) {
          deselectAll = false;
        }
        if (!this._isSelectElement) {
          if (!this.config.silent) {
            console.warn("refresh method can only be used on choices backed by a <select> element");
          }
          return this;
        }
        this._store.withTxn(function() {
          var choicesFromOptions = _this.passedElement.optionsAsChoices();
          var existingItems = {};
          if (!deselectAll) {
            _this._store.items.forEach(function(choice) {
              if (choice.id && choice.active && choice.selected) {
                existingItems[choice.value] = true;
              }
            });
          }
          _this.clearStore(false);
          var updateChoice = function(choice) {
            if (deselectAll) {
              _this._store.dispatch(removeItem$1(choice));
            } else if (existingItems[choice.value]) {
              choice.selected = true;
            }
          };
          choicesFromOptions.forEach(function(groupOrChoice) {
            if ("choices" in groupOrChoice) {
              groupOrChoice.choices.forEach(updateChoice);
              return;
            }
            updateChoice(groupOrChoice);
          });
          _this._addPredefinedChoices(choicesFromOptions, selectFirstOption, withEvents);
          if (_this._isSearching) {
            _this._searchChoices(_this.input.value);
          }
        });
        return this;
      };
      Choices2.prototype.removeChoice = function(value) {
        var choice = this._store.choices.find(function(c) {
          return c.value === value;
        });
        if (!choice) {
          return this;
        }
        this._clearNotice();
        this._store.dispatch(removeChoice(choice));
        this._searcher.reset();
        if (choice.selected) {
          this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(choice));
        }
        return this;
      };
      Choices2.prototype.clearChoices = function(clearOptions, clearItems) {
        var _this = this;
        if (clearOptions === void 0) {
          clearOptions = true;
        }
        if (clearItems === void 0) {
          clearItems = false;
        }
        if (clearOptions) {
          if (clearItems) {
            this.passedElement.element.replaceChildren("");
          } else {
            this.passedElement.element.querySelectorAll(":not([selected])").forEach(function(el) {
              el.remove();
            });
          }
        }
        this.itemList.element.replaceChildren("");
        this.choiceList.element.replaceChildren("");
        this._clearNotice();
        this._store.withTxn(function() {
          var items2 = clearItems ? [] : _this._store.items;
          _this._store.reset();
          items2.forEach(function(item) {
            _this._store.dispatch(addChoice(item));
            _this._store.dispatch(addItem(item));
          });
        });
        this._searcher.reset();
        return this;
      };
      Choices2.prototype.clearStore = function(clearOptions) {
        if (clearOptions === void 0) {
          clearOptions = true;
        }
        this.clearChoices(clearOptions, true);
        this._stopSearch();
        this._lastAddedChoiceId = 0;
        this._lastAddedGroupId = 0;
        return this;
      };
      Choices2.prototype.clearInput = function() {
        var shouldSetInputWidth = !this._isSelectOneElement;
        this.input.clear(shouldSetInputWidth);
        this._stopSearch();
        return this;
      };
      Choices2.prototype._validateConfig = function() {
        var config = this.config;
        var invalidConfigOptions = diff(config, DEFAULT_CONFIG);
        if (invalidConfigOptions.length) {
          console.warn("Unknown config option(s) passed", invalidConfigOptions.join(", "));
        }
        if (config.allowHTML && config.allowHtmlUserInput) {
          if (config.addItems) {
            console.warn("Warning: allowHTML/allowHtmlUserInput/addItems all being true is strongly not recommended and may lead to XSS attacks");
          }
          if (config.addChoices) {
            console.warn("Warning: allowHTML/allowHtmlUserInput/addChoices all being true is strongly not recommended and may lead to XSS attacks");
          }
        }
      };
      Choices2.prototype._render = function(changes) {
        if (changes === void 0) {
          changes = { choices: true, groups: true, items: true };
        }
        if (this._store.inTxn()) {
          return;
        }
        if (this._isSelectElement) {
          if (changes.choices || changes.groups) {
            this._renderChoices();
          }
        }
        if (changes.items) {
          this._renderItems();
        }
      };
      Choices2.prototype._renderChoices = function() {
        var _this = this;
        if (!this._canAddItems()) {
          return;
        }
        var _a = this, config = _a.config, isSearching = _a._isSearching;
        var _b = this._store, activeGroups = _b.activeGroups, activeChoices = _b.activeChoices;
        var renderLimit = 0;
        if (isSearching && config.searchResultLimit > 0) {
          renderLimit = config.searchResultLimit;
        } else if (config.renderChoiceLimit > 0) {
          renderLimit = config.renderChoiceLimit;
        }
        if (this._isSelectElement) {
          var backingOptions = activeChoices.filter(function(choice) {
            return !choice.element;
          });
          if (backingOptions.length) {
            this.passedElement.addOptions(backingOptions);
          }
        }
        var fragment = document.createDocumentFragment();
        var renderableChoices = function(choices2) {
          return choices2.filter(function(choice) {
            return !choice.placeholder && (isSearching ? !!choice.rank : config.renderSelectedChoices || !choice.selected);
          });
        };
        var selectableChoices = false;
        var renderChoices = function(choices2, withinGroup, groupLabel) {
          if (isSearching) {
            choices2.sort(sortByRank);
          } else if (config.shouldSort) {
            choices2.sort(config.sorter);
          }
          var choiceLimit = choices2.length;
          choiceLimit = !withinGroup && renderLimit && choiceLimit > renderLimit ? renderLimit : choiceLimit;
          choiceLimit--;
          choices2.every(function(choice, index) {
            var dropdownItem = choice.choiceEl || _this._templates.choice(config, choice, config.itemSelectText, groupLabel);
            choice.choiceEl = dropdownItem;
            fragment.appendChild(dropdownItem);
            if (isSearching || !choice.selected) {
              selectableChoices = true;
            }
            return index < choiceLimit;
          });
        };
        if (activeChoices.length) {
          if (config.resetScrollPosition) {
            requestAnimationFrame(function() {
              return _this.choiceList.scrollToTop();
            });
          }
          if (!this._hasNonChoicePlaceholder && !isSearching && this._isSelectOneElement) {
            renderChoices(activeChoices.filter(function(choice) {
              return choice.placeholder && !choice.group;
            }), false, void 0);
          }
          if (activeGroups.length && !isSearching) {
            if (config.shouldSort) {
              activeGroups.sort(config.sorter);
            }
            renderChoices(activeChoices.filter(function(choice) {
              return !choice.placeholder && !choice.group;
            }), false, void 0);
            activeGroups.forEach(function(group) {
              var groupChoices = renderableChoices(group.choices);
              if (groupChoices.length) {
                if (group.label) {
                  var dropdownGroup = group.groupEl || _this._templates.choiceGroup(_this.config, group);
                  group.groupEl = dropdownGroup;
                  dropdownGroup.remove();
                  fragment.appendChild(dropdownGroup);
                }
                renderChoices(groupChoices, true, config.appendGroupInSearch && isSearching ? group.label : void 0);
              }
            });
          } else {
            renderChoices(renderableChoices(activeChoices), false, void 0);
          }
        }
        if (!selectableChoices && (isSearching || !fragment.children.length || !config.renderSelectedChoices)) {
          if (!this._notice) {
            this._notice = {
              text: resolveStringFunction(isSearching ? config.noResultsText : config.noChoicesText),
              type: isSearching ? NoticeTypes.noResults : NoticeTypes.noChoices
            };
          }
          fragment.replaceChildren("");
        }
        this._renderNotice(fragment);
        this.choiceList.element.replaceChildren(fragment);
        if (selectableChoices) {
          this._highlightChoice();
        }
      };
      Choices2.prototype._renderItems = function() {
        var _this = this;
        var items2 = this._store.items || [];
        var itemList = this.itemList.element;
        var config = this.config;
        var fragment = document.createDocumentFragment();
        var itemFromList = function(item) {
          return itemList.querySelector('[data-item][data-id="'.concat(item.id, '"]'));
        };
        var addItemToFragment = function(item) {
          var el = item.itemEl;
          if (el && el.parentElement) {
            return;
          }
          el = itemFromList(item) || _this._templates.item(config, item, config.removeItemButton);
          item.itemEl = el;
          fragment.appendChild(el);
        };
        items2.forEach(addItemToFragment);
        var addedItems = !!fragment.childNodes.length;
        if (this._isSelectOneElement) {
          var existingItems = itemList.children.length;
          if (addedItems || existingItems > 1) {
            var placeholder = itemList.querySelector(getClassNamesSelector(config.classNames.placeholder));
            if (placeholder) {
              placeholder.remove();
            }
          } else if (!addedItems && !existingItems && this._placeholderValue) {
            addedItems = true;
            addItemToFragment(mapInputToChoice({
              selected: true,
              value: "",
              label: this._placeholderValue,
              placeholder: true
            }, false));
          }
        }
        if (addedItems) {
          itemList.append(fragment);
          if (config.shouldSortItems && !this._isSelectOneElement) {
            items2.sort(config.sorter);
            items2.forEach(function(item) {
              var el = itemFromList(item);
              if (el) {
                el.remove();
                fragment.append(el);
              }
            });
            itemList.append(fragment);
          }
        }
        if (this._isTextElement) {
          this.passedElement.value = items2.map(function(_a) {
            var value = _a.value;
            return value;
          }).join(config.delimiter);
        }
      };
      Choices2.prototype._displayNotice = function(text, type, openDropdown) {
        if (openDropdown === void 0) {
          openDropdown = true;
        }
        var oldNotice = this._notice;
        if (oldNotice && (oldNotice.type === type && oldNotice.text === text || oldNotice.type === NoticeTypes.addChoice && (type === NoticeTypes.noResults || type === NoticeTypes.noChoices))) {
          if (openDropdown) {
            this.showDropdown(true);
          }
          return;
        }
        this._clearNotice();
        this._notice = text ? {
          text,
          type
        } : void 0;
        this._renderNotice();
        if (openDropdown && text) {
          this.showDropdown(true);
        }
      };
      Choices2.prototype._clearNotice = function() {
        if (!this._notice) {
          return;
        }
        var noticeElement = this.choiceList.element.querySelector(getClassNamesSelector(this.config.classNames.notice));
        if (noticeElement) {
          noticeElement.remove();
        }
        this._notice = void 0;
      };
      Choices2.prototype._renderNotice = function(fragment) {
        var noticeConf = this._notice;
        if (noticeConf) {
          var notice = this._templates.notice(this.config, noticeConf.text, noticeConf.type);
          if (fragment) {
            fragment.append(notice);
          } else {
            this.choiceList.prepend(notice);
          }
        }
      };
      Choices2.prototype._getChoiceForOutput = function(choice, keyCode) {
        return {
          id: choice.id,
          highlighted: choice.highlighted,
          labelClass: choice.labelClass,
          labelDescription: choice.labelDescription,
          customProperties: choice.customProperties,
          disabled: choice.disabled,
          active: choice.active,
          label: choice.label,
          placeholder: choice.placeholder,
          value: choice.value,
          groupValue: choice.group ? choice.group.label : void 0,
          element: choice.element,
          keyCode
        };
      };
      Choices2.prototype._triggerChange = function(value) {
        if (value === void 0 || value === null) {
          return;
        }
        this.passedElement.triggerEvent(EventType.change, {
          value
        });
      };
      Choices2.prototype._handleButtonAction = function(element) {
        var _this = this;
        var items2 = this._store.items;
        if (!items2.length || !this.config.removeItems || !this.config.removeItemButton) {
          return;
        }
        var id = element && parseDataSetId(element.parentElement);
        var itemToRemove = id && items2.find(function(item) {
          return item.id === id;
        });
        if (!itemToRemove) {
          return;
        }
        this._store.withTxn(function() {
          _this._removeItem(itemToRemove);
          _this._triggerChange(itemToRemove.value);
          if (_this._isSelectOneElement && !_this._hasNonChoicePlaceholder) {
            var placeholderChoice = (_this.config.shouldSort ? _this._store.choices.reverse() : _this._store.choices).find(function(choice) {
              return choice.placeholder;
            });
            if (placeholderChoice) {
              _this._addItem(placeholderChoice);
              _this.unhighlightAll();
              if (placeholderChoice.value) {
                _this._triggerChange(placeholderChoice.value);
              }
            }
          }
        });
      };
      Choices2.prototype._handleItemAction = function(element, hasShiftKey) {
        var _this = this;
        if (hasShiftKey === void 0) {
          hasShiftKey = false;
        }
        var items2 = this._store.items;
        if (!items2.length || !this.config.removeItems || this._isSelectOneElement) {
          return;
        }
        var id = parseDataSetId(element);
        if (!id) {
          return;
        }
        items2.forEach(function(item) {
          if (item.id === id && !item.highlighted) {
            _this.highlightItem(item);
          } else if (!hasShiftKey && item.highlighted) {
            _this.unhighlightItem(item);
          }
        });
        this.input.focus();
      };
      Choices2.prototype._handleChoiceAction = function(element) {
        var _this = this;
        var id = parseDataSetId(element);
        var choice = id && this._store.getChoiceById(id);
        if (!choice || choice.disabled) {
          return false;
        }
        var hasActiveDropdown = this.dropdown.isActive;
        if (!choice.selected) {
          if (!this._canAddItems()) {
            return true;
          }
          this._store.withTxn(function() {
            _this._addItem(choice, true, true);
            _this.clearInput();
            _this.unhighlightAll();
          });
          this._triggerChange(choice.value);
        }
        if (hasActiveDropdown && this.config.closeDropdownOnSelect) {
          this.hideDropdown(true);
          this.containerOuter.element.focus();
        }
        return true;
      };
      Choices2.prototype._handleBackspace = function(items2) {
        var config = this.config;
        if (!config.removeItems || !items2.length) {
          return;
        }
        var lastItem = items2[items2.length - 1];
        var hasHighlightedItems = items2.some(function(item) {
          return item.highlighted;
        });
        if (config.editItems && !hasHighlightedItems && lastItem) {
          this.input.value = lastItem.value;
          this.input.setWidth();
          this._removeItem(lastItem);
          this._triggerChange(lastItem.value);
        } else {
          if (!hasHighlightedItems) {
            this.highlightItem(lastItem, false);
          }
          this.removeHighlightedItems(true);
        }
      };
      Choices2.prototype._loadChoices = function() {
        var _a;
        var _this = this;
        var config = this.config;
        if (this._isTextElement) {
          this._presetChoices = config.items.map(function(e) {
            return mapInputToChoice(e, false);
          });
          if (this.passedElement.value) {
            var elementItems = this.passedElement.value.split(config.delimiter).map(function(e) {
              return mapInputToChoice(e, false, _this.config.allowHtmlUserInput);
            });
            this._presetChoices = this._presetChoices.concat(elementItems);
          }
          this._presetChoices.forEach(function(choice) {
            choice.selected = true;
          });
        } else if (this._isSelectElement) {
          this._presetChoices = config.choices.map(function(e) {
            return mapInputToChoice(e, true);
          });
          var choicesFromOptions = this.passedElement.optionsAsChoices();
          if (choicesFromOptions) {
            (_a = this._presetChoices).push.apply(_a, choicesFromOptions);
          }
        }
      };
      Choices2.prototype._handleLoadingState = function(setLoading) {
        if (setLoading === void 0) {
          setLoading = true;
        }
        var el = this.itemList.element;
        if (setLoading) {
          this.disable();
          this.containerOuter.addLoadingState();
          if (this._isSelectOneElement) {
            el.replaceChildren(this._templates.placeholder(this.config, this.config.loadingText));
          } else {
            this.input.placeholder = this.config.loadingText;
          }
        } else {
          this.enable();
          this.containerOuter.removeLoadingState();
          if (this._isSelectOneElement) {
            el.replaceChildren("");
            this._render();
          } else {
            this.input.placeholder = this._placeholderValue || "";
          }
        }
      };
      Choices2.prototype._handleSearch = function(value) {
        if (!this.input.isFocussed) {
          return;
        }
        if (value !== null && typeof value !== "undefined" && value.length >= this.config.searchFloor) {
          var resultCount = this.config.searchChoices ? this._searchChoices(value) : 0;
          if (resultCount !== null) {
            this.passedElement.triggerEvent(EventType.search, {
              value,
              resultCount
            });
          }
        } else if (this._store.choices.some(function(option) {
          return !option.active;
        })) {
          this._stopSearch();
        }
      };
      Choices2.prototype._canAddItems = function() {
        var config = this.config;
        var maxItemCount = config.maxItemCount, maxItemText = config.maxItemText;
        if (!config.singleModeForMultiSelect && maxItemCount > 0 && maxItemCount <= this._store.items.length) {
          this.choiceList.element.replaceChildren("");
          this._notice = void 0;
          this._displayNotice(typeof maxItemText === "function" ? maxItemText(maxItemCount) : maxItemText, NoticeTypes.addChoice);
          return false;
        }
        if (this._notice && this._notice.type === NoticeTypes.addChoice) {
          this._clearNotice();
        }
        return true;
      };
      Choices2.prototype._canCreateItem = function(value) {
        var config = this.config;
        var canAddItem = true;
        var notice = "";
        if (canAddItem && typeof config.addItemFilter === "function" && !config.addItemFilter(value)) {
          canAddItem = false;
          notice = resolveNoticeFunction(config.customAddItemText, value);
        }
        if (canAddItem) {
          var foundChoice = this._store.choices.find(function(choice) {
            return config.valueComparer(choice.value, value);
          });
          if (foundChoice) {
            if (this._isSelectElement) {
              this._displayNotice("", NoticeTypes.addChoice);
              return false;
            }
            if (!config.duplicateItemsAllowed) {
              canAddItem = false;
              notice = resolveNoticeFunction(config.uniqueItemText, value);
            }
          }
        }
        if (canAddItem) {
          notice = resolveNoticeFunction(config.addItemText, value);
        }
        if (notice) {
          this._displayNotice(notice, NoticeTypes.addChoice);
        }
        return canAddItem;
      };
      Choices2.prototype._searchChoices = function(value) {
        var newValue = value.trim().replace(/\s{2,}/, " ");
        if (!newValue.length || newValue === this._currentValue) {
          return null;
        }
        var searcher = this._searcher;
        if (searcher.isEmptyIndex()) {
          searcher.index(this._store.searchableChoices);
        }
        var results = searcher.search(newValue);
        this._currentValue = newValue;
        this._highlightPosition = 0;
        this._isSearching = true;
        var notice = this._notice;
        var noticeType = notice && notice.type;
        if (noticeType !== NoticeTypes.addChoice) {
          if (!results.length) {
            this._displayNotice(resolveStringFunction(this.config.noResultsText), NoticeTypes.noResults);
          } else {
            this._clearNotice();
          }
        }
        this._store.dispatch(filterChoices(results));
        return results.length;
      };
      Choices2.prototype._stopSearch = function() {
        if (this._isSearching) {
          this._currentValue = "";
          this._isSearching = false;
          this._clearNotice();
          this._store.dispatch(activateChoices(true));
          this.passedElement.triggerEvent(EventType.search, {
            value: "",
            resultCount: 0
          });
        }
      };
      Choices2.prototype._addEventListeners = function() {
        var documentElement = this._docRoot;
        var outerElement = this.containerOuter.element;
        var inputElement = this.input.element;
        documentElement.addEventListener("touchend", this._onTouchEnd, true);
        outerElement.addEventListener("keydown", this._onKeyDown, true);
        outerElement.addEventListener("mousedown", this._onMouseDown, true);
        documentElement.addEventListener("click", this._onClick, { passive: true });
        documentElement.addEventListener("touchmove", this._onTouchMove, {
          passive: true
        });
        this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
          passive: true
        });
        if (this._isSelectOneElement) {
          outerElement.addEventListener("focus", this._onFocus, {
            passive: true
          });
          outerElement.addEventListener("blur", this._onBlur, {
            passive: true
          });
        }
        inputElement.addEventListener("keyup", this._onKeyUp, {
          passive: true
        });
        inputElement.addEventListener("input", this._onInput, {
          passive: true
        });
        inputElement.addEventListener("focus", this._onFocus, {
          passive: true
        });
        inputElement.addEventListener("blur", this._onBlur, {
          passive: true
        });
        if (inputElement.form) {
          inputElement.form.addEventListener("reset", this._onFormReset, {
            passive: true
          });
        }
        this.input.addEventListeners();
      };
      Choices2.prototype._removeEventListeners = function() {
        var documentElement = this._docRoot;
        var outerElement = this.containerOuter.element;
        var inputElement = this.input.element;
        documentElement.removeEventListener("touchend", this._onTouchEnd, true);
        outerElement.removeEventListener("keydown", this._onKeyDown, true);
        outerElement.removeEventListener("mousedown", this._onMouseDown, true);
        documentElement.removeEventListener("click", this._onClick);
        documentElement.removeEventListener("touchmove", this._onTouchMove);
        this.dropdown.element.removeEventListener("mouseover", this._onMouseOver);
        if (this._isSelectOneElement) {
          outerElement.removeEventListener("focus", this._onFocus);
          outerElement.removeEventListener("blur", this._onBlur);
        }
        inputElement.removeEventListener("keyup", this._onKeyUp);
        inputElement.removeEventListener("input", this._onInput);
        inputElement.removeEventListener("focus", this._onFocus);
        inputElement.removeEventListener("blur", this._onBlur);
        if (inputElement.form) {
          inputElement.form.removeEventListener("reset", this._onFormReset);
        }
        this.input.removeEventListeners();
      };
      Choices2.prototype._onKeyDown = function(event2) {
        var keyCode = event2.keyCode;
        var hasActiveDropdown = this.dropdown.isActive;
        var wasPrintableChar = event2.key.length === 1 || event2.key.length === 2 && event2.key.charCodeAt(0) >= 55296 || event2.key === "Unidentified";
        if (!this._isTextElement && !hasActiveDropdown && keyCode !== KeyCodeMap.ESC_KEY && keyCode !== KeyCodeMap.TAB_KEY && keyCode !== KeyCodeMap.SHIFT_KEY) {
          this.showDropdown();
          if (!this.input.isFocussed && wasPrintableChar) {
            this.input.value += event2.key;
            if (event2.key === " ") {
              event2.preventDefault();
            }
          }
        }
        switch (keyCode) {
          case KeyCodeMap.A_KEY:
            return this._onSelectKey(event2, this.itemList.element.hasChildNodes());
          case KeyCodeMap.ENTER_KEY:
            return this._onEnterKey(event2, hasActiveDropdown);
          case KeyCodeMap.ESC_KEY:
            return this._onEscapeKey(event2, hasActiveDropdown);
          case KeyCodeMap.UP_KEY:
          case KeyCodeMap.PAGE_UP_KEY:
          case KeyCodeMap.DOWN_KEY:
          case KeyCodeMap.PAGE_DOWN_KEY:
            return this._onDirectionKey(event2, hasActiveDropdown);
          case KeyCodeMap.DELETE_KEY:
          case KeyCodeMap.BACK_KEY:
            return this._onDeleteKey(event2, this._store.items, this.input.isFocussed);
        }
      };
      Choices2.prototype._onKeyUp = function() {
        this._canSearch = this.config.searchEnabled;
      };
      Choices2.prototype._onInput = function() {
        var value = this.input.value;
        if (!value) {
          if (this._isTextElement) {
            this.hideDropdown(true);
          } else {
            this._stopSearch();
          }
          return;
        }
        if (!this._canAddItems()) {
          return;
        }
        if (this._canSearch) {
          this._handleSearch(value);
        }
        if (!this._canAddUserChoices) {
          return;
        }
        this._canCreateItem(value);
        if (this._isSelectElement) {
          this._highlightPosition = 0;
          this._highlightChoice();
        }
      };
      Choices2.prototype._onSelectKey = function(event2, hasItems) {
        if ((event2.ctrlKey || event2.metaKey) && hasItems) {
          this._canSearch = false;
          var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
          if (shouldHightlightAll) {
            this.highlightAll();
          }
        }
      };
      Choices2.prototype._onEnterKey = function(event2, hasActiveDropdown) {
        var _this = this;
        var value = this.input.value;
        var target = event2.target;
        event2.preventDefault();
        if (target && target.hasAttribute("data-button")) {
          this._handleButtonAction(target);
          return;
        }
        if (!hasActiveDropdown) {
          if (this._isSelectElement || this._notice) {
            this.showDropdown();
          }
          return;
        }
        var highlightedChoice = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
        if (highlightedChoice && this._handleChoiceAction(highlightedChoice)) {
          return;
        }
        if (!target || !value) {
          this.hideDropdown(true);
          return;
        }
        if (!this._canAddItems()) {
          return;
        }
        var addedItem = false;
        this._store.withTxn(function() {
          addedItem = _this._findAndSelectChoiceByValue(value, true);
          if (!addedItem) {
            if (!_this._canAddUserChoices) {
              return;
            }
            if (!_this._canCreateItem(value)) {
              return;
            }
            _this._addChoice(mapInputToChoice(value, false, _this.config.allowHtmlUserInput), true, true);
            addedItem = true;
          }
          _this.clearInput();
          _this.unhighlightAll();
        });
        if (!addedItem) {
          return;
        }
        this._triggerChange(value);
        if (this.config.closeDropdownOnSelect) {
          this.hideDropdown(true);
        }
      };
      Choices2.prototype._onEscapeKey = function(event2, hasActiveDropdown) {
        if (hasActiveDropdown) {
          event2.stopPropagation();
          this.hideDropdown(true);
          this._stopSearch();
          this.containerOuter.element.focus();
        }
      };
      Choices2.prototype._onDirectionKey = function(event2, hasActiveDropdown) {
        var keyCode = event2.keyCode;
        if (hasActiveDropdown || this._isSelectOneElement) {
          this.showDropdown();
          this._canSearch = false;
          var directionInt = keyCode === KeyCodeMap.DOWN_KEY || keyCode === KeyCodeMap.PAGE_DOWN_KEY ? 1 : -1;
          var skipKey = event2.metaKey || keyCode === KeyCodeMap.PAGE_DOWN_KEY || keyCode === KeyCodeMap.PAGE_UP_KEY;
          var nextEl = void 0;
          if (skipKey) {
            if (directionInt > 0) {
              nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
            } else {
              nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
            }
          } else {
            var currentEl = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
            if (currentEl) {
              nextEl = getAdjacentEl(currentEl, selectableChoiceIdentifier, directionInt);
            } else {
              nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
            }
          }
          if (nextEl) {
            if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) {
              this.choiceList.scrollToChildElement(nextEl, directionInt);
            }
            this._highlightChoice(nextEl);
          }
          event2.preventDefault();
        }
      };
      Choices2.prototype._onDeleteKey = function(event2, items2, hasFocusedInput) {
        if (!this._isSelectOneElement && !event2.target.value && hasFocusedInput) {
          this._handleBackspace(items2);
          event2.preventDefault();
        }
      };
      Choices2.prototype._onTouchMove = function() {
        if (this._wasTap) {
          this._wasTap = false;
        }
      };
      Choices2.prototype._onTouchEnd = function(event2) {
        var target = (event2 || event2.touches[0]).target;
        var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
        if (touchWasWithinContainer) {
          var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
          if (containerWasExactTarget) {
            if (this._isTextElement) {
              this.input.focus();
            } else if (this._isSelectMultipleElement) {
              this.showDropdown();
            }
          }
          event2.stopPropagation();
        }
        this._wasTap = true;
      };
      Choices2.prototype._onMouseDown = function(event2) {
        var target = event2.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        if (IS_IE11 && this.choiceList.element.contains(target)) {
          var firstChoice = this.choiceList.element.firstElementChild;
          this._isScrollingOnIe = this._direction === "ltr" ? event2.offsetX >= firstChoice.offsetWidth : event2.offsetX < firstChoice.offsetLeft;
        }
        if (target === this.input.element) {
          return;
        }
        var item = target.closest("[data-button],[data-item],[data-choice]");
        if (item instanceof HTMLElement) {
          if ("button" in item.dataset) {
            this._handleButtonAction(item);
          } else if ("item" in item.dataset) {
            this._handleItemAction(item, event2.shiftKey);
          } else if ("choice" in item.dataset) {
            this._handleChoiceAction(item);
          }
        }
        event2.preventDefault();
      };
      Choices2.prototype._onMouseOver = function(_a) {
        var target = _a.target;
        if (target instanceof HTMLElement && "choice" in target.dataset) {
          this._highlightChoice(target);
        }
      };
      Choices2.prototype._onClick = function(_a) {
        var target = _a.target;
        var containerOuter = this.containerOuter;
        var clickWasWithinContainer = containerOuter.element.contains(target);
        if (clickWasWithinContainer) {
          if (!this.dropdown.isActive && !containerOuter.isDisabled) {
            if (this._isTextElement) {
              if (document.activeElement !== this.input.element) {
                this.input.focus();
              }
            } else {
              this.showDropdown();
              containerOuter.element.focus();
            }
          } else if (this._isSelectOneElement && target !== this.input.element && !this.dropdown.element.contains(target)) {
            this.hideDropdown();
          }
        } else {
          containerOuter.removeFocusState();
          this.hideDropdown(true);
          this.unhighlightAll();
        }
      };
      Choices2.prototype._onFocus = function(_a) {
        var target = _a.target;
        var containerOuter = this.containerOuter;
        var focusWasWithinContainer = target && containerOuter.element.contains(target);
        if (!focusWasWithinContainer) {
          return;
        }
        var targetIsInput = target === this.input.element;
        if (this._isTextElement) {
          if (targetIsInput) {
            containerOuter.addFocusState();
          }
        } else if (this._isSelectMultipleElement) {
          if (targetIsInput) {
            this.showDropdown(true);
            containerOuter.addFocusState();
          }
        } else {
          containerOuter.addFocusState();
          if (targetIsInput) {
            this.showDropdown(true);
          }
        }
      };
      Choices2.prototype._onBlur = function(_a) {
        var target = _a.target;
        var containerOuter = this.containerOuter;
        var blurWasWithinContainer = target && containerOuter.element.contains(target);
        if (blurWasWithinContainer && !this._isScrollingOnIe) {
          if (target === this.input.element) {
            containerOuter.removeFocusState();
            this.hideDropdown(true);
            if (this._isTextElement || this._isSelectMultipleElement) {
              this.unhighlightAll();
            }
          } else if (target === this.containerOuter.element) {
            containerOuter.removeFocusState();
            if (!this._canSearch) {
              this.hideDropdown(true);
            }
          }
        } else {
          this._isScrollingOnIe = false;
          this.input.element.focus();
        }
      };
      Choices2.prototype._onFormReset = function() {
        var _this = this;
        this._store.withTxn(function() {
          _this.clearInput();
          _this.hideDropdown();
          _this.refresh(false, false, true);
          if (_this._initialItems.length) {
            _this.setChoiceByValue(_this._initialItems);
          }
        });
      };
      Choices2.prototype._highlightChoice = function(el) {
        if (el === void 0) {
          el = null;
        }
        var choices2 = Array.from(this.dropdown.element.querySelectorAll(selectableChoiceIdentifier));
        if (!choices2.length) {
          return;
        }
        var passedEl = el;
        var highlightedState = this.config.classNames.highlightedState;
        var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
        highlightedChoices.forEach(function(choice) {
          removeClassesFromElement(choice, highlightedState);
          choice.setAttribute("aria-selected", "false");
        });
        if (passedEl) {
          this._highlightPosition = choices2.indexOf(passedEl);
        } else {
          if (choices2.length > this._highlightPosition) {
            passedEl = choices2[this._highlightPosition];
          } else {
            passedEl = choices2[choices2.length - 1];
          }
          if (!passedEl) {
            passedEl = choices2[0];
          }
        }
        addClassesToElement(passedEl, highlightedState);
        passedEl.setAttribute("aria-selected", "true");
        this.passedElement.triggerEvent(EventType.highlightChoice, {
          el: passedEl
        });
        if (this.dropdown.isActive) {
          this.input.setActiveDescendant(passedEl.id);
          this.containerOuter.setActiveDescendant(passedEl.id);
        }
      };
      Choices2.prototype._addItem = function(item, withEvents, userTriggered) {
        if (withEvents === void 0) {
          withEvents = true;
        }
        if (userTriggered === void 0) {
          userTriggered = false;
        }
        if (!item.id) {
          throw new TypeError("item.id must be set before _addItem is called for a choice/item");
        }
        if (this.config.singleModeForMultiSelect || this._isSelectOneElement) {
          this.removeActiveItems(item.id);
        }
        this._store.dispatch(addItem(item));
        if (withEvents) {
          this.passedElement.triggerEvent(EventType.addItem, this._getChoiceForOutput(item));
          if (userTriggered) {
            this.passedElement.triggerEvent(EventType.choice, this._getChoiceForOutput(item));
          }
        }
      };
      Choices2.prototype._removeItem = function(item) {
        if (!item.id) {
          return;
        }
        this._store.dispatch(removeItem$1(item));
        var notice = this._notice;
        if (notice && notice.type === NoticeTypes.noChoices) {
          this._clearNotice();
        }
        this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(item));
      };
      Choices2.prototype._addChoice = function(choice, withEvents, userTriggered) {
        if (withEvents === void 0) {
          withEvents = true;
        }
        if (userTriggered === void 0) {
          userTriggered = false;
        }
        if (choice.id) {
          throw new TypeError("Can not re-add a choice which has already been added");
        }
        var config = this.config;
        if (!config.duplicateItemsAllowed && this._store.choices.find(function(c) {
          return config.valueComparer(c.value, choice.value);
        })) {
          return;
        }
        this._lastAddedChoiceId++;
        choice.id = this._lastAddedChoiceId;
        choice.elementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choice.id);
        var prependValue = config.prependValue, appendValue = config.appendValue;
        if (prependValue) {
          choice.value = prependValue + choice.value;
        }
        if (appendValue) {
          choice.value += appendValue.toString();
        }
        if ((prependValue || appendValue) && choice.element) {
          choice.element.value = choice.value;
        }
        this._clearNotice();
        this._store.dispatch(addChoice(choice));
        if (choice.selected) {
          this._addItem(choice, withEvents, userTriggered);
        }
      };
      Choices2.prototype._addGroup = function(group, withEvents) {
        var _this = this;
        if (withEvents === void 0) {
          withEvents = true;
        }
        if (group.id) {
          throw new TypeError("Can not re-add a group which has already been added");
        }
        this._store.dispatch(addGroup(group));
        if (!group.choices) {
          return;
        }
        this._lastAddedGroupId++;
        group.id = this._lastAddedGroupId;
        group.choices.forEach(function(item) {
          item.group = group;
          if (group.disabled) {
            item.disabled = true;
          }
          _this._addChoice(item, withEvents);
        });
      };
      Choices2.prototype._createTemplates = function() {
        var _this = this;
        var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
        var userTemplates = {};
        if (typeof callbackOnCreateTemplates === "function") {
          userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate, getClassNames);
        }
        var templating = {};
        Object.keys(this._templates).forEach(function(name) {
          if (name in userTemplates) {
            templating[name] = userTemplates[name].bind(_this);
          } else {
            templating[name] = _this._templates[name].bind(_this);
          }
        });
        this._templates = templating;
      };
      Choices2.prototype._createElements = function() {
        var templating = this._templates;
        var _a = this, config = _a.config, isSelectOneElement = _a._isSelectOneElement;
        var position = config.position, classNames = config.classNames;
        var elementType = this._elementType;
        this.containerOuter = new Container({
          element: templating.containerOuter(config, this._direction, this._isSelectElement, isSelectOneElement, config.searchEnabled, elementType, config.labelId),
          classNames,
          type: elementType,
          position
        });
        this.containerInner = new Container({
          element: templating.containerInner(config),
          classNames,
          type: elementType,
          position
        });
        this.input = new Input({
          element: templating.input(config, this._placeholderValue),
          classNames,
          type: elementType,
          preventPaste: !config.paste
        });
        this.choiceList = new List({
          element: templating.choiceList(config, isSelectOneElement)
        });
        this.itemList = new List({
          element: templating.itemList(config, isSelectOneElement)
        });
        this.dropdown = new Dropdown({
          element: templating.dropdown(config),
          classNames,
          type: elementType
        });
      };
      Choices2.prototype._createStructure = function() {
        var _a = this, containerInner = _a.containerInner, containerOuter = _a.containerOuter, passedElement = _a.passedElement;
        var dropdownElement = this.dropdown.element;
        passedElement.conceal();
        containerInner.wrap(passedElement.element);
        containerOuter.wrap(containerInner.element);
        if (this._isSelectOneElement) {
          this.input.placeholder = this.config.searchPlaceholderValue || "";
        } else {
          if (this._placeholderValue) {
            this.input.placeholder = this._placeholderValue;
          }
          this.input.setWidth();
        }
        containerOuter.element.appendChild(containerInner.element);
        containerOuter.element.appendChild(dropdownElement);
        containerInner.element.appendChild(this.itemList.element);
        dropdownElement.appendChild(this.choiceList.element);
        if (!this._isSelectOneElement) {
          containerInner.element.appendChild(this.input.element);
        } else if (this.config.searchEnabled) {
          dropdownElement.insertBefore(this.input.element, dropdownElement.firstChild);
        }
        this._highlightPosition = 0;
        this._isSearching = false;
      };
      Choices2.prototype._initStore = function() {
        var _this = this;
        this._store.subscribe(this._render).withTxn(function() {
          _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
        });
        if (!this._store.choices.length || this._isSelectOneElement && this._hasNonChoicePlaceholder) {
          this._render();
        }
      };
      Choices2.prototype._addPredefinedChoices = function(choices2, selectFirstOption, withEvents) {
        var _this = this;
        if (selectFirstOption === void 0) {
          selectFirstOption = false;
        }
        if (withEvents === void 0) {
          withEvents = true;
        }
        if (selectFirstOption) {
          var noSelectedChoices = choices2.findIndex(function(choice) {
            return choice.selected;
          }) === -1;
          if (noSelectedChoices) {
            choices2.some(function(choice) {
              if (choice.disabled || "choices" in choice) {
                return false;
              }
              choice.selected = true;
              return true;
            });
          }
        }
        choices2.forEach(function(item) {
          if ("choices" in item) {
            if (_this._isSelectElement) {
              _this._addGroup(item, withEvents);
            }
          } else {
            _this._addChoice(item, withEvents);
          }
        });
      };
      Choices2.prototype._findAndSelectChoiceByValue = function(value, userTriggered) {
        var _this = this;
        if (userTriggered === void 0) {
          userTriggered = false;
        }
        var foundChoice = this._store.choices.find(function(choice) {
          return _this.config.valueComparer(choice.value, value);
        });
        if (foundChoice && !foundChoice.disabled && !foundChoice.selected) {
          this._addItem(foundChoice, true, userTriggered);
          return true;
        }
        return false;
      };
      Choices2.prototype._generatePlaceholderValue = function() {
        var config = this.config;
        if (!config.placeholder) {
          return null;
        }
        if (this._hasNonChoicePlaceholder) {
          return config.placeholderValue;
        }
        if (this._isSelectElement) {
          var placeholderOption = this.passedElement.placeholderOption;
          return placeholderOption ? placeholderOption.text : null;
        }
        return null;
      };
      Choices2.prototype._warnChoicesInitFailed = function(caller) {
        if (this.config.silent) {
          return;
        }
        if (!this.initialised) {
          throw new TypeError("".concat(caller, " called on a non-initialised instance of Choices"));
        } else if (!this.initialisedOK) {
          throw new TypeError("".concat(caller, " called for an element which has multiple instances of Choices initialised on it"));
        }
      };
      Choices2.version = "11.1.0";
      return Choices2;
    }()
  );

  // src/js/main.js
  document.addEventListener("DOMContentLoaded", () => {
    const services = document.querySelector(".services");
    const certificatesSlider = document.querySelector(".certificates__slider");
    const reviewsSlider = document.querySelector(".reviews__slider");
    const questionsItems = document.querySelector(".questions__items");
    const footerBtnScrollUp = document.querySelector(".footer__scroll-up");
    const serviceCertificatesSlider = document.querySelector(
      ".service-certificates__slider"
    );
    const reviewsFormFile = document.getElementById("reviews-form-file");
    const reviewsFormServiceChoices = document.querySelector(
      ".reviews-form__service-choices"
    );
    if (services) {
      services.addEventListener("click", (event2) => {
        const target = event2.target;
        if (target.closest(".services__elem-title")) {
          const titleElem = target.closest(".services__elem-title");
          const parent = target.closest(".services__elem");
          const elemDropdown = parent.querySelector(".services__elem-drop");
          elemDropdown.classList.toggle("active");
          titleElem.classList.toggle("active");
        }
      });
    }
    if (certificatesSlider) {
      new Swiper(certificatesSlider, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 24,
        navigation: {
          nextEl: ".certificates__slider-next",
          prevEl: ".certificates__slider-prev"
        }
      });
    }
    if (reviewsSlider) {
      new Swiper(reviewsSlider, {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 24,
        navigation: {
          nextEl: ".reviews__btn-next",
          prevEl: ".reviews__btn-prev"
        }
      });
    }
    if (questionsItems) {
      questionsItems.addEventListener("click", (event2) => {
        const target = event2.target;
        if (target.closest(".questions__item-title")) {
          const parent = target.closest(".questions__item");
          const btnElem = parent.querySelector(".questions__item-btn");
          const elemDropdown = parent.querySelector(".questions__item-drop");
          elemDropdown.classList.toggle("active");
          btnElem.classList.toggle("active");
        }
      });
    }
    if (footerBtnScrollUp) {
      footerBtnScrollUp.addEventListener("click", function() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
    if (serviceCertificatesSlider) {
      new Swiper(serviceCertificatesSlider, {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 24,
        modules: [Navigation],
        navigation: {
          nextEl: ".service-certificates__btn-next",
          prevEl: ".service-certificates__btn-prev"
        }
      });
    }
    if (reviewsFormFile) {
      const previewContainer = document.querySelector(
        ".reviews-form__file-preview"
      );
      reviewsFormFile.addEventListener("change", (event2) => {
        const files = event2.target.files;
        previewContainer.innerHTML = "";
        Array.from(files).forEach((file) => {
          if (!file.type.startsWith("image/")) return;
          const reader = new FileReader();
          reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "120px";
            img.style.marginRight = "10px";
            img.style.marginBottom = "10px";
            img.style.borderRadius = "8px";
            img.alt = file.name;
            previewContainer.appendChild(img);
          };
          reader.readAsDataURL(file);
        });
      });
    }
    if (reviewsFormServiceChoices) {
      const choices2 = new Choices(reviewsFormServiceChoices, {
        searchEnabled: false,
        itemSelectText: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430",
        shouldSort: false,
        placeholder: true,
        placeholderValue: "\u0423\u0441\u043B\u0443\u0433\u0430, \u043E \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0432\u044B \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0435 \u043E\u0442\u0437\u044B\u0432"
      });
    }
    const reviewsFormStarList = document.querySelectorAll(".reviews-form__star");
    if (reviewsFormStarList) {
      const radios = document.querySelectorAll('input[name="rating"]');
      reviewsFormStarList.forEach((star, index) => {
        star.addEventListener("click", () => {
          radios[index].checked = true;
          reviewsFormStarList.forEach((l, i) => l.classList.toggle("reviews-form__star--filled", i <= index));
        });
      });
    }
  });
})();
/*! Bundled license information:

choices.js/public/assets/scripts/choices.mjs:
  (*! choices.js v11.1.0 | © 2025 Josh Johnson | https://github.com/jshjohnson/Choices#readme *)
*/
//# sourceMappingURL=main.js.map
