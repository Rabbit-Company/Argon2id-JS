document.getElementById('salt').value = Argon2id.randomSalt();

document.getElementById("start").addEventListener('click', () => {
	let message = document.getElementById('message').value;
	let salt = document.getElementById('salt').value;
	let p = document.getElementById('p').value;
	let m = document.getElementById('m').value;
	let i = document.getElementById('i').value;
	let l = document.getElementById('l').value;

	let timerStart = Date.now();
	let hashEncoded = Argon2id.hashEncoded(message, salt, i, m, p, l);
	let hashHex = Argon2id.hashDecode(hashEncoded);
	let timerEnd = calcT(timerStart);
	document.getElementById('hash').innerHTML = "<b>Hash:</b> " + hashHex + "<br/><b>Hash Encoded:</b> " + hashEncoded;
	document.getElementById('perf').innerHTML = "Hashing this message took <b>" + timerEnd + "ms</b>.";
});

function calcT(timer){
	return Date.now() - timer;
}