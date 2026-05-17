import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Badge, Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const ITEMS: DepthSelectItem[] = [
  {
    value: 'norway',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Explore magical fjord landscapes with tours and activities on and around the fjords of
          Norway
        </Text>
        <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>
    ),
  },
  {
    value: 'hawaii',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
            height={160}
            alt="Hawaii"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Hawaii Beach Retreat</Text>
          <Badge color="teal">Popular</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Relax on pristine beaches with crystal clear waters and enjoy tropical island activities
        </Text>
        <Button color="teal" fullWidth mt="md" radius="md">
          Reserve your spot
        </Button>
      </Card>
    ),
  },
  {
    value: 'alps',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png"
            height={160}
            alt="Alps"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Alpine Ski Experience</Text>
          <Badge color="violet">New</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Hit the slopes in the most stunning alpine resorts with world-class skiing and
          snowboarding
        </Text>
        <Button color="violet" fullWidth mt="md" radius="md">
          Book winter package
        </Button>
      </Card>
    ),
  },
  {
    value: 'safari',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png"
            height={160}
            alt="Safari"
          />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>African Safari Tour</Text>
          <Badge color="orange">Limited</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          Witness the great migration and encounter the Big Five in their natural habitat
        </Text>
        <Button color="orange" fullWidth mt="md" radius="md">
          Join the expedition
        </Button>
      </Card>
    ),
  },
];

const code = `
import { useState } from 'react';
import { Badge, Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = [
  {
    value: 'norway',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Card.Section>
          <Image src="..." height={160} alt="Norway" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
          <Badge color="pink">On Sale</Badge>
        </Group>
        <Text size="sm" c="dimmed">Explore magical fjord landscapes...</Text>
        <Button color="blue" fullWidth mt="md" radius="md">Book classic tour now</Button>
      </Card>
    ),
  },
  // ... more items
];

function Demo() {
  const [value, setValue] = useState<string | number>('hawaii');

  return (
    <Stack pt={80} pb={80}>
      <DepthSelect
        data={data}
        value={value}
        onChange={setValue}
        controlsProps={{ labelFormatter: (item) => String(item.value) }}
        w={400}
        h={340}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>('hawaii');

  return (
    <Stack pt={80} pb={80}>
      <DepthSelect
        data={ITEMS}
        value={value}
        onChange={setValue}
        controlsProps={{ w: 80, labelFormatter: (item) => String(item.value) }}
        translateYStep={50}
        w={400}
        h={340}
        mx="auto"
      />
    </Stack>
  );
}

export const richCards: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
