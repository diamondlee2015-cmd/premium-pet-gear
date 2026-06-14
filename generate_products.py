import pandas as pd
import os
import re

def slugify(text):
    # 转为纯小写，空格换成连字符，移除特殊字符
    text = str(text).lower().strip()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '-', text)

# 1. 读取你的 Excel
file_path = "Pet Export Item.xlsx"
xls = pd.ExcelFile(file_path)

output_dir = "src/content/products"
os.makedirs(output_dir, exist_ok=True)

# 2. 遍历每一个 Sheet (代表不同类目，如 Toys & Fun, Cat Trees)
for sheet_name in xls.sheet_names:
    if "活动" in sheet_name: # 跳过非产品规则页
        continue
        
    df = pd.read_excel(file_path, sheet_name=sheet_name)
    category_slug = slugify(sheet_name)
    
    # 假设你的列名叫 'Item Name', 'SKU', 'Description' (根据具体表格字段微调)
    for index, row in df.iterrows():
        item_name = row.get('Item Name', f'Product-{index}')
        sku = row.get('SKU', '')
        description = row.get('Description', 'Premium export quality.')
        
        item_slug = slugify(item_name)
        
        # 组装 Astro 认识的 Frontmatter 头部数据
        md_content = f"""---
title: "{item_name}"
sku: "{sku}"
category: "{category_slug}"
image: "~/assets/images/products/default.jpg"
moq: "1 Carton"
---
{description}
"""
        # 写出到文件
        with open(f"{output_dir}/{item_slug}.md", "w", encoding="utf-8") as f:
            f.write(md_content)

print("🎉 所有产品链接已一键生成完毕！")