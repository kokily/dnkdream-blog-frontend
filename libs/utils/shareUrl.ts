function shareUrl(url: string) {
  const input = document.createElement('input');

  input.type = 'text';
  input.value = url;

  if (!document.body) return;

  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');

  if (!document) return;

  document.body.removeChild(input);
}

export default shareUrl;
