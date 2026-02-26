#!/bin/bash

# 检查是否有修改
if [[ -z $(git status -s) ]]; then
  echo "✨ 没有需要提交的修改。"
  exit 0
fi

# 获取提交信息，如果没有提供，则使用默认信息
COMMIT_MSG="$1"
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="update: 优化页面细节"
fi

echo "🚀 开始提交代码..."

# 添加所有修改
git add .

# 提交
git commit -m "$COMMIT_MSG"

# 推送
echo "☁️ 推送到 GitHub..."
git push

echo "✅ 完成！Vercel 正在自动部署中..."
echo "👉 请稍等 1 分钟后访问线上地址。"
