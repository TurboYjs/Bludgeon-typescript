import { defineComponent, reactive, ref, withModifiers } from "vue";
import { useModalStore } from "@/stores/modalStore";
import { useCreditStore } from "@/stores/creditStore";
import { UiButton } from "./ui/UiButton";
import { UiSelect } from "./ui/UiSelect";
import { UiInput } from "./ui/UiInput";
import { storeToRefs } from "pinia";
import { globalTranslate } from "@/utils/globalTranslate";
import { useClientStore } from "@/stores/clientStore";
import type { newCreditT } from "@/types";

export const CreditCreate = defineComponent({
  name: "CreditCreate",
  components: { UiButton, UiInput, UiSelect },
  setup() {
    const { clients } = storeToRefs(useClientStore());
    const IsClicked = ref<boolean>(false);
    const creditStore = useCreditStore();
    const Credit = reactive<newCreditT>({
      clientId: 0,
      price: 0,
    });
    const createNewCredit = () => {
      console.log(Credit);
      if (Credit.clientId !== 0 && Credit.price !== 0) {
        creditStore.createCredit(Credit);
        useModalStore().updateModal({ key: "show", value: false });
      }
    };
    return () => (
      <div class="w-1/2 h-fit z-50 gap-3 flex flex-col bg-white p-2 min-w-[350px]">
        <h1
          onClick={withModifiers(
            () => (IsClicked.value = !IsClicked.value),
            ["self"]
          )}
          class="font-semibold text-lg text-gray-800 border-b-2 border-b-gray-500 pb-2 uppercase text-center"
        >
          {globalTranslate("Credis.create.title")}
        </h1>
        <div class="h-full w-full flex flex-col gap-2">
          <UiSelect
            items={clients.value.map((client) => ({
              name: client.name,
              id: client.id,
            }))}
            onSelect={(id: number) => (Credit.clientId = id)}
            IsClickedOuside={IsClicked.value}
          >
            {globalTranslate("Select a client")}
          </UiSelect>
          <UiInput
            onClick={withModifiers(
              () => (IsClicked.value = !IsClicked.value),
              ["self"]
            )}
            Type="number"
            PlaceHolder={globalTranslate("Amount")}
            IsEmpty={false}
            OnInputChange={(input: string) => (Credit.price = Number(input))}
          />
        </div>
        <div class="flex">
          <UiButton colorTheme="a" onClick={() => createNewCredit()}>
            {globalTranslate("Add")}
          </UiButton>
        </div>
      </div>
    );
  },
});
