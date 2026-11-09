import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Badge, Button, Card, Group, List, Stack, Text, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const PLANS: DepthSelectItem[] = [
  {
    value: 'free',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Title order={3}>Free</Title>
          <Badge variant="light">Current</Badge>
        </Group>
        <Title order={2} mb="md">
          $0
          <Text span size="sm" c="dimmed">
            /month
          </Text>
        </Title>
        <List size="sm" spacing="xs" mb="md">
          <List.Item>1 project</List.Item>
          <List.Item>100 MB storage</List.Item>
          <List.Item>Community support</List.Item>
        </List>
        <Button variant="default" fullWidth radius="md">
          Current plan
        </Button>
      </Card>
    ),
  },
  {
    value: 'pro',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Title order={3}>Pro</Title>
          <Badge color="blue">Popular</Badge>
        </Group>
        <Title order={2} mb="md">
          $19
          <Text span size="sm" c="dimmed">
            /month
          </Text>
        </Title>
        <List size="sm" spacing="xs" mb="md">
          <List.Item>Unlimited projects</List.Item>
          <List.Item>10 GB storage</List.Item>
          <List.Item>Priority support</List.Item>
          <List.Item>Custom domain</List.Item>
        </List>
        <Button color="blue" fullWidth radius="md">
          Upgrade to Pro
        </Button>
      </Card>
    ),
  },
  {
    value: 'enterprise',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Title order={3}>Enterprise</Title>
          <Badge color="violet">Premium</Badge>
        </Group>
        <Title order={2} mb="md">
          $99
          <Text span size="sm" c="dimmed">
            /month
          </Text>
        </Title>
        <List size="sm" spacing="xs" mb="md">
          <List.Item>Unlimited everything</List.Item>
          <List.Item>100 GB storage</List.Item>
          <List.Item>Dedicated support</List.Item>
          <List.Item>SSO & SAML</List.Item>
          <List.Item>SLA guarantee</List.Item>
        </List>
        <Button color="violet" fullWidth radius="md">
          Contact sales
        </Button>
      </Card>
    ),
  },
];

const code = `
import { Badge, Button, Card, Group, List, Text, Title } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const plans: DepthSelectItem[] = [
  {
    value: 'free',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Title order={3}>Free</Title>
          <Badge variant="light">Current</Badge>
        </Group>
        <Title order={2} mb="md">$0<Text span size="sm" c="dimmed">/month</Text></Title>
        <List size="sm" spacing="xs" mb="md">
          <List.Item>1 project</List.Item>
          <List.Item>100 MB storage</List.Item>
          <List.Item>Community support</List.Item>
        </List>
        <Button variant="default" fullWidth radius="md">Current plan</Button>
      </Card>
    ),
  },
  {
    value: 'pro',
    view: (
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Group justify="space-between" mb="xs">
          <Title order={3}>Pro</Title>
          <Badge color="blue">Popular</Badge>
        </Group>
        <Title order={2} mb="md">$19<Text span size="sm" c="dimmed">/month</Text></Title>
        <List size="sm" spacing="xs" mb="md">
          <List.Item>Unlimited projects</List.Item>
          <List.Item>10 GB storage</List.Item>
          <List.Item>Priority support</List.Item>
          <List.Item>Custom domain</List.Item>
        </List>
        <Button color="blue" fullWidth radius="md">Upgrade to Pro</Button>
      </Card>
    ),
  },
  // ... Enterprise plan
];

function Demo() {
  return (
    <DepthSelect
      data={plans}
      defaultValue="pro"
      controlsProps={{ w: 100, labelFormatter: (item) => String(item.value) }}
      w={350}
      h={380}
    />
  );
}
`;

function Demo() {
  return (
    <Stack pt={60} pb={40}>
      <DepthSelect
        data={PLANS}
        defaultValue="pro"
        controlsProps={{ w: 100, labelFormatter: (item) => String(item.value) }}
        w={350}
        h={380}
        mx="auto"
      />
    </Stack>
  );
}

export const pricingPlans: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
