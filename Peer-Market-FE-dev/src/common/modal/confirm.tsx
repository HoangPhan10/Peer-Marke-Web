import { openModal, ModalProps } from ".";

interface ConfirmParams {
  title?: any;
  content?: any;
  titleSubmitBtn?: string;
}

function ConfirmModal(props: ModalProps<ConfirmParams>) {
  const { modalRef, data } = props;
  return (
    <div className='modal-body'>
      <div className='modal-title de-mb-4 -text-center'>
        {data.title}
      </div>

      <div className='modal-inner-auto text-center'>
        {data?.content}
      </div>

      <div className='modal-actions'>
        <button type='button' onClick={() => modalRef.close(false)} className='btn btn-secondary w-50 me-3'>
          <span>Huỷ</span>
        </button>
        
        <button type='submit' onClick={() => modalRef.close(true)} className='btn btn-primary w-50' >
          <span>{data?.titleSubmitBtn}</span>
        </button>
      </div>
    </div>
  )
}

export function confirm(params: ConfirmParams) {
  return openModal(ConfirmModal, { data: params }).afterClosed();
}
