import './index.less';

import {Button, Checkbox} from 'santd';

export default {
    components: {
        's-button': Button,
        's-checkbox': Checkbox
    },
    template: `
        <div class="todo-box">
            <div class="todo-list">
                <div
                    class="left"
                >
                <s-checkbox checked="{=done=}" on-change="handleChange">{{title}}</s-checkbox>
                </div>
               
              <s-button type="danger" on-click="handleDelete(index)" >删除</s-button>
            </div>
           
         </div>
    `,
    initData: function () {
        return {
            info: '111'

        };
    },
    compiled() {
        console.log('1111')
    },


    handleChange(e) {
        this.fire('check', this.data.get('id'))
    },

    handleDelete(index) {
        if (confirm('确定删除吗？'))
            this.fire('change', index)
    }


}
;
