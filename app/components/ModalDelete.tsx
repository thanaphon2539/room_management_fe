const Modal = (props: { [x: string]: any; title: any }) => {
  const title = props.title;

  const cancel = (event: boolean) => {
    props.onCancel(event);
  };
  const confirm = (event: boolean) => {
    props.onConfirm(event);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">ต้องการลบข้อมูล</h2>
        <p>{title ? title : "คุณแน่ใจหรือไม่ว่าต้องการลบสิ่งนี้?"}</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-gray" onClick={() => cancel(false)}>
            ยกเลิก
          </button>
          <button className="btn btn-error" onClick={() => confirm(true)}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
