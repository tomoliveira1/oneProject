export const elements = () =>{

  const cards = () => document.querySelectorAll('.card');
  const dropzones = () => document.querySelectorAll('.dropzone');

  return {
    cards,
    dropzones
  }
}
