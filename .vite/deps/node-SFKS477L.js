import {
  VERSION,
  build,
  buildErrorMessage,
  createFilter,
  createLogger,
  createServer,
  defineConfig,
  formatPostcssSourceMap,
  getDepOptimizationConfig,
  init_constants,
  init_dep_e8f070e8,
  isDepsOptimizerEnabled,
  isFileServingAllowed,
  isInNodeModules,
  loadConfigFromFile,
  loadEnv,
  mergeAlias,
  mergeConfig,
  normalizePath$3,
  optimizeDeps,
  preprocessCSS,
  preview,
  require_assert,
  require_buffer,
  require_http,
  require_https,
  require_module,
  require_net,
  require_node_assert,
  require_node_buffer,
  require_node_child_process,
  require_node_dns,
  require_node_util,
  require_node_v8,
  require_node_zlib,
  require_querystring,
  require_tls,
  require_zlib,
  resolveBaseUrl,
  resolveConfig,
  resolveEnvPrefix,
  resolvePackageData,
  resolvePackageEntry,
  searchForWorkspaceRoot,
  send$2,
  sortUserPlugins,
  transformWithEsbuild
} from "./chunk-JNEXF4H2.js";
import {
  require_node_https
} from "./chunk-XMUIS577.js";
import {
  init_rollup
} from "./chunk-6NZ2GZIU.js";
import {
  version$1
} from "./chunk-7FSMLWXK.js";
import {
  require_child_process,
  require_crypto,
  require_main,
  require_node_fs,
  require_node_readline,
  require_worker_threads
} from "./chunk-PEIC2J6U.js";
import {
  require_events,
  require_node_os,
  require_os,
  require_stream,
  require_util
} from "./chunk-CYAUJUKJ.js";
import {
  require_node_crypto,
  require_node_perf_hooks,
  require_node_process,
  require_promises,
  require_tty
} from "./chunk-YLDXSW5S.js";
import {
  require_node_module,
  require_node_url
} from "./chunk-HRJKGWKN.js";
import {
  require_node_path
} from "./chunk-N7ZZMVJM.js";
import {
  require_url
} from "./chunk-OLRUIFMZ.js";
import {
  require_fs
} from "./chunk-FNTYQBPD.js";
import {
  require_path
} from "./chunk-WA5DOPHZ.js";
import {
  require_node_http
} from "./chunk-3WXOCPVW.js";
import {
  __esm,
  __toESM
} from "./chunk-TFWDKVI3.js";

