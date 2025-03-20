'use client'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { SubscriptionType, UserType } from "../../types/UserType";
import { deleteUser, updateUser } from "@/actions/admin_actions";
import EditUserModal from "./edit-user-modal";
import { useState } from "react";

const UsersTable = ({users, subscriptions}:{users:UserType[], subscriptions: SubscriptionType[]}) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const handleEdit = (user:UserType) => {
    setSelectedUser(user);
  };

  const handleDelete = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const formData = new FormData();
      formData.append("id", userId);
      const deletedUser = await deleteUser(formData)
      if (deletedUser) {
        alert("User deleted successfully!");
        (users = users.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleSave = async (formData: FormData) => {
    try {
      await updateUser(formData)
      alert("User updated successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nazwa</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Rola</th>
              <th className="px-4 py-2 text-left">Aktywny</th>
              <th className="px-4 py-2 text-left">Marketing</th>
              <th className="px-4 py-2 text-left">RODO</th>
              <th className="px-4 py-2 text-left">Subskrybcja</th>
              <th className="px-4 py-2 text-left">Stworzony</th>
              <th className="px-4 py-2 text-left">ID Partnera</th>
              <th className="px-4 py-2 text-left">Płatności</th>
              <th className="px-4 py-2 text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users?.filter((user)=>user.isActive).map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  {user.isActive ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">
                  {user.hasMarketingAgreement ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">
                  {user.hasRODOAgreement ? "✅" : "❌"}
                </td>
                <td className="px-4 py-2">
                  {user.userSubscription && user.userSubscription[0] && user.userSubscription[0].subscription?.name || "Brak"}
                </td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{user.partnerId || "-"}</td>
                <td className="px-4 py-2">
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <DisclosureButton className="bg-blue-500 text-white px-2 py-1 rounded">
                          {open ? "Ukryj płatności" : "Pokaż płatności"}
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2">
                          <ul className="border p-2 bg-gray-50 rounded">
                            {user.payments.length > 0 ? (
                              user.payments.map((payment) => (
                                <li
                                  key={payment.createdAt.toLocaleDateString()}
                                  className="text-sm text-gray-700"
                                >
                                  {`${new Date(payment.createdAt).toLocaleDateString()} - ${payment.amount} ${payment.currency}}`}
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-gray-500">No payments</li>
                            )}
                          </ul>
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} onSave={handleSave} subscriptions={subscriptions}/>
      )}
      </div>
    )
}

export {UsersTable}