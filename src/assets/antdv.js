import { 
    DatePicker,
    Button,
    Space,
    Layout,

 } from "ant-design-vue";

let modules = [
    DatePicker,
    Button,
    Space,
    Layout,

];

export function getAntDvModules(x) {
  modules.forEach((item) => x.use(item));
}
