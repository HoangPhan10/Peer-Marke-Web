import { ComponentType } from 'react';
import { Subject } from 'rxjs';
import { modalSubject } from './modal-subject';
import { ModalOptions, ModalRef, ExtractModalData } from './types';

let increNumber = 1;

export function openModal<T = ComponentType<any>>(
  Content: T,
  options?: ModalOptions<ExtractModalData<T>>,
) {
  const modalId = increNumber++;
  const modalSbj: Subject<any>[] = [];
  const modalRef: ModalRef = {
    close: (data: any) => {
      modalSbj.forEach(ob => {
        ob.next(data);
      });

      modalSubject.next(
        modalSubject.getValue()
          .filter(modal => modal.modalId !== modalId)
      );
      try{
        document.body.classList.remove('overflow-hidden');
      }catch(err){}
    },
    afterClosed: () => {
      const sj = new Subject();
      modalSbj.push(sj);

      return sj;
    },
  }

  const modalList = modalSubject.getValue();
  const modalOpts: ModalOptions = options || {};
  try{
    document.body.classList.add('overflow-hidden');
  }catch(err){}
  modalSubject.next([
    ...modalList,
    { modalId, content: Content, options: modalOpts, modalRef }
  ]);

  return modalRef;
}
