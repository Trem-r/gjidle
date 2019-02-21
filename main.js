var saveGame = JSON.parse(localStorage.getItem('giletIdleSave'))
var gameData = {
  gilet: 0,
  giletPerClick: 1,
  giletPerClickCost: 10,
  giletFBPVillage: 0,
  // lastTick: Date.now()
}

if (typeof saveGame.gilet !== "undefined") gameData.gilet = saveGame.gilet;
if (typeof saveGame.giletPerClick !== "undefined") gameData.giletPerClick = saveGame.giletPerClick;
if (typeof saveGame.giletPerClickCost !== "undefined") gameData.giletPerClickCost = saveGame.giletPerClickCost;
if (typeof saveGame.giletFBPVillage !== "undefined") gameData.giletFBPVillage = saveGame.giletFBPVillage;
// if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
update("perClickUpgrade", "Déjà "  + gameData.giletPerClick + " signatures ")
update("perClickUpgradeCost", numberformat.format(gameData.giletPerClickCost, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
update("FBPVillage", gameData.giletFBPVillage );
update("buildCost", Math.floor(10 * Math.pow(1.5,gameData.giletFBPVillage)) );
update("oneClick", gameData.giletPerClick );

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function recruteGilet() {
  gameData.gilet += gameData.giletPerClick
  update("giletsRecrutes", gameData.gilet + " Gilets Jaunes")
}

function recruteGiletPerClick() {
  if (gameData.gilet >= gameData.giletPerClickCost) {
    gameData.gilet -= gameData.giletPerClickCost
    gameData.giletPerClick += 1
    gameData.giletPerClickCost *= 2
    document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
    update("perClickUpgrade", "Déjà "  + gameData.giletPerClick + " signatures ")
    update("perClickUpgradeCost", numberformat.format(gameData.giletPerClickCost, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
    update("oneClick", gameData.giletPerClick );
    }
}

function recruteGiletPerSecond() {
  gameData.gilet += gameData.giletFBPVillage
  update("giletsRecrutes", gameData.gilet + " Gilets Jaunes")
}


function buildFBPVillage(){
    var buildCost = Math.floor(10 * Math.pow(1.5,gameData.giletFBPVillage));     //works out the cost of this cursor
    if(gameData.gilet >= buildCost){                                   //checks that the player can afford the cursor
        gameData.giletFBPVillage = gameData.giletFBPVillage + 1;                                   //increases number of cursors
    	gameData.gilet = gameData.gilet - buildCost;                          //removes the cookies spent
        document.getElementById('FBPVillage').innerHTML = gameData.giletFBPVillage;  //updates the number of cursors for the user
        document.getElementById('giletsRecrutes').innerHTML = gameData.gilet + " Gilets Jaunes";  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.5,gameData.giletFBPVillage));       //works out the cost of the next cursor
    document.getElementById('buildCost').innerHTML = nextCost;  //updates the cursor cost for the user
};
var mainGameLoop = window.setInterval(function() {
  // diff = Date.now() - gameData.lastTick;
  // gameData.lastTick = Date.now()
  // gameData.gilet += gameData.giletPerClick * (diff / 1000)
  recruteGiletPerSecond();
  document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('giletIdleSave', JSON.stringify(gameData))
}, 1500)

/* function format(number, type) {
    let exponent = Math.floor(Math.log10(number))
    let mantissa = number / Math.pow(10, exponent)
    if (exponent < 3) return number.toFixed(1)
    if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
    if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
} */

/* FONCTION FORMATAGE IDLE CLASS **************************

  function rounder(num) {
    if (num >= 1000000000000000000000000000000000000) {
        num = (num / 1000000000000000000000000000000000000).toFixed(2) * 1000000000000000000000000000000000000;
    } else if (num >= 1000000000000000000000000000000000) {
        num = (num / 1000000000000000000000000000000000).toFixed(2) * 1000000000000000000000000000000000;
    } else if (num >= 1000000000000000000000000000000) {
        num = (num / 1000000000000000000000000000000).toFixed(2) * 1000000000000000000000000000000;
    } else if (num >= 1000000000000000000000000000) {
        num = (num / 1000000000000000000000000000).toFixed(2) * 1000000000000000000000000000;
    } else if (num >= 1000000000000000000000000) {
        num = (num / 1000000000000000000000000).toFixed(2) * 1000000000000000000000000;
    } else if (num >= 1000000000000000000000) {
        num = (num / 1000000000000000000000).toFixed(2) * 1000000000000000000000;
    } else if (num >= 1000000000000000000) {
        num = (num / 1000000000000000000).toFixed(2) * 1000000000000000000;
    } else if (num >= 1000000000000000) {
        num = (num / 1000000000000000).toFixed(2) * 1000000000000000;
    } else if (num >= 1000000000000) {
        num = (num / 1000000000000).toFixed(2) * 1000000000000;
    } else if (num >= 1000000000) {
        num = (num / 1000000000).toFixed(2) * 1000000000;
    } else if (num >= 1000000) {
        num = (num / 1000000).toFixed(2) * 1000000;
    }

    return num;
  }

	/**
	 * num - the number to be formatted
	 * longerFormat - for numbers where you need a third decimal point for changes to be visible
	 * longerSingleDigit - for smaller numbers (usually multipliers) that require a third decimal point for changes to be visible
	 */
/*	function format(num, longerFormat, longerSingleDigit) {
    var name;

    if (num < 0) {
      num = Math.abs(num);
    }

    if (num < 1000000) {
      num = num.toFixed(longerSingleDigit ? 3 : 2).replace(/\.00$/, '').replace(/\.000$/, '');
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    var abrev = window.screen.availWidth <= 400;
    if (num >= 1000000000000000000000000000000000000) {
        num = num / 1000000000000000000000000000000000000;
        name = abrev ? 'Ud' : 'undecillion';
    } else if (num >= 1000000000000000000000000000000000) {
        num = num / 1000000000000000000000000000000000;
        name = abrev ? 'Dc' : 'decillion';
    } else if (num >= 1000000000000000000000000000000) {
        num = num / 1000000000000000000000000000000;
        name = abrev ? 'No' : 'nonillion';
    } else if (num >= 1000000000000000000000000000) {
        num = num / 1000000000000000000000000000;
        name = abrev ? 'Oc' : 'octillion';
    } else if (num >= 1000000000000000000000000) {
        num = num / 1000000000000000000000000;
        name = abrev ? 'Sp' : 'septillion';
    } else if (num >= 1000000000000000000000) {
        num = num / 1000000000000000000000;
        name = abrev ? 'Sx' : 'sextillion';
    } else if (num >= 1000000000000000000) {
        num = num / 1000000000000000000;
        name = abrev ? 'Qi' : 'quintillion';
    } else if (num >= 1000000000000000) {
        num = num / 1000000000000000;
        name = abrev ? 'Qa' : 'quadrillion';
    } else if (num >= 1000000000000) {
        num = num / 1000000000000;
        name = abrev ? 'T' : 'trillion';
    } else if (num >= 1000000000) {
        num = num / 1000000000;
        name = abrev ? 'B' : 'billion';
    } else if (num >= 1000000) {
        num = num / 1000000;
        name = abrev ? 'M' : 'million';
    }

    if (longerFormat) {
      return num.toFixed(3).replace(/\.000$/, '') + " " + name;
    } else {
      return num.toFixed(2).replace(/\.00$/, '') + " " + name;
    }

  }

  */
