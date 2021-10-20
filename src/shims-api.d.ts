import { Apis } from "@/lendi-api";

declare module "vue/types/vue" {
  interface VueConstructor {
    $api: Apis;
  }
}
