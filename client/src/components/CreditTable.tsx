import { defineComponent, ref, type PropType } from "vue";
import { UiPagination } from "./ui/UiPagination";
import { formatDate } from "@/utils/formatDate";
import { globalTranslate } from "@/utils/globalTranslate";
import type { creditT } from "@/types";
import UiIcon from "./ui/UiIcon.vue";
import { useModalStore } from "@/stores/modalStore";
export const CreditTable = defineComponent({
  name: "CreditTable",
  props: {
    Credit: {
      type: Array as PropType<creditT[]>,
      required: true,
    },
    sortBy: {
      type: Function as PropType<(by: string) => void>,
    },
    FilterParam: {
      type: String,
      required: true,
      default: "",
    },
  },
  components: { UiPagination },
  setup(props) {
    const pagination = ref<number>(0);
    const toggleThisCredit = (credit: creditT, name: string) => {
      useModalStore().updateModal({ key: "show", value: true });
      useModalStore().updateModal({ key: "name", value: name });
      useModalStore().updateCreditRow(credit);
    };
    return () => (
      <div class="flex flex-col w-full h-fit">
        <table class="table-auto rounded-sm overflow-hidden w-full">
          <thead class="text-xs h-9 rounded-sm font-semibold uppercase text-[rgba(25,23,17,0.6)] bg-gray-300">
            <tr>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <th class="p-2">
                  <div class="font-semibold text-left">
                    {index === 0
                      ? globalTranslate("id")
                      : index === 1
                      ? globalTranslate("client name")
                      : index === 2
                      ? globalTranslate("client id")
                      : index === 3
                      ? globalTranslate("amount")
                      : index === 4
                      ? globalTranslate("date")
                      : index === 5
                      ? globalTranslate("")
                      : ""}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            {props.Credit.filter((c) =>
              JSON.stringify(c).toLocaleLowerCase().includes(props.FilterParam)
            )
              .slice(pagination.value * 15, pagination.value * 15 + 15)
              .map((credit) => (
                <tr>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">{credit.id}</div>
                  </td>

                  <td class="p-2">
                    <div class="text-left font-medium">
                      {credit.client.name}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left font-medium">{credit.clientId}</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">
                      {Math.abs(credit.price).toFixed(2)} DH
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">{formatDate(credit.createdAt)}</div>
                  </td>
                  <td class="p-2">
                    <div class="flex  justify-start gap-3">
                      <UiIcon
                        onClick={() => toggleThisCredit(credit, "CreditDelete")}
                        name={"delete"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <UiPagination
            goBack={() => pagination.value--}
            goForward={() => pagination.value++}
            itemsNumber={props.Credit.length}
            page={pagination.value}
          />
        </div>
      </div>
    );
  },
});
