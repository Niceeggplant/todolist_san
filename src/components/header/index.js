import './index.less';
import {Input, Icon} from 'santd';
import {nanoid} from 'nanoid'
export default {
    components: {
        's-input': Input
    },
    addTodo(value) {
        let  todoObj= {
            id:nanoid(),
            title:value,
            done:false
        }
        this.data.set('todoObj',todoObj)
        this.fire("addTodo", todoObj)

        this.data.set('title','')
    },
    template: `
        <div>
            <s-input  placeholder="回车输入代办事项" allowClear="{{true}}" on-pressEnter="addTodo"  value="{=title=}"/>
        </div>
    `,
    initData: function () {
        return {
            title: ''
        };
    }
};
