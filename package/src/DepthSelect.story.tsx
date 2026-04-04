import React, { useState } from 'react';
import { Badge, Card, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, type DepthSelectItem } from './DepthSelect';

export default {
  title: 'Components/DepthSelect',
};

const SAMPLE_DATA: DepthSelectItem[] = [
  {
    value: 'snapshot-1',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 1 — Today</Title>
        <Text size="sm" c="dimmed">
          Most recent backup
        </Text>
        <Text mt="sm">This is the frontmost card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-2',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 2 — Yesterday</Title>
        <Text size="sm" c="dimmed">
          Previous backup
        </Text>
        <Text mt="sm">Second card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-3',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 3 — 2 days ago</Title>
        <Text size="sm" c="dimmed">
          Older backup
        </Text>
        <Text mt="sm">Third card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-4',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 4 — 3 days ago</Title>
        <Text size="sm" c="dimmed">
          Even older backup
        </Text>
        <Text mt="sm">Fourth card in the stack.</Text>
      </Card>
    ),
  },
  {
    value: 'snapshot-5',
    view: (
      <Card shadow="sm" padding="lg" withBorder>
        <Title order={4}>Snapshot 5 — Last week</Title>
        <Text size="sm" c="dimmed">
          Weekly backup
        </Text>
        <Text mt="sm">Fifth card in the stack.</Text>
      </Card>
    ),
  },
];

export function Usage() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>Default (built-in controls right)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} w={400} h={200} />
      </Paper>
    </Stack>
  );
}

export function ControlsRight() {
  return (
    <Stack gap="xl" p="md" maw={600} mx="auto">
      <Title order={2}>Controls Right (Time Machine style)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} controlsPosition="right" w={450} h={200} />
      </Paper>
    </Stack>
  );
}

export function ControlsLeft() {
  return (
    <Stack gap="xl" p="md" maw={600} mx="auto">
      <Title order={2}>Controls Left</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} controlsPosition="left" w={450} h={200} />
      </Paper>
    </Stack>
  );
}

export function NoControls() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>No Controls (keyboard + scroll + click only)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} withControls={false} w={400} h={200} />
      </Paper>
    </Stack>
  );
}

export function WithLoop() {
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>Infinite loop navigation</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} loop w={400} h={200} />
      </Paper>
    </Stack>
  );
}

export function Controlled() {
  const [value, setValue] = useState<string | number>('snapshot-1');
  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>Controlled</Title>
      <Group>
        {SAMPLE_DATA.map((item) => (
          <Badge
            key={String(item.value)}
            variant={value === item.value ? 'filled' : 'outline'}
            style={{ cursor: 'pointer' }}
            onClick={() => setValue(item.value)}
          >
            {String(item.value)}
          </Badge>
        ))}
      </Group>
      <Paper p="xl" withBorder>
        <DepthSelect data={SAMPLE_DATA} value={value} onChange={setValue} w={400} h={200} />
      </Paper>
    </Stack>
  );
}

export function VersionHistory() {
  const versions: DepthSelectItem[] = [
    {
      value: 'v2.0.0',
      view: (
        <Card shadow="sm" padding="lg" withBorder>
          <Group justify="space-between">
            <Title order={4}>v2.0.0</Title>
            <Badge color="green">Latest</Badge>
          </Group>
          <Text size="sm" mt="sm">
            Mantine 9 + React 19 upgrade
          </Text>
        </Card>
      ),
    },
    {
      value: 'v1.0.0',
      view: (
        <Card shadow="sm" padding="lg" withBorder>
          <Title order={4}>v1.0.0</Title>
          <Text size="sm" mt="sm">
            Initial release — 3D stack select with Time Machine navigation
          </Text>
        </Card>
      ),
    },
  ];

  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>Version History (MigrationHistory use case)</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={versions} w={400} h={180} />
      </Paper>
    </Stack>
  );
}

export function Gallery() {
  const images: DepthSelectItem[] = Array.from({ length: 8 }, (_, i) => ({
    value: `image-${i + 1}`,
    view: (
      <Card shadow="sm" padding={0} withBorder radius="md" style={{ overflow: 'hidden' }}>
        <Image
          src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${i + 1}.png`}
          alt={`Gallery image ${i + 1}`}
          h={200}
          fit="cover"
        />
        <Text size="sm" ta="center" py="xs" fw={500}>
          Photo {i + 1} of 8
        </Text>
      </Card>
    ),
  }));

  return (
    <Stack gap="xl" p="md" maw={500} mx="auto">
      <Title order={2}>Image Gallery</Title>
      <Paper p="xl" withBorder>
        <DepthSelect data={images} loop w={400} h={260} />
      </Paper>
    </Stack>
  );
}
