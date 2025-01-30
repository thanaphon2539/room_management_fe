import UserList from "./UserList";

interface ContentProps {
  selectedMenu: string;
}

export default function Content({ selectedMenu }: ContentProps) {
  return (
    <div className="w-full">
      {selectedMenu === "home" && (
        <h1 className="text-4xl font-bold text-center">
          Welcome to the Home Page!
        </h1>
      )}
      <div className="w-full">
        {selectedMenu === "user-list" && <UserList />}
      </div>
    </div>
  );
}
