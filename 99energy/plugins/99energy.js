!function() {
    //Raises the energy bar's maximum to 99
    Object.defineProperty(Game_Party.prototype, 'stressEnergyCount', {get: function() {return this._stressEnergyCount;}, set: function (value) {this._stressEnergyCount = value.clamp(0, 99);}, configurable: true});

    
    //Makes sure the energy bar can be properly displayed avec 10
    let old_Sprite_StressBar_prototype_drawStressCountValue = Sprite_StressBar.prototype.drawStressCountValue;
    Sprite_StressBar.prototype.drawStressCountValue = function (value = this._ekgRow) {
        // Clear Text
        this._ekgText.bitmap.clear();
        // Refresh EKG Bitmap
        this._ekgText.bitmap.drawText(value.clamp(0, 99).padZero(2), 0, -4, this._ekgText.bitmap.width, this._ekgText.bitmap.height, 'center');
    };
}()
