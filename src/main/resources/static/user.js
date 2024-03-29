$(async function() {
    await userInfoId()
})

const url ='http://localhost:8080/api/user'
async function userInfoId() {
    try {
        const resp = await fetch(url)
        const data = await resp.json()
        const p = document.getElementById('username')
        p.innerHTML = data.username
        const p1 = document.getElementById('role')
        let roles = data.roles.map(role => " " + role.name.substring(5));
        p1.innerHTML = roles
        $('#username1').append(data.username)
        let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${roles}</td>)`;
        $('#userInfo').append(user);
    } catch (e) {
        console.error(e)
    }
}

