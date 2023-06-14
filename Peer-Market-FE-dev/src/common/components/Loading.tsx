import { Spin } from 'antd';
export function Loading(props) {

  return (
    <>
      {props.show ? <div className='crm-loading' id='CRMLoading'>
        <Spin>
          {/* <span className="visually-hidden">Loading...</span> */}
        </Spin>
      </div> : <></>
      }
    </>
  )
}
