# Tyruswoo Event AI for RPG Maker MZ

Upgrade your events with new features!

New triggers, linked events, if/else statements in move routes, self variables, and more!

Make events that survey and interact with surroundings, either when triggered, or autonomously!

## Feature Overview

* Place "Trigger: Region Entry" command in your event, and stepping anywhere
  into a region of your choice will trigger it. For example, this is useful
  for making a single transfer event triggered from stepping anywhere
  containing the region, which can be useful for the edges of maps.
* Place a Trigger: Map Setup command in your event to make it run at map
  setup, before autorun events. For example, if you are using the Event
  Generator plugin when the player enters a map, place the Trigger: Map
  Setup command at the beginning of the page to ensure events generate
  before autorun events start.
* Linked Events allow you to affect or reference some other event from
  within the active event. For example, you can set self switches of other
  events, or use another event's self switch to determine a conditional
  branch.
* Define your Treasure Display Common Event, and you can easily set up
  treasure containers your way anywhere in the game with any Treasure plugin
  command.
* Linked events allow checking and changing properties of an
  event that is not the currently active event. For example, you can check
  a self switch, change a self switch, etc, just as you would do for the
  active event; all you must do is first assign the linked event.
  (This is similar to how the Follower Control plugin allows affecting a
  follower using player commands. Likewise, with Linked Events, commands
  that would affect or reference the current event instead affect or
  reference the linked event.)
* Check and set self variables and additional self switches.
  Start a variable's or switch's name with s:, and it can serve as a self
  variable or self switch for any event you run or link.
* Use Weighted Branches to allow selecting a branch at random, depending on
  its relative weight.
* To make NPC routes more responsive to player actions, use script snippets
  to put conditional branches and expression balloons inside routes.
* The "Random Mover Touch" plugin parameter and the "Trigger: Party Touch"
  plugin command give you more options for how NPCs can start touch events.
* Helpful script snippets like $gameMap.name() and $gameMap.activeEvent()

## Basics of how to use this plugin

### How to Set Up a Region Entry Event on a Map
1. Make a new event anywhere on the map. Its location doesn't
   matter, as long as it's on the same map as the region it affects.
2. At the top of the event page's command list, create a plugin command:
   Tyruswoo_EventAI > Trigger: Region Entry
   Set the plugin command's Region ID argument to the region of your choice.
3. Switch to tile editing mode and paint the region you've chosen wherever
   you want the event to occur when the player steps in.
   The Region Entry Event will now run whenever the party leader steps
   from a tile outside the region, to a tile inside the region,
   provided that the event page's other conditions are also met.

### How to Set Up a Region Entry Common Event
1. Set up a common event doing what should happen on region entry.
2. Its first command must be the plugin command Tyruswoo_EventAI >
   Trigger: Region Entry, with the Region ID argument set to a region
   number of your choice.
3. Paint that region number on any maps in your game, and the common event
   will run whenever the party leader steps into that region.

### How to Set Up Your Game for Treasure Plugin Commands
1. Open the database and set up a Treasure Display Common Event.
   Copy in movement, sound, & self switch setting from a treasure
   chest made with Quick Event Creation, or customize display behavior
   however you wish. (DO NOT give the item or gold here; the plugin command
   handles that beforehand!)
2. You'll probably want the Treasure Display Common Event to tell the player
   what the party has received. The text codes <TreasureName>,
   <TreasureAmount>, and <TreasureIcon> can help with this.
   Treasure script snippets can help you set conditions for different
   eventing based on treasure type, quantity, etc. Refer to the Text Codes
   and Script Calls sections below for specifics.
3. Once your Treasure Display Common Event is ready, open Tyruswoo_EventAI
   in the Plugin Manager, edit the plugin parameter Treasure Display Common
   Event, and pick from the list of common events.

Now all Treasure plugin command calls will run the common event you made.

