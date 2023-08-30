//=============================================================================
// Event AI
// For RPG Maker MZ
// By Tyruswoo
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.Tyruswoo_EventAI = true;

var Tyruswoo = Tyruswoo || {};
Tyruswoo.EventAI = Tyruswoo.EventAI || {};

/*:
 * @target MZ
 * @plugindesc v1.0 Additional event triggers and commands.
 * @author Tyruswoo and McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help Tyruswoo Event AI for RPG Maker MZ
 *
 * Overview:  This plugin helps your events do more, with fewer commands.
 * * Place a Trigger: Region Entry command in your event, and stepping anywhere
 *   into a region of your choice will trigger it.
 * * Define your Treasure Display Common Event, and you can easily set up
 *   treasure containers your way anywhere in the game with a treasure plugin
 *   command.
 * 
 * ============================================================================
 * Basics of how to use this plugin:
 * 
 * How to Set Up a Region Entry Event on a Map
 * --------------------------------------------
 * 1. Make a new event anywhere on the map. Its location doesn't
 *    matter, as long as it's on the same map as the region it affects.
 * 2. At the top of the event page's command list, create a plugin command:
 *    Tyruswoo_EventAI > Trigger: Region Entry
 *    Set the plugin command's Region ID argument to the region of your choice.
 * 3. Switch to tile editing mode and paint the region you've chosen wherever
 *    you want the event to occur when the player steps in.
 *    The Region Entry Event will now run whenever the party leader steps
 *    from a tile outside the region, to a tile inside the region,
 *    provided that the event page's other conditions are also met.
 *
 * How to Set Up a Region Entry Common Event
 * ------------------------------------------
 * 1. Set up a common event doing what should happen on region entry.
 * 2. Its first command must be the plugin command Tyruswoo_EventAI >
 *    Trigger: Region Entry, with the Region ID argument set to a region
 *    number of your choice.
 * 3. Paint that region number on any maps in your game, and the common event
 *    will run whenever the party leader steps into that region.
 * 
 * How to Set Up Your Game for the Treasure Plugin Command
 * --------------------------------------------------------
 * 1. Open the database and set up a Treasure Display Common Event.
 *    Copy in movement, sound, & self switch setting from a treasure
 *    chest made with Quick Event Creation, or customize display behavior
 *    however you wish. (DO NOT give the item or gold here; the plugin command
 *    handles that beforehand!)
 * 2. You'll probably want the Treasure Display Common Event to tell the player
 *    what the party has received. The text codes <TreasureName>,
 *    <TreasureAmount>, and <TreasureIcon> can help with this.
 *    Treasure script snippets can help you set conditions for different
 *    eventing based on treasure type, quantity, etc. Refer to the Text Codes
 *    and Script Calls sections below for specifics.
 * 3. Once your Treasure Display Common Event is ready, open Tyruswoo_EventAI
 *    in the Plugin Manager, edit the plugin parameter Treasure Display Common
 *    Event, and pick from the list of common events.
 * Now the Treasure plugin commands will run the common event you made.
 * 
 * How to Use Treasure Plugin Commands
 * ------------------------------------
 * 1. Create a new event. Set its appearance to whatever holds the treasure,
 *    as it looks before the player gets the treasure.
 * 2. Add a plugin command to the event. Pick Tyruswoo_EventAI plugin, and one
 *    of the Treasure plugin commands. Set the treasure item or amount
 *    using the plugin command's arguments. That's all you need in the list!
 * 3. To make the treasure obtainable only once, add a new page to the treasure
 *    event. This page's condition should be the same self switch the Treasure
 *    Display Common Event turns on. Set this page's appearance to what you
 *    want the player to see when the treasure has already been taken. Since
 *    this second page doesn't give treasure, it needs no treasure plugin
 *    command.
 * 4. This treasure event is now ready to run. Making more treasure events
 *    like this one will be even easier; copy-paste them, open each copy, and
 *    change its treasure plugin command to give whatever treasure you want,
 *    wherever you place the event.
 * 
 * ============================================================================
 * Plugin parameters:
 * 
 * Treasure Display Common Event
 * This is the common event that an event will call when it runs any treasure
 * plugin command, _after_ the party receives the treasure. (Do not use this
 * common event to give treasure; the plugin command has already done that!)
 * The Treasure Display Common Event can show the treasure chest opening,
 * play a sound, show text telling what item the party received, set
 * a self switch to ensure that the treasure can be opened only once, and
 * anything else you write into it.
 * 
 * ============================================================================
 * Trigger Plugin Commands:
 * 
 * Trigger plugin commands are placed at the beginning of the command list of
 * any event page that should have their custom trigger.
 * A custom trigger overrides its page's RMMZ-defined trigger
 * (e.g. Action Button, Player Touch, ...)
 * As with pages with standard RMMZ triggers, a page with a custom trigger
 * runs only if the page's conditions (switch, variable, etc.) are met.
 * 
 * Trigger: Region Entry
 * Put this plugin command at the top of the command list of any event page
 * that should run when the player steps into a given region, specified in the
 * plugin command's Region ID argument. The page so marked will run only when
 * the player steps into the region from another region. It will not run when
 * the player starts the game in the region, nor when the player is placed in
 * the region by a transfer command.
 * The region entry event itself can be placed anywhere on the map.
 * 
 * ============================================================================
 * Treasure plugin commands:
 * 
 * Every treasure plugin command first gives the indicated treasure to the
 * party, and then calls the Treasure Display Common Event.
 * 
 * Treasure: Item
 * Give a non-equippable item (regular item or key item) as treasure.
 * 
 * Treasure: Weapon
 * Give a weapon as treasure.
 * 
 * Treasure: Armor
 * Give an armor as treasure.
 * 
 * Treasure: Gold
 * Give some amount of the game's currency as treasure.
 * 
 * ============================================================================
 * Treasure text codes:
 *
 * Use these in text commands to show information about the loot given by the
 * most recent treasure plugin command. They're designed for your convenicence
 * in writing your Treasure Display Common Event.
 * ------------------+---------------------------------------------------------
 * Text code         | Description
 * ------------------+---------------------------------------------------------
 * <TreasureName>    | The name of the item, weapon, or armor most recently
 *                   | given. If gold, the name is the currency term.
 *                   |
 * <TreasureIcon>    | The icon, if any, corresponding to the treasure most
 *                   | given.
 *                   |
 * <TreasureAmount>  | How many items, or how much gold, came from the most
 *                   | recent treasure.
 * ------------------+---------------------------------------------------------
 * 
 * Example sentence using our text codes (plus an RMMZ text code):
 * 
 *     \P[1] found <TreasureIcon><TreasureName> x<TreasureAmount>!
 * 
 * ============================================================================
 * Script calls:
 * 
 * The following script phrases may be useful when checking for conditions
 * or doing other custom processing during eventing.
 * ------------------------------------+--------------------------------------
 * Attribute                           | Description
 * ------------------------------------+--------------------------------------
 * Tyruswoo.EventAI.sprite.name        | The name (without extension) of the
 *                                     | active event's sprite file.
 *                                     | This is readable/writable.
 *                                     |
 * Tyruswoo.EventAI.sprite.index       | The index giving the position of the
 *                                     | active event's sprite in its file.
 *                                     | This is readable/writable.
 *                                     |
 * Tyruswoo.EventAI.sprite.tileId      | The ID of the tile used for this
 *                                     | event's image, if a tile is used.
 *                                     | This is readable/writable.
 *                                     |
 * Tyruswoo.EventAI.treasure.amount    | How much gold came from the latest
 *                                     | treasure. If an item, amount is 1.
 *                                     |
 * Tyruswoo.EventAI.treasure.data      | The treasure's full database entry.
 *                                     |
 * Tyruswoo.EventAI.treasure.iconIndex | The index of the treasure's icon
 *                                     |
 * Tyruswoo.EventAI.treasure.id        | The database index of this item,
 *                                     | weapon, or armor.
 *                                     |
 * Tyruswoo.EventAI.treasure.name      | Name of this item, weapon, or armor.
 *                                     | If gold, name is the currency term.
 *                                     |
 * Tyruswoo.EventAI.treasure.success   | Boolean value. True if the treasure
 *                                     | was given. False if it couldn't be
 *                                     | given, such as when the party's
 *                                     | inventory can't fit that item.
 *                                     |
 * Tyruswoo.EventAI.treasure.type      | 'item', 'weapon', 'armor', or 'gold'
 * ------------------------------------+--------------------------------------
 * Tyruswoo.EventAI.sprite refers to the image of the event that's currently
 * running. It can be used for a variety of purposes, including treasure
 * container style checking. 
 * Tyruswoo.EventAI.treasure and its attributes refer to the most recent
 * treasure given by a Tyruswoo.EventAI treasure plugin command. The Treasure
 * Display Common Event, or other events if needed, can reference it.
 * Examples below.
 * 
 * The following script condition checks if treasure was gold:
 *     'gold' == Tyruswoo.EventAI.treasure.type
 * 
 * This script condition checks if more than 100 gold were given:
 *     Tyruswoo.EventAI.treasure.amount > 100
 * 
 * This condition is met if the item could NOT be given:
 *      false == Tyruswoo.EventAI.success
 * 
 * This condition is met if the event's image file is !Barrel.png:
 *     '!Barrel' == Tyruswoo.EventAI.sprite.name
 * 
 * ============================================================================
 * For more help using the Event AI plugin, see Tyruswoo.com.
 * ============================================================================
 * Version History:
 *
 * v1.0  11/5/2021
 *        - Event AI released for RPG Maker MZ!
 *        - Region Entry events and common events
 *        - Treasure plugin command calls your treasure common event
 * 
 * v1.0.1  8/30/2023
 *        - This plugin is now free and open source under the MIT license.
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Remember, only you can build your dreams!
 * -Tyruswoo
 * 
 * @param Treasure Display Common Event
 * @type common_event
 * @desc Treasure plugin commands call this common event after giving the treasure.
 * 
 * @command page_trigger_region_entry
 * @text Trigger: Region Entry
 * 
 * @arg region_id
 * @text Region ID
 * @type number
 * @min 1
 * @max 255
 * 
 * 
 * 
 * 
 * @command treasure_item
 * @text Treasure: Item
 * 
 * @arg id
 * @text item
 * @type item
 * @desc This item is given as treasure.
 * 
 *
 * @command treasure_weapon
 * @text Treasure: Weapon
 * 
 * @arg id
 * @text weapon
 * @type weapon
 * @desc This weapon is given as treasure.
 * 
 * 
 * @command treasure_armor
 * @text Treasure: Armor
 * 
 * @arg id
 * @text armor
 * @type armor
 * @desc This armor is given as treasure.
 * 
 * 
 * @command treasure_gold
 * @text Treasure: Gold
 * 
 * @arg amount
 * @type number
 * @min 1
 * @desc The treasure gives this many gold (or whatever this game's currency is).
 * 
 */

