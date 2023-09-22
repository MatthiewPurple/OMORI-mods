!function() {
  //Damage dealt and taken modification
  let old_Game_Action_prototype_executeDamage = Game_Action.prototype.executeDamage
  Game_Action.prototype.executeDamage = function(target, value) {
      
      //Config choices
      let custom_damage_dealt = Snek.ModConfigs.checkConfig('Damage dealt').index;
      let custom_damage_taken = Snek.ModConfigs.checkConfig('Damage taken').index;
      let custom_stronghit = Snek.ModConfigs.checkConfig('Strong and critical hits').index;
      let custom_weakhit = Snek.ModConfigs.checkConfig('Weak hits and guarding').index;
      let custom_restriction = Snek.ModConfigs.checkConfig('Multipliers restriction').index;

      //Damage factors and new_value declarations
      let dealt_factor = 1;
      let taken_factor = 1;
      let stronghit_factor = 1;
      let weakhit_factor = 1;
      let new_value = value;

      if (($gameSwitches.value(7) && custom_restriction == 1) || (!$gameSwitches.value(7) && custom_restriction == 0) || custom_restriction == 2) {
        //Sets the dealt factor according to what the user selected 
        switch(custom_damage_dealt) {
        case 0:
            dealt_factor = 0.5;
            break;
        case 1:
            dealt_factor = 0.75;
            break;
        case 2:
            dealt_factor = 1;
            break;
        case 3:
            dealt_factor = 1.25;
            break;
        case 4:
            dealt_factor = 1.5;
            break;
        case 5:
            dealt_factor = 2;
            break;
        }

        //Sets the taken factor according to what the user selected 
        switch(custom_damage_taken) {
            case 0:
                taken_factor = 0.5;
                break;
            case 1:
                taken_factor = 0.75;
                break;
            case 2:
                taken_factor = 1;
                break;
            case 3:
                taken_factor = 1.25;
                break;
            case 4:
                taken_factor = 1.5;
                break;
            case 5:
                taken_factor = 2;
                break;
        }
        
        //Sets the strong hit factor according to what the user selected 
        switch(custom_stronghit) {
        case 0:
            stronghit_factor = 1;
            break;
        case 1:
            tronghit_factor = 1.25;
            break;
        case 2:
            stronghit_factor = 1.5;
            break;
        case 3:
            stronghit_factor = 2;
            break;
        case 4:
            stronghit_factor = 3;
            break;
        case 5:
            stronghit_factor = 9.99;
            break;
        }

        //Sets the weak hit factor according to what the user selected 
        switch(custom_weakhit) {
        case 0:
            weakhit_factor = 1;
            break;
        case 1:
            weakhit_factor = 0.75;
            break;
        case 2:
            weakhit_factor = 0.5;
            break;
        case 3:
            weakhit_factor = 0.25;
            break;
        case 4:
            weakhit_factor = 0.1;
            break;
        case 5:
            weakhit_factor = 0;
            break;
        }
      }    

      //If it's not a "heal", apply the factor
      if (value > 0) {
          if (target.isEnemy()){
            //If the attack hits an enemy, apply "dealt_factor"
            new_value = parseInt(value * dealt_factor);
            
              
          } else {
              //If the attack hits a friend, apply "taken_factor"
              new_value = parseInt(value * taken_factor);
          }
      }

      // Set elemental results
      let elementRate = this.calcElementRate(target);
      MovingAttack = elementRate > 1;
      DullAttack = elementRate < 1;
      var result = target.result();

      if (MovingAttack || result.critical) {
        new_value = parseInt(new_value * stronghit_factor);
      } else if (DullAttack) {
        new_value = parseInt(new_value * weakhit_factor);
      }

      //Does the rest
      old_Game_Action_prototype_executeDamage.call(this, target, new_value)
  };

  Game_Action.prototype.applyGuard = function(damage, target) {
    let custom_weakhit = Snek.ModConfigs.checkConfig('Weak hits and guarding').index;
    let custom_restriction = Snek.ModConfigs.checkConfig('Multipliers restriction').index;

    let weakhit_factor = 1;

    if (($gameSwitches.value(7) && custom_restriction == 1) || (!$gameSwitches.value(7) && custom_restriction == 0) || custom_restriction == 2) {
        //Sets the guarding factor according to what the user selected 
        switch(custom_weakhit) {
        case 0:
            weakhit_factor = 1;
            break;
        case 1:
            weakhit_factor = 0.75;
            break;
        case 2:
            weakhit_factor = 0.5;
            break;
        case 3:
            weakhit_factor = 0.25;
            break;
        case 4:
            weakhit_factor = 0.1;
            break;
        case 5:
            weakhit_factor = 0;
            break;
      }
    }
    
    return (damage > 0 && target.isGuard() ? weakhit_factor * damage / 2 * target.grd : damage);
  };
}()