### How to Use Treasure Plugin Commands
1. Create a new event. Set its appearance to whatever holds the treasure,
   as it looks before the player gets the treasure.
2. Add a plugin command to the event. Pick Tyruswoo_EventAI plugin, and one
   of the Treasure plugin commands. Set the treasure item or gold amount
   using the plugin command's arguments. That's all you need in the list!
3. To make the treasure obtainable only once, add a new page to the treasure
   event. This page's condition should be the same self switch the Treasure
   Display Common Event turns on. Set this page's appearance to what you
   want the player to see when the treasure has already been taken. Since
   this second page doesn't give treasure, it needs no treasure plugin
   command.
4. This treasure event is now ready to run. Making more treasure events
   like this one will be even easier; copy-paste them, open each copy, and
   change its treasure plugin command to give whatever treasure you want,
   wherever you place the event.

### How to Make Weighted Random Branches
1. Open the Event Editor to a page that needs a randomly selected outcome.
2. Start a random branch with this plugin's Weight command. Set the Weight
   argument to any positive number. This number represents the new branch's
   likelihood of being selected compared to other branches in the set.
   For instance, a branch with Weight 20 is twice as likely to be selected
   as a branch with Weight 10.
3. Add a sequence of commands that should happen if this branch is randomly
   selected.
4. Repeat steps 2 and 3 to create alternate weighted random branches that
   could happen in place of this one. Each new Weight command at the same
   indentation level ends the weighted random branch that precedes it.
5. To close the current set of weighted random branches, add the plugin
   command End Weight Branches. Commands added below this point will run
   regardless of which random branch just finished running.

Each time an event page runs, a fresh random selection is made for each set
of weighted random branches. Making this selection doesn't require any
variables or switches.

One event page can contain multiple sets of weighted random branches,
either by ending a set before starting another, or by putting weighted sets
at different indentation levels or inside different choice branches or
conditional branches.

### How to Let a Randomly Moving NPC Start Its Own Touch Event
1. Open the Plugin Manager, open Tyruswoo_EventAI plugin command options,
   and set the "Random Mover Touch" plugin command to true.
2. Open the event editor of an NPC of your choice. This tutorial is relevant
   to any NPC with a movement type set to Random or to a Custom route where
   some steps are "Move at Random".
3. Decide whether the NPC must touch the party leader, or whether touching
   any party member counts. If NPC must touch party leader, set the Trigger
   to Event Touch. If NPC touching any party member should start the event,
   put a "Trigger: Party Touch" plugin command at the beginning of the
   command list.
4. Repeat steps 2 and 3 to make more randomly moving NPCs that can initiate
   touch events.

### How to Give an NPC Distance-based Chasing

Find the "Autonomous Movement" box in the Event Editor's middle-left,
select route type "Custom", and click the "Route..." button.
Then use the buttons on the right to pick commands that will show up in
the list on the left.

Below is a sample move route for an enemy NPC that chases only if the player
is 5 tiles away or closer. Whenever the player flees out of range,
the NPC returns to its starting spot.
* Script: `this.rbIf(this.distToPlayer <= 5)`
* Script: `this.setBln("!")`
* Move toward Player
* Script: `this.rbElse(0 == this.dist(this.startLoc))`
* Turn Down
* Script: `this.rbElse()`
* Wait: 15 frames
* Script: `this.stepTo(this.startLoc)`
* Script: `this.unsetBln()`
* Script: `this.rbEnd()`

In the Options checkboxes below, make sure "Repeat Movements" and "Skip If
Cannot Move" are checked.

If the NPC is supposed to run an event when it touches any party member,
start its command list with the plugin command "Trigger: Party Touch".

### How to Use Self Variables or Additional Self Switches
Self variables and extra self switches help you associate more data of
any kind, with any event you choose.
1. Think about the information you want to associate with some events.
   For a true/false value, open the list of game switches to make an extra
   self switch. For a number, text snippet, or anything else, open the list
   of game variables to make a self variable. To mark something as a self
   variable or self switch, start its name with "s:" -- an S followed by a
   colon, followed by any name that helps you remember the purpose of this
   self variable or self switch.
