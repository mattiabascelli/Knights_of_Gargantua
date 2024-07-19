
//Dichiarazione valori iniziali giocatore
var player = {
    level: 1,
    max_health: 25,
    health: 25,
    defense: 0,
    attack: 4,
    xp: 0,
    max_xp: 50,
    money: 0,
    max_money: 50,
    healing_potions: 2,
    max_potions: 5,
    weapon_durability: 0,
    extra_attack: 0,
    armor_durability:0
}

//Dichiarazione armi e armature acquistabili
var merch_weapons = [
    { name: "Mannaia d'acciaio", attack: 2, price: 10, durability: 6 },
    { name: "Ascia del Boia", attack: 4, price: 14, durability: 8 },
    { name: "Stella del Mattino", attack: 6, price: 18, durability: 12 },
    { name: "Catena Uncinata", attack: 4, price: 12, durability: 8 },
    { name: "Spada degli Umili", attack: 15, price: 45, durability: 20 }
]

var merch_armor = [
    { name: "Scudo del Credo", protection: 2, durability: 8, price: 5 },
    { name: "Cotta di Maglio Nero", protection: 3, durability: 7, price: 3 },
    { name: "Vesti dell'Inquisitore", protection: 4, durability: 10, price: 7 },
    { name: "Armatura del Vespro", protection: 10, durability: 15, price: 15 }
]

//variabile globale che contiene il nome del mostro che uccide il protagonista
var new_winner;

//oggetto mostro: nome e titolo in una lista, livello, attacco e salute vengono estrapolati dal livello dell'eroe per un'esperienza bilanciata
var enemy = {
    name: ["Xordar ", "Zhondor ", "Gorroth ", "Holtahgar ", "Martakith ","Drakthar ", "Zorgan ", "Brakkhus'tar ", "Velgorth ", "Ignar ", "Thalor'kur ", "Xerxes'za ", "Ulthorg ", "Vorgarath ", "Krynn'tor ",
        "Artharion ", "Borath'thug ", "Lazari'kerh ", "Morkain'thur "],
    title: ["il silente", "la furia del Velo", "benedetto dal Velo", "il Santo", "il senza piet�", "alfiere di Shub'Zuray", "figlio di Velo", "la spada insaziabile", "l'impuro", "la follia errante", "il mai domo"]
}

function startGame() {
    //Se non viene scelto il nome, viene assegnato "Cavaliere Errante"
    document.getElementById("name").value == null || document.getElementById("name").value == "" ? player.name = "Cacciatore Errante" : player.name = document.getElementById("name").value;
    startPlayer();
    startEnemy();
    document.getElementById("introduction").classList.add("hide");
    document.getElementById("introduction").classList.remove("show");
    document.getElementById("game-screen").classList.add("show");
    document.getElementById("game-screen").classList.remove("hide");
}
    function startPlayer() {
        //assegnazione dei valori all'eroe
        document.getElementById("player-name").textContent = player.name;
        document.getElementById("player-level").textContent = player.level;
        document.getElementById("player-health").textContent = player.health + "/" + player.max_health;
        document.getElementById("player-attack").textContent = player.attack + player.extra_attack;
        document.getElementById("player-xp").textContent = player.xp + "/" + player.max_xp;
        document.getElementById("player-money").textContent = player.money + "/" + player.max_money;
        document.getElementById("player-healing-potion").textContent = player.healing_potions + "/" + player.max_potions;
        if (player.armor_durability != 0) {//La resistenza di arma e scudo solo se equipaggiati
            document.getElementById("armor-durability").textContent = "Resistenza Armatura: " + player.armor_durability;
        } else {
            document.getElementById("armor-durability").textContent = "";
        }
        if (player.weapon_durability != 0) {
            document.getElementById("weapon-durability").textContent = "Resistenza Arma: " + player.weapon_durability;
        } else {
            document.getElementById("weapon-durability").textContent = "";
        }
        //Quando la vita dell'eroe � sotto un terzo della salute massima lo schermo diventa rosso
        if (player.health < (player.max_health / 3)) {
            document.getElementById("player-health").style.color = "red";
            
        } else {
            document.getElementById("player-health").style.color = "black";
            
        }

    }

