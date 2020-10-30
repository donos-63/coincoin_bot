function getDateString()
{
	var d = new Date();
	var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + 	d.getHours() + ":" + d.getMinutes()+ ":" + d.getSeconds();
	return datestring;
}

function submitDiscussion(){
	var textbox =  document.getElementsByClassName('text-content')[0];
	var messageContent = document.getElementById("discussionInput");
					
	if(messageContent.value == '')
		return false;

	textbox.innerHTML += "<div class='ispeak'><div class='chatform'><span class='titleme'>"+ document.getElementsByName('user')[0].value  +"</span><span class='chataddition'>"+getDateString()+"</span><div class='chattext'>" + messageContent.value + "</div></div></div>";
		
	messageContent.value = '';
	
	var nbWords = getRandomInt(10) + 1;
	//generate an answer with a delay, computed with the number of word in the answer
	setTimeout(function() { generateAnswer(nbWords); }, nbWords * 200);
	
	textbox.scrollTo(0,textbox.scrollHeight);
	return false;
}


var WORDS = ['coin','coin', 'coin', 'coin', 'COIN', '*#"!:$*', 'koin', 'coin coin', 'k', 'quack'];
var PONCTUATION = ['?', '!', ',', '...', '!!!'];

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

	
	textbox.innerHTML += "<div class='hespeak'><div class='chatform'><span class='titleme'>COIN COIN:</span><span class='chataddition'>"+getDateString()+"</span><div class='chattext'>" + answer +"</div></div></div>";
	textbox.scrollTo(0,textbox.scrollHeight);
}