2. If you want to access the self variables or self switches of an event
   other than the one currently running, use the Link Event plugin command
   to pick an event. You can link an event from any map, and reference the
   event by Event ID, name, note, or location. Then use the Unlink Event
   plugin command when you're done working with the linked event.
   When no event is linked, the running event's own self variables and
   self switches are used.
3. To set your event's self variable, create a Control Variables command.
   Find your self variable in the variable list. Set its value the same
   way you would for any variable.
   To set your event's extra self switch, create a Control Switches command,
   look through the switches list, and find one you named as a self switch.
   Set its value to ON or OFF, as you would with any switch.
4. You can make a conditional branch based on the linked or active event's
   self variable or self switch. Use the Switch option or the Variable
   option, and find your self switch or self variable in the list.
5. You can also use self variables and extra self switches as page
   conditions, the same way a variable or switch can be a page condition.
   In page conditions, self variables and self switches always reference the
   event that contains that page.

## Plugin parameters

### Treasure Display Common Event
This is the common event that an event will call when it runs any treasure
plugin command, _after_ the party receives the treasure. (Do not use this
common event to give treasure; the plugin command has already done that!)
The Treasure Display Common Event can show the treasure chest opening,
play a sound, show text telling what item the party received, set a self
switch to ensure that the treasure can be opened only once, and do anything
else you write into it.

### Random Mover Touch
Turn this parameter ON to let randomly moving NPCs start touch events.
Without this plugin, or when Random Mover Touch is OFF, a randomly moving
NPC never tries to move in the direction of anything it can't pass through.
Since a solid NPC can't pass through a player character, the side effect is
that randomly moving NPCs can't initiate touch events.
When Random Mover Touch ON, any randomly moving NPC whose trigger is set to
Event Touch or Party Touch, can turn toward an adjacent player character as
part of its random movement. This triggers its touch event.

### Enable Self Variables
This is turned ON by default. When it's turned ON, you can start any
variable name with s: to make it into a self variable applied to individual
events. If you don't intend to use this feature, you can turn it OFF to
reduce the risk of compatibility issues with non-Tyruswoo plugins.

### Enable Extra Self Switches
This is ON by default. When it's turned ON, you can give any switch a name
starting with s: to make it function as a self switch for events. If you
don't intend to use this feature, you can turn it OFF to reduce the risk of
compatibility issues with non-Tyruswoo plugins.

## Set New Origin Plugin Command

Suppose an event has moved, and you want it to be in its new location when
the player comes back to this map after being away from it. All you need to
do is create a plugin command Event AI > Set New Origin, and the event's
current location will be saved as its new starting location. Leave the
location blank to use the event's current location. This new starting
location is permanent for the savefile where it's done.

If you need to use one event to change another event's starting location,
first use a Link Event command, then use Set New Origin.

If you need to set the new starting location to something other than the
event's current location, use the Location argument. The coordinates you set
can be absolute, relative to the player, or relative to an event, depending
on the Relativity mode you choose.

## Global Move Route Behavior plugin command

Use the plugin command Global Move Route Behavior to switch between the
following modes for autonomous movement routes:

Normal: NPC movements work normally. They react to the player's position
    if they are programmed to do so.
Freeze: All NPCs stop their autonomous routes. (They will still move if a
    Set Movement Route command forces them to move.)
Ignore Player: All NPCs' autonomous routes work as if they don't know the
    player is there. Their effective distToPlayer (distance to player)
    is infinity. (Routes started with a Set Movement Route command will
    still recognize the player and calculate distance normally.)

Global modes apply only to autonomous movement routes. Routes forced by a
Set Movement Route command are exempt from the current mode's rules.

