import { ChartLine } from "@/components/ChartLine";
import { ChartBar } from "@/components/ChartBart";
import { useStockStore } from "@/stores/stockStore";
import { useStatsStore } from "@/stores/statsStore";
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { globalTranslate } from "@/utils/globalTranslate";

export const StatsView = defineComponent({
  name: "Stats",
  components: { ChartBar, ChartLine },
  setup() {
    // we got all the stock mouvements already
    // no need to make an api call
    const { stockMovements } = storeToRefs(useStockStore());
    // reformate the data
    const [stockData, months] = useStatsStore().getStockMovementStats(
      stockMovements.value
    );
    console.log(stockData);

    return () => (
      <main class="w-full h-full px-3 py-1">
        <div class="w-full h-full grid grid-cols-1 grid-rows-1">
          <div>
            <h1 class="uppercase text-gray-600 font-semibold mb-1">
              {globalTranslate(
                "Sold and bought items during the last three months"
              )}
            </h1>
            <ChartBar
              id="stock-mouvements-for-past-three-months"
              chartData={{
                labels: months,
                datasets: [
                  {
                    label: globalTranslate("BOUGHT"),
                    backgroundColor: "rgba(255, 200, 0, 0.2)",
                    borderColor: "rgba(255, 200, 0,0.5)",
                    data: [
                      stockData[months[0]]?.IN ?? 0,
                      stockData[months[1]]?.IN ?? 0,
                      stockData[months[2]]?.IN ?? 0,
                    ],
                    borderWidth: 2,
                  },
                  {
                    label: globalTranslate("SOLD"),
                    data: [
                      stockData[months[0]]?.OUT ?? 0,
                      stockData[months[1]]?.OUT ?? 0,
                      stockData[months[2]]?.OUT ?? 0,
                    ],
                    backgroundColor: "rgba(255, 200, 0, 0.6)",
                    borderColor: "rgba(255, 200, 0,1)",
                    borderWidth: 2,
                  },
                ],
              }}
              chartOptions={{
                responsive: true,
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "rgba(25,23,17,0.6)",
                      textStrokeWidth: 10,
                    },
                    border: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      lineWidth: 1,
                      drawBorder: false,
                    },
                    border: {
                      display: false,
                    },
                    ticks: {
                      color: "rgba(25,23,17,0.6)",
                      min: 0,
                      textStrokeWidth: 1,
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
          {/* <ChartLine
            id="stock-mouvements-for"
            chartData={{
              labels: ["January", "February", "March"],
              datasets: [
                {
                  label: "",
                  borderColor: "rgba(255, 200, 0,0.5)",
                  data: [11, 89, 10],
                  // borderWidth: 2,
                  tention: 0.3,
                },
                {
                  data: [13, 7, 97],
                  borderColor: "rgba(255, 200, 0,1)",
                  // borderWidth: 2,
                  tention: 0.5,
                },
              ],
            }}
            chartOptions={{
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "rgba(25,23,17,0.6)",
                    textStrokeWidth: 10,
                  },
                  border: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    lineWidth: 1,
                    drawBorder: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    color: "rgba(25,23,17,0.6)",
                    min: 0,
                    textStrokeWidth: 1,
                    padding: 10,
                  },
                },
              },
            }}
          /> */}
        </div>
      </main>
    );
  },
});
