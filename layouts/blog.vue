<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import Logo from '@/assets/img/ubuntu/ubuntu-logo-48x48.png'
import ScrollToTop from '@/components/layout-components/ScrollToTop.vue'
import BlogHomeHeader from '@/components/main-page-components/blog-parts/BlogHomeHeader.vue'
import PwaNotificationBox from '@/components/pwa/PwaNotificationBox.vue'
import { HeaderHorizontal } from '@bobbykim/manguito-theme'
import {
  type MenuItemType,
  type SocialUrl,
  MclFooterA,
} from '@bobbykim/mcl-footer'
import { useWindowScroll } from '@vueuse/core'
import { reactive } from 'vue'

const menuItems: MenuItemType[] = [
  {
    title: 'Home',
    url: '/',
    target: '_self',
  },
  {
    title: 'Blog',
    url: '/blog',
    target: '_self',
  },
  {
    title: 'About',
    url: '/about',
    target: '_self',
  },
]

const router = useRouter()
const config = useRuntimeConfig()
const { y } = useWindowScroll({ behavior: 'smooth' })
const menuData = reactive<{
  title: string
  logo: string
  logoAlt: string
  logoLink: string
  social: SocialUrl
  menu: MenuItemType[]
}>({
  title: config.public.siteName,
  logo: Logo,
  logoAlt: 'Ubuntu logo',
  logoLink: '/blog',
  social: {
    github: config.public.gitHubUrl,
    linkedin: config.public.linkedinUrl,
  },
  menu: menuItems,
})

const handleFooterLogoClick = (e: Event, link: string) => {
  e.preventDefault()
  router.push({ path: link })
}
const handleFooterMenuClick = (e: Event, menu: MenuItemType) => {
  e.preventDefault()
  router.push({ path: menu.url })
}
const handleScrollClick = () => {
  y.value = 0
}
</script>

<template>
  <div class="relative">
    <!-- header -->
    <HeaderHorizontal
      bg-color="dark-4"
      mobile-menu-bg-color="dark-2"
      :scroll-distance="100"
    >
      <template #content>
        <div class="flex flex-shrink-0 items-center self-center md:py-3xs">
          <div class="h-md md:h-lg mr-2xs md:mr-sm align-middle">
            <NuxtLink :to="menuData.logoLink">
              <img
                :src="menuData.logo"
                :alt="menuData.logoAlt"
                class="h-full inline-block"
              />
            </NuxtLink>
          </div>
          <div class="flex flex-col justify-center ml-2">
            <NuxtLink :to="menuData.logoLink">
              <h2
                class="inline-block align-middle tracking-wider h2-md text-warning"
              >
                {{ menuData.title }}
              </h2>
            </NuxtLink>
          </div>
        </div>
      </template>
      <template #content-right>
        <div class="flex items-center gap-4 text-lg text-light-1 font-bold">
          <div
            v-for="(item, idx) in menuData.menu"
            :key="idx"
            class="border-r-2 border-light-3 pr-4 last:border-r-0 last:pr-0"
          >
            <NuxtLink
              :to="item.url"
              class="hover:text-light-4 focus:text-light-4 transition-colors duration-150 ease-linear"
              >{{ item.title }}</NuxtLink
            >
          </div>
        </div>
      </template>
      <template #mobile-content="{ headerClose }">
        <div
          class="flex flex-col justify-center items-center gap-2 text-lg text-light-1 font-bold py-2xs"
        >
          <div v-for="(item, idx) in menuData.menu" :key="idx">
            <NuxtLink
              :to="item.url"
              class="hover:text-light-4 focus:text-light-4 transition-colors duration-150 ease-linear"
              @click="headerClose"
              >{{ item.title }}</NuxtLink
            >
          </div>
        </div>
      </template>
    </HeaderHorizontal>
    <!-- content -->
    <div class="bg-dark-3 text-light-1 relative">
      <div
        class="absolute top-0 -translate-y-1/2 inset-x-0 h-64 bg-warning"
      ></div>
      <div class="relative container -mb-md">
        <BlogHomeHeader
          image-url="/content_img/about/manguito_small.jpg"
          :github-url="$config.public.gitHubUrl"
          :linkedin-url="$config.public.linkedinUrl"
          :email-address="$config.public.emailAddress"
        >
          <div class="text-center">
            <h2 class="mb-xs">{{ $config.public.userName }}</h2>
            <p>Full-stack developer in Phoenix, AZ</p>
          </div>
        </BlogHomeHeader>
        <slot />
      </div>
      <PwaNotificationBox />
    </div>
    <!-- footer -->
    <ClientOnly>
      <MclFooterA
        :logo="menuData.logo"
        :logo-alt="menuData.logoAlt"
        :logo-link="menuData.logoLink"
        :logo-as-link="false"
        bg-color="dark-4"
        :title="menuData.title"
        :menu-items="menuData.menu"
        :social-links="menuData.social"
        border-top-color="warning"
        highlight-color="warning"
        social-icon-color="warning"
        @logo-click="handleFooterLogoClick"
        @menu-click="handleFooterMenuClick"
      >
        <span class="text-light-1"
          >&copy; {{ $config.public.siteName }}
          {{ new Date().getFullYear() }}</span
        >
      </MclFooterA>
    </ClientOnly>
    <ScrollToTop @scroll-click="handleScrollClick" />
  </div>
</template>

<style scoped></style>
