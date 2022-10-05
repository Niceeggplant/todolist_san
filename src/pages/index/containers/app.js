/**
 * @file 容器组件
 * @author waka
 */

import {Component} from 'san';
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
                <ui-header on-addTodo="addTodo" />
                <ui-list 
                todoObj="{{todoObj}}" 
                on-checkedTodo="checkedTodo"
                on-clearAlldone="clearAlldone"
                on-chooseAllbox="chooseAllbox"
                san-ref="list" />
          </div> 
        </div>
        `
    initData() {
        return {
            todoObj:JSON.parse(localStorage.getItem('todoObj'))|| [
                {id:'0',title:'看vue.js的书',done:true},
                {id:'1',title:'阅读并理解vue源码',done:false},
                {id:'2',title:'看几篇掘金好文章',done:true},
                {id:'3',title:'学习react技术',done:true},
            ],
            newTodos: []
        }
    }

    updated() {
        this.watch('todoObj', function (value) {
            localStorage.setItem('todoObj', JSON.stringify(value))
        });
        this.data.set('todoObj', this.data.get('todoObj'))
    }

    addTodo(e) {
        this.todoObj = [e, ...this.ref('list').data.get('todoObj')]
        this.data.set('todoObj', this.todoObj)
    }

    checkedTodo(id) {
        this.data.get('todoObj').forEach((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done
            }
        })
        this.todoObj = [...this.data.get('todoObj')]
        this.data.set('todoObj', this.todoObj)
    }

    clearAlldone() {
        this.newTodos = this.data.get('todoObj').filter((todoObj) => {
            return !todoObj.done
        })
        this.data.set('todoObj', this.newTodos)
    }

    chooseAllbox(done) {
        console.log(this.ref('list').data.get('todoObj'),'list更新传父数据')
        this.todoObj =this.ref('list').data.get('todoObj').map((todo) => {
            return {...todo, done}
        })
        this.data.set('todoObj', this.todoObj)
    }

}