A global move route mode is permanent until another mode is set.
For example, if Global Move Route Behavior is set to Freeze, all NPCs will
be still (unless expressly commanded to move) across save/load, across
map changes, etc., until another Global Move Route Behavior changes the
mode back to Normal (or to anything other than Freeze).

## Trigger Plugin Commands

Trigger plugin commands are placed at the beginning of the command list of
any event page that should have their custom trigger.
A custom trigger overrides its page's RMMZ-defined trigger
(e.g. Action Button, Player Touch, ...)

As with pages with standard RMMZ triggers, a page with a custom trigger
runs only if the page's conditions (switch, variable, etc.) are met.

### Trigger: Region Entry
Put this plugin command at the top of the command list of any event page
that should run when the player steps into a given region, specified in the
plugin command's Region ID argument. The page so marked will run only when
the player steps into the region from another region. It will not run when
the player starts the game in the region, nor when the player is placed in
the region by a transfer command.
The region entry event itself can be placed anywhere on the map.

### Trigger: Party Touch
It's like Event Touch, except that it includes followers.
Put this plugin command at the top of the command list of an event page,
and when that page is active, the event will trigger when its NPC touches
the player OR any of the player's followers.

## Treasure plugin commands

Every treasure plugin command first gives the indicated treasure to the
party, and then calls the Treasure Display Common Event.

### Treasure by Name
Give the item, weapon, or armor that matches the name given.
Name matching is case insensitive. The first item in the database that's
found to match the name will be the item given. The items database is
checked first, then weapons, then armors.

This plugin command is useful if you might reorganize your database after
some treasures have already been placed.

### Treasure: Gold
Give some amount of the game's currency as treasure.

### Treasure: Item
Give a non-equippable item (regular item or key item) as treasure.
Choose the item ID from the database's item list.

### Treasure: Weapon
Give a weapon as treasure. Choose the weapon ID from a list.

### Treasure: Armor
Give an armor as treasure. Choose the armor ID from a list.

## Treasure text codes

Use these in text commands to show information about the loot given by the
most recent treasure plugin command. They're designed for your convenience
in writing your Treasure Display Common Event.

| Text code          | Description                                         |
|--------------------|-----------------------------------------------------|
| `<TreasureName>`   | The name of the item, weapon, or armor most recently given. If gold, the name is the currency term. |
| `<TreasureIcon>`   | The icon, if any, corresponding to the treasure most given. |
| `<TreasureAmount>` | How many items, or how much gold, came from the most recent treasure. |

Example sentence using our text codes (plus an RMMZ text code):

    `\P[1] found <TreasureIcon><TreasureName> x<TreasureAmount>!`

## Treasure script calls

The following script phrases may be useful when checking for conditions
or doing other custom processing during eventing.

| Attribute                           | Description                        |
| ------------------------------------|------------------------------------|
| `Tyruswoo.EventAI.sprite.name`        | The name (without extension) of the active event's sprite file. This is readable/writable. |
| `Tyruswoo.EventAI.sprite.index`       | The index giving the position of the active event's sprite in its file. This is readable/writable. |
| `Tyruswoo.EventAI.sprite.tileId`      | The ID of the tile used for this event's image, if a tile is used.  This is readable/writable. |
| `Tyruswoo.EventAI.treasure.amount`    | How much gold came from the latest treasure. If an item, amount is 1. |
| `Tyruswoo.EventAI.treasure.data`      | The treasure's full database entry. |
| `Tyruswoo.EventAI.treasure.iconIndex` | The index of the treasure's icon |
| `Tyruswoo.EventAI.treasure.id`        | The database index of this item, weapon, or armor. |
| `Tyruswoo.EventAI.treasure.name`      | Name of this item, weapon, or armor. If gold, name is the currency term. |
| `Tyruswoo.EventAI.treasure.success`   | Boolean value. True if the treasure was given. False if it couldn't be given, such as when the party's inventory can't fit that item. |
| `Tyruswoo.EventAI.treasure.type`      | 'item', 'weapon', 'armor', or 'gold' |