function startEnemy() {
        const MAX = 6;
        var numz = Math.trunc(MAX * Math.random()) + 1;
        //assegnazione dei valori al nemico
        document.getElementById("enemy").classList.remove("hide")
        document.getElementById("enemy-name").textContent = enemy.name[Math.floor(Math.random() * enemy.name.length)] + enemy.title[Math.floor(Math.random() * enemy.title.length)];
        document.getElementById("enemy-level").textContent = Math.floor(Math.random() * parseInt(player.level) + player.level / 3 + 1)
        document.getElementById("enemy-health").textContent = Math.floor(Math.random() * parseInt(document.getElementById("enemy-level").textContent * 10) + (player.level * 2));
        document.getElementById("enemy-attack").textContent = Math.floor(Math.random() * parseInt(document.getElementById("enemy-level").textContent * 4) + (player.level * 2));
        enemyimg.src = "img/mostro" + numz + ".png";
        clearMessages();

    };

    function attack() {
        if (parseInt(document.getElementById("enemy-health").textContent) <= 0) {
            document.getElementById("hit-message").textContent = "Non infierire sul cadavere!"
        } else {
            if (Math.floor(Math.random() * 10) >= 9) {//una possibilit� su dieci di mancare il bersaglio
                //ad ogni attacco il valore della salute viene estrapolato dalla scheda per non intaccare quello nell'array
                enemyAttack()
                document.getElementById("miss-message").textContent = "Bersaglio mancato!"
            } else {
                clearMessages()
                let enemy_health = parseInt(document.getElementById("enemy-health").textContent);
                enemy_health -= player.attack + player.extra_attack;
                if (player.weapon_durability > 0) {
                    player.weapon_durability--;
                    if (player.weapon_durability == 0) {
                        document.getElementById("broken-weapon-message").textContent = "La tua arma si � rotta!"
                        player.extra_attack = 0;
                    }
                }
                document.getElementById("enemy-health").textContent = enemy_health;
                enemy_health > 0 ? enemyAttack() : enemyDeath();

            }
        }
        //a ogni attacco si aggiornano i valori
        startPlayer();
    };


    function enemyAttack() {//una possibilit� su dieci di mancare il bersaglio
        if (Math.floor(Math.random() * 10) >= 9) {
            document.getElementById("miss-message").textContent += "Sei stato mancato!"
        } else {
            clearMessages()
            let enemy_attack = parseInt(document.getElementById("enemy-attack").textContent);
            player.defense != 0 ? player.health -= Math.floor(enemy_attack - (enemy_attack * player.defense / 100)) : player.health -= enemy_attack;
            player.health > 0 ? document.getElementById("hit-message").textContent = "Sei stato colpito! " : new_winner = playerDeath();
            if (player.armor_durability > 0) {
                player.armor_durability--;
                if (player.armor_durability == 0) {
                    document.getElementById("hit-message").textContent = "L'armatura � danneggiata!"
                    player.defense = 0;
                }
            }
            startPlayer();
        }
    };

    function enemyDeath() {
        document.getElementById("enemy-health").textContent = 0;
        document.getElementById("miss-message").textContent = "Un mostro in meno a Gargantua. Continua la tua ronda..";
        let loot = getLoot();
        let xp = getXp();
        document.getElementById("loot-message").textContent = loot + xp;
        setTimeout(function () { document.getElementById("enemy").classList.add("hide") }, 2000);
        setTimeout(startEnemy, 2600);
    };

    function playerDeath() {
        new_winner = document.getElementById("enemy-name").textContent;
        document.getElementById("player").style.display = "none";
        document.getElementById("enemy").classList.add("hide");
        document.getElementById("enemy").style.display = "none";
        setTimeout(function () {
            document.getElementById("game-screen").innerHTML += `<div id="death-screen">
        <h1>${player.name}, sei stato Sconfitto!</h1>
        <p>${new_winner} ti ha massacrato.. la tua anima ora � stata risucchiata dal vuoto e ${new_winner} ha preso il tuo posto...
        </p>
        <button class="button" onclick="restart()">Riprova</button>
        </div>`
        }, 1000)
        return new_winner;


    };

    function restart() {
        player = {
            name: new_winner,
            level: 1,
            max_health: 25,
            health: 1,
            defense: 0,
            attack: 4,
            xp: 0,
            max_xp: 50,
            money: 0,
            healing_potions: 2,
            max_potions: 5,
            weapon_durability: 0,
            extra_attack: 0,
            armor_durability: 0
        }
        document.getElementById("death-screen").remove();
        document.getElementById("player").style.display = "inline-block";
        document.getElementById("enemy").style.display = "inline-block";
        document.getElementById("game-screen").style.backgroundColor = "none";
        startPlayer();
        startEnemy();
    }

    function getLoot() {
        //una possibilit� su due di ottenere soldi, una su quattro di ottenere pozioni di attacco e una su quattro di ottenere pozioni di salute
        let random = Math.floor(Math.random() * 3);
        let potions = Math.floor(Math.random() * 2 + 1);
        let money = Math.floor(Math.random() * (10 * player.level) + 1);
        //if (potions > (player.level + 7)) {//Per evitare che, andando avanti nel gioco, si ottengano troppe pozioni
        //    potions = (player.level + 7);
        //}
        switch (random) {
            case 0:
            case 1:
                if ((player.money + money) > player.max_money) {
                    loot = "La tua borsa delle monete � piena! Hai ottenuto "
                    player.money = player.max_money;
                } else {
                    loot = "Hai ottenuto " + money + " monete e ";
                    player.money += money;
                }
                break;

            default:

                if ((player.healing_potions + potions) > player.max_potions) {
                    loot = "La tua sacca delle pozioni di salute � piena! Hai ottenuto "
                    player.healing_potions = player.max_potions;
                } else {
                    player.healing_potions += potions;
                    loot = "Hai ottenuto " + potions + " pozioni di salute e ";

                }

        }
        return loot;

    };
    function getXp() {
        let points = parseInt(document.getElementById("enemy-attack").textContent);
        xp = points + " punti esperienza."
        player.xp += points;
        if (player.xp >= player.max_xp) {
            levelUp();
        }
        return xp;
    }
    function healthUp() {
        //Vengono restituiti 20 punti salute
        if (player.healing_potions <= 0) {
            document.getElementById("hit-message").innerText = "Non hai pi� pozioni!"
        } else {
            if (player.health === player.max_health) {
                document.getElementById("hit-message").innerText = "Non puoi curarti pi� del massimo!"
            } else {
                player.health += 20;
                player.healing_potions--;
                if (player.health > player.max_health) {
                    player.health = player.max_health;
                }
            }
        }
        startPlayer();
         }
    function levelUp() {
        player.level++;
        player.xp = 0;
        player.max_money += 40;
        player.max_xp = Math.floor(player.max_xp * 1.6);
        player.max_health = Math.floor(player.max_health * 1.55);
        player.health = player.max_health;
        player.attack = Math.floor(player.attack * 1.3);
        document.getElementById("level-up-message").textContent = "Sei salito al livello " + player.level + "!"
        if (player.level % 3 == 0) {
            player.max_potions++;
        }
        startPlayer();
        }

        function shop() {
            //Sparisce lo schermo di gioco ed entra quello del negozio
            document.getElementById("game-screen").classList.add("hide");
            document.getElementById("game-screen").classList.remove("show");
            document.getElementById("container_shop").classList.add("show");
            document.getElementById("container_shop").classList.remove("hide");

            //Generazione di armi e scudi andando a pescare casualmnete dalle relative liste 
            let weapon1 = merch_weapons[Math.floor(Math.random() * merch_weapons.length)];
            let weapon2 = merch_weapons[Math.floor(Math.random() * merch_weapons.length)];
            let shield1 = merch_armor[Math.floor(Math.random() * merch_armor.length)];
            let shield2 = merch_armor[Math.floor(Math.random() * merch_armor.length)];
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
            document.getElementById("container_shop").classList.add("hide");
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
            player.extra_attack = parseInt(document.getElementById("w1_attack").textContent);
            player.weapon_durability = parseInt(document.getElementById("w1_durability").textContent);
            player.money -= parseInt(document.getElementById("w1_price").textContent);
            document.getElementById("money_shop").textContent = player.money;
            document.getElementById("weapon1").classList.add("bought");
            document.getElementById("weapon2").classList.remove("bought");
            
            startPlayer();
        } else {
            document.getElementById("shop_message").textContent = "Non hai abbastanza Monete!";

        }

    }

    function buyWeapon2() {
        if (player.money >= parseInt(document.getElementById("w2_price").textContent)) {
            document.getElementById("shop_message").textContent = "";
            player.extra_attack = parseInt(document.getElementById("w2_attack").textContent);
            player.weapon_durability = parseInt(document.getElementById("w2_durability").textContent);
            player.money -= parseInt(document.getElementById("w2_price").textContent);
            document.getElementById("money_shop").textContent = player.money;
            document.getElementById("weapon2").classList.add("bought");
            document.getElementById("weapon1").classList.remove("bought");
            
            startPlayer();
        } else {
            document.getElementById("shop_message").textContent = "Non hai abbastanza Monete!";

        }
    }

    function buyShield1() {
        if (player.money >= parseInt(document.getElementById("shield1_price").textContent)) {
            document.getElementById("shop_message").textContent = "";
            player.defense = parseInt(document.getElementById("shield1_protection").textContent);
            player.armor_durability = parseInt(document.getElementById("shield1_durability").textContent);
            player.money -= parseInt(document.getElementById("shield1_price").textContent);
            document.getElementById("money_shop").textContent = player.money;
            document.getElementById("shield1").classList.add("bought");
            document.getElementById("shield2").classList.remove("bought");
             startPlayer();
        } else {
            document.getElementById("shop_message").textContent = "Non hai abbastanza soldi!";

        }
    }

    function buyShield2() {
        if (player.money >= parseInt(document.getElementById("shield2_price").textContent)) {
            document.getElementById("shop_message").textContent = "";
            player.defense = parseInt(document.getElementById("shield2_protection").textContent);
            player.armor_durability = parseInt(document.getElementById("shield2_durability").textContent);
            player.money -= parseInt(document.getElementById("shield2_price").textContent);
            document.getElementById("money_shop").textContent = player.money;
            document.getElementById("shield2").classList.add("bought");
            document.getElementById("shield1").classList.remove("bought");
            startPlayer();
        } else {
            document.getElementById("shop_message").textContent = "Non hai abbastanza soldi!";

        }
    }
    function clearMessages() {
        document.getElementById("hit-message").textContent = "";
        document.getElementById("miss-message").textContent = "";
        document.getElementById("loot-message").textContent = "";
        document.getElementById("broken-weapon-message").textContent = "";
        document.getElementById("level-up-message").textContent = "";
    }
