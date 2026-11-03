# 20 templates x 3 colour variants, 12 tokens each (+ template extras). Javoří Lhota.
K = ['bg', 'surface', 'ink', 'muted', 'line', 'primary', 'onPrimary', 'link', 'accent', 'onAccent', 'deep', 'onDeep']

def p(name, *vals, **extra):
    d = dict(zip(K, vals)); d['name'] = name; d['x'] = extra; return d

PAL = {
 'Main': [
  p('Luční', '#FBFBF7', '#EEF3E4', '#1E2A22', '#4F5B52', '#C9D3C3', '#2F5D3A', '#FFFFFF', '#2F5D3A', '#E3B23C', '#1E2A22', '#2F5D3A', '#FBFBF7', hill='#D4E2B4', meadow='#A9C46C', roof='#C9962A'),
  p('Modrotisk', '#F7F8FB', '#E6ECF5', '#14213D', '#4A5670', '#C5CFDF', '#1F3F7A', '#FFFFFF', '#1F3F7A', '#F0B429', '#14213D', '#14213D', '#F7F8FB', hill='#C9D6EC', meadow='#8FA7D6', roof='#C98E12'),
  p('Šípek', '#FFFAF8', '#F6E6E4', '#2A1416', '#6A4B4E', '#E5C9C7', '#9E1F35', '#FFFFFF', '#9E1F35', '#F2A541', '#2A1416', '#4A1220', '#FFFAF8', hill='#F1D3CF', meadow='#D99A92', roof='#D27C1E'),
 ],
 'S02-Zvonice': [
  p('Inkoust', '#FFFFFF', '#F3F5F8', '#16233A', '#4A5568', '#C9CFD8', '#2B4C7E', '#FFFFFF', '#2B4C7E', '#B3261E', '#FFFFFF', '#16233A', '#FFFFFF'),
  p('Grafit', '#FAFAF9', '#EFEFEC', '#1C1C1A', '#57574F', '#D4D4CE', '#3D3D38', '#FFFFFF', '#3D3D38', '#C2410C', '#FFFFFF', '#1C1C1A', '#FAFAF9'),
  p('Mech', '#FBFCF8', '#EEF2E6', '#1D2617', '#515C46', '#CED6C2', '#4A6B2A', '#FFFFFF', '#3E5C22', '#8A5A00', '#FFFFFF', '#1D2617', '#FBFCF8'),
 ],
 'S03-Studanka': [
  p('Les', '#F4F6F2', '#FFFFFF', '#14211E', '#4C5A56', '#CFD9D4', '#1F4D45', '#FFFFFF', '#1F4D45', '#8FC7C1', '#14211E', '#1F4D45', '#F4F6F2', tree='#1F4D45', tree2='#2C6358', water='#5FA9A1', sky='#DCEFEA', meadow='#A8B97A'),
  p('Vřes', '#F7F4F8', '#FFFFFF', '#22172A', '#5A4C63', '#DCD2E2', '#5B3A6E', '#FFFFFF', '#5B3A6E', '#C9A6D9', '#22172A', '#3A2448', '#F7F4F8', tree='#3A2448', tree2='#5B3A6E', water='#7FA8CC', sky='#EDE4F1', meadow='#B9A6C4'),
  p('Kámen', '#F3F4F5', '#FFFFFF', '#1B2025', '#4F5861', '#D3D8DD', '#36505F', '#FFFFFF', '#2F4856', '#E0B65A', '#1B2025', '#1B2025', '#F3F4F5', tree='#2B3C47', tree2='#4D6878', water='#7E9EB2', sky='#E3E8EC', meadow='#B9C2A0'),
 ],
 'S04-Lipa': [
  p('Lipová', '#FFFFFF', '#EEF3E6', '#1B231A', '#4E5A4B', '#DCE3D3', '#3F6B2A', '#FFFFFF', '#3F6B2A', '#C9DCA9', '#1B231A', '#28461A', '#EEF3E6'),
  p('Obloha', '#FFFFFF', '#EAF2FA', '#13202E', '#4A5868', '#D3DFEB', '#1E5A96', '#FFFFFF', '#1E5A96', '#9CC3E6', '#13202E', '#123B63', '#EAF2FA'),
  p('Švestka', '#FFFFFF', '#F3ECF4', '#24152A', '#5E4C64', '#E3D6E6', '#6B2D73', '#FFFFFF', '#6B2D73', '#D7B6DD', '#24152A', '#3D1844', '#F3ECF4'),
 ],
 'S05-Majka': [
  p('Stužky', '#E9ECEF', '#FFFFFF', '#15171A', '#4A4F57', '#C9CED4', '#B8322A', '#FFFFFF', '#1F4A94', '#F2C230', '#15171A', '#15171A', '#FFFFFF', r1='#B8322A', r1i='#FFFFFF', r2='#F2C230', r2i='#15171A', r3='#2A55A5', r3i='#FFFFFF', r4='#2E7D4F', r4i='#FFFFFF'),
  p('Kroj', '#EEEEF1', '#FFFFFF', '#1A1414', '#524848', '#D2CCCC', '#8E1B2C', '#FFFFFF', '#8E1B2C', '#E7B10A', '#1A1414', '#1A1414', '#FFFFFF', r1='#8E1B2C', r1i='#FFFFFF', r2='#E7B10A', r2i='#1A1414', r3='#1F5E5B', r3i='#FFFFFF', r4='#3B3B7A', r4i='#FFFFFF'),
  p('Noc', '#15171C', '#20232A', '#F1F2F4', '#AEB3BC', '#343843', '#FF6B57', '#15171C', '#8FB8FF', '#FFD24D', '#15171C', '#0C0D10', '#F1F2F4', r1='#FF6B57', r1i='#15171C', r2='#FFD24D', r2i='#15171C', r3='#7FA6FF', r3i='#15171C', r4='#4CC38A', r4i='#15171C'),
 ],
 'S06-Hnizdo': [
  p('Meruňka', '#FFFFFF', '#FCE3CF', '#24282F', '#555B66', '#F2C6A5', '#9A4416', '#FFFFFF', '#9A4416', '#D6E9F7', '#24282F', '#24282F', '#FFFFFF', go='#2E6B2A'),
  p('Pastelka', '#FFFFFF', '#E3F1E8', '#1E2B24', '#4E5D55', '#BFDCC9', '#1F6B4F', '#FFFFFF', '#1F6B4F', '#FFE3A3', '#1E2B24', '#1E2B24', '#FFFFFF', go='#1F6B4F'),
  p('Borůvka', '#FFFFFF', '#E7E9FB', '#1C1F33', '#50546E', '#C9CDF0', '#3B43A8', '#FFFFFF', '#3B43A8', '#FFD8C2', '#1C1F33', '#1C1F33', '#FFFFFF', go='#3B43A8'),
 ],
 'S07-Hranice': [
  p('Šumava', '#FFFFFF', '#EEF3F6', '#13202B', '#4A5866', '#CCD7DF', '#1D4E6F', '#FFFFFF', '#1D4E6F', '#F2C14E', '#13202B', '#2F5233', '#FFFFFF'),
  p('Bavorsko', '#FFFFFF', '#EDF4FB', '#0F1E2E', '#45576A', '#C8D8E8', '#1460A8', '#FFFFFF', '#0F5596', '#9FC9F0', '#0F1E2E', '#0F2E4D', '#FFFFFF'),
  p('Hraniční kámen', '#FAFAF8', '#EFEEE9', '#1F1E1A', '#56544C', '#D6D3C9', '#7A2E2E', '#FFFFFF', '#7A2E2E', '#D9B26A', '#1F1E1A', '#2E2D29', '#FAFAF8'),
 ],
 'S08-Vinice': [
  p('Bez', '#FFFFFF', '#F6EFEE', '#2A1218', '#5E4A4F', '#E3D3D4', '#6E1E3A', '#FFFFFF', '#6E1E3A', '#D9C49A', '#2A1218', '#6E1E3A', '#FFFFFF', row='#5E7A2E', row2='#D9C49A'),
  p('Žito', '#FFFFFF', '#F4F3E3', '#22230F', '#56583E', '#DEDDBE', '#5E6B12', '#FFFFFF', '#4F5A0E', '#E8D36A', '#22230F', '#2E3410', '#F4F3E3', row='#5E6B12', row2='#E8D36A'),
  p('Sklep', '#1B1517', '#261E21', '#F3ECEC', '#BBAFB2', '#3A2F33', '#E2A6B6', '#1B1517', '#F0B8C6', '#D9C49A', '#1B1517', '#120E0F', '#F3ECEC', row='#7E9A4E', row2='#5A4A3A'),
 ],
 'S09-Hreben': [
  p('Hory', '#FFFFFF', '#EEF3F8', '#12202E', '#4A5868', '#D2DCE6', '#1C3A57', '#FFFFFF', '#1F4E7A', '#B3541A', '#FFFFFF', '#1C3A57', '#FFFFFF', far='#2C5E8C', near='#3B6E9E', snow='#FFFFFF'),
  p('Sníh', '#FFFFFF', '#F2F5F7', '#101418', '#4D5560', '#D9DEE3', '#0B6E8A', '#FFFFFF', '#0A6580', '#C7321F', '#FFFFFF', '#0E2A33', '#FFFFFF', far='#155567', near='#1F7088', snow='#FFFFFF'),
  p('Smrk', '#FFFFFF', '#EEF4EF', '#122019', '#4A5C51', '#CFDCD3', '#1F4A33', '#FFFFFF', '#1F4A33', '#D9A21B', '#122019', '#1F4A33', '#FFFFFF', far='#2E6447', near='#3D7A58', snow='#F2F6F3'),
 ],
 'S10-Rynek': [
  p('Náves', '#FFFFFF', '#EFE7DA', '#241A16', '#5F524C', '#DCCFC0', '#8E3B2A', '#FFFFFF', '#8E3B2A', '#3E4A55', '#FFFFFF', '#3E4A55', '#FFFFFF', f1='#C98F6B', f2='#3E4A55', f3='#B4553C', f4='#D9C3A0'),
  p('Gotika', '#FFFFFF', '#ECEEF2', '#171A21', '#4F5563', '#D3D7DF', '#2E3A59', '#FFFFFF', '#2E3A59', '#B08D3C', '#171A21', '#171A21', '#FFFFFF', f1='#8C97B0', f2='#2E3A59', f3='#5B6788', f4='#C9CEDA'),
  p('Pískovec', '#FFFFFF', '#F1EBDD', '#2A2418', '#5F5747', '#DDD3BE', '#6F5A1E', '#FFFFFF', '#6A551B', '#3F6E6A', '#FFFFFF', '#2A2418', '#F1EBDD', f1='#D8C08A', f2='#3F6E6A', f3='#A88A4A', f4='#E9DDBF'),
 ],
 'S11-Radnice': [
  p('Modrá', '#FFFFFF', '#EAF1FA', '#14202E', '#4A5668', '#DCE5F0', '#1D4F91', '#FFFFFF', '#1D4F91', '#F3C744', '#14202E', '#123462', '#FFFFFF'),
  p('Zelená', '#FFFFFF', '#E8F3EC', '#102219', '#46594E', '#CFE3D6', '#1B6B45', '#FFFFFF', '#1B6B45', '#F2B544', '#102219', '#0F3D27', '#FFFFFF'),
  p('Večer', '#101826', '#182335', '#EEF2F8', '#A9B4C6', '#2A3850', '#7FB2FF', '#0B1220', '#9CC3FF', '#F3C744', '#101826', '#0B1220', '#EEF2F8'),
 ],
 'S12-Kolonada': [
  p('Pramen', '#FFFFFF', '#DCEBE7', '#13231F', '#4A5D58', '#C4D8D2', '#2E5E57', '#FFFFFF', '#2E5E57', '#8C6A22', '#FFFFFF', '#2E5E57', '#FFFFFF'),
  p('Porcelán', '#FFFFFF', '#E8EEF7', '#141C2B', '#4B566A', '#CDD7E6', '#2C4A7E', '#FFFFFF', '#2C4A7E', '#B5893B', '#141C2B', '#1C2F52', '#FFFFFF'),
  p('Růže', '#FFFFFF', '#F6E9EC', '#2A161B', '#634C52', '#E7D0D6', '#8A3B4F', '#FFFFFF', '#8A3B4F', '#5B6B48', '#FFFFFF', '#4A1F2B', '#FFFFFF'),
 ],
 'S13-Mlyn': [
  p('Pila', '#FFFFFF', '#F1F1EF', '#1E2124', '#50555B', '#D7D7D3', '#C2461A', '#FFFFFF', '#B03F17', '#2F5D8A', '#FFFFFF', '#2B2F33', '#FFFFFF'),
  p('Ocel', '#FFFFFF', '#EEF1F4', '#15191E', '#4C5560', '#D4DAE1', '#0F5FA8', '#FFFFFF', '#0F5FA8', '#F2B705', '#15191E', '#15191E', '#FFFFFF'),
  p('Dřevo', '#FFFFFF', '#F4EEE6', '#241B12', '#5D5144', '#E0D4C4', '#7A4A1E', '#FFFFFF', '#7A4A1E', '#2F6B4F', '#FFFFFF', '#2B2017', '#F4EEE6'),
 ],
 'S14-Hraz': [
  p('Rybník', '#FFFFFF', '#DDF0EE', '#0F2627', '#46605F', '#C3E0DD', '#0E5E61', '#FFFFFF', '#0E5E61', '#D98A2B', '#0F2627', '#083D3F', '#FFFFFF', wave='#13787C'),
  p('Rákos', '#FFFFFF', '#EEF0DF', '#1C2112', '#545B44', '#D7DCBF', '#4D5E1C', '#FFFFFF', '#4D5E1C', '#C9792B', '#1C2112', '#2A3410', '#FFFFFF', wave='#62762A'),
  p('Hladina', '#FFFFFF', '#E3EEF9', '#0D1B2C', '#475769', '#C8DAED', '#1559A8', '#FFFFFF', '#1559A8', '#FF8A3D', '#0D1B2C', '#0B2E57', '#FFFFFF', wave='#2370C4'),
 ],
 'S15-Lupa': [
  p('Žlutá', '#FFFFFF', '#FFE14D', '#000000', '#333333', '#000000', '#000000', '#FFE14D', '#0033CC', '#FFE14D', '#000000', '#000000', '#FFFFFF'),
  p('Modrá', '#FFFFFF', '#DCEBFF', '#000000', '#333333', '#000000', '#003A8C', '#FFFFFF', '#003A8C', '#DCEBFF', '#000000', '#00214F', '#FFFFFF'),
  p('Tmavá', '#000000', '#1A1A1A', '#FFFFFF', '#D6D6D6', '#FFFFFF', '#FFE14D', '#000000', '#FFE14D', '#FFE14D', '#000000', '#1A1A1A', '#FFFFFF'),
 ],
 'S16-Kompas': [
  p('Mapa', '#FFFFFF', '#F1F6F7', '#1A2A2E', '#4D5E63', '#D5DEE0', '#0E5A6B', '#FFFFFF', '#0E5A6B', '#C2410C', '#FFFFFF', '#0E5A6B', '#FFFFFF', land='#E3EBD9', water='#A9CCE3', road='#FFFFFF', bld='#CBD8C0', pinRing='#FFFFFF'),
  p('Turistická', '#FFFFFF', '#FFF7E0', '#1F1A0E', '#5C5440', '#E8DDBA', '#B3261E', '#FFFFFF', '#A3221B', '#1D5FA8', '#FFFFFF', '#1F1A0E', '#FFF7E0', land='#F2EBD3', water='#9FC6E4', road='#FFFFFF', bld='#E0D3AE', pinRing='#FFFFFF'),
  p('Noční', '#12181C', '#1A2227', '#EAF0F2', '#A6B3B8', '#2C373D', '#5CC8D8', '#0B1114', '#7AD4E2', '#FF8F5C', '#12181C', '#0B1114', '#EAF0F2', land='#1E2A25', water='#1E3A4F', road='#3A4A52', bld='#2A3A33', pinRing='#12181C'),
 ],
 'S17-Magistrat': [
  p('Modrá', '#FFFFFF', '#DCE7F5', '#121A2B', '#4B5670', '#CBD6E6', '#1F3A68', '#FFFFFF', '#1F3A68', '#2E7D46', '#FFFFFF', '#1F3A68', '#FFFFFF'),
  p('Petrolej', '#FFFFFF', '#DDEFEF', '#0E2224', '#445F62', '#C5E0E1', '#0D4F55', '#FFFFFF', '#0D4F55', '#B5462A', '#FFFFFF', '#0D4F55', '#FFFFFF'),
  p('Lilek', '#FFFFFF', '#ECE6F6', '#1B1428', '#574D69', '#D9D0EA', '#42286E', '#FFFFFF', '#42286E', '#1F7A5C', '#FFFFFF', '#42286E', '#FFFFFF'),
 ],
 'S18-Zpravodaj': [
  p('Novinová', '#FFFFFF', '#F1EEEC', '#17171A', '#5F5F66', '#D9D6D3', '#A8231C', '#FFFFFF', '#17171A', '#A8231C', '#FFFFFF', '#17171A', '#FFFFFF', paper='#F1EEEC', river='#9FB7C8'),
  p('Modrý tisk', '#FFFFFF', '#EDF0F5', '#121826', '#555D6E', '#D5DAE3', '#1C4E9E', '#FFFFFF', '#121826', '#1C4E9E', '#FFFFFF', '#121826', '#FFFFFF', paper='#EDF0F5', river='#A9C1E2'),
  p('Zelený tisk', '#FFFFFF', '#EAF1EC', '#13201A', '#52605A', '#D3DED7', '#1F6B45', '#FFFFFF', '#13201A', '#1F6B45', '#FFFFFF', '#13201A', '#FFFFFF', paper='#EAF1EC', river='#A8C9BA'),
 ],
 'S19-Mikroregion': [
  p('Olivová', '#F6F6EE', '#FFFFFF', '#1F2418', '#535A48', '#DEDFD2', '#55652A', '#FFFFFF', '#4A5A21', '#E4E6D6', '#1F2418', '#55652A', '#FFFFFF', m1='#C9D3A3', m2='#E2C98F', m3='#B7CDB9', m4='#D9B8A0'),
  p('Krajina', '#F4F7FA', '#FFFFFF', '#142030', '#4A5868', '#D2DCE6', '#2C5E8C', '#FFFFFF', '#2C5E8C', '#DCE7F2', '#142030', '#2C5E8C', '#FFFFFF', m1='#BFD6EA', m2='#CFE3C4', m3='#F0D9A8', m4='#D8C7E6'),
  p('Vřesoviště', '#F7F5F8', '#FFFFFF', '#20162A', '#5A4C63', '#E2DAE6', '#6A3D7A', '#FFFFFF', '#6A3D7A', '#ECE4F0', '#20162A', '#6A3D7A', '#FFFFFF', m1='#D9C3E2', m2='#C7D8C0', m3='#F1D7B5', m4='#BFD3E3'),
 ],
 'S20-Urad': [
  p('Státní modrá', '#FFFFFF', '#EBF1F8', '#1F2328', '#4E5864', '#D5DEE8', '#2362A2', '#FFFFFF', '#2362A2', '#1D7A3A', '#FFFFFF', '#1A4A7C', '#FFFFFF'),
  p('Krajská zelená', '#FFFFFF', '#E9F3EE', '#1A2420', '#4C5A54', '#D1E2D9', '#17694A', '#FFFFFF', '#17694A', '#2362A2', '#FFFFFF', '#0E4A33', '#FFFFFF'),
  p('Grafitová', '#FFFFFF', '#EEF0F2', '#1B1F24', '#4F5862', '#D6DADF', '#3A4552', '#FFFFFF', '#2C5B8C', '#1D7A3A', '#FFFFFF', '#22282F', '#FFFFFF'),
 ],
}

def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    f = lambda v: v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = map(f, c); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def cr(a, b):
    la, lb = lum(a), lum(b); return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

CHECKS = [('ink', 'bg', 7), ('ink', 'surface', 7), ('muted', 'bg', 4.5), ('muted', 'surface', 4.5), ('link', 'bg', 4.5), ('link', 'surface', 4.5),
          ('onPrimary', 'primary', 4.5), ('primary', 'bg', 3), ('onAccent', 'accent', 4.5), ('onDeep', 'deep', 4.5), ('line', 'bg', 1.15)]

if __name__ == '__main__':
    bad = 0
    for t, vs in PAL.items():
        for v in vs:
            fails = []
            for a, b, need in CHECKS:
                r = cr(v[a], v[b])
                if r < need: fails.append(f'{a}/{b} {r:.2f}<{need}')
            for k in ('r1', 'r2', 'r3', 'r4'):
                if k in v['x']:
                    r = cr(v['x'][k + 'i'], v['x'][k])
                    if r < 4.5: fails.append(f'{k} text {r:.2f}')
            if fails: bad += 1; print(t, v['name'], '; '.join(fails))
    print('variants with issues:', bad)
