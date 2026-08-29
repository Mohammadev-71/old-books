import prisma from "../src/lib/prisma";

async function main() {
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@prisma.io" },
      update: { name: "Alice" },
      create: {
        email: "alice@prisma.io",
        name: "Alice",
        phone:566227418,
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@prisma.io" },
      update: { name: "Bob" },
      create: {
        email: "bob@prisma.io",
        name: "Bob",
        phone:526524524,
      },
    }),
  ]);


  const books = await Promise.all([
    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    
    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),

    prisma.book.create({
      data:{
        title:"mohammad samer",
        description:"hello world in my book i'm mohammad samer",
        location:"dubai-dubai",
        authorId:users[0].id,
      }
    }),


  ]);

  console.log(`Seeded ${users.length} users.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
