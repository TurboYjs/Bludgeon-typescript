import type { creditT, dataRowsT, dataRowT, newCreditT } from "@/types";
import axios from "axios";
import { defineStore } from "pinia";

const api: string = "http://localhost:3111/credit/";

export const useCreditStore = defineStore("CreditStore", {
  state: (): { Credits: creditT[] } => {
    return {
      Credits: [],
    };
  },
  actions: {
    getAllCredits: async function () {
      const res: dataRowsT<creditT> = await axios.get(api);
      this.Credits = res.data.rows;
      console.log(res);
    },
    createCredit: async function (Credit: newCreditT) {
      const res: dataRowT<creditT> = await axios.post(api, {
        data: {
          Credit,
        },
      });
      if (res.data.row.id) {
        this.getAllCredits();
      }
    },
    deleteOneCredit: async function (id: number) {
      const res: dataRowT<number> = await axios.delete(api + id);
      if (res.data.row) {
        this.Credits = this.Credits.filter((cli) => cli.id !== id);
      }
    },
  },
});
