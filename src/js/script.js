const state = {
  newWinner: null,
  player: {
    level: 1,
    maxHealth: 25,
    health: 25,
    defense: 0,
    attack: 4,
    xp: 0,
    maxXp: 50,
    money: 0,
    maxMoney: 50,
    healingPotions: 2,
    maxHealingPotions: 5,
    weaponDurability: 0,
    extraAttack: 0,
    armorDurability: 0
  },
};

const data = {
  merchWeapons: [
    {
      name: 'Lama Oscura',
      attack: 2,
      price: 10,
      durability: 6,
    },
    {
      name: 'Ascia delle Tenebre',
      attack: 4,
      price: 14,
      durability: 8,
    },
    {
      name: 'Lama Oscura del Vespro',
      attack: 6,
      price: 18,
      durability: 12,
    },
    {
      name: 'Fiamme Oscure',
      attack: 4,
      price: 12,
      durability: 8,
    },
    {
      name: 'Mietitrice d\'anime',
      attack: 15,
      price: 45,
      durability: 20,
    },
    {
      name: 'Lama Devastatrice',
      attack: 10,
      price: 30,
      durability: 10,
    }
  ],
  merchArmor: [
    {
      name: 'Scudo d\'ombra',
      protection: 2,
      durability: 8,
      price: 5,
    },
    {
      name: 'Armatura Oscura',
      protection: 3,
      durability: 7,
      price: 3,
    },
    {
      name: 'Armatura della Fiamma Oscura',
      protection: 4,
      durability: 10,
      price: 7,
    },
    {
      name: 'Armatura Oscura del Vespro',
      protection: 10,
      durability: 15,
      price: 15,
    },
    {
      name: 'Scudo Torre Oscuro',
      protection: 7,
      durability: 10,
      price: 10,
    },
    {
      name: 'Armatura d\'Ombra',
      protection: 5,
      durability: 5,
      price: 8,
    },
  ],
  enemy: {
    name: [
      'Xordar',
      'Zhondor',
      'Gorroth',
      'Holtahgar',
      'Martakith',
      'Drakthar',
      'Zorgan',
      'Brakkhus\'tar',
      'Velgorth',
      'Ignar',
      'Thalor\'kur',
      'Xerxes\'za',
      'Ulthorg',
      'Vorgarath',
      'Krynn\'tor',
      'Artharion',
      'Borath\'thug',
      'Lazari\'kerh',
      'Morkain\'thur',
    ],
    title: [
      'il silente',
      'la furia del Velo',
      'benedetto dal Velo',
      'il Santo',
      'il senza pietà',
      'alfiere di Shub\'Zuray',
      'figlio del Velo',
      'la spada insaziabile',
      'l\'impuro',
      'la follia errante',
      'il mai domato',
    ],
    image: [
      '/assets/img/mostro1.png',
      '/assets/img/mostro2.png',
      '/assets/img/mostro3.png',
      '/assets/img/mostro4.png',
      '/assets/img/mostro5.png',
      '/assets/img/mostro6.png',
    ],
  },
};

function startGame() {
  const el = selectElements();

  const inputName = el.input.name.value;
  state.player.name = !!inputName ? inputName : 'Cacciatore Errante';

  startPlayer();
  startEnemy();

  el.page.intro.classList.add('hide');
  el.page.intro.classList.remove('container');

  el.page.fight.classList.add('container');
  el.page.fight.classList.remove('hidez');
}

function startPlayer() {
  const el = selectElements(); // TODO: Refactor up
  const state = getState(); // TODO: Refactor up

  const p = state.player;
  el.player.name.textContent = p.name;
  el.player.level.textContent = p.level,
  el.player.health.textContent = printValueWithMax(p.health, p.maxHealth);
  el.player.attack.textContent = p.attack + p.extraAttack;
  el.player.defense.textContent = p.defense;
  el.player.xp.textContent = printValueWithMax(p.xp, p.maxXp);
  el.player.money.textContent = printValueWithMax(p.money, p.maxMoney);
  el.player.healingPotion.textContent = printValueWithMax(p.healingPotions, p.maxHealingPotions);

  el.player.armorDurability.textContent = !!p.armorDurability
    ? `Durata Incanto Difensivo: ${p.armorDurability}`
    : '';

  el.player.weaponDurability.textContent = !!p.weaponDurability
    ? `Durata Incanto Offensivo: ${p.weaponDurability}`
    : '';

  el.player.health = p.health < (p.maxHealth / 3)
    ? 'red'
    : 'black';
}

