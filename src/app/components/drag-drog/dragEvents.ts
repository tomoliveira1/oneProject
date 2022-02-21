import { elements } from './element';

export const dragEvents = () => {

  const { dropzones } = elements();

  function drag() {
    console.log('>: Is Drag');
  }

  function dragStart(e: any) {
    dropzones().forEach(item => item.classList.add('zone-security'));

    e?.target.classList?.add('is-dragging')
  }

  function dragOver(e: any) {
    e?.target.classList?.remove('.zone-security');
    e?.target.classList?.add('drag-over');

    const cardIsDragging = document.querySelector('.is-dragging');

    e?.target.appendChild(cardIsDragging)
  }

  function dragLeave(e: any) {
    e?.target.classList?.remove('drag-over');
  }

  function dragExit() {
  }

  function dragEnd(e: any) {
    dropzones().forEach(item => item.classList.remove('zone-security'));
    e?.target.classList?.remove('is-dragging');
  }

  return {
    dragStart,
    drag,
    dragOver,
    dragExit,
    dragEnd,
    dragLeave
  }
}
