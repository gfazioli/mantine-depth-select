import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { ActionIcon, Card, Group, Stack, Text, Title } from '@mantine/core';
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
import { ActionIcon, Card, Group, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 1</Title><Text size="sm" c="dimmed">Today</Text></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 2</Title><Text size="sm" c="dimmed">Yesterday</Text></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={4}>Snapshot 3</Title><Text size="sm" c="dimmed">2 days ago</Text></Card> },
];

function Demo() {
  const [value, setValue] = useState<string | number>('snap-2');
  const currentIndex = data.findIndex((item) => item.value === value);

  const goNext = () => {
    if (currentIndex < data.length - 1) {
      setValue(data[currentIndex + 1].value);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setValue(data[currentIndex - 1].value);
    }
  };

  return (
    <Stack align="center">
      <DepthSelect
        data={data}
        value={value}
        onChange={setValue}
        withControls={false}
        w={400}
        h={80}
      />
      <Group>
        <ActionIcon variant="default" onClick={goPrevious} disabled={currentIndex <= 0}>
          ←
        </ActionIcon>
        <Text size="sm" fw={500}>
          {String(value)} ({currentIndex + 1}/{data.length})
        </Text>
        <ActionIcon variant="default" onClick={goNext} disabled={currentIndex >= data.length - 1}>
          →
        </ActionIcon>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>('snap-2');
  const currentIndex = ITEMS.findIndex((item) => item.value === value);

  const goNext = () => {
    if (currentIndex < ITEMS.length - 1) {
      setValue(ITEMS[currentIndex + 1].value);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setValue(ITEMS[currentIndex - 1].value);
    }
  };

  return (
    <Stack align="center" pt={80} pb={80}>
      <DepthSelect
        data={ITEMS}
        value={value}
        onChange={setValue}
        withControls={false}
        w={400}
        h={80}
      />
      <Group>
        <ActionIcon variant="default" onClick={goPrevious} disabled={currentIndex <= 0}>
          ←
        </ActionIcon>
        <Text size="sm" fw={500}>
          {String(value)} ({currentIndex + 1}/{ITEMS.length})
        </Text>
        <ActionIcon variant="default" onClick={goNext} disabled={currentIndex >= ITEMS.length - 1}>
          →
        </ActionIcon>
      </Group>
    </Stack>
  );
}

export const customControls: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