function startEnemy() {
  const el = selectElements(); // TODO: Refactor up
  const state = getState(); // TODO: Refactor up
  const data = getData(); // TODO: Refactor up

  const enemyName = getRandomArrayElement(data.enemy.name);
  const enemyTitle = getRandomArrayElement(data.enemy.title);
  const enemyFullName = `${enemyName} ${enemyTitle}`;

  el.enemy.enemy.classList.remove('hide');
  el.enemy.name.textContent = enemyFullName;

  const playerLevel = state.player.level;

  // TODO: Refactor formula?
  const level = Math.floor(Math.random() * parseInt(playerLevel) + playerLevel / 3 + 1);
  el.enemy.level.textContent = level;

  // TODO: Refactor formula?
  const health = Math.floor(Math.random() * parseInt(level * 10) + (playerLevel * 2));
  el.enemy.health.textContent = health;

  // TODO: Refactor formula?
  const attack = Math.floor(Math.random() * parseInt(level * 4) + (playerLevel * 2));
  el.enemy.attack.textContent = attack;

  const enemyImage = getRandomArrayElement(data.enemy.image);
  enemyimg.src = enemyImage;
  clearMessages();
}

// HERE <----------------------------------------------------------------------

function attack() {
  const el = selectElements(); // TODO: Refactor up
  const state = getState(); // TODO: Refactor up

  let enemyHealth = parseInt(el.enemy.health.textContent);

  if (enemyHealth <= 0) {
    el.messages.hit.textContent = 'Hai massacrato il tuo avversario!';
    startPlayer();
    return;
  }

  // 10% chance of missing the target
  // TODO: Refactor into probability function
  if (Math.floor(Math.random() * 10) >= 9) {
    enemyAttack();
    el.messages.miss.textContent = 'Bersaglio mancato!';
    startPlayer();
    return;
  }

  clearMessages();
  const attack = state.player.attack + state.player.extraAttack;
  enemyHealth -= attack;

  if (state.player.weaponDurability > 0) {
    state.player.weaponDurability--;
    if (state.player.weaponDurability === 0) {
      el.messages.brokenWeapon.textContent = 'Incantamento offensivo esaurito!';
      state.player.extraAttack = 0;
    }
  }

  el.enemy.health.textContent = enemyHealth;
  enemyHealth > 0 ? enemyAttack() : enemyDeath();
  startPlayer();
}

function enemyAttack() {

  // 10% chance of missing the target
  // TODO: Refactor into probability function
  if (Math.floor(Math.random() * 10) >= 9) {
    document.getElementById("miss-message").textContent += "Riesci a schivare il colpo del mostro!"
    return;
  }

  clearMessages();
  let enemy_attack = parseInt(document.getElementById("enemy-attack").textContent);
  player.defense != 0 ? player.health -= Math.floor(enemy_attack - (enemy_attack * player.defense / 100)) : player.health -= enemy_attack;
  player.health > 0 ? document.getElementById("hit-message").textContent = "Sei stato colpito! " : newWinner = playerDeath();
  if (player.armorDurability > 0) {
    player.armorDurability--;
    if (player.armorDurability == 0) {
      document.getElementById("hit-message").textContent = "Incantamento difensivo esaurito!"
      player.defense = 0;
    }
  }
  startPlayer();
}

function enemyDeath() {
  document.getElementById("enemy-health").textContent = 0;
  document.getElementById("miss-message").textContent = "Un mostro in meno a Gargantua! Continua la tua ronda..";
  let loot = getLoot();
  let xp = getXp();
  document.getElementById("loot-message").textContent = loot + xp;
  setTimeout(function () { document.getElementById("enemy").classList.add("hide") }, 2000);
  setTimeout(startEnemy, 2600);
}

function playerDeath() {
  newWinner = document.getElementById("enemy-name").textContent;
  document.getElementById("player").style.display = "none";
  document.getElementById("enemy").classList.add("hide");
  document.getElementById("enemy").style.display = "none";
  setTimeout(function () {
    document.getElementById("game-screen").innerHTML += `<div id="death-screen">
        <h1>${player.name}, sei stato Sconfitto!</h1>
        <p><strong> ${newWinner} </strong> ti ha massacrato.. ma il tuo flebile cuore batte ancora...
        </p>
        <button class="button" onclick="restart()">Rinasci</button>
        </div>`
  }, 1000);

  return newWinner;
}

function restart() {
  player = {
    name: 'Il Rinato',
    level: 1,
    maxHealth: 25,
    health: 1,
    defense: 0,
    attack: 4,
    xp: 0,
    maxXp: 50,
    money: 0,
    maxMoney: 50,
    healingPotions: 2,
    maxHealingPotions: 5,
    weaponDurability: 0,
    extraAttack: 0,
    armorDurability: 0
  }
  document.getElementById("death-screen").remove();
  document.getElementById("player").style.display = "inline-block";
  document.getElementById("enemy").style.display = "inline-block";
  document.getElementById("game-screen").style.backgroundColor = "none";
  startPlayer();
  startEnemy();
}

