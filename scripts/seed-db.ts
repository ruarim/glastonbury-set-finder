import { PrismaClient } from "@prisma/client";
import { fetchPerformances } from "./scrape-lineup";

const prisma = new PrismaClient();

async function main() {
  const performances = (await fetchPerformances()) as {
    title: string;
    stage: string;
    day: string;
    end: string;
  }[];

  for (const performance of performances) {
    const { title, stage, day, end } = performance;
    await prisma.performance.create({
      data: {
        title,
        stage,
        day,
        time: end,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
