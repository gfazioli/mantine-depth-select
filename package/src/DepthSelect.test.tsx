import { render } from '@mantine-tests/core';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { DepthSelect, DepthSelectItem } from './DepthSelect';

const TEST_DATA: DepthSelectItem[] = [
  { value: 'item-1', view: <div>Item 1</div> },
  { value: 'item-2', view: <div>Item 2</div> },
  { value: 'item-3', view: <div>Item 3</div> },
  { value: 'item-4', view: <div>Item 4</div> },
  { value: 'item-5', view: <div>Item 5</div> },
];

describe('DepthSelect', () => {
  // Rendering

  it('renders without crashing', () => {
    const { container } = render(<DepthSelect />);
    expect(container).toBeTruthy();
  });

  it('renders without crashing with data', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    expect(container).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<DepthSelect ref={ref} data={TEST_DATA} w={300} h={200} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders items within the visible window', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} visibleCards={4} w={300} h={200} />);
    const cards = container.querySelectorAll('[role="option"]');
    // Window: [activeIndex-1, activeIndex+visibleCards+1] = [-1, 5] clamped to [0, 5] = 5 items
    expect(cards.length).toBe(5);
  });

  it('assigns depth attributes to visible cards', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} visibleCards={3} w={300} h={200} />);
    expect(container.querySelector('[data-depth="0"]')).toBeTruthy();
    expect(container.querySelector('[data-depth="1"]')).toBeTruthy();
    expect(container.querySelector('[data-depth="2"]')).toBeTruthy();
  });

  it('marks first card as active', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard).toBeTruthy();
    expect(activeCard?.getAttribute('data-depth')).toBe('0');
  });

  it('renders correct card when value is controlled', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} value="item-3" w={300} h={200} />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard).toBeTruthy();
    expect(activeCard?.textContent).toBe('Item 3');
  });

  it('renders empty when data is empty', () => {
    const { container } = render(<DepthSelect data={[]} w={300} h={200} />);
    const cards = container.querySelectorAll('[role="option"]');
    expect(cards.length).toBe(0);
  });

  it('marks exited card with data-exited', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} value="item-3" w={300} h={200} />);
    // Only 1 exited card rendered (activeIndex-1 window), not all previous
    const exitedCards = container.querySelectorAll('[data-exited]');
    expect(exitedCards.length).toBe(1);
  });

  // Navigation — Arrow keys

  it('navigates to next item on ArrowUp key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('navigates to previous item on ArrowDown key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-3" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('does not navigate past the last item on ArrowUp', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-5" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not navigate before the first item on ArrowDown', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).not.toHaveBeenCalled();
  });

  // Navigation — Home/End keys

  it('navigates to last item on End key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith('item-5');
  });

  it('navigates to first item on Home key', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-4" onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('item-1');
  });

  // Navigation — Click

  it('navigates to next item when clicking the second card', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} w={300} h={200} />
    );
    const secondCard = container.querySelector('[data-depth="1"]')!;
    fireEvent.click(secondCard);
    expect(onChange).toHaveBeenCalledWith('item-2');
  });

  it('does not navigate when clicking the active card', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-1" onChange={onChange} w={300} h={200} />
    );
    const activeCard = container.querySelector('[data-depth="0"]')!;
    fireEvent.click(activeCard);
    expect(onChange).not.toHaveBeenCalled();
  });

  // Accessibility

  it('has tabIndex for keyboard focus', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const root = container.querySelector('[tabindex="0"]');
    expect(root).toBeTruthy();
  });

  it('has role="listbox" on root', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const root = container.querySelector('[role="listbox"]');
    expect(root).toBeTruthy();
  });

  it('has role="option" on cards', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const options = container.querySelectorAll('[role="option"]');
    expect(options.length).toBe(5);
  });

  it('marks active card with aria-selected=true', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const activeCard = container.querySelector('[data-active]');
    expect(activeCard?.getAttribute('aria-selected')).toBe('true');
  });

  it('supports custom aria-label', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} ariaLabel="Select a snapshot" w={300} h={200} />
    );
    const root = container.querySelector('[aria-label="Select a snapshot"]');
    expect(root).toBeTruthy();
  });

  // ─── Option ids and aria-activedescendant ───────────────────────────────────
  //
  // Ids used to be `ds-item-${value}`, i.e. global rather than per instance. Two DepthSelects
  // sharing item values collided: the docs page ended up with 49 option elements for 31 distinct
  // ids, and 6 of its 13 listboxes pointed aria-activedescendant at a duplicated id. A screen
  // reader resolves that to the first match in the document — an option of a *different* component
  // — so it announces the wrong item rather than failing visibly.
  //
  // Looked up by attribute rather than `#id`, so the tests don't depend on React's id format
  // (React 18 produced `:r0:`, which is not a valid CSS selector).

  const optionById = (container: HTMLElement, id: string | null) =>
    id ? container.querySelector(`[id="${id}"]`) : null;

  it('points aria-activedescendant at the active option', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-3" w={300} h={200} />
    );
    const root = container.querySelector('[role="listbox"]')!;
    const activeId = root.getAttribute('aria-activedescendant');

    expect(activeId).toBeTruthy();

    const referenced = optionById(container, activeId);
    expect(referenced).toBeTruthy();
    expect(referenced?.getAttribute('role')).toBe('option');
    expect(referenced?.getAttribute('aria-selected')).toBe('true');
  });

  it('keeps option ids unique across two instances sharing the same values', () => {
    const { container } = render(
      <>
        <DepthSelect data={TEST_DATA} w={300} h={200} />
        <DepthSelect data={TEST_DATA} w={300} h={200} />
      </>
    );

    const ids = Array.from(container.querySelectorAll('[role="option"]')).map((el) => el.id);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('resolves each listbox to an option inside itself, not another instance', () => {
    const { container } = render(
      <>
        <DepthSelect data={TEST_DATA} defaultValue="item-2" w={300} h={200} />
        <DepthSelect data={TEST_DATA} defaultValue="item-4" w={300} h={200} />
      </>
    );

    const listboxes = Array.from(container.querySelectorAll('[role="listbox"]'));
    expect(listboxes).toHaveLength(2);

    listboxes.forEach((listbox) => {
      const activeId = listbox.getAttribute('aria-activedescendant')!;
      expect(activeId).toBeTruthy();

      // Exactly one element in the whole document carries that id...
      expect(container.querySelectorAll(`[id="${activeId}"]`)).toHaveLength(1);
      // ...and it belongs to this listbox, not to the sibling instance.
      expect(listbox.querySelector(`[id="${activeId}"]`)).toBeTruthy();
    });
  });

  // withControls

  it('renders built-in controls by default', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('hides controls when withControls is false', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} withControls={false} w={300} h={200} />
    );
    expect(container.querySelector('button')).toBeFalsy();
  });

  it('Controls navigate via up/down buttons', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-2" onChange={onChange} w={300} h={200} />
    );
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith('item-3');
  });

  it('Controls disables up button at the end', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-5" w={300} h={200} />
    );
    const upButton = container.querySelector('[data-disabled]');
    expect(upButton).toBeTruthy();
  });

  // Controls position

  it('sets controls-position data attribute on root', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} controlsPosition="left" w={300} h={200} />
    );
    const root = container.querySelector('[data-controls-position="left"]');
    expect(root).toBeTruthy();
  });

  it('defaults to right controls position', () => {
    const { container } = render(<DepthSelect data={TEST_DATA} w={300} h={200} />);
    const root = container.querySelector('[data-controls-position="right"]');
    expect(root).toBeTruthy();
  });

  // Loop mode

  it('wraps from last to first when loop is true', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect
        data={TEST_DATA}
        defaultValue="item-5"
        onChange={onChange}
        loop
        w={300}
        h={200}
      />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith('item-1');
  });

  it('wraps from first to last when loop is true', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect
        data={TEST_DATA}
        defaultValue="item-1"
        onChange={onChange}
        loop
        w={300}
        h={200}
      />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith('item-5');
  });

  it('does not disable controls in loop mode', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} defaultValue="item-5" loop w={300} h={200} />
    );
    const disabledButton = container.querySelector('[data-disabled]');
    expect(disabledButton).toBeFalsy();
  });

  // controlsProps

  it('passes controlsProps to built-in controls', () => {
    const { container } = render(
      <DepthSelect
        data={TEST_DATA}
        defaultValue="item-2"
        controlsProps={{ labelFormatter: (item) => `Label: ${item.value}` }}
        w={300}
        h={200}
      />
    );
    expect(container.textContent).toContain('Label: item-2');
  });

  // Numeric values

  it('works with numeric values', () => {
    const numericData = [
      { value: 1, view: <div>One</div> },
      { value: 2, view: <div>Two</div> },
      { value: 3, view: <div>Three</div> },
    ];
    const onChange = jest.fn();
    const { container } = render(
      <DepthSelect data={numericData} defaultValue={1} onChange={onChange} w={300} h={200} />
    );
    const root = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(root, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  // withScrollNavigation

  it('renders without scroll navigation when disabled', () => {
    const { container } = render(
      <DepthSelect data={TEST_DATA} withScrollNavigation={false} w={300} h={200} />
    );
    expect(container).toBeTruthy();
  });

  // Custom icons

  it('renders custom upIcon and downIcon via controlsProps', () => {
    const { container } = render(
      <DepthSelect
        data={TEST_DATA}
        controlsProps={{
          upIcon: <span data-testid="custom-up">UP</span>,
          downIcon: <span data-testid="custom-down">DOWN</span>,
        }}
        w={300}
        h={200}
      />
    );
    expect(container.querySelector('[data-testid="custom-up"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="custom-down"]')).toBeTruthy();
  });
});
