import { ContextStatePageContent } from '@/types/context'
import { Callback } from '@/types/utils'

export const useRaw: Callback<any> = () => {
  const convert = (page: ContextStatePageContent) => {
    let final = ''
    let _italic = false
    let _bold = false

    if (page.type !== 'paragraph') return page.raw

    for (let i = 0; i < page.raw.length; i++) {
      const letter = page.raw.charAt(i)

      if (letter === '*' && !_italic) {
        _italic = true
        final += '<span class="italic text-xs">'
      } else if (letter === '*' && _italic) {
        final += '</span>'
        _italic = false
      } else if (letter === '&' && !_bold) {
        _bold = true
        final += '<span class="font-bold text-xs">'
      } else if (letter === '&' && _bold) {
        final += '</span>'
        _bold = false
      } else {
        final += letter
      }
    }

    return final
  }

  return { convert }
}
