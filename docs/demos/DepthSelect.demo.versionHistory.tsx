import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Avatar, Badge, Card, Code, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const VERSIONS: DepthSelectItem[] = [
  {
    value: 'v3',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Group gap="sm">
            <Avatar color="blue" radius="xl" size="sm">
              JD
            </Avatar>
            <Text size="sm" fw={500}>
              John Doe
            </Text>
          </Group>
          <Badge color="green" size="sm">
            Latest
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="xs">
          2 hours ago
        </Text>
        <Code block>+ Added error handling for API calls</Code>
      </Card>
    ),
  },
  {
    value: 'v2',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Group gap="sm">
            <Avatar color="pink" radius="xl" size="sm">
              AS
            </Avatar>
            <Text size="sm" fw={500}>
              Alice Smith
            </Text>
          </Group>
          <Badge color="gray" size="sm">
            v2
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="xs">
          Yesterday
        </Text>
        <Code block>~ Refactored authentication module</Code>
      </Card>
    ),
  },
  {
    value: 'v1',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Group gap="sm">
            <Avatar color="orange" radius="xl" size="sm">
              BW
            </Avatar>
            <Text size="sm" fw={500}>
              Bob Wilson
            </Text>
          </Group>
          <Badge color="gray" size="sm">
            v1
          </Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="xs">
          3 days ago
        </Text>
        <Code block>+ Initial implementation</Code>
      </Card>
    ),
  },
];

const code = `
import { Avatar, Badge, Card, Code, Group, Text } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const versions: DepthSelectItem[] = [
  {
    value: 'v3',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Group gap="sm">
            <Avatar color="blue" radius="xl" size="sm">JD</Avatar>
            <Text size="sm" fw={500}>John Doe</Text>
          </Group>
          <Badge color="green" size="sm">Latest</Badge>
        </Group>
        <Text size="xs" c="dimmed" mb="xs">2 hours ago</Text>
        <Code block>+ Added error handling for API calls</Code>
      </Card>
    ),
  },
  // ... more versions
];

function Demo() {
  return (
    <DepthSelect
      data={versions}
      controlsProps={{ labelFormatter: (item) => String(item.value) }}
      w={400}
      h={180}
    />
  );
}
`;

function Demo() {
  return (
    <Stack pt={60}>
      <DepthSelect
        data={VERSIONS}
        controlsProps={{ labelFormatter: (item) => String(item.value) }}
        w={400}
        h={180}
        mx="auto"
      />
    </Stack>
  );
}

export const versionHistory: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
