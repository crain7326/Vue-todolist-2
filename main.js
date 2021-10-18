// Header 컴포넌트
const TodoHeader = {
  template: `
    <header>
      <h1>TODO IT!</h1>
    </header>
    `
  };

// Input 컴포넌트
const TodoInput = {
  template: `
    <div class="input_area shadow">
      <input @keyup.enter="sendTodo" v-model="todo" type="text" placeholder="할 일을 입력해주세요" />
      <button @click="sendTodo"><i class="fas fa-plus"></i></button>
    </div>
    `,
    props: ['todo'],
    data(){
      return {

      }
    },
    methods: {
      sendTodo(){
        let thisTodo = this.todo;
        this.$emit('send-todo', thisTodo);
      },
    },
  };

// List 컴포넌트
const TodoList = {
  template: `
    <div class="list_area">
      <ul>
        <li :class="{overline:isOverline}" class="shadow" v-for="(item, i) in todoList" :key="item">
          <span class="checkBtn"><i class="fas fa-check"></i></span>
          <span class="todoText">{{item}}</span>
          <span class="deleteBtn"  @click="clickThis(i)"><i class="far fa-trash-alt"></i></span>
        </li>
      </ul>
    </div>
    `,
    props: ['todoList'],
    methods: {
      clickThis(i){
        this.$emit('delete-todo', i);
      },
    },
    data(){
      return{
        isOverline: false,
      }
    }
  };

// Footer 컴포넌트
const TodoFooter = {
  template: `
    <footer class="shadow">
      <span @click="clearTodo" type="button">전체삭제</span>
    </footer>
    `,
    props: ['todoList'],
    methods: {
      clearTodo(){
        this.$emit('clear-todo');
      }
    },
  };

// app instance
const app = new Vue({
  el: '#app',
  data: {
    todo: '',
    todoList: [],
  },
  components: {
    'todo-header': TodoHeader,
    'todo-input': TodoInput,
    'todo-list': TodoList,
    'todo-footer': TodoFooter
  },
  methods: {
    updataTodo(todo){
      if(todo != ''){
        this.todoList.push(todo);
      }
    },
    clearTodo(){
      this.todoList = [];
    },
    deleteTodo(i){
      this.todoList.splice(i, 1);
    },
  },
})