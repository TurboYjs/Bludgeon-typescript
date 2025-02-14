import type {
  dataRowsT,
  dataRowT,
  newStockMvmT,
  stockMvmT,
  stockState,
} from "@/types";
import axios from "axios";
import { defineStore } from "pinia";

const api: string = "http://localhost:3111/stock/";

export const useStockStore = defineStore("StockStore", {
  state: (): stockState => {
    return {
      stockMovements: [],
    };
  },
  actions: {
    getAllStockMovements: async function () {
      const res: dataRowsT<stockMvmT> = await axios.get(api);
      this.stockMovements = res.data.rows;
      // .map((item) => ({
      //   ...item,
      //   date: formatDate(item.date),
      // }));
    },
    createStockMovement: async function (stockmvm: newStockMvmT) {
      const res: dataRowT<stockMvmT> = await axios.post(api, {
        data: {
          Stock: stockmvm,
        },
      });
      if (res.data.row.id) {
        this.getAllStockMovements();
      }
    },
  },
});
