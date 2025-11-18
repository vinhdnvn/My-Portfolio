// Re-export all utilities
export * from './api';
export * from './format';
export * from './storage';
export * from './date';
export * from './constants';

// Explicit exports to avoid naming conflicts
export {
  // String utilities
  cn,
  capitalize,
  toTitleCase,
  truncate,
  toSlug,
  isEmpty as isStringEmpty,
  isValidEmail as isEmailValid,
  isValidUrl as isUrlValid,
  stripHtml,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  padString,
  countWords,
  countCharacters,
  generateRandomString,
} from './string';

export {
  // Validation utilities
  validateProfile,
  validateProject,
  validateExperience,
  validatePost,
  validateAchievement,
  validateSiteSettings,
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isValidPassword,
  isValidSlug,
  hasErrors,
  getFirstError,
  getFieldError,
  sanitizeHtml,
  sanitizeInput,
  sanitizeSlug,
  validateFile,
  validateArray,
  validateNumber,
} from './validation';

export {
  // Array utilities
  removeDuplicates,
  groupBy,
  sortBy,
  chunk,
  flatten,
  isEmpty as isArrayEmpty,
  getRandom,
  first,
  last,
  remove,
  removeAt,
  insertAt,
  move,
  find,
  findIndex,
  filter,
  map,
  reduce,
  every,
  some,
  unique,
  join,
  intersection,
  difference,
  union,
  shuffle,
  take,
  takeRight,
  drop,
  dropRight,
  range,
  partition,
} from './array';

export {
  // Object utilities
  deepClone,
  deepMerge,
  isEmpty as isObjectEmpty,
  keys,
  values,
  entries,
  pick,
  omit,
  hasKey,
  getNestedProperty,
  setNestedProperty,
  compareObjects,
  freeze,
  fromEntries,
  toQueryString,
  fromQueryString,
  isEqual,
  size,
  transform,
  filterObject,
  mapObject,
} from './object';