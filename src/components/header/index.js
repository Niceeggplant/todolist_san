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
        this.data.set('title','')
    },
    template: `
    <div>
    <s-input  placeholder="回车输入代办事项" allowClear="{{true}}" on-pressEnter="onChange"  value="{=title=}"/>
</div>
    `,
    initData: function () {
        return {
            title: ''
        };
    }
};
