export function withBaseUrl(path: string) {
  // profile 데이터에는 'images/foo.svg'처럼 앞에 슬래시 없이 저장하는 것을 권장
  const base = import.meta.env.BASE_URL ?? '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${normalizedPath}`
}
