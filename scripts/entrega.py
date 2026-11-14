"""Package the ready-to-share PNGs and vector logos. Python standard library only."""
from pathlib import Path
import shutil
import zipfile

ROOT = Path(__file__).resolve().parent.parent


def copy_asset(source, destination):
    """Leave unchanged presentation files alone (including files open on Windows)."""
    if not destination.exists() or source.read_bytes() != destination.read_bytes():
        shutil.copyfile(source, destination)


TARGET = ROOT / 'PARA-MOSTRAR'
TARGET.mkdir(exist_ok=True)
copy_asset(ROOT / 'public/propuestas/00-comparativa.png', TARGET / '00-Comparativa-general.png')
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
        copy_asset(ROOT / source, destination / name)
(TARGET / 'LEEME.txt').write_text('SEBASTIÁN REINOSO / ARCHIVO DE PROPUESTAS\n\nIdentidad elegida: 01 Noche y bronce (azul y bronce).\nCada carpeta incluye la exploración visual y logos PNG/SVG.\n\nLas láminas y capturas iniciales pueden mostrar el retrato, los textos y la grafía del apellido anteriores. Los logos descargables ya usan Reinoso con i.\n\nLos mockups son exploraciones con asistencia de IA; los logos SVG son interpretaciones propias para la web.\n\nEl sitio actual incorpora el retrato y los datos profesionales proporcionados. El formulario prepara la consulta en WhatsApp; la persona confirma el envío en esa aplicación. Las capturas vigentes están en docs/capturas/ del proyecto.\n\nPara ver el sitio elegido: INICIAR.cmd, o npm run mostrar desde la carpeta del proyecto.\n',encoding='utf-8')
delivery = ROOT / 'entrega'
delivery.mkdir(exist_ok=True)
archive = delivery / 'Sebastian-Reinoso-propuestas.zip'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as output:
    for source in sorted(TARGET.rglob('*')):
        if source.is_file(): output.write(source, source.relative_to(ROOT))
print(f'Entrega lista: {TARGET}\nZIP: {archive} ({archive.stat().st_size / 1024 / 1024:.1f} MB)')
