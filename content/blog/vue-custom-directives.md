---
title: 'Building Custom Vue Directives: A Practical Guide'
description: 'What custom Vue directives are good for, when to reach for them, and what to think about when building one that actually holds up in production.'
category: 'Frontend'
image: '/content_img/blog/coding_banner.webp'
githubUrl: 'https://github.com/bobbykim89'
linkedinUrl: 'https://www.linkedin.com/in/bobbykim89/'
emailAddress: 'bobby.sihun.kim@gmail.com'
date: '2026-03-01'
---

::hero{:image-src="image" :rounded="true" :gradient="true"}

# Building Custom Vue Directives: A Practical Guide

::

::abstract

If you have been writing Vue for a while, you have definitely used built-in directives like `v-if`, `v-show`, and `v-model`. They feel like a natural part of the template language, almost invisible. But Vue also lets you write your own directives, and once you understand when to reach for them, they become a surprisingly powerful tool.

This post talks about what custom directives are good for, what to think about when building one, and walks through a real example I built: a `v-click-outside` directive.

::

<br/>

## What Are Custom Directives Good For?

<br/>

The short answer is: DOM manipulation that does not belong in your component logic.

When you need to do something like attach a native event listener, observe an element's size, or interact with the DOM directly, the instinct is often to reach for a composable or just write it inline in a component. That works fine until you find yourself copy-pasting the same DOM logic across five different components.

Custom directives let you encapsulate that behavior once and reuse it anywhere in your template, the same way you would use a component. The difference is that directives are specifically designed for when you need direct access to the underlying DOM element, not for rendering UI.

<br/>

A few good use cases:

- Detecting clicks outside an element (dropdowns, modals, tooltips)
- Auto-focusing an input when it mounts
- Observing element visibility with IntersectionObserver
- Trapping keyboard focus inside a modal
- Lazy-loading images

<br/>
 
## Things to Think About When Building a Directive

<br/>
 
Before jumping into the code, here are the things I find myself thinking through whenever I build a directive.

<br/>
 
### Lifecycle coverage
 
Vue directives have lifecycle hooks that mirror the component lifecycle: `mounted`, `updated`, `unmounted`, and a few others. It is easy to set something up in `mounted` and forget about `updated` and `unmounted`. In practice this leads to stale handlers and memory leaks, which are the kind of bugs that are annoying to track down.
 
The rule I follow: if you add something in `mounted`, make sure you clean it up in `unmounted`. And if your directive depends on values that can change at runtime, handle that in `updated` too.

<br/>
 
### Storing state on the element
 
Directives do not have their own instance to store state on, so when you need to keep a reference to something (like an event handler) across lifecycle hooks, you attach it directly to the DOM element. This is a common pattern and it works well, but it is worth being intentional about it. Use a descriptive property name and clean it up when the directive unmounts.

<br/>
 
### Flexibility vs. simplicity
 
There is always a tension between making a directive flexible enough to cover real-world use cases and keeping it simple enough to be easy to use. A good starting point is to accept either a plain function or an options object as the directive value. That way simple cases stay simple, but you have an escape hatch for more complex needs.

<br/>
 
### TypeScript
 
If you are working in a TypeScript project, it is worth defining your types upfront. Directives that accept flexible input (function or object) can get messy fast without clear types, and the type definitions also serve as pretty good documentation for anyone using the directive later.
 
<br/>
 
## A Real Example: `v-click-outside`

<br/>
 
The click-outside pattern comes up constantly in UI development. Dropdowns, context menus, modals, popovers — they all need to close when you click somewhere else. Writing that logic inline every time gets old fast, so I built a directive for it.

<br/>
 
### The types
 
```ts
export type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void
 
export interface ClickOutsideElement extends HTMLElement {
  __ClickOutsideHandler?: (event: MouseEvent | TouchEvent) => void
}
 
export interface ClickOutsideOptions {
  handler: ClickOutsideHandler
  events?: ('click' | 'mousedown' | 'touchstart')[]
  excludeElements?: HTMLElement[]
}
 
export type ClickOutsideValue = ClickOutsideHandler | ClickOutsideOptions
```
 
A few things worth noting here. `ClickOutsideElement` extends `HTMLElement` to add a `__ClickOutsideHandler` property. This is how we store the handler reference on the element so we can remove the exact same listener later. Without this, you end up creating a new function reference in `unmounted` that does not match the one you added in `mounted`, and the listener never actually gets removed.
 
`ClickOutsideValue` is a union type that accepts either a plain function or a full options object. This gives you a simple path for the common case and a flexible path when you need it.

