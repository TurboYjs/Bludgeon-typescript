import { defineComponent, onBeforeMount, ref, Transition } from "vue";
import { globalTranslate } from "@/utils/globalTranslate";
import { CreditTable } from "@/components/CreditTable";
import { UiButton } from "@/components/ui/UiButton";
import { useModalStore } from "@/stores/modalStore";
import { UiInput } from "@/components/ui/UiInput";
import UiIcon from "@/components/ui/UiIcon.vue";
import { storeToRefs } from "pinia";
import { useCreditStore } from "@/stores/creditStore";

export const CreditView = defineComponent({
  name: "Credits",
  components: { CreditTable: CreditTable, UiButton, UiInput, UiIcon },
  setup() {
    const modalStore = useModalStore();
    const CreditStore = useCreditStore();
    const { Credits } = storeToRefs(CreditStore);
    //
    const searchQuery = ref<string>("");

    //
    onBeforeMount(() => {
      if (!Credits.value.length) CreditStore.getAllCredits();
    });
    //
    const updateModal = (name: string) => {
      modalStore.updateModal({ key: "show", value: true });
      modalStore.updateModal({ key: "name", value: name });
    };
    //
    const sortCreditsBy = (by: string) => {};

    return () => (
      <main class="w-full h-full px-3">
        <div class="w-full h-full flex flex-col items-start justify-start">
          <Transition appear>
            <div class="flex justify-between w-full gap-9 my-1">
              <div class="w-1/3">
                <UiInput
                  IsEmpty={false}
                  OnInputChange={(value) =>
                    (searchQuery.value =
                      typeof value !== "string"
                        ? JSON.stringify(value).toLocaleLowerCase()
                        : value.toLocaleLowerCase())
                  }
                  Type="text"
                  PlaceHolder={globalTranslate("Global.search")}
                >
                  <UiIcon
                    class=" fill-gray-400 cursor-default hover:bg-white"
                    name="search"
                  />
                </UiInput>
              </div>
              <div class="w-1/4 flex gap-2">
                <UiButton
                  colorTheme="a"
                  onClick={() => updateModal("CrediCreate")}
                >
                  <UiIcon
                    class=" fill-gray-900 cursor-default hover:bg-transparent"
                    name="add"
                  />{" "}
                  {globalTranslate("Credis.index.addButton")}
                </UiButton>
              </div>
            </div>
          </Transition>

          <Transition appear>
            <CreditTable
              FilterParam={searchQuery.value}
              sortBy={(by: string) => sortCreditsBy(by)}
              Credit={Credits.value}
            />
          </Transition>
        </div>
      </main>
    );
  },
});
