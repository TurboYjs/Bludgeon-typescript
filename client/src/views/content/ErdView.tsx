import { defineComponent, onMounted } from "vue";
import axios from "axios";
import mermaid from "mermaid";

export const ErdView = defineComponent({
  name: "Erd",
  setup() {
    onMounted(() => {
      mermaid.initialize({
        startOnLoad: false,
      });
      axios.get("http://localhost:3111/erd/").then((res) => {
        const graphDiv = document.getElementById("graphDiv")!;

        const svgId = "mermaid-svg";

        function renderWithMermaid(input: string) {
          mermaid.mermaidAPI.render(
            svgId,
            input,
            (svg: string) => (graphDiv.innerHTML = svg)
          );
        }
        function updateDownloadButton() {
          const downloadHref = document.getElementById(
            "download"
          ) as HTMLAnchorElement;
          const el = document.getElementById(svgId)!;
          const serializer = new XMLSerializer();
          let source = serializer.serializeToString(el);

          if (
            !source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)
          ) {
            source = source.replace(
              /^<svg/,
              '<svg xmlns="http://www.w3.org/2000/svg"'
            );
          }
          if (
            !source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)
          ) {
            source = source.replace(
              /^<svg/,
              '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
            );
          }

          source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

          downloadHref.style.display = "unset";
          downloadHref.href = "data:image/svg+xml;base64," + btoa(source);
        }
        renderWithMermaid(res.data.mermaid);
        updateDownloadButton()
      });
    });
    return () => (
      <div class="w-full h-full flex-col">
        <a id="download" download="prisma-erd.svg">
          Download SVG
        </a>
        <div id="graphDiv" class="w-full flex-1" />
      </div>
    );
  },
});
