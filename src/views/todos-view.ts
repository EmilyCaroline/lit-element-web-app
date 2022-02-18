import {LitElement, html} from 'lit-element';
import {customElement, property} from 'lit-element/decorators.js';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';



const VisibilityFilters = {
    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed'
  };

  @customElement('todos-view')
  class TodoView extends LitElement {
    @property({type: Array})
    todos = []

    @property({type: String})
    name = '';

    @property({type: String})
    filter = '';

    @property({type: String})
    task = '';
  
    constructor() {
      super();
      this.todos = [];
      this.filter = VisibilityFilters.SHOW_ALL;
      this.task = '';
    }
  
    render() {
      return html`
        <style>
          todo-view {
            display: block;
            max-width: 800px;
            margin: 0 auto;
          }
          todo-view .input-layout {
            width: 100%;
            display: flex;
          }
          todo-view .input-layout vaadin-text-field {
            flex: 1;
            margin-right: var(--spacing);
          }
          todo-view .todos-list {
            margin-top: var(--spacing);
          }
          todo-view .visibility-filters {
            margin-top: calc(4 * var(--spacing));
          }
        </style>
        <div class="input-layout" @keyup="${this.shortcutListener}">
          <vaadin-text-field
            placeholder="Task"
            value="${this.task}"
            @change="${this.updateTask}"
          ></vaadin-text-field>
          <vaadin-button theme="primary" @click="${this.addTodo}">
            Add Todo
          </vaadin-button>
        </div>
        <div class="todos-list">
          ${
            this.applyFilter(this.todos).map(todo => html`
                <div class="todo-item">
                  <vaadin-checkbox
                    ?checked="${todo.complete}"
                    @change="${e => this.updateTodoStatus(todo, e.target.checked)
                    }"
                  >
                    ${todo.task}
                  </vaadin-checkbox>
                </div>
              `
            )
          }
        </div>
        <vaadin-radio-group
          class="visibility-filters"
          value="${this.filter}"
          @value-changed="${this.filterChanged}"
        >
          ${
            Object.values(VisibilityFilters).map(
              filter => html`
                <vaadin-radio-button value="${filter}"
                  >${filter}</vaadin-radio-button
                >
              `
            )
          }
        </vaadin-radio-group>
        <vaadin-button @click="${this.clearCompleted}">
          Clear Completed Task
        </vaadin-button>
      `;
    }
  
    addTodo() {
      if (this.task) {
        this.todos = [...this.todos,{task: this.task,complete: false}
        ];
        this.task = '';
      }
    }
  
    shortcutListener(e:Event) {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    }
  
    updateTask(e:Event) {
      this.task = e.target.value;
    }
  
    updateTodoStatus(updatedTodo:Object, complete:Boolean) {
      this.todos = this.todos.map(todo =>
        updatedTodo === todo ? { ...updatedTodo, complete } : todo
      );
    }
  
    filterChanged(e:Event) {

      const target = e.target as HTMLInputElement;
      if (target) console.log(target.value);
      if (target) 
      {
        this.filter = target.value
      }
    }
  
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.complete);
    }
  
    applyFilter(todos:Array) {
      switch (this.filter) {
        case VisibilityFilters.SHOW_ACTIVE:
          return todos.filter(todo => !todo.complete);
        case VisibilityFilters.SHOW_COMPLETED:
          return todos.filter(todo => todo.complete);
        default:
          return todos;
      }
    }
  
    createRenderRoot() {
      return this;
    }
  }