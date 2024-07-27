import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const text = ref<string>('JSX Component');
    return () => {
      console.log({text});
      return <h2 style="color: orange">Foo {text.value}</h2>
    }
  },
});
