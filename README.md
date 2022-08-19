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
- Alt-R: reset all cards to unanswered
- A: re-sort the list
- S: unhide answer of current kanji
- D: (on red card) mark the card green, mark one random black card (if any) green, and re-sort the list
- W or RightArrow: toggle whether kanji is answered/unanswered
- G: toggle whether kanji is marked
- Z or UpArrow: select previous kanji
- X orDownArrow: select next kanji
- PageUp: switch to previous list (works only when viewing a list)
- PageDown: switch to next list (works only when viewing a list)

Clicking a kun'yomi reading opens a jisho.org search in your browser for that word + kanji combo.

## Lists

The main screen presents 400+ lists of the jouyou kanji. Each individual kanji may appear in multiple lists.

- Click a list's name to see and drill the kanji in the list.
- Click links to mark a list red, blue, yellow, green, white, or black.
- A timestamp indicates when the list was last marked.

The "meaning" lists contain the jouyou kanji whose primary meanings relates to a common theme. For example, the "Animals (meaning)" list contains the kanji related to animals.

The other lists are named after a radical common to their kanji (using the Wanikani.com naming conventions). For example, the "Cage" list contains [the jouyou kanji that include the "cage" kanji](https://www.wanikani.com/radicals/cage). However, many of these lists, including "Cage", omit characters where the common radical is not easily recognizable. For example, the character 堰 includes the "cage" radical but in a way that is significantly less recognizable, so it has been omited from the "Cage" list.

Other lists specify the position of the radical. For example, the "Building (left)" list includes the jouyou kanji that have the ["building" radical](https://www.wanikani.com/radicals/building) on the full left side of the character.

Lists with a number at the end of their names are subsets of the larger list with the same name. For example, the kanji of "Animals (meaning)" are divided into two subset lists: "Animals (meaning) 1" and "Animals (meaning) 2".

## Convention for list colors:

- black: a list that you've never studied before
- red: a list you are currently focused on studying
- blue: a list that was recently marked red
- yellow: a list that was recently marked yellow
- green: archive of lists you have previously studied but will revist eventually
- white: archive of lists that you won't revist

So to study a black list, mark it red, then incrementally demote it to blue, then yellow, and finally green. You should periodically move green lists back into your working set by marking them red. Once you feel you are done studying a list for good, mark it white.

### Drilling a list

Use alt-R to reset the list, then:

1. Try to recall the answer for the top card.
2. Check your answer by hitting 'S'.
3. If wrong, hit 'A' to reshuffle
4. If correct, hit 'D' to mark the card as answered and reshuffle.
5. Repeat until all cards have been marked answered.

## Reviewing marked cards

The "review red", "review blue", and "review yellow" links