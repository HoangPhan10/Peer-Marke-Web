import React, { useEffect, useState } from 'react';
import { modalSubject } from './modal-subject';
import { ModalSetting } from './types';

export function ModalPortal() {
  const [modalList, setModalList] = useState<ModalSetting[]>([]);

  useEffect(() => {
    modalSubject.subscribe(modalList => {
      setModalList(modalList);
    });
  }, []);

  return (
    <div className='modal-portals de-modal'>
      {modalList.map((modal, idx) => (
        <div
          key={idx}
          style={{ display: 'block' }}
          className='modal fade show de-modal-wrap'
          tabIndex={-1}
          role='dialog'
          aria-hidden='false'
        >
          <div className={`modal-dialog modal-dialog-centered ${modal.options.dialogClassName ? modal.options.dialogClassName : ''}`} role='document'>
            <div className='modal-content'>
              {
                modal.options.closeButton ? <button className='de-close-modal' onClick={() => modal.modalRef.close(null)}>
                  <svg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1.31995 7.58024C1.17085 7.58211 1.02459 7.53949 0.899829 7.45784C0.775071 7.37619 0.677481 7.2592 0.619525 7.12182C0.561568 6.98444 0.545874 6.83291 0.574448 6.68657C0.603022 6.54023 0.674567 6.40572 0.779946 6.30024L6.43995 0.640239C6.58057 0.499788 6.7712 0.420898 6.96995 0.420898C7.1687 0.420898 7.35932 0.499788 7.49995 0.640239C7.5707 0.709184 7.62694 0.7916 7.66534 0.882626C7.70373 0.973652 7.72352 1.07145 7.72352 1.17024C7.72352 1.26903 7.70373 1.36682 7.66534 1.45785C7.62694 1.54888 7.5707 1.63129 7.49995 1.70024L1.84995 7.36024C1.7807 7.43035 1.69815 7.48593 1.60714 7.5237C1.51613 7.56148 1.41849 7.5807 1.31995 7.58024V7.58024Z' fill='currentColor' />
                    <path d='M6.99989 7.58005C6.90135 7.58051 6.80371 7.56129 6.71269 7.52351C6.62168 7.48573 6.53913 7.43016 6.46989 7.36005L0.779886 1.70005C0.639436 1.55942 0.560547 1.3688 0.560547 1.17005C0.560547 0.971295 0.639436 0.780671 0.779886 0.640046C0.923451 0.50135 1.11527 0.423828 1.31489 0.423828C1.5145 0.423828 1.70632 0.50135 1.84989 0.640046L7.49989 6.30005C7.57064 6.36899 7.62688 6.45141 7.66528 6.54243C7.70367 6.63346 7.72346 6.73125 7.72346 6.83005C7.72346 6.92884 7.70367 7.02663 7.66528 7.11766C7.62688 7.20868 7.57064 7.2911 7.49989 7.36005C7.36797 7.49532 7.18874 7.57418 6.99989 7.58005V7.58005Z' fill='currentColor' />
                  </svg>
                </button> : <></>
              }
              <modal.content modalRef={modal.modalRef} data={modal.options?.data} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
