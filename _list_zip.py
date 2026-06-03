import zipfile
import os

zip_path = r"e:\food_images_split.zip"
out_path = os.path.join(os.path.dirname(__file__), "zip_list.txt")

with zipfile.ZipFile(zip_path, "r") as z:
    names = sorted(z.namelist())

with open(out_path, "w", encoding="utf-8") as f:
    for i, n in enumerate(names):
        # skip dirs
        if n.endswith("/"):
            continue
        f.write(f"{i}\t{n}\n")

print("wrote", out_path, "count", len(names))
