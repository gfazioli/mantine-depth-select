import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'snap-1',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 1</Title>
        <Text size="sm" c="dimmed">
          Today
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-2',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 2</Title>
        <Text size="sm" c="dimmed">
          Yesterday
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-3',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={4}>Snapshot 3</Title>
        <Text size="sm" c="dimmed">
          2 days ago
        </Text>
      </Card>
    ),
  },
];

const code = `
import { useState } from 'react';
import { Card, SegmentedControl, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 1</Title></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 2</Title></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 3</Title></Card> },
];

function Demo() {
  const [justify, setJustify] = useState<'start' | 'center' | 'end'>('center');

  return (
    <Stack align="center" gap="md">
      <SegmentedControl
        value={justify}
        onChange={(val) => setJustify(val as 'start' | 'center' | 'end')}
        data={[
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' },
        ]}
        size="xs"
      />
      <DepthSelect
        data={data}
        w={350}
        h={200}
        controlsProps={{
          justify,
          w: 80,
          labelFormatter: (item) => String(item.value),
        }}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [justify, setJustify] = useState<'start' | 'center' | 'end'>('center');

  return (
    <Stack align="center" gap="md" pt={60} pb={60}>
      <DepthSelect
        data={ITEMS}
        w={350}
        h={200}
        controlsProps={{
          justify,
          w: 80,
          labelFormatter: (item) => String(item.value),
        }}
      />
      <SegmentedControl
        value={justify}
        onChange={(val) => setJustify(val as 'start' | 'center' | 'end')}
        data={[
          { value: 'start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'end', label: 'End' },
        ]}
        size="xs"
      />
    </Stack>
  );
}

export const controlsJustify: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
