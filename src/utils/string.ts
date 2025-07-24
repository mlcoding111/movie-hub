/**
 * Converts a string to snake case
 * @param str - The string to convert
 * @returns The snake case string
 */
export function toSnakeCase(input: string): string {
  if(!input) {
    return ''
  }
    return input
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')      // Handle camelCase or PascalCase
      .replace(/[\s\-]+/g, '_')                    // Replace spaces or dashes with underscore
      .toLowerCase();
  }
    
/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns The title case string
 */
export function toTitleCase(str: string) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}