import {
  require_node_crypto,
  require_node_events,
  require_node_perf_hooks,
  require_node_process,
  require_promises,
  require_tty
} from "./chunk-YLDXSW5S.js";
import {
  require_node_path
} from "./chunk-N7ZZMVJM.js";
import {
  require_path
} from "./chunk-WA5DOPHZ.js";
import {
  __esm,
  __toESM
} from "./chunk-TFWDKVI3.js";

// node_modules/rollup/dist/es/shared/node-entry.js
function decode(mappings) {
  const state = new Int32Array(5);
  const decoded = [];
  let index = 0;
  do {
    const semi = indexOf(mappings, index);
    const line = [];
    let sorted = true;
    let lastCol = 0;
    state[0] = 0;
    for (let i = index; i < semi; i++) {
      let seg;
      i = decodeInteger(mappings, i, state, 0);
      const col = state[0];
      if (col < lastCol)
        sorted = false;
      lastCol = col;
      if (hasMoreVlq(mappings, i, semi)) {
        i = decodeInteger(mappings, i, state, 1);
        i = decodeInteger(mappings, i, state, 2);
        i = decodeInteger(mappings, i, state, 3);
        if (hasMoreVlq(mappings, i, semi)) {
          i = decodeInteger(mappings, i, state, 4);
          seg = [col, state[1], state[2], state[3], state[4]];
        } else {
          seg = [col, state[1], state[2], state[3]];
        }
      } else {
        seg = [col];
      }
      line.push(seg);
    }
    if (!sorted)
      sort(line);
    decoded.push(line);
    index = semi + 1;
  } while (index <= mappings.length);
  return decoded;
}
function indexOf(mappings, index) {
  const idx = mappings.indexOf(";", index);
  return idx === -1 ? mappings.length : idx;
}
function decodeInteger(mappings, pos, state, j) {
  let value = 0;
  let shift = 0;
  let integer = 0;
  do {
    const c = mappings.charCodeAt(pos++);
    integer = charToInt[c];
    value |= (integer & 31) << shift;
    shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  value >>>= 1;
  if (shouldNegate) {
    value = -2147483648 | -value;
  }
  state[j] += value;
  return pos;
}
function hasMoreVlq(mappings, i, length) {
  if (i >= length)
    return false;
  return mappings.charCodeAt(i) !== comma;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
function encode(decoded) {
  const state = new Int32Array(5);
  const bufLength = 1024 * 16;
  const subLength = bufLength - 36;
  const buf = new Uint8Array(bufLength);
  const sub = buf.subarray(0, subLength);
  let pos = 0;
  let out = "";
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) {
      if (pos === bufLength) {
        out += td.decode(buf);
        pos = 0;
      }
      buf[pos++] = semicolon;
    }
    if (line.length === 0)
      continue;
    state[0] = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (pos > subLength) {
        out += td.decode(sub);
        buf.copyWithin(0, subLength, pos);
        pos -= subLength;
      }
      if (j > 0)
        buf[pos++] = comma;
      pos = encodeInteger(buf, pos, state, segment, 0);
      if (segment.length === 1)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 1);
      pos = encodeInteger(buf, pos, state, segment, 2);
      pos = encodeInteger(buf, pos, state, segment, 3);
      if (segment.length === 4)
        continue;
      pos = encodeInteger(buf, pos, state, segment, 4);
    }
  }
  return out + td.decode(buf.subarray(0, pos));
}
function encodeInteger(buf, pos, state, segment, j) {
  const next = segment[j];
  let num = next - state[j];
  state[j] = next;
  num = num < 0 ? -num << 1 | 1 : num << 1;
  do {
    let clamped = num & 31;
    num >>>= 5;
    if (num > 0)
      clamped |= 32;
    buf[pos++] = intToChar[clamped];
  } while (num > 0);
  return pos;
}
function getBtoa() {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return (str) => window.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current2) => {
    const numSpaces = /^ +/.exec(current2)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
function isObject$1(thing) {
  return toString$1.call(thing) === "[object Object]";
}
function getLocator$1(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate2(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m = i + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
function relative(from, to) {
  const fromParts = from.split(ANY_SLASH_REGEX).filter(Boolean);
  const toParts = to.split(ANY_SLASH_REGEX).filter(Boolean);
  if (fromParts[0] === ".")
    fromParts.shift();
  if (toParts[0] === ".")
    toParts.shift();
  while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  while (toParts[0] === ".." && fromParts.length > 0) {
    toParts.shift();
    fromParts.pop();
  }
  while (fromParts.pop()) {
    toParts.unshift("..");
  }
  return toParts.join("/");
}
function escapeId(id) {
  if (!needsEscapeRegEx.test(id))
    return id;
  return id.replace(backSlashRegEx, "\\\\").replace(quoteNewlineRegEx, "\\$1");
}
function isAbsolute(path2) {
  return ABSOLUTE_PATH_REGEX.test(path2);
}
function isRelative(path2) {
  return RELATIVE_PATH_REGEX.test(path2);
}
function normalize(path2) {
  return path2.replace(BACKSLASH_REGEX, "/");
}
function getAliasName(id) {
  const base2 = (0, import_node_path.basename)(id);
  return base2.slice(0, Math.max(0, base2.length - (0, import_node_path.extname)(id).length));
}
function relativeId(id) {
  if (!isAbsolute(id))
    return id;
  return relative((0, import_node_path.resolve)(), id);
}
function isPathFragment(name) {
  return name[0] === "/" || name[0] === "." && (name[1] === "/" || name[1] === ".") || isAbsolute(name);
}
function getImportPath(importerId, targetPath, stripJsExtension, ensureFileName) {
  let relativePath = normalize(relative((0, import_node_path.dirname)(importerId), targetPath));
  if (stripJsExtension && relativePath.endsWith(".js")) {
    relativePath = relativePath.slice(0, -3);
  }
  if (ensureFileName) {
    if (relativePath === "")
      return "../" + (0, import_node_path.basename)(targetPath);
    if (UPPER_DIR_REGEX.test(relativePath)) {
      return [...relativePath.split("/"), "..", (0, import_node_path.basename)(targetPath)].join("/");
    }
  }
  return relativePath ? relativePath.startsWith("..") ? relativePath : "./" + relativePath : ".";
}
function formatAssertions$1(assertions, { getObject }) {
  if (!assertions) {
    return null;
  }
  const assertionEntries = Object.entries(assertions).map(([key, value]) => [key, `'${value}'`]);
  if (assertionEntries.length > 0) {
    return getObject(assertionEntries, { lineBreakIndent: null });
  }
  return null;
}
function getOrCreate(map, key, init2) {
  const existing = map.get(key);
  if (existing !== void 0) {
    return existing;
  }
  const value = init2();
  map.set(key, value);
  return value;
}
function getNewSet() {
  return /* @__PURE__ */ new Set();
}
function getNewArray() {
  return [];
}
function getLocator(source, options) {
  if (options === void 0) {
    options = {};
  }
  var offsetLine = options.offsetLine || 0;
  var offsetColumn = options.offsetColumn || 0;
  var originalLines = source.split("\n");
  var start = 0;
  var lineRanges = originalLines.map(function(line, i2) {
    var end = start + line.length + 1;
    var range = { start, end, line: i2 };
    start = end;
    return range;
  });
  var i = 0;
  function rangeContains(range, index) {
    return range.start <= index && index < range.end;
  }
  function getLocation(range, index) {
    return { line: offsetLine + range.line, column: offsetColumn + index - range.start, character: index };
  }
  function locate2(search, startIndex) {
    if (typeof search === "string") {
      search = source.indexOf(search, startIndex || 0);
    }
    var range = lineRanges[i];
    var d = search >= range.end ? 1 : -1;
    while (range) {
      if (rangeContains(range, search))
        return getLocation(range, search);
      i += d;
      range = lineRanges[i];
    }
  }
  return locate2;
}
function locate(source, search, options) {
  if (typeof options === "number") {
    throw new Error("locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument");
  }
  return getLocator(source, options)(search, options && options.startIndex);
}
function spaces(index) {
  let result = "";
  while (index--)
    result += " ";
  return result;
}
function tabsToSpaces(value) {
  return value.replace(/^\t+/, (match) => match.split("	").join("  "));
}
function getCodeFrame(source, line, column) {
  let lines = source.split("\n");
  if (line > lines.length)
    return "";
  const maxLineLength = Math.max(tabsToSpaces(lines[line - 1].slice(0, column)).length + MIN_CHARACTERS_SHOWN_AFTER_LOCATION + ELLIPSIS.length, LINE_TRUNCATE_LENGTH);
  const frameStart = Math.max(0, line - 3);
  let frameEnd = Math.min(line + 2, lines.length);
  lines = lines.slice(frameStart, frameEnd);
  while (!/\S/.test(lines[lines.length - 1])) {
    lines.pop();
    frameEnd -= 1;
  }
  const digits = String(frameEnd).length;
  return lines.map((sourceLine, index) => {
    const isErrorLine = frameStart + index + 1 === line;
    let lineNumber = String(index + frameStart + 1);
    while (lineNumber.length < digits)
      lineNumber = ` ${lineNumber}`;
    let displayedLine = tabsToSpaces(sourceLine);
    if (displayedLine.length > maxLineLength) {
      displayedLine = `${displayedLine.slice(0, maxLineLength - ELLIPSIS.length)}${ELLIPSIS}`;
    }
    if (isErrorLine) {
      const indicator = spaces(digits + 2 + tabsToSpaces(sourceLine.slice(0, column)).length) + "^";
      return `${lineNumber}: ${displayedLine}
${indicator}`;
    }
    return `${lineNumber}: ${displayedLine}`;
  }).join("\n");
}
function printQuotedStringList(list, verbs) {
  const isSingleItem = list.length <= 1;
  const quotedList = list.map((item) => `"${item}"`);
  let output = isSingleItem ? quotedList[0] : `${quotedList.slice(0, -1).join(", ")} and ${quotedList.slice(-1)[0]}`;
  if (verbs) {
    output += ` ${isSingleItem ? verbs[0] : verbs[1]}`;
  }
  return output;
}
function isValidUrl(url) {
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
}
function getRollupUrl(snippet) {
  return `https://rollupjs.org/${snippet}`;
}
function error(base2) {
  if (!(base2 instanceof Error)) {
    base2 = Object.assign(new Error(base2.message), base2);
    Object.defineProperty(base2, "name", { value: "RollupError" });
  }
  throw base2;
}
function augmentCodeLocation(properties, pos, source, id) {
  if (typeof pos === "object") {
    const { line, column } = pos;
    properties.loc = { column, file: id, line };
  } else {
    properties.pos = pos;
    const { line, column } = locate(source, pos, { offsetLine: 1 });
    properties.loc = { column, file: id, line };
  }
  if (properties.frame === void 0) {
    const { line, column } = properties.loc;
    properties.frame = getCodeFrame(source, line, column);
  }
}
function errorAddonNotGenerated(message, hook, plugin) {
  return {
    code: ADDON_ERROR,
    message: `Could not retrieve "${hook}". Check configuration of plugin "${plugin}".
	Error Message: ${message}`
  };
}
function errorAlreadyClosed() {
  return {
    code: ALREADY_CLOSED,
    message: 'Bundle is already closed, no more calls to "generate" or "write" are allowed.'
  };
}
function errorAmbiguousExternalNamespaces(binding, reexportingModule, usedModule, sources) {
  return {
    binding,
    code: AMBIGUOUS_EXTERNAL_NAMESPACES,
    ids: sources,
    message: `Ambiguous external namespace resolution: "${relativeId(reexportingModule)}" re-exports "${binding}" from one of the external modules ${printQuotedStringList(sources.map((module) => relativeId(module)))}, guessing "${relativeId(usedModule)}".`,
    reexporter: reexportingModule
  };
}
function errorAnonymousPluginCache() {
  return {
    code: ANONYMOUS_PLUGIN_CACHE,
    message: "A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey."
  };
}
function errorAssetNotFinalisedForFileName(name) {
  return {
    code: ASSET_NOT_FINALISED,
    message: `Plugin error - Unable to get file name for asset "${name}". Ensure that the source is set and that generate is called first. If you reference assets via import.meta.ROLLUP_FILE_URL_<referenceId>, you need to either have set their source after "renderStart" or need to provide an explicit "fileName" when emitting them.`
  };
}
function errorAssetReferenceIdNotFoundForSetSource(assetReferenceId) {
  return {
    code: ASSET_NOT_FOUND,
    message: `Plugin error - Unable to set the source for unknown asset "${assetReferenceId}".`
  };
}
function errorAssetSourceAlreadySet(name) {
  return {
    code: ASSET_SOURCE_ALREADY_SET,
    message: `Unable to set the source for asset "${name}", source already set.`
  };
}
function errorNoAssetSourceSet(assetName) {
  return {
    code: ASSET_SOURCE_MISSING,
    message: `Plugin error creating asset "${assetName}" - no asset source set.`
  };
}
function errorBadLoader(id) {
  return {
    code: BAD_LOADER,
    message: `Error loading "${relativeId(id)}": plugin load hook should return a string, a { code, map } object, or nothing/null.`
  };
}
function errorCannotCallNamespace(name) {
  return {
    code: CANNOT_CALL_NAMESPACE,
    message: `Cannot call a namespace ("${name}").`
  };
}
function errorCannotEmitFromOptionsHook() {
  return {
    code: CANNOT_EMIT_FROM_OPTIONS_HOOK,
    message: `Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.`
  };
}
function errorChunkNotGeneratedForFileName(name) {
  return {
    code: CHUNK_NOT_GENERATED,
    message: `Plugin error - Unable to get file name for emitted chunk "${name}". You can only get file names once chunks have been generated after the "renderStart" hook.`
  };
}
function errorChunkInvalid({ fileName, code }, exception) {
  const errorProperties = {
    code: CHUNK_INVALID,
    message: `Chunk "${fileName}" is not valid JavaScript: ${exception.message}.`
  };
  augmentCodeLocation(errorProperties, exception.loc, code, fileName);
  return errorProperties;
}
function errorCircularDependency(cyclePath) {
  return {
    code: CIRCULAR_DEPENDENCY,
    ids: cyclePath,
    message: `Circular dependency: ${cyclePath.map(relativeId).join(" -> ")}`
  };
}
function errorCircularReexport(exportName, exporter) {
  return {
    code: CIRCULAR_REEXPORT,
    exporter,
    message: `"${exportName}" cannot be exported from "${relativeId(exporter)}" as it is a reexport that references itself.`
  };
}
function errorCyclicCrossChunkReexport(exportName, exporter, reexporter, importer, preserveModules) {
  return {
    code: CYCLIC_CROSS_CHUNK_REEXPORT,
    exporter,
    id: importer,
    message: `Export "${exportName}" of module "${relativeId(exporter)}" was reexported through module "${relativeId(reexporter)}" while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.
Either change the import in "${relativeId(importer)}" to point directly to the exporting module or ${preserveModules ? 'do not use "output.preserveModules"' : 'reconfigure "output.manualChunks"'} to ensure these modules end up in the same chunk.`,
    reexporter
  };
}
function errorDeprecation(deprecation, urlSnippet, plugin) {
  return {
    code: DEPRECATED_FEATURE,
    message: deprecation,
    url: getRollupUrl(urlSnippet),
    ...plugin ? { plugin } : {}
  };
}
function errorDuplicatePluginName(plugin) {
  return {
    code: DUPLICATE_PLUGIN_NAME,
    message: `The plugin name ${plugin} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
  };
}
function errorEmptyChunk(chunkName) {
  return {
    code: EMPTY_BUNDLE,
    message: `Generated an empty chunk: "${chunkName}".`,
    names: [chunkName]
  };
}
function errorEval(id) {
  return {
    code: EVAL,
    id,
    message: `Use of eval in "${relativeId(id)}" is strongly discouraged as it poses security risks and may cause issues with minification.`,
    url: getRollupUrl(URL_AVOIDING_EVAL)
  };
}
function errorExternalSyntheticExports(id, importer) {
  return {
    code: EXTERNAL_SYNTHETIC_EXPORTS,
    exporter: id,
    message: `External "${id}" cannot have "syntheticNamedExports" enabled (imported by "${relativeId(importer)}").`
  };
}
function errorFileNameConflict(fileName) {
  return {
    code: FILE_NAME_CONFLICT,
    message: `The emitted file "${fileName}" overwrites a previously emitted file of the same name.`
  };
}
function errorFileReferenceIdNotFoundForFilename(assetReferenceId) {
  return {
    code: FILE_NOT_FOUND,
    message: `Plugin error - Unable to get file name for unknown file "${assetReferenceId}".`
  };
}
function errorIllegalIdentifierAsName(name) {
  return {
    code: ILLEGAL_IDENTIFIER_AS_NAME,
    message: `Given name "${name}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`,
    url: getRollupUrl(URL_OUTPUT_EXTEND)
  };
}
function errorIllegalImportReassignment(name, importingId) {
  return {
    code: ILLEGAL_REASSIGNMENT,
    message: `Illegal reassignment of import "${name}" in "${relativeId(importingId)}".`
  };
}
function errorInconsistentImportAssertions(existingAssertions, newAssertions, source, importer) {
  return {
    code: INCONSISTENT_IMPORT_ASSERTIONS,
    message: `Module "${relativeId(importer)}" tried to import "${relativeId(source)}" with ${formatAssertions(newAssertions)} assertions, but it was already imported elsewhere with ${formatAssertions(existingAssertions)} assertions. Please ensure that import assertions for the same module are always consistent.`
  };
}
function errorInputHookInOutputPlugin(pluginName, hookName) {
  return {
    code: INPUT_HOOK_IN_OUTPUT_PLUGIN,
    message: `The "${hookName}" hook used by the output plugin ${pluginName} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
  };
}
function errorCannotAssignModuleToChunk(moduleId, assignToAlias, currentAlias) {
  return {
    code: INVALID_CHUNK,
    message: `Cannot assign "${relativeId(moduleId)}" to the "${assignToAlias}" chunk as it is already in the "${currentAlias}" chunk.`
  };
}
function errorInvalidExportOptionValue(optionValue) {
  return {
    code: INVALID_EXPORT_OPTION,
    message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${optionValue}".`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function errorIncompatibleExportOptionValue(optionValue, keys2, entryModule) {
  return {
    code: INVALID_EXPORT_OPTION,
    message: `"${optionValue}" was specified for "output.exports", but entry module "${relativeId(entryModule)}" has the following exports: ${printQuotedStringList(keys2)}`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function errorInternalIdCannotBeExternal(source, importer) {
  return {
    code: INVALID_EXTERNAL_ID,
    message: `"${source}" is imported as an external by "${relativeId(importer)}", but is already an existing non-external module id.`
  };
}
function errorInvalidOption(option, urlSnippet, explanation, value) {
  return {
    code: INVALID_OPTION,
    message: `Invalid value ${value === void 0 ? "" : `${JSON.stringify(value)} `}for option "${option}" - ${explanation}.`,
    url: getRollupUrl(urlSnippet)
  };
}
function errorInvalidAddonPluginHook(hook, plugin) {
  return {
    code: INVALID_PLUGIN_HOOK,
    hook,
    message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a string, a function hook or an object with a "handler" string or function.`,
    plugin
  };
}
function errorInvalidFunctionPluginHook(hook, plugin) {
  return {
    code: INVALID_PLUGIN_HOOK,
    hook,
    message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a function hook or an object with a "handler" function.`,
    plugin
  };
}
function errorInvalidRollupPhaseForAddWatchFile() {
  return {
    code: INVALID_ROLLUP_PHASE,
    message: `Cannot call "addWatchFile" after the build has finished.`
  };
}
function errorInvalidRollupPhaseForChunkEmission() {
  return {
    code: INVALID_ROLLUP_PHASE,
    message: `Cannot emit chunks after module loading has finished.`
  };
}
function errorInvalidSetAssetSourceCall() {
  return {
    code: INVALID_SETASSETSOURCE,
    message: `setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.`
  };
}
function errorInvalidFormatForTopLevelAwait(id, format) {
  return {
    code: INVALID_TLA_FORMAT,
    id,
    message: `Module format "${format}" does not support top-level await. Use the "es" or "system" output formats rather.`
  };
}
function errorMissingExport(binding, importingModule, exporter) {
  const isJson = (0, import_node_path.extname)(exporter) === ".json";
  return {
    binding,
    code: MISSING_EXPORT,
    exporter,
    id: importingModule,
    message: `"${binding}" is not exported by "${relativeId(exporter)}", imported by "${relativeId(importingModule)}".${isJson ? " (Note that you need @rollup/plugin-json to import JSON files)" : ""}`,
    url: getRollupUrl(URL_NAME_IS_NOT_EXPORTED)
  };
}
function errorMissingGlobalName(externalId, guess) {
  return {
    code: MISSING_GLOBAL_NAME,
    id: externalId,
    message: `No name was provided for external module "${externalId}" in "output.globals" – guessing "${guess}".`,
    names: [guess],
    url: getRollupUrl(URL_OUTPUT_GLOBALS)
  };
}
function errorImplicitDependantCannotBeExternal(unresolvedId, implicitlyLoadedBefore) {
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" cannot be external.`
  };
}
function errorUnresolvedImplicitDependant(unresolvedId, implicitlyLoadedBefore) {
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" could not be resolved.`
  };
}
function errorImplicitDependantIsNotIncluded(module) {
  const implicitDependencies = [...module.implicitlyLoadedBefore].map((dependency) => relativeId(dependency.id)).sort();
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(module.id)}" that should be implicitly loaded before ${printQuotedStringList(implicitDependencies)} is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
  };
}
function errorMissingNameOptionForIifeExport() {
  return {
    code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
    message: `If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.`,
    url: getRollupUrl(URL_OUTPUT_NAME)
  };
}
function errorMissingNameOptionForUmdExport() {
  return {
    code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
    message: 'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.',
    url: getRollupUrl(URL_OUTPUT_NAME)
  };
}
function errorMissingNodeBuiltins(externalBuiltins) {
  return {
    code: MISSING_NODE_BUILTINS,
    ids: externalBuiltins,
    message: `Creating a browser bundle that depends on Node.js built-in modules (${printQuotedStringList(externalBuiltins)}). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`
  };
}
function errorMissingFileOrDirOption() {
  return {
    code: MISSING_OPTION,
    message: 'You must specify "output.file" or "output.dir" for the build.',
    url: getRollupUrl(URL_OUTPUT_DIR)
  };
}
function errorMixedExport(facadeModuleId, name) {
  return {
    code: MIXED_EXPORTS,
    id: facadeModuleId,
    message: `Entry module "${relativeId(facadeModuleId)}" is using named and default exports together. Consumers of your bundle will have to use \`${name || "chunk"}.default\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning.`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function errorModuleLevelDirective(directive, id) {
  return {
    code: MODULE_LEVEL_DIRECTIVE,
    id,
    message: `Module level directives cause errors when bundled, "${directive}" in "${relativeId(id)}" was ignored.`
  };
}
function errorNamespaceConflict(binding, reexportingModuleId, sources) {
  return {
    binding,
    code: NAMESPACE_CONFLICT,
    ids: sources,
    message: `Conflicting namespaces: "${relativeId(reexportingModuleId)}" re-exports "${binding}" from one of the modules ${printQuotedStringList(sources.map((moduleId) => relativeId(moduleId)))} (will be ignored).`,
    reexporter: reexportingModuleId
  };
}
function errorNoTransformMapOrAstWithoutCode(pluginName) {
  return {
    code: NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE,
    message: `The plugin "${pluginName}" returned a "map" or "ast" without returning a "code". This will be ignored.`
  };
}
function errorParseError(error2, moduleId) {
  let message = error2.message.replace(/ \(\d+:\d+\)$/, "");
  if (moduleId.endsWith(".json")) {
    message += " (Note that you need @rollup/plugin-json to import JSON files)";
  } else if (!moduleId.endsWith(".js")) {
    message += " (Note that you need plugins to import files that are not JavaScript)";
  }
  return {
    cause: error2,
    code: PARSE_ERROR,
    id: moduleId,
    message
  };
}
function errorPluginError(error2, plugin, { hook, id } = {}) {
  if (typeof error2 === "string")
    error2 = { message: error2 };
  if (error2.code && error2.code !== PLUGIN_ERROR) {
    error2.pluginCode = error2.code;
  }
  error2.code = PLUGIN_ERROR;
  error2.plugin = plugin;
  if (hook) {
    error2.hook = hook;
  }
  if (id) {
    error2.id = id;
  }
  return error2;
}
function errorShimmedExport(id, binding) {
  return {
    binding,
    code: SHIMMED_EXPORT,
    exporter: id,
    message: `Missing export "${binding}" has been shimmed in module "${relativeId(id)}".`
  };
}
function errorSourcemapBroken(plugin) {
  return {
    code: SOURCEMAP_BROKEN,
    message: `Sourcemap is likely to be incorrect: a plugin (${plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
    plugin,
    url: getRollupUrl(URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT)
  };
}
function errorConflictingSourcemapSources(filename) {
  return {
    code: SOURCEMAP_BROKEN,
    message: `Multiple conflicting contents for sourcemap source ${filename}`
  };
}
function errorInvalidSourcemapForError(error2, id, column, line, pos) {
  return {
    cause: error2,
    code: SOURCEMAP_ERROR,
    id,
    loc: {
      column,
      file: id,
      line
    },
    message: `Error when using sourcemap for reporting an error: ${error2.message}`,
    pos
  };
}
function errorSyntheticNamedExportsNeedNamespaceExport(id, syntheticNamedExportsOption) {
  return {
    code: SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT,
    exporter: id,
    message: `Module "${relativeId(id)}" that is marked with \`syntheticNamedExports: ${JSON.stringify(syntheticNamedExportsOption)}\` needs ${typeof syntheticNamedExportsOption === "string" && syntheticNamedExportsOption !== "default" ? `an explicit export named "${syntheticNamedExportsOption}"` : "a default export"} that does not reexport an unresolved named export of the same module.`
  };
}
function errorThisIsUndefined() {
  return {
    code: THIS_IS_UNDEFINED,
    message: `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten`,
    url: getRollupUrl(URL_THIS_IS_UNDEFINED)
  };
}
function errorUnexpectedNamedImport(id, imported, isReexport) {
  const importType = isReexport ? "reexport" : "import";
  return {
    code: UNEXPECTED_NAMED_IMPORT,
    exporter: id,
    message: `The named export "${imported}" was ${importType}ed from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". Either remove or change this ${importType} or change the value of the "output.interop" option.`,
    url: getRollupUrl(URL_OUTPUT_INTEROP)
  };
}
function errorUnexpectedNamespaceReexport(id) {
  return {
    code: UNEXPECTED_NAMED_IMPORT,
    exporter: id,
    message: `There was a namespace "*" reexport from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
    url: getRollupUrl(URL_OUTPUT_INTEROP)
  };
}
function errorUnknownOption(optionType, unknownOptions, validOptions) {
  return {
    code: UNKNOWN_OPTION,
    message: `Unknown ${optionType}: ${unknownOptions.join(", ")}. Allowed options: ${validOptions.join(", ")}`
  };
}
function errorEntryCannotBeExternal(unresolvedId) {
  return {
    code: UNRESOLVED_ENTRY,
    message: `Entry module "${relativeId(unresolvedId)}" cannot be external.`
  };
}
function errorUnresolvedEntry(unresolvedId) {
  return {
    code: UNRESOLVED_ENTRY,
    message: `Could not resolve entry module "${relativeId(unresolvedId)}".`
  };
}
function errorUnresolvedImport(source, importer) {
  return {
    code: UNRESOLVED_IMPORT,
    exporter: source,
    id: importer,
    message: `Could not resolve "${source}" from "${relativeId(importer)}"`
  };
}
function errorUnresolvedImportTreatedAsExternal(source, importer) {
  return {
    code: UNRESOLVED_IMPORT,
    exporter: source,
    id: importer,
    message: `"${source}" is imported by "${relativeId(importer)}", but could not be resolved – treating it as an external dependency.`,
    url: getRollupUrl(URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY)
  };
}
function errorUnusedExternalImports(externalId, names, importers) {
  return {
    code: UNUSED_EXTERNAL_IMPORT,
    exporter: externalId,
    ids: importers,
    message: `${printQuotedStringList(names, [
      "is",
      "are"
    ])} imported from external module "${externalId}" but never used in ${printQuotedStringList(importers.map((importer) => relativeId(importer)))}.`,
    names
  };
}
function errorFailedValidation(message) {
  return {
    code: VALIDATION_ERROR,
    message
  };
}
function warnDeprecation(deprecation, urlSnippet, activeDeprecation, options, plugin) {
  warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, options.onwarn, options.strictDeprecations, plugin);
}
function warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, warn, strictDeprecations, plugin) {
  if (activeDeprecation || strictDeprecations) {
    const warning = errorDeprecation(deprecation, urlSnippet, plugin);
    if (strictDeprecations) {
      return error(warning);
    }
    warn(warning);
  }
}
function isLegal(value) {
  if (needsEscape(value)) {
    return false;
  }
  return !illegalCharacters.test(value);
}
function makeLegal(value) {
  value = value.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()).replace(illegalCharacters, "_");
  if (needsEscape(value))
    value = `_${value}`;
  return value || "_";
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var f = n2.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n2, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k];
      }
    });
  });
  return a;
}
function isArray$1(arg) {
  return Array.isArray(arg);
}
function ensureArray$1(thing) {
  if (isArray$1(thing))
    return thing;
  if (thing == null)
    return [];
  return [thing];
}
function getMatcherString(id, resolutionBase) {
  if (resolutionBase === false || (0, import_path.isAbsolute)(id) || id.startsWith("*")) {
    return normalizePath(id);
  }
  const basePath = normalizePath((0, import_path.resolve)(resolutionBase || "")).replace(/[-^$*+?.()|[\]{}]/g, "\\$&");
  return import_path.posix.join(basePath, normalizePath(id));
}
function createInclusionContext() {
  return {
    brokenFlow: false,
    hasBreak: false,
    hasContinue: false,
    includedCallArguments: /* @__PURE__ */ new Set(),
    includedLabels: /* @__PURE__ */ new Set()
  };
}
function createHasEffectsContext() {
  return {
    accessed: new PathTracker(),
    assigned: new PathTracker(),
    brokenFlow: false,
    called: new DiscriminatedPathTracker(),
    hasBreak: false,
    hasContinue: false,
    ignore: {
      breaks: false,
      continues: false,
      labels: /* @__PURE__ */ new Set(),
      returnYield: false,
      this: false
    },
    includedLabels: /* @__PURE__ */ new Set(),
    instantiated: new DiscriminatedPathTracker(),
    replacedVariableInits: /* @__PURE__ */ new Map()
  };
}
function assembleMemberDescriptions(memberDescriptions, inheritedDescriptions = null) {
  return Object.create(inheritedDescriptions, memberDescriptions);
}
function getLiteralMembersForValue(value) {
  if (value instanceof RegExp) {
    return literalRegExpMembers;
  }
  switch (typeof value) {
    case "boolean": {
      return literalBooleanMembers;
    }
    case "number": {
      return literalNumberMembers;
    }
    case "string": {
      return literalStringMembers;
    }
  }
  return /* @__PURE__ */ Object.create(null);
}
function hasMemberEffectWhenCalled(members, memberName, interaction, context) {
  var _a, _b;
  if (typeof memberName !== "string" || !members[memberName]) {
    return true;
  }
  return ((_b = (_a = members[memberName]).hasEffectsWhenCalled) == null ? void 0 : _b.call(_a, interaction, context)) || false;
}
function getMemberReturnExpressionWhenCalled(members, memberName) {
  if (typeof memberName !== "string" || !members[memberName])
    return UNKNOWN_RETURN_EXPRESSION;
  return [members[memberName].returns, false];
}
function skipThrough(node, st, c) {
  c(node, st);
}
function ignore(_node, _st, _c) {
}
function handlePureAnnotationsOfNode(node, state, type = node.type) {
  const { annotations, code } = state;
  let comment = annotations[state.annotationIndex];
  while (comment && node.start >= comment.end) {
    markPureNode(node, comment, code);
    comment = annotations[++state.annotationIndex];
  }
  if (comment && comment.end <= node.end) {
    base$1[type](node, state, handlePureAnnotationsOfNode);
    while ((comment = annotations[state.annotationIndex]) && comment.end <= node.end) {
      ++state.annotationIndex;
      annotateNode(node, comment, false);
    }
  }
}
function markPureNode(node, comment, code) {
  const annotatedNodes = [];
  let invalidAnnotation;
  const codeInBetween = code.slice(comment.end, node.start);
  if (doesNotMatchOutsideComment(codeInBetween, neitherWithespaceNorBrackets)) {
    const parentStart = node.start;
    while (true) {
      annotatedNodes.push(node);
      switch (node.type) {
        case ExpressionStatement$1:
        case ChainExpression$1: {
          node = node.expression;
          continue;
        }
        case SequenceExpression$1: {
          if (doesNotMatchOutsideComment(code.slice(parentStart, node.start), noWhitespace)) {
            node = node.expressions[0];
            continue;
          }
          invalidAnnotation = true;
          break;
        }
        case ConditionalExpression$1: {
          if (doesNotMatchOutsideComment(code.slice(parentStart, node.start), noWhitespace)) {
            node = node.test;
            continue;
          }
          invalidAnnotation = true;
          break;
        }
        case LogicalExpression$1:
        case BinaryExpression$1: {
          if (doesNotMatchOutsideComment(code.slice(parentStart, node.start), noWhitespace)) {
            node = node.left;
            continue;
          }
          invalidAnnotation = true;
          break;
        }
        case CallExpression$1:
        case NewExpression$1: {
          break;
        }
        default: {
          invalidAnnotation = true;
        }
      }
      break;
    }
  } else {
    invalidAnnotation = true;
  }
  if (invalidAnnotation) {
    annotateNode(node, comment, false);
  } else {
    for (const node2 of annotatedNodes) {
      annotateNode(node2, comment, true);
    }
  }
}
function doesNotMatchOutsideComment(code, forbiddenChars) {
  let nextMatch;
  while ((nextMatch = forbiddenChars.exec(code)) !== null) {
    if (nextMatch[0] === "/") {
      const charCodeAfterSlash = code.charCodeAt(forbiddenChars.lastIndex);
      if (charCodeAfterSlash === 42) {
        forbiddenChars.lastIndex = code.indexOf("*/", forbiddenChars.lastIndex + 1) + 2;
        continue;
      } else if (charCodeAfterSlash === 47) {
        forbiddenChars.lastIndex = code.indexOf("\n", forbiddenChars.lastIndex + 1) + 1;
        continue;
      }
    }
    forbiddenChars.lastIndex = 0;
    return false;
  }
  return true;
}
function addAnnotations(comments, esTreeAst, code) {
  const annotations = [];
  const sourceMappingComments = [];
  for (const comment of comments) {
    if (pureCommentRegex.test(comment.value)) {
      annotations.push(comment);
    } else if (SOURCEMAPPING_URL_RE.test(comment.value)) {
      sourceMappingComments.push(comment);
    }
  }
  for (const comment of sourceMappingComments) {
    annotateNode(esTreeAst, comment, false);
  }
  handlePureAnnotationsOfNode(esTreeAst, {
    annotationIndex: 0,
    annotations,
    code
  });
}
function annotateNode(node, comment, valid) {
  const key = valid ? ANNOTATION_KEY : INVALID_COMMENT_KEY;
  const property = node[key];
  if (property) {
    property.push(comment);
  } else {
    node[key] = [comment];
  }
}
function getAndCreateKeys(esTreeNode) {
  keys[esTreeNode.type] = Object.keys(esTreeNode).filter(
    (key) => typeof esTreeNode[key] === "object" && key.charCodeAt(0) !== 95
    /* _ */
  );
  return keys[esTreeNode.type];
}
function toBase64(value) {
  let outString = "";
  do {
    const currentDigit = value % base;
    value = value / base | 0;
    outString = chars[currentDigit] + outString;
  } while (value !== 0);
  return outString;
}
function getSafeName(baseName, usedNames, forbiddenNames) {
  let safeName = baseName;
  let count = 1;
  while (usedNames.has(safeName) || RESERVED_NAMES$1.has(safeName) || (forbiddenNames == null ? void 0 : forbiddenNames.has(safeName))) {
    safeName = `${baseName}$${toBase64(count++)}`;
  }
  usedNames.add(safeName);
  return safeName;
}
function is_reference(node, parent) {
  if (node.type === "MemberExpression") {
    return !node.computed && is_reference(node.object, node);
  }
  if (node.type === "Identifier") {
    if (!parent)
      return true;
    switch (parent.type) {
      case "MemberExpression":
        return parent.computed || node === parent.object;
      case "MethodDefinition":
        return parent.computed;
      case "PropertyDefinition":
        return parent.computed || node === parent.value;
      case "Property":
        return parent.computed || node === parent.value;
      case "ExportSpecifier":
      case "ImportSpecifier":
        return node === parent.local;
      case "LabeledStatement":
      case "BreakStatement":
      case "ContinueStatement":
        return false;
      default:
        return true;
    }
  }
  return false;
}
function getGlobalAtPath(path2) {
  let currentGlobal = knownGlobals;
  for (const pathSegment of path2) {
    if (typeof pathSegment !== "string") {
      return null;
    }
    currentGlobal = currentGlobal[pathSegment];
    if (!currentGlobal) {
      return null;
    }
  }
  return currentGlobal[ValueProperties];
}
function closestParentFunctionOrProgram(node) {
  while (node && !/^Program|Function/.test(node.type)) {
    node = node.parent;
  }
  return node;
}
function treeshakeNode(node, code, start, end) {
  code.remove(start, end);
  if (node.annotations) {
    for (const annotation of node.annotations) {
      if (annotation.start < start) {
        code.remove(annotation.start, annotation.end);
      } else {
        return;
      }
    }
  }
}
function removeAnnotations(node, code) {
  if (!node.annotations && node.parent.type === ExpressionStatement$1) {
    node = node.parent;
  }
  if (node.annotations) {
    for (const annotation of node.annotations) {
      code.remove(annotation.start, annotation.end);
    }
  }
}
function findFirstOccurrenceOutsideComment(code, searchString, start = 0) {
  let searchPos, charCodeAfterSlash;
  searchPos = code.indexOf(searchString, start);
  while (true) {
    start = code.indexOf("/", start);
    if (start === -1 || start >= searchPos)
      return searchPos;
    charCodeAfterSlash = code.charCodeAt(++start);
    ++start;
    start = charCodeAfterSlash === 47 ? code.indexOf("\n", start) + 1 : code.indexOf("*/", start) + 2;
    if (start > searchPos) {
      searchPos = code.indexOf(searchString, start);
    }
  }
}
function findNonWhiteSpace(code, index) {
  NON_WHITESPACE.lastIndex = index;
  const result = NON_WHITESPACE.exec(code);
  return result.index;
}
function findFirstLineBreakOutsideComment(code) {
  let lineBreakPos, charCodeAfterSlash, start = 0;
  lineBreakPos = code.indexOf("\n", start);
  while (true) {
    start = code.indexOf("/", start);
    if (start === -1 || start > lineBreakPos)
      return [lineBreakPos, lineBreakPos + 1];
    charCodeAfterSlash = code.charCodeAt(start + 1);
    if (charCodeAfterSlash === 47)
      return [start, lineBreakPos + 1];
    start = code.indexOf("*/", start + 3) + 2;
    if (start > lineBreakPos) {
      lineBreakPos = code.indexOf("\n", start);
    }
  }
}
function renderStatementList(statements, code, start, end, options) {
  let currentNode, currentNodeStart, currentNodeNeedsBoundaries, nextNodeStart;
  let nextNode = statements[0];
  let nextNodeNeedsBoundaries = !nextNode.included || nextNode.needsBoundaries;
  if (nextNodeNeedsBoundaries) {
    nextNodeStart = start + findFirstLineBreakOutsideComment(code.original.slice(start, nextNode.start))[1];
  }
  for (let nextIndex2 = 1; nextIndex2 <= statements.length; nextIndex2++) {
    currentNode = nextNode;
    currentNodeStart = nextNodeStart;
    currentNodeNeedsBoundaries = nextNodeNeedsBoundaries;
    nextNode = statements[nextIndex2];
    nextNodeNeedsBoundaries = nextNode === void 0 ? false : !nextNode.included || nextNode.needsBoundaries;
    if (currentNodeNeedsBoundaries || nextNodeNeedsBoundaries) {
      nextNodeStart = currentNode.end + findFirstLineBreakOutsideComment(code.original.slice(currentNode.end, nextNode === void 0 ? end : nextNode.start))[1];
      if (currentNode.included) {
        currentNodeNeedsBoundaries ? currentNode.render(code, options, {
          end: nextNodeStart,
          start: currentNodeStart
        }) : currentNode.render(code, options);
      } else {
        treeshakeNode(currentNode, code, currentNodeStart, nextNodeStart);
      }
    } else {
      currentNode.render(code, options);
    }
  }
}
function getCommaSeparatedNodesWithBoundaries(nodes, code, start, end) {
  const splitUpNodes = [];
  let node, nextNodeStart, contentEnd, char;
  let separator = start - 1;
  for (const nextNode of nodes) {
    if (node !== void 0) {
      separator = node.end + findFirstOccurrenceOutsideComment(code.original.slice(node.end, nextNode.start), ",");
    }
    nextNodeStart = contentEnd = separator + 1 + findFirstLineBreakOutsideComment(code.original.slice(separator + 1, nextNode.start))[1];
    while (char = code.original.charCodeAt(nextNodeStart), char === 32 || char === 9 || char === 10 || char === 13)
      nextNodeStart++;
    if (node !== void 0) {
      splitUpNodes.push({
        contentEnd,
        end: nextNodeStart,
        node,
        separator,
        start
      });
    }
    node = nextNode;
    start = nextNodeStart;
  }
  splitUpNodes.push({
    contentEnd: end,
    end,
    node,
    separator: null,
    start
  });
  return splitUpNodes;
}
function removeLineBreaks(code, start, end) {
  while (true) {
    const [removeStart, removeEnd] = findFirstLineBreakOutsideComment(code.original.slice(start, end));
    if (removeStart === -1) {
      break;
    }
    code.remove(start + removeStart, start += removeEnd);
  }
}
function getSystemExportStatement(exportedVariables, { exportNamesByVariable, snippets: { _, getObject, getPropertyAccess } }, modifier = "") {
  if (exportedVariables.length === 1 && exportNamesByVariable.get(exportedVariables[0]).length === 1) {
    const variable = exportedVariables[0];
    return `exports('${exportNamesByVariable.get(variable)}',${_}${variable.getName(getPropertyAccess)}${modifier})`;
  } else {
    const fields = [];
    for (const variable of exportedVariables) {
      for (const exportName of exportNamesByVariable.get(variable)) {
        fields.push([exportName, variable.getName(getPropertyAccess) + modifier]);
      }
    }
    return `exports(${getObject(fields, { lineBreakIndent: null })})`;
  }
}
function renderSystemExportExpression(exportedVariable, expressionStart, expressionEnd, code, { exportNamesByVariable, snippets: { _ } }) {
  code.prependRight(expressionStart, `exports('${exportNamesByVariable.get(exportedVariable)}',${_}`);
  code.appendLeft(expressionEnd, ")");
}
function renderSystemExportFunction(exportedVariables, expressionStart, expressionEnd, needsParens, code, options) {
  const { _, getDirectReturnIifeLeft } = options.snippets;
  code.prependRight(expressionStart, getDirectReturnIifeLeft(["v"], `${getSystemExportStatement(exportedVariables, options)},${_}v`, { needsArrowReturnParens: true, needsWrappedFunction: needsParens }));
  code.appendLeft(expressionEnd, ")");
}
function renderSystemExportSequenceAfterExpression(exportedVariable, expressionStart, expressionEnd, needsParens, code, options) {
  const { _, getPropertyAccess } = options.snippets;
  code.appendLeft(expressionEnd, `,${_}${getSystemExportStatement([exportedVariable], options)},${_}${exportedVariable.getName(getPropertyAccess)}`);
  if (needsParens) {
    code.prependRight(expressionStart, "(");
    code.appendLeft(expressionEnd, ")");
  }
}
function renderSystemExportSequenceBeforeExpression(exportedVariable, expressionStart, expressionEnd, needsParens, code, options, modifier) {
  const { _ } = options.snippets;
  code.prependRight(expressionStart, `${getSystemExportStatement([exportedVariable], options, modifier)},${_}`);
  if (needsParens) {
    code.prependRight(expressionStart, "(");
    code.appendLeft(expressionEnd, ")");
  }
}
function renderCallArguments(code, options, node) {
  if (node.arguments.length > 0) {
    if (node.arguments[node.arguments.length - 1].included) {
      for (const argument of node.arguments) {
        argument.render(code, options);
      }
    } else {
      let lastIncludedIndex = node.arguments.length - 2;
      while (lastIncludedIndex >= 0 && !node.arguments[lastIncludedIndex].included) {
        lastIncludedIndex--;
      }
      if (lastIncludedIndex >= 0) {
        for (let index = 0; index <= lastIncludedIndex; index++) {
          node.arguments[index].render(code, options);
        }
        code.remove(findFirstOccurrenceOutsideComment(code.original, ",", node.arguments[lastIncludedIndex].end), node.end - 1);
      } else {
        code.remove(findFirstOccurrenceOutsideComment(code.original, "(", node.callee.end) + 1, node.end - 1);
      }
    }
  }
}
function getResolvablePropertyKey(memberExpression) {
  return memberExpression.computed ? getResolvableComputedPropertyKey(memberExpression.property) : memberExpression.property.name;
}
function getResolvableComputedPropertyKey(propertyKey) {
  if (propertyKey instanceof Literal) {
    return String(propertyKey.value);
  }
  return null;
}
function getPathIfNotComputed(memberExpression) {
  const nextPathKey = memberExpression.propertyKey;
  const object = memberExpression.object;
  if (typeof nextPathKey === "string") {
    if (object instanceof Identifier) {
      return [
        { key: object.name, pos: object.start },
        { key: nextPathKey, pos: memberExpression.property.start }
      ];
    }
    if (object instanceof MemberExpression) {
      const parentPath = getPathIfNotComputed(object);
      return parentPath && [...parentPath, { key: nextPathKey, pos: memberExpression.property.start }];
    }
  }
  return null;
}
function getStringFromPath(path2) {
  let pathString = path2[0].key;
  for (let index = 1; index < path2.length; index++) {
    pathString += "." + path2[index].key;
  }
  return pathString;
}
function resolveNamespaceVariables(baseVariable, path2, astContext) {
  if (path2.length === 0)
    return baseVariable;
  if (!baseVariable.isNamespace || baseVariable instanceof ExternalVariable)
    return null;
  const exportName = path2[0].key;
  const variable = baseVariable.context.traceExport(exportName);
  if (!variable) {
    if (path2.length === 1) {
      const fileName = baseVariable.context.fileName;
      astContext.warn(errorMissingExport(exportName, astContext.module.id, fileName), path2[0].pos);
      return "undefined";
    }
    return null;
  }
  return resolveNamespaceVariables(variable, path2.slice(1), astContext);
}
function hasLoopBodyEffects(context, body) {
  const { brokenFlow, hasBreak, hasContinue, ignore: ignore2 } = context;
  const { breaks, continues } = ignore2;
  ignore2.breaks = true;
  ignore2.continues = true;
  context.hasBreak = false;
  context.hasContinue = false;
  if (body.hasEffects(context))
    return true;
  ignore2.breaks = breaks;
  ignore2.continues = continues;
  context.hasBreak = hasBreak;
  context.hasContinue = hasContinue;
  context.brokenFlow = brokenFlow;
  return false;
}
function includeLoopBody(context, body, includeChildrenRecursively) {
  const { brokenFlow, hasBreak, hasContinue } = context;
  context.hasBreak = false;
  context.hasContinue = false;
  body.include(context, includeChildrenRecursively, { asSingleStatement: true });
  context.hasBreak = hasBreak;
  context.hasContinue = hasContinue;
  context.brokenFlow = brokenFlow;
}
function getDeclarationStart(code, start) {
  return findNonWhiteSpace(code, findFirstOccurrenceOutsideComment(code, "default", start) + 7);
}
function getFunctionIdInsertPosition(code, start) {
  const declarationEnd = findFirstOccurrenceOutsideComment(code, "function", start) + "function".length;
  code = code.slice(declarationEnd, findFirstOccurrenceOutsideComment(code, "(", declarationEnd));
  const generatorStarPos = findFirstOccurrenceOutsideComment(code, "*");
  if (generatorStarPos === -1) {
    return declarationEnd;
  }
  return declarationEnd + generatorStarPos + 1;
}
function getToStringTagValue(getObject) {
  return getObject([["value", "'Module'"]], {
    lineBreakIndent: null
  });
}
function isReassignedExportsMember(variable, exportNamesByVariable) {
  return variable.renderBaseName !== null && exportNamesByVariable.has(variable) && variable.isReassigned;
}
function getInteropHelper(resolution, exportMode, interop) {
  return exportMode === "external" ? namespaceInteropHelpersByInteropType[interop(resolution instanceof ExternalModule ? resolution.id : null)] : exportMode === "default" ? INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE : null;
}
function getDeterministicObjectDestructure(objectPattern) {
  const variables = [];
  for (const property of objectPattern.properties) {
    if (property.type === "RestElement" || property.computed || property.key.type !== "Identifier")
      return;
    variables.push(property.key.name);
  }
  return variables;
}
function getOriginalLocation(sourcemapChain, location) {
  const filteredSourcemapChain = sourcemapChain.filter((sourcemap) => !!sourcemap.mappings);
  traceSourcemap:
    while (filteredSourcemapChain.length > 0) {
      const sourcemap = filteredSourcemapChain.pop();
      const line = sourcemap.mappings[location.line - 1];
      if (line) {
        const filteredLine = line.filter((segment) => segment.length > 1);
        const lastSegment = filteredLine[filteredLine.length - 1];
        for (const segment of filteredLine) {
          if (segment[0] >= location.column || segment === lastSegment) {
            location = {
              column: segment[3],
              line: segment[2] + 1
            };
            continue traceSourcemap;
          }
        }
      }
      throw new Error("Can't resolve original location of error.");
    }
  return location;
}
function areAllDeclarationsIncludedAndNotExported(declarations, exportNamesByVariable) {
  for (const declarator of declarations) {
    if (!declarator.id.included)
      return false;
    if (declarator.id.type === Identifier$1) {
      if (exportNamesByVariable.has(declarator.id.variable))
        return false;
    } else {
      const exportedVariables = [];
      declarator.id.addExportedVariables(exportedVariables, exportNamesByVariable);
      if (exportedVariables.length > 0)
        return false;
    }
  }
  return true;
}
function gatherSystemExportsAndGetSingleExport(separatedNodes, options, aggregatedSystemExports) {
  var _a;
  let singleSystemExport = null;
  if (options.format === "system") {
    for (const { node } of separatedNodes) {
      if (node.id instanceof Identifier && node.init && aggregatedSystemExports.length === 0 && ((_a = options.exportNamesByVariable.get(node.id.variable)) == null ? void 0 : _a.length) === 1) {
        singleSystemExport = node.id.variable;
        aggregatedSystemExports.push(singleSystemExport);
      } else {
        node.id.addExportedVariables(aggregatedSystemExports, options.exportNamesByVariable);
      }
    }
    if (aggregatedSystemExports.length > 1) {
      singleSystemExport = null;
    } else if (singleSystemExport) {
      aggregatedSystemExports.length = 0;
    }
  }
  return singleSystemExport;
}
function getId(m) {
  return m.id;
}
function getAssertionsFromImportExpression(node) {
  var _a, _b, _c;
  const assertProperty = (_c = (_b = (_a = node.arguments) == null ? void 0 : _a[0]) == null ? void 0 : _b.properties.find((property) => getPropertyKey(property) === "assert")) == null ? void 0 : _c.value;
  if (!assertProperty) {
    return EMPTY_OBJECT;
  }
  const assertFields = assertProperty.properties.map((property) => {
    const key = getPropertyKey(property);
    if (typeof key === "string" && typeof property.value.value === "string") {
      return [key, property.value.value];
    }
    return null;
  }).filter((property) => !!property);
  if (assertFields.length > 0) {
    return Object.fromEntries(assertFields);
  }
  return EMPTY_OBJECT;
}
function getAssertionsFromImportExportDeclaration(assertions) {
  return (assertions == null ? void 0 : assertions.length) ? Object.fromEntries(assertions.map((assertion) => [getPropertyKey(assertion), assertion.value.value])) : EMPTY_OBJECT;
}
function doAssertionsDiffer(assertionA, assertionB) {
  const keysA = Object.keys(assertionA);
  return keysA.length !== Object.keys(assertionB).length || keysA.some((key) => assertionA[key] !== assertionB[key]);
}
function getPersistedLabel(label, level) {
  switch (level) {
    case 1: {
      return `# ${label}`;
    }
    case 2: {
      return `## ${label}`;
    }
    case 3: {
      return label;
    }
    default: {
      return `${"  ".repeat(level - 4)}- ${label}`;
    }
  }
}
function timeStartImpl(label, level = 3) {
  label = getPersistedLabel(label, level);
  const startMemory = import_node_process.default.memoryUsage().heapUsed;
  const startTime = import_node_perf_hooks.performance.now();
  const timer = timers.get(label);
  if (timer === void 0) {
    timers.set(label, {
      memory: 0,
      startMemory,
      startTime,
      time: 0,
      totalMemory: 0
    });
  } else {
    timer.startMemory = startMemory;
    timer.startTime = startTime;
  }
}
function timeEndImpl(label, level = 3) {
  label = getPersistedLabel(label, level);
  const timer = timers.get(label);
  if (timer !== void 0) {
    const currentMemory = import_node_process.default.memoryUsage().heapUsed;
    timer.memory += currentMemory - timer.startMemory;
    timer.time += import_node_perf_hooks.performance.now() - timer.startTime;
    timer.totalMemory = Math.max(timer.totalMemory, currentMemory);
  }
}
function getTimings() {
  const newTimings = {};
  for (const [label, { memory, time, totalMemory }] of timers) {
    newTimings[label] = [time, memory, totalMemory];
  }
  return newTimings;
}
function getPluginWithTimers(plugin, index) {
  for (const hook of TIMED_PLUGIN_HOOKS) {
    if (hook in plugin) {
      let timerLabel = `plugin ${index}`;
      if (plugin.name) {
        timerLabel += ` (${plugin.name})`;
      }
      timerLabel += ` - ${hook}`;
      const handler = function(...parameters) {
        timeStart(timerLabel, 4);
        const result = hookFunction.apply(this, parameters);
        timeEnd(timerLabel, 4);
        return result;
      };
      let hookFunction;
      if (typeof plugin[hook].handler === "function") {
        hookFunction = plugin[hook].handler;
        plugin[hook].handler = handler;
      } else {
        hookFunction = plugin[hook];
        plugin[hook] = handler;
      }
    }
  }
  return plugin;
}
function initialiseTimers(inputOptions) {
  if (inputOptions.perf) {
    timers = /* @__PURE__ */ new Map();
    timeStart = timeStartImpl;
    timeEnd = timeEndImpl;
    inputOptions.plugins = inputOptions.plugins.map(getPluginWithTimers);
  } else {
    timeStart = doNothing;
    timeEnd = doNothing;
  }
}
function markModuleAndImpureDependenciesAsExecuted(baseModule) {
  baseModule.isExecuted = true;
  const modules = [baseModule];
  const visitedModules = /* @__PURE__ */ new Set();
  for (const module of modules) {
    for (const dependency of [...module.dependencies, ...module.implicitlyLoadedBefore]) {
      if (!(dependency instanceof ExternalModule) && !dependency.isExecuted && (dependency.info.moduleSideEffects || module.implicitlyLoadedBefore.has(dependency)) && !visitedModules.has(dependency.id)) {
        dependency.isExecuted = true;
        visitedModules.add(dependency.id);
        modules.push(dependency);
      }
    }
  }
}
function getVariableForExportNameRecursive(target, name, importerForSideEffects, isExportAllSearch, searchedNamesAndModules = /* @__PURE__ */ new Map()) {
  const searchedModules = searchedNamesAndModules.get(name);
  if (searchedModules) {
    if (searchedModules.has(target)) {
      return isExportAllSearch ? [null] : error(errorCircularReexport(name, target.id));
    }
    searchedModules.add(target);
  } else {
    searchedNamesAndModules.set(name, /* @__PURE__ */ new Set([target]));
  }
  return target.getVariableForExportName(name, {
    importerForSideEffects,
    isExportAllSearch,
    searchedNamesAndModules
  });
}
function getAndExtendSideEffectModules(variable, module) {
  const sideEffectModules = getOrCreate(module.sideEffectDependenciesByVariable, variable, getNewSet);
  let currentVariable = variable;
  const referencedVariables = /* @__PURE__ */ new Set([currentVariable]);
  while (true) {
    const importingModule = currentVariable.module;
    currentVariable = currentVariable instanceof ExportDefaultVariable ? currentVariable.getDirectOriginalVariable() : currentVariable instanceof SyntheticNamedExportVariable ? currentVariable.syntheticNamespace : null;
    if (!currentVariable || referencedVariables.has(currentVariable)) {
      break;
    }
    referencedVariables.add(currentVariable);
    sideEffectModules.add(importingModule);
    const originalSideEffects = importingModule.sideEffectDependenciesByVariable.get(currentVariable);
    if (originalSideEffects) {
      for (const module2 of originalSideEffects) {
        sideEffectModules.add(module2);
      }
    }
  }
  return sideEffectModules;
}
function setAlternativeExporterIfCyclic(variable, importer, reexporter) {
  if (variable.module instanceof Module && variable.module !== reexporter) {
    const exporterCycles = variable.module.cycles;
    if (exporterCycles.size > 0) {
      const importerCycles = reexporter.cycles;
      for (const cycleSymbol of importerCycles) {
        if (exporterCycles.has(cycleSymbol)) {
          importer.alternativeReexportModules.set(variable, reexporter);
          break;
        }
      }
    }
  }
}
function removeJsExtension(name) {
  return name.endsWith(".js") ? name.slice(0, -3) : name;
}
function getCompleteAmdId(options, chunkId) {
  if (options.autoId) {
    return `${options.basePath ? options.basePath + "/" : ""}${removeJsExtension(chunkId)}`;
  }
  return options.id ?? "";
}
function getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, mechanism = "return ") {
  const { _, getDirectReturnFunction, getFunctionIntro, getPropertyAccess, n: n2, s } = snippets;
  if (!namedExportsMode) {
    return `${n2}${n2}${mechanism}${getSingleDefaultExport(exports, dependencies, interop, externalLiveBindings, getPropertyAccess)};`;
  }
  let exportBlock = "";
  for (const { defaultVariableName, importPath, isChunk, name, namedExportsMode: depNamedExportsMode, namespaceVariableName, reexports } of dependencies) {
    if (reexports && namedExportsMode) {
      for (const specifier of reexports) {
        if (specifier.reexported !== "*") {
          const importName = getReexportedImportName(name, specifier.imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, importPath, externalLiveBindings, getPropertyAccess);
          if (exportBlock)
            exportBlock += n2;
          if (specifier.imported !== "*" && specifier.needsLiveBinding) {
            const [left, right] = getDirectReturnFunction([], {
              functionReturn: true,
              lineBreakIndent: null,
              name: null
            });
            exportBlock += `Object.defineProperty(exports,${_}'${specifier.reexported}',${_}{${n2}${t}enumerable:${_}true,${n2}${t}get:${_}${left}${importName}${right}${n2}});`;
          } else {
            exportBlock += `exports${getPropertyAccess(specifier.reexported)}${_}=${_}${importName};`;
          }
        }
      }
    }
  }
  for (const { exported, local } of exports) {
    const lhs = `exports${getPropertyAccess(exported)}`;
    const rhs = local;
    if (lhs !== rhs) {
      if (exportBlock)
        exportBlock += n2;
      exportBlock += `${lhs}${_}=${_}${rhs};`;
    }
  }
  for (const { name, reexports } of dependencies) {
    if (reexports && namedExportsMode) {
      for (const specifier of reexports) {
        if (specifier.reexported === "*") {
          if (exportBlock)
            exportBlock += n2;
          const copyPropertyIfNecessary = `{${n2}${t}if${_}(k${_}!==${_}'default'${_}&&${_}!exports.hasOwnProperty(k))${_}${getDefineProperty(name, specifier.needsLiveBinding, t, snippets)}${s}${n2}}`;
          exportBlock += `Object.keys(${name}).forEach(${getFunctionIntro(["k"], {
            isAsync: false,
            name: null
          })}${copyPropertyIfNecessary});`;
        }
      }
    }
  }
  if (exportBlock) {
    return `${n2}${n2}${exportBlock}`;
  }
  return "";
}
function getSingleDefaultExport(exports, dependencies, interop, externalLiveBindings, getPropertyAccess) {
  if (exports.length > 0) {
    return exports[0].local;
  } else {
    for (const { defaultVariableName, importPath, isChunk, name, namedExportsMode: depNamedExportsMode, namespaceVariableName, reexports } of dependencies) {
      if (reexports) {
        return getReexportedImportName(name, reexports[0].imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, importPath, externalLiveBindings, getPropertyAccess);
      }
    }
  }
}
function getReexportedImportName(moduleVariableName, imported, depNamedExportsMode, isChunk, defaultVariableName, namespaceVariableName, interop, moduleId, externalLiveBindings, getPropertyAccess) {
  if (imported === "default") {
    if (!isChunk) {
      const moduleInterop = interop(moduleId);
      const variableName = defaultInteropHelpersByInteropType[moduleInterop] ? defaultVariableName : moduleVariableName;
      return isDefaultAProperty(moduleInterop, externalLiveBindings) ? `${variableName}${getPropertyAccess("default")}` : variableName;
    }
    return depNamedExportsMode ? `${moduleVariableName}${getPropertyAccess("default")}` : moduleVariableName;
  }
  if (imported === "*") {
    return (isChunk ? !depNamedExportsMode : namespaceInteropHelpersByInteropType[interop(moduleId)]) ? namespaceVariableName : moduleVariableName;
  }
  return `${moduleVariableName}${getPropertyAccess(imported)}`;
}
function getEsModuleValue(getObject) {
  return getObject([["value", "true"]], {
    lineBreakIndent: null
  });
}
function getNamespaceMarkers(hasNamedExports, addEsModule, addNamespaceToStringTag, { _, getObject }) {
  if (hasNamedExports) {
    if (addEsModule) {
      if (addNamespaceToStringTag) {
        return `Object.defineProperties(exports,${_}${getObject([
          ["__esModule", getEsModuleValue(getObject)],
          [null, `[Symbol.toStringTag]:${_}${getToStringTagValue(getObject)}`]
        ], {
          lineBreakIndent: null
        })});`;
      }
      return `Object.defineProperty(exports,${_}'__esModule',${_}${getEsModuleValue(getObject)});`;
    }
    if (addNamespaceToStringTag) {
      return `Object.defineProperty(exports,${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)});`;
    }
  }
  return "";
}
function getInteropBlock(dependencies, interop, externalLiveBindings, freeze, namespaceToStringTag, accessedGlobals, indent, snippets) {
  const { _, cnst, n: n2 } = snippets;
  const neededInteropHelpers = /* @__PURE__ */ new Set();
  const interopStatements = [];
  const addInteropStatement = (helperVariableName, helper, dependencyVariableName) => {
    neededInteropHelpers.add(helper);
    interopStatements.push(`${cnst} ${helperVariableName}${_}=${_}/*#__PURE__*/${helper}(${dependencyVariableName});`);
  };
  for (const { defaultVariableName, imports, importPath, isChunk, name, namedExportsMode, namespaceVariableName, reexports } of dependencies) {
    if (isChunk) {
      for (const { imported, reexported } of [
        ...imports || [],
        ...reexports || []
      ]) {
        if (imported === "*" && reexported !== "*") {
          if (!namedExportsMode) {
            addInteropStatement(namespaceVariableName, INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE, name);
          }
          break;
        }
      }
    } else {
      const moduleInterop = interop(importPath);
      let hasDefault = false;
      let hasNamespace = false;
      for (const { imported, reexported } of [
        ...imports || [],
        ...reexports || []
      ]) {
        let helper;
        let variableName;
        if (imported === "default") {
          if (!hasDefault) {
            hasDefault = true;
            if (defaultVariableName !== namespaceVariableName) {
              variableName = defaultVariableName;
              helper = defaultInteropHelpersByInteropType[moduleInterop];
            }
          }
        } else if (imported === "*" && reexported !== "*" && !hasNamespace) {
          hasNamespace = true;
          helper = namespaceInteropHelpersByInteropType[moduleInterop];
          variableName = namespaceVariableName;
        }
        if (helper) {
          addInteropStatement(variableName, helper, name);
        }
      }
    }
  }
  return `${getHelpersBlock(neededInteropHelpers, accessedGlobals, indent, snippets, externalLiveBindings, freeze, namespaceToStringTag)}${interopStatements.length > 0 ? `${interopStatements.join(n2)}${n2}${n2}` : ""}`;
}
function addJsExtension(name) {
  return name.endsWith(".js") ? name : name + ".js";
}
function updateExtensionForRelativeAmdId(id, forceJsExtensionForImports) {
  if (id[0] !== ".") {
    return id;
  }
  return forceJsExtensionForImports ? addJsExtension(id) : removeJsExtension(id);
}
function warnOnBuiltins(warn, dependencies) {
  const externalBuiltins = dependencies.map(({ importPath }) => importPath).filter((importPath) => nodeBuiltins.has(importPath) || importPath.startsWith("node:"));
  if (externalBuiltins.length === 0)
    return;
  warn(errorMissingNodeBuiltins(externalBuiltins));
}
function amd(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, id, indent: t, intro, isEntryFacade, isModuleFacade, namedExportsMode, outro, snippets, onwarn }, { amd: amd2, esModule, externalLiveBindings, freeze, interop, namespaceToStringTag, strict }) {
  warnOnBuiltins(onwarn, dependencies);
  const deps = dependencies.map((m) => `'${updateExtensionForRelativeAmdId(m.importPath, amd2.forceJsExtensionForImports)}'`);
  const parameters = dependencies.map((m) => m.name);
  const { n: n2, getNonArrowFunctionIntro, _ } = snippets;
  if (namedExportsMode && hasExports) {
    parameters.unshift(`exports`);
    deps.unshift(`'exports'`);
  }
  if (accessedGlobals.has("require")) {
    parameters.unshift("require");
    deps.unshift(`'require'`);
  }
  if (accessedGlobals.has("module")) {
    parameters.unshift("module");
    deps.unshift(`'module'`);
  }
  const completeAmdId = getCompleteAmdId(amd2, id);
  const defineParameters = (completeAmdId ? `'${completeAmdId}',${_}` : ``) + (deps.length > 0 ? `[${deps.join(`,${_}`)}],${_}` : ``);
  const useStrict = strict ? `${_}'use strict';` : "";
  magicString.prepend(`${intro}${getInteropBlock(dependencies, interop, externalLiveBindings, freeze, namespaceToStringTag, accessedGlobals, t, snippets)}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, isEntryFacade && (esModule === true || esModule === "if-default-prop" && hasDefaultExport), isModuleFacade && namespaceToStringTag, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).indent(t).prepend(`${amd2.define}(${defineParameters}(${getNonArrowFunctionIntro(parameters, {
    isAsync: false,
    name: null
  })}{${useStrict}${n2}${n2}`).append(`${n2}${n2}}));`);
}
function cjs(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, indent: t, intro, isEntryFacade, isModuleFacade, namedExportsMode, outro, snippets }, { compact, esModule, externalLiveBindings, freeze, interop, namespaceToStringTag, strict }) {
  const { _, n: n2 } = snippets;
  const useStrict = strict ? `'use strict';${n2}${n2}` : "";
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, isEntryFacade && (esModule === true || esModule === "if-default-prop" && hasDefaultExport), isModuleFacade && namespaceToStringTag, snippets);
  if (namespaceMarkers) {
    namespaceMarkers += n2 + n2;
  }
  const importBlock = getImportBlock$1(dependencies, snippets, compact);
  const interopBlock = getInteropBlock(dependencies, interop, externalLiveBindings, freeze, namespaceToStringTag, accessedGlobals, t, snippets);
  magicString.prepend(`${useStrict}${intro}${namespaceMarkers}${importBlock}${interopBlock}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings, `module.exports${_}=${_}`);
  magicString.append(`${exportBlock}${outro}`);
}
function getImportBlock$1(dependencies, { _, cnst, n: n2 }, compact) {
  let importBlock = "";
  let definingVariable = false;
  for (const { importPath, name, reexports, imports } of dependencies) {
    if (!reexports && !imports) {
      if (importBlock) {
        importBlock += compact && !definingVariable ? "," : `;${n2}`;
      }
      definingVariable = false;
      importBlock += `require('${importPath}')`;
    } else {
      importBlock += compact && definingVariable ? "," : `${importBlock ? `;${n2}` : ""}${cnst} `;
      definingVariable = true;
      importBlock += `${name}${_}=${_}require('${importPath}')`;
    }
  }
  if (importBlock) {
    return `${importBlock};${n2}${n2}`;
  }
  return "";
}
function es(magicString, { accessedGlobals, indent: t, intro, outro, dependencies, exports, snippets }, { externalLiveBindings, freeze, namespaceToStringTag }) {
  const { n: n2 } = snippets;
  const importBlock = getImportBlock(dependencies, snippets);
  if (importBlock.length > 0)
    intro += importBlock.join(n2) + n2 + n2;
  intro += getHelpersBlock(null, accessedGlobals, t, snippets, externalLiveBindings, freeze, namespaceToStringTag);
  if (intro)
    magicString.prepend(intro);
  const exportBlock = getExportBlock(exports, snippets);
  if (exportBlock.length > 0)
    magicString.append(n2 + n2 + exportBlock.join(n2).trim());
  if (outro)
    magicString.append(outro);
  magicString.trim();
}
function getImportBlock(dependencies, { _ }) {
  const importBlock = [];
  for (const { importPath, reexports, imports, name, assertions } of dependencies) {
    const assertion = assertions ? `${_}assert${_}${assertions}` : "";
    const pathWithAssertion = `'${importPath}'${assertion};`;
    if (!reexports && !imports) {
      importBlock.push(`import${_}${pathWithAssertion}`);
      continue;
    }
    if (imports) {
      let defaultImport = null;
      let starImport = null;
      const importedNames = [];
      for (const specifier of imports) {
        if (specifier.imported === "default") {
          defaultImport = specifier;
        } else if (specifier.imported === "*") {
          starImport = specifier;
        } else {
          importedNames.push(specifier);
        }
      }
      if (starImport) {
        importBlock.push(`import${_}*${_}as ${starImport.local} from${_}${pathWithAssertion}`);
      }
      if (defaultImport && importedNames.length === 0) {
        importBlock.push(`import ${defaultImport.local} from${_}${pathWithAssertion}`);
      } else if (importedNames.length > 0) {
        importBlock.push(`import ${defaultImport ? `${defaultImport.local},${_}` : ""}{${_}${importedNames.map((specifier) => specifier.imported === specifier.local ? specifier.imported : `${specifier.imported} as ${specifier.local}`).join(`,${_}`)}${_}}${_}from${_}${pathWithAssertion}`);
      }
    }
    if (reexports) {
      let starExport = null;
      const namespaceReexports = [];
      const namedReexports = [];
      for (const specifier of reexports) {
        if (specifier.reexported === "*") {
          starExport = specifier;
        } else if (specifier.imported === "*") {
          namespaceReexports.push(specifier);
        } else {
          namedReexports.push(specifier);
        }
      }
      if (starExport) {
        importBlock.push(`export${_}*${_}from${_}${pathWithAssertion}`);
      }
      if (namespaceReexports.length > 0) {
        if (!imports || !imports.some((specifier) => specifier.imported === "*" && specifier.local === name)) {
          importBlock.push(`import${_}*${_}as ${name} from${_}${pathWithAssertion}`);
        }
        for (const specifier of namespaceReexports) {
          importBlock.push(`export${_}{${_}${name === specifier.reexported ? name : `${name} as ${specifier.reexported}`} };`);
        }
      }
      if (namedReexports.length > 0) {
        importBlock.push(`export${_}{${_}${namedReexports.map((specifier) => specifier.imported === specifier.reexported ? specifier.imported : `${specifier.imported} as ${specifier.reexported}`).join(`,${_}`)}${_}}${_}from${_}${pathWithAssertion}`);
      }
    }
  }
  return importBlock;
}
function getExportBlock(exports, { _, cnst }) {
  const exportBlock = [];
  const exportDeclaration = [];
  for (const specifier of exports) {
    if (specifier.expression) {
      exportBlock.push(`${cnst} ${specifier.local}${_}=${_}${specifier.expression};`);
    }
    exportDeclaration.push(specifier.exported === specifier.local ? specifier.local : `${specifier.local} as ${specifier.exported}`);
  }
  if (exportDeclaration.length > 0) {
    exportBlock.push(`export${_}{${_}${exportDeclaration.join(`,${_}`)}${_}};`);
  }
  return exportBlock;
}
function setupNamespace(name, root, globals, { _, getPropertyAccess, s }, compact) {
  const parts = name.split(".");
  parts[0] = (typeof globals === "function" ? globals(parts[0]) : globals[parts[0]]) || parts[0];
  parts.pop();
  let propertyPath = root;
  return parts.map((part) => {
    propertyPath += getPropertyAccess(part);
    return `${propertyPath}${_}=${_}${propertyPath}${_}||${_}{}${s}`;
  }).join(compact ? "," : "\n") + (compact && parts.length > 0 ? ";" : "\n");
}
function assignToDeepVariable(deepName, root, globals, assignment, { _, getPropertyAccess }) {
  const parts = deepName.split(".");
  parts[0] = (typeof globals === "function" ? globals(parts[0]) : globals[parts[0]]) || parts[0];
  const last = parts.pop();
  let propertyPath = root;
  let deepAssignment = [
    ...parts.map((part) => {
      propertyPath += getPropertyAccess(part);
      return `${propertyPath}${_}=${_}${propertyPath}${_}||${_}{}`;
    }),
    `${propertyPath}${getPropertyAccess(last)}`
  ].join(`,${_}`) + `${_}=${_}${assignment}`;
  if (parts.length > 0) {
    deepAssignment = `(${deepAssignment})`;
  }
  return deepAssignment;
}
function trimEmptyImports(dependencies) {
  let index = dependencies.length;
  while (index--) {
    const { imports, reexports } = dependencies[index];
    if (imports || reexports) {
      return dependencies.slice(0, index + 1);
    }
  }
  return [];
}
function iife(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, indent: t, intro, namedExportsMode, outro, snippets, onwarn }, { compact, esModule, extend: extend2, freeze, externalLiveBindings, globals, interop, name, namespaceToStringTag, strict }) {
  const { _, getNonArrowFunctionIntro, getPropertyAccess, n: n2 } = snippets;
  const isNamespaced = name && name.includes(".");
  const useVariableAssignment = !extend2 && !isNamespaced;
  if (name && useVariableAssignment && !isLegal(name)) {
    return error(errorIllegalIdentifierAsName(name));
  }
  warnOnBuiltins(onwarn, dependencies);
  const external = trimEmptyImports(dependencies);
  const deps = external.map((dep) => dep.globalName || "null");
  const parameters = external.map((m) => m.name);
  if (hasExports && !name) {
    onwarn(errorMissingNameOptionForIifeExport());
  }
  if (namedExportsMode && hasExports) {
    if (extend2) {
      deps.unshift(`this${keypath(name, getPropertyAccess)}${_}=${_}this${keypath(name, getPropertyAccess)}${_}||${_}{}`);
      parameters.unshift("exports");
    } else {
      deps.unshift("{}");
      parameters.unshift("exports");
    }
  }
  const useStrict = strict ? `${t}'use strict';${n2}` : "";
  const interopBlock = getInteropBlock(dependencies, interop, externalLiveBindings, freeze, namespaceToStringTag, accessedGlobals, t, snippets);
  magicString.prepend(`${intro}${interopBlock}`);
  let wrapperIntro = `(${getNonArrowFunctionIntro(parameters, {
    isAsync: false,
    name: null
  })}{${n2}${useStrict}${n2}`;
  if (hasExports) {
    if (name && !(extend2 && namedExportsMode)) {
      wrapperIntro = (useVariableAssignment ? `var ${name}` : `this${keypath(name, getPropertyAccess)}`) + `${_}=${_}${wrapperIntro}`;
    }
    if (isNamespaced) {
      wrapperIntro = setupNamespace(name, "this", globals, snippets, compact) + wrapperIntro;
    }
  }
  let wrapperOutro = `${n2}${n2}})(${deps.join(`,${_}`)});`;
  if (hasExports && !extend2 && namedExportsMode) {
    wrapperOutro = `${n2}${n2}${t}return exports;${wrapperOutro}`;
  }
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, esModule === true || esModule === "if-default-prop" && hasDefaultExport, namespaceToStringTag, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).indent(t).prepend(wrapperIntro).append(wrapperOutro);
}
function system(magicString, { accessedGlobals, dependencies, exports, hasExports, indent: t, intro, snippets, outro, usesTopLevelAwait }, { externalLiveBindings, freeze, name, namespaceToStringTag, strict, systemNullSetters }) {
  const { _, getFunctionIntro, getNonArrowFunctionIntro, n: n2, s } = snippets;
  const { importBindings, setters, starExcludes } = analyzeDependencies(dependencies, exports, t, snippets);
  const registeredName = name ? `'${name}',${_}` : "";
  const wrapperParameters = accessedGlobals.has("module") ? ["exports", "module"] : hasExports ? ["exports"] : [];
  let wrapperStart = `System.register(${registeredName}[` + dependencies.map(({ importPath }) => `'${importPath}'`).join(`,${_}`) + `],${_}(${getNonArrowFunctionIntro(wrapperParameters, {
    isAsync: false,
    name: null
  })}{${n2}${t}${strict ? "'use strict';" : ""}` + getStarExcludesBlock(starExcludes, t, snippets) + getImportBindingsBlock(importBindings, t, snippets) + `${n2}${t}return${_}{${setters.length > 0 ? `${n2}${t}${t}setters:${_}[${setters.map((setter) => setter ? `${getFunctionIntro(["module"], {
    isAsync: false,
    name: null
  })}{${n2}${t}${t}${t}${setter}${n2}${t}${t}}` : systemNullSetters ? `null` : `${getFunctionIntro([], { isAsync: false, name: null })}{}`).join(`,${_}`)}],` : ""}${n2}`;
  wrapperStart += `${t}${t}execute:${_}(${getNonArrowFunctionIntro([], {
    isAsync: usesTopLevelAwait,
    name: null
  })}{${n2}${n2}`;
  const wrapperEnd = `${t}${t}})${n2}${t}}${s}${n2}}));`;
  magicString.prepend(intro + getHelpersBlock(null, accessedGlobals, t, snippets, externalLiveBindings, freeze, namespaceToStringTag) + getHoistedExportsBlock(exports, t, snippets)).append(`${outro}${n2}${n2}` + getSyntheticExportsBlock(exports, t, snippets) + getMissingExportsBlock(exports, t, snippets)).indent(`${t}${t}${t}`).append(wrapperEnd).prepend(wrapperStart);
}
function analyzeDependencies(dependencies, exports, t, { _, cnst, getObject, getPropertyAccess, n: n2 }) {
  const importBindings = [];
  const setters = [];
  let starExcludes = null;
  for (const { imports, reexports } of dependencies) {
    const setter = [];
    if (imports) {
      for (const specifier of imports) {
        importBindings.push(specifier.local);
        if (specifier.imported === "*") {
          setter.push(`${specifier.local}${_}=${_}module;`);
        } else {
          setter.push(`${specifier.local}${_}=${_}module${getPropertyAccess(specifier.imported)};`);
        }
      }
    }
    if (reexports) {
      const reexportedNames = [];
      let hasStarReexport = false;
      for (const { imported, reexported } of reexports) {
        if (reexported === "*") {
          hasStarReexport = true;
        } else {
          reexportedNames.push([
            reexported,
            imported === "*" ? "module" : `module${getPropertyAccess(imported)}`
          ]);
        }
      }
      if (reexportedNames.length > 1 || hasStarReexport) {
        const exportMapping = getObject(reexportedNames, { lineBreakIndent: null });
        if (hasStarReexport) {
          if (!starExcludes) {
            starExcludes = getStarExcludes({ dependencies, exports });
          }
          setter.push(`${cnst} setter${_}=${_}${exportMapping};`, `for${_}(${cnst} name in module)${_}{`, `${t}if${_}(!_starExcludes[name])${_}setter[name]${_}=${_}module[name];`, "}", "exports(setter);");
        } else {
          setter.push(`exports(${exportMapping});`);
        }
      } else {
        const [key, value] = reexportedNames[0];
        setter.push(`exports('${key}',${_}${value});`);
      }
    }
    setters.push(setter.join(`${n2}${t}${t}${t}`));
  }
  return { importBindings, setters, starExcludes };
}
function getExportsBlock(exports, t, { _, n: n2 }) {
  if (exports.length === 0) {
    return "";
  }
  if (exports.length === 1) {
    return `exports('${exports[0].name}',${_}${exports[0].value});${n2}${n2}`;
  }
  return `exports({${n2}` + exports.map(({ name, value }) => `${t}${name}:${_}${value}`).join(`,${n2}`) + `${n2}});${n2}${n2}`;
}
function globalProperty(name, globalVariable, getPropertyAccess) {
  if (!name)
    return "null";
  return `${globalVariable}${keypath(name, getPropertyAccess)}`;
}
function safeAccess(name, globalVariable, { _, getPropertyAccess }) {
  let propertyPath = globalVariable;
  return name.split(".").map((part) => propertyPath += getPropertyAccess(part)).join(`${_}&&${_}`);
}
function umd(magicString, { accessedGlobals, dependencies, exports, hasDefaultExport, hasExports, id, indent: t, intro, namedExportsMode, outro, snippets, onwarn }, { amd: amd2, compact, esModule, extend: extend2, externalLiveBindings, freeze, interop, name, namespaceToStringTag, globals, noConflict, strict }) {
  const { _, cnst, getFunctionIntro, getNonArrowFunctionIntro, getPropertyAccess, n: n2, s } = snippets;
  const factoryVariable = compact ? "f" : "factory";
  const globalVariable = compact ? "g" : "global";
  if (hasExports && !name) {
    return error(errorMissingNameOptionForUmdExport());
  }
  warnOnBuiltins(onwarn, dependencies);
  const amdDeps = dependencies.map((m) => `'${updateExtensionForRelativeAmdId(m.importPath, amd2.forceJsExtensionForImports)}'`);
  const cjsDeps = dependencies.map((m) => `require('${m.importPath}')`);
  const trimmedImports = trimEmptyImports(dependencies);
  const globalDeps = trimmedImports.map((module) => globalProperty(module.globalName, globalVariable, getPropertyAccess));
  const factoryParameters = trimmedImports.map((m) => m.name);
  if (namedExportsMode && (hasExports || noConflict)) {
    amdDeps.unshift(`'exports'`);
    cjsDeps.unshift(`exports`);
    globalDeps.unshift(assignToDeepVariable(name, globalVariable, globals, `${extend2 ? `${globalProperty(name, globalVariable, getPropertyAccess)}${_}||${_}` : ""}{}`, snippets));
    factoryParameters.unshift("exports");
  }
  const completeAmdId = getCompleteAmdId(amd2, id);
  const amdParameters = (completeAmdId ? `'${completeAmdId}',${_}` : ``) + (amdDeps.length > 0 ? `[${amdDeps.join(`,${_}`)}],${_}` : ``);
  const define = amd2.define;
  const cjsExport = !namedExportsMode && hasExports ? `module.exports${_}=${_}` : ``;
  const useStrict = strict ? `${_}'use strict';${n2}` : ``;
  let iifeExport;
  if (noConflict) {
    const noConflictExportsVariable = compact ? "e" : "exports";
    let factory;
    if (!namedExportsMode && hasExports) {
      factory = `${cnst} ${noConflictExportsVariable}${_}=${_}${assignToDeepVariable(name, globalVariable, globals, `${factoryVariable}(${globalDeps.join(`,${_}`)})`, snippets)};`;
    } else {
      const module = globalDeps.shift();
      factory = `${cnst} ${noConflictExportsVariable}${_}=${_}${module};${n2}${t}${t}${factoryVariable}(${[noConflictExportsVariable, ...globalDeps].join(`,${_}`)});`;
    }
    iifeExport = `(${getFunctionIntro([], { isAsync: false, name: null })}{${n2}${t}${t}${cnst} current${_}=${_}${safeAccess(name, globalVariable, snippets)};${n2}${t}${t}${factory}${n2}${t}${t}${noConflictExportsVariable}.noConflict${_}=${_}${getFunctionIntro([], {
      isAsync: false,
      name: null
    })}{${_}${globalProperty(name, globalVariable, getPropertyAccess)}${_}=${_}current;${_}return ${noConflictExportsVariable}${s}${_}};${n2}${t}})()`;
  } else {
    iifeExport = `${factoryVariable}(${globalDeps.join(`,${_}`)})`;
    if (!namedExportsMode && hasExports) {
      iifeExport = assignToDeepVariable(name, globalVariable, globals, iifeExport, snippets);
    }
  }
  const iifeNeedsGlobal = hasExports || noConflict && namedExportsMode || globalDeps.length > 0;
  const wrapperParameters = [factoryVariable];
  if (iifeNeedsGlobal) {
    wrapperParameters.unshift(globalVariable);
  }
  const globalArgument = iifeNeedsGlobal ? `this,${_}` : "";
  const iifeStart = iifeNeedsGlobal ? `(${globalVariable}${_}=${_}typeof globalThis${_}!==${_}'undefined'${_}?${_}globalThis${_}:${_}${globalVariable}${_}||${_}self,${_}` : "";
  const iifeEnd = iifeNeedsGlobal ? ")" : "";
  const cjsIntro = iifeNeedsGlobal ? `${t}typeof exports${_}===${_}'object'${_}&&${_}typeof module${_}!==${_}'undefined'${_}?${_}${cjsExport}${factoryVariable}(${cjsDeps.join(`,${_}`)})${_}:${n2}` : "";
  const wrapperIntro = `(${getNonArrowFunctionIntro(wrapperParameters, { isAsync: false, name: null })}{${n2}` + cjsIntro + `${t}typeof ${define}${_}===${_}'function'${_}&&${_}${define}.amd${_}?${_}${define}(${amdParameters}${factoryVariable})${_}:${n2}${t}${iifeStart}${iifeExport}${iifeEnd};${n2}})(${globalArgument}(${getNonArrowFunctionIntro(factoryParameters, {
    isAsync: false,
    name: null
  })}{${useStrict}${n2}`;
  const wrapperOutro = n2 + n2 + "}));";
  magicString.prepend(`${intro}${getInteropBlock(dependencies, interop, externalLiveBindings, freeze, namespaceToStringTag, accessedGlobals, t, snippets)}`);
  const exportBlock = getExportBlock$1(exports, dependencies, namedExportsMode, interop, snippets, t, externalLiveBindings);
  let namespaceMarkers = getNamespaceMarkers(namedExportsMode && hasExports, esModule === true || esModule === "if-default-prop" && hasDefaultExport, namespaceToStringTag, snippets);
  if (namespaceMarkers) {
    namespaceMarkers = n2 + n2 + namespaceMarkers;
  }
  magicString.append(`${exportBlock}${namespaceMarkers}${outro}`).trim().indent(t).append(wrapperOutro).prepend(wrapperIntro);
}
async function createAddons(options, outputPluginDriver, chunk) {
  try {
    let [banner, footer, intro, outro] = await Promise.all([
      outputPluginDriver.hookReduceValue("banner", options.banner(chunk), [chunk], concatSeparator),
      outputPluginDriver.hookReduceValue("footer", options.footer(chunk), [chunk], concatSeparator),
      outputPluginDriver.hookReduceValue("intro", options.intro(chunk), [chunk], concatDblSeparator),
      outputPluginDriver.hookReduceValue("outro", options.outro(chunk), [chunk], concatDblSeparator)
    ]);
    if (intro)
      intro += "\n\n";
    if (outro)
      outro = `

${outro}`;
    if (banner)
      banner += "\n";
    if (footer)
      footer = "\n" + footer;
    return { banner, footer, intro, outro };
  } catch (error_) {
    return error(errorAddonNotGenerated(error_.message, error_.hook, error_.plugin));
  }
}
function deconflictChunk(modules, dependenciesToBeDeconflicted, imports, usedNames, format, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports, exportNamesByVariable, accessedGlobalsByScope, includedNamespaces) {
  const reversedModules = [...modules].reverse();
  for (const module of reversedModules) {
    module.scope.addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope);
  }
  deconflictTopLevelVariables(usedNames, reversedModules, includedNamespaces);
  DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT[format](usedNames, imports, dependenciesToBeDeconflicted, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports);
  for (const module of reversedModules) {
    module.scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
  }
}
function deconflictImportsEsmOrSystem(usedNames, imports, dependenciesToBeDeconflicted, _interop, preserveModules, _externalLiveBindings, chunkByModule, externalChunkByModule, syntheticExports) {
  for (const dependency of dependenciesToBeDeconflicted.dependencies) {
    if (preserveModules || dependency instanceof ExternalChunk) {
      dependency.variableName = getSafeName(dependency.suggestedVariableName, usedNames, null);
    }
  }
  for (const variable of imports) {
    const module = variable.module;
    const name = variable.name;
    if (variable.isNamespace && (preserveModules || module instanceof ExternalModule)) {
      variable.setRenderNames(null, (module instanceof ExternalModule ? externalChunkByModule.get(module) : chunkByModule.get(module)).variableName);
    } else if (module instanceof ExternalModule && name === "default") {
      variable.setRenderNames(null, getSafeName([...module.exportedVariables].some(([exportedVariable, exportedName]) => exportedName === "*" && exportedVariable.included) ? module.suggestedVariableName + "__default" : module.suggestedVariableName, usedNames, variable.forbiddenNames));
    } else {
      variable.setRenderNames(null, getSafeName(name, usedNames, variable.forbiddenNames));
    }
  }
  for (const variable of syntheticExports) {
    variable.setRenderNames(null, getSafeName(variable.name, usedNames, variable.forbiddenNames));
  }
}
function deconflictImportsOther(usedNames, imports, { deconflictedDefault, deconflictedNamespace, dependencies }, interop, preserveModules, externalLiveBindings, chunkByModule, externalChunkByModule) {
  for (const chunk of dependencies) {
    chunk.variableName = getSafeName(chunk.suggestedVariableName, usedNames, null);
  }
  for (const chunk of deconflictedNamespace) {
    chunk.namespaceVariableName = getSafeName(`${chunk.suggestedVariableName}__namespace`, usedNames, null);
  }
  for (const externalModule of deconflictedDefault) {
    externalModule.defaultVariableName = deconflictedNamespace.has(externalModule) && canDefaultBeTakenFromNamespace(interop(externalModule.id), externalLiveBindings) ? externalModule.namespaceVariableName : getSafeName(`${externalModule.suggestedVariableName}__default`, usedNames, null);
  }
  for (const variable of imports) {
    const module = variable.module;
    if (module instanceof ExternalModule) {
      const chunk = externalChunkByModule.get(module);
      const name = variable.name;
      if (name === "default") {
        const moduleInterop = interop(module.id);
        const variableName = defaultInteropHelpersByInteropType[moduleInterop] ? chunk.defaultVariableName : chunk.variableName;
        if (isDefaultAProperty(moduleInterop, externalLiveBindings)) {
          variable.setRenderNames(variableName, "default");
        } else {
          variable.setRenderNames(null, variableName);
        }
      } else if (name === "*") {
        variable.setRenderNames(null, namespaceInteropHelpersByInteropType[interop(module.id)] ? chunk.namespaceVariableName : chunk.variableName);
      } else {
        variable.setRenderNames(chunk.variableName, null);
      }
    } else {
      const chunk = chunkByModule.get(module);
      if (preserveModules && variable.isNamespace) {
        variable.setRenderNames(null, chunk.exportMode === "default" ? chunk.namespaceVariableName : chunk.variableName);
      } else if (chunk.exportMode === "default") {
        variable.setRenderNames(null, chunk.variableName);
      } else {
        variable.setRenderNames(chunk.variableName, chunk.getVariableExportName(variable));
      }
    }
  }
}
function deconflictTopLevelVariables(usedNames, modules, includedNamespaces) {
  for (const module of modules) {
    for (const variable of module.scope.variables.values()) {
      if (variable.included && // this will only happen for exports in some formats
      !(variable.renderBaseName || variable instanceof ExportDefaultVariable && variable.getOriginalVariable() !== variable)) {
        variable.setRenderNames(null, getSafeName(variable.name, usedNames, variable.forbiddenNames));
      }
    }
    if (includedNamespaces.has(module)) {
      const namespace = module.namespace;
      namespace.setRenderNames(null, getSafeName(namespace.name, usedNames, namespace.forbiddenNames));
    }
  }
}
function assignExportsToMangledNames(exports, exportsByName, exportNamesByVariable) {
  let nameIndex = 0;
  for (const variable of exports) {
    let [exportName] = variable.name;
    if (exportsByName.has(exportName)) {
      do {
        exportName = toBase64(++nameIndex);
        if (exportName.charCodeAt(0) === 49) {
          nameIndex += 9 * 64 ** (exportName.length - 1);
          exportName = toBase64(nameIndex);
        }
      } while (RESERVED_NAMES$1.has(exportName) || exportsByName.has(exportName));
    }
    exportsByName.set(exportName, variable);
    exportNamesByVariable.set(variable, [exportName]);
  }
}
function assignExportsToNames(exports, exportsByName, exportNamesByVariable) {
  for (const variable of exports) {
    let nameIndex = 0;
    let exportName = variable.name;
    while (exportsByName.has(exportName)) {
      exportName = variable.name + "$" + ++nameIndex;
    }
    exportsByName.set(exportName, variable);
    exportNamesByVariable.set(variable, [exportName]);
  }
}
function getExportMode(chunk, { exports: exportMode, name, format }, facadeModuleId, warn) {
  const exportKeys = chunk.getExportNames();
  if (exportMode === "default") {
    if (exportKeys.length !== 1 || exportKeys[0] !== "default") {
      return error(errorIncompatibleExportOptionValue("default", exportKeys, facadeModuleId));
    }
  } else if (exportMode === "none" && exportKeys.length > 0) {
    return error(errorIncompatibleExportOptionValue("none", exportKeys, facadeModuleId));
  }
  if (exportMode === "auto") {
    if (exportKeys.length === 0) {
      exportMode = "none";
    } else if (exportKeys.length === 1 && exportKeys[0] === "default") {
      exportMode = "default";
    } else {
      if (format !== "es" && format !== "system" && exportKeys.includes("default")) {
        warn(errorMixedExport(facadeModuleId, name));
      }
      exportMode = "named";
    }
  }
  return exportMode;
}
function guessIndentString(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current2) => {
    const numberSpaces = /^ +/.exec(current2)[0].length;
    return Math.min(numberSpaces, previous);
  }, Infinity);
  return " ".repeat(min);
}
function getIndentString(modules, options) {
  if (options.indent !== true)
    return options.indent;
  for (const module of modules) {
    const indent = guessIndentString(module.originalCode);
    if (indent !== null)
      return indent;
  }
  return "	";
}
function getStaticDependencies(chunk, orderedModules, chunkByModule, externalChunkByModule) {
  const staticDependencyBlocks = [];
  const handledDependencies = /* @__PURE__ */ new Set();
  for (let modulePos = orderedModules.length - 1; modulePos >= 0; modulePos--) {
    const module = orderedModules[modulePos];
    if (!handledDependencies.has(module)) {
      const staticDependencies = [];
      addStaticDependencies(module, staticDependencies, handledDependencies, chunk, chunkByModule, externalChunkByModule);
      staticDependencyBlocks.unshift(staticDependencies);
    }
  }
  const dependencies = /* @__PURE__ */ new Set();
  for (const block of staticDependencyBlocks) {
    for (const dependency of block) {
      dependencies.add(dependency);
    }
  }
  return dependencies;
}
function addStaticDependencies(module, staticDependencies, handledModules, chunk, chunkByModule, externalChunkByModule) {
  const dependencies = module.getDependenciesToBeIncluded();
  for (const dependency of dependencies) {
    if (dependency instanceof ExternalModule) {
      staticDependencies.push(externalChunkByModule.get(dependency));
      continue;
    }
    const dependencyChunk = chunkByModule.get(dependency);
    if (dependencyChunk !== chunk) {
      staticDependencies.push(dependencyChunk);
      continue;
    }
    if (!handledModules.has(dependency)) {
      handledModules.add(dependency);
      addStaticDependencies(dependency, staticDependencies, handledModules, chunk, chunkByModule, externalChunkByModule);
    }
  }
}
function renderNamePattern(pattern, patternName, replacements) {
  if (isPathFragment(pattern))
    return error(errorFailedValidation(`Invalid pattern "${pattern}" for "${patternName}", patterns can be neither absolute nor relative paths. If you want your files to be stored in a subdirectory, write its name without a leading slash like this: subdirectory/pattern.`));
  return pattern.replace(/\[(\w+)(:\d+)?]/g, (_match, type, size) => {
    if (!replacements.hasOwnProperty(type) || size && type !== "hash") {
      return error(errorFailedValidation(`"[${type}${size || ""}]" is not a valid placeholder in the "${patternName}" pattern.`));
    }
    const replacement = replacements[type](size && Number.parseInt(size.slice(1)));
    if (isPathFragment(replacement))
      return error(errorFailedValidation(`Invalid substitution "${replacement}" for placeholder "[${type}]" in "${patternName}" pattern, can be neither absolute nor relative path.`));
    return replacement;
  });
}
function makeUnique(name, { [lowercaseBundleKeys]: reservedLowercaseBundleKeys }) {
  if (!reservedLowercaseBundleKeys.has(name.toLowerCase()))
    return name;
  const extension = (0, import_node_path.extname)(name);
  name = name.slice(0, Math.max(0, name.length - extension.length));
  let uniqueName, uniqueIndex = 1;
  while (reservedLowercaseBundleKeys.has((uniqueName = name + ++uniqueIndex + extension).toLowerCase()))
    ;
  return uniqueName;
}
function getGlobalName(chunk, globals, hasExports, warn) {
  const globalName = typeof globals === "function" ? globals(chunk.id) : globals[chunk.id];
  if (globalName) {
    return globalName;
  }
  if (hasExports) {
    warn(errorMissingGlobalName(chunk.id, chunk.variableName));
    return chunk.variableName;
  }
}
function getChunkNameFromModule(module) {
  return getPredefinedChunkNameFromModule(module) ?? getAliasName(module.id);
}
function getPredefinedChunkNameFromModule(module) {
  var _a, _b;
  return ((_a = module.chunkNames.find(({ isUserDefined }) => isUserDefined)) == null ? void 0 : _a.name) ?? ((_b = module.chunkNames[0]) == null ? void 0 : _b.name);
}
function getImportedBindingsPerDependency(renderedDependencies, resolveFileName2) {
  const importedBindingsPerDependency = {};
  for (const [dependency, declaration] of renderedDependencies) {
    const specifiers = /* @__PURE__ */ new Set();
    if (declaration.imports) {
      for (const { imported } of declaration.imports) {
        specifiers.add(imported);
      }
    }
    if (declaration.reexports) {
      for (const { imported } of declaration.reexports) {
        specifiers.add(imported);
      }
    }
    importedBindingsPerDependency[resolveFileName2(dependency)] = [...specifiers];
  }
  return importedBindingsPerDependency;
}
function* concatLazy(iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
function getChunkAssignments(entries, manualChunkAliasByEntry, minChunkSize) {
  const { chunkDefinitions, modulesInManualChunks } = getChunkDefinitionsFromManualChunks(manualChunkAliasByEntry);
  const { allEntries, dependentEntriesByModule, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry } = analyzeModuleGraph(entries);
  const initialChunks = Object.values(getChunksBySignature(getModulesWithDependentEntries(dependentEntriesByModule, modulesInManualChunks)));
  removeUnnecessaryDependentEntries(initialChunks, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry, allEntries);
  chunkDefinitions.push(...createChunks(allEntries, getChunksBySignature(initialChunks), minChunkSize));
  return chunkDefinitions;
}
function getChunkDefinitionsFromManualChunks(manualChunkAliasByEntry) {
  const chunkDefinitions = [];
  const modulesInManualChunks = new Set(manualChunkAliasByEntry.keys());
  const manualChunkModulesByAlias = /* @__PURE__ */ Object.create(null);
  for (const [entry, alias] of manualChunkAliasByEntry) {
    addStaticDependenciesToManualChunk(entry, manualChunkModulesByAlias[alias] || (manualChunkModulesByAlias[alias] = []), modulesInManualChunks);
  }
  for (const [alias, modules] of Object.entries(manualChunkModulesByAlias)) {
    chunkDefinitions.push({ alias, modules });
  }
  return { chunkDefinitions, modulesInManualChunks };
}
function addStaticDependenciesToManualChunk(entry, manualChunkModules, modulesInManualChunks) {
  const modulesToHandle = /* @__PURE__ */ new Set([entry]);
  for (const module of modulesToHandle) {
    modulesInManualChunks.add(module);
    manualChunkModules.push(module);
    for (const dependency of module.dependencies) {
      if (!(dependency instanceof ExternalModule || modulesInManualChunks.has(dependency))) {
        modulesToHandle.add(dependency);
      }
    }
  }
}
function analyzeModuleGraph(entries) {
  const dynamicEntryModules = /* @__PURE__ */ new Set();
  const dependentEntriesByModule = /* @__PURE__ */ new Map();
  const dynamicImportModulesByEntry = [];
  const allEntriesSet = new Set(entries);
  let entryIndex = 0;
  for (const currentEntry of allEntriesSet) {
    const dynamicImportsForCurrentEntry = /* @__PURE__ */ new Set();
    dynamicImportModulesByEntry.push(dynamicImportsForCurrentEntry);
    const modulesToHandle = /* @__PURE__ */ new Set([currentEntry]);
    for (const module of modulesToHandle) {
      getOrCreate(dependentEntriesByModule, module, getNewSet).add(entryIndex);
      for (const dependency of module.getDependenciesToBeIncluded()) {
        if (!(dependency instanceof ExternalModule)) {
          modulesToHandle.add(dependency);
        }
      }
      for (const { resolution } of module.dynamicImports) {
        if (resolution instanceof Module && resolution.includedDynamicImporters.length > 0 && !allEntriesSet.has(resolution)) {
          dynamicEntryModules.add(resolution);
          allEntriesSet.add(resolution);
          dynamicImportsForCurrentEntry.add(resolution);
        }
      }
      for (const dependency of module.implicitlyLoadedBefore) {
        if (!allEntriesSet.has(dependency)) {
          dynamicEntryModules.add(dependency);
          allEntriesSet.add(dependency);
        }
      }
    }
    entryIndex++;
  }
  const allEntries = [...allEntriesSet];
  const { dynamicEntries, dynamicImportsByEntry } = getDynamicEntries(allEntries, dynamicEntryModules, dynamicImportModulesByEntry);
  return {
    allEntries,
    dependentEntriesByModule,
    dynamicallyDependentEntriesByDynamicEntry: getDynamicallyDependentEntriesByDynamicEntry(dependentEntriesByModule, dynamicEntries, allEntries),
    dynamicImportsByEntry
  };
}
function getDynamicEntries(allEntries, dynamicEntryModules, dynamicImportModulesByEntry) {
  const entryIndexByModule = /* @__PURE__ */ new Map();
  const dynamicEntries = /* @__PURE__ */ new Set();
  for (const [entryIndex, entry] of allEntries.entries()) {
    entryIndexByModule.set(entry, entryIndex);
    if (dynamicEntryModules.has(entry)) {
      dynamicEntries.add(entryIndex);
    }
  }
  const dynamicImportsByEntry = [];
  for (const dynamicImportModules of dynamicImportModulesByEntry) {
    const dynamicImports = /* @__PURE__ */ new Set();
    for (const dynamicEntry of dynamicImportModules) {
      dynamicImports.add(entryIndexByModule.get(dynamicEntry));
    }
    dynamicImportsByEntry.push(dynamicImports);
  }
  return { dynamicEntries, dynamicImportsByEntry };
}
function getDynamicallyDependentEntriesByDynamicEntry(dependentEntriesByModule, dynamicEntries, allEntries) {
  const dynamicallyDependentEntriesByDynamicEntry = /* @__PURE__ */ new Map();
  for (const dynamicEntryIndex of dynamicEntries) {
    const dynamicallyDependentEntries = getOrCreate(dynamicallyDependentEntriesByDynamicEntry, dynamicEntryIndex, getNewSet);
    const dynamicEntry = allEntries[dynamicEntryIndex];
    for (const importer of concatLazy([
      dynamicEntry.includedDynamicImporters,
      dynamicEntry.implicitlyLoadedAfter
    ])) {
      for (const entry of dependentEntriesByModule.get(importer)) {
        dynamicallyDependentEntries.add(entry);
      }
    }
  }
  return dynamicallyDependentEntriesByDynamicEntry;
}
function getChunksBySignature(modulesWithDependentEntries) {
  var _a;
  const chunkModules = /* @__PURE__ */ Object.create(null);
  for (const { dependentEntries, modules } of modulesWithDependentEntries) {
    let chunkSignature = 0n;
    for (const entryIndex of dependentEntries) {
      chunkSignature |= 1n << BigInt(entryIndex);
    }
    (chunkModules[_a = String(chunkSignature)] || (chunkModules[_a] = {
      dependentEntries: new Set(dependentEntries),
      modules: []
    })).modules.push(...modules);
  }
  return chunkModules;
}
function* getModulesWithDependentEntries(dependentEntriesByModule, modulesInManualChunks) {
  for (const [module, dependentEntries] of dependentEntriesByModule) {
    if (!modulesInManualChunks.has(module)) {
      yield { dependentEntries, modules: [module] };
    }
  }
}
function removeUnnecessaryDependentEntries(chunks, dynamicallyDependentEntriesByDynamicEntry, dynamicImportsByEntry, allEntries) {
  const staticDependenciesPerEntry = allEntries.map(() => 0n);
  const alreadyLoadedChunksPerEntry = allEntries.map((_entry, entryIndex) => dynamicallyDependentEntriesByDynamicEntry.has(entryIndex) ? -1n : 0n);
  let chunkMask = 1n;
  for (const { dependentEntries } of chunks) {
    for (const entryIndex of dependentEntries) {
      staticDependenciesPerEntry[entryIndex] |= chunkMask;
    }
    chunkMask <<= 1n;
  }
  const updatedDynamicallyDependentEntriesByDynamicEntry = dynamicallyDependentEntriesByDynamicEntry;
  for (const [dynamicEntryIndex, updatedDynamicallyDependentEntries] of updatedDynamicallyDependentEntriesByDynamicEntry) {
    updatedDynamicallyDependentEntriesByDynamicEntry.delete(dynamicEntryIndex);
    const previousLoadedModules = alreadyLoadedChunksPerEntry[dynamicEntryIndex];
    let newLoadedModules = previousLoadedModules;
    for (const entryIndex of updatedDynamicallyDependentEntries) {
      newLoadedModules &= staticDependenciesPerEntry[entryIndex] | alreadyLoadedChunksPerEntry[entryIndex];
    }
    if (newLoadedModules !== previousLoadedModules) {
      alreadyLoadedChunksPerEntry[dynamicEntryIndex] = newLoadedModules;
      for (const dynamicImport of dynamicImportsByEntry[dynamicEntryIndex]) {
        getOrCreate(updatedDynamicallyDependentEntriesByDynamicEntry, dynamicImport, getNewSet).add(dynamicEntryIndex);
      }
    }
  }
  chunkMask = 1n;
  for (const { dependentEntries } of chunks) {
    for (const entryIndex of dependentEntries) {
      if ((alreadyLoadedChunksPerEntry[entryIndex] & chunkMask) === chunkMask) {
        dependentEntries.delete(entryIndex);
      }
    }
    chunkMask <<= 1n;
  }
}
function createChunks(allEntries, chunkModulesBySignature, minChunkSize) {
  return minChunkSize === 0 ? Object.values(chunkModulesBySignature).map(({ modules }) => ({
    alias: null,
    modules
  })) : getOptimizedChunks(chunkModulesBySignature, allEntries.length, minChunkSize).map(({ modules }) => ({
    alias: null,
    modules
  }));
}
function getOptimizedChunks(chunkModulesBySignature, numberOfEntries, minChunkSize) {
  timeStart("optimize chunks", 3);
  const chunkPartition = getPartitionedChunks(chunkModulesBySignature, numberOfEntries, minChunkSize);
  console.log("Before eliminating small chunks, there were\n", Object.keys(chunkModulesBySignature).length, "chunks, of which\n", chunkPartition.small.size, "were below minChunkSize.");
  if (chunkPartition.small.size > 0) {
    mergeChunks(chunkPartition, minChunkSize);
  }
  console.log("After merging chunks,\n", chunkPartition.small.size + chunkPartition.big.size, "chunks remain, of which\n", chunkPartition.small.size, "are below minChunkSize.");
  timeEnd("optimize chunks", 3);
  return [...chunkPartition.small, ...chunkPartition.big];
}
function getPartitionedChunks(chunkModulesBySignature, numberOfEntries, minChunkSize) {
  const smallChunks = [];
  const bigChunks = [];
  const chunkByModule = /* @__PURE__ */ new Map();
  const sideEffectsByEntry = [];
  for (let index = 0; index < numberOfEntries; index++) {
    sideEffectsByEntry.push(/* @__PURE__ */ new Set());
  }
  for (const [signature, { dependentEntries, modules }] of Object.entries(chunkModulesBySignature)) {
    const chunkDescription = {
      correlatedSideEffects: /* @__PURE__ */ new Set(),
      dependencies: /* @__PURE__ */ new Set(),
      dependentChunks: /* @__PURE__ */ new Set(),
      dependentEntries,
      modules,
      pure: true,
      sideEffects: /* @__PURE__ */ new Set(),
      size: 0
    };
    let size = 0;
    let pure = true;
    for (const module of modules) {
      chunkByModule.set(module, chunkDescription);
      pure && (pure = !module.hasEffects());
      size += module.originalCode.length;
    }
    chunkDescription.pure = pure;
    chunkDescription.size = size;
    if (!pure) {
      for (const entryIndex of dependentEntries) {
        sideEffectsByEntry[entryIndex].add(signature);
      }
      chunkDescription.sideEffects.add(signature);
    }
    (size < minChunkSize ? smallChunks : bigChunks).push(chunkDescription);
  }
  sortChunksAndAddDependenciesAndEffects([bigChunks, smallChunks], chunkByModule, sideEffectsByEntry);
  return {
    big: new Set(bigChunks),
    small: new Set(smallChunks)
  };
}
function sortChunksAndAddDependenciesAndEffects(chunkLists, chunkByModule, sideEffectsByEntry) {
  for (const chunks of chunkLists) {
    chunks.sort(compareChunkSize);
    for (const chunk of chunks) {
      const { dependencies, modules, correlatedSideEffects, dependentEntries } = chunk;
      for (const module of modules) {
        for (const dependency of module.getDependenciesToBeIncluded()) {
          const dependencyChunk = chunkByModule.get(dependency);
          if (dependencyChunk && dependencyChunk !== chunk) {
            dependencies.add(dependencyChunk);
            dependencyChunk.dependentChunks.add(chunk);
          }
        }
      }
      let firstEntry = true;
      for (const entryIndex of dependentEntries) {
        const entryEffects = sideEffectsByEntry[entryIndex];
        if (firstEntry) {
          for (const sideEffect of entryEffects) {
            correlatedSideEffects.add(sideEffect);
          }
          firstEntry = false;
        } else {
          for (const sideEffect of correlatedSideEffects) {
            if (!entryEffects.has(sideEffect)) {
              correlatedSideEffects.delete(sideEffect);
            }
          }
        }
      }
    }
  }
}
function compareChunkSize({ size: sizeA }, { size: sizeB }) {
  return sizeA - sizeB;
}
function mergeChunks(chunkPartition, minChunkSize) {
  for (const allowArbitraryMerges of [false, true]) {
    for (const mergedChunk of chunkPartition.small) {
      let closestChunk = null;
      let closestChunkDistance = Infinity;
      const { modules, pure, size } = mergedChunk;
      for (const targetChunk of concatLazy([chunkPartition.small, chunkPartition.big])) {
        if (mergedChunk === targetChunk)
          continue;
        const onlySubsetMerge = !allowArbitraryMerges && targetChunk.size >= minChunkSize;
        const distance = getChunkEntryDistance(mergedChunk, targetChunk, onlySubsetMerge);
        if (distance < closestChunkDistance && isValidMerge(mergedChunk, targetChunk, onlySubsetMerge)) {
          closestChunk = targetChunk;
          closestChunkDistance = distance;
        }
      }
      if (closestChunk) {
        chunkPartition.small.delete(mergedChunk);
        getChunksInPartition(closestChunk, minChunkSize, chunkPartition).delete(closestChunk);
        closestChunk.modules.push(...modules);
        closestChunk.size += size;
        closestChunk.pure && (closestChunk.pure = pure);
        const { correlatedSideEffects, dependencies, dependentChunks, dependentEntries, sideEffects } = closestChunk;
        for (const sideEffect of correlatedSideEffects) {
          if (!mergedChunk.correlatedSideEffects.has(sideEffect)) {
            correlatedSideEffects.delete(sideEffect);
          }
        }
        for (const entry of mergedChunk.dependentEntries) {
          dependentEntries.add(entry);
        }
        for (const sideEffect of mergedChunk.sideEffects) {
          sideEffects.add(sideEffect);
        }
        for (const dependency of mergedChunk.dependencies) {
          dependencies.add(dependency);
          dependency.dependentChunks.delete(mergedChunk);
          dependency.dependentChunks.add(closestChunk);
        }
        for (const dependentChunk of mergedChunk.dependentChunks) {
          dependentChunks.add(dependentChunk);
          dependentChunk.dependencies.delete(mergedChunk);
          dependentChunk.dependencies.add(closestChunk);
        }
        dependencies.delete(closestChunk);
        dependentChunks.delete(closestChunk);
        getChunksInPartition(closestChunk, minChunkSize, chunkPartition).add(closestChunk);
      }
    }
  }
}
function isValidMerge(mergedChunk, targetChunk, onlySubsetMerge) {
  return !(hasTransitiveDependencyOrNonCorrelatedSideEffect(mergedChunk, targetChunk, true) || hasTransitiveDependencyOrNonCorrelatedSideEffect(targetChunk, mergedChunk, !onlySubsetMerge));
}
function hasTransitiveDependencyOrNonCorrelatedSideEffect(dependentChunk, dependencyChunk, checkSideEffects) {
  const { correlatedSideEffects } = dependencyChunk;
  if (checkSideEffects) {
    for (const sideEffect of dependentChunk.sideEffects) {
      if (!correlatedSideEffects.has(sideEffect)) {
        return true;
      }
    }
  }
  const chunksToCheck = new Set(dependentChunk.dependencies);
  for (const { dependencies, sideEffects } of chunksToCheck) {
    for (const dependency of dependencies) {
      if (dependency === dependencyChunk) {
        return true;
      }
      chunksToCheck.add(dependency);
    }
    if (checkSideEffects) {
      for (const sideEffect of sideEffects) {
        if (!correlatedSideEffects.has(sideEffect)) {
          return true;
        }
      }
    }
  }
  return false;
}
function getChunksInPartition(chunk, minChunkSize, chunkPartition) {
  return chunk.size < minChunkSize ? chunkPartition.small : chunkPartition.big;
}
function getChunkEntryDistance({ dependentEntries: sourceEntries }, { dependentEntries: targetEntries }, enforceSubest) {
  let distance = 0;
  for (const entryIndex of targetEntries) {
    if (!sourceEntries.has(entryIndex)) {
      distance++;
    }
  }
  for (const entryIndex of sourceEntries) {
    if (!targetEntries.has(entryIndex)) {
      if (enforceSubest) {
        return Infinity;
      }
      distance++;
    }
  }
  return distance;
}
function commondir(files) {
  if (files.length === 0)
    return "/";
  if (files.length === 1)
    return (0, import_node_path.dirname)(files[0]);
  const commonSegments = files.slice(1).reduce((commonSegments2, file) => {
    const pathSegements = file.split(/\/+|\\+/);
    let index;
    for (index = 0; commonSegments2[index] === pathSegements[index] && index < Math.min(commonSegments2.length, pathSegements.length); index++)
      ;
    return commonSegments2.slice(0, index);
  }, files[0].split(/\/+|\\+/));
  return commonSegments.length > 1 ? commonSegments.join("/") : "/";
}
function sortByExecutionOrder(units) {
  units.sort(compareExecIndex);
}
function analyseModuleExecution(entryModules) {
  let nextExecIndex = 0;
  const cyclePaths = [];
  const analysedModules = /* @__PURE__ */ new Set();
  const dynamicImports = /* @__PURE__ */ new Set();
  const parents = /* @__PURE__ */ new Map();
  const orderedModules = [];
  const analyseModule = (module) => {
    if (module instanceof Module) {
      for (const dependency of module.dependencies) {
        if (parents.has(dependency)) {
          if (!analysedModules.has(dependency)) {
            cyclePaths.push(getCyclePath(dependency, module, parents));
          }
          continue;
        }
        parents.set(dependency, module);
        analyseModule(dependency);
      }
      for (const dependency of module.implicitlyLoadedBefore) {
        dynamicImports.add(dependency);
      }
      for (const { resolution } of module.dynamicImports) {
        if (resolution instanceof Module) {
          dynamicImports.add(resolution);
        }
      }
      orderedModules.push(module);
    }
    module.execIndex = nextExecIndex++;
    analysedModules.add(module);
  };
  for (const currentEntry of entryModules) {
    if (!parents.has(currentEntry)) {
      parents.set(currentEntry, null);
      analyseModule(currentEntry);
    }
  }
  for (const currentEntry of dynamicImports) {
    if (!parents.has(currentEntry)) {
      parents.set(currentEntry, null);
      analyseModule(currentEntry);
    }
  }
  return { cyclePaths, orderedModules };
}
function getCyclePath(module, parent, parents) {
  const cycleSymbol = Symbol(module.id);
  const path2 = [module.id];
  let nextModule = parent;
  module.cycles.add(cycleSymbol);
  while (nextModule !== module) {
    nextModule.cycles.add(cycleSymbol);
    path2.push(nextModule.id);
    nextModule = parents.get(nextModule);
  }
  path2.push(path2[0]);
  path2.reverse();
  return path2;
}
function getGenerateCodeSnippets({ compact, generatedCode: { arrowFunctions, constBindings, objectShorthand, reservedNamesAsProps } }) {
  const { _, n: n2, s } = compact ? { _: "", n: "", s: "" } : { _: " ", n: "\n", s: ";" };
  const cnst = constBindings ? "const" : "var";
  const getNonArrowFunctionIntro = (parameters, { isAsync, name }) => `${isAsync ? `async ` : ""}function${name ? ` ${name}` : ""}${_}(${parameters.join(`,${_}`)})${_}`;
  const getFunctionIntro = arrowFunctions ? (parameters, { isAsync, name }) => {
    const singleParameter = parameters.length === 1;
    const asyncString = isAsync ? `async${singleParameter ? " " : _}` : "";
    return `${name ? `${cnst} ${name}${_}=${_}` : ""}${asyncString}${singleParameter ? parameters[0] : `(${parameters.join(`,${_}`)})`}${_}=>${_}`;
  } : getNonArrowFunctionIntro;
  const getDirectReturnFunction = (parameters, { functionReturn, lineBreakIndent, name }) => [
    `${getFunctionIntro(parameters, {
      isAsync: false,
      name
    })}${arrowFunctions ? lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : "" : `{${lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : _}${functionReturn ? "return " : ""}`}`,
    arrowFunctions ? `${name ? ";" : ""}${lineBreakIndent ? `${n2}${lineBreakIndent.base}` : ""}` : `${s}${lineBreakIndent ? `${n2}${lineBreakIndent.base}` : _}}`
  ];
  const isValidPropertyName = reservedNamesAsProps ? (name) => validPropertyName.test(name) : (name) => !RESERVED_NAMES$1.has(name) && validPropertyName.test(name);
  return {
    _,
    cnst,
    getDirectReturnFunction,
    getDirectReturnIifeLeft: (parameters, returned, { needsArrowReturnParens, needsWrappedFunction }) => {
      const [left, right] = getDirectReturnFunction(parameters, {
        functionReturn: true,
        lineBreakIndent: null,
        name: null
      });
      return `${wrapIfNeeded(`${left}${wrapIfNeeded(returned, arrowFunctions && needsArrowReturnParens)}${right}`, arrowFunctions || needsWrappedFunction)}(`;
    },
    getFunctionIntro,
    getNonArrowFunctionIntro,
    getObject(fields, { lineBreakIndent }) {
      const prefix = lineBreakIndent ? `${n2}${lineBreakIndent.base}${lineBreakIndent.t}` : _;
      return `{${fields.map(([key, value]) => {
        if (key === null)
          return `${prefix}${value}`;
        const needsQuotes = !isValidPropertyName(key);
        return key === value && objectShorthand && !needsQuotes ? prefix + key : `${prefix}${needsQuotes ? `'${key}'` : key}:${_}${value}`;
      }).join(`,`)}${fields.length === 0 ? "" : lineBreakIndent ? `${n2}${lineBreakIndent.base}` : _}}`;
    },
    getPropertyAccess: (name) => isValidPropertyName(name) ? `.${name}` : `[${JSON.stringify(name)}]`,
    n: n2,
    s
  };
}
function getLinkMap(warn) {
  return function linkMap(source, map) {
    if (map.mappings) {
      return new Link(map, [source]);
    }
    warn(errorSourcemapBroken(map.plugin));
    return new Link({
      mappings: [],
      names: []
    }, [source]);
  };
}
function getCollapsedSourcemap(id, originalCode, originalSourcemap, sourcemapChain, linkMap) {
  let source;
  if (originalSourcemap) {
    const sources = originalSourcemap.sources;
    const sourcesContent = originalSourcemap.sourcesContent || [];
    const directory = (0, import_node_path.dirname)(id) || ".";
    const sourceRoot = originalSourcemap.sourceRoot || ".";
    const baseSources = sources.map((source2, index) => new Source((0, import_node_path.resolve)(directory, sourceRoot, source2), sourcesContent[index]));
    source = new Link(originalSourcemap, baseSources);
  } else {
    source = new Source(id, originalCode);
  }
  return sourcemapChain.reduce(linkMap, source);
}
function collapseSourcemaps(file, map, modules, bundleSourcemapChain, excludeContent, warn) {
  const linkMap = getLinkMap(warn);
  const moduleSources = modules.filter((module) => !module.excludeFromSourcemap).map((module) => getCollapsedSourcemap(module.id, module.originalCode, module.originalSourcemap, module.sourcemapChain, linkMap));
  const link = new Link(map, moduleSources);
  const source = bundleSourcemapChain.reduce(linkMap, link);
  let { sources, sourcesContent, names, mappings } = source.traceMappings();
  if (file) {
    const directory = (0, import_node_path.dirname)(file);
    sources = sources.map((source2) => (0, import_node_path.relative)(directory, source2));
    file = (0, import_node_path.basename)(file);
  }
  sourcesContent = excludeContent ? null : sourcesContent;
  return new SourceMap({ file, mappings, names, sources, sourcesContent });
}
function collapseSourcemap(id, originalCode, originalSourcemap, sourcemapChain, warn) {
  if (sourcemapChain.length === 0) {
    return originalSourcemap;
  }
  const source = getCollapsedSourcemap(id, originalCode, originalSourcemap, sourcemapChain, getLinkMap(warn));
  const map = source.traceMappings();
  return { version: 3, ...map };
}
function decodedSourcemap(map) {
  if (!map)
    return null;
  if (typeof map === "string") {
    map = JSON.parse(map);
  }
  if (map.mappings === "") {
    return {
      mappings: [],
      names: [],
      sources: [],
      version: 3
    };
  }
  const mappings = typeof map.mappings === "string" ? decode(map.mappings) : map.mappings;
  return { ...map, mappings };
}
async function renderChunks(chunks, bundle, pluginDriver, outputOptions, onwarn) {
  timeStart("render chunks", 2);
  reserveEntryChunksInBundle(chunks);
  const renderedChunks = await Promise.all(chunks.map((chunk) => chunk.render()));
  timeEnd("render chunks", 2);
  timeStart("transform chunks", 2);
  const chunkGraph = getChunkGraph(chunks);
  const { nonHashedChunksWithPlaceholders, renderedChunksByPlaceholder, hashDependenciesByPlaceholder } = await transformChunksAndGenerateContentHashes(renderedChunks, chunkGraph, outputOptions, pluginDriver, onwarn);
  const hashesByPlaceholder = generateFinalHashes(renderedChunksByPlaceholder, hashDependenciesByPlaceholder, bundle);
  addChunksToBundle(renderedChunksByPlaceholder, hashesByPlaceholder, bundle, nonHashedChunksWithPlaceholders, pluginDriver, outputOptions);
  timeEnd("transform chunks", 2);
}
function reserveEntryChunksInBundle(chunks) {
  for (const chunk of chunks) {
    if (chunk.facadeModule && chunk.facadeModule.isUserDefinedEntryPoint) {
      chunk.getPreliminaryFileName();
    }
  }
}
function getChunkGraph(chunks) {
  return Object.fromEntries(chunks.map((chunk) => {
    const renderedChunkInfo = chunk.getRenderedChunkInfo();
    return [renderedChunkInfo.fileName, renderedChunkInfo];
  }));
}
async function transformChunk(magicString, fileName, usedModules, chunkGraph, options, outputPluginDriver, onwarn) {
  let map = null;
  const sourcemapChain = [];
  let code = await outputPluginDriver.hookReduceArg0("renderChunk", [magicString.toString(), chunkGraph[fileName], options, { chunks: chunkGraph }], (code2, result, plugin) => {
    if (result == null)
      return code2;
    if (typeof result === "string")
      result = {
        code: result,
        map: void 0
      };
    if (result.map !== null) {
      const map2 = decodedSourcemap(result.map);
      sourcemapChain.push(map2 || { missing: true, plugin: plugin.name });
    }
    return result.code;
  });
  const { compact, dir, file, sourcemap, sourcemapExcludeSources, sourcemapFile, sourcemapPathTransform, sourcemapIgnoreList } = options;
  if (!compact && code[code.length - 1] !== "\n")
    code += "\n";
  if (sourcemap) {
    timeStart("sourcemaps", 3);
    let resultingFile;
    if (file)
      resultingFile = (0, import_node_path.resolve)(sourcemapFile || file);
    else if (dir)
      resultingFile = (0, import_node_path.resolve)(dir, fileName);
    else
      resultingFile = (0, import_node_path.resolve)(fileName);
    const decodedMap = magicString.generateDecodedMap({});
    map = collapseSourcemaps(resultingFile, decodedMap, usedModules, sourcemapChain, sourcemapExcludeSources, onwarn);
    for (let sourcesIndex = 0; sourcesIndex < map.sources.length; ++sourcesIndex) {
      let sourcePath = map.sources[sourcesIndex];
      const sourcemapPath = `${resultingFile}.map`;
      const ignoreList = sourcemapIgnoreList(sourcePath, sourcemapPath);
      if (typeof ignoreList !== "boolean") {
        error(errorFailedValidation("sourcemapIgnoreList function must return a boolean."));
      }
      if (ignoreList) {
        if (map.x_google_ignoreList === void 0) {
          map.x_google_ignoreList = [];
        }
        if (!map.x_google_ignoreList.includes(sourcesIndex)) {
          map.x_google_ignoreList.push(sourcesIndex);
        }
      }
      if (sourcemapPathTransform) {
        sourcePath = sourcemapPathTransform(sourcePath, sourcemapPath);
        if (typeof sourcePath !== "string") {
          error(errorFailedValidation(`sourcemapPathTransform function must return a string.`));
        }
      }
      map.sources[sourcesIndex] = normalize(sourcePath);
    }
    timeEnd("sourcemaps", 3);
  }
  return {
    code,
    map
  };
}
async function transformChunksAndGenerateContentHashes(renderedChunks, chunkGraph, outputOptions, pluginDriver, onwarn) {
  const nonHashedChunksWithPlaceholders = [];
  const renderedChunksByPlaceholder = /* @__PURE__ */ new Map();
  const hashDependenciesByPlaceholder = /* @__PURE__ */ new Map();
  const placeholders = /* @__PURE__ */ new Set();
  for (const { preliminaryFileName: { hashPlaceholder } } of renderedChunks) {
    if (hashPlaceholder)
      placeholders.add(hashPlaceholder);
  }
  await Promise.all(renderedChunks.map(async ({ chunk, preliminaryFileName: { fileName, hashPlaceholder }, magicString, usedModules }) => {
    const transformedChunk = {
      chunk,
      fileName,
      ...await transformChunk(magicString, fileName, usedModules, chunkGraph, outputOptions, pluginDriver, onwarn)
    };
    const { code } = transformedChunk;
    if (hashPlaceholder) {
      const { containedPlaceholders, transformedCode } = replacePlaceholdersWithDefaultAndGetContainedPlaceholders(code, placeholders);
      const hash = createHash().update(transformedCode);
      const hashAugmentation = pluginDriver.hookReduceValueSync("augmentChunkHash", "", [chunk.getRenderedChunkInfo()], (augmentation, pluginHash) => {
        if (pluginHash) {
          augmentation += pluginHash;
        }
        return augmentation;
      });
      if (hashAugmentation) {
        hash.update(hashAugmentation);
      }
      renderedChunksByPlaceholder.set(hashPlaceholder, transformedChunk);
      hashDependenciesByPlaceholder.set(hashPlaceholder, {
        containedPlaceholders,
        contentHash: hash.digest("hex")
      });
    } else {
      nonHashedChunksWithPlaceholders.push(transformedChunk);
    }
  }));
  return {
    hashDependenciesByPlaceholder,
    nonHashedChunksWithPlaceholders,
    renderedChunksByPlaceholder
  };
}
function generateFinalHashes(renderedChunksByPlaceholder, hashDependenciesByPlaceholder, bundle) {
  const hashesByPlaceholder = /* @__PURE__ */ new Map();
  for (const [placeholder, { fileName }] of renderedChunksByPlaceholder) {
    let hash = createHash();
    const hashDependencyPlaceholders = /* @__PURE__ */ new Set([placeholder]);
    for (const dependencyPlaceholder of hashDependencyPlaceholders) {
      const { containedPlaceholders, contentHash } = hashDependenciesByPlaceholder.get(dependencyPlaceholder);
      hash.update(contentHash);
      for (const containedPlaceholder of containedPlaceholders) {
        hashDependencyPlaceholders.add(containedPlaceholder);
      }
    }
    let finalFileName;
    let finalHash;
    do {
      if (finalHash) {
        hash = createHash().update(finalHash);
      }
      finalHash = hash.digest("hex").slice(0, placeholder.length);
      finalFileName = replaceSinglePlaceholder(fileName, placeholder, finalHash);
    } while (bundle[lowercaseBundleKeys].has(finalFileName.toLowerCase()));
    bundle[finalFileName] = FILE_PLACEHOLDER;
    hashesByPlaceholder.set(placeholder, finalHash);
  }
  return hashesByPlaceholder;
}
function addChunksToBundle(renderedChunksByPlaceholder, hashesByPlaceholder, bundle, nonHashedChunksWithPlaceholders, pluginDriver, options) {
  for (const { chunk, code, fileName, map } of renderedChunksByPlaceholder.values()) {
    let updatedCode = replacePlaceholders(code, hashesByPlaceholder);
    const finalFileName = replacePlaceholders(fileName, hashesByPlaceholder);
    if (map) {
      map.file = replacePlaceholders(map.file, hashesByPlaceholder);
      updatedCode += emitSourceMapAndGetComment(finalFileName, map, pluginDriver, options);
    }
    bundle[finalFileName] = chunk.finalizeChunk(updatedCode, map, hashesByPlaceholder);
  }
  for (const { chunk, code, fileName, map } of nonHashedChunksWithPlaceholders) {
    let updatedCode = hashesByPlaceholder.size > 0 ? replacePlaceholders(code, hashesByPlaceholder) : code;
    if (map) {
      updatedCode += emitSourceMapAndGetComment(fileName, map, pluginDriver, options);
    }
    bundle[fileName] = chunk.finalizeChunk(updatedCode, map, hashesByPlaceholder);
  }
}
function emitSourceMapAndGetComment(fileName, map, pluginDriver, { sourcemap, sourcemapBaseUrl }) {
  let url;
  if (sourcemap === "inline") {
    url = map.toUrl();
  } else {
    const sourcemapFileName = `${(0, import_node_path.basename)(fileName)}.map`;
    url = sourcemapBaseUrl ? new URL(sourcemapFileName, sourcemapBaseUrl).toString() : sourcemapFileName;
    pluginDriver.emitFile({ fileName: `${fileName}.map`, source: map.toString(), type: "asset" });
  }
  return sourcemap === "hidden" ? "" : `//# ${SOURCEMAPPING_URL}=${url}
`;
}
function validateOptionsForMultiChunkOutput(outputOptions, onWarn) {
  if (outputOptions.format === "umd" || outputOptions.format === "iife")
    return error(errorInvalidOption("output.format", URL_OUTPUT_FORMAT, "UMD and IIFE output formats are not supported for code-splitting builds", outputOptions.format));
  if (typeof outputOptions.file === "string")
    return error(errorInvalidOption("output.file", URL_OUTPUT_DIR, 'when building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option'));
  if (outputOptions.sourcemapFile)
    return error(errorInvalidOption("output.sourcemapFile", URL_OUTPUT_SOURCEMAPFILE, '"output.sourcemapFile" is only supported for single-file builds'));
  if (!outputOptions.amd.autoId && outputOptions.amd.id)
    onWarn(errorInvalidOption("output.amd.id", URL_OUTPUT_AMD_ID, 'this option is only properly supported for single-file builds. Use "output.amd.autoId" and "output.amd.basePath" instead'));
}
function getIncludedModules(modulesById) {
  const includedModules = [];
  for (const module of modulesById.values()) {
    if (module instanceof Module && (module.isIncluded() || module.info.isEntry || module.includedDynamicImporters.length > 0)) {
      includedModules.push(module);
    }
  }
  return includedModules;
}
function getAbsoluteEntryModulePaths(includedModules, preserveModules) {
  const absoluteEntryModulePaths = [];
  for (const module of includedModules) {
    if ((module.info.isEntry || preserveModules) && isAbsolute(module.id)) {
      absoluteEntryModulePaths.push(module.id);
    }
  }
  return absoluteEntryModulePaths;
}
function getExternalChunkByModule(modulesById, outputOptions, inputBase) {
  const externalChunkByModule = /* @__PURE__ */ new Map();
  for (const module of modulesById.values()) {
    if (module instanceof ExternalModule) {
      externalChunkByModule.set(module, new ExternalChunk(module, outputOptions, inputBase));
    }
  }
  return externalChunkByModule;
}
function addModuleToManualChunk(alias, module, manualChunkAliasByEntry) {
  const existingAlias = manualChunkAliasByEntry.get(module);
  if (typeof existingAlias === "string" && existingAlias !== alias) {
    return error(errorCannotAssignModuleToChunk(module.id, alias, existingAlias));
  }
  manualChunkAliasByEntry.set(module, alias);
}
function isInAstralSet(code, set) {
  var pos = 65536;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) {
      return false;
    }
    pos += set[i + 1];
    if (pos >= code) {
      return true;
    }
  }
  return false;
}
function isIdentifierStart(code, astral) {
  if (code < 65) {
    return code === 36;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code, astral) {
  if (code < 48) {
    return code === 36;
  }
  if (code < 58) {
    return true;
  }
  if (code < 65) {
    return false;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
function kw(name, options) {
  if (options === void 0)
    options = {};
  options.keyword = name;
  return keywords[name] = new TokenType(name, options);
}
function isNewLine(code) {
  return code === 10 || code === 13 || code === 8232 || code === 8233;
}
function nextLineBreak(code, from, end) {
  if (end === void 0)
    end = code.length;
  for (var i = from; i < end; i++) {
    var next = code.charCodeAt(i);
    if (isNewLine(next)) {
      return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
    }
  }
  return -1;
}
function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
}
function codePointToString(code) {
  if (code <= 65535) {
    return String.fromCharCode(code);
  }
  code -= 65536;
  return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
}
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0; ; ) {
    var nextBreak = nextLineBreak(input, cur, offset2);
    if (nextBreak < 0) {
      return new Position(line, offset2 - cur);
    }
    ++line;
    cur = nextBreak;
  }
}
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) {
    options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
  }
  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion == null) {
    if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
      warnedAboutEcmaVersion = true;
      console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
    }
    options.ecmaVersion = 11;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }
  if (options.allowReserved == null) {
    options.allowReserved = options.ecmaVersion < 5;
  }
  if (!opts || opts.allowHashBang == null) {
    options.allowHashBang = options.ecmaVersion >= 14;
  }
  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  if (isArray(options.onComment)) {
    options.onComment = pushComment(options, options.onComment);
  }
  return options;
}
function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start,
      end
    };
    if (options.locations) {
      comment.loc = new SourceLocation(this, startLoc, endLoc);
    }
    if (options.ranges) {
      comment.range = [start, end];
    }
    array.push(comment);
  };
}
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
function isPrivateNameConflicted(privateNameMap, element) {
  var name = element.key.name;
  var curr = privateNameMap[name];
  var next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }
  if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
    privateNameMap[name] = "true";
    return false;
  } else if (!curr) {
    privateNameMap[name] = next;
    return false;
  } else {
    return true;
  }
}
function checkKeyName(node, name) {
  var computed = node.computed;
  var key = node.key;
  return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
}
function isPrivateFieldAccess(node) {
  return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression);
}
function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) {
    node.loc.end = loc;
  }
  if (this.options.ranges) {
    node.range[1] = pos;
  }
  return node;
}
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;
  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
}
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  if (ch >= 65 && ch <= 70) {
    return 10 + (ch - 65);
  }
  if (ch >= 97 && ch <= 102) {
    return 10 + (ch - 97);
  }
  return ch - 48;
}
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  if (isLegacyOctalNumericLiteral) {
    return parseInt(str, 8);
  }
  return parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  if (typeof BigInt !== "function") {
    return null;
  }
  return BigInt(str.replace(/_/g, ""));
}
function parse3(input, options) {
  return Parser.parse(input, options);
}
function parseExpressionAt2(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options);
}
function tokenizer2(input, options) {
  return Parser.tokenizer(input, options);
}
function flru(max) {
  var num, curr, prev;
  var limit = max || 1;
  function keep(key, value) {
    if (++num > limit) {
      prev = curr;
      reset2(1);
      ++num;
    }
    curr[key] = value;
  }
  function reset2(isPartial) {
    num = 0;
    curr = /* @__PURE__ */ Object.create(null);
    isPartial || (prev = /* @__PURE__ */ Object.create(null));
  }
  reset2();
  return {
    clear: reset2,
    has: function(key) {
      return curr[key] !== void 0 || prev[key] !== void 0;
    },
    get: function(key) {
      var val = curr[key];
      if (val !== void 0)
        return val;
      if ((val = prev[key]) !== void 0) {
        keep(key, val);
        return val;
      }
    },
    set: function(key, value) {
      if (curr[key] !== void 0) {
        curr[key] = value;
      } else {
        keep(key, value);
      }
    }
  };
}
function resolveIdViaPlugins(source, importer, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, assertions) {
  let skipped = null;
  let replaceContext = null;
  if (skip) {
    skipped = /* @__PURE__ */ new Set();
    for (const skippedCall of skip) {
      if (source === skippedCall.source && importer === skippedCall.importer) {
        skipped.add(skippedCall.plugin);
      }
    }
    replaceContext = (pluginContext, plugin) => ({
      ...pluginContext,
      resolve: (source2, importer2, { assertions: assertions2, custom, isEntry: isEntry2, skipSelf } = BLANK) => moduleLoaderResolveId(source2, importer2, custom, isEntry2, assertions2 || EMPTY_OBJECT, skipSelf ? [...skip, { importer: importer2, plugin, source: source2 }] : skip)
    });
  }
  return pluginDriver.hookFirstAndGetPlugin("resolveId", [source, importer, { assertions, custom: customOptions, isEntry }], replaceContext, skipped);
}
async function resolveId(source, importer, preserveSymlinks, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, assertions) {
  const pluginResult = await resolveIdViaPlugins(source, importer, pluginDriver, moduleLoaderResolveId, skip, customOptions, isEntry, assertions);
  if (pluginResult != null) {
    const [resolveIdResult, plugin] = pluginResult;
    if (typeof resolveIdResult === "object" && !resolveIdResult.resolvedBy) {
      return {
        ...resolveIdResult,
        resolvedBy: plugin.name
      };
    }
    if (typeof resolveIdResult === "string") {
      return {
        id: resolveIdResult,
        resolvedBy: plugin.name
      };
    }
    return resolveIdResult;
  }
  if (importer !== void 0 && !isAbsolute(source) && source[0] !== ".")
    return null;
  return addJsExtensionIfNecessary(importer ? (0, import_node_path.resolve)((0, import_node_path.dirname)(importer), source) : (0, import_node_path.resolve)(source), preserveSymlinks);
}
async function addJsExtensionIfNecessary(file, preserveSymlinks) {
  return await findFile(file, preserveSymlinks) ?? await findFile(file + ".mjs", preserveSymlinks) ?? await findFile(file + ".js", preserveSymlinks);
}
async function findFile(file, preserveSymlinks) {
  try {
    const stats = await (0, import_promises.lstat)(file);
    if (!preserveSymlinks && stats.isSymbolicLink())
      return await findFile(await (0, import_promises.realpath)(file), preserveSymlinks);
    if (preserveSymlinks && stats.isSymbolicLink() || stats.isFile()) {
      const name = (0, import_node_path.basename)(file);
      const files = await (0, import_promises.readdir)((0, import_node_path.dirname)(file));
      if (files.includes(name))
        return file;
    }
  } catch {
  }
}
function createPluginCache(cache) {
  return {
    delete(id) {
      return delete cache[id];
    },
    get(id) {
      const item = cache[id];
      if (!item)
        return;
      item[0] = 0;
      return item[1];
    },
    has(id) {
      const item = cache[id];
      if (!item)
        return false;
      item[0] = 0;
      return true;
    },
    set(id, value) {
      cache[id] = [0, value];
    }
  };
}
function getTrackedPluginCache(pluginCache, onUse) {
  return {
    delete(id) {
      onUse();
      return pluginCache.delete(id);
    },
    get(id) {
      onUse();
      return pluginCache.get(id);
    },
    has(id) {
      onUse();
      return pluginCache.has(id);
    },
    set(id, value) {
      onUse();
      return pluginCache.set(id, value);
    }
  };
}
function uncacheablePluginError(pluginName) {
  if (pluginName.startsWith(ANONYMOUS_PLUGIN_PREFIX) || pluginName.startsWith(ANONYMOUS_OUTPUT_PLUGIN_PREFIX)) {
    return error(errorAnonymousPluginCache());
  }
  return error(errorDuplicatePluginName(pluginName));
}
function getCacheForUncacheablePlugin(pluginName) {
  return {
    delete() {
      return uncacheablePluginError(pluginName);
    },
    get() {
      return uncacheablePluginError(pluginName);
    },
    has() {
      return uncacheablePluginError(pluginName);
    },
    set() {
      return uncacheablePluginError(pluginName);
    }
  };
}
async function transform(source, module, pluginDriver, warn) {
  const id = module.id;
  const sourcemapChain = [];
  let originalSourcemap = source.map === null ? null : decodedSourcemap(source.map);
  const originalCode = source.code;
  let ast = source.ast;
  const transformDependencies = [];
  const emittedFiles = [];
  let customTransformCache = false;
  const useCustomTransformCache = () => customTransformCache = true;
  let pluginName = "";
  const currentSource = source.code;
  function transformReducer(previousCode, result, plugin) {
    let code2;
    let map;
    if (typeof result === "string") {
      code2 = result;
    } else if (result && typeof result === "object") {
      module.updateOptions(result);
      if (result.code == null) {
        if (result.map || result.ast) {
          warn(errorNoTransformMapOrAstWithoutCode(plugin.name));
        }
        return previousCode;
      }
      ({ code: code2, map, ast } = result);
    } else {
      return previousCode;
    }
    if (map !== null) {
      sourcemapChain.push(decodedSourcemap(typeof map === "string" ? JSON.parse(map) : map) || {
        missing: true,
        plugin: plugin.name
      });
    }
    return code2;
  }
  let code;
  try {
    code = await pluginDriver.hookReduceArg0("transform", [currentSource, id], transformReducer, (pluginContext, plugin) => {
      pluginName = plugin.name;
      return {
        ...pluginContext,
        addWatchFile(id2) {
          transformDependencies.push(id2);
          pluginContext.addWatchFile(id2);
        },
        cache: customTransformCache ? pluginContext.cache : getTrackedPluginCache(pluginContext.cache, useCustomTransformCache),
        emitFile(emittedFile) {
          emittedFiles.push(emittedFile);
          return pluginDriver.emitFile(emittedFile);
        },
        error(error_, pos) {
          if (typeof error_ === "string")
            error_ = { message: error_ };
          if (pos)
            augmentCodeLocation(error_, pos, currentSource, id);
          error_.id = id;
          error_.hook = "transform";
          return pluginContext.error(error_);
        },
        getCombinedSourcemap() {
          const combinedMap = collapseSourcemap(id, originalCode, originalSourcemap, sourcemapChain, warn);
          if (!combinedMap) {
            const magicString = new MagicString(originalCode);
            return magicString.generateMap({ hires: true, includeContent: true, source: id });
          }
          if (originalSourcemap !== combinedMap) {
            originalSourcemap = combinedMap;
            sourcemapChain.length = 0;
          }
          return new SourceMap({
            ...combinedMap,
            file: null,
            sourcesContent: combinedMap.sourcesContent
          });
        },
        setAssetSource() {
          return this.error(errorInvalidSetAssetSourceCall());
        },
        warn(warning, pos) {
          if (typeof warning === "string")
            warning = { message: warning };
          if (pos)
            augmentCodeLocation(warning, pos, currentSource, id);
          warning.id = id;
          warning.hook = "transform";
          pluginContext.warn(warning);
        }
      };
    });
  } catch (error_) {
    return error(errorPluginError(error_, pluginName, { hook: "transform", id }));
  }
  if (!customTransformCache && // files emitted by a transform hook need to be emitted again if the hook is skipped
  emittedFiles.length > 0)
    module.transformFiles = emittedFiles;
  return {
    ast,
    code,
    customTransformCache,
    originalCode,
    originalSourcemap,
    sourcemapChain,
    transformDependencies
  };
}
function normalizeRelativeExternalId(source, importer) {
  return isRelative(source) ? importer ? (0, import_node_path.resolve)(importer, "..", source) : (0, import_node_path.resolve)(source) : source;
}
function addChunkNamesToModule(module, { fileName, name }, isUserDefined, priority) {
  var _a;
  if (fileName !== null) {
    module.chunkFileNames.add(fileName);
  } else if (name !== null) {
    let namePosition = 0;
    while (((_a = module.chunkNames[namePosition]) == null ? void 0 : _a.priority) < priority)
      namePosition++;
    module.chunkNames.splice(namePosition, 0, { isUserDefined, name, priority });
  }
}
function isNotAbsoluteExternal(id, source, makeAbsoluteExternalsRelative) {
  return makeAbsoluteExternalsRelative === true || makeAbsoluteExternalsRelative === "ifRelativeSource" && isRelative(source) || !isAbsolute(id);
}
async function waitForDependencyResolution(loadPromise) {
  const [resolveStaticDependencyPromises, resolveDynamicImportPromises] = await loadPromise;
  return Promise.all([...resolveStaticDependencyPromises, ...resolveDynamicImportPromises]);
}
function getSourceHash(source) {
  return createHash().update(source).digest("hex");
}
function generateAssetFileName(name, source, sourceHash, outputOptions, bundle) {
  const emittedName = outputOptions.sanitizeFileName(name || "asset");
  return makeUnique(renderNamePattern(typeof outputOptions.assetFileNames === "function" ? outputOptions.assetFileNames({ name, source, type: "asset" }) : outputOptions.assetFileNames, "output.assetFileNames", {
    ext: () => (0, import_node_path.extname)(emittedName).slice(1),
    extname: () => (0, import_node_path.extname)(emittedName),
    hash: (size) => sourceHash.slice(0, Math.max(0, size || defaultHashSize)),
    name: () => emittedName.slice(0, Math.max(0, emittedName.length - (0, import_node_path.extname)(emittedName).length))
  }), bundle);
}
function reserveFileNameInBundle(fileName, { bundle }, warn) {
  if (bundle[lowercaseBundleKeys].has(fileName.toLowerCase())) {
    warn(errorFileNameConflict(fileName));
  } else {
    bundle[fileName] = FILE_PLACEHOLDER;
  }
}
function hasValidType(emittedFile) {
  return Boolean(emittedFile && (emittedFile.type === "asset" || emittedFile.type === "chunk"));
}
function hasValidName(emittedFile) {
  const validatedName = emittedFile.fileName || emittedFile.name;
  return !validatedName || typeof validatedName === "string" && !isPathFragment(validatedName);
}
function getValidSource(source, emittedFile, fileReferenceId) {
  if (!(typeof source === "string" || source instanceof Uint8Array)) {
    const assetName = emittedFile.fileName || emittedFile.name || fileReferenceId;
    return error(errorFailedValidation(`Could not set source for ${typeof assetName === "string" ? `asset "${assetName}"` : "unnamed asset"}, asset source needs to be a string, Uint8Array or Buffer.`));
  }
  return source;
}
function getAssetFileName(file, referenceId) {
  if (typeof file.fileName !== "string") {
    return error(errorAssetNotFinalisedForFileName(file.name || referenceId));
  }
  return file.fileName;
}
function getChunkFileName(file, facadeChunkByModule) {
  if (file.fileName) {
    return file.fileName;
  }
  if (facadeChunkByModule) {
    return facadeChunkByModule.get(file.module).getFileName();
  }
  return error(errorChunkNotGeneratedForFileName(file.fileName || file.name));
}
function getPluginContext(plugin, pluginCache, graph, options, fileEmitter, existingPluginNames) {
  let cacheable = true;
  if (typeof plugin.cacheKey !== "string") {
    if (plugin.name.startsWith(ANONYMOUS_PLUGIN_PREFIX) || plugin.name.startsWith(ANONYMOUS_OUTPUT_PLUGIN_PREFIX) || existingPluginNames.has(plugin.name)) {
      cacheable = false;
    } else {
      existingPluginNames.add(plugin.name);
    }
  }
  let cacheInstance;
  if (!pluginCache) {
    cacheInstance = NO_CACHE;
  } else if (cacheable) {
    const cacheKey = plugin.cacheKey || plugin.name;
    cacheInstance = createPluginCache(pluginCache[cacheKey] || (pluginCache[cacheKey] = /* @__PURE__ */ Object.create(null)));
  } else {
    cacheInstance = getCacheForUncacheablePlugin(plugin.name);
  }
  return {
    addWatchFile(id) {
      if (graph.phase >= BuildPhase.GENERATE) {
        return this.error(errorInvalidRollupPhaseForAddWatchFile());
      }
      graph.watchFiles[id] = true;
    },
    cache: cacheInstance,
    emitFile: fileEmitter.emitFile.bind(fileEmitter),
    error(error_) {
      return error(errorPluginError(error_, plugin.name));
    },
    getFileName: fileEmitter.getFileName,
    getModuleIds: () => graph.modulesById.keys(),
    getModuleInfo: graph.getModuleInfo,
    getWatchFiles: () => Object.keys(graph.watchFiles),
    load(resolvedId) {
      return graph.moduleLoader.preloadModule(resolvedId);
    },
    meta: {
      rollupVersion: version$1,
      watchMode: graph.watchMode
    },
    get moduleIds() {
      function* wrappedModuleIds() {
        warnDeprecation(`Accessing "this.moduleIds" on the plugin context by plugin ${plugin.name} is deprecated. The "this.getModuleIds" plugin context function should be used instead.`, URL_THIS_GETMODULEIDS, true, options, plugin.name);
        yield* moduleIds;
      }
      const moduleIds = graph.modulesById.keys();
      return wrappedModuleIds();
    },
    parse: graph.contextParse.bind(graph),
    resolve(source, importer, { assertions, custom, isEntry, skipSelf } = BLANK) {
      return graph.moduleLoader.resolveId(source, importer, custom, isEntry, assertions || EMPTY_OBJECT, skipSelf ? [{ importer, plugin, source }] : null);
    },
    setAssetSource: fileEmitter.setAssetSource,
    warn(warning) {
      if (typeof warning === "string")
        warning = { message: warning };
      if (warning.code)
        warning.pluginCode = warning.code;
      warning.code = "PLUGIN_WARNING";
      warning.plugin = plugin.name;
      options.onwarn(warning);
    }
  };
}
function getSortedValidatedPlugins(hookName, plugins, validateHandler = validateFunctionPluginHandler) {
  const pre = [];
  const normal = [];
  const post = [];
  for (const plugin of plugins) {
    const hook = plugin[hookName];
    if (hook) {
      if (typeof hook === "object") {
        validateHandler(hook.handler, hookName, plugin);
        if (hook.order === "pre") {
          pre.push(plugin);
          continue;
        }
        if (hook.order === "post") {
          post.push(plugin);
          continue;
        }
      } else {
        validateHandler(hook, hookName, plugin);
      }
      normal.push(plugin);
    }
  }
  return [...pre, ...normal, ...post];
}
function validateFunctionPluginHandler(handler, hookName, plugin) {
  if (typeof handler !== "function") {
    error(errorInvalidFunctionPluginHook(hookName, plugin.name));
  }
}
function validateAddonPluginHandler(handler, hookName, plugin) {
  if (typeof handler !== "string" && typeof handler !== "function") {
    return error(errorInvalidAddonPluginHook(hookName, plugin.name));
  }
}
function noReturn() {
}
function normalizeEntryModules(entryModules) {
  if (Array.isArray(entryModules)) {
    return entryModules.map((id) => ({
      fileName: null,
      id,
      implicitlyLoadedAfter: [],
      importer: void 0,
      name: null
    }));
  }
  return Object.entries(entryModules).map(([name, id]) => ({
    fileName: null,
    id,
    implicitlyLoadedAfter: [],
    importer: void 0,
    name
  }));
}
function formatAction([pluginName, hookName, parameters]) {
  const action = `(${pluginName}) ${hookName}`;
  const s = JSON.stringify;
  switch (hookName) {
    case "resolveId": {
      return `${action} ${s(parameters[0])} ${s(parameters[1])}`;
    }
    case "load": {
      return `${action} ${s(parameters[0])}`;
    }
    case "transform": {
      return `${action} ${s(parameters[1])}`;
    }
    case "shouldTransformCachedModule": {
      return `${action} ${s(parameters[0].id)}`;
    }
    case "moduleParsed": {
      return `${action} ${s(parameters[0].id)}`;
    }
  }
  return action;
}
async function catchUnfinishedHookActions(pluginDriver, callback) {
  let handleEmptyEventLoop;
  const emptyEventLoopPromise = new Promise((_, reject) => {
    handleEmptyEventLoop = () => {
      const unfulfilledActions = pluginDriver.getUnfulfilledHookActions();
      reject(new Error(`Unexpected early exit. This happens when Promises returned by plugins cannot resolve. Unfinished hook action(s) on exit:
` + [...unfulfilledActions].map(formatAction).join("\n")));
    };
    beforeExitEmitter.once(beforeExitEvent, handleEmptyEventLoop);
  });
  const result = await Promise.race([callback(), emptyEventLoopPromise]);
  beforeExitEmitter.off(beforeExitEvent, handleEmptyEventLoop);
  return result;
}
function importAssertions(Parser3) {
  const acorn = Parser3.acorn || _acorn;
  const { tokTypes: tt, TokenType: TokenType3 } = acorn;
  return class extends Parser3 {
    constructor(...args) {
      super(...args);
      this.assertToken = new TokenType3(keyword);
    }
    _codeAt(i) {
      return this.input.charCodeAt(i);
    }
    _eat(t) {
      if (this.type !== t) {
        this.unexpected();
      }
      this.next();
    }
    readToken(code) {
      let i = 0;
      for (; i < keyword.length; i++) {
        if (this._codeAt(this.pos + i) !== keyword.charCodeAt(i)) {
          return super.readToken(code);
        }
      }
      for (; ; i++) {
        if (this._codeAt(this.pos + i) === leftCurlyBrace) {
          break;
        } else if (this._codeAt(this.pos + i) === space) {
          continue;
        } else {
          return super.readToken(code);
        }
      }
      if (this.type.label === "{") {
        return super.readToken(code);
      }
      this.pos += keyword.length;
      return this.finishToken(this.assertToken);
    }
    parseDynamicImport(node) {
      this.next();
      node.source = this.parseMaybeAssign();
      if (this.eat(tt.comma)) {
        const obj = this.parseObj(false);
        node.arguments = [obj];
      }
      this._eat(tt.parenR);
      return this.finishNode(node, "ImportExpression");
    }
    // ported from acorn/src/statement.js pp.parseExport
    parseExport(node, exports) {
      this.next();
      if (this.eat(tt.star)) {
        if (this.options.ecmaVersion >= 11) {
          if (this.eatContextual("as")) {
            node.exported = this.parseIdent(true);
            this.checkExport(exports, node.exported.name, this.lastTokStart);
          } else {
            node.exported = null;
          }
        }
        this.expectContextual("from");
        if (this.type !== tt.string) {
          this.unexpected();
        }
        node.source = this.parseExprAtom();
        if (this.type === this.assertToken) {
          this.next();
          const assertions = this.parseImportAssertions();
          if (assertions) {
            node.assertions = assertions;
          }
        }
        this.semicolon();
        return this.finishNode(node, "ExportAllDeclaration");
      }
      if (this.eat(tt._default)) {
        this.checkExport(exports, "default", this.lastTokStart);
        var isAsync;
        if (this.type === tt._function || (isAsync = this.isAsyncFunction())) {
          var fNode = this.startNode();
          this.next();
          if (isAsync) {
            this.next();
          }
          node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
        } else if (this.type === tt._class) {
          var cNode = this.startNode();
          node.declaration = this.parseClass(cNode, "nullableID");
        } else {
          node.declaration = this.parseMaybeAssign();
          this.semicolon();
        }
        return this.finishNode(node, "ExportDefaultDeclaration");
      }
      if (this.shouldParseExportStatement()) {
        node.declaration = this.parseStatement(null);
        if (node.declaration.type === "VariableDeclaration") {
          this.checkVariableExport(exports, node.declaration.declarations);
        } else {
          this.checkExport(exports, node.declaration.id.name, node.declaration.id.start);
        }
        node.specifiers = [];
        node.source = null;
      } else {
        node.declaration = null;
        node.specifiers = this.parseExportSpecifiers(exports);
        if (this.eatContextual("from")) {
          if (this.type !== tt.string) {
            this.unexpected();
          }
          node.source = this.parseExprAtom();
          if (this.type === this.assertToken) {
            this.next();
            const assertions = this.parseImportAssertions();
            if (assertions) {
              node.assertions = assertions;
            }
          }
        } else {
          for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
            var spec = list[i];
            this.checkUnreserved(spec.local);
            this.checkLocalExport(spec.local);
          }
          node.source = null;
        }
        this.semicolon();
      }
      return this.finishNode(node, "ExportNamedDeclaration");
    }
    parseImport(node) {
      this.next();
      if (this.type === tt.string) {
        node.specifiers = [];
        node.source = this.parseExprAtom();
      } else {
        node.specifiers = this.parseImportSpecifiers();
        this.expectContextual("from");
        node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
      }
      if (this.type === this.assertToken) {
        this.next();
        const assertions = this.parseImportAssertions();
        if (assertions) {
          node.assertions = assertions;
        }
      }
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    }
    parseImportAssertions() {
      this._eat(tt.braceL);
      const attrs = this.parseAssertEntries();
      this._eat(tt.braceR);
      return attrs;
    }
    parseAssertEntries() {
      const attrs = [];
      const attrNames = /* @__PURE__ */ new Set();
      do {
        if (this.type === tt.braceR) {
          break;
        }
        const node = this.startNode();
        let assertionKeyNode;
        if (this.type === tt.string) {
          assertionKeyNode = this.parseLiteral(this.value);
        } else {
          assertionKeyNode = this.parseIdent(true);
        }
        this.next();
        node.key = assertionKeyNode;
        if (attrNames.has(node.key.name)) {
          this.raise(this.pos, "Duplicated key in assertions");
        }
        attrNames.add(node.key.name);
        if (this.type !== tt.string) {
          this.raise(
            this.pos,
            "Only string is supported as an assertion value"
          );
        }
        node.value = this.parseLiteral(this.value);
        attrs.push(this.finishNode(node, "ImportAttribute"));
      } while (this.eat(tt.comma));
      return attrs;
    }
  };
}
function ensureArray(items) {
  if (Array.isArray(items)) {
    return items.filter(Boolean);
  }
  if (items) {
    return [items];
  }
  return [];
}
async function asyncFlatten(array) {
  do {
    array = (await Promise.all(array)).flat(Infinity);
  } while (array.some((v) => v == null ? void 0 : v.then));
  return array;
}
function warnUnknownOptions(passedOptions, validOptions, optionType, warn, ignoredKeys = /$./) {
  const validOptionSet = new Set(validOptions);
  const unknownOptions = Object.keys(passedOptions).filter((key) => !(validOptionSet.has(key) || ignoredKeys.test(key)));
  if (unknownOptions.length > 0) {
    warn(errorUnknownOption(optionType, unknownOptions, [...validOptionSet].sort()));
  }
}
async function normalizeInputOptions(config) {
  const unsetOptions = /* @__PURE__ */ new Set();
  const context = config.context ?? "undefined";
  const onwarn = getOnwarn(config);
  const strictDeprecations = config.strictDeprecations || false;
  const maxParallelFileOps = getmaxParallelFileOps(config, onwarn, strictDeprecations);
  const options = {
    acorn: getAcorn(config),
    acornInjectPlugins: getAcornInjectPlugins(config),
    cache: getCache(config),
    context,
    experimentalCacheExpiry: config.experimentalCacheExpiry ?? 10,
    experimentalLogSideEffects: config.experimentalLogSideEffects || false,
    external: getIdMatcher(config.external),
    inlineDynamicImports: getInlineDynamicImports$1(config, onwarn, strictDeprecations),
    input: getInput(config),
    makeAbsoluteExternalsRelative: config.makeAbsoluteExternalsRelative ?? "ifRelativeSource",
    manualChunks: getManualChunks$1(config, onwarn, strictDeprecations),
    maxParallelFileOps,
    maxParallelFileReads: maxParallelFileOps,
    moduleContext: getModuleContext(config, context),
    onwarn,
    perf: config.perf || false,
    plugins: await normalizePluginOption(config.plugins),
    preserveEntrySignatures: config.preserveEntrySignatures ?? "exports-only",
    preserveModules: getPreserveModules$1(config, onwarn, strictDeprecations),
    preserveSymlinks: config.preserveSymlinks || false,
    shimMissingExports: config.shimMissingExports || false,
    strictDeprecations,
    treeshake: getTreeshake(config)
  };
  warnUnknownOptions(config, [...Object.keys(options), "watch"], "input options", options.onwarn, /^(output)$/);
  return { options, unsetOptions };
}
function sanitizeFileName(name) {
  const match = DRIVE_LETTER_REGEX.exec(name);
  const driveLetter = match ? match[0] : "";
  return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "_");
}
async function normalizeOutputOptions(config, inputOptions, unsetInputOptions) {
  const unsetOptions = new Set(unsetInputOptions);
  const compact = config.compact || false;
  const format = getFormat(config);
  const inlineDynamicImports = getInlineDynamicImports(config, inputOptions);
  const preserveModules = getPreserveModules(config, inlineDynamicImports, inputOptions);
  const file = getFile(config, preserveModules, inputOptions);
  const preferConst = getPreferConst(config, inputOptions);
  const generatedCode = getGeneratedCode(config, preferConst);
  const outputOptions = {
    amd: getAmd(config),
    assetFileNames: config.assetFileNames ?? "assets/[name]-[hash][extname]",
    banner: getAddon(config, "banner"),
    chunkFileNames: config.chunkFileNames ?? "[name]-[hash].js",
    compact,
    dir: getDir(config, file),
    dynamicImportFunction: getDynamicImportFunction(config, inputOptions, format),
    dynamicImportInCjs: config.dynamicImportInCjs ?? true,
    entryFileNames: getEntryFileNames(config, unsetOptions),
    esModule: config.esModule ?? "if-default-prop",
    experimentalDeepDynamicChunkOptimization: getExperimentalDeepDynamicChunkOptimization(config, inputOptions),
    experimentalMinChunkSize: config.experimentalMinChunkSize || 0,
    exports: getExports(config, unsetOptions),
    extend: config.extend || false,
    externalImportAssertions: config.externalImportAssertions ?? true,
    externalLiveBindings: config.externalLiveBindings ?? true,
    file,
    footer: getAddon(config, "footer"),
    format,
    freeze: config.freeze ?? true,
    generatedCode,
    globals: config.globals || {},
    hoistTransitiveImports: config.hoistTransitiveImports ?? true,
    indent: getIndent(config, compact),
    inlineDynamicImports,
    interop: getInterop(config),
    intro: getAddon(config, "intro"),
    manualChunks: getManualChunks(config, inlineDynamicImports, preserveModules, inputOptions),
    minifyInternalExports: getMinifyInternalExports(config, format, compact),
    name: config.name,
    namespaceToStringTag: getNamespaceToStringTag(config, generatedCode, inputOptions),
    noConflict: config.noConflict || false,
    outro: getAddon(config, "outro"),
    paths: config.paths || {},
    plugins: await normalizePluginOption(config.plugins),
    preferConst,
    preserveModules,
    preserveModulesRoot: getPreserveModulesRoot(config),
    sanitizeFileName: typeof config.sanitizeFileName === "function" ? config.sanitizeFileName : config.sanitizeFileName === false ? (id) => id : sanitizeFileName,
    sourcemap: config.sourcemap || false,
    sourcemapBaseUrl: getSourcemapBaseUrl(config),
    sourcemapExcludeSources: config.sourcemapExcludeSources || false,
    sourcemapFile: config.sourcemapFile,
    sourcemapIgnoreList: typeof config.sourcemapIgnoreList === "function" ? config.sourcemapIgnoreList : config.sourcemapIgnoreList === false ? () => false : (relativeSourcePath) => relativeSourcePath.includes("node_modules"),
    sourcemapPathTransform: config.sourcemapPathTransform,
    strict: config.strict ?? true,
    systemNullSetters: config.systemNullSetters ?? true,
    validate: config.validate || false
  };
  warnUnknownOptions(config, Object.keys(outputOptions), "output options", inputOptions.onwarn);
  return { options: outputOptions, unsetOptions };
}
function getExperimentalDeepDynamicChunkOptimization(config, inputOptions) {
  const configExperimentalDeepDynamicChunkOptimization = config.experimentalDeepDynamicChunkOptimization;
  if (configExperimentalDeepDynamicChunkOptimization != null) {
    warnDeprecation(`The "output.experimentalDeepDynamicChunkOptimization" option is deprecated as Rollup always runs the full chunking algorithm now. The option should be removed.`, URL_OUTPUT_EXPERIMENTALDEEPCHUNKOPTIMIZATION, true, inputOptions);
  }
  return configExperimentalDeepDynamicChunkOptimization || false;
}
function getExports(config, unsetOptions) {
  const configExports = config.exports;
  if (configExports == null) {
    unsetOptions.add("exports");
  } else if (!["default", "named", "none", "auto"].includes(configExports)) {
    return error(errorInvalidExportOptionValue(configExports));
  }
  return configExports || "auto";
}
function rollup(rawInputOptions) {
  return rollupInternal(rawInputOptions, null);
}
async function rollupInternal(rawInputOptions, watcher) {
  const { options: inputOptions, unsetOptions: unsetInputOptions } = await getInputOptions(rawInputOptions, watcher !== null);
  initialiseTimers(inputOptions);
  const graph = new Graph(inputOptions, watcher);
  const useCache = rawInputOptions.cache !== false;
  if (rawInputOptions.cache) {
    inputOptions.cache = void 0;
    rawInputOptions.cache = void 0;
  }
  timeStart("BUILD", 1);
  await catchUnfinishedHookActions(graph.pluginDriver, async () => {
    try {
      timeStart("initialize", 2);
      await graph.pluginDriver.hookParallel("buildStart", [inputOptions]);
      timeEnd("initialize", 2);
      await graph.build();
    } catch (error_) {
      const watchFiles = Object.keys(graph.watchFiles);
      if (watchFiles.length > 0) {
        error_.watchFiles = watchFiles;
      }
      await graph.pluginDriver.hookParallel("buildEnd", [error_]);
      await graph.pluginDriver.hookParallel("closeBundle", []);
      throw error_;
    }
    await graph.pluginDriver.hookParallel("buildEnd", []);
  });
  timeEnd("BUILD", 1);
  const result = {
    cache: useCache ? graph.getCache() : void 0,
    async close() {
      if (result.closed)
        return;
      result.closed = true;
      await graph.pluginDriver.hookParallel("closeBundle", []);
    },
    closed: false,
    async generate(rawOutputOptions) {
      if (result.closed)
        return error(errorAlreadyClosed());
      return handleGenerateWrite(false, inputOptions, unsetInputOptions, rawOutputOptions, graph);
    },
    watchFiles: Object.keys(graph.watchFiles),
    async write(rawOutputOptions) {
      if (result.closed)
        return error(errorAlreadyClosed());
      return handleGenerateWrite(true, inputOptions, unsetInputOptions, rawOutputOptions, graph);
    }
  };
  if (inputOptions.perf)
    result.getTimings = getTimings;
  return result;
}
async function getInputOptions(rawInputOptions, watchMode) {
  if (!rawInputOptions) {
    throw new Error("You must supply an options object to rollup");
  }
  const rawPlugins = getSortedValidatedPlugins("options", await normalizePluginOption(rawInputOptions.plugins));
  const { options, unsetOptions } = await normalizeInputOptions(await rawPlugins.reduce(applyOptionHook(watchMode), Promise.resolve(rawInputOptions)));
  normalizePlugins(options.plugins, ANONYMOUS_PLUGIN_PREFIX);
  return { options, unsetOptions };
}
function applyOptionHook(watchMode) {
  return async (inputOptions, plugin) => {
    const handler = "handler" in plugin.options ? plugin.options.handler : plugin.options;
    return await handler.call({ meta: { rollupVersion: version$1, watchMode } }, await inputOptions) || inputOptions;
  };
}
function normalizePlugins(plugins, anonymousPrefix) {
  for (const [index, plugin] of plugins.entries()) {
    if (!plugin.name) {
      plugin.name = `${anonymousPrefix}${index + 1}`;
    }
  }
}
async function handleGenerateWrite(isWrite, inputOptions, unsetInputOptions, rawOutputOptions, graph) {
  const { options: outputOptions, outputPluginDriver, unsetOptions } = await getOutputOptionsAndPluginDriver(rawOutputOptions, graph.pluginDriver, inputOptions, unsetInputOptions);
  return catchUnfinishedHookActions(outputPluginDriver, async () => {
    const bundle = new Bundle2(outputOptions, unsetOptions, inputOptions, outputPluginDriver, graph);
    const generated = await bundle.generate(isWrite);
    if (isWrite) {
      timeStart("WRITE", 1);
      if (!outputOptions.dir && !outputOptions.file) {
        return error(errorMissingFileOrDirOption());
      }
      await Promise.all(Object.values(generated).map((chunk) => graph.fileOperationQueue.run(() => writeOutputFile(chunk, outputOptions))));
      await outputPluginDriver.hookParallel("writeBundle", [outputOptions, generated]);
      timeEnd("WRITE", 1);
    }
    return createOutput(generated);
  });
}
async function getOutputOptionsAndPluginDriver(rawOutputOptions, inputPluginDriver, inputOptions, unsetInputOptions) {
  if (!rawOutputOptions) {
    throw new Error("You must supply an options object");
  }
  const rawPlugins = await normalizePluginOption(rawOutputOptions.plugins);
  normalizePlugins(rawPlugins, ANONYMOUS_OUTPUT_PLUGIN_PREFIX);
  const outputPluginDriver = inputPluginDriver.createOutputPluginDriver(rawPlugins);
  return {
    ...await getOutputOptions(inputOptions, unsetInputOptions, rawOutputOptions, outputPluginDriver),
    outputPluginDriver
  };
}
function getOutputOptions(inputOptions, unsetInputOptions, rawOutputOptions, outputPluginDriver) {
  return normalizeOutputOptions(outputPluginDriver.hookReduceArg0Sync("outputOptions", [rawOutputOptions], (outputOptions, result) => result || outputOptions, (pluginContext) => {
    const emitError = () => pluginContext.error(errorCannotEmitFromOptionsHook());
    return {
      ...pluginContext,
      emitFile: emitError,
      setAssetSource: emitError
    };
  }), inputOptions, unsetInputOptions);
}
function createOutput(outputBundle) {
  return {
    output: Object.values(outputBundle).filter((outputFile) => Object.keys(outputFile).length > 0).sort((outputFileA, outputFileB) => getSortingFileType(outputFileA) - getSortingFileType(outputFileB))
  };
}
function getSortingFileType(file) {
  if (file.type === "asset") {
    return SortingFileType.ASSET;
  }
  if (file.isEntry) {
    return SortingFileType.ENTRY_CHUNK;
  }
  return SortingFileType.SECONDARY_CHUNK;
}
async function writeOutputFile(outputFile, outputOptions) {
  const fileName = (0, import_node_path.resolve)(outputOptions.dir || (0, import_node_path.dirname)(outputOptions.file), outputFile.fileName);
  await (0, import_promises.mkdir)((0, import_node_path.dirname)(fileName), { recursive: true });
  return (0, import_promises.writeFile)(fileName, outputFile.type === "asset" ? outputFile.source : outputFile.code);
}
function defineConfig(options) {
  return options;
}
function handleError(error2, recover = false) {
  var _a, _b;
  const name = error2.name || ((_a = error2.cause) == null ? void 0 : _a.name);
  const nameSection = name ? `${name}: ` : "";
  const pluginSection = error2.plugin ? `(plugin ${error2.plugin}) ` : "";
  const message = `${pluginSection}${nameSection}${error2.message}`;
  const outputLines = [bold(red(`[!] ${bold(message.toString())}`))];
  if (error2.url) {
    outputLines.push(cyan(error2.url));
  }
  if (error2.loc) {
    outputLines.push(`${relativeId(error2.loc.file || error2.id)} (${error2.loc.line}:${error2.loc.column})`);
  } else if (error2.id) {
    outputLines.push(relativeId(error2.id));
  }
  if (error2.frame) {
    outputLines.push(dim(error2.frame));
  }
  if (error2.stack) {
    outputLines.push(dim((_b = error2.stack) == null ? void 0 : _b.replace(`${nameSection}${error2.message}
`, "")));
  }
  outputLines.push("", "");
  stderr(outputLines.join("\n"));
  if (!recover)
    import_node_process.default.exit(1);
}
async function mergeOptions(config, rawCommandOptions = EMPTY_COMMAND_OPTIONS, defaultOnWarnHandler = defaultOnWarn) {
  const command = getCommandOptions(rawCommandOptions);
  const inputOptions = await mergeInputOptions(config, command, defaultOnWarnHandler);
  const warn = inputOptions.onwarn;
  if (command.output) {
    Object.assign(command, command.output);
  }
  const outputOptionsArray = ensureArray(config.output);
  if (outputOptionsArray.length === 0)
    outputOptionsArray.push({});
  const outputOptions = await Promise.all(outputOptionsArray.map((singleOutputOptions) => mergeOutputOptions(singleOutputOptions, command, warn)));
  warnUnknownOptions(command, [
    ...Object.keys(inputOptions),
    ...Object.keys(outputOptions[0]).filter((option) => option !== "sourcemapIgnoreList" && option !== "sourcemapPathTransform"),
    ...Object.keys(commandAliases),
    "bundleConfigAsCjs",
    "config",
    "environment",
    "plugin",
    "silent",
    "failAfterWarnings",
    "stdin",
    "waitForBundleInput",
    "configPlugin"
  ], "CLI flags", warn, /^_$|output$|config/);
  inputOptions.output = outputOptions;
  return inputOptions;
}
function getCommandOptions(rawCommandOptions) {
  const external = rawCommandOptions.external && typeof rawCommandOptions.external === "string" ? rawCommandOptions.external.split(",") : [];
  return {
    ...rawCommandOptions,
    external,
    globals: typeof rawCommandOptions.globals === "string" ? rawCommandOptions.globals.split(",").reduce((globals, globalDefinition) => {
      const [id, variableName] = globalDefinition.split(":");
      globals[id] = variableName;
      if (!external.includes(id)) {
        external.push(id);
      }
      return globals;
    }, /* @__PURE__ */ Object.create(null)) : void 0
  };
}
async function mergeInputOptions(config, overrides, defaultOnWarnHandler) {
  const getOption = (name) => overrides[name] ?? config[name];
  const inputOptions = {
    acorn: getOption("acorn"),
    acornInjectPlugins: config.acornInjectPlugins,
    cache: config.cache,
    context: getOption("context"),
    experimentalCacheExpiry: getOption("experimentalCacheExpiry"),
    experimentalLogSideEffects: getOption("experimentalLogSideEffects"),
    external: getExternal(config, overrides),
    inlineDynamicImports: getOption("inlineDynamicImports"),
    input: getOption("input") || [],
    makeAbsoluteExternalsRelative: getOption("makeAbsoluteExternalsRelative"),
    manualChunks: getOption("manualChunks"),
    maxParallelFileOps: getOption("maxParallelFileOps"),
    maxParallelFileReads: getOption("maxParallelFileReads"),
    moduleContext: getOption("moduleContext"),
    onwarn: getOnWarn(config, defaultOnWarnHandler),
    perf: getOption("perf"),
    plugins: await normalizePluginOption(config.plugins),
    preserveEntrySignatures: getOption("preserveEntrySignatures"),
    preserveModules: getOption("preserveModules"),
    preserveSymlinks: getOption("preserveSymlinks"),
    shimMissingExports: getOption("shimMissingExports"),
    strictDeprecations: getOption("strictDeprecations"),
    treeshake: getObjectOption(config, overrides, "treeshake", objectifyOptionWithPresets(treeshakePresets, "treeshake", URL_TREESHAKE, "false, true, ")),
    watch: getWatch(config, overrides)
  };
  warnUnknownOptions(config, Object.keys(inputOptions), "input options", inputOptions.onwarn, /^output$/);
  return inputOptions;
}
async function mergeOutputOptions(config, overrides, warn) {
  const getOption = (name) => overrides[name] ?? config[name];
  const outputOptions = {
    amd: getObjectOption(config, overrides, "amd"),
    assetFileNames: getOption("assetFileNames"),
    banner: getOption("banner"),
    chunkFileNames: getOption("chunkFileNames"),
    compact: getOption("compact"),
    dir: getOption("dir"),
    dynamicImportFunction: getOption("dynamicImportFunction"),
    dynamicImportInCjs: getOption("dynamicImportInCjs"),
    entryFileNames: getOption("entryFileNames"),
    esModule: getOption("esModule"),
    experimentalDeepDynamicChunkOptimization: getOption("experimentalDeepDynamicChunkOptimization"),
    experimentalMinChunkSize: getOption("experimentalMinChunkSize"),
    exports: getOption("exports"),
    extend: getOption("extend"),
    externalImportAssertions: getOption("externalImportAssertions"),
    externalLiveBindings: getOption("externalLiveBindings"),
    file: getOption("file"),
    footer: getOption("footer"),
    format: getOption("format"),
    freeze: getOption("freeze"),
    generatedCode: getObjectOption(config, overrides, "generatedCode", objectifyOptionWithPresets(generatedCodePresets, "output.generatedCode", URL_OUTPUT_GENERATEDCODE, "")),
    globals: getOption("globals"),
    hoistTransitiveImports: getOption("hoistTransitiveImports"),
    indent: getOption("indent"),
    inlineDynamicImports: getOption("inlineDynamicImports"),
    interop: getOption("interop"),
    intro: getOption("intro"),
    manualChunks: getOption("manualChunks"),
    minifyInternalExports: getOption("minifyInternalExports"),
    name: getOption("name"),
    namespaceToStringTag: getOption("namespaceToStringTag"),
    noConflict: getOption("noConflict"),
    outro: getOption("outro"),
    paths: getOption("paths"),
    plugins: await normalizePluginOption(config.plugins),
    preferConst: getOption("preferConst"),
    preserveModules: getOption("preserveModules"),
    preserveModulesRoot: getOption("preserveModulesRoot"),
    sanitizeFileName: getOption("sanitizeFileName"),
    sourcemap: getOption("sourcemap"),
    sourcemapBaseUrl: getOption("sourcemapBaseUrl"),
    sourcemapExcludeSources: getOption("sourcemapExcludeSources"),
    sourcemapFile: getOption("sourcemapFile"),
    sourcemapIgnoreList: getOption("sourcemapIgnoreList"),
    sourcemapPathTransform: getOption("sourcemapPathTransform"),
    strict: getOption("strict"),
    systemNullSetters: getOption("systemNullSetters"),
    validate: getOption("validate")
  };
  warnUnknownOptions(config, Object.keys(outputOptions), "output options", warn);
  return outputOptions;
}
async function loadFsEvents() {
  try {
    ({ default: fsEvents } = await import("fsevents"));
  } catch (error2) {
    fsEventsImportError = error2;
  }
}
function getFsEvents() {
  if (fsEventsImportError)
    throw fsEventsImportError;
  return fsEvents;
}
function watch(configs) {
  const emitter = new WatchEmitter();
  watchInternal(configs, emitter).catch((error2) => {
    handleError(error2);
  });
  return emitter;
}
async function watchInternal(configs, emitter) {
  const optionsList = await Promise.all(ensureArray(configs).map((config) => mergeOptions(config)));
  const watchOptionsList = optionsList.filter((config) => config.watch !== false);
  if (watchOptionsList.length === 0) {
    return error(errorInvalidOption("watch", URL_WATCH, 'there must be at least one config where "watch" is not set to "false"'));
  }
  await loadFsEvents();
  const { Watcher } = await import("./watch-AT373XKV.js");
  new Watcher(watchOptionsList, emitter);
}
var import_node_path, import_path, import_node_process, import_node_perf_hooks, import_node_crypto, import_promises, import_node_events, tty, version$1, comma, semicolon, chars$1, intToChar, charToInt, td, BitSet, Chunk$1, btoa, SourceMap, toString$1, Mappings, n, warned, MagicString, hasOwnProp, Bundle$1, ANY_SLASH_REGEX, needsEscapeRegEx, quoteNewlineRegEx, backSlashRegEx, ABSOLUTE_PATH_REGEX, RELATIVE_PATH_REGEX, BACKSLASH_REGEX, UPPER_DIR_REGEX, ExternalChunk, UnknownKey, UnknownNonAccessorKey, UnknownInteger, SymbolToStringTag, EMPTY_PATH, UNKNOWN_PATH, UNKNOWN_NON_ACCESSOR_PATH, UNKNOWN_INTEGER_PATH, EntitiesKey, PathTracker, SHARED_RECURSION_TRACKER, DiscriminatedPathTracker, UnknownValue, UnknownTruthyValue, ExpressionEntity, UNKNOWN_EXPRESSION, UNKNOWN_RETURN_EXPRESSION, deoptimizeInteraction, INTERACTION_ACCESSED, INTERACTION_ASSIGNED, INTERACTION_CALLED, NODE_INTERACTION_UNKNOWN_ACCESS, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, NODE_INTERACTION_UNKNOWN_CALL, Variable, ExternalVariable, BLANK, EMPTY_OBJECT, EMPTY_ARRAY, EMPTY_SET, LINE_TRUNCATE_LENGTH, MIN_CHARACTERS_SHOWN_AFTER_LOCATION, ELLIPSIS, URL_AVOIDING_EVAL, URL_NAME_IS_NOT_EXPORTED, URL_THIS_IS_UNDEFINED, URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY, URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT, URL_MAXPARALLELFILEOPS, URL_OUTPUT_AMD_ID, URL_OUTPUT_AMD_BASEPATH, URL_OUTPUT_DIR, URL_OUTPUT_DYNAMICIMPORTFUNCTION, URL_OUTPUT_EXPORTS, URL_OUTPUT_EXTEND, URL_OUTPUT_FORMAT, URL_OUTPUT_GENERATEDCODE, URL_OUTPUT_EXPERIMENTALDEEPCHUNKOPTIMIZATION, URL_OUTPUT_GENERATEDCODE_CONSTBINDINGS, URL_OUTPUT_GENERATEDCODE_SYMBOLS, URL_OUTPUT_GLOBALS, URL_OUTPUT_INLINEDYNAMICIMPORTS, URL_OUTPUT_INTEROP, URL_OUTPUT_MANUALCHUNKS, URL_OUTPUT_NAME, URL_OUTPUT_PRESERVEMODULES, URL_OUTPUT_SOURCEMAPBASEURL, URL_OUTPUT_SOURCEMAPFILE, URL_PRESERVEENTRYSIGNATURES, URL_TREESHAKE, URL_TREESHAKE_MODULESIDEEFFECTS, URL_WATCH, URL_RENDERDYNAMICIMPORT, URL_THIS_GETMODULEIDS, URL_THIS_GETMODULEINFO, ADDON_ERROR, ALREADY_CLOSED, AMBIGUOUS_EXTERNAL_NAMESPACES, ANONYMOUS_PLUGIN_CACHE, ASSET_NOT_FINALISED, ASSET_NOT_FOUND, ASSET_SOURCE_ALREADY_SET, ASSET_SOURCE_MISSING, BAD_LOADER, CANNOT_CALL_NAMESPACE, CANNOT_EMIT_FROM_OPTIONS_HOOK, CHUNK_NOT_GENERATED, CHUNK_INVALID, CIRCULAR_DEPENDENCY, CIRCULAR_REEXPORT, CYCLIC_CROSS_CHUNK_REEXPORT, DEPRECATED_FEATURE, DUPLICATE_PLUGIN_NAME, EMPTY_BUNDLE, EVAL, EXTERNAL_SYNTHETIC_EXPORTS, FILE_NAME_CONFLICT, FILE_NOT_FOUND, ILLEGAL_IDENTIFIER_AS_NAME, ILLEGAL_REASSIGNMENT, INCONSISTENT_IMPORT_ASSERTIONS, INPUT_HOOK_IN_OUTPUT_PLUGIN, INVALID_CHUNK, INVALID_EXPORT_OPTION, INVALID_EXTERNAL_ID, INVALID_OPTION, INVALID_PLUGIN_HOOK, INVALID_ROLLUP_PHASE, INVALID_SETASSETSOURCE, INVALID_TLA_FORMAT, MISSING_EXPORT, MISSING_GLOBAL_NAME, MISSING_IMPLICIT_DEPENDANT, MISSING_NAME_OPTION_FOR_IIFE_EXPORT, MISSING_NODE_BUILTINS, MISSING_OPTION, MIXED_EXPORTS, MODULE_LEVEL_DIRECTIVE, NAMESPACE_CONFLICT, NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE, PARSE_ERROR, PLUGIN_ERROR, SHIMMED_EXPORT, SOURCEMAP_BROKEN, SOURCEMAP_ERROR, SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT, THIS_IS_UNDEFINED, UNEXPECTED_NAMED_IMPORT, UNKNOWN_OPTION, UNRESOLVED_ENTRY, UNRESOLVED_IMPORT, UNUSED_EXTERNAL_IMPORT, VALIDATION_ERROR, formatAssertions, RESERVED_NAMES, RESERVED_NAMES$1, illegalCharacters, startsWithDigit, needsEscape, ExternalModule, picomatchExports, picomatch$1, utils$3, path$1, WIN_SLASH, WIN_NO_SLASH, DOT_LITERAL, PLUS_LITERAL, QMARK_LITERAL, SLASH_LITERAL, ONE_CHAR, QMARK, END_ANCHOR, START_ANCHOR, DOTS_SLASH, NO_DOT, NO_DOTS, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK_NO_DOT, STAR, POSIX_CHARS, WINDOWS_CHARS, POSIX_REGEX_SOURCE$1, constants$2, utils$2, CHAR_ASTERISK, CHAR_AT, CHAR_BACKWARD_SLASH, CHAR_COMMA, CHAR_DOT, CHAR_EXCLAMATION_MARK, CHAR_FORWARD_SLASH, CHAR_LEFT_CURLY_BRACE, CHAR_LEFT_PARENTHESES, CHAR_LEFT_SQUARE_BRACKET, CHAR_PLUS, CHAR_QUESTION_MARK, CHAR_RIGHT_CURLY_BRACE, CHAR_RIGHT_PARENTHESES, CHAR_RIGHT_SQUARE_BRACKET, isPathSeparator, depth, scan$1, scan_1, constants$1, utils$1, MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS, expandRange, syntaxError, parse$2, parse_1, path, scan, parse$1, utils, constants, isObject, picomatch, picomatch_1, pm, extractors, extractAssignedNames, normalizePath, createFilter, reservedWords$1, builtins, forbiddenIdentifiers, UNDEFINED_EXPRESSION, returnsUnknown, UNKNOWN_LITERAL_BOOLEAN, returnsBoolean, UNKNOWN_LITERAL_NUMBER, returnsNumber, UNKNOWN_LITERAL_STRING, returnsString, stringReplace, objectMembers, literalBooleanMembers, literalNumberMembers, literalRegExpMembers, literalStringMembers, base$1, ArrowFunctionExpression$1, BinaryExpression$1, BlockStatement$1, CallExpression$1, ChainExpression$1, ConditionalExpression$1, ExpressionStatement$1, Identifier$1, LogicalExpression$1, NewExpression$1, Program$1, Property$1, ReturnStatement$1, SequenceExpression$1, SOURCEMAPPING_URL, whiteSpaceNoNewline, SOURCEMAPPING_URL_RE, ANNOTATION_KEY, INVALID_COMMENT_KEY, neitherWithespaceNorBrackets, noWhitespace, pureCommentRegex, keys, INCLUDE_PARAMETERS, NodeBase, SpreadElement, Method, METHOD_RETURNS_BOOLEAN, METHOD_RETURNS_STRING, METHOD_RETURNS_NUMBER, METHOD_RETURNS_UNKNOWN, INTEGER_REG_EXP, ObjectEntity, isInteger, OBJECT_PROTOTYPE_FALLBACK, OBJECT_PROTOTYPE, NEW_ARRAY_PROPERTIES, METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN, METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER, METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY, METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY, METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY, METHOD_MUTATES_SELF_RETURNS_NUMBER, METHOD_MUTATES_SELF_RETURNS_UNKNOWN, METHOD_DEOPTS_SELF_RETURNS_UNKNOWN, METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN, METHOD_MUTATES_SELF_RETURNS_SELF, METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF, ARRAY_PROTOTYPE, ArrayExpression, ArrayPattern, LocalVariable, MAX_TRACKED_INTERACTIONS, NO_INTERACTIONS, UNKNOWN_DEOPTIMIZED_FIELD, EMPTY_PATH_TRACKER, UNKNOWN_DEOPTIMIZED_ENTITY, ParameterVariable, chars, base, Scope$1, ChildScope, ParameterScope, ReturnValueScope, PureFunctionKey, getPureFunctions, doNothing, ValueProperties, getTruthyLiteralValue, returnFalse, returnTrue, PURE, IMPURE, O, PF, MUTATES_ARG_WITHOUT_ACCESSOR, C, PC, ARRAY_TYPE, INTL_MEMBER, knownGlobals, GlobalVariable, tdzVariableKinds, Identifier, NO_SEMICOLON, NON_WHITESPACE, BlockScope, ExpressionStatement, BlockStatement, RestElement, FunctionBase, ArrowFunctionExpression, ObjectPattern, AssignmentExpression, AssignmentPattern, ArgumentsVariable, ThisVariable, FunctionScope, FunctionNode, AwaitExpression, binaryOperators, BinaryExpression, BreakStatement, Literal, MAX_PATH_DEPTH, MemberExpression, CallExpressionBase, CallExpression, CatchScope, CatchClause, ChainExpression, ClassBodyScope, ClassBody, MethodBase, MethodDefinition, ObjectMember, ClassNode, ClassDeclaration, ClassExpression, MultiExpression, ConditionalExpression, ContinueStatement, DoWhileStatement, EmptyStatement, ExportAllDeclaration, FunctionDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, ForInStatement, ForOfStatement, ForStatement, FunctionExpression, TrackingScope, unset, IfStatement, ImportAttribute, ImportDeclaration, ImportDefaultSpecifier, INTEROP_DEFAULT_VARIABLE, INTEROP_DEFAULT_COMPAT_VARIABLE, INTEROP_NAMESPACE_VARIABLE, INTEROP_NAMESPACE_COMPAT_VARIABLE, INTEROP_NAMESPACE_DEFAULT_VARIABLE, INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE, MERGE_NAMESPACES_VARIABLE, defaultInteropHelpersByInteropType, isDefaultAProperty, namespaceInteropHelpersByInteropType, canDefaultBeTakenFromNamespace, getHelpersBlock, HELPER_GENERATORS, getDefaultLiveBinding, getDefaultStatic, getIsCompatNamespace, createNamespaceObject, loopOverKeys, loopOverNamespaces, copyNonDefaultOwnPropertyLiveBinding, copyOwnPropertyLiveBinding, copyPropertyLiveBinding, copyPropertyStatic, getFrozen, getWithToStringTag, HELPER_NAMES, VariableDeclarator, ImportExpression, accessedImportGlobals, ImportNamespaceSpecifier, ImportSpecifier, LabeledStatement, LogicalExpression, FILE_PREFIX, IMPORT, MetaProperty, accessedMetaUrlGlobals, accessedFileUrlGlobals, getResolveUrl, getRelativeUrlFromDocument, getGenericImportMetaMechanism, getFileUrlFromFullPath, getFileUrlFromRelativePath, getUrlFromDocument, relativeUrlMechanisms, importMetaMechanisms, NewExpression, ObjectExpression, PrivateIdentifier, Program, Property, PropertyDefinition, ReturnStatement, SequenceExpression, StaticBlock, Super, SwitchCase, SwitchStatement, TaggedTemplateExpression, TemplateElement, TemplateLiteral, UndefinedVariable, ExportDefaultVariable, ModuleScope, ThisExpression, ThrowStatement, TryStatement, unaryOperators, UnaryExpression, UnknownNode, UpdateExpression, VariableDeclaration, WhileStatement, YieldExpression, nodeConstructors, MISSING_EXPORT_SHIM_VARIABLE, ExportShimVariable, NamespaceVariable, SyntheticNamedExportVariable, BuildPhase, getPropertyKey, timers, timeStart, timeEnd, TIMED_PLUGIN_HOOKS, MISSING_EXPORT_SHIM_DESCRIPTION, Module, copyNameToModulesMap, getDefineProperty, _staticExports, _static, require$$0, builtinModules, nodeBuiltins, keypath, getStarExcludes, getStarExcludesBlock, getImportBindingsBlock, getHoistedExportsBlock, getSyntheticExportsBlock, getMissingExportsBlock, finalisers, concatSeparator, concatDblSeparator, DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT, hashPlaceholderLeft, hashPlaceholderRight, hashPlaceholderOverhead, maxHashSize, defaultHashSize, getHashPlaceholderGenerator, REPLACER_REGEX, replacePlaceholders, replaceSinglePlaceholder, replacePlaceholdersWithDefaultAndGetContainedPlaceholders, lowercaseBundleKeys, FILE_PLACEHOLDER, getOutputBundle, removeUnreferencedAssets, NON_ASSET_EXTENSIONS, Chunk2, QUERY_HASH_REGEX, resolveFileName, compareExecIndex, wrapIfNeeded, validPropertyName, Source, Link, createHash, Bundle2, astralIdentifierCodes, astralIdentifierStartCodes, nonASCIIidentifierChars, nonASCIIidentifierStartChars, reservedWords, ecma5AndLessKeywords, keywords$1, keywordRelationalOperator, nonASCIIidentifierStart, nonASCIIidentifier, TokenType, beforeExpr, startsExpr, keywords, types$1, lineBreak, lineBreakG, nonASCIIwhitespace, skipWhiteSpace, ref, hasOwnProperty, toString, hasOwn, isArray, loneSurrogate, Position, SourceLocation, defaultOptions, warnedAboutEcmaVersion, SCOPE_TOP, SCOPE_FUNCTION, SCOPE_ASYNC, SCOPE_GENERATOR, SCOPE_ARROW, SCOPE_SIMPLE_CATCH, SCOPE_SUPER, SCOPE_DIRECT_SUPER, SCOPE_CLASS_STATIC_BLOCK, SCOPE_VAR, BIND_NONE, BIND_VAR, BIND_LEXICAL, BIND_FUNCTION, BIND_SIMPLE_CATCH, BIND_OUTSIDE, Parser, prototypeAccessors, pp$9, literal, DestructuringErrors, pp$8, loopLabel, switchLabel, empty$1, FUNC_STATEMENT$1, FUNC_HANGING_STATEMENT, FUNC_NULLABLE_ID$1, pp$7, TokContext, types, pp$6, pp$5, empty, pp$4, pp$3, Scope2, Node, pp$2, ecma9BinaryProperties, ecma10BinaryProperties, ecma11BinaryProperties, ecma12BinaryProperties, ecma13BinaryProperties, ecma14BinaryProperties, unicodeBinaryProperties, unicodeGeneralCategoryValues, ecma9ScriptValues, ecma10ScriptValues, ecma11ScriptValues, ecma12ScriptValues, ecma13ScriptValues, ecma14ScriptValues, unicodeScriptValues, data, ecmaVersion, i, list, pp$1, RegExpValidationState, Token, pp, INVALID_TEMPLATE_ESCAPE_ERROR, version, _acorn, ANONYMOUS_PLUGIN_PREFIX, ANONYMOUS_OUTPUT_PLUGIN_PREFIX, NO_CACHE, RESOLVE_DEPENDENCIES, ModuleLoader, GlobalScope, FileEmitter, inputHookNames, inputHooks, PluginDriver, Queue, Graph, beforeExitEvent, beforeExitEmitter, leftCurlyBrace, space, keyword, FUNC_STATEMENT, FUNC_NULLABLE_ID, defaultOnWarn, treeshakePresets, generatedCodePresets, objectifyOption, objectifyOptionWithPresets, getOptionWithPreset, normalizePluginOption, getOnwarn, getAcorn, getAcornInjectPlugins, getCache, getIdMatcher, getInlineDynamicImports$1, getInput, getManualChunks$1, getmaxParallelFileOps, getModuleContext, getPreserveModules$1, getTreeshake, getHasModuleSideEffects, INVALID_CHAR_REGEX, DRIVE_LETTER_REGEX, getFile, getFormat, getInlineDynamicImports, getPreserveModules, getPreferConst, getPreserveModulesRoot, getAmd, getAddon, getDir, getDynamicImportFunction, getEntryFileNames, getGeneratedCode, getIndent, ALLOWED_INTEROP_TYPES, getInterop, validateInterop, getManualChunks, getMinifyInternalExports, getNamespaceToStringTag, getSourcemapBaseUrl, SortingFileType, env, argv, platform, isDisabled, isForced, isWindows, isDumbTerminal, isCompatibleTerminal, isCI, isColorSupported, replaceClose, clearBleed, filterEmpty, init, colors, createColors, bold, cyan, dim, gray, green, red, underline, yellow, stderr, commandAliases, EMPTY_COMMAND_OPTIONS, getExternal, getOnWarn, getObjectOption, getWatch, normalizeObjectOptionValue, WatchEmitter, fsEvents, fsEventsImportError, fseventsImporter;
var init_node_entry = __esm({
  "node_modules/rollup/dist/es/shared/node-entry.js"() {
    import_node_path = __toESM(require_node_path(), 1);
    import_path = __toESM(require_path(), 1);
    import_node_process = __toESM(require_node_process(), 1);
    import_node_perf_hooks = __toESM(require_node_perf_hooks(), 1);
    import_node_crypto = __toESM(require_node_crypto(), 1);
    import_promises = __toESM(require_promises(), 1);
    import_node_events = __toESM(require_node_events(), 1);
    tty = __toESM(require_tty(), 1);
    version$1 = "3.21.0";
    comma = ",".charCodeAt(0);
    semicolon = ";".charCodeAt(0);
    chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    intToChar = new Uint8Array(64);
    charToInt = new Uint8Array(128);
    for (let i = 0; i < chars$1.length; i++) {
      const c = chars$1.charCodeAt(i);
      intToChar[i] = c;
      charToInt[c] = i;
    }
    td = typeof TextDecoder !== "undefined" ? new TextDecoder() : typeof Buffer !== "undefined" ? {
      decode(buf) {
        const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
        return out.toString();
      }
    } : {
      decode(buf) {
        let out = "";
        for (let i = 0; i < buf.length; i++) {
          out += String.fromCharCode(buf[i]);
        }
        return out;
      }
    };
    BitSet = class {
      constructor(arg) {
        this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
      }
      add(n2) {
        this.bits[n2 >> 5] |= 1 << (n2 & 31);
      }
      has(n2) {
        return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
      }
    };
    Chunk$1 = class Chunk {
      constructor(start, end, content) {
        this.start = start;
        this.end = end;
        this.original = content;
        this.intro = "";
        this.outro = "";
        this.content = content;
        this.storeName = false;
        this.edited = false;
        {
          this.previous = null;
          this.next = null;
        }
      }
      appendLeft(content) {
        this.outro += content;
      }
      appendRight(content) {
        this.intro = this.intro + content;
      }
      clone() {
        const chunk = new Chunk(this.start, this.end, this.original);
        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;
        return chunk;
      }
      contains(index) {
        return this.start < index && index < this.end;
      }
      eachNext(fn) {
        let chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.next;
        }
      }
      eachPrevious(fn) {
        let chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.previous;
        }
      }
      edit(content, storeName, contentOnly) {
        this.content = content;
        if (!contentOnly) {
          this.intro = "";
          this.outro = "";
        }
        this.storeName = storeName;
        this.edited = true;
        return this;
      }
      prependLeft(content) {
        this.outro = content + this.outro;
      }
      prependRight(content) {
        this.intro = content + this.intro;
      }
      split(index) {
        const sliceIndex = index - this.start;
        const originalBefore = this.original.slice(0, sliceIndex);
        const originalAfter = this.original.slice(sliceIndex);
        this.original = originalBefore;
        const newChunk = new Chunk(index, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = "";
        this.end = index;
        if (this.edited) {
          newChunk.edit("", false);
          this.content = "";
        } else {
          this.content = originalBefore;
        }
        newChunk.next = this.next;
        if (newChunk.next)
          newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;
        return newChunk;
      }
      toString() {
        return this.intro + this.content + this.outro;
      }
      trimEnd(rx) {
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length)
          return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit("", void 0, true);
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.intro = this.intro.replace(rx, "");
          if (this.intro.length)
            return true;
        }
      }
      trimStart(rx) {
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length)
          return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.end - trimmed.length);
            this.edit("", void 0, true);
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.outro = this.outro.replace(rx, "");
          if (this.outro.length)
            return true;
        }
      }
    };
    btoa = getBtoa();
    SourceMap = class {
      constructor(properties) {
        this.version = 3;
        this.file = properties.file;
        this.sources = properties.sources;
        this.sourcesContent = properties.sourcesContent;
        this.names = properties.names;
        this.mappings = encode(properties.mappings);
        if (typeof properties.x_google_ignoreList !== "undefined") {
          this.x_google_ignoreList = properties.x_google_ignoreList;
        }
      }
      toString() {
        return JSON.stringify(this);
      }
      toUrl() {
        return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
      }
    };
    toString$1 = Object.prototype.toString;
    Mappings = class {
      constructor(hires) {
        this.hires = hires;
        this.generatedCodeLine = 0;
        this.generatedCodeColumn = 0;
        this.raw = [];
        this.rawSegments = this.raw[this.generatedCodeLine] = [];
        this.pending = null;
      }
      addEdit(sourceIndex, content, loc, nameIndex) {
        if (content.length) {
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (nameIndex >= 0) {
            segment.push(nameIndex);
          }
          this.rawSegments.push(segment);
        } else if (this.pending) {
          this.rawSegments.push(this.pending);
        }
        this.advance(content);
        this.pending = null;
      }
      addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
        let originalCharIndex = chunk.start;
        let first = true;
        while (originalCharIndex < chunk.end) {
          if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
            this.rawSegments.push([this.generatedCodeColumn, sourceIndex, loc.line, loc.column]);
          }
          if (original[originalCharIndex] === "\n") {
            loc.line += 1;
            loc.column = 0;
            this.generatedCodeLine += 1;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0;
            first = true;
          } else {
            loc.column += 1;
            this.generatedCodeColumn += 1;
            first = false;
          }
          originalCharIndex += 1;
        }
        this.pending = null;
      }
      advance(str) {
        if (!str)
          return;
        const lines = str.split("\n");
        if (lines.length > 1) {
          for (let i = 0; i < lines.length - 1; i++) {
            this.generatedCodeLine++;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
          }
          this.generatedCodeColumn = 0;
        }
        this.generatedCodeColumn += lines[lines.length - 1].length;
      }
    };
    n = "\n";
    warned = {
      insertLeft: false,
      insertRight: false,
      storeName: false
    };
    MagicString = class {
      constructor(string, options = {}) {
        const chunk = new Chunk$1(0, string.length, string);
        Object.defineProperties(this, {
          original: { writable: true, value: string },
          outro: { writable: true, value: "" },
          intro: { writable: true, value: "" },
          firstChunk: { writable: true, value: chunk },
          lastChunk: { writable: true, value: chunk },
          lastSearchedChunk: { writable: true, value: chunk },
          byStart: { writable: true, value: {} },
          byEnd: { writable: true, value: {} },
          filename: { writable: true, value: options.filename },
          indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
          sourcemapLocations: { writable: true, value: new BitSet() },
          storedNames: { writable: true, value: {} },
          indentStr: { writable: true, value: void 0 },
          ignoreList: { writable: true, value: options.ignoreList }
        });
        this.byStart[0] = chunk;
        this.byEnd[string.length] = chunk;
      }
      addSourcemapLocation(char) {
        this.sourcemapLocations.add(char);
      }
      append(content) {
        if (typeof content !== "string")
          throw new TypeError("outro content must be a string");
        this.outro += content;
        return this;
      }
      appendLeft(index, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byEnd[index];
        if (chunk) {
          chunk.appendLeft(content);
        } else {
          this.intro += content;
        }
        return this;
      }
      appendRight(index, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byStart[index];
        if (chunk) {
          chunk.appendRight(content);
        } else {
          this.outro += content;
        }
        return this;
      }
      clone() {
        const cloned = new MagicString(this.original, { filename: this.filename });
        let originalChunk = this.firstChunk;
        let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;
          const nextOriginalChunk = originalChunk.next;
          const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;
            clonedChunk = nextClonedChunk;
          }
          originalChunk = nextOriginalChunk;
        }
        cloned.lastChunk = clonedChunk;
        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
        }
        cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
        cloned.intro = this.intro;
        cloned.outro = this.outro;
        return cloned;
      }
      generateDecodedMap(options) {
        options = options || {};
        const sourceIndex = 0;
        const names = Object.keys(this.storedNames);
        const mappings = new Mappings(options.hires);
        const locate2 = getLocator$1(this.original);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.firstChunk.eachNext((chunk) => {
          const loc = locate2(chunk.start);
          if (chunk.intro.length)
            mappings.advance(chunk.intro);
          if (chunk.edited) {
            mappings.addEdit(
              sourceIndex,
              chunk.content,
              loc,
              chunk.storeName ? names.indexOf(chunk.original) : -1
            );
          } else {
            mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
          }
          if (chunk.outro.length)
            mappings.advance(chunk.outro);
        });
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: [options.source ? getRelativePath(options.file || "", options.source) : options.file || ""],
          sourcesContent: options.includeContent ? [this.original] : void 0,
          names,
          mappings: mappings.raw,
          x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      _ensureindentStr() {
        if (this.indentStr === void 0) {
          this.indentStr = guessIndent(this.original);
        }
      }
      _getRawIndentString() {
        this._ensureindentStr();
        return this.indentStr;
      }
      getIndentString() {
        this._ensureindentStr();
        return this.indentStr === null ? "	" : this.indentStr;
      }
      indent(indentStr, options) {
        const pattern = /^[^\r\n]/gm;
        if (isObject$1(indentStr)) {
          options = indentStr;
          indentStr = void 0;
        }
        if (indentStr === void 0) {
          this._ensureindentStr();
          indentStr = this.indentStr || "	";
        }
        if (indentStr === "")
          return this;
        options = options || {};
        const isExcluded = {};
        if (options.exclude) {
          const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
          exclusions.forEach((exclusion) => {
            for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }
        let shouldIndentNextCharacter = options.indentStart !== false;
        const replacer = (match) => {
          if (shouldIndentNextCharacter)
            return `${indentStr}${match}`;
          shouldIndentNextCharacter = true;
          return match;
        };
        this.intro = this.intro.replace(pattern, replacer);
        let charIndex = 0;
        let chunk = this.firstChunk;
        while (chunk) {
          const end = chunk.end;
          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);
              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
              }
            }
          } else {
            charIndex = chunk.start;
            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                const char = this.original[charIndex];
                if (char === "\n") {
                  shouldIndentNextCharacter = true;
                } else if (char !== "\r" && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;
                  if (charIndex === chunk.start) {
                    chunk.prependRight(indentStr);
                  } else {
                    this._splitChunk(chunk, charIndex);
                    chunk = chunk.next;
                    chunk.prependRight(indentStr);
                  }
                }
              }
              charIndex += 1;
            }
          }
          charIndex = chunk.end;
          chunk = chunk.next;
        }
        this.outro = this.outro.replace(pattern, replacer);
        return this;
      }
      insert() {
        throw new Error(
          "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
        );
      }
      insertLeft(index, content) {
        if (!warned.insertLeft) {
          console.warn(
            "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
          );
          warned.insertLeft = true;
        }
        return this.appendLeft(index, content);
      }
      insertRight(index, content) {
        if (!warned.insertRight) {
          console.warn(
            "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
          );
          warned.insertRight = true;
        }
        return this.prependRight(index, content);
      }
      move(start, end, index) {
        if (index >= start && index <= end)
          throw new Error("Cannot move a selection inside itself");
        this._split(start);
        this._split(end);
        this._split(index);
        const first = this.byStart[start];
        const last = this.byEnd[end];
        const oldLeft = first.previous;
        const oldRight = last.next;
        const newRight = this.byStart[index];
        if (!newRight && last === this.lastChunk)
          return this;
        const newLeft = newRight ? newRight.previous : this.lastChunk;
        if (oldLeft)
          oldLeft.next = oldRight;
        if (oldRight)
          oldRight.previous = oldLeft;
        if (newLeft)
          newLeft.next = first;
        if (newRight)
          newRight.previous = last;
        if (!first.previous)
          this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }
        first.previous = newLeft;
        last.next = newRight || null;
        if (!newLeft)
          this.firstChunk = first;
        if (!newRight)
          this.lastChunk = last;
        return this;
      }
      overwrite(start, end, content, options) {
        options = options || {};
        return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
      }
      update(start, end, content, options) {
        if (typeof content !== "string")
          throw new TypeError("replacement content must be a string");
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        if (end > this.original.length)
          throw new Error("end is out of bounds");
        if (start === end)
          throw new Error(
            "Cannot overwrite a zero-length range – use appendLeft or prependRight instead"
          );
        this._split(start);
        this._split(end);
        if (options === true) {
          if (!warned.storeName) {
            console.warn(
              "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
            );
            warned.storeName = true;
          }
          options = { storeName: true };
        }
        const storeName = options !== void 0 ? options.storeName : false;
        const overwrite = options !== void 0 ? options.overwrite : false;
        if (storeName) {
          const original = this.original.slice(start, end);
          Object.defineProperty(this.storedNames, original, {
            writable: true,
            value: true,
            enumerable: true
          });
        }
        const first = this.byStart[start];
        const last = this.byEnd[end];
        if (first) {
          let chunk = first;
          while (chunk !== last) {
            if (chunk.next !== this.byStart[chunk.end]) {
              throw new Error("Cannot overwrite across a split point");
            }
            chunk = chunk.next;
            chunk.edit("", false);
          }
          first.edit(content, storeName, !overwrite);
        } else {
          const newChunk = new Chunk$1(start, end, "").edit(content, storeName);
          last.next = newChunk;
          newChunk.previous = last;
        }
        return this;
      }
      prepend(content) {
        if (typeof content !== "string")
          throw new TypeError("outro content must be a string");
        this.intro = content + this.intro;
        return this;
      }
      prependLeft(index, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byEnd[index];
        if (chunk) {
          chunk.prependLeft(content);
        } else {
          this.intro = content + this.intro;
        }
        return this;
      }
      prependRight(index, content) {
        if (typeof content !== "string")
          throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byStart[index];
        if (chunk) {
          chunk.prependRight(content);
        } else {
          this.outro = content + this.outro;
        }
        return this;
      }
      remove(start, end) {
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        if (start === end)
          return this;
        if (start < 0 || end > this.original.length)
          throw new Error("Character is out of bounds");
        if (start > end)
          throw new Error("end must be greater than start");
        this._split(start);
        this._split(end);
        let chunk = this.byStart[start];
        while (chunk) {
          chunk.intro = "";
          chunk.outro = "";
          chunk.edit("");
          chunk = end > chunk.end ? this.byStart[chunk.end] : null;
        }
        return this;
      }
      lastChar() {
        if (this.outro.length)
          return this.outro[this.outro.length - 1];
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length)
            return chunk.outro[chunk.outro.length - 1];
          if (chunk.content.length)
            return chunk.content[chunk.content.length - 1];
          if (chunk.intro.length)
            return chunk.intro[chunk.intro.length - 1];
        } while (chunk = chunk.previous);
        if (this.intro.length)
          return this.intro[this.intro.length - 1];
        return "";
      }
      lastLine() {
        let lineIndex = this.outro.lastIndexOf(n);
        if (lineIndex !== -1)
          return this.outro.substr(lineIndex + 1);
        let lineStr = this.outro;
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length > 0) {
            lineIndex = chunk.outro.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.outro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.outro + lineStr;
          }
          if (chunk.content.length > 0) {
            lineIndex = chunk.content.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.content.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.content + lineStr;
          }
          if (chunk.intro.length > 0) {
            lineIndex = chunk.intro.lastIndexOf(n);
            if (lineIndex !== -1)
              return chunk.intro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.intro + lineStr;
          }
        } while (chunk = chunk.previous);
        lineIndex = this.intro.lastIndexOf(n);
        if (lineIndex !== -1)
          return this.intro.substr(lineIndex + 1) + lineStr;
        return this.intro + lineStr;
      }
      slice(start = 0, end = this.original.length) {
        while (start < 0)
          start += this.original.length;
        while (end < 0)
          end += this.original.length;
        let result = "";
        let chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }
          chunk = chunk.next;
        }
        if (chunk && chunk.edited && chunk.start !== start)
          throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
        const startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }
          const containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end)
            throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
          const sliceStart = startChunk === chunk ? start - chunk.start : 0;
          const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
          result += chunk.content.slice(sliceStart, sliceEnd);
          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }
          if (containsEnd) {
            break;
          }
          chunk = chunk.next;
        }
        return result;
      }
      // TODO deprecate this? not really very useful
      snip(start, end) {
        const clone = this.clone();
        clone.remove(0, start);
        clone.remove(end, clone.original.length);
        return clone;
      }
      _split(index) {
        if (this.byStart[index] || this.byEnd[index])
          return;
        let chunk = this.lastSearchedChunk;
        const searchForward = index > chunk.end;
        while (chunk) {
          if (chunk.contains(index))
            return this._splitChunk(chunk, index);
          chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
        }
      }
      _splitChunk(chunk, index) {
        if (chunk.edited && chunk.content.length) {
          const loc = getLocator$1(this.original)(index);
          throw new Error(
            `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} – "${chunk.original}")`
          );
        }
        const newChunk = chunk.split(index);
        this.byEnd[index] = chunk;
        this.byStart[index] = newChunk;
        this.byEnd[newChunk.end] = newChunk;
        if (chunk === this.lastChunk)
          this.lastChunk = newChunk;
        this.lastSearchedChunk = chunk;
        return true;
      }
      toString() {
        let str = this.intro;
        let chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }
        return str + this.outro;
      }
      isEmpty() {
        let chunk = this.firstChunk;
        do {
          if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
            return false;
        } while (chunk = chunk.next);
        return true;
      }
      length() {
        let chunk = this.firstChunk;
        let length = 0;
        do {
          length += chunk.intro.length + chunk.content.length + chunk.outro.length;
        } while (chunk = chunk.next);
        return length;
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimEndAborted(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length)
          return true;
        let chunk = this.lastChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimEnd(rx);
          if (chunk.end !== end) {
            if (this.lastChunk === chunk) {
              this.lastChunk = chunk.next;
            }
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted)
            return true;
          chunk = chunk.previous;
        } while (chunk);
        return false;
      }
      trimEnd(charType) {
        this.trimEndAborted(charType);
        return this;
      }
      trimStartAborted(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length)
          return true;
        let chunk = this.firstChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimStart(rx);
          if (chunk.end !== end) {
            if (chunk === this.lastChunk)
              this.lastChunk = chunk.next;
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted)
            return true;
          chunk = chunk.next;
        } while (chunk);
        return false;
      }
      trimStart(charType) {
        this.trimStartAborted(charType);
        return this;
      }
      hasChanged() {
        return this.original !== this.toString();
      }
      _replaceRegexp(searchValue, replacement) {
        function getReplacement(match, str) {
          if (typeof replacement === "string") {
            return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
              if (i === "$")
                return "$";
              if (i === "&")
                return match[0];
              const num = +i;
              if (num < match.length)
                return match[+i];
              return `$${i}`;
            });
          } else {
            return replacement(...match, match.index, str, match.groups);
          }
        }
        function matchAll(re, str) {
          let match;
          const matches = [];
          while (match = re.exec(str)) {
            matches.push(match);
          }
          return matches;
        }
        if (searchValue.global) {
          const matches = matchAll(searchValue, this.original);
          matches.forEach((match) => {
            if (match.index != null)
              this.overwrite(
                match.index,
                match.index + match[0].length,
                getReplacement(match, this.original)
              );
          });
        } else {
          const match = this.original.match(searchValue);
          if (match && match.index != null)
            this.overwrite(
              match.index,
              match.index + match[0].length,
              getReplacement(match, this.original)
            );
        }
        return this;
      }
      _replaceString(string, replacement) {
        const { original } = this;
        const index = original.indexOf(string);
        if (index !== -1) {
          this.overwrite(index, index + string.length, replacement);
        }
        return this;
      }
      replace(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceString(searchValue, replacement);
        }
        return this._replaceRegexp(searchValue, replacement);
      }
      _replaceAllString(string, replacement) {
        const { original } = this;
        const stringLength = string.length;
        for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
          this.overwrite(index, index + stringLength, replacement);
        }
        return this;
      }
      replaceAll(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceAllString(searchValue, replacement);
        }
        if (!searchValue.global) {
          throw new TypeError(
            "MagicString.prototype.replaceAll called with a non-global RegExp argument"
          );
        }
        return this._replaceRegexp(searchValue, replacement);
      }
    };
    hasOwnProp = Object.prototype.hasOwnProperty;
    Bundle$1 = class Bundle {
      constructor(options = {}) {
        this.intro = options.intro || "";
        this.separator = options.separator !== void 0 ? options.separator : "\n";
        this.sources = [];
        this.uniqueSources = [];
        this.uniqueSourceIndexByFilename = {};
      }
      addSource(source) {
        if (source instanceof MagicString) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }
        if (!isObject$1(source) || !source.content) {
          throw new Error(
            "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
          );
        }
        ["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((option) => {
          if (!hasOwnProp.call(source, option))
            source[option] = source.content[option];
        });
        if (source.separator === void 0) {
          source.separator = this.separator;
        }
        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            const uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
            }
          }
        }
        this.sources.push(source);
        return this;
      }
      append(str, options) {
        this.addSource({
          content: new MagicString(str),
          separator: options && options.separator || ""
        });
        return this;
      }
      clone() {
        const bundle = new Bundle({
          intro: this.intro,
          separator: this.separator
        });
        this.sources.forEach((source) => {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });
        return bundle;
      }
      generateDecodedMap(options = {}) {
        const names = [];
        let x_google_ignoreList = void 0;
        this.sources.forEach((source) => {
          Object.keys(source.content.storedNames).forEach((name) => {
            if (!~names.indexOf(name))
              names.push(name);
          });
        });
        const mappings = new Mappings(options.hires);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.sources.forEach((source, i) => {
          if (i > 0) {
            mappings.advance(this.separator);
          }
          const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1;
          const magicString = source.content;
          const locate2 = getLocator$1(magicString.original);
          if (magicString.intro) {
            mappings.advance(magicString.intro);
          }
          magicString.firstChunk.eachNext((chunk) => {
            const loc = locate2(chunk.start);
            if (chunk.intro.length)
              mappings.advance(chunk.intro);
            if (source.filename) {
              if (chunk.edited) {
                mappings.addEdit(
                  sourceIndex,
                  chunk.content,
                  loc,
                  chunk.storeName ? names.indexOf(chunk.original) : -1
                );
              } else {
                mappings.addUneditedChunk(
                  sourceIndex,
                  chunk,
                  magicString.original,
                  loc,
                  magicString.sourcemapLocations
                );
              }
            } else {
              mappings.advance(chunk.content);
            }
            if (chunk.outro.length)
              mappings.advance(chunk.outro);
          });
          if (magicString.outro) {
            mappings.advance(magicString.outro);
          }
          if (source.ignoreList && sourceIndex !== -1) {
            if (x_google_ignoreList === void 0) {
              x_google_ignoreList = [];
            }
            x_google_ignoreList.push(sourceIndex);
          }
        });
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: this.uniqueSources.map((source) => {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map((source) => {
            return options.includeContent ? source.content : null;
          }),
          names,
          mappings: mappings.raw,
          x_google_ignoreList
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      getIndentString() {
        const indentStringCounts = {};
        this.sources.forEach((source) => {
          const indentStr = source.content._getRawIndentString();
          if (indentStr === null)
            return;
          if (!indentStringCounts[indentStr])
            indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });
        return Object.keys(indentStringCounts).sort((a, b) => {
          return indentStringCounts[a] - indentStringCounts[b];
        })[0] || "	";
      }
      indent(indentStr) {
        if (!arguments.length) {
          indentStr = this.getIndentString();
        }
        if (indentStr === "")
          return this;
        let trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
        this.sources.forEach((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart
            //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });
          trailingNewline = source.content.lastChar() === "\n";
        });
        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, (match, index) => {
            return index > 0 ? indentStr + match : match;
          });
        }
        return this;
      }
      prepend(str) {
        this.intro = str + this.intro;
        return this;
      }
      toString() {
        const body = this.sources.map((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const str = (i > 0 ? separator : "") + source.content.toString();
          return str;
        }).join("");
        return this.intro + body;
      }
      isEmpty() {
        if (this.intro.length && this.intro.trim())
          return false;
        if (this.sources.some((source) => !source.content.isEmpty()))
          return false;
        return true;
      }
      length() {
        return this.sources.reduce(
          (length, source) => length + source.content.length(),
          this.intro.length
        );
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimStart(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (!this.intro) {
          let source;
          let i = 0;
          do {
            source = this.sources[i++];
            if (!source) {
              break;
            }
          } while (!source.content.trimStartAborted(charType));
        }
        return this;
      }
      trimEnd(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        let source;
        let i = this.sources.length - 1;
        do {
          source = this.sources[i--];
          if (!source) {
            this.intro = this.intro.replace(rx, "");
            break;
          }
        } while (!source.content.trimEndAborted(charType));
        return this;
      }
    };
    ANY_SLASH_REGEX = /[/\\]/;
    needsEscapeRegEx = /[\n\r'\\\u2028\u2029]/;
    quoteNewlineRegEx = /([\n\r'\u2028\u2029])/g;
    backSlashRegEx = /\\/g;
    ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/;
    RELATIVE_PATH_REGEX = /^\.?\.(\/|$)/;
    BACKSLASH_REGEX = /\\/g;
    UPPER_DIR_REGEX = /^(\.\.\/)*\.\.$/;
    ExternalChunk = class {
      constructor(module, options, inputBase) {
        this.options = options;
        this.inputBase = inputBase;
        this.defaultVariableName = "";
        this.namespaceVariableName = "";
        this.variableName = "";
        this.fileName = null;
        this.importAssertions = null;
        this.id = module.id;
        this.moduleInfo = module.info;
        this.renormalizeRenderPath = module.renormalizeRenderPath;
        this.suggestedVariableName = module.suggestedVariableName;
      }
      getFileName() {
        if (this.fileName) {
          return this.fileName;
        }
        const { paths } = this.options;
        return this.fileName = (typeof paths === "function" ? paths(this.id) : paths[this.id]) || (this.renormalizeRenderPath ? normalize((0, import_node_path.relative)(this.inputBase, this.id)) : this.id);
      }
      getImportAssertions(snippets) {
        return this.importAssertions || (this.importAssertions = formatAssertions$1(this.options.format === "es" && this.options.externalImportAssertions && this.moduleInfo.assertions, snippets));
      }
      getImportPath(importer) {
        return escapeId(this.renormalizeRenderPath ? getImportPath(importer, this.getFileName(), this.options.format === "amd", false) : this.getFileName());
      }
    };
    UnknownKey = Symbol("Unknown Key");
    UnknownNonAccessorKey = Symbol("Unknown Non-Accessor Key");
    UnknownInteger = Symbol("Unknown Integer");
    SymbolToStringTag = Symbol("Symbol.toStringTag");
    EMPTY_PATH = [];
    UNKNOWN_PATH = [UnknownKey];
    UNKNOWN_NON_ACCESSOR_PATH = [UnknownNonAccessorKey];
    UNKNOWN_INTEGER_PATH = [UnknownInteger];
    EntitiesKey = Symbol("Entities");
    PathTracker = class {
      constructor() {
        this.entityPaths = Object.create(null, {
          [EntitiesKey]: { value: /* @__PURE__ */ new Set() }
        });
      }
      trackEntityAtPathAndGetIfTracked(path2, entity) {
        const trackedEntities = this.getEntities(path2);
        if (trackedEntities.has(entity))
          return true;
        trackedEntities.add(entity);
        return false;
      }
      withTrackedEntityAtPath(path2, entity, onUntracked, returnIfTracked) {
        const trackedEntities = this.getEntities(path2);
        if (trackedEntities.has(entity))
          return returnIfTracked;
        trackedEntities.add(entity);
        const result = onUntracked();
        trackedEntities.delete(entity);
        return result;
      }
      getEntities(path2) {
        let currentPaths = this.entityPaths;
        for (const pathSegment of path2) {
          currentPaths = currentPaths[pathSegment] = currentPaths[pathSegment] || Object.create(null, { [EntitiesKey]: { value: /* @__PURE__ */ new Set() } });
        }
        return currentPaths[EntitiesKey];
      }
    };
    SHARED_RECURSION_TRACKER = new PathTracker();
    DiscriminatedPathTracker = class {
      constructor() {
        this.entityPaths = Object.create(null, {
          [EntitiesKey]: { value: /* @__PURE__ */ new Map() }
        });
      }
      trackEntityAtPathAndGetIfTracked(path2, discriminator, entity) {
        let currentPaths = this.entityPaths;
        for (const pathSegment of path2) {
          currentPaths = currentPaths[pathSegment] = currentPaths[pathSegment] || Object.create(null, { [EntitiesKey]: { value: /* @__PURE__ */ new Map() } });
        }
        const trackedEntities = getOrCreate(currentPaths[EntitiesKey], discriminator, getNewSet);
        if (trackedEntities.has(entity))
          return true;
        trackedEntities.add(entity);
        return false;
      }
    };
    UnknownValue = Symbol("Unknown Value");
    UnknownTruthyValue = Symbol("Unknown Truthy Value");
    ExpressionEntity = class {
      constructor() {
        this.included = false;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, _path, _recursionTracker) {
        deoptimizeInteraction(interaction);
      }
      deoptimizePath(_path) {
      }
      /**
       * If possible it returns a stringifyable literal value for this node that
       * can be used for inlining or comparing values. Otherwise, it should return
       * UnknownValue.
       */
      getLiteralValueAtPath(_path, _recursionTracker, _origin) {
        return UnknownValue;
      }
      getReturnExpressionWhenCalledAtPath(_path, _interaction, _recursionTracker, _origin) {
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffectsOnInteractionAtPath(_path, _interaction, _context) {
        return true;
      }
      include(_context, _includeChildrenRecursively, _options) {
        this.included = true;
      }
      includeCallArguments(context, parameters) {
        for (const argument of parameters) {
          argument.include(context, false);
        }
      }
      shouldBeIncluded(_context) {
        return true;
      }
    };
    UNKNOWN_EXPRESSION = new class UnknownExpression extends ExpressionEntity {
    }();
    UNKNOWN_RETURN_EXPRESSION = [
      UNKNOWN_EXPRESSION,
      false
    ];
    deoptimizeInteraction = (interaction) => {
      for (const argument of interaction.args) {
        argument == null ? void 0 : argument.deoptimizePath(UNKNOWN_PATH);
      }
    };
    INTERACTION_ACCESSED = 0;
    INTERACTION_ASSIGNED = 1;
    INTERACTION_CALLED = 2;
    NODE_INTERACTION_UNKNOWN_ACCESS = {
      args: [null],
      type: INTERACTION_ACCESSED
    };
    NODE_INTERACTION_UNKNOWN_ASSIGNMENT = {
      args: [null, UNKNOWN_EXPRESSION],
      type: INTERACTION_ASSIGNED
    };
    NODE_INTERACTION_UNKNOWN_CALL = {
      args: [null],
      type: INTERACTION_CALLED,
      withNew: false
    };
    Variable = class extends ExpressionEntity {
      constructor(name) {
        super();
        this.name = name;
        this.alwaysRendered = false;
        this.forbiddenNames = null;
        this.initReached = false;
        this.isId = false;
        this.isReassigned = false;
        this.kind = null;
        this.renderBaseName = null;
        this.renderName = null;
      }
      /**
       * Binds identifiers that reference this variable to this variable.
       * Necessary to be able to change variable names.
       */
      addReference(_identifier) {
      }
      /**
       * Prevent this variable from being renamed to this name to avoid name
       * collisions
       */
      forbidName(name) {
        (this.forbiddenNames || (this.forbiddenNames = /* @__PURE__ */ new Set())).add(name);
      }
      getBaseVariableName() {
        return this.renderBaseName || this.renderName || this.name;
      }
      getName(getPropertyAccess, useOriginalName) {
        if (useOriginalName == null ? void 0 : useOriginalName(this)) {
          return this.name;
        }
        const name = this.renderName || this.name;
        return this.renderBaseName ? `${this.renderBaseName}${getPropertyAccess(name)}` : name;
      }
      hasEffectsOnInteractionAtPath(path2, { type }, _context) {
        return type !== INTERACTION_ACCESSED || path2.length > 0;
      }
      /**
       * Marks this variable as being part of the bundle, which is usually the case when one of
       * its identifiers becomes part of the bundle. Returns true if it has not been included
       * previously.
       * Once a variable is included, it should take care all its declarations are included.
       */
      include() {
        this.included = true;
      }
      markCalledFromTryStatement() {
      }
      setRenderNames(baseName, name) {
        this.renderBaseName = baseName;
        this.renderName = name;
      }
    };
    ExternalVariable = class extends Variable {
      constructor(module, name) {
        super(name);
        this.referenced = false;
        this.module = module;
        this.isNamespace = name === "*";
      }
      addReference(identifier) {
        this.referenced = true;
        if (this.name === "default" || this.name === "*") {
          this.module.suggestName(identifier.name);
        }
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return type !== INTERACTION_ACCESSED || path2.length > (this.isNamespace ? 1 : 0);
      }
      include() {
        if (!this.included) {
          this.included = true;
          this.module.used = true;
        }
      }
    };
    BLANK = Object.freeze(/* @__PURE__ */ Object.create(null));
    EMPTY_OBJECT = Object.freeze({});
    EMPTY_ARRAY = Object.freeze([]);
    EMPTY_SET = Object.freeze(new class extends Set {
      add() {
        throw new Error("Cannot add to empty set");
      }
    }());
    LINE_TRUNCATE_LENGTH = 120;
    MIN_CHARACTERS_SHOWN_AFTER_LOCATION = 10;
    ELLIPSIS = "...";
    URL_AVOIDING_EVAL = "troubleshooting/#avoiding-eval";
    URL_NAME_IS_NOT_EXPORTED = "troubleshooting/#error-name-is-not-exported-by-module";
    URL_THIS_IS_UNDEFINED = "troubleshooting/#error-this-is-undefined";
    URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY = "troubleshooting/#warning-treating-module-as-external-dependency";
    URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT = "troubleshooting/#warning-sourcemap-is-likely-to-be-incorrect";
    URL_MAXPARALLELFILEOPS = "configuration-options/#maxparallelfileops";
    URL_OUTPUT_AMD_ID = "configuration-options/#output-amd-id";
    URL_OUTPUT_AMD_BASEPATH = "configuration-options/#output-amd-basepath";
    URL_OUTPUT_DIR = "configuration-options/#output-dir";
    URL_OUTPUT_DYNAMICIMPORTFUNCTION = "configuration-options/#output-dynamicimportfunction";
    URL_OUTPUT_EXPORTS = "configuration-options/#output-exports";
    URL_OUTPUT_EXTEND = "configuration-options/#output-extend";
    URL_OUTPUT_FORMAT = "configuration-options/#output-format";
    URL_OUTPUT_GENERATEDCODE = "configuration-options/#output-generatedcode";
    URL_OUTPUT_EXPERIMENTALDEEPCHUNKOPTIMIZATION = "configuration-options/#output-experimentaldeepdynamicchunkoptimization";
    URL_OUTPUT_GENERATEDCODE_CONSTBINDINGS = "configuration-options/#output-generatedcode-constbindings";
    URL_OUTPUT_GENERATEDCODE_SYMBOLS = "configuration-options/#output-generatedcode-symbols";
    URL_OUTPUT_GLOBALS = "configuration-options/#output-globals";
    URL_OUTPUT_INLINEDYNAMICIMPORTS = "configuration-options/#output-inlinedynamicimports";
    URL_OUTPUT_INTEROP = "configuration-options/#output-interop";
    URL_OUTPUT_MANUALCHUNKS = "configuration-options/#output-manualchunks";
    URL_OUTPUT_NAME = "configuration-options/#output-name";
    URL_OUTPUT_PRESERVEMODULES = "configuration-options/#output-preservemodules";
    URL_OUTPUT_SOURCEMAPBASEURL = "configuration-options/#output-sourcemapbaseurl";
    URL_OUTPUT_SOURCEMAPFILE = "configuration-options/#output-sourcemapfile";
    URL_PRESERVEENTRYSIGNATURES = "configuration-options/#preserveentrysignatures";
    URL_TREESHAKE = "configuration-options/#treeshake";
    URL_TREESHAKE_MODULESIDEEFFECTS = "configuration-options/#treeshake-modulesideeffects";
    URL_WATCH = "configuration-options/#watch";
    URL_RENDERDYNAMICIMPORT = "plugin-development/#renderdynamicimport";
    URL_THIS_GETMODULEIDS = "plugin-development/#this-getmoduleids";
    URL_THIS_GETMODULEINFO = "plugin-development/#this-getmoduleinfo";
    ADDON_ERROR = "ADDON_ERROR";
    ALREADY_CLOSED = "ALREADY_CLOSED";
    AMBIGUOUS_EXTERNAL_NAMESPACES = "AMBIGUOUS_EXTERNAL_NAMESPACES";
    ANONYMOUS_PLUGIN_CACHE = "ANONYMOUS_PLUGIN_CACHE";
    ASSET_NOT_FINALISED = "ASSET_NOT_FINALISED";
    ASSET_NOT_FOUND = "ASSET_NOT_FOUND";
    ASSET_SOURCE_ALREADY_SET = "ASSET_SOURCE_ALREADY_SET";
    ASSET_SOURCE_MISSING = "ASSET_SOURCE_MISSING";
    BAD_LOADER = "BAD_LOADER";
    CANNOT_CALL_NAMESPACE = "CANNOT_CALL_NAMESPACE";
    CANNOT_EMIT_FROM_OPTIONS_HOOK = "CANNOT_EMIT_FROM_OPTIONS_HOOK";
    CHUNK_NOT_GENERATED = "CHUNK_NOT_GENERATED";
    CHUNK_INVALID = "CHUNK_INVALID";
    CIRCULAR_DEPENDENCY = "CIRCULAR_DEPENDENCY";
    CIRCULAR_REEXPORT = "CIRCULAR_REEXPORT";
    CYCLIC_CROSS_CHUNK_REEXPORT = "CYCLIC_CROSS_CHUNK_REEXPORT";
    DEPRECATED_FEATURE = "DEPRECATED_FEATURE";
    DUPLICATE_PLUGIN_NAME = "DUPLICATE_PLUGIN_NAME";
    EMPTY_BUNDLE = "EMPTY_BUNDLE";
    EVAL = "EVAL";
    EXTERNAL_SYNTHETIC_EXPORTS = "EXTERNAL_SYNTHETIC_EXPORTS";
    FILE_NAME_CONFLICT = "FILE_NAME_CONFLICT";
    FILE_NOT_FOUND = "FILE_NOT_FOUND";
    ILLEGAL_IDENTIFIER_AS_NAME = "ILLEGAL_IDENTIFIER_AS_NAME";
    ILLEGAL_REASSIGNMENT = "ILLEGAL_REASSIGNMENT";
    INCONSISTENT_IMPORT_ASSERTIONS = "INCONSISTENT_IMPORT_ASSERTIONS";
    INPUT_HOOK_IN_OUTPUT_PLUGIN = "INPUT_HOOK_IN_OUTPUT_PLUGIN";
    INVALID_CHUNK = "INVALID_CHUNK";
    INVALID_EXPORT_OPTION = "INVALID_EXPORT_OPTION";
    INVALID_EXTERNAL_ID = "INVALID_EXTERNAL_ID";
    INVALID_OPTION = "INVALID_OPTION";
    INVALID_PLUGIN_HOOK = "INVALID_PLUGIN_HOOK";
    INVALID_ROLLUP_PHASE = "INVALID_ROLLUP_PHASE";
    INVALID_SETASSETSOURCE = "INVALID_SETASSETSOURCE";
    INVALID_TLA_FORMAT = "INVALID_TLA_FORMAT";
    MISSING_EXPORT = "MISSING_EXPORT";
    MISSING_GLOBAL_NAME = "MISSING_GLOBAL_NAME";
    MISSING_IMPLICIT_DEPENDANT = "MISSING_IMPLICIT_DEPENDANT";
    MISSING_NAME_OPTION_FOR_IIFE_EXPORT = "MISSING_NAME_OPTION_FOR_IIFE_EXPORT";
    MISSING_NODE_BUILTINS = "MISSING_NODE_BUILTINS";
    MISSING_OPTION = "MISSING_OPTION";
    MIXED_EXPORTS = "MIXED_EXPORTS";
    MODULE_LEVEL_DIRECTIVE = "MODULE_LEVEL_DIRECTIVE";
    NAMESPACE_CONFLICT = "NAMESPACE_CONFLICT";
    NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = "NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE";
    PARSE_ERROR = "PARSE_ERROR";
    PLUGIN_ERROR = "PLUGIN_ERROR";
    SHIMMED_EXPORT = "SHIMMED_EXPORT";
    SOURCEMAP_BROKEN = "SOURCEMAP_BROKEN";
    SOURCEMAP_ERROR = "SOURCEMAP_ERROR";
    SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT = "SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT";
    THIS_IS_UNDEFINED = "THIS_IS_UNDEFINED";
    UNEXPECTED_NAMED_IMPORT = "UNEXPECTED_NAMED_IMPORT";
    UNKNOWN_OPTION = "UNKNOWN_OPTION";
    UNRESOLVED_ENTRY = "UNRESOLVED_ENTRY";
    UNRESOLVED_IMPORT = "UNRESOLVED_IMPORT";
    UNUSED_EXTERNAL_IMPORT = "UNUSED_EXTERNAL_IMPORT";
    VALIDATION_ERROR = "VALIDATION_ERROR";
    formatAssertions = (assertions) => {
      const entries = Object.entries(assertions);
      if (entries.length === 0)
        return "no";
      return entries.map(([key, value]) => `"${key}": "${value}"`).join(", ");
    };
    RESERVED_NAMES = /* @__PURE__ */ new Set([
      "await",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "eval",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "instanceof",
      "interface",
      "let",
      "NaN",
      "new",
      "null",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "static",
      "super",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "undefined",
      "var",
      "void",
      "while",
      "with",
      "yield"
    ]);
    RESERVED_NAMES$1 = RESERVED_NAMES;
    illegalCharacters = /[^\w$]/g;
    startsWithDigit = (value) => /\d/.test(value[0]);
    needsEscape = (value) => startsWithDigit(value) || RESERVED_NAMES$1.has(value) || value === "arguments";
    ExternalModule = class {
      constructor(options, id, moduleSideEffects, meta, renormalizeRenderPath, assertions) {
        this.options = options;
        this.id = id;
        this.renormalizeRenderPath = renormalizeRenderPath;
        this.dynamicImporters = [];
        this.execIndex = Infinity;
        this.exportedVariables = /* @__PURE__ */ new Map();
        this.importers = [];
        this.reexported = false;
        this.used = false;
        this.declarations = /* @__PURE__ */ new Map();
        this.mostCommonSuggestion = 0;
        this.nameSuggestions = /* @__PURE__ */ new Map();
        this.suggestedVariableName = makeLegal(id.split(/[/\\]/).pop());
        const { importers, dynamicImporters } = this;
        const info = this.info = {
          assertions,
          ast: null,
          code: null,
          dynamicallyImportedIdResolutions: EMPTY_ARRAY,
          dynamicallyImportedIds: EMPTY_ARRAY,
          get dynamicImporters() {
            return dynamicImporters.sort();
          },
          exportedBindings: null,
          exports: null,
          hasDefaultExport: null,
          get hasModuleSideEffects() {
            warnDeprecation("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", URL_THIS_GETMODULEINFO, true, options);
            return info.moduleSideEffects;
          },
          id,
          implicitlyLoadedAfterOneOf: EMPTY_ARRAY,
          implicitlyLoadedBefore: EMPTY_ARRAY,
          importedIdResolutions: EMPTY_ARRAY,
          importedIds: EMPTY_ARRAY,
          get importers() {
            return importers.sort();
          },
          isEntry: false,
          isExternal: true,
          isIncluded: null,
          meta,
          moduleSideEffects,
          syntheticNamedExports: false
        };
        Object.defineProperty(this.info, "hasModuleSideEffects", {
          enumerable: false
        });
      }
      getVariableForExportName(name) {
        const declaration = this.declarations.get(name);
        if (declaration)
          return [declaration];
        const externalVariable = new ExternalVariable(this, name);
        this.declarations.set(name, externalVariable);
        this.exportedVariables.set(externalVariable, name);
        return [externalVariable];
      }
      suggestName(name) {
        const value = (this.nameSuggestions.get(name) ?? 0) + 1;
        this.nameSuggestions.set(name, value);
        if (value > this.mostCommonSuggestion) {
          this.mostCommonSuggestion = value;
          this.suggestedVariableName = name;
        }
      }
      warnUnusedImports() {
        const unused = [...this.declarations].filter(([name, declaration]) => name !== "*" && !declaration.included && !this.reexported && !declaration.referenced).map(([name]) => name);
        if (unused.length === 0)
          return;
        const importersSet = /* @__PURE__ */ new Set();
        for (const name of unused) {
          for (const importer of this.declarations.get(name).module.importers) {
            importersSet.add(importer);
          }
        }
        const importersArray = [...importersSet];
        this.options.onwarn(errorUnusedExternalImports(this.id, unused, importersArray));
      }
    };
    picomatchExports = {};
    picomatch$1 = {
      get exports() {
        return picomatchExports;
      },
      set exports(v) {
        picomatchExports = v;
      }
    };
    utils$3 = {};
    path$1 = import_path.default;
    WIN_SLASH = "\\\\/";
    WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    DOT_LITERAL = "\\.";
    PLUS_LITERAL = "\\+";
    QMARK_LITERAL = "\\?";
    SLASH_LITERAL = "\\/";
    ONE_CHAR = "(?=.)";
    QMARK = "[^/]";
    END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    NO_DOT = `(?!${DOT_LITERAL})`;
    NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    STAR = `${QMARK}*?`;
    POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    POSIX_REGEX_SOURCE$1 = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    constants$2 = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path$1.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars2) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
    (function(exports) {
      const path2 = import_path.default;
      const win322 = process.platform === "win32";
      const {
        REGEX_BACKSLASH,
        REGEX_REMOVE_BACKSLASH,
        REGEX_SPECIAL_CHARS,
        REGEX_SPECIAL_CHARS_GLOBAL
      } = constants$2;
      exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
      exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
      exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
      exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
      exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
      exports.removeBackslashes = (str) => {
        return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
          return match === "\\" ? "" : match;
        });
      };
      exports.supportsLookbehinds = () => {
        const segs = process.version.slice(1).split(".").map(Number);
        if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
          return true;
        }
        return false;
      };
      exports.isWindows = (options) => {
        if (options && typeof options.windows === "boolean") {
          return options.windows;
        }
        return win322 === true || path2.sep === "\\";
      };
      exports.escapeLast = (input, char, lastIdx) => {
        const idx = input.lastIndexOf(char, lastIdx);
        if (idx === -1)
          return input;
        if (input[idx - 1] === "\\")
          return exports.escapeLast(input, char, idx - 1);
        return `${input.slice(0, idx)}\\${input.slice(idx)}`;
      };
      exports.removePrefix = (input, state = {}) => {
        let output = input;
        if (output.startsWith("./")) {
          output = output.slice(2);
          state.prefix = "./";
        }
        return output;
      };
      exports.wrapOutput = (input, state = {}, options = {}) => {
        const prepend = options.contains ? "" : "^";
        const append = options.contains ? "" : "$";
        let output = `${prepend}(?:${input})${append}`;
        if (state.negated === true) {
          output = `(?:^(?!${output}).*$)`;
        }
        return output;
      };
    })(utils$3);
    utils$2 = utils$3;
    ({
      CHAR_ASTERISK,
      CHAR_AT: (
        /* * */
        CHAR_AT
      ),
      CHAR_BACKWARD_SLASH: (
        /* @ */
        CHAR_BACKWARD_SLASH
      ),
      CHAR_COMMA: (
        /* \ */
        CHAR_COMMA
      ),
      CHAR_DOT: (
        /* , */
        CHAR_DOT
      ),
      CHAR_EXCLAMATION_MARK: (
        /* . */
        CHAR_EXCLAMATION_MARK
      ),
      CHAR_FORWARD_SLASH: (
        /* ! */
        CHAR_FORWARD_SLASH
      ),
      CHAR_LEFT_CURLY_BRACE: (
        /* / */
        CHAR_LEFT_CURLY_BRACE
      ),
      CHAR_LEFT_PARENTHESES: (
        /* { */
        CHAR_LEFT_PARENTHESES
      ),
      CHAR_LEFT_SQUARE_BRACKET: (
        /* ( */
        CHAR_LEFT_SQUARE_BRACKET
      ),
      CHAR_PLUS: (
        /* [ */
        CHAR_PLUS
      ),
      CHAR_QUESTION_MARK: (
        /* + */
        CHAR_QUESTION_MARK
      ),
      CHAR_RIGHT_CURLY_BRACE: (
        /* ? */
        CHAR_RIGHT_CURLY_BRACE
      ),
      CHAR_RIGHT_PARENTHESES: (
        /* } */
        CHAR_RIGHT_PARENTHESES
      ),
      CHAR_RIGHT_SQUARE_BRACKET: (
        /* ) */
        CHAR_RIGHT_SQUARE_BRACKET
      )
    } = constants$2);
    isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    scan$1 = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance2 = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance2();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance2();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance2())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance2();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance2()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance2())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance2();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance2())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance2();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance2())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance2();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base2 = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base2 && isGlob === true && lastIndex > 0) {
        base2 = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base2 = "";
        glob = str;
      } else {
        base2 = str;
      }
      if (base2 && base2 !== "" && base2 !== "/" && base2 !== str) {
        if (isPathSeparator(base2.charCodeAt(base2.length - 1))) {
          base2 = base2.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils$2.removeBackslashes(glob);
        if (base2 && backslashes === true) {
          base2 = utils$2.removeBackslashes(base2);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base: base2,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n2 = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n2, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    scan_1 = scan$1;
    constants$1 = constants$2;
    utils$1 = utils$3;
    ({
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants$1);
    expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      return value;
    };
    syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    parse$2 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win322 = utils$1.isWindows(options);
      const PLATFORM_CHARS = constants$1.globChars(win322);
      const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL: DOT_LITERAL2,
        PLUS_LITERAL: PLUS_LITERAL2,
        SLASH_LITERAL: SLASH_LITERAL2,
        ONE_CHAR: ONE_CHAR2,
        DOTS_SLASH: DOTS_SLASH2,
        NO_DOT: NO_DOT2,
        NO_DOT_SLASH: NO_DOT_SLASH2,
        NO_DOTS_SLASH: NO_DOTS_SLASH2,
        QMARK: QMARK2,
        QMARK_NO_DOT: QMARK_NO_DOT2,
        STAR: STAR2,
        START_ANCHOR: START_ANCHOR2
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT2;
      const qmarkNoDot = opts.dot ? QMARK2 : QMARK_NO_DOT2;
      let star = opts.bash === true ? globstar(opts) : STAR2;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils$1.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n2 = 1) => input[state.index + n2];
      const advance2 = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance2();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR2 });
        push({ type: "paren", extglob: true, value: advance2(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse$2(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars2, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK2.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK2.repeat(rest.length) : "");
            }
            return QMARK2.repeat(chars2.length);
          }
          if (first === ".") {
            return DOT_LITERAL2.repeat(chars2.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils$1.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance2();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance2();
          } else {
            value += advance2();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance2();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR2;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils$1.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils$1.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils$1.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL2 });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL2;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL2 });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL2 });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils$1.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT2 });
            continue;
          }
          push({ type: "qmark", value, output: QMARK2 });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL2 });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL2 });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL2}|${SLASH_LITERAL2}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance2());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL2}|${globstar(opts)}${SLASH_LITERAL2})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance2());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH2;
            prev.output += NO_DOT_SLASH2;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH2;
            prev.output += NO_DOTS_SLASH2;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR2;
            prev.output += ONE_CHAR2;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils$1.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils$1.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils$1.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL2}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse$2.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win322 = utils$1.isWindows(options);
      const {
        DOT_LITERAL: DOT_LITERAL2,
        SLASH_LITERAL: SLASH_LITERAL2,
        ONE_CHAR: ONE_CHAR2,
        DOTS_SLASH: DOTS_SLASH2,
        NO_DOT: NO_DOT2,
        NO_DOTS: NO_DOTS2,
        NO_DOTS_SLASH: NO_DOTS_SLASH2,
        STAR: STAR2,
        START_ANCHOR: START_ANCHOR2
      } = constants$1.globChars(win322);
      const nodot = opts.dot ? NO_DOTS2 : NO_DOT2;
      const slashDot = opts.dot ? NO_DOTS_SLASH2 : NO_DOT2;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR2;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR2}${star}`;
          case ".*":
            return `${DOT_LITERAL2}${ONE_CHAR2}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL2}${ONE_CHAR2}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${ONE_CHAR2}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${DOT_LITERAL2}${ONE_CHAR2}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL2 + match[2];
          }
        }
      };
      const output = utils$1.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL2}?`;
      }
      return source;
    };
    parse_1 = parse$2;
    path = import_path.default;
    scan = scan_1;
    parse$1 = parse_1;
    utils = utils$3;
    constants = constants$2;
    isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix: posix2 });
        const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix2 = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse$1(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse$1.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse$1(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    picomatch_1 = picomatch;
    (function(module) {
      module.exports = picomatch_1;
    })(picomatch$1);
    pm = getDefaultExportFromCjs(picomatchExports);
    extractors = {
      ArrayPattern(names, param) {
        for (const element of param.elements) {
          if (element)
            extractors[element.type](names, element);
        }
      },
      AssignmentPattern(names, param) {
        extractors[param.left.type](names, param.left);
      },
      Identifier(names, param) {
        names.push(param.name);
      },
      MemberExpression() {
      },
      ObjectPattern(names, param) {
        for (const prop of param.properties) {
          if (prop.type === "RestElement") {
            extractors.RestElement(names, prop);
          } else {
            extractors[prop.value.type](names, prop.value);
          }
        }
      },
      RestElement(names, param) {
        extractors[param.argument.type](names, param.argument);
      }
    };
    extractAssignedNames = function extractAssignedNames2(param) {
      const names = [];
      extractors[param.type](names, param);
      return names;
    };
    normalizePath = function normalizePath2(filename) {
      return filename.split(import_path.win32.sep).join(import_path.posix.sep);
    };
    createFilter = function createFilter2(include, exclude, options) {
      const resolutionBase = options && options.resolve;
      const getMatcher = (id) => id instanceof RegExp ? id : {
        test: (what) => {
          const pattern = getMatcherString(id, resolutionBase);
          const fn = pm(pattern, { dot: true });
          const result = fn(what);
          return result;
        }
      };
      const includeMatchers = ensureArray$1(include).map(getMatcher);
      const excludeMatchers = ensureArray$1(exclude).map(getMatcher);
      return function result(id) {
        if (typeof id !== "string")
          return false;
        if (/\0/.test(id))
          return false;
        const pathId = normalizePath(id);
        for (let i = 0; i < excludeMatchers.length; ++i) {
          const matcher = excludeMatchers[i];
          if (matcher.test(pathId))
            return false;
        }
        for (let i = 0; i < includeMatchers.length; ++i) {
          const matcher = includeMatchers[i];
          if (matcher.test(pathId))
            return true;
        }
        return !includeMatchers.length;
      };
    };
    reservedWords$1 = "break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public";
    builtins = "arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl";
    forbiddenIdentifiers = new Set(`${reservedWords$1} ${builtins}`.split(" "));
    forbiddenIdentifiers.add("");
    UNDEFINED_EXPRESSION = new class UndefinedExpression extends ExpressionEntity {
      getLiteralValueAtPath() {
        return void 0;
      }
    }();
    returnsUnknown = {
      value: {
        hasEffectsWhenCalled: null,
        returns: UNKNOWN_EXPRESSION
      }
    };
    UNKNOWN_LITERAL_BOOLEAN = new class UnknownBoolean extends ExpressionEntity {
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length === 1) {
          return getMemberReturnExpressionWhenCalled(literalBooleanMembers, path2[0]);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (interaction.type === INTERACTION_ACCESSED) {
          return path2.length > 1;
        }
        if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
          return hasMemberEffectWhenCalled(literalBooleanMembers, path2[0], interaction, context);
        }
        return true;
      }
    }();
    returnsBoolean = {
      value: {
        hasEffectsWhenCalled: null,
        returns: UNKNOWN_LITERAL_BOOLEAN
      }
    };
    UNKNOWN_LITERAL_NUMBER = new class UnknownNumber extends ExpressionEntity {
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length === 1) {
          return getMemberReturnExpressionWhenCalled(literalNumberMembers, path2[0]);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (interaction.type === INTERACTION_ACCESSED) {
          return path2.length > 1;
        }
        if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
          return hasMemberEffectWhenCalled(literalNumberMembers, path2[0], interaction, context);
        }
        return true;
      }
    }();
    returnsNumber = {
      value: {
        hasEffectsWhenCalled: null,
        returns: UNKNOWN_LITERAL_NUMBER
      }
    };
    UNKNOWN_LITERAL_STRING = new class UnknownString extends ExpressionEntity {
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length === 1) {
          return getMemberReturnExpressionWhenCalled(literalStringMembers, path2[0]);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (interaction.type === INTERACTION_ACCESSED) {
          return path2.length > 1;
        }
        if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
          return hasMemberEffectWhenCalled(literalStringMembers, path2[0], interaction, context);
        }
        return true;
      }
    }();
    returnsString = {
      value: {
        hasEffectsWhenCalled: null,
        returns: UNKNOWN_LITERAL_STRING
      }
    };
    stringReplace = {
      value: {
        hasEffectsWhenCalled({ args }, context) {
          const argument1 = args[2];
          return args.length < 3 || typeof argument1.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, {
            deoptimizeCache() {
            }
          }) === "symbol" && argument1.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, context);
        },
        returns: UNKNOWN_LITERAL_STRING
      }
    };
    objectMembers = assembleMemberDescriptions({
      hasOwnProperty: returnsBoolean,
      isPrototypeOf: returnsBoolean,
      propertyIsEnumerable: returnsBoolean,
      toLocaleString: returnsString,
      toString: returnsString,
      valueOf: returnsUnknown
    });
    literalBooleanMembers = assembleMemberDescriptions({
      valueOf: returnsBoolean
    }, objectMembers);
    literalNumberMembers = assembleMemberDescriptions({
      toExponential: returnsString,
      toFixed: returnsString,
      toLocaleString: returnsString,
      toPrecision: returnsString,
      valueOf: returnsNumber
    }, objectMembers);
    literalRegExpMembers = assembleMemberDescriptions({
      exec: returnsUnknown,
      test: returnsBoolean
    }, objectMembers);
    literalStringMembers = assembleMemberDescriptions({
      anchor: returnsString,
      at: returnsUnknown,
      big: returnsString,
      blink: returnsString,
      bold: returnsString,
      charAt: returnsString,
      charCodeAt: returnsNumber,
      codePointAt: returnsUnknown,
      concat: returnsString,
      endsWith: returnsBoolean,
      fixed: returnsString,
      fontcolor: returnsString,
      fontsize: returnsString,
      includes: returnsBoolean,
      indexOf: returnsNumber,
      italics: returnsString,
      lastIndexOf: returnsNumber,
      link: returnsString,
      localeCompare: returnsNumber,
      match: returnsUnknown,
      matchAll: returnsUnknown,
      normalize: returnsString,
      padEnd: returnsString,
      padStart: returnsString,
      repeat: returnsString,
      replace: stringReplace,
      replaceAll: stringReplace,
      search: returnsNumber,
      slice: returnsString,
      small: returnsString,
      split: returnsUnknown,
      startsWith: returnsBoolean,
      strike: returnsString,
      sub: returnsString,
      substr: returnsString,
      substring: returnsString,
      sup: returnsString,
      toLocaleLowerCase: returnsString,
      toLocaleUpperCase: returnsString,
      toLowerCase: returnsString,
      toString: returnsString,
      toUpperCase: returnsString,
      trim: returnsString,
      trimEnd: returnsString,
      trimLeft: returnsString,
      trimRight: returnsString,
      trimStart: returnsString,
      valueOf: returnsString
    }, objectMembers);
    base$1 = {};
    base$1.Program = base$1.BlockStatement = base$1.StaticBlock = function(node, st, c) {
      for (var i = 0, list = node.body; i < list.length; i += 1) {
        var stmt = list[i];
        c(stmt, st, "Statement");
      }
    };
    base$1.Statement = skipThrough;
    base$1.EmptyStatement = ignore;
    base$1.ExpressionStatement = base$1.ParenthesizedExpression = base$1.ChainExpression = function(node, st, c) {
      return c(node.expression, st, "Expression");
    };
    base$1.IfStatement = function(node, st, c) {
      c(node.test, st, "Expression");
      c(node.consequent, st, "Statement");
      if (node.alternate) {
        c(node.alternate, st, "Statement");
      }
    };
    base$1.LabeledStatement = function(node, st, c) {
      return c(node.body, st, "Statement");
    };
    base$1.BreakStatement = base$1.ContinueStatement = ignore;
    base$1.WithStatement = function(node, st, c) {
      c(node.object, st, "Expression");
      c(node.body, st, "Statement");
    };
    base$1.SwitchStatement = function(node, st, c) {
      c(node.discriminant, st, "Expression");
      for (var i$1 = 0, list$1 = node.cases; i$1 < list$1.length; i$1 += 1) {
        var cs = list$1[i$1];
        if (cs.test) {
          c(cs.test, st, "Expression");
        }
        for (var i = 0, list = cs.consequent; i < list.length; i += 1) {
          var cons = list[i];
          c(cons, st, "Statement");
        }
      }
    };
    base$1.SwitchCase = function(node, st, c) {
      if (node.test) {
        c(node.test, st, "Expression");
      }
      for (var i = 0, list = node.consequent; i < list.length; i += 1) {
        var cons = list[i];
        c(cons, st, "Statement");
      }
    };
    base$1.ReturnStatement = base$1.YieldExpression = base$1.AwaitExpression = function(node, st, c) {
      if (node.argument) {
        c(node.argument, st, "Expression");
      }
    };
    base$1.ThrowStatement = base$1.SpreadElement = function(node, st, c) {
      return c(node.argument, st, "Expression");
    };
    base$1.TryStatement = function(node, st, c) {
      c(node.block, st, "Statement");
      if (node.handler) {
        c(node.handler, st);
      }
      if (node.finalizer) {
        c(node.finalizer, st, "Statement");
      }
    };
    base$1.CatchClause = function(node, st, c) {
      if (node.param) {
        c(node.param, st, "Pattern");
      }
      c(node.body, st, "Statement");
    };
    base$1.WhileStatement = base$1.DoWhileStatement = function(node, st, c) {
      c(node.test, st, "Expression");
      c(node.body, st, "Statement");
    };
    base$1.ForStatement = function(node, st, c) {
      if (node.init) {
        c(node.init, st, "ForInit");
      }
      if (node.test) {
        c(node.test, st, "Expression");
      }
      if (node.update) {
        c(node.update, st, "Expression");
      }
      c(node.body, st, "Statement");
    };
    base$1.ForInStatement = base$1.ForOfStatement = function(node, st, c) {
      c(node.left, st, "ForInit");
      c(node.right, st, "Expression");
      c(node.body, st, "Statement");
    };
    base$1.ForInit = function(node, st, c) {
      if (node.type === "VariableDeclaration") {
        c(node, st);
      } else {
        c(node, st, "Expression");
      }
    };
    base$1.DebuggerStatement = ignore;
    base$1.FunctionDeclaration = function(node, st, c) {
      return c(node, st, "Function");
    };
    base$1.VariableDeclaration = function(node, st, c) {
      for (var i = 0, list = node.declarations; i < list.length; i += 1) {
        var decl = list[i];
        c(decl, st);
      }
    };
    base$1.VariableDeclarator = function(node, st, c) {
      c(node.id, st, "Pattern");
      if (node.init) {
        c(node.init, st, "Expression");
      }
    };
    base$1.Function = function(node, st, c) {
      if (node.id) {
        c(node.id, st, "Pattern");
      }
      for (var i = 0, list = node.params; i < list.length; i += 1) {
        var param = list[i];
        c(param, st, "Pattern");
      }
      c(node.body, st, node.expression ? "Expression" : "Statement");
    };
    base$1.Pattern = function(node, st, c) {
      if (node.type === "Identifier") {
        c(node, st, "VariablePattern");
      } else if (node.type === "MemberExpression") {
        c(node, st, "MemberPattern");
      } else {
        c(node, st);
      }
    };
    base$1.VariablePattern = ignore;
    base$1.MemberPattern = skipThrough;
    base$1.RestElement = function(node, st, c) {
      return c(node.argument, st, "Pattern");
    };
    base$1.ArrayPattern = function(node, st, c) {
      for (var i = 0, list = node.elements; i < list.length; i += 1) {
        var elt = list[i];
        if (elt) {
          c(elt, st, "Pattern");
        }
      }
    };
    base$1.ObjectPattern = function(node, st, c) {
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];
        if (prop.type === "Property") {
          if (prop.computed) {
            c(prop.key, st, "Expression");
          }
          c(prop.value, st, "Pattern");
        } else if (prop.type === "RestElement") {
          c(prop.argument, st, "Pattern");
        }
      }
    };
    base$1.Expression = skipThrough;
    base$1.ThisExpression = base$1.Super = base$1.MetaProperty = ignore;
    base$1.ArrayExpression = function(node, st, c) {
      for (var i = 0, list = node.elements; i < list.length; i += 1) {
        var elt = list[i];
        if (elt) {
          c(elt, st, "Expression");
        }
      }
    };
    base$1.ObjectExpression = function(node, st, c) {
      for (var i = 0, list = node.properties; i < list.length; i += 1) {
        var prop = list[i];
        c(prop, st);
      }
    };
    base$1.FunctionExpression = base$1.ArrowFunctionExpression = base$1.FunctionDeclaration;
    base$1.SequenceExpression = function(node, st, c) {
      for (var i = 0, list = node.expressions; i < list.length; i += 1) {
        var expr = list[i];
        c(expr, st, "Expression");
      }
    };
    base$1.TemplateLiteral = function(node, st, c) {
      for (var i = 0, list = node.quasis; i < list.length; i += 1) {
        var quasi = list[i];
        c(quasi, st);
      }
      for (var i$1 = 0, list$1 = node.expressions; i$1 < list$1.length; i$1 += 1) {
        var expr = list$1[i$1];
        c(expr, st, "Expression");
      }
    };
    base$1.TemplateElement = ignore;
    base$1.UnaryExpression = base$1.UpdateExpression = function(node, st, c) {
      c(node.argument, st, "Expression");
    };
    base$1.BinaryExpression = base$1.LogicalExpression = function(node, st, c) {
      c(node.left, st, "Expression");
      c(node.right, st, "Expression");
    };
    base$1.AssignmentExpression = base$1.AssignmentPattern = function(node, st, c) {
      c(node.left, st, "Pattern");
      c(node.right, st, "Expression");
    };
    base$1.ConditionalExpression = function(node, st, c) {
      c(node.test, st, "Expression");
      c(node.consequent, st, "Expression");
      c(node.alternate, st, "Expression");
    };
    base$1.NewExpression = base$1.CallExpression = function(node, st, c) {
      c(node.callee, st, "Expression");
      if (node.arguments) {
        for (var i = 0, list = node.arguments; i < list.length; i += 1) {
          var arg = list[i];
          c(arg, st, "Expression");
        }
      }
    };
    base$1.MemberExpression = function(node, st, c) {
      c(node.object, st, "Expression");
      if (node.computed) {
        c(node.property, st, "Expression");
      }
    };
    base$1.ExportNamedDeclaration = base$1.ExportDefaultDeclaration = function(node, st, c) {
      if (node.declaration) {
        c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression");
      }
      if (node.source) {
        c(node.source, st, "Expression");
      }
    };
    base$1.ExportAllDeclaration = function(node, st, c) {
      if (node.exported) {
        c(node.exported, st);
      }
      c(node.source, st, "Expression");
    };
    base$1.ImportDeclaration = function(node, st, c) {
      for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
        var spec = list[i];
        c(spec, st);
      }
      c(node.source, st, "Expression");
    };
    base$1.ImportExpression = function(node, st, c) {
      c(node.source, st, "Expression");
    };
    base$1.ImportSpecifier = base$1.ImportDefaultSpecifier = base$1.ImportNamespaceSpecifier = base$1.Identifier = base$1.PrivateIdentifier = base$1.Literal = ignore;
    base$1.TaggedTemplateExpression = function(node, st, c) {
      c(node.tag, st, "Expression");
      c(node.quasi, st, "Expression");
    };
    base$1.ClassDeclaration = base$1.ClassExpression = function(node, st, c) {
      return c(node, st, "Class");
    };
    base$1.Class = function(node, st, c) {
      if (node.id) {
        c(node.id, st, "Pattern");
      }
      if (node.superClass) {
        c(node.superClass, st, "Expression");
      }
      c(node.body, st);
    };
    base$1.ClassBody = function(node, st, c) {
      for (var i = 0, list = node.body; i < list.length; i += 1) {
        var elt = list[i];
        c(elt, st);
      }
    };
    base$1.MethodDefinition = base$1.PropertyDefinition = base$1.Property = function(node, st, c) {
      if (node.computed) {
        c(node.key, st, "Expression");
      }
      if (node.value) {
        c(node.value, st, "Expression");
      }
    };
    ArrowFunctionExpression$1 = "ArrowFunctionExpression";
    BinaryExpression$1 = "BinaryExpression";
    BlockStatement$1 = "BlockStatement";
    CallExpression$1 = "CallExpression";
    ChainExpression$1 = "ChainExpression";
    ConditionalExpression$1 = "ConditionalExpression";
    ExpressionStatement$1 = "ExpressionStatement";
    Identifier$1 = "Identifier";
    LogicalExpression$1 = "LogicalExpression";
    NewExpression$1 = "NewExpression";
    Program$1 = "Program";
    Property$1 = "Property";
    ReturnStatement$1 = "ReturnStatement";
    SequenceExpression$1 = "SequenceExpression";
    SOURCEMAPPING_URL = "sourceMa";
    SOURCEMAPPING_URL += "ppingURL";
    whiteSpaceNoNewline = "[ \\f\\r\\t\\v\\u00a0\\u1680\\u2000-\\u200a\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff]";
    SOURCEMAPPING_URL_RE = new RegExp(`^#${whiteSpaceNoNewline}+${SOURCEMAPPING_URL}=.+`);
    ANNOTATION_KEY = "_rollupAnnotations";
    INVALID_COMMENT_KEY = "_rollupRemoved";
    neitherWithespaceNorBrackets = /[^\s(]/g;
    noWhitespace = /\S/g;
    pureCommentRegex = /[#@]__PURE__/;
    keys = {
      // TODO this should be removed once ImportExpression follows official ESTree
      //  specs with "null" as default
      ImportExpression: ["arguments"],
      Literal: [],
      Program: ["body"]
    };
    INCLUDE_PARAMETERS = "variables";
    NodeBase = class extends ExpressionEntity {
      constructor(esTreeNode, parent, parentScope, keepEsTreeNode = false) {
        super();
        this.deoptimized = false;
        this.esTreeNode = keepEsTreeNode ? esTreeNode : null;
        this.keys = keys[esTreeNode.type] || getAndCreateKeys(esTreeNode);
        this.parent = parent;
        this.context = parent.context;
        this.createScope(parentScope);
        this.parseNode(esTreeNode);
        this.initialise();
        this.context.magicString.addSourcemapLocation(this.start);
        this.context.magicString.addSourcemapLocation(this.end);
      }
      addExportedVariables(_variables, _exportNamesByVariable) {
      }
      /**
       * Override this to bind assignments to variables and do any initialisations
       * that require the scopes to be populated with variables.
       */
      bind() {
        for (const key of this.keys) {
          const value = this[key];
          if (Array.isArray(value)) {
            for (const child of value) {
              child == null ? void 0 : child.bind();
            }
          } else if (value) {
            value.bind();
          }
        }
      }
      /**
       * Override if this node should receive a different scope than the parent
       * scope.
       */
      createScope(parentScope) {
        this.scope = parentScope;
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        for (const key of this.keys) {
          const value = this[key];
          if (value === null)
            continue;
          if (Array.isArray(value)) {
            for (const child of value) {
              if (child == null ? void 0 : child.hasEffects(context))
                return true;
            }
          } else if (value.hasEffects(context))
            return true;
        }
        return false;
      }
      hasEffectsAsAssignmentTarget(context, _checkAccess) {
        return this.hasEffects(context) || this.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.assignmentInteraction, context);
      }
      include(context, includeChildrenRecursively, _options) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        for (const key of this.keys) {
          const value = this[key];
          if (value === null)
            continue;
          if (Array.isArray(value)) {
            for (const child of value) {
              child == null ? void 0 : child.include(context, includeChildrenRecursively);
            }
          } else {
            value.include(context, includeChildrenRecursively);
          }
        }
      }
      includeAsAssignmentTarget(context, includeChildrenRecursively, _deoptimizeAccess) {
        this.include(context, includeChildrenRecursively);
      }
      /**
       * Override to perform special initialisation steps after the scope is
       * initialised
       */
      initialise() {
      }
      insertSemicolon(code) {
        if (code.original[this.end - 1] !== ";") {
          code.appendLeft(this.end, ";");
        }
      }
      parseNode(esTreeNode, keepEsTreeNodeKeys) {
        for (const [key, value] of Object.entries(esTreeNode)) {
          if (this.hasOwnProperty(key))
            continue;
          if (key.charCodeAt(0) === 95) {
            if (key === ANNOTATION_KEY) {
              this.annotations = value;
            } else if (key === INVALID_COMMENT_KEY) {
              for (const { start, end } of value)
                this.context.magicString.remove(start, end);
            }
          } else if (typeof value !== "object" || value === null) {
            this[key] = value;
          } else if (Array.isArray(value)) {
            this[key] = [];
            for (const child of value) {
              this[key].push(child === null ? null : new (this.context.getNodeConstructor(child.type))(child, this, this.scope, keepEsTreeNodeKeys == null ? void 0 : keepEsTreeNodeKeys.includes(key)));
            }
          } else {
            this[key] = new (this.context.getNodeConstructor(value.type))(value, this, this.scope, keepEsTreeNodeKeys == null ? void 0 : keepEsTreeNodeKeys.includes(key));
          }
        }
      }
      render(code, options) {
        for (const key of this.keys) {
          const value = this[key];
          if (value === null)
            continue;
          if (Array.isArray(value)) {
            for (const child of value) {
              child == null ? void 0 : child.render(code, options);
            }
          } else {
            value.render(code, options);
          }
        }
      }
      setAssignedValue(value) {
        this.assignmentInteraction = { args: [null, value], type: INTERACTION_ASSIGNED };
      }
      shouldBeIncluded(context) {
        return this.included || !context.brokenFlow && this.hasEffects(createHasEffectsContext());
      }
      /**
       * Just deoptimize everything by default so that when e.g. we do not track
       * something properly, it is deoptimized.
       * @protected
       */
      applyDeoptimizations() {
        this.deoptimized = true;
        for (const key of this.keys) {
          const value = this[key];
          if (value === null)
            continue;
          if (Array.isArray(value)) {
            for (const child of value) {
              child == null ? void 0 : child.deoptimizePath(UNKNOWN_PATH);
            }
          } else {
            value.deoptimizePath(UNKNOWN_PATH);
          }
        }
        this.context.requestTreeshakingPass();
      }
    };
    SpreadElement = class extends NodeBase {
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        if (path2.length > 0) {
          this.argument.deoptimizeArgumentsOnInteractionAtPath(interaction, [UnknownKey, ...path2], recursionTracker);
        }
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        const { propertyReadSideEffects } = this.context.options.treeshake;
        return this.argument.hasEffects(context) || propertyReadSideEffects && (propertyReadSideEffects === "always" || this.argument.hasEffectsOnInteractionAtPath(UNKNOWN_PATH, NODE_INTERACTION_UNKNOWN_ACCESS, context));
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.argument.deoptimizePath([UnknownKey, UnknownKey]);
        this.context.requestTreeshakingPass();
      }
    };
    Method = class extends ExpressionEntity {
      constructor(description) {
        super();
        this.description = description;
      }
      deoptimizeArgumentsOnInteractionAtPath({ args, type }, path2) {
        var _a;
        if (type === INTERACTION_CALLED && path2.length === 0 && this.description.mutatesSelfAsArray) {
          (_a = args[0]) == null ? void 0 : _a.deoptimizePath(UNKNOWN_INTEGER_PATH);
        }
      }
      getReturnExpressionWhenCalledAtPath(path2, { args }) {
        if (path2.length > 0) {
          return UNKNOWN_RETURN_EXPRESSION;
        }
        return [
          this.description.returnsPrimitive || (this.description.returns === "self" ? args[0] || UNKNOWN_EXPRESSION : this.description.returns()),
          false
        ];
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        var _a, _b;
        const { type } = interaction;
        if (path2.length > (type === INTERACTION_ACCESSED ? 1 : 0)) {
          return true;
        }
        if (type === INTERACTION_CALLED) {
          const { args } = interaction;
          if (this.description.mutatesSelfAsArray === true && ((_a = args[0]) == null ? void 0 : _a.hasEffectsOnInteractionAtPath(UNKNOWN_INTEGER_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context))) {
            return true;
          }
          if (this.description.callsArgs) {
            for (const argumentIndex of this.description.callsArgs) {
              if ((_b = args[argumentIndex + 1]) == null ? void 0 : _b.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, context)) {
                return true;
              }
            }
          }
        }
        return false;
      }
    };
    METHOD_RETURNS_BOOLEAN = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: false,
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN
      })
    ];
    METHOD_RETURNS_STRING = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: false,
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_STRING
      })
    ];
    METHOD_RETURNS_NUMBER = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: false,
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER
      })
    ];
    METHOD_RETURNS_UNKNOWN = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: false,
        returns: null,
        returnsPrimitive: UNKNOWN_EXPRESSION
      })
    ];
    INTEGER_REG_EXP = /^\d+$/;
    ObjectEntity = class extends ExpressionEntity {
      // If a PropertyMap is used, this will be taken as propertiesAndGettersByKey
      // and we assume there are no setters or getters
      constructor(properties, prototypeExpression, immutable = false) {
        super();
        this.prototypeExpression = prototypeExpression;
        this.immutable = immutable;
        this.additionalExpressionsToBeDeoptimized = /* @__PURE__ */ new Set();
        this.allProperties = [];
        this.deoptimizedPaths = /* @__PURE__ */ Object.create(null);
        this.expressionsToBeDeoptimizedByKey = /* @__PURE__ */ Object.create(null);
        this.gettersByKey = /* @__PURE__ */ Object.create(null);
        this.hasLostTrack = false;
        this.hasUnknownDeoptimizedInteger = false;
        this.hasUnknownDeoptimizedProperty = false;
        this.propertiesAndGettersByKey = /* @__PURE__ */ Object.create(null);
        this.propertiesAndSettersByKey = /* @__PURE__ */ Object.create(null);
        this.settersByKey = /* @__PURE__ */ Object.create(null);
        this.unknownIntegerProps = [];
        this.unmatchableGetters = [];
        this.unmatchablePropertiesAndGetters = [];
        this.unmatchableSetters = [];
        if (Array.isArray(properties)) {
          this.buildPropertyMaps(properties);
        } else {
          this.propertiesAndGettersByKey = this.propertiesAndSettersByKey = properties;
          for (const propertiesForKey of Object.values(properties)) {
            this.allProperties.push(...propertiesForKey);
          }
        }
      }
      deoptimizeAllProperties(noAccessors) {
        var _a;
        const isDeoptimized = this.hasLostTrack || this.hasUnknownDeoptimizedProperty;
        if (noAccessors) {
          this.hasUnknownDeoptimizedProperty = true;
        } else {
          this.hasLostTrack = true;
        }
        if (isDeoptimized) {
          return;
        }
        for (const properties of [
          ...Object.values(this.propertiesAndGettersByKey),
          ...Object.values(this.settersByKey)
        ]) {
          for (const property of properties) {
            property.deoptimizePath(UNKNOWN_PATH);
          }
        }
        (_a = this.prototypeExpression) == null ? void 0 : _a.deoptimizePath([UnknownKey, UnknownKey]);
        this.deoptimizeCachedEntities();
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        var _a;
        const [key, ...subPath] = path2;
        const { args, type } = interaction;
        if (this.hasLostTrack || // single paths that are deoptimized will not become getters or setters
        (type === INTERACTION_CALLED || path2.length > 1) && (this.hasUnknownDeoptimizedProperty || typeof key === "string" && this.deoptimizedPaths[key])) {
          deoptimizeInteraction(interaction);
          return;
        }
        const [propertiesForExactMatchByKey, relevantPropertiesByKey, relevantUnmatchableProperties] = type === INTERACTION_CALLED || path2.length > 1 ? [
          this.propertiesAndGettersByKey,
          this.propertiesAndGettersByKey,
          this.unmatchablePropertiesAndGetters
        ] : type === INTERACTION_ACCESSED ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
        if (typeof key === "string") {
          if (propertiesForExactMatchByKey[key]) {
            const properties = relevantPropertiesByKey[key];
            if (properties) {
              for (const property of properties) {
                property.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
              }
            }
            if (!this.immutable) {
              for (const argument of args) {
                if (argument) {
                  this.additionalExpressionsToBeDeoptimized.add(argument);
                }
              }
            }
            return;
          }
          for (const property of relevantUnmatchableProperties) {
            property.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
          }
          if (INTEGER_REG_EXP.test(key)) {
            for (const property of this.unknownIntegerProps) {
              property.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
            }
          }
        } else {
          for (const properties of [
            ...Object.values(relevantPropertiesByKey),
            relevantUnmatchableProperties
          ]) {
            for (const property of properties) {
              property.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
            }
          }
          for (const property of this.unknownIntegerProps) {
            property.deoptimizeArgumentsOnInteractionAtPath(interaction, subPath, recursionTracker);
          }
        }
        if (!this.immutable) {
          for (const argument of args) {
            if (argument) {
              this.additionalExpressionsToBeDeoptimized.add(argument);
            }
          }
        }
        (_a = this.prototypeExpression) == null ? void 0 : _a.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizeIntegerProperties() {
        if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || this.hasUnknownDeoptimizedInteger) {
          return;
        }
        this.hasUnknownDeoptimizedInteger = true;
        for (const [key, propertiesAndGetters] of Object.entries(this.propertiesAndGettersByKey)) {
          if (INTEGER_REG_EXP.test(key)) {
            for (const property of propertiesAndGetters) {
              property.deoptimizePath(UNKNOWN_PATH);
            }
          }
        }
        this.deoptimizeCachedIntegerEntities();
      }
      // Assumption: If only a specific path is deoptimized, no accessors are created
      deoptimizePath(path2) {
        var _a;
        if (this.hasLostTrack || this.immutable) {
          return;
        }
        const key = path2[0];
        if (path2.length === 1) {
          if (typeof key !== "string") {
            if (key === UnknownInteger) {
              return this.deoptimizeIntegerProperties();
            }
            return this.deoptimizeAllProperties(key === UnknownNonAccessorKey);
          }
          if (!this.deoptimizedPaths[key]) {
            this.deoptimizedPaths[key] = true;
            const expressionsToBeDeoptimized = this.expressionsToBeDeoptimizedByKey[key];
            if (expressionsToBeDeoptimized) {
              for (const expression of expressionsToBeDeoptimized) {
                expression.deoptimizeCache();
              }
            }
          }
        }
        const subPath = path2.length === 1 ? UNKNOWN_PATH : path2.slice(1);
        for (const property of typeof key === "string" ? [
          ...this.propertiesAndGettersByKey[key] || this.unmatchablePropertiesAndGetters,
          ...this.settersByKey[key] || this.unmatchableSetters
        ] : this.allProperties) {
          property.deoptimizePath(subPath);
        }
        (_a = this.prototypeExpression) == null ? void 0 : _a.deoptimizePath(path2.length === 1 ? [...path2, UnknownKey] : path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (path2.length === 0) {
          return UnknownTruthyValue;
        }
        const key = path2[0];
        const expressionAtPath = this.getMemberExpressionAndTrackDeopt(key, origin);
        if (expressionAtPath) {
          return expressionAtPath.getLiteralValueAtPath(path2.slice(1), recursionTracker, origin);
        }
        if (this.prototypeExpression) {
          return this.prototypeExpression.getLiteralValueAtPath(path2, recursionTracker, origin);
        }
        if (path2.length === 1) {
          return void 0;
        }
        return UnknownValue;
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        if (path2.length === 0) {
          return UNKNOWN_RETURN_EXPRESSION;
        }
        const [key, ...subPath] = path2;
        const expressionAtPath = this.getMemberExpressionAndTrackDeopt(key, origin);
        if (expressionAtPath) {
          return expressionAtPath.getReturnExpressionWhenCalledAtPath(subPath, interaction, recursionTracker, origin);
        }
        if (this.prototypeExpression) {
          return this.prototypeExpression.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        const [key, ...subPath] = path2;
        if (subPath.length > 0 || interaction.type === INTERACTION_CALLED) {
          const expressionAtPath = this.getMemberExpression(key);
          if (expressionAtPath) {
            return expressionAtPath.hasEffectsOnInteractionAtPath(subPath, interaction, context);
          }
          if (this.prototypeExpression) {
            return this.prototypeExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
          return true;
        }
        if (key === UnknownNonAccessorKey)
          return false;
        if (this.hasLostTrack)
          return true;
        const [propertiesAndAccessorsByKey, accessorsByKey, unmatchableAccessors] = interaction.type === INTERACTION_ACCESSED ? [this.propertiesAndGettersByKey, this.gettersByKey, this.unmatchableGetters] : [this.propertiesAndSettersByKey, this.settersByKey, this.unmatchableSetters];
        if (typeof key === "string") {
          if (propertiesAndAccessorsByKey[key]) {
            const accessors = accessorsByKey[key];
            if (accessors) {
              for (const accessor of accessors) {
                if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context))
                  return true;
              }
            }
            return false;
          }
          for (const accessor of unmatchableAccessors) {
            if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context)) {
              return true;
            }
          }
        } else {
          for (const accessors of [...Object.values(accessorsByKey), unmatchableAccessors]) {
            for (const accessor of accessors) {
              if (accessor.hasEffectsOnInteractionAtPath(subPath, interaction, context))
                return true;
            }
          }
        }
        if (this.prototypeExpression) {
          return this.prototypeExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
        }
        return false;
      }
      buildPropertyMaps(properties) {
        const { allProperties, propertiesAndGettersByKey, propertiesAndSettersByKey, settersByKey, gettersByKey, unknownIntegerProps, unmatchablePropertiesAndGetters, unmatchableGetters, unmatchableSetters } = this;
        const unmatchablePropertiesAndSetters = [];
        for (let index = properties.length - 1; index >= 0; index--) {
          const { key, kind, property } = properties[index];
          allProperties.push(property);
          if (typeof key === "string") {
            if (kind === "set") {
              if (!propertiesAndSettersByKey[key]) {
                propertiesAndSettersByKey[key] = [property, ...unmatchablePropertiesAndSetters];
                settersByKey[key] = [property, ...unmatchableSetters];
              }
            } else if (kind === "get") {
              if (!propertiesAndGettersByKey[key]) {
                propertiesAndGettersByKey[key] = [property, ...unmatchablePropertiesAndGetters];
                gettersByKey[key] = [property, ...unmatchableGetters];
              }
            } else {
              if (!propertiesAndSettersByKey[key]) {
                propertiesAndSettersByKey[key] = [property, ...unmatchablePropertiesAndSetters];
              }
              if (!propertiesAndGettersByKey[key]) {
                propertiesAndGettersByKey[key] = [property, ...unmatchablePropertiesAndGetters];
              }
            }
          } else {
            if (key === UnknownInteger) {
              unknownIntegerProps.push(property);
              continue;
            }
            if (kind === "set")
              unmatchableSetters.push(property);
            if (kind === "get")
              unmatchableGetters.push(property);
            if (kind !== "get")
              unmatchablePropertiesAndSetters.push(property);
            if (kind !== "set")
              unmatchablePropertiesAndGetters.push(property);
          }
        }
      }
      deoptimizeCachedEntities() {
        for (const expressionsToBeDeoptimized of Object.values(this.expressionsToBeDeoptimizedByKey)) {
          for (const expression of expressionsToBeDeoptimized) {
            expression.deoptimizeCache();
          }
        }
        for (const expression of this.additionalExpressionsToBeDeoptimized) {
          expression.deoptimizePath(UNKNOWN_PATH);
        }
      }
      deoptimizeCachedIntegerEntities() {
        for (const [key, expressionsToBeDeoptimized] of Object.entries(this.expressionsToBeDeoptimizedByKey)) {
          if (INTEGER_REG_EXP.test(key)) {
            for (const expression of expressionsToBeDeoptimized) {
              expression.deoptimizeCache();
            }
          }
        }
        for (const expression of this.additionalExpressionsToBeDeoptimized) {
          expression.deoptimizePath(UNKNOWN_INTEGER_PATH);
        }
      }
      getMemberExpression(key) {
        if (this.hasLostTrack || this.hasUnknownDeoptimizedProperty || typeof key !== "string" || this.hasUnknownDeoptimizedInteger && INTEGER_REG_EXP.test(key) || this.deoptimizedPaths[key]) {
          return UNKNOWN_EXPRESSION;
        }
        const properties = this.propertiesAndGettersByKey[key];
        if ((properties == null ? void 0 : properties.length) === 1) {
          return properties[0];
        }
        if (properties || this.unmatchablePropertiesAndGetters.length > 0 || this.unknownIntegerProps.length > 0 && INTEGER_REG_EXP.test(key)) {
          return UNKNOWN_EXPRESSION;
        }
        return null;
      }
      getMemberExpressionAndTrackDeopt(key, origin) {
        if (typeof key !== "string") {
          return UNKNOWN_EXPRESSION;
        }
        const expression = this.getMemberExpression(key);
        if (!(expression === UNKNOWN_EXPRESSION || this.immutable)) {
          const expressionsToBeDeoptimized = this.expressionsToBeDeoptimizedByKey[key] = this.expressionsToBeDeoptimizedByKey[key] || [];
          expressionsToBeDeoptimized.push(origin);
        }
        return expression;
      }
    };
    isInteger = (property) => typeof property === "string" && /^\d+$/.test(property);
    OBJECT_PROTOTYPE_FALLBACK = new class ObjectPrototypeFallbackExpression extends ExpressionEntity {
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2) {
        if (interaction.type === INTERACTION_CALLED && path2.length === 1 && !isInteger(path2[0])) {
          deoptimizeInteraction(interaction);
        }
      }
      getLiteralValueAtPath(path2) {
        return path2.length === 1 && isInteger(path2[0]) ? void 0 : UnknownValue;
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return path2.length > 1 || type === INTERACTION_CALLED;
      }
    }();
    OBJECT_PROTOTYPE = new ObjectEntity({
      __proto__: null,
      hasOwnProperty: METHOD_RETURNS_BOOLEAN,
      isPrototypeOf: METHOD_RETURNS_BOOLEAN,
      propertyIsEnumerable: METHOD_RETURNS_BOOLEAN,
      toLocaleString: METHOD_RETURNS_STRING,
      toString: METHOD_RETURNS_STRING,
      valueOf: METHOD_RETURNS_UNKNOWN
    }, OBJECT_PROTOTYPE_FALLBACK, true);
    NEW_ARRAY_PROPERTIES = [
      { key: UnknownInteger, kind: "init", property: UNKNOWN_EXPRESSION },
      { key: "length", kind: "init", property: UNKNOWN_LITERAL_NUMBER }
    ];
    METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN = [
      new Method({
        callsArgs: [0],
        mutatesSelfAsArray: "deopt-only",
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_BOOLEAN
      })
    ];
    METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER = [
      new Method({
        callsArgs: [0],
        mutatesSelfAsArray: "deopt-only",
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER
      })
    ];
    METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: true,
        returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
        returnsPrimitive: null
      })
    ];
    METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: "deopt-only",
        returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
        returnsPrimitive: null
      })
    ];
    METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY = [
      new Method({
        callsArgs: [0],
        mutatesSelfAsArray: "deopt-only",
        returns: () => new ObjectEntity(NEW_ARRAY_PROPERTIES, ARRAY_PROTOTYPE),
        returnsPrimitive: null
      })
    ];
    METHOD_MUTATES_SELF_RETURNS_NUMBER = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: true,
        returns: null,
        returnsPrimitive: UNKNOWN_LITERAL_NUMBER
      })
    ];
    METHOD_MUTATES_SELF_RETURNS_UNKNOWN = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: true,
        returns: null,
        returnsPrimitive: UNKNOWN_EXPRESSION
      })
    ];
    METHOD_DEOPTS_SELF_RETURNS_UNKNOWN = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: "deopt-only",
        returns: null,
        returnsPrimitive: UNKNOWN_EXPRESSION
      })
    ];
    METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN = [
      new Method({
        callsArgs: [0],
        mutatesSelfAsArray: "deopt-only",
        returns: null,
        returnsPrimitive: UNKNOWN_EXPRESSION
      })
    ];
    METHOD_MUTATES_SELF_RETURNS_SELF = [
      new Method({
        callsArgs: null,
        mutatesSelfAsArray: true,
        returns: "self",
        returnsPrimitive: null
      })
    ];
    METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF = [
      new Method({
        callsArgs: [0],
        mutatesSelfAsArray: true,
        returns: "self",
        returnsPrimitive: null
      })
    ];
    ARRAY_PROTOTYPE = new ObjectEntity({
      __proto__: null,
      // We assume that accessors have effects as we do not track the accessed value afterwards
      at: METHOD_DEOPTS_SELF_RETURNS_UNKNOWN,
      concat: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      copyWithin: METHOD_MUTATES_SELF_RETURNS_SELF,
      entries: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      every: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN,
      fill: METHOD_MUTATES_SELF_RETURNS_SELF,
      filter: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      find: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
      findIndex: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER,
      findLast: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
      findLastIndex: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NUMBER,
      flat: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      flatMap: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      forEach: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
      includes: METHOD_RETURNS_BOOLEAN,
      indexOf: METHOD_RETURNS_NUMBER,
      join: METHOD_RETURNS_STRING,
      keys: METHOD_RETURNS_UNKNOWN,
      lastIndexOf: METHOD_RETURNS_NUMBER,
      map: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      pop: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
      push: METHOD_MUTATES_SELF_RETURNS_NUMBER,
      reduce: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
      reduceRight: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_UNKNOWN,
      reverse: METHOD_MUTATES_SELF_RETURNS_SELF,
      shift: METHOD_MUTATES_SELF_RETURNS_UNKNOWN,
      slice: METHOD_DEOPTS_SELF_RETURNS_NEW_ARRAY,
      some: METHOD_CALLS_ARG_DEOPTS_SELF_RETURNS_BOOLEAN,
      sort: METHOD_CALLS_ARG_MUTATES_SELF_RETURNS_SELF,
      splice: METHOD_MUTATES_SELF_RETURNS_NEW_ARRAY,
      toLocaleString: METHOD_RETURNS_STRING,
      toString: METHOD_RETURNS_STRING,
      unshift: METHOD_MUTATES_SELF_RETURNS_NUMBER,
      values: METHOD_DEOPTS_SELF_RETURNS_UNKNOWN
    }, OBJECT_PROTOTYPE, true);
    ArrayExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        this.getObjectEntity().deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        let hasSpread = false;
        for (let index = 0; index < this.elements.length; index++) {
          const element = this.elements[index];
          if (element && (hasSpread || element instanceof SpreadElement)) {
            hasSpread = true;
            element.deoptimizePath(UNKNOWN_PATH);
          }
        }
        this.context.requestTreeshakingPass();
      }
      getObjectEntity() {
        if (this.objectEntity !== null) {
          return this.objectEntity;
        }
        const properties = [
          { key: "length", kind: "init", property: UNKNOWN_LITERAL_NUMBER }
        ];
        let hasSpread = false;
        for (let index = 0; index < this.elements.length; index++) {
          const element = this.elements[index];
          if (hasSpread || element instanceof SpreadElement) {
            if (element) {
              hasSpread = true;
              properties.unshift({ key: UnknownInteger, kind: "init", property: element });
            }
          } else if (element) {
            properties.push({ key: String(index), kind: "init", property: element });
          } else {
            properties.push({ key: String(index), kind: "init", property: UNDEFINED_EXPRESSION });
          }
        }
        return this.objectEntity = new ObjectEntity(properties, ARRAY_PROTOTYPE);
      }
    };
    ArrayPattern = class extends NodeBase {
      addExportedVariables(variables, exportNamesByVariable) {
        for (const element of this.elements) {
          element == null ? void 0 : element.addExportedVariables(variables, exportNamesByVariable);
        }
      }
      declare(kind) {
        const variables = [];
        for (const element of this.elements) {
          if (element !== null) {
            variables.push(...element.declare(kind, UNKNOWN_EXPRESSION));
          }
        }
        return variables;
      }
      // Patterns can only be deoptimized at the empty path at the moment
      deoptimizePath() {
        for (const element of this.elements) {
          element == null ? void 0 : element.deoptimizePath(EMPTY_PATH);
        }
      }
      // Patterns are only checked at the emtpy path at the moment
      hasEffectsOnInteractionAtPath(_path, interaction, context) {
        for (const element of this.elements) {
          if (element == null ? void 0 : element.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context))
            return true;
        }
        return false;
      }
      markDeclarationReached() {
        for (const element of this.elements) {
          element == null ? void 0 : element.markDeclarationReached();
        }
      }
    };
    LocalVariable = class extends Variable {
      constructor(name, declarator, init2, context) {
        super(name);
        this.init = init2;
        this.calledFromTryStatement = false;
        this.additionalInitializers = null;
        this.expressionsToBeDeoptimized = [];
        this.declarations = declarator ? [declarator] : [];
        this.deoptimizationTracker = context.deoptimizationTracker;
        this.module = context.module;
      }
      addDeclaration(identifier, init2) {
        this.declarations.push(identifier);
        this.markInitializersForDeoptimization().push(init2);
      }
      consolidateInitializers() {
        if (this.additionalInitializers) {
          for (const initializer of this.additionalInitializers) {
            initializer.deoptimizePath(UNKNOWN_PATH);
          }
          this.additionalInitializers = null;
        }
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        if (this.isReassigned) {
          deoptimizeInteraction(interaction);
          return;
        }
        recursionTracker.withTrackedEntityAtPath(path2, this.init, () => this.init.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker), void 0);
      }
      deoptimizePath(path2) {
        if (this.isReassigned || this.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(path2, this)) {
          return;
        }
        if (path2.length === 0) {
          if (!this.isReassigned) {
            this.isReassigned = true;
            const expressionsToBeDeoptimized = this.expressionsToBeDeoptimized;
            this.expressionsToBeDeoptimized = EMPTY_ARRAY;
            for (const expression of expressionsToBeDeoptimized) {
              expression.deoptimizeCache();
            }
            this.init.deoptimizePath(UNKNOWN_PATH);
          }
        } else {
          this.init.deoptimizePath(path2);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (this.isReassigned) {
          return UnknownValue;
        }
        return recursionTracker.withTrackedEntityAtPath(path2, this.init, () => {
          this.expressionsToBeDeoptimized.push(origin);
          return this.init.getLiteralValueAtPath(path2, recursionTracker, origin);
        }, UnknownValue);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        if (this.isReassigned) {
          return UNKNOWN_RETURN_EXPRESSION;
        }
        return recursionTracker.withTrackedEntityAtPath(path2, this.init, () => {
          this.expressionsToBeDeoptimized.push(origin);
          return this.init.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
        }, UNKNOWN_RETURN_EXPRESSION);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        switch (interaction.type) {
          case INTERACTION_ACCESSED: {
            if (this.isReassigned)
              return true;
            return !context.accessed.trackEntityAtPathAndGetIfTracked(path2, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
          case INTERACTION_ASSIGNED: {
            if (this.included)
              return true;
            if (path2.length === 0)
              return false;
            if (this.isReassigned)
              return true;
            return !context.assigned.trackEntityAtPathAndGetIfTracked(path2, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
          case INTERACTION_CALLED: {
            if (this.isReassigned)
              return true;
            return !(interaction.withNew ? context.instantiated : context.called).trackEntityAtPathAndGetIfTracked(path2, interaction.args, this) && this.init.hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
        }
      }
      include() {
        if (!this.included) {
          this.included = true;
          for (const declaration of this.declarations) {
            if (!declaration.included)
              declaration.include(createInclusionContext(), false);
            let node = declaration.parent;
            while (!node.included) {
              node.included = true;
              if (node.type === Program$1)
                break;
              node = node.parent;
            }
          }
        }
      }
      includeCallArguments(context, parameters) {
        if (this.isReassigned || context.includedCallArguments.has(this.init)) {
          for (const argument of parameters) {
            argument.include(context, false);
          }
        } else {
          context.includedCallArguments.add(this.init);
          this.init.includeCallArguments(context, parameters);
          context.includedCallArguments.delete(this.init);
        }
      }
      markCalledFromTryStatement() {
        this.calledFromTryStatement = true;
      }
      markInitializersForDeoptimization() {
        if (this.additionalInitializers === null) {
          this.additionalInitializers = [this.init];
          this.init = UNKNOWN_EXPRESSION;
          this.isReassigned = true;
        }
        return this.additionalInitializers;
      }
      mergeDeclarations(variable) {
        const { declarations } = this;
        for (const declaration of variable.declarations) {
          declarations.push(declaration);
        }
        const additionalInitializers = this.markInitializersForDeoptimization();
        additionalInitializers.push(variable.init);
        if (variable.additionalInitializers) {
          for (const initializer of variable.additionalInitializers) {
            additionalInitializers.push(initializer);
          }
        }
      }
    };
    MAX_TRACKED_INTERACTIONS = 20;
    NO_INTERACTIONS = EMPTY_ARRAY;
    UNKNOWN_DEOPTIMIZED_FIELD = /* @__PURE__ */ new Set([UnknownKey]);
    EMPTY_PATH_TRACKER = new PathTracker();
    UNKNOWN_DEOPTIMIZED_ENTITY = /* @__PURE__ */ new Set([UNKNOWN_EXPRESSION]);
    ParameterVariable = class extends LocalVariable {
      constructor(name, declarator, context) {
        super(name, declarator, UNKNOWN_EXPRESSION, context);
        this.deoptimizationInteractions = [];
        this.deoptimizations = new PathTracker();
        this.deoptimizedFields = /* @__PURE__ */ new Set();
        this.entitiesToBeDeoptimized = /* @__PURE__ */ new Set();
      }
      addEntityToBeDeoptimized(entity) {
        if (entity === UNKNOWN_EXPRESSION) {
          if (!this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION)) {
            this.entitiesToBeDeoptimized.add(UNKNOWN_EXPRESSION);
            for (const { interaction } of this.deoptimizationInteractions) {
              deoptimizeInteraction(interaction);
            }
            this.deoptimizationInteractions = NO_INTERACTIONS;
          }
        } else if (this.deoptimizedFields.has(UnknownKey)) {
          entity.deoptimizePath(UNKNOWN_PATH);
        } else if (!this.entitiesToBeDeoptimized.has(entity)) {
          this.entitiesToBeDeoptimized.add(entity);
          for (const field of this.deoptimizedFields) {
            entity.deoptimizePath([field]);
          }
          for (const { interaction, path: path2 } of this.deoptimizationInteractions) {
            entity.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, SHARED_RECURSION_TRACKER);
          }
        }
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2) {
        if (path2.length >= 2 || this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION) || this.deoptimizationInteractions.length >= MAX_TRACKED_INTERACTIONS || path2.length === 1 && (this.deoptimizedFields.has(UnknownKey) || interaction.type === INTERACTION_CALLED && this.deoptimizedFields.has(path2[0]))) {
          deoptimizeInteraction(interaction);
          return;
        }
        if (!this.deoptimizations.trackEntityAtPathAndGetIfTracked(path2, interaction.args)) {
          for (const entity of this.entitiesToBeDeoptimized) {
            entity.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, SHARED_RECURSION_TRACKER);
          }
          if (!this.entitiesToBeDeoptimized.has(UNKNOWN_EXPRESSION)) {
            this.deoptimizationInteractions.push({
              interaction,
              path: path2
            });
          }
        }
      }
      deoptimizePath(path2) {
        if (path2.length === 0 || this.deoptimizedFields.has(UnknownKey)) {
          return;
        }
        const key = path2[0];
        if (this.deoptimizedFields.has(key)) {
          return;
        }
        this.deoptimizedFields.add(key);
        for (const entity of this.entitiesToBeDeoptimized) {
          entity.deoptimizePath(path2);
        }
        if (key === UnknownKey) {
          this.deoptimizationInteractions = NO_INTERACTIONS;
          this.deoptimizations = EMPTY_PATH_TRACKER;
          this.deoptimizedFields = UNKNOWN_DEOPTIMIZED_FIELD;
          this.entitiesToBeDeoptimized = UNKNOWN_DEOPTIMIZED_ENTITY;
        }
      }
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length === 0) {
          this.deoptimizePath(UNKNOWN_PATH);
        } else if (!this.deoptimizedFields.has(path2[0])) {
          this.deoptimizePath([path2[0]]);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
    };
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    base = 64;
    Scope$1 = class Scope {
      constructor() {
        this.children = [];
        this.variables = /* @__PURE__ */ new Map();
      }
      addDeclaration(identifier, context, init2, _isHoisted) {
        const name = identifier.name;
        let variable = this.variables.get(name);
        if (variable) {
          variable.addDeclaration(identifier, init2);
        } else {
          variable = new LocalVariable(identifier.name, identifier, init2 || UNDEFINED_EXPRESSION, context);
          this.variables.set(name, variable);
        }
        return variable;
      }
      contains(name) {
        return this.variables.has(name);
      }
      findVariable(_name) {
        throw new Error("Internal Error: findVariable needs to be implemented by a subclass");
      }
    };
    ChildScope = class extends Scope$1 {
      constructor(parent) {
        super();
        this.accessedOutsideVariables = /* @__PURE__ */ new Map();
        this.parent = parent;
        parent.children.push(this);
      }
      addAccessedDynamicImport(importExpression) {
        (this.accessedDynamicImports || (this.accessedDynamicImports = /* @__PURE__ */ new Set())).add(importExpression);
        if (this.parent instanceof ChildScope) {
          this.parent.addAccessedDynamicImport(importExpression);
        }
      }
      addAccessedGlobals(globals, accessedGlobalsByScope) {
        const accessedGlobals = accessedGlobalsByScope.get(this) || /* @__PURE__ */ new Set();
        for (const name of globals) {
          accessedGlobals.add(name);
        }
        accessedGlobalsByScope.set(this, accessedGlobals);
        if (this.parent instanceof ChildScope) {
          this.parent.addAccessedGlobals(globals, accessedGlobalsByScope);
        }
      }
      addNamespaceMemberAccess(name, variable) {
        this.accessedOutsideVariables.set(name, variable);
        this.parent.addNamespaceMemberAccess(name, variable);
      }
      addReturnExpression(expression) {
        this.parent instanceof ChildScope && this.parent.addReturnExpression(expression);
      }
      addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope) {
        for (const variable of this.accessedOutsideVariables.values()) {
          if (variable.included) {
            usedNames.add(variable.getBaseVariableName());
            if (format === "system" && exportNamesByVariable.has(variable)) {
              usedNames.add("exports");
            }
          }
        }
        const accessedGlobals = accessedGlobalsByScope.get(this);
        if (accessedGlobals) {
          for (const name of accessedGlobals) {
            usedNames.add(name);
          }
        }
      }
      contains(name) {
        return this.variables.has(name) || this.parent.contains(name);
      }
      deconflict(format, exportNamesByVariable, accessedGlobalsByScope) {
        const usedNames = /* @__PURE__ */ new Set();
        this.addUsedOutsideNames(usedNames, format, exportNamesByVariable, accessedGlobalsByScope);
        if (this.accessedDynamicImports) {
          for (const importExpression of this.accessedDynamicImports) {
            if (importExpression.inlineNamespace) {
              usedNames.add(importExpression.inlineNamespace.getBaseVariableName());
            }
          }
        }
        for (const [name, variable] of this.variables) {
          if (variable.included || variable.alwaysRendered) {
            variable.setRenderNames(null, getSafeName(name, usedNames, variable.forbiddenNames));
          }
        }
        for (const scope of this.children) {
          scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
        }
      }
      findLexicalBoundary() {
        return this.parent.findLexicalBoundary();
      }
      findVariable(name) {
        const knownVariable = this.variables.get(name) || this.accessedOutsideVariables.get(name);
        if (knownVariable) {
          return knownVariable;
        }
        const variable = this.parent.findVariable(name);
        this.accessedOutsideVariables.set(name, variable);
        return variable;
      }
    };
    ParameterScope = class extends ChildScope {
      constructor(parent, context) {
        super(parent);
        this.parameters = [];
        this.hasRest = false;
        this.context = context;
        this.hoistedBodyVarScope = new ChildScope(this);
      }
      /**
       * Adds a parameter to this scope. Parameters must be added in the correct
       * order, i.e. from left to right.
       */
      addParameterDeclaration(identifier) {
        const { name } = identifier;
        const variable = new ParameterVariable(name, identifier, this.context);
        const localVariable = this.hoistedBodyVarScope.variables.get(name);
        if (localVariable) {
          this.hoistedBodyVarScope.variables.set(name, variable);
          variable.mergeDeclarations(localVariable);
        }
        this.variables.set(name, variable);
        return variable;
      }
      addParameterVariables(parameters, hasRest) {
        this.parameters = parameters;
        for (const parameterList of parameters) {
          for (const parameter of parameterList) {
            parameter.alwaysRendered = true;
          }
        }
        this.hasRest = hasRest;
      }
      includeCallArguments(context, parameters) {
        let calledFromTryStatement = false;
        let argumentIncluded = false;
        const restParameter = this.hasRest && this.parameters[this.parameters.length - 1];
        for (const checkedArgument of parameters) {
          if (checkedArgument instanceof SpreadElement) {
            for (const argument of parameters) {
              argument.include(context, false);
            }
            break;
          }
        }
        for (let index = parameters.length - 1; index >= 0; index--) {
          const parameterVariables = this.parameters[index] || restParameter;
          const argument = parameters[index];
          if (parameterVariables) {
            calledFromTryStatement = false;
            if (parameterVariables.length === 0) {
              argumentIncluded = true;
            } else {
              for (const variable of parameterVariables) {
                if (variable.included) {
                  argumentIncluded = true;
                }
                if (variable.calledFromTryStatement) {
                  calledFromTryStatement = true;
                }
              }
            }
          }
          if (!argumentIncluded && argument.shouldBeIncluded(context)) {
            argumentIncluded = true;
          }
          if (argumentIncluded) {
            argument.include(context, calledFromTryStatement);
          }
        }
      }
    };
    ReturnValueScope = class extends ParameterScope {
      constructor() {
        super(...arguments);
        this.returnExpression = null;
        this.returnExpressions = [];
      }
      addReturnExpression(expression) {
        this.returnExpressions.push(expression);
      }
      getReturnExpression() {
        if (this.returnExpression === null)
          this.updateReturnExpression();
        return this.returnExpression;
      }
      updateReturnExpression() {
        if (this.returnExpressions.length === 1) {
          this.returnExpression = this.returnExpressions[0];
        } else {
          this.returnExpression = UNKNOWN_EXPRESSION;
          for (const expression of this.returnExpressions) {
            expression.deoptimizePath(UNKNOWN_PATH);
          }
        }
      }
    };
    PureFunctionKey = Symbol("PureFunction");
    getPureFunctions = ({ treeshake }) => {
      const pureFunctions = /* @__PURE__ */ Object.create(null);
      for (const functionName of treeshake ? treeshake.manualPureFunctions : []) {
        let currentFunctions = pureFunctions;
        for (const pathSegment of functionName.split(".")) {
          currentFunctions = currentFunctions[pathSegment] || (currentFunctions[pathSegment] = /* @__PURE__ */ Object.create(null));
        }
        currentFunctions[PureFunctionKey] = true;
      }
      return pureFunctions;
    };
    doNothing = () => {
    };
    ValueProperties = Symbol("Value Properties");
    getTruthyLiteralValue = () => UnknownTruthyValue;
    returnFalse = () => false;
    returnTrue = () => true;
    PURE = {
      deoptimizeArgumentsOnCall: doNothing,
      getLiteralValue: getTruthyLiteralValue,
      hasEffectsWhenCalled: returnFalse
    };
    IMPURE = {
      deoptimizeArgumentsOnCall: doNothing,
      getLiteralValue: getTruthyLiteralValue,
      hasEffectsWhenCalled: returnTrue
    };
    O = {
      __proto__: null,
      [ValueProperties]: IMPURE
    };
    PF = {
      __proto__: null,
      [ValueProperties]: PURE
    };
    MUTATES_ARG_WITHOUT_ACCESSOR = {
      __proto__: null,
      [ValueProperties]: {
        deoptimizeArgumentsOnCall({ args: [, firstArgument] }) {
          firstArgument == null ? void 0 : firstArgument.deoptimizePath(UNKNOWN_PATH);
        },
        getLiteralValue: getTruthyLiteralValue,
        hasEffectsWhenCalled({ args }, context) {
          return args.length <= 1 || args[1].hasEffectsOnInteractionAtPath(UNKNOWN_NON_ACCESSOR_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context);
        }
      }
    };
    C = {
      __proto__: null,
      [ValueProperties]: IMPURE,
      prototype: O
    };
    PC = {
      __proto__: null,
      [ValueProperties]: PURE,
      prototype: O
    };
    ARRAY_TYPE = {
      __proto__: null,
      [ValueProperties]: PURE,
      from: PF,
      of: PF,
      prototype: O
    };
    INTL_MEMBER = {
      __proto__: null,
      [ValueProperties]: PURE,
      supportedLocalesOf: PC
    };
    knownGlobals = {
      // Placeholders for global objects to avoid shape mutations
      global: O,
      globalThis: O,
      self: O,
      window: O,
      // Common globals
      __proto__: null,
      [ValueProperties]: IMPURE,
      Array: {
        __proto__: null,
        [ValueProperties]: IMPURE,
        from: O,
        isArray: PF,
        of: PF,
        prototype: O
      },
      ArrayBuffer: {
        __proto__: null,
        [ValueProperties]: PURE,
        isView: PF,
        prototype: O
      },
      Atomics: O,
      BigInt: C,
      BigInt64Array: C,
      BigUint64Array: C,
      Boolean: PC,
      constructor: C,
      DataView: PC,
      Date: {
        __proto__: null,
        [ValueProperties]: PURE,
        now: PF,
        parse: PF,
        prototype: O,
        UTC: PF
      },
      decodeURI: PF,
      decodeURIComponent: PF,
      encodeURI: PF,
      encodeURIComponent: PF,
      Error: PC,
      escape: PF,
      eval: O,
      EvalError: PC,
      Float32Array: ARRAY_TYPE,
      Float64Array: ARRAY_TYPE,
      Function: C,
      hasOwnProperty: O,
      Infinity: O,
      Int16Array: ARRAY_TYPE,
      Int32Array: ARRAY_TYPE,
      Int8Array: ARRAY_TYPE,
      isFinite: PF,
      isNaN: PF,
      isPrototypeOf: O,
      JSON: O,
      Map: PC,
      Math: {
        __proto__: null,
        [ValueProperties]: IMPURE,
        abs: PF,
        acos: PF,
        acosh: PF,
        asin: PF,
        asinh: PF,
        atan: PF,
        atan2: PF,
        atanh: PF,
        cbrt: PF,
        ceil: PF,
        clz32: PF,
        cos: PF,
        cosh: PF,
        exp: PF,
        expm1: PF,
        floor: PF,
        fround: PF,
        hypot: PF,
        imul: PF,
        log: PF,
        log10: PF,
        log1p: PF,
        log2: PF,
        max: PF,
        min: PF,
        pow: PF,
        random: PF,
        round: PF,
        sign: PF,
        sin: PF,
        sinh: PF,
        sqrt: PF,
        tan: PF,
        tanh: PF,
        trunc: PF
      },
      NaN: O,
      Number: {
        __proto__: null,
        [ValueProperties]: PURE,
        isFinite: PF,
        isInteger: PF,
        isNaN: PF,
        isSafeInteger: PF,
        parseFloat: PF,
        parseInt: PF,
        prototype: O
      },
      Object: {
        __proto__: null,
        [ValueProperties]: PURE,
        create: PF,
        // Technically those can throw in certain situations, but we ignore this as
        // code that relies on this will hopefully wrap this in a try-catch, which
        // deoptimizes everything anyway
        defineProperty: MUTATES_ARG_WITHOUT_ACCESSOR,
        defineProperties: MUTATES_ARG_WITHOUT_ACCESSOR,
        freeze: MUTATES_ARG_WITHOUT_ACCESSOR,
        getOwnPropertyDescriptor: PF,
        getOwnPropertyDescriptors: PF,
        getOwnPropertyNames: PF,
        getOwnPropertySymbols: PF,
        getPrototypeOf: PF,
        hasOwn: PF,
        is: PF,
        isExtensible: PF,
        isFrozen: PF,
        isSealed: PF,
        keys: PF,
        fromEntries: PF,
        entries: PF,
        prototype: O
      },
      parseFloat: PF,
      parseInt: PF,
      Promise: {
        __proto__: null,
        [ValueProperties]: IMPURE,
        all: O,
        allSettled: O,
        any: O,
        prototype: O,
        race: O,
        reject: O,
        resolve: O
      },
      propertyIsEnumerable: O,
      Proxy: O,
      RangeError: PC,
      ReferenceError: PC,
      Reflect: O,
      RegExp: PC,
      Set: PC,
      SharedArrayBuffer: C,
      String: {
        __proto__: null,
        [ValueProperties]: PURE,
        fromCharCode: PF,
        fromCodePoint: PF,
        prototype: O,
        raw: PF
      },
      Symbol: {
        __proto__: null,
        [ValueProperties]: PURE,
        for: PF,
        keyFor: PF,
        prototype: O,
        toStringTag: {
          __proto__: null,
          [ValueProperties]: {
            deoptimizeArgumentsOnCall: doNothing,
            getLiteralValue() {
              return SymbolToStringTag;
            },
            hasEffectsWhenCalled: returnTrue
          }
        }
      },
      SyntaxError: PC,
      toLocaleString: O,
      toString: O,
      TypeError: PC,
      Uint16Array: ARRAY_TYPE,
      Uint32Array: ARRAY_TYPE,
      Uint8Array: ARRAY_TYPE,
      Uint8ClampedArray: ARRAY_TYPE,
      // Technically, this is a global, but it needs special handling
      // undefined: ?,
      unescape: PF,
      URIError: PC,
      valueOf: O,
      WeakMap: PC,
      WeakSet: PC,
      // Additional globals shared by Node and Browser that are not strictly part of the language
      clearInterval: C,
      clearTimeout: C,
      console: {
        __proto__: null,
        [ValueProperties]: IMPURE,
        assert: C,
        clear: C,
        count: C,
        countReset: C,
        debug: C,
        dir: C,
        dirxml: C,
        error: C,
        exception: C,
        group: C,
        groupCollapsed: C,
        groupEnd: C,
        info: C,
        log: C,
        table: C,
        time: C,
        timeEnd: C,
        timeLog: C,
        trace: C,
        warn: C
      },
      Intl: {
        __proto__: null,
        [ValueProperties]: IMPURE,
        Collator: INTL_MEMBER,
        DateTimeFormat: INTL_MEMBER,
        ListFormat: INTL_MEMBER,
        NumberFormat: INTL_MEMBER,
        PluralRules: INTL_MEMBER,
        RelativeTimeFormat: INTL_MEMBER
      },
      setInterval: C,
      setTimeout: C,
      TextDecoder: C,
      TextEncoder: C,
      URL: C,
      URLSearchParams: C,
      // Browser specific globals
      AbortController: C,
      AbortSignal: C,
      addEventListener: O,
      alert: O,
      AnalyserNode: C,
      Animation: C,
      AnimationEvent: C,
      applicationCache: O,
      ApplicationCache: C,
      ApplicationCacheErrorEvent: C,
      atob: O,
      Attr: C,
      Audio: C,
      AudioBuffer: C,
      AudioBufferSourceNode: C,
      AudioContext: C,
      AudioDestinationNode: C,
      AudioListener: C,
      AudioNode: C,
      AudioParam: C,
      AudioProcessingEvent: C,
      AudioScheduledSourceNode: C,
      AudioWorkletNode: C,
      BarProp: C,
      BaseAudioContext: C,
      BatteryManager: C,
      BeforeUnloadEvent: C,
      BiquadFilterNode: C,
      Blob: C,
      BlobEvent: C,
      blur: O,
      BroadcastChannel: C,
      btoa: O,
      ByteLengthQueuingStrategy: C,
      Cache: C,
      caches: O,
      CacheStorage: C,
      cancelAnimationFrame: O,
      cancelIdleCallback: O,
      CanvasCaptureMediaStreamTrack: C,
      CanvasGradient: C,
      CanvasPattern: C,
      CanvasRenderingContext2D: C,
      ChannelMergerNode: C,
      ChannelSplitterNode: C,
      CharacterData: C,
      clientInformation: O,
      ClipboardEvent: C,
      close: O,
      closed: O,
      CloseEvent: C,
      Comment: C,
      CompositionEvent: C,
      confirm: O,
      ConstantSourceNode: C,
      ConvolverNode: C,
      CountQueuingStrategy: C,
      createImageBitmap: O,
      Credential: C,
      CredentialsContainer: C,
      crypto: O,
      Crypto: C,
      CryptoKey: C,
      CSS: C,
      CSSConditionRule: C,
      CSSFontFaceRule: C,
      CSSGroupingRule: C,
      CSSImportRule: C,
      CSSKeyframeRule: C,
      CSSKeyframesRule: C,
      CSSMediaRule: C,
      CSSNamespaceRule: C,
      CSSPageRule: C,
      CSSRule: C,
      CSSRuleList: C,
      CSSStyleDeclaration: C,
      CSSStyleRule: C,
      CSSStyleSheet: C,
      CSSSupportsRule: C,
      CustomElementRegistry: C,
      customElements: O,
      CustomEvent: C,
      DataTransfer: C,
      DataTransferItem: C,
      DataTransferItemList: C,
      defaultstatus: O,
      defaultStatus: O,
      DelayNode: C,
      DeviceMotionEvent: C,
      DeviceOrientationEvent: C,
      devicePixelRatio: O,
      dispatchEvent: O,
      document: O,
      Document: C,
      DocumentFragment: C,
      DocumentType: C,
      DOMError: C,
      DOMException: C,
      DOMImplementation: C,
      DOMMatrix: C,
      DOMMatrixReadOnly: C,
      DOMParser: C,
      DOMPoint: C,
      DOMPointReadOnly: C,
      DOMQuad: C,
      DOMRect: C,
      DOMRectReadOnly: C,
      DOMStringList: C,
      DOMStringMap: C,
      DOMTokenList: C,
      DragEvent: C,
      DynamicsCompressorNode: C,
      Element: C,
      ErrorEvent: C,
      Event: C,
      EventSource: C,
      EventTarget: C,
      external: O,
      fetch: O,
      File: C,
      FileList: C,
      FileReader: C,
      find: O,
      focus: O,
      FocusEvent: C,
      FontFace: C,
      FontFaceSetLoadEvent: C,
      FormData: C,
      frames: O,
      GainNode: C,
      Gamepad: C,
      GamepadButton: C,
      GamepadEvent: C,
      getComputedStyle: O,
      getSelection: O,
      HashChangeEvent: C,
      Headers: C,
      history: O,
      History: C,
      HTMLAllCollection: C,
      HTMLAnchorElement: C,
      HTMLAreaElement: C,
      HTMLAudioElement: C,
      HTMLBaseElement: C,
      HTMLBodyElement: C,
      HTMLBRElement: C,
      HTMLButtonElement: C,
      HTMLCanvasElement: C,
      HTMLCollection: C,
      HTMLContentElement: C,
      HTMLDataElement: C,
      HTMLDataListElement: C,
      HTMLDetailsElement: C,
      HTMLDialogElement: C,
      HTMLDirectoryElement: C,
      HTMLDivElement: C,
      HTMLDListElement: C,
      HTMLDocument: C,
      HTMLElement: C,
      HTMLEmbedElement: C,
      HTMLFieldSetElement: C,
      HTMLFontElement: C,
      HTMLFormControlsCollection: C,
      HTMLFormElement: C,
      HTMLFrameElement: C,
      HTMLFrameSetElement: C,
      HTMLHeadElement: C,
      HTMLHeadingElement: C,
      HTMLHRElement: C,
      HTMLHtmlElement: C,
      HTMLIFrameElement: C,
      HTMLImageElement: C,
      HTMLInputElement: C,
      HTMLLabelElement: C,
      HTMLLegendElement: C,
      HTMLLIElement: C,
      HTMLLinkElement: C,
      HTMLMapElement: C,
      HTMLMarqueeElement: C,
      HTMLMediaElement: C,
      HTMLMenuElement: C,
      HTMLMetaElement: C,
      HTMLMeterElement: C,
      HTMLModElement: C,
      HTMLObjectElement: C,
      HTMLOListElement: C,
      HTMLOptGroupElement: C,
      HTMLOptionElement: C,
      HTMLOptionsCollection: C,
      HTMLOutputElement: C,
      HTMLParagraphElement: C,
      HTMLParamElement: C,
      HTMLPictureElement: C,
      HTMLPreElement: C,
      HTMLProgressElement: C,
      HTMLQuoteElement: C,
      HTMLScriptElement: C,
      HTMLSelectElement: C,
      HTMLShadowElement: C,
      HTMLSlotElement: C,
      HTMLSourceElement: C,
      HTMLSpanElement: C,
      HTMLStyleElement: C,
      HTMLTableCaptionElement: C,
      HTMLTableCellElement: C,
      HTMLTableColElement: C,
      HTMLTableElement: C,
      HTMLTableRowElement: C,
      HTMLTableSectionElement: C,
      HTMLTemplateElement: C,
      HTMLTextAreaElement: C,
      HTMLTimeElement: C,
      HTMLTitleElement: C,
      HTMLTrackElement: C,
      HTMLUListElement: C,
      HTMLUnknownElement: C,
      HTMLVideoElement: C,
      IDBCursor: C,
      IDBCursorWithValue: C,
      IDBDatabase: C,
      IDBFactory: C,
      IDBIndex: C,
      IDBKeyRange: C,
      IDBObjectStore: C,
      IDBOpenDBRequest: C,
      IDBRequest: C,
      IDBTransaction: C,
      IDBVersionChangeEvent: C,
      IdleDeadline: C,
      IIRFilterNode: C,
      Image: C,
      ImageBitmap: C,
      ImageBitmapRenderingContext: C,
      ImageCapture: C,
      ImageData: C,
      indexedDB: O,
      innerHeight: O,
      innerWidth: O,
      InputEvent: C,
      IntersectionObserver: C,
      IntersectionObserverEntry: C,
      isSecureContext: O,
      KeyboardEvent: C,
      KeyframeEffect: C,
      length: O,
      localStorage: O,
      location: O,
      Location: C,
      locationbar: O,
      matchMedia: O,
      MediaDeviceInfo: C,
      MediaDevices: C,
      MediaElementAudioSourceNode: C,
      MediaEncryptedEvent: C,
      MediaError: C,
      MediaKeyMessageEvent: C,
      MediaKeySession: C,
      MediaKeyStatusMap: C,
      MediaKeySystemAccess: C,
      MediaList: C,
      MediaQueryList: C,
      MediaQueryListEvent: C,
      MediaRecorder: C,
      MediaSettingsRange: C,
      MediaSource: C,
      MediaStream: C,
      MediaStreamAudioDestinationNode: C,
      MediaStreamAudioSourceNode: C,
      MediaStreamEvent: C,
      MediaStreamTrack: C,
      MediaStreamTrackEvent: C,
      menubar: O,
      MessageChannel: C,
      MessageEvent: C,
      MessagePort: C,
      MIDIAccess: C,
      MIDIConnectionEvent: C,
      MIDIInput: C,
      MIDIInputMap: C,
      MIDIMessageEvent: C,
      MIDIOutput: C,
      MIDIOutputMap: C,
      MIDIPort: C,
      MimeType: C,
      MimeTypeArray: C,
      MouseEvent: C,
      moveBy: O,
      moveTo: O,
      MutationEvent: C,
      MutationObserver: C,
      MutationRecord: C,
      name: O,
      NamedNodeMap: C,
      NavigationPreloadManager: C,
      navigator: O,
      Navigator: C,
      NetworkInformation: C,
      Node: C,
      NodeFilter: O,
      NodeIterator: C,
      NodeList: C,
      Notification: C,
      OfflineAudioCompletionEvent: C,
      OfflineAudioContext: C,
      offscreenBuffering: O,
      OffscreenCanvas: C,
      open: O,
      openDatabase: O,
      Option: C,
      origin: O,
      OscillatorNode: C,
      outerHeight: O,
      outerWidth: O,
      PageTransitionEvent: C,
      pageXOffset: O,
      pageYOffset: O,
      PannerNode: C,
      parent: O,
      Path2D: C,
      PaymentAddress: C,
      PaymentRequest: C,
      PaymentRequestUpdateEvent: C,
      PaymentResponse: C,
      performance: O,
      Performance: C,
      PerformanceEntry: C,
      PerformanceLongTaskTiming: C,
      PerformanceMark: C,
      PerformanceMeasure: C,
      PerformanceNavigation: C,
      PerformanceNavigationTiming: C,
      PerformanceObserver: C,
      PerformanceObserverEntryList: C,
      PerformancePaintTiming: C,
      PerformanceResourceTiming: C,
      PerformanceTiming: C,
      PeriodicWave: C,
      Permissions: C,
      PermissionStatus: C,
      personalbar: O,
      PhotoCapabilities: C,
      Plugin: C,
      PluginArray: C,
      PointerEvent: C,
      PopStateEvent: C,
      postMessage: O,
      Presentation: C,
      PresentationAvailability: C,
      PresentationConnection: C,
      PresentationConnectionAvailableEvent: C,
      PresentationConnectionCloseEvent: C,
      PresentationConnectionList: C,
      PresentationReceiver: C,
      PresentationRequest: C,
      print: O,
      ProcessingInstruction: C,
      ProgressEvent: C,
      PromiseRejectionEvent: C,
      prompt: O,
      PushManager: C,
      PushSubscription: C,
      PushSubscriptionOptions: C,
      queueMicrotask: O,
      RadioNodeList: C,
      Range: C,
      ReadableStream: C,
      RemotePlayback: C,
      removeEventListener: O,
      Request: C,
      requestAnimationFrame: O,
      requestIdleCallback: O,
      resizeBy: O,
      ResizeObserver: C,
      ResizeObserverEntry: C,
      resizeTo: O,
      Response: C,
      RTCCertificate: C,
      RTCDataChannel: C,
      RTCDataChannelEvent: C,
      RTCDtlsTransport: C,
      RTCIceCandidate: C,
      RTCIceTransport: C,
      RTCPeerConnection: C,
      RTCPeerConnectionIceEvent: C,
      RTCRtpReceiver: C,
      RTCRtpSender: C,
      RTCSctpTransport: C,
      RTCSessionDescription: C,
      RTCStatsReport: C,
      RTCTrackEvent: C,
      screen: O,
      Screen: C,
      screenLeft: O,
      ScreenOrientation: C,
      screenTop: O,
      screenX: O,
      screenY: O,
      ScriptProcessorNode: C,
      scroll: O,
      scrollbars: O,
      scrollBy: O,
      scrollTo: O,
      scrollX: O,
      scrollY: O,
      SecurityPolicyViolationEvent: C,
      Selection: C,
      ServiceWorker: C,
      ServiceWorkerContainer: C,
      ServiceWorkerRegistration: C,
      sessionStorage: O,
      ShadowRoot: C,
      SharedWorker: C,
      SourceBuffer: C,
      SourceBufferList: C,
      speechSynthesis: O,
      SpeechSynthesisEvent: C,
      SpeechSynthesisUtterance: C,
      StaticRange: C,
      status: O,
      statusbar: O,
      StereoPannerNode: C,
      stop: O,
      Storage: C,
      StorageEvent: C,
      StorageManager: C,
      styleMedia: O,
      StyleSheet: C,
      StyleSheetList: C,
      SubtleCrypto: C,
      SVGAElement: C,
      SVGAngle: C,
      SVGAnimatedAngle: C,
      SVGAnimatedBoolean: C,
      SVGAnimatedEnumeration: C,
      SVGAnimatedInteger: C,
      SVGAnimatedLength: C,
      SVGAnimatedLengthList: C,
      SVGAnimatedNumber: C,
      SVGAnimatedNumberList: C,
      SVGAnimatedPreserveAspectRatio: C,
      SVGAnimatedRect: C,
      SVGAnimatedString: C,
      SVGAnimatedTransformList: C,
      SVGAnimateElement: C,
      SVGAnimateMotionElement: C,
      SVGAnimateTransformElement: C,
      SVGAnimationElement: C,
      SVGCircleElement: C,
      SVGClipPathElement: C,
      SVGComponentTransferFunctionElement: C,
      SVGDefsElement: C,
      SVGDescElement: C,
      SVGDiscardElement: C,
      SVGElement: C,
      SVGEllipseElement: C,
      SVGFEBlendElement: C,
      SVGFEColorMatrixElement: C,
      SVGFEComponentTransferElement: C,
      SVGFECompositeElement: C,
      SVGFEConvolveMatrixElement: C,
      SVGFEDiffuseLightingElement: C,
      SVGFEDisplacementMapElement: C,
      SVGFEDistantLightElement: C,
      SVGFEDropShadowElement: C,
      SVGFEFloodElement: C,
      SVGFEFuncAElement: C,
      SVGFEFuncBElement: C,
      SVGFEFuncGElement: C,
      SVGFEFuncRElement: C,
      SVGFEGaussianBlurElement: C,
      SVGFEImageElement: C,
      SVGFEMergeElement: C,
      SVGFEMergeNodeElement: C,
      SVGFEMorphologyElement: C,
      SVGFEOffsetElement: C,
      SVGFEPointLightElement: C,
      SVGFESpecularLightingElement: C,
      SVGFESpotLightElement: C,
      SVGFETileElement: C,
      SVGFETurbulenceElement: C,
      SVGFilterElement: C,
      SVGForeignObjectElement: C,
      SVGGElement: C,
      SVGGeometryElement: C,
      SVGGradientElement: C,
      SVGGraphicsElement: C,
      SVGImageElement: C,
      SVGLength: C,
      SVGLengthList: C,
      SVGLinearGradientElement: C,
      SVGLineElement: C,
      SVGMarkerElement: C,
      SVGMaskElement: C,
      SVGMatrix: C,
      SVGMetadataElement: C,
      SVGMPathElement: C,
      SVGNumber: C,
      SVGNumberList: C,
      SVGPathElement: C,
      SVGPatternElement: C,
      SVGPoint: C,
      SVGPointList: C,
      SVGPolygonElement: C,
      SVGPolylineElement: C,
      SVGPreserveAspectRatio: C,
      SVGRadialGradientElement: C,
      SVGRect: C,
      SVGRectElement: C,
      SVGScriptElement: C,
      SVGSetElement: C,
      SVGStopElement: C,
      SVGStringList: C,
      SVGStyleElement: C,
      SVGSVGElement: C,
      SVGSwitchElement: C,
      SVGSymbolElement: C,
      SVGTextContentElement: C,
      SVGTextElement: C,
      SVGTextPathElement: C,
      SVGTextPositioningElement: C,
      SVGTitleElement: C,
      SVGTransform: C,
      SVGTransformList: C,
      SVGTSpanElement: C,
      SVGUnitTypes: C,
      SVGUseElement: C,
      SVGViewElement: C,
      TaskAttributionTiming: C,
      Text: C,
      TextEvent: C,
      TextMetrics: C,
      TextTrack: C,
      TextTrackCue: C,
      TextTrackCueList: C,
      TextTrackList: C,
      TimeRanges: C,
      toolbar: O,
      top: O,
      Touch: C,
      TouchEvent: C,
      TouchList: C,
      TrackEvent: C,
      TransitionEvent: C,
      TreeWalker: C,
      UIEvent: C,
      ValidityState: C,
      visualViewport: O,
      VisualViewport: C,
      VTTCue: C,
      WaveShaperNode: C,
      WebAssembly: O,
      WebGL2RenderingContext: C,
      WebGLActiveInfo: C,
      WebGLBuffer: C,
      WebGLContextEvent: C,
      WebGLFramebuffer: C,
      WebGLProgram: C,
      WebGLQuery: C,
      WebGLRenderbuffer: C,
      WebGLRenderingContext: C,
      WebGLSampler: C,
      WebGLShader: C,
      WebGLShaderPrecisionFormat: C,
      WebGLSync: C,
      WebGLTexture: C,
      WebGLTransformFeedback: C,
      WebGLUniformLocation: C,
      WebGLVertexArrayObject: C,
      WebSocket: C,
      WheelEvent: C,
      Window: C,
      Worker: C,
      WritableStream: C,
      XMLDocument: C,
      XMLHttpRequest: C,
      XMLHttpRequestEventTarget: C,
      XMLHttpRequestUpload: C,
      XMLSerializer: C,
      XPathEvaluator: C,
      XPathExpression: C,
      XPathResult: C,
      XSLTProcessor: C
    };
    for (const global of ["window", "global", "self", "globalThis"]) {
      knownGlobals[global] = knownGlobals;
    }
    GlobalVariable = class extends Variable {
      constructor() {
        super(...arguments);
        this.isReassigned = true;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        switch (interaction.type) {
          case INTERACTION_ACCESSED:
          case INTERACTION_ASSIGNED: {
            if (!getGlobalAtPath([this.name, ...path2].slice(0, -1))) {
              super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
            }
            return;
          }
          case INTERACTION_CALLED: {
            const globalAtPath = getGlobalAtPath([this.name, ...path2]);
            if (globalAtPath) {
              globalAtPath.deoptimizeArgumentsOnCall(interaction);
            } else {
              super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
            }
            return;
          }
        }
      }
      getLiteralValueAtPath(path2, _recursionTracker, _origin) {
        const globalAtPath = getGlobalAtPath([this.name, ...path2]);
        return globalAtPath ? globalAtPath.getLiteralValue() : UnknownValue;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        switch (interaction.type) {
          case INTERACTION_ACCESSED: {
            if (path2.length === 0) {
              return this.name !== "undefined" && !getGlobalAtPath([this.name]);
            }
            return !getGlobalAtPath([this.name, ...path2].slice(0, -1));
          }
          case INTERACTION_ASSIGNED: {
            return true;
          }
          case INTERACTION_CALLED: {
            const globalAtPath = getGlobalAtPath([this.name, ...path2]);
            return !globalAtPath || globalAtPath.hasEffectsWhenCalled(interaction, context);
          }
        }
      }
    };
    tdzVariableKinds = {
      __proto__: null,
      class: true,
      const: true,
      let: true,
      var: true
    };
    Identifier = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.variable = null;
        this.isTDZAccess = null;
      }
      addExportedVariables(variables, exportNamesByVariable) {
        if (exportNamesByVariable.has(this.variable)) {
          variables.push(this.variable);
        }
      }
      bind() {
        if (!this.variable && is_reference(this, this.parent)) {
          this.variable = this.scope.findVariable(this.name);
          this.variable.addReference(this);
        }
      }
      declare(kind, init2) {
        let variable;
        const { treeshake } = this.context.options;
        switch (kind) {
          case "var": {
            variable = this.scope.addDeclaration(this, this.context, init2, true);
            if (treeshake && treeshake.correctVarValueBeforeDeclaration) {
              variable.markInitializersForDeoptimization();
            }
            break;
          }
          case "function": {
            variable = this.scope.addDeclaration(this, this.context, init2, false);
            break;
          }
          case "let":
          case "const":
          case "class": {
            variable = this.scope.addDeclaration(this, this.context, init2, false);
            break;
          }
          case "parameter": {
            variable = this.scope.addParameterDeclaration(this);
            break;
          }
          default: {
            throw new Error(`Internal Error: Unexpected identifier kind ${kind}.`);
          }
        }
        variable.kind = kind;
        return [this.variable = variable];
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        var _a;
        if (path2.length === 0 && !this.scope.contains(this.name)) {
          this.disallowImportReassignment();
        }
        (_a = this.variable) == null ? void 0 : _a.deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getVariableRespectingTDZ().getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        const [expression, isPure] = this.getVariableRespectingTDZ().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
        return [expression, isPure || this.isPureFunction(path2)];
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (this.isPossibleTDZ() && this.variable.kind !== "var") {
          return true;
        }
        return this.context.options.treeshake.unknownGlobalSideEffects && this.variable instanceof GlobalVariable && !this.isPureFunction(EMPTY_PATH) && this.variable.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_ACCESS, context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        switch (interaction.type) {
          case INTERACTION_ACCESSED: {
            return this.variable !== null && !this.isPureFunction(path2) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
          case INTERACTION_ASSIGNED: {
            return (path2.length > 0 ? this.getVariableRespectingTDZ() : this.variable).hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
          case INTERACTION_CALLED: {
            return !this.isPureFunction(path2) && this.getVariableRespectingTDZ().hasEffectsOnInteractionAtPath(path2, interaction, context);
          }
        }
      }
      include() {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (!this.included) {
          this.included = true;
          if (this.variable !== null) {
            this.context.includeVariableInModule(this.variable);
          }
        }
      }
      includeCallArguments(context, parameters) {
        this.variable.includeCallArguments(context, parameters);
      }
      isPossibleTDZ() {
        if (this.isTDZAccess !== null)
          return this.isTDZAccess;
        if (!(this.variable instanceof LocalVariable && this.variable.kind && this.variable.kind in tdzVariableKinds && // we ignore possible TDZs due to circular module dependencies as
        // otherwise we get many false positives
        this.variable.module === this.context.module)) {
          return this.isTDZAccess = false;
        }
        let decl_id;
        if (this.variable.declarations && this.variable.declarations.length === 1 && (decl_id = this.variable.declarations[0]) && this.start < decl_id.start && closestParentFunctionOrProgram(this) === closestParentFunctionOrProgram(decl_id)) {
          return this.isTDZAccess = true;
        }
        if (!this.variable.initReached) {
          return this.isTDZAccess = true;
        }
        return this.isTDZAccess = false;
      }
      markDeclarationReached() {
        this.variable.initReached = true;
      }
      render(code, { snippets: { getPropertyAccess }, useOriginalName }, { renderedParentType, isCalleeOfRenderedParent, isShorthandProperty } = BLANK) {
        if (this.variable) {
          const name = this.variable.getName(getPropertyAccess, useOriginalName);
          if (name !== this.name) {
            code.overwrite(this.start, this.end, name, {
              contentOnly: true,
              storeName: true
            });
            if (isShorthandProperty) {
              code.prependRight(this.start, `${this.name}: `);
            }
          }
          if (name === "eval" && renderedParentType === CallExpression$1 && isCalleeOfRenderedParent) {
            code.appendRight(this.start, "0, ");
          }
        }
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        if (this.variable instanceof LocalVariable) {
          this.variable.consolidateInitializers();
          this.context.requestTreeshakingPass();
        }
      }
      disallowImportReassignment() {
        return this.context.error(errorIllegalImportReassignment(this.name, this.context.module.id), this.start);
      }
      getVariableRespectingTDZ() {
        if (this.isPossibleTDZ()) {
          return UNKNOWN_EXPRESSION;
        }
        return this.variable;
      }
      isPureFunction(path2) {
        let currentPureFunction = this.context.manualPureFunctions[this.name];
        for (const segment of path2) {
          if (currentPureFunction) {
            if (currentPureFunction[PureFunctionKey]) {
              return true;
            }
            currentPureFunction = currentPureFunction[segment];
          } else {
            return false;
          }
        }
        return currentPureFunction == null ? void 0 : currentPureFunction[PureFunctionKey];
      }
    };
    NO_SEMICOLON = { isNoStatement: true };
    NON_WHITESPACE = /\S/g;
    BlockScope = class extends ChildScope {
      addDeclaration(identifier, context, init2, isHoisted) {
        if (isHoisted) {
          const variable = this.parent.addDeclaration(identifier, context, init2, isHoisted);
          variable.markInitializersForDeoptimization();
          return variable;
        } else {
          return super.addDeclaration(identifier, context, init2, false);
        }
      }
    };
    ExpressionStatement = class extends NodeBase {
      initialise() {
        if (this.directive && this.directive !== "use strict" && this.parent.type === Program$1) {
          this.context.warn(
            // This is necessary, because either way (deleting or not) can lead to errors.
            errorModuleLevelDirective(this.directive, this.context.module.id),
            this.start
          );
        }
      }
      render(code, options) {
        super.render(code, options);
        if (this.included)
          this.insertSemicolon(code);
      }
      shouldBeIncluded(context) {
        if (this.directive && this.directive !== "use strict")
          return this.parent.type !== Program$1;
        return super.shouldBeIncluded(context);
      }
      applyDeoptimizations() {
      }
    };
    BlockStatement = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.directlyIncluded = false;
      }
      addImplicitReturnExpressionToScope() {
        const lastStatement = this.body[this.body.length - 1];
        if (!lastStatement || lastStatement.type !== ReturnStatement$1) {
          this.scope.addReturnExpression(UNKNOWN_EXPRESSION);
        }
      }
      createScope(parentScope) {
        this.scope = this.parent.preventChildBlockScope ? parentScope : new BlockScope(parentScope);
      }
      hasEffects(context) {
        if (this.deoptimizeBody)
          return true;
        for (const node of this.body) {
          if (context.brokenFlow)
            break;
          if (node.hasEffects(context))
            return true;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        if (!(this.deoptimizeBody && this.directlyIncluded)) {
          this.included = true;
          this.directlyIncluded = true;
          if (this.deoptimizeBody)
            includeChildrenRecursively = true;
          for (const node of this.body) {
            if (includeChildrenRecursively || node.shouldBeIncluded(context))
              node.include(context, includeChildrenRecursively);
          }
        }
      }
      initialise() {
        const firstBodyStatement = this.body[0];
        this.deoptimizeBody = firstBodyStatement instanceof ExpressionStatement && firstBodyStatement.directive === "use asm";
      }
      render(code, options) {
        if (this.body.length > 0) {
          renderStatementList(this.body, code, this.start + 1, this.end - 1, options);
        } else {
          super.render(code, options);
        }
      }
    };
    RestElement = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.declarationInit = null;
      }
      addExportedVariables(variables, exportNamesByVariable) {
        this.argument.addExportedVariables(variables, exportNamesByVariable);
      }
      declare(kind, init2) {
        this.declarationInit = init2;
        return this.argument.declare(kind, UNKNOWN_EXPRESSION);
      }
      deoptimizePath(path2) {
        path2.length === 0 && this.argument.deoptimizePath(EMPTY_PATH);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return path2.length > 0 || this.argument.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context);
      }
      markDeclarationReached() {
        this.argument.markDeclarationReached();
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        if (this.declarationInit !== null) {
          this.declarationInit.deoptimizePath([UnknownKey, UnknownKey]);
          this.context.requestTreeshakingPass();
        }
      }
    };
    FunctionBase = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
        this.deoptimizedReturn = false;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        if (interaction.type === INTERACTION_CALLED) {
          const { parameters } = this.scope;
          const { args } = interaction;
          let hasRest = false;
          for (let position = 0; position < args.length - 1; position++) {
            const parameter = this.params[position];
            const argument = args[position + 1];
            if (hasRest || parameter instanceof RestElement) {
              hasRest = true;
              argument.deoptimizePath(UNKNOWN_PATH);
            } else if (parameter instanceof Identifier) {
              parameters[position][0].addEntityToBeDeoptimized(argument);
            } else if (parameter) {
              argument.deoptimizePath(UNKNOWN_PATH);
            }
          }
        } else {
          this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        }
      }
      deoptimizePath(path2) {
        this.getObjectEntity().deoptimizePath(path2);
        if (path2.length === 1 && path2[0] === UnknownKey) {
          this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        if (path2.length > 0) {
          return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
        }
        if (this.async) {
          if (!this.deoptimizedReturn) {
            this.deoptimizedReturn = true;
            this.scope.getReturnExpression().deoptimizePath(UNKNOWN_PATH);
            this.context.requestTreeshakingPass();
          }
          return UNKNOWN_RETURN_EXPRESSION;
        }
        return [this.scope.getReturnExpression(), false];
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (path2.length > 0 || interaction.type !== INTERACTION_CALLED) {
          return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
        }
        if (this.async) {
          const { propertyReadSideEffects } = this.context.options.treeshake;
          const returnExpression = this.scope.getReturnExpression();
          if (returnExpression.hasEffectsOnInteractionAtPath(["then"], NODE_INTERACTION_UNKNOWN_CALL, context) || propertyReadSideEffects && (propertyReadSideEffects === "always" || returnExpression.hasEffectsOnInteractionAtPath(["then"], NODE_INTERACTION_UNKNOWN_ACCESS, context))) {
            return true;
          }
        }
        for (const parameter of this.params) {
          if (parameter.hasEffects(context))
            return true;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        const { brokenFlow } = context;
        context.brokenFlow = false;
        this.body.include(context, includeChildrenRecursively);
        context.brokenFlow = brokenFlow;
      }
      includeCallArguments(context, parameters) {
        this.scope.includeCallArguments(context, parameters);
      }
      initialise() {
        this.scope.addParameterVariables(this.params.map((parameter) => parameter.declare("parameter", UNKNOWN_EXPRESSION)), this.params[this.params.length - 1] instanceof RestElement);
        if (this.body instanceof BlockStatement) {
          this.body.addImplicitReturnExpressionToScope();
        } else {
          this.scope.addReturnExpression(this.body);
        }
      }
      parseNode(esTreeNode) {
        if (esTreeNode.body.type === BlockStatement$1) {
          this.body = new BlockStatement(esTreeNode.body, this, this.scope.hoistedBodyVarScope);
        }
        super.parseNode(esTreeNode);
      }
      applyDeoptimizations() {
      }
    };
    FunctionBase.prototype.preventChildBlockScope = true;
    ArrowFunctionExpression = class extends FunctionBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
      }
      createScope(parentScope) {
        this.scope = new ReturnValueScope(parentScope, this.context);
      }
      hasEffects() {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return false;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (super.hasEffectsOnInteractionAtPath(path2, interaction, context))
          return true;
        if (interaction.type === INTERACTION_CALLED) {
          const { ignore: ignore2, brokenFlow } = context;
          context.ignore = {
            breaks: false,
            continues: false,
            labels: /* @__PURE__ */ new Set(),
            returnYield: true,
            this: false
          };
          if (this.body.hasEffects(context))
            return true;
          context.ignore = ignore2;
          context.brokenFlow = brokenFlow;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        super.include(context, includeChildrenRecursively);
        for (const parameter of this.params) {
          if (!(parameter instanceof Identifier)) {
            parameter.include(context, includeChildrenRecursively);
          }
        }
      }
      getObjectEntity() {
        if (this.objectEntity !== null) {
          return this.objectEntity;
        }
        return this.objectEntity = new ObjectEntity([], OBJECT_PROTOTYPE);
      }
    };
    ObjectPattern = class extends NodeBase {
      addExportedVariables(variables, exportNamesByVariable) {
        for (const property of this.properties) {
          if (property.type === Property$1) {
            property.value.addExportedVariables(variables, exportNamesByVariable);
          } else {
            property.argument.addExportedVariables(variables, exportNamesByVariable);
          }
        }
      }
      declare(kind, init2) {
        const variables = [];
        for (const property of this.properties) {
          variables.push(...property.declare(kind, init2));
        }
        return variables;
      }
      deoptimizePath(path2) {
        if (path2.length === 0) {
          for (const property of this.properties) {
            property.deoptimizePath(path2);
          }
        }
      }
      hasEffectsOnInteractionAtPath(_path, interaction, context) {
        for (const property of this.properties) {
          if (property.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context))
            return true;
        }
        return false;
      }
      markDeclarationReached() {
        for (const property of this.properties) {
          property.markDeclarationReached();
        }
      }
    };
    AssignmentExpression = class extends NodeBase {
      hasEffects(context) {
        const { deoptimized, left, operator, right } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        return right.hasEffects(context) || left.hasEffectsAsAssignmentTarget(context, operator !== "=");
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return this.right.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include(context, includeChildrenRecursively) {
        const { deoptimized, left, right, operator } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        if (includeChildrenRecursively || operator !== "=" || left.included || left.hasEffectsAsAssignmentTarget(createHasEffectsContext(), false)) {
          left.includeAsAssignmentTarget(context, includeChildrenRecursively, operator !== "=");
        }
        right.include(context, includeChildrenRecursively);
      }
      initialise() {
        this.left.setAssignedValue(this.right);
      }
      render(code, options, { preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
        const { left, right, start, end, parent } = this;
        if (left.included) {
          left.render(code, options);
          right.render(code, options);
        } else {
          const inclusionStart = findNonWhiteSpace(code.original, findFirstOccurrenceOutsideComment(code.original, "=", left.end) + 1);
          code.remove(start, inclusionStart);
          if (preventASI) {
            removeLineBreaks(code, inclusionStart, right.start);
          }
          right.render(code, options, {
            renderedParentType: renderedParentType || parent.type,
            renderedSurroundingElement: renderedSurroundingElement || parent.type
          });
        }
        if (options.format === "system") {
          if (left instanceof Identifier) {
            const variable = left.variable;
            const exportNames = options.exportNamesByVariable.get(variable);
            if (exportNames) {
              if (exportNames.length === 1) {
                renderSystemExportExpression(variable, start, end, code, options);
              } else {
                renderSystemExportSequenceAfterExpression(variable, start, end, parent.type !== ExpressionStatement$1, code, options);
              }
              return;
            }
          } else {
            const systemPatternExports = [];
            left.addExportedVariables(systemPatternExports, options.exportNamesByVariable);
            if (systemPatternExports.length > 0) {
              renderSystemExportFunction(systemPatternExports, start, end, renderedSurroundingElement === ExpressionStatement$1, code, options);
              return;
            }
          }
        }
        if (left.included && left instanceof ObjectPattern && (renderedSurroundingElement === ExpressionStatement$1 || renderedSurroundingElement === ArrowFunctionExpression$1)) {
          code.appendRight(start, "(");
          code.prependLeft(end, ")");
        }
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.deoptimizePath(UNKNOWN_PATH);
        this.context.requestTreeshakingPass();
      }
    };
    AssignmentPattern = class extends NodeBase {
      addExportedVariables(variables, exportNamesByVariable) {
        this.left.addExportedVariables(variables, exportNamesByVariable);
      }
      declare(kind, init2) {
        return this.left.declare(kind, init2);
      }
      deoptimizePath(path2) {
        path2.length === 0 && this.left.deoptimizePath(path2);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return path2.length > 0 || this.left.hasEffectsOnInteractionAtPath(EMPTY_PATH, interaction, context);
      }
      markDeclarationReached() {
        this.left.markDeclarationReached();
      }
      render(code, options, { isShorthandProperty } = BLANK) {
        this.left.render(code, options, { isShorthandProperty });
        this.right.render(code, options);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.deoptimizePath(UNKNOWN_PATH);
        this.context.requestTreeshakingPass();
      }
    };
    ArgumentsVariable = class extends LocalVariable {
      constructor(context) {
        super("arguments", null, UNKNOWN_EXPRESSION, context);
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return type !== INTERACTION_ACCESSED || path2.length > 1;
      }
    };
    ThisVariable = class extends ParameterVariable {
      constructor(context) {
        super("this", null, context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return (context.replacedVariableInits.get(this) || UNKNOWN_EXPRESSION).hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
    };
    FunctionScope = class extends ReturnValueScope {
      constructor(parent, context) {
        super(parent, context);
        this.variables.set("arguments", this.argumentsVariable = new ArgumentsVariable(context));
        this.variables.set("this", this.thisVariable = new ThisVariable(context));
      }
      findLexicalBoundary() {
        return this;
      }
      includeCallArguments(context, parameters) {
        super.includeCallArguments(context, parameters);
        if (this.argumentsVariable.included) {
          for (const argument of parameters) {
            if (!argument.included) {
              argument.include(context, false);
            }
          }
        }
      }
    };
    FunctionNode = class extends FunctionBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
      }
      createScope(parentScope) {
        this.scope = new FunctionScope(parentScope, this.context);
        this.constructedEntity = new ObjectEntity(/* @__PURE__ */ Object.create(null), OBJECT_PROTOTYPE);
        this.scope.thisVariable.addEntityToBeDeoptimized(this.constructedEntity);
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        super.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        if (interaction.type === INTERACTION_CALLED && path2.length === 0 && interaction.args[0]) {
          this.scope.thisVariable.addEntityToBeDeoptimized(interaction.args[0]);
        }
      }
      hasEffects(context) {
        var _a;
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return !!((_a = this.id) == null ? void 0 : _a.hasEffects(context));
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (super.hasEffectsOnInteractionAtPath(path2, interaction, context))
          return true;
        if (interaction.type === INTERACTION_CALLED) {
          const thisInit = context.replacedVariableInits.get(this.scope.thisVariable);
          context.replacedVariableInits.set(this.scope.thisVariable, interaction.withNew ? this.constructedEntity : UNKNOWN_EXPRESSION);
          const { brokenFlow, ignore: ignore2, replacedVariableInits } = context;
          context.ignore = {
            breaks: false,
            continues: false,
            labels: /* @__PURE__ */ new Set(),
            returnYield: true,
            this: interaction.withNew
          };
          if (this.body.hasEffects(context))
            return true;
          context.brokenFlow = brokenFlow;
          if (thisInit) {
            replacedVariableInits.set(this.scope.thisVariable, thisInit);
          } else {
            replacedVariableInits.delete(this.scope.thisVariable);
          }
          context.ignore = ignore2;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        var _a;
        super.include(context, includeChildrenRecursively);
        (_a = this.id) == null ? void 0 : _a.include();
        const hasArguments = this.scope.argumentsVariable.included;
        for (const parameter of this.params) {
          if (!(parameter instanceof Identifier) || hasArguments) {
            parameter.include(context, includeChildrenRecursively);
          }
        }
      }
      initialise() {
        var _a;
        super.initialise();
        (_a = this.id) == null ? void 0 : _a.declare("function", this);
      }
      getObjectEntity() {
        if (this.objectEntity !== null) {
          return this.objectEntity;
        }
        return this.objectEntity = new ObjectEntity([
          {
            key: "prototype",
            kind: "init",
            property: new ObjectEntity([], OBJECT_PROTOTYPE)
          }
        ], OBJECT_PROTOTYPE);
      }
    };
    AwaitExpression = class extends NodeBase {
      hasEffects() {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return true;
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (!this.included) {
          this.included = true;
          checkTopLevelAwait:
            if (!this.context.usesTopLevelAwait) {
              let parent = this.parent;
              do {
                if (parent instanceof FunctionNode || parent instanceof ArrowFunctionExpression)
                  break checkTopLevelAwait;
              } while (parent = parent.parent);
              this.context.usesTopLevelAwait = true;
            }
        }
        this.argument.include(context, includeChildrenRecursively);
      }
    };
    binaryOperators = {
      "!=": (left, right) => left != right,
      "!==": (left, right) => left !== right,
      "%": (left, right) => left % right,
      "&": (left, right) => left & right,
      "*": (left, right) => left * right,
      // At the moment, "**" will be transpiled to Math.pow
      "**": (left, right) => left ** right,
      "+": (left, right) => left + right,
      "-": (left, right) => left - right,
      "/": (left, right) => left / right,
      "<": (left, right) => left < right,
      "<<": (left, right) => left << right,
      "<=": (left, right) => left <= right,
      "==": (left, right) => left == right,
      "===": (left, right) => left === right,
      ">": (left, right) => left > right,
      ">=": (left, right) => left >= right,
      ">>": (left, right) => left >> right,
      ">>>": (left, right) => left >>> right,
      "^": (left, right) => left ^ right,
      "|": (left, right) => left | right
      // We use the fallback for cases where we return something unknown
      // in: () => UnknownValue,
      // instanceof: () => UnknownValue,
    };
    BinaryExpression = class extends NodeBase {
      deoptimizeCache() {
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (path2.length > 0)
          return UnknownValue;
        const leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (typeof leftValue === "symbol")
          return UnknownValue;
        const rightValue = this.right.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (typeof rightValue === "symbol")
          return UnknownValue;
        const operatorFunction = binaryOperators[this.operator];
        if (!operatorFunction)
          return UnknownValue;
        return operatorFunction(leftValue, rightValue);
      }
      hasEffects(context) {
        if (this.operator === "+" && this.parent instanceof ExpressionStatement && this.left.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this) === "") {
          return true;
        }
        return super.hasEffects(context);
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return type !== INTERACTION_ACCESSED || path2.length > 1;
      }
      render(code, options, { renderedSurroundingElement } = BLANK) {
        this.left.render(code, options, { renderedSurroundingElement });
        this.right.render(code, options);
      }
    };
    BreakStatement = class extends NodeBase {
      hasEffects(context) {
        if (this.label) {
          if (!context.ignore.labels.has(this.label.name))
            return true;
          context.includedLabels.add(this.label.name);
        } else {
          if (!context.ignore.breaks)
            return true;
          context.hasBreak = true;
        }
        context.brokenFlow = true;
        return false;
      }
      include(context) {
        this.included = true;
        if (this.label) {
          this.label.include();
          context.includedLabels.add(this.label.name);
        } else {
          context.hasBreak = true;
        }
        context.brokenFlow = true;
      }
    };
    Literal = class extends NodeBase {
      deoptimizeArgumentsOnInteractionAtPath() {
      }
      getLiteralValueAtPath(path2) {
        if (path2.length > 0 || // unknown literals can also be null but do not start with an "n"
        this.value === null && this.context.code.charCodeAt(this.start) !== 110 || typeof this.value === "bigint" || // to support shims for regular expressions
        this.context.code.charCodeAt(this.start) === 47) {
          return UnknownValue;
        }
        return this.value;
      }
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length !== 1)
          return UNKNOWN_RETURN_EXPRESSION;
        return getMemberReturnExpressionWhenCalled(this.members, path2[0]);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        switch (interaction.type) {
          case INTERACTION_ACCESSED: {
            return path2.length > (this.value === null ? 0 : 1);
          }
          case INTERACTION_ASSIGNED: {
            return true;
          }
          case INTERACTION_CALLED: {
            if (this.included && this.value instanceof RegExp && (this.value.global || this.value.sticky)) {
              return true;
            }
            return path2.length !== 1 || hasMemberEffectWhenCalled(this.members, path2[0], interaction, context);
          }
        }
      }
      initialise() {
        this.members = getLiteralMembersForValue(this.value);
      }
      parseNode(esTreeNode) {
        this.value = esTreeNode.value;
        this.regex = esTreeNode.regex;
        super.parseNode(esTreeNode);
      }
      render(code) {
        if (typeof this.value === "string") {
          code.indentExclusionRanges.push([this.start + 1, this.end - 1]);
        }
      }
    };
    MAX_PATH_DEPTH = 7;
    MemberExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.variable = null;
        this.assignmentDeoptimized = false;
        this.bound = false;
        this.expressionsToBeDeoptimized = [];
        this.isUndefined = false;
      }
      bind() {
        this.bound = true;
        const path2 = getPathIfNotComputed(this);
        const baseVariable = path2 && this.scope.findVariable(path2[0].key);
        if (baseVariable == null ? void 0 : baseVariable.isNamespace) {
          const resolvedVariable = resolveNamespaceVariables(baseVariable, path2.slice(1), this.context);
          if (!resolvedVariable) {
            super.bind();
          } else if (resolvedVariable === "undefined") {
            this.isUndefined = true;
          } else {
            this.variable = resolvedVariable;
            this.scope.addNamespaceMemberAccess(getStringFromPath(path2), resolvedVariable);
          }
        } else {
          super.bind();
        }
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        if (this.variable) {
          this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        } else if (!this.isUndefined) {
          if (path2.length < MAX_PATH_DEPTH) {
            this.object.deoptimizeArgumentsOnInteractionAtPath(interaction, [this.getPropertyKey(), ...path2], recursionTracker);
          } else {
            deoptimizeInteraction(interaction);
          }
        }
      }
      deoptimizeCache() {
        const { expressionsToBeDeoptimized, object } = this;
        this.expressionsToBeDeoptimized = EMPTY_ARRAY;
        this.propertyKey = UnknownKey;
        object.deoptimizePath(UNKNOWN_PATH);
        for (const expression of expressionsToBeDeoptimized) {
          expression.deoptimizeCache();
        }
      }
      deoptimizePath(path2) {
        if (path2.length === 0)
          this.disallowNamespaceReassignment();
        if (this.variable) {
          this.variable.deoptimizePath(path2);
        } else if (!this.isUndefined && path2.length < MAX_PATH_DEPTH) {
          const propertyKey = this.getPropertyKey();
          this.object.deoptimizePath([
            propertyKey === UnknownKey ? UnknownNonAccessorKey : propertyKey,
            ...path2
          ]);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (this.variable) {
          return this.variable.getLiteralValueAtPath(path2, recursionTracker, origin);
        }
        if (this.isUndefined) {
          return void 0;
        }
        if (this.propertyKey !== UnknownKey && path2.length < MAX_PATH_DEPTH) {
          this.expressionsToBeDeoptimized.push(origin);
          return this.object.getLiteralValueAtPath([this.getPropertyKey(), ...path2], recursionTracker, origin);
        }
        return UnknownValue;
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        if (this.variable) {
          return this.variable.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
        }
        if (this.isUndefined) {
          return [UNDEFINED_EXPRESSION, false];
        }
        if (this.propertyKey !== UnknownKey && path2.length < MAX_PATH_DEPTH) {
          this.expressionsToBeDeoptimized.push(origin);
          return this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...path2], interaction, recursionTracker, origin);
        }
        return UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return this.property.hasEffects(context) || this.object.hasEffects(context) || this.hasAccessEffect(context);
      }
      hasEffectsAsAssignmentTarget(context, checkAccess) {
        if (checkAccess && !this.deoptimized)
          this.applyDeoptimizations();
        if (!this.assignmentDeoptimized)
          this.applyAssignmentDeoptimization();
        return this.property.hasEffects(context) || this.object.hasEffects(context) || checkAccess && this.hasAccessEffect(context) || this.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.assignmentInteraction, context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (this.variable) {
          return this.variable.hasEffectsOnInteractionAtPath(path2, interaction, context);
        }
        if (this.isUndefined) {
          return true;
        }
        if (path2.length < MAX_PATH_DEPTH) {
          return this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey(), ...path2], interaction, context);
        }
        return true;
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        this.includeProperties(context, includeChildrenRecursively);
      }
      includeAsAssignmentTarget(context, includeChildrenRecursively, deoptimizeAccess) {
        if (!this.assignmentDeoptimized)
          this.applyAssignmentDeoptimization();
        if (deoptimizeAccess) {
          this.include(context, includeChildrenRecursively);
        } else {
          this.includeProperties(context, includeChildrenRecursively);
        }
      }
      includeCallArguments(context, parameters) {
        if (this.variable) {
          this.variable.includeCallArguments(context, parameters);
        } else {
          super.includeCallArguments(context, parameters);
        }
      }
      initialise() {
        this.propertyKey = getResolvablePropertyKey(this);
        this.accessInteraction = { args: [this.object], type: INTERACTION_ACCESSED };
      }
      isSkippedAsOptional(origin) {
        var _a, _b;
        return !this.variable && !this.isUndefined && (((_b = (_a = this.object).isSkippedAsOptional) == null ? void 0 : _b.call(_a, origin)) || this.optional && this.object.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, origin) == null);
      }
      render(code, options, { renderedParentType, isCalleeOfRenderedParent, renderedSurroundingElement } = BLANK) {
        if (this.variable || this.isUndefined) {
          const { snippets: { getPropertyAccess } } = options;
          let replacement = this.variable ? this.variable.getName(getPropertyAccess) : "undefined";
          if (renderedParentType && isCalleeOfRenderedParent)
            replacement = "0, " + replacement;
          code.overwrite(this.start, this.end, replacement, {
            contentOnly: true,
            storeName: true
          });
        } else {
          if (renderedParentType && isCalleeOfRenderedParent) {
            code.appendRight(this.start, "0, ");
          }
          this.object.render(code, options, { renderedSurroundingElement });
          this.property.render(code, options);
        }
      }
      setAssignedValue(value) {
        this.assignmentInteraction = {
          args: [this.object, value],
          type: INTERACTION_ASSIGNED
        };
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        const { propertyReadSideEffects } = this.context.options.treeshake;
        if (
          // Namespaces are not bound and should not be deoptimized
          this.bound && propertyReadSideEffects && !(this.variable || this.isUndefined)
        ) {
          const propertyKey = this.getPropertyKey();
          this.object.deoptimizeArgumentsOnInteractionAtPath(this.accessInteraction, [propertyKey], SHARED_RECURSION_TRACKER);
          this.context.requestTreeshakingPass();
        }
      }
      applyAssignmentDeoptimization() {
        this.assignmentDeoptimized = true;
        const { propertyReadSideEffects } = this.context.options.treeshake;
        if (
          // Namespaces are not bound and should not be deoptimized
          this.bound && propertyReadSideEffects && !(this.variable || this.isUndefined)
        ) {
          this.object.deoptimizeArgumentsOnInteractionAtPath(this.assignmentInteraction, [this.getPropertyKey()], SHARED_RECURSION_TRACKER);
          this.context.requestTreeshakingPass();
        }
      }
      disallowNamespaceReassignment() {
        if (this.object instanceof Identifier) {
          const variable = this.scope.findVariable(this.object.name);
          if (variable.isNamespace) {
            if (this.variable) {
              this.context.includeVariableInModule(this.variable);
            }
            this.context.warn(errorIllegalImportReassignment(this.object.name, this.context.module.id), this.start);
          }
        }
      }
      getPropertyKey() {
        if (this.propertyKey === null) {
          this.propertyKey = UnknownKey;
          const value = this.property.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
          return this.propertyKey = value === SymbolToStringTag ? value : typeof value === "symbol" ? UnknownKey : String(value);
        }
        return this.propertyKey;
      }
      hasAccessEffect(context) {
        const { propertyReadSideEffects } = this.context.options.treeshake;
        return !(this.variable || this.isUndefined) && propertyReadSideEffects && (propertyReadSideEffects === "always" || this.object.hasEffectsOnInteractionAtPath([this.getPropertyKey()], this.accessInteraction, context));
      }
      includeProperties(context, includeChildrenRecursively) {
        if (!this.included) {
          this.included = true;
          if (this.variable) {
            this.context.includeVariableInModule(this.variable);
          }
        }
        this.object.include(context, includeChildrenRecursively);
        this.property.include(context, includeChildrenRecursively);
      }
    };
    CallExpressionBase = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.returnExpression = null;
        this.deoptimizableDependentExpressions = [];
        this.expressionsToBeDeoptimized = /* @__PURE__ */ new Set();
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        const { args } = interaction;
        const [returnExpression, isPure] = this.getReturnExpression(recursionTracker);
        if (isPure)
          return;
        const deoptimizedExpressions = args.filter((expression) => !!expression && expression !== UNKNOWN_EXPRESSION);
        if (deoptimizedExpressions.length === 0)
          return;
        if (returnExpression === UNKNOWN_EXPRESSION) {
          for (const expression of deoptimizedExpressions) {
            expression.deoptimizePath(UNKNOWN_PATH);
          }
        } else {
          recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
            for (const expression of deoptimizedExpressions) {
              this.expressionsToBeDeoptimized.add(expression);
            }
            returnExpression.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
          }, null);
        }
      }
      deoptimizeCache() {
        var _a;
        if (((_a = this.returnExpression) == null ? void 0 : _a[0]) !== UNKNOWN_EXPRESSION) {
          this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
          const { deoptimizableDependentExpressions, expressionsToBeDeoptimized } = this;
          this.expressionsToBeDeoptimized = EMPTY_SET;
          this.deoptimizableDependentExpressions = EMPTY_ARRAY;
          for (const expression of deoptimizableDependentExpressions) {
            expression.deoptimizeCache();
          }
          for (const expression of expressionsToBeDeoptimized) {
            expression.deoptimizePath(UNKNOWN_PATH);
          }
        }
      }
      deoptimizePath(path2) {
        if (path2.length === 0 || this.context.deoptimizationTracker.trackEntityAtPathAndGetIfTracked(path2, this)) {
          return;
        }
        const [returnExpression] = this.getReturnExpression();
        if (returnExpression !== UNKNOWN_EXPRESSION) {
          returnExpression.deoptimizePath(path2);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        const [returnExpression] = this.getReturnExpression(recursionTracker);
        if (returnExpression === UNKNOWN_EXPRESSION) {
          return UnknownValue;
        }
        return recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
          this.deoptimizableDependentExpressions.push(origin);
          return returnExpression.getLiteralValueAtPath(path2, recursionTracker, origin);
        }, UnknownValue);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        const returnExpression = this.getReturnExpression(recursionTracker);
        if (returnExpression[0] === UNKNOWN_EXPRESSION) {
          return returnExpression;
        }
        return recursionTracker.withTrackedEntityAtPath(path2, returnExpression, () => {
          this.deoptimizableDependentExpressions.push(origin);
          const [expression, isPure] = returnExpression[0].getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
          return [expression, isPure || returnExpression[1]];
        }, UNKNOWN_RETURN_EXPRESSION);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        const { type } = interaction;
        if (type === INTERACTION_CALLED) {
          const { args, withNew } = interaction;
          if ((withNew ? context.instantiated : context.called).trackEntityAtPathAndGetIfTracked(path2, args, this)) {
            return false;
          }
        } else if ((type === INTERACTION_ASSIGNED ? context.assigned : context.accessed).trackEntityAtPathAndGetIfTracked(path2, this)) {
          return false;
        }
        const [returnExpression, isPure] = this.getReturnExpression();
        return (type === INTERACTION_ASSIGNED || !isPure) && returnExpression.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
    };
    CallExpression = class extends CallExpressionBase {
      bind() {
        super.bind();
        if (this.callee instanceof Identifier) {
          const variable = this.scope.findVariable(this.callee.name);
          if (variable.isNamespace) {
            this.context.warn(errorCannotCallNamespace(this.callee.name), this.start);
          }
          if (this.callee.name === "eval") {
            this.context.warn(errorEval(this.context.module.id), this.start);
          }
        }
        this.interaction = {
          args: [
            this.callee instanceof MemberExpression && !this.callee.variable ? this.callee.object : null,
            ...this.arguments
          ],
          type: INTERACTION_CALLED,
          withNew: false
        };
      }
      hasEffects(context) {
        try {
          for (const argument of this.arguments) {
            if (argument.hasEffects(context))
              return true;
          }
          if (this.context.options.treeshake.annotations && this.annotations)
            return false;
          return this.callee.hasEffects(context) || this.callee.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
        } finally {
          if (!this.deoptimized)
            this.applyDeoptimizations();
        }
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (includeChildrenRecursively) {
          super.include(context, includeChildrenRecursively);
          if (includeChildrenRecursively === INCLUDE_PARAMETERS && this.callee instanceof Identifier && this.callee.variable) {
            this.callee.variable.markCalledFromTryStatement();
          }
        } else {
          this.included = true;
          this.callee.include(context, false);
        }
        this.callee.includeCallArguments(context, this.arguments);
      }
      isSkippedAsOptional(origin) {
        var _a, _b;
        return ((_b = (_a = this.callee).isSkippedAsOptional) == null ? void 0 : _b.call(_a, origin)) || this.optional && this.callee.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, origin) == null;
      }
      render(code, options, { renderedSurroundingElement } = BLANK) {
        this.callee.render(code, options, {
          isCalleeOfRenderedParent: true,
          renderedSurroundingElement
        });
        renderCallArguments(code, options, this);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
        this.context.requestTreeshakingPass();
      }
      getReturnExpression(recursionTracker = SHARED_RECURSION_TRACKER) {
        if (this.returnExpression === null) {
          this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
          return this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, this.interaction, recursionTracker, this);
        }
        return this.returnExpression;
      }
    };
    CatchScope = class extends ParameterScope {
      addDeclaration(identifier, context, init2, isHoisted) {
        const existingParameter = this.variables.get(identifier.name);
        if (existingParameter) {
          this.parent.addDeclaration(identifier, context, UNDEFINED_EXPRESSION, isHoisted);
          existingParameter.addDeclaration(identifier, init2);
          return existingParameter;
        }
        return this.parent.addDeclaration(identifier, context, init2, isHoisted);
      }
    };
    CatchClause = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new CatchScope(parentScope, this.context);
      }
      parseNode(esTreeNode) {
        const { param } = esTreeNode;
        if (param) {
          this.param = new (this.context.getNodeConstructor(param.type))(param, this, this.scope);
          this.param.declare("parameter", UNKNOWN_EXPRESSION);
        }
        super.parseNode(esTreeNode);
      }
    };
    ChainExpression = class extends NodeBase {
      // deoptimizations are not relevant as we are not caching values
      deoptimizeCache() {
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (this.expression.isSkippedAsOptional(origin))
          return void 0;
        return this.expression.getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      hasEffects(context) {
        if (this.expression.isSkippedAsOptional(this))
          return false;
        return this.expression.hasEffects(context);
      }
    };
    ClassBodyScope = class extends ChildScope {
      constructor(parent, classNode, context) {
        super(parent);
        this.variables.set("this", this.thisVariable = new LocalVariable("this", null, classNode, context));
        this.instanceScope = new ChildScope(this);
        this.instanceScope.variables.set("this", new ThisVariable(context));
      }
      findLexicalBoundary() {
        return this;
      }
    };
    ClassBody = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new ClassBodyScope(parentScope, this.parent, this.context);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        this.context.includeVariableInModule(this.scope.thisVariable);
        for (const definition of this.body) {
          definition.include(context, includeChildrenRecursively);
        }
      }
      parseNode(esTreeNode) {
        const body = this.body = [];
        for (const definition of esTreeNode.body) {
          body.push(new (this.context.getNodeConstructor(definition.type))(definition, this, definition.static ? this.scope : this.scope.instanceScope));
        }
        super.parseNode(esTreeNode);
      }
      applyDeoptimizations() {
      }
    };
    MethodBase = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.accessedValue = null;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        if (interaction.type === INTERACTION_ACCESSED && this.kind === "get" && path2.length === 0) {
          return this.value.deoptimizeArgumentsOnInteractionAtPath({
            args: interaction.args,
            type: INTERACTION_CALLED,
            withNew: false
          }, EMPTY_PATH, recursionTracker);
        }
        if (interaction.type === INTERACTION_ASSIGNED && this.kind === "set" && path2.length === 0) {
          return this.value.deoptimizeArgumentsOnInteractionAtPath({
            args: interaction.args,
            type: INTERACTION_CALLED,
            withNew: false
          }, EMPTY_PATH, recursionTracker);
        }
        this.getAccessedValue()[0].deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      // As getter properties directly receive their values from fixed function
      // expressions, there is no known situation where a getter is deoptimized.
      deoptimizeCache() {
      }
      deoptimizePath(path2) {
        this.getAccessedValue()[0].deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getAccessedValue()[0].getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.getAccessedValue()[0].getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffects(context) {
        return this.key.hasEffects(context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (this.kind === "get" && interaction.type === INTERACTION_ACCESSED && path2.length === 0) {
          return this.value.hasEffectsOnInteractionAtPath(EMPTY_PATH, {
            args: interaction.args,
            type: INTERACTION_CALLED,
            withNew: false
          }, context);
        }
        if (this.kind === "set" && interaction.type === INTERACTION_ASSIGNED) {
          return this.value.hasEffectsOnInteractionAtPath(EMPTY_PATH, {
            args: interaction.args,
            type: INTERACTION_CALLED,
            withNew: false
          }, context);
        }
        return this.getAccessedValue()[0].hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      applyDeoptimizations() {
      }
      getAccessedValue() {
        if (this.accessedValue === null) {
          if (this.kind === "get") {
            this.accessedValue = UNKNOWN_RETURN_EXPRESSION;
            return this.accessedValue = this.value.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_CALL, SHARED_RECURSION_TRACKER, this);
          } else {
            return this.accessedValue = [this.value, false];
          }
        }
        return this.accessedValue;
      }
    };
    MethodDefinition = class extends MethodBase {
      applyDeoptimizations() {
      }
    };
    ObjectMember = class extends ExpressionEntity {
      constructor(object, key) {
        super();
        this.object = object;
        this.key = key;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.object.deoptimizeArgumentsOnInteractionAtPath(interaction, [this.key, ...path2], recursionTracker);
      }
      deoptimizePath(path2) {
        this.object.deoptimizePath([this.key, ...path2]);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.object.getLiteralValueAtPath([this.key, ...path2], recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.object.getReturnExpressionWhenCalledAtPath([this.key, ...path2], interaction, recursionTracker, origin);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return this.object.hasEffectsOnInteractionAtPath([this.key, ...path2], interaction, context);
      }
    };
    ClassNode = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
      }
      createScope(parentScope) {
        this.scope = new ChildScope(parentScope);
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizeCache() {
        this.getObjectEntity().deoptimizeAllProperties();
      }
      deoptimizePath(path2) {
        this.getObjectEntity().deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffects(context) {
        var _a, _b;
        if (!this.deoptimized)
          this.applyDeoptimizations();
        const initEffect = ((_a = this.superClass) == null ? void 0 : _a.hasEffects(context)) || this.body.hasEffects(context);
        (_b = this.id) == null ? void 0 : _b.markDeclarationReached();
        return initEffect || super.hasEffects(context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        var _a;
        return interaction.type === INTERACTION_CALLED && path2.length === 0 ? !interaction.withNew || (this.classConstructor === null ? (_a = this.superClass) == null ? void 0 : _a.hasEffectsOnInteractionAtPath(path2, interaction, context) : this.classConstructor.hasEffectsOnInteractionAtPath(path2, interaction, context)) || false : this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include(context, includeChildrenRecursively) {
        var _a;
        if (!this.deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        (_a = this.superClass) == null ? void 0 : _a.include(context, includeChildrenRecursively);
        this.body.include(context, includeChildrenRecursively);
        if (this.id) {
          this.id.markDeclarationReached();
          this.id.include();
        }
      }
      initialise() {
        var _a;
        (_a = this.id) == null ? void 0 : _a.declare("class", this);
        for (const method of this.body.body) {
          if (method instanceof MethodDefinition && method.kind === "constructor") {
            this.classConstructor = method;
            return;
          }
        }
        this.classConstructor = null;
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        for (const definition of this.body.body) {
          if (!(definition.static || definition instanceof MethodDefinition && definition.kind === "constructor")) {
            definition.deoptimizePath(UNKNOWN_PATH);
          }
        }
        this.context.requestTreeshakingPass();
      }
      getObjectEntity() {
        if (this.objectEntity !== null) {
          return this.objectEntity;
        }
        const staticProperties = [];
        const dynamicMethods = [];
        for (const definition of this.body.body) {
          const properties = definition.static ? staticProperties : dynamicMethods;
          const definitionKind = definition.kind;
          if (properties === dynamicMethods && !definitionKind)
            continue;
          const kind = definitionKind === "set" || definitionKind === "get" ? definitionKind : "init";
          let key;
          if (definition.computed) {
            const keyValue = definition.key.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
            if (typeof keyValue === "symbol") {
              properties.push({ key: UnknownKey, kind, property: definition });
              continue;
            } else {
              key = String(keyValue);
            }
          } else {
            key = definition.key instanceof Identifier ? definition.key.name : String(definition.key.value);
          }
          properties.push({ key, kind, property: definition });
        }
        staticProperties.unshift({
          key: "prototype",
          kind: "init",
          property: new ObjectEntity(dynamicMethods, this.superClass ? new ObjectMember(this.superClass, "prototype") : OBJECT_PROTOTYPE)
        });
        return this.objectEntity = new ObjectEntity(staticProperties, this.superClass || OBJECT_PROTOTYPE);
      }
    };
    ClassDeclaration = class extends ClassNode {
      initialise() {
        super.initialise();
        if (this.id !== null) {
          this.id.variable.isId = true;
        }
      }
      parseNode(esTreeNode) {
        if (esTreeNode.id !== null) {
          this.id = new Identifier(esTreeNode.id, this, this.scope.parent);
        }
        super.parseNode(esTreeNode);
      }
      render(code, options) {
        var _a;
        const { exportNamesByVariable, format, snippets: { _, getPropertyAccess } } = options;
        if (this.id) {
          const { variable, name } = this.id;
          if (format === "system" && exportNamesByVariable.has(variable)) {
            code.appendLeft(this.end, `${_}${getSystemExportStatement([variable], options)};`);
          }
          const renderedVariable = variable.getName(getPropertyAccess);
          if (renderedVariable !== name) {
            (_a = this.superClass) == null ? void 0 : _a.render(code, options);
            this.body.render(code, {
              ...options,
              useOriginalName: (_variable) => _variable === variable
            });
            code.prependRight(this.start, `let ${renderedVariable}${_}=${_}`);
            code.prependLeft(this.end, ";");
            return;
          }
        }
        super.render(code, options);
      }
      applyDeoptimizations() {
        super.applyDeoptimizations();
        const { id, scope } = this;
        if (id) {
          const { name, variable } = id;
          for (const accessedVariable of scope.accessedOutsideVariables.values()) {
            if (accessedVariable !== variable) {
              accessedVariable.forbidName(name);
            }
          }
        }
      }
    };
    ClassExpression = class extends ClassNode {
      render(code, options, { renderedSurroundingElement } = BLANK) {
        super.render(code, options);
        if (renderedSurroundingElement === ExpressionStatement$1) {
          code.appendRight(this.start, "(");
          code.prependLeft(this.end, ")");
        }
      }
    };
    MultiExpression = class extends ExpressionEntity {
      constructor(expressions) {
        super();
        this.expressions = expressions;
        this.included = false;
      }
      deoptimizePath(path2) {
        for (const expression of this.expressions) {
          expression.deoptimizePath(path2);
        }
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return [
          new MultiExpression(this.expressions.map((expression) => expression.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0])),
          false
        ];
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        for (const expression of this.expressions) {
          if (expression.hasEffectsOnInteractionAtPath(path2, interaction, context))
            return true;
        }
        return false;
      }
    };
    ConditionalExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.expressionsToBeDeoptimized = [];
        this.isBranchResolutionAnalysed = false;
        this.usedBranch = null;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.consequent.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        this.alternate.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizeCache() {
        if (this.usedBranch !== null) {
          const unusedBranch = this.usedBranch === this.consequent ? this.alternate : this.consequent;
          this.usedBranch = null;
          unusedBranch.deoptimizePath(UNKNOWN_PATH);
          const { expressionsToBeDeoptimized } = this;
          this.expressionsToBeDeoptimized = EMPTY_ARRAY;
          for (const expression of expressionsToBeDeoptimized) {
            expression.deoptimizeCache();
          }
        }
      }
      deoptimizePath(path2) {
        const usedBranch = this.getUsedBranch();
        if (usedBranch) {
          usedBranch.deoptimizePath(path2);
        } else {
          this.consequent.deoptimizePath(path2);
          this.alternate.deoptimizePath(path2);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch)
          return UnknownValue;
        this.expressionsToBeDeoptimized.push(origin);
        return usedBranch.getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch)
          return [
            new MultiExpression([
              this.consequent.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0],
              this.alternate.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0]
            ]),
            false
          ];
        this.expressionsToBeDeoptimized.push(origin);
        return usedBranch.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffects(context) {
        if (this.test.hasEffects(context))
          return true;
        const usedBranch = this.getUsedBranch();
        if (!usedBranch) {
          return this.consequent.hasEffects(context) || this.alternate.hasEffects(context);
        }
        return usedBranch.hasEffects(context);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch) {
          return this.consequent.hasEffectsOnInteractionAtPath(path2, interaction, context) || this.alternate.hasEffectsOnInteractionAtPath(path2, interaction, context);
        }
        return usedBranch.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        const usedBranch = this.getUsedBranch();
        if (includeChildrenRecursively || this.test.shouldBeIncluded(context) || usedBranch === null) {
          this.test.include(context, includeChildrenRecursively);
          this.consequent.include(context, includeChildrenRecursively);
          this.alternate.include(context, includeChildrenRecursively);
        } else {
          usedBranch.include(context, includeChildrenRecursively);
        }
      }
      includeCallArguments(context, parameters) {
        const usedBranch = this.getUsedBranch();
        if (usedBranch) {
          usedBranch.includeCallArguments(context, parameters);
        } else {
          this.consequent.includeCallArguments(context, parameters);
          this.alternate.includeCallArguments(context, parameters);
        }
      }
      render(code, options, { isCalleeOfRenderedParent, preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
        const usedBranch = this.getUsedBranch();
        if (this.test.included) {
          this.test.render(code, options, { renderedSurroundingElement });
          this.consequent.render(code, options);
          this.alternate.render(code, options);
        } else {
          const colonPos = findFirstOccurrenceOutsideComment(code.original, ":", this.consequent.end);
          const inclusionStart = findNonWhiteSpace(code.original, (this.consequent.included ? findFirstOccurrenceOutsideComment(code.original, "?", this.test.end) : colonPos) + 1);
          if (preventASI) {
            removeLineBreaks(code, inclusionStart, usedBranch.start);
          }
          code.remove(this.start, inclusionStart);
          if (this.consequent.included) {
            code.remove(colonPos, this.end);
          }
          removeAnnotations(this, code);
          usedBranch.render(code, options, {
            isCalleeOfRenderedParent,
            preventASI: true,
            renderedParentType: renderedParentType || this.parent.type,
            renderedSurroundingElement: renderedSurroundingElement || this.parent.type
          });
        }
      }
      getUsedBranch() {
        if (this.isBranchResolutionAnalysed) {
          return this.usedBranch;
        }
        this.isBranchResolutionAnalysed = true;
        const testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
        return typeof testValue === "symbol" ? null : this.usedBranch = testValue ? this.consequent : this.alternate;
      }
    };
    ContinueStatement = class extends NodeBase {
      hasEffects(context) {
        if (this.label) {
          if (!context.ignore.labels.has(this.label.name))
            return true;
          context.includedLabels.add(this.label.name);
        } else {
          if (!context.ignore.continues)
            return true;
          context.hasContinue = true;
        }
        context.brokenFlow = true;
        return false;
      }
      include(context) {
        this.included = true;
        if (this.label) {
          this.label.include();
          context.includedLabels.add(this.label.name);
        } else {
          context.hasContinue = true;
        }
        context.brokenFlow = true;
      }
    };
    DoWhileStatement = class extends NodeBase {
      hasEffects(context) {
        if (this.test.hasEffects(context))
          return true;
        return hasLoopBodyEffects(context, this.body);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        this.test.include(context, includeChildrenRecursively);
        includeLoopBody(context, this.body, includeChildrenRecursively);
      }
    };
    EmptyStatement = class extends NodeBase {
      hasEffects() {
        return false;
      }
    };
    ExportAllDeclaration = class extends NodeBase {
      hasEffects() {
        return false;
      }
      initialise() {
        this.context.addExport(this);
      }
      render(code, _options, nodeRenderOptions) {
        code.remove(nodeRenderOptions.start, nodeRenderOptions.end);
      }
      applyDeoptimizations() {
      }
    };
    ExportAllDeclaration.prototype.needsBoundaries = true;
    FunctionDeclaration = class extends FunctionNode {
      initialise() {
        super.initialise();
        if (this.id !== null) {
          this.id.variable.isId = true;
        }
      }
      parseNode(esTreeNode) {
        if (esTreeNode.id !== null) {
          this.id = new Identifier(esTreeNode.id, this, this.scope.parent);
        }
        super.parseNode(esTreeNode);
      }
    };
    ExportDefaultDeclaration = class extends NodeBase {
      include(context, includeChildrenRecursively) {
        super.include(context, includeChildrenRecursively);
        if (includeChildrenRecursively) {
          this.context.includeVariableInModule(this.variable);
        }
      }
      initialise() {
        const declaration = this.declaration;
        this.declarationName = declaration.id && declaration.id.name || this.declaration.name;
        this.variable = this.scope.addExportDefaultDeclaration(this.declarationName || this.context.getModuleName(), this, this.context);
        this.context.addExport(this);
      }
      render(code, options, nodeRenderOptions) {
        const { start, end } = nodeRenderOptions;
        const declarationStart = getDeclarationStart(code.original, this.start);
        if (this.declaration instanceof FunctionDeclaration) {
          this.renderNamedDeclaration(code, declarationStart, this.declaration.id === null ? getFunctionIdInsertPosition(code.original, declarationStart) : null, options);
        } else if (this.declaration instanceof ClassDeclaration) {
          this.renderNamedDeclaration(code, declarationStart, this.declaration.id === null ? findFirstOccurrenceOutsideComment(code.original, "class", start) + "class".length : null, options);
        } else if (this.variable.getOriginalVariable() !== this.variable) {
          treeshakeNode(this, code, start, end);
          return;
        } else if (this.variable.included) {
          this.renderVariableDeclaration(code, declarationStart, options);
        } else {
          code.remove(this.start, declarationStart);
          this.declaration.render(code, options, {
            renderedSurroundingElement: ExpressionStatement$1
          });
          if (code.original[this.end - 1] !== ";") {
            code.appendLeft(this.end, ";");
          }
          return;
        }
        this.declaration.render(code, options);
      }
      applyDeoptimizations() {
      }
      renderNamedDeclaration(code, declarationStart, idInsertPosition, options) {
        const { exportNamesByVariable, format, snippets: { getPropertyAccess } } = options;
        const name = this.variable.getName(getPropertyAccess);
        code.remove(this.start, declarationStart);
        if (idInsertPosition !== null) {
          code.appendLeft(idInsertPosition, ` ${name}`);
        }
        if (format === "system" && this.declaration instanceof ClassDeclaration && exportNamesByVariable.has(this.variable)) {
          code.appendLeft(this.end, ` ${getSystemExportStatement([this.variable], options)};`);
        }
      }
      renderVariableDeclaration(code, declarationStart, { format, exportNamesByVariable, snippets: { cnst, getPropertyAccess } }) {
        const hasTrailingSemicolon = code.original.charCodeAt(this.end - 1) === 59;
        const systemExportNames = format === "system" && exportNamesByVariable.get(this.variable);
        if (systemExportNames) {
          code.overwrite(this.start, declarationStart, `${cnst} ${this.variable.getName(getPropertyAccess)} = exports('${systemExportNames[0]}', `);
          code.appendRight(hasTrailingSemicolon ? this.end - 1 : this.end, ")" + (hasTrailingSemicolon ? "" : ";"));
        } else {
          code.overwrite(this.start, declarationStart, `${cnst} ${this.variable.getName(getPropertyAccess)} = `);
          if (!hasTrailingSemicolon) {
            code.appendLeft(this.end, ";");
          }
        }
      }
    };
    ExportDefaultDeclaration.prototype.needsBoundaries = true;
    ExportNamedDeclaration = class extends NodeBase {
      bind() {
        var _a;
        (_a = this.declaration) == null ? void 0 : _a.bind();
      }
      hasEffects(context) {
        var _a;
        return !!((_a = this.declaration) == null ? void 0 : _a.hasEffects(context));
      }
      initialise() {
        this.context.addExport(this);
      }
      render(code, options, nodeRenderOptions) {
        const { start, end } = nodeRenderOptions;
        if (this.declaration === null) {
          code.remove(start, end);
        } else {
          code.remove(this.start, this.declaration.start);
          this.declaration.render(code, options, { end, start });
        }
      }
      applyDeoptimizations() {
      }
    };
    ExportNamedDeclaration.prototype.needsBoundaries = true;
    ExportSpecifier = class extends NodeBase {
      applyDeoptimizations() {
      }
    };
    ForInStatement = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new BlockScope(parentScope);
      }
      hasEffects(context) {
        const { body, deoptimized, left, right } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        if (left.hasEffectsAsAssignmentTarget(context, false) || right.hasEffects(context))
          return true;
        return hasLoopBodyEffects(context, body);
      }
      include(context, includeChildrenRecursively) {
        const { body, deoptimized, left, right } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        left.includeAsAssignmentTarget(context, includeChildrenRecursively || true, false);
        right.include(context, includeChildrenRecursively);
        includeLoopBody(context, body, includeChildrenRecursively);
      }
      initialise() {
        this.left.setAssignedValue(UNKNOWN_EXPRESSION);
      }
      render(code, options) {
        this.left.render(code, options, NO_SEMICOLON);
        this.right.render(code, options, NO_SEMICOLON);
        if (code.original.charCodeAt(this.right.start - 1) === 110) {
          code.prependLeft(this.right.start, " ");
        }
        this.body.render(code, options);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.left.deoptimizePath(EMPTY_PATH);
        this.context.requestTreeshakingPass();
      }
    };
    ForOfStatement = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new BlockScope(parentScope);
      }
      hasEffects() {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return true;
      }
      include(context, includeChildrenRecursively) {
        const { body, deoptimized, left, right } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        left.includeAsAssignmentTarget(context, includeChildrenRecursively || true, false);
        right.include(context, includeChildrenRecursively);
        includeLoopBody(context, body, includeChildrenRecursively);
      }
      initialise() {
        this.left.setAssignedValue(UNKNOWN_EXPRESSION);
      }
      render(code, options) {
        this.left.render(code, options, NO_SEMICOLON);
        this.right.render(code, options, NO_SEMICOLON);
        if (code.original.charCodeAt(this.right.start - 1) === 102) {
          code.prependLeft(this.right.start, " ");
        }
        this.body.render(code, options);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.left.deoptimizePath(EMPTY_PATH);
        this.right.deoptimizePath(UNKNOWN_PATH);
        this.context.requestTreeshakingPass();
      }
    };
    ForStatement = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new BlockScope(parentScope);
      }
      hasEffects(context) {
        var _a, _b, _c;
        if (((_a = this.init) == null ? void 0 : _a.hasEffects(context)) || ((_b = this.test) == null ? void 0 : _b.hasEffects(context)) || ((_c = this.update) == null ? void 0 : _c.hasEffects(context))) {
          return true;
        }
        return hasLoopBodyEffects(context, this.body);
      }
      include(context, includeChildrenRecursively) {
        var _a, _b, _c;
        this.included = true;
        (_a = this.init) == null ? void 0 : _a.include(context, includeChildrenRecursively, { asSingleStatement: true });
        (_b = this.test) == null ? void 0 : _b.include(context, includeChildrenRecursively);
        (_c = this.update) == null ? void 0 : _c.include(context, includeChildrenRecursively);
        includeLoopBody(context, this.body, includeChildrenRecursively);
      }
      render(code, options) {
        var _a, _b, _c;
        (_a = this.init) == null ? void 0 : _a.render(code, options, NO_SEMICOLON);
        (_b = this.test) == null ? void 0 : _b.render(code, options, NO_SEMICOLON);
        (_c = this.update) == null ? void 0 : _c.render(code, options, NO_SEMICOLON);
        this.body.render(code, options);
      }
    };
    FunctionExpression = class extends FunctionNode {
      render(code, options, { renderedSurroundingElement } = BLANK) {
        super.render(code, options);
        if (renderedSurroundingElement === ExpressionStatement$1) {
          code.appendRight(this.start, "(");
          code.prependLeft(this.end, ")");
        }
      }
    };
    TrackingScope = class extends BlockScope {
      constructor() {
        super(...arguments);
        this.hoistedDeclarations = [];
      }
      addDeclaration(identifier, context, init2, isHoisted) {
        this.hoistedDeclarations.push(identifier);
        return super.addDeclaration(identifier, context, init2, isHoisted);
      }
    };
    unset = Symbol("unset");
    IfStatement = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.testValue = unset;
      }
      deoptimizeCache() {
        this.testValue = UnknownValue;
      }
      hasEffects(context) {
        var _a;
        if (this.test.hasEffects(context)) {
          return true;
        }
        const testValue = this.getTestValue();
        if (typeof testValue === "symbol") {
          const { brokenFlow } = context;
          if (this.consequent.hasEffects(context))
            return true;
          const consequentBrokenFlow = context.brokenFlow;
          context.brokenFlow = brokenFlow;
          if (this.alternate === null)
            return false;
          if (this.alternate.hasEffects(context))
            return true;
          context.brokenFlow = context.brokenFlow && consequentBrokenFlow;
          return false;
        }
        return testValue ? this.consequent.hasEffects(context) : !!((_a = this.alternate) == null ? void 0 : _a.hasEffects(context));
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        if (includeChildrenRecursively) {
          this.includeRecursively(includeChildrenRecursively, context);
        } else {
          const testValue = this.getTestValue();
          if (typeof testValue === "symbol") {
            this.includeUnknownTest(context);
          } else {
            this.includeKnownTest(context, testValue);
          }
        }
      }
      parseNode(esTreeNode) {
        this.consequentScope = new TrackingScope(this.scope);
        this.consequent = new (this.context.getNodeConstructor(esTreeNode.consequent.type))(esTreeNode.consequent, this, this.consequentScope);
        if (esTreeNode.alternate) {
          this.alternateScope = new TrackingScope(this.scope);
          this.alternate = new (this.context.getNodeConstructor(esTreeNode.alternate.type))(esTreeNode.alternate, this, this.alternateScope);
        }
        super.parseNode(esTreeNode);
      }
      render(code, options) {
        const { snippets: { getPropertyAccess } } = options;
        const testValue = this.getTestValue();
        const hoistedDeclarations = [];
        const includesIfElse = this.test.included;
        const noTreeshake = !this.context.options.treeshake;
        if (includesIfElse) {
          this.test.render(code, options);
        } else {
          code.remove(this.start, this.consequent.start);
        }
        if (this.consequent.included && (noTreeshake || typeof testValue === "symbol" || testValue)) {
          this.consequent.render(code, options);
        } else {
          code.overwrite(this.consequent.start, this.consequent.end, includesIfElse ? ";" : "");
          hoistedDeclarations.push(...this.consequentScope.hoistedDeclarations);
        }
        if (this.alternate) {
          if (this.alternate.included && (noTreeshake || typeof testValue === "symbol" || !testValue)) {
            if (includesIfElse) {
              if (code.original.charCodeAt(this.alternate.start - 1) === 101) {
                code.prependLeft(this.alternate.start, " ");
              }
            } else {
              code.remove(this.consequent.end, this.alternate.start);
            }
            this.alternate.render(code, options);
          } else {
            if (includesIfElse && this.shouldKeepAlternateBranch()) {
              code.overwrite(this.alternate.start, this.end, ";");
            } else {
              code.remove(this.consequent.end, this.end);
            }
            hoistedDeclarations.push(...this.alternateScope.hoistedDeclarations);
          }
        }
        this.renderHoistedDeclarations(hoistedDeclarations, code, getPropertyAccess);
      }
      applyDeoptimizations() {
      }
      getTestValue() {
        if (this.testValue === unset) {
          return this.testValue = this.test.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
        }
        return this.testValue;
      }
      includeKnownTest(context, testValue) {
        var _a;
        if (this.test.shouldBeIncluded(context)) {
          this.test.include(context, false);
        }
        if (testValue && this.consequent.shouldBeIncluded(context)) {
          this.consequent.include(context, false, { asSingleStatement: true });
        }
        if (!testValue && ((_a = this.alternate) == null ? void 0 : _a.shouldBeIncluded(context))) {
          this.alternate.include(context, false, { asSingleStatement: true });
        }
      }
      includeRecursively(includeChildrenRecursively, context) {
        var _a;
        this.test.include(context, includeChildrenRecursively);
        this.consequent.include(context, includeChildrenRecursively);
        (_a = this.alternate) == null ? void 0 : _a.include(context, includeChildrenRecursively);
      }
      includeUnknownTest(context) {
        var _a;
        this.test.include(context, false);
        const { brokenFlow } = context;
        let consequentBrokenFlow = false;
        if (this.consequent.shouldBeIncluded(context)) {
          this.consequent.include(context, false, { asSingleStatement: true });
          consequentBrokenFlow = context.brokenFlow;
          context.brokenFlow = brokenFlow;
        }
        if ((_a = this.alternate) == null ? void 0 : _a.shouldBeIncluded(context)) {
          this.alternate.include(context, false, { asSingleStatement: true });
          context.brokenFlow = context.brokenFlow && consequentBrokenFlow;
        }
      }
      renderHoistedDeclarations(hoistedDeclarations, code, getPropertyAccess) {
        const hoistedVariables = [
          ...new Set(hoistedDeclarations.map((identifier) => {
            const variable = identifier.variable;
            return variable.included ? variable.getName(getPropertyAccess) : "";
          }))
        ].filter(Boolean).join(", ");
        if (hoistedVariables) {
          const parentType = this.parent.type;
          const needsBraces = parentType !== Program$1 && parentType !== BlockStatement$1;
          code.prependRight(this.start, `${needsBraces ? "{ " : ""}var ${hoistedVariables}; `);
          if (needsBraces) {
            code.appendLeft(this.end, ` }`);
          }
        }
      }
      shouldKeepAlternateBranch() {
        let currentParent = this.parent;
        do {
          if (currentParent instanceof IfStatement && currentParent.alternate) {
            return true;
          }
          if (currentParent instanceof BlockStatement) {
            return false;
          }
          currentParent = currentParent.parent;
        } while (currentParent);
        return false;
      }
    };
    ImportAttribute = class extends NodeBase {
    };
    ImportDeclaration = class extends NodeBase {
      // Do not bind specifiers or assertions
      bind() {
      }
      hasEffects() {
        return false;
      }
      initialise() {
        this.context.addImport(this);
      }
      render(code, _options, nodeRenderOptions) {
        code.remove(nodeRenderOptions.start, nodeRenderOptions.end);
      }
      applyDeoptimizations() {
      }
    };
    ImportDeclaration.prototype.needsBoundaries = true;
    ImportDefaultSpecifier = class extends NodeBase {
      applyDeoptimizations() {
      }
    };
    INTEROP_DEFAULT_VARIABLE = "_interopDefault";
    INTEROP_DEFAULT_COMPAT_VARIABLE = "_interopDefaultCompat";
    INTEROP_NAMESPACE_VARIABLE = "_interopNamespace";
    INTEROP_NAMESPACE_COMPAT_VARIABLE = "_interopNamespaceCompat";
    INTEROP_NAMESPACE_DEFAULT_VARIABLE = "_interopNamespaceDefault";
    INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE = "_interopNamespaceDefaultOnly";
    MERGE_NAMESPACES_VARIABLE = "_mergeNamespaces";
    defaultInteropHelpersByInteropType = {
      auto: INTEROP_DEFAULT_VARIABLE,
      compat: INTEROP_DEFAULT_COMPAT_VARIABLE,
      default: null,
      defaultOnly: null,
      esModule: null
    };
    isDefaultAProperty = (interopType, externalLiveBindings) => interopType === "esModule" || externalLiveBindings && (interopType === "auto" || interopType === "compat");
    namespaceInteropHelpersByInteropType = {
      auto: INTEROP_NAMESPACE_VARIABLE,
      compat: INTEROP_NAMESPACE_COMPAT_VARIABLE,
      default: INTEROP_NAMESPACE_DEFAULT_VARIABLE,
      defaultOnly: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE,
      esModule: null
    };
    canDefaultBeTakenFromNamespace = (interopType, externalLiveBindings) => interopType !== "esModule" && isDefaultAProperty(interopType, externalLiveBindings);
    getHelpersBlock = (additionalHelpers, accessedGlobals, indent, snippets, liveBindings, freeze, namespaceToStringTag) => {
      const usedHelpers = new Set(additionalHelpers);
      for (const variable of HELPER_NAMES) {
        if (accessedGlobals.has(variable)) {
          usedHelpers.add(variable);
        }
      }
      return HELPER_NAMES.map((variable) => usedHelpers.has(variable) ? HELPER_GENERATORS[variable](indent, snippets, liveBindings, freeze, namespaceToStringTag, usedHelpers) : "").join("");
    };
    HELPER_GENERATORS = {
      [INTEROP_DEFAULT_COMPAT_VARIABLE](_t, snippets, liveBindings) {
        const { _, getDirectReturnFunction, n: n2 } = snippets;
        const [left, right] = getDirectReturnFunction(["e"], {
          functionReturn: true,
          lineBreakIndent: null,
          name: INTEROP_DEFAULT_COMPAT_VARIABLE
        });
        return `${left}${getIsCompatNamespace(snippets)}${_}?${_}${liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)}${right}${n2}${n2}`;
      },
      [INTEROP_DEFAULT_VARIABLE](_t, snippets, liveBindings) {
        const { _, getDirectReturnFunction, n: n2 } = snippets;
        const [left, right] = getDirectReturnFunction(["e"], {
          functionReturn: true,
          lineBreakIndent: null,
          name: INTEROP_DEFAULT_VARIABLE
        });
        return `${left}e${_}&&${_}e.__esModule${_}?${_}${liveBindings ? getDefaultLiveBinding(snippets) : getDefaultStatic(snippets)}${right}${n2}${n2}`;
      },
      [INTEROP_NAMESPACE_COMPAT_VARIABLE](t, snippets, liveBindings, freeze, namespaceToStringTag, usedHelpers) {
        const { _, getDirectReturnFunction, n: n2 } = snippets;
        if (usedHelpers.has(INTEROP_NAMESPACE_DEFAULT_VARIABLE)) {
          const [left, right] = getDirectReturnFunction(["e"], {
            functionReturn: true,
            lineBreakIndent: null,
            name: INTEROP_NAMESPACE_COMPAT_VARIABLE
          });
          return `${left}${getIsCompatNamespace(snippets)}${_}?${_}e${_}:${_}${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${right}${n2}${n2}`;
        }
        return `function ${INTEROP_NAMESPACE_COMPAT_VARIABLE}(e)${_}{${n2}${t}if${_}(${getIsCompatNamespace(snippets)})${_}return e;${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, namespaceToStringTag) + `}${n2}${n2}`;
      },
      [INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE](_t, snippets, _liveBindings, freeze, namespaceToStringTag) {
        const { getDirectReturnFunction, getObject, n: n2 } = snippets;
        const [left, right] = getDirectReturnFunction(["e"], {
          functionReturn: true,
          lineBreakIndent: null,
          name: INTEROP_NAMESPACE_DEFAULT_ONLY_VARIABLE
        });
        return `${left}${getFrozen(freeze, getWithToStringTag(namespaceToStringTag, getObject([
          ["__proto__", "null"],
          ["default", "e"]
        ], { lineBreakIndent: null }), snippets))}${right}${n2}${n2}`;
      },
      [INTEROP_NAMESPACE_DEFAULT_VARIABLE](t, snippets, liveBindings, freeze, namespaceToStringTag) {
        const { _, n: n2 } = snippets;
        return `function ${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${_}{${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, namespaceToStringTag) + `}${n2}${n2}`;
      },
      [INTEROP_NAMESPACE_VARIABLE](t, snippets, liveBindings, freeze, namespaceToStringTag, usedHelpers) {
        const { _, getDirectReturnFunction, n: n2 } = snippets;
        if (usedHelpers.has(INTEROP_NAMESPACE_DEFAULT_VARIABLE)) {
          const [left, right] = getDirectReturnFunction(["e"], {
            functionReturn: true,
            lineBreakIndent: null,
            name: INTEROP_NAMESPACE_VARIABLE
          });
          return `${left}e${_}&&${_}e.__esModule${_}?${_}e${_}:${_}${INTEROP_NAMESPACE_DEFAULT_VARIABLE}(e)${right}${n2}${n2}`;
        }
        return `function ${INTEROP_NAMESPACE_VARIABLE}(e)${_}{${n2}${t}if${_}(e${_}&&${_}e.__esModule)${_}return e;${n2}` + createNamespaceObject(t, t, snippets, liveBindings, freeze, namespaceToStringTag) + `}${n2}${n2}`;
      },
      [MERGE_NAMESPACES_VARIABLE](t, snippets, liveBindings, freeze, namespaceToStringTag) {
        const { _, cnst, n: n2 } = snippets;
        const useForEach = cnst === "var" && liveBindings;
        return `function ${MERGE_NAMESPACES_VARIABLE}(n, m)${_}{${n2}${t}${loopOverNamespaces(`{${n2}${t}${t}${t}if${_}(k${_}!==${_}'default'${_}&&${_}!(k in n))${_}{${n2}` + (liveBindings ? useForEach ? copyOwnPropertyLiveBinding : copyPropertyLiveBinding : copyPropertyStatic)(t, t + t + t + t, snippets) + `${t}${t}${t}}${n2}${t}${t}}`, useForEach, t, snippets)}${n2}${t}return ${getFrozen(freeze, getWithToStringTag(namespaceToStringTag, "n", snippets))};${n2}}${n2}${n2}`;
      }
    };
    getDefaultLiveBinding = ({ _, getObject }) => `e${_}:${_}${getObject([["default", "e"]], { lineBreakIndent: null })}`;
    getDefaultStatic = ({ _, getPropertyAccess }) => `e${getPropertyAccess("default")}${_}:${_}e`;
    getIsCompatNamespace = ({ _ }) => `e${_}&&${_}typeof e${_}===${_}'object'${_}&&${_}'default'${_}in e`;
    createNamespaceObject = (t, index, snippets, liveBindings, freeze, namespaceToStringTag) => {
      const { _, cnst, getObject, getPropertyAccess, n: n2, s } = snippets;
      const copyProperty = `{${n2}` + (liveBindings ? copyNonDefaultOwnPropertyLiveBinding : copyPropertyStatic)(t, index + t + t, snippets) + `${index}${t}}`;
      return `${index}${cnst} n${_}=${_}Object.create(null${namespaceToStringTag ? `,${_}{${_}[Symbol.toStringTag]:${_}${getToStringTagValue(getObject)}${_}}` : ""});${n2}${index}if${_}(e)${_}{${n2}${index}${t}${loopOverKeys(copyProperty, !liveBindings, snippets)}${n2}${index}}${n2}${index}n${getPropertyAccess("default")}${_}=${_}e;${n2}${index}return ${getFrozen(freeze, "n")}${s}${n2}`;
    };
    loopOverKeys = (body, allowVariableLoopVariable, { _, cnst, getFunctionIntro, s }) => cnst !== "var" || allowVariableLoopVariable ? `for${_}(${cnst} k in e)${_}${body}` : `Object.keys(e).forEach(${getFunctionIntro(["k"], {
      isAsync: false,
      name: null
    })}${body})${s}`;
    loopOverNamespaces = (body, useForEach, t, { _, cnst, getDirectReturnFunction, getFunctionIntro, n: n2 }) => {
      if (useForEach) {
        const [left, right] = getDirectReturnFunction(["e"], {
          functionReturn: false,
          lineBreakIndent: { base: t, t },
          name: null
        });
        return `m.forEach(${left}e${_}&&${_}typeof e${_}!==${_}'string'${_}&&${_}!Array.isArray(e)${_}&&${_}Object.keys(e).forEach(${getFunctionIntro(["k"], {
          isAsync: false,
          name: null
        })}${body})${right});`;
      }
      return `for${_}(var i${_}=${_}0;${_}i${_}<${_}m.length;${_}i++)${_}{${n2}${t}${t}${cnst} e${_}=${_}m[i];${n2}${t}${t}if${_}(typeof e${_}!==${_}'string'${_}&&${_}!Array.isArray(e))${_}{${_}for${_}(${cnst} k in e)${_}${body}${_}}${n2}${t}}`;
    };
    copyNonDefaultOwnPropertyLiveBinding = (t, index, snippets) => {
      const { _, n: n2 } = snippets;
      return `${index}if${_}(k${_}!==${_}'default')${_}{${n2}` + copyOwnPropertyLiveBinding(t, index + t, snippets) + `${index}}${n2}`;
    };
    copyOwnPropertyLiveBinding = (t, index, { _, cnst, getDirectReturnFunction, n: n2 }) => {
      const [left, right] = getDirectReturnFunction([], {
        functionReturn: true,
        lineBreakIndent: null,
        name: null
      });
      return `${index}${cnst} d${_}=${_}Object.getOwnPropertyDescriptor(e,${_}k);${n2}${index}Object.defineProperty(n,${_}k,${_}d.get${_}?${_}d${_}:${_}{${n2}${index}${t}enumerable:${_}true,${n2}${index}${t}get:${_}${left}e[k]${right}${n2}${index}});${n2}`;
    };
    copyPropertyLiveBinding = (t, index, { _, cnst, getDirectReturnFunction, n: n2 }) => {
      const [left, right] = getDirectReturnFunction([], {
        functionReturn: true,
        lineBreakIndent: null,
        name: null
      });
      return `${index}${cnst} d${_}=${_}Object.getOwnPropertyDescriptor(e,${_}k);${n2}${index}if${_}(d)${_}{${n2}${index}${t}Object.defineProperty(n,${_}k,${_}d.get${_}?${_}d${_}:${_}{${n2}${index}${t}${t}enumerable:${_}true,${n2}${index}${t}${t}get:${_}${left}e[k]${right}${n2}${index}${t}});${n2}${index}}${n2}`;
    };
    copyPropertyStatic = (_t, index, { _, n: n2 }) => `${index}n[k]${_}=${_}e[k];${n2}`;
    getFrozen = (freeze, fragment) => freeze ? `Object.freeze(${fragment})` : fragment;
    getWithToStringTag = (namespaceToStringTag, fragment, { _, getObject }) => namespaceToStringTag ? `Object.defineProperty(${fragment},${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)})` : fragment;
    HELPER_NAMES = Object.keys(HELPER_GENERATORS);
    VariableDeclarator = class extends NodeBase {
      declareDeclarator(kind) {
        this.id.declare(kind, this.init || UNDEFINED_EXPRESSION);
      }
      deoptimizePath(path2) {
        this.id.deoptimizePath(path2);
      }
      hasEffects(context) {
        var _a;
        if (!this.deoptimized)
          this.applyDeoptimizations();
        const initEffect = (_a = this.init) == null ? void 0 : _a.hasEffects(context);
        this.id.markDeclarationReached();
        return initEffect || this.id.hasEffects(context);
      }
      include(context, includeChildrenRecursively) {
        const { deoptimized, id, init: init2 } = this;
        if (!deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        init2 == null ? void 0 : init2.include(context, includeChildrenRecursively);
        id.markDeclarationReached();
        if (includeChildrenRecursively || id.shouldBeIncluded(context)) {
          id.include(context, includeChildrenRecursively);
        }
      }
      render(code, options) {
        const { exportNamesByVariable, snippets: { _, getPropertyAccess } } = options;
        const { end, id, init: init2, start } = this;
        const renderId = id.included;
        if (renderId) {
          id.render(code, options);
        } else {
          const operatorPos = findFirstOccurrenceOutsideComment(code.original, "=", id.end);
          code.remove(start, findNonWhiteSpace(code.original, operatorPos + 1));
        }
        if (init2) {
          if (id instanceof Identifier && init2 instanceof ClassExpression && !init2.id) {
            const renderedVariable = id.variable.getName(getPropertyAccess);
            if (renderedVariable !== id.name) {
              code.appendLeft(init2.start + 5, ` ${id.name}`);
            }
          }
          init2.render(code, options, renderId ? BLANK : { renderedSurroundingElement: ExpressionStatement$1 });
        } else if (id instanceof Identifier && isReassignedExportsMember(id.variable, exportNamesByVariable)) {
          code.appendLeft(end, `${_}=${_}void 0`);
        }
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        const { id, init: init2 } = this;
        if (init2 && id instanceof Identifier && init2 instanceof ClassExpression && !init2.id) {
          const { name, variable } = id;
          for (const accessedVariable of init2.scope.accessedOutsideVariables.values()) {
            if (accessedVariable !== variable) {
              accessedVariable.forbidName(name);
            }
          }
        }
      }
    };
    ImportExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.inlineNamespace = null;
        this.assertions = null;
        this.mechanism = null;
        this.namespaceExportName = void 0;
        this.resolution = null;
        this.resolutionString = null;
      }
      // Do not bind assertions
      bind() {
        this.source.bind();
      }
      /**
       * Get imported variables for deterministic usage, valid cases are:
       *
       * - `const { foo } = await import('bar')`.
       * - `(await import('bar')).foo`
       * - `import('bar').then(({ foo }) => {})`
       *
       * Returns empty array if it's side-effect only import.
       * Returns undefined if it's not fully deterministic.
       */
      getDeterministicImportedNames() {
        const parent1 = this.parent;
        if (parent1 instanceof ExpressionStatement) {
          return EMPTY_ARRAY;
        }
        if (parent1 instanceof AwaitExpression) {
          const parent2 = parent1.parent;
          if (parent2 instanceof ExpressionStatement) {
            return EMPTY_ARRAY;
          }
          if (parent2 instanceof VariableDeclarator) {
            const declaration = parent2.id;
            return declaration instanceof ObjectPattern ? getDeterministicObjectDestructure(declaration) : void 0;
          }
          if (parent2 instanceof MemberExpression) {
            const id = parent2.property;
            if (!parent2.computed && id instanceof Identifier) {
              return [id.name];
            }
          }
          return;
        }
        if (parent1 instanceof MemberExpression) {
          const callExpression = parent1.parent;
          const property = parent1.property;
          if (!(callExpression instanceof CallExpression) || !(property instanceof Identifier)) {
            return;
          }
          const memberName = property.name;
          if (callExpression.parent instanceof ExpressionStatement && ["catch", "finally"].includes(memberName)) {
            return EMPTY_ARRAY;
          }
          if (memberName !== "then")
            return;
          if (callExpression.arguments.length === 0) {
            return EMPTY_ARRAY;
          }
          const argument = callExpression.arguments[0];
          if (callExpression.arguments.length !== 1 || !(argument instanceof ArrowFunctionExpression || argument instanceof FunctionExpression)) {
            return;
          }
          if (argument.params.length === 0) {
            return EMPTY_ARRAY;
          }
          const declaration = argument.params[0];
          if (argument.params.length === 1 && declaration instanceof ObjectPattern) {
            return getDeterministicObjectDestructure(declaration);
          }
          return;
        }
      }
      hasEffects() {
        return true;
      }
      include(context, includeChildrenRecursively) {
        if (!this.included) {
          this.included = true;
          this.context.includeDynamicImport(this);
          this.scope.addAccessedDynamicImport(this);
        }
        this.source.include(context, includeChildrenRecursively);
      }
      initialise() {
        this.context.addDynamicImport(this);
      }
      parseNode(esTreeNode) {
        super.parseNode(esTreeNode, ["source"]);
      }
      render(code, options) {
        const { snippets: { _, getDirectReturnFunction, getObject, getPropertyAccess } } = options;
        if (this.inlineNamespace) {
          const [left, right] = getDirectReturnFunction([], {
            functionReturn: true,
            lineBreakIndent: null,
            name: null
          });
          code.overwrite(this.start, this.end, `Promise.resolve().then(${left}${this.inlineNamespace.getName(getPropertyAccess)}${right})`);
          return;
        }
        if (this.mechanism) {
          code.overwrite(this.start, findFirstOccurrenceOutsideComment(code.original, "(", this.start + 6) + 1, this.mechanism.left);
          code.overwrite(this.end - 1, this.end, this.mechanism.right);
        }
        if (this.resolutionString) {
          code.overwrite(this.source.start, this.source.end, this.resolutionString);
          if (this.namespaceExportName) {
            const [left, right] = getDirectReturnFunction(["n"], {
              functionReturn: true,
              lineBreakIndent: null,
              name: null
            });
            code.prependLeft(this.end, `.then(${left}n.${this.namespaceExportName}${right})`);
          }
        } else {
          this.source.render(code, options);
        }
        if (this.assertions !== true) {
          if (this.arguments) {
            code.overwrite(this.source.end, this.end - 1, "", { contentOnly: true });
          }
          if (this.assertions) {
            code.appendLeft(this.end - 1, `,${_}${getObject([["assert", this.assertions]], {
              lineBreakIndent: null
            })}`);
          }
        }
      }
      setExternalResolution(exportMode, resolution, options, snippets, pluginDriver, accessedGlobalsByScope, resolutionString, namespaceExportName, assertions) {
        const { format } = options;
        this.inlineNamespace = null;
        this.resolution = resolution;
        this.resolutionString = resolutionString;
        this.namespaceExportName = namespaceExportName;
        this.assertions = assertions;
        const accessedGlobals = [...accessedImportGlobals[format] || []];
        let helper;
        ({ helper, mechanism: this.mechanism } = this.getDynamicImportMechanismAndHelper(resolution, exportMode, options, snippets, pluginDriver));
        if (helper) {
          accessedGlobals.push(helper);
        }
        if (accessedGlobals.length > 0) {
          this.scope.addAccessedGlobals(accessedGlobals, accessedGlobalsByScope);
        }
      }
      setInternalResolution(inlineNamespace) {
        this.inlineNamespace = inlineNamespace;
      }
      applyDeoptimizations() {
      }
      getDynamicImportMechanismAndHelper(resolution, exportMode, { compact, dynamicImportFunction, dynamicImportInCjs, format, generatedCode: { arrowFunctions }, interop }, { _, getDirectReturnFunction, getDirectReturnIifeLeft }, pluginDriver) {
        const mechanism = pluginDriver.hookFirstSync("renderDynamicImport", [
          {
            customResolution: typeof this.resolution === "string" ? this.resolution : null,
            format,
            moduleId: this.context.module.id,
            targetModuleId: this.resolution && typeof this.resolution !== "string" ? this.resolution.id : null
          }
        ]);
        if (mechanism) {
          return { helper: null, mechanism };
        }
        const hasDynamicTarget = !this.resolution || typeof this.resolution === "string";
        switch (format) {
          case "cjs": {
            if (dynamicImportInCjs && (!resolution || typeof resolution === "string" || resolution instanceof ExternalModule)) {
              return { helper: null, mechanism: null };
            }
            const helper = getInteropHelper(resolution, exportMode, interop);
            let left = `require(`;
            let right = `)`;
            if (helper) {
              left = `/*#__PURE__*/${helper}(${left}`;
              right += ")";
            }
            const [functionLeft, functionRight] = getDirectReturnFunction([], {
              functionReturn: true,
              lineBreakIndent: null,
              name: null
            });
            left = `Promise.resolve().then(${functionLeft}${left}`;
            right += `${functionRight})`;
            if (!arrowFunctions && hasDynamicTarget) {
              left = getDirectReturnIifeLeft(["t"], `${left}t${right}`, {
                needsArrowReturnParens: false,
                needsWrappedFunction: true
              });
              right = ")";
            }
            return {
              helper,
              mechanism: { left, right }
            };
          }
          case "amd": {
            const resolve2 = compact ? "c" : "resolve";
            const reject = compact ? "e" : "reject";
            const helper = getInteropHelper(resolution, exportMode, interop);
            const [resolveLeft, resolveRight] = getDirectReturnFunction(["m"], {
              functionReturn: false,
              lineBreakIndent: null,
              name: null
            });
            const resolveNamespace = helper ? `${resolveLeft}${resolve2}(/*#__PURE__*/${helper}(m))${resolveRight}` : resolve2;
            const [handlerLeft, handlerRight] = getDirectReturnFunction([resolve2, reject], {
              functionReturn: false,
              lineBreakIndent: null,
              name: null
            });
            let left = `new Promise(${handlerLeft}require([`;
            let right = `],${_}${resolveNamespace},${_}${reject})${handlerRight})`;
            if (!arrowFunctions && hasDynamicTarget) {
              left = getDirectReturnIifeLeft(["t"], `${left}t${right}`, {
                needsArrowReturnParens: false,
                needsWrappedFunction: true
              });
              right = ")";
            }
            return {
              helper,
              mechanism: { left, right }
            };
          }
          case "system": {
            return {
              helper: null,
              mechanism: {
                left: "module.import(",
                right: ")"
              }
            };
          }
          case "es": {
            if (dynamicImportFunction) {
              return {
                helper: null,
                mechanism: {
                  left: `${dynamicImportFunction}(`,
                  right: ")"
                }
              };
            }
          }
        }
        return { helper: null, mechanism: null };
      }
    };
    accessedImportGlobals = {
      amd: ["require"],
      cjs: ["require"],
      system: ["module"]
    };
    ImportNamespaceSpecifier = class extends NodeBase {
      applyDeoptimizations() {
      }
    };
    ImportSpecifier = class extends NodeBase {
      applyDeoptimizations() {
      }
    };
    LabeledStatement = class extends NodeBase {
      hasEffects(context) {
        const brokenFlow = context.brokenFlow;
        context.ignore.labels.add(this.label.name);
        if (this.body.hasEffects(context))
          return true;
        context.ignore.labels.delete(this.label.name);
        if (context.includedLabels.has(this.label.name)) {
          context.includedLabels.delete(this.label.name);
          context.brokenFlow = brokenFlow;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        const brokenFlow = context.brokenFlow;
        this.body.include(context, includeChildrenRecursively);
        if (includeChildrenRecursively || context.includedLabels.has(this.label.name)) {
          this.label.include();
          context.includedLabels.delete(this.label.name);
          context.brokenFlow = brokenFlow;
        }
      }
      render(code, options) {
        if (this.label.included) {
          this.label.render(code, options);
        } else {
          code.remove(this.start, findNonWhiteSpace(code.original, findFirstOccurrenceOutsideComment(code.original, ":", this.label.end) + 1));
        }
        this.body.render(code, options);
      }
    };
    LogicalExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.expressionsToBeDeoptimized = [];
        this.isBranchResolutionAnalysed = false;
        this.usedBranch = null;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.left.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
        this.right.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizeCache() {
        if (this.usedBranch) {
          const unusedBranch = this.usedBranch === this.left ? this.right : this.left;
          this.usedBranch = null;
          unusedBranch.deoptimizePath(UNKNOWN_PATH);
          const { context, expressionsToBeDeoptimized } = this;
          this.expressionsToBeDeoptimized = EMPTY_ARRAY;
          for (const expression of expressionsToBeDeoptimized) {
            expression.deoptimizeCache();
          }
          context.requestTreeshakingPass();
        }
      }
      deoptimizePath(path2) {
        const usedBranch = this.getUsedBranch();
        if (usedBranch) {
          usedBranch.deoptimizePath(path2);
        } else {
          this.left.deoptimizePath(path2);
          this.right.deoptimizePath(path2);
        }
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch)
          return UnknownValue;
        this.expressionsToBeDeoptimized.push(origin);
        return usedBranch.getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch)
          return [
            new MultiExpression([
              this.left.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0],
              this.right.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin)[0]
            ]),
            false
          ];
        this.expressionsToBeDeoptimized.push(origin);
        return usedBranch.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffects(context) {
        if (this.left.hasEffects(context)) {
          return true;
        }
        if (this.getUsedBranch() !== this.left) {
          return this.right.hasEffects(context);
        }
        return false;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        const usedBranch = this.getUsedBranch();
        if (!usedBranch) {
          return this.left.hasEffectsOnInteractionAtPath(path2, interaction, context) || this.right.hasEffectsOnInteractionAtPath(path2, interaction, context);
        }
        return usedBranch.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        const usedBranch = this.getUsedBranch();
        if (includeChildrenRecursively || usedBranch === this.right && this.left.shouldBeIncluded(context) || !usedBranch) {
          this.left.include(context, includeChildrenRecursively);
          this.right.include(context, includeChildrenRecursively);
        } else {
          usedBranch.include(context, includeChildrenRecursively);
        }
      }
      render(code, options, { isCalleeOfRenderedParent, preventASI, renderedParentType, renderedSurroundingElement } = BLANK) {
        if (!this.left.included || !this.right.included) {
          const operatorPos = findFirstOccurrenceOutsideComment(code.original, this.operator, this.left.end);
          if (this.right.included) {
            const removePos = findNonWhiteSpace(code.original, operatorPos + 2);
            code.remove(this.start, removePos);
            if (preventASI) {
              removeLineBreaks(code, removePos, this.right.start);
            }
          } else {
            code.remove(operatorPos, this.end);
          }
          removeAnnotations(this, code);
          this.getUsedBranch().render(code, options, {
            isCalleeOfRenderedParent,
            preventASI,
            renderedParentType: renderedParentType || this.parent.type,
            renderedSurroundingElement: renderedSurroundingElement || this.parent.type
          });
        } else {
          this.left.render(code, options, {
            preventASI,
            renderedSurroundingElement
          });
          this.right.render(code, options);
        }
      }
      getUsedBranch() {
        if (!this.isBranchResolutionAnalysed) {
          this.isBranchResolutionAnalysed = true;
          const leftValue = this.left.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
          if (typeof leftValue === "symbol") {
            return null;
          } else {
            this.usedBranch = this.operator === "||" && leftValue || this.operator === "&&" && !leftValue || this.operator === "??" && leftValue != null ? this.left : this.right;
          }
        }
        return this.usedBranch;
      }
    };
    FILE_PREFIX = "ROLLUP_FILE_URL_";
    IMPORT = "import";
    MetaProperty = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.metaProperty = null;
        this.preliminaryChunkId = null;
        this.referenceId = null;
      }
      getReferencedFileName(outputPluginDriver) {
        const { meta: { name }, metaProperty } = this;
        if (name === IMPORT && (metaProperty == null ? void 0 : metaProperty.startsWith(FILE_PREFIX))) {
          return outputPluginDriver.getFileName(metaProperty.slice(FILE_PREFIX.length));
        }
        return null;
      }
      hasEffects() {
        return false;
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return path2.length > 1 || type !== INTERACTION_ACCESSED;
      }
      include() {
        if (!this.included) {
          this.included = true;
          if (this.meta.name === IMPORT) {
            this.context.addImportMeta(this);
            const parent = this.parent;
            const metaProperty = this.metaProperty = parent instanceof MemberExpression && typeof parent.propertyKey === "string" ? parent.propertyKey : null;
            if (metaProperty == null ? void 0 : metaProperty.startsWith(FILE_PREFIX)) {
              this.referenceId = metaProperty.slice(FILE_PREFIX.length);
            }
          }
        }
      }
      render(code, { format, pluginDriver, snippets }) {
        var _a;
        const { context: { module: { id: moduleId } }, meta: { name }, metaProperty, parent, preliminaryChunkId, referenceId, start, end } = this;
        if (name !== IMPORT)
          return;
        const chunkId = preliminaryChunkId;
        if (referenceId) {
          const fileName = pluginDriver.getFileName(referenceId);
          const relativePath = normalize((0, import_node_path.relative)((0, import_node_path.dirname)(chunkId), fileName));
          const replacement2 = pluginDriver.hookFirstSync("resolveFileUrl", [
            { chunkId, fileName, format, moduleId, referenceId, relativePath }
          ]) || relativeUrlMechanisms[format](relativePath);
          code.overwrite(parent.start, parent.end, replacement2, { contentOnly: true });
          return;
        }
        const replacement = pluginDriver.hookFirstSync("resolveImportMeta", [
          metaProperty,
          { chunkId, format, moduleId }
        ]) || ((_a = importMetaMechanisms[format]) == null ? void 0 : _a.call(importMetaMechanisms, metaProperty, { chunkId, snippets }));
        if (typeof replacement === "string") {
          if (parent instanceof MemberExpression) {
            code.overwrite(parent.start, parent.end, replacement, { contentOnly: true });
          } else {
            code.overwrite(start, end, replacement, { contentOnly: true });
          }
        }
      }
      setResolution(format, accessedGlobalsByScope, preliminaryChunkId) {
        var _a;
        this.preliminaryChunkId = preliminaryChunkId;
        const accessedGlobals = (((_a = this.metaProperty) == null ? void 0 : _a.startsWith(FILE_PREFIX)) ? accessedFileUrlGlobals : accessedMetaUrlGlobals)[format];
        if (accessedGlobals.length > 0) {
          this.scope.addAccessedGlobals(accessedGlobals, accessedGlobalsByScope);
        }
      }
    };
    accessedMetaUrlGlobals = {
      amd: ["document", "module", "URL"],
      cjs: ["document", "require", "URL"],
      es: [],
      iife: ["document", "URL"],
      system: ["module"],
      umd: ["document", "require", "URL"]
    };
    accessedFileUrlGlobals = {
      amd: ["document", "require", "URL"],
      cjs: ["document", "require", "URL"],
      es: [],
      iife: ["document", "URL"],
      system: ["module", "URL"],
      umd: ["document", "require", "URL"]
    };
    getResolveUrl = (path2, URL2 = "URL") => `new ${URL2}(${path2}).href`;
    getRelativeUrlFromDocument = (relativePath, umd2 = false) => getResolveUrl(`'${escapeId(relativePath)}', ${umd2 ? `typeof document === 'undefined' ? location.href : ` : ""}document.currentScript && document.currentScript.src || document.baseURI`);
    getGenericImportMetaMechanism = (getUrl) => (property, { chunkId }) => {
      const urlMechanism = getUrl(chunkId);
      return property === null ? `({ url: ${urlMechanism} })` : property === "url" ? urlMechanism : "undefined";
    };
    getFileUrlFromFullPath = (path2) => `require('u' + 'rl').pathToFileURL(${path2}).href`;
    getFileUrlFromRelativePath = (path2) => getFileUrlFromFullPath(`__dirname + '/${path2}'`);
    getUrlFromDocument = (chunkId, umd2 = false) => `${umd2 ? `typeof document === 'undefined' ? location.href : ` : ""}(document.currentScript && document.currentScript.src || new URL('${escapeId(chunkId)}', document.baseURI).href)`;
    relativeUrlMechanisms = {
      amd: (relativePath) => {
        if (relativePath[0] !== ".")
          relativePath = "./" + relativePath;
        return getResolveUrl(`require.toUrl('${relativePath}'), document.baseURI`);
      },
      cjs: (relativePath) => `(typeof document === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath)})`,
      es: (relativePath) => getResolveUrl(`'${relativePath}', import.meta.url`),
      iife: (relativePath) => getRelativeUrlFromDocument(relativePath),
      system: (relativePath) => getResolveUrl(`'${relativePath}', module.meta.url`),
      umd: (relativePath) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath, true)})`
    };
    importMetaMechanisms = {
      amd: getGenericImportMetaMechanism(() => getResolveUrl(`module.uri, document.baseURI`)),
      cjs: getGenericImportMetaMechanism((chunkId) => `(typeof document === 'undefined' ? ${getFileUrlFromFullPath("__filename")} : ${getUrlFromDocument(chunkId)})`),
      iife: getGenericImportMetaMechanism((chunkId) => getUrlFromDocument(chunkId)),
      system: (property, { snippets: { getPropertyAccess } }) => property === null ? `module.meta` : `module.meta${getPropertyAccess(property)}`,
      umd: getGenericImportMetaMechanism((chunkId) => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${getFileUrlFromFullPath("__filename")} : ${getUrlFromDocument(chunkId, true)})`)
    };
    NewExpression = class extends NodeBase {
      hasEffects(context) {
        try {
          for (const argument of this.arguments) {
            if (argument.hasEffects(context))
              return true;
          }
          if (this.context.options.treeshake.annotations && this.annotations) {
            return false;
          }
          return this.callee.hasEffects(context) || this.callee.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
        } finally {
          if (!this.deoptimized)
            this.applyDeoptimizations();
        }
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return path2.length > 0 || type !== INTERACTION_ACCESSED;
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (includeChildrenRecursively) {
          super.include(context, includeChildrenRecursively);
        } else {
          this.included = true;
          this.callee.include(context, false);
        }
        this.callee.includeCallArguments(context, this.arguments);
      }
      initialise() {
        this.interaction = {
          args: [null, ...this.arguments],
          type: INTERACTION_CALLED,
          withNew: true
        };
      }
      render(code, options) {
        this.callee.render(code, options);
        renderCallArguments(code, options, this);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.callee.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
        this.context.requestTreeshakingPass();
      }
    };
    ObjectExpression = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.objectEntity = null;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.getObjectEntity().deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizeCache() {
        this.getObjectEntity().deoptimizeAllProperties();
      }
      deoptimizePath(path2) {
        this.getObjectEntity().deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.getObjectEntity().getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.getObjectEntity().getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return this.getObjectEntity().hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      render(code, options, { renderedSurroundingElement } = BLANK) {
        super.render(code, options);
        if (renderedSurroundingElement === ExpressionStatement$1 || renderedSurroundingElement === ArrowFunctionExpression$1) {
          code.appendRight(this.start, "(");
          code.prependLeft(this.end, ")");
        }
      }
      applyDeoptimizations() {
      }
      getObjectEntity() {
        if (this.objectEntity !== null) {
          return this.objectEntity;
        }
        let prototype = OBJECT_PROTOTYPE;
        const properties = [];
        for (const property of this.properties) {
          if (property instanceof SpreadElement) {
            properties.push({ key: UnknownKey, kind: "init", property });
            continue;
          }
          let key;
          if (property.computed) {
            const keyValue = property.key.getLiteralValueAtPath(EMPTY_PATH, SHARED_RECURSION_TRACKER, this);
            if (typeof keyValue === "symbol") {
              properties.push({ key: UnknownKey, kind: property.kind, property });
              continue;
            } else {
              key = String(keyValue);
            }
          } else {
            key = property.key instanceof Identifier ? property.key.name : String(property.key.value);
            if (key === "__proto__" && property.kind === "init") {
              prototype = property.value instanceof Literal && property.value.value === null ? null : property.value;
              continue;
            }
          }
          properties.push({ key, kind: property.kind, property });
        }
        return this.objectEntity = new ObjectEntity(properties, prototype);
      }
    };
    PrivateIdentifier = class extends NodeBase {
    };
    Program = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.hasCachedEffect = null;
        this.hasLoggedEffect = false;
      }
      hasCachedEffects() {
        if (!this.included) {
          return false;
        }
        return this.hasCachedEffect === null ? this.hasCachedEffect = this.hasEffects(createHasEffectsContext()) : this.hasCachedEffect;
      }
      hasEffects(context) {
        for (const node of this.body) {
          if (node.hasEffects(context)) {
            if (this.context.options.experimentalLogSideEffects && !this.hasLoggedEffect) {
              this.hasLoggedEffect = true;
              const { code, module } = this.context;
              const { line, column } = locate(code, node.start, { offsetLine: 1 });
              console.log(`First side effect in ${relativeId(module.id)} is at (${line}:${column})
${getCodeFrame(code, line, column)}`);
              try {
                const { column: originalColumn, line: originalLine } = getOriginalLocation(module.sourcemapChain, { column, line });
                if (originalLine !== line) {
                  console.log(`Original location is at (${originalLine}:${originalColumn})
${getCodeFrame(module.originalCode, originalLine, originalColumn)}
`);
                }
              } catch {
              }
              console.log();
            }
            return this.hasCachedEffect = true;
          }
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        for (const node of this.body) {
          if (includeChildrenRecursively || node.shouldBeIncluded(context)) {
            node.include(context, includeChildrenRecursively);
          }
        }
      }
      render(code, options) {
        let start = this.start;
        if (code.original.startsWith("#!")) {
          start = Math.min(code.original.indexOf("\n") + 1, this.end);
          code.remove(0, start);
        }
        if (this.body.length > 0) {
          renderStatementList(this.body, code, start, this.end, options);
        } else {
          super.render(code, options);
        }
      }
      applyDeoptimizations() {
      }
    };
    Property = class extends MethodBase {
      constructor() {
        super(...arguments);
        this.declarationInit = null;
      }
      declare(kind, init2) {
        this.declarationInit = init2;
        return this.value.declare(kind, UNKNOWN_EXPRESSION);
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        const propertyReadSideEffects = this.context.options.treeshake.propertyReadSideEffects;
        return this.parent.type === "ObjectPattern" && propertyReadSideEffects === "always" || this.key.hasEffects(context) || this.value.hasEffects(context);
      }
      markDeclarationReached() {
        this.value.markDeclarationReached();
      }
      render(code, options) {
        if (!this.shorthand) {
          this.key.render(code, options);
        }
        this.value.render(code, options, { isShorthandProperty: this.shorthand });
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        if (this.declarationInit !== null) {
          this.declarationInit.deoptimizePath([UnknownKey, UnknownKey]);
          this.context.requestTreeshakingPass();
        }
      }
    };
    PropertyDefinition = class extends NodeBase {
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        var _a;
        (_a = this.value) == null ? void 0 : _a.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        var _a;
        (_a = this.value) == null ? void 0 : _a.deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.value ? this.value.getLiteralValueAtPath(path2, recursionTracker, origin) : UnknownValue;
      }
      getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) {
        return this.value ? this.value.getReturnExpressionWhenCalledAtPath(path2, interaction, recursionTracker, origin) : UNKNOWN_RETURN_EXPRESSION;
      }
      hasEffects(context) {
        var _a;
        return this.key.hasEffects(context) || this.static && !!((_a = this.value) == null ? void 0 : _a.hasEffects(context));
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return !this.value || this.value.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      applyDeoptimizations() {
      }
    };
    ReturnStatement = class extends NodeBase {
      hasEffects(context) {
        var _a;
        if (!context.ignore.returnYield || ((_a = this.argument) == null ? void 0 : _a.hasEffects(context)))
          return true;
        context.brokenFlow = true;
        return false;
      }
      include(context, includeChildrenRecursively) {
        var _a;
        this.included = true;
        (_a = this.argument) == null ? void 0 : _a.include(context, includeChildrenRecursively);
        context.brokenFlow = true;
      }
      initialise() {
        this.scope.addReturnExpression(this.argument || UNKNOWN_EXPRESSION);
      }
      render(code, options) {
        if (this.argument) {
          this.argument.render(code, options, { preventASI: true });
          if (this.argument.start === this.start + 6) {
            code.prependLeft(this.start + 6, " ");
          }
        }
      }
    };
    SequenceExpression = class extends NodeBase {
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.expressions[this.expressions.length - 1].deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        this.expressions[this.expressions.length - 1].deoptimizePath(path2);
      }
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(path2, recursionTracker, origin);
      }
      hasEffects(context) {
        for (const expression of this.expressions) {
          if (expression.hasEffects(context))
            return true;
        }
        return false;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        return this.expressions[this.expressions.length - 1].hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        const lastExpression = this.expressions[this.expressions.length - 1];
        for (const expression of this.expressions) {
          if (includeChildrenRecursively || expression === lastExpression && !(this.parent instanceof ExpressionStatement) || expression.shouldBeIncluded(context))
            expression.include(context, includeChildrenRecursively);
        }
      }
      render(code, options, { renderedParentType, isCalleeOfRenderedParent, preventASI } = BLANK) {
        let includedNodes = 0;
        let lastSeparatorPos = null;
        const lastNode = this.expressions[this.expressions.length - 1];
        for (const { node, separator, start, end } of getCommaSeparatedNodesWithBoundaries(this.expressions, code, this.start, this.end)) {
          if (!node.included) {
            treeshakeNode(node, code, start, end);
            continue;
          }
          includedNodes++;
          lastSeparatorPos = separator;
          if (includedNodes === 1 && preventASI) {
            removeLineBreaks(code, start, node.start);
          }
          if (includedNodes === 1) {
            const parentType = renderedParentType || this.parent.type;
            node.render(code, options, {
              isCalleeOfRenderedParent: isCalleeOfRenderedParent && node === lastNode,
              renderedParentType: parentType,
              renderedSurroundingElement: parentType
            });
          } else {
            node.render(code, options);
          }
        }
        if (lastSeparatorPos) {
          code.remove(lastSeparatorPos, this.end);
        }
      }
    };
    StaticBlock = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new BlockScope(parentScope);
      }
      hasEffects(context) {
        for (const node of this.body) {
          if (node.hasEffects(context))
            return true;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        for (const node of this.body) {
          if (includeChildrenRecursively || node.shouldBeIncluded(context))
            node.include(context, includeChildrenRecursively);
        }
      }
      render(code, options) {
        if (this.body.length > 0) {
          const bodyStartPos = findFirstOccurrenceOutsideComment(code.original.slice(this.start, this.end), "{") + 1;
          renderStatementList(this.body, code, this.start + bodyStartPos, this.end - 1, options);
        } else {
          super.render(code, options);
        }
      }
    };
    Super = class extends NodeBase {
      bind() {
        this.variable = this.scope.findVariable("this");
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        this.variable.deoptimizePath(path2);
      }
      include() {
        if (!this.included) {
          this.included = true;
          this.context.includeVariableInModule(this.variable);
        }
      }
    };
    SwitchCase = class extends NodeBase {
      hasEffects(context) {
        var _a;
        if ((_a = this.test) == null ? void 0 : _a.hasEffects(context))
          return true;
        for (const node of this.consequent) {
          if (context.brokenFlow)
            break;
          if (node.hasEffects(context))
            return true;
        }
        return false;
      }
      include(context, includeChildrenRecursively) {
        var _a;
        this.included = true;
        (_a = this.test) == null ? void 0 : _a.include(context, includeChildrenRecursively);
        for (const node of this.consequent) {
          if (includeChildrenRecursively || node.shouldBeIncluded(context))
            node.include(context, includeChildrenRecursively);
        }
      }
      render(code, options, nodeRenderOptions) {
        if (this.consequent.length > 0) {
          this.test && this.test.render(code, options);
          const testEnd = this.test ? this.test.end : findFirstOccurrenceOutsideComment(code.original, "default", this.start) + 7;
          const consequentStart = findFirstOccurrenceOutsideComment(code.original, ":", testEnd) + 1;
          renderStatementList(this.consequent, code, consequentStart, nodeRenderOptions.end, options);
        } else {
          super.render(code, options);
        }
      }
    };
    SwitchCase.prototype.needsBoundaries = true;
    SwitchStatement = class extends NodeBase {
      createScope(parentScope) {
        this.scope = new BlockScope(parentScope);
      }
      hasEffects(context) {
        if (this.discriminant.hasEffects(context))
          return true;
        const { brokenFlow, hasBreak, ignore: ignore2 } = context;
        const { breaks } = ignore2;
        ignore2.breaks = true;
        context.hasBreak = false;
        let onlyHasBrokenFlow = true;
        for (const switchCase of this.cases) {
          if (switchCase.hasEffects(context))
            return true;
          onlyHasBrokenFlow && (onlyHasBrokenFlow = context.brokenFlow && !context.hasBreak);
          context.hasBreak = false;
          context.brokenFlow = brokenFlow;
        }
        if (this.defaultCase !== null) {
          context.brokenFlow = onlyHasBrokenFlow;
        }
        ignore2.breaks = breaks;
        context.hasBreak = hasBreak;
        return false;
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        this.discriminant.include(context, includeChildrenRecursively);
        const { brokenFlow, hasBreak } = context;
        context.hasBreak = false;
        let onlyHasBrokenFlow = true;
        let isCaseIncluded = includeChildrenRecursively || this.defaultCase !== null && this.defaultCase < this.cases.length - 1;
        for (let caseIndex = this.cases.length - 1; caseIndex >= 0; caseIndex--) {
          const switchCase = this.cases[caseIndex];
          if (switchCase.included) {
            isCaseIncluded = true;
          }
          if (!isCaseIncluded) {
            const hasEffectsContext = createHasEffectsContext();
            hasEffectsContext.ignore.breaks = true;
            isCaseIncluded = switchCase.hasEffects(hasEffectsContext);
          }
          if (isCaseIncluded) {
            switchCase.include(context, includeChildrenRecursively);
            onlyHasBrokenFlow && (onlyHasBrokenFlow = context.brokenFlow && !context.hasBreak);
            context.hasBreak = false;
            context.brokenFlow = brokenFlow;
          } else {
            onlyHasBrokenFlow = brokenFlow;
          }
        }
        if (isCaseIncluded && this.defaultCase !== null) {
          context.brokenFlow = onlyHasBrokenFlow;
        }
        context.hasBreak = hasBreak;
      }
      initialise() {
        for (let caseIndex = 0; caseIndex < this.cases.length; caseIndex++) {
          if (this.cases[caseIndex].test === null) {
            this.defaultCase = caseIndex;
            return;
          }
        }
        this.defaultCase = null;
      }
      render(code, options) {
        this.discriminant.render(code, options);
        if (this.cases.length > 0) {
          renderStatementList(this.cases, code, this.cases[0].start, this.end - 1, options);
        }
      }
    };
    TaggedTemplateExpression = class extends CallExpressionBase {
      bind() {
        super.bind();
        if (this.tag.type === Identifier$1) {
          const name = this.tag.name;
          const variable = this.scope.findVariable(name);
          if (variable.isNamespace) {
            this.context.warn(errorCannotCallNamespace(name), this.start);
          }
        }
      }
      hasEffects(context) {
        try {
          for (const argument of this.quasi.expressions) {
            if (argument.hasEffects(context))
              return true;
          }
          return this.tag.hasEffects(context) || this.tag.hasEffectsOnInteractionAtPath(EMPTY_PATH, this.interaction, context);
        } finally {
          if (!this.deoptimized)
            this.applyDeoptimizations();
        }
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (includeChildrenRecursively) {
          super.include(context, includeChildrenRecursively);
        } else {
          this.included = true;
          this.tag.include(context, includeChildrenRecursively);
          this.quasi.include(context, includeChildrenRecursively);
        }
        this.tag.includeCallArguments(context, this.args);
        const [returnExpression] = this.getReturnExpression();
        if (!returnExpression.included) {
          returnExpression.include(context, false);
        }
      }
      initialise() {
        this.args = [UNKNOWN_EXPRESSION, ...this.quasi.expressions];
        this.interaction = {
          args: [
            this.tag instanceof MemberExpression && !this.tag.variable ? this.tag.object : null,
            ...this.args
          ],
          type: INTERACTION_CALLED,
          withNew: false
        };
      }
      render(code, options) {
        this.tag.render(code, options, { isCalleeOfRenderedParent: true });
        this.quasi.render(code, options);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.tag.deoptimizeArgumentsOnInteractionAtPath(this.interaction, EMPTY_PATH, SHARED_RECURSION_TRACKER);
        this.context.requestTreeshakingPass();
      }
      getReturnExpression(recursionTracker = SHARED_RECURSION_TRACKER) {
        if (this.returnExpression === null) {
          this.returnExpression = UNKNOWN_RETURN_EXPRESSION;
          return this.returnExpression = this.tag.getReturnExpressionWhenCalledAtPath(EMPTY_PATH, this.interaction, recursionTracker, this);
        }
        return this.returnExpression;
      }
    };
    TemplateElement = class extends NodeBase {
      // Do not try to bind value
      bind() {
      }
      hasEffects() {
        return false;
      }
      include() {
        this.included = true;
      }
      parseNode(esTreeNode) {
        this.value = esTreeNode.value;
        super.parseNode(esTreeNode);
      }
      render() {
      }
    };
    TemplateLiteral = class extends NodeBase {
      deoptimizeArgumentsOnInteractionAtPath() {
      }
      getLiteralValueAtPath(path2) {
        if (path2.length > 0 || this.quasis.length !== 1) {
          return UnknownValue;
        }
        return this.quasis[0].value.cooked;
      }
      getReturnExpressionWhenCalledAtPath(path2) {
        if (path2.length !== 1) {
          return UNKNOWN_RETURN_EXPRESSION;
        }
        return getMemberReturnExpressionWhenCalled(literalStringMembers, path2[0]);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (interaction.type === INTERACTION_ACCESSED) {
          return path2.length > 1;
        }
        if (interaction.type === INTERACTION_CALLED && path2.length === 1) {
          return hasMemberEffectWhenCalled(literalStringMembers, path2[0], interaction, context);
        }
        return true;
      }
      render(code, options) {
        code.indentExclusionRanges.push([this.start, this.end]);
        super.render(code, options);
      }
    };
    UndefinedVariable = class extends Variable {
      constructor() {
        super("undefined");
      }
      getLiteralValueAtPath() {
        return void 0;
      }
    };
    ExportDefaultVariable = class extends LocalVariable {
      constructor(name, exportDefaultDeclaration, context) {
        super(name, exportDefaultDeclaration, exportDefaultDeclaration.declaration, context);
        this.hasId = false;
        this.originalId = null;
        this.originalVariable = null;
        const declaration = exportDefaultDeclaration.declaration;
        if ((declaration instanceof FunctionDeclaration || declaration instanceof ClassDeclaration) && declaration.id) {
          this.hasId = true;
          this.originalId = declaration.id;
        } else if (declaration instanceof Identifier) {
          this.originalId = declaration;
        }
      }
      addReference(identifier) {
        if (!this.hasId) {
          this.name = identifier.name;
        }
      }
      forbidName(name) {
        const original = this.getOriginalVariable();
        if (original === this) {
          super.forbidName(name);
        } else {
          original.forbidName(name);
        }
      }
      getAssignedVariableName() {
        return this.originalId && this.originalId.name || null;
      }
      getBaseVariableName() {
        const original = this.getOriginalVariable();
        return original === this ? super.getBaseVariableName() : original.getBaseVariableName();
      }
      getDirectOriginalVariable() {
        return this.originalId && (this.hasId || !(this.originalId.isPossibleTDZ() || this.originalId.variable.isReassigned || this.originalId.variable instanceof UndefinedVariable || // this avoids a circular dependency
        "syntheticNamespace" in this.originalId.variable)) ? this.originalId.variable : null;
      }
      getName(getPropertyAccess) {
        const original = this.getOriginalVariable();
        return original === this ? super.getName(getPropertyAccess) : original.getName(getPropertyAccess);
      }
      getOriginalVariable() {
        if (this.originalVariable)
          return this.originalVariable;
        let original = this;
        let currentVariable;
        const checkedVariables = /* @__PURE__ */ new Set();
        do {
          checkedVariables.add(original);
          currentVariable = original;
          original = currentVariable.getDirectOriginalVariable();
        } while (original instanceof ExportDefaultVariable && !checkedVariables.has(original));
        return this.originalVariable = original || currentVariable;
      }
    };
    ModuleScope = class extends ChildScope {
      constructor(parent, context) {
        super(parent);
        this.context = context;
        this.variables.set("this", new LocalVariable("this", null, UNDEFINED_EXPRESSION, context));
      }
      addExportDefaultDeclaration(name, exportDefaultDeclaration, context) {
        const variable = new ExportDefaultVariable(name, exportDefaultDeclaration, context);
        this.variables.set("default", variable);
        return variable;
      }
      addNamespaceMemberAccess() {
      }
      deconflict(format, exportNamesByVariable, accessedGlobalsByScope) {
        for (const scope of this.children)
          scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
      }
      findLexicalBoundary() {
        return this;
      }
      findVariable(name) {
        const knownVariable = this.variables.get(name) || this.accessedOutsideVariables.get(name);
        if (knownVariable) {
          return knownVariable;
        }
        const variable = this.context.traceVariable(name) || this.parent.findVariable(name);
        if (variable instanceof GlobalVariable) {
          this.accessedOutsideVariables.set(name, variable);
        }
        return variable;
      }
    };
    ThisExpression = class extends NodeBase {
      bind() {
        this.variable = this.scope.findVariable("this");
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        this.variable.deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker);
      }
      deoptimizePath(path2) {
        this.variable.deoptimizePath(path2);
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        if (path2.length === 0) {
          return interaction.type !== INTERACTION_ACCESSED;
        }
        return this.variable.hasEffectsOnInteractionAtPath(path2, interaction, context);
      }
      include() {
        if (!this.included) {
          this.included = true;
          this.context.includeVariableInModule(this.variable);
        }
      }
      initialise() {
        this.alias = this.scope.findLexicalBoundary() instanceof ModuleScope ? this.context.moduleContext : null;
        if (this.alias === "undefined") {
          this.context.warn(errorThisIsUndefined(), this.start);
        }
      }
      render(code) {
        if (this.alias !== null) {
          code.overwrite(this.start, this.end, this.alias, {
            contentOnly: false,
            storeName: true
          });
        }
      }
    };
    ThrowStatement = class extends NodeBase {
      hasEffects() {
        return true;
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        this.argument.include(context, includeChildrenRecursively);
        context.brokenFlow = true;
      }
      render(code, options) {
        this.argument.render(code, options, { preventASI: true });
        if (this.argument.start === this.start + 5) {
          code.prependLeft(this.start + 5, " ");
        }
      }
    };
    TryStatement = class extends NodeBase {
      constructor() {
        super(...arguments);
        this.directlyIncluded = false;
        this.includedLabelsAfterBlock = null;
      }
      hasEffects(context) {
        var _a;
        return (this.context.options.treeshake.tryCatchDeoptimization ? this.block.body.length > 0 : this.block.hasEffects(context)) || !!((_a = this.finalizer) == null ? void 0 : _a.hasEffects(context));
      }
      include(context, includeChildrenRecursively) {
        var _a, _b;
        const tryCatchDeoptimization = (_a = this.context.options.treeshake) == null ? void 0 : _a.tryCatchDeoptimization;
        const { brokenFlow, includedLabels } = context;
        if (!this.directlyIncluded || !tryCatchDeoptimization) {
          this.included = true;
          this.directlyIncluded = true;
          this.block.include(context, tryCatchDeoptimization ? INCLUDE_PARAMETERS : includeChildrenRecursively);
          if (includedLabels.size > 0) {
            this.includedLabelsAfterBlock = [...includedLabels];
          }
          context.brokenFlow = brokenFlow;
        } else if (this.includedLabelsAfterBlock) {
          for (const label of this.includedLabelsAfterBlock) {
            includedLabels.add(label);
          }
        }
        if (this.handler !== null) {
          this.handler.include(context, includeChildrenRecursively);
          context.brokenFlow = brokenFlow;
        }
        (_b = this.finalizer) == null ? void 0 : _b.include(context, includeChildrenRecursively);
      }
    };
    unaryOperators = {
      "!": (value) => !value,
      "+": (value) => +value,
      "-": (value) => -value,
      delete: () => UnknownValue,
      typeof: (value) => typeof value,
      void: () => void 0,
      "~": (value) => ~value
    };
    UnaryExpression = class extends NodeBase {
      getLiteralValueAtPath(path2, recursionTracker, origin) {
        if (path2.length > 0)
          return UnknownValue;
        const argumentValue = this.argument.getLiteralValueAtPath(EMPTY_PATH, recursionTracker, origin);
        if (typeof argumentValue === "symbol")
          return UnknownValue;
        return unaryOperators[this.operator](argumentValue);
      }
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        if (this.operator === "typeof" && this.argument instanceof Identifier)
          return false;
        return this.argument.hasEffects(context) || this.operator === "delete" && this.argument.hasEffectsOnInteractionAtPath(EMPTY_PATH, NODE_INTERACTION_UNKNOWN_ASSIGNMENT, context);
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return type !== INTERACTION_ACCESSED || path2.length > (this.operator === "void" ? 0 : 1);
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        if (this.operator === "delete") {
          this.argument.deoptimizePath(EMPTY_PATH);
          this.context.requestTreeshakingPass();
        }
      }
    };
    UnknownNode = class extends NodeBase {
      hasEffects() {
        return true;
      }
      include(context) {
        super.include(context, true);
      }
    };
    UpdateExpression = class extends NodeBase {
      hasEffects(context) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return this.argument.hasEffectsAsAssignmentTarget(context, true);
      }
      hasEffectsOnInteractionAtPath(path2, { type }) {
        return path2.length > 1 || type !== INTERACTION_ACCESSED;
      }
      include(context, includeChildrenRecursively) {
        if (!this.deoptimized)
          this.applyDeoptimizations();
        this.included = true;
        this.argument.includeAsAssignmentTarget(context, includeChildrenRecursively, true);
      }
      initialise() {
        this.argument.setAssignedValue(UNKNOWN_EXPRESSION);
      }
      render(code, options) {
        const { exportNamesByVariable, format, snippets: { _ } } = options;
        this.argument.render(code, options);
        if (format === "system") {
          const variable = this.argument.variable;
          const exportNames = exportNamesByVariable.get(variable);
          if (exportNames) {
            if (this.prefix) {
              if (exportNames.length === 1) {
                renderSystemExportExpression(variable, this.start, this.end, code, options);
              } else {
                renderSystemExportSequenceAfterExpression(variable, this.start, this.end, this.parent.type !== ExpressionStatement$1, code, options);
              }
            } else {
              const operator = this.operator[0];
              renderSystemExportSequenceBeforeExpression(variable, this.start, this.end, this.parent.type !== ExpressionStatement$1, code, options, `${_}${operator}${_}1`);
            }
          }
        }
      }
      applyDeoptimizations() {
        this.deoptimized = true;
        this.argument.deoptimizePath(EMPTY_PATH);
        if (this.argument instanceof Identifier) {
          const variable = this.scope.findVariable(this.argument.name);
          variable.isReassigned = true;
        }
        this.context.requestTreeshakingPass();
      }
    };
    VariableDeclaration = class extends NodeBase {
      deoptimizePath() {
        for (const declarator of this.declarations) {
          declarator.deoptimizePath(EMPTY_PATH);
        }
      }
      hasEffectsOnInteractionAtPath() {
        return false;
      }
      include(context, includeChildrenRecursively, { asSingleStatement } = BLANK) {
        this.included = true;
        for (const declarator of this.declarations) {
          if (includeChildrenRecursively || declarator.shouldBeIncluded(context))
            declarator.include(context, includeChildrenRecursively);
          const { id, init: init2 } = declarator;
          if (asSingleStatement) {
            id.include(context, includeChildrenRecursively);
          }
          if (init2 && id.included && !init2.included && (id instanceof ObjectPattern || id instanceof ArrayPattern)) {
            init2.include(context, includeChildrenRecursively);
          }
        }
      }
      initialise() {
        for (const declarator of this.declarations) {
          declarator.declareDeclarator(this.kind);
        }
      }
      render(code, options, nodeRenderOptions = BLANK) {
        if (areAllDeclarationsIncludedAndNotExported(this.declarations, options.exportNamesByVariable)) {
          for (const declarator of this.declarations) {
            declarator.render(code, options);
          }
          if (!nodeRenderOptions.isNoStatement && code.original.charCodeAt(this.end - 1) !== 59) {
            code.appendLeft(this.end, ";");
          }
        } else {
          this.renderReplacedDeclarations(code, options);
        }
      }
      applyDeoptimizations() {
      }
      renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, systemPatternExports, options) {
        if (code.original.charCodeAt(this.end - 1) === 59) {
          code.remove(this.end - 1, this.end);
        }
        separatorString += ";";
        if (lastSeparatorPos === null) {
          code.appendLeft(renderedContentEnd, separatorString);
        } else {
          if (code.original.charCodeAt(actualContentEnd - 1) === 10 && (code.original.charCodeAt(this.end) === 10 || code.original.charCodeAt(this.end) === 13)) {
            actualContentEnd--;
            if (code.original.charCodeAt(actualContentEnd) === 13) {
              actualContentEnd--;
            }
          }
          if (actualContentEnd === lastSeparatorPos + 1) {
            code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString);
          } else {
            code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
            code.remove(actualContentEnd, renderedContentEnd);
          }
        }
        if (systemPatternExports.length > 0) {
          code.appendLeft(renderedContentEnd, ` ${getSystemExportStatement(systemPatternExports, options)};`);
        }
      }
      renderReplacedDeclarations(code, options) {
        const separatedNodes = getCommaSeparatedNodesWithBoundaries(this.declarations, code, this.start + this.kind.length, this.end - (code.original.charCodeAt(this.end - 1) === 59 ? 1 : 0));
        let actualContentEnd, renderedContentEnd;
        renderedContentEnd = findNonWhiteSpace(code.original, this.start + this.kind.length);
        let lastSeparatorPos = renderedContentEnd - 1;
        code.remove(this.start, lastSeparatorPos);
        let isInDeclaration = false;
        let hasRenderedContent = false;
        let separatorString = "", leadingString, nextSeparatorString;
        const aggregatedSystemExports = [];
        const singleSystemExport = gatherSystemExportsAndGetSingleExport(separatedNodes, options, aggregatedSystemExports);
        for (const { node, start, separator, contentEnd, end } of separatedNodes) {
          if (!node.included) {
            code.remove(start, end);
            continue;
          }
          node.render(code, options);
          leadingString = "";
          nextSeparatorString = "";
          if (!node.id.included || node.id instanceof Identifier && isReassignedExportsMember(node.id.variable, options.exportNamesByVariable)) {
            if (hasRenderedContent) {
              separatorString += ";";
            }
            isInDeclaration = false;
          } else {
            if (singleSystemExport && singleSystemExport === node.id.variable) {
              const operatorPos = findFirstOccurrenceOutsideComment(code.original, "=", node.id.end);
              renderSystemExportExpression(singleSystemExport, findNonWhiteSpace(code.original, operatorPos + 1), separator === null ? contentEnd : separator, code, options);
            }
            if (isInDeclaration) {
              separatorString += ",";
            } else {
              if (hasRenderedContent) {
                separatorString += ";";
              }
              leadingString += `${this.kind} `;
              isInDeclaration = true;
            }
          }
          if (renderedContentEnd === lastSeparatorPos + 1) {
            code.overwrite(lastSeparatorPos, renderedContentEnd, separatorString + leadingString);
          } else {
            code.overwrite(lastSeparatorPos, lastSeparatorPos + 1, separatorString);
            code.appendLeft(renderedContentEnd, leadingString);
          }
          actualContentEnd = contentEnd;
          renderedContentEnd = end;
          hasRenderedContent = true;
          lastSeparatorPos = separator;
          separatorString = nextSeparatorString;
        }
        this.renderDeclarationEnd(code, separatorString, lastSeparatorPos, actualContentEnd, renderedContentEnd, aggregatedSystemExports, options);
      }
    };
    WhileStatement = class extends NodeBase {
      hasEffects(context) {
        if (this.test.hasEffects(context))
          return true;
        return hasLoopBodyEffects(context, this.body);
      }
      include(context, includeChildrenRecursively) {
        this.included = true;
        this.test.include(context, includeChildrenRecursively);
        includeLoopBody(context, this.body, includeChildrenRecursively);
      }
    };
    YieldExpression = class extends NodeBase {
      hasEffects(context) {
        var _a;
        if (!this.deoptimized)
          this.applyDeoptimizations();
        return !(context.ignore.returnYield && !((_a = this.argument) == null ? void 0 : _a.hasEffects(context)));
      }
      render(code, options) {
        if (this.argument) {
          this.argument.render(code, options, { preventASI: true });
          if (this.argument.start === this.start + 5) {
            code.prependLeft(this.start + 5, " ");
          }
        }
      }
    };
    nodeConstructors = {
      ArrayExpression,
      ArrayPattern,
      ArrowFunctionExpression,
      AssignmentExpression,
      AssignmentPattern,
      AwaitExpression,
      BinaryExpression,
      BlockStatement,
      BreakStatement,
      CallExpression,
      CatchClause,
      ChainExpression,
      ClassBody,
      ClassDeclaration,
      ClassExpression,
      ConditionalExpression,
      ContinueStatement,
      DoWhileStatement,
      EmptyStatement,
      ExportAllDeclaration,
      ExportDefaultDeclaration,
      ExportNamedDeclaration,
      ExportSpecifier,
      ExpressionStatement,
      ForInStatement,
      ForOfStatement,
      ForStatement,
      FunctionDeclaration,
      FunctionExpression,
      Identifier,
      IfStatement,
      ImportAttribute,
      ImportDeclaration,
      ImportDefaultSpecifier,
      ImportExpression,
      ImportNamespaceSpecifier,
      ImportSpecifier,
      LabeledStatement,
      Literal,
      LogicalExpression,
      MemberExpression,
      MetaProperty,
      MethodDefinition,
      NewExpression,
      ObjectExpression,
      ObjectPattern,
      PrivateIdentifier,
      Program,
      Property,
      PropertyDefinition,
      RestElement,
      ReturnStatement,
      SequenceExpression,
      SpreadElement,
      StaticBlock,
      Super,
      SwitchCase,
      SwitchStatement,
      TaggedTemplateExpression,
      TemplateElement,
      TemplateLiteral,
      ThisExpression,
      ThrowStatement,
      TryStatement,
      UnaryExpression,
      UnknownNode,
      UpdateExpression,
      VariableDeclaration,
      VariableDeclarator,
      WhileStatement,
      YieldExpression
    };
    MISSING_EXPORT_SHIM_VARIABLE = "_missingExportShim";
    ExportShimVariable = class extends Variable {
      constructor(module) {
        super(MISSING_EXPORT_SHIM_VARIABLE);
        this.module = module;
      }
      include() {
        super.include();
        this.module.needsExportShim = true;
      }
    };
    NamespaceVariable = class extends Variable {
      constructor(context) {
        super(context.getModuleName());
        this.memberVariables = null;
        this.mergedNamespaces = [];
        this.referencedEarly = false;
        this.references = [];
        this.context = context;
        this.module = context.module;
      }
      addReference(identifier) {
        this.references.push(identifier);
        this.name = identifier.name;
      }
      deoptimizeArgumentsOnInteractionAtPath(interaction, path2, recursionTracker) {
        var _a;
        if (path2.length > 1 || path2.length === 1 && interaction.type === INTERACTION_CALLED) {
          const key = path2[0];
          if (typeof key === "string") {
            (_a = this.getMemberVariables()[key]) == null ? void 0 : _a.deoptimizeArgumentsOnInteractionAtPath(interaction, path2.slice(1), recursionTracker);
          } else {
            deoptimizeInteraction(interaction);
          }
        }
      }
      deoptimizePath(path2) {
        var _a;
        if (path2.length > 1) {
          const key = path2[0];
          if (typeof key === "string") {
            (_a = this.getMemberVariables()[key]) == null ? void 0 : _a.deoptimizePath(path2.slice(1));
          }
        }
      }
      getLiteralValueAtPath(path2) {
        if (path2[0] === SymbolToStringTag) {
          return "Module";
        }
        return UnknownValue;
      }
      getMemberVariables() {
        if (this.memberVariables) {
          return this.memberVariables;
        }
        const memberVariables = /* @__PURE__ */ Object.create(null);
        const sortedExports = [...this.context.getExports(), ...this.context.getReexports()].sort();
        for (const name of sortedExports) {
          if (name[0] !== "*" && name !== this.module.info.syntheticNamedExports) {
            const exportedVariable = this.context.traceExport(name);
            if (exportedVariable) {
              memberVariables[name] = exportedVariable;
            }
          }
        }
        return this.memberVariables = memberVariables;
      }
      hasEffectsOnInteractionAtPath(path2, interaction, context) {
        const { type } = interaction;
        if (path2.length === 0) {
          return true;
        }
        if (path2.length === 1 && type !== INTERACTION_CALLED) {
          return type === INTERACTION_ASSIGNED;
        }
        const key = path2[0];
        if (typeof key !== "string") {
          return true;
        }
        const memberVariable = this.getMemberVariables()[key];
        return !memberVariable || memberVariable.hasEffectsOnInteractionAtPath(path2.slice(1), interaction, context);
      }
      include() {
        this.included = true;
        this.context.includeAllExports();
      }
      prepare(accessedGlobalsByScope) {
        if (this.mergedNamespaces.length > 0) {
          this.module.scope.addAccessedGlobals([MERGE_NAMESPACES_VARIABLE], accessedGlobalsByScope);
        }
      }
      renderBlock(options) {
        const { exportNamesByVariable, format, freeze, indent: t, namespaceToStringTag, snippets: { _, cnst, getObject, getPropertyAccess, n: n2, s } } = options;
        const memberVariables = this.getMemberVariables();
        const members = Object.entries(memberVariables).filter(([_2, variable]) => variable.included).map(([name2, original]) => {
          if (this.referencedEarly || original.isReassigned) {
            return [
              null,
              `get ${name2}${_}()${_}{${_}return ${original.getName(getPropertyAccess)}${s}${_}}`
            ];
          }
          return [name2, original.getName(getPropertyAccess)];
        });
        members.unshift([null, `__proto__:${_}null`]);
        let output = getObject(members, { lineBreakIndent: { base: "", t } });
        if (this.mergedNamespaces.length > 0) {
          const assignmentArguments = this.mergedNamespaces.map((variable) => variable.getName(getPropertyAccess));
          output = `/*#__PURE__*/${MERGE_NAMESPACES_VARIABLE}(${output},${_}[${assignmentArguments.join(`,${_}`)}])`;
        } else {
          if (namespaceToStringTag) {
            output = `/*#__PURE__*/Object.defineProperty(${output},${_}Symbol.toStringTag,${_}${getToStringTagValue(getObject)})`;
          }
          if (freeze) {
            output = `/*#__PURE__*/Object.freeze(${output})`;
          }
        }
        const name = this.getName(getPropertyAccess);
        output = `${cnst} ${name}${_}=${_}${output};`;
        if (format === "system" && exportNamesByVariable.has(this)) {
          output += `${n2}${getSystemExportStatement([this], options)};`;
        }
        return output;
      }
      renderFirst() {
        return this.referencedEarly;
      }
      setMergedNamespaces(mergedNamespaces) {
        this.mergedNamespaces = mergedNamespaces;
        const moduleExecIndex = this.context.getModuleExecIndex();
        for (const identifier of this.references) {
          if (identifier.context.getModuleExecIndex() <= moduleExecIndex) {
            this.referencedEarly = true;
            break;
          }
        }
      }
    };
    NamespaceVariable.prototype.isNamespace = true;
    SyntheticNamedExportVariable = class extends Variable {
      constructor(context, name, syntheticNamespace) {
        super(name);
        this.baseVariable = null;
        this.context = context;
        this.module = context.module;
        this.syntheticNamespace = syntheticNamespace;
      }
      getBaseVariable() {
        if (this.baseVariable)
          return this.baseVariable;
        let baseVariable = this.syntheticNamespace;
        while (baseVariable instanceof ExportDefaultVariable || baseVariable instanceof SyntheticNamedExportVariable) {
          if (baseVariable instanceof ExportDefaultVariable) {
            const original = baseVariable.getOriginalVariable();
            if (original === baseVariable)
              break;
            baseVariable = original;
          }
          if (baseVariable instanceof SyntheticNamedExportVariable) {
            baseVariable = baseVariable.syntheticNamespace;
          }
        }
        return this.baseVariable = baseVariable;
      }
      getBaseVariableName() {
        return this.syntheticNamespace.getBaseVariableName();
      }
      getName(getPropertyAccess) {
        return `${this.syntheticNamespace.getName(getPropertyAccess)}${getPropertyAccess(this.name)}`;
      }
      include() {
        this.included = true;
        this.context.includeVariableInModule(this.syntheticNamespace);
      }
      setRenderNames(baseName, name) {
        super.setRenderNames(baseName, name);
      }
    };
    (function(BuildPhase2) {
      BuildPhase2[BuildPhase2["LOAD_AND_PARSE"] = 0] = "LOAD_AND_PARSE";
      BuildPhase2[BuildPhase2["ANALYSE"] = 1] = "ANALYSE";
      BuildPhase2[BuildPhase2["GENERATE"] = 2] = "GENERATE";
    })(BuildPhase || (BuildPhase = {}));
    getPropertyKey = (property) => {
      const key = property.key;
      return key && (key.name || key.value);
    };
    timers = /* @__PURE__ */ new Map();
    timeStart = doNothing;
    timeEnd = doNothing;
    TIMED_PLUGIN_HOOKS = [
      "augmentChunkHash",
      "buildEnd",
      "buildStart",
      "generateBundle",
      "load",
      "moduleParsed",
      "options",
      "outputOptions",
      "renderChunk",
      "renderDynamicImport",
      "renderStart",
      "resolveDynamicImport",
      "resolveFileUrl",
      "resolveId",
      "resolveImportMeta",
      "shouldTransformCachedModule",
      "transform",
      "writeBundle"
    ];
    MISSING_EXPORT_SHIM_DESCRIPTION = {
      identifier: null,
      localName: MISSING_EXPORT_SHIM_VARIABLE
    };
    Module = class {
      constructor(graph, id, options, isEntry, moduleSideEffects, syntheticNamedExports, meta, assertions) {
        this.graph = graph;
        this.id = id;
        this.options = options;
        this.alternativeReexportModules = /* @__PURE__ */ new Map();
        this.chunkFileNames = /* @__PURE__ */ new Set();
        this.chunkNames = [];
        this.cycles = /* @__PURE__ */ new Set();
        this.dependencies = /* @__PURE__ */ new Set();
        this.dynamicDependencies = /* @__PURE__ */ new Set();
        this.dynamicImporters = [];
        this.dynamicImports = [];
        this.execIndex = Infinity;
        this.implicitlyLoadedAfter = /* @__PURE__ */ new Set();
        this.implicitlyLoadedBefore = /* @__PURE__ */ new Set();
        this.importDescriptions = /* @__PURE__ */ new Map();
        this.importMetas = [];
        this.importedFromNotTreeshaken = false;
        this.importers = [];
        this.includedDynamicImporters = [];
        this.includedImports = /* @__PURE__ */ new Set();
        this.isExecuted = false;
        this.isUserDefinedEntryPoint = false;
        this.needsExportShim = false;
        this.sideEffectDependenciesByVariable = /* @__PURE__ */ new Map();
        this.sourcesWithAssertions = /* @__PURE__ */ new Map();
        this.allExportNames = null;
        this.ast = null;
        this.exportAllModules = [];
        this.exportAllSources = /* @__PURE__ */ new Set();
        this.exportNamesByVariable = null;
        this.exportShimVariable = new ExportShimVariable(this);
        this.exports = /* @__PURE__ */ new Map();
        this.namespaceReexportsByName = /* @__PURE__ */ new Map();
        this.reexportDescriptions = /* @__PURE__ */ new Map();
        this.relevantDependencies = null;
        this.syntheticExports = /* @__PURE__ */ new Map();
        this.syntheticNamespace = null;
        this.transformDependencies = [];
        this.transitiveReexports = null;
        this.excludeFromSourcemap = /\0/.test(id);
        this.context = options.moduleContext(id);
        this.preserveSignature = this.options.preserveEntrySignatures;
        const module = this;
        const { dynamicImports, dynamicImporters, exportAllSources, exports, implicitlyLoadedAfter, implicitlyLoadedBefore, importers, reexportDescriptions, sourcesWithAssertions } = this;
        this.info = {
          assertions,
          ast: null,
          code: null,
          get dynamicallyImportedIdResolutions() {
            return dynamicImports.map(({ argument }) => typeof argument === "string" && module.resolvedIds[argument]).filter(Boolean);
          },
          get dynamicallyImportedIds() {
            return dynamicImports.map(({ id: id2 }) => id2).filter((id2) => id2 != null);
          },
          get dynamicImporters() {
            return dynamicImporters.sort();
          },
          get exportedBindings() {
            const exportBindings = { ".": [...exports.keys()] };
            for (const [name, { source }] of reexportDescriptions) {
              (exportBindings[source] ?? (exportBindings[source] = [])).push(name);
            }
            for (const source of exportAllSources) {
              (exportBindings[source] ?? (exportBindings[source] = [])).push("*");
            }
            return exportBindings;
          },
          get exports() {
            return [
              ...exports.keys(),
              ...reexportDescriptions.keys(),
              ...[...exportAllSources].map(() => "*")
            ];
          },
          get hasDefaultExport() {
            if (!module.ast) {
              return null;
            }
            return module.exports.has("default") || reexportDescriptions.has("default");
          },
          get hasModuleSideEffects() {
            warnDeprecation("Accessing ModuleInfo.hasModuleSideEffects from plugins is deprecated. Please use ModuleInfo.moduleSideEffects instead.", URL_THIS_GETMODULEINFO, true, options);
            return this.moduleSideEffects;
          },
          id,
          get implicitlyLoadedAfterOneOf() {
            return Array.from(implicitlyLoadedAfter, getId).sort();
          },
          get implicitlyLoadedBefore() {
            return Array.from(implicitlyLoadedBefore, getId).sort();
          },
          get importedIdResolutions() {
            return Array.from(sourcesWithAssertions.keys(), (source) => module.resolvedIds[source]).filter(Boolean);
          },
          get importedIds() {
            return Array.from(sourcesWithAssertions.keys(), (source) => {
              var _a;
              return (_a = module.resolvedIds[source]) == null ? void 0 : _a.id;
            }).filter(Boolean);
          },
          get importers() {
            return importers.sort();
          },
          isEntry,
          isExternal: false,
          get isIncluded() {
            if (graph.phase !== BuildPhase.GENERATE) {
              return null;
            }
            return module.isIncluded();
          },
          meta: { ...meta },
          moduleSideEffects,
          syntheticNamedExports
        };
        Object.defineProperty(this.info, "hasModuleSideEffects", {
          enumerable: false
        });
      }
      basename() {
        const base2 = (0, import_node_path.basename)(this.id);
        const extension = (0, import_node_path.extname)(this.id);
        return makeLegal(extension ? base2.slice(0, -extension.length) : base2);
      }
      bindReferences() {
        this.ast.bind();
      }
      error(properties, pos) {
        this.addLocationToLogProps(properties, pos);
        return error(properties);
      }
      getAllExportNames() {
        if (this.allExportNames) {
          return this.allExportNames;
        }
        this.allExportNames = /* @__PURE__ */ new Set([...this.exports.keys(), ...this.reexportDescriptions.keys()]);
        for (const module of this.exportAllModules) {
          if (module instanceof ExternalModule) {
            this.allExportNames.add(`*${module.id}`);
            continue;
          }
          for (const name of module.getAllExportNames()) {
            if (name !== "default")
              this.allExportNames.add(name);
          }
        }
        if (typeof this.info.syntheticNamedExports === "string") {
          this.allExportNames.delete(this.info.syntheticNamedExports);
        }
        return this.allExportNames;
      }
      getDependenciesToBeIncluded() {
        if (this.relevantDependencies)
          return this.relevantDependencies;
        this.relevantDependencies = /* @__PURE__ */ new Set();
        const necessaryDependencies = /* @__PURE__ */ new Set();
        const alwaysCheckedDependencies = /* @__PURE__ */ new Set();
        const dependencyVariables = new Set(this.includedImports);
        if (this.info.isEntry || this.includedDynamicImporters.length > 0 || this.namespace.included || this.implicitlyLoadedAfter.size > 0) {
          for (const exportName of [...this.getReexports(), ...this.getExports()]) {
            const [exportedVariable] = this.getVariableForExportName(exportName);
            if (exportedVariable) {
              dependencyVariables.add(exportedVariable);
            }
          }
        }
        for (let variable of dependencyVariables) {
          const sideEffectDependencies = this.sideEffectDependenciesByVariable.get(variable);
          if (sideEffectDependencies) {
            for (const module of sideEffectDependencies) {
              alwaysCheckedDependencies.add(module);
            }
          }
          if (variable instanceof SyntheticNamedExportVariable) {
            variable = variable.getBaseVariable();
          } else if (variable instanceof ExportDefaultVariable) {
            variable = variable.getOriginalVariable();
          }
          necessaryDependencies.add(variable.module);
        }
        if (!this.options.treeshake || this.info.moduleSideEffects === "no-treeshake") {
          for (const dependency of this.dependencies) {
            this.relevantDependencies.add(dependency);
          }
        } else {
          this.addRelevantSideEffectDependencies(this.relevantDependencies, necessaryDependencies, alwaysCheckedDependencies);
        }
        for (const dependency of necessaryDependencies) {
          this.relevantDependencies.add(dependency);
        }
        return this.relevantDependencies;
      }
      getExportNamesByVariable() {
        if (this.exportNamesByVariable) {
          return this.exportNamesByVariable;
        }
        const exportNamesByVariable = /* @__PURE__ */ new Map();
        for (const exportName of this.getAllExportNames()) {
          let [tracedVariable] = this.getVariableForExportName(exportName);
          if (tracedVariable instanceof ExportDefaultVariable) {
            tracedVariable = tracedVariable.getOriginalVariable();
          }
          if (!tracedVariable || !(tracedVariable.included || tracedVariable instanceof ExternalVariable)) {
            continue;
          }
          const existingExportNames = exportNamesByVariable.get(tracedVariable);
          if (existingExportNames) {
            existingExportNames.push(exportName);
          } else {
            exportNamesByVariable.set(tracedVariable, [exportName]);
          }
        }
        return this.exportNamesByVariable = exportNamesByVariable;
      }
      getExports() {
        return [...this.exports.keys()];
      }
      getReexports() {
        if (this.transitiveReexports) {
          return this.transitiveReexports;
        }
        this.transitiveReexports = [];
        const reexports = new Set(this.reexportDescriptions.keys());
        for (const module of this.exportAllModules) {
          if (module instanceof ExternalModule) {
            reexports.add(`*${module.id}`);
          } else {
            for (const name of [...module.getReexports(), ...module.getExports()]) {
              if (name !== "default")
                reexports.add(name);
            }
          }
        }
        return this.transitiveReexports = [...reexports];
      }
      getRenderedExports() {
        const renderedExports = [];
        const removedExports = [];
        for (const exportName of this.exports.keys()) {
          const [variable] = this.getVariableForExportName(exportName);
          (variable && variable.included ? renderedExports : removedExports).push(exportName);
        }
        return { removedExports, renderedExports };
      }
      getSyntheticNamespace() {
        if (this.syntheticNamespace === null) {
          this.syntheticNamespace = void 0;
          [this.syntheticNamespace] = this.getVariableForExportName(typeof this.info.syntheticNamedExports === "string" ? this.info.syntheticNamedExports : "default", { onlyExplicit: true });
        }
        if (!this.syntheticNamespace) {
          return error(errorSyntheticNamedExportsNeedNamespaceExport(this.id, this.info.syntheticNamedExports));
        }
        return this.syntheticNamespace;
      }
      getVariableForExportName(name, { importerForSideEffects, isExportAllSearch, onlyExplicit, searchedNamesAndModules } = EMPTY_OBJECT) {
        if (name[0] === "*") {
          if (name.length === 1) {
            return [this.namespace];
          }
          const module = this.graph.modulesById.get(name.slice(1));
          return module.getVariableForExportName("*");
        }
        const reexportDeclaration = this.reexportDescriptions.get(name);
        if (reexportDeclaration) {
          const [variable] = getVariableForExportNameRecursive(reexportDeclaration.module, reexportDeclaration.localName, importerForSideEffects, false, searchedNamesAndModules);
          if (!variable) {
            return this.error(errorMissingExport(reexportDeclaration.localName, this.id, reexportDeclaration.module.id), reexportDeclaration.start);
          }
          if (importerForSideEffects) {
            setAlternativeExporterIfCyclic(variable, importerForSideEffects, this);
            if (this.info.moduleSideEffects) {
              getOrCreate(importerForSideEffects.sideEffectDependenciesByVariable, variable, getNewSet).add(this);
            }
          }
          return [variable];
        }
        const exportDeclaration = this.exports.get(name);
        if (exportDeclaration) {
          if (exportDeclaration === MISSING_EXPORT_SHIM_DESCRIPTION) {
            return [this.exportShimVariable];
          }
          const name2 = exportDeclaration.localName;
          const variable = this.traceVariable(name2, {
            importerForSideEffects,
            searchedNamesAndModules
          });
          if (importerForSideEffects) {
            setAlternativeExporterIfCyclic(variable, importerForSideEffects, this);
            getOrCreate(importerForSideEffects.sideEffectDependenciesByVariable, variable, getNewSet).add(this);
          }
          return [variable];
        }
        if (onlyExplicit) {
          return [null];
        }
        if (name !== "default") {
          const foundNamespaceReexport = this.namespaceReexportsByName.get(name) ?? this.getVariableFromNamespaceReexports(name, importerForSideEffects, searchedNamesAndModules);
          this.namespaceReexportsByName.set(name, foundNamespaceReexport);
          if (foundNamespaceReexport[0]) {
            return foundNamespaceReexport;
          }
        }
        if (this.info.syntheticNamedExports) {
          return [
            getOrCreate(this.syntheticExports, name, () => new SyntheticNamedExportVariable(this.astContext, name, this.getSyntheticNamespace()))
          ];
        }
        if (!isExportAllSearch && this.options.shimMissingExports) {
          this.shimMissingExport(name);
          return [this.exportShimVariable];
        }
        return [null];
      }
      hasEffects() {
        return this.info.moduleSideEffects === "no-treeshake" || this.ast.hasCachedEffects();
      }
      include() {
        const context = createInclusionContext();
        if (this.ast.shouldBeIncluded(context))
          this.ast.include(context, false);
      }
      includeAllExports(includeNamespaceMembers) {
        if (!this.isExecuted) {
          markModuleAndImpureDependenciesAsExecuted(this);
          this.graph.needsTreeshakingPass = true;
        }
        for (const exportName of this.exports.keys()) {
          if (includeNamespaceMembers || exportName !== this.info.syntheticNamedExports) {
            const variable = this.getVariableForExportName(exportName)[0];
            variable.deoptimizePath(UNKNOWN_PATH);
            if (!variable.included) {
              this.includeVariable(variable);
            }
          }
        }
        for (const name of this.getReexports()) {
          const [variable] = this.getVariableForExportName(name);
          if (variable) {
            variable.deoptimizePath(UNKNOWN_PATH);
            if (!variable.included) {
              this.includeVariable(variable);
            }
            if (variable instanceof ExternalVariable) {
              variable.module.reexported = true;
            }
          }
        }
        if (includeNamespaceMembers) {
          this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces());
        }
      }
      includeAllInBundle() {
        this.ast.include(createInclusionContext(), true);
        this.includeAllExports(false);
      }
      includeExportsByNames(names) {
        if (!this.isExecuted) {
          markModuleAndImpureDependenciesAsExecuted(this);
          this.graph.needsTreeshakingPass = true;
        }
        let includeNamespaceMembers = false;
        for (const name of names) {
          const variable = this.getVariableForExportName(name)[0];
          if (variable) {
            variable.deoptimizePath(UNKNOWN_PATH);
            if (!variable.included) {
              this.includeVariable(variable);
            }
          }
          if (!this.exports.has(name) && !this.reexportDescriptions.has(name)) {
            includeNamespaceMembers = true;
          }
        }
        if (includeNamespaceMembers) {
          this.namespace.setMergedNamespaces(this.includeAndGetAdditionalMergedNamespaces());
        }
      }
      isIncluded() {
        return this.ast && (this.ast.included || this.namespace.included || this.importedFromNotTreeshaken);
      }
      linkImports() {
        this.addModulesToImportDescriptions(this.importDescriptions);
        this.addModulesToImportDescriptions(this.reexportDescriptions);
        const externalExportAllModules = [];
        for (const source of this.exportAllSources) {
          const module = this.graph.modulesById.get(this.resolvedIds[source].id);
          if (module instanceof ExternalModule) {
            externalExportAllModules.push(module);
            continue;
          }
          this.exportAllModules.push(module);
        }
        this.exportAllModules.push(...externalExportAllModules);
      }
      render(options) {
        const source = this.magicString.clone();
        this.ast.render(source, options);
        source.trim();
        const { usesTopLevelAwait } = this.astContext;
        if (usesTopLevelAwait && options.format !== "es" && options.format !== "system") {
          return error(errorInvalidFormatForTopLevelAwait(this.id, options.format));
        }
        return { source, usesTopLevelAwait };
      }
      setSource({ ast, code, customTransformCache, originalCode, originalSourcemap, resolvedIds, sourcemapChain, transformDependencies, transformFiles, ...moduleOptions }) {
        timeStart("generate ast", 3);
        this.info.code = code;
        this.originalCode = originalCode;
        this.originalSourcemap = originalSourcemap;
        this.sourcemapChain = sourcemapChain;
        if (transformFiles) {
          this.transformFiles = transformFiles;
        }
        this.transformDependencies = transformDependencies;
        this.customTransformCache = customTransformCache;
        this.updateOptions(moduleOptions);
        const moduleAst = ast ?? this.tryParse();
        timeEnd("generate ast", 3);
        timeStart("analyze ast", 3);
        this.resolvedIds = resolvedIds ?? /* @__PURE__ */ Object.create(null);
        const fileName = this.id;
        this.magicString = new MagicString(code, {
          filename: this.excludeFromSourcemap ? null : fileName,
          indentExclusionRanges: []
        });
        this.astContext = {
          addDynamicImport: this.addDynamicImport.bind(this),
          addExport: this.addExport.bind(this),
          addImport: this.addImport.bind(this),
          addImportMeta: this.addImportMeta.bind(this),
          code,
          deoptimizationTracker: this.graph.deoptimizationTracker,
          error: this.error.bind(this),
          fileName,
          getExports: this.getExports.bind(this),
          getModuleExecIndex: () => this.execIndex,
          getModuleName: this.basename.bind(this),
          getNodeConstructor: (name) => nodeConstructors[name] || nodeConstructors.UnknownNode,
          getReexports: this.getReexports.bind(this),
          importDescriptions: this.importDescriptions,
          includeAllExports: () => this.includeAllExports(true),
          includeDynamicImport: this.includeDynamicImport.bind(this),
          includeVariableInModule: this.includeVariableInModule.bind(this),
          magicString: this.magicString,
          manualPureFunctions: this.graph.pureFunctions,
          module: this,
          moduleContext: this.context,
          options: this.options,
          requestTreeshakingPass: () => this.graph.needsTreeshakingPass = true,
          traceExport: (name) => this.getVariableForExportName(name)[0],
          traceVariable: this.traceVariable.bind(this),
          usesTopLevelAwait: false,
          warn: this.warn.bind(this)
        };
        this.scope = new ModuleScope(this.graph.scope, this.astContext);
        this.namespace = new NamespaceVariable(this.astContext);
        this.ast = new Program(moduleAst, { context: this.astContext, type: "Module" }, this.scope);
        if (ast || this.options.cache !== false) {
          this.info.ast = moduleAst;
        } else {
          Object.defineProperty(this.info, "ast", {
            get: () => {
              if (this.graph.astLru.has(fileName)) {
                return this.graph.astLru.get(fileName);
              } else {
                const parsedAst = this.tryParse();
                this.graph.astLru.set(fileName, parsedAst);
                return parsedAst;
              }
            }
          });
        }
        timeEnd("analyze ast", 3);
      }
      toJSON() {
        return {
          assertions: this.info.assertions,
          ast: this.info.ast,
          code: this.info.code,
          customTransformCache: this.customTransformCache,
          // eslint-disable-next-line unicorn/prefer-spread
          dependencies: Array.from(this.dependencies, getId),
          id: this.id,
          meta: this.info.meta,
          moduleSideEffects: this.info.moduleSideEffects,
          originalCode: this.originalCode,
          originalSourcemap: this.originalSourcemap,
          resolvedIds: this.resolvedIds,
          sourcemapChain: this.sourcemapChain,
          syntheticNamedExports: this.info.syntheticNamedExports,
          transformDependencies: this.transformDependencies,
          transformFiles: this.transformFiles
        };
      }
      traceVariable(name, { importerForSideEffects, isExportAllSearch, searchedNamesAndModules } = EMPTY_OBJECT) {
        const localVariable = this.scope.variables.get(name);
        if (localVariable) {
          return localVariable;
        }
        const importDescription = this.importDescriptions.get(name);
        if (importDescription) {
          const otherModule = importDescription.module;
          if (otherModule instanceof Module && importDescription.name === "*") {
            return otherModule.namespace;
          }
          const [declaration] = getVariableForExportNameRecursive(otherModule, importDescription.name, importerForSideEffects || this, isExportAllSearch, searchedNamesAndModules);
          if (!declaration) {
            return this.error(errorMissingExport(importDescription.name, this.id, otherModule.id), importDescription.start);
          }
          return declaration;
        }
        return null;
      }
      updateOptions({ meta, moduleSideEffects, syntheticNamedExports }) {
        if (moduleSideEffects != null) {
          this.info.moduleSideEffects = moduleSideEffects;
        }
        if (syntheticNamedExports != null) {
          this.info.syntheticNamedExports = syntheticNamedExports;
        }
        if (meta != null) {
          Object.assign(this.info.meta, meta);
        }
      }
      warn(properties, pos) {
        this.addLocationToLogProps(properties, pos);
        this.options.onwarn(properties);
      }
      addDynamicImport(node) {
        let argument = node.source;
        if (argument instanceof TemplateLiteral) {
          if (argument.quasis.length === 1 && argument.quasis[0].value.cooked) {
            argument = argument.quasis[0].value.cooked;
          }
        } else if (argument instanceof Literal && typeof argument.value === "string") {
          argument = argument.value;
        }
        this.dynamicImports.push({ argument, id: null, node, resolution: null });
      }
      addExport(node) {
        if (node instanceof ExportDefaultDeclaration) {
          this.exports.set("default", {
            identifier: node.variable.getAssignedVariableName(),
            localName: "default"
          });
        } else if (node instanceof ExportAllDeclaration) {
          const source = node.source.value;
          this.addSource(source, node);
          if (node.exported) {
            const name = node.exported.name;
            this.reexportDescriptions.set(name, {
              localName: "*",
              module: null,
              source,
              start: node.start
            });
          } else {
            this.exportAllSources.add(source);
          }
        } else if (node.source instanceof Literal) {
          const source = node.source.value;
          this.addSource(source, node);
          for (const { exported, local, start } of node.specifiers) {
            const name = exported instanceof Literal ? exported.value : exported.name;
            this.reexportDescriptions.set(name, {
              localName: local instanceof Literal ? local.value : local.name,
              module: null,
              source,
              start
            });
          }
        } else if (node.declaration) {
          const declaration = node.declaration;
          if (declaration instanceof VariableDeclaration) {
            for (const declarator of declaration.declarations) {
              for (const localName of extractAssignedNames(declarator.id)) {
                this.exports.set(localName, { identifier: null, localName });
              }
            }
          } else {
            const localName = declaration.id.name;
            this.exports.set(localName, { identifier: null, localName });
          }
        } else {
          for (const { local, exported } of node.specifiers) {
            const localName = local.name;
            const exportedName = exported instanceof Identifier ? exported.name : exported.value;
            this.exports.set(exportedName, { identifier: null, localName });
          }
        }
      }
      addImport(node) {
        const source = node.source.value;
        this.addSource(source, node);
        for (const specifier of node.specifiers) {
          const name = specifier instanceof ImportDefaultSpecifier ? "default" : specifier instanceof ImportNamespaceSpecifier ? "*" : specifier.imported instanceof Identifier ? specifier.imported.name : specifier.imported.value;
          this.importDescriptions.set(specifier.local.name, {
            module: null,
            name,
            source,
            start: specifier.start
          });
        }
      }
      addImportMeta(node) {
        this.importMetas.push(node);
      }
      addLocationToLogProps(properties, pos) {
        properties.id = this.id;
        properties.pos = pos;
        let code = this.info.code;
        const location = locate(code, pos, { offsetLine: 1 });
        if (location) {
          let { column, line } = location;
          try {
            ({ column, line } = getOriginalLocation(this.sourcemapChain, { column, line }));
            code = this.originalCode;
          } catch (error_) {
            this.options.onwarn(errorInvalidSourcemapForError(error_, this.id, column, line, pos));
          }
          augmentCodeLocation(properties, { column, line }, code, this.id);
        }
      }
      addModulesToImportDescriptions(importDescription) {
        for (const specifier of importDescription.values()) {
          const { id } = this.resolvedIds[specifier.source];
          specifier.module = this.graph.modulesById.get(id);
        }
      }
      addRelevantSideEffectDependencies(relevantDependencies, necessaryDependencies, alwaysCheckedDependencies) {
        const handledDependencies = /* @__PURE__ */ new Set();
        const addSideEffectDependencies = (possibleDependencies) => {
          for (const dependency of possibleDependencies) {
            if (handledDependencies.has(dependency)) {
              continue;
            }
            handledDependencies.add(dependency);
            if (necessaryDependencies.has(dependency)) {
              relevantDependencies.add(dependency);
              continue;
            }
            if (!(dependency.info.moduleSideEffects || alwaysCheckedDependencies.has(dependency))) {
              continue;
            }
            if (dependency instanceof ExternalModule || dependency.hasEffects()) {
              relevantDependencies.add(dependency);
              continue;
            }
            addSideEffectDependencies(dependency.dependencies);
          }
        };
        addSideEffectDependencies(this.dependencies);
        addSideEffectDependencies(alwaysCheckedDependencies);
      }
      addSource(source, declaration) {
        const parsedAssertions = getAssertionsFromImportExportDeclaration(declaration.assertions);
        const existingAssertions = this.sourcesWithAssertions.get(source);
        if (existingAssertions) {
          if (doAssertionsDiffer(existingAssertions, parsedAssertions)) {
            this.warn(errorInconsistentImportAssertions(existingAssertions, parsedAssertions, source, this.id), declaration.start);
          }
        } else {
          this.sourcesWithAssertions.set(source, parsedAssertions);
        }
      }
      getVariableFromNamespaceReexports(name, importerForSideEffects, searchedNamesAndModules) {
        let foundSyntheticDeclaration = null;
        const foundInternalDeclarations = /* @__PURE__ */ new Map();
        const foundExternalDeclarations = /* @__PURE__ */ new Set();
        for (const module of this.exportAllModules) {
          if (module.info.syntheticNamedExports === name) {
            continue;
          }
          const [variable, indirectExternal] = getVariableForExportNameRecursive(
            module,
            name,
            importerForSideEffects,
            true,
            // We are creating a copy to handle the case where the same binding is
            // imported through different namespace reexports gracefully
            copyNameToModulesMap(searchedNamesAndModules)
          );
          if (module instanceof ExternalModule || indirectExternal) {
            foundExternalDeclarations.add(variable);
          } else if (variable instanceof SyntheticNamedExportVariable) {
            if (!foundSyntheticDeclaration) {
              foundSyntheticDeclaration = variable;
            }
          } else if (variable) {
            foundInternalDeclarations.set(variable, module);
          }
        }
        if (foundInternalDeclarations.size > 0) {
          const foundDeclarationList = [...foundInternalDeclarations];
          const usedDeclaration = foundDeclarationList[0][0];
          if (foundDeclarationList.length === 1) {
            return [usedDeclaration];
          }
          this.options.onwarn(errorNamespaceConflict(name, this.id, foundDeclarationList.map(([, module]) => module.id)));
          return [null];
        }
        if (foundExternalDeclarations.size > 0) {
          const foundDeclarationList = [...foundExternalDeclarations];
          const usedDeclaration = foundDeclarationList[0];
          if (foundDeclarationList.length > 1) {
            this.options.onwarn(errorAmbiguousExternalNamespaces(name, this.id, usedDeclaration.module.id, foundDeclarationList.map((declaration) => declaration.module.id)));
          }
          return [usedDeclaration, true];
        }
        if (foundSyntheticDeclaration) {
          return [foundSyntheticDeclaration];
        }
        return [null];
      }
      includeAndGetAdditionalMergedNamespaces() {
        const externalNamespaces = /* @__PURE__ */ new Set();
        const syntheticNamespaces = /* @__PURE__ */ new Set();
        for (const module of [this, ...this.exportAllModules]) {
          if (module instanceof ExternalModule) {
            const [externalVariable] = module.getVariableForExportName("*");
            externalVariable.include();
            this.includedImports.add(externalVariable);
            externalNamespaces.add(externalVariable);
          } else if (module.info.syntheticNamedExports) {
            const syntheticNamespace = module.getSyntheticNamespace();
            syntheticNamespace.include();
            this.includedImports.add(syntheticNamespace);
            syntheticNamespaces.add(syntheticNamespace);
          }
        }
        return [...syntheticNamespaces, ...externalNamespaces];
      }
      includeDynamicImport(node) {
        const resolution = this.dynamicImports.find((dynamicImport) => dynamicImport.node === node).resolution;
        if (resolution instanceof Module) {
          resolution.includedDynamicImporters.push(this);
          const importedNames = this.options.treeshake ? node.getDeterministicImportedNames() : void 0;
          if (importedNames) {
            resolution.includeExportsByNames(importedNames);
          } else {
            resolution.includeAllExports(true);
          }
        }
      }
      includeVariable(variable) {
        if (!variable.included) {
          variable.include();
          this.graph.needsTreeshakingPass = true;
          const variableModule = variable.module;
          if (variableModule instanceof Module) {
            if (!variableModule.isExecuted) {
              markModuleAndImpureDependenciesAsExecuted(variableModule);
            }
            if (variableModule !== this) {
              const sideEffectModules = getAndExtendSideEffectModules(variable, this);
              for (const module of sideEffectModules) {
                if (!module.isExecuted) {
                  markModuleAndImpureDependenciesAsExecuted(module);
                }
              }
            }
          }
        }
      }
      includeVariableInModule(variable) {
        this.includeVariable(variable);
        const variableModule = variable.module;
        if (variableModule && variableModule !== this) {
          this.includedImports.add(variable);
        }
      }
      shimMissingExport(name) {
        this.options.onwarn(errorShimmedExport(this.id, name));
        this.exports.set(name, MISSING_EXPORT_SHIM_DESCRIPTION);
      }
      tryParse() {
        try {
          return this.graph.contextParse(this.info.code);
        } catch (error_) {
          return this.error(errorParseError(error_, this.id), error_.pos);
        }
      }
    };
    copyNameToModulesMap = (searchedNamesAndModules) => searchedNamesAndModules && // eslint-disable-next-line unicorn/prefer-spread
    new Map(Array.from(searchedNamesAndModules, ([name, modules]) => [name, new Set(modules)]));
    getDefineProperty = (name, needsLiveBinding, t, { _, getDirectReturnFunction, n: n2 }) => {
      if (needsLiveBinding) {
        const [left, right] = getDirectReturnFunction([], {
          functionReturn: true,
          lineBreakIndent: null,
          name: null
        });
        return `Object.defineProperty(exports,${_}k,${_}{${n2}${t}${t}enumerable:${_}true,${n2}${t}${t}get:${_}${left}${name}[k]${right}${n2}${t}})`;
      }
      return `exports[k]${_}=${_}${name}[k]`;
    };
    _staticExports = {};
    _static = {
      get exports() {
        return _staticExports;
      },
      set exports(v) {
        _staticExports = v;
      }
    };
    require$$0 = [
      "assert",
      "async_hooks",
      "buffer",
      "child_process",
      "cluster",
      "console",
      "constants",
      "crypto",
      "dgram",
      "diagnostics_channel",
      "dns",
      "domain",
      "events",
      "fs",
      "http",
      "http2",
      "https",
      "inspector",
      "module",
      "net",
      "os",
      "path",
      "perf_hooks",
      "process",
      "punycode",
      "querystring",
      "readline",
      "repl",
      "stream",
      "string_decoder",
      "timers",
      "tls",
      "trace_events",
      "tty",
      "url",
      "util",
      "v8",
      "vm",
      "wasi",
      "worker_threads",
      "zlib"
    ];
    (function(module) {
      module.exports = require$$0;
    })(_static);
    builtinModules = getDefaultExportFromCjs(_staticExports);
    nodeBuiltins = /* @__PURE__ */ new Set([
      ...builtinModules,
      // TODO
      // remove once builtin-modules includes PR: https://github.com/sindresorhus/builtin-modules/pull/17
      "assert/strict",
      "dns/promises",
      "fs/promises",
      "path/posix",
      "path/win32",
      "readline/promises",
      "stream/consumers",
      "stream/promises",
      "stream/web",
      "timers/promises",
      "util/types"
    ]);
    keypath = (keypath2, getPropertyAccess) => keypath2.split(".").map(getPropertyAccess).join("");
    getStarExcludes = ({ dependencies, exports }) => {
      const starExcludes = new Set(exports.map((expt) => expt.exported));
      starExcludes.add("default");
      for (const { reexports } of dependencies) {
        if (reexports) {
          for (const reexport of reexports) {
            if (reexport.reexported !== "*")
              starExcludes.add(reexport.reexported);
          }
        }
      }
      return starExcludes;
    };
    getStarExcludesBlock = (starExcludes, t, { _, cnst, getObject, n: n2 }) => starExcludes ? `${n2}${t}${cnst} _starExcludes${_}=${_}${getObject([...starExcludes].map((property) => [property, "1"]), { lineBreakIndent: { base: t, t } })};` : "";
    getImportBindingsBlock = (importBindings, t, { _, n: n2 }) => importBindings.length > 0 ? `${n2}${t}var ${importBindings.join(`,${_}`)};` : "";
    getHoistedExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.hoisted).map((expt) => ({ name: expt.exported, value: expt.local })), t, snippets);
    getSyntheticExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.expression).map((expt) => ({ name: expt.exported, value: expt.local })), t, snippets);
    getMissingExportsBlock = (exports, t, snippets) => getExportsBlock(exports.filter((expt) => expt.local === MISSING_EXPORT_SHIM_VARIABLE).map((expt) => ({ name: expt.exported, value: MISSING_EXPORT_SHIM_VARIABLE })), t, snippets);
    finalisers = { amd, cjs, es, iife, system, umd };
    concatSeparator = (out, next) => next ? `${out}
${next}` : out;
    concatDblSeparator = (out, next) => next ? `${out}

${next}` : out;
    DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT = {
      amd: deconflictImportsOther,
      cjs: deconflictImportsOther,
      es: deconflictImportsEsmOrSystem,
      iife: deconflictImportsOther,
      system: deconflictImportsEsmOrSystem,
      umd: deconflictImportsOther
    };
    hashPlaceholderLeft = "!~{";
    hashPlaceholderRight = "}~";
    hashPlaceholderOverhead = hashPlaceholderLeft.length + hashPlaceholderRight.length;
    maxHashSize = 64;
    defaultHashSize = 8;
    getHashPlaceholderGenerator = () => {
      let nextIndex2 = 0;
      return (optionName, hashSize = defaultHashSize) => {
        if (hashSize > maxHashSize) {
          return error(errorFailedValidation(`Hashes cannot be longer than ${maxHashSize} characters, received ${hashSize}. Check the "${optionName}" option.`));
        }
        const placeholder = `${hashPlaceholderLeft}${toBase64(++nextIndex2).padStart(hashSize - hashPlaceholderOverhead, "0")}${hashPlaceholderRight}`;
        if (placeholder.length > hashSize) {
          return error(errorFailedValidation(`To generate hashes for this number of chunks (currently ${nextIndex2}), you need a minimum hash size of ${placeholder.length}, received ${hashSize}. Check the "${optionName}" option.`));
        }
        return placeholder;
      };
    };
    REPLACER_REGEX = new RegExp(`${hashPlaceholderLeft}[0-9a-zA-Z_$]{1,${maxHashSize - hashPlaceholderOverhead}}${hashPlaceholderRight}`, "g");
    replacePlaceholders = (code, hashesByPlaceholder) => code.replace(REPLACER_REGEX, (placeholder) => hashesByPlaceholder.get(placeholder) || placeholder);
    replaceSinglePlaceholder = (code, placeholder, value) => code.replace(REPLACER_REGEX, (match) => match === placeholder ? value : match);
    replacePlaceholdersWithDefaultAndGetContainedPlaceholders = (code, placeholders) => {
      const containedPlaceholders = /* @__PURE__ */ new Set();
      const transformedCode = code.replace(REPLACER_REGEX, (placeholder) => {
        if (placeholders.has(placeholder)) {
          containedPlaceholders.add(placeholder);
          return `${hashPlaceholderLeft}${"0".repeat(placeholder.length - hashPlaceholderOverhead)}${hashPlaceholderRight}`;
        }
        return placeholder;
      });
      return { containedPlaceholders, transformedCode };
    };
    lowercaseBundleKeys = Symbol("bundleKeys");
    FILE_PLACEHOLDER = {
      type: "placeholder"
    };
    getOutputBundle = (outputBundleBase) => {
      const reservedLowercaseBundleKeys = /* @__PURE__ */ new Set();
      return new Proxy(outputBundleBase, {
        deleteProperty(target, key) {
          if (typeof key === "string") {
            reservedLowercaseBundleKeys.delete(key.toLowerCase());
          }
          return Reflect.deleteProperty(target, key);
        },
        get(target, key) {
          if (key === lowercaseBundleKeys) {
            return reservedLowercaseBundleKeys;
          }
          return Reflect.get(target, key);
        },
        set(target, key, value) {
          if (typeof key === "string") {
            reservedLowercaseBundleKeys.add(key.toLowerCase());
          }
          return Reflect.set(target, key, value);
        }
      });
    };
    removeUnreferencedAssets = (outputBundle) => {
      const unreferencedAssets = /* @__PURE__ */ new Set();
      const bundleEntries = Object.values(outputBundle);
      for (const asset of bundleEntries) {
        asset.type === "asset" && asset.needsCodeReference && unreferencedAssets.add(asset.fileName);
      }
      for (const chunk of bundleEntries) {
        if (chunk.type === "chunk") {
          for (const referencedFile of chunk.referencedFiles) {
            unreferencedAssets.has(referencedFile) && unreferencedAssets.delete(referencedFile);
          }
        }
      }
      for (const file of unreferencedAssets) {
        delete outputBundle[file];
      }
    };
    NON_ASSET_EXTENSIONS = /* @__PURE__ */ new Set([
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".mjs",
      ".mts",
      ".cjs",
      ".cts"
    ]);
    Chunk2 = class {
      constructor(orderedModules, inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, manualChunkAlias, getPlaceholder, bundle, inputBase, snippets) {
        this.orderedModules = orderedModules;
        this.inputOptions = inputOptions;
        this.outputOptions = outputOptions;
        this.unsetOptions = unsetOptions;
        this.pluginDriver = pluginDriver;
        this.modulesById = modulesById;
        this.chunkByModule = chunkByModule;
        this.externalChunkByModule = externalChunkByModule;
        this.facadeChunkByModule = facadeChunkByModule;
        this.includedNamespaces = includedNamespaces;
        this.manualChunkAlias = manualChunkAlias;
        this.getPlaceholder = getPlaceholder;
        this.bundle = bundle;
        this.inputBase = inputBase;
        this.snippets = snippets;
        this.entryModules = [];
        this.exportMode = "named";
        this.facadeModule = null;
        this.namespaceVariableName = "";
        this.variableName = "";
        this.accessedGlobalsByScope = /* @__PURE__ */ new Map();
        this.dependencies = /* @__PURE__ */ new Set();
        this.dynamicEntryModules = [];
        this.dynamicName = null;
        this.exportNamesByVariable = /* @__PURE__ */ new Map();
        this.exports = /* @__PURE__ */ new Set();
        this.exportsByName = /* @__PURE__ */ new Map();
        this.fileName = null;
        this.implicitEntryModules = [];
        this.implicitlyLoadedBefore = /* @__PURE__ */ new Set();
        this.imports = /* @__PURE__ */ new Set();
        this.includedDynamicImports = null;
        this.includedReexportsByModule = /* @__PURE__ */ new Map();
        this.isEmpty = true;
        this.name = null;
        this.needsExportsShim = false;
        this.preRenderedChunkInfo = null;
        this.preliminaryFileName = null;
        this.renderedChunkInfo = null;
        this.renderedDependencies = null;
        this.renderedModules = /* @__PURE__ */ Object.create(null);
        this.sortedExportNames = null;
        this.strictFacade = false;
        this.execIndex = orderedModules.length > 0 ? orderedModules[0].execIndex : Infinity;
        const chunkModules = new Set(orderedModules);
        for (const module of orderedModules) {
          chunkByModule.set(module, this);
          if (module.namespace.included && !outputOptions.preserveModules) {
            includedNamespaces.add(module);
          }
          if (this.isEmpty && module.isIncluded()) {
            this.isEmpty = false;
          }
          if (module.info.isEntry || outputOptions.preserveModules) {
            this.entryModules.push(module);
          }
          for (const importer of module.includedDynamicImporters) {
            if (!chunkModules.has(importer)) {
              this.dynamicEntryModules.push(module);
              if (module.info.syntheticNamedExports) {
                includedNamespaces.add(module);
                this.exports.add(module.namespace);
              }
            }
          }
          if (module.implicitlyLoadedAfter.size > 0) {
            this.implicitEntryModules.push(module);
          }
        }
        this.suggestedVariableName = makeLegal(this.generateVariableName());
      }
      static generateFacade(inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, facadedModule, facadeName, getPlaceholder, bundle, inputBase, snippets) {
        const chunk = new Chunk2([], inputOptions, outputOptions, unsetOptions, pluginDriver, modulesById, chunkByModule, externalChunkByModule, facadeChunkByModule, includedNamespaces, null, getPlaceholder, bundle, inputBase, snippets);
        chunk.assignFacadeName(facadeName, facadedModule);
        if (!facadeChunkByModule.has(facadedModule)) {
          facadeChunkByModule.set(facadedModule, chunk);
        }
        for (const dependency of facadedModule.getDependenciesToBeIncluded()) {
          chunk.dependencies.add(dependency instanceof Module ? chunkByModule.get(dependency) : externalChunkByModule.get(dependency));
        }
        if (!chunk.dependencies.has(chunkByModule.get(facadedModule)) && facadedModule.info.moduleSideEffects && facadedModule.hasEffects()) {
          chunk.dependencies.add(chunkByModule.get(facadedModule));
        }
        chunk.ensureReexportsAreAvailableForModule(facadedModule);
        chunk.facadeModule = facadedModule;
        chunk.strictFacade = true;
        return chunk;
      }
      canModuleBeFacade(module, exposedVariables) {
        const moduleExportNamesByVariable = module.getExportNamesByVariable();
        for (const exposedVariable of this.exports) {
          if (!moduleExportNamesByVariable.has(exposedVariable)) {
            return false;
          }
        }
        for (const exposedVariable of exposedVariables) {
          if (!(moduleExportNamesByVariable.has(exposedVariable) || exposedVariable.module === module)) {
            return false;
          }
        }
        return true;
      }
      finalizeChunk(code, map, hashesByPlaceholder) {
        const renderedChunkInfo = this.getRenderedChunkInfo();
        const finalize = (code2) => replacePlaceholders(code2, hashesByPlaceholder);
        const fileName = this.fileName = finalize(renderedChunkInfo.fileName);
        return {
          ...renderedChunkInfo,
          code,
          dynamicImports: renderedChunkInfo.dynamicImports.map(finalize),
          fileName,
          implicitlyLoadedBefore: renderedChunkInfo.implicitlyLoadedBefore.map(finalize),
          importedBindings: Object.fromEntries(Object.entries(renderedChunkInfo.importedBindings).map(([fileName2, bindings]) => [
            finalize(fileName2),
            bindings
          ])),
          imports: renderedChunkInfo.imports.map(finalize),
          map,
          referencedFiles: renderedChunkInfo.referencedFiles.map(finalize)
        };
      }
      generateExports() {
        this.sortedExportNames = null;
        const remainingExports = new Set(this.exports);
        if (this.facadeModule !== null && (this.facadeModule.preserveSignature !== false || this.strictFacade)) {
          const exportNamesByVariable = this.facadeModule.getExportNamesByVariable();
          for (const [variable, exportNames] of exportNamesByVariable) {
            this.exportNamesByVariable.set(variable, [...exportNames]);
            for (const exportName of exportNames) {
              this.exportsByName.set(exportName, variable);
            }
            remainingExports.delete(variable);
          }
        }
        if (this.outputOptions.minifyInternalExports) {
          assignExportsToMangledNames(remainingExports, this.exportsByName, this.exportNamesByVariable);
        } else {
          assignExportsToNames(remainingExports, this.exportsByName, this.exportNamesByVariable);
        }
        if (this.outputOptions.preserveModules || this.facadeModule && this.facadeModule.info.isEntry)
          this.exportMode = getExportMode(this, this.outputOptions, this.facadeModule.id, this.inputOptions.onwarn);
      }
      generateFacades() {
        var _a;
        const facades = [];
        const entryModules = /* @__PURE__ */ new Set([...this.entryModules, ...this.implicitEntryModules]);
        const exposedVariables = new Set(this.dynamicEntryModules.map(({ namespace }) => namespace));
        for (const module of entryModules) {
          if (module.preserveSignature) {
            for (const exportedVariable of module.getExportNamesByVariable().keys()) {
              exposedVariables.add(exportedVariable);
            }
          }
        }
        for (const module of entryModules) {
          const requiredFacades = Array.from(
            new Set(module.chunkNames.filter(({ isUserDefined }) => isUserDefined).map(({ name }) => name)),
            // mapping must run after Set 'name' dedupe
            (name) => ({
              name
            })
          );
          if (requiredFacades.length === 0 && module.isUserDefinedEntryPoint) {
            requiredFacades.push({});
          }
          requiredFacades.push(...Array.from(module.chunkFileNames, (fileName) => ({ fileName })));
          if (requiredFacades.length === 0) {
            requiredFacades.push({});
          }
          if (!this.facadeModule) {
            const needsStrictFacade = !this.outputOptions.preserveModules && (module.preserveSignature === "strict" || module.preserveSignature === "exports-only" && module.getExportNamesByVariable().size > 0);
            if (!needsStrictFacade || this.canModuleBeFacade(module, exposedVariables)) {
              this.facadeModule = module;
              this.facadeChunkByModule.set(module, this);
              if (module.preserveSignature) {
                this.strictFacade = needsStrictFacade;
              }
              this.assignFacadeName(requiredFacades.shift(), module, this.outputOptions.preserveModules);
            }
          }
          for (const facadeName of requiredFacades) {
            facades.push(Chunk2.generateFacade(this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.modulesById, this.chunkByModule, this.externalChunkByModule, this.facadeChunkByModule, this.includedNamespaces, module, facadeName, this.getPlaceholder, this.bundle, this.inputBase, this.snippets));
          }
        }
        for (const module of this.dynamicEntryModules) {
          if (module.info.syntheticNamedExports)
            continue;
          if (!this.facadeModule && this.canModuleBeFacade(module, exposedVariables)) {
            this.facadeModule = module;
            this.facadeChunkByModule.set(module, this);
            this.strictFacade = true;
            this.dynamicName = getChunkNameFromModule(module);
          } else if (this.facadeModule === module && !this.strictFacade && this.canModuleBeFacade(module, exposedVariables)) {
            this.strictFacade = true;
          } else if (!((_a = this.facadeChunkByModule.get(module)) == null ? void 0 : _a.strictFacade)) {
            this.includedNamespaces.add(module);
            this.exports.add(module.namespace);
          }
        }
        if (!this.outputOptions.preserveModules) {
          this.addNecessaryImportsForFacades();
        }
        return facades;
      }
      getChunkName() {
        return this.name ?? (this.name = this.outputOptions.sanitizeFileName(this.getFallbackChunkName()));
      }
      getExportNames() {
        return this.sortedExportNames ?? (this.sortedExportNames = [...this.exportsByName.keys()].sort());
      }
      getFileName() {
        return this.fileName || this.getPreliminaryFileName().fileName;
      }
      getImportPath(importer) {
        return escapeId(getImportPath(importer, this.getFileName(), this.outputOptions.format === "amd" && !this.outputOptions.amd.forceJsExtensionForImports, true));
      }
      getPreliminaryFileName() {
        var _a;
        if (this.preliminaryFileName) {
          return this.preliminaryFileName;
        }
        let fileName;
        let hashPlaceholder = null;
        const { chunkFileNames, entryFileNames, file, format, preserveModules } = this.outputOptions;
        if (file) {
          fileName = (0, import_node_path.basename)(file);
        } else if (this.fileName === null) {
          const [pattern, patternName] = preserveModules || ((_a = this.facadeModule) == null ? void 0 : _a.isUserDefinedEntryPoint) ? [entryFileNames, "output.entryFileNames"] : [chunkFileNames, "output.chunkFileNames"];
          fileName = renderNamePattern(typeof pattern === "function" ? pattern(this.getPreRenderedChunkInfo()) : pattern, patternName, {
            format: () => format,
            hash: (size) => hashPlaceholder || (hashPlaceholder = this.getPlaceholder(patternName, size)),
            name: () => this.getChunkName()
          });
          if (!hashPlaceholder) {
            fileName = makeUnique(fileName, this.bundle);
          }
        } else {
          fileName = this.fileName;
        }
        if (!hashPlaceholder) {
          this.bundle[fileName] = FILE_PLACEHOLDER;
        }
        return this.preliminaryFileName = { fileName, hashPlaceholder };
      }
      getRenderedChunkInfo() {
        if (this.renderedChunkInfo) {
          return this.renderedChunkInfo;
        }
        return this.renderedChunkInfo = {
          ...this.getPreRenderedChunkInfo(),
          dynamicImports: this.getDynamicDependencies().map(resolveFileName),
          fileName: this.getFileName(),
          // eslint-disable-next-line unicorn/prefer-spread
          implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, resolveFileName),
          importedBindings: getImportedBindingsPerDependency(this.getRenderedDependencies(), resolveFileName),
          // eslint-disable-next-line unicorn/prefer-spread
          imports: Array.from(this.dependencies, resolveFileName),
          modules: this.renderedModules,
          referencedFiles: this.getReferencedFiles()
        };
      }
      getVariableExportName(variable) {
        if (this.outputOptions.preserveModules && variable instanceof NamespaceVariable) {
          return "*";
        }
        return this.exportNamesByVariable.get(variable)[0];
      }
      link() {
        this.dependencies = getStaticDependencies(this, this.orderedModules, this.chunkByModule, this.externalChunkByModule);
        for (const module of this.orderedModules) {
          this.addImplicitlyLoadedBeforeFromModule(module);
          this.setUpChunkImportsAndExportsForModule(module);
        }
      }
      async render() {
        const { dependencies, exportMode, facadeModule, inputOptions: { onwarn }, outputOptions, pluginDriver, snippets } = this;
        const { format, hoistTransitiveImports, preserveModules } = outputOptions;
        if (hoistTransitiveImports && !preserveModules && facadeModule !== null) {
          for (const dep of dependencies) {
            if (dep instanceof Chunk2)
              this.inlineChunkDependencies(dep);
          }
        }
        const preliminaryFileName = this.getPreliminaryFileName();
        const { accessedGlobals, indent, magicString, renderedSource, usedModules, usesTopLevelAwait } = this.renderModules(preliminaryFileName.fileName);
        const renderedDependencies = [...this.getRenderedDependencies().values()];
        const renderedExports = exportMode === "none" ? [] : this.getChunkExportDeclarations(format);
        let hasExports = renderedExports.length > 0;
        let hasDefaultExport = false;
        for (const renderedDependence of renderedDependencies) {
          const { reexports } = renderedDependence;
          if (reexports == null ? void 0 : reexports.length) {
            hasExports = true;
            if (!hasDefaultExport && reexports.some((reexport) => reexport.reexported === "default")) {
              hasDefaultExport = true;
            }
            if (format === "es") {
              renderedDependence.reexports = reexports.filter(
                // eslint-disable-next-line unicorn/prefer-array-some
                ({ reexported }) => !renderedExports.find(({ exported }) => exported === reexported)
              );
            }
          }
        }
        if (!hasDefaultExport) {
          for (const { exported } of renderedExports) {
            if (exported === "default") {
              hasDefaultExport = true;
              break;
            }
          }
        }
        const { intro, outro, banner, footer } = await createAddons(outputOptions, pluginDriver, this.getRenderedChunkInfo());
        finalisers[format](renderedSource, {
          accessedGlobals,
          dependencies: renderedDependencies,
          exports: renderedExports,
          hasDefaultExport,
          hasExports,
          id: preliminaryFileName.fileName,
          indent,
          intro,
          isEntryFacade: preserveModules || facadeModule !== null && facadeModule.info.isEntry,
          isModuleFacade: facadeModule !== null,
          namedExportsMode: exportMode !== "default",
          onwarn,
          outro,
          snippets,
          usesTopLevelAwait
        }, outputOptions);
        if (banner)
          magicString.prepend(banner);
        if (footer)
          magicString.append(footer);
        return {
          chunk: this,
          magicString,
          preliminaryFileName,
          usedModules
        };
      }
      addImplicitlyLoadedBeforeFromModule(baseModule) {
        const { chunkByModule, implicitlyLoadedBefore } = this;
        for (const module of baseModule.implicitlyLoadedBefore) {
          const chunk = chunkByModule.get(module);
          if (chunk && chunk !== this) {
            implicitlyLoadedBefore.add(chunk);
          }
        }
      }
      addNecessaryImportsForFacades() {
        for (const [module, variables] of this.includedReexportsByModule) {
          if (this.includedNamespaces.has(module)) {
            for (const variable of variables) {
              this.imports.add(variable);
            }
          }
        }
      }
      assignFacadeName({ fileName, name }, facadedModule, preservePath) {
        if (fileName) {
          this.fileName = fileName;
        } else {
          this.name = this.outputOptions.sanitizeFileName(name || (preservePath ? this.getPreserveModulesChunkNameFromModule(facadedModule) : getChunkNameFromModule(facadedModule)));
        }
      }
      checkCircularDependencyImport(variable, importingModule) {
        var _a;
        const variableModule = variable.module;
        if (variableModule instanceof Module) {
          const exportChunk = this.chunkByModule.get(variableModule);
          let alternativeReexportModule;
          do {
            alternativeReexportModule = importingModule.alternativeReexportModules.get(variable);
            if (alternativeReexportModule) {
              const exportingChunk = this.chunkByModule.get(alternativeReexportModule);
              if (exportingChunk !== exportChunk) {
                this.inputOptions.onwarn(errorCyclicCrossChunkReexport(
                  // Namespaces do not have an export name
                  ((_a = variableModule.getExportNamesByVariable().get(variable)) == null ? void 0 : _a[0]) || "*",
                  variableModule.id,
                  alternativeReexportModule.id,
                  importingModule.id,
                  this.outputOptions.preserveModules
                ));
              }
              importingModule = alternativeReexportModule;
            }
          } while (alternativeReexportModule);
        }
      }
      ensureReexportsAreAvailableForModule(module) {
        const includedReexports = [];
        const map = module.getExportNamesByVariable();
        for (const exportedVariable of map.keys()) {
          const isSynthetic = exportedVariable instanceof SyntheticNamedExportVariable;
          const importedVariable = isSynthetic ? exportedVariable.getBaseVariable() : exportedVariable;
          this.checkCircularDependencyImport(importedVariable, module);
          if (!(importedVariable instanceof NamespaceVariable && this.outputOptions.preserveModules)) {
            const exportingModule = importedVariable.module;
            if (exportingModule instanceof Module) {
              const chunk = this.chunkByModule.get(exportingModule);
              if (chunk && chunk !== this) {
                chunk.exports.add(importedVariable);
                includedReexports.push(importedVariable);
                if (isSynthetic) {
                  this.imports.add(importedVariable);
                }
              }
            }
          }
        }
        if (includedReexports.length > 0) {
          this.includedReexportsByModule.set(module, includedReexports);
        }
      }
      generateVariableName() {
        if (this.manualChunkAlias) {
          return this.manualChunkAlias;
        }
        const moduleForNaming = this.entryModules[0] || this.implicitEntryModules[0] || this.dynamicEntryModules[0] || this.orderedModules[this.orderedModules.length - 1];
        if (moduleForNaming) {
          return getChunkNameFromModule(moduleForNaming);
        }
        return "chunk";
      }
      getChunkExportDeclarations(format) {
        const exports = [];
        for (const exportName of this.getExportNames()) {
          if (exportName[0] === "*")
            continue;
          const variable = this.exportsByName.get(exportName);
          if (!(variable instanceof SyntheticNamedExportVariable)) {
            const module = variable.module;
            if (module) {
              const chunk = this.chunkByModule.get(module);
              if (chunk !== this) {
                if (!chunk || format !== "es") {
                  continue;
                }
                const chunkDep = this.renderedDependencies.get(chunk);
                if (!chunkDep) {
                  continue;
                }
                const { imports, reexports } = chunkDep;
                const importedByReexported = reexports == null ? void 0 : reexports.find(({ reexported }) => reexported === exportName);
                const isImported = imports == null ? void 0 : imports.find(({ imported }) => imported === (importedByReexported == null ? void 0 : importedByReexported.imported));
                if (!isImported) {
                  continue;
                }
              }
            }
          }
          let expression = null;
          let hoisted = false;
          let local = variable.getName(this.snippets.getPropertyAccess);
          if (variable instanceof LocalVariable) {
            for (const declaration of variable.declarations) {
              if (declaration.parent instanceof FunctionDeclaration || declaration instanceof ExportDefaultDeclaration && declaration.declaration instanceof FunctionDeclaration) {
                hoisted = true;
                break;
              }
            }
          } else if (variable instanceof SyntheticNamedExportVariable) {
            expression = local;
            if (format === "es") {
              local = variable.renderName;
            }
          }
          exports.push({
            exported: exportName,
            expression,
            hoisted,
            local
          });
        }
        return exports;
      }
      getDependenciesToBeDeconflicted(addNonNamespacesAndInteropHelpers, addDependenciesWithoutBindings, interop) {
        const dependencies = /* @__PURE__ */ new Set();
        const deconflictedDefault = /* @__PURE__ */ new Set();
        const deconflictedNamespace = /* @__PURE__ */ new Set();
        for (const variable of [...this.exportNamesByVariable.keys(), ...this.imports]) {
          if (addNonNamespacesAndInteropHelpers || variable.isNamespace) {
            const module = variable.module;
            if (module instanceof ExternalModule) {
              const chunk = this.externalChunkByModule.get(module);
              dependencies.add(chunk);
              if (addNonNamespacesAndInteropHelpers) {
                if (variable.name === "default") {
                  if (defaultInteropHelpersByInteropType[interop(module.id)]) {
                    deconflictedDefault.add(chunk);
                  }
                } else if (variable.name === "*" && namespaceInteropHelpersByInteropType[interop(module.id)]) {
                  deconflictedNamespace.add(chunk);
                }
              }
            } else {
              const chunk = this.chunkByModule.get(module);
              if (chunk !== this) {
                dependencies.add(chunk);
                if (addNonNamespacesAndInteropHelpers && chunk.exportMode === "default" && variable.isNamespace) {
                  deconflictedNamespace.add(chunk);
                }
              }
            }
          }
        }
        if (addDependenciesWithoutBindings) {
          for (const dependency of this.dependencies) {
            dependencies.add(dependency);
          }
        }
        return { deconflictedDefault, deconflictedNamespace, dependencies };
      }
      getDynamicDependencies() {
        return this.getIncludedDynamicImports().map((resolvedDynamicImport) => resolvedDynamicImport.facadeChunk || resolvedDynamicImport.chunk || resolvedDynamicImport.externalChunk || resolvedDynamicImport.resolution).filter((resolution) => resolution !== this && (resolution instanceof Chunk2 || resolution instanceof ExternalChunk));
      }
      getDynamicImportStringAndAssertions(resolution, fileName) {
        if (resolution instanceof ExternalModule) {
          const chunk = this.externalChunkByModule.get(resolution);
          return [`'${chunk.getImportPath(fileName)}'`, chunk.getImportAssertions(this.snippets)];
        }
        return [
          resolution || "",
          this.outputOptions.format === "es" && this.outputOptions.externalImportAssertions || null
        ];
      }
      getFallbackChunkName() {
        if (this.manualChunkAlias) {
          return this.manualChunkAlias;
        }
        if (this.dynamicName) {
          return this.dynamicName;
        }
        if (this.fileName) {
          return getAliasName(this.fileName);
        }
        return getAliasName(this.orderedModules[this.orderedModules.length - 1].id);
      }
      getImportSpecifiers() {
        const { interop } = this.outputOptions;
        const importsByDependency = /* @__PURE__ */ new Map();
        for (const variable of this.imports) {
          const module = variable.module;
          let dependency;
          let imported;
          if (module instanceof ExternalModule) {
            dependency = this.externalChunkByModule.get(module);
            imported = variable.name;
            if (imported !== "default" && imported !== "*" && interop(module.id) === "defaultOnly") {
              return error(errorUnexpectedNamedImport(module.id, imported, false));
            }
          } else {
            dependency = this.chunkByModule.get(module);
            imported = dependency.getVariableExportName(variable);
          }
          getOrCreate(importsByDependency, dependency, getNewArray).push({
            imported,
            local: variable.getName(this.snippets.getPropertyAccess)
          });
        }
        return importsByDependency;
      }
      getIncludedDynamicImports() {
        if (this.includedDynamicImports) {
          return this.includedDynamicImports;
        }
        const includedDynamicImports = [];
        for (const module of this.orderedModules) {
          for (const { node, resolution } of module.dynamicImports) {
            if (!node.included) {
              continue;
            }
            includedDynamicImports.push(resolution instanceof Module ? {
              chunk: this.chunkByModule.get(resolution),
              externalChunk: null,
              facadeChunk: this.facadeChunkByModule.get(resolution),
              node,
              resolution
            } : resolution instanceof ExternalModule ? {
              chunk: null,
              externalChunk: this.externalChunkByModule.get(resolution),
              facadeChunk: null,
              node,
              resolution
            } : { chunk: null, externalChunk: null, facadeChunk: null, node, resolution });
          }
        }
        return this.includedDynamicImports = includedDynamicImports;
      }
      getPreRenderedChunkInfo() {
        if (this.preRenderedChunkInfo) {
          return this.preRenderedChunkInfo;
        }
        const { dynamicEntryModules, facadeModule, implicitEntryModules, orderedModules } = this;
        return this.preRenderedChunkInfo = {
          exports: this.getExportNames(),
          facadeModuleId: facadeModule && facadeModule.id,
          isDynamicEntry: dynamicEntryModules.length > 0,
          isEntry: !!(facadeModule == null ? void 0 : facadeModule.info.isEntry),
          isImplicitEntry: implicitEntryModules.length > 0,
          moduleIds: orderedModules.map(({ id }) => id),
          name: this.getChunkName(),
          type: "chunk"
        };
      }
      getPreserveModulesChunkNameFromModule(module) {
        const predefinedChunkName = getPredefinedChunkNameFromModule(module);
        if (predefinedChunkName)
          return predefinedChunkName;
        const { preserveModulesRoot, sanitizeFileName: sanitizeFileName2 } = this.outputOptions;
        const sanitizedId = sanitizeFileName2(normalize(module.id.split(QUERY_HASH_REGEX, 1)[0]));
        const extensionName = (0, import_node_path.extname)(sanitizedId);
        const idWithoutExtension = NON_ASSET_EXTENSIONS.has(extensionName) ? sanitizedId.slice(0, -extensionName.length) : sanitizedId;
        if (isAbsolute(idWithoutExtension)) {
          return preserveModulesRoot && (0, import_node_path.resolve)(idWithoutExtension).startsWith(preserveModulesRoot) ? idWithoutExtension.slice(preserveModulesRoot.length).replace(/^[/\\]/, "") : relative(this.inputBase, idWithoutExtension);
        } else {
          return `_virtual/${(0, import_node_path.basename)(idWithoutExtension)}`;
        }
      }
      getReexportSpecifiers() {
        const { externalLiveBindings, interop } = this.outputOptions;
        const reexportSpecifiers = /* @__PURE__ */ new Map();
        for (let exportName of this.getExportNames()) {
          let dependency;
          let imported;
          let needsLiveBinding = false;
          if (exportName[0] === "*") {
            const id = exportName.slice(1);
            if (interop(id) === "defaultOnly") {
              this.inputOptions.onwarn(errorUnexpectedNamespaceReexport(id));
            }
            needsLiveBinding = externalLiveBindings;
            dependency = this.externalChunkByModule.get(this.modulesById.get(id));
            imported = exportName = "*";
          } else {
            const variable = this.exportsByName.get(exportName);
            if (variable instanceof SyntheticNamedExportVariable)
              continue;
            const module = variable.module;
            if (module instanceof Module) {
              dependency = this.chunkByModule.get(module);
              if (dependency === this)
                continue;
              imported = dependency.getVariableExportName(variable);
              needsLiveBinding = variable.isReassigned;
            } else {
              dependency = this.externalChunkByModule.get(module);
              imported = variable.name;
              if (imported !== "default" && imported !== "*" && interop(module.id) === "defaultOnly") {
                return error(errorUnexpectedNamedImport(module.id, imported, true));
              }
              needsLiveBinding = externalLiveBindings && (imported !== "default" || isDefaultAProperty(interop(module.id), true));
            }
          }
          getOrCreate(reexportSpecifiers, dependency, getNewArray).push({
            imported,
            needsLiveBinding,
            reexported: exportName
          });
        }
        return reexportSpecifiers;
      }
      getReferencedFiles() {
        const referencedFiles = /* @__PURE__ */ new Set();
        for (const module of this.orderedModules) {
          for (const meta of module.importMetas) {
            const fileName = meta.getReferencedFileName(this.pluginDriver);
            if (fileName) {
              referencedFiles.add(fileName);
            }
          }
        }
        return [...referencedFiles];
      }
      getRenderedDependencies() {
        if (this.renderedDependencies) {
          return this.renderedDependencies;
        }
        const importSpecifiers = this.getImportSpecifiers();
        const reexportSpecifiers = this.getReexportSpecifiers();
        const renderedDependencies = /* @__PURE__ */ new Map();
        const fileName = this.getFileName();
        for (const dep of this.dependencies) {
          const imports = importSpecifiers.get(dep) || null;
          const reexports = reexportSpecifiers.get(dep) || null;
          const namedExportsMode = dep instanceof ExternalChunk || dep.exportMode !== "default";
          const importPath = dep.getImportPath(fileName);
          renderedDependencies.set(dep, {
            assertions: dep instanceof ExternalChunk ? dep.getImportAssertions(this.snippets) : null,
            defaultVariableName: dep.defaultVariableName,
            globalName: dep instanceof ExternalChunk && (this.outputOptions.format === "umd" || this.outputOptions.format === "iife") && getGlobalName(dep, this.outputOptions.globals, (imports || reexports) !== null, this.inputOptions.onwarn),
            importPath,
            imports,
            isChunk: dep instanceof Chunk2,
            name: dep.variableName,
            namedExportsMode,
            namespaceVariableName: dep.namespaceVariableName,
            reexports
          });
        }
        return this.renderedDependencies = renderedDependencies;
      }
      inlineChunkDependencies(chunk) {
        for (const dep of chunk.dependencies) {
          if (this.dependencies.has(dep))
            continue;
          this.dependencies.add(dep);
          if (dep instanceof Chunk2) {
            this.inlineChunkDependencies(dep);
          }
        }
      }
      // This method changes properties on the AST before rendering and must not be async
      renderModules(fileName) {
        const { accessedGlobalsByScope, dependencies, exportNamesByVariable, includedNamespaces, inputOptions: { onwarn }, isEmpty, orderedModules, outputOptions, pluginDriver, renderedModules, snippets } = this;
        const { compact, dynamicImportFunction, format, freeze, namespaceToStringTag } = outputOptions;
        const { _, cnst, n: n2 } = snippets;
        this.setDynamicImportResolutions(fileName);
        this.setImportMetaResolutions(fileName);
        this.setIdentifierRenderResolutions();
        const magicString = new Bundle$1({ separator: `${n2}${n2}` });
        const indent = getIndentString(orderedModules, outputOptions);
        const usedModules = [];
        let hoistedSource = "";
        const accessedGlobals = /* @__PURE__ */ new Set();
        const renderedModuleSources = /* @__PURE__ */ new Map();
        const renderOptions = {
          dynamicImportFunction,
          exportNamesByVariable,
          format,
          freeze,
          indent,
          namespaceToStringTag,
          pluginDriver,
          snippets,
          useOriginalName: null
        };
        let usesTopLevelAwait = false;
        for (const module of orderedModules) {
          let renderedLength = 0;
          let source;
          if (module.isIncluded() || includedNamespaces.has(module)) {
            const rendered = module.render(renderOptions);
            ({ source } = rendered);
            usesTopLevelAwait || (usesTopLevelAwait = rendered.usesTopLevelAwait);
            renderedLength = source.length();
            if (renderedLength) {
              if (compact && source.lastLine().includes("//"))
                source.append("\n");
              renderedModuleSources.set(module, source);
              magicString.addSource(source);
              usedModules.push(module);
            }
            const namespace = module.namespace;
            if (includedNamespaces.has(module)) {
              const rendered2 = namespace.renderBlock(renderOptions);
              if (namespace.renderFirst())
                hoistedSource += n2 + rendered2;
              else
                magicString.addSource(new MagicString(rendered2));
            }
            const accessedGlobalVariables = accessedGlobalsByScope.get(module.scope);
            if (accessedGlobalVariables) {
              for (const name of accessedGlobalVariables) {
                accessedGlobals.add(name);
              }
            }
          }
          const { renderedExports, removedExports } = module.getRenderedExports();
          renderedModules[module.id] = {
            get code() {
              return (source == null ? void 0 : source.toString()) ?? null;
            },
            originalLength: module.originalCode.length,
            removedExports,
            renderedExports,
            renderedLength
          };
        }
        if (hoistedSource)
          magicString.prepend(hoistedSource + n2 + n2);
        if (this.needsExportsShim) {
          magicString.prepend(`${n2}${cnst} ${MISSING_EXPORT_SHIM_VARIABLE}${_}=${_}void 0;${n2}${n2}`);
        }
        const renderedSource = compact ? magicString : magicString.trim();
        if (isEmpty && this.getExportNames().length === 0 && dependencies.size === 0) {
          onwarn(errorEmptyChunk(this.getChunkName()));
        }
        return { accessedGlobals, indent, magicString, renderedSource, usedModules, usesTopLevelAwait };
      }
      setDynamicImportResolutions(fileName) {
        const { accessedGlobalsByScope, outputOptions, pluginDriver, snippets } = this;
        for (const resolvedDynamicImport of this.getIncludedDynamicImports()) {
          if (resolvedDynamicImport.chunk) {
            const { chunk, facadeChunk, node, resolution } = resolvedDynamicImport;
            if (chunk === this) {
              node.setInternalResolution(resolution.namespace);
            } else {
              node.setExternalResolution((facadeChunk || chunk).exportMode, resolution, outputOptions, snippets, pluginDriver, accessedGlobalsByScope, `'${(facadeChunk || chunk).getImportPath(fileName)}'`, !(facadeChunk == null ? void 0 : facadeChunk.strictFacade) && chunk.exportNamesByVariable.get(resolution.namespace)[0], null);
            }
          } else {
            const { node, resolution } = resolvedDynamicImport;
            const [resolutionString, assertions] = this.getDynamicImportStringAndAssertions(resolution, fileName);
            node.setExternalResolution("external", resolution, outputOptions, snippets, pluginDriver, accessedGlobalsByScope, resolutionString, false, assertions);
          }
        }
      }
      setIdentifierRenderResolutions() {
        const { format, interop, namespaceToStringTag, preserveModules, externalLiveBindings } = this.outputOptions;
        const syntheticExports = /* @__PURE__ */ new Set();
        for (const exportName of this.getExportNames()) {
          const exportVariable = this.exportsByName.get(exportName);
          if (format !== "es" && format !== "system" && exportVariable.isReassigned && !exportVariable.isId) {
            exportVariable.setRenderNames("exports", exportName);
          } else if (exportVariable instanceof SyntheticNamedExportVariable) {
            syntheticExports.add(exportVariable);
          } else {
            exportVariable.setRenderNames(null, null);
          }
        }
        for (const module of this.orderedModules) {
          if (module.needsExportShim) {
            this.needsExportsShim = true;
            break;
          }
        }
        const usedNames = /* @__PURE__ */ new Set(["Object", "Promise"]);
        if (this.needsExportsShim) {
          usedNames.add(MISSING_EXPORT_SHIM_VARIABLE);
        }
        if (namespaceToStringTag) {
          usedNames.add("Symbol");
        }
        switch (format) {
          case "system": {
            usedNames.add("module").add("exports");
            break;
          }
          case "es": {
            break;
          }
          case "cjs": {
            usedNames.add("module").add("require").add("__filename").add("__dirname");
          }
          default: {
            usedNames.add("exports");
            for (const helper of HELPER_NAMES) {
              usedNames.add(helper);
            }
          }
        }
        deconflictChunk(this.orderedModules, this.getDependenciesToBeDeconflicted(format !== "es" && format !== "system", format === "amd" || format === "umd" || format === "iife", interop), this.imports, usedNames, format, interop, preserveModules, externalLiveBindings, this.chunkByModule, this.externalChunkByModule, syntheticExports, this.exportNamesByVariable, this.accessedGlobalsByScope, this.includedNamespaces);
      }
      setImportMetaResolutions(fileName) {
        const { accessedGlobalsByScope, includedNamespaces, orderedModules, outputOptions: { format } } = this;
        for (const module of orderedModules) {
          for (const importMeta of module.importMetas) {
            importMeta.setResolution(format, accessedGlobalsByScope, fileName);
          }
          if (includedNamespaces.has(module)) {
            module.namespace.prepare(accessedGlobalsByScope);
          }
        }
      }
      setUpChunkImportsAndExportsForModule(module) {
        const moduleImports = new Set(module.includedImports);
        if (!this.outputOptions.preserveModules && this.includedNamespaces.has(module)) {
          const memberVariables = module.namespace.getMemberVariables();
          for (const variable of Object.values(memberVariables)) {
            moduleImports.add(variable);
          }
        }
        for (let variable of moduleImports) {
          if (variable instanceof ExportDefaultVariable) {
            variable = variable.getOriginalVariable();
          }
          if (variable instanceof SyntheticNamedExportVariable) {
            variable = variable.getBaseVariable();
          }
          const chunk = this.chunkByModule.get(variable.module);
          if (chunk !== this) {
            this.imports.add(variable);
            if (variable.module instanceof Module) {
              this.checkCircularDependencyImport(variable, module);
              if (!(variable instanceof NamespaceVariable && this.outputOptions.preserveModules)) {
                chunk.exports.add(variable);
              }
            }
          }
        }
        if (this.includedNamespaces.has(module) || module.info.isEntry && module.preserveSignature !== false || module.includedDynamicImporters.some((importer) => this.chunkByModule.get(importer) !== this)) {
          this.ensureReexportsAreAvailableForModule(module);
        }
        for (const { node, resolution } of module.dynamicImports) {
          if (node.included && resolution instanceof Module && this.chunkByModule.get(resolution) === this && !this.includedNamespaces.has(resolution)) {
            this.includedNamespaces.add(resolution);
            this.ensureReexportsAreAvailableForModule(resolution);
          }
        }
      }
    };
    QUERY_HASH_REGEX = /[#?]/;
    resolveFileName = (dependency) => dependency.getFileName();
    compareExecIndex = (unitA, unitB) => unitA.execIndex > unitB.execIndex ? 1 : -1;
    wrapIfNeeded = (code, needsParens) => needsParens ? `(${code})` : code;
    validPropertyName = /^(?!\d)[\w$]+$/;
    Source = class {
      constructor(filename, content) {
        this.isOriginal = true;
        this.filename = filename;
        this.content = content;
      }
      traceSegment(line, column, name) {
        return { column, line, name, source: this };
      }
    };
    Link = class {
      constructor(map, sources) {
        this.sources = sources;
        this.names = map.names;
        this.mappings = map.mappings;
      }
      traceMappings() {
        const sources = [];
        const sourceIndexMap = /* @__PURE__ */ new Map();
        const sourcesContent = [];
        const names = [];
        const nameIndexMap = /* @__PURE__ */ new Map();
        const mappings = [];
        for (const line of this.mappings) {
          const tracedLine = [];
          for (const segment of line) {
            if (segment.length === 1)
              continue;
            const source = this.sources[segment[1]];
            if (!source)
              continue;
            const traced = source.traceSegment(segment[2], segment[3], segment.length === 5 ? this.names[segment[4]] : "");
            if (traced) {
              const { column, line: line2, name, source: { content, filename } } = traced;
              let sourceIndex = sourceIndexMap.get(filename);
              if (sourceIndex === void 0) {
                sourceIndex = sources.length;
                sources.push(filename);
                sourceIndexMap.set(filename, sourceIndex);
                sourcesContent[sourceIndex] = content;
              } else if (sourcesContent[sourceIndex] == null) {
                sourcesContent[sourceIndex] = content;
              } else if (content != null && sourcesContent[sourceIndex] !== content) {
                return error(errorConflictingSourcemapSources(filename));
              }
              const tracedSegment = [segment[0], sourceIndex, line2, column];
              if (name) {
                let nameIndex = nameIndexMap.get(name);
                if (nameIndex === void 0) {
                  nameIndex = names.length;
                  names.push(name);
                  nameIndexMap.set(name, nameIndex);
                }
                tracedSegment[4] = nameIndex;
              }
              tracedLine.push(tracedSegment);
            }
          }
          mappings.push(tracedLine);
        }
        return { mappings, names, sources, sourcesContent };
      }
      traceSegment(line, column, name) {
        const segments = this.mappings[line];
        if (!segments)
          return null;
        let searchStart = 0;
        let searchEnd = segments.length - 1;
        while (searchStart <= searchEnd) {
          const m = searchStart + searchEnd >> 1;
          const segment = segments[m];
          if (segment[0] === column || searchStart === searchEnd) {
            if (segment.length == 1)
              return null;
            const source = this.sources[segment[1]];
            if (!source)
              return null;
            return source.traceSegment(segment[2], segment[3], segment.length === 5 ? this.names[segment[4]] : name);
          }
          if (segment[0] > column) {
            searchEnd = m - 1;
          } else {
            searchStart = m + 1;
          }
        }
        return null;
      }
    };
    createHash = () => (0, import_node_crypto.createHash)("sha256");
    Bundle2 = class {
      constructor(outputOptions, unsetOptions, inputOptions, pluginDriver, graph) {
        this.outputOptions = outputOptions;
        this.unsetOptions = unsetOptions;
        this.inputOptions = inputOptions;
        this.pluginDriver = pluginDriver;
        this.graph = graph;
        this.facadeChunkByModule = /* @__PURE__ */ new Map();
        this.includedNamespaces = /* @__PURE__ */ new Set();
      }
      async generate(isWrite) {
        timeStart("GENERATE", 1);
        const outputBundleBase = /* @__PURE__ */ Object.create(null);
        const outputBundle = getOutputBundle(outputBundleBase);
        this.pluginDriver.setOutputBundle(outputBundle, this.outputOptions);
        try {
          timeStart("initialize render", 2);
          await this.pluginDriver.hookParallel("renderStart", [this.outputOptions, this.inputOptions]);
          timeEnd("initialize render", 2);
          timeStart("generate chunks", 2);
          const getHashPlaceholder = getHashPlaceholderGenerator();
          const chunks = await this.generateChunks(outputBundle, getHashPlaceholder);
          if (chunks.length > 1) {
            validateOptionsForMultiChunkOutput(this.outputOptions, this.inputOptions.onwarn);
          }
          this.pluginDriver.setChunkInformation(this.facadeChunkByModule);
          for (const chunk of chunks) {
            chunk.generateExports();
          }
          timeEnd("generate chunks", 2);
          await renderChunks(chunks, outputBundle, this.pluginDriver, this.outputOptions, this.inputOptions.onwarn);
        } catch (error_) {
          await this.pluginDriver.hookParallel("renderError", [error_]);
          throw error_;
        }
        removeUnreferencedAssets(outputBundle);
        timeStart("generate bundle", 2);
        await this.pluginDriver.hookSeq("generateBundle", [
          this.outputOptions,
          outputBundle,
          isWrite
        ]);
        this.finaliseAssets(outputBundle);
        timeEnd("generate bundle", 2);
        timeEnd("GENERATE", 1);
        return outputBundleBase;
      }
      async addManualChunks(manualChunks) {
        const manualChunkAliasByEntry = /* @__PURE__ */ new Map();
        const chunkEntries = await Promise.all(Object.entries(manualChunks).map(async ([alias, files]) => ({
          alias,
          entries: await this.graph.moduleLoader.addAdditionalModules(files)
        })));
        for (const { alias, entries } of chunkEntries) {
          for (const entry of entries) {
            addModuleToManualChunk(alias, entry, manualChunkAliasByEntry);
          }
        }
        return manualChunkAliasByEntry;
      }
      assignManualChunks(getManualChunk) {
        const manualChunkAliasesWithEntry = [];
        const manualChunksApi = {
          getModuleIds: () => this.graph.modulesById.keys(),
          getModuleInfo: this.graph.getModuleInfo
        };
        for (const module of this.graph.modulesById.values()) {
          if (module instanceof Module) {
            const manualChunkAlias = getManualChunk(module.id, manualChunksApi);
            if (typeof manualChunkAlias === "string") {
              manualChunkAliasesWithEntry.push([manualChunkAlias, module]);
            }
          }
        }
        manualChunkAliasesWithEntry.sort(([aliasA], [aliasB]) => aliasA > aliasB ? 1 : aliasA < aliasB ? -1 : 0);
        const manualChunkAliasByEntry = /* @__PURE__ */ new Map();
        for (const [alias, module] of manualChunkAliasesWithEntry) {
          addModuleToManualChunk(alias, module, manualChunkAliasByEntry);
        }
        return manualChunkAliasByEntry;
      }
      finaliseAssets(bundle) {
        if (this.outputOptions.validate) {
          for (const file of Object.values(bundle)) {
            if ("code" in file) {
              try {
                this.graph.contextParse(file.code, {
                  ecmaVersion: "latest"
                });
              } catch (error_) {
                this.inputOptions.onwarn(errorChunkInvalid(file, error_));
              }
            }
          }
        }
        this.pluginDriver.finaliseAssets();
      }
      async generateChunks(bundle, getHashPlaceholder) {
        const { experimentalMinChunkSize, inlineDynamicImports, manualChunks, preserveModules } = this.outputOptions;
        const manualChunkAliasByEntry = typeof manualChunks === "object" ? await this.addManualChunks(manualChunks) : this.assignManualChunks(manualChunks);
        const snippets = getGenerateCodeSnippets(this.outputOptions);
        const includedModules = getIncludedModules(this.graph.modulesById);
        const inputBase = commondir(getAbsoluteEntryModulePaths(includedModules, preserveModules));
        const externalChunkByModule = getExternalChunkByModule(this.graph.modulesById, this.outputOptions, inputBase);
        const chunks = [];
        const chunkByModule = /* @__PURE__ */ new Map();
        for (const { alias, modules } of inlineDynamicImports ? [{ alias: null, modules: includedModules }] : preserveModules ? includedModules.map((module) => ({ alias: null, modules: [module] })) : getChunkAssignments(this.graph.entryModules, manualChunkAliasByEntry, experimentalMinChunkSize)) {
          sortByExecutionOrder(modules);
          const chunk = new Chunk2(modules, this.inputOptions, this.outputOptions, this.unsetOptions, this.pluginDriver, this.graph.modulesById, chunkByModule, externalChunkByModule, this.facadeChunkByModule, this.includedNamespaces, alias, getHashPlaceholder, bundle, inputBase, snippets);
          chunks.push(chunk);
        }
        for (const chunk of chunks) {
          chunk.link();
        }
        const facades = [];
        for (const chunk of chunks) {
          facades.push(...chunk.generateFacades());
        }
        return [...chunks, ...facades];
      }
    };
    astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
    astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938, 6, 4191];
    nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
    nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ";
    reservedWords = {
      3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
      5: "class enum extends super const export import",
      6: "enum",
      strict: "implements interface let package private protected public static yield",
      strictBind: "eval arguments"
    };
    ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
    keywords$1 = {
      5: ecma5AndLessKeywords,
      "5module": ecma5AndLessKeywords + " export import",
      6: ecma5AndLessKeywords + " const class extends export import super"
    };
    keywordRelationalOperator = /^in(stanceof)?$/;
    nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    TokenType = function TokenType2(label, conf) {
      if (conf === void 0)
        conf = {};
      this.label = label;
      this.keyword = conf.keyword;
      this.beforeExpr = !!conf.beforeExpr;
      this.startsExpr = !!conf.startsExpr;
      this.isLoop = !!conf.isLoop;
      this.isAssign = !!conf.isAssign;
      this.prefix = !!conf.prefix;
      this.postfix = !!conf.postfix;
      this.binop = conf.binop || null;
      this.updateContext = null;
    };
    beforeExpr = { beforeExpr: true };
    startsExpr = { startsExpr: true };
    keywords = {};
    types$1 = {
      num: new TokenType("num", startsExpr),
      regexp: new TokenType("regexp", startsExpr),
      string: new TokenType("string", startsExpr),
      name: new TokenType("name", startsExpr),
      privateId: new TokenType("privateId", startsExpr),
      eof: new TokenType("eof"),
      // Punctuation token types.
      bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
      bracketR: new TokenType("]"),
      braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
      braceR: new TokenType("}"),
      parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
      parenR: new TokenType(")"),
      comma: new TokenType(",", beforeExpr),
      semi: new TokenType(";", beforeExpr),
      colon: new TokenType(":", beforeExpr),
      dot: new TokenType("."),
      question: new TokenType("?", beforeExpr),
      questionDot: new TokenType("?."),
      arrow: new TokenType("=>", beforeExpr),
      template: new TokenType("template"),
      invalidTemplate: new TokenType("invalidTemplate"),
      ellipsis: new TokenType("...", beforeExpr),
      backQuote: new TokenType("`", startsExpr),
      dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
      // Operators. These carry several kinds of properties to help the
      // parser use them properly (the presence of these properties is
      // what categorizes them as operators).
      //
      // `binop`, when present, specifies that this operator is a binary
      // operator, and will refer to its precedence.
      //
      // `prefix` and `postfix` mark the operator as a prefix or postfix
      // unary operator.
      //
      // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
      // binary operators with a very low precedence, that should result
      // in AssignmentExpression nodes.
      eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
      assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
      incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
      prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
      logicalOR: binop("||", 1),
      logicalAND: binop("&&", 2),
      bitwiseOR: binop("|", 3),
      bitwiseXOR: binop("^", 4),
      bitwiseAND: binop("&", 5),
      equality: binop("==/!=/===/!==", 6),
      relational: binop("</>/<=/>=", 7),
      bitShift: binop("<</>>/>>>", 8),
      plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
      modulo: binop("%", 10),
      star: binop("*", 10),
      slash: binop("/", 10),
      starstar: new TokenType("**", { beforeExpr: true }),
      coalesce: binop("??", 1),
      // Keyword token types.
      _break: kw("break"),
      _case: kw("case", beforeExpr),
      _catch: kw("catch"),
      _continue: kw("continue"),
      _debugger: kw("debugger"),
      _default: kw("default", beforeExpr),
      _do: kw("do", { isLoop: true, beforeExpr: true }),
      _else: kw("else", beforeExpr),
      _finally: kw("finally"),
      _for: kw("for", { isLoop: true }),
      _function: kw("function", startsExpr),
      _if: kw("if"),
      _return: kw("return", beforeExpr),
      _switch: kw("switch"),
      _throw: kw("throw", beforeExpr),
      _try: kw("try"),
      _var: kw("var"),
      _const: kw("const"),
      _while: kw("while", { isLoop: true }),
      _with: kw("with"),
      _new: kw("new", { beforeExpr: true, startsExpr: true }),
      _this: kw("this", startsExpr),
      _super: kw("super", startsExpr),
      _class: kw("class", startsExpr),
      _extends: kw("extends", beforeExpr),
      _export: kw("export"),
      _import: kw("import", startsExpr),
      _null: kw("null", startsExpr),
      _true: kw("true", startsExpr),
      _false: kw("false", startsExpr),
      _in: kw("in", { beforeExpr: true, binop: 7 }),
      _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
      _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
      _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
      _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
    };
    lineBreak = /\r\n?|\n|\u2028|\u2029/;
    lineBreakG = new RegExp(lineBreak.source, "g");
    nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
    ref = Object.prototype;
    hasOwnProperty = ref.hasOwnProperty;
    toString = ref.toString;
    hasOwn = Object.hasOwn || function(obj, propName) {
      return hasOwnProperty.call(obj, propName);
    };
    isArray = Array.isArray || function(obj) {
      return toString.call(obj) === "[object Array]";
    };
    loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
    Position = function Position2(line, col) {
      this.line = line;
      this.column = col;
    };
    Position.prototype.offset = function offset(n2) {
      return new Position(this.line, this.column + n2);
    };
    SourceLocation = function SourceLocation2(p, start, end) {
      this.start = start;
      this.end = end;
      if (p.sourceFile !== null) {
        this.source = p.sourceFile;
      }
    };
    defaultOptions = {
      // `ecmaVersion` indicates the ECMAScript version to parse. Must be
      // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
      // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
      // (the latest version the library supports). This influences
      // support for strict mode, the set of reserved words, and support
      // for new syntax features.
      ecmaVersion: null,
      // `sourceType` indicates the mode the code should be parsed in.
      // Can be either `"script"` or `"module"`. This influences global
      // strict mode and parsing of `import` and `export` declarations.
      sourceType: "script",
      // `onInsertedSemicolon` can be a callback that will be called
      // when a semicolon is automatically inserted. It will be passed
      // the position of the comma as an offset, and if `locations` is
      // enabled, it is given the location as a `{line, column}` object
      // as second argument.
      onInsertedSemicolon: null,
      // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
      // trailing commas.
      onTrailingComma: null,
      // By default, reserved words are only enforced if ecmaVersion >= 5.
      // Set `allowReserved` to a boolean value to explicitly turn this on
      // an off. When this option has the value "never", reserved words
      // and keywords can also not be used as property names.
      allowReserved: null,
      // When enabled, a return at the top level is not considered an
      // error.
      allowReturnOutsideFunction: false,
      // When enabled, import/export statements are not constrained to
      // appearing at the top of the program, and an import.meta expression
      // in a script isn't considered an error.
      allowImportExportEverywhere: false,
      // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
      // When enabled, await identifiers are allowed to appear at the top-level scope,
      // but they are still not allowed in non-async functions.
      allowAwaitOutsideFunction: null,
      // When enabled, super identifiers are not constrained to
      // appearing in methods and do not raise an error when they appear elsewhere.
      allowSuperOutsideMethod: null,
      // When enabled, hashbang directive in the beginning of file is
      // allowed and treated as a line comment. Enabled by default when
      // `ecmaVersion` >= 2023.
      allowHashBang: false,
      // When `locations` is on, `loc` properties holding objects with
      // `start` and `end` properties in `{line, column}` form (with
      // line being 1-based and column 0-based) will be attached to the
      // nodes.
      locations: false,
      // A function can be passed as `onToken` option, which will
      // cause Acorn to call that function with object in the same
      // format as tokens returned from `tokenizer().getToken()`. Note
      // that you are not allowed to call the parser from the
      // callback—that will corrupt its internal state.
      onToken: null,
      // A function can be passed as `onComment` option, which will
      // cause Acorn to call that function with `(block, text, start,
      // end)` parameters whenever a comment is skipped. `block` is a
      // boolean indicating whether this is a block (`/* */`) comment,
      // `text` is the content of the comment, and `start` and `end` are
      // character offsets that denote the start and end of the comment.
      // When the `locations` option is on, two more parameters are
      // passed, the full `{line, column}` locations of the start and
      // end of the comments. Note that you are not allowed to call the
      // parser from the callback—that will corrupt its internal state.
      onComment: null,
      // Nodes have their start and end characters offsets recorded in
      // `start` and `end` properties (directly on the node, rather than
      // the `loc` object, which holds line/column data. To also add a
      // [semi-standardized][range] `range` property holding a `[start,
      // end]` array with the same numbers, set the `ranges` option to
      // `true`.
      //
      // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
      ranges: false,
      // It is possible to parse multiple files into a single AST by
      // passing the tree produced by parsing the first file as
      // `program` option in subsequent parses. This will add the
      // toplevel forms of the parsed file to the `Program` (top) node
      // of an existing parse tree.
      program: null,
      // When `locations` is on, you can pass this to record the source
      // file in every node's `loc` object.
      sourceFile: null,
      // This value, if given, is stored in every node, whether
      // `locations` is on or off.
      directSourceFile: null,
      // When enabled, parenthesized expressions are represented by
      // (non-standard) ParenthesizedExpression nodes
      preserveParens: false
    };
    warnedAboutEcmaVersion = false;
    SCOPE_TOP = 1;
    SCOPE_FUNCTION = 2;
    SCOPE_ASYNC = 4;
    SCOPE_GENERATOR = 8;
    SCOPE_ARROW = 16;
    SCOPE_SIMPLE_CATCH = 32;
    SCOPE_SUPER = 64;
    SCOPE_DIRECT_SUPER = 128;
    SCOPE_CLASS_STATIC_BLOCK = 256;
    SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
    BIND_NONE = 0;
    BIND_VAR = 1;
    BIND_LEXICAL = 2;
    BIND_FUNCTION = 3;
    BIND_SIMPLE_CATCH = 4;
    BIND_OUTSIDE = 5;
    Parser = function Parser2(options, input, startPos) {
      this.options = options = getOptions(options);
      this.sourceFile = options.sourceFile;
      this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
      var reserved = "";
      if (options.allowReserved !== true) {
        reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
        if (options.sourceType === "module") {
          reserved += " await";
        }
      }
      this.reservedWords = wordsRegexp(reserved);
      var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
      this.reservedWordsStrict = wordsRegexp(reservedStrict);
      this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
      this.input = String(input);
      this.containsEsc = false;
      if (startPos) {
        this.pos = startPos;
        this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
        this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
      } else {
        this.pos = this.lineStart = 0;
        this.curLine = 1;
      }
      this.type = types$1.eof;
      this.value = null;
      this.start = this.end = this.pos;
      this.startLoc = this.endLoc = this.curPosition();
      this.lastTokEndLoc = this.lastTokStartLoc = null;
      this.lastTokStart = this.lastTokEnd = this.pos;
      this.context = this.initialContext();
      this.exprAllowed = true;
      this.inModule = options.sourceType === "module";
      this.strict = this.inModule || this.strictDirective(this.pos);
      this.potentialArrowAt = -1;
      this.potentialArrowInForAwait = false;
      this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
      this.labels = [];
      this.undefinedExports = /* @__PURE__ */ Object.create(null);
      if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
        this.skipLineComment(2);
      }
      this.scopeStack = [];
      this.enterScope(SCOPE_TOP);
      this.regexpState = null;
      this.privateNameStack = [];
    };
    prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
    Parser.prototype.parse = function parse() {
      var node = this.options.program || this.startNode();
      this.nextToken();
      return this.parseTopLevel(node);
    };
    prototypeAccessors.inFunction.get = function() {
      return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
    };
    prototypeAccessors.inGenerator.get = function() {
      return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit;
    };
    prototypeAccessors.inAsync.get = function() {
      return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit;
    };
    prototypeAccessors.canAwait.get = function() {
      for (var i = this.scopeStack.length - 1; i >= 0; i--) {
        var scope = this.scopeStack[i];
        if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) {
          return false;
        }
        if (scope.flags & SCOPE_FUNCTION) {
          return (scope.flags & SCOPE_ASYNC) > 0;
        }
      }
      return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
    };
    prototypeAccessors.allowSuper.get = function() {
      var ref2 = this.currentThisScope();
      var flags = ref2.flags;
      var inClassFieldInit = ref2.inClassFieldInit;
      return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod;
    };
    prototypeAccessors.allowDirectSuper.get = function() {
      return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
    };
    prototypeAccessors.treatFunctionsAsVar.get = function() {
      return this.treatFunctionsAsVarInScope(this.currentScope());
    };
    prototypeAccessors.allowNewDotTarget.get = function() {
      var ref2 = this.currentThisScope();
      var flags = ref2.flags;
      var inClassFieldInit = ref2.inClassFieldInit;
      return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit;
    };
    prototypeAccessors.inClassStaticBlock.get = function() {
      return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
    };
    Parser.extend = function extend() {
      var plugins = [], len = arguments.length;
      while (len--)
        plugins[len] = arguments[len];
      var cls = this;
      for (var i = 0; i < plugins.length; i++) {
        cls = plugins[i](cls);
      }
      return cls;
    };
    Parser.parse = function parse2(input, options) {
      return new this(options, input).parse();
    };
    Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
      var parser = new this(options, input, pos);
      parser.nextToken();
      return parser.parseExpression();
    };
    Parser.tokenizer = function tokenizer(input, options) {
      return new this(options, input);
    };
    Object.defineProperties(Parser.prototype, prototypeAccessors);
    pp$9 = Parser.prototype;
    literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
    pp$9.strictDirective = function(start) {
      if (this.options.ecmaVersion < 5) {
        return false;
      }
      for (; ; ) {
        skipWhiteSpace.lastIndex = start;
        start += skipWhiteSpace.exec(this.input)[0].length;
        var match = literal.exec(this.input.slice(start));
        if (!match) {
          return false;
        }
        if ((match[1] || match[2]) === "use strict") {
          skipWhiteSpace.lastIndex = start + match[0].length;
          var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
          var next = this.input.charAt(end);
          return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
        }
        start += match[0].length;
        skipWhiteSpace.lastIndex = start;
        start += skipWhiteSpace.exec(this.input)[0].length;
        if (this.input[start] === ";") {
          start++;
        }
      }
    };
    pp$9.eat = function(type) {
      if (this.type === type) {
        this.next();
        return true;
      } else {
        return false;
      }
    };
    pp$9.isContextual = function(name) {
      return this.type === types$1.name && this.value === name && !this.containsEsc;
    };
    pp$9.eatContextual = function(name) {
      if (!this.isContextual(name)) {
        return false;
      }
      this.next();
      return true;
    };
    pp$9.expectContextual = function(name) {
      if (!this.eatContextual(name)) {
        this.unexpected();
      }
    };
    pp$9.canInsertSemicolon = function() {
      return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    };
    pp$9.insertSemicolon = function() {
      if (this.canInsertSemicolon()) {
        if (this.options.onInsertedSemicolon) {
          this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
        }
        return true;
      }
    };
    pp$9.semicolon = function() {
      if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
        this.unexpected();
      }
    };
    pp$9.afterTrailingComma = function(tokType, notNext) {
      if (this.type === tokType) {
        if (this.options.onTrailingComma) {
          this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
        }
        if (!notNext) {
          this.next();
        }
        return true;
      }
    };
    pp$9.expect = function(type) {
      this.eat(type) || this.unexpected();
    };
    pp$9.unexpected = function(pos) {
      this.raise(pos != null ? pos : this.start, "Unexpected token");
    };
    DestructuringErrors = function DestructuringErrors2() {
      this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
    };
    pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
      if (!refDestructuringErrors) {
        return;
      }
      if (refDestructuringErrors.trailingComma > -1) {
        this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
      }
      var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
      if (parens > -1) {
        this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
      }
    };
    pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
      if (!refDestructuringErrors) {
        return false;
      }
      var shorthandAssign = refDestructuringErrors.shorthandAssign;
      var doubleProto = refDestructuringErrors.doubleProto;
      if (!andThrow) {
        return shorthandAssign >= 0 || doubleProto >= 0;
      }
      if (shorthandAssign >= 0) {
        this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
      }
      if (doubleProto >= 0) {
        this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
      }
    };
    pp$9.checkYieldAwaitInDefaultParams = function() {
      if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
        this.raise(this.yieldPos, "Yield expression cannot be a default value");
      }
      if (this.awaitPos) {
        this.raise(this.awaitPos, "Await expression cannot be a default value");
      }
    };
    pp$9.isSimpleAssignTarget = function(expr) {
      if (expr.type === "ParenthesizedExpression") {
        return this.isSimpleAssignTarget(expr.expression);
      }
      return expr.type === "Identifier" || expr.type === "MemberExpression";
    };
    pp$8 = Parser.prototype;
    pp$8.parseTopLevel = function(node) {
      var exports = /* @__PURE__ */ Object.create(null);
      if (!node.body) {
        node.body = [];
      }
      while (this.type !== types$1.eof) {
        var stmt = this.parseStatement(null, true, exports);
        node.body.push(stmt);
      }
      if (this.inModule) {
        for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
          var name = list[i];
          this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
        }
      }
      this.adaptDirectivePrologue(node.body);
      this.next();
      node.sourceType = this.options.sourceType;
      return this.finishNode(node, "Program");
    };
    loopLabel = { kind: "loop" };
    switchLabel = { kind: "switch" };
    pp$8.isLet = function(context) {
      if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
        return false;
      }
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input);
      var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
      if (nextCh === 91 || nextCh === 92) {
        return true;
      }
      if (context) {
        return false;
      }
      if (nextCh === 123 || nextCh > 55295 && nextCh < 56320) {
        return true;
      }
      if (isIdentifierStart(nextCh, true)) {
        var pos = next + 1;
        while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) {
          ++pos;
        }
        if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
          return true;
        }
        var ident = this.input.slice(next, pos);
        if (!keywordRelationalOperator.test(ident)) {
          return true;
        }
      }
      return false;
    };
    pp$8.isAsyncFunction = function() {
      if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
        return false;
      }
      skipWhiteSpace.lastIndex = this.pos;
      var skip = skipWhiteSpace.exec(this.input);
      var next = this.pos + skip[0].length, after;
      return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
    };
    pp$8.parseStatement = function(context, topLevel, exports) {
      var starttype = this.type, node = this.startNode(), kind;
      if (this.isLet(context)) {
        starttype = types$1._var;
        kind = "let";
      }
      switch (starttype) {
        case types$1._break:
        case types$1._continue:
          return this.parseBreakContinueStatement(node, starttype.keyword);
        case types$1._debugger:
          return this.parseDebuggerStatement(node);
        case types$1._do:
          return this.parseDoStatement(node);
        case types$1._for:
          return this.parseForStatement(node);
        case types$1._function:
          if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
            this.unexpected();
          }
          return this.parseFunctionStatement(node, false, !context);
        case types$1._class:
          if (context) {
            this.unexpected();
          }
          return this.parseClass(node, true);
        case types$1._if:
          return this.parseIfStatement(node);
        case types$1._return:
          return this.parseReturnStatement(node);
        case types$1._switch:
          return this.parseSwitchStatement(node);
        case types$1._throw:
          return this.parseThrowStatement(node);
        case types$1._try:
          return this.parseTryStatement(node);
        case types$1._const:
        case types$1._var:
          kind = kind || this.value;
          if (context && kind !== "var") {
            this.unexpected();
          }
          return this.parseVarStatement(node, kind);
        case types$1._while:
          return this.parseWhileStatement(node);
        case types$1._with:
          return this.parseWithStatement(node);
        case types$1.braceL:
          return this.parseBlock(true, node);
        case types$1.semi:
          return this.parseEmptyStatement(node);
        case types$1._export:
        case types$1._import:
          if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
            skipWhiteSpace.lastIndex = this.pos;
            var skip = skipWhiteSpace.exec(this.input);
            var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
            if (nextCh === 40 || nextCh === 46) {
              return this.parseExpressionStatement(node, this.parseExpression());
            }
          }
          if (!this.options.allowImportExportEverywhere) {
            if (!topLevel) {
              this.raise(this.start, "'import' and 'export' may only appear at the top level");
            }
            if (!this.inModule) {
              this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
            }
          }
          return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports);
        default:
          if (this.isAsyncFunction()) {
            if (context) {
              this.unexpected();
            }
            this.next();
            return this.parseFunctionStatement(node, true, !context);
          }
          var maybeName = this.value, expr = this.parseExpression();
          if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
            return this.parseLabeledStatement(node, maybeName, expr, context);
          } else {
            return this.parseExpressionStatement(node, expr);
          }
      }
    };
    pp$8.parseBreakContinueStatement = function(node, keyword2) {
      var isBreak = keyword2 === "break";
      this.next();
      if (this.eat(types$1.semi) || this.insertSemicolon()) {
        node.label = null;
      } else if (this.type !== types$1.name) {
        this.unexpected();
      } else {
        node.label = this.parseIdent();
        this.semicolon();
      }
      var i = 0;
      for (; i < this.labels.length; ++i) {
        var lab = this.labels[i];
        if (node.label == null || lab.name === node.label.name) {
          if (lab.kind != null && (isBreak || lab.kind === "loop")) {
            break;
          }
          if (node.label && isBreak) {
            break;
          }
        }
      }
      if (i === this.labels.length) {
        this.raise(node.start, "Unsyntactic " + keyword2);
      }
      return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
    };
    pp$8.parseDebuggerStatement = function(node) {
      this.next();
      this.semicolon();
      return this.finishNode(node, "DebuggerStatement");
    };
    pp$8.parseDoStatement = function(node) {
      this.next();
      this.labels.push(loopLabel);
      node.body = this.parseStatement("do");
      this.labels.pop();
      this.expect(types$1._while);
      node.test = this.parseParenExpression();
      if (this.options.ecmaVersion >= 6) {
        this.eat(types$1.semi);
      } else {
        this.semicolon();
      }
      return this.finishNode(node, "DoWhileStatement");
    };
    pp$8.parseForStatement = function(node) {
      this.next();
      var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
      this.labels.push(loopLabel);
      this.enterScope(0);
      this.expect(types$1.parenL);
      if (this.type === types$1.semi) {
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
        return this.parseFor(node, null);
      }
      var isLet = this.isLet();
      if (this.type === types$1._var || this.type === types$1._const || isLet) {
        var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
        this.next();
        this.parseVar(init$1, true, kind);
        this.finishNode(init$1, "VariableDeclaration");
        if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
          if (this.options.ecmaVersion >= 9) {
            if (this.type === types$1._in) {
              if (awaitAt > -1) {
                this.unexpected(awaitAt);
              }
            } else {
              node.await = awaitAt > -1;
            }
          }
          return this.parseForIn(node, init$1);
        }
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
        return this.parseFor(node, init$1);
      }
      var startsWithLet = this.isContextual("let"), isForOf = false;
      var refDestructuringErrors = new DestructuringErrors();
      var init2 = this.parseExpression(awaitAt > -1 ? "await" : true, refDestructuringErrors);
      if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
        if (this.options.ecmaVersion >= 9) {
          if (this.type === types$1._in) {
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
          } else {
            node.await = awaitAt > -1;
          }
        }
        if (startsWithLet && isForOf) {
          this.raise(init2.start, "The left-hand side of a for-of loop may not start with 'let'.");
        }
        this.toAssignable(init2, false, refDestructuringErrors);
        this.checkLValPattern(init2);
        return this.parseForIn(node, init2);
      } else {
        this.checkExpressionErrors(refDestructuringErrors, true);
      }
      if (awaitAt > -1) {
        this.unexpected(awaitAt);
      }
      return this.parseFor(node, init2);
    };
    pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
      this.next();
      return this.parseFunction(node, FUNC_STATEMENT$1 | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
    };
    pp$8.parseIfStatement = function(node) {
      this.next();
      node.test = this.parseParenExpression();
      node.consequent = this.parseStatement("if");
      node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
      return this.finishNode(node, "IfStatement");
    };
    pp$8.parseReturnStatement = function(node) {
      if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
        this.raise(this.start, "'return' outside of function");
      }
      this.next();
      if (this.eat(types$1.semi) || this.insertSemicolon()) {
        node.argument = null;
      } else {
        node.argument = this.parseExpression();
        this.semicolon();
      }
      return this.finishNode(node, "ReturnStatement");
    };
    pp$8.parseSwitchStatement = function(node) {
      this.next();
      node.discriminant = this.parseParenExpression();
      node.cases = [];
      this.expect(types$1.braceL);
      this.labels.push(switchLabel);
      this.enterScope(0);
      var cur;
      for (var sawDefault = false; this.type !== types$1.braceR; ) {
        if (this.type === types$1._case || this.type === types$1._default) {
          var isCase = this.type === types$1._case;
          if (cur) {
            this.finishNode(cur, "SwitchCase");
          }
          node.cases.push(cur = this.startNode());
          cur.consequent = [];
          this.next();
          if (isCase) {
            cur.test = this.parseExpression();
          } else {
            if (sawDefault) {
              this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
            }
            sawDefault = true;
            cur.test = null;
          }
          this.expect(types$1.colon);
        } else {
          if (!cur) {
            this.unexpected();
          }
          cur.consequent.push(this.parseStatement(null));
        }
      }
      this.exitScope();
      if (cur) {
        this.finishNode(cur, "SwitchCase");
      }
      this.next();
      this.labels.pop();
      return this.finishNode(node, "SwitchStatement");
    };
    pp$8.parseThrowStatement = function(node) {
      this.next();
      if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
        this.raise(this.lastTokEnd, "Illegal newline after throw");
      }
      node.argument = this.parseExpression();
      this.semicolon();
      return this.finishNode(node, "ThrowStatement");
    };
    empty$1 = [];
    pp$8.parseTryStatement = function(node) {
      this.next();
      node.block = this.parseBlock();
      node.handler = null;
      if (this.type === types$1._catch) {
        var clause = this.startNode();
        this.next();
        if (this.eat(types$1.parenL)) {
          clause.param = this.parseBindingAtom();
          var simple = clause.param.type === "Identifier";
          this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
          this.checkLValPattern(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
          this.expect(types$1.parenR);
        } else {
          if (this.options.ecmaVersion < 10) {
            this.unexpected();
          }
          clause.param = null;
          this.enterScope(0);
        }
        clause.body = this.parseBlock(false);
        this.exitScope();
        node.handler = this.finishNode(clause, "CatchClause");
      }
      node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
      if (!node.handler && !node.finalizer) {
        this.raise(node.start, "Missing catch or finally clause");
      }
      return this.finishNode(node, "TryStatement");
    };
    pp$8.parseVarStatement = function(node, kind) {
      this.next();
      this.parseVar(node, false, kind);
      this.semicolon();
      return this.finishNode(node, "VariableDeclaration");
    };
    pp$8.parseWhileStatement = function(node) {
      this.next();
      node.test = this.parseParenExpression();
      this.labels.push(loopLabel);
      node.body = this.parseStatement("while");
      this.labels.pop();
      return this.finishNode(node, "WhileStatement");
    };
    pp$8.parseWithStatement = function(node) {
      if (this.strict) {
        this.raise(this.start, "'with' in strict mode");
      }
      this.next();
      node.object = this.parseParenExpression();
      node.body = this.parseStatement("with");
      return this.finishNode(node, "WithStatement");
    };
    pp$8.parseEmptyStatement = function(node) {
      this.next();
      return this.finishNode(node, "EmptyStatement");
    };
    pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
      for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
        var label = list[i$1];
        if (label.name === maybeName) {
          this.raise(expr.start, "Label '" + maybeName + "' is already declared");
        }
      }
      var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
      for (var i = this.labels.length - 1; i >= 0; i--) {
        var label$1 = this.labels[i];
        if (label$1.statementStart === node.start) {
          label$1.statementStart = this.start;
          label$1.kind = kind;
        } else {
          break;
        }
      }
      this.labels.push({ name: maybeName, kind, statementStart: this.start });
      node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
      this.labels.pop();
      node.label = expr;
      return this.finishNode(node, "LabeledStatement");
    };
    pp$8.parseExpressionStatement = function(node, expr) {
      node.expression = expr;
      this.semicolon();
      return this.finishNode(node, "ExpressionStatement");
    };
    pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
      if (createNewLexicalScope === void 0)
        createNewLexicalScope = true;
      if (node === void 0)
        node = this.startNode();
      node.body = [];
      this.expect(types$1.braceL);
      if (createNewLexicalScope) {
        this.enterScope(0);
      }
      while (this.type !== types$1.braceR) {
        var stmt = this.parseStatement(null);
        node.body.push(stmt);
      }
      if (exitStrict) {
        this.strict = false;
      }
      this.next();
      if (createNewLexicalScope) {
        this.exitScope();
      }
      return this.finishNode(node, "BlockStatement");
    };
    pp$8.parseFor = function(node, init2) {
      node.init = init2;
      this.expect(types$1.semi);
      node.test = this.type === types$1.semi ? null : this.parseExpression();
      this.expect(types$1.semi);
      node.update = this.type === types$1.parenR ? null : this.parseExpression();
      this.expect(types$1.parenR);
      node.body = this.parseStatement("for");
      this.exitScope();
      this.labels.pop();
      return this.finishNode(node, "ForStatement");
    };
    pp$8.parseForIn = function(node, init2) {
      var isForIn = this.type === types$1._in;
      this.next();
      if (init2.type === "VariableDeclaration" && init2.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init2.kind !== "var" || init2.declarations[0].id.type !== "Identifier")) {
        this.raise(
          init2.start,
          (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
        );
      }
      node.left = init2;
      node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
      this.expect(types$1.parenR);
      node.body = this.parseStatement("for");
      this.exitScope();
      this.labels.pop();
      return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
    };
    pp$8.parseVar = function(node, isFor, kind) {
      node.declarations = [];
      node.kind = kind;
      for (; ; ) {
        var decl = this.startNode();
        this.parseVarId(decl, kind);
        if (this.eat(types$1.eq)) {
          decl.init = this.parseMaybeAssign(isFor);
        } else if (kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
          this.unexpected();
        } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
          this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
        } else {
          decl.init = null;
        }
        node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
        if (!this.eat(types$1.comma)) {
          break;
        }
      }
      return node;
    };
    pp$8.parseVarId = function(decl, kind) {
      decl.id = this.parseBindingAtom();
      this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
    };
    FUNC_STATEMENT$1 = 1;
    FUNC_HANGING_STATEMENT = 2;
    FUNC_NULLABLE_ID$1 = 4;
    pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
      this.initFunction(node);
      if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
        if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
          this.unexpected();
        }
        node.generator = this.eat(types$1.star);
      }
      if (this.options.ecmaVersion >= 8) {
        node.async = !!isAsync;
      }
      if (statement & FUNC_STATEMENT$1) {
        node.id = statement & FUNC_NULLABLE_ID$1 && this.type !== types$1.name ? null : this.parseIdent();
        if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
          this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
        }
      }
      var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      this.enterScope(functionFlags(node.async, node.generator));
      if (!(statement & FUNC_STATEMENT$1)) {
        node.id = this.type === types$1.name ? this.parseIdent() : null;
      }
      this.parseFunctionParams(node);
      this.parseFunctionBody(node, allowExpressionBody, false, forInit);
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.finishNode(node, statement & FUNC_STATEMENT$1 ? "FunctionDeclaration" : "FunctionExpression");
    };
    pp$8.parseFunctionParams = function(node) {
      this.expect(types$1.parenL);
      node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
      this.checkYieldAwaitInDefaultParams();
    };
    pp$8.parseClass = function(node, isStatement) {
      this.next();
      var oldStrict = this.strict;
      this.strict = true;
      this.parseClassId(node, isStatement);
      this.parseClassSuper(node);
      var privateNameMap = this.enterClassBody();
      var classBody = this.startNode();
      var hadConstructor = false;
      classBody.body = [];
      this.expect(types$1.braceL);
      while (this.type !== types$1.braceR) {
        var element = this.parseClassElement(node.superClass !== null);
        if (element) {
          classBody.body.push(element);
          if (element.type === "MethodDefinition" && element.kind === "constructor") {
            if (hadConstructor) {
              this.raise(element.start, "Duplicate constructor in the same class");
            }
            hadConstructor = true;
          } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
            this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
          }
        }
      }
      this.strict = oldStrict;
      this.next();
      node.body = this.finishNode(classBody, "ClassBody");
      this.exitClassBody();
      return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
    };
    pp$8.parseClassElement = function(constructorAllowsSuper) {
      if (this.eat(types$1.semi)) {
        return null;
      }
      var ecmaVersion = this.options.ecmaVersion;
      var node = this.startNode();
      var keyName = "";
      var isGenerator = false;
      var isAsync = false;
      var kind = "method";
      var isStatic = false;
      if (this.eatContextual("static")) {
        if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
          this.parseClassStaticBlock(node);
          return node;
        }
        if (this.isClassElementNameStart() || this.type === types$1.star) {
          isStatic = true;
        } else {
          keyName = "static";
        }
      }
      node.static = isStatic;
      if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
        if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
          isAsync = true;
        } else {
          keyName = "async";
        }
      }
      if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
        isGenerator = true;
      }
      if (!keyName && !isAsync && !isGenerator) {
        var lastValue = this.value;
        if (this.eatContextual("get") || this.eatContextual("set")) {
          if (this.isClassElementNameStart()) {
            kind = lastValue;
          } else {
            keyName = lastValue;
          }
        }
      }
      if (keyName) {
        node.computed = false;
        node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
        node.key.name = keyName;
        this.finishNode(node.key, "Identifier");
      } else {
        this.parseClassElementName(node);
      }
      if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
        var isConstructor = !node.static && checkKeyName(node, "constructor");
        var allowsDirectSuper = isConstructor && constructorAllowsSuper;
        if (isConstructor && kind !== "method") {
          this.raise(node.key.start, "Constructor can't have get/set modifier");
        }
        node.kind = isConstructor ? "constructor" : kind;
        this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
      } else {
        this.parseClassField(node);
      }
      return node;
    };
    pp$8.isClassElementNameStart = function() {
      return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
    };
    pp$8.parseClassElementName = function(element) {
      if (this.type === types$1.privateId) {
        if (this.value === "constructor") {
          this.raise(this.start, "Classes can't have an element named '#constructor'");
        }
        element.computed = false;
        element.key = this.parsePrivateIdent();
      } else {
        this.parsePropertyName(element);
      }
    };
    pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
      var key = method.key;
      if (method.kind === "constructor") {
        if (isGenerator) {
          this.raise(key.start, "Constructor can't be a generator");
        }
        if (isAsync) {
          this.raise(key.start, "Constructor can't be an async method");
        }
      } else if (method.static && checkKeyName(method, "prototype")) {
        this.raise(key.start, "Classes may not have a static property named prototype");
      }
      var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
      if (method.kind === "get" && value.params.length !== 0) {
        this.raiseRecoverable(value.start, "getter should have no params");
      }
      if (method.kind === "set" && value.params.length !== 1) {
        this.raiseRecoverable(value.start, "setter should have exactly one param");
      }
      if (method.kind === "set" && value.params[0].type === "RestElement") {
        this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
      }
      return this.finishNode(method, "MethodDefinition");
    };
    pp$8.parseClassField = function(field) {
      if (checkKeyName(field, "constructor")) {
        this.raise(field.key.start, "Classes can't have a field named 'constructor'");
      } else if (field.static && checkKeyName(field, "prototype")) {
        this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
      }
      if (this.eat(types$1.eq)) {
        var scope = this.currentThisScope();
        var inClassFieldInit = scope.inClassFieldInit;
        scope.inClassFieldInit = true;
        field.value = this.parseMaybeAssign();
        scope.inClassFieldInit = inClassFieldInit;
      } else {
        field.value = null;
      }
      this.semicolon();
      return this.finishNode(field, "PropertyDefinition");
    };
    pp$8.parseClassStaticBlock = function(node) {
      node.body = [];
      var oldLabels = this.labels;
      this.labels = [];
      this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
      while (this.type !== types$1.braceR) {
        var stmt = this.parseStatement(null);
        node.body.push(stmt);
      }
      this.next();
      this.exitScope();
      this.labels = oldLabels;
      return this.finishNode(node, "StaticBlock");
    };
    pp$8.parseClassId = function(node, isStatement) {
      if (this.type === types$1.name) {
        node.id = this.parseIdent();
        if (isStatement) {
          this.checkLValSimple(node.id, BIND_LEXICAL, false);
        }
      } else {
        if (isStatement === true) {
          this.unexpected();
        }
        node.id = null;
      }
    };
    pp$8.parseClassSuper = function(node) {
      node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
    };
    pp$8.enterClassBody = function() {
      var element = { declared: /* @__PURE__ */ Object.create(null), used: [] };
      this.privateNameStack.push(element);
      return element.declared;
    };
    pp$8.exitClassBody = function() {
      var ref2 = this.privateNameStack.pop();
      var declared = ref2.declared;
      var used = ref2.used;
      var len = this.privateNameStack.length;
      var parent = len === 0 ? null : this.privateNameStack[len - 1];
      for (var i = 0; i < used.length; ++i) {
        var id = used[i];
        if (!hasOwn(declared, id.name)) {
          if (parent) {
            parent.used.push(id);
          } else {
            this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
          }
        }
      }
    };
    pp$8.parseExport = function(node, exports) {
      this.next();
      if (this.eat(types$1.star)) {
        if (this.options.ecmaVersion >= 11) {
          if (this.eatContextual("as")) {
            node.exported = this.parseModuleExportName();
            this.checkExport(exports, node.exported, this.lastTokStart);
          } else {
            node.exported = null;
          }
        }
        this.expectContextual("from");
        if (this.type !== types$1.string) {
          this.unexpected();
        }
        node.source = this.parseExprAtom();
        this.semicolon();
        return this.finishNode(node, "ExportAllDeclaration");
      }
      if (this.eat(types$1._default)) {
        this.checkExport(exports, "default", this.lastTokStart);
        var isAsync;
        if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
          var fNode = this.startNode();
          this.next();
          if (isAsync) {
            this.next();
          }
          node.declaration = this.parseFunction(fNode, FUNC_STATEMENT$1 | FUNC_NULLABLE_ID$1, false, isAsync);
        } else if (this.type === types$1._class) {
          var cNode = this.startNode();
          node.declaration = this.parseClass(cNode, "nullableID");
        } else {
          node.declaration = this.parseMaybeAssign();
          this.semicolon();
        }
        return this.finishNode(node, "ExportDefaultDeclaration");
      }
      if (this.shouldParseExportStatement()) {
        node.declaration = this.parseStatement(null);
        if (node.declaration.type === "VariableDeclaration") {
          this.checkVariableExport(exports, node.declaration.declarations);
        } else {
          this.checkExport(exports, node.declaration.id, node.declaration.id.start);
        }
        node.specifiers = [];
        node.source = null;
      } else {
        node.declaration = null;
        node.specifiers = this.parseExportSpecifiers(exports);
        if (this.eatContextual("from")) {
          if (this.type !== types$1.string) {
            this.unexpected();
          }
          node.source = this.parseExprAtom();
        } else {
          for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
            var spec = list[i];
            this.checkUnreserved(spec.local);
            this.checkLocalExport(spec.local);
            if (spec.local.type === "Literal") {
              this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
            }
          }
          node.source = null;
        }
        this.semicolon();
      }
      return this.finishNode(node, "ExportNamedDeclaration");
    };
    pp$8.checkExport = function(exports, name, pos) {
      if (!exports) {
        return;
      }
      if (typeof name !== "string") {
        name = name.type === "Identifier" ? name.name : name.value;
      }
      if (hasOwn(exports, name)) {
        this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
      }
      exports[name] = true;
    };
    pp$8.checkPatternExport = function(exports, pat) {
      var type = pat.type;
      if (type === "Identifier") {
        this.checkExport(exports, pat, pat.start);
      } else if (type === "ObjectPattern") {
        for (var i = 0, list = pat.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.checkPatternExport(exports, prop);
        }
      } else if (type === "ArrayPattern") {
        for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
          var elt = list$1[i$1];
          if (elt) {
            this.checkPatternExport(exports, elt);
          }
        }
      } else if (type === "Property") {
        this.checkPatternExport(exports, pat.value);
      } else if (type === "AssignmentPattern") {
        this.checkPatternExport(exports, pat.left);
      } else if (type === "RestElement") {
        this.checkPatternExport(exports, pat.argument);
      } else if (type === "ParenthesizedExpression") {
        this.checkPatternExport(exports, pat.expression);
      }
    };
    pp$8.checkVariableExport = function(exports, decls) {
      if (!exports) {
        return;
      }
      for (var i = 0, list = decls; i < list.length; i += 1) {
        var decl = list[i];
        this.checkPatternExport(exports, decl.id);
      }
    };
    pp$8.shouldParseExportStatement = function() {
      return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
    };
    pp$8.parseExportSpecifiers = function(exports) {
      var nodes = [], first = true;
      this.expect(types$1.braceL);
      while (!this.eat(types$1.braceR)) {
        if (!first) {
          this.expect(types$1.comma);
          if (this.afterTrailingComma(types$1.braceR)) {
            break;
          }
        } else {
          first = false;
        }
        var node = this.startNode();
        node.local = this.parseModuleExportName();
        node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
        this.checkExport(
          exports,
          node.exported,
          node.exported.start
        );
        nodes.push(this.finishNode(node, "ExportSpecifier"));
      }
      return nodes;
    };
    pp$8.parseImport = function(node) {
      this.next();
      if (this.type === types$1.string) {
        node.specifiers = empty$1;
        node.source = this.parseExprAtom();
      } else {
        node.specifiers = this.parseImportSpecifiers();
        this.expectContextual("from");
        node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
      }
      this.semicolon();
      return this.finishNode(node, "ImportDeclaration");
    };
    pp$8.parseImportSpecifiers = function() {
      var nodes = [], first = true;
      if (this.type === types$1.name) {
        var node = this.startNode();
        node.local = this.parseIdent();
        this.checkLValSimple(node.local, BIND_LEXICAL);
        nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
        if (!this.eat(types$1.comma)) {
          return nodes;
        }
      }
      if (this.type === types$1.star) {
        var node$1 = this.startNode();
        this.next();
        this.expectContextual("as");
        node$1.local = this.parseIdent();
        this.checkLValSimple(node$1.local, BIND_LEXICAL);
        nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
        return nodes;
      }
      this.expect(types$1.braceL);
      while (!this.eat(types$1.braceR)) {
        if (!first) {
          this.expect(types$1.comma);
          if (this.afterTrailingComma(types$1.braceR)) {
            break;
          }
        } else {
          first = false;
        }
        var node$2 = this.startNode();
        node$2.imported = this.parseModuleExportName();
        if (this.eatContextual("as")) {
          node$2.local = this.parseIdent();
        } else {
          this.checkUnreserved(node$2.imported);
          node$2.local = node$2.imported;
        }
        this.checkLValSimple(node$2.local, BIND_LEXICAL);
        nodes.push(this.finishNode(node$2, "ImportSpecifier"));
      }
      return nodes;
    };
    pp$8.parseModuleExportName = function() {
      if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
        var stringLiteral = this.parseLiteral(this.value);
        if (loneSurrogate.test(stringLiteral.value)) {
          this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
        }
        return stringLiteral;
      }
      return this.parseIdent(true);
    };
    pp$8.adaptDirectivePrologue = function(statements) {
      for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
        statements[i].directive = statements[i].expression.raw.slice(1, -1);
      }
    };
    pp$8.isDirectiveCandidate = function(statement) {
      return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && // Reject parenthesized strings.
      (this.input[statement.start] === '"' || this.input[statement.start] === "'");
    };
    pp$7 = Parser.prototype;
    pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
      if (this.options.ecmaVersion >= 6 && node) {
        switch (node.type) {
          case "Identifier":
            if (this.inAsync && node.name === "await") {
              this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
            }
            break;
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            break;
          case "ObjectExpression":
            node.type = "ObjectPattern";
            if (refDestructuringErrors) {
              this.checkPatternErrors(refDestructuringErrors, true);
            }
            for (var i = 0, list = node.properties; i < list.length; i += 1) {
              var prop = list[i];
              this.toAssignable(prop, isBinding);
              if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
                this.raise(prop.argument.start, "Unexpected token");
              }
            }
            break;
          case "Property":
            if (node.kind !== "init") {
              this.raise(node.key.start, "Object pattern can't contain getter or setter");
            }
            this.toAssignable(node.value, isBinding);
            break;
          case "ArrayExpression":
            node.type = "ArrayPattern";
            if (refDestructuringErrors) {
              this.checkPatternErrors(refDestructuringErrors, true);
            }
            this.toAssignableList(node.elements, isBinding);
            break;
          case "SpreadElement":
            node.type = "RestElement";
            this.toAssignable(node.argument, isBinding);
            if (node.argument.type === "AssignmentPattern") {
              this.raise(node.argument.start, "Rest elements cannot have a default value");
            }
            break;
          case "AssignmentExpression":
            if (node.operator !== "=") {
              this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
            }
            node.type = "AssignmentPattern";
            delete node.operator;
            this.toAssignable(node.left, isBinding);
            break;
          case "ParenthesizedExpression":
            this.toAssignable(node.expression, isBinding, refDestructuringErrors);
            break;
          case "ChainExpression":
            this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
            break;
          case "MemberExpression":
            if (!isBinding) {
              break;
            }
          default:
            this.raise(node.start, "Assigning to rvalue");
        }
      } else if (refDestructuringErrors) {
        this.checkPatternErrors(refDestructuringErrors, true);
      }
      return node;
    };
    pp$7.toAssignableList = function(exprList, isBinding) {
      var end = exprList.length;
      for (var i = 0; i < end; i++) {
        var elt = exprList[i];
        if (elt) {
          this.toAssignable(elt, isBinding);
        }
      }
      if (end) {
        var last = exprList[end - 1];
        if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
          this.unexpected(last.argument.start);
        }
      }
      return exprList;
    };
    pp$7.parseSpread = function(refDestructuringErrors) {
      var node = this.startNode();
      this.next();
      node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
      return this.finishNode(node, "SpreadElement");
    };
    pp$7.parseRestBinding = function() {
      var node = this.startNode();
      this.next();
      if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
        this.unexpected();
      }
      node.argument = this.parseBindingAtom();
      return this.finishNode(node, "RestElement");
    };
    pp$7.parseBindingAtom = function() {
      if (this.options.ecmaVersion >= 6) {
        switch (this.type) {
          case types$1.bracketL:
            var node = this.startNode();
            this.next();
            node.elements = this.parseBindingList(types$1.bracketR, true, true);
            return this.finishNode(node, "ArrayPattern");
          case types$1.braceL:
            return this.parseObj(true);
        }
      }
      return this.parseIdent();
    };
    pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
      var elts = [], first = true;
      while (!this.eat(close)) {
        if (first) {
          first = false;
        } else {
          this.expect(types$1.comma);
        }
        if (allowEmpty && this.type === types$1.comma) {
          elts.push(null);
        } else if (allowTrailingComma && this.afterTrailingComma(close)) {
          break;
        } else if (this.type === types$1.ellipsis) {
          var rest = this.parseRestBinding();
          this.parseBindingListItem(rest);
          elts.push(rest);
          if (this.type === types$1.comma) {
            this.raise(this.start, "Comma is not permitted after the rest element");
          }
          this.expect(close);
          break;
        } else {
          var elem = this.parseMaybeDefault(this.start, this.startLoc);
          this.parseBindingListItem(elem);
          elts.push(elem);
        }
      }
      return elts;
    };
    pp$7.parseBindingListItem = function(param) {
      return param;
    };
    pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
      left = left || this.parseBindingAtom();
      if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
        return left;
      }
      var node = this.startNodeAt(startPos, startLoc);
      node.left = left;
      node.right = this.parseMaybeAssign();
      return this.finishNode(node, "AssignmentPattern");
    };
    pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
      if (bindingType === void 0)
        bindingType = BIND_NONE;
      var isBind = bindingType !== BIND_NONE;
      switch (expr.type) {
        case "Identifier":
          if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
            this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
          }
          if (isBind) {
            if (bindingType === BIND_LEXICAL && expr.name === "let") {
              this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
            }
            if (checkClashes) {
              if (hasOwn(checkClashes, expr.name)) {
                this.raiseRecoverable(expr.start, "Argument name clash");
              }
              checkClashes[expr.name] = true;
            }
            if (bindingType !== BIND_OUTSIDE) {
              this.declareName(expr.name, bindingType, expr.start);
            }
          }
          break;
        case "ChainExpression":
          this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
          break;
        case "MemberExpression":
          if (isBind) {
            this.raiseRecoverable(expr.start, "Binding member expression");
          }
          break;
        case "ParenthesizedExpression":
          if (isBind) {
            this.raiseRecoverable(expr.start, "Binding parenthesized expression");
          }
          return this.checkLValSimple(expr.expression, bindingType, checkClashes);
        default:
          this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
      }
    };
    pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
      if (bindingType === void 0)
        bindingType = BIND_NONE;
      switch (expr.type) {
        case "ObjectPattern":
          for (var i = 0, list = expr.properties; i < list.length; i += 1) {
            var prop = list[i];
            this.checkLValInnerPattern(prop, bindingType, checkClashes);
          }
          break;
        case "ArrayPattern":
          for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
            var elem = list$1[i$1];
            if (elem) {
              this.checkLValInnerPattern(elem, bindingType, checkClashes);
            }
          }
          break;
        default:
          this.checkLValSimple(expr, bindingType, checkClashes);
      }
    };
    pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
      if (bindingType === void 0)
        bindingType = BIND_NONE;
      switch (expr.type) {
        case "Property":
          this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
          break;
        case "AssignmentPattern":
          this.checkLValPattern(expr.left, bindingType, checkClashes);
          break;
        case "RestElement":
          this.checkLValPattern(expr.argument, bindingType, checkClashes);
          break;
        default:
          this.checkLValPattern(expr, bindingType, checkClashes);
      }
    };
    TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
      this.token = token;
      this.isExpr = !!isExpr;
      this.preserveSpace = !!preserveSpace;
      this.override = override;
      this.generator = !!generator;
    };
    types = {
      b_stat: new TokContext("{", false),
      b_expr: new TokContext("{", true),
      b_tmpl: new TokContext("${", false),
      p_stat: new TokContext("(", false),
      p_expr: new TokContext("(", true),
      q_tmpl: new TokContext("`", true, true, function(p) {
        return p.tryReadTemplateToken();
      }),
      f_stat: new TokContext("function", false),
      f_expr: new TokContext("function", true),
      f_expr_gen: new TokContext("function", true, false, null, true),
      f_gen: new TokContext("function", false, false, null, true)
    };
    pp$6 = Parser.prototype;
    pp$6.initialContext = function() {
      return [types.b_stat];
    };
    pp$6.curContext = function() {
      return this.context[this.context.length - 1];
    };
    pp$6.braceIsBlock = function(prevType) {
      var parent = this.curContext();
      if (parent === types.f_expr || parent === types.f_stat) {
        return true;
      }
      if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
        return !parent.isExpr;
      }
      if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
        return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
      }
      if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
        return true;
      }
      if (prevType === types$1.braceL) {
        return parent === types.b_stat;
      }
      if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
        return false;
      }
      return !this.exprAllowed;
    };
    pp$6.inGeneratorContext = function() {
      for (var i = this.context.length - 1; i >= 1; i--) {
        var context = this.context[i];
        if (context.token === "function") {
          return context.generator;
        }
      }
      return false;
    };
    pp$6.updateContext = function(prevType) {
      var update, type = this.type;
      if (type.keyword && prevType === types$1.dot) {
        this.exprAllowed = false;
      } else if (update = type.updateContext) {
        update.call(this, prevType);
      } else {
        this.exprAllowed = type.beforeExpr;
      }
    };
    pp$6.overrideContext = function(tokenCtx) {
      if (this.curContext() !== tokenCtx) {
        this.context[this.context.length - 1] = tokenCtx;
      }
    };
    types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
      if (this.context.length === 1) {
        this.exprAllowed = true;
        return;
      }
      var out = this.context.pop();
      if (out === types.b_stat && this.curContext().token === "function") {
        out = this.context.pop();
      }
      this.exprAllowed = !out.isExpr;
    };
    types$1.braceL.updateContext = function(prevType) {
      this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
      this.exprAllowed = true;
    };
    types$1.dollarBraceL.updateContext = function() {
      this.context.push(types.b_tmpl);
      this.exprAllowed = true;
    };
    types$1.parenL.updateContext = function(prevType) {
      var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
      this.context.push(statementParens ? types.p_stat : types.p_expr);
      this.exprAllowed = true;
    };
    types$1.incDec.updateContext = function() {
    };
    types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
      if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
        this.context.push(types.f_expr);
      } else {
        this.context.push(types.f_stat);
      }
      this.exprAllowed = false;
    };
    types$1.backQuote.updateContext = function() {
      if (this.curContext() === types.q_tmpl) {
        this.context.pop();
      } else {
        this.context.push(types.q_tmpl);
      }
      this.exprAllowed = false;
    };
    types$1.star.updateContext = function(prevType) {
      if (prevType === types$1._function) {
        var index = this.context.length - 1;
        if (this.context[index] === types.f_expr) {
          this.context[index] = types.f_expr_gen;
        } else {
          this.context[index] = types.f_gen;
        }
      }
      this.exprAllowed = true;
    };
    types$1.name.updateContext = function(prevType) {
      var allowed = false;
      if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
        if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
          allowed = true;
        }
      }
      this.exprAllowed = allowed;
    };
    pp$5 = Parser.prototype;
    pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
      if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
        return;
      }
      if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
        return;
      }
      var key = prop.key;
      var name;
      switch (key.type) {
        case "Identifier":
          name = key.name;
          break;
        case "Literal":
          name = String(key.value);
          break;
        default:
          return;
      }
      var kind = prop.kind;
      if (this.options.ecmaVersion >= 6) {
        if (name === "__proto__" && kind === "init") {
          if (propHash.proto) {
            if (refDestructuringErrors) {
              if (refDestructuringErrors.doubleProto < 0) {
                refDestructuringErrors.doubleProto = key.start;
              }
            } else {
              this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
            }
          }
          propHash.proto = true;
        }
        return;
      }
      name = "$" + name;
      var other = propHash[name];
      if (other) {
        var redefinition;
        if (kind === "init") {
          redefinition = this.strict && other.init || other.get || other.set;
        } else {
          redefinition = other.init || other[kind];
        }
        if (redefinition) {
          this.raiseRecoverable(key.start, "Redefinition of property");
        }
      } else {
        other = propHash[name] = {
          init: false,
          get: false,
          set: false
        };
      }
      other[kind] = true;
    };
    pp$5.parseExpression = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc;
      var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
      if (this.type === types$1.comma) {
        var node = this.startNodeAt(startPos, startLoc);
        node.expressions = [expr];
        while (this.eat(types$1.comma)) {
          node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
        }
        return this.finishNode(node, "SequenceExpression");
      }
      return expr;
    };
    pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
      if (this.isContextual("yield")) {
        if (this.inGenerator) {
          return this.parseYield(forInit);
        } else {
          this.exprAllowed = false;
        }
      }
      var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
      if (refDestructuringErrors) {
        oldParenAssign = refDestructuringErrors.parenthesizedAssign;
        oldTrailingComma = refDestructuringErrors.trailingComma;
        oldDoubleProto = refDestructuringErrors.doubleProto;
        refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
      } else {
        refDestructuringErrors = new DestructuringErrors();
        ownDestructuringErrors = true;
      }
      var startPos = this.start, startLoc = this.startLoc;
      if (this.type === types$1.parenL || this.type === types$1.name) {
        this.potentialArrowAt = this.start;
        this.potentialArrowInForAwait = forInit === "await";
      }
      var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
      if (afterLeftParse) {
        left = afterLeftParse.call(this, left, startPos, startLoc);
      }
      if (this.type.isAssign) {
        var node = this.startNodeAt(startPos, startLoc);
        node.operator = this.value;
        if (this.type === types$1.eq) {
          left = this.toAssignable(left, false, refDestructuringErrors);
        }
        if (!ownDestructuringErrors) {
          refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
        }
        if (refDestructuringErrors.shorthandAssign >= left.start) {
          refDestructuringErrors.shorthandAssign = -1;
        }
        if (this.type === types$1.eq) {
          this.checkLValPattern(left);
        } else {
          this.checkLValSimple(left);
        }
        node.left = left;
        this.next();
        node.right = this.parseMaybeAssign(forInit);
        if (oldDoubleProto > -1) {
          refDestructuringErrors.doubleProto = oldDoubleProto;
        }
        return this.finishNode(node, "AssignmentExpression");
      } else {
        if (ownDestructuringErrors) {
          this.checkExpressionErrors(refDestructuringErrors, true);
        }
      }
      if (oldParenAssign > -1) {
        refDestructuringErrors.parenthesizedAssign = oldParenAssign;
      }
      if (oldTrailingComma > -1) {
        refDestructuringErrors.trailingComma = oldTrailingComma;
      }
      return left;
    };
    pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc;
      var expr = this.parseExprOps(forInit, refDestructuringErrors);
      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }
      if (this.eat(types$1.question)) {
        var node = this.startNodeAt(startPos, startLoc);
        node.test = expr;
        node.consequent = this.parseMaybeAssign();
        this.expect(types$1.colon);
        node.alternate = this.parseMaybeAssign(forInit);
        return this.finishNode(node, "ConditionalExpression");
      }
      return expr;
    };
    pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
      var startPos = this.start, startLoc = this.startLoc;
      var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
      if (this.checkExpressionErrors(refDestructuringErrors)) {
        return expr;
      }
      return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
    };
    pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
      var prec = this.type.binop;
      if (prec != null && (!forInit || this.type !== types$1._in)) {
        if (prec > minPrec) {
          var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
          var coalesce = this.type === types$1.coalesce;
          if (coalesce) {
            prec = types$1.logicalAND.binop;
          }
          var op = this.value;
          this.next();
          var startPos = this.start, startLoc = this.startLoc;
          var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
          var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
          if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
            this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
          }
          return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
        }
      }
      return left;
    };
    pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
      if (right.type === "PrivateIdentifier") {
        this.raise(right.start, "Private identifier can only be left side of binary expression");
      }
      var node = this.startNodeAt(startPos, startLoc);
      node.left = left;
      node.operator = op;
      node.right = right;
      return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
    };
    pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
      var startPos = this.start, startLoc = this.startLoc, expr;
      if (this.isContextual("await") && this.canAwait) {
        expr = this.parseAwait(forInit);
        sawUnary = true;
      } else if (this.type.prefix) {
        var node = this.startNode(), update = this.type === types$1.incDec;
        node.operator = this.value;
        node.prefix = true;
        this.next();
        node.argument = this.parseMaybeUnary(null, true, update, forInit);
        this.checkExpressionErrors(refDestructuringErrors, true);
        if (update) {
          this.checkLValSimple(node.argument);
        } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
          this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
        } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
          this.raiseRecoverable(node.start, "Private fields can not be deleted");
        } else {
          sawUnary = true;
        }
        expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
      } else if (!sawUnary && this.type === types$1.privateId) {
        if (forInit || this.privateNameStack.length === 0) {
          this.unexpected();
        }
        expr = this.parsePrivateIdent();
        if (this.type !== types$1._in) {
          this.unexpected();
        }
      } else {
        expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
        if (this.checkExpressionErrors(refDestructuringErrors)) {
          return expr;
        }
        while (this.type.postfix && !this.canInsertSemicolon()) {
          var node$1 = this.startNodeAt(startPos, startLoc);
          node$1.operator = this.value;
          node$1.prefix = false;
          node$1.argument = expr;
          this.checkLValSimple(expr);
          this.next();
          expr = this.finishNode(node$1, "UpdateExpression");
        }
      }
      if (!incDec && this.eat(types$1.starstar)) {
        if (sawUnary) {
          this.unexpected(this.lastTokStart);
        } else {
          return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
        }
      } else {
        return expr;
      }
    };
    pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
      var startPos = this.start, startLoc = this.startLoc;
      var expr = this.parseExprAtom(refDestructuringErrors, forInit);
      if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
        return expr;
      }
      var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
      if (refDestructuringErrors && result.type === "MemberExpression") {
        if (refDestructuringErrors.parenthesizedAssign >= result.start) {
          refDestructuringErrors.parenthesizedAssign = -1;
        }
        if (refDestructuringErrors.parenthesizedBind >= result.start) {
          refDestructuringErrors.parenthesizedBind = -1;
        }
        if (refDestructuringErrors.trailingComma >= result.start) {
          refDestructuringErrors.trailingComma = -1;
        }
      }
      return result;
    };
    pp$5.parseSubscripts = function(base2, startPos, startLoc, noCalls, forInit) {
      var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base2.type === "Identifier" && base2.name === "async" && this.lastTokEnd === base2.end && !this.canInsertSemicolon() && base2.end - base2.start === 5 && this.potentialArrowAt === base2.start;
      var optionalChained = false;
      while (true) {
        var element = this.parseSubscript(base2, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
        if (element.optional) {
          optionalChained = true;
        }
        if (element === base2 || element.type === "ArrowFunctionExpression") {
          if (optionalChained) {
            var chainNode = this.startNodeAt(startPos, startLoc);
            chainNode.expression = element;
            element = this.finishNode(chainNode, "ChainExpression");
          }
          return element;
        }
        base2 = element;
      }
    };
    pp$5.parseSubscript = function(base2, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
      var optionalSupported = this.options.ecmaVersion >= 11;
      var optional = optionalSupported && this.eat(types$1.questionDot);
      if (noCalls && optional) {
        this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
      }
      var computed = this.eat(types$1.bracketL);
      if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
        var node = this.startNodeAt(startPos, startLoc);
        node.object = base2;
        if (computed) {
          node.property = this.parseExpression();
          this.expect(types$1.bracketR);
        } else if (this.type === types$1.privateId && base2.type !== "Super") {
          node.property = this.parsePrivateIdent();
        } else {
          node.property = this.parseIdent(this.options.allowReserved !== "never");
        }
        node.computed = !!computed;
        if (optionalSupported) {
          node.optional = optional;
        }
        base2 = this.finishNode(node, "MemberExpression");
      } else if (!noCalls && this.eat(types$1.parenL)) {
        var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
        if (maybeAsyncArrow && !optional && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
          this.checkPatternErrors(refDestructuringErrors, false);
          this.checkYieldAwaitInDefaultParams();
          if (this.awaitIdentPos > 0) {
            this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
          }
          this.yieldPos = oldYieldPos;
          this.awaitPos = oldAwaitPos;
          this.awaitIdentPos = oldAwaitIdentPos;
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
        }
        this.checkExpressionErrors(refDestructuringErrors, true);
        this.yieldPos = oldYieldPos || this.yieldPos;
        this.awaitPos = oldAwaitPos || this.awaitPos;
        this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.callee = base2;
        node$1.arguments = exprList;
        if (optionalSupported) {
          node$1.optional = optional;
        }
        base2 = this.finishNode(node$1, "CallExpression");
      } else if (this.type === types$1.backQuote) {
        if (optional || optionalChained) {
          this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
        }
        var node$2 = this.startNodeAt(startPos, startLoc);
        node$2.tag = base2;
        node$2.quasi = this.parseTemplate({ isTagged: true });
        base2 = this.finishNode(node$2, "TaggedTemplateExpression");
      }
      return base2;
    };
    pp$5.parseExprAtom = function(refDestructuringErrors, forInit) {
      if (this.type === types$1.slash) {
        this.readRegexp();
      }
      var node, canBeArrow = this.potentialArrowAt === this.start;
      switch (this.type) {
        case types$1._super:
          if (!this.allowSuper) {
            this.raise(this.start, "'super' keyword outside a method");
          }
          node = this.startNode();
          this.next();
          if (this.type === types$1.parenL && !this.allowDirectSuper) {
            this.raise(node.start, "super() call outside constructor of a subclass");
          }
          if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
            this.unexpected();
          }
          return this.finishNode(node, "Super");
        case types$1._this:
          node = this.startNode();
          this.next();
          return this.finishNode(node, "ThisExpression");
        case types$1.name:
          var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
          var id = this.parseIdent(false);
          if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
            this.overrideContext(types.f_expr);
            return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
          }
          if (canBeArrow && !this.canInsertSemicolon()) {
            if (this.eat(types$1.arrow)) {
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
            }
            if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
              id = this.parseIdent(false);
              if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
                this.unexpected();
              }
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
            }
          }
          return id;
        case types$1.regexp:
          var value = this.value;
          node = this.parseLiteral(value.value);
          node.regex = { pattern: value.pattern, flags: value.flags };
          return node;
        case types$1.num:
        case types$1.string:
          return this.parseLiteral(this.value);
        case types$1._null:
        case types$1._true:
        case types$1._false:
          node = this.startNode();
          node.value = this.type === types$1._null ? null : this.type === types$1._true;
          node.raw = this.type.keyword;
          this.next();
          return this.finishNode(node, "Literal");
        case types$1.parenL:
          var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
          if (refDestructuringErrors) {
            if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
              refDestructuringErrors.parenthesizedAssign = start;
            }
            if (refDestructuringErrors.parenthesizedBind < 0) {
              refDestructuringErrors.parenthesizedBind = start;
            }
          }
          return expr;
        case types$1.bracketL:
          node = this.startNode();
          this.next();
          node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
          return this.finishNode(node, "ArrayExpression");
        case types$1.braceL:
          this.overrideContext(types.b_expr);
          return this.parseObj(false, refDestructuringErrors);
        case types$1._function:
          node = this.startNode();
          this.next();
          return this.parseFunction(node, 0);
        case types$1._class:
          return this.parseClass(this.startNode(), false);
        case types$1._new:
          return this.parseNew();
        case types$1.backQuote:
          return this.parseTemplate();
        case types$1._import:
          if (this.options.ecmaVersion >= 11) {
            return this.parseExprImport();
          } else {
            return this.unexpected();
          }
        default:
          this.unexpected();
      }
    };
    pp$5.parseExprImport = function() {
      var node = this.startNode();
      if (this.containsEsc) {
        this.raiseRecoverable(this.start, "Escape sequence in keyword import");
      }
      var meta = this.parseIdent(true);
      switch (this.type) {
        case types$1.parenL:
          return this.parseDynamicImport(node);
        case types$1.dot:
          node.meta = meta;
          return this.parseImportMeta(node);
        default:
          this.unexpected();
      }
    };
    pp$5.parseDynamicImport = function(node) {
      this.next();
      node.source = this.parseMaybeAssign();
      if (!this.eat(types$1.parenR)) {
        var errorPos = this.start;
        if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
          this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
        } else {
          this.unexpected(errorPos);
        }
      }
      return this.finishNode(node, "ImportExpression");
    };
    pp$5.parseImportMeta = function(node) {
      this.next();
      var containsEsc = this.containsEsc;
      node.property = this.parseIdent(true);
      if (node.property.name !== "meta") {
        this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
      }
      if (containsEsc) {
        this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
      }
      if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
        this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
      }
      return this.finishNode(node, "MetaProperty");
    };
    pp$5.parseLiteral = function(value) {
      var node = this.startNode();
      node.value = value;
      node.raw = this.input.slice(this.start, this.end);
      if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
        node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
      }
      this.next();
      return this.finishNode(node, "Literal");
    };
    pp$5.parseParenExpression = function() {
      this.expect(types$1.parenL);
      var val = this.parseExpression();
      this.expect(types$1.parenR);
      return val;
    };
    pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
      var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
      if (this.options.ecmaVersion >= 6) {
        this.next();
        var innerStartPos = this.start, innerStartLoc = this.startLoc;
        var exprList = [], first = true, lastIsComma = false;
        var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
        this.yieldPos = 0;
        this.awaitPos = 0;
        while (this.type !== types$1.parenR) {
          first ? first = false : this.expect(types$1.comma);
          if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
            lastIsComma = true;
            break;
          } else if (this.type === types$1.ellipsis) {
            spreadStart = this.start;
            exprList.push(this.parseParenItem(this.parseRestBinding()));
            if (this.type === types$1.comma) {
              this.raise(this.start, "Comma is not permitted after the rest element");
            }
            break;
          } else {
            exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
          }
        }
        var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
        this.expect(types$1.parenR);
        if (canBeArrow && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
          this.checkPatternErrors(refDestructuringErrors, false);
          this.checkYieldAwaitInDefaultParams();
          this.yieldPos = oldYieldPos;
          this.awaitPos = oldAwaitPos;
          return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
        }
        if (!exprList.length || lastIsComma) {
          this.unexpected(this.lastTokStart);
        }
        if (spreadStart) {
          this.unexpected(spreadStart);
        }
        this.checkExpressionErrors(refDestructuringErrors, true);
        this.yieldPos = oldYieldPos || this.yieldPos;
        this.awaitPos = oldAwaitPos || this.awaitPos;
        if (exprList.length > 1) {
          val = this.startNodeAt(innerStartPos, innerStartLoc);
          val.expressions = exprList;
          this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
        } else {
          val = exprList[0];
        }
      } else {
        val = this.parseParenExpression();
      }
      if (this.options.preserveParens) {
        var par = this.startNodeAt(startPos, startLoc);
        par.expression = val;
        return this.finishNode(par, "ParenthesizedExpression");
      } else {
        return val;
      }
    };
    pp$5.parseParenItem = function(item) {
      return item;
    };
    pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
      return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
    };
    empty = [];
    pp$5.parseNew = function() {
      if (this.containsEsc) {
        this.raiseRecoverable(this.start, "Escape sequence in keyword new");
      }
      var node = this.startNode();
      var meta = this.parseIdent(true);
      if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot)) {
        node.meta = meta;
        var containsEsc = this.containsEsc;
        node.property = this.parseIdent(true);
        if (node.property.name !== "target") {
          this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
        }
        if (containsEsc) {
          this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
        }
        if (!this.allowNewDotTarget) {
          this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
        }
        return this.finishNode(node, "MetaProperty");
      }
      var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types$1._import;
      node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true, false);
      if (isImport && node.callee.type === "ImportExpression") {
        this.raise(startPos, "Cannot use new with import()");
      }
      if (this.eat(types$1.parenL)) {
        node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
      } else {
        node.arguments = empty;
      }
      return this.finishNode(node, "NewExpression");
    };
    pp$5.parseTemplateElement = function(ref2) {
      var isTagged = ref2.isTagged;
      var elem = this.startNode();
      if (this.type === types$1.invalidTemplate) {
        if (!isTagged) {
          this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
        }
        elem.value = {
          raw: this.value,
          cooked: null
        };
      } else {
        elem.value = {
          raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
          cooked: this.value
        };
      }
      this.next();
      elem.tail = this.type === types$1.backQuote;
      return this.finishNode(elem, "TemplateElement");
    };
    pp$5.parseTemplate = function(ref2) {
      if (ref2 === void 0)
        ref2 = {};
      var isTagged = ref2.isTagged;
      if (isTagged === void 0)
        isTagged = false;
      var node = this.startNode();
      this.next();
      node.expressions = [];
      var curElt = this.parseTemplateElement({ isTagged });
      node.quasis = [curElt];
      while (!curElt.tail) {
        if (this.type === types$1.eof) {
          this.raise(this.pos, "Unterminated template literal");
        }
        this.expect(types$1.dollarBraceL);
        node.expressions.push(this.parseExpression());
        this.expect(types$1.braceR);
        node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
      }
      this.next();
      return this.finishNode(node, "TemplateLiteral");
    };
    pp$5.isAsyncProp = function(prop) {
      return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
    };
    pp$5.parseObj = function(isPattern, refDestructuringErrors) {
      var node = this.startNode(), first = true, propHash = {};
      node.properties = [];
      this.next();
      while (!this.eat(types$1.braceR)) {
        if (!first) {
          this.expect(types$1.comma);
          if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
            break;
          }
        } else {
          first = false;
        }
        var prop = this.parseProperty(isPattern, refDestructuringErrors);
        if (!isPattern) {
          this.checkPropClash(prop, propHash, refDestructuringErrors);
        }
        node.properties.push(prop);
      }
      return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
    };
    pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
      var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
      if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
        if (isPattern) {
          prop.argument = this.parseIdent(false);
          if (this.type === types$1.comma) {
            this.raise(this.start, "Comma is not permitted after the rest element");
          }
          return this.finishNode(prop, "RestElement");
        }
        prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
        if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
          refDestructuringErrors.trailingComma = this.start;
        }
        return this.finishNode(prop, "SpreadElement");
      }
      if (this.options.ecmaVersion >= 6) {
        prop.method = false;
        prop.shorthand = false;
        if (isPattern || refDestructuringErrors) {
          startPos = this.start;
          startLoc = this.startLoc;
        }
        if (!isPattern) {
          isGenerator = this.eat(types$1.star);
        }
      }
      var containsEsc = this.containsEsc;
      this.parsePropertyName(prop);
      if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
        isAsync = true;
        isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
        this.parsePropertyName(prop);
      } else {
        isAsync = false;
      }
      this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
      return this.finishNode(prop, "Property");
    };
    pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
      if ((isGenerator || isAsync) && this.type === types$1.colon) {
        this.unexpected();
      }
      if (this.eat(types$1.colon)) {
        prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
        prop.kind = "init";
      } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
        if (isPattern) {
          this.unexpected();
        }
        prop.kind = "init";
        prop.method = true;
        prop.value = this.parseMethod(isGenerator, isAsync);
      } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
        if (isGenerator || isAsync) {
          this.unexpected();
        }
        prop.kind = prop.key.name;
        this.parsePropertyName(prop);
        prop.value = this.parseMethod(false);
        var paramCount = prop.kind === "get" ? 0 : 1;
        if (prop.value.params.length !== paramCount) {
          var start = prop.value.start;
          if (prop.kind === "get") {
            this.raiseRecoverable(start, "getter should have no params");
          } else {
            this.raiseRecoverable(start, "setter should have exactly one param");
          }
        } else {
          if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
            this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
          }
        }
      } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
        if (isGenerator || isAsync) {
          this.unexpected();
        }
        this.checkUnreserved(prop.key);
        if (prop.key.name === "await" && !this.awaitIdentPos) {
          this.awaitIdentPos = startPos;
        }
        prop.kind = "init";
        if (isPattern) {
          prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
        } else if (this.type === types$1.eq && refDestructuringErrors) {
          if (refDestructuringErrors.shorthandAssign < 0) {
            refDestructuringErrors.shorthandAssign = this.start;
          }
          prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
        } else {
          prop.value = this.copyNode(prop.key);
        }
        prop.shorthand = true;
      } else {
        this.unexpected();
      }
    };
    pp$5.parsePropertyName = function(prop) {
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(types$1.bracketL)) {
          prop.computed = true;
          prop.key = this.parseMaybeAssign();
          this.expect(types$1.bracketR);
          return prop.key;
        } else {
          prop.computed = false;
        }
      }
      return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
    };
    pp$5.initFunction = function(node) {
      node.id = null;
      if (this.options.ecmaVersion >= 6) {
        node.generator = node.expression = false;
      }
      if (this.options.ecmaVersion >= 8) {
        node.async = false;
      }
    };
    pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
      var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.initFunction(node);
      if (this.options.ecmaVersion >= 6) {
        node.generator = isGenerator;
      }
      if (this.options.ecmaVersion >= 8) {
        node.async = !!isAsync;
      }
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
      this.expect(types$1.parenL);
      node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
      this.checkYieldAwaitInDefaultParams();
      this.parseFunctionBody(node, false, true, false);
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.finishNode(node, "FunctionExpression");
    };
    pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
      var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
      this.initFunction(node);
      if (this.options.ecmaVersion >= 8) {
        node.async = !!isAsync;
      }
      this.yieldPos = 0;
      this.awaitPos = 0;
      this.awaitIdentPos = 0;
      node.params = this.toAssignableList(params, true);
      this.parseFunctionBody(node, true, false, forInit);
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.finishNode(node, "ArrowFunctionExpression");
    };
    pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
      var isExpression = isArrowFunction && this.type !== types$1.braceL;
      var oldStrict = this.strict, useStrict = false;
      if (isExpression) {
        node.body = this.parseMaybeAssign(forInit);
        node.expression = true;
        this.checkParams(node, false);
      } else {
        var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
        if (!oldStrict || nonSimple) {
          useStrict = this.strictDirective(this.end);
          if (useStrict && nonSimple) {
            this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
          }
        }
        var oldLabels = this.labels;
        this.labels = [];
        if (useStrict) {
          this.strict = true;
        }
        this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
        if (this.strict && node.id) {
          this.checkLValSimple(node.id, BIND_OUTSIDE);
        }
        node.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
        node.expression = false;
        this.adaptDirectivePrologue(node.body.body);
        this.labels = oldLabels;
      }
      this.exitScope();
    };
    pp$5.isSimpleParamList = function(params) {
      for (var i = 0, list = params; i < list.length; i += 1) {
        var param = list[i];
        if (param.type !== "Identifier") {
          return false;
        }
      }
      return true;
    };
    pp$5.checkParams = function(node, allowDuplicates) {
      var nameHash = /* @__PURE__ */ Object.create(null);
      for (var i = 0, list = node.params; i < list.length; i += 1) {
        var param = list[i];
        this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
      }
    };
    pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
      var elts = [], first = true;
      while (!this.eat(close)) {
        if (!first) {
          this.expect(types$1.comma);
          if (allowTrailingComma && this.afterTrailingComma(close)) {
            break;
          }
        } else {
          first = false;
        }
        var elt = void 0;
        if (allowEmpty && this.type === types$1.comma) {
          elt = null;
        } else if (this.type === types$1.ellipsis) {
          elt = this.parseSpread(refDestructuringErrors);
          if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
            refDestructuringErrors.trailingComma = this.start;
          }
        } else {
          elt = this.parseMaybeAssign(false, refDestructuringErrors);
        }
        elts.push(elt);
      }
      return elts;
    };
    pp$5.checkUnreserved = function(ref2) {
      var start = ref2.start;
      var end = ref2.end;
      var name = ref2.name;
      if (this.inGenerator && name === "yield") {
        this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
      }
      if (this.inAsync && name === "await") {
        this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
      }
      if (this.currentThisScope().inClassFieldInit && name === "arguments") {
        this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
      }
      if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
        this.raise(start, "Cannot use " + name + " in class static initialization block");
      }
      if (this.keywords.test(name)) {
        this.raise(start, "Unexpected keyword '" + name + "'");
      }
      if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
        return;
      }
      var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
      if (re.test(name)) {
        if (!this.inAsync && name === "await") {
          this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
        }
        this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
      }
    };
    pp$5.parseIdent = function(liberal) {
      var node = this.startNode();
      if (this.type === types$1.name) {
        node.name = this.value;
      } else if (this.type.keyword) {
        node.name = this.type.keyword;
        if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
          this.context.pop();
        }
      } else {
        this.unexpected();
      }
      this.next(!!liberal);
      this.finishNode(node, "Identifier");
      if (!liberal) {
        this.checkUnreserved(node);
        if (node.name === "await" && !this.awaitIdentPos) {
          this.awaitIdentPos = node.start;
        }
      }
      return node;
    };
    pp$5.parsePrivateIdent = function() {
      var node = this.startNode();
      if (this.type === types$1.privateId) {
        node.name = this.value;
      } else {
        this.unexpected();
      }
      this.next();
      this.finishNode(node, "PrivateIdentifier");
      if (this.privateNameStack.length === 0) {
        this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
      } else {
        this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
      }
      return node;
    };
    pp$5.parseYield = function(forInit) {
      if (!this.yieldPos) {
        this.yieldPos = this.start;
      }
      var node = this.startNode();
      this.next();
      if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
        node.delegate = false;
        node.argument = null;
      } else {
        node.delegate = this.eat(types$1.star);
        node.argument = this.parseMaybeAssign(forInit);
      }
      return this.finishNode(node, "YieldExpression");
    };
    pp$5.parseAwait = function(forInit) {
      if (!this.awaitPos) {
        this.awaitPos = this.start;
      }
      var node = this.startNode();
      this.next();
      node.argument = this.parseMaybeUnary(null, true, false, forInit);
      return this.finishNode(node, "AwaitExpression");
    };
    pp$4 = Parser.prototype;
    pp$4.raise = function(pos, message) {
      var loc = getLineInfo(this.input, pos);
      message += " (" + loc.line + ":" + loc.column + ")";
      var err = new SyntaxError(message);
      err.pos = pos;
      err.loc = loc;
      err.raisedAt = this.pos;
      throw err;
    };
    pp$4.raiseRecoverable = pp$4.raise;
    pp$4.curPosition = function() {
      if (this.options.locations) {
        return new Position(this.curLine, this.pos - this.lineStart);
      }
    };
    pp$3 = Parser.prototype;
    Scope2 = function Scope3(flags) {
      this.flags = flags;
      this.var = [];
      this.lexical = [];
      this.functions = [];
      this.inClassFieldInit = false;
    };
    pp$3.enterScope = function(flags) {
      this.scopeStack.push(new Scope2(flags));
    };
    pp$3.exitScope = function() {
      this.scopeStack.pop();
    };
    pp$3.treatFunctionsAsVarInScope = function(scope) {
      return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
    };
    pp$3.declareName = function(name, bindingType, pos) {
      var redeclared = false;
      if (bindingType === BIND_LEXICAL) {
        var scope = this.currentScope();
        redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
        scope.lexical.push(name);
        if (this.inModule && scope.flags & SCOPE_TOP) {
          delete this.undefinedExports[name];
        }
      } else if (bindingType === BIND_SIMPLE_CATCH) {
        var scope$1 = this.currentScope();
        scope$1.lexical.push(name);
      } else if (bindingType === BIND_FUNCTION) {
        var scope$2 = this.currentScope();
        if (this.treatFunctionsAsVar) {
          redeclared = scope$2.lexical.indexOf(name) > -1;
        } else {
          redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
        }
        scope$2.functions.push(name);
      } else {
        for (var i = this.scopeStack.length - 1; i >= 0; --i) {
          var scope$3 = this.scopeStack[i];
          if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
            redeclared = true;
            break;
          }
          scope$3.var.push(name);
          if (this.inModule && scope$3.flags & SCOPE_TOP) {
            delete this.undefinedExports[name];
          }
          if (scope$3.flags & SCOPE_VAR) {
            break;
          }
        }
      }
      if (redeclared) {
        this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
      }
    };
    pp$3.checkLocalExport = function(id) {
      if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
        this.undefinedExports[id.name] = id;
      }
    };
    pp$3.currentScope = function() {
      return this.scopeStack[this.scopeStack.length - 1];
    };
    pp$3.currentVarScope = function() {
      for (var i = this.scopeStack.length - 1; ; i--) {
        var scope = this.scopeStack[i];
        if (scope.flags & SCOPE_VAR) {
          return scope;
        }
      }
    };
    pp$3.currentThisScope = function() {
      for (var i = this.scopeStack.length - 1; ; i--) {
        var scope = this.scopeStack[i];
        if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
          return scope;
        }
      }
    };
    Node = function Node2(parser, pos, loc) {
      this.type = "";
      this.start = pos;
      this.end = 0;
      if (parser.options.locations) {
        this.loc = new SourceLocation(parser, loc);
      }
      if (parser.options.directSourceFile) {
        this.sourceFile = parser.options.directSourceFile;
      }
      if (parser.options.ranges) {
        this.range = [pos, 0];
      }
    };
    pp$2 = Parser.prototype;
    pp$2.startNode = function() {
      return new Node(this, this.start, this.startLoc);
    };
    pp$2.startNodeAt = function(pos, loc) {
      return new Node(this, pos, loc);
    };
    pp$2.finishNode = function(node, type) {
      return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
    };
    pp$2.finishNodeAt = function(node, type, pos, loc) {
      return finishNodeAt.call(this, node, type, pos, loc);
    };
    pp$2.copyNode = function(node) {
      var newNode = new Node(this, node.start, this.startLoc);
      for (var prop in node) {
        newNode[prop] = node[prop];
      }
      return newNode;
    };
    ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
    ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
    ecma11BinaryProperties = ecma10BinaryProperties;
    ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
    ecma13BinaryProperties = ecma12BinaryProperties;
    ecma14BinaryProperties = ecma13BinaryProperties;
    unicodeBinaryProperties = {
      9: ecma9BinaryProperties,
      10: ecma10BinaryProperties,
      11: ecma11BinaryProperties,
      12: ecma12BinaryProperties,
      13: ecma13BinaryProperties,
      14: ecma14BinaryProperties
    };
    unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
    ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
    ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
    ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
    ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
    ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
    ecma14ScriptValues = ecma13ScriptValues + " Kawi Nag_Mundari Nagm";
    unicodeScriptValues = {
      9: ecma9ScriptValues,
      10: ecma10ScriptValues,
      11: ecma11ScriptValues,
      12: ecma12ScriptValues,
      13: ecma13ScriptValues,
      14: ecma14ScriptValues
    };
    data = {};
    for (i = 0, list = [9, 10, 11, 12, 13, 14]; i < list.length; i += 1) {
      ecmaVersion = list[i];
      buildUnicodeData(ecmaVersion);
    }
    pp$1 = Parser.prototype;
    RegExpValidationState = function RegExpValidationState2(parser) {
      this.parser = parser;
      this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "");
      this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
      this.source = "";
      this.flags = "";
      this.start = 0;
      this.switchU = false;
      this.switchN = false;
      this.pos = 0;
      this.lastIntValue = 0;
      this.lastStringValue = "";
      this.lastAssertionIsQuantifiable = false;
      this.numCapturingParens = 0;
      this.maxBackReference = 0;
      this.groupNames = [];
      this.backReferenceNames = [];
    };
    RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
      var unicode = flags.indexOf("u") !== -1;
      this.start = start | 0;
      this.source = pattern + "";
      this.flags = flags;
      this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
      this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
    };
    RegExpValidationState.prototype.raise = function raise(message) {
      this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
    };
    RegExpValidationState.prototype.at = function at(i, forceU) {
      if (forceU === void 0)
        forceU = false;
      var s = this.source;
      var l = s.length;
      if (i >= l) {
        return -1;
      }
      var c = s.charCodeAt(i);
      if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l) {
        return c;
      }
      var next = s.charCodeAt(i + 1);
      return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
    };
    RegExpValidationState.prototype.nextIndex = function nextIndex(i, forceU) {
      if (forceU === void 0)
        forceU = false;
      var s = this.source;
      var l = s.length;
      if (i >= l) {
        return l;
      }
      var c = s.charCodeAt(i), next;
      if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343) {
        return i + 1;
      }
      return i + 2;
    };
    RegExpValidationState.prototype.current = function current(forceU) {
      if (forceU === void 0)
        forceU = false;
      return this.at(this.pos, forceU);
    };
    RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
      if (forceU === void 0)
        forceU = false;
      return this.at(this.nextIndex(this.pos, forceU), forceU);
    };
    RegExpValidationState.prototype.advance = function advance(forceU) {
      if (forceU === void 0)
        forceU = false;
      this.pos = this.nextIndex(this.pos, forceU);
    };
    RegExpValidationState.prototype.eat = function eat(ch, forceU) {
      if (forceU === void 0)
        forceU = false;
      if (this.current(forceU) === ch) {
        this.advance(forceU);
        return true;
      }
      return false;
    };
    pp$1.validateRegExpFlags = function(state) {
      var validFlags = state.validFlags;
      var flags = state.flags;
      for (var i = 0; i < flags.length; i++) {
        var flag = flags.charAt(i);
        if (validFlags.indexOf(flag) === -1) {
          this.raise(state.start, "Invalid regular expression flag");
        }
        if (flags.indexOf(flag, i + 1) > -1) {
          this.raise(state.start, "Duplicate regular expression flag");
        }
      }
    };
    pp$1.validateRegExpPattern = function(state) {
      this.regexp_pattern(state);
      if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
        state.switchN = true;
        this.regexp_pattern(state);
      }
    };
    pp$1.regexp_pattern = function(state) {
      state.pos = 0;
      state.lastIntValue = 0;
      state.lastStringValue = "";
      state.lastAssertionIsQuantifiable = false;
      state.numCapturingParens = 0;
      state.maxBackReference = 0;
      state.groupNames.length = 0;
      state.backReferenceNames.length = 0;
      this.regexp_disjunction(state);
      if (state.pos !== state.source.length) {
        if (state.eat(
          41
          /* ) */
        )) {
          state.raise("Unmatched ')'");
        }
        if (state.eat(
          93
          /* ] */
        ) || state.eat(
          125
          /* } */
        )) {
          state.raise("Lone quantifier brackets");
        }
      }
      if (state.maxBackReference > state.numCapturingParens) {
        state.raise("Invalid escape");
      }
      for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
        var name = list[i];
        if (state.groupNames.indexOf(name) === -1) {
          state.raise("Invalid named capture referenced");
        }
      }
    };
    pp$1.regexp_disjunction = function(state) {
      this.regexp_alternative(state);
      while (state.eat(
        124
        /* | */
      )) {
        this.regexp_alternative(state);
      }
      if (this.regexp_eatQuantifier(state, true)) {
        state.raise("Nothing to repeat");
      }
      if (state.eat(
        123
        /* { */
      )) {
        state.raise("Lone quantifier brackets");
      }
    };
    pp$1.regexp_alternative = function(state) {
      while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
      }
    };
    pp$1.regexp_eatTerm = function(state) {
      if (this.regexp_eatAssertion(state)) {
        if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
          if (state.switchU) {
            state.raise("Invalid quantifier");
          }
        }
        return true;
      }
      if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
        this.regexp_eatQuantifier(state);
        return true;
      }
      return false;
    };
    pp$1.regexp_eatAssertion = function(state) {
      var start = state.pos;
      state.lastAssertionIsQuantifiable = false;
      if (state.eat(
        94
        /* ^ */
      ) || state.eat(
        36
        /* $ */
      )) {
        return true;
      }
      if (state.eat(
        92
        /* \ */
      )) {
        if (state.eat(
          66
          /* B */
        ) || state.eat(
          98
          /* b */
        )) {
          return true;
        }
        state.pos = start;
      }
      if (state.eat(
        40
        /* ( */
      ) && state.eat(
        63
        /* ? */
      )) {
        var lookbehind = false;
        if (this.options.ecmaVersion >= 9) {
          lookbehind = state.eat(
            60
            /* < */
          );
        }
        if (state.eat(
          61
          /* = */
        ) || state.eat(
          33
          /* ! */
        )) {
          this.regexp_disjunction(state);
          if (!state.eat(
            41
            /* ) */
          )) {
            state.raise("Unterminated group");
          }
          state.lastAssertionIsQuantifiable = !lookbehind;
          return true;
        }
      }
      state.pos = start;
      return false;
    };
    pp$1.regexp_eatQuantifier = function(state, noError) {
      if (noError === void 0)
        noError = false;
      if (this.regexp_eatQuantifierPrefix(state, noError)) {
        state.eat(
          63
          /* ? */
        );
        return true;
      }
      return false;
    };
    pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
      return state.eat(
        42
        /* * */
      ) || state.eat(
        43
        /* + */
      ) || state.eat(
        63
        /* ? */
      ) || this.regexp_eatBracedQuantifier(state, noError);
    };
    pp$1.regexp_eatBracedQuantifier = function(state, noError) {
      var start = state.pos;
      if (state.eat(
        123
        /* { */
      )) {
        var min = 0, max = -1;
        if (this.regexp_eatDecimalDigits(state)) {
          min = state.lastIntValue;
          if (state.eat(
            44
            /* , */
          ) && this.regexp_eatDecimalDigits(state)) {
            max = state.lastIntValue;
          }
          if (state.eat(
            125
            /* } */
          )) {
            if (max !== -1 && max < min && !noError) {
              state.raise("numbers out of order in {} quantifier");
            }
            return true;
          }
        }
        if (state.switchU && !noError) {
          state.raise("Incomplete quantifier");
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatAtom = function(state) {
      return this.regexp_eatPatternCharacters(state) || state.eat(
        46
        /* . */
      ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
    };
    pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
      var start = state.pos;
      if (state.eat(
        92
        /* \ */
      )) {
        if (this.regexp_eatAtomEscape(state)) {
          return true;
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatUncapturingGroup = function(state) {
      var start = state.pos;
      if (state.eat(
        40
        /* ( */
      )) {
        if (state.eat(
          63
          /* ? */
        ) && state.eat(
          58
          /* : */
        )) {
          this.regexp_disjunction(state);
          if (state.eat(
            41
            /* ) */
          )) {
            return true;
          }
          state.raise("Unterminated group");
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatCapturingGroup = function(state) {
      if (state.eat(
        40
        /* ( */
      )) {
        if (this.options.ecmaVersion >= 9) {
          this.regexp_groupSpecifier(state);
        } else if (state.current() === 63) {
          state.raise("Invalid group");
        }
        this.regexp_disjunction(state);
        if (state.eat(
          41
          /* ) */
        )) {
          state.numCapturingParens += 1;
          return true;
        }
        state.raise("Unterminated group");
      }
      return false;
    };
    pp$1.regexp_eatExtendedAtom = function(state) {
      return state.eat(
        46
        /* . */
      ) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
    };
    pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
      if (this.regexp_eatBracedQuantifier(state, true)) {
        state.raise("Nothing to repeat");
      }
      return false;
    };
    pp$1.regexp_eatSyntaxCharacter = function(state) {
      var ch = state.current();
      if (isSyntaxCharacter(ch)) {
        state.lastIntValue = ch;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatPatternCharacters = function(state) {
      var start = state.pos;
      var ch = 0;
      while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
        state.advance();
      }
      return state.pos !== start;
    };
    pp$1.regexp_eatExtendedPatternCharacter = function(state) {
      var ch = state.current();
      if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_groupSpecifier = function(state) {
      if (state.eat(
        63
        /* ? */
      )) {
        if (this.regexp_eatGroupName(state)) {
          if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
            state.raise("Duplicate capture group name");
          }
          state.groupNames.push(state.lastStringValue);
          return;
        }
        state.raise("Invalid group");
      }
    };
    pp$1.regexp_eatGroupName = function(state) {
      state.lastStringValue = "";
      if (state.eat(
        60
        /* < */
      )) {
        if (this.regexp_eatRegExpIdentifierName(state) && state.eat(
          62
          /* > */
        )) {
          return true;
        }
        state.raise("Invalid capture group name");
      }
      return false;
    };
    pp$1.regexp_eatRegExpIdentifierName = function(state) {
      state.lastStringValue = "";
      if (this.regexp_eatRegExpIdentifierStart(state)) {
        state.lastStringValue += codePointToString(state.lastIntValue);
        while (this.regexp_eatRegExpIdentifierPart(state)) {
          state.lastStringValue += codePointToString(state.lastIntValue);
        }
        return true;
      }
      return false;
    };
    pp$1.regexp_eatRegExpIdentifierStart = function(state) {
      var start = state.pos;
      var forceU = this.options.ecmaVersion >= 11;
      var ch = state.current(forceU);
      state.advance(forceU);
      if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
        ch = state.lastIntValue;
      }
      if (isRegExpIdentifierStart(ch)) {
        state.lastIntValue = ch;
        return true;
      }
      state.pos = start;
      return false;
    };
    pp$1.regexp_eatRegExpIdentifierPart = function(state) {
      var start = state.pos;
      var forceU = this.options.ecmaVersion >= 11;
      var ch = state.current(forceU);
      state.advance(forceU);
      if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
        ch = state.lastIntValue;
      }
      if (isRegExpIdentifierPart(ch)) {
        state.lastIntValue = ch;
        return true;
      }
      state.pos = start;
      return false;
    };
    pp$1.regexp_eatAtomEscape = function(state) {
      if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
        return true;
      }
      if (state.switchU) {
        if (state.current() === 99) {
          state.raise("Invalid unicode escape");
        }
        state.raise("Invalid escape");
      }
      return false;
    };
    pp$1.regexp_eatBackReference = function(state) {
      var start = state.pos;
      if (this.regexp_eatDecimalEscape(state)) {
        var n2 = state.lastIntValue;
        if (state.switchU) {
          if (n2 > state.maxBackReference) {
            state.maxBackReference = n2;
          }
          return true;
        }
        if (n2 <= state.numCapturingParens) {
          return true;
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatKGroupName = function(state) {
      if (state.eat(
        107
        /* k */
      )) {
        if (this.regexp_eatGroupName(state)) {
          state.backReferenceNames.push(state.lastStringValue);
          return true;
        }
        state.raise("Invalid named reference");
      }
      return false;
    };
    pp$1.regexp_eatCharacterEscape = function(state) {
      return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
    };
    pp$1.regexp_eatCControlLetter = function(state) {
      var start = state.pos;
      if (state.eat(
        99
        /* c */
      )) {
        if (this.regexp_eatControlLetter(state)) {
          return true;
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatZero = function(state) {
      if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
        state.lastIntValue = 0;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatControlEscape = function(state) {
      var ch = state.current();
      if (ch === 116) {
        state.lastIntValue = 9;
        state.advance();
        return true;
      }
      if (ch === 110) {
        state.lastIntValue = 10;
        state.advance();
        return true;
      }
      if (ch === 118) {
        state.lastIntValue = 11;
        state.advance();
        return true;
      }
      if (ch === 102) {
        state.lastIntValue = 12;
        state.advance();
        return true;
      }
      if (ch === 114) {
        state.lastIntValue = 13;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatControlLetter = function(state) {
      var ch = state.current();
      if (isControlLetter(ch)) {
        state.lastIntValue = ch % 32;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
      if (forceU === void 0)
        forceU = false;
      var start = state.pos;
      var switchU = forceU || state.switchU;
      if (state.eat(
        117
        /* u */
      )) {
        if (this.regexp_eatFixedHexDigits(state, 4)) {
          var lead = state.lastIntValue;
          if (switchU && lead >= 55296 && lead <= 56319) {
            var leadSurrogateEnd = state.pos;
            if (state.eat(
              92
              /* \ */
            ) && state.eat(
              117
              /* u */
            ) && this.regexp_eatFixedHexDigits(state, 4)) {
              var trail = state.lastIntValue;
              if (trail >= 56320 && trail <= 57343) {
                state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
                return true;
              }
            }
            state.pos = leadSurrogateEnd;
            state.lastIntValue = lead;
          }
          return true;
        }
        if (switchU && state.eat(
          123
          /* { */
        ) && this.regexp_eatHexDigits(state) && state.eat(
          125
          /* } */
        ) && isValidUnicode(state.lastIntValue)) {
          return true;
        }
        if (switchU) {
          state.raise("Invalid unicode escape");
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatIdentityEscape = function(state) {
      if (state.switchU) {
        if (this.regexp_eatSyntaxCharacter(state)) {
          return true;
        }
        if (state.eat(
          47
          /* / */
        )) {
          state.lastIntValue = 47;
          return true;
        }
        return false;
      }
      var ch = state.current();
      if (ch !== 99 && (!state.switchN || ch !== 107)) {
        state.lastIntValue = ch;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatDecimalEscape = function(state) {
      state.lastIntValue = 0;
      var ch = state.current();
      if (ch >= 49 && ch <= 57) {
        do {
          state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
          state.advance();
        } while ((ch = state.current()) >= 48 && ch <= 57);
        return true;
      }
      return false;
    };
    pp$1.regexp_eatCharacterClassEscape = function(state) {
      var ch = state.current();
      if (isCharacterClassEscape(ch)) {
        state.lastIntValue = -1;
        state.advance();
        return true;
      }
      if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 80 || ch === 112)) {
        state.lastIntValue = -1;
        state.advance();
        if (state.eat(
          123
          /* { */
        ) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(
          125
          /* } */
        )) {
          return true;
        }
        state.raise("Invalid property name");
      }
      return false;
    };
    pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
      var start = state.pos;
      if (this.regexp_eatUnicodePropertyName(state) && state.eat(
        61
        /* = */
      )) {
        var name = state.lastStringValue;
        if (this.regexp_eatUnicodePropertyValue(state)) {
          var value = state.lastStringValue;
          this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
          return true;
        }
      }
      state.pos = start;
      if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
        var nameOrValue = state.lastStringValue;
        this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
        return true;
      }
      return false;
    };
    pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
      if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
        state.raise("Invalid property name");
      }
      if (!state.unicodeProperties.nonBinary[name].test(value)) {
        state.raise("Invalid property value");
      }
    };
    pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
      if (!state.unicodeProperties.binary.test(nameOrValue)) {
        state.raise("Invalid property name");
      }
    };
    pp$1.regexp_eatUnicodePropertyName = function(state) {
      var ch = 0;
      state.lastStringValue = "";
      while (isUnicodePropertyNameCharacter(ch = state.current())) {
        state.lastStringValue += codePointToString(ch);
        state.advance();
      }
      return state.lastStringValue !== "";
    };
    pp$1.regexp_eatUnicodePropertyValue = function(state) {
      var ch = 0;
      state.lastStringValue = "";
      while (isUnicodePropertyValueCharacter(ch = state.current())) {
        state.lastStringValue += codePointToString(ch);
        state.advance();
      }
      return state.lastStringValue !== "";
    };
    pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
      return this.regexp_eatUnicodePropertyValue(state);
    };
    pp$1.regexp_eatCharacterClass = function(state) {
      if (state.eat(
        91
        /* [ */
      )) {
        state.eat(
          94
          /* ^ */
        );
        this.regexp_classRanges(state);
        if (state.eat(
          93
          /* ] */
        )) {
          return true;
        }
        state.raise("Unterminated character class");
      }
      return false;
    };
    pp$1.regexp_classRanges = function(state) {
      while (this.regexp_eatClassAtom(state)) {
        var left = state.lastIntValue;
        if (state.eat(
          45
          /* - */
        ) && this.regexp_eatClassAtom(state)) {
          var right = state.lastIntValue;
          if (state.switchU && (left === -1 || right === -1)) {
            state.raise("Invalid character class");
          }
          if (left !== -1 && right !== -1 && left > right) {
            state.raise("Range out of order in character class");
          }
        }
      }
    };
    pp$1.regexp_eatClassAtom = function(state) {
      var start = state.pos;
      if (state.eat(
        92
        /* \ */
      )) {
        if (this.regexp_eatClassEscape(state)) {
          return true;
        }
        if (state.switchU) {
          var ch$1 = state.current();
          if (ch$1 === 99 || isOctalDigit(ch$1)) {
            state.raise("Invalid class escape");
          }
          state.raise("Invalid escape");
        }
        state.pos = start;
      }
      var ch = state.current();
      if (ch !== 93) {
        state.lastIntValue = ch;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatClassEscape = function(state) {
      var start = state.pos;
      if (state.eat(
        98
        /* b */
      )) {
        state.lastIntValue = 8;
        return true;
      }
      if (state.switchU && state.eat(
        45
        /* - */
      )) {
        state.lastIntValue = 45;
        return true;
      }
      if (!state.switchU && state.eat(
        99
        /* c */
      )) {
        if (this.regexp_eatClassControlLetter(state)) {
          return true;
        }
        state.pos = start;
      }
      return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
    };
    pp$1.regexp_eatClassControlLetter = function(state) {
      var ch = state.current();
      if (isDecimalDigit(ch) || ch === 95) {
        state.lastIntValue = ch % 32;
        state.advance();
        return true;
      }
      return false;
    };
    pp$1.regexp_eatHexEscapeSequence = function(state) {
      var start = state.pos;
      if (state.eat(
        120
        /* x */
      )) {
        if (this.regexp_eatFixedHexDigits(state, 2)) {
          return true;
        }
        if (state.switchU) {
          state.raise("Invalid escape");
        }
        state.pos = start;
      }
      return false;
    };
    pp$1.regexp_eatDecimalDigits = function(state) {
      var start = state.pos;
      var ch = 0;
      state.lastIntValue = 0;
      while (isDecimalDigit(ch = state.current())) {
        state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
        state.advance();
      }
      return state.pos !== start;
    };
    pp$1.regexp_eatHexDigits = function(state) {
      var start = state.pos;
      var ch = 0;
      state.lastIntValue = 0;
      while (isHexDigit(ch = state.current())) {
        state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
        state.advance();
      }
      return state.pos !== start;
    };
    pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
      if (this.regexp_eatOctalDigit(state)) {
        var n1 = state.lastIntValue;
        if (this.regexp_eatOctalDigit(state)) {
          var n2 = state.lastIntValue;
          if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
            state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
          } else {
            state.lastIntValue = n1 * 8 + n2;
          }
        } else {
          state.lastIntValue = n1;
        }
        return true;
      }
      return false;
    };
    pp$1.regexp_eatOctalDigit = function(state) {
      var ch = state.current();
      if (isOctalDigit(ch)) {
        state.lastIntValue = ch - 48;
        state.advance();
        return true;
      }
      state.lastIntValue = 0;
      return false;
    };
    pp$1.regexp_eatFixedHexDigits = function(state, length) {
      var start = state.pos;
      state.lastIntValue = 0;
      for (var i = 0; i < length; ++i) {
        var ch = state.current();
        if (!isHexDigit(ch)) {
          state.pos = start;
          return false;
        }
        state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
        state.advance();
      }
      return true;
    };
    Token = function Token2(p) {
      this.type = p.type;
      this.value = p.value;
      this.start = p.start;
      this.end = p.end;
      if (p.options.locations) {
        this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
      }
      if (p.options.ranges) {
        this.range = [p.start, p.end];
      }
    };
    pp = Parser.prototype;
    pp.next = function(ignoreEscapeSequenceInKeyword) {
      if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
        this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
      }
      if (this.options.onToken) {
        this.options.onToken(new Token(this));
      }
      this.lastTokEnd = this.end;
      this.lastTokStart = this.start;
      this.lastTokEndLoc = this.endLoc;
      this.lastTokStartLoc = this.startLoc;
      this.nextToken();
    };
    pp.getToken = function() {
      this.next();
      return new Token(this);
    };
    if (typeof Symbol !== "undefined") {
      pp[Symbol.iterator] = function() {
        var this$1$1 = this;
        return {
          next: function() {
            var token = this$1$1.getToken();
            return {
              done: token.type === types$1.eof,
              value: token
            };
          }
        };
      };
    }
    pp.nextToken = function() {
      var curContext = this.curContext();
      if (!curContext || !curContext.preserveSpace) {
        this.skipSpace();
      }
      this.start = this.pos;
      if (this.options.locations) {
        this.startLoc = this.curPosition();
      }
      if (this.pos >= this.input.length) {
        return this.finishToken(types$1.eof);
      }
      if (curContext.override) {
        return curContext.override(this);
      } else {
        this.readToken(this.fullCharCodeAtPos());
      }
    };
    pp.readToken = function(code) {
      if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
        return this.readWord();
      }
      return this.getTokenFromCode(code);
    };
    pp.fullCharCodeAtPos = function() {
      var code = this.input.charCodeAt(this.pos);
      if (code <= 55295 || code >= 56320) {
        return code;
      }
      var next = this.input.charCodeAt(this.pos + 1);
      return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
    };
    pp.skipBlockComment = function() {
      var startLoc = this.options.onComment && this.curPosition();
      var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
      if (end === -1) {
        this.raise(this.pos - 2, "Unterminated comment");
      }
      this.pos = end + 2;
      if (this.options.locations) {
        for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
          ++this.curLine;
          pos = this.lineStart = nextBreak;
        }
      }
      if (this.options.onComment) {
        this.options.onComment(
          true,
          this.input.slice(start + 2, end),
          start,
          this.pos,
          startLoc,
          this.curPosition()
        );
      }
    };
    pp.skipLineComment = function(startSkip) {
      var start = this.pos;
      var startLoc = this.options.onComment && this.curPosition();
      var ch = this.input.charCodeAt(this.pos += startSkip);
      while (this.pos < this.input.length && !isNewLine(ch)) {
        ch = this.input.charCodeAt(++this.pos);
      }
      if (this.options.onComment) {
        this.options.onComment(
          false,
          this.input.slice(start + startSkip, this.pos),
          start,
          this.pos,
          startLoc,
          this.curPosition()
        );
      }
    };
    pp.skipSpace = function() {
      loop:
        while (this.pos < this.input.length) {
          var ch = this.input.charCodeAt(this.pos);
          switch (ch) {
            case 32:
            case 160:
              ++this.pos;
              break;
            case 13:
              if (this.input.charCodeAt(this.pos + 1) === 10) {
                ++this.pos;
              }
            case 10:
            case 8232:
            case 8233:
              ++this.pos;
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
              break;
            case 47:
              switch (this.input.charCodeAt(this.pos + 1)) {
                case 42:
                  this.skipBlockComment();
                  break;
                case 47:
                  this.skipLineComment(2);
                  break;
                default:
                  break loop;
              }
              break;
            default:
              if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                ++this.pos;
              } else {
                break loop;
              }
          }
        }
    };
    pp.finishToken = function(type, val) {
      this.end = this.pos;
      if (this.options.locations) {
        this.endLoc = this.curPosition();
      }
      var prevType = this.type;
      this.type = type;
      this.value = val;
      this.updateContext(prevType);
    };
    pp.readToken_dot = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next >= 48 && next <= 57) {
        return this.readNumber(true);
      }
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
        this.pos += 3;
        return this.finishToken(types$1.ellipsis);
      } else {
        ++this.pos;
        return this.finishToken(types$1.dot);
      }
    };
    pp.readToken_slash = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      if (this.exprAllowed) {
        ++this.pos;
        return this.readRegexp();
      }
      if (next === 61) {
        return this.finishOp(types$1.assign, 2);
      }
      return this.finishOp(types$1.slash, 1);
    };
    pp.readToken_mult_modulo_exp = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      var size = 1;
      var tokentype = code === 42 ? types$1.star : types$1.modulo;
      if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
        ++size;
        tokentype = types$1.starstar;
        next = this.input.charCodeAt(this.pos + 2);
      }
      if (next === 61) {
        return this.finishOp(types$1.assign, size + 1);
      }
      return this.finishOp(tokentype, size);
    };
    pp.readToken_pipe_amp = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === code) {
        if (this.options.ecmaVersion >= 12) {
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (next2 === 61) {
            return this.finishOp(types$1.assign, 3);
          }
        }
        return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
      }
      if (next === 61) {
        return this.finishOp(types$1.assign, 2);
      }
      return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
    };
    pp.readToken_caret = function() {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 61) {
        return this.finishOp(types$1.assign, 2);
      }
      return this.finishOp(types$1.bitwiseXOR, 1);
    };
    pp.readToken_plus_min = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === code) {
        if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
          this.skipLineComment(3);
          this.skipSpace();
          return this.nextToken();
        }
        return this.finishOp(types$1.incDec, 2);
      }
      if (next === 61) {
        return this.finishOp(types$1.assign, 2);
      }
      return this.finishOp(types$1.plusMin, 1);
    };
    pp.readToken_lt_gt = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      var size = 1;
      if (next === code) {
        size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
        if (this.input.charCodeAt(this.pos + size) === 61) {
          return this.finishOp(types$1.assign, size + 1);
        }
        return this.finishOp(types$1.bitShift, size);
      }
      if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
        this.skipLineComment(4);
        this.skipSpace();
        return this.nextToken();
      }
      if (next === 61) {
        size = 2;
      }
      return this.finishOp(types$1.relational, size);
    };
    pp.readToken_eq_excl = function(code) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 61) {
        return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
      }
      if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
        this.pos += 2;
        return this.finishToken(types$1.arrow);
      }
      return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
    };
    pp.readToken_question = function() {
      var ecmaVersion = this.options.ecmaVersion;
      if (ecmaVersion >= 11) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 46) {
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (next2 < 48 || next2 > 57) {
            return this.finishOp(types$1.questionDot, 2);
          }
        }
        if (next === 63) {
          if (ecmaVersion >= 12) {
            var next2$1 = this.input.charCodeAt(this.pos + 2);
            if (next2$1 === 61) {
              return this.finishOp(types$1.assign, 3);
            }
          }
          return this.finishOp(types$1.coalesce, 2);
        }
      }
      return this.finishOp(types$1.question, 1);
    };
    pp.readToken_numberSign = function() {
      var ecmaVersion = this.options.ecmaVersion;
      var code = 35;
      if (ecmaVersion >= 13) {
        ++this.pos;
        code = this.fullCharCodeAtPos();
        if (isIdentifierStart(code, true) || code === 92) {
          return this.finishToken(types$1.privateId, this.readWord1());
        }
      }
      this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
    };
    pp.getTokenFromCode = function(code) {
      switch (code) {
        case 46:
          return this.readToken_dot();
        case 40:
          ++this.pos;
          return this.finishToken(types$1.parenL);
        case 41:
          ++this.pos;
          return this.finishToken(types$1.parenR);
        case 59:
          ++this.pos;
          return this.finishToken(types$1.semi);
        case 44:
          ++this.pos;
          return this.finishToken(types$1.comma);
        case 91:
          ++this.pos;
          return this.finishToken(types$1.bracketL);
        case 93:
          ++this.pos;
          return this.finishToken(types$1.bracketR);
        case 123:
          ++this.pos;
          return this.finishToken(types$1.braceL);
        case 125:
          ++this.pos;
          return this.finishToken(types$1.braceR);
        case 58:
          ++this.pos;
          return this.finishToken(types$1.colon);
        case 96:
          if (this.options.ecmaVersion < 6) {
            break;
          }
          ++this.pos;
          return this.finishToken(types$1.backQuote);
        case 48:
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 120 || next === 88) {
            return this.readRadixNumber(16);
          }
          if (this.options.ecmaVersion >= 6) {
            if (next === 111 || next === 79) {
              return this.readRadixNumber(8);
            }
            if (next === 98 || next === 66) {
              return this.readRadixNumber(2);
            }
          }
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return this.readNumber(false);
        case 34:
        case 39:
          return this.readString(code);
        case 47:
          return this.readToken_slash();
        case 37:
        case 42:
          return this.readToken_mult_modulo_exp(code);
        case 124:
        case 38:
          return this.readToken_pipe_amp(code);
        case 94:
          return this.readToken_caret();
        case 43:
        case 45:
          return this.readToken_plus_min(code);
        case 60:
        case 62:
          return this.readToken_lt_gt(code);
        case 61:
        case 33:
          return this.readToken_eq_excl(code);
        case 63:
          return this.readToken_question();
        case 126:
          return this.finishOp(types$1.prefix, 1);
        case 35:
          return this.readToken_numberSign();
      }
      this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
    };
    pp.finishOp = function(type, size) {
      var str = this.input.slice(this.pos, this.pos + size);
      this.pos += size;
      return this.finishToken(type, str);
    };
    pp.readRegexp = function() {
      var escaped, inClass, start = this.pos;
      for (; ; ) {
        if (this.pos >= this.input.length) {
          this.raise(start, "Unterminated regular expression");
        }
        var ch = this.input.charAt(this.pos);
        if (lineBreak.test(ch)) {
          this.raise(start, "Unterminated regular expression");
        }
        if (!escaped) {
          if (ch === "[") {
            inClass = true;
          } else if (ch === "]" && inClass) {
            inClass = false;
          } else if (ch === "/" && !inClass) {
            break;
          }
          escaped = ch === "\\";
        } else {
          escaped = false;
        }
        ++this.pos;
      }
      var pattern = this.input.slice(start, this.pos);
      ++this.pos;
      var flagsStart = this.pos;
      var flags = this.readWord1();
      if (this.containsEsc) {
        this.unexpected(flagsStart);
      }
      var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
      state.reset(start, pattern, flags);
      this.validateRegExpFlags(state);
      this.validateRegExpPattern(state);
      var value = null;
      try {
        value = new RegExp(pattern, flags);
      } catch (e) {
      }
      return this.finishToken(types$1.regexp, { pattern, flags, value });
    };
    pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
      var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
      var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
      var start = this.pos, total = 0, lastCode = 0;
      for (var i = 0, e = len == null ? Infinity : len; i < e; ++i, ++this.pos) {
        var code = this.input.charCodeAt(this.pos), val = void 0;
        if (allowSeparators && code === 95) {
          if (isLegacyOctalNumericLiteral) {
            this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
          }
          if (lastCode === 95) {
            this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
          }
          if (i === 0) {
            this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
          }
          lastCode = code;
          continue;
        }
        if (code >= 97) {
          val = code - 97 + 10;
        } else if (code >= 65) {
          val = code - 65 + 10;
        } else if (code >= 48 && code <= 57) {
          val = code - 48;
        } else {
          val = Infinity;
        }
        if (val >= radix) {
          break;
        }
        lastCode = code;
        total = total * radix + val;
      }
      if (allowSeparators && lastCode === 95) {
        this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
      }
      if (this.pos === start || len != null && this.pos - start !== len) {
        return null;
      }
      return total;
    };
    pp.readRadixNumber = function(radix) {
      var start = this.pos;
      this.pos += 2;
      var val = this.readInt(radix);
      if (val == null) {
        this.raise(this.start + 2, "Expected number in radix " + radix);
      }
      if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
        val = stringToBigInt(this.input.slice(start, this.pos));
        ++this.pos;
      } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      return this.finishToken(types$1.num, val);
    };
    pp.readNumber = function(startsWithDot) {
      var start = this.pos;
      if (!startsWithDot && this.readInt(10, void 0, true) === null) {
        this.raise(start, "Invalid number");
      }
      var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
      if (octal && this.strict) {
        this.raise(start, "Invalid number");
      }
      var next = this.input.charCodeAt(this.pos);
      if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
        var val$1 = stringToBigInt(this.input.slice(start, this.pos));
        ++this.pos;
        if (isIdentifierStart(this.fullCharCodeAtPos())) {
          this.raise(this.pos, "Identifier directly after number");
        }
        return this.finishToken(types$1.num, val$1);
      }
      if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
        octal = false;
      }
      if (next === 46 && !octal) {
        ++this.pos;
        this.readInt(10);
        next = this.input.charCodeAt(this.pos);
      }
      if ((next === 69 || next === 101) && !octal) {
        next = this.input.charCodeAt(++this.pos);
        if (next === 43 || next === 45) {
          ++this.pos;
        }
        if (this.readInt(10) === null) {
          this.raise(start, "Invalid number");
        }
      }
      if (isIdentifierStart(this.fullCharCodeAtPos())) {
        this.raise(this.pos, "Identifier directly after number");
      }
      var val = stringToNumber(this.input.slice(start, this.pos), octal);
      return this.finishToken(types$1.num, val);
    };
    pp.readCodePoint = function() {
      var ch = this.input.charCodeAt(this.pos), code;
      if (ch === 123) {
        if (this.options.ecmaVersion < 6) {
          this.unexpected();
        }
        var codePos = ++this.pos;
        code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
        ++this.pos;
        if (code > 1114111) {
          this.invalidStringToken(codePos, "Code point out of bounds");
        }
      } else {
        code = this.readHexChar(4);
      }
      return code;
    };
    pp.readString = function(quote) {
      var out = "", chunkStart = ++this.pos;
      for (; ; ) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated string constant");
        }
        var ch = this.input.charCodeAt(this.pos);
        if (ch === quote) {
          break;
        }
        if (ch === 92) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.readEscapedChar(false);
          chunkStart = this.pos;
        } else if (ch === 8232 || ch === 8233) {
          if (this.options.ecmaVersion < 10) {
            this.raise(this.start, "Unterminated string constant");
          }
          ++this.pos;
          if (this.options.locations) {
            this.curLine++;
            this.lineStart = this.pos;
          }
        } else {
          if (isNewLine(ch)) {
            this.raise(this.start, "Unterminated string constant");
          }
          ++this.pos;
        }
      }
      out += this.input.slice(chunkStart, this.pos++);
      return this.finishToken(types$1.string, out);
    };
    INVALID_TEMPLATE_ESCAPE_ERROR = {};
    pp.tryReadTemplateToken = function() {
      this.inTemplateElement = true;
      try {
        this.readTmplToken();
      } catch (err) {
        if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
          this.readInvalidTemplateToken();
        } else {
          throw err;
        }
      }
      this.inTemplateElement = false;
    };
    pp.invalidStringToken = function(position, message) {
      if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
        throw INVALID_TEMPLATE_ESCAPE_ERROR;
      } else {
        this.raise(position, message);
      }
    };
    pp.readTmplToken = function() {
      var out = "", chunkStart = this.pos;
      for (; ; ) {
        if (this.pos >= this.input.length) {
          this.raise(this.start, "Unterminated template");
        }
        var ch = this.input.charCodeAt(this.pos);
        if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
          if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
            if (ch === 36) {
              this.pos += 2;
              return this.finishToken(types$1.dollarBraceL);
            } else {
              ++this.pos;
              return this.finishToken(types$1.backQuote);
            }
          }
          out += this.input.slice(chunkStart, this.pos);
          return this.finishToken(types$1.template, out);
        }
        if (ch === 92) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.readEscapedChar(true);
          chunkStart = this.pos;
        } else if (isNewLine(ch)) {
          out += this.input.slice(chunkStart, this.pos);
          ++this.pos;
          switch (ch) {
            case 13:
              if (this.input.charCodeAt(this.pos) === 10) {
                ++this.pos;
              }
            case 10:
              out += "\n";
              break;
            default:
              out += String.fromCharCode(ch);
              break;
          }
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          chunkStart = this.pos;
        } else {
          ++this.pos;
        }
      }
    };
    pp.readInvalidTemplateToken = function() {
      for (; this.pos < this.input.length; this.pos++) {
        switch (this.input[this.pos]) {
          case "\\":
            ++this.pos;
            break;
          case "$":
            if (this.input[this.pos + 1] !== "{") {
              break;
            }
          case "`":
            return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
        }
      }
      this.raise(this.start, "Unterminated template");
    };
    pp.readEscapedChar = function(inTemplate) {
      var ch = this.input.charCodeAt(++this.pos);
      ++this.pos;
      switch (ch) {
        case 110:
          return "\n";
        case 114:
          return "\r";
        case 120:
          return String.fromCharCode(this.readHexChar(2));
        case 117:
          return codePointToString(this.readCodePoint());
        case 116:
          return "	";
        case 98:
          return "\b";
        case 118:
          return "\v";
        case 102:
          return "\f";
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
          }
        case 10:
          if (this.options.locations) {
            this.lineStart = this.pos;
            ++this.curLine;
          }
          return "";
        case 56:
        case 57:
          if (this.strict) {
            this.invalidStringToken(
              this.pos - 1,
              "Invalid escape sequence"
            );
          }
          if (inTemplate) {
            var codePos = this.pos - 1;
            this.invalidStringToken(
              codePos,
              "Invalid escape sequence in template string"
            );
          }
        default:
          if (ch >= 48 && ch <= 55) {
            var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
            var octal = parseInt(octalStr, 8);
            if (octal > 255) {
              octalStr = octalStr.slice(0, -1);
              octal = parseInt(octalStr, 8);
            }
            this.pos += octalStr.length - 1;
            ch = this.input.charCodeAt(this.pos);
            if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
              this.invalidStringToken(
                this.pos - 1 - octalStr.length,
                inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"
              );
            }
            return String.fromCharCode(octal);
          }
          if (isNewLine(ch)) {
            return "";
          }
          return String.fromCharCode(ch);
      }
    };
    pp.readHexChar = function(len) {
      var codePos = this.pos;
      var n2 = this.readInt(16, len);
      if (n2 === null) {
        this.invalidStringToken(codePos, "Bad character escape sequence");
      }
      return n2;
    };
    pp.readWord1 = function() {
      this.containsEsc = false;
      var word = "", first = true, chunkStart = this.pos;
      var astral = this.options.ecmaVersion >= 6;
      while (this.pos < this.input.length) {
        var ch = this.fullCharCodeAtPos();
        if (isIdentifierChar(ch, astral)) {
          this.pos += ch <= 65535 ? 1 : 2;
        } else if (ch === 92) {
          this.containsEsc = true;
          word += this.input.slice(chunkStart, this.pos);
          var escStart = this.pos;
          if (this.input.charCodeAt(++this.pos) !== 117) {
            this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
          }
          ++this.pos;
          var esc = this.readCodePoint();
          if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
            this.invalidStringToken(escStart, "Invalid Unicode escape");
          }
          word += codePointToString(esc);
          chunkStart = this.pos;
        } else {
          break;
        }
        first = false;
      }
      return word + this.input.slice(chunkStart, this.pos);
    };
    pp.readWord = function() {
      var word = this.readWord1();
      var type = types$1.name;
      if (this.keywords.test(word)) {
        type = keywords[word];
      }
      return this.finishToken(type, word);
    };
    version = "8.8.2";
    Parser.acorn = {
      Parser,
      version,
      defaultOptions,
      Position,
      SourceLocation,
      getLineInfo,
      Node,
      TokenType,
      tokTypes: types$1,
      keywordTypes: keywords,
      TokContext,
      tokContexts: types,
      isIdentifierChar,
      isIdentifierStart,
      Token,
      isNewLine,
      lineBreak,
      lineBreakG,
      nonASCIIwhitespace
    };
    _acorn = Object.defineProperty({
      __proto__: null,
      Node,
      Parser,
      Position,
      SourceLocation,
      TokContext,
      Token,
      TokenType,
      defaultOptions,
      getLineInfo,
      isIdentifierChar,
      isIdentifierStart,
      isNewLine,
      keywordTypes: keywords,
      lineBreak,
      lineBreakG,
      nonASCIIwhitespace,
      parse: parse3,
      parseExpressionAt: parseExpressionAt2,
      tokContexts: types,
      tokTypes: types$1,
      tokenizer: tokenizer2,
      version
    }, Symbol.toStringTag, { value: "Module" });
    ANONYMOUS_PLUGIN_PREFIX = "at position ";
    ANONYMOUS_OUTPUT_PLUGIN_PREFIX = "at output position ";
    NO_CACHE = {
      delete() {
        return false;
      },
      get() {
        return void 0;
      },
      has() {
        return false;
      },
      set() {
      }
    };
    RESOLVE_DEPENDENCIES = "resolveDependencies";
    ModuleLoader = class {
      constructor(graph, modulesById, options, pluginDriver) {
        this.graph = graph;
        this.modulesById = modulesById;
        this.options = options;
        this.pluginDriver = pluginDriver;
        this.implicitEntryModules = /* @__PURE__ */ new Set();
        this.indexedEntryModules = [];
        this.latestLoadModulesPromise = Promise.resolve();
        this.moduleLoadPromises = /* @__PURE__ */ new Map();
        this.modulesWithLoadedDependencies = /* @__PURE__ */ new Set();
        this.nextChunkNamePriority = 0;
        this.nextEntryModuleIndex = 0;
        this.resolveId = async (source, importer, customOptions, isEntry, assertions, skip = null) => this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(this.options.external(source, importer, false) ? false : await resolveId(source, importer, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, skip, customOptions, typeof isEntry === "boolean" ? isEntry : !importer, assertions), importer, source), assertions);
        this.hasModuleSideEffects = options.treeshake ? options.treeshake.moduleSideEffects : () => true;
      }
      async addAdditionalModules(unresolvedModules) {
        const result = this.extendLoadModulesPromise(Promise.all(unresolvedModules.map((id) => this.loadEntryModule(id, false, void 0, null))));
        await this.awaitLoadModulesPromise();
        return result;
      }
      async addEntryModules(unresolvedEntryModules, isUserDefined) {
        const firstEntryModuleIndex = this.nextEntryModuleIndex;
        this.nextEntryModuleIndex += unresolvedEntryModules.length;
        const firstChunkNamePriority = this.nextChunkNamePriority;
        this.nextChunkNamePriority += unresolvedEntryModules.length;
        const newEntryModules = await this.extendLoadModulesPromise(Promise.all(unresolvedEntryModules.map(({ id, importer }) => this.loadEntryModule(id, true, importer, null))).then((entryModules) => {
          for (const [index, entryModule] of entryModules.entries()) {
            entryModule.isUserDefinedEntryPoint = entryModule.isUserDefinedEntryPoint || isUserDefined;
            addChunkNamesToModule(entryModule, unresolvedEntryModules[index], isUserDefined, firstChunkNamePriority + index);
            const existingIndexedModule = this.indexedEntryModules.find((indexedModule) => indexedModule.module === entryModule);
            if (existingIndexedModule) {
              existingIndexedModule.index = Math.min(existingIndexedModule.index, firstEntryModuleIndex + index);
            } else {
              this.indexedEntryModules.push({
                index: firstEntryModuleIndex + index,
                module: entryModule
              });
            }
          }
          this.indexedEntryModules.sort(({ index: indexA }, { index: indexB }) => indexA > indexB ? 1 : -1);
          return entryModules;
        }));
        await this.awaitLoadModulesPromise();
        return {
          entryModules: this.indexedEntryModules.map(({ module }) => module),
          implicitEntryModules: [...this.implicitEntryModules],
          newEntryModules
        };
      }
      async emitChunk({ fileName, id, importer, name, implicitlyLoadedAfterOneOf, preserveSignature }) {
        const unresolvedModule = {
          fileName: fileName || null,
          id,
          importer,
          name: name || null
        };
        const module = implicitlyLoadedAfterOneOf ? await this.addEntryWithImplicitDependants(unresolvedModule, implicitlyLoadedAfterOneOf) : (await this.addEntryModules([unresolvedModule], false)).newEntryModules[0];
        if (preserveSignature != null) {
          module.preserveSignature = preserveSignature;
        }
        return module;
      }
      async preloadModule(resolvedId) {
        const module = await this.fetchModule(this.getResolvedIdWithDefaults(resolvedId, EMPTY_OBJECT), void 0, false, resolvedId.resolveDependencies ? RESOLVE_DEPENDENCIES : true);
        return module.info;
      }
      addEntryWithImplicitDependants(unresolvedModule, implicitlyLoadedAfter) {
        const chunkNamePriority = this.nextChunkNamePriority++;
        return this.extendLoadModulesPromise(this.loadEntryModule(unresolvedModule.id, false, unresolvedModule.importer, null).then(async (entryModule) => {
          addChunkNamesToModule(entryModule, unresolvedModule, false, chunkNamePriority);
          if (!entryModule.info.isEntry) {
            this.implicitEntryModules.add(entryModule);
            const implicitlyLoadedAfterModules = await Promise.all(implicitlyLoadedAfter.map((id) => this.loadEntryModule(id, false, unresolvedModule.importer, entryModule.id)));
            for (const module of implicitlyLoadedAfterModules) {
              entryModule.implicitlyLoadedAfter.add(module);
            }
            for (const dependant of entryModule.implicitlyLoadedAfter) {
              dependant.implicitlyLoadedBefore.add(entryModule);
            }
          }
          return entryModule;
        }));
      }
      async addModuleSource(id, importer, module) {
        let source;
        try {
          source = await this.graph.fileOperationQueue.run(async () => await this.pluginDriver.hookFirst("load", [id]) ?? await (0, import_promises.readFile)(id, "utf8"));
        } catch (error_) {
          let message = `Could not load ${id}`;
          if (importer)
            message += ` (imported by ${relativeId(importer)})`;
          message += `: ${error_.message}`;
          error_.message = message;
          throw error_;
        }
        const sourceDescription = typeof source === "string" ? { code: source } : source != null && typeof source === "object" && typeof source.code === "string" ? source : error(errorBadLoader(id));
        const cachedModule = this.graph.cachedModules.get(id);
        if (cachedModule && !cachedModule.customTransformCache && cachedModule.originalCode === sourceDescription.code && !await this.pluginDriver.hookFirst("shouldTransformCachedModule", [
          {
            ast: cachedModule.ast,
            code: cachedModule.code,
            id: cachedModule.id,
            meta: cachedModule.meta,
            moduleSideEffects: cachedModule.moduleSideEffects,
            resolvedSources: cachedModule.resolvedIds,
            syntheticNamedExports: cachedModule.syntheticNamedExports
          }
        ])) {
          if (cachedModule.transformFiles) {
            for (const emittedFile of cachedModule.transformFiles)
              this.pluginDriver.emitFile(emittedFile);
          }
          module.setSource(cachedModule);
        } else {
          module.updateOptions(sourceDescription);
          module.setSource(await transform(sourceDescription, module, this.pluginDriver, this.options.onwarn));
        }
      }
      async awaitLoadModulesPromise() {
        let startingPromise;
        do {
          startingPromise = this.latestLoadModulesPromise;
          await startingPromise;
        } while (startingPromise !== this.latestLoadModulesPromise);
      }
      extendLoadModulesPromise(loadNewModulesPromise) {
        this.latestLoadModulesPromise = Promise.all([
          loadNewModulesPromise,
          this.latestLoadModulesPromise
        ]);
        this.latestLoadModulesPromise.catch(() => {
        });
        return loadNewModulesPromise;
      }
      async fetchDynamicDependencies(module, resolveDynamicImportPromises) {
        const dependencies = await Promise.all(resolveDynamicImportPromises.map((resolveDynamicImportPromise) => resolveDynamicImportPromise.then(async ([dynamicImport, resolvedId]) => {
          if (resolvedId === null)
            return null;
          if (typeof resolvedId === "string") {
            dynamicImport.resolution = resolvedId;
            return null;
          }
          return dynamicImport.resolution = await this.fetchResolvedDependency(relativeId(resolvedId.id), module.id, resolvedId);
        })));
        for (const dependency of dependencies) {
          if (dependency) {
            module.dynamicDependencies.add(dependency);
            dependency.dynamicImporters.push(module.id);
          }
        }
      }
      // If this is a preload, then this method always waits for the dependencies of
      // the module to be resolved.
      // Otherwise, if the module does not exist, it waits for the module and all
      // its dependencies to be loaded.
      // Otherwise, it returns immediately.
      async fetchModule({ assertions, id, meta, moduleSideEffects, syntheticNamedExports }, importer, isEntry, isPreload) {
        const existingModule = this.modulesById.get(id);
        if (existingModule instanceof Module) {
          if (importer && doAssertionsDiffer(assertions, existingModule.info.assertions)) {
            this.options.onwarn(errorInconsistentImportAssertions(existingModule.info.assertions, assertions, id, importer));
          }
          await this.handleExistingModule(existingModule, isEntry, isPreload);
          return existingModule;
        }
        const module = new Module(this.graph, id, this.options, isEntry, moduleSideEffects, syntheticNamedExports, meta, assertions);
        this.modulesById.set(id, module);
        this.graph.watchFiles[id] = true;
        const loadPromise = this.addModuleSource(id, importer, module).then(() => [
          this.getResolveStaticDependencyPromises(module),
          this.getResolveDynamicImportPromises(module),
          loadAndResolveDependenciesPromise
        ]);
        const loadAndResolveDependenciesPromise = waitForDependencyResolution(loadPromise).then(() => this.pluginDriver.hookParallel("moduleParsed", [module.info]));
        loadAndResolveDependenciesPromise.catch(() => {
        });
        this.moduleLoadPromises.set(module, loadPromise);
        const resolveDependencyPromises = await loadPromise;
        if (!isPreload) {
          await this.fetchModuleDependencies(module, ...resolveDependencyPromises);
        } else if (isPreload === RESOLVE_DEPENDENCIES) {
          await loadAndResolveDependenciesPromise;
        }
        return module;
      }
      async fetchModuleDependencies(module, resolveStaticDependencyPromises, resolveDynamicDependencyPromises, loadAndResolveDependenciesPromise) {
        if (this.modulesWithLoadedDependencies.has(module)) {
          return;
        }
        this.modulesWithLoadedDependencies.add(module);
        await Promise.all([
          this.fetchStaticDependencies(module, resolveStaticDependencyPromises),
          this.fetchDynamicDependencies(module, resolveDynamicDependencyPromises)
        ]);
        module.linkImports();
        await loadAndResolveDependenciesPromise;
      }
      fetchResolvedDependency(source, importer, resolvedId) {
        if (resolvedId.external) {
          const { assertions, external, id, moduleSideEffects, meta } = resolvedId;
          let externalModule = this.modulesById.get(id);
          if (!externalModule) {
            externalModule = new ExternalModule(this.options, id, moduleSideEffects, meta, external !== "absolute" && isAbsolute(id), assertions);
            this.modulesById.set(id, externalModule);
          } else if (!(externalModule instanceof ExternalModule)) {
            return error(errorInternalIdCannotBeExternal(source, importer));
          } else if (doAssertionsDiffer(externalModule.info.assertions, assertions)) {
            this.options.onwarn(errorInconsistentImportAssertions(externalModule.info.assertions, assertions, source, importer));
          }
          return Promise.resolve(externalModule);
        }
        return this.fetchModule(resolvedId, importer, false, false);
      }
      async fetchStaticDependencies(module, resolveStaticDependencyPromises) {
        for (const dependency of await Promise.all(resolveStaticDependencyPromises.map((resolveStaticDependencyPromise) => resolveStaticDependencyPromise.then(([source, resolvedId]) => this.fetchResolvedDependency(source, module.id, resolvedId))))) {
          module.dependencies.add(dependency);
          dependency.importers.push(module.id);
        }
        if (!this.options.treeshake || module.info.moduleSideEffects === "no-treeshake") {
          for (const dependency of module.dependencies) {
            if (dependency instanceof Module) {
              dependency.importedFromNotTreeshaken = true;
            }
          }
        }
      }
      getNormalizedResolvedIdWithoutDefaults(resolveIdResult, importer, source) {
        const { makeAbsoluteExternalsRelative } = this.options;
        if (resolveIdResult) {
          if (typeof resolveIdResult === "object") {
            const external2 = resolveIdResult.external || this.options.external(resolveIdResult.id, importer, true);
            return {
              ...resolveIdResult,
              external: external2 && (external2 === "relative" || !isAbsolute(resolveIdResult.id) || external2 === true && isNotAbsoluteExternal(resolveIdResult.id, source, makeAbsoluteExternalsRelative) || "absolute")
            };
          }
          const external = this.options.external(resolveIdResult, importer, true);
          return {
            external: external && (isNotAbsoluteExternal(resolveIdResult, source, makeAbsoluteExternalsRelative) || "absolute"),
            id: external && makeAbsoluteExternalsRelative ? normalizeRelativeExternalId(resolveIdResult, importer) : resolveIdResult
          };
        }
        const id = makeAbsoluteExternalsRelative ? normalizeRelativeExternalId(source, importer) : source;
        if (resolveIdResult !== false && !this.options.external(id, importer, true)) {
          return null;
        }
        return {
          external: isNotAbsoluteExternal(id, source, makeAbsoluteExternalsRelative) || "absolute",
          id
        };
      }
      getResolveDynamicImportPromises(module) {
        return module.dynamicImports.map(async (dynamicImport) => {
          const resolvedId = await this.resolveDynamicImport(module, typeof dynamicImport.argument === "string" ? dynamicImport.argument : dynamicImport.argument.esTreeNode, module.id, getAssertionsFromImportExpression(dynamicImport.node));
          if (resolvedId && typeof resolvedId === "object") {
            dynamicImport.id = resolvedId.id;
          }
          return [dynamicImport, resolvedId];
        });
      }
      getResolveStaticDependencyPromises(module) {
        return Array.from(module.sourcesWithAssertions, async ([source, assertions]) => [
          source,
          module.resolvedIds[source] = module.resolvedIds[source] || this.handleInvalidResolvedId(await this.resolveId(source, module.id, EMPTY_OBJECT, false, assertions), source, module.id, assertions)
        ]);
      }
      getResolvedIdWithDefaults(resolvedId, assertions) {
        if (!resolvedId) {
          return null;
        }
        const external = resolvedId.external || false;
        return {
          assertions: resolvedId.assertions || assertions,
          external,
          id: resolvedId.id,
          meta: resolvedId.meta || {},
          moduleSideEffects: resolvedId.moduleSideEffects ?? this.hasModuleSideEffects(resolvedId.id, !!external),
          resolvedBy: resolvedId.resolvedBy ?? "rollup",
          syntheticNamedExports: resolvedId.syntheticNamedExports ?? false
        };
      }
      async handleExistingModule(module, isEntry, isPreload) {
        const loadPromise = this.moduleLoadPromises.get(module);
        if (isPreload) {
          return isPreload === RESOLVE_DEPENDENCIES ? waitForDependencyResolution(loadPromise) : loadPromise;
        }
        if (isEntry) {
          module.info.isEntry = true;
          this.implicitEntryModules.delete(module);
          for (const dependant of module.implicitlyLoadedAfter) {
            dependant.implicitlyLoadedBefore.delete(module);
          }
          module.implicitlyLoadedAfter.clear();
        }
        return this.fetchModuleDependencies(module, ...await loadPromise);
      }
      handleInvalidResolvedId(resolvedId, source, importer, assertions) {
        if (resolvedId === null) {
          if (isRelative(source)) {
            return error(errorUnresolvedImport(source, importer));
          }
          this.options.onwarn(errorUnresolvedImportTreatedAsExternal(source, importer));
          return {
            assertions,
            external: true,
            id: source,
            meta: {},
            moduleSideEffects: this.hasModuleSideEffects(source, true),
            resolvedBy: "rollup",
            syntheticNamedExports: false
          };
        } else if (resolvedId.external && resolvedId.syntheticNamedExports) {
          this.options.onwarn(errorExternalSyntheticExports(source, importer));
        }
        return resolvedId;
      }
      async loadEntryModule(unresolvedId, isEntry, importer, implicitlyLoadedBefore) {
        const resolveIdResult = await resolveId(unresolvedId, importer, this.options.preserveSymlinks, this.pluginDriver, this.resolveId, null, EMPTY_OBJECT, true, EMPTY_OBJECT);
        if (resolveIdResult == null) {
          return error(implicitlyLoadedBefore === null ? errorUnresolvedEntry(unresolvedId) : errorUnresolvedImplicitDependant(unresolvedId, implicitlyLoadedBefore));
        }
        if (resolveIdResult === false || typeof resolveIdResult === "object" && resolveIdResult.external) {
          return error(implicitlyLoadedBefore === null ? errorEntryCannotBeExternal(unresolvedId) : errorImplicitDependantCannotBeExternal(unresolvedId, implicitlyLoadedBefore));
        }
        return this.fetchModule(this.getResolvedIdWithDefaults(typeof resolveIdResult === "object" ? resolveIdResult : { id: resolveIdResult }, EMPTY_OBJECT), void 0, isEntry, false);
      }
      async resolveDynamicImport(module, specifier, importer, assertions) {
        const resolution = await this.pluginDriver.hookFirst("resolveDynamicImport", [
          specifier,
          importer,
          { assertions }
        ]);
        if (typeof specifier !== "string") {
          if (typeof resolution === "string") {
            return resolution;
          }
          if (!resolution) {
            return null;
          }
          return this.getResolvedIdWithDefaults(resolution, assertions);
        }
        if (resolution == null) {
          const existingResolution = module.resolvedIds[specifier];
          if (existingResolution) {
            if (doAssertionsDiffer(existingResolution.assertions, assertions)) {
              this.options.onwarn(errorInconsistentImportAssertions(existingResolution.assertions, assertions, specifier, importer));
            }
            return existingResolution;
          }
          return module.resolvedIds[specifier] = this.handleInvalidResolvedId(await this.resolveId(specifier, module.id, EMPTY_OBJECT, false, assertions), specifier, module.id, assertions);
        }
        return this.handleInvalidResolvedId(this.getResolvedIdWithDefaults(this.getNormalizedResolvedIdWithoutDefaults(resolution, importer, specifier), assertions), specifier, importer, assertions);
      }
    };
    GlobalScope = class extends Scope$1 {
      constructor() {
        super();
        this.parent = null;
        this.variables.set("undefined", new UndefinedVariable());
      }
      findVariable(name) {
        let variable = this.variables.get(name);
        if (!variable) {
          variable = new GlobalVariable(name);
          this.variables.set(name, variable);
        }
        return variable;
      }
    };
    FileEmitter = class {
      constructor(graph, options, baseFileEmitter) {
        this.graph = graph;
        this.options = options;
        this.facadeChunkByModule = null;
        this.nextIdBase = 1;
        this.output = null;
        this.outputFileEmitters = [];
        this.emitFile = (emittedFile) => {
          if (!hasValidType(emittedFile)) {
            return error(errorFailedValidation(`Emitted files must be of type "asset" or "chunk", received "${emittedFile && emittedFile.type}".`));
          }
          if (!hasValidName(emittedFile)) {
            return error(errorFailedValidation(`The "fileName" or "name" properties of emitted files must be strings that are neither absolute nor relative paths, received "${emittedFile.fileName || emittedFile.name}".`));
          }
          if (emittedFile.type === "chunk") {
            return this.emitChunk(emittedFile);
          }
          return this.emitAsset(emittedFile);
        };
        this.finaliseAssets = () => {
          for (const [referenceId, emittedFile] of this.filesByReferenceId) {
            if (emittedFile.type === "asset" && typeof emittedFile.fileName !== "string")
              return error(errorNoAssetSourceSet(emittedFile.name || referenceId));
          }
        };
        this.getFileName = (fileReferenceId) => {
          const emittedFile = this.filesByReferenceId.get(fileReferenceId);
          if (!emittedFile)
            return error(errorFileReferenceIdNotFoundForFilename(fileReferenceId));
          if (emittedFile.type === "chunk") {
            return getChunkFileName(emittedFile, this.facadeChunkByModule);
          }
          return getAssetFileName(emittedFile, fileReferenceId);
        };
        this.setAssetSource = (referenceId, requestedSource) => {
          const consumedFile = this.filesByReferenceId.get(referenceId);
          if (!consumedFile)
            return error(errorAssetReferenceIdNotFoundForSetSource(referenceId));
          if (consumedFile.type !== "asset") {
            return error(errorFailedValidation(`Asset sources can only be set for emitted assets but "${referenceId}" is an emitted chunk.`));
          }
          if (consumedFile.source !== void 0) {
            return error(errorAssetSourceAlreadySet(consumedFile.name || referenceId));
          }
          const source = getValidSource(requestedSource, consumedFile, referenceId);
          if (this.output) {
            this.finalizeAdditionalAsset(consumedFile, source, this.output);
          } else {
            consumedFile.source = source;
            for (const emitter of this.outputFileEmitters) {
              emitter.finalizeAdditionalAsset(consumedFile, source, emitter.output);
            }
          }
        };
        this.setChunkInformation = (facadeChunkByModule) => {
          this.facadeChunkByModule = facadeChunkByModule;
        };
        this.setOutputBundle = (bundle, outputOptions) => {
          const output = this.output = {
            bundle,
            fileNamesBySource: /* @__PURE__ */ new Map(),
            outputOptions
          };
          for (const emittedFile of this.filesByReferenceId.values()) {
            if (emittedFile.fileName) {
              reserveFileNameInBundle(emittedFile.fileName, output, this.options.onwarn);
            }
          }
          const consumedAssetsByHash = /* @__PURE__ */ new Map();
          for (const consumedFile of this.filesByReferenceId.values()) {
            if (consumedFile.type === "asset" && consumedFile.source !== void 0) {
              if (consumedFile.fileName) {
                this.finalizeAdditionalAsset(consumedFile, consumedFile.source, output);
              } else {
                const sourceHash = getSourceHash(consumedFile.source);
                getOrCreate(consumedAssetsByHash, sourceHash, () => []).push(consumedFile);
              }
            }
          }
          for (const [sourceHash, consumedFiles] of consumedAssetsByHash) {
            this.finalizeAssetsWithSameSource(consumedFiles, sourceHash, output);
          }
        };
        this.filesByReferenceId = baseFileEmitter ? new Map(baseFileEmitter.filesByReferenceId) : /* @__PURE__ */ new Map();
        baseFileEmitter == null ? void 0 : baseFileEmitter.addOutputFileEmitter(this);
      }
      addOutputFileEmitter(outputFileEmitter) {
        this.outputFileEmitters.push(outputFileEmitter);
      }
      assignReferenceId(file, idBase) {
        let referenceId = idBase;
        do {
          referenceId = createHash().update(referenceId).digest("hex").slice(0, 8);
        } while (this.filesByReferenceId.has(referenceId) || this.outputFileEmitters.some(({ filesByReferenceId }) => filesByReferenceId.has(referenceId)));
        file.referenceId = referenceId;
        this.filesByReferenceId.set(referenceId, file);
        for (const { filesByReferenceId } of this.outputFileEmitters) {
          filesByReferenceId.set(referenceId, file);
        }
        return referenceId;
      }
      emitAsset(emittedAsset) {
        const source = emittedAsset.source === void 0 ? void 0 : getValidSource(emittedAsset.source, emittedAsset, null);
        const consumedAsset = {
          fileName: emittedAsset.fileName,
          name: emittedAsset.name,
          needsCodeReference: !!emittedAsset.needsCodeReference,
          referenceId: "",
          source,
          type: "asset"
        };
        const referenceId = this.assignReferenceId(consumedAsset, emittedAsset.fileName || emittedAsset.name || String(this.nextIdBase++));
        if (this.output) {
          this.emitAssetWithReferenceId(consumedAsset, this.output);
        } else {
          for (const fileEmitter of this.outputFileEmitters) {
            fileEmitter.emitAssetWithReferenceId(consumedAsset, fileEmitter.output);
          }
        }
        return referenceId;
      }
      emitAssetWithReferenceId(consumedAsset, output) {
        const { fileName, source } = consumedAsset;
        if (fileName) {
          reserveFileNameInBundle(fileName, output, this.options.onwarn);
        }
        if (source !== void 0) {
          this.finalizeAdditionalAsset(consumedAsset, source, output);
        }
      }
      emitChunk(emittedChunk) {
        if (this.graph.phase > BuildPhase.LOAD_AND_PARSE) {
          return error(errorInvalidRollupPhaseForChunkEmission());
        }
        if (typeof emittedChunk.id !== "string") {
          return error(errorFailedValidation(`Emitted chunks need to have a valid string id, received "${emittedChunk.id}"`));
        }
        const consumedChunk = {
          fileName: emittedChunk.fileName,
          module: null,
          name: emittedChunk.name || emittedChunk.id,
          referenceId: "",
          type: "chunk"
        };
        this.graph.moduleLoader.emitChunk(emittedChunk).then((module) => consumedChunk.module = module).catch(() => {
        });
        return this.assignReferenceId(consumedChunk, emittedChunk.id);
      }
      finalizeAdditionalAsset(consumedFile, source, { bundle, fileNamesBySource, outputOptions }) {
        let { fileName, needsCodeReference, referenceId } = consumedFile;
        if (!fileName) {
          const sourceHash = getSourceHash(source);
          fileName = fileNamesBySource.get(sourceHash);
          if (!fileName) {
            fileName = generateAssetFileName(consumedFile.name, source, sourceHash, outputOptions, bundle);
            fileNamesBySource.set(sourceHash, fileName);
          }
        }
        const assetWithFileName = { ...consumedFile, fileName, source };
        this.filesByReferenceId.set(referenceId, assetWithFileName);
        const existingAsset = bundle[fileName];
        if ((existingAsset == null ? void 0 : existingAsset.type) === "asset") {
          existingAsset.needsCodeReference && (existingAsset.needsCodeReference = needsCodeReference);
        } else {
          bundle[fileName] = {
            fileName,
            name: consumedFile.name,
            needsCodeReference,
            source,
            type: "asset"
          };
        }
      }
      finalizeAssetsWithSameSource(consumedFiles, sourceHash, { bundle, fileNamesBySource, outputOptions }) {
        let fileName = "";
        let usedConsumedFile;
        let needsCodeReference = true;
        for (const consumedFile of consumedFiles) {
          needsCodeReference && (needsCodeReference = consumedFile.needsCodeReference);
          const assetFileName = generateAssetFileName(consumedFile.name, consumedFile.source, sourceHash, outputOptions, bundle);
          if (!fileName || assetFileName.length < fileName.length || assetFileName.length === fileName.length && assetFileName < fileName) {
            fileName = assetFileName;
            usedConsumedFile = consumedFile;
          }
        }
        fileNamesBySource.set(sourceHash, fileName);
        for (const consumedFile of consumedFiles) {
          const assetWithFileName = { ...consumedFile, fileName };
          this.filesByReferenceId.set(consumedFile.referenceId, assetWithFileName);
        }
        bundle[fileName] = {
          fileName,
          name: usedConsumedFile.name,
          needsCodeReference,
          source: usedConsumedFile.source,
          type: "asset"
        };
      }
    };
    inputHookNames = {
      buildEnd: 1,
      buildStart: 1,
      closeBundle: 1,
      closeWatcher: 1,
      load: 1,
      moduleParsed: 1,
      options: 1,
      resolveDynamicImport: 1,
      resolveId: 1,
      shouldTransformCachedModule: 1,
      transform: 1,
      watchChange: 1
    };
    inputHooks = Object.keys(inputHookNames);
    PluginDriver = class {
      constructor(graph, options, userPlugins, pluginCache, basePluginDriver) {
        this.graph = graph;
        this.options = options;
        this.pluginCache = pluginCache;
        this.sortedPlugins = /* @__PURE__ */ new Map();
        this.unfulfilledActions = /* @__PURE__ */ new Set();
        this.fileEmitter = new FileEmitter(graph, options, basePluginDriver && basePluginDriver.fileEmitter);
        this.emitFile = this.fileEmitter.emitFile.bind(this.fileEmitter);
        this.getFileName = this.fileEmitter.getFileName.bind(this.fileEmitter);
        this.finaliseAssets = this.fileEmitter.finaliseAssets.bind(this.fileEmitter);
        this.setChunkInformation = this.fileEmitter.setChunkInformation.bind(this.fileEmitter);
        this.setOutputBundle = this.fileEmitter.setOutputBundle.bind(this.fileEmitter);
        this.plugins = [...basePluginDriver ? basePluginDriver.plugins : [], ...userPlugins];
        const existingPluginNames = /* @__PURE__ */ new Set();
        this.pluginContexts = new Map(this.plugins.map((plugin) => [
          plugin,
          getPluginContext(plugin, pluginCache, graph, options, this.fileEmitter, existingPluginNames)
        ]));
        if (basePluginDriver) {
          for (const plugin of userPlugins) {
            for (const hook of inputHooks) {
              if (hook in plugin) {
                options.onwarn(errorInputHookInOutputPlugin(plugin.name, hook));
              }
            }
          }
        }
      }
      createOutputPluginDriver(plugins) {
        return new PluginDriver(this.graph, this.options, plugins, this.pluginCache, this);
      }
      getUnfulfilledHookActions() {
        return this.unfulfilledActions;
      }
      // chains, first non-null result stops and returns
      hookFirst(hookName, parameters, replaceContext, skipped) {
        return this.hookFirstAndGetPlugin(hookName, parameters, replaceContext, skipped).then((result) => result && result[0]);
      }
      // chains, first non-null result stops and returns result and last plugin
      async hookFirstAndGetPlugin(hookName, parameters, replaceContext, skipped) {
        for (const plugin of this.getSortedPlugins(hookName)) {
          if (skipped == null ? void 0 : skipped.has(plugin))
            continue;
          const result = await this.runHook(hookName, parameters, plugin, replaceContext);
          if (result != null)
            return [result, plugin];
        }
        return null;
      }
      // chains synchronously, first non-null result stops and returns
      hookFirstSync(hookName, parameters, replaceContext) {
        for (const plugin of this.getSortedPlugins(hookName)) {
          const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
          if (result != null)
            return result;
        }
        return null;
      }
      // parallel, ignores returns
      async hookParallel(hookName, parameters, replaceContext) {
        const parallelPromises = [];
        for (const plugin of this.getSortedPlugins(hookName)) {
          if (plugin[hookName].sequential) {
            await Promise.all(parallelPromises);
            parallelPromises.length = 0;
            await this.runHook(hookName, parameters, plugin, replaceContext);
          } else {
            parallelPromises.push(this.runHook(hookName, parameters, plugin, replaceContext));
          }
        }
        await Promise.all(parallelPromises);
      }
      // chains, reduces returned value, handling the reduced value as the first hook argument
      hookReduceArg0(hookName, [argument0, ...rest], reduce, replaceContext) {
        let promise = Promise.resolve(argument0);
        for (const plugin of this.getSortedPlugins(hookName)) {
          promise = promise.then((argument02) => this.runHook(hookName, [argument02, ...rest], plugin, replaceContext).then((result) => reduce.call(this.pluginContexts.get(plugin), argument02, result, plugin)));
        }
        return promise;
      }
      // chains synchronously, reduces returned value, handling the reduced value as the first hook argument
      hookReduceArg0Sync(hookName, [argument0, ...rest], reduce, replaceContext) {
        for (const plugin of this.getSortedPlugins(hookName)) {
          const parameters = [argument0, ...rest];
          const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
          argument0 = reduce.call(this.pluginContexts.get(plugin), argument0, result, plugin);
        }
        return argument0;
      }
      // chains, reduces returned value to type string, handling the reduced value separately. permits hooks as values.
      async hookReduceValue(hookName, initialValue, parameters, reducer) {
        const results = [];
        const parallelResults = [];
        for (const plugin of this.getSortedPlugins(hookName, validateAddonPluginHandler)) {
          if (plugin[hookName].sequential) {
            results.push(...await Promise.all(parallelResults));
            parallelResults.length = 0;
            results.push(await this.runHook(hookName, parameters, plugin));
          } else {
            parallelResults.push(this.runHook(hookName, parameters, plugin));
          }
        }
        results.push(...await Promise.all(parallelResults));
        return results.reduce(reducer, await initialValue);
      }
      // chains synchronously, reduces returned value to type T, handling the reduced value separately. permits hooks as values.
      hookReduceValueSync(hookName, initialValue, parameters, reduce, replaceContext) {
        let accumulator = initialValue;
        for (const plugin of this.getSortedPlugins(hookName)) {
          const result = this.runHookSync(hookName, parameters, plugin, replaceContext);
          accumulator = reduce.call(this.pluginContexts.get(plugin), accumulator, result, plugin);
        }
        return accumulator;
      }
      // chains, ignores returns
      hookSeq(hookName, parameters, replaceContext) {
        let promise = Promise.resolve();
        for (const plugin of this.getSortedPlugins(hookName)) {
          promise = promise.then(() => this.runHook(hookName, parameters, plugin, replaceContext));
        }
        return promise.then(noReturn);
      }
      getSortedPlugins(hookName, validateHandler) {
        return getOrCreate(this.sortedPlugins, hookName, () => getSortedValidatedPlugins(hookName, this.plugins, validateHandler));
      }
      // Implementation signature
      runHook(hookName, parameters, plugin, replaceContext) {
        const hook = plugin[hookName];
        const handler = typeof hook === "object" ? hook.handler : hook;
        let context = this.pluginContexts.get(plugin);
        if (replaceContext) {
          context = replaceContext(context, plugin);
        }
        let action = null;
        return Promise.resolve().then(() => {
          if (typeof handler !== "function") {
            return handler;
          }
          const hookResult = handler.apply(context, parameters);
          if (!(hookResult == null ? void 0 : hookResult.then)) {
            return hookResult;
          }
          action = [plugin.name, hookName, parameters];
          this.unfulfilledActions.add(action);
          return Promise.resolve(hookResult).then((result) => {
            this.unfulfilledActions.delete(action);
            return result;
          });
        }).catch((error_) => {
          if (action !== null) {
            this.unfulfilledActions.delete(action);
          }
          return error(errorPluginError(error_, plugin.name, { hook: hookName }));
        });
      }
      /**
       * Run a sync plugin hook and return the result.
       * @param hookName Name of the plugin hook. Must be in `PluginHooks`.
       * @param args Arguments passed to the plugin hook.
       * @param plugin The acutal plugin
       * @param replaceContext When passed, the plugin context can be overridden.
       */
      runHookSync(hookName, parameters, plugin, replaceContext) {
        const hook = plugin[hookName];
        const handler = typeof hook === "object" ? hook.handler : hook;
        let context = this.pluginContexts.get(plugin);
        if (replaceContext) {
          context = replaceContext(context, plugin);
        }
        try {
          return handler.apply(context, parameters);
        } catch (error_) {
          return error(errorPluginError(error_, plugin.name, { hook: hookName }));
        }
      }
    };
    Queue = class {
      constructor(maxParallel) {
        this.maxParallel = maxParallel;
        this.queue = [];
        this.workerCount = 0;
      }
      run(task) {
        return new Promise((resolve2, reject) => {
          this.queue.push({ reject, resolve: resolve2, task });
          this.work();
        });
      }
      async work() {
        if (this.workerCount >= this.maxParallel)
          return;
        this.workerCount++;
        let entry;
        while (entry = this.queue.shift()) {
          const { reject, resolve: resolve2, task } = entry;
          try {
            const result = await task();
            resolve2(result);
          } catch (error2) {
            reject(error2);
          }
        }
        this.workerCount--;
      }
    };
    Graph = class {
      constructor(options, watcher) {
        var _a, _b;
        this.options = options;
        this.astLru = flru(5);
        this.cachedModules = /* @__PURE__ */ new Map();
        this.deoptimizationTracker = new PathTracker();
        this.entryModules = [];
        this.modulesById = /* @__PURE__ */ new Map();
        this.needsTreeshakingPass = false;
        this.phase = BuildPhase.LOAD_AND_PARSE;
        this.scope = new GlobalScope();
        this.watchFiles = /* @__PURE__ */ Object.create(null);
        this.watchMode = false;
        this.externalModules = [];
        this.implicitEntryModules = [];
        this.modules = [];
        this.getModuleInfo = (moduleId) => {
          const foundModule = this.modulesById.get(moduleId);
          if (!foundModule)
            return null;
          return foundModule.info;
        };
        if (options.cache !== false) {
          if ((_a = options.cache) == null ? void 0 : _a.modules) {
            for (const module of options.cache.modules)
              this.cachedModules.set(module.id, module);
          }
          this.pluginCache = ((_b = options.cache) == null ? void 0 : _b.plugins) || /* @__PURE__ */ Object.create(null);
          for (const name in this.pluginCache) {
            const cache = this.pluginCache[name];
            for (const value of Object.values(cache))
              value[0]++;
          }
        }
        if (watcher) {
          this.watchMode = true;
          const handleChange = (...parameters) => this.pluginDriver.hookParallel("watchChange", parameters);
          const handleClose = () => this.pluginDriver.hookParallel("closeWatcher", []);
          watcher.onCurrentRun("change", handleChange);
          watcher.onCurrentRun("close", handleClose);
        }
        this.pluginDriver = new PluginDriver(this, options, options.plugins, this.pluginCache);
        this.acornParser = Parser.extend(...options.acornInjectPlugins);
        this.moduleLoader = new ModuleLoader(this, this.modulesById, this.options, this.pluginDriver);
        this.fileOperationQueue = new Queue(options.maxParallelFileOps);
        this.pureFunctions = getPureFunctions(options);
      }
      async build() {
        timeStart("generate module graph", 2);
        await this.generateModuleGraph();
        timeEnd("generate module graph", 2);
        timeStart("sort and bind modules", 2);
        this.phase = BuildPhase.ANALYSE;
        this.sortModules();
        timeEnd("sort and bind modules", 2);
        timeStart("mark included statements", 2);
        this.includeStatements();
        timeEnd("mark included statements", 2);
        this.phase = BuildPhase.GENERATE;
      }
      contextParse(code, options = {}) {
        const onCommentOrig = options.onComment;
        const comments = [];
        options.onComment = onCommentOrig && typeof onCommentOrig == "function" ? (block, text, start, end, ...parameters) => {
          comments.push({ end, start, type: block ? "Block" : "Line", value: text });
          return onCommentOrig.call(options, block, text, start, end, ...parameters);
        } : comments;
        const ast = this.acornParser.parse(code, {
          ...this.options.acorn,
          ...options
        });
        if (typeof onCommentOrig == "object") {
          onCommentOrig.push(...comments);
        }
        options.onComment = onCommentOrig;
        addAnnotations(comments, ast, code);
        return ast;
      }
      getCache() {
        for (const name in this.pluginCache) {
          const cache = this.pluginCache[name];
          let allDeleted = true;
          for (const [key, value] of Object.entries(cache)) {
            if (value[0] >= this.options.experimentalCacheExpiry)
              delete cache[key];
            else
              allDeleted = false;
          }
          if (allDeleted)
            delete this.pluginCache[name];
        }
        return {
          modules: this.modules.map((module) => module.toJSON()),
          plugins: this.pluginCache
        };
      }
      async generateModuleGraph() {
        ({ entryModules: this.entryModules, implicitEntryModules: this.implicitEntryModules } = await this.moduleLoader.addEntryModules(normalizeEntryModules(this.options.input), true));
        if (this.entryModules.length === 0) {
          throw new Error("You must supply options.input to rollup");
        }
        for (const module of this.modulesById.values()) {
          if (module instanceof Module) {
            this.modules.push(module);
          } else {
            this.externalModules.push(module);
          }
        }
      }
      includeStatements() {
        const entryModules = [...this.entryModules, ...this.implicitEntryModules];
        for (const module of entryModules) {
          markModuleAndImpureDependenciesAsExecuted(module);
        }
        if (this.options.treeshake) {
          let treeshakingPass = 1;
          do {
            timeStart(`treeshaking pass ${treeshakingPass}`, 3);
            this.needsTreeshakingPass = false;
            for (const module of this.modules) {
              if (module.isExecuted) {
                if (module.info.moduleSideEffects === "no-treeshake") {
                  module.includeAllInBundle();
                } else {
                  module.include();
                }
              }
            }
            if (treeshakingPass === 1) {
              for (const module of entryModules) {
                if (module.preserveSignature !== false) {
                  module.includeAllExports(false);
                  this.needsTreeshakingPass = true;
                }
              }
            }
            timeEnd(`treeshaking pass ${treeshakingPass++}`, 3);
          } while (this.needsTreeshakingPass);
        } else {
          for (const module of this.modules)
            module.includeAllInBundle();
        }
        for (const externalModule of this.externalModules)
          externalModule.warnUnusedImports();
        for (const module of this.implicitEntryModules) {
          for (const dependant of module.implicitlyLoadedAfter) {
            if (!(dependant.info.isEntry || dependant.isIncluded())) {
              error(errorImplicitDependantIsNotIncluded(dependant));
            }
          }
        }
      }
      sortModules() {
        const { orderedModules, cyclePaths } = analyseModuleExecution(this.entryModules);
        for (const cyclePath of cyclePaths) {
          this.options.onwarn(errorCircularDependency(cyclePath));
        }
        this.modules = orderedModules;
        for (const module of this.modules) {
          module.bindReferences();
        }
        this.warnForMissingExports();
      }
      warnForMissingExports() {
        for (const module of this.modules) {
          for (const importDescription of module.importDescriptions.values()) {
            if (importDescription.name !== "*" && !importDescription.module.getVariableForExportName(importDescription.name)[0]) {
              module.warn(errorMissingExport(importDescription.name, module.id, importDescription.module.id), importDescription.start);
            }
          }
        }
      }
    };
    beforeExitEvent = "beforeExit";
    beforeExitEmitter = new import_node_events.EventEmitter();
    beforeExitEmitter.setMaxListeners(0);
    import_node_process.default.on(beforeExitEvent, () => beforeExitEmitter.emit(beforeExitEvent));
    leftCurlyBrace = "{".charCodeAt(0);
    space = " ".charCodeAt(0);
    keyword = "assert";
    FUNC_STATEMENT = 1;
    FUNC_NULLABLE_ID = 4;
    defaultOnWarn = (warning) => console.warn(warning.message || warning);
    treeshakePresets = {
      recommended: {
        annotations: true,
        correctVarValueBeforeDeclaration: false,
        manualPureFunctions: EMPTY_ARRAY,
        moduleSideEffects: () => true,
        propertyReadSideEffects: true,
        tryCatchDeoptimization: true,
        unknownGlobalSideEffects: false
      },
      safest: {
        annotations: true,
        correctVarValueBeforeDeclaration: true,
        manualPureFunctions: EMPTY_ARRAY,
        moduleSideEffects: () => true,
        propertyReadSideEffects: true,
        tryCatchDeoptimization: true,
        unknownGlobalSideEffects: true
      },
      smallest: {
        annotations: true,
        correctVarValueBeforeDeclaration: false,
        manualPureFunctions: EMPTY_ARRAY,
        moduleSideEffects: () => false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
        unknownGlobalSideEffects: false
      }
    };
    generatedCodePresets = {
      es2015: {
        arrowFunctions: true,
        constBindings: true,
        objectShorthand: true,
        reservedNamesAsProps: true,
        symbols: true
      },
      es5: {
        arrowFunctions: false,
        constBindings: false,
        objectShorthand: false,
        reservedNamesAsProps: true,
        symbols: false
      }
    };
    objectifyOption = (value) => value && typeof value === "object" ? value : {};
    objectifyOptionWithPresets = (presets, optionName, urlSnippet, additionalValues) => (value) => {
      if (typeof value === "string") {
        const preset = presets[value];
        if (preset) {
          return preset;
        }
        error(errorInvalidOption(optionName, urlSnippet, `valid values are ${additionalValues}${printQuotedStringList(Object.keys(presets))}. You can also supply an object for more fine-grained control`, value));
      }
      return objectifyOption(value);
    };
    getOptionWithPreset = (value, presets, optionName, urlSnippet, additionalValues) => {
      const presetName = value == null ? void 0 : value.preset;
      if (presetName) {
        const preset = presets[presetName];
        if (preset) {
          return { ...preset, ...value };
        } else {
          error(errorInvalidOption(`${optionName}.preset`, urlSnippet, `valid values are ${printQuotedStringList(Object.keys(presets))}`, presetName));
        }
      }
      return objectifyOptionWithPresets(presets, optionName, urlSnippet, additionalValues)(value);
    };
    normalizePluginOption = async (plugins) => (await asyncFlatten([plugins])).filter(Boolean);
    getOnwarn = (config) => {
      const { onwarn } = config;
      return onwarn ? (warning) => {
        warning.toString = () => {
          let warningString = "";
          if (warning.plugin)
            warningString += `(${warning.plugin} plugin) `;
          if (warning.loc)
            warningString += `${relativeId(warning.loc.file)} (${warning.loc.line}:${warning.loc.column}) `;
          warningString += warning.message;
          return warningString;
        };
        onwarn(warning, defaultOnWarn);
      } : defaultOnWarn;
    };
    getAcorn = (config) => ({
      ecmaVersion: "latest",
      sourceType: "module",
      ...config.acorn
    });
    getAcornInjectPlugins = (config) => [
      importAssertions,
      ...ensureArray(config.acornInjectPlugins)
    ];
    getCache = (config) => {
      var _a;
      return config.cache === true ? void 0 : ((_a = config.cache) == null ? void 0 : _a.cache) || config.cache;
    };
    getIdMatcher = (option) => {
      if (option === true) {
        return () => true;
      }
      if (typeof option === "function") {
        return (id, ...parameters) => !id.startsWith("\0") && option(id, ...parameters) || false;
      }
      if (option) {
        const ids = /* @__PURE__ */ new Set();
        const matchers = [];
        for (const value of ensureArray(option)) {
          if (value instanceof RegExp) {
            matchers.push(value);
          } else {
            ids.add(value);
          }
        }
        return (id, ..._arguments) => ids.has(id) || matchers.some((matcher) => matcher.test(id));
      }
      return () => false;
    };
    getInlineDynamicImports$1 = (config, warn, strictDeprecations) => {
      const configInlineDynamicImports = config.inlineDynamicImports;
      if (configInlineDynamicImports) {
        warnDeprecationWithOptions('The "inlineDynamicImports" option is deprecated. Use the "output.inlineDynamicImports" option instead.', URL_OUTPUT_INLINEDYNAMICIMPORTS, true, warn, strictDeprecations);
      }
      return configInlineDynamicImports;
    };
    getInput = (config) => {
      const configInput = config.input;
      return configInput == null ? [] : typeof configInput === "string" ? [configInput] : configInput;
    };
    getManualChunks$1 = (config, warn, strictDeprecations) => {
      const configManualChunks = config.manualChunks;
      if (configManualChunks) {
        warnDeprecationWithOptions('The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.', URL_OUTPUT_MANUALCHUNKS, true, warn, strictDeprecations);
      }
      return configManualChunks;
    };
    getmaxParallelFileOps = (config, warn, strictDeprecations) => {
      const maxParallelFileReads = config.maxParallelFileReads;
      if (typeof maxParallelFileReads === "number") {
        warnDeprecationWithOptions('The "maxParallelFileReads" option is deprecated. Use the "maxParallelFileOps" option instead.', URL_MAXPARALLELFILEOPS, true, warn, strictDeprecations);
      }
      const maxParallelFileOps = config.maxParallelFileOps ?? maxParallelFileReads;
      if (typeof maxParallelFileOps === "number") {
        if (maxParallelFileOps <= 0)
          return Infinity;
        return maxParallelFileOps;
      }
      return 20;
    };
    getModuleContext = (config, context) => {
      const configModuleContext = config.moduleContext;
      if (typeof configModuleContext === "function") {
        return (id) => configModuleContext(id) ?? context;
      }
      if (configModuleContext) {
        const contextByModuleId = /* @__PURE__ */ Object.create(null);
        for (const [key, moduleContext] of Object.entries(configModuleContext)) {
          contextByModuleId[(0, import_node_path.resolve)(key)] = moduleContext;
        }
        return (id) => contextByModuleId[id] ?? context;
      }
      return () => context;
    };
    getPreserveModules$1 = (config, warn, strictDeprecations) => {
      const configPreserveModules = config.preserveModules;
      if (configPreserveModules) {
        warnDeprecationWithOptions('The "preserveModules" option is deprecated. Use the "output.preserveModules" option instead.', URL_OUTPUT_PRESERVEMODULES, true, warn, strictDeprecations);
      }
      return configPreserveModules;
    };
    getTreeshake = (config) => {
      const configTreeshake = config.treeshake;
      if (configTreeshake === false) {
        return false;
      }
      const configWithPreset = getOptionWithPreset(config.treeshake, treeshakePresets, "treeshake", URL_TREESHAKE, "false, true, ");
      return {
        annotations: configWithPreset.annotations !== false,
        correctVarValueBeforeDeclaration: configWithPreset.correctVarValueBeforeDeclaration === true,
        manualPureFunctions: configWithPreset.manualPureFunctions ?? EMPTY_ARRAY,
        moduleSideEffects: getHasModuleSideEffects(configWithPreset.moduleSideEffects),
        propertyReadSideEffects: configWithPreset.propertyReadSideEffects === "always" ? "always" : configWithPreset.propertyReadSideEffects !== false,
        tryCatchDeoptimization: configWithPreset.tryCatchDeoptimization !== false,
        unknownGlobalSideEffects: configWithPreset.unknownGlobalSideEffects !== false
      };
    };
    getHasModuleSideEffects = (moduleSideEffectsOption) => {
      if (typeof moduleSideEffectsOption === "boolean") {
        return () => moduleSideEffectsOption;
      }
      if (moduleSideEffectsOption === "no-external") {
        return (_id, external) => !external;
      }
      if (typeof moduleSideEffectsOption === "function") {
        return (id, external) => id.startsWith("\0") ? true : moduleSideEffectsOption(id, external) !== false;
      }
      if (Array.isArray(moduleSideEffectsOption)) {
        const ids = new Set(moduleSideEffectsOption);
        return (id) => ids.has(id);
      }
      if (moduleSideEffectsOption) {
        error(errorInvalidOption("treeshake.moduleSideEffects", URL_TREESHAKE_MODULESIDEEFFECTS, 'please use one of false, "no-external", a function or an array'));
      }
      return () => true;
    };
    INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
    DRIVE_LETTER_REGEX = /^[a-z]:/i;
    getFile = (config, preserveModules, inputOptions) => {
      const { file } = config;
      if (typeof file === "string") {
        if (preserveModules) {
          return error(errorInvalidOption("output.file", URL_OUTPUT_DIR, 'you must set "output.dir" instead of "output.file" when using the "output.preserveModules" option'));
        }
        if (!Array.isArray(inputOptions.input))
          return error(errorInvalidOption("output.file", URL_OUTPUT_DIR, 'you must set "output.dir" instead of "output.file" when providing named inputs'));
      }
      return file;
    };
    getFormat = (config) => {
      const configFormat = config.format;
      switch (configFormat) {
        case void 0:
        case "es":
        case "esm":
        case "module": {
          return "es";
        }
        case "cjs":
        case "commonjs": {
          return "cjs";
        }
        case "system":
        case "systemjs": {
          return "system";
        }
        case "amd":
        case "iife":
        case "umd": {
          return configFormat;
        }
        default: {
          return error(errorInvalidOption("output.format", URL_OUTPUT_FORMAT, `Valid values are "amd", "cjs", "system", "es", "iife" or "umd"`, configFormat));
        }
      }
    };
    getInlineDynamicImports = (config, inputOptions) => {
      const inlineDynamicImports = (config.inlineDynamicImports ?? inputOptions.inlineDynamicImports) || false;
      const { input } = inputOptions;
      if (inlineDynamicImports && (Array.isArray(input) ? input : Object.keys(input)).length > 1) {
        return error(errorInvalidOption("output.inlineDynamicImports", URL_OUTPUT_INLINEDYNAMICIMPORTS, 'multiple inputs are not supported when "output.inlineDynamicImports" is true'));
      }
      return inlineDynamicImports;
    };
    getPreserveModules = (config, inlineDynamicImports, inputOptions) => {
      const preserveModules = (config.preserveModules ?? inputOptions.preserveModules) || false;
      if (preserveModules) {
        if (inlineDynamicImports) {
          return error(errorInvalidOption("output.inlineDynamicImports", URL_OUTPUT_INLINEDYNAMICIMPORTS, `this option is not supported for "output.preserveModules"`));
        }
        if (inputOptions.preserveEntrySignatures === false) {
          return error(errorInvalidOption("preserveEntrySignatures", URL_PRESERVEENTRYSIGNATURES, 'setting this option to false is not supported for "output.preserveModules"'));
        }
      }
      return preserveModules;
    };
    getPreferConst = (config, inputOptions) => {
      const configPreferConst = config.preferConst;
      if (configPreferConst != null) {
        warnDeprecation(`The "output.preferConst" option is deprecated. Use the "output.generatedCode.constBindings" option instead.`, URL_OUTPUT_GENERATEDCODE_CONSTBINDINGS, true, inputOptions);
      }
      return !!configPreferConst;
    };
    getPreserveModulesRoot = (config) => {
      const { preserveModulesRoot } = config;
      if (preserveModulesRoot === null || preserveModulesRoot === void 0) {
        return void 0;
      }
      return (0, import_node_path.resolve)(preserveModulesRoot);
    };
    getAmd = (config) => {
      const mergedOption = {
        autoId: false,
        basePath: "",
        define: "define",
        forceJsExtensionForImports: false,
        ...config.amd
      };
      if ((mergedOption.autoId || mergedOption.basePath) && mergedOption.id) {
        return error(errorInvalidOption("output.amd.id", URL_OUTPUT_AMD_ID, 'this option cannot be used together with "output.amd.autoId"/"output.amd.basePath"'));
      }
      if (mergedOption.basePath && !mergedOption.autoId) {
        return error(errorInvalidOption("output.amd.basePath", URL_OUTPUT_AMD_BASEPATH, 'this option only works with "output.amd.autoId"'));
      }
      return mergedOption.autoId ? {
        autoId: true,
        basePath: mergedOption.basePath,
        define: mergedOption.define,
        forceJsExtensionForImports: mergedOption.forceJsExtensionForImports
      } : {
        autoId: false,
        define: mergedOption.define,
        forceJsExtensionForImports: mergedOption.forceJsExtensionForImports,
        id: mergedOption.id
      };
    };
    getAddon = (config, name) => {
      const configAddon = config[name];
      if (typeof configAddon === "function") {
        return configAddon;
      }
      return () => configAddon || "";
    };
    getDir = (config, file) => {
      const { dir } = config;
      if (typeof dir === "string" && typeof file === "string") {
        return error(errorInvalidOption("output.dir", URL_OUTPUT_DIR, 'you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks'));
      }
      return dir;
    };
    getDynamicImportFunction = (config, inputOptions, format) => {
      const configDynamicImportFunction = config.dynamicImportFunction;
      if (configDynamicImportFunction) {
        warnDeprecation(`The "output.dynamicImportFunction" option is deprecated. Use the "renderDynamicImport" plugin hook instead.`, URL_RENDERDYNAMICIMPORT, true, inputOptions);
        if (format !== "es") {
          inputOptions.onwarn(errorInvalidOption("output.dynamicImportFunction", URL_OUTPUT_DYNAMICIMPORTFUNCTION, 'this option is ignored for formats other than "es"'));
        }
      }
      return configDynamicImportFunction;
    };
    getEntryFileNames = (config, unsetOptions) => {
      const configEntryFileNames = config.entryFileNames;
      if (configEntryFileNames == null) {
        unsetOptions.add("entryFileNames");
      }
      return configEntryFileNames ?? "[name].js";
    };
    getGeneratedCode = (config, preferConst) => {
      const configWithPreset = getOptionWithPreset(config.generatedCode, generatedCodePresets, "output.generatedCode", URL_OUTPUT_GENERATEDCODE, "");
      return {
        arrowFunctions: configWithPreset.arrowFunctions === true,
        constBindings: configWithPreset.constBindings === true || preferConst,
        objectShorthand: configWithPreset.objectShorthand === true,
        reservedNamesAsProps: configWithPreset.reservedNamesAsProps !== false,
        symbols: configWithPreset.symbols === true
      };
    };
    getIndent = (config, compact) => {
      if (compact) {
        return "";
      }
      const configIndent = config.indent;
      return configIndent === false ? "" : configIndent ?? true;
    };
    ALLOWED_INTEROP_TYPES = /* @__PURE__ */ new Set([
      "compat",
      "auto",
      "esModule",
      "default",
      "defaultOnly"
    ]);
    getInterop = (config) => {
      const configInterop = config.interop;
      if (typeof configInterop === "function") {
        const interopPerId = /* @__PURE__ */ Object.create(null);
        let defaultInterop = null;
        return (id) => id === null ? defaultInterop || validateInterop(defaultInterop = configInterop(id)) : id in interopPerId ? interopPerId[id] : validateInterop(interopPerId[id] = configInterop(id));
      }
      return configInterop === void 0 ? () => "default" : () => validateInterop(configInterop);
    };
    validateInterop = (interop) => {
      if (!ALLOWED_INTEROP_TYPES.has(interop)) {
        return error(errorInvalidOption(
          "output.interop",
          URL_OUTPUT_INTEROP,
          // eslint-disable-next-line unicorn/prefer-spread
          `use one of ${Array.from(ALLOWED_INTEROP_TYPES, (value) => JSON.stringify(value)).join(", ")}`,
          interop
        ));
      }
      return interop;
    };
    getManualChunks = (config, inlineDynamicImports, preserveModules, inputOptions) => {
      const configManualChunks = config.manualChunks || inputOptions.manualChunks;
      if (configManualChunks) {
        if (inlineDynamicImports) {
          return error(errorInvalidOption("output.manualChunks", URL_OUTPUT_MANUALCHUNKS, 'this option is not supported for "output.inlineDynamicImports"'));
        }
        if (preserveModules) {
          return error(errorInvalidOption("output.manualChunks", URL_OUTPUT_MANUALCHUNKS, 'this option is not supported for "output.preserveModules"'));
        }
      }
      return configManualChunks || {};
    };
    getMinifyInternalExports = (config, format, compact) => config.minifyInternalExports ?? (compact || format === "es" || format === "system");
    getNamespaceToStringTag = (config, generatedCode, inputOptions) => {
      const configNamespaceToStringTag = config.namespaceToStringTag;
      if (configNamespaceToStringTag != null) {
        warnDeprecation(`The "output.namespaceToStringTag" option is deprecated. Use the "output.generatedCode.symbols" option instead.`, URL_OUTPUT_GENERATEDCODE_SYMBOLS, true, inputOptions);
        return configNamespaceToStringTag;
      }
      return generatedCode.symbols || false;
    };
    getSourcemapBaseUrl = (config) => {
      const { sourcemapBaseUrl } = config;
      if (sourcemapBaseUrl) {
        if (isValidUrl(sourcemapBaseUrl)) {
          return sourcemapBaseUrl;
        }
        return error(errorInvalidOption("output.sourcemapBaseUrl", URL_OUTPUT_SOURCEMAPBASEURL, `must be a valid URL, received ${JSON.stringify(sourcemapBaseUrl)}`));
      }
    };
    (function(SortingFileType2) {
      SortingFileType2[SortingFileType2["ENTRY_CHUNK"] = 0] = "ENTRY_CHUNK";
      SortingFileType2[SortingFileType2["SECONDARY_CHUNK"] = 1] = "SECONDARY_CHUNK";
      SortingFileType2[SortingFileType2["ASSET"] = 2] = "ASSET";
    })(SortingFileType || (SortingFileType = {}));
    ({
      env = {},
      argv = [],
      platform = ""
    } = typeof process === "undefined" ? {} : process);
    isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
    isForced = "FORCE_COLOR" in env || argv.includes("--color");
    isWindows = platform === "win32";
    isDumbTerminal = env.TERM === "dumb";
    isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
    isCI = "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);
    isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
    replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
    clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
    filterEmpty = (open, close, replace = open, at2 = open.length + 1) => (string) => string || !(string === "" || string === void 0) ? clearBleed(
      ("" + string).indexOf(close, at2),
      string,
      open,
      close,
      replace
    ) : "";
    init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
    colors = {
      reset: init(0, 0),
      bold: init(1, 22, "\x1B[22m\x1B[1m"),
      dim: init(2, 22, "\x1B[22m\x1B[2m"),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49),
      blackBright: init(90, 39),
      redBright: init(91, 39),
      greenBright: init(92, 39),
      yellowBright: init(93, 39),
      blueBright: init(94, 39),
      magentaBright: init(95, 39),
      cyanBright: init(96, 39),
      whiteBright: init(97, 39),
      bgBlackBright: init(100, 49),
      bgRedBright: init(101, 49),
      bgGreenBright: init(102, 49),
      bgYellowBright: init(103, 49),
      bgBlueBright: init(104, 49),
      bgMagentaBright: init(105, 49),
      bgCyanBright: init(106, 49),
      bgWhiteBright: init(107, 49)
    };
    createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce(
      (colors2, key) => ({ ...colors2, [key]: String }),
      {}
    );
    createColors();
    ({ bold, cyan, dim, gray, green, red, underline, yellow } = createColors({
      useColor: import_node_process.env.FORCE_COLOR !== "0" && !import_node_process.env.NO_COLOR
    }));
    stderr = (...parameters) => import_node_process.default.stderr.write(`${parameters.join("")}
`);
    commandAliases = {
      c: "config",
      d: "dir",
      e: "external",
      f: "format",
      g: "globals",
      h: "help",
      i: "input",
      m: "sourcemap",
      n: "name",
      o: "file",
      p: "plugin",
      v: "version",
      w: "watch"
    };
    EMPTY_COMMAND_OPTIONS = { external: [], globals: void 0 };
    getExternal = (config, overrides) => {
      const configExternal = config.external;
      return typeof configExternal === "function" ? (source, importer, isResolved) => configExternal(source, importer, isResolved) || overrides.external.includes(source) : [...ensureArray(configExternal), ...overrides.external];
    };
    getOnWarn = (config, defaultOnWarnHandler) => config.onwarn ? (warning) => config.onwarn(warning, defaultOnWarnHandler) : defaultOnWarnHandler;
    getObjectOption = (config, overrides, name, objectifyValue = objectifyOption) => {
      const commandOption = normalizeObjectOptionValue(overrides[name], objectifyValue);
      const configOption = normalizeObjectOptionValue(config[name], objectifyValue);
      if (commandOption !== void 0) {
        return commandOption && { ...configOption, ...commandOption };
      }
      return configOption;
    };
    getWatch = (config, overrides) => config.watch !== false && getObjectOption(config, overrides, "watch");
    normalizeObjectOptionValue = (optionValue, objectifyValue) => {
      if (!optionValue) {
        return optionValue;
      }
      if (Array.isArray(optionValue)) {
        return optionValue.reduce((result, value) => value && result && { ...result, ...objectifyValue(value) }, {});
      }
      return objectifyValue(optionValue);
    };
    WatchEmitter = class {
      constructor() {
        this.currentHandlers = /* @__PURE__ */ Object.create(null);
        this.persistentHandlers = /* @__PURE__ */ Object.create(null);
      }
      // Will be overwritten by Rollup
      async close() {
      }
      emit(event, ...parameters) {
        return Promise.all([...this.getCurrentHandlers(event), ...this.getPersistentHandlers(event)].map((handler) => handler(...parameters)));
      }
      off(event, listener) {
        const listeners = this.persistentHandlers[event];
        if (listeners) {
          listeners.splice(listeners.indexOf(listener) >>> 0, 1);
        }
        return this;
      }
      on(event, listener) {
        this.getPersistentHandlers(event).push(listener);
        return this;
      }
      onCurrentRun(event, listener) {
        this.getCurrentHandlers(event).push(listener);
        return this;
      }
      once(event, listener) {
        const selfRemovingListener = (...parameters) => {
          this.off(event, selfRemovingListener);
          return listener(...parameters);
        };
        this.on(event, selfRemovingListener);
        return this;
      }
      removeAllListeners() {
        this.removeListenersForCurrentRun();
        this.persistentHandlers = /* @__PURE__ */ Object.create(null);
        return this;
      }
      removeListenersForCurrentRun() {
        this.currentHandlers = /* @__PURE__ */ Object.create(null);
        return this;
      }
      getCurrentHandlers(event) {
        return this.currentHandlers[event] || (this.currentHandlers[event] = []);
      }
      getPersistentHandlers(event) {
        return this.persistentHandlers[event] || (this.persistentHandlers[event] = []);
      }
    };
    fseventsImporter = Object.defineProperty({
      __proto__: null,
      getFsEvents,
      loadFsEvents
    }, Symbol.toStringTag, { value: "Module" });
  }
});

export {
  version$1,
  getAugmentedNamespace,
  picomatchExports,
  createFilter,
  rollup,
  rollupInternal,
  defineConfig,
  fseventsImporter,
  watch,
  init_node_entry
};
/*! Bundled license information:

rollup/dist/es/shared/node-entry.js:
  (*
    @license
  	Rollup.js v3.21.0
  	Sun, 23 Apr 2023 19:43:51 GMT - commit b79b73cd8bb98c10ab7eedae154bb5c1e03ced7d
  
  	https://github.com/rollup/rollup
  
  	Released under the MIT License.
  *)
*/
//# sourceMappingURL=chunk-7FSMLWXK.js.map
