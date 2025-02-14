import { defineComponent, reactive, ref } from "vue";
import { useClientStore } from "@/stores/clientStore";
import type { newClientT } from "@/types";
import { UiButton } from "./ui/UiButton";
import { UiInput } from "./ui/UiInput";
import { useModalStore } from "@/stores/modalStore";
import { globalTranslate } from "@/utils/globalTranslate";
export const ClientCreate = defineComponent({
  name: "ClientCreate",
  components: { UiButton, UiInput },
  setup() {
    const modalStore = useModalStore();
    const isFlash = ref<boolean>(false);
    const newClient = reactive<newClientT>({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    const createNewClient = () => {
      isFlash.value = true;
      if (newClient.name !== "") {
        useClientStore().createOneClient(newClient);
        modalStore.updateModal({ key: "show", value: false });
      }
      setTimeout(() => {
        isFlash.value = false;
      }, 1000);
    };
    return () => (
      <div class="w-1/2 h-fit z-50 gap-3 flex flex-col bg-white p-2 min-w-[350px]">
        <h1 class="font-semibold text-lg text-gray-800 border-b-2 border-b-gray-500 pb-2 uppercase text-center">
          {globalTranslate("create a client")}
        </h1>
        <div class="h-full w-full flex flex-col gap-2">
          <UiInput
            IsEmpty={isFlash.value && newClient["name"] == ""}
            OnInputChange={(value) =>
              (newClient["name"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder={globalTranslate("Name")}
          />
          <UiInput
            IsEmpty={isFlash.value && newClient["email"] == ""}
            OnInputChange={(value) =>
              (newClient["email"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder={globalTranslate("E-mail")}
          />
          <UiInput
            IsEmpty={isFlash.value && newClient["phone"] == ""}
            OnInputChange={(value) =>
              (newClient["phone"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder={globalTranslate("Phone number")}
          />
          <UiInput
            IsEmpty={isFlash.value && newClient["address"] == ""}
            OnInputChange={(value) =>
              (newClient["address"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder={globalTranslate("Address")}
          />
        </div>
        <div class="flex">
          <UiButton colorTheme="a" onClick={() => createNewClient()}>
            {globalTranslate("Create")}
          </UiButton>
        </div>
      </div>
    );
  },
});
