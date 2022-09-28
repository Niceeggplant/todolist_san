import './index.less';
import Item from '@components/item';
import {Button,Checkbox} from 'santd';
export default {
    components: {
        'item': Item,
        's-button': Button,
        's-checkbox': Checkbox
    },
    template: `
       <div>
            <ul>
                <item 
                s-for="item,index in todoobj"
                title={{item.title}}
                id={{item.id}}
                on-check="checkTodo"
                done={{item.done}}
                on-change="deleteTodo"
                />
            
            </ul>
            <div class="todo-footer" s-if={{total}}>
                <div style="border-bottom: 1px solid #E9E9E9">
                <s-checkbox  on-change="handleAllChange" checked="{{checkAll}}">已完成{{doneTotal}}/全部{{total}}</s-checkbox>
                </div>
            
               <s-button  type="danger" on-click="clearDone" >清除已完成任务</s-button>
            </div>
        </div>
    `,
    initData: function () {
        return {
           
        };
        
    },
    computed: {
        //总数
        total(){
            return this.data.get('todoobj.length')
        },
        doneTotal(){
            return this.data.get('todoobj').reduce((pre,todo)=> pre + (todo.done ? 1 : 0) ,0)
        },
     
    },
    
    updated: function () {
        console.log(this.data.get('todoobj'),'数据已修改')
        this.data.set('todoobj',this.data.get('todoobj'))
    },

    deleteTodo(index){
        this.data.removeAt('todoobj', index);
    },
    checkTodo(id)
    {
     this.fire('change',id)
    },

    handleAllChange(e){
      this.fire('choose',e.target.checked)
    },
    clearDone(){
        this.fire('clear')
    }


};