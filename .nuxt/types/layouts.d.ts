import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "user"
declare module "/project/fmb-ui/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}