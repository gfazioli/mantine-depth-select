import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'snap-1',
    view: (
      <Card shadow="sm" p="lg" withBorder>
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
      <Card shadow="sm" p="lg" withBorder>
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
      <Card shadow="sm" p="lg" withBorder>
        <Title order={4}>Snapshot 3</Title>
        <Text size="sm" c="dimmed">
          2 days ago
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-4',
    view: (
      <Card shadow="sm" p="lg" withBorder>
        <Title order={4}>Snapshot 4</Title>
        <Text size="sm" c="dimmed">
          3 days ago
        </Text>
      </Card>
    ),
  },
  {
    value: 'snap-5',
    view: (
      <Card shadow="sm" p="lg" withBorder>
        <Title order={4}>Snapshot 5</Title>
        <Text size="sm" c="dimmed">
          Last week
        </Text>
      </Card>
    ),
  },
];

const code = `
import { useState } from 'react';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'snap-1', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 1</Title></Card> },
  { value: 'snap-2', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 2</Title></Card> },
  { value: 'snap-3', view: <Card shadow="sm" p="lg" withBorder><Title order={4}>Snapshot 3</Title></Card> },
];

function Demo() {
  const [value, setValue] = useState<string | number>('snap-2');

  return (
    <Stack>
      <DepthSelect data={data} value={value} onChange={setValue} withControls={false} w={400} h={200} />
      <Group justify="center">
        {data.map((item) => (
          <Button key={item.value} onClick={() => setValue(item.value)} variant="light" size="xs">
            {String(item.value)}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>('snap-2');

  return (
    <Stack pt={80}>
      <DepthSelect
        data={ITEMS}
        value={value}
        onChange={setValue}
        withControls={false}
        w={400}
        h={200}
      />
      <Group justify="center">
        {ITEMS.map((item) => (
          <Button key={item.value} onClick={() => setValue(item.value)} variant="light" size="xs">
            {String(item.value)}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}

export const controlled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
