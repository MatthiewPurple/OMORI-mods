(function () {
  oldCreate = Scene_OmoriTitleScreen.prototype.create;
  Scene_OmoriTitleScreen.prototype.create = function () {
      
      if ($modLoader.knownMods.has('modconfigs')) {
        Snek.ModConfigs.addConfig({
          header: 'Damage dealt',
          options: ['50%', '75%', '100%', '125%', '150%', '200%'],
          helpText: 'How much damage you\'ll inflict'
        })

        Snek.ModConfigs.addConfig({
          header: 'Damage taken',
          options: ['50%', '75%', '100%', '125%', '150%', '200%'],
          helpText: 'How much damage you\'ll receive'
        })

        Snek.ModConfigs.addConfig({
          header: 'Experience gained',
          options: ['50%', '75%', '100%', '125%', '150%', '200%'],
          helpText: 'How much experience you\'ll earn'
        })

        Snek.ModConfigs.addConfig({
          header: 'Gold gained',
          options: ['50%', '75%', '100%', '125%', '150%', '200%'],
          helpText: 'How much gold you\'ll earn'
        })

        Snek.ModConfigs.addConfig({
          header: 'Strong and critical hits',
          options: ['100%', '125%', '150%', '200%', '300%', '999%'],
          helpText: 'How efficient moving attacks and critical hits will be'
        })

        Snek.ModConfigs.addConfig({
          header: 'Weak hits and guarding',
          options: ['100%', '75%', '50%', '25%', '10%', '0%'],
          helpText: 'How efficient dull and guarded attacks will be'
        })

        Snek.ModConfigs.addConfig({
          header: 'Multipliers restriction',
          options: ['HS', 'FA', 'Both'],
          helpText: 'Restrict multipliers to HEADSPACE or FARAWAY battles'
        })

        Snek.ModConfigs.addConfig({
          header: 'Number of skills',
          options: ['4', '6', '8', '10', '12', '14'],
          helpText: 'How many skills you can have equipped at once'
        })

        Snek.ModConfigs.addConfig({
          header: 'After a Game Over',
          options: ['Retry', 'Title', 'Permadeath'],
          helpText: 'The option to restart a fight after a Game Over'
        })

        Snek.ModConfigs.addConfig({
          header: 'Stale moves',
          options: ['ENABLE', 'DISABLE'],
          helpText: 'Skills get weaker upon repeated usage'
        })

        Snek.ModConfigs.addConfig({
          header: 'Scary critical hits',
          options: ['ENABLE', 'DISABLE'],
          helpText: 'Critical hits may inflict AFRAID on an ally'
        })
      }

      oldCreate.call(this);
  };
})();
