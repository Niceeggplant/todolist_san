/**
 * @file 容器组件
 * @author waka
 */

import { Component } from 'san';
import './app.less';

import 'santd/dist/santd.css';
import Header from '@components/header';
import List from '@components/list';

export default class App extends Component {

    static components = {
        'ui-header': Header,
        'ui-list': List
    }

    static template = `
        <div class="todo-container">
          <div class="todo-content">
          <ui-header on-change="addTodo" />
          <ui-list 
          todoobj="{{todoobj}}" 
          on-change="checkedTodo"
          on-clear="clearAlldone"
          on-choose="chooseAllbox"
                 />
           
          </div> 
        </div>
        `
    

    initData() {
        return {
            todoobj:[
                {id:'001',title:'抽烟',done:true},
                {id:'002',title:'喝酒',done:false},
                {id:'003',title:'开车',done:true}
            ],
            newTodos:[]
        };
    }

    addTodo(e){
        this.todoobj = [e,...this.data.get('todoobj')]
        this.data.set('todoobj',this.todoobj)
        console.log(this.todoobj ,'new')
    }

    checkedTodo(id)
    {
       this.data.get('todoobj').forEach((todo)=>{
            if(todo.id === id) 
            {
                todo.done = !todo.done
            }
        })
        this.todoobj=[...this.data.get('todoobj')]
        this.data.set('todoobj',this.todoobj)
        console.log(this.todoobj ,'new1')
    }

    clearAlldone(){
        this.newTodos=this.data.get('todoobj').filter((todoObj)=>{
			return !todoObj.done
		})
        this.data.set('todoobj',this.newTodos)
        console.log(this.newTodos ,'清除')
    }

    chooseAllbox(done)
    {
        this.todoobj =this.data.get('todoobj').map((todoObj)=>{
          return {...todoObj,done}
        })
        this.data.set('todoobj',this.todoobj )
        console.log(  this.todoobj,'全选')
    }
  
   

}
