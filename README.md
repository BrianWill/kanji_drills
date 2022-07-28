# Kanji flashcards

## Installation

You'll first need to install [Node (download link)](https://nodejs.org/en/download/).

Then at the command line:

```
npm install -g electron
npm install
npm run resetState
npm start
```

## Hotkeys:

- Home or Alt-LeftArrow: jump to top of the page
- End or Alt-RightArrow: jump to bottom of the page
- Alt-Enter: re-sort the list
- Enter: (on red card) mark the card green, mark one random black card (if any) green, and re-sort the list
- UpArrow: select previous kanji
- DownArrow: select next kanji
- LeftArrow: mark current kanji red
- RightArrow: mark current kanji green

Clicking a kun'yomi reading opens a jisho.org search in your browser for that word + kanji combo.

## Lists

The main screen presents 200+ lists of the jouyou kanji. An individual kanji may appear in multiple lists.

- Click a list's name to see and drill the kanji in the list.
- Click links to mark a list red, green, or black.
- A timestamp indicates when the list was last marked.

The "meaning" lists contain the jouyou kanji whose primary meanings relates to a common theme. For example, the "Animals (meaning)" list contains the kanji related to animals.

The other lists are named after a radical common to their kanji (using the Wanikani.com naming conventions). For example, the "Cage" list contains [the jouyou kanji that include the "cage" kanji](https://www.wanikani.com/radicals/cage). However, many of these lists, including "Cage", omit characters where the common radical is not easily recognizable. For example, the character 堰 includes the "cage" radical but in a way that looks significantly different from the others, so it has been omited from the "Cage" list.

Other lists specify a position of the radical. For example, the "Building (left)" list includes the jouyou kanji that have the ["building" radical](https://www.wanikani.com/radicals/building) on the full left side of the character.

Lists with a number at the end of their names are subsets of the larger list with the same name. For example, the kanji of "Animals (meaning)" are divided into two subset lists: "Animals (meaning) 1" and "Animals (meaning) 2".

## Recommended usage

- keep lists you've never studied marked black
- lists you're currently actively studying should be marked red
- lists you've studied but have put aside should be marked green

Generally, you should avoid having too many active (red) lists at any one time. Also, you should periodically revisit green lists, marking them red to move them back into your working set.

### Drilling a new list

Mark the list red before opening it, then:

1. Mark a few more kanji red.
2. Re-sort the list (ALT-Enter).
3. Go through the red kanji top-to-bottom, marking the ones you confidently remember green. (Use LeftArrow to reveal a red kanji's info without changing its color.)
4. Repeat these steps until eventually all kanji have gone from black to red to green.

You may need to drill a set of red kanji multiple times before you're confortable marking more kanji red or green. You might also sometimes prefer marking only one new kanji red or green per iteration. Use your own judgement!

### Drilling an old list

1. Click the link at the top "Mark all kanji black".
2. Go through the kanji top-to-bottom, marking the ones you confidently remember green and the ones you don't red.
3. Click the link at the top "Mark all red kanji black".
4. Re-sort the list (ALT-Enter).
4. Drill the black kanji as if they were a new list.