import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';
import { useState } from 'react';

const STEPS: DepthSelectItem[] = [
  {
    value: 'welcome',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={3} mb="xs">
          Welcome!
        </Title>
        <Text size="sm" c="dimmed">
          Let us show you around. This quick tour will help you get started with the most important
          features.
        </Text>
      </Card>
    ),
  },
  {
    value: 'profile',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={3} mb="xs">
          Set up your profile
        </Title>
        <Text size="sm" c="dimmed">
          Add a photo and bio so your team can recognize you. This helps build trust in
          collaborative projects.
        </Text>
      </Card>
    ),
  },
  {
    value: 'project',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={3} mb="xs">
          Create your first project
        </Title>
        <Text size="sm" c="dimmed">
          Projects organize your work. Create one now or explore our templates to get started
          quickly.
        </Text>
      </Card>
    ),
  },
  {
    value: 'done',
    view: (
      <Card shadow="sm" p="lg" withBorder h="100%">
        <Title order={3} mb="xs">
          You are all set!
        </Title>
        <Text size="sm" c="dimmed">
          You have completed the onboarding. Explore the dashboard or dive into the documentation to
          learn more.
        </Text>
      </Card>
    ),
  },
];

const code = `
import { useState } from 'react';
import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const steps: DepthSelectItem[] = [
  { value: 'welcome', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={3} mb="xs">Welcome!</Title><Text size="sm" c="dimmed">Let us show you around...</Text></Card> },
  { value: 'profile', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={3} mb="xs">Set up your profile</Title><Text size="sm" c="dimmed">Add a photo and bio...</Text></Card> },
  { value: 'project', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={3} mb="xs">Create your first project</Title><Text size="sm" c="dimmed">Projects organize your work...</Text></Card> },
  { value: 'done', view: <Card shadow="sm" p="lg" withBorder h="100%"><Title order={3} mb="xs">You are all set!</Title><Text size="sm" c="dimmed">Explore the dashboard...</Text></Card> },
];

function Demo() {
  const [value, setValue] = useState<string | number>('welcome');
  const currentIndex = steps.findIndex((s) => s.value === value);
  const isLast = currentIndex === steps.length - 1;

  return (
    <Stack align="center">
      <DepthSelect
        data={steps}
        value={value}
        onChange={setValue}
        withControls={false}
        w={400}
        h={140}
      />
      <Group>
        <Button
          variant="default"
          size="xs"
          onClick={() => setValue(steps[currentIndex - 1].value)}
          disabled={currentIndex <= 0}
        >
          Back
        </Button>
        <Text size="xs" c="dimmed">
          Step {currentIndex + 1} of {steps.length}
        </Text>
        <Button
          size="xs"
          onClick={() => !isLast && setValue(steps[currentIndex + 1].value)}
          disabled={isLast}
        >
          {isLast ? 'Done' : 'Continue'}
        </Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | number>('welcome');
  const currentIndex = STEPS.findIndex((s) => s.value === value);
  const isLast = currentIndex === STEPS.length - 1;

  return (
    <Stack align="center" pt={60}>
      <DepthSelect
        data={STEPS}
        value={value}
        onChange={setValue}
        withControls={false}
        w={400}
        h={140}
      />
      <Group>
        <Button
          variant="default"
          size="xs"
          onClick={() => setValue(STEPS[currentIndex - 1].value)}
          disabled={currentIndex <= 0}
        >
          Back
        </Button>
        <Text size="xs" c="dimmed">
          Step {currentIndex + 1} of {STEPS.length}
        </Text>
        <Button
          size="xs"
          onClick={() => !isLast && setValue(STEPS[currentIndex + 1].value)}
          disabled={isLast}
        >
          {isLast ? 'Done' : 'Continue'}
        </Button>
      </Group>
    </Stack>
  );
}

export const onboarding: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
