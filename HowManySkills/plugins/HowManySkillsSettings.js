(function () {
    oldCreate = Scene_OmoriTitleScreen.prototype.create;
    Scene_OmoriTitleScreen.prototype.create = function () {
        
        if ($modLoader.knownMods.has('modconfigs')) {
          Snek.ModConfigs.addConfig({
            header: 'Number of skills',
            options: ['4', '6', '8', '10', '12', '14'],
            helpText: 'How many skills you can have equipped at once'
          })
        }

        oldCreate.call(this);
    };
  })();
  