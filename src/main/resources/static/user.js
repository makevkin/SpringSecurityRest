// $(async function () {
//     await loadUser();
// });
//
// async function loadUser() {
//     fetch("http://localhost:8088/api/user")
//         .then(r => r.json())
//         .then(data => {
//             $('#navUsername').append(data.username);
//             let roles = data.roles.map(role => " " + role.name.substring(5));
//             $('#navRoles').append(roles);
//             let user = `$(
//             <tr>
//                 <td>${data.id}</td>
//                 <td>${data.username}</td>
//                 <td>${roles}</td>)`;
//             $('#userPanelBody').append(user);
//         })
//         .catch((error) => {
//             alert(error);
//         });
// }


    fetch("http://localhost:8088/api/admin/1")
        .then(response => response.json())
        .then(data => {console.log(data)
             let p = document.getElementById('userrr')
             p.innerHTML =data.username
        })


