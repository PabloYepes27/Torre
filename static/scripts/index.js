let user_data = {}
let job_data = {}
let comparison = {}

function getUserData() {
    var username = $('#input_username').val()
    console.log(username)
    
    const proxy_url = "https://cors-anywhere.herokuapp.com/"
    $.get(proxy_url + 'https://bio.torre.co/api/bios/' + username, function (data) {
        // console.log(data['strengths'])
        var strengths = []
        for (const strength in data['strengths']) {
            const name = data['strengths'][strength]
            strengths.push(name['name'])
        }
        user_data[username] = strengths
    },'json').fail(function (data) {
        console.log(data)
    })
}

function getPositionData() {
    var position = $('#input_position').val()
    console.log(position)

    $.get('https://torre.co/api/opportunities/' + position, function (data) {
        console.log(data)
        var strengths = []
        for (const strength in data['strengths']) {
            const name = data['strengths'][strength]
            strengths.push(name['name'])
        }
        job_data['objective'] = strengths
    },'json').fail(function (data) {
        console.log(data)
    })
}

// debug
function watchUser() {
    console.log(user_data)
}


function compareUsers() {
    for (let user in user_data) {
        let count = 0
        user_data[user].map((strength, index) => {
            for (let str in job_data) {
                job_data[str].map((stren) => {
                    // console.log(`${stren} <==> ${strength}`)
                    if (stren === strength) {
                        count++
                    }
                })
            }
        })
        comparison[user] = count
    }
    let winner = ""
    for (const key in comparison) {
        let point = 0
        if (comparison[key] > point) {
            point = comparison[key]
            winner = key
        }
    }
    console.log(winner)
    // console.log(Object.keys(comparison).find(key => comparison[key] === (Object.values(comparison)).rsort()[0]))
    // // console.log(Object.values(comparison).rsort()[0])
    // // console.log(comparison)

}