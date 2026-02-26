import fs from "fs";
import path from "path";

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) continue;
    const [key, ...rest] = part.slice(2).split("=");
    if (rest.length > 0) {
      args[key] = rest.join("=");
    } else {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = "true";
      }
    }
  }
  return args;
}

function formatDate(d) {
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildSection({ title, scene, changes, lessons, mindset }) {
  const date = formatDate(new Date());
  const lines = [];
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(`## ${date} ${title}`);
  lines.push("");
  if (scene) {
    lines.push(`**场景**: ${scene}`);
    lines.push("");
  }
  if (changes) {
    lines.push("**本次改动**");
    const parts = changes.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      for (const item of parts) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }
  }
  if (lessons) {
    lines.push("**踩坑与修复**");
    const parts = lessons.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      for (const item of parts) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }
  }
  if (mindset) {
    lines.push("**思维与心法**");
    const parts = mindset.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) {
      for (const item of parts) {
        lines.push(`- ${item}`);
      }
      lines.push("");
    }
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  const title = args.title || args.t;
  if (!title) {
    console.error("缺少必填参数 --title，用于描述这次日志的标题。");
    process.exit(1);
  }
  const scene = args.scene || args.s || "";
  const changes = args.changes || args.c || "";
  const lessons = args.lessons || args.l || "";
  const mindset = args.mindset || args.m || "";
  const rootDir = path.resolve(new URL(".", import.meta.url).pathname, "..");
  const targetPath = path.resolve(rootDir, "FOR[昭昭].md");
  const section = buildSection({ title, scene, changes, lessons, mindset });
  await fs.promises.appendFile(targetPath, section, { encoding: "utf8" });
}

main().catch((error) => {
  console.error("追加 FOR[昭昭] 日志失败:", error);
  process.exit(1);
});
