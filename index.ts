// const asd = (arrOfNums: string) => {
//     console.log(arrOfNums);
// }

// interface IUser<T> {
//     id?: number,
//     name: string,
//     age: number,
//     work: T[]
// }
//
// const user: IUser<number> = {name: 'max', age: 5, work: [1, 3, 4]};
// const user2: Partial<IUser<string>> = {id: 1, work: ['1', '3']};

// interface IUserTools {
//     sayHello(): void;
// }
//
// class User implements IUserTools {
//     private name: string
//     age: number
//
//     constructor(name: string, age: number) {
//         this.age = age;
//         this.name = name;
//     }
//
//     getName(): string {
//         return this.name;
//     }
//
//     sayHello(): void {
//         console.log('hello');
//     }
// }
//
// const user = new User('max', 12);
// console.log(user.getName(), user.age);
// user.sayHello();

interface IUser {
    id: number;
    name: string;
    age: number;
}

type IUserForm = Pick<IUser, 'name' | 'age'>

class UserService {
    private static readonly _usersKey = 'users';

    private static _getAll(): IUser[] {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [
            {id: 1, name: 'Max', age: 5}
        ];
    }

    static create(data: IUserForm): void {
        const users = this._getAll();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({id, ...data});
        this._setToStorage(users);
    }

    static render(): void {
        const userContainer = document.querySelector('#userContainer') as HTMLDivElement;
        userContainer.innerHTML = '';
        const users = this._getAll();

        const usersHtmlContent = users.map(user => {
            const div = document.createElement('div');
            const button = document.createElement('button');
            button.onclick = () => {
                this.deleteById(user.id);
            }
            button.innerText = 'delete';
            div.innerText = `${user.id}) ${user.name} -- ${user.age}`;
            div.appendChild(button);
            return div;
        });

        if (usersHtmlContent.length) {
            userContainer.append(...usersHtmlContent);
        } else {
            userContainer.innerText = 'Users not found!';
        }
    }

    private static _setToStorage(data: IUser[]): void {
        localStorage.setItem(this._usersKey, JSON.stringify(data));
        this.render();
    }

    static deleteById(id: number): void {
        const users = this._getAll();
        const index = users.findIndex(user => user.id == id);
        users.splice(index, 1);
        this._setToStorage(users);
    }
}

UserService.render();

interface IInputs {
    name: HTMLInputElement;
    age: HTMLInputElement;
}

const form = document.forms.namedItem('userForm') as HTMLFormElement;
form.onsubmit = (e) => {
    e.preventDefault();
    // const {name, age} = form as any as IInputs;
    const {name: {value: name}, age: {value: age}} = form as any as Record<keyof IUserForm, HTMLInputElement>

    UserService.create({name, age: +age});
    form.reset();
}
