import { KeyValue } from "../module/DataType";

export default function render(template: string, data: { [key: string]: any }, rule = /\{\{(\w+)\}\}/): string {

    // 判断模板里是否有模板字符串
    if (rule.test(template)) {
        const match = rule.exec(template)
        if (!match) return '';

        // 查找当前模板里第一个模板字符串的字段
        const name = match[1];
        template = template.replace(rule, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }

    return template; // 如果模板没有模板字符串直接返回
}