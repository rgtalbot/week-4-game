$(document).ready(function() {

    var coders = new Array(4);
    coders[0] = new coder('Ryan', 'ryan.jpg', 200, 22, 59);
    coders[1] = new coder('Brent', 'brent.jpg', 200, 20, 35);
    coders[2] = new coder('George', 'george.jpg', 200, 18, 24);
    coders[3] = new coder('Bob', 'bob.jpg', 200, 16, 23);

    var player = -1;
    var opponent = -1;
    var jrDev = new Array;
    var wins = 0;


    function coder(name, image, skill, codeSkill, debugSkill) {
        this.name = name;
        this.image = image;
        this.skill = Math.floor(Math.random() * (250-150+1))+150;
        this.codeSkill = Math.floor(Math.random() * (30-20+1))+20;
        this.debugSkill = Math.floor(Math.random() * (50-20+1))+20;
        this.status = 'available';
    }


    $('button').hide();


    function showCoderList() {
        $('#coders').empty();
        for (var i = 0; i < coders.length; i++) {
            if (coders[i].status == 'available') {
                var $newCoder = $('<div>')
                    .addClass('coder col-sm-3')
                    .attr('coder-id', i)
                    .html('<span class="coderName"' + coders[i].name + '</span><img src="assets/images/' + coders[i].image + '"><span class="points">' + coders[i].skill + ' Skill</span>');
                $('#coders').append($newCoder);
            }
        }
        $('.coder').on('click', function() {
            selectCoder(this.getAttribute('coder-id'));
        });
    }

    function showCoder(index) {
        var $newPlayer = $('<div>')
            .addClass('player col-sm-3 col-sm-offset-1')
            .html('<span class="coderName">' + coders[index].name + coders[index].skill + '</span><img src="assets/images/' + coders[index].image + '"><span class="points">' + 'Code ' + coders[index].codeSkill + ' | Debug ' + coders[index].debugSkill + '</span>');
        $('#player').html($newPlayer);
        $('#player-header').html('Player');
        $('#versus').html('<img src="assets/images/vs.png">');
    }

    function showOpponent(index) {
        var $newOpponent = $('<div>')
            .addClass('opponent col-sm-3 col-sm-offset-1')
            .html('<span class="coderName">' + coders[index].name + coders[index].skill + '</span><img src="assets/images/' + coders[index].image + '"><span class="points">' + 'Code ' + coders[index].codeSkill + ' | Debug ' + coders[index].debugSkill + '</span>');
        $('#opponent').html($newOpponent);
        $('#opponent-header').html('Opponent');
        $('#versus').html('<img src="assets/images/go.png">');
    }

    function race() {
        coders[opponent].skill = coders[opponent].skill - coders[player].codeSkill;
        coders[player].skill = coders[player].skill - coders[opponent].debugSkill;
        if (coders[opponent].skill < 1) {
            //round over, player wins
            coders[opponent].skill = 0;
            coders[opponent].status = 'lost';
            nextRound();
        } else if (coders[player].skill < 1) {
            //opponent wins
            coders[player].skill = 0;
            $('#race').html('<h2>GAME OVER</h2>');
            $('#opponents').empty();
            $('button').show();
        }
        coders[player].codeSkill = coders[player].codeSkill + 3;
        refreshDisplay();
    }

    function nextRound() {
        jrDev.push(opponent);
        wins++;
        if (wins > 2) {
            $('#race').html('<h2>Winner! <span class="coderName">' + coders[player].name + '</span><img src="assets/images/' + coders[player].image + '"></h2>');
            $('#opponents').empty();
            $('button').show();
        } else {
            opponent = -1;
            coders[player].skill = 200;
            $('#opponent').empty();
            refreshDisplay();
            $('#lost').empty();
            showJrDev();
        }
    }

    function refreshDisplay() {
        showCoderList();
        if (player != -1) {
            showCoder(player);
            if (jrDev.length > 1) {
                $('#action').html("Final Battle");
            } else if (jrDev.length > 0) {
                $('#action').html("Select your next opponent");
            } else {
                $('#action').html("Select your opponent");
            }
        }
        if (opponent != -1) {
            showOpponent(opponent);
            if (jrDev.length < 2) {
                $('#action').html("START CODING!");
            }
        }
    }

    function showJrDev() {
        for (var i = 0; i < coders.length; i++) {
            $('#lost').empty;
            if (coders[i].status == 'lost') {
                var $lostDriver = $('<div>')
                    .addClass('lostDriver col-sm-3 ')
                    .html('<span class="coderName">' + coders[i].name + '</span><img src="assets/images/' + coders[i].image + '"><span> </span>');
                $('#lost').append($lostDriver);
            }
        }
    }

    function selectCoder(index) {
        if (player === -1 && opponent === -1) {
            player = index;
            coders[index].status = 'player';
        } else if (opponent === -1) {
            opponent = index;
            coders[index].status = 'opponent';
        }
        refreshDisplay();
    }

    $('#versus').on('click', function() {
        if (player > -1 && opponent > -1) {
            race();
        }
    });

    $('#button').on('click', function() {
        location.reload();
    });

    showCoderList();



});
