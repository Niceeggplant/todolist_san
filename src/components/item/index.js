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
                <div  class="left" >
                    <label>
                        <s-checkbox checked="{=done=}" on-change="handleChange"/>
                            <span s-if="!isEdit"> {{title}} </span>
                        <input s-else  on-blur="handleBlur"  style="width: 80%"  type="text" value="{= title =}">
                    </label>
                </div>
                
                <div class="right">
                    <s-button s-if="!isEdit"    type="primary" on-click="handleEdit(item)" >编辑</s-button>
                    <s-button type="danger" on-click="handleDelete(index)" >删除</s-button>
                </div>
            </div>
        </div>
    `,
     initData: function () {
        return {
            isEdit: false
        };
    },


    handleChange(e) {
        this.fire('checkTodo', this.data.get('id'));
    },

    handleDelete(index) {
        if (confirm('确定删除吗？')) {
            this.fire('deleteTodo', index);
        }
    },

    handleEdit(item) {
        console.log(item, '获取编辑的对象');
        if (item.hasOwnProperty('isEdit')) {
            item.isEdit = true;
            this.data.set('isEdit', this.data.get('item').isEdit);
        }
        else {
            item.isEdit = true;
            this.data.set('isEdit', this.data.get('item').isEdit);
        }
    },

    handleBlur(e) {
        if (!e.target.value.trim()) {
            alert('输入不能为空！');
            return;
        }
        this.data.get('item').isEdit = false;
        this.data.set('isEdit', this.data.get('item').isEdit);
        this.fire('updateTodo',
         {
            title: this.data.get('title'),
            id: this.data.get('id')
        });
    }

};
