(() => {
    const l = (log, str = ' ') => {
        console.log(log, str);
    }
    l("hello")
    /**
     * https://todomvc.com/ Реализации приложения TODO на различных языках и фреймворках
     */


    // Создаём и возвращаем заголовок приложения
    const createAppTitle = (title) => {
        let appTitle = document.createElement('h2')
        appTitle.classList.add('pt-2', 'text-center', 'mb-3')
        appTitle.innerHTML = title;
        return appTitle;
    }

    // Создаём и возвращаем форму для создания списка дела
    const createTodoItemForm = () => {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let btnWrapper = document.createElement('div');
        let btn = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        btnWrapper.classList.add('input-group-append');
        btn.classList.add('btn', 'btn-primary');
        btn.textContent = 'Добавить дело';

        btnWrapper.append(btn);
        form.append(input);
        form.append(btnWrapper);
        return {
            form,
            input,
            btn
        }
    }

    // Создаём и возвращаем список элементов
    const createTodoList = () => {
        let list = document.createElement('ul');
        list.classList.add('list-group')
        let itemList = document.createElement('li')
        itemList.textContent = 'Изучить JavaScript'
        list.append(itemList)
        return list
    }
    document.addEventListener('DOMContentLoaded', () => {
        const containerToDoApp = document.querySelector('#todo__app');
        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        containerToDoApp.append(todoAppTitle)
        containerToDoApp.append(todoItemForm.form)
        containerToDoApp.append(todoList)
    })

})()