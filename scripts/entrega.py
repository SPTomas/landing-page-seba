"""Package the ready-to-share PNGs and vector logos. Python standard library only."""
from pathlib import Path
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / 'PARA-MOSTRAR'
TARGET.mkdir(exist_ok=True)
shutil.copyfile(ROOT / 'public/propuestas/00-comparativa.png', TARGET / '00-Comparativa-general.png')
options = [('01-Noche-y-bronce','noche','01-noche-bronce'),('02-Marfil-y-oliva','oliva','02-marfil-oliva'),('03-Grafito-editorial','grafito','03-grafito-editorial')]
for folder, key, board in options:
    destination = TARGET / folder
    destination.mkdir(exist_ok=True)
    files = {
        f'public/propuestas/presentacion-{key}.png': '01-Presentacion.png',
        f'public/propuestas/{board}.png': '02-Identidad-y-papeleria.png',
        f'public/propuestas/web-{key}-desktop.png': '03-Pagina-escritorio.png',
        f'public/propuestas/web-{key}-movil.png': '04-Pagina-celular.png',
        f'public/propuestas/logo-{key}.png': '05-Logo-transparente.png',
        f'public/logos/sr-{key}.svg': '06-Logo-vectorial.svg',
        f'public/logos/sr-{key}-blanco.svg': '07-Logo-blanco.svg',
    }
    for source, name in files.items():
        shutil.copyfile(ROOT / source, destination / name)
(TARGET / 'LEEME.txt').write_text('SEBASTIÁN REYNOSO / TRES PROPUESTAS\n\nEmpezá por 00-Comparativa-general.png.\nCada carpeta incluye una presentación para mostrar, identidad visual, vistas de la página y logos PNG/SVG.\n\n01 Noche y bronce: clásico, firme y elegante (punto de partida sugerido).\n02 Marfil y oliva: cercano, cálido y editorial.\n03 Grafito editorial: moderno, directo y minimalista.\n\nLas fotos son las originales proporcionadas. Los mockups de identidad son exploraciones con asistencia de IA; los logos SVG son interpretaciones propias para la web.\n\nAntes de publicar deben confirmarse áreas de práctica, datos profesionales, matrícula, modalidad de atención, WhatsApp/correo y privacidad. El formulario no envía consultas mientras no se configure un canal.\n\nPara ver las páginas en esta computadora: INICIAR.cmd, o npm run mostrar desde la carpeta del proyecto.\n',encoding='utf-8')
delivery = ROOT / 'entrega'
delivery.mkdir(exist_ok=True)
archive = delivery / 'Sebastian-Reynoso-propuestas.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as output:
    for source in sorted(TARGET.rglob('*')):
        if source.is_file(): output.write(source, source.relative_to(ROOT))
print(f'Entrega lista: {TARGET}\nZIP: {archive} ({archive.stat().st_size / 1024 / 1024:.1f} MB)')
