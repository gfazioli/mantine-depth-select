import { DepthSelectFactory } from '@gfazioli/mantine-depth-select';
import type { StylesApiData } from '../components/styles-api.types';

export const DepthSelectStylesApi: StylesApiData<DepthSelectFactory> = {
  selectors: {
    root: 'Root element',
    stack: 'Stack wrapper containing all cards',
    card: 'Individual card in the stack',
    controls: 'Controls wrapper (arrows + label)',
    controlUp: 'Up arrow button (go to next/older item)',
    controlDown: 'Down arrow button (go to previous/newer item)',
    controlLabel: 'Label between arrow buttons',
  },

  vars: {
    root: {
      '--ds-transition-duration': 'Controls animation transition duration',
      '--ds-scale-step': 'Controls scale reduction per depth level',
      '--ds-translate-y-step': 'Controls vertical offset per depth level',
      '--ds-opacity-step': 'Controls opacity reduction per depth level',
      '--ds-blur-step': 'Controls blur increment per depth level',
      '--ds-visible-cards':
        'Number of visible cards in the stack (read-only: set from visibleCards, not read by the stylesheet)',
    },
  },

  modifiers: [
    {
      modifier: 'data-active',
      selector: 'card',
      condition: 'Card is the frontmost (active) card',
    },
    {
      modifier: 'data-depth',
      selector: 'card',
      value: '0 | 1 | 2 | ...',
      condition:
        'Depth level of the card in the stack (0 = front); equals visibleCards on the hidden card waiting behind the stack, absent on the card that has just left the front',
    },
    {
      modifier: 'data-exited',
      selector: 'card',
      condition: 'Card has just left the front of the stack',
    },
    {
      modifier: 'data-controls-position',
      selector: 'root',
      value: 'right | left',
      condition: 'Position of navigation controls relative to the stack',
    },
    {
      modifier: 'data-disabled',
      selector: 'controlUp',
      condition: 'No more items to navigate to (at the end; never with loop and two or more items)',
    },
    {
      modifier: 'data-disabled',
      selector: 'controlDown',
      condition:
        'No more items to navigate back to (at the beginning; never with loop and two or more items)',
    },
  ],
};