function getLoot() {

  let random = Math.floor(Math.random() * 3);
  let potions = Math.floor(Math.random() * 2 + 1);
  let money = Math.floor(Math.random() * (10 * player.level) + 1);

  switch (random) {

    case 0:
    //futuri sviluppi*
    case 1:
      if ((player.money + money) > player.maxMoney) {
        loot = "Hai accumulato troppa energia oscura! Hai ottenuto "
        player.money = player.maxMoney;
      } else {
        loot = "Hai ottenuto " + money + " energia oscura e ";
        player.money += money;
      }
      break;

    default:

      if ((player.healingPotions + potions) > player.maxHealingPotions) {
        loot = "La tua sacca delle pozioni di salute e' piena! Hai ottenuto "
        player.healingPotions = player.maxHealingPotions;
      } else {
        player.healingPotions += potions;
        loot = "Hai ottenuto " + potions + " pozioni di salute e ";

      }

  }
  return loot;
}

function getXp() {
  let points = parseInt(document.getElementById("enemy-attack").textContent);
  xp = points + " punti esperienza."
  player.xp += points;
  if (player.xp >= player.maxXp) {
    levelUp();
  }
  return xp;
}

function healthUp() {
  //Vengono restituiti 20 punti salute
  if (player.healingPotions <= 0) {
    document.getElementById("hit-message").innerText = "Non hai pi� pozioni!"
  } else {
    if (player.health === player.maxHealth) {
      document.getElementById("hit-message").innerText = "Non puoi curarti piu' dei tuoi Punti Ferita Massimi!"
    } else {
      player.health += 20;
      player.healingPotions--;
      if (player.health > player.maxHealth) {
        player.health = player.maxHealth;
      }
    }
  }
  startPlayer();
}

function levelUp() {
  player.level++;
  player.xp = 0;
  player.maxMoney += 40;
  player.maxXp = Math.floor(player.maxXp * 1.6);
  player.maxHealth = Math.floor(player.maxHealth * 1.55);
  player.health = player.maxHealth;
  player.attack = Math.floor(player.attack * 1.3);
  document.getElementById("level-up-message").textContent = "Sei salito al livello " + player.level + "!"
  if (player.level % 3 == 0) {
    player.maxHealingPotions++;
  }
  startPlayer();
}

function shop() {
  //Sparisce lo schermo di gioco ed entra quello del negozio
  document.getElementById("game-screen").classList.add("hide");
  document.getElementById("game-screen").classList.remove("show");
  document.getElementById("container_shop").classList.add("container");
  document.getElementById("container_shop").classList.remove("hidez");

  //Generazione di armi e scudi andando a pescare casualmnete dalle relative liste
  let weapon1 = merchWeapons[Math.floor(Math.random() * merchWeapons.length)];
  let weapon2 = merchWeapons[Math.floor(Math.random() * merchWeapons.length)];
  let shield1 = merchArmor[Math.floor(Math.random() * merchArmor.length)];
  let shield2 = merchArmor[Math.floor(Math.random() * merchArmor.length)];
  document.getElementById("w1_name").textContent = weapon1.name;
  document.getElementById("w1_attack").textContent = weapon1.attack;
  document.getElementById("w1_durability").textContent = weapon1.durability;
  document.getElementById("w1_price").textContent = weapon1.price;

  document.getElementById("w2_name").textContent = weapon2.name;
  document.getElementById("w2_attack").textContent = weapon2.attack;
  document.getElementById("w2_durability").textContent = weapon2.durability;
  document.getElementById("w2_price").textContent = weapon2.price;

  document.getElementById("shield1_name").textContent = shield1.name;
  document.getElementById("shield1_protection").textContent = shield1.protection;
  document.getElementById("shield1_durability").textContent = shield1.durability;
  document.getElementById("shield1_price").textContent = shield1.price;

  document.getElementById("shield2_name").textContent = shield2.name;
  document.getElementById("shield2_protection").textContent = shield2.protection;
  document.getElementById("shield2_durability").textContent = shield2.durability;
  document.getElementById("shield2_price").textContent = shield2.price;

  document.getElementById("money_shop").textContent = player.money;
}

function closeShop() {
  document.getElementById("game-screen").classList.add("show");
  document.getElementById("game-screen").classList.remove("hide");
  document.getElementById("container_shop").classList.add("hidez");
  document.getElementById("container_shop").classList.remove("show");
  document.getElementById("shop_message").textContent = "";
  document.getElementById("weapon1").classList.remove("bought");
  document.getElementById("weapon2").classList.remove("bought");
  document.getElementById("shield1").classList.remove("bought");
  document.getElementById("shield2").classList.remove("bought");
}

