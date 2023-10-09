"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/user */ \"./reducers/user.js\");\n/* harmony import */ var _reducers_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/post */ \"./reducers/post.js\");\n/* harmony import */ var _components_PostForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PostForm */ \"./components/PostForm.js\");\n/* harmony import */ var _components_PostCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PostCard */ \"./components/PostCard.js\");\n/* harmony import */ var _components_AppLayout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/AppLayout */ \"./components/AppLayout.js\");\nvar _this = undefined;\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nvar Home = function() {\n    _s();\n    var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    var me = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function(state) {\n        return state.user;\n    }).me;\n    var ref = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function(state) {\n        return state.post;\n    }), mainPosts = ref.mainPosts, hasMorePost = ref.hasMorePost, loadPostsLoading = ref.loadPostsLoading, retweetError = ref.retweetError;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        if (retweetError) {\n            alert(retweetError);\n        }\n    }, [\n        retweetError\n    ]);\n    // 내 정보 가져오기. (미해결..)\n    /*\n  useEffect(() => {\n    dispatch({\n      type : LOAD_MY_INFO_REQUEST,\n    })\n  })\n  */ // 게시글 가져오기.\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        dispatch({\n            type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__.LOAD_POSTS_REQUEST\n        });\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        var onScroll = function onScroll() {\n            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);\n            // 현재 스크롤 위치, 전체중 스크롤 높이 위치, 총 스크롤 높이 위치\n            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {\n                if (hasMorePost && !loadPostsLoading) {\n                    dispatch({\n                        type: _reducers_post__WEBPACK_IMPORTED_MODULE_4__.LOAD_POSTS_REQUEST\n                    });\n                }\n            }\n        };\n        window.addEventListener(\"scroll\", onScroll);\n        return function() {\n            window.removeEventListener(\"scroll\", onScroll);\n        };\n    }, [\n        hasMorePost,\n        loadPostsLoading\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_AppLayout__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        children: [\n            me && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostForm__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\YONGBIN\\\\OneDrive\\\\바탕 화면\\\\NordBird\\\\front\\\\pages\\\\index.js\",\n                lineNumber: 61,\n                columnNumber: 14\n            }, _this),\n            mainPosts.map(function(c) {\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostCard__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                    post: c\n                }, c.id, false, {\n                    fileName: \"C:\\\\Users\\\\YONGBIN\\\\OneDrive\\\\바탕 화면\\\\NordBird\\\\front\\\\pages\\\\index.js\",\n                    lineNumber: 64,\n                    columnNumber: 11\n                }, _this);\n            })\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\YONGBIN\\\\OneDrive\\\\바탕 화면\\\\NordBird\\\\front\\\\pages\\\\index.js\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, _this);\n};\n_s(Home, \"zW/9j0zorSsLbsz319W3PBRRAKI=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch,\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector\n    ];\n});\n_c = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7QUFBdUM7QUFDZ0I7QUFDQztBQUNGO0FBRVI7QUFDQTtBQUNFO0FBRWhELElBQU1TLElBQUksR0FBRyxXQUFNOztJQUNqQixJQUFNQyxRQUFRLEdBQUdSLHdEQUFXLEVBQUU7SUFDOUIsSUFBTSxFQUFJLEdBQUtDLHdEQUFXLENBQUNTLFNBQUFBLEtBQUs7ZUFBSUEsS0FBSyxDQUFDQyxJQUFJO0tBQUEsQ0FBQyxDQUF2Q0YsRUFBRTtJQUNWLElBQW1FUixHQUFnQyxHQUFoQ0Esd0RBQVcsQ0FBQ1MsU0FBQUEsS0FBSztlQUFJQSxLQUFLLENBQUNFLElBQUk7S0FBQSxDQUFDLEVBQTNGQyxTQUFTLEdBQWtEWixHQUFnQyxDQUEzRlksU0FBUyxFQUFHQyxXQUFXLEdBQW9DYixHQUFnQyxDQUEvRWEsV0FBVyxFQUFFQyxnQkFBZ0IsR0FBa0JkLEdBQWdDLENBQWxFYyxnQkFBZ0IsRUFBRUMsWUFBWSxHQUFJZixHQUFnQyxDQUFoRGUsWUFBWTtJQUUvRGpCLGdEQUFTLENBQUMsV0FBTTtRQUNkLElBQUdpQixZQUFZLEVBQUU7WUFDZkMsS0FBSyxDQUFDRCxZQUFZLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQyxFQUFDO1FBQUNBLFlBQVk7S0FBQyxDQUFDO0lBR2pCLHFCQUFxQjtJQUNyQjs7Ozs7O0VBTUEsR0FFQSxZQUFZO0lBQ1pqQixnREFBUyxDQUFDLFdBQU07UUFDZFMsUUFBUSxDQUFDO1lBQ1BVLElBQUksRUFBR2YsOERBQWtCO1NBQzFCLENBQUM7SUFDSixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUEosZ0RBQVMsQ0FBQyxXQUFNO1lBQ0xvQixRQUFRLEdBQWpCLFNBQVNBLFFBQVEsR0FBRztZQUNsQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ0MsWUFBWSxFQUFFRixRQUFRLENBQUNDLGVBQWUsQ0FBQ0UsWUFBWSxDQUFDLENBQUM7WUFDMUcsd0NBQXdDO1lBQ3hDLElBQUtMLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGVBQWUsQ0FBQ0MsWUFBWSxHQUFHRixRQUFRLENBQUNDLGVBQWUsQ0FBQ0UsWUFBWSxHQUFFLEdBQUcsRUFBRztnQkFDekcsSUFBSWIsV0FBVyxJQUFJLENBQUNDLGdCQUFnQixFQUFFO29CQUNsQ1AsUUFBUSxDQUFDO3dCQUNQVSxJQUFJLEVBQUdmLDhEQUFrQjtxQkFDMUIsQ0FBQztnQkFDTixDQUFDO1lBQ0gsQ0FBQztRQUVILENBQUM7UUFFRG1CLE1BQU0sQ0FBQ00sZ0JBQWdCLENBQUMsUUFBUSxFQUFFVCxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLFdBQU07WUFDWEcsTUFBTSxDQUFDTyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUVWLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFFSCxDQUFDLEVBQUM7UUFBQ0wsV0FBVztRQUFFQyxnQkFBZ0I7S0FBQyxDQUFDO0lBRWxDLHFCQUNFLDhEQUFDVCw2REFBUzs7WUFDUEcsRUFBRSxrQkFBSSw4REFBQ0wsNERBQVE7Ozs7cUJBQUc7WUFDbEJTLFNBQVMsQ0FBQ2lCLEdBQUcsQ0FBQyxTQUFDQyxDQUFDLEVBQUs7Z0JBQ3BCLHFCQUNFLDhEQUFDMUIsNERBQVE7b0JBQVlPLElBQUksRUFBRW1CLENBQUM7bUJBQWJBLENBQUMsQ0FBQ0MsRUFBRTs7Ozt5QkFBYSxDQUNoQztZQUNKLENBQUMsQ0FBQzs7Ozs7O2FBQ1EsQ0FDWjtBQUNKLENBQUM7R0EzREt6QixJQUFJOztRQUNTUCxvREFBVztRQUNiQyxvREFBVztRQUN5Q0Esb0RBQVc7OztBQUgxRU0sS0FBQUEsSUFBSTtBQTZEViwrREFBZUEsSUFBSSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7dXNlRWZmZWN0fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBMT0FEX01ZX0lORk9fUkVRVUVTVCB9IGZyb20gJy4uL3JlZHVjZXJzL3VzZXInO1xuaW1wb3J0IHsgTE9BRF9QT1NUU19SRVFVRVNUIH0gZnJvbSAnLi4vcmVkdWNlcnMvcG9zdCc7XG5cbmltcG9ydCBQb3N0Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL1Bvc3RGb3JtJztcbmltcG9ydCBQb3N0Q2FyZCBmcm9tICcuLi9jb21wb25lbnRzL1Bvc3RDYXJkJztcbmltcG9ydCBBcHBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9BcHBMYXlvdXQnO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IHsgbWUgfSA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IHN0YXRlLnVzZXIpO1xuICBjb25zdCB7IG1haW5Qb3N0cyAsIGhhc01vcmVQb3N0LCBsb2FkUG9zdHNMb2FkaW5nLCByZXR3ZWV0RXJyb3J9ID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUucG9zdCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZihyZXR3ZWV0RXJyb3IpIHtcbiAgICAgIGFsZXJ0KHJldHdlZXRFcnJvcik7XG4gICAgfVxuICB9LFtyZXR3ZWV0RXJyb3JdKVxuICBcblxuICAvLyDrgrQg7KCV67O0IOqwgOyguOyYpOq4sC4gKOuvuO2VtOqysC4uKVxuICAvKlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGUgOiBMT0FEX01ZX0lORk9fUkVRVUVTVCxcbiAgICB9KVxuICB9KVxuICAqL1xuICBcbiAgLy8g6rKM7Iuc6riAIOqwgOyguOyYpOq4sC5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlIDogTE9BRF9QT1NUU19SRVFVRVNULFxuICAgIH0pXG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgICAgY29uc29sZS5sb2cod2luZG93LnNjcm9sbFksIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQpO1xuICAgICAgLy8g7ZiE7J6sIOyKpO2BrOuhpCDsnITsuZgsIOyghOyytOykkSDsiqTtgazroaQg64aS7J20IOychOy5mCwg7LSdIOyKpO2BrOuhpCDrhpLsnbQg7JyE7LmYXG4gICAgICBpZiAoIHdpbmRvdy5zY3JvbGxZICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLTMwMCApIHtcbiAgICAgICAgaWYgKGhhc01vcmVQb3N0ICYmICFsb2FkUG9zdHNMb2FkaW5nKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGUgOiBMT0FEX1BPU1RTX1JFUVVFU1QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xuICAgIH1cblxuICB9LFtoYXNNb3JlUG9zdCwgbG9hZFBvc3RzTG9hZGluZ10pXG4gIFxuICByZXR1cm4gKFxuICAgIDxBcHBMYXlvdXQ+XG4gICAgICB7bWUgJiYgPFBvc3RGb3JtIC8+fVxuICAgICAge21haW5Qb3N0cy5tYXAoKGMpID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8UG9zdENhcmQga2V5PXtjLmlkfSBwb3N0PXtjfSAvPlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9BcHBMYXlvdXQ+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsIkxPQURfTVlfSU5GT19SRVFVRVNUIiwiTE9BRF9QT1NUU19SRVFVRVNUIiwiUG9zdEZvcm0iLCJQb3N0Q2FyZCIsIkFwcExheW91dCIsIkhvbWUiLCJkaXNwYXRjaCIsIm1lIiwic3RhdGUiLCJ1c2VyIiwicG9zdCIsIm1haW5Qb3N0cyIsImhhc01vcmVQb3N0IiwibG9hZFBvc3RzTG9hZGluZyIsInJldHdlZXRFcnJvciIsImFsZXJ0IiwidHlwZSIsIm9uU2Nyb2xsIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsInNjcm9sbFkiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsInNjcm9sbEhlaWdodCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwiYyIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});