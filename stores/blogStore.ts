import { queryContent } from '#imports'
import { ParsedContent } from '@nuxt/content'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  const isRootDir = ref<boolean>(true)
  const currentPathIdx = ref<number>(1)
  const currentPath = ref<string>('/blog')
  const historyRef = ref<string[]>([])
  const currentContent = ref<ParsedContent | null>(null)
  const searchQuery = ref<string>('')

  // actions
  const fetchBlogContent = async () => {
    if (currentPath.value === '/blog') {
      return
    }
    const res = await queryContent()
      .where({ _path: currentPath.value })
      .findOne()

    if (res === null) {
      return
    }
    currentContent.value = res
  }
  // actions: BlogPage
  const openBlog = () => {
    isVisible.value = true
    isActive.value = true
    historyRef.value.push('/blog')
  }
  const closeBlog = () => {
    isVisible.value = false
    isActive.value = false
    isRootDir.value = true
    isMaximized.value = false
    currentPath.value = '/blog'
    currentPathIdx.value = 1
    historyRef.value = []
    searchQuery.value = ''
    currentContent.value = null
  }
  const minimizeBlog = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setBlogVisible = () => {
    isVisible.value = true
    isActive.value = true
  }
  const setBlogActive = (val: boolean) => {
    isActive.value = val
  }
  const setBlogMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const setCurrentPath = async (val: string) => {
    if (currentPathIdx.value > 1) {
      historyRef.value.splice(
        historyRef.value.length - currentPathIdx.value + 1
      )
      currentPathIdx.value = 1
    }
    historyRef.value.push(val)
    searchQuery.value = ''
    currentPath.value = val
    await fetchBlogContent()
    if (historyRef.value.length > currentPathIdx.value) {
      isRootDir.value = false
    }
  }
  const onPrevClick = () => {
    searchQuery.value = ''
    if (
      historyRef.value.length > 1 &&
      currentPathIdx.value < historyRef.value.length
    ) {
      currentPathIdx.value += 1
      const newTargetDirectory =
        historyRef.value[historyRef.value.length - currentPathIdx.value]
      currentPath.value = newTargetDirectory
    }
    if (historyRef.value.length === currentPathIdx.value) {
      isRootDir.value = true
    }
  }
  const onNextClick = () => {
    searchQuery.value = ''
    if (currentPathIdx.value > 1) {
      currentPathIdx.value -= 1
      const newTargetDirectory =
        historyRef.value[historyRef.value.length - currentPathIdx.value]
      currentPath.value = newTargetDirectory
    }
    if (historyRef.value.length > currentPathIdx.value) {
      isRootDir.value = false
    }
  }
  return {
    isActive,
    isMaximized,
    isRootDir,
    isVisible,
    currentContent,
    currentPath,
    currentPathIdx,
    historyRef,
    searchQuery,
    openBlog,
    closeBlog,
    minimizeBlog,
    setBlogActive,
    setBlogVisible,
    setBlogMaximize,
    setCurrentPath,
    onPrevClick,
    onNextClick,
  }
})
