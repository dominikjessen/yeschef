import { MutableRefObject, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

type UseShortcutOptions = {
  overrideDefault: boolean;
};

const DEFAULT_OPTIONS = {
  overrideDefault: false
};

const DISABLED_TARGETS = ['BUTTON', 'A', 'INPUT'];

// NOTE: This uses 'code' instead of 'key' to react on the physical key pressed, not the output of the key
export default function useKeyboardShortcut(keyCodes: string[], callback: () => void, userOptions?: UseShortcutOptions) {
  // Error handling for wrong usage of hook
  if (!Array.isArray(keyCodes) || !keyCodes.length) {
    throw new Error('First param for <useKeyboardShortcut> must be of type string[] and have at least one value.');
  }

  if (!callback || typeof callback !== 'function') {
    throw new Error('Second param for <useKeyboardShortcut> must be a function to invoke.');
  }

  const options = { ...DEFAULT_OPTIONS, ...userOptions };

  const shortcutString = useMemo(() => keyCodes.join(), [keyCodes]);
  const heldKeys: MutableRefObject<string[]> = useRef([]);

  const flushHeldKeys = useCallback(() => {
    heldKeys.current = [];
  }, []);

  const keydown = useCallback(
    (downEvent: KeyboardEvent) => {
      // Do nothing for certain targets to not disrupt keyboard nav
      if (downEvent.target && DISABLED_TARGETS.indexOf((downEvent.target as Element).nodeName) !== -1) return;

      // Do nothing if not relevant shortcut key
      if (keyCodes.indexOf(downEvent.code) === -1) return;

      const downKeyHeldIndex = heldKeys.current.indexOf(downEvent.code);
      if (downKeyHeldIndex !== -1 || downEvent.repeat) return; // TODO: Determine how to handle held keys

      if (options.overrideDefault) {
        downEvent.preventDefault();
        downEvent.stopPropagation();
      }

      const nextHeldKeys = [...heldKeys.current, downEvent.code];
      heldKeys.current = nextHeldKeys;

      // All shortcut keys pressed, callback
      if (nextHeldKeys.join() === shortcutString) {
        callback();
      }
    },
    [keyCodes, callback, shortcutString, options.overrideDefault]
  );

  const keyup = useCallback(
    (upEvent: KeyboardEvent) => {
      // Do nothing for certain targets to not disrupt keyboard nav
      if (upEvent.target && DISABLED_TARGETS.indexOf((upEvent.target as Element).nodeName) !== -1) return;

      if (keyCodes.indexOf(upEvent.code) === -1)
        // Do nothing if not relevant shortcut key
        return;

      const upKeyHeldIndex = heldKeys.current.indexOf(upEvent.code);

      // Do nothing if not previously pressed
      if (upKeyHeldIndex === -1) return;

      if (options.overrideDefault) {
        upEvent.preventDefault();
        upEvent.stopPropagation();
      }

      const nextHeldKeys = heldKeys.current.filter((key) => key !== upEvent.code);
      heldKeys.current = nextHeldKeys;
    },
    [keyCodes, options.overrideDefault]
  );

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  }, [keydown, keyup]);

  useEffect(() => {
    flushHeldKeys();
  }, [flushHeldKeys]);

  return {
    flushHeldKeys
  };
}
