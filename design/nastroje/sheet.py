import sys
from PIL import Image, ImageDraw
# usage: sheet.py out.png crop_top crop_h scale shots...
out, top, h, sc = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4])
ims = []
for p in sys.argv[5:]:
    im = Image.open(p).convert('RGB'); im = im.crop((0, top, im.width, min(im.height, top + h)))
    ims.append((p.split('/')[-1], im.resize((int(im.width * sc), int(im.height * sc)))))
W = sum(i.width for _, i in ims) + 12 * len(ims); H = max(i.height for _, i in ims) + 24
S = Image.new('RGB', (W, H), '#777777'); d = ImageDraw.Draw(S); x = 6
for n, im in ims:
    S.paste(im, (x, 22)); d.text((x, 4), n, fill='#000000'); x += im.width + 12
S.save(out); print(S.size)