<br/>
 
### The directive
 
```ts
import type { Directive, DirectiveBinding } from 'vue'
import type {
  ClickOutsideElement,
  ClickOutsideHandler,
  ClickOutsideValue,
} from './index.types'
 
const isClickOutside = (
  el: HTMLElement,
  target: EventTarget | null,
  excludeElements?: HTMLElement[],
): boolean => {
  if (!target || !(target instanceof Node)) return false
  if (el === target || el.contains(target)) return false
  if (excludeElements?.length) {
    return !excludeElements.some(
      (excludedEl) => excludedEl === target || excludedEl.contains(target),
    )
  }
  return true
}
 
const getOptions = (binding: DirectiveBinding<ClickOutsideValue>) => {
  if (typeof binding.value === 'function') {
    return { handler: binding.value, events: ['click'] as const }
  }
  return {
    handler: binding.value.handler,
    events: binding.value.events || ['click'],
    excludeElements: binding.value.excludeElements,
  }
}
 
const createHandler = (
  el: HTMLElement,
  handler: ClickOutsideHandler,
  excludeElements?: HTMLElement[],
) => {
  return (event: MouseEvent | TouchEvent) => {
    if (isClickOutside(el, event.target, excludeElements)) {
      handler(event)
    }
  }
}
 
export const vClickOutside: Directive<ClickOutsideElement, ClickOutsideValue> = {
  mounted(el, binding) {
    const { handler, events, excludeElements } = getOptions(binding)
    el.__ClickOutsideHandler = createHandler(el, handler, excludeElements)
    events.forEach((evtType) => {
      document.addEventListener(evtType, el.__ClickOutsideHandler!, true)
    })
  },
  updated(el, binding) {
    if (el.__ClickOutsideHandler) {
      const oldOptions = getOptions({
        ...binding,
        value: binding.oldValue,
      } as DirectiveBinding<ClickOutsideValue>)
      oldOptions.events.forEach((evtType) => {
        document.removeEventListener(evtType, el.__ClickOutsideHandler!, true)
      })
    }
    const { handler, events, excludeElements } = getOptions(binding)
    el.__ClickOutsideHandler = createHandler(el, handler, excludeElements)
    events.forEach((evtType) => {
      document.addEventListener(evtType, el.__ClickOutsideHandler!, true)
    })
  },
  unmounted(el, binding) {
    if (el.__ClickOutsideHandler) {
      const { events } = getOptions(binding)
      events.forEach((evtType) => {
        document.removeEventListener(evtType, el.__ClickOutsideHandler!, true)
      })
      delete el.__ClickOutsideHandler
    }
  },
}
```
 
A few things I want to call out in this implementation.
 
**The `isClickOutside` helper** does three things: it bails early if there is no valid target, checks if the click was on the element itself or any of its children, and checks if it was on any excluded elements. The `excludeElements` option is useful when you have a trigger button that lives outside the element but should not count as an outside click.
 
**Event listeners are added with `capture: true`** (the third argument to `addEventListener`). This means the listener fires during the capture phase rather than the bubble phase, which makes it more reliable for catching clicks that might be stopped from bubbling by other handlers.
 
**The `updated` hook** removes the old listeners before adding new ones. This is important because if your handler is a reactive value that changes, without this step you would end up stacking listeners on every update.

<br/>
 
### Using it in a component
 
Simple case:
 
```vue
<template>
  <div v-click-outside="handleClose">
    Dropdown content
  </div>
</template>
 
<script setup lang="ts">
const handleClose = () => {
  // close the dropdown
}
</script>
```
 
With options:
 
```vue
<template>
  <div v-click-outside="{ handler: handleClose, events: ['mousedown'], excludeElements: [triggerRef] }">
    Dropdown content
  </div>
</template>
```
 
<br/>
 
## Wrapping Up

<br/>
 
Custom directives are one of those Vue features that are easy to overlook, but they fill a specific gap really well. When you have DOM behavior that needs to be reused across components and does not fit neatly into a composable, a directive is usually the right call.
 
The things that matter most when building one: cover all the lifecycle hooks you need, store and clean up your references properly, and invest a little time upfront in your types. It pays off when the directive actually gets used in multiple places and you are not chasing down mystery bugs six months later.
 
If you want to see this directive in context, it is part of my [Manguito Component Library](https://github.com/bobbykim89/manguito-component-library), a reusable Vue 3 design system I built for rapid prototyping.

::contact-buttons{:github-url="githubUrl" :linkedinUrl="linkedinUrl" :email-address="emailAddress"}

::
