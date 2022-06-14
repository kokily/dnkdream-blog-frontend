export const escapeUrl = (text: string) => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      ''
    )
    .trim()
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const setHeaderId = (body: string) => {
  const div = document.createElement('div');
  div.innerHTML = body;

  const h1 = div.querySelectorAll('h1');
  const h2 = div.querySelectorAll('h2');
  const h3 = div.querySelectorAll('h3');

  const list: string[] = [];

  const setId = (el: HTMLHeadingElement) => {
    const id = escapeUrl(el.innerText);
    const exists = list.filter((existsId) => existsId.indexOf(id) !== -1);
    const addId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;

    el.id = addId;
    list.push(addId);
  };

  [h1, h2, h3].forEach((head) => head.forEach(setId));

  return div.innerHTML;
};

export const parseHeading = (body: string) => {
  const div = document.createElement('div');
  div.innerHTML = body;

  const els = Array.from(div.children);
  const headings = els.filter((el) => el.tagName.match(/H([1-3])/));

  const headingsInfo = headings.map((header) => ({
    id: header.id,
    text: header.textContent,
    level: parseInt(header.tagName.replace('H', ''), 10),
  }));

  const minLv = Math.min(...Array.from(headingsInfo.map((info) => info.level)));

  headingsInfo.forEach((info) => {
    info.level -= minLv;
  });

  return headingsInfo;
};