`Tyruswoo.EventAI.sprite` refers to the image of the event that's currently
running. It can be used for a variety of purposes, including treasure
container style checking.

`Tyruswoo.EventAI.treasure` and its attributes refer to the most recent
treasure given by a Tyruswoo.EventAI treasure plugin command. The Treasure
Display Common Event, or other events if needed, can reference it.
Examples below.

The following script condition checks if treasure was gold:
`'gold' == Tyruswoo.EventAI.treasure.type`

This script condition checks if more than 100 gold were given:
`Tyruswoo.EventAI.treasure.amount > 100`

This condition is met if the item could NOT be given:
`false == Tyruswoo.EventAI.success`

This condition is met if the event's image file is !Barrel.png:
`'!Barrel' == Tyruswoo.EventAI.sprite.name`

## Movement route script calls
In all movement route script calls, "this" refers to the Game_Character
who's doing the route.

### Route Branches
```
// Anatomy of a route branch set:
this.rbIf(condition);     // Every branch set starts with this.
[1 or more commands]      // These commands only run if condition is true.
this.rbElse(condition);   // There can be 0 or more of these.
[1 or more commands]      // Every else branch has its own set of commands.
this.rbEnd();             // Every branch set ends with this.
```

`this.rbIf(condition)`
* If the condition is true, the instructions after it will run.
  Otherwise, the instructions will be skipped until an rbElse or rbEnd
  script call is reached.

`this.rbElse(condition)`
* An rbElse call can come after an rbIf call and its instructions.
  It runs only if no previous branch in the set has run.
  Its condition is optional.
  An rbElse with a condition acts as an "else if";
  without a condition it's like an "else".
  An rbIf call can have any number of rbElse calls after it, or none at all.

`this.rbEnd()`
* This call is REQUIRED to mark the end of any route branch set.
After it, unconditional movement route commands resume.

### Sound Effects
Use these script statements to make a character play a sound effect whenever
a new sound effect is set.

`this.setSe(soundName, volume=90, pitch=100)`
* Play a sound effect if the most recent call of setSe() doesn't use the
  same soundName. The parameters for volume and pitch are optional; if they
  aren't specified, the values above are used.
  
`this.unsetSe()`
* Clear the record of which sound effect was most recent.
  This ensures that next time this.setSe() is called, it will play a sound.

### Balloons
Use these script statements to have a character show an expression balloon
during a movement route.

`this.setBln(balloonType)`
* If a new type of balloon is set, that balloon will start popping up from
  the character. If the balloon type is the same as the character's most
  recent balloon type, then nothing happens.  

`this.unsetBln()`
* Clear the last remembered balloon. This allows the balloon to pop up again
  when setBln() is called later.

`this.showBln(balloonType)`
* This sets the balloon type, and then ALWAYS makes the corresponding
  balloon pop up.

In the above methods, the parameter balloonType is a text string naming
the type of balloon, or a number corresponding to the balloon code.

| Code | Balloon Type text variants          |
|------|-------------------------------------|
|   0  | "none" or "" (no balloon will show) |
|   1  | "exclamation" or "!"                |
|   2  | "question" or "?"                   |
|   3  | "music note" or "mus"               |
|   4  | "heart" or "<3"                     |
|   5  | "anger" or "x"                      |
|   6  | "sweat drop", "sweat", or "d"       |
|   7  | "frustration" or "scribble"         |
|   8  | "silence" or "..."                  |
|   9  | "light bulb" or "idea"              |
|  10  | "zzz", "sleep", or "z"              |


### Script helps for distance, location, and movement
All snippets below are intended for movement routes.
"this" refers to the character whose route it is.

| Snippet             | Description |
|---------------------|-------------------------------------------------------|
| `this.startLoc`       | Get object containing x and y coordinates for this  character's starting location. |
| `this.distToPlayer`   | Get distance, as x difference + y difference, between this character and the player. |
| `this.dist(x, y)`     | Get distance from this character to any given coords. |
| `this.stepTo(x, y)`   | Move character 1 step toward any given x and y coords. |
| `this.stepAway(x, y)` | Move character 1 step away from any given x and y. |

