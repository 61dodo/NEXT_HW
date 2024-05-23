const todoForm = document.getElementById('todo-form'); // 투두 입력 받는 form 태그
const todoList = document.getElementById('todo-list'); // 투두 항목 나열되는 ul 태그
const submitBtn = document.querySelector('.submitBtn'); // 투두 항목 제출하는 버튼
const content = document.getElementById('content');
const TODO_KEY = 'todoSet'; // 로컬 스토리지 키로 사용될 상수

let todoSet = [];

function submitAddTodo(event) {
    // 입력한 투두 항목을 추가하는 함수
    event.preventDefault(); // 새로고침 방지
    const todoText = content.value;
    const newTodo = {
        text: todoText,
        id: Date.now(),
    };
    todoSet.push(newTodo);
    content.value = '';
    paintTodo(newTodo);
    saveTodos();
}

todoForm.addEventListener('submit', submitAddTodo);

function paintTodo(newTodo) {
    // 등록되어 있는 투두 항목을 화면에 나타내는 함수
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    const button = document.createElement('button');
    span.innerText = newTodo.text;
    button.innerText = 'X';
    button.addEventListener('click', deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    todoSet = todoSet.filter((todoText) => todoText.id !== parseInt(li.id));
    saveTodos();
}

function saveTodos() {
    // 투두 목록의 변경사항을 저장하는 함수
    window.localStorage.setItem(TODO_KEY, JSON.stringify(todoSet));
}

let todoValue = JSON.parse(window.localStorage.getItem(TODO_KEY));
if (todoValue != null) {
    todoSet = todoValue;
    todoSet.forEach((todoText) => {
        paintTodo(todoText);
    });
}
