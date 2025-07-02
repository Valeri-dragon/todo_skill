(() => {

  /**
  * https://todomvc.com/ Реализации приложения TODO на различных языках и фреймворках
  */

  // Создаём и возвращаем заголовок приложения
  const createAppTitle = (title) => {
    let appTitle = document.createElement("h2");
    let pageTitle = document.querySelector('title');
    pageTitle.textContent = `${pageTitle.textContent} || ${title}`;
    appTitle.classList.add("pt-2", "text-center", "mb-3");
    appTitle.innerHTML = title;
    return appTitle;
  };

  // Создаём и возвращаем форму для создания списка дела
  const createTodoItemForm = () => {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let btnWrapper = document.createElement("div");
    let btn = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    btnWrapper.classList.add("input-group-append");
    btn.classList.add("btn", "btn-primary");
    btn.textContent = "Добавить дело";

    btnWrapper.append(btn);
    form.append(input);
    form.append(btnWrapper);
    return {
      form,
      input,
      btn,
    };
  };

  // Создаём и возвращаем список элементов
  const createTodoList = () => {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  };
  let count = 0;
  const createTodoItem = (name) => {
    let itemList = document.createElement("li");
    count++;
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let btnGroup = document.createElement("div");
    let doneBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    itemList.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mb-3"
    );
    itemList.setAttribute("id", `itemList-${count}`);
    itemList.textContent = name;


    btnGroup.classList.add("btn-group", "btn-group-sm");
    doneBtn.classList.add("btn", "btn-success", "mr-2");
    doneBtn.textContent = "Готово";
    deleteBtn.classList.add("btn", "btn-danger");
    deleteBtn.textContent = "Удалить";
    //вкладываем кнопки в отдельный элемент, чтобы он объединились в один блок
    btnGroup.append(doneBtn);
    btnGroup.append(deleteBtn);
    itemList.append(btnGroup);
    //приложению нужен доступ к самому элементу и кнопкам, чтобы обработть события нажатия
    return {
      itemList,
      doneBtn,
      deleteBtn,
    };
  };
  const getItemLocalStorage = (title) => {
    const listToDo = document.querySelector('.list-group');

    for (let i = 0; i < localStorage.length; i++) {

      let key = localStorage.key(i);
      let listArr = JSON.parse(localStorage.getItem(key))

      listArr.forEach(element => {
        let objElem = Object.values(element)
        if (listToDo && key === title) {
          count = parseInt(objElem[0].split(/[-]/).pop())
          listToDo.insertAdjacentHTML('afterbegin', `
          <li class="list-group-item d-flex justify-content-between align-items-center mb-3 ${element.done ? 'list-group-item-success' : ''}" id="${objElem[0]}">${objElem[1]}<div class="btn-group btn-group-sm"><button class="btn btn-success mr-2">Готово</button><button class="btn btn-danger">Удалить</button></div></li>
          `)
        }
      });
    }
  }
  const createTodoApp = (container, title = 'Список дел') => {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let taskList = [];
    taskList = JSON.parse(localStorage.getItem(title)) ? JSON.parse(localStorage.getItem(title)) : []
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку содания дела
    todoItemForm.form.addEventListener("submit", (e) => {
      e.preventDefault();
      // игнорируем создание элемента, если пользователь ничего не ввёл в поле
      if (!todoItemForm.input.value) {
        return;
      }
      let itemList = createTodoItem(todoItemForm.input.value).itemList;
      // создаём и добавляем в список новое дело с названием из поля ввода

      const todoBody = {
        id: itemList.id,
        text: todoItemForm.input.value,
        done: false,
      }
      taskList.push(todoBody)
      todoList.append(itemList);
      localStorage.setItem(title, JSON.stringify(taskList));
      // обнуляем значение в поле, чтобы не пришлось стирть его в ручную
      todoItemForm.input.value = "";
    });
    // возвращает индекс элемента по id
    const getIndexById = (array, id) => {
      const elem = array.map((item) => item.id).indexOf(id) //!== -1
      return elem;
    }
    // удаление дела из списка
    const deleteItemTodoList = (elem) => {
      let taskList = [];
      taskList = JSON.parse(localStorage.getItem(title)) ? JSON.parse(localStorage.getItem(title)) : []
      if (confirm("Вы уверены?")) {
        elem.remove();
        taskList.splice(getIndexById(taskList, elem.id), 1);
        localStorage.setItem(title, JSON.stringify(taskList));
      }
    }
    // если есть список слушаем по каком элементу на этом списке произошёл клик и производим соответсвующие действия, в зависимости от // клика
    if (todoList) {
      //getItemLocalStorage(title)
      todoList.addEventListener("click", (e) => {

        if (
          e.target.parentElement.parentElement.id ===
          e.target.parentElement.parentElement.getAttribute("id") &&
          e.target.classList.contains("btn-danger")
        ) {
          deleteItemTodoList(e.target.parentElement.parentElement);
        }
        if (
          e.target.parentElement.parentElement.id ===
          e.target.parentElement.parentElement.getAttribute("id") &&
          e.target.classList.contains("btn-success")
        ) {
          // изменение значение done
          let itemInArray = taskList[getIndexById(taskList, e.target.parentElement.parentElement.getAttribute("id"))];
          itemInArray.done = !itemInArray.done;

          e.target.parentElement.parentElement.classList.toggle(
            "list-group-item-success"
          );
          localStorage.setItem(title, JSON.stringify(taskList));
        }
      });
      getItemLocalStorage(title)
    }
  }
  window.createTodoApp = createTodoApp;
})();