Any of the above methods that takes x and y coordinates, can instead take
an event or other coordinates-bearing object, an event ID, or an event name.

Examples:
```
this.dist(35, 45)             // The distance to the spot where x=35, y=45
this.stepTo(this.startLoc);   // Step toward this event's starting coords.
this.stepAway($gamePlayer);   // Step away from the player.
this.dist("Rat")              // Distance to the nearest event named "Rat"
this.stepTo(12);              // Step toward the event whose ID is 12.
```

## Miscellaneous script calls

### `$gameMap.name()`

  Returns the name of the current map.
  (Note: This gets the map's name, not the display name.)

  Example use case: Allow common events to know the name of the current map.

  Other use case: Assuming you used the Tyruswoo_EventGenerator plugin to
  generate an event on the current map, the generated event can use this
  script call to determine the current map's name. Just use a Conditional
  Branch script call. For example, to check if the map is named "Spooky
  Tower", the Conditional Branch script would be:
* `$gameMap.name() == "Spooky Tower"`

A similar default script call finds the current map's ID:
* `$gameMap.mapId()`

### `$gameMap.currentEvent()` and `$gameMap.activeEvent()`

  These both do the same thing: return the currently active event.
  This makes it easier to use Conditional Branches with script calls that
  use a property of the current active event. This is particularly useful
  in common events (or events generated by the Event Generator plugin).

### `$gamePlayer.checkRegionChange()`

  Use this to refresh the player's current region after a forced
  move route, to ensure the player's next step can correctly determine
  whether to trigger a region entry event.

For more help using the Event AI plugin, see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History

**v1.0** - 11/5/2021
- Event AI released for RPG Maker MZ!
- Region Entry events and common events.
- Treasure plugin command calls your treasure common event.

**v2.0** - 7/22/2022
- Linked events added. When commands run that would usually affect
  the currently active event, they'll affect the linked event
  instead.
- Self variables and extra self switches: Start any variable or
  switch with s: and it will act as a self variable or self switch.
  Coordinates with linked events.
- Weighted random branches: These are similar to Conditional
  Branches, but the branch used is selected randomly based on its
  weight relative to other weighted branches.
- Treasure by Name plugin command gives a treasure of the item,
  weapon, or armor that matches the name.
- Party Touch events can touch any party member to start their event.
- Random Mover Touch plugin parameter. When true, a randomly moving
  NPC can initiate an Event Touch or Party Touch event.
- Script support for movement routes: conditional branches, balloons,
  remembering starting location, and more.
- New script snippets: `$gameMap.name()`, `$gameMap.activeEvent()`,
  and `$gamePlayer.checkRegionChange()`

**v2.1** - 8/8/2022
- Replaced v2.0's three Link Event plugin commands with one.
  This unified Link Event plugin command finds an event on any map,
  referenced by map ID or name. The event itself can also be
  referenced by ID or name, or found based on location or note.

**v2.2** - 10/22/2022
- Fixed a bug that was keeping Event Touch trigger NPCs from
  initiating their own event.
- Fixed a bug that affected the Link Event command's ability to
  identify a map by its name if the name contained a digit.

**v2.3** - 3/20/2023
- Fixed a bug in which sometimes, on autosave load, the
  `Game_Map.eraseEvent` function would try to erase a non-existent
  event.
- Fixed a bug in which linked events could include events that were
  erased.

**v2.3.1** - 8/30/2023
- This plugin is now free and open source under the [MIT license](https://opensource.org/license/mit/).

**v2.3.2** - 11/29/2023
- Fixed a bug that was keeping Unset Sound Effect from working.

> **Remember, only you can build your dreams!**
>
> *Tyruswoo*
