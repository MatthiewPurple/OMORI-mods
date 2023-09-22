{
	VykosX_SceneManager_goto = SceneManager.goto;
	
	SceneManager.goto = function(sceneClass) {

		if ($dataActors && !DataManager.isBattleTest()) {
			if(!!StorageManager.exists(44)) {		
				return old_goto.call(this,sceneClass);
			}		
			if (!Galv.ASPLASH.splashed) {
				Galv.ASPLASH.splashed = true;
				sceneClass = Scene_OmoriTitleScreen
			}
		};

		VykosX_SceneManager_goto.call(this,sceneClass);
	}
}