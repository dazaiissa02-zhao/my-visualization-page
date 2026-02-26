import fs from "fs";
import path from "path";

function readFile(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return "";
  }
}

function findLastSection(md) {
  const lines = md.split("\n");
  let lastHeaderIndex = -1;
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (lines[i].startsWith("## ")) {
      lastHeaderIndex = i;
      break;
    }
  }
  if (lastHeaderIndex === -1) return { title: "", block: [] };
  const title = lines[lastHeaderIndex].slice(3).trim();
  const block = [];
  for (let i = lastHeaderIndex + 1; i < lines.length; i += 1) {
    if (lines[i].startsWith("## ")) break;
    block.push(lines[i]);
  }
  return { title, block };
}

function extractList(blockLines, marker) {
  const idx = blockLines.findIndex((l) => l.trim() === marker);
  if (idx === -1) return [];
  const items = [];
  for (let i = idx + 1; i < blockLines.length; i += 1) {
    const line = blockLines[i].trim();
    if (line.startsWith("**")) break;
    if (line.startsWith("- ")) items.push(line.slice(2).trim());
    else if (line === "") continue;
    else break;
  }
  return items;
}

function formatDate(d) {
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const hours = `${d.getHours()}`.padStart(2, "0");
  const mins = `${d.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${mins}`;
}

function buildHandover({ title, changes, pitfalls, mindsets }) {
  const ts = formatDate(new Date());
  const lines = [];
  lines.push("# HANDOVER");
  lines.push("");
  lines.push(`**时间**: ${ts}`);
  lines.push(`**主题**: ${title || "自动交接快照"}`);
  lines.push("");
  lines.push("## 关键决策");
  if (changes.length === 0) lines.push("- 参考 FOR[昭昭].md 最新日志的改动项");
  for (const c of changes) lines.push(`- ${c}`);
  lines.push("");
  lines.push("## 问题与陷阱");
  if (pitfalls.length === 0) lines.push("- 参考 FOR[昭昭].md 最新日志的踩坑与修复");
  for (const p of pitfalls) lines.push(`- ${p}`);
  lines.push("");
  lines.push("## 经验教训");
  if (mindsets.length === 0) lines.push("- 参考 FOR[昭昭].md 最新日志的思维与心法");
  for (const m of mindsets) lines.push(`- ${m}`);
  lines.push("");
  lines.push("## 后续关键上下文");
  lines.push("- 使用 npm run add:trae-log 记录下一阶段成长日志");
  lines.push("- 使用 npm run handover 或 handover:auto 生成交接文档");
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("本文件由脚本生成：npm run handover:auto");
  return lines.join("\n");
}

async function main() {
  const rootDir = path.resolve(new URL(".", import.meta.url).pathname, "..");
  const forFile = path.resolve(rootDir, "FOR[昭昭].md");
  const md = readFile(forFile);
  const { title, block } = findLastSection(md);
  const changes = extractList(block, "**本次改动**");
  const pitfalls = extractList(block, "**踩坑与修复**");
  const mindsets = extractList(block, "**思维与心法**");
  const content = buildHandover({ title, changes, pitfalls, mindsets });
  const targetPath = path.resolve(rootDir, "HANDOVER.md");
  await fs.promises.writeFile(targetPath, content, { encoding: "utf8" });
}

main().catch((error) => {
  console.error("handover:auto 执行失败:", error);
  process.exit(1);
});
