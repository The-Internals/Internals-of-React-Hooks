# Steps

On render phase

- Before render start,
  - set a global variable pointing to the current dispatcher (for simplicity consider global variable to points to component instance).
  - create a list to store hooks state (if not present already) on the component instance.
  - create/reset a current pointer to point to specific hook in the list.
- On render call for every hook
  - if there is item in the hook list for the current pointer return that.
  - else create a hooks state object, based on type of hook and add the state object to the list.
  - if it is effect hook add the effect on effect list on that fiber along with the previous cleanup callback. _11594_
  - increment the current pointer for the next hook.
  - return the value from the hook (based on the type of hook).

On commit phase

- Before commit call all the cleanup effect callback.
- After commit call the effect callback.
