<script setup lang="ts">
import InfoSvgIcon from '@/assets/img/svg-files/emblem-important-symbolic.svg'
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import MailIcon from '@/assets/img/svg-files/mail-unread-symbolic.svg'
import PowerSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import UbuntuLogo from '@/assets/img/ubuntu/ubuntu-logo-dark.png'
import { Modal } from '@bobbykim/manguito-theme'
import { vToggle } from '@bobbykim/manguito-theme/directives'
import { MclFormGroup, MclInputText, MclTextArea } from '@bobbykim/mcl-forms'

const config = useRuntimeConfig()
const url = useRequestURL()

definePageMeta({
  layout: false,
})

useHead({
  title: `${config.public.siteName} | Shutdown`,
  meta: [
    { property: 'og:title', content: `${config.public.siteName} | Shutdown` },
    { property: 'og:url', content: url.href },
    { property: 'twitter:domain', content: url.host },
    { property: 'twitter:url', content: url.href },
    {
      name: 'twitter:title',
      content: `${config.public.siteName} | Shutdown`,
    },
  ],
})

const displayLoader = ref<boolean>(true)
const modalRef = ref<InstanceType<typeof Modal>>()
const contactStatus = ref<number>(0)
const contactEmailRef = ref<string>('')
const contactTitleRef = ref<string>('')
const contactTextRef = ref<string>('')

const submitDisabled = computed<boolean>(() => {
  return [
    contactEmailRef.value,
    contactTitleRef.value,
    contactTextRef.value,
  ].some((field) => field.trim() === '')
})

const onFormSubmit = async () => {
  const res = await $fetch('/api/mailer', {
    method: 'POST',
    body: {
      email: contactEmailRef.value,
      subject: contactTitleRef.value,
      text: contactTextRef.value,
    },
  })
  if (res.ok) {
    console.info('Successfully sent email.')
  }
  console.log({
    email: contactEmailRef.value,
    subject: contactTitleRef.value,
    text: contactTextRef.value,
  })
  contactStatus.value = 1
  contactEmailRef.value = ''
  contactTitleRef.value = ''
  contactTextRef.value = ''
  setTimeout(() => {
    modalRef.value?.close()
    contactStatus.value = 0
  }, 5000)
}

const onReset = () => {
  contactEmailRef.value = ''
  contactTitleRef.value = ''
  contactTextRef.value = ''
  contactStatus.value = 0
}

setTimeout(() => {
  displayLoader.value = false
}, 2000)
</script>

<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center bg-dark-4 relative"
  >
    <!-- shut down loader -->
    <div
      :class="[
        displayLoader ? 'visible opacity-100' : 'invisible opacity-0',
        'flex flex-col items-center transition-[opacity,visibility] duration-300 delay-300 ease-linear',
      ]"
    >
      <h2 class="h2-md text-light-1 mb-lg">Shutting down system...</h2>
      <div
        class="animate-spin rounded-full h-2xl w-2xl border-8 border-light-1 border-r-warning"
      ></div>
    </div>
    <!-- buttons -->
    <div
      :class="[
        displayLoader ? 'invisible opacity-0' : 'visible opacity-100',
        'flex gap-4 text-light-1 items-center transition-[opacity,visibility] duration-300 delay-300 ease-linear',
      ]"
    >
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
        to="/"
      >
        <PowerSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Restart</p>
      </NuxtLink>
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 delay-100 ease-linear drop-shadow-md"
        to="/blog"
      >
        <DocumentSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Blog</p>
      </NuxtLink>
      <button
        v-toggle:mailer-modal
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 delay-100 ease-linear drop-shadow-md"
        to="/blog"
      >
        <MailIcon class="w-md h-md" :fontControlled="false" />
        <p>Email</p>
      </button>
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
        to="/about"
      >
        <InfoSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>About</p>
      </NuxtLink>
    </div>
    <!-- logo -->
    <img
      class="w-1/2 md:w-1/5 absolute bottom-sm left-1/2 -translate-x-1/2"
      :src="UbuntuLogo"
      alt="ubuntu logo"
    />

    <!-- contact form -->
    <Modal
      ref="modalRef"
      id="mailer-modal"
      title="Contact"
      color="dark-3"
      backdrop-color="dark-1"
      title-color="light-3"
      class-name="rounded-xl"
      @close="onReset"
    >
      <template #body>
        <div class="p-sm lg:p-md text-light-3">
          <Transition name="page" mode="out-in">
            <div v-if="contactStatus === 0">
              <form @submit.prevent="onFormSubmit">
                <div class="mb-xs">
                  <MclFormGroup
                    label-for="contact-email"
                    text-color="light-3"
                    label="Email:"
                    text-bold
                  ></MclFormGroup>
                  <MclInputText
                    id="contact-email"
                    placeholder="email@example.com"
                    type="email"
                    rounded
                    highlight-color="warning"
                    v-model="contactEmailRef"
                    required
                  ></MclInputText>
                </div>
                <div class="mb-xs">
                  <MclFormGroup
                    label-for="contact-subject"
                    text-color="light-3"
                    label="Subject:"
                    text-bold
                  ></MclFormGroup>
                  <MclInputText
                    id="contact-subject"
                    placeholder="Title.."
                    rounded
                    highlight-color="warning"
                    v-model="contactTitleRef"
                    required
                  ></MclInputText>
                </div>
                <div class="mb-xs">
                  <MclFormGroup
                    label-for="contact-text"
                    label="Text:"
                    text-color="light-3"
                    text-bold
                  ></MclFormGroup>
                  <MclTextArea
                    id="contact-text"
                    rounded
                    highlight-color="warning"
                    v-model="contactTextRef"
                    required
                  ></MclTextArea>
                </div>
                <div>
                  <button
                    class="btn btn-warning btn-full"
                    :class="[submitDisabled && 'cursor-not-allowed']"
                    :disabled="submitDisabled"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div v-else class="text-light-3 text-center py-md">
              <p class="text-2xl text-warning mb-2xs tracking-wide">
                Message sent!
              </p>
              <p>I'll get back to you soon.</p>
            </div>
          </Transition>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped></style>
