export function normalize(text: string) {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const regex = new RegExp(a.split('').join('|'), 'g');
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(regex, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[\s\W-]+/g, '-');
}
