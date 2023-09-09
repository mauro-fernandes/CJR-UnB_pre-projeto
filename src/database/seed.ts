import { PrismaService } from './prisma.service';

const prisma = new PrismaService();

const seed_users = [
  {
    email: 'maurofda@unb.br',
    name: 'Mauro Fernandes de Almeida',
    username: 'maurofda',
    password: '123456',
    gender: 'M',
    role: 'DFO',
    admin: true,
  },
  {
    email: 'ana@unb.br',
    name: 'Ana Beatriz',
    username: 'ana',
    password: '123456',
    gender: 'F',
    role: 'operator',
    admin: false,
  },
  {
    email: 'crisczar@unb.br',
    name: 'Cristina Almeida',
    username: 'cris',
    password: '123456',
    gender: 'F',
    role: 'chief',
    admin: false,
  },
  {
    email: 'mateus@unb.br',
    name: 'Mateus Almeida',
    username: 'mateus',
    password: '123456',
    gender: 'M',
    role: 'operator',
    admin: false,
  },

  {
    username: 'mauro',
    email: 'm@unb.br',
    password: '123456',
    gender: 'M',
    role: 'membro',
  },
  {
    username: 'leo',
    password: '123456',
    gender: 'M',
    email: 'leo@unb.br',
    role: 'membro',
  },
  {
    username: 'pejao',
    password: '123456',
    gender: 'M',
    email: 'p@unb.br',
    role: 'membro',
  },
  {
    username: 'joao',
    password: '123456',
    gender: 'M',
    email: 'j@unb.br',
    role: 'membro',
  },
  {
    username: 'gus',
    password: '123456',
    gender: 'M',
    email: 'g@unb.br',
    role: 'trainee',
  },
  {
    username: 'hector',
    password: '123456',
    gender: 'M',
    email: 'h@unb.br',
    role: 'trainee',
  },
  {
    username: 'admin',
    password: '123456',
    gender: 'M',
    email: 'admin@xyz.abc',
    role: 'admin',
  },
  {
    username: 'admin2',
    password: '123456',
    gender: 'M',
    email: 'admin2@xyz.abc',
    role: 'admin',
  },
  {
    username: 'admin3',
    password: '123456',
    gender: 'M',
    email: 'admin3@xyz.abc',
    role: 'admin',
  },
  {
    username: 'admin5',
    password: '123456',
    gender: 'M',
    email: 'admin5@xyz.abc',
    role: 'admin',
  },
];

const seed_tags = [
  { id: 1, name: 'UnB (noite)' },
  { id: 2, name: 'Exercícios físicos (diurno)' },
  { id: 3, name: 'Trabalho (CEMSL)' },
  { id: 4, name: 'UnB (diurno)' },
  { id: 5, name: 'Saúde' },
];

const seed_tasks = [
  {
    id: 1,
    name: 'praticar calistenia',
    isActive: false,
  },
  {
    id: 2,
    name: 'tomar vitaminas ',
    isActive: true,
  },
  {
    id: 3,
    name: 'tomar whey ',
    isActive: true,
  },
  {
    id: 4,
    name: 'estudar Prisma ORM e NestJS',
    isActive: true,
  },
  {
    id: 5,
    name: 'tomar creatina',
    isActive: true,
  },
];

const seed_connections = [
  {
    id: 1,
    tags: {
      connect: [{ id: 2 }],
    },
  },
  {
    id: 2,
    tags: {
      connect: [{ id: 5 }],
    },
  },
  {
    id: 3,
    tags: {
      connect: [{ id: 2 }],
    },
  },
  {
    id: 4,
    tags: {
      connect: [{ id: 1 }, { id: 3 }],
    },
  },
];

async function main() {
  console.log('\nStarting seed...');

  const users = await prisma.user.createMany({
    data: seed_users,
    skipDuplicates: true,
  });
  console.log('Users created: ', users);

  const tags = await prisma.tag.createMany({
    data: seed_tags,
    skipDuplicates: true,
  });
  console.log('Tags created: ', tags);

  const tasks = await prisma.task.createMany({
    data: seed_tasks,
    skipDuplicates: true,
  });
  console.log('Tasks created: ', tasks);

  console.log('Assigning tags to tasks...');
  let j = 0;
  for (const i of seed_connections) {
    const tagAssigned = await prisma.task.findUnique({
      where: { id: i.id },
      select: { tags: { select: { id: true } } },
    });
    const alreadyAssigned = tagAssigned?.tags.length;
    if (typeof alreadyAssigned === 'number' && alreadyAssigned > 0) {
      continue;
    }
    await prisma.task.update({
      where: { id: i.id },
      data: { tags: i.tags },
    });
    j += i.tags.connect.length;
  }
  console.log('Tags assigns: ', { count: j });

  console.log('Assigning users to tasks...');
  let k = 0;
  for (const i of seed_tasks) {
    const haveUser = await prisma.task.findUnique({
      where: { id: i.id },
      select: { id: true, authorId: true, author: { select: { id: true } } },
    });

    const alreadyAssigned = haveUser?.author?.id.length;
    if (typeof alreadyAssigned === 'number' && alreadyAssigned > 0) {
      continue;
    }

    const user = await prisma.user.findFirst({
      select: { id: true },
    });
    if (!user) {
      console.log('No user found to assign to task: ', i);
      continue;
    }

    await prisma.task.update({
      where: { id: i.id },
      data: { authorId: user?.id },
    });
    k += 1;
  }
  console.log('Total `tasks.authorId` updates : ', { count: k });

  console.log('\nSeed finished!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