(() => {
    const pluginName = "Tyruswoo_EventAI";

    //=============================================================================
	// Parameters and Constants
	//=============================================================================

	Tyruswoo.EventAI.parameters = PluginManager.parameters(pluginName);
	Tyruswoo.EventAI.param = Tyruswoo.EventAI.param || {};

	Tyruswoo.EventAI.param.treasureDisplayCommonEvent =
		Tyruswoo.EventAI.parameters["Treasure Display Common Event"];


	Tyruswoo.EventAI.TriggerCode = { regionEntry: 5, followerTouch: 6 }

	//=============================================================================
	// Plugin Command Definitions
	//=============================================================================

	PluginManager.registerCommand(pluginName, "page_trigger_region_entry", args => {
		// No action needed when the page is run.
		// Instead, this plugin command functions as a page tag.
		// It is read on map setup as a custom trigger ID for its page.
		// This one calls for trigger on region entry.
	});

	PluginManager.registerCommand(pluginName, "page_trigger_follower_touch", args => {
		// No action needed when the page is run.
		// Instead, this plugin command functions as a page tag.
		// It is read on map setup as a custom trigger ID for its page.
		// This one calls for trigger when the event touches player or follower.
	});

	PluginManager.registerCommand(pluginName, "treasure_item", args => {
		Tyruswoo.EventAI.giveTreasureItem('item', args.id, 1);
	});

	PluginManager.registerCommand(pluginName, "treasure_weapon", args => {
		Tyruswoo.EventAI.giveTreasureItem('weapon', args.id, 1);
	});

	PluginManager.registerCommand(pluginName, "treasure_armor", args => {
		Tyruswoo.EventAI.giveTreasureItem('armor', args.id, 1);
	});

	PluginManager.registerCommand(pluginName, "treasure_gold", args => {
		Tyruswoo.EventAI.giveTreasureGold(args.amount);
	});

	//=============================================================================
	// Custom Page Triggers
	//=============================================================================

	Tyruswoo.EventAI.findCustomPageTrigger = function(list) {
		const PLUGIN_COMMAND_CODE = 357;
		for (let i = 0; i < list.length && PLUGIN_COMMAND_CODE == list[i].code; i++) {
			// This loop checks any plugin commands
			// at the beginning of the page's list.
			let params = list[i].parameters;
			let commandPluginName = Utils.extractFileName(params[0]);

			if (commandPluginName == pluginName) {
				// It's one of this plugin's commands.
				let commandName = params[1];
				let args = params[3];
				switch (commandName) {
					case 'page_trigger_region_entry':
						return {
							triggerId: Tyruswoo.EventAI.TriggerCode.regionEntry,
						 	regionId: Number(args.region_id)
						}
						break;
					case 'page_trigger_follower_touch':
						return {
							triggerId: Tyruswoo.EventAI.TriggerCode.followerTouch
						}
						break;
					// Other commands don't need processing on page setup, so are ignored.
				} // end switch on command name
			} // endif plugin command belongs to this plugin
		} // endfor each plugin command at the beginning of the command list
		return null; // No custom trigger found.
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_setupPageSettings =
		Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		Tyruswoo.EventAI.Game_Event_setupPageSettings.call(this);
		var customTrigger = Tyruswoo.EventAI.findCustomPageTrigger(this.list());
		if (customTrigger) {
			this._trigger = customTrigger.triggerId;
			if (customTrigger.regionId) {
				this._regionId = customTrigger.regionId;
			}
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_CommonEvent_initialize = 
		Game_CommonEvent.prototype.initialize;
	Game_CommonEvent.prototype.initialize = function(commonEventId) {
		Tyruswoo.EventAI.Game_CommonEvent_initialize.call(this, commonEventId);
		var customTrigger = Tyruswoo.EventAI.findCustomPageTrigger(this.list());
		if (customTrigger) {
			this._trigger = customTrigger.triggerId;
			if (customTrigger.regionId) {
				this._regionId = customTrigger.regionId;
			}
		} else {
			this._trigger = this.event().trigger;
		}
	};

	// New method
	Game_CommonEvent.prototype.trigger = function() {
		return this._trigger;
	};

	// New method
	Game_CommonEvent.prototype.regionId = function() {
		return this._regionId;
	};

	//=============================================================================
	// Region Entry Events and Common Events
	//=============================================================================

	// Alias method
	// Appends region entry event trigger checking upon arrival at a tile.
	Tyruswoo.EventAI.Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving;
	Game_Player.prototype.updateNonmoving = function(wasMoving, sceneActive) {
		Tyruswoo.EventAI.Game_Player_updateNonmoving.call(this, wasMoving, sceneActive);
		if (wasMoving && !$gameMap.isEventRunning()) {
			// If player is arriving at a tile, and no other event is running yet,
			// check if this tile change marks a region change.
			if (this.checkRegionChange()) {
				// Start the region entry event, if any.
				$gameMap.startRegionEntryEvent(this.regionId());
			}
		}
	};

	// New method
	// Checks whether the player's region has changed since the last time
	// a region check was made.
	Game_Player.prototype.checkRegionChange = function() {
		let currentRegionId = this.regionId();
		let isChanged = currentRegionId != this._lastRegionId;
		this._lastRegionId = currentRegionId;
		return isChanged;
	};

	// New method
	// Based on Game_Player's startMapEvent, but tailored to region entry events.
	Game_Map.prototype.startRegionEntryEvent = function(regionId) {
		if (!this.isEventRunning()) {
			for (const event of this.regionEntryEvents(regionId)) {
				event.start();
			}
			for (const commonEvent of this.regionEntryCommonEvents(regionId)) {
				this._interpreter.setup(commonEvent.list());
			}
		}
	};

	// New method
	// Returns events for which the trigger is entering a given region.
	// If no region ID given, this will return all region entry events on the map.
	Game_Map.prototype.regionEntryEvents = function(regionId=null) {
		return this.events().filter(event => event.isRegionEntryEvent(regionId));
	};

	// New method
	// Returns common events for which the trigger is entering a given region.
	// If no region ID given, this will return all region entry common events.
	Game_Map.prototype.regionEntryCommonEvents = function(regionId=null) {
		if (!this._regionEntryCommonEvents) {
			this._regionEntryCommonEvents = [];
			for (let i = 1; i < $dataCommonEvents.length; i++) {
				let customTrigger = Tyruswoo.EventAI.findCustomPageTrigger(
					$dataCommonEvents[i].list);
				if (customTrigger && customTrigger.triggerId == Tyruswoo.EventAI.TriggerCode.regionEntry) {
					this._regionEntryCommonEvents.push(new Game_CommonEvent(i));
				}
			}
		}

		return this._regionEntryCommonEvents.filter(commonEvent =>
			commonEvent.isRegionEntryEvent(regionId));
	};

	// New method
	// Checks whether this is a region entry event for a specified region ID.
	// If no region ID given, checks whether this is a region entry event in general.
	Game_Event.prototype.isRegionEntryEvent = function(regionId=null) {
		return this._trigger == Tyruswoo.EventAI.TriggerCode.regionEntry &&
			(this._regionId == regionId || null == regionId);
	};

	// New method
	// Checks whether this is a region entry common event
	// matching the given region ID (or any region ID, if null)
	Game_CommonEvent.prototype.isRegionEntryEvent = function(regionId=null) {
		return this._trigger == Tyruswoo.EventAI.TriggerCode.regionEntry &&
			(this._regionId == regionId || null == regionId);
	};

	//=============================================================================
	// Event Reference and Script Call Helps
	//=============================================================================

	// New method
	Game_Map.prototype.activeEventInterpreter = function() {
		return this.isEventRunning() ? this._interpreter : null;
	};

	// New method
	Game_Map.prototype.activeEventCharacter = function() {
		if (this._interpreter) {
			return this.event(this._interpreter.eventId());
		} else {
			return null;
		}
	};

	//-----------------------------------------------------------------------------
	// SpriteInfo class
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.SpriteInfo = function(character) {
		this._character = character;
	};

	Tyruswoo.EventAI.SpriteInfo.prototype.setImage = function(name, index) {
		if (this._character) {
			this._character.setImage(name, index);
		} else {
			console.warn("No event is active; no image can be set.");
		}
	};

	Tyruswoo.EventAI.SpriteInfo.prototype.setTileImage = function(name, index) {
		if (this._character) {
			this._character.setTileImage(tileId);
		} else {
			console.warn("No event is active; no tile image can be set.");
		}
	};

	Object.defineProperties(Tyruswoo.EventAI.SpriteInfo.prototype, {
		name: {
			get: function() {
				return this._character ? this._character.characterName() : "";
			},
			set: function(value) {
				if (this._character) {
					this._character.setImage(value, this._character.characterIndex());
				} else {
					console.warn("This event has no character; cannot set image name.");
				}
			},
			enumerable: true
		},
		index: {
			get: function() {
				return this._character ? this._character.characterIndex() : 0;
			},
			set: function(value) {
				if (this._character) {
					this._character.setImage(this._character.characterName(), value);
				} else {
					console.warn("This event has no character; cannot set image index.");
				}
			},
			enumerable: true
		},
		tileId: {
			get: function() {
				return this._character.tileId();
			},
			set: function(value) {
				this._character.setTileImage(value);
			}, 
			enumerable: true
		}
	})

	// Tyruswoo.EventAI.sprite

	Object.defineProperty(Tyruswoo.EventAI, 'sprite', {
		get: function() {
			var c = $gameMap.activeEventCharacter();
			return new Tyruswoo.EventAI.SpriteInfo(c);
		},
		set: function(obj) {
			var c = $gameMap.activeEventCharacter();
			if (c) {
				if (!obj) {
					c.setImage("", 0); // clears image
				} else if (obj.name) {
					c.setImage(obj.name, obj.index);
				} else if (obj.tileId) {
					if ('function' == typeof obj.tileId) {
						c.setTileImage(obj.tileId());
					} else {
						c.setTileImage(obj.tileId);
					}
				} else if (obj.characterName) {
					if ('function' == typeof obj.characterName) {
						c.setImage(obj.characterName(), obj.characterIndex());
					} else {
						c.setImage(obj.characterName, obj.characterIndex);
					}
				} else { // Expected attributes not found.
					console.warn("Could not read sprite info. No changes made.\n" +
						"Expected object with attributes 'name' and 'index'.");
				}
			} else {
				console.warn("No active event. Could not set sprite.");
			}
		},
		enumerable: false
	});

	//=============================================================================
	// Treasure
	//=============================================================================
	// Treasure giving helper methods
	//-----------------------------------------------------------------------------

	Object.defineProperty(Tyruswoo.EventAI, 'treasure', {
		get: function() { return $gameTemp.lastTreasure; },
		enumerable: true
	});

	Tyruswoo.EventAI.giveTreasureItem = function(itemType, itemId, amount) {
		itemType = itemType.toLowerCase();
		itemId = Number(itemId);
		amount = Number(amount);
		var database;
		switch(itemType) {
			case 'item': database = $dataItems; break;
			case 'weapon': database = $dataWeapons; break;
			case 'armor': database = $dataArmors; break;
			default: database = $dataItems;
		}
		var data = database[itemId];
		var itemGiven = !$gameParty.hasMaxItems(data);
		if (itemGiven) {
			$gameParty.gainItem(data, amount, true);
		}

		$gameTemp.lastTreasure = {
			id: itemId,
			data: data,
			name: data.name,
			iconIndex: data.iconIndex,
			type: itemType,
			amount: amount,
			success: itemGiven
		};

		this.runTreasureDisplayCommonEvent();
	};

	Tyruswoo.EventAI.giveTreasureGold = function(amount) {
		amount = Number(amount);
		var goldGiven = $gameParty.gold() < $gameParty.maxGold();
		if (goldGiven) {
			$gameParty.gainGold(amount);
		}

		$gameTemp.lastTreasure = {
			name: TextManager.currencyUnit,
			type: 'gold',
			amount: amount,
			success: goldGiven
		};

		this.runTreasureDisplayCommonEvent();
	};

	Tyruswoo.EventAI.runTreasureDisplayCommonEvent = function() {
		if ($gameMap.isEventRunning()) {
			$gameMap.activeEventInterpreter().command117(
				[ Tyruswoo.EventAI.param.treasureDisplayCommonEvent ]);
		} else {
			$gameTemp.reserveCommonEvent(
				Tyruswoo.EventAI.param.treasureDisplayCommonEvent);
		}
	};

	//-----------------------------------------------------------------------------
	// Treasure text codes and script call helps
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.Window_Base_convertEscapeCharacters =
		Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = Tyruswoo.EventAI.convertTreasureTextCodes(text);
		return Tyruswoo.EventAI.Window_Base_convertEscapeCharacters.call(
			this, text);
	};

	Tyruswoo.EventAI.convertTreasureTextCodes = function(text) {
		const treasure = this.treasure;
		if (treasure) {
			text = text.replace(/<treasure[ _\-]?name>/gi,
				treasure.name);
			text = text.replace(/<treasure[ _\-]?icon>/gi,
				treasure.iconIndex ? "\\i[" + treasure.iconIndex + "]" : "");
			text = text.replace(/<treasure[ _\-]?(?:amount|quantity)>/gi,
				treasure.amount.toString());
		}
		return text;
	};

})();