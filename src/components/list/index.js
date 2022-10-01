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
                s-for="item,index in todoobj"
                
                title={{item.title}}
                id={{item.id}}
                item={{item}}
                done={{item.done}}
                
                on-check="checkTodo"
                on-change="deleteTodo"
                on-update="updateTodo"
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
            // todoobj: JSON.parse(localStorage.getItem('todoobj')) || []
        };

    }, computed: {

        total() {
            return this.data.get('todoobj.length')
        },

        doneTotal() {
            return this.data.get('todoobj').reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        },

        checkAll() {
            return this.data.get('todoobj.length') === this.data.get('todoobj').reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        }

    },

    updated: function () {
        this.watch('todoobj', function (value) {
            localStorage.setItem('todoobj', JSON.stringify(value))
            console.log(value, '监视list数据变化')
        });
        console.log(this.data.get('todoobj'), 'list数据已修改')
        this.data.set('todoobj', this.data.get('todoobj'))
    },

    // 删除
    deleteTodo(index) {
        this.data.removeAt('todoobj', index);
        localStorage.removeItem( this.data.get('todoobj'), index)
    },

    //单选
    checkTodo(id) {
        this.fire('change', id)
    },

    //全选
    handleAllChange(e) {
        this.fire('choose', e.target.checked)
    },

    // 清除已完成的数据
    clearDone() {
        this.fire('clear')
    },

    //更新编辑数据
    updateTodo(item){
        this.data.get('todoobj').forEach((todo)=>{
            if(todo.id === item.id)
                todo.title = item.title
        })
    }



};
