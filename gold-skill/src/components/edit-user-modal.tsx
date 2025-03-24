"use client";

import { useForm } from "react-hook-form";
import { SubscriptionType, UserSubscriptionType } from "../../types/UserType";

type FormValues = {
  name: string;
  role: "USER" | "ACTIVE_USER" | "ADMIN";
  isActive: boolean;
  hasMarketingAgreement: boolean;
  hasRODOAgreement: boolean;
  subscriptionName: string;
  partnerId: string;
};

type EditUserModalProps = {
  user: {
    id: string;
    name: string | null;
    role: "USER" | "ACTIVE_USER" | 'ADMIN';
    isActive: boolean;
    hasMarketingAgreement: boolean;
    hasRODOAgreement: boolean;
    userSubscription?: UserSubscriptionType[];
    partnerId?: string | null;
  } | null;
  subscriptions: SubscriptionType[];
  onClose: () => void;
  onSave: (updatedUser: FormData) => void;
};

export default function EditUserModal({ user, onClose, onSave, subscriptions }: EditUserModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      role: user?.role || "USER",
      isActive: user?.isActive || true,
      hasMarketingAgreement: user?.hasMarketingAgreement || true,
      hasRODOAgreement: user?.hasRODOAgreement || true,
      subscriptionName: user?.userSubscription && user.userSubscription[0] && user.userSubscription[0].subscription?.name || "",
      partnerId: user?.partnerId || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if(!user){
      return
    }
    
    
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("isActive", String(data.isActive));
    formData.append("marketingAgreement", String(data.hasMarketingAgreement));
    formData.append("RODOAgreement", String(data.hasRODOAgreement));
    formData.append("subscriptionName", data.subscriptionName);
    formData.append("partnerId", data.partnerId);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edytowanie użytkownika</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("name")}
              className="border p-2 w-full rounded"
              placeholder="Nazwa"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <select {...register("role")} className="border p-2 w-full rounded">
              <option value="USER">User</option>
              <option value="ACTIVE_USER">Active User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("isActive")} />
            <span>Aktywny</span>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("hasMarketingAgreement")} />
            <span>Marketing?</span>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("hasRODOAgreement")} />
            <span>RODO?</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Subscription</label>
            <select {...register("subscriptionName")} className="border p-2 w-full rounded">
              <option value="">No Subscription</option>
              {subscriptions.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              {...register("partnerId")}
              className="border p-2 w-full rounded"
              placeholder="Partner ID"
            />
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Anuluj
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
