import './index.less';

import {Button, Checkbox} from 'santd';

export default {
    components: {
        's-button': Button, 's-checkbox': Checkbox
    }, template: `
        <div class="todo-box">
            <div class="todo-list">
                <div
                    class="left"
                >
                <label>
                 <s-checkbox checked="{=done=}" on-change="handleChange"/>
                 <span s-if="!todoobj.isEdit"> {{title}} </span>
                  <input s-else  style="width: 80%"  type="text" value="{= title =}">
                </label>
                </div>
              <div>
              <s-button s-if="!todoobj.isEdit"  type="primary" on-click="handleEdit(todoobj)" >编辑</s-button>
              <s-button type="danger" on-click="handleDelete(index)" >删除</s-button>
               </div>
              
            </div>
           
         </div>
    `, initData: function () {
        return {
            show: false

        };
    }, compiled() {
        console.log('1111')
    },


    handleChange(e) {
        this.fire('check', this.data.get('id'))
    },

    handleDelete(index) {
        if (confirm('确定删除吗？')) this.fire('change', index)
    },

    handleEdit(todo){
        console.log(todo,'获取编辑的对象')
        if(todo.hasOwnProperty('isEdit')){
            todo.isEdit = true
        }else{
            this.data.set(todo['isEdit'],true)
            // console.log('@')
        }
    },


};
