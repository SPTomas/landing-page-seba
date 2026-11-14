"""One-time, local asset preparation. Requires Pillow; does not modify the original photo."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import random
import shutil

ROOT = Path(__file__).resolve().parent.parent
portrait = Image.open(ROOT / 'public/images/sebastian-reynoso.jpg')
portrait.save(ROOT / 'public/images/sebastian-reynoso.webp', quality=90, method=6)

font_dir = ROOT / 'public/fonts'
font_dir.mkdir(exist_ok=True)
shutil.copyfile(ROOT / 'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2', font_dir / 'editorial.woff2')
shutil.copyfile(ROOT / 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', font_dir / 'manrope.woff2')
shutil.copyfile(ROOT / 'node_modules/@fontsource/cormorant-garamond/LICENSE', font_dir / 'OFL-Cormorant-Garamond.txt')
shutil.copyfile(ROOT / 'node_modules/@fontsource-variable/manrope/LICENSE', font_dir / 'OFL-Manrope.txt')

# Sanitize the AI mockup using our real logo, not invented contact details.
# Run after npm run exportar has produced logo-grafito.png.
logo_path = ROOT / 'public/propuestas/logo-grafito.png'
if logo_path.exists():
    board = ROOT / 'public/propuestas/03-grafito-editorial.png'
    image = Image.open(board).convert('RGB')
    scale = image.width / 1536
    card = Image.new('RGBA', (610, 312))
    pixels = card.load()
    random.seed(29)
    for y in range(card.height):
        for x in range(card.width):
            grain = random.randint(-3, 3)
            pixels[x, y] = (236 + grain, 232 + grain, 224 + grain, 255)
    logo = Image.open(logo_path).convert('RGBA')
    logo.thumbnail((390, 218), Image.Resampling.LANCZOS)
    card.alpha_composite(logo, ((610-logo.width)//2, 20))
    draw = ImageDraw.Draw(card)
    font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 11)
    draw.line((50, 257, 560, 257), fill='#bd795f', width=1)
    draw.text((50, 277), 'IDENTIDAD VISUAL / PROPUESTA 03', font=font, fill='#666569')
    card = card.rotate(8, expand=True, resample=Image.Resampling.BICUBIC)
    if scale != 1:
        card = card.resize((round(card.width*scale),round(card.height*scale)))
    image.paste(card, (round(842*scale),round(409*scale)), card)
    image.save(board, optimize=True)
print('Photo and presentation fonts prepared; graphite mockup sanitized when logo is available.')
