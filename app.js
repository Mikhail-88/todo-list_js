'use strict';

const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: false,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: false,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
  
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': 'silver',
      '--header-text-color': '#212529',
      '--default-btn-bg': 'silver',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
  const listContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');
  const info = document.querySelector('.card-info');

  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmit);
  listContainer.addEventListener('click', onDelete);
  themeSelect.addEventListener('change', onThemeSelect);
  listContainer.addEventListener('click', onCompleted);

  function renderAllTasks(taskList) {
    if (!taskList) {
      return;
    }

    const fragment = document.createDocumentFragment();

    Object.values(taskList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });

    listContainer.appendChild(fragment);
    updateInfo();
  }

  function updateInfo() {
    const unfinishedTask = Object.values(objOfTasks).filter(task => !task.completed);

    info.innerHTML = `Tasks left ${unfinishedTask.length} of ${Object.values(objOfTasks).length}`;
  }

  function listItemTemplate({ _id, title, body} = {}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');

    const lableBtn = document.createElement('label');
    lableBtn.classList.add('btn', 'btn-secondary');

    const complideBtn = document.createElement('input');
    complideBtn.classList.add('checkbox');
    complideBtn.setAttribute('type', 'checkbox');
    // complideBtn.setAttribute('autocomplete', 'off');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    lableBtn.appendChild(complideBtn);
    li.appendChild(span);
    li.appendChild(lableBtn);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }

  function onFormSubmit(e) {
    e.preventDefault();
  
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Please, enter the text in the indicated fields');

      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);

    listContainer.insertAdjacentElement('afterbegin', listItem);

    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;
    updateInfo();

    return { ...newTask };
  }

  function isDeleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Delete task: ${title}?`);

    if (!isConfirm) {
      return isConfirm;
    }

    delete objOfTasks[id];
    updateInfo();

    return isConfirm;
  }

  function deleteTask(confirmed, element) {
    if (!confirmed) {
      return;
    }

    element.remove();
  }

  function onDelete({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = isDeleteTask(id);

      deleteTask(confirmed, parent);
    }
  }

  function onThemeSelect(e) {
    const selectedTheme = themeSelect.value;
    const isComfirmed = confirm(`Change application theme: ${selectedTheme}?`);

    if (!isComfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }

    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem('app_theme', selectedTheme);
  }

  function setTheme(name) {
    const selectedThemeObj = themes[name];

    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  function onCompleted({ target }) {
    if (target.classList.contains('checkbox')) {
      const parent = target.closest('[data-task-id]');
      parent.classList.toggle('active-bg');
      const id = parent.dataset.taskId;

      objOfTasks[id].completed = target.checked;

      updateInfo();
    }
  }

})(tasks);
