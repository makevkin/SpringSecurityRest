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
