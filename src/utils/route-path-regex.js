export function routePathRegex(path) {
  const routeParams = /:([a-zA-Z]+)/g
  const pathWithParameters = path.replaceAll(routeParams, '(?<$1>[a-z0-9-_]+)')
  return new RegExp(`^${pathWithParameters}`)
}
