import './index.less';
import {Input, Icon} from 'santd';
import {nanoid} from 'nanoid'
export default {
    components: {
        's-input': Input
    },
    onChange(value) {
     
        let  todoObj= {id:nanoid(),title:value,done:false}
        console.log(todoObj,value)
        this.data.set('todoObj',todoObj)
        this.fire("change", todoObj)
        this.title = ''
    },
    template: `
    <div>
    <s-input placeholder="回车输入代办事项" allowClear="{{true}}" on-pressEnter="onChange"/>
</div>
    `,
    initData: function () {
        return {
            title: ''
        };
    }
};
