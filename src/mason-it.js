/**
 * @file Mason-it - CSS Grid to Masonry Layout Converter
 * @author Druhin13
 * @version 1.0.0
 * @license MIT
 * @description A lightweight, dependency-free library that transforms CSS Grid into Masonry layout
 * @copyright 2025 Druhin13
 */

/*!
 * Mason-it v1.0.0
 * ┌─┐┌─┐┌─┐┌─┐┌┐┌   ┬┌┬┐
 * │││├─┤└─┐│ ││││───│ │
 * └┴┘┴ ┴└─┘└─┘┘└┘   ┴ ┴
 *
 * CSS grid to masonry layout converter
 * Lightweight, dependency-free, and blazing fast!
 *
 * Copyright (c) 2025 Druhin13
 * https://github.com/Druhin13/mason-it
 * Released under the MIT License
 *
 */
(function () {
  // Mason-it requires modern browser APIs
  if (
    typeof window.getComputedStyle !== "function" ||
    typeof window.requestAnimationFrame !== "function"
  ) {
    console.warn(
      "┌───┐\n│o‿o│ Mason-it: Your browser lacks required modern features. Mason-it disabled.\n└───┘"
    );
    return;
  }

  /**
   * Full ASCII representation of the Mason mascot for multi-line display
   * @type {string}
   * @private
   */
  var masonItMascot = "┌───┐\n│o‿o│\n└───┘";

  /**
   * Inline ASCII representation of the Mason mascot for log messages
   * @type {string}
   * @private
   */
  var masonItMascotInline = "[■o‿o■]"; // Inline version for logs

  /**
   * Registry tracking all initialized Mason-it grids
   * @type {Map<Element, Object>}
   * @private
   */
  var MasonItRegistry = new Map();

  /**
   * Debug mode state flag
   * @type {boolean}
   * @private
   */
  var MasonItDebugMode = false;

  /**
   * Current library version
   * @type {string}
   * @private
   */
  var MasonItVersion = "1.0.0";

  /**
   * Console logger for Mason-it with mascot branding
   * Only logs when debug mode is enabled
   * @private
   * @param {...*} args - Arguments to log to console
   */
  function masonItLog() {
    if (MasonItDebugMode && console && console.log) {
      var args = [masonItMascotInline + " Mason:"].concat(
        Array.prototype.slice.call(arguments)
      );
      console.log.apply(console, args);
    }
  }

  /**
   * Error handler for Mason-it with mascot branding
   * Only logs errors when debug mode is enabled
   * @private
   * @param {string} context - The context where the error occurred
   * @param {Error} err - The error object
   */
  function masonItHandleError(context, err) {
    if (MasonItDebugMode && console && console.error) {
      console.error(
        masonItMascotInline + " Mason Error [" + context + "]:",
        err
      );
    }
  }

  /**
   * Core Mason-it layout function that applies the masonry layout to a grid
   * @private
   * @param {Element} el - The grid element to arrange as masonry
   */
  function masonItArrange(el) {
    try {
      masonItLog("Arranging masonry layout for", el);
      var gap = parseFloat(getComputedStyle(el).gap) || 0;
      var masonItItems = Array.prototype.filter.call(el.children, function (c) {
        return c.nodeType === 1 && c.tagName !== "TEMPLATE";
      });
      var masonItCols =
        getComputedStyle(el).gridTemplateColumns.split(" ").length;

      // Reset all items to default positioning
      masonItItems.forEach(function (item) {
        item.style.removeProperty("margin-top");
      });

      // Not enough columns for masonry effect
      if (masonItCols < 2) {
        masonItLog("Not enough columns for masonry effect");
        return;
      }

      // Create the masonry effect with negative margins
      for (var i = masonItCols; i < masonItItems.length; i++) {
        var currentItem = masonItItems[i],
          itemAbove = masonItItems[i - masonItCols];
        var spaceGap =
          currentItem.getBoundingClientRect().top -
          itemAbove.getBoundingClientRect().bottom;

        if (spaceGap !== gap) {
          currentItem.style.marginTop = "-" + (spaceGap - gap) + "px";
        }
      }
      masonItLog("Mason-it layout arranged successfully ✓");
    } catch (err) {
      masonItHandleError("arrange", err);
    }
  }

  /**
   * @typedef {Object} MasonItOptions
   * @property {number} [masonDelay=0] - Time in ms to wait before initial layout
   * @property {number} [masonPollInterval=0] - Interval in ms for polling content changes
   */

  /**
   * @typedef {Object} MasonItRecordItem
   * @property {Element} el - The grid element
   * @property {number|null} timeout - Timeout ID for delayed initialization
   * @property {number|null} interval - Interval ID for polling
   * @property {MutationObserver|null} observer - MutationObserver instance
   * @property {string} created - ISO timestamp of when the grid was initialized
   */

  /**
   * Initializes Mason-it on a specific grid element
   * @private
   * @param {Element} el - The grid element to setup
   * @param {MasonItOptions} [userOpts={}] - Configuration options
   */
  function masonItSetup(el, userOpts) {
    try {
      if (MasonItRegistry.has(el)) {
        masonItLog("Grid already Mason-ited, skipping", el);
        return;
      }

      masonItLog("Mason-iting grid", el, "with options", userOpts);
      var masonItAttr = el.getAttribute("data-mason-it") || "";
      var delayMatch = /mason-delay:\{(\d+)\}/.exec(masonItAttr);
      var intervalMatch = /mason-poll-interval:\{(\d+)\}/.exec(masonItAttr);

      // Merge attribute + JS options (JS options take priority)
      var masonDelay =
        userOpts && userOpts.masonDelay != null
          ? userOpts.masonDelay
          : delayMatch
          ? +delayMatch[1]
          : 0;

      var masonPollInterval =
        userOpts && userOpts.masonPollInterval != null
          ? userOpts.masonPollInterval
          : intervalMatch
          ? +intervalMatch[1]
          : 0;

      /** @type {MasonItRecordItem} */
      var masonItRecord = {
        el: el,
        timeout: null,
        interval: null,
        observer: null,
        created: new Date().toISOString(),
      };

      /**
       * Executes the masonry arrangement for this element
       * @private
       */
      function runMasonIt() {
        masonItArrange(el);
      }

      // Initial render (with optional delay)
      if (masonDelay) {
        masonItLog("Setting initial layout delay for", masonDelay, "ms");
        masonItRecord.timeout = setTimeout(runMasonIt, masonDelay);
      } else runMasonIt();

      // Polling for dynamic content changes
      if (masonPollInterval) {
        masonItLog("Setting poll interval for", masonPollInterval, "ms");
        masonItRecord.interval = setInterval(runMasonIt, masonPollInterval);
      }

      // Auto-update with MutationObserver for better performance
      if (typeof MutationObserver === "function") {
        masonItLog("Setting up Mason-it observer for dynamic content");
        masonItRecord.observer = new MutationObserver(runMasonIt);
        masonItRecord.observer.observe(el, { childList: true });
      }

      // Store the grid in our registry
      MasonItRegistry.set(el, masonItRecord);

      // Add a data attribute to indicate this element has been Mason-ited
      el.setAttribute("data-mason-it-active", "true");
    } catch (err) {
      masonItHandleError("setup", err);
    }
  }

  /**
   * Auto-initializes all grid elements with the data-mason-it attribute
   * Called automatically when the DOM is ready
   * @private
   */
  function masonItAutoSetup() {
    try {
      masonItLog("Auto-setting up all grids with [data-mason-it]");
      var masonItElements = document.querySelectorAll(
        "[data-mason-it]:not([data-mason-it-active='true'])"
      );
      masonItLog("Found", masonItElements.length, "grids to Mason-it");

      for (var i = 0; i < masonItElements.length; i++) {
        masonItSetup(masonItElements[i], {});
      }
    } catch (err) {
      masonItHandleError("auto-setup", err);
    }
  }

  /**
   * Refreshes all initialized Mason-it grids
   * @private
   */
  function masonItRefreshAll() {
    try {
      masonItLog("Refreshing all Mason-ited grids");
      var count = 0;
      MasonItRegistry.forEach(function (rec) {
        masonItArrange(rec.el);
        count++;
      });
      masonItLog("Refreshed", count, "Mason-it grids");
    } catch (err) {
      masonItHandleError("refresh-all", err);
    }
  }

  /**
   * Removes Mason-it behavior from a grid element
   * @private
   * @param {Element} el - The grid element to teardown
   */
  function masonItTeardown(el) {
    try {
      var rec = MasonItRegistry.get(el);
      if (!rec) {
        masonItLog("Grid not Mason-ited, nothing to teardown", el);
        return;
      }

      masonItLog("Un-Mason-iting grid", el);
      clearTimeout(rec.timeout);
      clearInterval(rec.interval);
      if (rec.observer) rec.observer.disconnect();

      // Reset the layout by applying one more time
      masonItArrange(el);

      // Remove from registry and clear data attribute
      MasonItRegistry.delete(el);
      el.removeAttribute("data-mason-it-active");

      masonItLog("Grid successfully un-Mason-ited");
    } catch (err) {
      masonItHandleError("teardown", err);
    }
  }

  /**
   * Converts various input types to an array or NodeList of elements
   * @private
   * @param {string|Element|NodeList|Array} selector - CSS selector, Element, NodeList or Array
   * @returns {NodeList|Element[]} - NodeList or array of elements
   */
  function masonItFindElements(selector) {
    try {
      if (typeof selector === "string") {
        return document.querySelectorAll(selector);
      }
      if (selector instanceof Element) {
        return [selector];
      }
      if (
        NodeList.prototype.isPrototypeOf(selector) ||
        Array.isArray(selector)
      ) {
        return selector;
      }
      return [];
    } catch (err) {
      masonItHandleError("find-elements", err);
      return [];
    }
  }

  /**
   * @namespace MasonIt
   * @description Global MasonIt object that provides the public API
   */
  window.MasonIt = {
    /**
     * Initialize Mason-it on selected elements
     * @memberof MasonIt
     * @param {string|Element|NodeList|Array} selector - CSS selector or element(s) to initialize
     * @param {MasonItOptions} [options={}] - Configuration options
     * @returns {MasonIt} - Returns the MasonIt object for chaining
     * @example
     * / Initialize with default options
     * MasonIt.init('.grid');
     *
     * / Initialize with custom options
     * MasonIt.init('.grid', {
     *   masonDelay: 500,
     *   masonPollInterval: 2000
     * });
     */
    init: function (selector, options) {
      masonItLog("📌 init() called with", selector, options);
      var els = masonItFindElements(selector);
      masonItLog("Found", els.length, "elements to Mason-it");

      for (var i = 0; i < els.length; i++) {
        masonItSetup(els[i], options || {});
      }
      return this; // For chaining
    },

    /**
     * Recalculates and applies Mason-it layout to specified element(s) or all grids
     * @memberof MasonIt
     * @param {string|Element|NodeList|Array} [selector] - CSS selector or element(s) to refresh (omit to refresh all)
     * @returns {MasonIt} - Returns the MasonIt object for chaining
     * @example
     * / Refresh all Mason-it grids
     * MasonIt.refresh();
     *
     * / Refresh specific grid
     * MasonIt.refresh('#my-grid');
     */
    refresh: function (selector) {
      masonItLog("🔄 refresh() called with", selector || "all grids");
      if (selector) {
        var els = masonItFindElements(selector);
        for (var i = 0; i < els.length; i++) {
          masonItArrange(els[i]);
        }
      } else {
        masonItRefreshAll();
      }
      return this; // For chaining
    },

    /**
     * Legacy method for backward compatibility. Use refresh() instead.
     * @deprecated since 1.0.0
     * @memberof MasonIt
     * @param {string|Element|NodeList|Array} [selector] - CSS selector or element(s) to reload
     * @returns {MasonIt} - Returns the MasonIt object for chaining
     */
    reload: function (selector) {
      masonItLog("⚠️ reload() is deprecated, please use refresh() instead");
      return this.refresh(selector);
    },

    /**
     * Removes Mason-it functionality from specified element(s) or all grids
     * @memberof MasonIt
     * @param {string|Element|NodeList|Array} [selector] - CSS selector or element(s) to destroy (omit to destroy all)
     * @returns {MasonIt} - Returns the MasonIt object for chaining
     * @example
     * / Remove Mason-it from all grids
     * MasonIt.destroy();
     *
     * / Remove Mason-it from specific grid
     * MasonIt.destroy('#my-grid');
     */
    destroy: function (selector) {
      masonItLog("❌ destroy() called with", selector || "all grids");
      if (selector) {
        var els = masonItFindElements(selector);
        for (var i = 0; i < els.length; i++) {
          masonItTeardown(els[i]);
        }
      } else {
        MasonItRegistry.forEach(function (rec, el) {
          masonItTeardown(el);
        });
      }
      return this; // For chaining
    },

    /**
     * Enables or disables debug mode for detailed console logs
     * @memberof MasonIt
     * @param {boolean} enable - Whether to enable debug mode
     * @returns {MasonIt} - Returns the MasonIt object for chaining
     * @example
     * / Enable debug mode
     * MasonIt.debug(true);
     *
     * / Disable debug mode
     * MasonIt.debug(false);
     */
    debug: function (enable) {
      MasonItDebugMode = !!enable;
      console.log(
        "\n" +
          masonItMascot +
          "\n\nMason says: Debug mode " +
          (MasonItDebugMode ? "enabled 🔍" : "disabled 🔒")
      );
      return this; // For chaining
    },

    /**
     * Returns the current version of Mason-it
     * @memberof MasonIt
     * @returns {string} - Version string
     * @example
     * const version = MasonIt.version(); // Returns "1.0.0"
     */
    version: function () {
      return MasonItVersion;
    },

    /**
     * Returns the number of currently active Mason-it grids
     * @memberof MasonIt
     * @returns {number} - Count of active grids
     * @example
     * const activeGrids = MasonIt.count(); // Returns number of active grids
     */
    count: function () {
      return MasonItRegistry.size;
    },
  };

  // Auto-init when DOM is ready
  document.addEventListener("DOMContentLoaded", masonItAutoSetup);

  /**
   * Window resize handler with requestAnimationFrame for performance
   * @private
   */
  var masonItResizeTicking = false;
  window.addEventListener("resize", function () {
    if (!masonItResizeTicking) {
      masonItResizeTicking = true;
      window.requestAnimationFrame(function () {
        masonItLog("🔄 Window resize detected - refreshing all Mason-it grids");
        masonItRefreshAll();
        masonItResizeTicking = false;
      });
    }
  });

  // Listen for custom refresh event
  window.addEventListener("refresh:mason-it", function () {
    masonItLog("🔄 Custom refresh event received");
    masonItRefreshAll();
  });

  // For backward compatibility, also listen to the old reload event
  window.addEventListener("reload:mason-it", function () {
    masonItLog(
      "⚠️ 'reload:mason-it' event is deprecated, please use 'refresh:mason-it' instead"
    );
    masonItRefreshAll();
  });

  // Module exports for various module systems
  if (typeof module !== "undefined" && module.exports) {
    module.exports = window.MasonIt;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return window.MasonIt;
    });
  }

  // Log initialization with full mascot art
  console.log(
    masonItMascot +
      "\n\nMason-it v" +
      MasonItVersion +
      " initialized!" +
      "\nMade with ❤️ by Druhin13\n"
  );
})();
