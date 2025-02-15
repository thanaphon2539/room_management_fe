const RoomStatus = (props: { item: any }) => {
  const { item } = props;
  const icon = (item: any) => {
    if (item === "blank") return "bi bi-house-fill text-success-base";
    if (item === "busy") return "bi bi-house-check-fill text-error-base";
    if (item === "reserve") return "bi bi-house-lock-fill text-warning-base";
    if (item === "person") return "bi bi-person-fill text-dark-base";
    if (item === "legalEntity") return "bi bi-buildings-fill text-dark-base";
  };
  return <i className={`${icon(item)} text-[20px]`} />;
};

export default RoomStatus;
