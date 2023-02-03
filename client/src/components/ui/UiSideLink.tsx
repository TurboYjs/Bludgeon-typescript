<<<<<<< HEAD
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const UiSideLink = defineComponent({
  name: "UiSideLink",
  props: {
    IsText: {
      type: Boolean,
      required: true,
    },
    LinkPath: {
      type: String,
      default: "/",
      required: true,
    },
    LinkIcon: {
      type: String,
      required: true,
    },
    LinkText: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return () => (
      <RouterLink to={props.LinkPath}>
        <span
          class={
            "w-full flex h-9 rounded-sm items-center py-1 px-2 hover:bg-gray-200 transition-all duration-300"
          }
        >
          {props.LinkIcon}
          {props.IsText ? (
            <span class="text-[rgba(25,23,17,0.6)] ml-1">{props.LinkText}</span>
          ) : (
            ""
          )}
        </span>
      </RouterLink>
    );
  },
});
=======
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const UiSideLink = defineComponent({
  name: "UiSideLink",
  props: {
    IsText: {
      type: Boolean,
      required: true,
    },
    LinkPath: {
      type: String,
      default: "/",
      required: true,
    },
    LinkIcon: {
      type: String,
      required: true,
    },
    LinkText: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return () => (
      <RouterLink to={props.LinkPath}>
        <span
          class={
            "w-full flex h-9 rounded-sm items-center py-1 px-2 hover:bg-gray-200 transition-all duration-300"
          }
        >
          {props.LinkIcon}
          {props.IsText ? (
            <span class="text-[rgba(25,23,17,0.6)] ml-1">{props.LinkText}</span>
          ) : (
            ""
          )}
        </span>
      </RouterLink>
    );
  },
});
>>>>>>> 0b7f70c6e632db25455c392e4e0f596d442c8834
