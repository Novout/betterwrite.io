import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useEntity } from '@/use/entity'
import { useEnv } from '@/use/env'
import { useProject } from '@/use/project'
import { useLocalStorage } from '@/use/storage/local'
import { useHead } from '@vueuse/head'
import { usePlugin } from 'better-write-plugin-core'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export const useEditor = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const project = useProject()
  const entity = useEntity()
  const local = useLocalStorage()
  const router = useRouter()
  const plugin = usePlugin()
  const { t } = useI18n()

  const init = () => {
    onMounted(() => {
      project.onLoadProject()
    })

    plugin.emit('plugin-theme-set')

    if (!env.isDev()) {
      window.onbeforeunload = function () {
        if (router.currentRoute.value.path === '/') local.onSaveProject()
      }
    }

    const title = computed(() => t('seo.editor.title'))
    const description = computed(() => t('seo.editor.description'))

    const _title = computed(() =>
      PROJECT.nameRaw === env.projectEmpty() ||
      !CONTEXT.entities[0] ||
      CONTEXT.entities[0].raw === env.emptyLine() ||
      entity.utils().isFixed(0)
        ? title.value
        : PROJECT.nameRaw + ' - ' + CONTEXT.entities[0]?.raw
    )

    useHead({
      title: _title,
      meta: [
        {
          name: `description`,
          content: description,
        },
      ],
    })
  }

  const fullScreen = (): void => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }

    document.body.requestFullscreen()
  }

  return { init, fullScreen }
}