function buyWeapon1() {
  if (player.money >= parseInt(document.getElementById("w1_price").textContent)) {
    document.getElementById("shop_message").textContent = "";
    player.extraAttack = parseInt(document.getElementById("w1_attack").textContent);
    player.weaponDurability = parseInt(document.getElementById("w1_durability").textContent);
    player.money -= parseInt(document.getElementById("w1_price").textContent);
    document.getElementById("money_shop").textContent = player.money;
    document.getElementById("weapon1").classList.add("bought");
    document.getElementById("weapon2").classList.remove("bought");
    startPlayer();
  } else {
    document.getElementById("shop_message").textContent = "Non hai abbastanza energia oscura!";
  }
}

function buyWeapon2() {
  if (player.money >= parseInt(document.getElementById("w2_price").textContent)) {
    document.getElementById("shop_message").textContent = "";
    player.extraAttack = parseInt(document.getElementById("w2_attack").textContent);
    player.weaponDurability = parseInt(document.getElementById("w2_durability").textContent);
    player.money -= parseInt(document.getElementById("w2_price").textContent);
    document.getElementById("money_shop").textContent = player.money;
    document.getElementById("weapon2").classList.add("bought");
    document.getElementById("weapon1").classList.remove("bought");

    startPlayer();
  } else {
    document.getElementById("shop_message").textContent = "Non hai abbastanza energia oscura!";
  }
}

function buyShield1() {
  if (player.money >= parseInt(document.getElementById("shield1_price").textContent)) {
    document.getElementById("shop_message").textContent = "";
    player.defense = parseInt(document.getElementById("shield1_protection").textContent);
    player.armorDurability = parseInt(document.getElementById("shield1_durability").textContent);
    player.money -= parseInt(document.getElementById("shield1_price").textContent);
    document.getElementById("money_shop").textContent = player.money;
    document.getElementById("shield1").classList.add("bought");
    document.getElementById("shield2").classList.remove("bought");
    startPlayer();
  } else {
    document.getElementById("shop_message").textContent = "Non hai abbastanza energia oscura!";
  }
}

function buyShield2() {
  if (player.money >= parseInt(document.getElementById("shield2_price").textContent)) {
    document.getElementById("shop_message").textContent = "";
    player.defense = parseInt(document.getElementById("shield2_protection").textContent);
    player.armorDurability = parseInt(document.getElementById("shield2_durability").textContent);
    player.money -= parseInt(document.getElementById("shield2_price").textContent);
    document.getElementById("money_shop").textContent = player.money;
    document.getElementById("shield2").classList.add("bought");
    document.getElementById("shield1").classList.remove("bought");
    startPlayer();
  } else {
    document.getElementById("shop_message").textContent = "Non hai abbastanza energia oscura!";
  }
}

function clearMessages() {
  document.getElementById("hit-message").textContent = "";
  document.getElementById("miss-message").textContent = "";
  document.getElementById("loot-message").textContent = "";
  document.getElementById("broken-weapon-message").textContent = "";
  document.getElementById("level-up-message").textContent = "";
}

function selectElements() {
  return {
    page: {
      intro: document.getElementById('introduction'),
      fight: document.getElementById('game-screen'),
    },
    input: {
      name: document.getElementById('name'),
    },
    player: {
      name: document.getElementById('player-name'),
      level: document.getElementById('player-level'),
      health: document.getElementById('player-health'),
      attack: document.getElementById('player-attack'),
      defense: document.getElementById('player-defense'),
      xp: document.getElementById('player-xp'),
      money: document.getElementById('player-money'),
      healingPotion: document.getElementById('player-healing-potion'),
      armorDurability: document.getElementById('armor-durability'),
      weaponDurability: document.getElementById('weapon-durability'),
    },
    enemy: {
      enemy: document.getElementById('enemy'),
      name: document.getElementById('enemy-name'),
      level: document.getElementById('enemy-level'),
      health: document.getElementById('enemy-health'),
      attack: document.getElementById('enemy-attack'),
    },
    messages: {
      hit: document.getElementById('hit-message'),
      miss: document.getElementById('miss-message'),
      loot: document.getElementById('loot-message'),
      brokenWeapon: document.getElementById('broken-weapon-message'),
      levelUp: document.getElementById('level-up-message'),
    },
  };
}

// TODO: Refactor up
function getState() {
  return state;
}

// TODO: Refactor up
function getData() {
  return data;
}

function printValueWithMax(value, max) {
  return `${value} / ${max}`;
}

function getRandomInteger(from, to) {
  return from + Math.floor((Math.random() * (to - from + 1)));
}

function getRandomArrayElement(arr) {
  const index = getRandomInteger(0, arr.length - 1);
  return arr[index];
}
