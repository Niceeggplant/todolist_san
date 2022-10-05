import './index.less';
import Item from '@components/item';
import {Button, Checkbox} from 'santd';

export default {
    components: {
        'item': Item, 's-button': Button, 's-checkbox': Checkbox
    }, template: `
       <div>
            <ul>
                <item 
                s-for="item,index in todoObj"
                
                title={{item.title}}
                id={{item.id}}
                item={{item}}
                done={{item.done}}
                
                on-checkTodo="checkTodo"
                on-deleteTodo="deleteTodo"
                on-updateTodo="updateTodo"
                />
            
            </ul>
            <div class="todo-footer" s-if={{total}}>
                <div style="border-bottom: 1px solid #E9E9E9">
                    <s-checkbox  on-change="handleAllChange" checked="{=checkAll=}">已完成{{doneTotal}}/全部{{total}}</s-checkbox>
                </div>
            
               <s-button  type="danger" on-click="clearDone" >清除已完成任务</s-button>
            </div>
        </div>
        
    `, initData: function () {
        return {
            // todoObj: JSON.parse(localStorage.getItem('todoObj')) || []
        };

    }, computed: {

        total() {
            return this.data.get('todoObj.length')
        },

        doneTotal() {
            return this.data.get('todoObj').reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        },

        checkAll() {
            return this.data.get('todoObj.length') === this.data.get('todoObj').reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        }

    },

    updated: function () {
        this.watch('todoObj', function (value) {
            localStorage.setItem('todoObj', JSON.stringify(value))
        });
        console.log(this.data.get('todoObj'), 'list数据已修改')
        this.data.set('todoObj', this.data.get('todoObj'))
    },

    // 删除
    deleteTodo(index) {
        this.data.removeAt('todoObj', index);
        localStorage.removeItem( this.data.get('todoObj'), index)
    },

    //单选
    checkTodo(id) {
        this.fire('checkedTodo', id)
    },

    //全选
    handleAllChange(e) {
        this.fire('chooseAllbox', e.target.checked)
    },

    // 清除已完成的数据
    clearDone() {
        this.fire('clearAlldone')
    },

    //更新编辑数据
    updateTodo(item){
        this.data.get('todoObj').forEach((todo)=>{
            if(todo.id === item.id)
                todo.title = item.title
        })
    }

};
