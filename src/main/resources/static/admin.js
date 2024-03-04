// const url1 ='http://localhost:8080/api/admin'
//
// async function allUsers() {
//     try {
//         const response = await fetch(url1)
//         const data = await response.json()
//         const username1 = document.getElementById('username1')
//         username1.innerHTML = data.username
//         const role1 = document.getElementById('role1')
//         let roles = data.roles.map(role => " " + role.name.substring(5));
//         role1.innerHTML = roles
//         data.forEach(user => {
//             let users = `$(
//             <tr>
//                 <td>${data.id}</td>
//                 <td>${data.username}</td>
//                 <td>${roles}</td>)`;
//             $('#bodyAllUserTable').append(users);
//         })
//     } catch (e) {
//         console.error(e)
//     }
// }
// allUsers()

// Вкладка User table  //
const url1 ='http://localhost:8080/api/admin'
async function allUsers() {
    try {
        const response = await fetch(url1)
        const data = await response.json()
        data.forEach(user => {
            let users = `$(
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(role => " " + role.name.substring(5))}</td>
                    <td>
                        <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit" 
                                data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                    </td>
                </tr>)`;
                $('#bodyAllUserTable').append(users);
            })
        } catch(e) {
            console.error(e)
        }
}
allUsers()

// Вкладка New User
const url2 ='http://localhost:8080/api/admin/roles'
async function newUser() {
    const response = await fetch(url2)
    const roles = await response.json()
    roles.forEach(role => {
        let element = document.createElement('option');
        element.text = role.name.substring(5);
        element.value = role.id;
        $('#rolesNewUser')[0].appendChild(element);
    })
    //  Выбор роли для user
    const formAddNewUser = document.forms['formAddNewUser'];
    formAddNewUser.addEventListener('submit', function (event) {
        event.preventDefault();
        let rolesNewUser = [];
        for (let i = 0; i < formAddNewUser.roles.options.length; i++) {
            if (formAddNewUser.roles.options[i].selected) rolesNewUser.push({
                id: formAddNewUser.roles.options[i].value,
                name: formAddNewUser.roles.options[i].name
            })
        }

        fetch('http://localhost:8088/api/admin/addUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: formAddNewUser.username.value,
                password: formAddNewUser.password.value,
                roles: rolesNewUser
            })
        }).then(() => {
            formAddNewUser.reset();
            allUsers();
            $('#allUsersTable').click();
        })
            .catch((error) => {
                alert(error);
            })
    })

}

// Получаем пользователя по id
async function getUser(id) {
    let url = 'http://localhost:8088/api/admin/' + id;
    let response = await fetch(url);
    return await response.json();
}

//  Модальное окно удаления пользователя

