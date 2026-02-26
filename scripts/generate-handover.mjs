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
  const hours = `${d.getHours()}`.padStart(2, "0");
  const mins = `${d.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${mins}`;
}

function buildSection({ title, decisions, issues, lessons, context }) {
  const ts = formatDate(new Date());
  const lines = [];
  lines.push(`# HANDOVER`);
  lines.push("");
  lines.push(`**时间**: ${ts}`);
  if (title) {
    lines.push(`**主题**: ${title}`);
  }
  lines.push("");
  if (decisions) {
    lines.push("## 关键决策");
    const parts = decisions.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    for (const item of parts) lines.push(`- ${item}`);
    lines.push("");
  }
  if (issues) {
    lines.push("## 问题与陷阱");
    const parts = issues.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    for (const item of parts) lines.push(`- ${item}`);
    lines.push("");
  }
  if (lessons) {
    lines.push("## 经验教训");
    const parts = lessons.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    for (const item of parts) lines.push(`- ${item}`);
    lines.push("");
  }
  if (context) {
    lines.push("## 后续关键上下文");
    const parts = context.split(/[;；]/).map((p) => p.trim()).filter(Boolean);
    for (const item of parts) lines.push(`- ${item}`);
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  lines.push("本文件由脚本生成：npm run handover");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  const title = args.title || args.t || "";
  const decisions = args.decisions || args.d || "";
  const issues = args.issues || args.i || "";
  const lessons = args.lessons || args.l || "";
  const context = args.context || args.c || "";
  const rootDir = path.resolve(new URL(".", import.meta.url).pathname, "..");
  const targetPath = path.resolve(rootDir, "HANDOVER.md");
  const content = buildSection({ title, decisions, issues, lessons, context });
  await fs.promises.writeFile(targetPath, content, { encoding: "utf8" });
}

main().catch((error) => {
  console.error("生成 HANDOVER 文档失败:", error);
  process.exit(1);
});
