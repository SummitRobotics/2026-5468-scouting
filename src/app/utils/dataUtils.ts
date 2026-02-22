export function coerceDataTypes(formValues: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => {
      if (typeof value !== 'string') return [key, value];

      // Boolean
      if (value === 'true') return [key, true];
      if (value === 'false') return [key, false];

      // Number (guards against empty strings becoming 0)
      if (value.trim() !== '' && !isNaN(Number(value))) return [key, Number(value)];
      return [key, value];
    })
  );
}
