//Initiating everything
$('.login-data-invalid').hide();
$('#song-search-icon').hide();
$('.main-music-player').hide();
$('.song-name-search-input').hide();

//hiding input when search icon appered
var currentStatusOfSearchIcon = false;

$('#song-search-icon').on('click' , function(){
    if(currentStatusOfSearchIcon == false){
        $('#song-search-icon').removeClass('fa-search').addClass('fa-arrow-right');
        $('.song-name-search-input').show();
        currentStatusOfSearchIcon = true;
    } else if(currentStatusOfSearchIcon == true){
        $('#song-search-icon').removeClass('fa-arrow-right').addClass('fa-search');
        $('.song-name-search-input').hide();
        currentStatusOfSearchIcon = false;
    }
});
    
//current login box
$('#login-button').on('click' , function(){
    if($('.login-username-input').val() == "test@acadview.com" && 
       $('.login-password-input').val() == "JavascriptRocks"){
        //loged in
        $('.log-in').hide();
        $('#song-search-icon').show();
        $('.main-music-player').show();
        $('body').css('height' , '80%');
    } else {
        $('.login-data-invalid').show();
        $('.login-data-invalid').text("nahi hua");
    }
});
    
// Temporary code to bypass login page
$('.log-in').hide();
$('#song-search-icon').show();
$('.main-music-player').show();
$('body').css('height' , '80%');


//song object
var songs = [
	{
        'name': 'Badri Ki Dulhania (Title Track)',
        'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
        'album': 'Badrinath ki Dulhania',
        'duration': '2:56',
        'fileName': 'song1.mp3',
        'image': 'song1.jpg'
    },
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': 'song2.mp3',
        'image': 'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': 'song3.mp3',
        'image': 'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
        'image': 'song4.jpg'
    }
];

function fancyTimeFormat(time){
    
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


window.onload = function(){        
    setInterval(function(){

    //main music box timing configure
    $('.current-time').text(fancyTimeFormat(Math.floor($('audio')[0].currentTime)));
    $('.current-duration').text(fancyTimeFormat(Math.floor($('audio')[0].duration)));
    if($('audio')[0].duration == NaN){
        $('.current-duration').text('0:00');
    };
            
    $('audio').on('timeupdate' , function(){
        $('#current-song-seekbar').attr( "value" , ($('audio')[0].currentTime / $('audio')[0].duration) * 100);
        });
    } , 1000);

    changeCurrentSongDetails(songs[0]);

    for(var i = 0; i < songs.length; i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-duration').text(obj.duration);
        addSongNameClickEvent(obj, i + 1);
    }
        
    //searchbar paging
    oTable = $('#songs').DataTable({
	   paging: false
    });
        
    //for input search upar wala
    $('.song-name-search-input').keyup(function(){
        oTable.search($(this).val()).draw() ;
    });
                
    ///spacebar se control krne ka
    $('body').on('keypress', function(event) {
        if (event.keyCode == 32 && event.target.tagName != "INPUT") {
            toggleSong();
        }
    });
        
    /**  
    * FOnt Awesome wale icon ke Controls
    *
    */
        
    //shuffle
    $('#shuffle').on('click' , function(){
        var randomSongObj = songs[Math.floor(Math.random() * 3) + 1];
        $('audio')[0].src = randomSongObj.fileName; 
        changeCurrentSongDetails(randomSongObj);
        $('audio')[0].play();
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        $('.play-icon').css('color' , '#30B55C');
    });

    ///song backward
    $('#back-a-little-bit').on('click' ,function(){
        $('audio')[0].currentTime -= 10;
    });

    //forwqard
    $('#forward-a-little-bit').on('click' ,function(){
        $('audio')[0].currentTime += 10;
    });

    //play or pause
    $('.play-icon').on('click' , function(){
        toggleSong();
    });
        
    //reapeat
    $('#song-repeat').on('click' ,function(){
        if($('audio')[0].loop == false){
            $('audio')[0].loop = true;
            $('#song-repeat').css('color' , '#30B55C');
        } else{
            $('audio')[0].loop = false;
            $('#song-repeat').css('color' , 'white');
        }
    });
}
    
function toggleSong(){
	var song = document.querySelector('audio'); 
	if(song.paused) {
        song.play();	
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        $('.play-icon').css('color' , '#30B55C');
    } else {
        song.pause();
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        $('.play-icon').css('color' , 'white');
    }
}

function addSongNameClickEvent(songObj, id) {
	var songName = songObj.name;
    var fileName = songObj.fileName;
	var id = '#song' + id;

    function onClick(event){
		var song = document.querySelector('audio');
        var currentSong = song.src;
            
        if (currentSong.search(fileName) != -1) {
            toggleSong();
        } else {
            changeCurrentSongDetails(songObj);
            song.src = fileName; 
            song.play();
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            $('.play-icon').css('color' , '#30B55C');
        }
    }
    $(id).on('click', onClick);
}

//player ka info change krne ka
function changeCurrentSongDetails(songObj) {
    var songPath = 'assets/img/' + songObj.image;
    $('.current-song-image').attr('src', songPath)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}