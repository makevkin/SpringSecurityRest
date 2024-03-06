$(async function () {
    await  allUsers()
    await newUser()
    deleteUser()
    editUser()
})
const url ='http://localhost:8080/api/admin'
// Вкладка User table  //
async function allUsers() {
    const table = $('#bodyAllUserTable')
    table.empty()
    try {
        const response = await fetch(url)
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
                </tr>)`
                $('#bodyAllUserTable').append(users)
            })
        } catch(e) {
            console.error(e)
        }
}

// Вкладка New User
async function newUser() {
    try {   // получение списка ролей
        const response = await fetch(url+'/roles')
        const roles = await response.json()
        roles.forEach(role => {
            let element = document.createElement('option')
            element.text = role.name
            element.value = role.id
            $('#rolesNewUser')[0].appendChild(element)
        })
        //  Выбор роли для user
        const formAddNewUser = document.forms['formAddNewUser']
        formAddNewUser.addEventListener('submit', function (event) {
            event.preventDefault()
            let rolesNewUser = []
            for (let i = 0; i < formAddNewUser.roles.options.length; i++) {
                if (formAddNewUser.roles.options[i].selected) {
                    rolesNewUser.push({
                    id: formAddNewUser.roles.options[i].value,
                    name: formAddNewUser.roles.options[i].text
                })
                break
                }
            }
            fetch(url+'/addUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: formAddNewUser.username.value,
                    password: formAddNewUser.password.value,
                    roles: rolesNewUser
                })
            }).then(() => {
                formAddNewUser.reset()
                allUsers()
                $('#allUsersTable').click()
            })
        })
    } catch(e) {
            console.error(e)
        }
}


// Получаем пользователя по id
async function getUser(id) {
    let response = await fetch(url + '/' + id)
    return await response.json()
}

//   Удаление пользователя
function deleteUser() {
    try {
        const formDelete = document.forms["formDelete"]
        formDelete.addEventListener("submit", function (event) {
            event.preventDefault()
            fetch(url + '/deleteUser/' + formDelete.id.value, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    $('#deleteFormCloseButton').click()
                    allUsers()
                })
        })
    } catch (e) {
        console.error(e)
    }
}
// открываем модальное окно удаления с нужным пользователем
$(document).ready(function () {
    $('#delete').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget)
        const id = button.data("id")
        viewDeleteModal(id)
    })
})

async function viewDeleteModal(id) {
    let userDelete = await getUser(id)
    let formDelete = document.forms["formDelete"]
    formDelete.id.value = userDelete.id
    formDelete.username.value = userDelete.username

    $('#deleteRolesUser').empty()
    try {
        const response = await fetch(url + '/roles')
        const roles = await response.json()
        roles.forEach(role => {
            let selectedRole = false
            for (let i = 0; i < userDelete.roles.length; i++) {
                if (userDelete.roles[i].name === role.name) {
                    selectedRole = true
                    break
                }
            }
            let element = document.createElement("option")
            element.text = role.name.substring(5)
            element.value = role.id
            if (selectedRole) element.selected = true
            $('#deleteRolesUser')[0].appendChild(element)
        })
    }catch (e) {
        console.error(e)
    }
}

//  редактирование пользователя
function editUser() {
    const editForm = document.forms["formEdit"]
    editForm.addEventListener("submit", function (event) {
        event.preventDefault()
        let editUserRoles = []
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected) {
                editUserRoles.push({
                    id: editForm.roles.options[i].value,
                    name: editForm.roles.options[i].name

                })
            }
        }

        fetch(url + '/update/' + editForm.id.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                username: editForm.username.value,
                password: editForm.password.value,
                roles: editUserRoles
            })
        }).then(() => {
            $('#editFormCloseButton').click()
            allUsers()
        })
            .catch((error) => {
                alert(error)
            })
    })
}

$(document).ready(function () {
    $('#edit').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget)
        const id = button.data("id")
        viewEditModal(id)
    })
})

async function viewEditModal(id) {
    let userEdit = await getUser(id)
    let form = document.forms["formEdit"]
    form.id.value = userEdit.id
    form.username.value = userEdit.username
    form.password.value = userEdit.password

    $('#editRolesUser').empty()
    try {
        const response = await fetch(url + '/roles')
        const roles = await response.json()
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userEdit.roles.length; i++) {
                    if (userEdit.roles[i].name === role.name) {
                        selectedRole = true
                        break
                    }
                }
                let element = document.createElement("option")
                element.text = role.name.substring(5)
                element.value = role.id
                if (selectedRole) element.selected = true
                $('#editRolesUser')[0].appendChild(element)

            })
         }
        catch(e) {
            console.error(e)
        }
}