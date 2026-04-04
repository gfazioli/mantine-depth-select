import React from 'react';
import {
  Box,
  BoxProps,
  factory,
  Factory,
  StylesApiProps,
  UnstyledButton,
  useProps,
} from '@mantine/core';
import { useDepthSelectContext } from './DepthSelect.context';

export interface DepthSelectControlsProps
  extends BoxProps, StylesApiProps<DepthSelectControlsFactory> {
  /** Custom formatter for the label between arrows */
  labelFormatter?: (item: { value: string | number; view: React.ReactNode }) => React.ReactNode;

  /** Custom icon for the up button (navigate deeper into the stack) */
  upIcon?: React.ReactNode;

  /** Custom icon for the down button (navigate back toward the front) */
  downIcon?: React.ReactNode;

  /** Vertical alignment of controls: "start" (top), "center" (default), "end" (bottom) */
  justify?: 'start' | 'center' | 'end';
}

export type DepthSelectControlsFactory = Factory<{
  props: DepthSelectControlsProps;
  ref: HTMLDivElement;
  stylesNames: 'controls' | 'controlUp' | 'controlDown' | 'controlLabel';
}>;

const defaultChevronUp = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const defaultChevronDown = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const defaultProps: Partial<DepthSelectControlsProps> = {};

export const DepthSelectControls = factory<DepthSelectControlsFactory>((_props) => {
  const props = useProps('DepthSelectControls', defaultProps, _props);
  const { labelFormatter, upIcon, downIcon, justify, ...others } = props;

  const ctx = useDepthSelectContext();

  const label = labelFormatter && ctx.activeItem ? labelFormatter(ctx.activeItem) : null;

  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
  };
  const controlsVars: React.CSSProperties | undefined = justify
    ? ({ '--ds-controls-justify': justifyMap[justify as string] } as React.CSSProperties)
    : undefined;

  return (
    <Box {...ctx.getStyles('controls', { style: controlsVars })} {...others}>
      <UnstyledButton
        {...ctx.getStyles('controlUp')}
        onClick={ctx.goNext}
        disabled={!ctx.canGoNext}
        data-disabled={!ctx.canGoNext || undefined}
        aria-label="Navigate deeper into the stack"
      >
        {upIcon || defaultChevronUp}
      </UnstyledButton>

      {label != null && <Box {...ctx.getStyles('controlLabel')}>{label}</Box>}

      <UnstyledButton
        {...ctx.getStyles('controlDown')}
        onClick={ctx.goPrevious}
        disabled={!ctx.canGoPrevious}
        data-disabled={!ctx.canGoPrevious || undefined}
        aria-label="Navigate back toward the front"
      >
        {downIcon || defaultChevronDown}
      </UnstyledButton>
    </Box>
  );
});

DepthSelectControls.displayName = 'DepthSelectControls';
