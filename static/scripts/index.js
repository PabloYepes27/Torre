let user_data = {}
let job_data = {}


function getUserData() {
    var username = $('#input_username').val()
    console.log(username)
    
    const proxy_url = "https://cors-anywhere.herokuapp.com/"
    $.get(proxy_url + 'https://bio.torre.co/api/bios/' + username, function (data) {
        console.log(data['strengths'])
        user_data[username] = data
    },'json').fail(function (data) {
        console.log(data)
    })
}

function getPositionData() {
    var position = $('#input_position').val()
    console.log(position)

    $.get('https://torre.co/api/opportunities/' + position, function (data) {
        console.log(data)
        job_data['objective'] = data['strengths']
    },'json').fail(function (data) {
        console.log(data)
    })
}

function watchUser() {
    console.log(user_data)
}

function compareUsers() {
    for (const user in user_data.values()) {
        console.log(user)
        
    }
}