// node_modules/vite/dist/node/index.js
function splitVendorChunk(options = {}) {
  const cache = options.cache ?? new SplitVendorChunkCache();
  return (id, { getModuleInfo }) => {
    if (isInNodeModules(id) && !isCSSRequest(id) && staticImportedByEntry(id, getModuleInfo, cache.cache)) {
      return "vendor";
    }
  };
}
function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  if (importStack.includes(id)) {
    cache.set(id, false);
    return false;
  }
  const mod = getModuleInfo(id);
  if (!mod) {
    cache.set(id, false);
    return false;
  }
  if (mod.isEntry) {
    cache.set(id, true);
    return true;
  }
  const someImporterIs = mod.importers.some((importer) => staticImportedByEntry(importer, getModuleInfo, cache, importStack.concat(id)));
  cache.set(id, someImporterIs);
  return someImporterIs;
}
function splitVendorChunkPlugin() {
  const caches = [];
  function createSplitVendorChunk(output, config) {
    const cache = new SplitVendorChunkCache();
    caches.push(cache);
    const build2 = config.build ?? {};
    const format = output == null ? void 0 : output.format;
    if (!build2.ssr && !build2.lib && format !== "umd" && format !== "iife") {
      return splitVendorChunk({ cache });
    }
  }
  return {
    name: "vite:split-vendor-chunk",
    config(config) {
      var _a, _b;
      let outputs = (_b = (_a = config == null ? void 0 : config.build) == null ? void 0 : _a.rollupOptions) == null ? void 0 : _b.output;
      if (outputs) {
        outputs = Array.isArray(outputs) ? outputs : [outputs];
        for (const output of outputs) {
          const viteManualChunks = createSplitVendorChunk(output, config);
          if (viteManualChunks) {
            if (output.manualChunks) {
              if (typeof output.manualChunks === "function") {
                const userManualChunks = output.manualChunks;
                output.manualChunks = (id, api) => {
                  return userManualChunks(id, api) ?? viteManualChunks(id, api);
                };
              }
            } else {
              output.manualChunks = viteManualChunks;
            }
          }
        }
      } else {
        return {
          build: {
            rollupOptions: {
              output: {
                manualChunks: createSplitVendorChunk({}, config)
              }
            }
          }
        };
      }
    },
    buildStart() {
      caches.forEach((cache) => cache.reset());
    }
  };
}
var import_esbuild, import_node_fs, import_promises, import_node_path, import_node_url, import_node_util, import_node_perf_hooks, import_node_module, import_tty, import_path, import_fs, import_events, import_assert, import_util, import_net, import_url, import_http, import_stream, import_os, import_child_process, import_node_os, import_node_child_process, import_node_crypto, import_node_dns, import_crypto, import_node_buffer, import_module, import_node_assert, import_node_process, import_node_v8, import_worker_threads, import_zlib, import_buffer, import_https, import_tls, import_node_http, import_node_https, import_querystring, import_node_readline, import_node_zlib, CSS_LANGS_RE, isCSSRequest, SplitVendorChunkCache;
var init_node = __esm({
  "node_modules/vite/dist/node/index.js"() {
    init_dep_e8f070e8();
    init_dep_e8f070e8();
    init_constants();
    import_esbuild = __toESM(require_main(), 1);
    init_rollup();
    import_node_fs = __toESM(require_node_fs(), 1);
    import_promises = __toESM(require_promises(), 1);
    import_node_path = __toESM(require_node_path(), 1);
    import_node_url = __toESM(require_node_url(), 1);
    import_node_util = __toESM(require_node_util(), 1);
    import_node_perf_hooks = __toESM(require_node_perf_hooks(), 1);
    import_node_module = __toESM(require_node_module(), 1);
    import_tty = __toESM(require_tty(), 1);
    import_path = __toESM(require_path(), 1);
    import_fs = __toESM(require_fs(), 1);
    import_events = __toESM(require_events(), 1);
    import_assert = __toESM(require_assert(), 1);
    import_util = __toESM(require_util(), 1);
    import_net = __toESM(require_net(), 1);
    import_url = __toESM(require_url(), 1);
    import_http = __toESM(require_http(), 1);
    import_stream = __toESM(require_stream(), 1);
    import_os = __toESM(require_os(), 1);
    import_child_process = __toESM(require_child_process(), 1);
    import_node_os = __toESM(require_node_os(), 1);
    import_node_child_process = __toESM(require_node_child_process(), 1);
    import_node_crypto = __toESM(require_node_crypto(), 1);
    import_node_dns = __toESM(require_node_dns(), 1);
    import_crypto = __toESM(require_crypto(), 1);
    import_node_buffer = __toESM(require_node_buffer(), 1);
    import_module = __toESM(require_module(), 1);
    import_node_assert = __toESM(require_node_assert(), 1);
    import_node_process = __toESM(require_node_process(), 1);
    import_node_v8 = __toESM(require_node_v8(), 1);
    import_worker_threads = __toESM(require_worker_threads(), 1);
    import_zlib = __toESM(require_zlib(), 1);
    import_buffer = __toESM(require_buffer(), 1);
    import_https = __toESM(require_https(), 1);
    import_tls = __toESM(require_tls(), 1);
    import_node_http = __toESM(require_node_http(), 1);
    import_node_https = __toESM(require_node_https(), 1);
    import_querystring = __toESM(require_querystring(), 1);
    import_node_readline = __toESM(require_node_readline(), 1);
    import_node_zlib = __toESM(require_node_zlib(), 1);
    CSS_LANGS_RE = // eslint-disable-next-line regexp/no-unused-capturing-group
    /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
    isCSSRequest = (request) => CSS_LANGS_RE.test(request);
    SplitVendorChunkCache = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      reset() {
        this.cache = /* @__PURE__ */ new Map();
      }
    };
  }
});
init_node();
var export_esbuildVersion = import_esbuild.version;
export {
  build,
  buildErrorMessage,
  createFilter,
  createLogger,
  createServer,
  defineConfig,
  export_esbuildVersion as esbuildVersion,
  formatPostcssSourceMap,
  getDepOptimizationConfig,
  isCSSRequest,
  isDepsOptimizerEnabled,
  isFileServingAllowed,
  loadConfigFromFile,
  loadEnv,
  mergeAlias,
  mergeConfig,
  normalizePath$3 as normalizePath,
  optimizeDeps,
  preprocessCSS,
  preview,
  resolveBaseUrl,
  resolveConfig,
  resolveEnvPrefix,
  resolvePackageData,
  resolvePackageEntry,
  version$1 as rollupVersion,
  searchForWorkspaceRoot,
  send$2 as send,
  sortUserPlugins,
  splitVendorChunk,
  splitVendorChunkPlugin,
  transformWithEsbuild,
  VERSION as version
};
//# sourceMappingURL=node-SFKS477L.js.map
