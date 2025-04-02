let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function Todos() {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';

            todos.forEach((todo, index) => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                        onclick="toggleTodo(${index})">
                    <span class="todo-text" style="${todo.editing ? 'display: none' : ''}">${todo.text}</span>
                    <input type="text" class="edit-input" value="${todo.text}" 
                        style="${todo.editing ? '' : 'display: none'}">
                    <button class="edit-btn" onclick="editTodo(${index})">
                        ${todo.editing ? 'Save' : 'Edit'}
                    </button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
                `;

                todoList.appendChild(li);
            });
        }

        function addTodo() {
            const input = document.getElementById('todo-input');
            const text = input.value.trim();

            if (text) {
                todos.push({ text, completed: false, editing: false });
                saveTodos();
                Todos();
                input.value = '';
            }
        }

        document.getElementById('todo-input').addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                addTodo();
            }
        });

        function toggleTodo(index) {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            Todos();
        }

        function editTodo(index) {
            if (todos[index].editing) {
                const inputField = document.querySelectorAll('.edit-input')[index];
                const newText = inputField.value.trim();

                if (newText) {
                    todos[index].text = newText;
                }
            }
            

            todos[index].editing = !todos[index].editing;
            saveTodos();
            Todos();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            saveTodos();
            Todos();
        }

        Todos();