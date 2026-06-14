import pandas as pd
import os
import re

def slugify(text):
    if pd.isna(text) or not text: return ""
    text = str(text).strip()
    text = text.replace("&", "and").replace("/", "-").replace("\\", "-").replace("'", "").replace('"', "")
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def escape_yaml(text):
    if pd.isna(text) or text is None: return ""
    text = str(text).replace('\\', '\\\\').replace('"', '\\"')
    text = text.replace('\n', ' ').replace('\r', ' ')
    return re.sub(r'\s+', ' ', text).strip()

file_path = "Pet Export Item.xlsx"
xls = pd.ExcelFile(file_path)
output_dir = "src/content/products"

# 每次运行前，自动清空旧的 products 目录，省去手动删除的麻烦
if os.path.exists(output_dir):
    import shutil
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

generated_slugs = set()
total_counter = 0

for sheet_name in xls.sheet_names:
    # 排除不需要的说明页签
    if any(k in sheet_name for k in ["活动", "规则", "Sheet", "模板"]):
        continue
        
    df = pd.read_excel(file_path, sheet_name=sheet_name)
    df.columns = [str(c).strip().replace('\n', ' ').replace('\r', '') for c in df.columns]
    category_slug = slugify(sheet_name) 
    
    for index, row in df.iterrows():
        # 1. 智能匹配产品名称列
        item_name = ""
        for col in df.columns:
            if any(key in str(col).lower() for key in ['product', 'name', '名称', 'item']):
                item_name = row[col]
                break
        
        # 🚨 【核心修复】严格拦截：如果产品名是空的，或者是无意义的测试代号，直接跳过！
        if pd.isna(item_name) or str(item_name).strip() == "":
            continue
        if str(item_name).strip().lower() in ["nan", "null", "none"] or "total" in str(item_name).lower():
            continue
        if str(item_name).strip().startswith("Product-"): # 拦截幽灵测试行
            continue
            
        # 2. 匹配其他列
        sku = ""
        for col in df.columns:
            if any(key in str(col).lower() for key in ['ean', 'code', '编码', 'sku']):
                sku = row[col]
                break
                
        spec = ""
        for col in df.columns:
            if any(key in str(col).lower() for key in ['spec', '规格', 'size', '尺寸']):
                spec = row[col]
                break
                
        moq_units = "1"
        for col in df.columns:
            if any(key in str(col).lower() for key in ['unit', 'ctn', '每箱', 'moq', 'pack']):
                moq_units = row[col]
                break

        # 生成 URL 友好的文件名
        item_slug = slugify(item_name)
        if not item_slug:
            continue # 如果连名字都无法转成 slug，直接丢弃
            
        # 防止重名覆盖
        base_slug = item_slug
        counter = 1
        while item_slug in generated_slugs:
            item_slug = f"{base_slug}-{counter}"
            counter += 1
        generated_slugs.add(item_slug)
            
        safe_title = escape_yaml(item_name)
        safe_sku = escape_yaml(sku)
        safe_spec = escape_yaml(spec)
        
        # 绝对安全的 MOQ 解析
        try:
            if pd.isna(moq_units) or str(moq_units).strip() == "" or str(moq_units).lower() == "nan":
                safe_moq = "1 Carton"
            else:
                moq_val = int(float(moq_units))
                safe_moq = f"{moq_val} Units/CTN"
        except:
            safe_moq = f"{escape_yaml(moq_units)}"

        # 写入标准的 Astro Frontmatter 格式
        md_content = f"""---
title: "{safe_title}"
sku: "{safe_sku}"
category: "{category_slug}"
image: "~/assets/images/products/default.jpg"
moq: "{safe_moq}"
---
Specification parameters: {safe_spec}
"""
        with open(f"{output_dir}/{item_slug}.md", "w", encoding="utf-8") as f:
            f.write(md_content)
        total_counter += 1

print(f"🎉 清洗完毕！成功剔除空行，生成了 {total_counter} 个真实有效的产品文件！")