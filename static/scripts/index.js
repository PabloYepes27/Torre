let user_data = {}
let job_data = {}
let comparison = {}
let users = []
let percentages = {}
let total_strengths = 0

function getUserData() {
    var username = $('#input_username').val()
    users.push(username)
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
        
        document.getElementById("participants").innerHTML =  `${users}`;
    },'json').fail(function (data) {
        console.log(data)
    })
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        console.log(`${myArray[i]['code']} <==> ${nameKey}`)
        if (myArray[i]['code'] === nameKey) {
            return myArray[i]['content'];
        }
    }
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
        document.getElementById("info_job").innerHTML = `<h4>${data['objective']}<h4>`;
        document.getElementById("job_description").innerHTML = `${search("requirements", data['details'])}`;
    },'json').fail(function (data) {
        console.log(data)
    })

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
    let total_strengths = job_data['objective'].length
    let winner = ""
    for (const key in comparison) {
        // console.log(`key ${key}`)
        percentages[key] = `${((comparison[key]/total_strengths)*100).toFixed(1)}%`
        // console.log(JSON.stringify(percentages))
        let point = 0
        if (comparison[key] > point) {
            point = comparison[key]
            winner = key
        }
    }
    // console.log(winner)
    if (winner != "") {
        document.getElementById("selected").innerHTML = `<h3> The candidate who matches the most is </h3> <h1>${winner} </h1>`;
    } else {
        document.getElementById("selected").innerHTML = `<h3> There are no compatible candidates </h3>`;
    }
    // console.log(`${percentages}`)

    document.getElementById("ranges").innerHTML = `${JSON.stringify(percentages)}`;

}