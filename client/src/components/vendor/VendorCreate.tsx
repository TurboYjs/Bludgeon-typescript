import { defineComponent, reactive, ref } from "vue";
import { useVendorStore } from "@/stores/vendorStore";
import { useModalStore } from "@/stores/modalStore";
import type { newVendorT } from "@/types";
import { UiButton } from "../ui/UiButton";
import { UiInput } from "../ui/UiInput";
export const VendorCreate = defineComponent({
  name: "VendorCreate",
  components: { UiButton, UiInput },
  setup() {
    const isFlash = ref<boolean>(false);
    const newVendor = reactive<newVendorT>({
      name: "",
      email: "",
      phone: "",
      addresse: "",
    });
    const createNewVendor = () => {
      isFlash.value = true;
      if (newVendor.name !== "") {
        useVendorStore().createOneVendor(newVendor);
        useModalStore().updateModal({ key: "show", value: false });
      }
      setTimeout(() => {
        isFlash.value = false;
      }, 1000);
    };
    return () => (
      <div class="w-1/2 h-fit z-50 gap-3 flex flex-col bg-white p-2 min-w-[350px]">
        <h1 class="font-semibold text-lg text-gray-800 border-b-2 border-b-gray-500 pb-2 uppercase text-center">
          Create new Vendor
        </h1>
        <div class="h-full w-full flex flex-col gap-2">
          <UiInput
            IsEmpty={isFlash.value && newVendor["name"] == ""}
            OnInputChange={(value) =>
              (newVendor["name"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder="Name"
          />
          <UiInput
            IsEmpty={isFlash.value && newVendor["email"] == ""}
            OnInputChange={(value) =>
              (newVendor["email"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder="Email"
          />
          <UiInput
            IsEmpty={isFlash.value && newVendor["phone"] == ""}
            OnInputChange={(value) =>
              (newVendor["phone"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder="Phone"
          />
          <UiInput
            IsEmpty={isFlash.value && newVendor["addresse"] == ""}
            OnInputChange={(value) =>
              (newVendor["addresse"] =
                typeof value == "string" ? value : JSON.stringify(value))
            }
            Type="text"
            PlaceHolder="Address"
          />
        </div>
        <div class="flex">
          <UiButton colorTheme="a" onClick={() => createNewVendor()}>
            Create vendor
          </UiButton>
        </div>
      </div>
    );
  },
});
