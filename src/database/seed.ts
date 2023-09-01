import { PrismaService } from './prisma.service';

const prisma = new PrismaService();

const seed_users = [
  {
    email: 'ana@unb.br',
    name: 'Ana Beatriz Duarte Almeida',
    username: 'ana',
    password: '123456',
    gender: null,
    role: null,
    admin: false,
  },
  {
    email: 'maurofda@unb.br',
    name: 'Mauro Fernandes de Almeida',
    username: 'maurofda',
    password: '123456',
    gender: null,
    role: null,
    admin: false,
  },
  {
    email: 'crisczar@unb.br',
    name: 'Cristina Almeida',
    username: 'crisczar',
    password: '123456',
    gender: null,
    role: null,
    admin: false,
  },
  {
    email: 'mateus@unb.br',
    name: 'Mateus Almeida',
    username: 'mateus',
    password: '123456',
    gender: 'male',
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
    id: '1',
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
];

const seed_tags = [
  { id: 1, name: 'UnB (noite)' },
  { id: 2, name: 'exercícios físicos (diurno)' },
  { id: 3, name: 'Trabalho (CEMSL)' },
  { id: 4, name: 'UnB (diurno)' },
];

async function main() {
  console.log('Starting seed...');

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

  console.log('Seed finished!');
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
