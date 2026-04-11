/**
 * When villa pages are mounted under the marketing host (e.g. /sites/silyan),
 * internal links must include `pathPrefix`. Empty string for subdomain deployments.
 */
export function villaPath(pathPrefix: string, pathStartingWithSlash: string): string {
  if (!pathPrefix) return pathStartingWithSlash;
  return `${pathPrefix}${pathStartingWithSlash}`;
}
