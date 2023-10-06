class UserService {
    static _getAll() {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [
            { id: 1, name: 'Max', age: 5 }
        ];
    }
    static create(data) {
        const users = this._getAll();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({ id, ...data });
        this._setToStorage(users);
    }
    static render() {
        const userContainer = document.querySelector('#userContainer');
        userContainer.innerHTML = '';
        const users = this._getAll();
        const usersHtmlContent = users.map(user => {
            const div = document.createElement('div');
            const button = document.createElement('button');
            button.onclick = () => {
                this.deleteById(user.id);
            };
            button.innerText = 'delete';
            div.innerText = `${user.id}) ${user.name} -- ${user.age}`;
            div.appendChild(button);
            return div;
        });
        if (usersHtmlContent.length) {
            userContainer.append(...usersHtmlContent);
        }
        else {
            userContainer.innerText = 'Users not found!';
        }
    }
    static _setToStorage(data) {
        localStorage.setItem(this._usersKey, JSON.stringify(data));
        this.render();
    }
    static deleteById(id) {
        const users = this._getAll();
        const index = users.findIndex(user => user.id == id);
        users.splice(index, 1);
        this._setToStorage(users);
    }
}
UserService._usersKey = 'users';
UserService.render();
const form = document.forms.namedItem('userForm');
form.onsubmit = (e) => {
    e.preventDefault();
    const { name: { value: name }, age: { value: age } } = form;
    UserService.create({ name, age: +age });
    form.reset();
};
//# sourceMappingURL=index.js.map