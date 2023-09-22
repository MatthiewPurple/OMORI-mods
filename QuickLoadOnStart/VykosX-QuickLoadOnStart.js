{
	//Set this to the slot you want to quick load or -1 to load the latest save file
	var $QuickLoadSlot = -1
	
	Scene_Boot.prototype.start = function() {
		
		Scene_Base.prototype.start.call(this);
		SoundManager.preloadImportantSounds();
		
		if (DataManager.isBattleTest()) {
			
			DataManager.setupBattleTest();
			SceneManager.goto(Scene_Battle);
			
		} else if (DataManager.isEventTest()) {
			
			DataManager.setupEventTest();
			SceneManager.goto(Scene_Map);
			
		} else {		
		
			Galv.ASPLASH.splashed = true;
			DataManager.setupNewGame();
			
			Window_TitleCommand.initCommandPosition();
			LoadSave($QuickLoadSlot);
			
		}

		this.updateDocumentTitle();
	}

	function LoadSave(id=-1) {
		
		if (id==-1) id = DataManager.latestSavefileId(); //.lastAccessedSavefileId();

		if (DataManager.loadGame(id)) {
		
			SceneManager._scene.fadeOutAll();    
						
			$gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
			$gamePlayer.requestMapReload();
			
			SceneManager.goto(Scene_Map); SceneManager._scene._loadSuccess = true;
		}
	}
}