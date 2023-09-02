## WARNING: This is an older version!
It lacks the features and improvements of this plugin's later versions.
To get the latest version for free, visit
[Tyruswoo.com](https://www.tyruswoo.com).

# Tyruswoo Event AI v1.0.1 for RPG Maker MZ

Upgrade your events with new features!

## Feature Overview

* Place "Trigger: Region Entry" command in your event, and stepping anywhere
  into a region of your choice will trigger it. For example, this is useful
  for making a single transfer event triggered from stepping anywhere
  containing the region, which can be useful for the edges of maps.
* Define your Treasure Display Common Event, and you can easily set up
  treasure containers your way anywhere in the game with any Treasure plugin
  command.

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

## Plugin parameters

### Treasure Display Common Event
This is the common event that an event will call when it runs any treasure
plugin command, _after_ the party receives the treasure. (Do not use this
common event to give treasure; the plugin command has already done that!)
The Treasure Display Common Event can show the treasure chest opening,
play a sound, show text telling what item the party received, set a self
switch to ensure that the treasure can be opened only once, and do anything
else you write into it.

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

### Treasure: Item
Give a non-equippable item (regular item or key item) as treasure.
Choose the item ID from the database's item list.

### Treasure: Weapon
Give a weapon as treasure. Choose the weapon ID from a list.

### Treasure: Armor
Give an armor as treasure. Choose the armor ID from a list.

### Treasure: Gold
Give some amount of the game's currency as treasure.

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

## Version History

**v1.0** - 11/5/2021
- Event AI released for RPG Maker MZ!
- Region Entry events and common events.
- Treasure plugin command calls your treasure common event.

**v1.0.1** - 9/1/2023
- This older plugin is now free and open source under the [MIT license](https://opensource.org/license/mit/).

> **Remember, only you can build your dreams!**
>
> *Tyruswoo*
