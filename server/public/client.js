$(document).ready(function() {
    console.log('JQ initialized');
    $('#newDogButton').on('click', onNewDogSubmition);
    dogNameList();
});

console.log('JS initialized');

function onNewDogSubmition() {
    let newDogName = $('#newDogName').val();
    $.ajax({
        url: '/newDog',
        method: 'POST',
        data: {
            name: $('#newDogName').val()
        }
    }).then(function() {
        dogNameList();
    })
};

function dogNameList() {
    $.ajax({
        url: '/getNames',
        method: 'GET'
    }).then(function(response) {
        updateDogList(response);
    })
};

function updateDogList(dogs) {
    $('#listOfDogNames').empty();
    for (i = 0; i < dogs.length; i++) {
        $('#listOfDogNames').append(`<li>${dogs[i].name}</li>`)
    }
};