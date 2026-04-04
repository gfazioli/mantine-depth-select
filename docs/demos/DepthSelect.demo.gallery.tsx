import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';
import { Card, Image, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const IMAGES: DepthSelectItem[] = Array.from({ length: 8 }, (_, i) => ({
  value: `image-${i + 1}`,
  view: (
    <Card shadow="sm" padding={0} withBorder radius="md" style={{ overflow: 'hidden' }} h="100%">
      <Image
        src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${i + 1}.png`}
        alt={`Gallery image ${i + 1}`}
        h={180}
        fit="cover"
      />
      <Text size="sm" ta="center" py="xs" fw={500}>
        Photo {i + 1} of 8
      </Text>
    </Card>
  ),
}));

const code = `
import { Card, Image, Text } from '@mantine/core';
import { DepthSelect, DepthSelectItem } from '@gfazioli/mantine-depth-select';

const data: DepthSelectItem[] = Array.from({ length: 8 }, (_, i) => ({
  value: \`image-\${i + 1}\`,
  view: (
    <Card shadow="sm" padding={0} withBorder radius="md" style={{ overflow: 'hidden' }} h="100%">
      <Image
        src={\`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-\${i + 1}.png\`}
        alt={\`Gallery image \${i + 1}\`}
        h={180}
        fit="cover"
      />
      <Text size="sm" ta="center" py="xs" fw={500}>
        Photo {i + 1} of 8
      </Text>
    </Card>
  ),
}));

function Demo() {
  return (
    <DepthSelect
      data={data}
      loop
      controlsProps={{ labelFormatter: (item) => String(item.value) }}
      w={400}
      h={230}
    />
  );
}
`;

function Demo() {
  return (
    <Stack pt={60} pb={60}>
      <DepthSelect
        data={IMAGES}
        loop
        controlsProps={{ labelFormatter: (item) => String(item.value) }}
        w={400}
        h={230}
        mx="auto"
      />
    </Stack>
  );
}

export const gallery: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  defaultExpanded: false,
};
