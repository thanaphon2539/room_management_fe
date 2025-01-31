const Modal = (props: { [x: string]: any; title: string }) => {
  const title = props.title;

  const confirm = (event: boolean) => {
    props.onConfirm(event);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-dark-base">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>{title ? title : "Are you sure you want to delete this?"}</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-gray" onClick={() => confirm(false)}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={() => confirm(true)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
