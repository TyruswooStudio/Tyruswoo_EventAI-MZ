//=============================================================================
// Event AI
// For RPG Maker MZ
// By Tyruswoo and McKathlin
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
 * @plugindesc MZ v2.3.3 Additional event triggers and commands.
 * @author Tyruswoo and McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help Tyruswoo Event AI for RPG Maker MZ
 * Overview:  This plugin helps your events do more, with fewer commands.
 * * Place "Trigger: Region Entry" command in your event, and stepping anywhere
 *   into a region of your choice will trigger it. For example, this is useful
 *   for making a single transfer event triggered from stepping anywhere
 *   containing the region, which can be useful for the edges of maps.
 * * Place a Trigger: Map Setup command in your event to make it run at map
 *   setup, before autorun events. For example, if you are using the Event
 *   Generator plugin when the player enters a map, place the Trigger: Map
 *   Setup command at the beginning of the page to ensure events generate
 *   before autorun events start.
 * * Linked Events allow you to affect or reference some other event from
 *   within the active event. For example, you can set self switches of other
 *   events, or use another event's self switch to determine a conditional
 *   branch.
 * * Define your Treasure Display Common Event, and you can easily set up
 *   treasure containers your way anywhere in the game with any Treasure plugin
 *   command.
 * * Linked events allow checking and changing properties of an
 *   event that is not the currently active event. For example, you can check
 *   a self switch, change a self switch, etc, just as you would do for the
 *   active event; all you must do is first assign the linked event.
 *   (This is similar to how the Follower Control plugin allows affecting a
 *   follower using player commands. Likewise, with Linked Events, commands
 *   that would affect or reference the current event instead affect or
 *   reference the linked event.)
 * * Check and set self variables and additional self switches.
 *   Start a variable's or switch's name with s:, and it can serve as a self
 *   variable or self switch for any event you run or link.
 * * Use Weighted Branches to allow selecting a branch at random, depending on
 *   its relative weight.
 * * To make NPC routes more responsive to player actions, use script snippets
 *   to put conditional branches and expression balloons inside routes.
 * * The "Random Mover Touch" plugin parameter and the "Trigger: Party Touch"
 *   plugin command give you more options for how NPCs can start touch events.
 * * Helpful script snippets like $gameMap.name() and $gameMap.activeEvent()
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
 * How to Set Up Your Game for Treasure Plugin Commands
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
 * Now all Treasure plugin command calls will run the common event you made.
 * 
 * How to Use Treasure Plugin Commands
 * ------------------------------------
 * 1. Create a new event. Set its appearance to whatever holds the treasure,
 *    as it looks before the player gets the treasure.
 * 2. Add a plugin command to the event. Pick Tyruswoo_EventAI plugin, and one
 *    of the Treasure plugin commands. Set the treasure item or gold amount
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
 * How to Make Weighted Random Branches
 * -------------------------------------
 * 1. Open the Event Editor to a page that needs a randomly selected outcome.
 * 2. Start a random branch with this plugin's Weight command. Set the Weight
 *    argument to any positive number. This number represents the new branch's
 *    likelihood of being selected compared to other branches in the set.
 *    For instance, a branch with Weight 20 is twice as likely to be selected
 *    as a branch with Weight 10.
 * 3. Add a sequence of commands that should happen if this branch is randomly
 *    selected.
 * 4. Repeat steps 2 and 3 to create alternate weighted random branches that
 *    could happen in place of this one. Each new Weight command at the same
 *    indentation level ends the weighted random branch that precedes it.
 * 5. To close the current set of weighted random branches, add the plugin
 *    command End Weight Branches. Commands added below this point will run
 *    regardless of which random branch just finished running.
 * Each time an event page runs, a fresh random selection is made for each set
 * of weighted random branches. Making this selection doesn't require any
 * variables or switches.
 * One event page can contain multiple sets of weighted random branches,
 * either by ending a set before starting another, or by putting weighted sets
 * at different indentation levels or inside different choice branches or
 * conditional branches.
 * 
 * How to Let a Randomly Moving NPC Start Its Own Touch Event
 * -----------------------------------------------------------
 * 1. Open the Plugin Manager, open Tyruswoo_EventAI plugin command options,
 *    and set the "Random Mover Touch" plugin command to true.
 * 2. Open the event editor of an NPC of your choice. This tutorial is relevant
 *    to any NPC with a movement type set to Random or to a Custom route where
 *    some steps are "Move at Random".
 * 3. Decide whether the NPC must touch the party leader, or whether touching
 *    any party member counts. If NPC must touch party leader, set the Trigger
 *    to Event Touch. If NPC touching any party member should start the event,
 *    put a "Trigger: Party Touch" plugin command at the beginning of the
 *    command list.
 * 4. Repeat steps 2 and 3 to make more randomly moving NPCs that can initiate
 *    touch events.
 * 
 * How to Give an NPC Distance-based Chasing
 * -----------------------------------------
 * Find the "Autonomous Movement" box in the Event Editor's middle-left,
 * select route type "Custom", and click the "Route..." button.
 * Then use the buttons on the right to pick commands that will show up in
 * the list on the left.
 * Below is a sample move route for an enemy NPC that chases only if the player
 * is 5 tiles away or closer. Whenever the player flees out of range,
 * the NPC returns to its starting spot.
 * * Script: this.rbIf(this.distToPlayer <= 5)
 * * Script: this.setBln("!")
 * * Move toward Player
 * * Script: this.rbElse(0 == this.dist(this.startLoc))
 * * Turn Down
 * * Script: this.rbElse()
 * * Wait: 15 frames
 * * Script: this.stepTo(this.startLoc)
 * * Script: this.unsetBln()
 * * Script: this.rbEnd()
 * In the Options checkboxes below, make sure "Repeat Movements" and "Skip If
 * Cannot Move" are checked.
 * If the NPC is supposed to run an event when it touches any party member,
 * start its command list with the plugin command "Trigger: Party Touch".
 * 
 * How to Use Self Variables or Additional Self Switches
 * ------------------------------------------------------
 * Self variables and extra self switches help you associate more data of
 * any kind, with any event you choose.
 * 1. Think about the information you want to associate with some events.
 *    For a true/false value, open the list of game switches to make an extra
 *    self switch. For a number, text snippet, or anything else, open the list
 *    of game variables to make a self variable. To mark something as a self
 *    variable or self switch, start its name with "s:" -- an S followed by a
 *    colon, followed by any name that helps you remember the purpose of this
 *    self variable or self switch.
 * 2. If you want to access the self variables or self switches of an event
 *    other than the one currently running, use the Link Event plugin command
 *    to pick an event. You can link an event from any map, and reference the
 *    event by Event ID, name, note, or location. Then use the Unlink Event
 *    plugin command when you're done working with the linked event.
 *    When no event is linked, the running event's own self variables and
 *    self switches are used.
 * 3. To set your event's self variable, create a Control Variables command.
 *    Find your self variable in the variable list. Set its value the same
 *    way you would for any variable.
 *    To set your event's extra self switch, create a Control Switches command,
 *    look through the switches list, and find one you named as a self switch.
 *    Set its value to ON or OFF, as you would with any switch.
 * 4. You can make a conditional branch based on the linked or active event's
 *    self variable or self switch. Use the Switch option or the Variable
 *    option, and find your self switch or self variable in the list.
 * 5. You can also use self variables and extra self switches as page
 *    conditions, the same way a variable or switch can be a page condition.
 *    In page conditions, self variables and self switches always reference the
 *    event that contains that page.
 * 
 * ============================================================================
 * Plugin parameters:
 * 
 * Treasure Display Common Event
 * This is the common event that an event will call when it runs any treasure
 * plugin command, _after_ the party receives the treasure. (Do not use this
 * common event to give treasure; the plugin command has already done that!)
 * The Treasure Display Common Event can show the treasure chest opening,
 * play a sound, show text telling what item the party received, set a self
 * switch to ensure that the treasure can be opened only once, and do anything
 * else you write into it.
 * 
 * Random Mover Touch
 * Turn this parameter ON to let randomly moving NPCs start touch events.
 * Without this plugin, or when Random Mover Touch is OFF, a randomly moving
 * NPC never tries to move in the direction of anything it can't pass through.
 * Since a solid NPC can't pass through a player character, the side effect is
 * that randomly moving NPCs can't initiate touch events.
 * When Random Mover Touch ON, any randomly moving NPC whose trigger is set to
 * Event Touch or Party Touch, can turn toward an adjacent player character as
 * part of its random movement. This triggers its touch event.
 * 
 * Enable Self Variables
 * This is turned ON by default. When it's turned ON, you can start any
 * variable name with s: to make it into a self variable applied to individual
 * events. If you don't intend to use this feature, you can turn it OFF to
 * reduce the risk of compatibility issues with non-Tyruswoo plugins.
 * 
 * Enable Extra Self Switches
 * This is ON by default. When it's turned ON, you can give any switch a name
 * starting with s: to make it function as a self switch for events. If you
 * don't intend to use this feature, you can turn it OFF to reduce the risk of
 * compatibility issues with non-Tyruswoo plugins.
 * 
 * ============================================================================
 * Set New Origin Plugin Command:
 * 
 * Suppose an event has moved, and you want it to be in its new location when
 * the player comes back to this map after being away from it. All you need to
 * do is create a plugin command Event AI > Set New Origin, and the event's
 * current location will be saved as its new starting location. Leave the
 * location blank to use the event's current location. This new starting
 * location is permanent for the savefile where it's done.
 * 
 * If you need to use one event to change another event's starting location,
 * first use a Link Event command, then use Set New Origin.
 * 
 * If you need to set the new starting location to something other than the
 * event's current location, use the Location argument. The coordinates you set
 * can be absolute, relative to the player, or relative to an event, depending
 * on the Relativity mode you choose.
 * 
 * ============================================================================
 * Global Move Route Behavior plugin command
 * 
 * Use the plugin command Global Move Route Behavior to switch between the
 * following modes for autonomous movement routes:
 * 
 * Normal: NPC movements work normally. They react to the player's position
 *     if they are programmed to do so.
 * Freeze: All NPCs stop their autonomous routes. (They will still move if a
 *     Set Movement Route command forces them to move.)
 * Ignore Player: All NPCs' autonomous routes work as if they don't know the
 *     player is there. Their effective distToPlayer (distance to player)
 *     is infinity. (Routes started with a Set Movement Route command will
 *     still recognize the player and calculate distance normally.)
 * 
 * Global modes apply only to autonomous movement routes. Routes forced by a
 * Set Movement Route command are exempt from the current mode's rules.
 * 
 * A global move route mode is permanent until another mode is set.
 * For example, if Global Move Route Behavior is set to Freeze, all NPCs will
 * be still (unless expressly commanded to move) across save/load, across
 * map changes, etc., until another Global Move Route Behavior changes the
 * mode back to Normal (or to anything other than Freeze).
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
 * Trigger: Party Touch
 * It's like Event Touch, except that it includes followers.
 * Put this plugin command at the top of the command list of an event page,
 * and when that page is active, the event will trigger when its NPC touches
 * the player OR any of the player's followers.
 * 
 * ============================================================================
 * Treasure plugin commands:
 * 
 * Every treasure plugin command first gives the indicated treasure to the
 * party, and then calls the Treasure Display Common Event.
 * 
 * Treasure by Name
 * Give the item, weapon, or armor that matches the name given.
 * Name matching is case insensitive. The first item in the database that's
 * found to match the name will be the item given. The items database is
 * checked first, then weapons, then armors.
 * This plugin command is useful if you might reorganize your database after
 * some treasures have already been placed.
 * 
 * Treasure: Gold
 * Give some amount of the game's currency as treasure.
 * 
 * Treasure: Item
 * Give a non-equippable item (regular item or key item) as treasure.
 * Choose the item ID from the database's item list.
 * 
 * Treasure: Weapon
 * Give a weapon as treasure. Choose the weapon ID from a list.
 * 
 * Treasure: Armor
 * Give an armor as treasure. Choose the armor ID from a list.
 * 
 * ============================================================================
 * Treasure text codes:
 *
 * Use these in text commands to show information about the loot given by the
 * most recent treasure plugin command. They're designed for your convenience
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
 * Treasure script calls:
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
 * Movement route script calls
 * In all movement route script calls, "this" refers to the Game_Character
 * who's doing the route.
 * 
 * ----------------------------------------------------------------------------
 * Route Branches:
 * 
 * // Anatomy of a route branch set:
 * this.rbIf(condition);     // Every branch set starts with this.
 * [1 or more commands]      // These commands only run if condition is true.
 * this.rbElse(condition);   // There can be 0 or more of these.
 * [1 or more commands]      // Every else branch has its own set of commands.
 * this.rbEnd();             // Every branch set ends with this.
 * 
 * this.rbIf(condition)
 *   If the condition is true, the instructions after it will run.
 *   Otherwise, the instructions will be skipped until an rbElse or rbEnd
 *   script call is reached.
 * 
 * this.rbElse(condition)
 *   An rbElse call can come after an rbIf call and its instructions.
 *   It runs only if no previous branch in the set has run.
 *   Its condition is optional.
 *   An rbElse with a condition acts as an "else if";
 *   without a condition it's like an "else".
 *   An rbIf call can have any number of rbElse calls after it, or none at all.
 * 
 * this.rbEnd()
 *   This call is REQUIRED to mark the end of any route branch set.
 * After it, unconditional movement route commands resume.
 * 
 * ----------------------------------------------------------------------------
 * Sound Effects:
 * Use these script statements to make a character play a sound effect whenever
 * a new sound effect is set.
 * 
 * this.setSe(soundName, volume=90, pitch=100)
 *   Play a sound effect if the most recent call of setSe() doesn't use the
 *   same soundName. The parameters for volume and pitch are optional; if they
 *   aren't specified, the values above are used.
 *   
 * this.unsetSe()
 *   Clear the record of which sound effect was most recent.
 *   This ensures that next time this.setSe() is called, it will play a sound.
 * 
 * ----------------------------------------------------------------------------
 * Balloons:
 * Use these script statements to have a character show an expression balloon
 * during a movement route.
 * 
 * this.setBln(balloonType)
 *   If a new type of balloon is set, that balloon will start popping up from
 *   the character. If the balloon type is the same as the character's most
 *   recent balloon type, then nothing happens.  
 * 
 * this.unsetBln()
 *   Clear the last remembered balloon. This allows the balloon to pop up again
 *   when setBln() is called later.
 * 
 * this.showBln(balloonType)
 *   This sets the balloon type, and then ALWAYS makes the corresponding
 *   balloon pop up.
 * 
 * In the above methods, the parameter balloonType is a text string naming
 * the type of balloon, or a number corresponding to the balloon code.
 * 
 * Code | Balloon Type text variants
 * -----+------------------------------------
 *   0  | "none" or "" (no balloon will show)
 *   1  | "exclamation" or "!"
 *   2  | "question" or "?"
 *   3  | "music note" or "mus"
 *   4  | "heart" or "<3"
 *   5  | "anger" or "x"
 *   6  | "sweat drop", "sweat", or "d"
 *   7  | "frustration" or "scribble"
 *   8  | "silence" or "..."
 *   9  | "light bulb" or "idea"
 *  10  | "zzz", "sleep", or "z"
 * 
 * ----------------------------------------------------------------------------
 * Script helps for distance, location, and movement
 * All snippets below are intended for movement routes.
 * "this" refers to the character whose route it is.
 * --------------------+-------------------------------------------------------
 * Snippet             | Description
 * --------------------+-------------------------------------------------------
 * this.startLoc       | Get object containing x and y coordinates for this
 *                     | character's starting location.
 *                     |
 * this.distToPlayer   | Get distance, as x difference + y difference, between
 *                     | this character and the player.
 *                     |
 * this.dist(x, y)     | Get distance from this character to any given coords.
 *                     |
 * this.stepTo(x, y)   | Move character 1 step toward any given x and y coords.
 *                     |
 * this.stepAway(x, y) | Move character 1 step away from any given x and y.
 *
 * Any of the above methods that takes x and y coordinates, can instead take
 * an event or other coordinates-bearing object, an event ID, or an event name.
 * 
 * Examples:
 * this.dist(35, 45)             // The distance to the spot where x=35, y=45
 * this.stepTo(this.startLoc);   // Step toward this event's starting coords.
 * this.stepAway($gamePlayer);   // Step away from the player.
 * this.dist("Rat")              // Distance to the nearest event named "Rat"
 * this.stepTo(12);              // Step toward the event whose ID is 12.
 * 
 * ============================================================================
 * Miscellaneous script calls:
 *
 * $gameMap.name()
 *   Returns the name of the current map.
 *   (Note: This gets the map's name, not the display name.)
 *
 *   Example use case: Allow common events to know the name of the current map.
 *
 *   Other use case: Assuming you used the Tyruswoo_EventGenerator plugin to
 *   generate an event on the current map, the generated event can use this
 *   script call to determine the current map's name. Just use a Conditional
 *   Branch script call. For example, to check if the map is named "Spooky
 *   Tower", the Conditional Branch script would be:
 *        $gameMap.name() == "Spooky Tower"
 *
 *   A similar default script call finds the current map's ID:
 *        $gameMap.mapId()
 * 
 * $gameMap.currentEvent() and $gameMap.activeEvent()
 *   These both do the same thing: return the currently active event.
 *   This makes it easier to use Conditional Branches with script calls that
 *   use a property of the current active event. This is particularly useful
 *   in common events (or events generated by the Event Generator plugin).
 *
 * $gamePlayer.checkRegionChange()
 *   Use this to refresh the player's current region after a forced
 *   move route, to ensure the player's next step can correctly determine
 *   whether to trigger a region entry event.
 * 
 * ============================================================================
 * Visit Tyruswoo.com to ask for help, donate, or browse more of our plugins.
 * ============================================================================
 * Version History:
 *
 * v1.0  11/5/2021
 *        - Event AI released for RPG Maker MZ!
 *        - Region Entry events and common events.
 *        - Treasure plugin command calls your treasure common event.
 *
 * v2.0  7/22/2022
 *        - Linked events added. When commands run that would usually affect
 *          the currently active event, they'll affect the linked event
 *          instead.
 *        - Self variables and extra self switches: Start any variable or
 *          switch with s: and it will act as a self variable or self switch.
 *          Coordinates with linked events.
 *        - Weighted random branches: These are similar to Conditional
 *          Branches, but the branch used is selected randomly based on its
 *          weight relative to other weighted branches.
 *        - Treasure by Name plugin command gives a treasure of the item,
 *          weapon, or armor that matches the name.
 *        - Party Touch events can touch any party member to start their event.
 *        - Random Mover Touch plugin parameter. When true, a randomly moving
 *          NPC can initiate an Event Touch or Party Touch event.
 *        - Script support for movement routes: conditional branches, balloons,
 *          remembering starting location, and more.
 *        - New script snippets: $gameMap.name(), $gameMap.activeEvent(),
 *          and $gamePlayer.checkRegionChange()
 * 
 * v2.1  8/8/2022
 *        - Replaced v2.0's three Link Event plugin commands with one.
 *          This unified Link Event plugin command finds an event on any map,
 *          referenced by map ID or name. The event itself can also be
 *          referenced by ID or name, or found based on location or note.
 * 
 * v2.2  10/22/2022
 *        - Fixed a bug that was keeping Event Touch trigger NPCs from
 *          initiating their own event.
 *        - Fixed a bug that affected the Link Event command's ability to
 *          identify a map by its name if the name contained a digit.
 *
 * v2.3  3/20/2023
 *        - Fixed a bug in which sometimes, on autosave load, the
 *          Game_Map.eraseEvent function would try to erase a non-existent
 *          event.
 *        - Fixed a bug in which linked events could include events that were
 *          erased.
 * 
 * v2.3.1  8/30/2023
 *        - This plugin is now free and open source under the MIT license.
 *
 * v2.3.2  11/29/2023
 *        - Fixed a bug that was keeping Unset Sound Effect from working.
 * 
 * v2.3.3  9/23/2024
 *        - Fixed a bug where the player's action button failed to trigger
 *          Party Touch events.
 *        - Fixed a bug where generated events could not remember their
 *          startLoc (starting location).
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
 * @param Random Mover Touch
 * @type boolean
 * @default false
 * @desc If true, a randomly moving NPC can turn toward an adjacent
 * player character when doing so would initiate their event.
 * 
 * @param Prioritize Step Events
 * @type boolean
 * @default false
 * @desc If true, keep Event Touch and Party Touch events from
 * running if player is about to trigger a step event.
 * 
 * @param Enable Self Variables
 * @type boolean
 * @default true
 * @desc When this is ON, variables with names starting with s:
 * act as self variables for events.
 * 
 * @param Enable Extra Self Switches
 * @type boolean
 * @default true
 * @desc When this is ON, switches with names starting with s:
 * act as additional self switches for events.
 * 
 * @command treasure_by_name
 * @text Treasure by Name
 * @desc Give an item, weapon, or armor matching a name,
 * and call the treasure display common event.
 * @arg name
 * @type text
 * @desc Give the first item, weapon, or armor with this name. Case-insensitive.
 * 
 * @command treasure_gold
 * @text Treasure: Gold
 * @desc Give the player a given amount of gold,
 * and call the treasure display common event.
 * @arg amount
 * @type number
 * @min 1
 * @desc The treasure gives this many gold (or whatever this game's currency is).
 * 
 * @command treasure_item
 * @text Treasure: Item
 * @desc Give the player an item, selected by Item ID,
 * and call the treasure display common event.
 * @arg id
 * @text item
 * @type item
 * @desc This item is given as treasure.
 *
 * @command treasure_weapon
 * @text Treasure: Weapon
 * @desc Give the player a weapon, selected by Weapon ID,
 * and call the treasure display common event.
 * @arg id
 * @text weapon
 * @type weapon
 * @desc This weapon is given as treasure.
 * 
 * @command treasure_armor
 * @text Treasure: Armor
 * @desc Give the player an armor, selected by Armor ID,
 * and call the treasure display common event.
 * @arg id
 * @text armor
 * @type armor
 * @desc This armor is given as treasure.
 *
 * @command link_event
 * @text Link Event
 * @desc The linked event to be affected by commands in the current command list. Must match all non-empty arguments.
 *
 * @arg map
 * @text Map
 * @type text
 * @desc Name or ID of the map holding the event to be affected. Empty for current map.
 *
 * @arg event
 * @text Event
 * @type text
 * @desc Name or ID of the event to be affected by commands in the current command list. Empty for any event ID.
 *
 * @arg event_note
 * @text Event Note
 * @type text
 * @desc Event Note of the event to be affected by commands in the current command list. Empty to ignore note.
 *
 * @arg event_loc
 * @text Event Location
 * @type struct<locationRange>
 * @desc Current location of the event to be affected by commands in the current command list. Empty for any loc.
 * 
 * @command unlink_event
 * @text Un-link Event
 * @desc Resets the linked event to the current active event. (Default RPG Maker behavior.)
 * 
 * @command weight
 * @text Weight
 * @desc Creates a branch that executes randomly at a given likelihood weight.
 * @arg weight
 * @text Selection Weight
 * @type number
 * @default 10
 * @desc This number determines how likely this branch will run
 * relative to other Weight branches in its set.
 * 
 * @command end_weight_branches
 * @text End Weight Branches
 * @desc Closes the current set of weighted random branches.
 * 
 * @command set_new_origin
 * @text Set New Origin
 * @desc Change the starting point of the active or linked event
 * for subsequent times the map loads.
 * 
 * @arg location
 * @type struct<location>
 * @desc Make this location the event's new origin.
 * If blank, use the affected event's current location.
 * 
 * @command global_move_route_behavior
 * @text Global Move Route Behavior
 * @desc Change behavior of all autonomous move routes.
 * 
 * @arg mode
 * @text Mode
 * @type select
 * @option Freeze
 * @option Ignore Player
 * @option Normal
 * @default Normal
 * 
 * @command page_trigger_map_setup
 * @text Trigger: Map Setup
 * @desc Put this at the top of an event page,
 * and it'll run when the player enters the map, before fadein.
 * 
 * @command page_trigger_region_entry
 * @text Trigger: Region Entry
 * @desc Put this at the top of an event page,
 * and it'll run when the player enters a region.
 * @arg region_id
 * @text Region ID
 * @type number
 * @min 1
 * @max 255
 * 
 * @command page_trigger_party_touch
 * @text Trigger: Party Touch
 * @desc Put this at the top of an event page,
 * and it'll run when the event touches any member of the party.
 */

/*~struct~location:
 * @param x
 * @type number
 * @min -256
 * @max 256
 * @text X
 * @desc X coordinate value. Default: 0.
 *       +x for east. If relative: -x for west.
 *
 * @param y
 * @type number
 * @min -256
 * @max 256
 * @text Y
 * @desc Y coordinate value. Default: 0.
 *       +y for south. If relative: -y for north.
 *
 * @param relativity
 * @type struct<relativity>
 * @text Relativity
 * @desc Coordinates may be interpreted as absolute,
 * or relative to an event or the player.
 */

/*~struct~locationRange:
 * @param x
 * @type number
 * @min -256
 * @max 256
 * @text X
 * @desc X coordinate value. Default: 0.
 *       +x for east. If relative: -x for west.
 *
 * @param y
 * @type number
 * @min -256
 * @max 256
 * @text Y
 * @desc Y coordinate value. Default: 0.
 *       +y for south. If relative: -y for north.
 *
 * @param relativity
 * @type struct<relativity>
 * @text Relativity
 * @desc Coordinates may be interpreted as absolute,
 * or relative to an event or the player.
 * 
 * @param max_distance
 * @type number
 * @text Maxiumum Distance
 * @desc No more than this many steps (cardinal or diagonal) from the given location. 0 for exact match.
 */

/*~struct~relativity:
 * @param mode
 * @type select
 * @option Absolute
 * @option Relative to Event
 * @option Relative to Player
 * @default Relative to Event
 * @text Relativity Mode
 * @desc Select how coordinates are to be interpreted. If relative, defaults either to this event or to player.
 *
 * @param eventId
 * @parent mode
 * @type number
 * @text Event ID
 * @desc Event ID number of the event whose coordinates are to be used for "Relative to Event." 0 (or empty) for this event.
 *
 * @param party_member
 * @parent mode
 * @type select
 * @option Player
 * @option Leader
 * @option Follower 1
 * @option Follower 2
 * @option Follower 3
 * @option Follower 4
 * @option Follower 5
 * @option Follower 6
 * @option Follower 7
 * @option Follower 8
 * @option Follower 9
 * @text Party Member
 * @desc Party member whose coordinates are used for "Relative to Player". Default: Player. Can use Follower Control plugin.
 *
 * @param orientational_shift
 * @parent mode
 * @type struct<shift>
 * @text Orientational Shift
 * @desc With "Relative to Event" or "Relative to Player", modify coordinates based on direction character is facing.
 */

/*~struct~shift:
 * @param forward_shift
 * @type number
 * @default 0
 * @min -256
 * @max 256
 * @text Forward Shift
 * @desc Modify coordinates based on the direction the character is facing. Positive for forward. Negative for backward.
 *
 * @param rightward_shift
 * @type number
 * @default 0
 * @min -256
 * @max 256
 * @text Rightward Shift
 * @desc Modify coordinates based on the direction the character is facing. Positive for rightward. Negative for leftward.
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

	Tyruswoo.EventAI.param.randomMoverTouch = "true" ==
		Tyruswoo.EventAI.parameters["Random Mover Touch"];
	Tyruswoo.EventAI.param.prioritizeStepEvents = "true" ==
		Tyruswoo.EventAI.parameters["Prioritize Step Events"];

	Tyruswoo.EventAI.param.enableSelfVariables = "true" ==
		Tyruswoo.EventAI.parameters["Enable Self Variables"];
	Tyruswoo.EventAI.param.enableExtraSelfSwitches = "true" ==
		Tyruswoo.EventAI.parameters["Enable Extra Self Switches"];

	Tyruswoo.EventAI.TriggerCode = {
		actionButton: 0,
		playerTouch: 1,
		eventTouch: 2,
		autorun: 3,
		parallel: 4,
		regionEntry: 5,
		partyTouch: 6,
		mapSetup: 7
	};

	Tyruswoo.EventAI.TouchTriggers = [
		Tyruswoo.EventAI.TriggerCode.playerTouch,
		Tyruswoo.EventAI.TriggerCode.eventTouch,
		Tyruswoo.EventAI.TriggerCode.partyTouch
	];

	Tyruswoo.EventAI.StepTriggers = [
		Tyruswoo.EventAI.TriggerCode.playerTouch
	];

	Tyruswoo.EventAI.SELF_REGEX = /^\s*s:/i;

	Tyruswoo.EventAI.PLUGIN_COMMAND_CODE = 357;
	Tyruswoo.EventAI.PLUGIN_COMMAND_ARG_INDEX = 3;
	
	Tyruswoo.EventAI.IS_EVENT_GENERATOR_SAFE = true;
	
	// Default values for plugin command arguments.
	const defaultLocation = {"x":"0","y":"0","relativity":"{\"mode\":\"Relative to Event\",\"eventId\":\"\",\"party_member\":\"\",\"orientational_shift\":\"\"}"};
	const defaultLinkedRelativity = {"mode":"Relative to Event","eventId":"","party_member":"","orientational_shift":""};
	const defaultOrientationalShift = {"forward_shift":"0","rightward_shift":"0"};

	//=============================================================================
	// Shared Utility Methods
	//=============================================================================

	Tyruswoo.EventAI.getTreasureDatabaseList = function() {
		if (!Tyruswoo.EventAI.TreasureDatabaseList) {
			Tyruswoo.EventAI.TreasureDatabaseList = [
				{ itemType: 'item', name: 'items', db: $dataItems },
				{ itemType: 'weapon', name: 'weapons', db: $dataWeapons },
				{ itemType: 'armor', name: 'armors', db: $dataArmors }
			];
		}
		return Tyruswoo.EventAI.TreasureDatabaseList;
	}

	// New method
	// Finds the currently running interpreter.
	Tyruswoo.EventAI.activeEventInterpreter = function() {
		var outerInterpreter = null;
		if ($gameTroop.isEventRunning()) {
			outerInterpreter = $gameTroop._interpreter;
		} else if ($gameMap.isEventRunning()) {
			outerInterpreter = $gameMap._interpreter;
		}

		var innerInterpreter = outerInterpreter;
		while (innerInterpreter._childInterpreter &&
			innerInterpreter._childInterpreter.isRunning()) {
			innerInterpreter = innerInterpreter._childInterpreter;
		}
		return innerInterpreter;
	};

	Tyruswoo.EventAI.isOurPluginCommand = function(command, pluginCommandName=null) {
		var isOurs = Tyruswoo.EventAI.PLUGIN_COMMAND_CODE == command.code &&
			command.parameters[0] == 'Tyruswoo_EventAI';
		if (null == pluginCommandName) {
			return isOurs;
		} else {
			return isOurs && command.parameters[1] == pluginCommandName;
		}
	};
	
	// New method
	// Modeled from the similar Tyruswoo_EventGenerator function, known as Tyruswoo.EventGenerator.parseGenLocationArgs().
	// Unpacks the struct of event_loc and prepares it for use.
	// Where anything is missing, the global default is used in its place.
	Tyruswoo.EventAI.parseLocationArg = function(locationArg) {
		var linkedLocation = locationArg ? JSON.parse(locationArg) : defaultLocation;
		linkedLocation.x = Number(linkedLocation.x);
		linkedLocation.y = Number(linkedLocation.y);
		return linkedLocation;
	};
	
	// New method.
	// Modeled from the similar Tyruswoo_EventGenerator function, known as Tyruswoo.EventGenerator.extract_xy_array().
	// With input of args from the plugin command, outputs an array [x, y], with accounting for relativity options.
	Tyruswoo.EventAI.extract_xy_array = function(linkedLocation, useLinkedEvent = false) {
		const relativity = (linkedLocation && linkedLocation.relativity) ? JSON.parse(linkedLocation.relativity) : defaultLinkedRelativity;
		const orientational_shift = relativity.orientational_shift ? JSON.parse(relativity.orientational_shift) : defaultOrientationalShift;
		var x = Number(linkedLocation.x);
		var y = Number(linkedLocation.y);
		if (relativity.mode == "Relative to Event") {
			let interpreter = $gameMap._interpreter;
			let eventId = Number(relativity.eventId || 0);
			let e;
			let direction;
			if (useLinkedEvent) {
				mapId = interpreter.linkedEventMapId();
				eventId = eventId || interpreter.linkedEventId();
				if (mapId == $gameMap.mapId()) {
					// local event is linked
					e = $gameMap.event(eventId);
					direction = e.direction();
				} else {
					// remote event is linked
					let mapData = this.loadReferenceMapSync(mapId);
					e = mapData.events[eventId];
					direction = e.direction;
				}
			} else {
				// Don't use linked event.
				eventId = eventId || interpreter.eventId();
				e = $gameMap.event(eventId);
				direction = e.direction();
			}
			// By this time, the event coordinates have been found.
			if (e) {
				const f = Number(orientational_shift.forward_shift) ? Number(orientational_shift.forward_shift) : 0;
				const r = Number(orientational_shift.rightward_shift) ? Number(orientational_shift.rightward_shift) : 0;
				const xy_shift = Tyruswoo.EventAI.orientationalShift(direction, f, r);
				x = x + e.x + xy_shift[0];
				y = y + e.y + xy_shift[1];
			};
		} else if (relativity.mode == "Relative to Player") {
			var p = $gamePlayer; //By default, the party leader is selected.
			if (Imported.Tyruswoo_FollowerControl) { //However, if Tyruswoo_FollowerControl is installed, then the currently selected follower is automatically selected.
				p = Tyruswoo.FollowerControl.follower();
			};
			if (relativity.party_member == "Leader") {
				p = $gamePlayer; //Regardless of whether Tyruswoo_FollowerControl is installed, the "Leader" option can be used to select the leader.
			} else if (relativity.party_member.substr(0, 8) == "Follower") {
				const n = Number(relativity.party_member.substr(9)); //Get the number found after this string's last space.
				p = $gamePlayer.followers().follower(n - 1);
			};
			if (p) {
				const f = Number(orientational_shift.forward_shift) ? Number(orientational_shift.forward_shift) : 0;
				const r = Number(orientational_shift.rightward_shift) ? Number(orientational_shift.rightward_shift) : 0;
				const xy_shift = Tyruswoo.EventGenerator.orientationalShift(p.direction(), f, r);
				x = x + p.x + xy_shift[0];
				y = y + p.y + xy_shift[1];
			};
		};
		return [x, y];
	};
	
	// New method
	// Modeled from the similar Tyruswoo_EventGenerator function, known as Tyruswoo.EventGenerator.orientationalShift().
	Tyruswoo.EventAI.orientationalShift = function(direction, f = 0, r = 0) { //direction, forward shift, and rightward shift.
		var xShift = 0;
		var yShift = 0;
		switch(direction) {
			case 2:
				xShift -= r;
				yShift += f;
				break;
			case 4:
				xShift -= f;
				yShift -= r;
				break;
			case 6:
				xShift += f;
				yShift += r;
				break;
			case 8:
				xShift += r;
				yShift -= f;
				break;
		};
		return [xShift, yShift];
	};

	//=============================================================================
	// Plugin Command Definitions
	//=============================================================================

	PluginManager.registerCommand(pluginName, "treasure_by_name", args => {
		Tyruswoo.EventAI.giveTreasureByName(args.name, 1);
	});

	PluginManager.registerCommand(pluginName, "treasure_gold", args => {
		Tyruswoo.EventAI.giveTreasureGold(args.amount);
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

	PluginManager.registerCommand(pluginName, "link_event", args => {
		var mapId = $gameMap.mapId();
		if (args.map) {
			mapId = /^\d+$/.test(args.map) ? Number(args.map) :
				Tyruswoo.EventAI.getMapIdByName(args.map);
		}
		const eventId = /^\d+$/.test(args.event) ? Number(args.event) :
			Tyruswoo.EventAI.getEventIdByName(args.event, mapId);
		const note = args.event_note;

		var x = null;
		var y = null;
		var maxDistance = 0;
		if (args.event_loc) {
			let linkedLocation = Tyruswoo.EventAI.parseLocationArg(args.event_loc);
			let xy = Tyruswoo.EventAI.extract_xy_array(linkedLocation);
			x = xy[0];
			y = xy[1];
			maxDistance = Number(linkedLocation.max_distance || 0);
		}
		Tyruswoo.EventAI.linkEvent(eventId, mapId, note, x, y, maxDistance);
	});
	
	// Deprecated command, kept for reverse compatibility only.

	PluginManager.registerCommand(pluginName, "link_event_by_id", args => {
		var eventId = Number(args.event_id);
		var mapId = $gameMap.mapId();
		var note = null;
		var x = null;
		var y = null;
		Tyruswoo.EventAI.linkEvent(eventId, mapId, note, x, y);
	});
	
	// Deprecated command, kept for reverse compatibility only.
	PluginManager.registerCommand(pluginName, "link_event_by_note", args => {
		var eventId = null;
		var mapId = $gameMap.mapId();
		var note = args.event_note;
		var x = null;
		var y = null;
		if (args.event_loc) {
			const linkedLocation = Tyruswoo.EventAI.parseLocationArg(args.event_loc);
			const xy = Tyruswoo.EventAI.extract_xy_array(linkedLocation);
			x = xy[0];
			y = xy[1];
		}
		Tyruswoo.EventAI.linkEvent(eventId, mapId, note, x, y);
	});
	
	// Deprecated command, kept for reverse compatibility only.
	PluginManager.registerCommand(pluginName, "link_event_by_map", args => {
		var eventId = Number(args.event_id);
		var mapId = Number(args.map_id);
		var note = null;
		var x = null;
		var y = null;
		Tyruswoo.EventAI.linkEvent(eventId, mapId, note, x, y);
	});
	
	PluginManager.registerCommand(pluginName, "unlink_event", args => {
		Tyruswoo.EventAI.unlinkEvent();
	});

	PluginManager.registerCommand(pluginName, "weight", args => {
		let interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		interpreter.runWeightBranchIfSelected();
	});

	PluginManager.registerCommand(pluginName, "end_weight_branches", args => {
		let interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		interpreter.endWeightBranches();
	});

	PluginManager.registerCommand(pluginName, "global_move_route_behavior", args => {
		$gameSystem.setMoveRouteMode(args.mode);
	});

	PluginManager.registerCommand(pluginName, "set_new_origin", args => {
		const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		const mapId = interpreter.linkedEventMapId();
		const eventId = interpreter.linkedEventId();
		if (args.location) {
			let location = Tyruswoo.EventAI.parseLocationArg(args.location);
			// The line below finds the location based on the LINKED event, if any linked.
			let xy = Tyruswoo.EventAI.extract_xy_array(location, true);
			let x = xy[0];
			let y = xy[1];
			Tyruswoo.EventAI.setNewOrigin(mapId, eventId, x, y);
		} else {
			Tyruswoo.EventAI.setNewOrigin(mapId, eventId);
		}
	});

	PluginManager.registerCommand(pluginName, "page_trigger_map_setup", args => {
		// No action needed when the page is run.
		// Instead, this plugin command functions as a page tag.
		// It is read on map setup as a custom trigger ID for its page.
		// This one calls for trigger during the map setup phase,
		// after transfer but before fadein.
	});

	PluginManager.registerCommand(pluginName, "page_trigger_region_entry", args => {
		// No action needed when the page is run.
		// Instead, this plugin command functions as a page tag.
		// It is read on map setup as a custom trigger ID for its page.
		// This one calls for trigger on region entry.
	});

	PluginManager.registerCommand(pluginName, "page_trigger_party_touch", args => {
		// No action needed when the page is run.
		// Instead, this plugin command functions as a page tag.
		// It is read on map setup as a custom trigger ID for its page.
		// This one calls for trigger when the event touches player or follower.
	});

	//=============================================================================
	// Multi-functional Overrides
	//=============================================================================

	// Alias method
	Tyruswoo.EventAI.Game_Interpreter_clear =
		Game_Interpreter.prototype.clear;
	Game_Interpreter.prototype.clear = function() {
		Tyruswoo.EventAI.Game_Interpreter_clear.call(this);
		this._weightBranchIndexByIndent = [];
		this._linkedEventId = 0;
		this._linkedEventMapId = 0;
	};

	//=============================================================================
	// Custom Page Triggers
	//=============================================================================

	Tyruswoo.EventAI.findCustomPageTrigger = function(list) {
		for (let i = 0; i < list.length && Tyruswoo.EventAI.PLUGIN_COMMAND_CODE == list[i].code; i++) {
			// This loop checks any plugin commands
			// at the beginning of the page's list.
			let params = list[i].parameters;
			let commandPluginName = Utils.extractFileName(params[0]);

			if (this.isOurPluginCommand(list[i])) {
				// It's one of this plugin's commands.
				let commandName = params[1];
				let args = params[3];
				switch (commandName) {
					case 'page_trigger_map_setup':
						return {
							triggerId: Tyruswoo.EventAI.TriggerCode.mapSetup
						};
						break;
					case 'page_trigger_region_entry':
						return {
							triggerId: Tyruswoo.EventAI.TriggerCode.regionEntry,
							regionId: Number(args.region_id)
						};
						break;
					case 'page_trigger_party_touch':
						return {
							triggerId: Tyruswoo.EventAI.TriggerCode.partyTouch
						};
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
	// Map Setup Events
	// Events bearing the Map Setup trigger will run first thing upon transferring
	// into a map, before fadein, and before autorun or parallel process events
	// start.
	//=============================================================================
	// Game_Map methods aiding map setup events
	//-----------------------------------------------------------------------------

	// Alias method
	// Map setup events must finish running before the rest of setup proceeds.
	Tyruswoo.EventAI.Game_Map_setupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function() {
		this._isInSetup = true;
		this._eventsByName = {}; // Cache used for finding events by name.
		Tyruswoo.EventAI.Game_Map_setupEvents.call(this);
		this.setupRegionEntryCommonEvents(); // Re-calculate/refresh _regionEntryCommonEvents.  Line added by Tyruswoo 4/21/2022.
		this.startMapSetupEvent();
		this._isInSetup = false;
	};

	Game_Map.prototype.isInSetup = function() {
		return !!this._isInSetup;
	};

	// New method
	Game_Map.prototype.startMapSetupEvent = function() {
		for (const event of this.mapSetupEvents()) {
			event.start();
		}
	};

	Game_Map.prototype.mapSetupEvents = function() {
		return this.events().filter(event => event.isMapSetupEvent());
	};

	// Alias method
	Tyruswoo.EventAI.Game_Map_setupStartingEvent =
		Game_Map.prototype.setupStartingEvent;
	Game_Map.prototype.setupStartingEvent = function() {
		if (this.setupMapSetupEvent()) {
			return true;
		}
		Tyruswoo.EventAI.Game_Map_setupStartingEvent.call(this);
	};

	// New method
	Game_Map.prototype.setupMapSetupEvent = function() {
		for (const event of this.mapSetupEvents()) {
			if (event.isStarting()) {
				event.clearStartingFlag();
				this._interpreter.setup(event.list(), event.eventId());
				// We only run the first one.
				return true;
			}
		}
		// If we're here, no map setup event is ready.
		return false;
	}

	//-----------------------------------------------------------------------------
	// Game_Event methods aiding map setup events
	//-----------------------------------------------------------------------------

	// New method
	Game_Event.prototype.isMapSetupEvent = function() {
		return this._trigger == Tyruswoo.EventAI.TriggerCode.mapSetup;
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_checkEventTriggerAuto =
		Game_Event.prototype.checkEventTriggerAuto;
	Game_Event.prototype.checkEventTriggerAuto = function() {
		if (!$gameMap.isInSetup()) {
			Tyruswoo.EventAI.Game_Event_checkEventTriggerAuto.call(this);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_updateParallel =
		Game_Event.prototype.updateParallel;
	Game_Event.prototype.updateParallel = function() {
		if (!$gameMap.isInSetup()) {
			Tyruswoo.EventAI.Game_Event_updateParallel.call(this);
		}
	};

	//=============================================================================
	// Region Entry Events and Common Events
	//=============================================================================
	
	// Alias method
	// Appends region entry event trigger checking upon arrival at a tile.
	Tyruswoo.EventAI.Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving;
	Game_Player.prototype.updateNonmoving = function(wasMoving, sceneActive) {
		Tyruswoo.EventAI.Game_Player_updateNonmoving.call(this, wasMoving, sceneActive);
		if (wasMoving) {
			// If player is arriving at a tile...
			if(!$gameMap.isEventRunning()) {
				// ...and if no other event is running yet, check if this tile change marks a region change.
				if (this.checkRegionChange()) {
					// Start the region entry event, if any.
					$gameMap.startRegionEntryEvent(this.regionId());
				}
			}
			// TODO: EFFICIENCY optimization possible in this method.
			// If player arrives at a tile while some other event is running (such as an event using Force Move Route
			// on the player), then update $gamePlayer._lastRegionId, but do not start any region entry event.
			this.checkRegionChange();
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
		if (!this.isEventRunning() && !this.isInSetup()) {
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
		// TODO: EFFICIENCY improvement would help here.
		return this.events().filter(event => event.isRegionEntryEvent(regionId));
	};

	// New method
	// Returns common events for which the trigger is entering a given region.
	// If no region ID given, this will return all region entry common events.
	Game_Map.prototype.regionEntryCommonEvents = function(regionId=null) {
		if (!this._regionEntryCommonEvents) {
			this.setupRegionEntryCommonEvents(); // Re-calculate/refresh _regionEntryCommonEvents.  Code separated into the setupRegionEntryCommonEvents method by Tyruswoo 4/21/2022.
		}
		return this._regionEntryCommonEvents.filter(commonEvent =>
			commonEvent.isRegionEntryEvent(regionId));
	};
	
	// New method
	// Re-calculates/refreshes the _regionEntryCommonEvents array.
	// Added by Tyruswoo 4/21/2022.
	Game_Map.prototype.setupRegionEntryCommonEvents = function() {
		//console.log("Checking for region entry common events...");
		this._regionEntryCommonEvents = [];
		for (let i = 1; i < $dataCommonEvents.length; i++) {
			let customTrigger = Tyruswoo.EventAI.findCustomPageTrigger(
				$dataCommonEvents[i].list);
			if (customTrigger && customTrigger.triggerId == Tyruswoo.EventAI.TriggerCode.regionEntry) {
				//console.log("Found region entry common event:", $dataCommonEvents[i]);
				this._regionEntryCommonEvents.push(new Game_CommonEvent(i));
			}
		}
	};

	// New method
	// Checks whether this is a region entry event for a specified region ID.
	// If no region ID given, checks whether this is a region entry event in general.
	Game_Event.prototype.isRegionEntryEvent = function(regionId=null) {
		return this._trigger == Tyruswoo.EventAI.TriggerCode.regionEntry &&
			(this._regionId == regionId || null === regionId);
	};

	// New method
	// Checks whether this is a region entry common event
	// matching the given region ID (or any region ID, if null)
	Game_CommonEvent.prototype.isRegionEntryEvent = function(regionId=null) {
		return this._trigger == Tyruswoo.EventAI.TriggerCode.regionEntry &&
			(this._regionId == regionId || null === regionId);
	};

	//=============================================================================
	// Touch Immunity
	//=============================================================================

	Game_Player.prototype.startTouchImmunity = function(cause="default") {
		if (!this._touchImmunityCauses) {
			this._touchImmunityCauses = {};
		}
		this._touchImmunityCauses[cause] = true;
		//console.log("Touch immune for cause: " + cause);
		// We already know there's cause for touch immunity,
		// so we simply mark it true.
		this._isTouchImmune = true;
	};

	Game_Player.prototype.endTouchImmunity = function(cause="default") {
		if (!this._isTouchImmune) {
			// There's already no touch immunity. No change needed.
			return;
		}
		this._isTouchImmune = false;
		if (this._touchImmunityCauses) {
			delete this._touchImmunityCauses[cause];
			for (const key in this._touchImmunityCauses) {
				if (this._touchImmunityCauses[key]) {
					// The presence of any touch immunity cause
					// makes the player touch immune.
					this._isTouchImmune = true;
					//console.log("Still touch immune for cause: " + key);
					return;
				}
			}
			// If still here, we've found there's no touch immunity.
			//console.log("Touch immunity has ended.");
		}
	};

	// New method
	Game_Player.prototype.isTouchImmune = function() {
		return !!this._isTouchImmune;
	};

	//=============================================================================
	// Party Touch Event Trigger
	//=============================================================================

	// Alias method
	Tyruswoo.EventAI.Game_Player_triggerButtonAction =
		Game_Player.prototype.triggerButtonAction;
	Game_Player.prototype.triggerButtonAction = function() {
		// First, try the usual.
		if (Tyruswoo.EventAI.Game_Player_triggerButtonAction.call(this)) {
			return true;
		}
		// If nothing comes of that, check for a party touch event to trigger.
		if (Input.isTriggered("ok")) {
			this.checkEventTriggerThere([Tyruswoo.EventAI.TriggerCode.partyTouch]);
			if ($gameMap.setupStartingEvent()) {
				return true;
			}
		}
		return false;
	};

	// Replacement method
	// Like original, except that touch triggers that can be initiated by player
	// now include Player Touch, Event Touch, and Party Touch.
	Game_Player.prototype.checkEventTriggerTouch = function(x, y) {
		if (this.canStartLocalEvents()) {
			this.startMapEvent(x, y, Tyruswoo.EventAI.TouchTriggers, true);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_checkEventTriggerTouch =
		Game_Event.prototype.checkEventTriggerTouch;
	Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
		// NPCs can only act on a party whose leader is NOT immune to event touch.
		if (!$gameMap.isEventRunning() && !$gamePlayer.isTouchImmune()) {
			if (this._trigger === Tyruswoo.EventAI.TriggerCode.partyTouch) {
				// Check if it's touching the player or any follower.
				let memberTouched = $gamePlayer.pos(x, y) ||
					$gamePlayer.followers().isSomeoneCollided(x, y);
				if (memberTouched && !this.isJumping() && this.isNormalPriority()) {
					this.start();
				}
			} else {
				// Not a party touch event. Do normal RMMZ stuff.
				Tyruswoo.EventAI.Game_Event_checkEventTriggerTouch.call(this, x, y);
			}
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_start = Game_Event.prototype.start;
	Game_Event.prototype.start = function() {
		Tyruswoo.EventAI.Game_Event_start.call(this);
		if (this._trigger === Tyruswoo.EventAI.TriggerCode.partyTouch
			&& this._starting) {
			// Party touch events start as other touch events do:
			this.lock(); // Face the player and stop moving.
		}
	};

	//=============================================================================
	// Random Mover Touch
	//=============================================================================

	if (Tyruswoo.EventAI.param.randomMoverTouch) {
		// New method overriding Game_Character.prototype.moveRandom
		// Allows moving (in practice, turning) toward party members
		// when doing so would initiate the event
		Game_Event.prototype.moveRandom = function() {
			const d = 2 + Math.randomInt(4) * 2;
			if (this.canPass(this.x, this.y, d) ||
				this.wouldTouchTarget(this.x, this.y, d)) {
				this.moveStraight(d);
			}
		};

		// New method
		Game_Event.prototype.wouldTouchTarget = function(x, y, d) {
			const TC = Tyruswoo.EventAI.TriggerCode;
			if (this._trigger === TC.eventTouch ||
				this._trigger === TC.partyTouch) {
				let x2 = $gameMap.roundXWithDirection(x, d);
				let y2 = $gameMap.roundYWithDirection(y, d);
				if ($gamePlayer.pos(x2, y2)) {
					return true;
				} else if (this._trigger === TC.partyTouch) {
					return $gamePlayer.followers().isSomeoneCollided(x2, y2);
				}
			} else {
				// This event doesn't have a target.
				return false;
			}
		};
	} // endif Random Mover Touch parameter is true

	//=============================================================================
	// Prioritize Step Events
	//=============================================================================

	if (Tyruswoo.EventAI.param.prioritizeStepEvents) {

		// Alias method
		Tyruswoo.EventAI.Game_Player_moveStraight =
			Game_Player.prototype.moveStraight;
		Game_Player.prototype.moveStraight = function(d) {
			Tyruswoo.EventAI.Game_Player_moveStraight.call(this, d);
			if (this.isMovementSucceeded()) {
				if (this.isStepEventPending(this._x, this._y)) {
					this.startTouchImmunity("stepEvent");
				}
			}
		};

		// New method
		Game_Player.prototype.isStepEventPending = function(x, y) {
			if (this.canStartLocalEvents() && !$gameMap.isEventRunning()) {
				// Check for step event at destination
				for (const event of $gameMap.eventsXy(x, y)) {
					if (event.isTriggerIn(Tyruswoo.EventAI.StepTriggers)
						&& !event.isNormalPriority()) {
						return true;
					}
				} // endfor each event at these coords

				// Check for region entry event
				let nextRegionId = this.regionId();
				if (nextRegionId != this._lastRegionId) {
					let entryEvents = $gameMap.regionEntryEvents(nextRegionId);
					if (entryEvents.length > 0) {
						return true;
					}
					let entryCommonEvents = $gameMap.regionEntryCommonEvents(
						nextRegionId);
					if (entryCommonEvents.length > 0) {
						return true;
					}
				}
			} // endif events can
			// If we made it here, we've ruled out all step events.
			return false;
		};

		// Alias method
		Tyruswoo.EventAI.Game_Player_updateNonmoving_noStep =
			Game_Player.prototype.updateNonmoving;
		Game_Player.prototype.updateNonmoving = function(wasMoving, sceneActive) {
			Tyruswoo.EventAI.Game_Player_updateNonmoving_noStep.call(
				this, wasMoving, sceneActive);
			if (wasMoving) {
				$gamePlayer.endTouchImmunity("stepEvent");
			}
		};
	} // endif prioritize step events

	//=============================================================================
	// Event Reference and Script Call Helps
	//=============================================================================

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

	Tyruswoo.EventAI.giveTreasureByName = function(name, amount=1) {
		const stdName = name.trim().toLowerCase();
		if (!Tyruswoo.EventAI.treasureNameLookup) {
			Tyruswoo.EventAI.treasureNameLookup = {};
		}
		var result = Tyruswoo.EventAI.treasureNameLookup[stdName];
		if (!result) {
			for (const dbInfo of Tyruswoo.EventAI.getTreasureDatabaseList()) {
				for (let i = 1; i < dbInfo.db.length; i++) {
					let item = dbInfo.db[i];
					if (item && item.name && item.name.trim().toLowerCase() == stdName) {
						result = { itemType: dbInfo.itemType, id: i };
						Tyruswoo.EventAI.treasureNameLookup[stdName] = result;
						break;
					}
					if (result) {
						break;
					}
				}
			}
		}
		if (result) {
			return Tyruswoo.EventAI.giveTreasureItem(
				result.itemType, result.id, amount);
		} else {
			throw new Error("No such item: " + name);
		}
	};

	Tyruswoo.EventAI.giveTreasureItem = function(itemType, itemId, amount=1) {
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
			Tyruswoo.EventAI.activeEventInterpreter().command117(
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

	//=============================================================================
	// Weighted Random Branches
	//=============================================================================
	// Tyruswoo.EventAI weight checking utilities
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.getWeightArgument = function(command) {
		if (!this.isOurPluginCommand(command, "weight")) {
			throw new Error("Not a Weight plugin command");
		}
		return Number(
			command.parameters[Tyruswoo.EventAI.PLUGIN_COMMAND_ARG_INDEX]["weight"]);
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter weighted random branches
	//-----------------------------------------------------------------------------

	// New method
	Game_Interpreter.prototype.runWeightBranchIfSelected = function() {
		var selectedIndex = this.getWeightBranchIndex();
		if (selectedIndex == this._index) {
			// The branch following this will run.
			// No further action is required here.
		} else {
			this.skipWeightBranch();
		}
		return true;
	};

	// New method
	Game_Interpreter.prototype.endWeightBranches = function() {
		if (!this._weightBranchIndexByIndent || 0 == this._weightBranchIndexByIndent.length) {
			// Nothing to end.
			console.warn("End Weight Branches was called, but no weight branches were active!");
			return;
		}
		// Discard weight branch indexes, including the one at this level.
		while (this._weightBranchIndexByIndent.length > this._indent) {
			this._weightBranchIndexByIndent.pop();
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Interpreter_executeCommand =
		Game_Interpreter.prototype.executeCommand;
	Game_Interpreter.prototype.executeCommand = function() {
		const retval =
			Tyruswoo.EventAI.Game_Interpreter_executeCommand.call(this);
		this.pruneWeightBranchList();
		return retval;
	};

	// New helper method
	Game_Interpreter.prototype.pruneWeightBranchList = function() {
		if (!this._weightBranchIndexByIndent) {
			// Nothing to prune.
			return;
		}
		if (null == this._list && this._weightBranchIndexByIndent.length > 0) {
			// The interpreter has terminated. Empty the list.
			this._weightBranchIndexByIndent = [];
			return;
		}
		while (this._weightBranchIndexByIndent.length > this._indent + 1) {
			// Discard anything that has fallen out of scope.
			this._weightBranchIndexByIndent.pop();
		}
	};

	// New helper method
	Game_Interpreter.prototype.getWeightBranchIndex = function() {
		if (undefined === this._weightBranchIndexByIndent ||
			undefined === this._weightBranchIndexByIndent[this._indent]) {
			this.pickWeightBranch();
		}
		return this._weightBranchIndexByIndent[this._indent];
	};

	// New helper method
	// This is called at the first Weight command on the block.
	Game_Interpreter.prototype.pickWeightBranch = function() {
		let weightBranchIndexes = [];
		for (let i = this._index; i < this._list.length && this._list[i].indent >= this._indent; i++) {
			let command = this._list[i];
			if (this._indent == command.indent) {
				if (Tyruswoo.EventAI.isOurPluginCommand(command, "weight")) {
					weightBranchIndexes.push(i);
				} else if (Tyruswoo.EventAI.isOurPluginCommand(command, "end_weight_branches")) {
					break; // Stop reading weight branches.
				}
			}
		} // end for indexes in list from here until end of this weighted branch set

		let totalWeight = 0;
		for (const branchIndex of weightBranchIndexes) {
			totalWeight += Tyruswoo.EventAI.getWeightArgument(this._list[branchIndex]);
		}

		let weightRoll = Math.floor(Math.random() * totalWeight);
		let selectedIndex = this._index;
		let weightSoFar = 0;
		for (const branchIndex of weightBranchIndexes) {
			weightSoFar += Tyruswoo.EventAI.getWeightArgument(this._list[branchIndex]);
			if (weightSoFar > weightRoll) {
				selectedIndex = branchIndex;
				break;
			}
		}
		this._weightBranchIndexByIndent[this._indent] = selectedIndex;
	};

	// New helper method
	Game_Interpreter.prototype.skipWeightBranch = function() {
		var nextCommand = this._list[this._index + 1];
		while (nextCommand && nextCommand.indent >= this._indent) {
			if (nextCommand.indent == this._indent &&
				(Tyruswoo.EventAI.isOurPluginCommand(nextCommand, "weight") ||
				 Tyruswoo.EventAI.isOurPluginCommand(nextCommand, "end_weight_branches"))) {
				// This ends the current weight branch.
				break;
			}
			this._index++;
			nextCommand = this._list[this._index + 1];
		}
		// By now, we're either out of this indentation level,
		// or we're to the next weight command.
	};

	//=============================================================================
	// Self Variables and Extra Self Switches
	//=============================================================================
	// Self variable and switch setup and use
	//-----------------------------------------------------------------------------

	$gameSelfVariables = null;

	Tyruswoo.EventAI._isSelfVariable = {};
	Tyruswoo.EventAI._isSelfSwitch = { A: true, B: true, C: true, D: true };

	if (Tyruswoo.EventAI.param.enableSelfVariables ||
		Tyruswoo.EventAI.param.enableExtraSelfSwitches) {

		// Alias method
		Tyruswoo.EventAI.Scene_Boot_onDatabaseLoaded =
			Scene_Boot.prototype.onDatabaseLoaded;
		Scene_Boot.prototype.onDatabaseLoaded = function() {
			Tyruswoo.EventAI.Scene_Boot_onDatabaseLoaded.call(this);
			Tyruswoo.EventAI.loadSelfVariables();
			Tyruswoo.EventAI.loadExtraSelfSwitches();
		};

		Tyruswoo.EventAI.loadSelfVariables = function() {
			if (!Tyruswoo.EventAI.param.enableSelfVariables) {
				return;
			}
			const len = $dataSystem.variables.length;
			for (let i = 1; i < len; i++) {
				let v = $dataSystem.variables[i];
				if (v && Tyruswoo.EventAI.SELF_REGEX.test(v)) {
					this._isSelfVariable[i] = true;
				}
			}
		};

		Tyruswoo.EventAI.loadExtraSelfSwitches = function() {
			if (!Tyruswoo.EventAI.param.enableExtraSelfSwitches) {
				return;
			}
			const len = $dataSystem.switches.length;
			for (let i = 1; i < len; i++) {
				let v = $dataSystem.switches[i];
				if (v && Tyruswoo.EventAI.SELF_REGEX.test(v)) {
					this._isSelfSwitch[i] = true;
				}
			}
		};
	}

	if (Tyruswoo.EventAI.param.enableSelfVariables) {

		// Alias method
		Tyruswoo.EventAI.DataManager_createGameObjects_noSelfVar =
			DataManager.createGameObjects;
		DataManager.createGameObjects = function() {
			Tyruswoo.EventAI.DataManager_createGameObjects_noSelfVar.call(
				this);
			$gameSelfVariables = new Tyruswoo.EventAI.SelfVariables();
		};

		// Alias method
		Tyruswoo.EventAI.DataManager_makeSaveContents_noSelfVar =
			DataManager.makeSaveContents;
		DataManager.makeSaveContents = function() {
			let contents = Tyruswoo.EventAI.DataManager_makeSaveContents_noSelfVar.call(
				this);
			contents.selfVariableData = $gameSelfVariables.exportData();
			return contents;
		};

		// Alias method
		Tyruswoo.EventAI.DataManager_extractSaveContents_noSelfVar =
			DataManager.extractSaveContents;
		DataManager.extractSaveContents = function(contents) {
			Tyruswoo.EventAI.DataManager_extractSaveContents_noSelfVar.call(
				this, contents);
			$gameSelfVariables = new Tyruswoo.EventAI.SelfVariables(contents.selfVariableData);
		};
	} // endif self variables enabled


	Tyruswoo.EventAI.isValidSelfVariableId = function(selfVariableId) {
		return this._isSelfVariable[selfVariableId];
	};

	Tyruswoo.EventAI.isValidSelfSwitchId = function(selfSwitchId) {
		return this._isSelfSwitch[selfSwitchId];
	};

	//-----------------------------------------------------------------------------
	// Game Self Variables class
	// This is similar to Game_SelfSwitches,
	// except that it can store values of any type.
	//-----------------------------------------------------------------------------
	
	Tyruswoo.EventAI.SelfVariables = function() {
		this.initialize(...arguments);
	};

	Tyruswoo.EventAI.SelfVariables.prototype.initialize = function(data=null) {
		if (!data) {
			data = {};
		}
		this._data = data;
	};

	Tyruswoo.EventAI.SelfVariables.prototype.exportData = function() {
		return this._data;
	};

	Tyruswoo.EventAI.SelfVariables.prototype.clear = function() {
		this._data = {};
	};

	Tyruswoo.EventAI.SelfVariables.prototype.value = function(key) {
		return this._data[key] || 0;
	};

	Tyruswoo.EventAI.SelfVariables.prototype.setValue = function(key, value) {
		const variableId = key[2];
		if (variableId > 0 && variableId < $dataSystem.variables.length) {
			if (typeof value === "number") {
				value = Math.floor(value);
			}
			this._data[key] = value;
			this.onChange();
		}
	};

	Tyruswoo.EventAI.SelfVariables.prototype.onChange = function() {
		// Since an event page can be conditioned on a variable,
		// it can be conditioned on a self variable.
		// Therefore, self variable changes require a refresh.
		$gameMap.requestRefresh();
	};

	//-----------------------------------------------------------------------------
	// Game integration for self variables
	//-----------------------------------------------------------------------------

	if (Tyruswoo.EventAI.param.enableSelfVariables) {
		// Alias, because Game_Variables.prototype.value is going to expand
		// to also read self variables.
		Game_Variables.prototype.globalValue =
			Game_Variables.prototype.value;

		Game_Variables.prototype.value = function(variableId) {
			if (Tyruswoo.EventAI.isValidSelfVariableId(variableId)) {
				const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
				if (interpreter) {
					let key = interpreter.makeSelfKey(variableId);
					return $gameSelfVariables.value(key);
				} else {
					throw new Error("Can't get self variable; no interpreter found");
				}
			} else {
				return this.globalValue(variableId);
			}
		};

		// Alias, because Game_Variables.prototype.setValue is going to expand
		// to also set self variables.
		Game_Variables.prototype.setGlobalValue =
			Game_Variables.prototype.setValue;

		Game_Variables.prototype.setValue = function(variableId, value) {
			if (Tyruswoo.EventAI.isValidSelfVariableId(variableId)) {
				const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
				if (interpreter) {
					let key = interpreter.makeSelfKey(variableId);
					$gameSelfVariables.setValue(key, value);
				} else {
					throw new Error("Can't set self variable; no interpreter found");
				}
			} else {
				this.setGlobalValue(variableId, value);
			}
		};
	} // endif self variables enabled

	//-----------------------------------------------------------------------------
	// Game integration for extra self switches
	//-----------------------------------------------------------------------------

	if (Tyruswoo.EventAI.param.enableExtraSelfSwitches) {
		// Alias, because Game_Switches.prototype.value is going to expand
		// to also read self switches.
		Game_Switches.prototype.globalValue =
			Game_Switches.prototype.value;

		Game_Switches.prototype.value = function(switchId) {
			if (Tyruswoo.EventAI.isValidSelfSwitchId(switchId)) {
				const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
				if (interpreter) {
					let key = interpreter.makeSelfKey(switchId);
					return $gameSelfSwitches.value(key);
				} else {
					throw new Error("Can't get self switch; no interpreter found");
				}
			} else {
				return this.globalValue(switchId);
			}
		};

		// Alias, because Game_Switches.prototype.setValue is going to expand
		// to also set self switches.
		Game_Switches.prototype.setGlobalValue =
			Game_Switches.prototype.setValue;

		Game_Switches.prototype.setValue = function(switchId, value) {
			if (Tyruswoo.EventAI.isValidSelfSwitchId(switchId)) {
				const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
				if (interpreter) {
					let key = interpreter.makeSelfKey(switchId);
					$gameSelfSwitches.setValue(key, value);
				} else {
					throw new Error("Can't set self switch; no interpreter found");
				}
			} else {
				this.setGlobalValue(switchId, value);
			}
		};
	} // endif extra self switches enabled

	//-----------------------------------------------------------------------------
	// Page condition checking with self variables and extra self switches
	//-----------------------------------------------------------------------------

	if (Tyruswoo.EventAI.param.enableSelfVariables ||
		Tyruswoo.EventAI.param.enableExtraSelfSwitches) {

		Tyruswoo.EventAI.Game_Event_meetsConditions =
			Game_Event.prototype.meetsConditions;
		Game_Event.prototype.meetsConditions = function(page) {
			const c = page.conditions;
			const s1v = c.switch1Valid;
			const s2v = c.switch2Valid;
			const vv = c.variableValid;
			if (c.switch1Valid && Tyruswoo.EventAI.isValidSelfSwitchId(c.switch1Id)) {
				const key1 = [this._mapId, this._eventId, c.switch1Id];
				if ($gameSelfSwitches.value(key1) !== true) {
					return false;
				}
				c.switch1Valid = false; // Avoid re-checking switch1.
			}
			if (c.switch2Valid && Tyruswoo.EventAI.isValidSelfSwitchId(c.switch2Id)) {
				const key2  = [this._mapId, this._eventId, c.switch2Id];
				if ($gameSelfSwitches.value(key2) !== true) {
					return false;
				}
				c.switch2Valid = false; // Avoid re-checking switch2.
			}
			if (c.variableValid && Tyruswoo.EventAI.isValidSelfVariableId(c.variableId)) {
				const keyV = [this._mapId, this._eventId, c.variableId];
				if ($gameSelfVariables.value(keyV) < c.variableValue) {
					return false;
				}
				c.variableValid = false; // Avoid re-checking variable.
			}
			const valid = Tyruswoo.EventAI.Game_Event_meetsConditions.call(
				this, page);
			// Restore original page conditions before returning.
			c.switch1Valid = s1v;
			c.switch2Valid = s2v;
			c.variableValid = vv;
			return valid;
		}
	} // endif self variables or extra self switches enabled

	//=============================================================================
	// Linked Events
	//=============================================================================
	// Linked event methods.
	//-----------------------------------------------------------------------------

	// New method.
	// Find an event that matches the criteria provided,
	// and link the identified event to the current interpreter.
	Tyruswoo.EventAI.linkEvent = function(eventId, mapId, eventNote, x, y, maxDistance=0) {
		//console.log("eventId: " + eventId + "\nmapId: " + mapId + "\neventNote: " + eventNote + "\nx: " + x + "\ny: " + y);
		if (!mapId) {
			console.warn("Link Event: No Map ID given!");
			return;
		}

		if (mapId == $gameMap.mapId()) {
			this.linkLocalEvent(eventId, eventNote, x, y, maxDistance);
		} else {
			this.linkRemoteEvent(eventId, mapId, eventNote, x, y, maxDistance);
		}
	};

	Tyruswoo.EventAI.linkLocalEvent = function(eventId, eventNote, x, y, maxDistance=0) {
		var coords = null;
		if (x !== null && y !== null) {
			coords = { x: x, y: y };
		}

		if (eventId) {
			event = $gameMap.event(eventId);
			if (eventNote && eventNote !== event.event().note) {
				console.warn("Link Local Event: Event ID given, but note doesn't match.");
				return;
			}
			if (coords) {
				if (Tyruswoo.EventAI.boxDistance(event, coords) > maxDistance) {
					console.warn("Link Local Event: Event ID given, but x,y is out of range.");
					return;
				}
			}
		} else {
			var eventRange = $gameMap.events();
			if (coords) {
				eventRange = eventRange.filter(event => event &&
					Tyruswoo.EventAI.boxDistance(event, coords) <= maxDistance);
			}

			if (eventNote) {
				eventRange = eventRange.filter(event => event &&
					event.event().note == eventNote);
			}
			
			eventRange = eventRange.filter(event => event &&
					event._erased == false);

			// Sort nearest to farthest.
			if (!coords) {
				coords = $gamePlayer; // Use player's location if no coords given.
			}
			eventRange = eventRange.sort((a, b) =>
				Tyruswoo.EventAI.boxDistance(a, coords) - Tyruswoo.EventAI.boxDistance(b, coords));

			eventId = eventRange[0] ? eventRange[0].eventId() : null;
		}

		if (!eventId) {
			//console.warn("Link Local Event: No event matched filter.");
			return;
		}

		const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		interpreter._linkedEventId = eventId;
		interpreter._linkedEventMapId = $gameMap.mapId();
	};

	Tyruswoo.EventAI.linkRemoteEvent = function(eventId, mapId, eventNote, x, y, maxDistance=0) {
		const mapData = Tyruswoo.EventAI.loadReferenceMapSync(mapId);
		var eventRange = mapData.events;
		var coords = null;
		if (x !== null && y !== null) {
			coords = { x: x, y: y };
		}
		if (eventId) {
			onlyEvent = mapData.events[eventId];
			eventRange = [ onlyEvent ];
		}
		if (coords) {
			// Events are filtered by distance from target coords,
			eventRange = eventRange.filter((event) => event &&
				Tyruswoo.EventAI.boxDistance(event, coords) <= maxDistance);
			// and sorted nearest to farthest.
			eventRange = eventRange.sort((a, b) =>
				Tyruswoo.EventAI.boxDistance(a, coords) -
				Tyruswoo.EventAI.boxDistance(b.coords));
		}
		if (eventNote) {
			eventRange = eventRange.filter((event) =>
				event && event.note == eventNote);
		}
		
		eventId = eventRange[0] ? eventRange[0].id : null;

		if (!eventId) {
			//console.warn("Link Remote Event: No event matched filter.");
			return;
		}
		const interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		interpreter._linkedEventId = eventId;
		interpreter._linkedEventMapId = mapId;
	};

	// New method.
	// Ensures the current interpreter has no linked event.
	Tyruswoo.EventAI.unlinkEvent = function(interpreter=null) {
		if (!interpreter) {
			interpreter = Tyruswoo.EventAI.activeEventInterpreter();
		}
		interpreter._linkedEventId = 0;
		interpreter._linkedEventMapId = 0;
		//console.log("EventAI: Un-linked event by the Un-link Event plugin command or script, or by erasing the linked event.")
	};

	Game_Interpreter.prototype.hasLinkedEvent = function() {
		return !!(this._linkedEventId && this._linkedEventMapId);
	}
	
	// Alias method.
	// When event processing ends, unlink.
	Tyruswoo.EventAI.Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
	Game_Interpreter.prototype.terminate = function() {
		Tyruswoo.EventAI.unlinkEvent(this);
		Tyruswoo.EventAI.Game_Interpreter_terminate.call(this);
	};

	// Alias method.
	// Note that this method is called by various commands, including Set Movement Route, Show Animation, and Show Balloon Icon.
	// This method is also called by the Game_Interpreter.updateWaitMode function.
	Tyruswoo.EventAI.Game_Interpreter_character = Game_Interpreter.prototype.character;
	Game_Interpreter.prototype.character = function(param) {
		if ($gameParty.inBattle() || param < 0) {
			// Fall through to default.
		} else if (this.hasLinkedEvent() && this.isOnCurrentMap()) {
			// Use the linked event's ID.
			return $gameMap.event(param > 0 ? param : this.onMapLinkedEventId());
		}
		// If you're here, there was no change from default.
		return Tyruswoo.EventAI.Game_Interpreter_character.call(this, param);
	};

	Game_Interpreter.prototype.isOnCurrentMap = function() {
		return this.linkedEventMapId() === $gameMap.mapId();
	};
	
	// New method
	// If the there is a linked event and it is located on the current map,
	// use the linked event's ID. Otherwise, use this._eventId
	Game_Interpreter.prototype.onMapLinkedEventId = function() {
		if(this.linkedEventId() && this.linkedEventMapId() == $gameMap.mapId()) {
			return this.linkedEventId();
		} else {
			return this._eventId;
		}
	};

	// New method
	Game_Interpreter.prototype.linkedEventId = function() {
		return this._linkedEventId || this._eventId;
	};
	
	// New method
	Game_Interpreter.prototype.linkedEventMapId = function() {
		return this._linkedEventMapId || this._mapId;
	};

	// New helper method
	Game_Interpreter.prototype.makeSelfKey = function(id) {
		if (this.hasLinkedEvent()) {
			// This is a linked event.
			// Variables, switches, and self switches may be referenced differently.
			return [this._linkedEventMapId, this._linkedEventId, id];
		} else {
			return [this._mapId, this._eventId, id];
		}
	};
	
	// Alias method
	// Conditional Branch
	Tyruswoo.EventAI.Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
	Game_Interpreter.prototype.command111 = function(params) {
		if (this.hasLinkedEvent() && params[0] === 2) {
			// Conditional Branch check: Self Switch of Linked Event
			const key = this.makeSelfKey(params[1]);
			let result = $gameSelfSwitches.value(key) === (params[2] === 0);
			// Conditional Branch post-check
			this._branch[this._indent] = result;
			if (this._branch[this._indent] === false) {
				this.skipBranch();
			}
			return true;
		} else {
			return Tyruswoo.EventAI.Game_Interpreter_command111.call(this, params);
		}
	};

	// Alias method
	// Common Event
	Tyruswoo.EventAI.Game_Interpreter_command117 =
		Game_Interpreter.prototype.command117;
	Game_Interpreter.prototype.command117 = function(params) {
		if (this.hasLinkedEvent()) {
			const commonEvent = $dataCommonEvents[params[0]];
			if (commonEvent) {
				const eventId = this.isOnCurrentMap() ? this.linkedEventId() : 0;
				this.setupChild(commonEvent.list, eventId);
			}
		} else {
			return Tyruswoo.EventAI.Game_Interpreter_command117.call(this, params);
		}
	};

	// Alias method
	// Control Self Switch
	// Key is [mapId, eventId, selfSwitchCh] where selfSwitchCh is a letter A, B, C, or D.
	Tyruswoo.EventAI.Game_Interpreter_command123 =
		Game_Interpreter.prototype.command123;
	Game_Interpreter.prototype.command123 = function(params) {
		if (this.hasLinkedEvent()) {
			const key = this.makeSelfKey(params[0]);
			$gameSelfSwitches.setValue(key, params[1] === 0);
			return true;
		} else {
			return Tyruswoo.EventAI.Game_Interpreter_command123.call(this, params); //Default method.
		}
	};
	
	// Alias method
	// Erase Event
	Tyruswoo.EventAI.Game_Interpreter_command214 =
		Game_Interpreter.prototype.command214;
	Game_Interpreter.prototype.command214 = function() {
		if (this.hasLinkedEvent() && this._linkedEventMapId == $gameMap.mapId()) {
			$gameMap.eraseEvent(this._linkedEventId);
			Tyruswoo.EventAI.unlinkEvent(this);
			return true;
		} else {
			//Default method.
			return Tyruswoo.EventAI.Game_Interpreter_command214.call(this);
		}
	};

	//=============================================================================
	// Global Move Route Behavior
	//=============================================================================
	// System methods
	//-----------------------------------------------------------------------------

	// New method
	Game_System.prototype.moveRouteMode = function() {
		if (this.isMoveRouteNormal()) {
			return "normal";
		} else if (this.isMoveRouteFreeze()) {
			return "freeze";
		} else if (this.isMoveRouteIgnorePlayer()) {
			return "ignore player";
		}
	};

	// New method
	Game_System.prototype.isMoveRouteNormal = function() {
		return !this._moveRouteIgnorePlayer && !this._moveRouteFreeze;
	};

	// New method
	Game_System.prototype.isMoveRouteIgnorePlayer = function() {
		return !!this._moveRouteIgnorePlayer;
	};

	// New method
	Game_System.prototype.isMoveRouteFreeze = function() {
		return !!this._moveRouteFreeze;
	};

	// New method
	Game_System.prototype.setMoveRouteMode = function(mode) {
		mode = mode ? mode.toLowerCase() : "normal";
		this._moveRouteFreeze = false;
		this._moveRouteIgnorePlayer = false;
		switch (mode) {
			case "freeze":
				this._moveRouteFreeze = true;
				break;
			case "ignore player":
				this._moveRouteIgnorePlayer = true;
				break;
		}
	};

	//-----------------------------------------------------------------------------
	// Freeze mode
	//-----------------------------------------------------------------------------

	// Alias method
	Tyruswoo.EventAI.Game_Character_updateRoutineMove =
		Game_Character.prototype.updateRoutineMove;
	Game_Character.prototype.updateRoutineMove = function() {
		if (!this._moveRouteForcing && $gameSystem.isMoveRouteFreeze()) {
			// Autonomous route is frozen. Don't move.
		} else {
			Tyruswoo.EventAI.Game_Character_updateRoutineMove.call(this);
		}
	};

	//-----------------------------------------------------------------------------
	// Ignore Player mode
	//-----------------------------------------------------------------------------

	// New method
	// Whether an NPC currently has the ability to detect a near-enough player.
	Game_Character.prototype.canDetectPlayer = function() {
		// Move routes forced by a Set Move Route command can always detect.
		// Otherwise, they can detect the player unless Ignore Player mode is on.
		return this._moveRouteForcing || !$gameSystem.isMoveRouteIgnorePlayer();
	};

	// Alias method
	Tyruswoo.EventAI.Game_Character_turnTowardPlayer =
		Game_Character.prototype.turnTowardPlayer;
	Game_Character.prototype.turnTowardPlayer = function() {
		if (this.canDetectPlayer()) {
			Tyruswoo.EventAI.Game_Character_turnTowardPlayer.call(this);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Character_turnAwayFromPlayer =
		Game_Character.prototype.turnAwayFromPlayer;
	Game_Character.prototype.turnAwayFromPlayer = function() {
		if (this.canDetectPlayer()) {
			Tyruswoo.EventAI.Game_Character_turnAwayFromPlayer.call(this);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Character_moveTowardPlayer =
		Game_Character.prototype.moveTowardPlayer;
	Game_Character.prototype.moveTowardPlayer = function() {
		if (this.canDetectPlayer()) {
			Tyruswoo.EventAI.Game_Character_moveTowardPlayer.call(this);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Character_moveAwayFromPlayer =
		Game_Character.prototype.moveAwayFromPlayer;
	Game_Character.prototype.moveAwayFromPlayer = function() {
		if (this.canDetectPlayer()) {
			Tyruswoo.EventAI.Game_Character_moveAwayFromPlayer.call(this);
		}
	};

	// Alias method
	Tyruswoo.EventAI.Game_Event_isNearThePlayer =
		Game_Event.prototype.isNearThePlayer;
	Game_Event.prototype.isNearThePlayer = function() {
		if (this.canDetectPlayer()) {
			return Tyruswoo.EventAI.Game_Event_isNearThePlayer.call(this);
		} else {
			// Even if the player _is_ near, this NPC wouldn't know it.
			return false;
		}
	};

	//=============================================================================
	// Set New Origin Command
	//=============================================================================
	// Static method
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.setNewOrigin = function(mapId, eventId, x=null, y=null) {
		if ($gameMap && mapId == $gameMap.mapId()) {
			// Set local event.
			let event = $gameMap.event(eventId);
			event.setNewOrigin(x, y);
		} else {
			// Set remote event.
			if (null === x && null === y) {
				throw new Error("Setting a remote event's origin requires x,y coordinates!")
			}
			$gameEventOrigins.set(mapId, eventId, x, y);
		}
	};

	//-----------------------------------------------------------------------------
	// Origin Lookup
	// This game object keeps track of where each event's origin is.
	// Each origin is stored as sets of coordinates.
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.OriginLookup = function() {
		this.initialize(...arguments);
	};

	Tyruswoo.EventAI.OriginLookup.prototype.initialize = function(data) {
		if (data) {
			this._data = data;
		} else {
			this.clear();
		}
	};

	Tyruswoo.EventAI.OriginLookup.prototype.exportData = function() {
		return this._data;
	};

	Tyruswoo.EventAI.OriginLookup.prototype.clear = function() {
		this._data = {};
	};

	Tyruswoo.EventAI.OriginLookup.prototype.makeKey = function(mapId, eventId) {
		return "" + mapId + " " + eventId;
	};

	Tyruswoo.EventAI.OriginLookup.prototype.getIfChanged = function(mapId, eventId) {
		const key = this.makeKey(mapId, eventId);
		return this._data[key];
	};

	Tyruswoo.EventAI.OriginLookup.prototype.get = function(mapId, eventId) {
		var value = this.getIfChanged(mapId, eventId);
		if (!value) {
			// Origin was never set to anything new.
			// Get the object's starting origin.
			let mapData = Tyruswoo.EventAI.loadReferenceMapSync(mapId);
			let event = mapData.events[eventId];
			value = { x: event.x, y: event.y };
		}
	};

	Tyruswoo.EventAI.OriginLookup.prototype.set = function(mapId, eventId, x, y=null) {
		var value = { x: x, y: y };
		if (x && null === y && undefined !== x.x) {
			// A coords-containing object was passed in instead of direct x,y.
			// Unpack the object.
			value.x = x.x;
			value.y = x.y;
		}
		const key = this.makeKey(mapId, eventId);
		this._data[key] = value;
	};

	//-----------------------------------------------------------------------------
	// DataManager integration
	//-----------------------------------------------------------------------------

	// Alias method
	Tyruswoo.EventAI.DataManager_createGameObjects_noEventOrigins = 
		DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		Tyruswoo.EventAI.DataManager_createGameObjects_noEventOrigins.call(this);
		$gameEventOrigins = new Tyruswoo.EventAI.OriginLookup();
	};

	// Alias method
	Tyruswoo.EventAI.DataManager_makeSaveContents_noEventOrigins =
		DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
		let contents = Tyruswoo.EventAI.DataManager_makeSaveContents_noEventOrigins.call(
			this);
		contents.eventOriginData = $gameEventOrigins.exportData();
		return contents;
	};

	// Alias method
	Tyruswoo.EventAI.DataManager_extractSaveContents_noEventOrigins =
		DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
		Tyruswoo.EventAI.DataManager_extractSaveContents_noEventOrigins.call(
			this, contents);
		$gameEventOrigins = new Tyruswoo.EventAI.OriginLookup(
			contents.eventOriginData);
	};

	//-----------------------------------------------------------------------------
	// Game_Event integration
	//-----------------------------------------------------------------------------

	// Alias method
	// Sets event data's x and y to its new origins,
	// so that anything checking them to find the origin will get the right number.
	Tyruswoo.EventAI.Game_Event_event = Game_Event.prototype.event;
	Game_Event.prototype.event = function() {
		var event = Tyruswoo.EventAI.Game_Event_event.call(this);
		if (!event.tyruswoo_origin_checked) {
			var modifiedOrigin = $gameEventOrigins.getIfChanged(
				this._mapId, this._eventId);
			if (modifiedOrigin) {
				// Update origin to get modifications.
				event.x = modifiedOrigin.x;
				event.y = modifiedOrigin.y;
			}
			// Mark origin checked so we don't have to do this again.
			event.tyruswoo_origin_checked = true;
		}
		return event;
	};

	// New Property
	Object.defineProperty(Game_Event.prototype, "origin", {
		get: function() {
			if (!this._start) {
				const event = this.event(); // Loads the origin. See above.
				this._start = { x: event.x, y: event.y };
			}
			return this._start;
		},
		set: function(value) {
			this._start = { x: value.x, y: value.y };
			
			// Mark start changed.
			$gameEventOrigins.set(this._mapId, this._eventId, value.x, value.y);

			// Set the event data's coordinates to match the new origin.
			const event = $dataMap.events[this._eventId] || {};
			event.x = value.x;
			event.y = value.y;
			event.tyruswoo_origin_checked = true; // Mark up-to-date.

			// If it's a newly generated event, add it to $dataMap.
			if (!$dataMap.events[this._eventId]) {
			    $dataMap.events[this._eventId] = event;
			}
		}
	});

	// New Method
	// The event's new origin for the purposes of map reload and move route
	// will be the given coordinates,
	// or the event's current location is no coords are given.
	Game_Event.prototype.setNewOrigin = function(x=null, y=null) {
		if (null === x && null === y) {
			x = this.x;
			y = this.y;
		}
		const coords = { x: x, y: y };
		this.origin = coords;
	};

	//=============================================================================
	// Move Route Script Snippets
	//=============================================================================
	// Move Route Branches
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.RBIF_REGEX = /^this\.rbIf\(/;
	Tyruswoo.EventAI.RBELSE_REGEX = /^this\.rbElse\(/;
	Tyruswoo.EventAI.RBEND_REGEX = /^this\.rbEnd\(/;
	Tyruswoo.EventAI.RBELSE_OR_END_REGEX = /^this\.rb(Else|End)\(/;
	Tyruswoo.EventAI.RBIF_OR_ELSE_OR_END_REGEX = /^this\.rb(If|Else|End)\(/;
	Tyruswoo.EventAI.BLN_OR_SE_REGEX = /^this\.(setBln|unsetBln|showBln|setSe|unsetSe)\(/;

	// Alias method
	Tyruswoo.EventAI.Game_Character_initMembers =
		Game_Character.prototype.initMembers;
	Game_Character.prototype.initMembers = function() {
		Tyruswoo.EventAI.Game_Character_initMembers.call(this);
		this._branchTaken = [ true ];
		this._moveRouteDepth = 0;
	};

	// New method
	// rb stands for route branch.
	Game_Character.prototype.rbIf = function(condition) {
		this._moveRouteDepth++;
		this._branchTaken[this._moveRouteDepth] = condition;
		if (condition) {
			// Stay here and run this branch.
		} else {
			// Skip past this branch.
			this._moveRouteIndex = this.indexOfRouteBranchElse();
			this.evalNext();
		}
	};

	Game_Character.prototype.rbElse = function(condition=true) {
		if (this._branchTaken[this._moveRouteDepth]) {
			// Can't take the else if branch has already been taken.
			this._moveRouteIndex = this.indexOfRouteBranchEnd();
			this.evalNext();
		} else if (condition) {
			// Stay here and run this branch.
			this._branchTaken[this._moveRouteDepth] = true;
		} else {
			// This condition doesn't match, so try another else, if any.
			this._moveRouteIndex = this.indexOfRouteBranchElse();
			this.evalNext();
		}
	};

	// Skips to the route branch else at the current depth.
	Game_Character.prototype.rbEnd = function() {
		this._branchTaken[this._moveRouteDepth] = undefined;
		this._moveRouteDepth--;
		this.processNext();
		return;
	};

	// New helper method
	// Finds the index of the next route branch else or end.
	Game_Character.prototype.indexOfRouteBranchElse = function() {
		return this.indexOfScript(Tyruswoo.EventAI.RBELSE_OR_END_REGEX);
	};

	// Finds the index of the next route branch end.
	Game_Character.prototype.indexOfRouteBranchEnd = function() {
		return this.indexOfScript(Tyruswoo.EventAI.RBEND_REGEX);
	};

	// Finds the index of the next script snippet matching the regex
	// at the current depth.
	Game_Character.prototype.indexOfScript = function(bodyRegex) {
		const routeSize = this._moveRoute.list.length;
		var depth = this._moveRouteDepth;
		for (let i = this._moveRouteIndex + 1; i < routeSize; i++) {
			let command = this._moveRoute.list[i];
			if (Game_Character.ROUTE_SCRIPT == command.code) {
				let scriptBody = command.parameters[0].trim();
				if (depth == this._moveRouteDepth && bodyRegex.test(scriptBody)) {
					return i; // It's a match!
				} else if (Tyruswoo.EventAI.RBIF_REGEX.test(scriptBody)) {
					depth++;
				} else if (Tyruswoo.EventAI.RBEND_REGEX.test(scriptBody)) {
					depth--;
				}
			}
		}
		// If you're here, no matching script snippet was found.
		return -1;
	};
	
	// New method
	Game_Character.prototype.evalNext = function() {
		const command = this._moveRoute.list[this._moveRouteIndex];
		if (command && Game_Character.ROUTE_SCRIPT == command.code && ( Tyruswoo.EventAI.RBIF_OR_ELSE_OR_END_REGEX.test(command.parameters[0].trim()) || Tyruswoo.EventAI.BLN_OR_SE_REGEX.test(command.parameters[0].trim()) ) ) {
			eval(command.parameters[0]);
		}
	};
	
	// New method
	Game_Character.prototype.processNext = function() {
		const command = this._moveRoute.list[this._moveRouteIndex];
		if (command && Game_Character.ROUTE_SCRIPT == command.code && ( Tyruswoo.EventAI.BLN_OR_SE_REGEX.test(command.parameters[0].trim()) || Tyruswoo.EventAI.RBEND_REGEX.test(command.parameters[0].trim()) ) ) {
			this.advanceMoveRouteIndex();
			const nextCommand = this._moveRoute.list[this._moveRouteIndex];
			this.processMoveCommand(nextCommand);
		}
	};

	//-----------------------------------------------------------------------------
	// Sound effect setting; only plays on change
	//-----------------------------------------------------------------------------
	
	Object.defineProperty(Game_Character.prototype, "seName", {
		get: function() { return this._seName; },
		set: function(str) { this.setSe(str); }
	});

	// New method
	// Play a sound effect, but only if this character didn't already play it
	// the last time it called setSe.
	Game_Character.prototype.setSe = function(sound, volume=90, pitch=100) {
		// sound may be an object, or just a sound name.
		const soundName = sound.name ? sound.name : sound;
		if (soundName != this._seName) {
			this._seName = soundName;
			let se = sound.name ? sound :
				{ name: soundName, volume: volume, pitch: pitch };
			// TODO: Consider using character position to set pan
			AudioManager.playSe(se);
		}
		this.processNext();
	};

	// Sets the character's latest sound effect to nothing.
	// This ensures that next time setSe is called, the sound will play.
	Game_Character.prototype.unsetSe = function(soundName) {
		this._seName = null;
		this.processNext();
	};

	//-----------------------------------------------------------------------------
	// Expression Balloon setting inside move routes
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.BalloonCode = {
		none: 0, "": 0,
		exclamation: 1, surprise: 1, "!": 1, 
		question: 2, what: 2, confusion: 2, confused: 2, "?": 2,
		music: 3, mus: 3, note: 3, "music note": 3,
		heart: 4, love: 4, "<3": 4,
		anger: 5, angry: 5, mad: 5, x: 5,
		sweat: 6, sweatdrop: 6, "sweat drop": 6, d: 6,
		frustration: 7, frustrated: 7, scribble: 7, grumpy: 7, displeased: 7,
		silence: 8, ellipsis: 8, dots: 8, "...": 8,
		idea: 9, light: 9, "light bulb": 9, bulb: 9, spark: 9,
		zzz: 10, sleep: 10, z: 10
	};

	Tyruswoo.EventAI.getBalloonCode = function(balloonType) {
		if (balloonType.toLowerCase) {
			// This is a string. Convert it to balloon code.
			return Tyruswoo.EventAI.BalloonCode[balloonType.toLowerCase()];
		} else {
			// We assume it's already a numeric code.
			return balloonType;
		}
	};

	// New method
	// Show a balloon over the character.
	Game_Character.prototype.showBln = function(balloonType) {
		const code = Tyruswoo.EventAI.getBalloonCode(balloonType);
		this._balloon = code;
		$gameTemp.requestBalloon(this, code);
		this.processNext();
	};

	// New method
	// Show a balloon over the character if it isn't the most recent type shown.
	Game_Character.prototype.setBln = function(balloonType) {
		const code = Tyruswoo.EventAI.getBalloonCode(balloonType);
		if (code != this._balloon) {
			this._balloon = code;
			$gameTemp.requestBalloon(this, code);
		}
		this.processNext();
	};

	// New method
	// Set the character's balloon to "none".
	// This ensures that next time the balloon is set to something, it'll show.
	Game_Character.prototype.unsetBln = function() {
		this._balloon = Tyruswoo.EventAI.BalloonCode.none;
		this.processNext();
	};

	//-----------------------------------------------------------------------------
	// Event self switch convenience properties and methods
	//-----------------------------------------------------------------------------

	Object.defineProperties(Game_Event.prototype, {
		A: {
			get: function() { return this.getSelfSwitch('A'); },
			set: function(value) { return this.setSelfSwitch('A', value); }
		},
		B: {
			get: function() { return this.getSelfSwitch('B'); },
			set: function(value) { return this.setSelfSwitch('B', value); }
		},
		C: {
			get: function() { return this.getSelfSwitch('C'); },
			set: function(value) { return this.setSelfSwitch('C', value); }
		},
		D: {
			get: function() { return this.getSelfSwitch('D'); },
			set: function(value) { return this.setSelfSwitch('D', value); }
		}
	});

	Game_Event.prototype.getSelfSwitch = function(selfSwitchCh) {
		const key = [ this._mapId, this._eventId, selfSwitchCh ];
		return $gameSelfSwitches.value(key);
	};

	Game_Event.prototype.setSelfSwitch = function(selfSwitchCh, value) {
		const key = [ this._mapId, this._eventId, selfSwitchCh ];
		$gameSelfSwitches.setValue(key, !!value);
	};

	//-----------------------------------------------------------------------------
	// Properties and methods for movement and distance finding
	//-----------------------------------------------------------------------------

	// New properties
	Object.defineProperties(Game_Event.prototype, {
		distToPlayer: {
			get: function() {
				if (this.canDetectPlayer()) {
					return $gameMap.distance(this.x, this.y,
						$gamePlayer.x, $gamePlayer.y);
				} else {
					return Infinity;
				}
			}
		},
		name: {
			get: function() {
				return this._name || this.event().name;
			}
		},
		startLoc: {
			get: function() {
				return this.origin;
			},
			set: function(value) {
				this.origin = value;
			}
		},
	});

	// This helper method accepts as arguments either x and y values,
	// a coordinates-bearing object, an event ID, or an event name.
	// Returns a coordinates-bearing object.
	Game_Character.prototype.makeCoords = function(x, y) {
		if (undefined === x || null === x) {
			return null;
		} else if ('number' == typeof x && undefined !== y) {
			// It's x,y coordinates.
			return { x: x, y: y };
		} else if (undefined !== x.x && undefined !== x.y) {
			// It's already a coordinates-bearing object.
			return x;
		} else if ('string' == typeof x) {
			// It's an event name. Return the nearest event with that name.
			let filters = y !== undefined ?
				Tyruswoo.EventAI.parseFilterConditions(y) : null;
			let matches = $gameMap.getEventsByName(x);
			if (filters) {
				matches = matches.filter(
					event => this.meetsFilterConditions(event, filters));
			}
			let nearestMatch = matches.reduce((nearest, current) =>
				this.dist(current) < this.dist(nearest) ? current : nearest,
				matches[0]);
			if (nearestMatch) {
				//console.log("Nearest %1 is %2 tiles away.".format(
				//	x, this.dist(nearestMatch)));
				return nearestMatch;
			} else {
				//console.warn("No events named %1 were found!".format(x));
				return null;
			}
		} else {
			// It's an event ID.
			let event = $dataMap.events[x];
			if (event) {
				return event;
			} else {
				//console.warn("No event found with ID = " + x);
			}
		}
	};

	// New method
	// Syntactic sugar, to make distance checking easier.
	// Gets the character's distance from any arbitrary coords,
	// character, or other coords-bearing object.
	Game_Character.prototype.dist = function(x, y) {
		var theirCoords = this.makeCoords(x, y);
		if (theirCoords) {
			return $gameMap.distance(this.x, this.y,
				theirCoords.x, theirCoords.y);
		} else {
			// The object to check distance from doesn't exist,
			// or isn't in this map.
			return Infinity;
		}
	};

	// New method
	// Move one step toward any arbitrary coordinates.
	Game_Character.prototype.stepTo = function(x, y) {
		var coords = this.makeCoords(x, y);
		if (coords) {
			return this.moveTowardCharacter(coords);
		}
	};

	// New method
	// Move one step away from any arbitrary coordinates.
	Game_Character.prototype.stepAway = function(x, y) {
		var coords = this.makeCoords(x, y);
		if (coords) {
			return this.moveAwayFromCharacter(coords);
		}
	};

	Game_Character.prototype.turnTo = function(x, y) {
		var coords = this.makeCoords(x, y);
		if (coords) {
			return this.turnTowardCharacter(coords);
		}
	};

	Game_Character.prototype.meetsFilterConditions = function(otherChar, filters) {
		if (!filters) {
			// If no filters specified, that's an automatic pass.
			return true;
		}

		// Each filter is treated as OR'd with the others,
		// so if one passes, it's all a pass.
		for (const filter of filters) {
			if (this.passesFilter(otherChar, filter)) {
				return true;
			}
		}
		// If here, it failed all filters.
		return false;
	};

	Game_Character.prototype.passesFilter = function(otherChar, filter) {
		const distance = $gameMap.distance(this.x, this.y,
			otherChar.x, otherChar.y);
		if (distance < filter.minDistance || distance > filter.maxDistance) {
			// Distance out of range.
			return false;
		}

		for (const ss of ['a', 'b', 'c', 'd']) {
			if (filter[ss] !== null) {
				// The filter expects something specific for this switch.
				if (filter[ss] !== otherChar[ss.toUpperCase()]) {
					// Switch mismatch.
					return false;
				}
			}
		} // end for each self switch

		// If we're here, nothing in the filter failed.
		return true;
	};

	// This returns an array of condition objects,
	// where each individual object is an ANDed group of conditions,
	// and separate objects are OR'd together.
	Tyruswoo.EventAI.parseFilterConditions = function(filterString) {
		var conjointFilters = [];
		for (const substring of filterString.split('||')) {
			conjointFilters.push(this.parseOneConjointFilter(substring));
		}
		return conjointFilters;
	};

	Tyruswoo.EventAI.parseOneConjointFilter = function(filterString) {
		var filter = {
			a: null, b: null, c: null, d: null,
			minDistance: 0, maxDistance: Infinity
		};

		for (var statement of filterString.split('&&')) {
			statement = statement.toLowerCase();
			let ssCapture = statement.match(/(on|off)\[(a|b|c|d)\]/);
			if (ssCapture) {
				var val = ssCapture[1] == 'on';
				var ssId = ssCapture[2];
				filter[ssId] = val;
			} else {
				let distCapture = statement.match(
					/dist(?:ance)? ?((?:<|>|=)={0,2}) ? (\d+)/);
				if (distCapture) {
					let comp = distCapture[1];
					let num = Number(distCapture[2]);
					if (comp.startsWith('<')) {
						// < or <=
						filter.maxDistance = comp.endsWith('=') ? num : num - 1;
					} else if (comp.startsWith('>')) {
						// > or >=
						filter.minDistance = comp.endsWith('=') ? num : num + 1;
					} else {
						// ==
						filter.minDistance = num;
						filter.maxDistance = num;
					}
				} else {
					console.warn("Unrecognized filter statement: " + statement);
				}
			} // end distCapture block
		} // end for statement
		return filter;
	};

	//-----------------------------------------------------------------------------
	// Targeting
	//-----------------------------------------------------------------------------

	Object.defineProperties(Game_Character.prototype, {
		target: {
			get: function() {
				return this._target;
			},
			set: function(target) {
				target = this.makeCoords(target);
				if (target == this._target) {
					return; // No change to target. Do nothing.
				}
				const oldTarget = this._target;
				if (oldTarget && oldTarget.watchers) {
					// Remove watcher
					let removalIndex = oldTarget.watchers.findIndex(
						watcher => this == watcher);
					oldTarget.watchers.splice(removalIndex, 1);
				}
				this._target = target;
				if (target) {
					// Add watcher
					target.watchers = target.watchers || [];
					target.watchers.push(this);
				}
			} // end set
		} // end target definition
	});

	// New method
	Game_Character.prototype.setTarget = function(target, filterStr, effectArgs) {
		if (!effectArgs && 'object' == typeof filterStr) {
			// There actually isn't a filter; effectArgs are the 2nd parameter.
			effectArgs = filterStr;
			filterStr = null;
		}

		var filters = filterStr ? Tyruswoo.EventAI.parseFilterConditions(filterStr)
			: null;

		target = this.makeCoords(target, filterStr);

		if (target != this.target) {
			this.target = target;
			if (effectArgs) {
				this.doEffects(effectArgs);
			}
			return true;
		}
		return false;
	};

	// New method
	Game_Character.prototype.unsetTarget = function(filterStr, effectArgs) {
		if (!this.target) {
			return false;
		}

		if (!effectArgs && 'object' == typeof filterStr) {
			// There actually isn't a filter; effectArgs are the 1st parameter.
			effectArgs = filterStr;
			filterStr = null;
		}

		if (filterStr) {
			let filters = Tyruswoo.EventAI.parseFilterConditions(filterStr);
			if (!this.meetsFilterConditions(this.target, filters)) {
				return false; // It doesn't match, so don't unset it.
			}
		}

		this.target = null;
		if (!effectArgs) {
			effectArgs = {
				se: null,
				bln: Tyruswoo.EventAI.BalloonCode.none
			};
		}
		this.doEffects(effectArgs);
		return true;
	};
	
	// New method
	// Applies multiple effects or changes at once.
	Game_Character.prototype.doEffects = function(effectArgs) {
		// TODO: Re-enable this after resolving control flow issues.
		return;
		for (const key in effectArgs) {
			let value = effectArgs[key];
			switch(key.toLowerCase) {
				case "bln":
				case "balloon":
					this.setBln(value);
					break;
				case "se":
				case "sound":
				case "soundeffect":
				case "sound effect":
					this.setSe(value);
					break;
				case "speed":
				case "spd":
					this.setMoveSpeed(value);
					break;
				case "frequency":
				case "freq":
					this.setMoveFrequency(value);
					break;
				default:
					console.warn("Unrecognized effect type: " + key);
			}
		}
	};

	//=============================================================================
	// Map methods for script calls
	//=============================================================================

	// Return an array of events that have some specific name.
	// This method caches the names for quick repeat retrieval.
	Game_Map.prototype.getEventsByName = function(name) {
		if (!this._eventsByName[name]) {
			this._eventsByName[name] = this._events.filter(
				event => !!event && event.name == name && !event._erased);
		}
		return this._eventsByName[name];
	};

	// Alias method
	// Any erased event is removed from its eventsByName cache, if any.
	Tyruswoo.EventAI.Game_Map_eraseEvent = Game_Map.prototype.eraseEvent;
	Game_Map.prototype.eraseEvent = function(eventId) {
		const eventName = this._events[eventId] ? this._events[eventId].name : null;
		if(eventName === null) {return false};
		Tyruswoo.EventAI.Game_Map_eraseEvent.call(this, eventId);

		// Remove this event from its eventsByName cache, if one is made.
		if (this._eventsByName && this._eventsByName[eventName]) {
			let removalIndex = this._eventsByName[eventName].findIndex(
				event => event.id == eventId);
			this._eventsByName[eventName].splice(removalIndex, 1);
		}
	};

	// New method
	// Allows a script call to check the name of the current map.
	// Example use case: Let a common event know which map is currently active.
	// Other use case: Assuming you used the Tyruswoo_EventGenerator plugin to
	//    generate an event on the current map, the generated event can use this
	//    script call to determine the current map's name.
	//    Just use a Conditional Branch script call.
	//    For example, to check if the map is named "Spooky Tower"
	//    the Conditional Branch script would be: $gameMap.name() == "Spooky Tower"
	//    Note that you could alternatively check the map's ID using the
	//    default method $gameMap.mapId() == mapID
	Game_Map.prototype.name = function() {
		var mapId = this.mapId();
		return $dataMapInfos[mapId].name;
	};
	
	// New method
	// Allows a script call to get the map's currently active event.
	// Example use case: Checking some property of an event using a Conditional Branch script call.
	Game_Map.prototype.currentEvent = function() {
		var activeEventId = this._interpreter.eventId();
		return this.event(activeEventId);
	};
	
	// New method.
	// Same as $gameMap.currentEvent()
	Game_Map.prototype.activeEvent = function() {
		return this.currentEvent();
	};
	
	// New method
	// Check if there is an event with the corresponding note at the specified coordinates on this map.
	Game_Map.prototype.eventNoteAt = function(eventNote, Xcoord, Ycoord) {
		if(!eventNote) {
			return false;
		}
		var x = Xcoord ? Xcoord : $gamePlayer.x;
		var y = Ycoord ? Ycoord : $gamePlayer.y;
		var eventNoteFound = false;
		for (const event of this.eventsXy(x, y)) {
			var eventId = event.eventId();
			var dataNote = $dataMap && $dataMap.events && $dataMap.events[eventId] && $dataMap.events[eventId].note ? $dataMap.events[eventId].note.toLowerCase() : null;
			if(dataNote && dataNote == eventNote.toLowerCase()) {
				eventNoteFound = true;
			}
		}
		return eventNoteFound;
	};
	
	// New method
	// Check if there is an event with the corresponding note at the player's position.
	Game_Map.prototype.eventNoteAtPlayerLoc = function(eventNote) {
		return this.eventNoteAt(eventNote, $gamePlayer.x, $gamePlayer.y);
	};
	
	// New method
	// Check if there is an event with the corresponding note at the active event's position.
	Game_Map.prototype.eventNoteAtActiveEventLoc = function(eventNote) {
		return this.eventNoteAt(eventNote, this.activeEvent().x, this.activeEvent().y);
	};
	
	// New method.
	// Same as $gameMap.eventNoteAtPlayerLoc()
	// Example use case: You could make a forced-movement puzzle in which a loop makes the player move forward until
	//                   arriving on a tile that has an event with eventNote "Turn", at which point the event is
	//                   linked and the player is turned to face the same direction the event is facing. Then the loop
	//                   continues until the player arrives on a tile that has an event with eventNote "Stop".
	Game_Map.prototype.eventNoteHere = function(eventNote) {
		return this.eventNoteAtPlayerLoc(eventNote);
	};

	//=============================================================================
	// Public functions
	//=============================================================================
	// Distance finding
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.boxDistance = function(locA, locB) {
		if (!locA || !locB) {
			return Infinity;
		}
		const xDiff = Math.abs(locA.x - locB.x);
		const yDiff = Math.abs(locA.y - locB.y);
		return Math.max(xDiff, yDiff);
	};

	Tyruswoo.EventAI.euclideanDistance = function(locA, locB) {
		if (!locA || !locB) {
			return Infinity;
		}
		const xDiff = Math.abs(locA.x - locB.x);
		const yDiff = Math.abs(locA.y - locB.y);
		return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	};

	Tyruswoo.EventAI.manhattanDistance = function(locA, locB) {
		if (!locA || !locB) {
			return Infinity;
		}
		const xDiff = Math.abs(locA.x - locB.x);
		const yDiff = Math.abs(locA.y - locB.y);
		return xDiff + yDiff;
	};

	//-----------------------------------------------------------------------------
	// Referencing maps and events
	//-----------------------------------------------------------------------------

	Tyruswoo.EventAI.getMapIdByName = function(mapName) {
		let mapInfo = $dataMapInfos.find(
			element => element && element.name == mapName);
		if (!mapInfo) {
			return null;
		}
		return mapInfo.id;
	};

	Tyruswoo.EventAI.getEventIdByName = function(eventName, mapId=null) {
		if (!mapId) {
			mapId = $gameMap.mapId();
		}

		const map = Tyruswoo.EventAI.loadReferenceMapSync(mapId);
		if (!map) {
			return null;
		}

		event = map.events.find(event => event && event.name == eventName);
		if (event) {
			return event.id;
		} else {
			return null;
		}
	};

	Tyruswoo.EventAI.loadReferenceMapSync = function(mapId) {
		if ($gameMap && mapId == $gameMap.mapId() && $dataMap) {
			// It's the currently loaded map.
			// No need to open it again.
			return $dataMap;
		} else if (Tyruswoo.mapCache && Tyruswoo.mapCache[mapId]) {
			return Tyruswoo.mapCache[mapId];
		}
		const fs = require('fs');
		const path = "data/Map%1.json".format(mapId.padZero(3));
		const json = fs.readFileSync(path, 'utf8');
		const mapObj = JSON.parse(json);
		Tyruswoo.mapCache = Tyruswoo.mapCache || [];
		Tyruswoo.mapCache[mapId] = mapObj;
		return mapObj;
	};

})();