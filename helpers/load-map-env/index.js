import { loadEnv } from 'vite'

const envMap = {
  development: 'dev',
  production: 'prod',
}

export function loadMapEnv(mode) {
  const env = loadEnv(envMap[mode], process.cwd())
  return env
}
