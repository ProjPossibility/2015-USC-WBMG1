/**
 * Constants for the game
 * DO NOT CHANGE THE VALUES OF THESE VARS
 */
var GM_FAILURE = -1;	//indicates failure
var GM_SUCCESS = 1;		//indicates success

/**
 * JavaScript Object for a sigle message
 *
 * Members
 *	msg String containg full message
 *	audio Audio Object containing audio for that message
 *
 * Methods
 *	play()	To play the message. Or for 'Speaking it out loud'
 *
 */
function Message(str) {
	this.msg = str;
	this.audio = new Audio();

	plain_str = getPlainString(str);
	if (plain_str == GM_FAILURE) {
		return(GM_FAILURE);
	}
	this.audio.src = 'http://translate.google.com/translate_tts?tl=en&q=' + encodeURIComponent(plain_str);

	this.isAudioAvailable = (this.audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE);
	this.play = function () {
		if (!this.isAudioAvailable) {
			return(GM_FAILURE);
		}
		this.audio.play();
		return (GM_SUCCESS);
	}
}

/**
 * JavaScript Object of all Messages
 *
 * To play the audio for that message, just call play() method.
 * For example,
 *		Code for 'speaking out' WELCOME_GREETING
 			MESSAGES.WELCOME_GREETING.play();
 * Here I have added some messages for example. Please add more Messages!
 */
var MESSAGES = {
	WELCOME_GREETING: new Message("Hello, How are you?"),
	FULL_RECALL: new Message("Would you like to know all the board position?"),
	POSIONAL_RECALL: new Message("Would you like to know only specific positions only?"),
	QUIT_GREETING : new Message("Good Bye")
};

/**
 * Gets a plain string. Utility function
 *
 * @param str String in question
 *
 * @return plain string in case of success, GM_FAILURE otherwise
 */
function getPlainString(str) {
	if (typeof(str) != "string") {
		return GM_FAILURE;
	}
	//remove all punctuations
	str = str.replace(/[^a-zA-Z ]/g, "");
	return(str.toLowerCase());
}