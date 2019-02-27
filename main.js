var saveGame = JSON.parse(localStorage.getItem('giletIdleSave'))
var gameData = {
  gilet: 1,
  giletPerClick: 1,
  giletPerClickInternet: 0,
  giletPerClickTract: 0,
  giletPerClickPapier: 0,
  giletPerClickCost: 100000,
  giletPerClickCostInternet: 10000,
  giletPerClickCostTract: 50,
  giletPerClickCostPapier: 10,
  giletsPerSecond: 0,
  giletFBPVillage: 0,
  giletFBPRegion: 0,
  giletFBPPays: 0,
  // lastTick: Date.now()
}
if (saveGame != null){
if (typeof saveGame.gilet  !== "undefined" ) gameData.gilet = saveGame.gilet;
if (typeof saveGame.giletPerClick !== "undefined") gameData.giletPerClick = saveGame.giletPerClick;
if (typeof saveGame.giletPerClickInternet !== "undefined") gameData.giletPerClickInternet = saveGame.giletPerClickInternet;
if (typeof saveGame.giletPerClickTract !== "undefined") gameData.giletPerClickTract = saveGame.giletPerClickTract;
if (typeof saveGame.giletPerClickPapier !== "undefined") gameData.giletPerClickPapier = saveGame.giletPerClickPapier;
if (typeof saveGame.giletsPerSecond !== "undefined") gameData.giletsPerSecond = saveGame.giletsPerSecond;
if (typeof saveGame.giletPerClickCost !== "undefined") gameData.giletPerClickCost = saveGame.giletPerClickCost;
if (typeof saveGame.giletPerClickCostInternet !== "undefined") gameData.giletPerClickCostInternet = saveGame.giletPerClickCostInternet;
if (typeof saveGame.giletPerClickCostTract !== "undefined") gameData.giletPerClickCostTract = saveGame.giletPerClickCostTract;
if (typeof saveGame.giletPerClickCostPapier !== "undefined") gameData.giletPerClickCostPapier = saveGame.giletPerClickCostPapier;
if (typeof saveGame.giletFBPVillage !== "undefined") gameData.giletFBPVillage = saveGame.giletFBPVillage;
if (typeof saveGame.giletFBPRegion !== "undefined") gameData.giletFBPRegion = saveGame.giletFBPRegion;
if (typeof saveGame.giletFBPPays !== "undefined") gameData.giletFBPPays = saveGame.giletFBPPays;
}
// if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
update("perClickUpgradeInternet", "Déjà "  + gameData.giletPerClickInternet + " pétitions ")
update("perClickUpgradePapier", "Déjà "  + gameData.giletPerClickPapier + " pétitions ")
update("perClickUpgradeTract", "Déjà "  + gameData.giletPerClickTract + " pétitions ")
update("perClickUpgradeInternetCost", numberformat.format(gameData.giletPerClickCostInternet, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
update("perClickUpgradePapierCost", numberformat.format(gameData.giletPerClickCostPapier, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
update("perClickUpgradeTractCost", numberformat.format(gameData.giletPerClickCostTract, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
update("FBPVillage", gameData.giletFBPVillage + " pages crées ");
update("FBPRegion", gameData.giletFBPRegion + " pages crées ");
update("FBPPays", gameData.giletFBPPays + " pages crées ");
update("buildCostVillage", Math.floor(100 * Math.pow(1.1,gameData.giletFBPVillage)) + " GJ doivent liker pour une nouvelle page " );
update("buildCostRegion", Math.floor(1000 * Math.pow(1.1,gameData.giletFBPRegion)) + " GJ doivent liker pour une nouvelle page " );
update("buildCostPays", Math.floor(10000 * Math.pow(1.1,gameData.giletFBPPays)) + " GJ doivent liker pour une nouvelle page " );
update("oneClick", gameData.giletPerClick );
var tempGPS = 0;


function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

function recruteGilet() {
  gameData.gilet += gameData.giletPerClick
  update("giletsRecrutes", gameData.gilet + " Gilets Jaunes")

}

function recruteHeros(nomHeros) {
  switch (nomHeros) {
    case "Rouet":
      gameData.gilet += Math.floor(0.05 * gameData.gilet);
      document.getElementById("recruteRouet").disabled = true;
      setTimeout(function(){document.getElementById("recruteRouet").disabled = false;},5000);
      break;
    case "Marcel":
      var oldGPS = gameData.giletsPerSecond;
      // tempGPS += Math.floor(2 * oldGPS);
      tempGPS = oldGPS;
      //gameData.giletsPerSecond = tempGPS;
      document.getElementById("recruteMarcel").disabled = true;
      update("giletsRecrutesPerSecond", tempGPS + " Gilets Jaunes par seconde")
      setTimeout(function(){document.getElementById("recruteMarcel").disabled = false; gameData.giletsPerSecond = oldGPS, tempGPS = 0; update("giletsRecrutesPerSecond", gameData.giletsPerSecond + " Gilets Jaunes par seconde");},5000);
      break;
    default:
  }
  update("giletsRecrutes", gameData.gilet + " Gilets Jaunes")
}



function recruteGiletPerClick(typePerClick) {
  switch(typePerClick) {
    case "Papier":
      if (gameData.gilet >= gameData.giletPerClickCostPapier) {
        gameData.gilet -= gameData.giletPerClickCostPapier
        gameData.giletPerClick += 1
        gameData.giletPerClickPapier += 1
        gameData.giletPerClickCostPapier *= 2
        document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
        update("perClickUpgradePapier", "Déjà "  + gameData.giletPerClickPapier + " pétitions ")
        update("perClickUpgradePapierCost", numberformat.format(gameData.giletPerClickCostPapier, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
        update("oneClick", gameData.giletPerClick );
        }
      break;
    case "Tract":
      if (gameData.gilet >= gameData.giletPerClickCostTract) {
        gameData.gilet -= gameData.giletPerClickCostTract
        gameData.giletPerClick += 5
        gameData.giletPerClickTract += 1
        gameData.giletPerClickCostTract *= 2
        document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
        update("perClickUpgradeTract", "Déjà "  + gameData.giletPerClickTract + " pétitions ")
        update("perClickUpgradeTractCost", numberformat.format(gameData.giletPerClickCostTract, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
        update("oneClick", gameData.giletPerClick );
        }
      break;
    case "Internet":
      if (gameData.gilet >= gameData.giletPerClickCostInternet) {
        gameData.gilet -= gameData.giletPerClickCostInternet
        gameData.giletPerClick += 100
        gameData.giletPerClickInternet += 1
        gameData.giletPerClickCostInternet *= 2
        document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
        update("perClickUpgradeInternet", "Déjà "  + gameData.giletPerClickInternet + " pétitions ")
        update("perClickUpgradeInternetCost", numberformat.format(gameData.giletPerClickCostInternet, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
        update("oneClick", gameData.giletPerClick );
        }
      break;
    default:
  }

}

/* function recruteGiletPerClickAction(typePerClick, typePerClickCost) {
if (gameData.gilet >= typePerClickCost) {
  gameData.gilet -= typePerClickCost
  gameData.giletPerClick += 1
  gameData.giletPerClickCost *= 2
  document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
  update("perClickUpgrade", "Déjà "  + gameData.giletPerClick + " pétitions ")
  update("perClickUpgradeCost", numberformat.format(gameData.giletPerClickCost, {format: 'longScale'}) + " GJ doivent signer pour une nouvelle pétition")
  update("oneClick", gameData.giletPerClick );
  }
}*/


function updateGPS(tempValue){

}

function recruteGiletPerSecond() {
  gameData.gilet += gameData.giletsPerSecond;
  gameData.giletsPerSecond = gameData.giletFBPVillage + gameData.giletFBPRegion * 10 + gameData.giletFBPPays * 100 + tempGPS;
  update("giletsRecrutes", gameData.gilet + " Gilets Jaunes")
}


function buildFBPVillage(){
  // var buildCostVillage = Math.floor(100 * Math.pow(1.3,gameData.giletFBPVillage));     //works out the cost of this cursor
   var buildCostVillage = Math.floor(100 * Math.pow(1.1,gameData.giletFBPVillage));     //works out the cost of this cursor
    if(gameData.gilet >= buildCostVillage){                                   //checks that the player can afford the cursor
      gameData.giletFBPVillage = gameData.giletFBPVillage + 1;                                   //increases number of cursors
    	gameData.gilet = gameData.gilet - buildCostVillage;                          //removes the cookies spent
      update("FBPVillage", gameData.giletFBPVillage + " pages crées ");
      document.getElementById('giletsRecrutes').innerHTML = gameData.gilet + " Gilets Jaunes";  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(100 * Math.pow(1.1,gameData.giletFBPVillage));       //works out the cost of the next cursor
    update("buildCostVillage", nextCost + " GJ doivent liker pour une nouvelle page " );
};

function buildFBPRegion(){
    var buildCostRegion = Math.floor(1000 * Math.pow(1.1,gameData.giletFBPRegion));     //works out the cost of this cursor
    if(gameData.gilet >= buildCostRegion){                                   //checks that the player can afford the cursor
      gameData.giletFBPRegion = gameData.giletFBPRegion + 1;                                   //increases number of cursors
    	gameData.gilet = gameData.gilet - buildCostRegion;                          //removes the cookies spent
      update("FBPRegion", gameData.giletFBPRegion  + " pages crées ");
      document.getElementById('giletsRecrutes').innerHTML = gameData.gilet + " Gilets Jaunes";  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(1000 * Math.pow(1.1,gameData.giletFBPRegion));       //works out the cost of the next cursor
    update("buildCostRegion", nextCost + " GJ doivent liker pour une nouvelle page " );
};

function buildFBPPays(){
    var buildCostPays = Math.floor(10000 * Math.pow(1.1,gameData.giletFBPPays));     //works out the cost of this cursor
    if(gameData.gilet >= buildCostPays){                                   //checks that the player can afford the cursor
      gameData.giletFBPPays = gameData.giletFBPPays + 1;                                   //increases number of cursors
    	gameData.gilet = gameData.gilet - buildCostPays;                          //removes the cookies spent
      update("FBPPays", gameData.giletFBPPays + " pages crées ");
      document.getElementById('giletsRecrutes').innerHTML = gameData.gilet + " Gilets Jaunes";  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10000 * Math.pow(1.1,gameData.giletFBPPays));       //works out the cost of the next cursor
    update("buildCostPays", nextCost + " GJ doivent liker pour une nouvelle page " );
};



var mainGameLoop = window.setInterval(function() {
  // diff = Date.now() - gameData.lastTick;
  // gameData.lastTick = Date.now()
  // gameData.gilet += gameData.giletPerClick * (diff / 1000)
  recruteGiletPerSecond();
  document.getElementById("giletsRecrutes").innerHTML = gameData.gilet + " Gilets Jaunes"
  document.getElementById("giletsRecrutesPerSecond").innerHTML = gameData.giletsPerSecond + " Gilets Jaunes par seconde"
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem('giletIdleSave', JSON.stringify(gameData))
}, 1500)

function delSave(){
  localStorage.clear();  
}

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
