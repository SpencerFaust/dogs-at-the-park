$(document).ready(function() {
    console.log('JQ initialized');
    $('#newDogButton').on('click', onNewDogSubmition);
    $('#fetchButton').on('click', newGameOfFetch);
    dogNameList();
    getFetchTable();
});

console.log('JS initialized');

function onNewDogSubmition() {
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

function newGameOfFetch () {
    $.ajax({
        url: '/newGameOfFetch',
        method: 'POST',
        data: {
            firstDog: $('#firstDog').val(),
            scoreOne: $('#firstDogFetched').val(),
            secondDog: $('#secondDog').val(),
            scoreTwo: $('#secondDogFetched').val(),
        }
    }).then(function() {
        getFetchTable();
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

function getFetchTable() {
    $.ajax({
        url: '/fetchTableRequest',
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        updateFetchTable(response);
    })
}

function updateDogList(dogs) {
    $('#listOfDogNames').empty();
    $('.dogSelection').empty();
    $('#newDogName').val('');
    $('.dogSelection').append(`<option value="" disabled selected>Select Dog</option>`);
    for (i = 0; i < dogs.length; i++) {
        $('#listOfDogNames').append(`<li>${dogs[i].name}</li>`)
        $('.dogSelection').append(`<option value="${dogs[i].name}">${dogs[i].name}</option>`)
    }
};

function updateFetchTable(fetchTable) {
    $('#fetchTable').empty();
    $('.ballsFetchedInput').val('');
    let winner = '';
    for (i = 0; i < fetchTable.length; i++) {
        if (fetchTable[i].scoreOne > fetchTable[i].scoreTwo) {
           winner = fetchTable[i].firstDog;
        } else if (fetchTable[i].scoreOne < fetchTable[i].scoreTwo) {
            winner = fetchTable[i].secondDog;
        } else {
            winner = 'Tie Game!';
        }
        $('#fetchTable').append(`
        <tr>
            <td>${fetchTable[i].firstDog}</td>
            <td>${fetchTable[i].scoreOne}</td>
            <td>${fetchTable[i].secondDog}</td>
            <td>${fetchTable[i].scoreTwo}</td>
            <td>${winner}</td>
        <tr>`); 
        }   
    };

