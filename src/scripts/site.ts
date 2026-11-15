type Service = { id: string; title: string; detail: string; examples: readonly string[] };
declare global { interface Window { __services: readonly Service[] } }

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
const setMenu = (open: boolean) => {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.hidden = !open;
};
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

const sectionLinks = document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting);
    if (!current) return;
    sectionLinks.forEach(link => {
      if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65% 0px' });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
}

const serviceDialog = document.querySelector<HTMLDialogElement>('#service-dialog');
const privacyDialog = document.querySelector<HTMLDialogElement>('#privacy-dialog');
let selectedService = '';

document.querySelectorAll<HTMLButtonElement>('[data-service]').forEach(button => button.addEventListener('click', () => {
  const service = window.__services.find(item => item.id === button.dataset.service);
  if (!service || !serviceDialog) return;
  selectedService = service.title;
  serviceDialog.querySelector('h2')!.textContent = service.title;
  serviceDialog.querySelector('.dialog-description')!.textContent = service.detail;
  const list = serviceDialog.querySelector('ul')!;
  list.replaceChildren(...service.examples.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  serviceDialog.setAttribute('aria-labelledby', 'service-dialog-title');
  serviceDialog.showModal();
}));
serviceDialog?.querySelector('.dialog-contact')?.addEventListener('click', () => {
  const select = document.querySelector<HTMLSelectElement>('#contact-area');
  if (select) select.value = selectedService;
  serviceDialog.close();
});
document.querySelectorAll('.privacy-trigger').forEach(button => button.addEventListener('click', () => privacyDialog?.showModal()));
[serviceDialog, privacyDialog].forEach(dialog => {
  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});

const form = document.querySelector<HTMLFormElement>('#contact-form');
const submitButton = form?.querySelector<HTMLButtonElement>('[type="submit"]');
if (submitButton) submitButton.disabled = false;
let downloadURL: string | undefined;
form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('website')) return;
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const button = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const download = form.querySelector<HTMLAnchorElement>('#download-consultation')!;
  const text = `Consulta para ${form.dataset.professional}\n\nNombre: ${data.get('nombre')}\nCorreo: ${data.get('email')}\nÁrea: ${data.get('area')}\n\n${data.get('mensaje')}\n`;
  const { endpoint, whatsapp, email } = form.dataset;
  status.textContent = '';
  status.classList.remove('is-error');
  button.disabled = true;
  try {
    if (endpoint) {
      status.textContent = 'Enviando tu consulta…';
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('No se pudo enviar la consulta. Intentá nuevamente más tarde.');
      status.textContent = 'Tu consulta fue enviada. Gracias por comunicarte.';
      form.reset();
    } else if (whatsapp) {
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
      const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.click();
      status.textContent = 'Se abrió WhatsApp con tu consulta preparada. Confirmá el envío allí.';
    } else if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Consulta: ${data.get('area')}`)}&body=${encodeURIComponent(text)}`;
      status.textContent = 'Tu consulta está preparada para tu aplicación de correo. Confirmá el envío allí.';
    } else {
      if (downloadURL) URL.revokeObjectURL(downloadURL);
      downloadURL = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      download.href = downloadURL; download.hidden = false;
      status.textContent = 'Tu consulta está preparada. Podés descargarla a continuación. Esta propuesta no envía datos.';
    }
  } catch (error) {
    status.classList.add('is-error');
    status.textContent = error instanceof Error ? error.message : 'Ocurrió un error. Intentá nuevamente.';
  } finally { button.disabled = false; }
});

export {};
