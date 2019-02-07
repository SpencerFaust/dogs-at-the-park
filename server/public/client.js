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
            name: newDogName
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
    dogs.forEach(function(dog) {
        $('#listOfDogNames').append(`<li>${dog.name}</li>`);
    })
}