import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { useMergedRef, useUncontrolled } from '@mantine/hooks';
import { DepthSelectProvider, type DepthSelectControlsPosition } from './DepthSelect.context';
import { DepthSelectControls, type DepthSelectControlsProps } from './DepthSelectControls';
import classes from './DepthSelect.module.css';

export interface DepthSelectItem {
  /** Unique value identifying this item */
  value: string | number;

  /** Content rendered inside the card */
  view: React.ReactNode;
}

export type DepthSelectStylesNames =
  | 'root'
  | 'stack'
  | 'card'
  | 'controls'
  | 'controlUp'
  | 'controlDown'
  | 'controlLabel';

export type DepthSelectCssVariables = {
  root:
    | '--ds-transition-duration'
    | '--ds-scale-step'
    | '--ds-translate-y-step'
    | '--ds-opacity-step'
    | '--ds-blur-step'
    | '--ds-visible-cards';
};

export interface DepthSelectBaseProps {
  /** Array of items to display in the stack */
  data?: DepthSelectItem[];

  /** Controlled: currently selected value */
  value?: string | number;

  /** Uncontrolled: initial selected value (defaults to first item) */
  defaultValue?: string | number;

  /** Called when the active value changes */
  onChange?: (value: string | number) => void;

  /** Number of cards visible in the stack, @default 4 */
  visibleCards?: number;

  /** Show built-in navigation controls, @default true */
  withControls?: boolean;

  /** Position of the controls relative to the stack, @default "right" */
  controlsPosition?: DepthSelectControlsPosition;

  /** Props passed to the built-in Controls component */
  controlsProps?: DepthSelectControlsProps;

  /** Enable mouse wheel navigation, @default true */
  withScrollNavigation?: boolean;

  /** Enable loop mode (wrap from last to first and vice versa), @default false */
  loop?: boolean;

  /** Transition duration in ms, @default 400 */
  transitionDuration?: number;

  /** Scale reduction per depth level, @default 0.1 */
  scaleStep?: number;

  /** Vertical offset per depth level in px, @default 30 */
  translateYStep?: number;

  /** Opacity reduction per depth level, @default 0.15 */
  opacityStep?: number;

  /** Blur increment per depth level in px, @default 1 */
  blurStep?: number;

  /** Accessible label for the component, @default "Depth select" */
  ariaLabel?: string;

  /** Content rendered inside the component */
  children?: React.ReactNode;
}

export interface DepthSelectProps
  extends BoxProps, DepthSelectBaseProps, StylesApiProps<DepthSelectFactory> {}

export type DepthSelectFactory = Factory<{
  props: DepthSelectProps;
  ref: HTMLDivElement;
  stylesNames: DepthSelectStylesNames;
  vars: DepthSelectCssVariables;
  staticComponents: {
    Controls: typeof DepthSelectControls;
  };
}>;

const defaultProps: Partial<DepthSelectProps> = {
  data: [],
  visibleCards: 4,
  withControls: true,
  controlsPosition: 'right',
  withScrollNavigation: true,
  loop: false,
  transitionDuration: 400,
  scaleStep: 0.1,
  translateYStep: 30,
  opacityStep: 0.15,
  blurStep: 1,
  ariaLabel: 'Depth select',
};

const varsResolver = createVarsResolver<DepthSelectFactory>(
  (
    _theme,
    { transitionDuration, scaleStep, translateYStep, opacityStep, blurStep, visibleCards }
  ) => ({
    root: {
      '--ds-transition-duration': `${transitionDuration}ms`,
      '--ds-scale-step': String(scaleStep),
      '--ds-translate-y-step': `${translateYStep}px`,
      '--ds-opacity-step': String(opacityStep),
      '--ds-blur-step': `${blurStep}px`,
      '--ds-visible-cards': String(visibleCards),
    },
  })
);

function getCardStyle(
  relativeIndex: number,
  maxVisible: number,
  scaleStep: number,
  translateYStep: number,
  opacityStep: number,
  blurStep: number
): React.CSSProperties {
  if (relativeIndex < 0) {
    return {
      transform: `scale(${1 + scaleStep * 2}) translateY(${translateYStep * 2}px)`,
      opacity: 0,
      filter: `blur(${blurStep * 2}px)`,
      zIndex: maxVisible + 1,
      pointerEvents: 'none',
      willChange: 'auto',
    };
  }

  if (relativeIndex < maxVisible) {
    return {
      transform: `scale(${1 - scaleStep * relativeIndex}) translateY(${-translateYStep * relativeIndex}px)`,
      opacity: 1 - opacityStep * relativeIndex,
      filter: relativeIndex > 0 ? `blur(${blurStep * relativeIndex}px)` : undefined,
      zIndex: maxVisible - relativeIndex,
      cursor: relativeIndex === 1 ? 'pointer' : undefined,
      pointerEvents: relativeIndex > 1 ? 'none' : undefined,
      willChange: 'transform, opacity, filter',
    };
  }

  return {
    transform: `scale(${1 - scaleStep * maxVisible}) translateY(${-translateYStep * maxVisible}px)`,
    opacity: 0,
    filter: `blur(${blurStep * maxVisible}px)`,
    zIndex: 0,
    pointerEvents: 'none',
    willChange: 'auto',
  };
}

