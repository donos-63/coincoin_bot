function getDateString()
{
	var d = new Date();
	var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + 	d.getHours() + ":" + d.getMinutes()+ ":" + d.getSeconds();
	return datestring;
}

//cutting the speech is rude, and it really complicates the code! We prevent it...
var isWaitingAnswer = false;
var interlocutor = '';

function submitDiscussion(){
	var textbox =  document.getElementsByClassName('text-content')[0];
	var messageContent = document.getElementById("discussionInput");
	
	//no message or delay too short
	if(messageContent.value == '' || isWaitingAnswer)
		return false;

	//sometimes, do not answer except if this is a question
	if(!messageContent.value.endsWith('?') && getRandomInt(7) == 0)
		return false;

	textbox.innerHTML += "<div class='ispeak'><div class='chatform'><span class='titleme'>"+ document.getElementsByName('user')[0].value  +"</span><span class='chataddition'>"+getDateString()+"</span><div class='chattext'>" + messageContent.value + "</div></div></div>";
		
	messageContent.value = '';
	
	var nbWords = getRandomInt(10) + 1;
	//generate an answer with a delay, computed with the number of word in the answer

	//block another input message
	isWaitingAnswer = true;

	//add a delay before the answer
	waitingAnswer = getRandomInt(10)+1;
	setTimeout(function() { setPendingResponse(); }, waitingAnswer * 500);
	
	//generate an answer with a delay, computed with the number of word in the answer
	setTimeout(function() { generateAnswer(nbWords); }, waitingAnswer * 500 + nbWords * 500);
	
	textbox.scrollTo(0,textbox.scrollHeight);
	return false;
}


function setPendingResponse()
{
	var textbox =  document.getElementsByClassName('text-content')[0];
	textbox.innerHTML += "<div class='waitspeak'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>"
	textbox.scrollTo(0,textbox.scrollHeight);
}

function removePendingResponse()
{
	var myobj = document.getElementsByClassName("waitspeak")[0];
	myobj.remove(); 
}

const WORDS = ['coin','coin', 'coin', 'coin', 'COIN', '*#"!:$*', 'koin', 'coin coin', 'kkk', 'quack', 'couin', 'cot-cot', 'crôa'];
const PONCTUATION = ['?', '!', ',', '...', '!!!'];
const INTERLOCUTORS = ['Donald', 'Picsou', 'Daisy', 'Gontran', 'Daffy Duck', 'Howard', 'Coin-Coin', 'Plucky', 'Fantomiald'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateAnswer(nbWords)
{
	var textbox =  document.getElementsByClassName('text-content')[0];

	var answer = '';
	for(i = 0; i< nbWords; i++)
	{
		//generate a random word
		answer += WORDS[getRandomInt(WORDS.length)];
		
		if(getRandomInt(4) == 0)
		{
			//generate ponctuation or emoji
			if(getRandomInt(3) == 0)
			{
				//get random value between 0x1F601 and 0x1F62D - https://apps.timwhitlock.info/emoji/tables/unicode
				emojiNumber = 128513 + getRandomInt(128557 - 128513);
				answer += String.fromCodePoint(emojiNumber);
			}
			else answer += PONCTUATION[getRandomInt(PONCTUATION.length)];
		}
		
		answer +=  ' ';
	}

	removePendingResponse();
	textbox.innerHTML += "<div class='hespeak'><div class='chatform'><span class='titleme'>"+interlocutor+":</span><span class='chataddition'>"+getDateString()+"</span><div class='chattext'>" + answer +"</div></div></div>";
	textbox.scrollTo(0,textbox.scrollHeight);
	isWaitingAnswer = false;
}

//generate random interlocutor
interlocutor = INTERLOCUTORS[getRandomInt(INTERLOCUTORS.length)];

//replace smiley by emoji in input
const discussionInput = document.getElementById('discussionInput');
const EMOJIS = { ':-)' : "0x1F642", ':-(': '0x1F641', '(k)': "0x2764", ':-D' : "0x1F600"};

discussionInput.addEventListener('input', textToEmoji);

function textToEmoji(e)
{
	for(var key in EMOJIS)
	{
		var u = EMOJIS[key];
		discussionInput.value = e.target.value.replace(key, String.fromCodePoint(parseInt(EMOJIS[key])));
	}
}

var els = document.getElementsByClassName("emojibox-emoji-item");
Array.prototype.forEach.call(els, function(el) {
    el.onclick = function(){ 
		discussionInput.value += el.innerHTML;
	};
});

//open/close emoji popup
function toggleEmojis(){
	document.getElementsByClassName('emojibox-main-popover')[0].classList.toggle("active");
}

document.onclick = function(e) { 
	if(!(e.target).className.startsWith('emojibox-'))
		document.getElementsByClassName('emojibox-main-popover')[0].classList.remove("active");

 };


