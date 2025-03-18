'use client'

import { useState } from "react";

type UserNode = {
  id: string;
  name: string | null;
  role: string;
  isActive: boolean;
  partnerId?: string | null;
  children?: UserNode[];
};

const UserTree = ({ users }: { users: UserNode[] }) => {
  return (
    <ul className="ml-4 border-l pl-2">
      {users.map((user) => (
        <TreeNode key={user.id} user={user} />
      ))}
    </ul>
  );
};

const TreeNode = ({ user }: { user: UserNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="mt-2">
      <div className="flex items-center space-x-2">
        {user.children && user.children.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-2 py-1 text-xs bg-gray-200 rounded"
          >
            {expanded ? "−" : "+"}
          </button>
        )}
        <span>
          {user.name}
        </span>
      </div>
      {expanded && user.children && <UserTree users={user.children} />}
    </li>
  );
};

export default UserTree;
