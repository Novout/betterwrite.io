import { BetterWriteThemes } from '@/types/editor'

export const ThemeNormalize = (theme: BetterWriteThemes) => {
  return (
    {
      'BetterWrite - Light': 'betterwrite-light',
      'BetterWrite - Dark': 'betterwrite-dark',
      Rise: 'rise',
    }[theme] || 'betterwrite-dark'
  )
}
