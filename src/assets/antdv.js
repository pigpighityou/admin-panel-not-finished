import { 
    DatePicker,
    Button
 } from "ant-design-vue";

let modules = [
    DatePicker,
    Button
];

export function getAntDvModules(x) {
  modules.forEach((item) => x.use(item));
}
