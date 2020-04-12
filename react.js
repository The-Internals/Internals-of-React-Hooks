/** @license React vundefined
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global = global || self), factory((global.React = {})));
})(this, function (exports) {
  "use strict";

  // TODO: this is special because it gets imported during build.
  var ReactVersion = "16.13.1";

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  let REACT_ELEMENT_TYPE = 0xeac7;
  let REACT_PORTAL_TYPE = 0xeaca;
  exports.Fragment = 0xeacb;
  exports.StrictMode = 0xeacc;
  exports.Profiler = 0xead2;
  let REACT_PROVIDER_TYPE = 0xeacd;
  let REACT_CONTEXT_TYPE = 0xeace;
  let REACT_FORWARD_REF_TYPE = 0xead0;
  exports.Suspense = 0xead1;
  exports.SuspenseList = 0xead8;
  let REACT_MEMO_TYPE = 0xead3;
  let REACT_LAZY_TYPE = 0xead4;
  let REACT_BLOCK_TYPE = 0xead9;

  if (typeof Symbol === "function" && Symbol.for) {
    const symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor("react.element");
    REACT_PORTAL_TYPE = symbolFor("react.portal");
    exports.Fragment = symbolFor("react.fragment");
    exports.StrictMode = symbolFor("react.strict_mode");
    exports.Profiler = symbolFor("react.profiler");
    REACT_PROVIDER_TYPE = symbolFor("react.provider");
    REACT_CONTEXT_TYPE = symbolFor("react.context");
    REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
    exports.Suspense = symbolFor("react.suspense");
    exports.SuspenseList = symbolFor("react.suspense_list");
    REACT_MEMO_TYPE = symbolFor("react.memo");
    REACT_LAZY_TYPE = symbolFor("react.lazy");
    REACT_BLOCK_TYPE = symbolFor("react.block");
  }

  const MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  const FAUX_ITERATOR_SYMBOL = "@@iterator";
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== "object") {
      return null;
    }

    const maybeIterator =
      (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
      maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === "function") {
      return maybeIterator;
    }

    return null;
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty;

  const _assign = function (to, from) {
    for (const key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  };

  var _assign$1 =
    Object.assign ||
    function (target, sources) {
      if (target == null) {
        throw new TypeError("Object.assign target cannot be null or undefined");
      }

      const to = Object(target);

      for (let nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
        const nextSource = arguments[nextIndex];

        if (nextSource != null) {
          _assign(to, Object(nextSource));
        }
      }

      return to;
    };

  // Do not require this module directly! Use normal `invariant` calls with
  // template literal strings. The messages will be replaced with error codes
  // during build.
  function formatProdErrorMessage(code) {
    let url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;

    for (let i = 1; i < arguments.length; i++) {
      url += "&args[]=" + encodeURIComponent(arguments[i]);
    }

    return (
      "Minified React error #" +
      code +
      "; visit " +
      url +
      " for the full message or " +
      "use the non-minified dev environment for full errors and additional " +
      "helpful warnings."
    );
  }

  /**
   * This is the abstract API for an update queue.
   */

  const ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function (publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function (publicInstance, callback, callerName) {},

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function (
      publicInstance,
      completeState,
      callback,
      callerName
    ) {},

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function (
      publicInstance,
      partialState,
      callback,
      callerName
    ) {},
  };

  const emptyObject = {};
  /**
   * Base class helpers for the updating state of a component.
   */

  function Component(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
    // renderer.

    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */

  Component.prototype.setState = function (partialState, callback) {
    if (
      !(
        typeof partialState === "object" ||
        typeof partialState === "function" ||
        partialState == null
      )
    ) {
      {
        throw Error(formatProdErrorMessage(85));
      }
    }

    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */

  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };

  function ComponentDummy() {}

  ComponentDummy.prototype = Component.prototype;
  /**
   * Convenience component with default shallow equality check for sCU.
   */

  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }

  const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
  pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  _assign$1(pureComponentPrototype, Component.prototype);

  pureComponentPrototype.isPureReactComponent = true;

  // an immutable object with a single mutable value
  function createRef() {
    const refObject = {
      current: null,
    };

    return refObject;
  }

  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */
  const ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null,
  };

  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  const RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true,
  };

  function hasValidRef(config) {
    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    return config.key !== undefined;
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */

  const ReactElement = function (type, key, ref, self, source, owner, props) {
    const element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner,
    };

    return element;
  };
  /**
   * Create and return a new ReactElement of the given type.
   * See https://reactjs.org/docs/react-api.html#createelement
   */

  function createElement(type, config, children) {
    let propName; // Reserved names are extracted

    const props = {};
    let key = null;
    let ref = null;
    let self = null;
    let source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
      }

      if (hasValidKey(config)) {
        key = "" + config.key;
      }

      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

      for (propName in config) {
        if (
          hasOwnProperty$1.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
          props[propName] = config[propName];
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.

    const childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      const childArray = Array(childrenLength);

      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      props.children = childArray;
    } // Resolve default props

    if (type && type.defaultProps) {
      const defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props
    );
  }
  /**
   * Return a function that produces ReactElements of a given type.
   * See https://reactjs.org/docs/react-api.html#createfactory
   */

  function createFactory(type) {
    const factory = createElement.bind(null, type); // Expose the type on the factory and the prototype so that it can be
    // easily accessed on elements. E.g. `<Foo />.type === Foo`.
    // This should not be named `constructor` since this may not be the function
    // that created the element, and it may not even be a constructor.
    // Legacy hook: remove it

    factory.type = type;
    return factory;
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    const newElement = ReactElement(
      oldElement.type,
      newKey,
      oldElement.ref,
      oldElement._self,
      oldElement._source,
      oldElement._owner,
      oldElement.props
    );
    return newElement;
  }
  /**
   * Clone and return a new ReactElement using element as the starting point.
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */

  function cloneElement(element, config, children) {
    if (!!(element === null || element === undefined)) {
      {
        throw Error(formatProdErrorMessage(267, element));
      }
    }

    let propName; // Original props are copied

    const props = _assign$1({}, element.props); // Reserved names are extracted

    let key = element.key;
    let ref = element.ref; // Self is preserved since the owner is preserved.

    const self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
    // transpiler, and the original source is probably a better indicator of the
    // true owner.

    const source = element._source; // Owner will be preserved, unless ref is overridden

    let owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }

      if (hasValidKey(config)) {
        key = "" + config.key;
      } // Remaining properties override existing props

      let defaultProps;

      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }

      for (propName in config) {
        if (
          hasOwnProperty$1.call(config, propName) &&
          !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.

    const childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      const childArray = Array(childrenLength);

      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */

  function isValidElement(object) {
    return (
      typeof object === "object" &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE
    );
  }

  const SEPARATOR = ".";
  const SUBSEPARATOR = ":";
  /**
   * Escape and wrap key so it is safe to use as a reactid
   *
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */

  function escape(key) {
    const escapeRegex = /[=:]/g;
    const escaperLookup = {
      "=": "=0",
      ":": "=2",
    };
    const escapedString = key.replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });
    return "$" + escapedString;
  }
  const userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return text.replace(userProvidedKeyEscapeRegex, "$&/");
  }
  /**
   * Generate a key string that identifies a element within a set.
   *
   * @param {*} element A element that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */

  function getElementKey(element, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (
      typeof element === "object" &&
      element !== null &&
      element.key != null
    ) {
      // Explicit key
      return escape("" + element.key);
    } // Implicit key determined by the index in the set

    return index.toString(36);
  }

  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    const type = typeof children;

    if (type === "undefined" || type === "boolean") {
      // All of the above are perceived as null.
      children = null;
    }

    let invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case "string":
        case "number":
          invokeCallback = true;
          break;

        case "object":
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }

    if (invokeCallback) {
      const child = children;
      let mappedChild = callback(child); // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows:

      const childKey =
        nameSoFar === "" ? SEPARATOR + getElementKey(child, 0) : nameSoFar;

      if (Array.isArray(mappedChild)) {
        let escapedChildKey = "";

        if (childKey != null) {
          escapedChildKey = escapeUserProvidedKey(childKey) + "/";
        }

        mapIntoArray(mappedChild, array, escapedChildKey, "", (c) => c);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(
            mappedChild, // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (mappedChild.key && (!child || child.key !== mappedChild.key) // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                ? escapeUserProvidedKey("" + mappedChild.key) + "/"
                : "") +
              childKey
          );
        }

        array.push(mappedChild);
      }

      return 1;
    }

    let child;
    let nextName;
    let subtreeCount = 0; // Count of children found in the current subtree.

    const nextNamePrefix =
      nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getElementKey(child, i);
        subtreeCount += mapIntoArray(
          child,
          array,
          escapedPrefix,
          nextName,
          callback
        );
      }
    } else {
      const iteratorFn = getIteratorFn(children);

      if (typeof iteratorFn === "function") {
        const iterableChildren = children;

        const iterator = iteratorFn.call(iterableChildren);
        let step;
        let ii = 0;

        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getElementKey(child, ii++);
          subtreeCount += mapIntoArray(
            child,
            array,
            escapedPrefix,
            nextName,
            callback
          );
        }
      } else if (type === "object") {
        let addendum = "";

        const childrenString = "" + children;

        {
          {
            throw Error(
              formatProdErrorMessage(
                31,
                childrenString === "[object Object]"
                  ? "object with keys {" +
                      Object.keys(children).join(", ") +
                      "}"
                  : childrenString,
                addendum
              )
            );
          }
        }
      }
    }

    return subtreeCount;
  }

  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }

    const result = [];
    let count = 0;
    mapIntoArray(children, result, "", "", function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */

  function countChildren(children) {
    let n = 0;
    mapChildren(children, () => {
      n++; // Don't return anything
    });
    return n;
  }

  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    mapChildren(
      children,
      function () {
        forEachFunc.apply(this, arguments); // Don't return anything.
      },
      forEachContext
    );
  }
  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */

  function toArray(children) {
    return mapChildren(children, (child) => child) || [];
  }
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */

  function onlyChild(children) {
    if (!isValidElement(children)) {
      {
        throw Error(formatProdErrorMessage(143));
      }
    }

    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    }

    const context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null,
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context,
    };

    {
      context.Consumer = context;
    }

    return context;
  }

  const Uninitialized = -1;
  const Pending = 0;
  const Resolved = 1;
  const Rejected = 2;

  function lazyInitializer(payload) {
    if (payload._status === Uninitialized) {
      const ctor = payload._result;
      const thenable = ctor(); // Transition to the next state.

      const pending = payload;
      pending._status = Pending;
      pending._result = thenable;
      thenable.then(
        (moduleObject) => {
          if (payload._status === Pending) {
            const defaultExport = moduleObject.default;

            const resolved = payload;
            resolved._status = Resolved;
            resolved._result = defaultExport;
          }
        },
        (error) => {
          if (payload._status === Pending) {
            // Transition to the next state.
            const rejected = payload;
            rejected._status = Rejected;
            rejected._result = error;
          }
        }
      );
    }

    if (payload._status === Resolved) {
      return payload._result;
    } else {
      throw payload._result;
    }
  }

  function lazy(ctor) {
    const payload = {
      // We use these fields to store the result.
      _status: -1,
      _result: ctor,
    };
    const lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _payload: payload,
      _init: lazyInitializer,
    };

    return lazyType;
  }

  function forwardRef(render) {
    const elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render,
    };

    return elementType;
  }

  function memo(type, compare) {
    const elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type,
      compare: compare === undefined ? null : compare,
    };

    return elementType;
  }

  function lazyInitializer$1(payload) {
    return {
      $$typeof: REACT_BLOCK_TYPE,
      _data: payload.load.apply(null, payload.args),
      _render: payload.render,
    };
  }

  function block(render, load) {
    if (load === undefined) {
      return function () {
        const blockComponent = {
          $$typeof: REACT_BLOCK_TYPE,
          _data: undefined,
          // $FlowFixMe: Data must be void in this scenario.
          _render: render,
        }; // $FlowFixMe: Upstream BlockComponent to Flow as a valid Node.

        return blockComponent;
      };
    } // Trick to let Flow refine this.

    const loadFn = load;
    return function () {
      const args = arguments;
      const payload = {
        load: loadFn,
        args: args,
        render: render,
      };
      const lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: payload,
        _init: lazyInitializer$1,
      }; // $FlowFixMe: Upstream BlockComponent to Flow as a valid Node.

      return lazyType;
    };
  }

  /**
   * Keeps track of the current dispatcher.
   */
  const ReactCurrentDispatcher = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null,
  };

  function resolveDispatcher() {
    const dispatcher = ReactCurrentDispatcher.current;

    if (!(dispatcher !== null)) {
      {
        throw Error(formatProdErrorMessage(321));
      }
    }

    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    const dispatcher = resolveDispatcher();

    return dispatcher.useContext(Context, unstable_observedBits);
  }
  function useState(initialState) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }
  function useReducer(reducer, initialArg, init) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }
  function useRef(initialValue) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }
  function useEffect(create, deps) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }
  function useLayoutEffect(create, deps) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }
  function useCallback(callback, deps) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }
  function useMemo(create, deps) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }
  function useImperativeHandle(ref, create, deps) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }
  function useDebugValue(value, formatterFn) {}
  function useTransition(config) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useTransition(config);
  }
  function useDeferredValue(value, config) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useDeferredValue(value, config);
  }
  function useOpaqueIdentifier() {
    const dispatcher = resolveDispatcher();
    return dispatcher.useOpaqueIdentifier();
  }
  function useMutableSource(source, getSnapshot, subscribe) {
    const dispatcher = resolveDispatcher();
    return dispatcher.useMutableSource(source, getSnapshot, subscribe);
  }

  /**
   * Keeps track of the current batch's configuration such as how long an update
   * should suspend for if it needs to.
   */
  const ReactCurrentBatchConfig = {
    suspense: null,
  };

  function withSuspenseConfig(scope, config) {
    const previousConfig = ReactCurrentBatchConfig.suspense;
    ReactCurrentBatchConfig.suspense = config === undefined ? null : config;

    try {
      scope();
    } finally {
      ReactCurrentBatchConfig.suspense = previousConfig;
    }
  }

  function createMutableSource(source, getVersion) {
    const mutableSource = {
      _getVersion: getVersion,
      _source: source,
      _workInProgressVersionPrimary: null,
      _workInProgressVersionSecondary: null,
    };

    return mutableSource;
  }

  const enableSchedulerDebugging = false;
  const enableProfiling = false;

  let requestHostCallback;
  let requestHostTimeout;
  let cancelHostTimeout;
  let shouldYieldToHost;
  let requestPaint;
  let getCurrentTime;
  let forceFrameRate;

  if (
    // If Scheduler runs in a non-DOM environment, it falls back to a naive
    // implementation using setTimeout.
    typeof window === "undefined" || // Check if MessageChannel is supported, too.
    typeof MessageChannel !== "function"
  ) {
    // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
    // fallback to a naive implementation.
    let _callback = null;
    let _timeoutID = null;

    const _flushCallback = function () {
      if (_callback !== null) {
        try {
          const currentTime = getCurrentTime();
          const hasRemainingTime = true;

          _callback(hasRemainingTime, currentTime);

          _callback = null;
        } catch (e) {
          setTimeout(_flushCallback, 0);
          throw e;
        }
      }
    };

    const initialTime = Date.now();

    getCurrentTime = function () {
      return Date.now() - initialTime;
    };

    requestHostCallback = function (cb) {
      if (_callback !== null) {
        // Protect against re-entrancy.
        setTimeout(requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0);
      }
    };

    requestHostTimeout = function (cb, ms) {
      _timeoutID = setTimeout(cb, ms);
    };

    cancelHostTimeout = function () {
      clearTimeout(_timeoutID);
    };

    shouldYieldToHost = function () {
      return false;
    };

    requestPaint = forceFrameRate = function () {};
  } else {
    // Capture local references to native APIs, in case a polyfill overrides them.
    const performance = window.performance;
    const Date = window.Date;
    const setTimeout = window.setTimeout;
    const clearTimeout = window.clearTimeout;

    if (typeof console !== "undefined") {
      // TODO: Scheduler no longer requires these methods to be polyfilled. But
      // maybe we want to continue warning if they don't exist, to preserve the
      // option to rely on it in the future?
      const requestAnimationFrame = window.requestAnimationFrame;
      const cancelAnimationFrame = window.cancelAnimationFrame; // TODO: Remove fb.me link

      if (typeof requestAnimationFrame !== "function") {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "This browser doesn't support requestAnimationFrame. " +
            "Make sure that you load a " +
            "polyfill in older browsers. https://fb.me/react-polyfills"
        );
      }

      if (typeof cancelAnimationFrame !== "function") {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "This browser doesn't support cancelAnimationFrame. " +
            "Make sure that you load a " +
            "polyfill in older browsers. https://fb.me/react-polyfills"
        );
      }
    }

    if (
      typeof performance === "object" &&
      typeof performance.now === "function"
    ) {
      getCurrentTime = () => performance.now();
    } else {
      const initialTime = Date.now();

      getCurrentTime = () => Date.now() - initialTime;
    }

    let isMessageLoopRunning = false;
    let scheduledHostCallback = null;
    let taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
    // thread, like user events. By default, it yields multiple times per frame.
    // It does not attempt to align with frame boundaries, since most tasks don't
    // need to be frame aligned; for those that do, use requestAnimationFrame.

    let yieldInterval = 5;
    let deadline = 0; // TODO: Make this configurable

    {
      // `isInputPending` is not available. Since we have no way of knowing if
      // there's pending input, always yield at the end of the frame.
      shouldYieldToHost = function () {
        return getCurrentTime() >= deadline;
      }; // Since we yield every frame regardless, `requestPaint` has no effect.

      requestPaint = function () {};
    }

    forceFrameRate = function (fps) {
      if (fps < 0 || fps > 125) {
        // Using console['error'] to evade Babel and ESLint
        console["error"](
          "forceFrameRate takes a positive int between 0 and 125, " +
            "forcing framerates higher than 125 fps is not unsupported"
        );
        return;
      }

      if (fps > 0) {
        yieldInterval = Math.floor(1000 / fps);
      } else {
        // reset the framerate
        yieldInterval = 5;
      }
    };

    const performWorkUntilDeadline = () => {
      if (scheduledHostCallback !== null) {
        const currentTime = getCurrentTime(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
        // cycle. This means there's always time remaining at the beginning of
        // the message event.

        deadline = currentTime + yieldInterval;
        const hasTimeRemaining = true;

        try {
          const hasMoreWork = scheduledHostCallback(
            hasTimeRemaining,
            currentTime
          );

          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            // If there's more work, schedule the next message event at the end
            // of the preceding one.
            port.postMessage(null);
          }
        } catch (error) {
          // If a scheduler task throws, exit the current browser task so the
          // error can be observed.
          port.postMessage(null);
          throw error;
        }
      } else {
        isMessageLoopRunning = false;
      } // Yielding to the browser will give it a chance to paint, so we can
    };

    const channel = new MessageChannel();
    const port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;

    requestHostCallback = function (callback) {
      scheduledHostCallback = callback;

      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    };

    requestHostTimeout = function (callback, ms) {
      taskTimeoutID = setTimeout(() => {
        callback(getCurrentTime());
      }, ms);
    };

    cancelHostTimeout = function () {
      clearTimeout(taskTimeoutID);
      taskTimeoutID = -1;
    };
  }

  function push(heap, node) {
    const index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }
  function peek(heap) {
    const first = heap[0];
    return first === undefined ? null : first;
  }
  function pop(heap) {
    const first = heap[0];

    if (first !== undefined) {
      const last = heap.pop();

      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }

      return first;
    } else {
      return null;
    }
  }

  function siftUp(heap, node, i) {
    let index = i;

    while (true) {
      const parentIndex = (index - 1) >>> 1;
      const parent = heap[parentIndex];

      if (parent !== undefined && compare(parent, node) > 0) {
        // The parent is larger. Swap positions.
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        // The parent is smaller. Exit.
        return;
      }
    }
  }

  function siftDown(heap, node, i) {
    let index = i;
    const length = heap.length;

    while (index < length) {
      const leftIndex = (index + 1) * 2 - 1;
      const left = heap[leftIndex];
      const rightIndex = leftIndex + 1;
      const right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

      if (left !== undefined && compare(left, node) < 0) {
        if (right !== undefined && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // Neither child is smaller. Exit.
        return;
      }
    }
  }

  function compare(a, b) {
    // Compare sort index first, then task id.
    const diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  }

  // TODO: Use symbols?
  const ImmediatePriority = 1;
  const UserBlockingPriority = 2;
  const NormalPriority = 3;
  const LowPriority = 4;
  const IdlePriority = 5;

  function markTaskErrored(task, ms) {}

  /* eslint-disable no-var */
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111

  var maxSigned31BitInt = 1073741823; // Times out immediately

  var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

  var USER_BLOCKING_PRIORITY = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

  var IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap

  var taskQueue = [];
  var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

  var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
  var currentTask = null;
  var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;

  function advanceTimers(currentTime) {
    // Check for tasks that are no longer delayed and add them to the queue.
    let timer = peek(timerQueue);

    while (timer !== null) {
      if (timer.callback === null) {
        // Timer was cancelled.
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        // Timer fired. Transfer to the task queue.
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
      } else {
        // Remaining timers are pending.
        return;
      }

      timer = peek(timerQueue);
    }
  }

  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);

    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      } else {
        const firstTimer = peek(timerQueue);

        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }

  function flushWork(hasTimeRemaining, initialTime) {
    isHostCallbackScheduled = false;

    if (isHostTimeoutScheduled) {
      // We scheduled a timeout but it's no longer needed. Cancel it.
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }

    isPerformingWork = true;
    const previousPriorityLevel = currentPriorityLevel;

    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime);
        } catch (error) {
          if (currentTask !== null) {
            const currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }

          throw error;
        }
      } else {
        // No catch in prod codepath.
        return workLoop(hasTimeRemaining, initialTime);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
    }
  }

  function workLoop(hasTimeRemaining, initialTime) {
    let currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);

    while (currentTask !== null && !enableSchedulerDebugging) {
      if (
        currentTask.expirationTime > currentTime &&
        (!hasTimeRemaining || shouldYieldToHost())
      ) {
        // This currentTask hasn't expired, and we've reached the deadline.
        break;
      }

      const callback = currentTask.callback;

      if (callback !== null) {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        const didUserCallbackTimeout =
          currentTask.expirationTime <= currentTime;
        const continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();

        if (typeof continuationCallback === "function") {
          currentTask.callback = continuationCallback;
        } else {
          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }

        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }

      currentTask = peek(taskQueue);
    } // Return whether there's additional work

    if (currentTask !== null) {
      return true;
    } else {
      const firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }

      return false;
    }
  }

  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;

      default:
        priorityLevel = NormalPriority;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_next(eventHandler) {
    var priorityLevel;

    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        // Shift down to normal priority
        priorityLevel = NormalPriority;
        break;

      default:
        // Anything lower than normal priority should remain at the current level.
        priorityLevel = currentPriorityLevel;
        break;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;

      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }

  function timeoutForPriorityLevel(priorityLevel) {
    switch (priorityLevel) {
      case ImmediatePriority:
        return IMMEDIATE_PRIORITY_TIMEOUT;

      case UserBlockingPriority:
        return USER_BLOCKING_PRIORITY;

      case IdlePriority:
        return IDLE_PRIORITY;

      case LowPriority:
        return LOW_PRIORITY_TIMEOUT;

      case NormalPriority:
      default:
        return NORMAL_PRIORITY_TIMEOUT;
    }
  }

  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;
    var timeout;

    if (typeof options === "object" && options !== null) {
      var delay = options.delay;

      if (typeof delay === "number" && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }

      timeout =
        typeof options.timeout === "number"
          ? options.timeout
          : timeoutForPriorityLevel(priorityLevel);
    } else {
      timeout = timeoutForPriorityLevel(priorityLevel);
      startTime = currentTime;
    }

    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback,
      priorityLevel,
      startTime,
      expirationTime,
      sortIndex: -1,
    };

    if (startTime > currentTime) {
      // This is a delayed task.
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);

      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        // All tasks are delayed, and this is the task with the earliest delay.
        if (isHostTimeoutScheduled) {
          // Cancel an existing timeout.
          cancelHostTimeout();
        } else {
          isHostTimeoutScheduled = true;
        } // Schedule a timeout.

        requestHostTimeout(handleTimeout, startTime - currentTime);
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      // wait until the next time we yield.

      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      }
    }

    return newTask;
  }

  function unstable_pauseExecution() {}

  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  function unstable_getFirstCallbackNode() {
    return peek(taskQueue);
  }

  function unstable_cancelCallback(task) {
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)

    task.callback = null;
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }

  function unstable_shouldYield() {
    const currentTime = getCurrentTime();
    advanceTimers(currentTime);
    const firstTask = peek(taskQueue);
    return (
      (firstTask !== currentTask &&
        currentTask !== null &&
        firstTask !== null &&
        firstTask.callback !== null &&
        firstTask.startTime <= currentTime &&
        firstTask.expirationTime < currentTask.expirationTime) ||
      shouldYieldToHost()
    );
  }

  const unstable_requestPaint = requestPaint;
  const unstable_Profiling = null;

  var Scheduler = {
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    unstable_shouldYield: unstable_shouldYield,
    unstable_requestPaint: unstable_requestPaint,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
    get unstable_now() {
      return getCurrentTime;
    },
    get unstable_forceFrameRate() {
      return forceFrameRate;
    },
    unstable_Profiling: unstable_Profiling,
  };

  let threadIDCounter = 0; // Set of currently traced interactions.
  // Interactions "stack"–
  // Meaning that newly traced interactions are appended to the previously active set.
  // When an interaction goes out of scope, the previous set (if any) is restored.

  let interactionsRef = null; // Listener(s) to notify when interactions begin and end.

  let subscriberRef = null;
  function unstable_clear(callback) {
    {
      return callback();
    }
  }
  function unstable_getCurrent() {
    {
      return null;
    }
  }
  function unstable_getThreadID() {
    return ++threadIDCounter;
  }
  function unstable_trace(name, timestamp, callback) {
    {
      return callback();
    }
  }
  function unstable_wrap(callback) {
    {
      return callback;
    }
  }

  function unstable_subscribe(subscriber) {}
  function unstable_unsubscribe(subscriber) {}

  var SchedulerTracing = {
    __proto__: null,
    __interactionsRef: interactionsRef,
    __subscriberRef: subscriberRef,
    unstable_clear: unstable_clear,
    unstable_getCurrent: unstable_getCurrent,
    unstable_getThreadID: unstable_getThreadID,
    unstable_trace: unstable_trace,
    unstable_wrap: unstable_wrap,
    unstable_subscribe: unstable_subscribe,
    unstable_unsubscribe: unstable_unsubscribe,
  };

  /**
   * Used by act() to track whether you're inside an act() scope.
   */
  const IsSomeRendererActing = {
    current: false,
  };

  const ReactSharedInternals = {
    ReactCurrentDispatcher,
    ReactCurrentOwner,
    IsSomeRendererActing,
    ReactCurrentBatchConfig,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign$1,
  };
  // This avoids introducing a dependency on a new UMD global in a minor update,
  // Since that would be a breaking change (e.g. for all existing CodeSandboxes).
  // This re-export is only required for UMD bundles;
  // CJS bundles use the shared NPM package.

  _assign$1(ReactSharedInternals, {
    Scheduler,
    SchedulerTracing,
  });

  const createElement$1 = createElement;
  const cloneElement$1 = cloneElement;
  const createFactory$1 = createFactory;
  const Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray,
    only: onlyChild,
  };

  exports.Children = Children;
  exports.Component = Component;
  exports.PureComponent = PureComponent;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
  exports.block = block;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory$1;
  exports.createMutableSource = createMutableSource;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.unstable_useOpaqueIdentifier = useOpaqueIdentifier;
  exports.unstable_withSuspenseConfig = withSuspenseConfig;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useDeferredValue = useDeferredValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useMutableSource = useMutableSource;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.useTransition = useTransition;
  exports.version = ReactVersion;
});
