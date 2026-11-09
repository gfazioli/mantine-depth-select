import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'slide-1',
    view: (
      <Card shadow="sm" p="lg" h="100%" bg="red.7">
        <Title order={4} c="white">
          Slide 1
        </Title>
        <Text size="sm" c="gray.3">
          First item — loops back from the last
        </Text>
      </Card>
    ),
  },
  {
    value: 'slide-2',
    view: (
      <Card shadow="sm" p="lg" h="100%" bg="violet.7">
        <Title order={4} c="white">
          Slide 2
        </Title>
        <Text size="sm" c="gray.3">
          Middle item
        </Text>
      </Card>
    ),
  },
  {
    value: 'slide-3',
    view: (
      <Card shadow="sm" p="lg" h="100%" bg="blue.7">
        <Title order={4} c="white">
          Slide 3
        </Title>
        <Text size="sm" c="gray.3">
          Last item — loops forward to the first
        </Text>
      </Card>
    ),
  },
];

const code = `
import { Card, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  { value: 'slide-1', view: <Card shadow="sm" p="lg" h="100%" bg="red.7"><Title order={4} c="white">Slide 1</Title><Text size="sm" c="gray.3">First item — loops back from the last</Text></Card> },
  { value: 'slide-2', view: <Card shadow="sm" p="lg" h="100%" bg="violet.7"><Title order={4} c="white">Slide 2</Title><Text size="sm" c="gray.3">Middle item</Text></Card> },
  { value: 'slide-3', view: <Card shadow="sm" p="lg" h="100%" bg="blue.7"><Title order={4} c="white">Slide 3</Title><Text size="sm" c="gray.3">Last item — loops forward to the first</Text></Card> },
];

function Demo() {
  return (
    <Stack pt={60} pb={60}>
      <DepthSelect
        data={data}
        loop
        controlsProps={{ labelFormatter: (item) => String(item.value) }}
        w={400}
        h={120}
      />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack pt={60} pb={60}>
      <DepthSelect
        data={ITEMS}
        loop
        controlsProps={{ labelFormatter: (item) => String(item.value) }}
        w={400}
        h={120}
        mx="auto"
      />
    </Stack>
  );
}

export const loopDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
