export function prependHook(hooks: FxOrmNS.Hooks, hookName: string, preLogic: Function) {
	if (typeof hooks[hookName] === 'function') {
		var oldHook = hooks[hookName];
		
		function callOldHook (next: Function|boolean) {
            if (typeof oldHook === 'function') {
                if (oldHook.length > 0)
                    return oldHook.call(this, next)
                
				oldHook.call(this)
			}
			
			if (typeof next === 'function')
				next()
		}
		
		hooks[hookName] = function (next: Function|boolean) {
			if (preLogic.length > 0) {
				var self = this
				return preLogic.call(this, function () {
					callOldHook.call(self, next)
				})
			}

			preLogic.call(this)
			callOldHook.call(this, next)
		};
	} else {
		hooks[hookName] = preLogic;
	}
}