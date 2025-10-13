export function ok<T>(data: T) {
  return { data };
}

export function created<T>(data: T) {
  return { data };
}

export function error(code: string, message: string, details?: unknown) {
  return { error: { code, message, details } };
}