export const DepthSelect = factory<DepthSelectFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<HTMLDivElement> };
  const props = useProps('DepthSelect', defaultProps, restProps);
  const {
    data,
    value,
    defaultValue,
    onChange,
    visibleCards,
    withControls,
    controlsPosition,
    controlsProps,
    withScrollNavigation,
    loop,
    transitionDuration,
    scaleStep,
    translateYStep,
    opacityStep,
    blurStep,
    ariaLabel,
    children,
    w,
    h,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<DepthSelectFactory>({
    name: 'DepthSelect',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const items: DepthSelectItem[] = useMemo(() => data ?? [], [data]);
  const maxVisible = visibleCards ?? 4;

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue: defaultValue ?? items[0]?.value,
    finalValue: items[0]?.value,
    onChange,
  });

  const currentIndex = items.findIndex((item) => item.value === _value);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activeItem = items[activeIndex];

  const canGoNext = loop ? items.length > 1 : activeIndex < items.length - 1;
  const canGoPrevious = loop ? items.length > 1 : activeIndex > 0;

  const goNext = useCallback(() => {
    if (items.length === 0) {
      return;
    }
    if (activeIndex < items.length - 1) {
      handleChange(items[activeIndex + 1].value);
    } else if (loop) {
      handleChange(items[0].value);
    }
  }, [activeIndex, items, loop, handleChange]);

  const goPrevious = useCallback(() => {
    if (items.length === 0) {
      return;
    }
    if (activeIndex > 0) {
      handleChange(items[activeIndex - 1].value);
    } else if (loop) {
      handleChange(items[items.length - 1].value);
    }
  }, [activeIndex, items, loop, handleChange]);

  const goFirst = useCallback(() => {
    if (items.length > 0) {
      handleChange(items[0].value);
    }
  }, [items, handleChange]);

  const goLast = useCallback(() => {
    if (items.length > 0) {
      handleChange(items[items.length - 1].value);
    }
  }, [items, handleChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        goNext();
        break;
      case 'ArrowDown':
        event.preventDefault();
        goPrevious();
        break;
      case 'Home':
        event.preventDefault();
        goFirst();
        break;
      case 'End':
        event.preventDefault();
        goLast();
        break;
    }
  };

  // Wheel navigation with cooldown — uses non-passive listener to prevent page scroll
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = useMergedRef(ref, rootRef);

  const goNextRef = useRef(goNext);
  const goPreviousRef = useRef(goPrevious);
  goNextRef.current = goNext;
  goPreviousRef.current = goPrevious;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !withScrollNavigation) {
      return;
    }

    let cooldown = false;
    const duration = transitionDuration || 400;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (cooldown || Math.abs(event.deltaY) < 5) {
        return;
      }
      cooldown = true;
      if (event.deltaY > 0) {
        goNextRef.current();
      } else {
        goPreviousRef.current();
      }
      setTimeout(() => {
        cooldown = false;
      }, duration);
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
    };
  }, [withScrollNavigation, transitionDuration]);

  // Touch swipe navigation
  const touchStartRef = useRef<number | null>(null);
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartRef.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartRef.current === null) {
        return;
      }
      const deltaY = touchStartRef.current - event.changedTouches[0].clientY;
      touchStartRef.current = null;
      if (Math.abs(deltaY) < 30) {
        return;
      }
      if (deltaY > 0) {
        goNext();
      } else {
        goPrevious();
      }
    },
    [goNext, goPrevious]
  );

  // Memoize card styles: only recompute when activeIndex or step params change
  const cardStyles = useMemo(() => {
    const renderStart = Math.max(0, activeIndex - 1);
    const renderEnd = Math.min(items.length, activeIndex + maxVisible + 1);
    const stylesMap = new Map<number, React.CSSProperties>();
    for (let i = renderStart; i < renderEnd; i++) {
      stylesMap.set(
        i,
        getCardStyle(
          i - activeIndex,
          maxVisible,
          scaleStep ?? 0.1,
          translateYStep ?? 30,
          opacityStep ?? 0.15,
          blurStep ?? 1
        )
      );
    }
    return stylesMap;
  }, [activeIndex, maxVisible, scaleStep, translateYStep, opacityStep, blurStep, items.length]);

  // Render only cards within the visible window (perf: avoids N DOM nodes for large datasets)
  const renderStart = Math.max(0, activeIndex - 1);
  const renderEnd = Math.min(items.length, activeIndex + maxVisible + 1);

  return (
    <DepthSelectProvider
      value={{
        getStyles,
        activeItem,
        activeIndex,
        items,
        canGoNext,
        canGoPrevious,
        goNext,
        goPrevious,
        controlsPosition: controlsPosition!,
      }}
    >
      <Box
        ref={mergedRef}
        {...getStyles('root')}
        {...others}
        mod={[{ 'controls-position': controlsPosition }, mod]}
        tabIndex={0}
        role="listbox"
        aria-label={ariaLabel}
        aria-activedescendant={activeItem ? `ds-item-${activeItem.value}` : undefined}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Box {...getStyles('stack')} w={w} h={h}>
          {items.slice(renderStart, renderEnd).map((item, i) => {
            const itemIndex = renderStart + i;
            const relativeIndex = itemIndex - activeIndex;
            const isActive = relativeIndex === 0;
            const cardStyle = cardStyles.get(itemIndex);

            return (
              <Box
                key={item.value}
                id={`ds-item-${item.value}`}
                {...getStyles('card')}
                style={cardStyle}
                role="option"
                aria-selected={isActive}
                aria-hidden={!isActive}
                data-active={isActive || undefined}
                data-depth={relativeIndex >= 0 ? relativeIndex : undefined}
                data-exited={relativeIndex < 0 || undefined}
                onClick={relativeIndex === 1 ? goNext : undefined}
              >
                {item.view}
              </Box>
            );
          })}
        </Box>
        {withControls && <DepthSelectControls {...controlsProps} />}
        {children}
      </Box>
    </DepthSelectProvider>
  );
});

DepthSelect.classes = classes;
DepthSelect.displayName = 'DepthSelect';
DepthSelect.Controls = DepthSelectControls;
