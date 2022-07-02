// Task #1. Get Posts

let dashboard1 = <HTMLElement>document.querySelector("section[name='section1']");
let buttonGet = <HTMLButtonElement>document.querySelector("form[name='form1'] button[name='get']");
let buttonRemove = <HTMLButtonElement>document.querySelector("form[name='form1'] button[name='remove']");

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getPosts<T> (url: string): Promise<T|undefined> {
    try {
        const res = await fetch(url);
        const json = await res.json();
        //console.log(json);
        return json as Promise<T>;
    } catch (e) {
        alert(e);
    }
}

function displayPosts<T extends Post[]> (data: Promise<T>) {
    data.then((value) => {
        let itemDiv: HTMLElement;
        for ( let i = 0; i < value.length; i++ ) {
            itemDiv = document.createElement("div");
            itemDiv.innerHTML="<p>"+value[i].title+"</p>";
            dashboard1.append(itemDiv);
        }

        }
    )
    .catch((error) => console.log(error.message));
}

buttonGet.addEventListener("click", event => {
    event.preventDefault();
    let posts = getPosts<Post[]>("https://jsonplaceholder.typicode.com/posts");
    if (posts !== undefined) {
        displayPosts(posts);
        buttonGet.disabled = true;
        buttonRemove.disabled = false;
    } else {
        alert("Error: No JSON data.");
    }
}, false);

buttonRemove.addEventListener("click", event => {
    event.preventDefault();
    dashboard1.innerHTML = "";
    buttonGet.disabled = false;
    buttonRemove.disabled = true;
}, false);

// Task #2. Update Object in Array

let dashboard2 = <HTMLElement>document.querySelector("section[name='section2']");
let newID = <HTMLInputElement>document.querySelector("form[name='form2'] input[name='id']");
let newName = <HTMLInputElement>document.querySelector("form[name='form2'] input[name='new_name']");
let buttonUpdate = <HTMLButtonElement>document.querySelector("form[name='form2'] button[name='update']");

type User = {
    id: number;
    name: string;
}

let userList: User[] = [
    {'id': 1, 'name': 'Dima'},
    {'id': 2, 'name': 'Pete'},
    {'id': 3, 'name': 'Alex'},
    {'id': 4, 'name': 'Ivan'},
    {'id': 5, 'name': 'Vins'},
];


function updateObjectInArray<ObjectShape extends User>(initialArray: ObjectShape[], key: string, value: number, patch: Partial<ObjectShape>) {
    let newArray = initialArray.slice();
    if (value <= newArray.length) {
        for ( let i = 0; i < newArray.length; i++ ) {
            if (newArray[i].id === value) {
                newArray[i].name = patch.name;
            }
        }
        dashboard2.innerHTML = "";
        displayArray(newArray);
    } else {
        alert ("Incorrect ID.");
    }
}

function displayArray<ObjectShape extends User>(arr: ObjectShape[]): void {
    let itemDiv, itemP: Element;
    for ( let i = 0; i < arr.length; i++ ) {
        itemDiv = document.createElement("div");
        itemDiv.innerHTML="<p>ID: "+arr[i].id + "; Name: " + arr[i].name+"</p>";
        dashboard2.append(itemDiv);
    }
}

buttonUpdate.addEventListener("click", event => {
    let id = Number(newID.value.trim());
    let name = newName.value.trim();
    if (!id || !name) {
        alert("Please specify both values.")
    } else {
        event.preventDefault();
        updateObjectInArray<User> (userList, "id", id, {'name': name});
    }
}, false);

displayArray(userList);
