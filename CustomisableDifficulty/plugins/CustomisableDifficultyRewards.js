!function() {
  //Experience and gold modification
  BattleManager.makeRewards = function() {

      //Config choices
      let custom_exp_gained = Snek.ModConfigs.checkConfig('Experience gained').index;
      let custom_gold_gained = Snek.ModConfigs.checkConfig('Gold gained').index;
      let custom_restriction = Snek.ModConfigs.checkConfig('Multipliers restriction').index;

      //Reward factors declarations
      let exp_factor = 1;
      let gold_factor = 1;
      
      //Checks if the player is in HEADSPACE or FARAWAY
      if (($gameSwitches.value(7) && custom_restriction == 1) || (!$gameSwitches.value(7) && custom_restriction == 0) || custom_restriction == 2) {
        //Sets the gold factor according to what the user selected 
        switch(custom_exp_gained) {
            case 0:
                exp_factor = 0.5;
                break;
            case 1:
                exp_factor = 0.75;
                break;
            case 2:
                exp_factor = 1;
                break;
            case 3:
                exp_factor = 1.25;
                break;
            case 4:
                exp_factor = 1.5;
                break;
            case 5:
                exp_factor = 2;
                break;
        }

        //Sets the gold factor according to what the user selected 
        switch(custom_gold_gained) {
            case 0:
                gold_factor = 0.5;
                break;
            case 1:
                gold_factor = 0.75;
                break;
            case 2:
                gold_factor = 1;
                break;
            case 3:
                gold_factor = 1.25;
                break;
            case 4:
                gold_factor = 1.5;
                break;
            case 5:
                gold_factor = 2;
                break;
        }
      }

      //Apply factors
      this._rewards = {};
      this._rewards.gold = parseInt(gold_factor * $gameTroop.goldTotal());
      this._rewards.exp = parseInt(exp_factor * $gameTroop.expTotal());
      this._rewards.items = $gameTroop.makeDropItems();
  };
}()